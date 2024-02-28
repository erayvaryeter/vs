"use strict";
/* eslint-disable prefer-const */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveDependencies = exports.InstalledArtifact = exports.ProjectManifest = exports.sanitizeUri = exports.sanitizePath = exports.Artifact = exports.InstallStatus = exports.checkDemands = exports.ArtifactBase = exports.buildRegistryResolver = exports.parseArtifactDependency = void 0;
const assert_1 = require("assert");
const path_1 = require("path");
const format_1 = require("../cli/format");
const i18n_1 = require("../i18n");
const espidf_1 = require("../installers/espidf");
const registries_1 = require("../registries/registries");
const linq_1 = require("../util/linq");
const uri_1 = require("../util/uri");
const SetOfDemands_1 = require("./SetOfDemands");
function parseArtifactDependency(id) {
    const parts = id.split(':');
    if (parts.length === 2) {
        return [parts[0], parts[1]];
    }
    if (parts.length === 1) {
        return [undefined, parts[0]];
    }
    throw new Error((0, i18n_1.i) `Invalid artifact id '${id}'`);
}
exports.parseArtifactDependency = parseArtifactDependency;
function loadRegistry(session, decl) {
    const loc = decl.location.get(0);
    if (loc) {
        const locUri = session.parseLocation(loc);
        session.channels.debug(`Loading registry ${loc} (interpreted as ${locUri.toString()})`);
        return session.registryDatabase.loadRegistry(session, locUri);
    }
    return Promise.resolve(undefined);
}
async function buildRegistryResolver(session, registries) {
    // load the registries from the project file
    const result = new registries_1.RegistryResolver(session.registryDatabase);
    if (registries) {
        for (const [name, registry] of registries) {
            const loaded = await loadRegistry(session, registry);
            if (loaded) {
                result.add(loaded.location, name);
            }
        }
    }
    return result;
}
exports.buildRegistryResolver = buildRegistryResolver;
function addDisplayPrefix(prefix, targets) {
    const result = new Array();
    for (const element of targets) {
        result.push((0, i18n_1.i) `${prefix} - ${element}`);
    }
    return result;
}
class ArtifactBase {
    session;
    metadata;
    applicableDemands;
    constructor(session, metadata) {
        this.session = session;
        this.metadata = metadata;
        this.applicableDemands = new SetOfDemands_1.SetOfDemands(this.metadata, this.session);
    }
    buildRegistryByName(name) {
        const decl = this.metadata.registries.get(name);
        if (decl) {
            return loadRegistry(this.session, decl);
        }
        return Promise.resolve(undefined);
    }
}
exports.ArtifactBase = ArtifactBase;
function checkDemands(session, thisDisplayName, applicableDemands) {
    const errors = addDisplayPrefix(thisDisplayName, applicableDemands.errors);
    session.channels.error(errors);
    if (errors.length) {
        return false;
    }
    session.channels.warning(addDisplayPrefix(thisDisplayName, applicableDemands.warnings));
    session.channels.message(addDisplayPrefix(thisDisplayName, applicableDemands.messages));
    return true;
}
exports.checkDemands = checkDemands;
var InstallStatus;
(function (InstallStatus) {
    InstallStatus[InstallStatus["Installed"] = 0] = "Installed";
    InstallStatus[InstallStatus["AlreadyInstalled"] = 1] = "AlreadyInstalled";
    InstallStatus[InstallStatus["Failed"] = 2] = "Failed";
})(InstallStatus = exports.InstallStatus || (exports.InstallStatus = {}));
class Artifact extends ArtifactBase {
    shortName;
    targetLocation;
    constructor(session, metadata, shortName, targetLocation) {
        super(session, metadata);
        this.shortName = shortName;
        this.targetLocation = targetLocation;
    }
    get id() {
        return this.metadata.id;
    }
    get version() {
        return this.metadata.version;
    }
    get registryUri() {
        return this.metadata.registryUri;
    }
    get isInstalled() {
        return this.targetLocation.exists('artifact.json');
    }
    get uniqueId() {
        return `${this.registryUri.toString()}::${this.id}::${this.version}`;
    }
    async install(thisDisplayName, events, options) {
        const applicableDemands = this.applicableDemands;
        if (!checkDemands(this.session, thisDisplayName, applicableDemands)) {
            return InstallStatus.Failed;
        }
        if (await this.isInstalled && !options.force) {
            events.alreadyInstalledArtifact?.(thisDisplayName);
            return InstallStatus.AlreadyInstalled;
        }
        try {
            if (options.force) {
                try {
                    await this.uninstall();
                }
                catch {
                    // if a file is locked, it may not get removed. We'll deal with this later.
                }
            }
            // ok, let's install this.
            events.startInstallArtifact?.(thisDisplayName);
            for (const installInfo of applicableDemands.installer) {
                if (installInfo.lang && !options.allLanguages && options.language && options.language.toLowerCase() !== installInfo.lang.toLowerCase()) {
                    continue;
                }
                const installer = this.session.artifactInstaller(installInfo);
                if (!installer) {
                    (0, assert_1.fail)((0, i18n_1.i) `Unknown installer type ${installInfo.installerKind}`);
                }
                await installer(this.session, this.id, this.version, this.targetLocation, installInfo, events, options);
            }
            if (this.metadata.espidf) {
                await (0, espidf_1.installEspIdf)(this.session, events, this.targetLocation);
            }
            // after we unpack it, write out the installed manifest
            await this.writeManifest();
            return InstallStatus.Installed;
        }
        catch (err) {
            try {
                await this.uninstall();
            }
            catch {
                // if a file is locked, it may not get removed. We'll deal with this later.
            }
            throw err;
        }
    }
    async writeManifest() {
        await this.targetLocation.createDirectory();
        await this.metadata.save(this.targetLocation.join('artifact.json'));
    }
    async uninstall() {
        await this.targetLocation.delete({ recursive: true, useTrash: false });
    }
    async loadActivationSettings(activation) {
        // construct paths (bin, lib, include, etc.)
        // construct tools
        // compose variables
        // defines
        for (const exportsBlock of this.applicableDemands.exports) {
            activation.addExports(exportsBlock, this.targetLocation);
        }
        // if espressif install
        if (this.metadata.espidf) {
            // activate
            if (!await (0, espidf_1.activateEspIdf)(this.session, activation, this.targetLocation)) {
                return false;
            }
        }
        return true;
    }
    async sanitizeAndValidatePath(path) {
        try {
            const loc = this.session.fileSystem.file((0, path_1.resolve)(this.targetLocation.fsPath, path));
            if (await loc.exists()) {
                return loc;
            }
        }
        catch {
            // no worries, treat it like a relative path.
        }
        const loc = this.targetLocation.join(sanitizePath(path));
        if (await loc.exists()) {
            return loc;
        }
        return undefined;
    }
}
exports.Artifact = Artifact;
function sanitizePath(path) {
    return path.
        replace(/[\\/]+/g, '/'). // forward slashes please
        replace(/[?<>:|"]/g, ''). // remove illegal characters.
        // eslint-disable-next-line no-control-regex
        replace(/[\x00-\x1f\x80-\x9f]/g, ''). // remove unicode control codes
        replace(/^(con|prn|aux|nul|com[0-9]|lpt[0-9])$/i, ''). // no reserved names
        replace(/^[/.]*\//, ''). // dots and slashes off the front.
        replace(/[/.]+$/, ''). // dots and slashes off the back.
        replace(/\/\.+\//g, '/'). // no parts made just of dots.
        replace(/\/+/g, '/'); // duplicate slashes.
}
exports.sanitizePath = sanitizePath;
function sanitizeUri(u) {
    return u.
        replace(/[\\/]+/g, '/'). // forward slashes please
        replace(/[?<>|"]/g, ''). // remove illegal characters.
        // eslint-disable-next-line no-control-regex
        replace(/[\x00-\x1f\x80-\x9f]/g, ''). // remove unicode control codes
        replace(/^(con|prn|aux|nul|com[0-9]|lpt[0-9])$/i, ''). // no reserved names
        replace(/^[/.]*\//, ''). // dots and slashes off the front.
        replace(/[/.]+$/, ''). // dots and slashes off the back.
        replace(/\/\.+\//g, '/'). // no parts made just of dots.
        replace(/\/+/g, '/'); // duplicate slashes.
}
exports.sanitizeUri = sanitizeUri;
class ProjectManifest extends ArtifactBase {
    loadActivationSettings(activation) {
        return Promise.resolve(true);
    }
}
exports.ProjectManifest = ProjectManifest;
class InstalledArtifact extends Artifact {
    constructor(session, metadata) {
        super(session, metadata, '', uri_1.Uri.invalid);
    }
}
exports.InstalledArtifact = InstalledArtifact;
async function resolveDependencies(session, registryResolver, initialParents, dependencyDepth) {
    let depth = 0;
    let nextDepthRegistries = initialParents.map((parent) => parent.metadata.registryUri ? registryResolver.getRegistryByUri(parent.metadata.registryUri) : undefined);
    let currentRegistries = [];
    let nextDepth = initialParents;
    let initialSelections = new Set();
    let current = [];
    let resultSet = new Map(); // uniqueId, artifact
    let orderer = new Map(); // uniqueId, [depth, priority]
    while (nextDepth.length !== 0) {
        ++depth;
        currentRegistries = nextDepthRegistries;
        nextDepthRegistries = [];
        current = nextDepth;
        nextDepth = [];
        if (depth == dependencyDepth) {
            initialSelections = new Set(resultSet.keys());
        }
        for (let idx = 0; idx < current.length; ++idx) {
            const subjectParentRegistry = currentRegistries[idx];
            const subject = current[idx];
            let subjectId;
            let subjectUniqueId;
            if (subject instanceof Artifact) {
                subjectId = subject.id;
                subjectUniqueId = subject.uniqueId;
            }
            else {
                subjectId = subject.metadata.file.toString();
                subjectUniqueId = subjectId;
            }
            session.channels.debug(`Resolving ${subjectUniqueId}'s dependencies...`);
            // Note that we must update depth even if visiting the same artifact again
            orderer.set(subjectUniqueId, [depth, subject.metadata.priority]);
            if (resultSet.has(subjectUniqueId)) {
                session.channels.debug(`${subjectUniqueId} is a terminal dependency with a depth of ${depth}.`);
                // already visited
                continue;
            }
            resultSet.set(subjectUniqueId, subject);
            for (const [idOrShortName, version] of linq_1.linq.entries(subject.applicableDemands.requires)) {
                const [dependencyRegistryDeclaredName, dependencyId] = parseArtifactDependency(idOrShortName);
                let dependencyRegistry;
                if (dependencyRegistryDeclaredName) {
                    const maybeRegistry = await subject.buildRegistryByName(dependencyRegistryDeclaredName);
                    if (!maybeRegistry) {
                        throw new Error((0, i18n_1.i) `While resolving dependencies of ${subjectId}, ${dependencyRegistryDeclaredName} in ${idOrShortName} could not be resolved to a registry.`);
                    }
                    dependencyRegistry = maybeRegistry;
                }
                else {
                    if (!subjectParentRegistry) {
                        throw new Error((0, i18n_1.i) `While resolving dependencies of the project file ${subjectId}, ${idOrShortName} did not specify a registry.`);
                    }
                    dependencyRegistry = subjectParentRegistry;
                }
                const dependencyRegistryDisplayName = registryResolver.getRegistryDisplayName(dependencyRegistry.location);
                session.channels.debug(`Interpreting '${idOrShortName}' as ${dependencyRegistry.location.toString()}:${dependencyId}`);
                const dependency = await (0, registries_1.getArtifact)(dependencyRegistry, dependencyId, version.raw);
                if (!dependency) {
                    throw new Error((0, i18n_1.i) `Unable to resolve dependency ${dependencyId} in ${(0, format_1.prettyRegistryName)(dependencyRegistryDisplayName)}.`);
                }
                session.channels.debug(`Resolved dependency ${(0, format_1.artifactIdentity)(dependencyRegistryDisplayName, dependency[0], dependency[1].shortName)}`);
                nextDepthRegistries.push(dependencyRegistry);
                nextDepth.push(dependency[1]);
            }
        }
    }
    if (initialSelections.size === 0) {
        initialSelections = new Set(resultSet.keys());
    }
    session.channels.debug(`The following are initial selections: ${Array.from(initialSelections).join(', ')}`);
    const results = new Array();
    for (const [uniqueId, artifact] of resultSet) {
        const order = orderer.get(uniqueId);
        if (order) {
            results.push({
                'artifact': artifact,
                'uniqueId': uniqueId,
                'initialSelection': initialSelections.has(uniqueId),
                'depth': order[0],
                'priority': artifact.metadata.priority
            });
        }
        else {
            throw new Error('Result artifact with no order (bug in resolveDependencies)');
        }
    }
    results.sort((a, b) => {
        if (a.depth != b.depth) {
            return b.depth - a.depth;
        }
        return a.priority - b.priority;
    });
    return results;
}
exports.resolveDependencies = resolveDependencies;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJ0aWZhY3QuanMiLCJzb3VyY2VSb290IjoiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL21pY3Jvc29mdC92Y3BrZy10b29sL21haW4vdmNwa2ctYXJ0aWZhY3RzLyIsInNvdXJjZXMiOlsiYXJ0aWZhY3RzL2FydGlmYWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQ0FBaUM7QUFDakMsdUNBQXVDO0FBQ3ZDLGtDQUFrQzs7O0FBRWxDLG1DQUE4QjtBQUM5QiwrQkFBK0I7QUFHL0IsMENBQXFFO0FBQ3JFLGtDQUE0QjtBQUM1QixpREFBcUU7QUFFckUseURBQW1GO0FBRW5GLHVDQUFvQztBQUNwQyxxQ0FBa0M7QUFFbEMsaURBQThDO0FBSTlDLFNBQWdCLHVCQUF1QixDQUFDLEVBQVU7SUFDaEQsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QixJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ3RCLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDN0I7SUFFRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ3RCLE9BQU8sQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDOUI7SUFFRCxNQUFNLElBQUksS0FBSyxDQUFDLElBQUEsUUFBQyxFQUFBLHdCQUF3QixFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ2xELENBQUM7QUFYRCwwREFXQztBQUVELFNBQVMsWUFBWSxDQUFDLE9BQWdCLEVBQUUsSUFBeUI7SUFDL0QsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakMsSUFBSSxHQUFHLEVBQUU7UUFDUCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFD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
// SIG // Begin signature block
// SIG // MIIoKAYJKoZIhvcNAQcCoIIoGTCCKBUCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // f06qECwRYhLWMQMJawEwq69rYSYjaptH1b67BFLaZ2Kg
// SIG // gg12MIIF9DCCA9ygAwIBAgITMwAAA68wQA5Mo00FQQAA
// SIG // AAADrzANBgkqhkiG9w0BAQsFADB+MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSgwJgYDVQQDEx9NaWNyb3NvZnQgQ29kZSBT
// SIG // aWduaW5nIFBDQSAyMDExMB4XDTIzMTExNjE5MDkwMFoX
// SIG // DTI0MTExNDE5MDkwMFowdDELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjEeMBwGA1UEAxMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
// SIG // zkvLNa2un9GBrYNDoRGkGv7d0PqtTBB4ViYakFbjuWpm
// SIG // F0KcvDAzzaCWJPhVgIXjz+S8cHEoHuWnp/n+UOljT3eh
// SIG // A8Rs6Lb1aTYub3tB/e0txewv2sQ3yscjYdtTBtFvEm9L
// SIG // 8Yv76K3Cxzi/Yvrdg+sr7w8y5RHn1Am0Ff8xggY1xpWC
// SIG // XFI+kQM18njQDcUqSlwBnexYfqHBhzz6YXA/S0EziYBu
// SIG // 2O2mM7R6gSyYkEOHgIGTVOGnOvvC5xBgC4KNcnQuQSRL
// SIG // iUI2CmzU8vefR6ykruyzt1rNMPI8OqWHQtSDKXU5JNqb
// SIG // k4GNjwzcwbSzOHrxuxWHq91l/vLdVDGDUwIDAQABo4IB
// SIG // czCCAW8wHwYDVR0lBBgwFgYKKwYBBAGCN0wIAQYIKwYB
// SIG // BQUHAwMwHQYDVR0OBBYEFEcccTTyBDxkjvJKs/m4AgEF
// SIG // hl7BMEUGA1UdEQQ+MDykOjA4MR4wHAYDVQQLExVNaWNy
// SIG // b3NvZnQgQ29ycG9yYXRpb24xFjAUBgNVBAUTDTIzMDAx
// SIG // Mis1MDE4MjYwHwYDVR0jBBgwFoAUSG5k5VAF04KqFzc3
// SIG // IrVtqMp1ApUwVAYDVR0fBE0wSzBJoEegRYZDaHR0cDov
// SIG // L3d3dy5taWNyb3NvZnQuY29tL3BraW9wcy9jcmwvTWlj
// SIG // Q29kU2lnUENBMjAxMV8yMDExLTA3LTA4LmNybDBhBggr
// SIG // BgEFBQcBAQRVMFMwUQYIKwYBBQUHMAKGRWh0dHA6Ly93
// SIG // d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvY2VydHMvTWlj
// SIG // Q29kU2lnUENBMjAxMV8yMDExLTA3LTA4LmNydDAMBgNV
// SIG // HRMBAf8EAjAAMA0GCSqGSIb3DQEBCwUAA4ICAQCEsRbf
// SIG // 80dn60xTweOWHZoWaQdpzSaDqIvqpYHE5ZzuEMJWDdcP
// SIG // 72MGw8v6BSaJQ+a+hTCXdERnIBDPKvU4ENjgu4EBJocH
// SIG // lSe8riiZUAR+z+z4OUYqoFd3EqJyfjjOJBR2z94Dy4ss
// SIG // 7LEkHUbj2NZiFqBoPYu2OGQvEk+1oaUsnNKZ7Nl7FHtV
// SIG // 7CI2lHBru83e4IPe3glIi0XVZJT5qV6Gx/QhAFmpEVBj
// SIG // SAmDdgII4UUwuI9yiX6jJFNOEek6MoeP06LMJtbqA3Bq
// SIG // +ZWmJ033F97uVpyaiS4bj3vFI/ZBgDnMqNDtZjcA2vi4
// SIG // RRMweggd9vsHyTLpn6+nXoLy03vMeebq0C3k44pgUIEu
// SIG // PQUlJIRTe6IrN3GcjaZ6zHGuQGWgu6SyO9r7qkrEpS2p
// SIG // RjnGZjx2RmCamdAWnDdu+DmfNEPAddYjaJJ7PTnd+PGz
// SIG // G+WeH4ocWgVnm5fJFhItjj70CJjgHqt57e1FiQcyWCwB
// SIG // hKX2rGgN2UICHBF3Q/rsKOspjMw2OlGphTn2KmFl5J7c
// SIG // Qxru54A9roClLnHGCiSUYos/iwFHI/dAVXEh0S0KKfTf
// SIG // M6AC6/9bCbsD61QLcRzRIElvgCgaiMWFjOBL99pemoEl
// SIG // AHsyzG6uX93fMfas09N9YzA0/rFAKAsNDOcFbQlEHKiD
// SIG // T7mI20tVoCcmSIhJATCCB3owggVioAMCAQICCmEOkNIA
// SIG // AAAAAAMwDQYJKoZIhvcNAQELBQAwgYgxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xMjAwBgNVBAMTKU1pY3Jvc29mdCBSb290
// SIG // IENlcnRpZmljYXRlIEF1dGhvcml0eSAyMDExMB4XDTEx
// SIG // MDcwODIwNTkwOVoXDTI2MDcwODIxMDkwOVowfjELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjEoMCYGA1UEAxMfTWljcm9zb2Z0
// SIG // IENvZGUgU2lnbmluZyBQQ0EgMjAxMTCCAiIwDQYJKoZI
// SIG // hvcNAQEBBQADggIPADCCAgoCggIBAKvw+nIQHC6t2G6q
// SIG // ghBNNLrytlghn0IbKmvpWlCquAY4GgRJun/DDB7dN2vG
// SIG // EtgL8DjCmQawyDnVARQxQtOJDXlkh36UYCRsr55JnOlo
// SIG // XtLfm1OyCizDr9mpK656Ca/XllnKYBoF6WZ26DJSJhIv
// SIG // 56sIUM+zRLdd2MQuA3WraPPLbfM6XKEW9Ea64DhkrG5k
// SIG // NXimoGMPLdNAk/jj3gcN1Vx5pUkp5w2+oBN3vpQ97/vj
// SIG // K1oQH01WKKJ6cuASOrdJXtjt7UORg9l7snuGG9k+sYxd
// SIG // 6IlPhBryoS9Z5JA7La4zWMW3Pv4y07MDPbGyr5I4ftKd
// SIG // gCz1TlaRITUlwzluZH9TupwPrRkjhMv0ugOGjfdf8NBS
// SIG // v4yUh7zAIXQlXxgotswnKDglmDlKNs98sZKuHCOnqWbs
// SIG // YR9q4ShJnV+I4iVd0yFLPlLEtVc/JAPw0XpbL9Uj43Bd
// SIG // D1FGd7P4AOG8rAKCX9vAFbO9G9RVS+c5oQ/pI0m8GLhE
// SIG // fEXkwcNyeuBy5yTfv0aZxe/CHFfbg43sTUkwp6uO3+xb
// SIG // n6/83bBm4sGXgXvt1u1L50kppxMopqd9Z4DmimJ4X7Iv
// SIG // hNdXnFy/dygo8e1twyiPLI9AN0/B4YVEicQJTMXUpUMv
// SIG // dJX3bvh4IFgsE11glZo+TzOE2rCIF96eTvSWsLxGoGyY
// SIG // 0uDWiIwLAgMBAAGjggHtMIIB6TAQBgkrBgEEAYI3FQEE
// SIG // AwIBADAdBgNVHQ4EFgQUSG5k5VAF04KqFzc3IrVtqMp1
// SIG // ApUwGQYJKwYBBAGCNxQCBAweCgBTAHUAYgBDAEEwCwYD
// SIG // VR0PBAQDAgGGMA8GA1UdEwEB/wQFMAMBAf8wHwYDVR0j
// SIG // BBgwFoAUci06AjGQQ7kUBU7h6qfHMdEjiTQwWgYDVR0f
// SIG // BFMwUTBPoE2gS4ZJaHR0cDovL2NybC5taWNyb3NvZnQu
// SIG // Y29tL3BraS9jcmwvcHJvZHVjdHMvTWljUm9vQ2VyQXV0
// SIG // MjAxMV8yMDExXzAzXzIyLmNybDBeBggrBgEFBQcBAQRS
// SIG // MFAwTgYIKwYBBQUHMAKGQmh0dHA6Ly93d3cubWljcm9z
// SIG // b2Z0LmNvbS9wa2kvY2VydHMvTWljUm9vQ2VyQXV0MjAx
// SIG // MV8yMDExXzAzXzIyLmNydDCBnwYDVR0gBIGXMIGUMIGR
// SIG // BgkrBgEEAYI3LgMwgYMwPwYIKwYBBQUHAgEWM2h0dHA6
// SIG // Ly93d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvZG9jcy9w
// SIG // cmltYXJ5Y3BzLmh0bTBABggrBgEFBQcCAjA0HjIgHQBM
// SIG // AGUAZwBhAGwAXwBwAG8AbABpAGMAeQBfAHMAdABhAHQA
// SIG // ZQBtAGUAbgB0AC4gHTANBgkqhkiG9w0BAQsFAAOCAgEA
// SIG // Z/KGpZjgVHkaLtPYdGcimwuWEeFjkplCln3SeQyQwWVf
// SIG // Liw++MNy0W2D/r4/6ArKO79HqaPzadtjvyI1pZddZYSQ
// SIG // fYtGUFXYDJJ80hpLHPM8QotS0LD9a+M+By4pm+Y9G6XU
// SIG // tR13lDni6WTJRD14eiPzE32mkHSDjfTLJgJGKsKKELuk
// SIG // qQUMm+1o+mgulaAqPyprWEljHwlpblqYluSD9MCP80Yr
// SIG // 3vw70L01724lruWvJ+3Q3fMOr5kol5hNDj0L8giJ1h/D
// SIG // Mhji8MUtzluetEk5CsYKwsatruWy2dsViFFFWDgycSca
// SIG // f7H0J/jeLDogaZiyWYlobm+nt3TDQAUGpgEqKD6CPxNN
// SIG // ZgvAs0314Y9/HG8VfUWnduVAKmWjw11SYobDHWM2l4bf
// SIG // 2vP48hahmifhzaWX0O5dY0HjWwechz4GdwbRBrF1HxS+
// SIG // YWG18NzGGwS+30HHDiju3mUv7Jf2oVyW2ADWoUa9WfOX
// SIG // pQlLSBCZgB/QACnFsZulP0V3HjXG0qKin3p6IvpIlR+r
// SIG // +0cjgPWe+L9rt0uX4ut1eBrs6jeZeRhL/9azI2h15q/6
// SIG // /IvrC4DqaTuv/DDtBEyO3991bWORPdGdVk5Pv4BXIqF4
// SIG // ETIheu9BCrE/+6jMpF3BoYibV3FWTkhFwELJm3ZbCoBI
// SIG // a/15n8G9bW1qyVJzEw16UM0xghoKMIIaBgIBATCBlTB+
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3Rv
// SIG // bjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMSgwJgYDVQQDEx9NaWNy
// SIG // b3NvZnQgQ29kZSBTaWduaW5nIFBDQSAyMDExAhMzAAAD
// SIG // rzBADkyjTQVBAAAAAAOvMA0GCWCGSAFlAwQCAQUAoIGu
// SIG // MBkGCSqGSIb3DQEJAzEMBgorBgEEAYI3AgEEMBwGCisG
// SIG // AQQBgjcCAQsxDjAMBgorBgEEAYI3AgEVMC8GCSqGSIb3
// SIG // DQEJBDEiBCCfOaRb5Nib4pxXNIzEs9SyhYSacu8VnCka
// SIG // z/w9SpECcDBCBgorBgEEAYI3AgEMMTQwMqAUgBIATQBp
// SIG // AGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBAB6D10ON
// SIG // n93mFq09eolMQNlJT4BbjZh+3jdMB1mYSuWTi5zY5Nm3
// SIG // LWms+keTfdliWJfXqXR6j4MPGzoLwA0JaQh/mJcPJaJ7
// SIG // Bb+1OoUovXT8axYnfmaarQG84PR4qDV0eeCjh7ye9G69
// SIG // bfSouI+mHd1y9i1fhHOvwQBopxS1tAIt1WYfXnT7trz+
// SIG // Wj9JdU6satepXX0J0Ms1tHyaHZmbcZbc6eauYPA6PpIn
// SIG // s+EFFmH8iNfyc6vSPdvsyJg9bB8JHJdE/4rnkiB0Jl2s
// SIG // 8aiDUJp/JZM2LP9VZhoepkAA9tq8s6Fcsn23ZA8hZkcG
// SIG // a7inGFm/1MRQpELUHLzoaGh5z3WhgheUMIIXkAYKKwYB
// SIG // BAGCNwMDATGCF4Awghd8BgkqhkiG9w0BBwKgghdtMIIX
// SIG // aQIBAzEPMA0GCWCGSAFlAwQCAQUAMIIBUgYLKoZIhvcN
// SIG // AQkQAQSgggFBBIIBPTCCATkCAQEGCisGAQQBhFkKAwEw
// SIG // MTANBglghkgBZQMEAgEFAAQgoRxsnDe0m1H4cEMGUy0T
// SIG // BFieDlMzyeKnDgKgd14HhEUCBmVo22heDBgTMjAyMzEy
// SIG // MTIxOTAzMzcuOTUzWjAEgAIB9KCB0aSBzjCByzELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjElMCMGA1UECxMcTWljcm9zb2Z0
// SIG // IEFtZXJpY2EgT3BlcmF0aW9uczEnMCUGA1UECxMeblNo
// SIG // aWVsZCBUU1MgRVNOOkYwMDItMDVFMC1EOTQ3MSUwIwYD
// SIG // VQQDExxNaWNyb3NvZnQgVGltZS1TdGFtcCBTZXJ2aWNl
// SIG // oIIR6jCCByAwggUIoAMCAQICEzMAAAHODxj3RZfnxv8A
// SIG // AQAAAc4wDQYJKoZIhvcNAQELBQAwfDELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgUENBIDIwMTAwHhcNMjMwNTI1MTkxMjA4WhcN
// SIG // MjQwMjAxMTkxMjA4WjCByzELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjElMCMGA1UECxMcTWljcm9zb2Z0IEFtZXJpY2EgT3Bl
// SIG // cmF0aW9uczEnMCUGA1UECxMeblNoaWVsZCBUU1MgRVNO
// SIG // OkYwMDItMDVFMC1EOTQ3MSUwIwYDVQQDExxNaWNyb3Nv
// SIG // ZnQgVGltZS1TdGFtcCBTZXJ2aWNlMIICIjANBgkqhkiG
// SIG // 9w0BAQEFAAOCAg8AMIICCgKCAgEAuQpMGdco2Md35yk8
// SIG // P1Z88BhoSjiI6jA0rh3RoPCaCdizdpwVFJAMMYWAEeGU
// SIG // FoPUG48Wfw1qw9sXlMC5yjijQzbYV/b2io/l+QrcYuoq
// SIG // E1VO1AeaEOMBqZFdpJn56dEWBnYbXOfAGqFGRXL4XQZS
// SIG // dshE8LgrhFeqZOCe4IRsprM69B1akfQdjCY1fK3jy/hx
// SIG // iMyG2C65NI1pmikUT7BX8SisN54xYBZUqmgQOElbldBW
// SIG // BP+LdGfVI11Dy6sPog3i1L97Kd4fTOKDSGdtelT5VZX9
// SIG // xThUS5WYPHgnl+MZWgY1omveZ15VzF0FqmiMJIDeE7Ec
// SIG // 8poHlrlczKUTwVpOoDo88cF54yHFqsdZT85yEr/8bZ9R
// SIG // 6QfgiBeUjypAn/JQj4mdRLQdNRcx0Y/mIUViY7EZdYC1
// SIG // tYtBC661lQBawz6yLIQSqM+klAMig+8j8euPUsixgaP7
// SIG // yR8WYDJWIq3JH/XpJaazQ3qLJYa3iGMwCazCfmKFp/Q8
// SIG // ZoP+4Rgv1x/HpY5iagS6shwpnYEvlgK4/OHIkRrJqkWl
// SIG // Af+IRRlJC79RmtrxD7VQclJox3AKaSUdTzpotQE1fRbr
// SIG // DkEMZA9p11kilnygKQ+7RnzWTEb5LnxxcBn+TZzdAIpt
// SIG // JYwYNTuYLONxaJP7kntds0C9IUj/SX/ogi/jT0zwDyTx
// SIG // LG3WGr0CAwEAAaOCAUkwggFFMB0GA1UdDgQWBBQw+whG
// SIG // QKOTDI6ZfhVk7FMp+eKFxTAfBgNVHSMEGDAWgBSfpxVd
// SIG // AF5iXYP05dJlpxtTNRnpcjBfBgNVHR8EWDBWMFSgUqBQ
// SIG // hk5odHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3Bz
// SIG // L2NybC9NaWNyb3NvZnQlMjBUaW1lLVN0YW1wJTIwUENB
// SIG // JTIwMjAxMCgxKS5jcmwwbAYIKwYBBQUHAQEEYDBeMFwG
// SIG // CCsGAQUFBzAChlBodHRwOi8vd3d3Lm1pY3Jvc29mdC5j
// SIG // b20vcGtpb3BzL2NlcnRzL01pY3Jvc29mdCUyMFRpbWUt
// SIG // U3RhbXAlMjBQQ0ElMjAyMDEwKDEpLmNydDAMBgNVHRMB
// SIG // Af8EAjAAMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMIMA4G
// SIG // A1UdDwEB/wQEAwIHgDANBgkqhkiG9w0BAQsFAAOCAgEA
// SIG // lyAWFv9FFUww2Tv30Nl7LTQuA2RvET265WR8hbee8/1V
// SIG // qj7req7oGshltVHLybsX/ERLYk7Zn+UkOTdqbtJ05eju
// SIG // AbUnCLzPyvKXv8o++8fLur35PEOkgzmaBaSKVZBR98uu
// SIG // 4rH+P0n6DfTNpy2/d6aPzrZTPQHFkyW6rp8wvpJni3MS
// SIG // ZgsS3LIgTCemU70jVkJ4nIDLr+zxdIqfR2I8xVqDavKp
// SIG // 67O4PvmBj11O3qZdSkgU6/VEex5/5DXKgomX9tg4aGT1
// SIG // T+/r2R02Pjl6MaBBDp8wGwJQQrqf8G1zSYrLIivGckSV
// SIG // 0/0eBVZhNtgkr6bvqeTHkZQU+NqZCIYTJal5bHUHU/XF
// SIG // iLYlvMlkaWhNWSNZsvRVvCTPQ7QkLYt2bhh0jab5uEAG
// SIG // P+ta8qyqJeES3+RfkgJeKM1bzPDyjHkXRJqNsDs2SuDB
// SIG // Ow+4h8y3GKebnMNJILMt/en2nM7F3Zy0qJlzAK7LRpB7
// SIG // 7fxd4atnhEkNj4K1/oKXQaPLj1dessJp6QMGKjHWTPsh
// SIG // +gf/+DLFxLt0YOUDqDlnYzVQe0JujDyYPrw1+fV7zJom
// SIG // wM26ZcSMqe0tZMuy/oN4auisZSkPWm1I2KWjhZx7SgxS
// SIG // fr8c53BDFRFdyB0HYwu7q6jgYDu78qXiMI0OvPartjTb
// SIG // iEOnGWYDJ/BL0klkcAxvIIkwggdxMIIFWaADAgECAhMz
// SIG // AAAAFcXna54Cm0mZAAAAAAAVMA0GCSqGSIb3DQEBCwUA
// SIG // MIGIMQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
// SIG // Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
// SIG // TWljcm9zb2Z0IENvcnBvcmF0aW9uMTIwMAYDVQQDEylN
// SIG // aWNyb3NvZnQgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRob3Jp
// SIG // dHkgMjAxMDAeFw0yMTA5MzAxODIyMjVaFw0zMDA5MzAx
// SIG // ODMyMjVaMHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpX
// SIG // YXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYD
// SIG // VQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNV
// SIG // BAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEw
// SIG // MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA
// SIG // 5OGmTOe0ciELeaLL1yR5vQ7VgtP97pwHB9KpbE51yMo1
// SIG // V/YBf2xK4OK9uT4XYDP/XE/HZveVU3Fa4n5KWv64NmeF
// SIG // RiMMtY0Tz3cywBAY6GB9alKDRLemjkZrBxTzxXb1hlDc
// SIG // wUTIcVxRMTegCjhuje3XD9gmU3w5YQJ6xKr9cmmvHaus
// SIG // 9ja+NSZk2pg7uhp7M62AW36MEBydUv626GIl3GoPz130
// SIG // /o5Tz9bshVZN7928jaTjkY+yOSxRnOlwaQ3KNi1wjjHI
// SIG // NSi947SHJMPgyY9+tVSP3PoFVZhtaDuaRr3tpK56KTes
// SIG // y+uDRedGbsoy1cCGMFxPLOJiss254o2I5JasAUq7vnGp
// SIG // F1tnYN74kpEeHT39IM9zfUGaRnXNxF803RKJ1v2lIH1+
// SIG // /NmeRd+2ci/bfV+AutuqfjbsNkz2K26oElHovwUDo9Fz
// SIG // pk03dJQcNIIP8BDyt0cY7afomXw/TNuvXsLz1dhzPUNO
// SIG // wTM5TI4CvEJoLhDqhFFG4tG9ahhaYQFzymeiXtcodgLi
// SIG // Mxhy16cg8ML6EgrXY28MyTZki1ugpoMhXV8wdJGUlNi5
// SIG // UPkLiWHzNgY1GIRH29wb0f2y1BzFa/ZcUlFdEtsluq9Q
// SIG // BXpsxREdcu+N+VLEhReTwDwV2xo3xwgVGD94q0W29R6H
// SIG // XtqPnhZyacaue7e3PmriLq0CAwEAAaOCAd0wggHZMBIG
// SIG // CSsGAQQBgjcVAQQFAgMBAAEwIwYJKwYBBAGCNxUCBBYE
// SIG // FCqnUv5kxJq+gpE8RjUpzxD/LwTuMB0GA1UdDgQWBBSf
// SIG // pxVdAF5iXYP05dJlpxtTNRnpcjBcBgNVHSAEVTBTMFEG
// SIG // DCsGAQQBgjdMg30BATBBMD8GCCsGAQUFBwIBFjNodHRw
// SIG // Oi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3BzL0RvY3Mv
// SIG // UmVwb3NpdG9yeS5odG0wEwYDVR0lBAwwCgYIKwYBBQUH
// SIG // AwgwGQYJKwYBBAGCNxQCBAweCgBTAHUAYgBDAEEwCwYD
// SIG // VR0PBAQDAgGGMA8GA1UdEwEB/wQFMAMBAf8wHwYDVR0j
// SIG // BBgwFoAU1fZWy4/oolxiaNE9lJBb186aGMQwVgYDVR0f
// SIG // BE8wTTBLoEmgR4ZFaHR0cDovL2NybC5taWNyb3NvZnQu
// SIG // Y29tL3BraS9jcmwvcHJvZHVjdHMvTWljUm9vQ2VyQXV0
// SIG // XzIwMTAtMDYtMjMuY3JsMFoGCCsGAQUFBwEBBE4wTDBK
// SIG // BggrBgEFBQcwAoY+aHR0cDovL3d3dy5taWNyb3NvZnQu
// SIG // Y29tL3BraS9jZXJ0cy9NaWNSb29DZXJBdXRfMjAxMC0w
// SIG // Ni0yMy5jcnQwDQYJKoZIhvcNAQELBQADggIBAJ1Vffwq
// SIG // reEsH2cBMSRb4Z5yS/ypb+pcFLY+TkdkeLEGk5c9MTO1
// SIG // OdfCcTY/2mRsfNB1OW27DzHkwo/7bNGhlBgi7ulmZzpT
// SIG // Td2YurYeeNg2LpypglYAA7AFvonoaeC6Ce5732pvvinL
// SIG // btg/SHUB2RjebYIM9W0jVOR4U3UkV7ndn/OOPcbzaN9l
// SIG // 9qRWqveVtihVJ9AkvUCgvxm2EhIRXT0n4ECWOKz3+SmJ
// SIG // w7wXsFSFQrP8DJ6LGYnn8AtqgcKBGUIZUnWKNsIdw2Fz
// SIG // Lixre24/LAl4FOmRsqlb30mjdAy87JGA0j3mSj5mO0+7
// SIG // hvoyGtmW9I/2kQH2zsZ0/fZMcm8Qq3UwxTSwethQ/gpY
// SIG // 3UA8x1RtnWN0SCyxTkctwRQEcb9k+SS+c23Kjgm9swFX
// SIG // SVRk2XPXfx5bRAGOWhmRaw2fpCjcZxkoJLo4S5pu+yFU
// SIG // a2pFEUep8beuyOiJXk+d0tBMdrVXVAmxaQFEfnyhYWxz
// SIG // /gq77EFmPWn9y8FBSX5+k77L+DvktxW/tM4+pTFRhLy/
// SIG // AsGConsXHRWJjXD+57XQKBqJC4822rpM+Zv/Cuk0+CQ1
// SIG // ZyvgDbjmjJnW4SLq8CdCPSWU5nR0W2rRnj7tfqAxM328
// SIG // y+l7vzhwRNGQ8cirOoo6CGJ/2XBjU02N7oJtpQUQwXEG
// SIG // ahC0HVUzWLOhcGbyoYIDTTCCAjUCAQEwgfmhgdGkgc4w
// SIG // gcsxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5n
// SIG // dG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVN
// SIG // aWNyb3NvZnQgQ29ycG9yYXRpb24xJTAjBgNVBAsTHE1p
// SIG // Y3Jvc29mdCBBbWVyaWNhIE9wZXJhdGlvbnMxJzAlBgNV
// SIG // BAsTHm5TaGllbGQgVFNTIEVTTjpGMDAyLTA1RTAtRDk0
// SIG // NzElMCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAg
// SIG // U2VydmljZaIjCgEBMAcGBSsOAwIaAxUAXY2VGxTQMgpF
// SIG // ROg3VVsos02EB8yggYMwgYCkfjB8MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1T
// SIG // dGFtcCBQQ0EgMjAxMDANBgkqhkiG9w0BAQsFAAIFAOkj
// SIG // K6EwIhgPMjAyMzEyMTIxODU3MzdaGA8yMDIzMTIxMzE4
// SIG // NTczN1owdDA6BgorBgEEAYRZCgQBMSwwKjAKAgUA6SMr
// SIG // oQIBADAHAgEAAgIlozAHAgEAAgITbzAKAgUA6SR9IQIB
// SIG // ADA2BgorBgEEAYRZCgQCMSgwJjAMBgorBgEEAYRZCgMC
// SIG // oAowCAIBAAIDB6EgoQowCAIBAAIDAYagMA0GCSqGSIb3
// SIG // DQEBCwUAA4IBAQCUZh1cUb4OQzpDceZ7UMNxfjj7KenH
// SIG // Fwj0ePj/nGctDQxDTfhvvDCkyLSbCFQVlj/I/NSTxHXW
// SIG // xd74n96U+/tAf1EbmcvcRslTo23qclgqz1vBqukRjuMn
// SIG // gLJO/n6CpPyHha96cIFRjXIhh9bPcaIxHrv5X0f1gFcZ
// SIG // 3C7ytiXk1oeqdkSv8scyZxTe018te9nbb/tSbeVkvHq+
// SIG // yo+qPBKJFKI5xzbGynMKcviSEikhux/ZdkpiIck4sII+
// SIG // seWG3pGFV9jiyqAuU45uEOeb+PV3gWYKM8mdlfBL6oF/
// SIG // 9rvrYKkNThcrlfL7LB47+fIx5hsqcALEobHXnRKfpUd1
// SIG // m5eBMYIEDTCCBAkCAQEwgZMwfDELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUtU3Rh
// SIG // bXAgUENBIDIwMTACEzMAAAHODxj3RZfnxv8AAQAAAc4w
// SIG // DQYJYIZIAWUDBAIBBQCgggFKMBoGCSqGSIb3DQEJAzEN
// SIG // BgsqhkiG9w0BCRABBDAvBgkqhkiG9w0BCQQxIgQgEVEd
// SIG // mPMLrGwfTpXsxS3dcG4dqdHX1lWNDIay0K8kNb0wgfoG
// SIG // CyqGSIb3DQEJEAIvMYHqMIHnMIHkMIG9BCAybM9Bei9F
// SIG // w1JudyUQXzTGbMyrJZSwzImhWdzy/y6sZzCBmDCBgKR+
// SIG // MHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5n
// SIG // dG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVN
// SIG // aWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMTHU1p
// SIG // Y3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEwAhMzAAAB
// SIG // zg8Y90WX58b/AAEAAAHOMCIEIBq++iPx9KhbCAe6VRSh
// SIG // Sfsqyb9VWVujfjWATws2kwOqMA0GCSqGSIb3DQEBCwUA
// SIG // BIICAIR1U+VKMFLMN7XDsPOCfFrMwW2P7jxksGHKmYGS
// SIG // lVet+c+hPpGe9qJZ6Gg9E5a52cihYZWsNEmaTDpjyyvg
// SIG // UnKAMlST2IAsP4XALCH74+yG5CW8u0e0som7ikTeBkvg
// SIG // FwKih4GNcrKaaFzAYJe9RUpscfFqEfBBzjPsMmAi6A5E
// SIG // gYQqsD6N1zOLD00wFXuYpIzHaS+MnuNM9deTEvXOfNXe
// SIG // SmO59bH0Ft7JNRVCFA47nwQe53XjAhsGSg21o91wibGx
// SIG // CYOCrQAaf7CjE+FNT4ZIGPonXT9dfRYx29GPIvRUgwrc
// SIG // LKbFI20faHIfEtROMYu+jLUVglV7bz5Tyyn90LFptPDD
// SIG // bukYajcRAAZBnl9jm21J0FYyOpldPDyI1fdn5PmTF1je
// SIG // PC3JjUxv6h5AGEnzn7S16aaK+vaSxtMdyPeQ7EgTV/kO
// SIG // g2WfsAQhaykDimseSnlbfaMHEMUby1y88z5ThQfd1h31
// SIG // wTWZrkDAJqE2/AFB32I3GtHnFEk2eP733vHs4HtVQlV2
// SIG // BCN/u1T8tEOKX6XgdFdWiWI2s7H1Oc+VT5lSWN0Co5Ah
// SIG // X1sUi+poVfL1VzeY5YFSUPZ4crmkaGlEpSZ4T2JoZvVi
// SIG // GI/3W7fkqvKkwGKLd1lRb2KcEymyIoh5Q2CLPASizSTD
// SIG // mfJPrV4lQEivaz+Z2BdtwiuTHurw
// SIG // End signature block
