// @ts-check
"use strict";
const fs = require('fs');
const os = require('os');
const path = require('path');
const { fork } = require("child_process");

process.env.VSTESTADAPTERPATH = __dirname;

const vsKarmaConfigFilePath = path.resolve(__dirname, "./karmaConfig.js");

function getTestProjects(configFile) {
    const configDirPath = path.dirname(configFile);

    const angularProjects = [];
    const angularConfig = require(configFile);
    for (const projectName of Object.keys(angularConfig.projects)) {
        const project = angularConfig.projects[projectName];

        const karmaConfigFilePath = project.architect.test
            && project.architect.test.options
            && project.architect.test.options.karmaConfig
            && path.resolve(configDirPath, project.architect.test.options.karmaConfig);

        if (karmaConfigFilePath) {
            angularProjects.push({
                angularConfigDirPath: configDirPath,
                karmaConfigFilePath,
                name: projectName,
                rootPath: path.join(configDirPath, project.root),
            });
        }
    }

    return angularProjects;
}

const find_tests = async function (configFiles, discoverResultFile) {
    const projects = [];

    for (const configFile of configFiles.split(';')) {
        const configDirPath = path.dirname(configFile);

        if (!detectPackage(configDirPath, '@angular/cli')) {
            continue;
        }

        projects.push(...getTestProjects(configFile));
    }

    process.env.TESTCASES = JSON.stringify([{ fullTitle: "NTVS_Discovery_ThisStringShouldExcludeAllTestCases" }]);
    process.env.ISDISCOVERY = 'true';

    const testsDiscovered = [];

    for (const project of projects) {
        // Loop each project one by one. I'm not sure why multiple instances gets locked. We do receive an Angular warning
        // on a lock file for building the project, that might be the reason.
        await new Promise((resolve, reject) => {
            const ngTest = fork(
                path.resolve(project.angularConfigDirPath, "./node_modules/@angular/cli/bin/ng"),
                [
                    'test',
                    project.name,
                    `--karma-config=${vsKarmaConfigFilePath}`,
                    '--progress=false'
                ],
                {
                    env: {
                        ...process.env,
                        PROJECT: JSON.stringify(project)
                    },
                    cwd: project.angularConfigDirPath,
                }).on('message', message => {
                    testsDiscovered.push(message);

                    // We need to keep track and communicate when we have received a testcase because the IPC channel
                    // does not guarantees that we'll receive the event on the order it has been emitted.
                    // Send to the child process as simple signal that we have parsed the testcase.
                    ngTest.send({});
                }).on('error', err => {
                    reject(err);
                }).on('exit', code => {
                    resolve(code);
                });
        });
    }

    // Save tests to file.
    const fd = fs.openSync(discoverResultFile, 'w');
    fs.writeSync(fd, JSON.stringify(testsDiscovered));
    fs.closeSync(fd);
}

const run_tests = async function (context) {
    for (const testCase of context.testCases) {
        context.post({
            type: 'test start',
            fullyQualifiedName: testCase.fullyQualifiedName
        });
    }

    // Get all the projects
    const projects = [];
    const angularConfigDirectories = new Set();
    for (let testCase of context.testCases) {
        if (!angularConfigDirectories.has(testCase.configDirPath)) {
            angularConfigDirectories.add(testCase.configDirPath);

            if (!detectPackage(testCase.configDirPath, '@angular/cli')) {
                continue;
            }

            projects.push(...getTestProjects(`${testCase.configDirPath}/angular.json`));
        }
    }

    // Set the environment variable to share it across processes.
    process.env.TESTCASES = JSON.stringify(context.testCases);

    for (const project of projects) {
        // Loop each project one by one. I'm not sure why multiple instances gets locked. We do receive an Angular warning
        // on a lock file for building the project, that might be the reason.
        await new Promise((resolve, reject) => {
            const ngTest = fork(
                path.resolve(project.angularConfigDirPath, "./node_modules/@angular/cli/bin/ng"),
                [
                    'test',
                    project.name,
                    `--karma-config=${vsKarmaConfigFilePath}`
                ],
                {
                    env: {
                        ...process.env,
                        PROJECT: JSON.stringify(project)
                    },
                    cwd: project.angularConfigDirPath,
                    stdio: ['ignore', 1, 2, 'ipc'] // We need to ignore the stdin as NTVS keeps it open and causes the process to wait indefinitely.
                }).on('message', message => {
                    context.post({
                        type: message.pending ? 'pending' : 'result',
                        fullyQualifiedName: context.getFullyQualifiedName(message.fullName),
                        result: message
                    });

                    ngTest.send({});
                }).on('exit', code => {
                    resolve(code);
                }).on('error', err => {
                    reject(err);
                });
        });
    }

    context.post({
        type: 'end'
    });
}

function detectPackage(projectFolder, packageName) {
    const packagePath = path.join(projectFolder, 'node_modules', packageName);

    if (!fs.existsSync(packagePath)) {
        logError(
            `Failed to find "${packageName}" package. "${packageName}" must be installed in the project locally.` + os.EOL +
            `Install "${packageName}" locally using the npm manager via solution explorer` + os.EOL +
            `or with ".npm install ${packageName} --save-dev" via the Node.js interactive window.`);

        return false;
    }

    return true;
}

function logError() {
    var errorArgs = Array.from(arguments);
    errorArgs.unshift("NTVS_ERROR:");
    console.error.apply(console, errorArgs);
}

module.exports.find_tests = find_tests;
module.exports.run_tests = run_tests;
// SIG // Begin signature block
// SIG // MIIoKwYJKoZIhvcNAQcCoIIoHDCCKBgCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // 0N4rnUDws5t5+vVuhOQwwKAWBYrLeRcYXPAvkgGLPCKg
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
// SIG // a/15n8G9bW1qyVJzEw16UM0xghoNMIIaCQIBATCBlTB+
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3Rv
// SIG // bjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMSgwJgYDVQQDEx9NaWNy
// SIG // b3NvZnQgQ29kZSBTaWduaW5nIFBDQSAyMDExAhMzAAAD
// SIG // rzBADkyjTQVBAAAAAAOvMA0GCWCGSAFlAwQCAQUAoIGu
// SIG // MBkGCSqGSIb3DQEJAzEMBgorBgEEAYI3AgEEMBwGCisG
// SIG // AQQBgjcCAQsxDjAMBgorBgEEAYI3AgEVMC8GCSqGSIb3
// SIG // DQEJBDEiBCAX77pC/1+KpOe7YLHWXEG1izjKWi3324hp
// SIG // RKOSt5sUljBCBgorBgEEAYI3AgEMMTQwMqAUgBIATQBp
// SIG // AGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBALLqjrZe
// SIG // QeWFtfJp8f4J/4dZvDQsO/blm03zeuPIDXQY4RQ6jaGv
// SIG // 6yQnCWS2KEFjV4zvuX97WyAYQkqLzOfSMul1Payq/mEA
// SIG // jHxcFRbkrbt9EFTTXzNx2jTqKoAr+/ZiKecFbxACIQqI
// SIG // w0vhqIEMKLr0aBdsSzywtQgIhPdbEkzrEE2njZwQ10c5
// SIG // LVcEqMPXSBEbhWa9ZTYalrgfE8rZjVVeJ1iB/KlIpWcW
// SIG // OihLVcNIvfk9LM0dPWswhwpV2HFNgHp+DC37gFZl96BZ
// SIG // zey0uRmf7lAj/wyboKumueGn0eortHUJ763OBjHN3lwc
// SIG // ltH/qaSKgY9FP8qaoZScdOjFiqOhgheXMIIXkwYKKwYB
// SIG // BAGCNwMDATGCF4Mwghd/BgkqhkiG9w0BBwKgghdwMIIX
// SIG // bAIBAzEPMA0GCWCGSAFlAwQCAQUAMIIBUgYLKoZIhvcN
// SIG // AQkQAQSgggFBBIIBPTCCATkCAQEGCisGAQQBhFkKAwEw
// SIG // MTANBglghkgBZQMEAgEFAAQgkBMlVkP+amfvqoFZ3vKL
// SIG // R56VfiZNrtPhCW5V9rpelJ0CBmV66UOkKhgTMjAyMzEy
// SIG // MTkwOTEyMzEuOTgxWjAEgAIB9KCB0aSBzjCByzELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjElMCMGA1UECxMcTWljcm9zb2Z0
// SIG // IEFtZXJpY2EgT3BlcmF0aW9uczEnMCUGA1UECxMeblNo
// SIG // aWVsZCBUU1MgRVNOOkE5MzUtMDNFMC1EOTQ3MSUwIwYD
// SIG // VQQDExxNaWNyb3NvZnQgVGltZS1TdGFtcCBTZXJ2aWNl
// SIG // oIIR7TCCByAwggUIoAMCAQICEzMAAAHRsltAKGwu0kUA
// SIG // AQAAAdEwDQYJKoZIhvcNAQELBQAwfDELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgUENBIDIwMTAwHhcNMjMwNTI1MTkxMjE4WhcN
// SIG // MjQwMjAxMTkxMjE4WjCByzELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjElMCMGA1UECxMcTWljcm9zb2Z0IEFtZXJpY2EgT3Bl
// SIG // cmF0aW9uczEnMCUGA1UECxMeblNoaWVsZCBUU1MgRVNO
// SIG // OkE5MzUtMDNFMC1EOTQ3MSUwIwYDVQQDExxNaWNyb3Nv
// SIG // ZnQgVGltZS1TdGFtcCBTZXJ2aWNlMIICIjANBgkqhkiG
// SIG // 9w0BAQEFAAOCAg8AMIICCgKCAgEAmUzaNDnhs9lxXdoC
// SIG // 4OZ05QZvFzqbsCSIl7DFOta8KtWSg6WuON0a0hv6R/Bs
// SIG // +lzZxUChpwqjQrZr6ClCwKcK0/7O/3tV9JTRSpo+1O1+
// SIG // KdNEtLkG1ui8Ep/81h2htnOeGV7BmPgWH4Vg4GxaQk8U
// SIG // c050Qhutm5Fj6emR22T4OB7dQkQgDIYThk0fMCOBu8MF
// SIG // mcHTHOlL1FJatKpfQMQH85GEaYtrUbwxzHZmd78l6aoR
// SIG // cL0RvHIAh/00wo1uaumjW3aii9wRQz81LbgjbD1y9/xN
// SIG // HUdmwzKmtGjR/oiH4RguP73MLrXjjAj1CA1UqgwjXyGj
// SIG // wxMGHItX3fYLtc1cPhxIQ2TOxGt58SFK87fkX6eU6DDI
// SIG // +EAJielGnZvkz2w26PJBSCu9EoZlvMJ/HyZPUXkEBKU7
// SIG // SDeN3kb/UJl8t1HnfNKLDgRPlpHTL0ghYfqoArCnc0MU
// SIG // CRutnE3qFNnqjYR96KaV5sn1VMG7Hn0MzD7W4pwmXdBV
// SIG // JZpTP3R/uDp4qkMmh767WMt8KiGn2N83hSE5VQKD/avb
// SIG // xeFuyh0f7hdJr06QC+TWkwzdaZUEtDHYzJIM2SuYLcKj
// SIG // nv9605agc8cGu2GKd7qz+clpE8yEhp4TViGTsTskCDsW
// SIG // X24iGwB25tzPIY+9ykFnAkeSWr4JMFJp3BRxEmkH+A66
// SIG // rPv9S9UCAwEAAaOCAUkwggFFMB0GA1UdDgQWBBQLjvFM
// SIG // xew3B9JprBeF0McR0L0tozAfBgNVHSMEGDAWgBSfpxVd
// SIG // AF5iXYP05dJlpxtTNRnpcjBfBgNVHR8EWDBWMFSgUqBQ
// SIG // hk5odHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3Bz
// SIG // L2NybC9NaWNyb3NvZnQlMjBUaW1lLVN0YW1wJTIwUENB
// SIG // JTIwMjAxMCgxKS5jcmwwbAYIKwYBBQUHAQEEYDBeMFwG
// SIG // CCsGAQUFBzAChlBodHRwOi8vd3d3Lm1pY3Jvc29mdC5j
// SIG // b20vcGtpb3BzL2NlcnRzL01pY3Jvc29mdCUyMFRpbWUt
// SIG // U3RhbXAlMjBQQ0ElMjAyMDEwKDEpLmNydDAMBgNVHRMB
// SIG // Af8EAjAAMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMIMA4G
// SIG // A1UdDwEB/wQEAwIHgDANBgkqhkiG9w0BAQsFAAOCAgEA
// SIG // m7va0wB1duJmNKqBuXhJyJs+WpBl074gcCqdmOdbNusP
// SIG // KA61qK/ptNEeP9wXA5mJVCvDa8f2rmBWInWXXXFI8ONk
// SIG // MUkrZr/6lpwkIv9jpx99ilR0PpDDmTwAUExtV5HJ2D1D
// SIG // jhBKK+n/9ybNbo+MIx8xOFeGrpmFwQLK+C+SkfLynrOb
// SIG // RcYTJFjQ/zu1v0Wh2MCTIzJMVaLAaJO1dtbCQJcUnBF8
// SIG // XyWvv6pKlK+wmYMN0eIwh0ZD6kITFom1zzGGq/4hdGbi
// SIG // wfTvPQzCTYYyvQUn+oqoGaDLsyFbfhAaE86b//aeMEOs
// SIG // aAQrNvZpI/xCFhXXPuWt9JLgkDkhDo9O/liNvQOJOkCE
// SIG // QecPnjJmdCXnNLEsnkAeSo8ROdYmDIbZTK1CnK9Opwag
// SIG // rEij2LEgCEwM4LLCQ/mf3E0uwrt+Xya1oTPTWF9uLgMW
// SIG // CwFtIqTbVqbSHlempLmRHhFegTbTN1U5PpgJVef3gv9G
// SIG // Ne2lUoyuf4Mg6CzZq4FcL+UwGgZqv8IEURR5lvVCd87/
// SIG // C5pOpiKAMk6agW7lIzC8q7Wo7krAP5tg5yjDtEIs9b/h
// SIG // UlW6jN/Cfz05YQk1GxTsdJC0+2P+/mcq4pVQs8gGHxSI
// SIG // pwyI1pTPObQ3lPGXyQoxSsKtw7EcVeCWNfMcMPE05qHd
// SIG // 5ZK/TahkOeC5sj1XPuYmza4wggdxMIIFWaADAgECAhMz
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
// SIG // ahC0HVUzWLOhcGbyoYIDUDCCAjgCAQEwgfmhgdGkgc4w
// SIG // gcsxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5n
// SIG // dG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVN
// SIG // aWNyb3NvZnQgQ29ycG9yYXRpb24xJTAjBgNVBAsTHE1p
// SIG // Y3Jvc29mdCBBbWVyaWNhIE9wZXJhdGlvbnMxJzAlBgNV
// SIG // BAsTHm5TaGllbGQgVFNTIEVTTjpBOTM1LTAzRTAtRDk0
// SIG // NzElMCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAg
// SIG // U2VydmljZaIjCgEBMAcGBSsOAwIaAxUARyWNhb/hoS0L
// SIG // UQ0dryMwWkr/+yyggYMwgYCkfjB8MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1T
// SIG // dGFtcCBQQ0EgMjAxMDANBgkqhkiG9w0BAQsFAAIFAOkr
// SIG // VnAwIhgPMjAyMzEyMTgyMzM4MjRaGA8yMDIzMTIxOTIz
// SIG // MzgyNFowdzA9BgorBgEEAYRZCgQBMS8wLTAKAgUA6StW
// SIG // cAIBADAKAgEAAgIMjwIB/zAHAgEAAgIThjAKAgUA6Syn
// SIG // 8AIBADA2BgorBgEEAYRZCgQCMSgwJjAMBgorBgEEAYRZ
// SIG // CgMCoAowCAIBAAIDB6EgoQowCAIBAAIDAYagMA0GCSqG
// SIG // SIb3DQEBCwUAA4IBAQBn0yx6uwMXJTTFkiGvMHPaLFUX
// SIG // ys6X0Q9VxBIVDHmNW+xs6CborQQtYTp3Q3qeG98k4HJs
// SIG // 0vGBonv2xAxOHP8/Ew18dC3lD9vVXobaRDyjQWQrc39P
// SIG // Wy4XJCJOkARNeL3FE8osdUqScgXWge14W/ZhuG9VPbh8
// SIG // SFwByPVWj9NtyIG+2d98O5x5RJWjR2nd5l8v9UIxBzi7
// SIG // joEsSFiAeqVTVPRc6JBZxiB0rjDRZeOOI1wSFSHHi+C7
// SIG // HZXKMaBejGJsnqg+qA2wMFytGVJ/iWsO1P6EmGo5voOm
// SIG // PCnVRrX3Pj+HFGZmld/tT/GxeQXHJn2m0G4aPL01+66i
// SIG // ZvsyI7CzMYIEDTCCBAkCAQEwgZMwfDELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgUENBIDIwMTACEzMAAAHRsltAKGwu0kUAAQAA
// SIG // AdEwDQYJYIZIAWUDBAIBBQCgggFKMBoGCSqGSIb3DQEJ
// SIG // AzENBgsqhkiG9w0BCRABBDAvBgkqhkiG9w0BCQQxIgQg
// SIG // yz0HWqdW1yKAYHv+OR0b7PCMZhdnEWPlHFgDy2Ot9N8w
// SIG // gfoGCyqGSIb3DQEJEAIvMYHqMIHnMIHkMIG9BCDMvGF5
// SIG // AgC7+e3ObEYaz07m9auE8CeqFQN+pPCIiPwHDDCBmDCB
// SIG // gKR+MHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNo
// SIG // aW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQK
// SIG // ExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMT
// SIG // HU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEwAhMz
// SIG // AAAB0bJbQChsLtJFAAEAAAHRMCIEIEOrCpRbbi8upOPe
// SIG // aP7TkdPl8MnRMImV8sjgYeXC4uSJMA0GCSqGSIb3DQEB
// SIG // CwUABIICAAigzc3uiCXSlaEG3O3XnbkpFrMci7qL4Ugt
// SIG // QRH8N1zDDcYf/IP+yfVo5kWIZelU7mei3rQ4sFMquryR
// SIG // 6p8A3TYtsC/K6B+F50Xhan2Jck+DAvvnkZOOATkU5xYU
// SIG // bEUZVyk27KnEhVmpawqSonHJStbvDHdWJgLSl8ju4/nQ
// SIG // jEUXzk3Oyzr1gOiERjphadO++mzv3gQsVJeXSYXKIObk
// SIG // aG9xEhBql7ItWr9/STzM+OvyiI+HG9W7J/2z7sAXcYpB
// SIG // IIkPgNSH32KaBByRfCI+bbzx+b0X3tzS+L0JPHIxeVuK
// SIG // 0YSAI32Bb0BGGqLDA9ploR2J462MnE39feMq/AKJyktr
// SIG // alEdj++XwJgd8iRn15srbljzd1J2BqZ9EsoSwIPqHcz2
// SIG // RIa2f/c+ERR/0Sml+83mwWHEg9YDwqsYTg/33kd8LQ44
// SIG // akHav0A79VbqzykMpq+ACqOgDi3VdYrM/bhL3OfO+9XZ
// SIG // IdkkyY2uyd4SKVDA5LFWzsono/XX4xJBgJZUoD9UhGI9
// SIG // Ezx5JYppLLhop9BTRsWsaJr2FGH9LH5/ImV1nTZn95GW
// SIG // kYcZmNQ08v0GhBzKsPxSQG6gnLyZSXq92wg1BWTfzRQj
// SIG // 7kJnBKGcEucRLYpqppjNqGD+B6Ok7PRzq8ro0/X4zmKr
// SIG // e6D0Lq0J8kNvjK6MEXl7d7FLGLiMcxwg
// SIG // End signature block
