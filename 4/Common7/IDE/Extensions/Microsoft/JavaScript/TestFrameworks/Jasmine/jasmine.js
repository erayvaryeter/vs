// @ts-check
"use strict";

var EOL = require("os").EOL;
var fs = require("fs");
var path = require("path");

var defaultJasmineOptions = {};

function logError(...args) {
    var errorArgs = Array.prototype.slice.call(arguments);
    errorArgs.unshift("NTVS_ERROR:");
    console.error.apply(console, errorArgs);
}

function getJasmineOptionsPath(projectFolder) {
    return path.join(projectFolder, "test", "jasmine.json");
}

function detectJasmine(projectFolder) {
    try {
        var node_modulesFolder = path.join(projectFolder, "node_modules");
        var options = loadJsonOptions(getJasmineOptionsPath(projectFolder));
        if (options && options.path) {
            node_modulesFolder = path.resolve(projectFolder, options.path);
        }
        return require(path.join(node_modulesFolder, "jasmine"));
    }
    catch (ex) {
        logError('Failed to find Jasmine package. Jasmine must be installed in the project locally.' + EOL +
            'Install Jasmine locally using the npm manager via solution explorer' + EOL +
            'or with ".npm install jasmine --save-dev" via the Node.js interactive window.');
    }
    return null;
}

function loadJsonOptions(optionsPath) {
    if (fs.existsSync(optionsPath)) {
        return require(optionsPath);
    }
}

function loadJasmineOptions(projectFolder) {
    var options = loadJsonOptions(getJasmineOptionsPath(projectFolder));
    if (options && options.configFile) {
        var optionsPath = path.join(projectFolder, "test", options.configFile);
        options = loadJsonOptions(optionsPath);
    }
    return options;
}

function mergeOptions(target, source) {
    for (var opt in source) {
        target[opt] = source[opt];
    }
}

function getJasmineOptions(projectFolder) {
    var jasmineOptions = defaultJasmineOptions;
    try {
        var options = loadJasmineOptions(projectFolder);
        options && mergeOptions(jasmineOptions, options);
        options && console.log("Found jasmine.json file.");
    }
    catch (ex) {
        console.error("Failed to load Jasmine setting, using default settings.", ex);
    }
    console.log("Using Jasmine settings: ", jasmineOptions);
    return jasmineOptions;
}

function applyJasmineOptions(jasmineInstance, options) {
    if (options) {
        jasmineInstance.loadConfig(options);
    }
}

function initializeJasmine(Jasmine, projectFolder) {
    var instance = new Jasmine();
    applyJasmineOptions(instance, getJasmineOptions(projectFolder));
    return instance;
}

/**
 * @param {jasmine.Suite} suite
 * @param {object[]} testList
 * @param {string} testFile
 */
function enumerateSpecs(suite, testList, testFile) {
    suite.children.forEach((child) => {
        if (child instanceof jasmine.Suite) {
            enumerateSpecs(child, testList, testFile);
        } else {
            testList.push({
                name: child.description,
                suite: suite.description === "Jasmine__TopLevel__Suite" ? null : suite.getFullName(),
                filepath: testFile,
                line: 0,
                column: 0
            });
        }
    });
}

/**
 * @param {string} testFileList
 * @param {string} discoverResultFile
 * @param {string} projectFolder
 */
async function find_tests(testFileList, discoverResultFile, projectFolder) {
    var Jasmine = detectJasmine(projectFolder);
    if (!Jasmine) {
        return;
    }
    
    var jasmineInstance = initializeJasmine(Jasmine, projectFolder);
    setSpecFilter(jasmineInstance, _ => false);

    var testList = [];
    for (var testFile of testFileList.split(";")) {
        try {
            jasmineInstance.specDir = "";
            jasmineInstance.specFiles = [];

            // In Jasmine 4.0+ addSpecFiles has been deprecated in favor of addMatchingSpecFiles
            (jasmineInstance.addMatchingSpecFiles || jasmineInstance.addSpecFiles).apply(jasmineInstance, [[testFile]]);
            
            var p = jasmineInstance.loadSpecs();
            if (p instanceof Promise) {
                await p;
            }

            var topSuite = jasmineInstance.env.topSuite();
            // In Jasmine 4.0+ the Suite object is not top level anymore and is instead in the suite_ property
            if (topSuite && topSuite.suite_) {
                topSuite = topSuite.suite_;
            }
            
            enumerateSpecs(topSuite, testList, testFile);
        }
        catch (ex) {
            //we would like continue discover other files, so swallow, log and continue;
            console.error("Test discovery error:", ex, "in", testFile);
        }
    }

    var fd = fs.openSync(discoverResultFile, 'w');
    fs.writeSync(fd, JSON.stringify(testList));
    fs.closeSync(fd);
}

exports.find_tests = find_tests;

function createCustomReporter(context) {
    return {
        specStarted: (specResult) => {
            context.post({
                type: "test start",
                fullyQualifiedName: context.getFullyQualifiedName(specResult.fullName)
            });
        },
        specDone: (specResult) => {
            // TODO: Report the output of the test. Currently is only showing "F" for a regression.
            var type = "result";
            var result = {
                passed: specResult.status === "passed",
                pending: false
            };

            if (specResult.status === "disabled" || specResult.status === "pending") {
                type = "pending";
                result.pending = true;
            }
            context.post({
                type,
                result,
                fullyQualifiedName: context.getFullyQualifiedName(specResult.fullName)
            });
            context.clearOutputs();
        },
        jasmineDone: (suiteInfo) => {
            context.post({
                type: "end"
            });
        }
    };
}

function run_tests(context) {
    return new Promise(resolve => {
        var projectFolder = context.testCases[0].projectFolder;
        var Jasmine = detectJasmine(projectFolder);
        if (!Jasmine) {
            return resolve();
        }
        var testFileList = [];
        var testNameList = {};

        context.testCases.forEach((testCase) => {
            if (testFileList.indexOf(testCase.testFile) < 0) {
                testFileList.push(testCase.testFile);
            }
            testNameList[testCase.fullTitle] = true;
        });
        try {
            var jasmineInstance = initializeJasmine(Jasmine, projectFolder);
            jasmineInstance.configureDefaultReporter({ showColors: false });
            setSpecFilter(jasmineInstance, spec => testNameList.hasOwnProperty(spec.getSpecName(spec)));
            jasmineInstance.addReporter(createCustomReporter(context));
            jasmineInstance.execute(testFileList);
        }
        catch (ex) {
            logError("Execute test error:", ex);
        }

        resolve();
    });
}

function setSpecFilter(jasmineInstance, specFilter) {
    if (jasmineInstance.env.configure) {
        jasmineInstance.env.configure({ specFilter });
    } else {
        jasmineInstance.env.specFilter = specFilter;
    }
}

exports.run_tests = run_tests;

// SIG // Begin signature block
// SIG // MIInzAYJKoZIhvcNAQcCoIInvTCCJ7kCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // d9ltkO9xmASUYWmjWrOLqD52dafNZUu64hMtFlYWs8Cg
// SIG // gg2FMIIGAzCCA+ugAwIBAgITMwAAA64tNVHIU49VHQAA
// SIG // AAADrjANBgkqhkiG9w0BAQsFADB+MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSgwJgYDVQQDEx9NaWNyb3NvZnQgQ29kZSBT
// SIG // aWduaW5nIFBDQSAyMDExMB4XDTIzMTExNjE5MDg1OVoX
// SIG // DTI0MTExNDE5MDg1OVowdDELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjEeMBwGA1UEAxMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
// SIG // 9CD8pjY3wxCoPmMhOkow7ycCltfqYnqk4wGNApzh2dTY
// SIG // +YqxozWTzJUOB38VxsgFQmXBFhOMdrGYGpvO9kdbNPkw
// SIG // HpTrW6hZqFuLLiRwGKEx4ZM5zVSqbHJuX2fPfUJ0Xmb+
// SIG // VrVsGw/BwBV2zz0rVtiSgqj3GeeGOsG7llfWyrSjyJqm
// SIG // 5DHE3o04BAI/NuhkHOv04euiqJGvHFCL8+fXvyD9OAxq
// SIG // 4fcJKtoyBb0PBA3oMNQeCsiUyLO+voZqVTOUsAWY0bN5
// SIG // YjkK4nq5DVaNdVrrowd5AX9gmz6D/TJTssns6pDCG00Y
// SIG // +Dh3ipWpnVmkhYcByyUSEKX3PLC8DkiAQQIDAQABo4IB
// SIG // gjCCAX4wHwYDVR0lBBgwFgYKKwYBBAGCN0wIAQYIKwYB
// SIG // BQUHAwMwHQYDVR0OBBYEFIcf73Spl4cHOFoll27H9COd
// SIG // 4fE/MFQGA1UdEQRNMEukSTBHMS0wKwYDVQQLEyRNaWNy
// SIG // b3NvZnQgSXJlbGFuZCBPcGVyYXRpb25zIExpbWl0ZWQx
// SIG // FjAUBgNVBAUTDTIzMDAxMis1MDE4MzYwHwYDVR0jBBgw
// SIG // FoAUSG5k5VAF04KqFzc3IrVtqMp1ApUwVAYDVR0fBE0w
// SIG // SzBJoEegRYZDaHR0cDovL3d3dy5taWNyb3NvZnQuY29t
// SIG // L3BraW9wcy9jcmwvTWljQ29kU2lnUENBMjAxMV8yMDEx
// SIG // LTA3LTA4LmNybDBhBggrBgEFBQcBAQRVMFMwUQYIKwYB
// SIG // BQUHMAKGRWh0dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9w
// SIG // a2lvcHMvY2VydHMvTWljQ29kU2lnUENBMjAxMV8yMDEx
// SIG // LTA3LTA4LmNydDAMBgNVHRMBAf8EAjAAMA0GCSqGSIb3
// SIG // DQEBCwUAA4ICAQBqyWA1Eu7PKNMjaaxl0V7gJ0XBysUo
// SIG // xZluMHJXFE2LEGZIZ2zMLYVjOnAGG/4dluRjSrZZo/8v
// SIG // wk4Xt8v6NBB9ofo8H1P/XidHytWTv9lg9MYu++6lPmu5
// SIG // fCozD3cI2NLZPW2BBhGX2D0R8tQBj0FbmZRuIucpiQ7D
// SIG // K3CHKlfKcc7MP8pPzuMv55Tox8+KFQD1NG6+bfbYA/BN
// SIG // PBkg4tyOh+exbaHfcNuodDJUIjq9dF6oa+Yjy0u0pUMI
// SIG // /B1t+8m6rJo0KSoZlrpesYl0jRhpt+hmqx8uENXoGJcY
// SIG // ZVJ5N2Skq90LViKNRhi9N4U+e8c4y9uXyomUF/6viCPJ
// SIG // 7huTNEJo75ehIJba+IWd3txUEc0R3y6DT6txC6cW1nR/
// SIG // LTbo9I/8fQq538G5IvJ+e5iSiOSVVkVk0i5m03Awy5E2
// SIG // ZSS4PVdQSCcFxmN4tpEfYuR7AAy/GJVtIDFlUpSgdXok
// SIG // pSui5hYtK1R9enXXvo+U/xGkLRc+qp4De3dZbzu7pOq7
// SIG // V/jCyhuCw0bEIAU4urCGIip7TI6GBRzD7yPzjFIqeZY7
// SIG // S4rVW5BRn2oEqpm8Su6yTIQvMIk8x2pwYNUa2339Z4gW
// SIG // 5xW21eFA5mLpo7NRSKRQms5OgAA18aCgqOU7Ds0h6q/Y
// SIG // B4BmEAtoTMl/TBiyKaMGAlEcdy+5FIhmzojMGjCCB3ow
// SIG // ggVioAMCAQICCmEOkNIAAAAAAAMwDQYJKoZIhvcNAQEL
// SIG // BQAwgYgxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNo
// SIG // aW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQK
// SIG // ExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xMjAwBgNVBAMT
// SIG // KU1pY3Jvc29mdCBSb290IENlcnRpZmljYXRlIEF1dGhv
// SIG // cml0eSAyMDExMB4XDTExMDcwODIwNTkwOVoXDTI2MDcw
// SIG // ODIxMDkwOVowfjELMAkGA1UEBhMCVVMxEzARBgNVBAgT
// SIG // Cldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAc
// SIG // BgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEoMCYG
// SIG // A1UEAxMfTWljcm9zb2Z0IENvZGUgU2lnbmluZyBQQ0Eg
// SIG // MjAxMTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoC
// SIG // ggIBAKvw+nIQHC6t2G6qghBNNLrytlghn0IbKmvpWlCq
// SIG // uAY4GgRJun/DDB7dN2vGEtgL8DjCmQawyDnVARQxQtOJ
// SIG // DXlkh36UYCRsr55JnOloXtLfm1OyCizDr9mpK656Ca/X
// SIG // llnKYBoF6WZ26DJSJhIv56sIUM+zRLdd2MQuA3WraPPL
// SIG // bfM6XKEW9Ea64DhkrG5kNXimoGMPLdNAk/jj3gcN1Vx5
// SIG // pUkp5w2+oBN3vpQ97/vjK1oQH01WKKJ6cuASOrdJXtjt
// SIG // 7UORg9l7snuGG9k+sYxd6IlPhBryoS9Z5JA7La4zWMW3
// SIG // Pv4y07MDPbGyr5I4ftKdgCz1TlaRITUlwzluZH9TupwP
// SIG // rRkjhMv0ugOGjfdf8NBSv4yUh7zAIXQlXxgotswnKDgl
// SIG // mDlKNs98sZKuHCOnqWbsYR9q4ShJnV+I4iVd0yFLPlLE
// SIG // tVc/JAPw0XpbL9Uj43BdD1FGd7P4AOG8rAKCX9vAFbO9
// SIG // G9RVS+c5oQ/pI0m8GLhEfEXkwcNyeuBy5yTfv0aZxe/C
// SIG // HFfbg43sTUkwp6uO3+xbn6/83bBm4sGXgXvt1u1L50kp
// SIG // pxMopqd9Z4DmimJ4X7IvhNdXnFy/dygo8e1twyiPLI9A
// SIG // N0/B4YVEicQJTMXUpUMvdJX3bvh4IFgsE11glZo+TzOE
// SIG // 2rCIF96eTvSWsLxGoGyY0uDWiIwLAgMBAAGjggHtMIIB
// SIG // 6TAQBgkrBgEEAYI3FQEEAwIBADAdBgNVHQ4EFgQUSG5k
// SIG // 5VAF04KqFzc3IrVtqMp1ApUwGQYJKwYBBAGCNxQCBAwe
// SIG // CgBTAHUAYgBDAEEwCwYDVR0PBAQDAgGGMA8GA1UdEwEB
// SIG // /wQFMAMBAf8wHwYDVR0jBBgwFoAUci06AjGQQ7kUBU7h
// SIG // 6qfHMdEjiTQwWgYDVR0fBFMwUTBPoE2gS4ZJaHR0cDov
// SIG // L2NybC5taWNyb3NvZnQuY29tL3BraS9jcmwvcHJvZHVj
// SIG // dHMvTWljUm9vQ2VyQXV0MjAxMV8yMDExXzAzXzIyLmNy
// SIG // bDBeBggrBgEFBQcBAQRSMFAwTgYIKwYBBQUHMAKGQmh0
// SIG // dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9wa2kvY2VydHMv
// SIG // TWljUm9vQ2VyQXV0MjAxMV8yMDExXzAzXzIyLmNydDCB
// SIG // nwYDVR0gBIGXMIGUMIGRBgkrBgEEAYI3LgMwgYMwPwYI
// SIG // KwYBBQUHAgEWM2h0dHA6Ly93d3cubWljcm9zb2Z0LmNv
// SIG // bS9wa2lvcHMvZG9jcy9wcmltYXJ5Y3BzLmh0bTBABggr
// SIG // BgEFBQcCAjA0HjIgHQBMAGUAZwBhAGwAXwBwAG8AbABp
// SIG // AGMAeQBfAHMAdABhAHQAZQBtAGUAbgB0AC4gHTANBgkq
// SIG // hkiG9w0BAQsFAAOCAgEAZ/KGpZjgVHkaLtPYdGcimwuW
// SIG // EeFjkplCln3SeQyQwWVfLiw++MNy0W2D/r4/6ArKO79H
// SIG // qaPzadtjvyI1pZddZYSQfYtGUFXYDJJ80hpLHPM8QotS
// SIG // 0LD9a+M+By4pm+Y9G6XUtR13lDni6WTJRD14eiPzE32m
// SIG // kHSDjfTLJgJGKsKKELukqQUMm+1o+mgulaAqPyprWElj
// SIG // HwlpblqYluSD9MCP80Yr3vw70L01724lruWvJ+3Q3fMO
// SIG // r5kol5hNDj0L8giJ1h/DMhji8MUtzluetEk5CsYKwsat
// SIG // ruWy2dsViFFFWDgycScaf7H0J/jeLDogaZiyWYlobm+n
// SIG // t3TDQAUGpgEqKD6CPxNNZgvAs0314Y9/HG8VfUWnduVA
// SIG // KmWjw11SYobDHWM2l4bf2vP48hahmifhzaWX0O5dY0Hj
// SIG // Wwechz4GdwbRBrF1HxS+YWG18NzGGwS+30HHDiju3mUv
// SIG // 7Jf2oVyW2ADWoUa9WfOXpQlLSBCZgB/QACnFsZulP0V3
// SIG // HjXG0qKin3p6IvpIlR+r+0cjgPWe+L9rt0uX4ut1eBrs
// SIG // 6jeZeRhL/9azI2h15q/6/IvrC4DqaTuv/DDtBEyO3991
// SIG // bWORPdGdVk5Pv4BXIqF4ETIheu9BCrE/+6jMpF3BoYib
// SIG // V3FWTkhFwELJm3ZbCoBIa/15n8G9bW1qyVJzEw16UM0x
// SIG // ghmfMIIZmwIBATCBlTB+MQswCQYDVQQGEwJVUzETMBEG
// SIG // A1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9u
// SIG // ZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MSgwJgYDVQQDEx9NaWNyb3NvZnQgQ29kZSBTaWduaW5n
// SIG // IFBDQSAyMDExAhMzAAADri01UchTj1UdAAAAAAOuMA0G
// SIG // CWCGSAFlAwQCAQUAoIGuMBkGCSqGSIb3DQEJAzEMBgor
// SIG // BgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgorBgEE
// SIG // AYI3AgEVMC8GCSqGSIb3DQEJBDEiBCC+Ub77WRciQSoM
// SIG // 5EPBZ05TxiYPDweNiq4TdmTWYeOAUTBCBgorBgEEAYI3
// SIG // AgEMMTQwMqAUgBIATQBpAGMAcgBvAHMAbwBmAHShGoAY
// SIG // aHR0cDovL3d3dy5taWNyb3NvZnQuY29tMA0GCSqGSIb3
// SIG // DQEBAQUABIIBAOI9PV5TdDwgGeCoj/+U4hYb5YSALZAd
// SIG // v3IoFd8BggGmDtl3ocRX5WxZnhd86K4H/rMmTn7z1+Nh
// SIG // wSy6455otWNidv+7naIdrlgIpqthHfuq0HiNyamJjSCu
// SIG // GkSj0+EmBr87DS83i8gUIF62a1IhoJpQLPf9cSaJ0dXY
// SIG // 1kCB2oG1rrwjwXHL3lOSAkdgm9meqeIDhe9EJr9AEf93
// SIG // pPpnh4L2oW/xJq+QllC3NkLQMm9ZUrRrcxOLjAW/3bXs
// SIG // LTUAkq6Aogn/o3hP17OniDCUAWAyp6A4BWEWERedCcAh
// SIG // 82GSM7usnHias1xJ1pZTJ3IvvsXcRbLceXAaw3d64qCp
// SIG // UYehghcpMIIXJQYKKwYBBAGCNwMDATGCFxUwghcRBgkq
// SIG // hkiG9w0BBwKgghcCMIIW/gIBAzEPMA0GCWCGSAFlAwQC
// SIG // AQUAMIIBWQYLKoZIhvcNAQkQAQSgggFIBIIBRDCCAUAC
// SIG // AQEGCisGAQQBhFkKAwEwMTANBglghkgBZQMEAgEFAAQg
// SIG // v2h0NnbfE6TNo6O9S6nKWlQ5GWZH5c81RIcK316DOhcC
// SIG // BmVeBkvujRgTMjAyMzEyMTkwOTEyMzkuNjY3WjAEgAIB
// SIG // 9KCB2KSB1TCB0jELMAkGA1UEBhMCVVMxEzARBgNVBAgT
// SIG // Cldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAc
// SIG // BgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEtMCsG
// SIG // A1UECxMkTWljcm9zb2Z0IElyZWxhbmQgT3BlcmF0aW9u
// SIG // cyBMaW1pdGVkMSYwJAYDVQQLEx1UaGFsZXMgVFNTIEVT
// SIG // Tjo4RDQxLTRCRjctQjNCNzElMCMGA1UEAxMcTWljcm9z
// SIG // b2Z0IFRpbWUtU3RhbXAgU2VydmljZaCCEXgwggcnMIIF
// SIG // D6ADAgECAhMzAAAB49+9m5ocaIMiAAEAAAHjMA0GCSqG
// SIG // SIb3DQEBCwUAMHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQI
// SIG // EwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4w
// SIG // HAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xJjAk
// SIG // BgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAy
// SIG // MDEwMB4XDTIzMTAxMjE5MDcyOVoXDTI1MDExMDE5MDcy
// SIG // OVowgdIxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNo
// SIG // aW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQK
// SIG // ExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xLTArBgNVBAsT
// SIG // JE1pY3Jvc29mdCBJcmVsYW5kIE9wZXJhdGlvbnMgTGlt
// SIG // aXRlZDEmMCQGA1UECxMdVGhhbGVzIFRTUyBFU046OEQ0
// SIG // MS00QkY3LUIzQjcxJTAjBgNVBAMTHE1pY3Jvc29mdCBU
// SIG // aW1lLVN0YW1wIFNlcnZpY2UwggIiMA0GCSqGSIb3DQEB
// SIG // AQUAA4ICDwAwggIKAoICAQC+pA1oHkafn8UgVA+jf8rh
// SIG // CaV4IMwXjRuSgfDPQGyFnhKJCYDoIZTIPCZqpDbAeFpd
// SIG // TRF0e3C+r5TwrFhizIcqprHELt+v/Idm8ek1ODPHVWRH
// SIG // eleFPpfYKbXvlRfdZDiN+XzqienkAzMEgUOXPRJTxVIo
// SIG // 0wO81e2OT0WK0uBS/aePeE4nQqQRB+TegDubvMDQP4yj
// SIG // veGZH44Lu7CxfElHa3NRkTRJNhfdS96cUft9hbLkE2Yv
// SIG // IaraxaRDkcW8koIkAT93B+3z5XjdTcp4TEX+k+1wtS9D
// SIG // 0cisvTGekwVq7th3lor5MSLntZy0G/zv59I9kFXeNmX9
// SIG // AK1wf1aueIEPCSL1B9HG78ljPD6JoRYuqthe4XuN44a8
// SIG // cr59V4tacBzlbGx9umMQyk1sZdtIX0C3c8+EVU6PHBUT
// SIG // HUAsZSpEp6HD1qn1f+B+QD0j15NK/AnP3DJr2t4OBL7q
// SIG // ReBK20jtFDZwkb+1A8ZUhosIhpJp8ud5qrQGezS3j4Rb
// SIG // cH8aegEyKI5fCV469/m50FlAgwneTmqeeHxnhmFPCsTq
// SIG // IZs+tOAYE9eHt7EVgAaVvqF2EgshUN0mUN/yzU1W8vRD
// SIG // bLhIdlCECllO5b+3Iawaxwg8NIzPlsDo2FEu2MTAIWks
// SIG // jmoaW7nQC70VF6UIRCxaDurTsf+uoc6oI0kzhGN6buOg
// SIG // RQIDAQABo4IBSTCCAUUwHQYDVR0OBBYEFLGuDWa+NRW3
// SIG // oWfGPnqdptmImKkDMB8GA1UdIwQYMBaAFJ+nFV0AXmJd
// SIG // g/Tl0mWnG1M1GelyMF8GA1UdHwRYMFYwVKBSoFCGTmh0
// SIG // dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvY3Js
// SIG // L01pY3Jvc29mdCUyMFRpbWUtU3RhbXAlMjBQQ0ElMjAy
// SIG // MDEwKDEpLmNybDBsBggrBgEFBQcBAQRgMF4wXAYIKwYB
// SIG // BQUHMAKGUGh0dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9w
// SIG // a2lvcHMvY2VydHMvTWljcm9zb2Z0JTIwVGltZS1TdGFt
// SIG // cCUyMFBDQSUyMDIwMTAoMSkuY3J0MAwGA1UdEwEB/wQC
// SIG // MAAwFgYDVR0lAQH/BAwwCgYIKwYBBQUHAwgwDgYDVR0P
// SIG // AQH/BAQDAgeAMA0GCSqGSIb3DQEBCwUAA4ICAQC3vpsu
// SIG // qdTTzBFtbe9GvGNoRsY+rIg0rpRgLOFMZpH88TAInOI9
// SIG // Phkz2x8ZNfd5kNBUT2vXbW0W2ns1dBi5BLFFkxhdrT+l
// SIG // rA3Zef5Q+MFEO+gKxTnp3AqSubLxNLDtBcoayR2cTCwj
// SIG // nJb3erwCDzpGQGIoQR/0V3Mc24pYjgq//98O0RJ7C7jq
// SIG // f+75VyQLBs5iXrAT/9BEasYyrnT1rgRs/6nUZSbTpeZ7
// SIG // /TWZMi4oOA+YcvadhHNc2qLYi4h5yfZpbCRHFA4WI/D5
// SIG // 2JyY47Asb/sic2qNmlB4iEMzGxavjNPHPLgRH/rN+2G2
// SIG // UO1wBccHthFSQFMKVo5rSd2980lkzJhVrpxa9mi5Or1X
// SIG // ktLtTMhHxL/tGw5Pjd45rAsGy5DPRWg4u6th7VJ98+pO
// SIG // wJxE3NvHQLy3/4qKlK1WE8Aa20R+F1RRL2iEPou3rA0I
// SIG // nFltXQgwPyd8TqAhAlevOtdY64mo33VYPKNFqfhQoOQg
// SIG // FLbJYDhbomFC4HMZ6s5Jj9oufGRGtK5uC2cphwc7CDFN
// SIG // MjJrlZgJGMW3RA4uV6pWSLqT6apg+v3y4w+Lm9EhBLbT
// SIG // qYNJ6dK2vzDQn7/7VYSbc+cIIhCCl/rOGpGsC32PtesQ
// SIG // weuDZtB6BrPxsvNt7pSJuBsq1HKTWcZ17xOjmTIyP1dQ
// SIG // IEgIPFP4XjFrmU1lVDCCB3EwggVZoAMCAQICEzMAAAAV
// SIG // xedrngKbSZkAAAAAABUwDQYJKoZIhvcNAQELBQAwgYgx
// SIG // CzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9u
// SIG // MRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNy
// SIG // b3NvZnQgQ29ycG9yYXRpb24xMjAwBgNVBAMTKU1pY3Jv
// SIG // c29mdCBSb290IENlcnRpZmljYXRlIEF1dGhvcml0eSAy
// SIG // MDEwMB4XDTIxMDkzMDE4MjIyNVoXDTMwMDkzMDE4MzIy
// SIG // NVowfDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hp
// SIG // bmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoT
// SIG // FU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UEAxMd
// SIG // TWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIwMTAwggIi
// SIG // MA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQDk4aZM
// SIG // 57RyIQt5osvXJHm9DtWC0/3unAcH0qlsTnXIyjVX9gF/
// SIG // bErg4r25PhdgM/9cT8dm95VTcVrifkpa/rg2Z4VGIwy1
// SIG // jRPPdzLAEBjoYH1qUoNEt6aORmsHFPPFdvWGUNzBRMhx
// SIG // XFExN6AKOG6N7dcP2CZTfDlhAnrEqv1yaa8dq6z2Nr41
// SIG // JmTamDu6GnszrYBbfowQHJ1S/rboYiXcag/PXfT+jlPP
// SIG // 1uyFVk3v3byNpOORj7I5LFGc6XBpDco2LXCOMcg1KL3j
// SIG // tIckw+DJj361VI/c+gVVmG1oO5pGve2krnopN6zL64NF
// SIG // 50ZuyjLVwIYwXE8s4mKyzbnijYjklqwBSru+cakXW2dg
// SIG // 3viSkR4dPf0gz3N9QZpGdc3EXzTdEonW/aUgfX782Z5F
// SIG // 37ZyL9t9X4C626p+Nuw2TPYrbqgSUei/BQOj0XOmTTd0
// SIG // lBw0gg/wEPK3Rxjtp+iZfD9M269ewvPV2HM9Q07BMzlM
// SIG // jgK8QmguEOqEUUbi0b1qGFphAXPKZ6Je1yh2AuIzGHLX
// SIG // pyDwwvoSCtdjbwzJNmSLW6CmgyFdXzB0kZSU2LlQ+QuJ
// SIG // YfM2BjUYhEfb3BvR/bLUHMVr9lxSUV0S2yW6r1AFemzF
// SIG // ER1y7435UsSFF5PAPBXbGjfHCBUYP3irRbb1Hode2o+e
// SIG // FnJpxq57t7c+auIurQIDAQABo4IB3TCCAdkwEgYJKwYB
// SIG // BAGCNxUBBAUCAwEAATAjBgkrBgEEAYI3FQIEFgQUKqdS
// SIG // /mTEmr6CkTxGNSnPEP8vBO4wHQYDVR0OBBYEFJ+nFV0A
// SIG // XmJdg/Tl0mWnG1M1GelyMFwGA1UdIARVMFMwUQYMKwYB
// SIG // BAGCN0yDfQEBMEEwPwYIKwYBBQUHAgEWM2h0dHA6Ly93
// SIG // d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvRG9jcy9SZXBv
// SIG // c2l0b3J5Lmh0bTATBgNVHSUEDDAKBggrBgEFBQcDCDAZ
// SIG // BgkrBgEEAYI3FAIEDB4KAFMAdQBiAEMAQTALBgNVHQ8E
// SIG // BAMCAYYwDwYDVR0TAQH/BAUwAwEB/zAfBgNVHSMEGDAW
// SIG // gBTV9lbLj+iiXGJo0T2UkFvXzpoYxDBWBgNVHR8ETzBN
// SIG // MEugSaBHhkVodHRwOi8vY3JsLm1pY3Jvc29mdC5jb20v
// SIG // cGtpL2NybC9wcm9kdWN0cy9NaWNSb29DZXJBdXRfMjAx
// SIG // MC0wNi0yMy5jcmwwWgYIKwYBBQUHAQEETjBMMEoGCCsG
// SIG // AQUFBzAChj5odHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20v
// SIG // cGtpL2NlcnRzL01pY1Jvb0NlckF1dF8yMDEwLTA2LTIz
// SIG // LmNydDANBgkqhkiG9w0BAQsFAAOCAgEAnVV9/Cqt4Swf
// SIG // ZwExJFvhnnJL/Klv6lwUtj5OR2R4sQaTlz0xM7U518Jx
// SIG // Nj/aZGx80HU5bbsPMeTCj/ts0aGUGCLu6WZnOlNN3Zi6
// SIG // th542DYunKmCVgADsAW+iehp4LoJ7nvfam++Kctu2D9I
// SIG // dQHZGN5tggz1bSNU5HhTdSRXud2f8449xvNo32X2pFaq
// SIG // 95W2KFUn0CS9QKC/GbYSEhFdPSfgQJY4rPf5KYnDvBew
// SIG // VIVCs/wMnosZiefwC2qBwoEZQhlSdYo2wh3DYXMuLGt7
// SIG // bj8sCXgU6ZGyqVvfSaN0DLzskYDSPeZKPmY7T7uG+jIa
// SIG // 2Zb0j/aRAfbOxnT99kxybxCrdTDFNLB62FD+CljdQDzH
// SIG // VG2dY3RILLFORy3BFARxv2T5JL5zbcqOCb2zAVdJVGTZ
// SIG // c9d/HltEAY5aGZFrDZ+kKNxnGSgkujhLmm77IVRrakUR
// SIG // R6nxt67I6IleT53S0Ex2tVdUCbFpAUR+fKFhbHP+Crvs
// SIG // QWY9af3LwUFJfn6Tvsv4O+S3Fb+0zj6lMVGEvL8CwYKi
// SIG // excdFYmNcP7ntdAoGokLjzbaukz5m/8K6TT4JDVnK+AN
// SIG // uOaMmdbhIurwJ0I9JZTmdHRbatGePu1+oDEzfbzL6Xu/
// SIG // OHBE0ZDxyKs6ijoIYn/ZcGNTTY3ugm2lBRDBcQZqELQd
// SIG // VTNYs6FwZvKhggLUMIICPQIBATCCAQChgdikgdUwgdIx
// SIG // CzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9u
// SIG // MRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNy
// SIG // b3NvZnQgQ29ycG9yYXRpb24xLTArBgNVBAsTJE1pY3Jv
// SIG // c29mdCBJcmVsYW5kIE9wZXJhdGlvbnMgTGltaXRlZDEm
// SIG // MCQGA1UECxMdVGhhbGVzIFRTUyBFU046OEQ0MS00QkY3
// SIG // LUIzQjcxJTAjBgNVBAMTHE1pY3Jvc29mdCBUaW1lLVN0
// SIG // YW1wIFNlcnZpY2WiIwoBATAHBgUrDgMCGgMVAD2Il7vD
// SIG // kUOIbynLhOxitAjoMVp6oIGDMIGApH4wfDELMAkGA1UE
// SIG // BhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNV
// SIG // BAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBD
// SIG // b3Jwb3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRp
// SIG // bWUtU3RhbXAgUENBIDIwMTAwDQYJKoZIhvcNAQEFBQAC
// SIG // BQDpK3L2MCIYDzIwMjMxMjE5MDk0MDA2WhgPMjAyMzEy
// SIG // MjAwOTQwMDZaMHQwOgYKKwYBBAGEWQoEATEsMCowCgIF
// SIG // AOkrcvYCAQAwBwIBAAICEK4wBwIBAAICEbswCgIFAOks
// SIG // xHYCAQAwNgYKKwYBBAGEWQoEAjEoMCYwDAYKKwYBBAGE
// SIG // WQoDAqAKMAgCAQACAwehIKEKMAgCAQACAwGGoDANBgkq
// SIG // hkiG9w0BAQUFAAOBgQB3H8zsymyMLvxBM7cXTt47hLRc
// SIG // ymDEQYQfssiPTMQi+XgrA6MxBpP6EewyMNLYUJW4E3/w
// SIG // jrOc2v1GUnZ9f752VV+LjDCZrj/goWaOsqTJLAkwfPE+
// SIG // eiGXcha2PXAr+IBlpStncDJpkpLk6cKzqOrYZWK3E9rk
// SIG // nbhQVdpwmoalWzGCBA0wggQJAgEBMIGTMHwxCzAJBgNV
// SIG // BAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYD
// SIG // VQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQg
// SIG // Q29ycG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBU
// SIG // aW1lLVN0YW1wIFBDQSAyMDEwAhMzAAAB49+9m5ocaIMi
// SIG // AAEAAAHjMA0GCWCGSAFlAwQCAQUAoIIBSjAaBgkqhkiG
// SIG // 9w0BCQMxDQYLKoZIhvcNAQkQAQQwLwYJKoZIhvcNAQkE
// SIG // MSIEIEtVY2xcInZNtTps6pA4Avgog5hkOZeDLhJ/cjpD
// SIG // MccmMIH6BgsqhkiG9w0BCRACLzGB6jCB5zCB5DCBvQQg
// SIG // M9Qjq+Ww/mT3RIEI1r3CFrgyXEG3YKvDXY9McjLmJiow
// SIG // gZgwgYCkfjB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMK
// SIG // V2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwG
// SIG // A1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYD
// SIG // VQQDEx1NaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAx
// SIG // MAITMwAAAePfvZuaHGiDIgABAAAB4zAiBCBUqqu3eTk8
// SIG // KM3Z7mxVsPsu0gRWoPBu/DUG0IifNw03HzANBgkqhkiG
// SIG // 9w0BAQsFAASCAgCj5Dmf4JgdvvrCucDN7txh5QuURJHg
// SIG // xXwnXhCmBplouwrrSLY/Y4rcA/wWDi6AKAz6rwQC5Prb
// SIG // mUT2Pi6ETEiNNsaUp4QdMOi4DmNQ6DW/bUs8xxeCAbct
// SIG // zr8uTWCzti1KkGBly3DYjMsp4XfcBZTWyRfWoNwWPcUb
// SIG // ii/kfjD6DHLhb7/lo4qYiWrijHmfqRu0bBR1xI/2XX4s
// SIG // DzcVim939X9qxJQg0ZkQWjys4mxoRwWDEvTvRBfDXP5O
// SIG // 9QEJEybF5FV/42dKLa9Mm/gVJWwvJbwaP0Gi7I8WO7fp
// SIG // hUc8Qy+xd7rO5GwnLpnrXb5wpftoiQufPax9wywqtH20
// SIG // PYypcKD5GHuws6jJVC8E1qUHjDJN8c0lJ9+iG+Q0siCS
// SIG // afoqndexpBgShGzfAWqLO2g0Xreak29yjjzgQrSbiMtU
// SIG // +X53marh8oHH4bmKj51EAnZ5sAN8mmMJ2YrgHCdT0grd
// SIG // GFrPsAgWjGrcP/idYgI79j+8OdbYiJ3xXyAngPHX+Sf2
// SIG // c57KmQyimYAyUTH8yCWCWQVwAHFuBB3+5nOBKeCkUHK8
// SIG // TWzhxMIzQh3eKmeLqafxn8+E3J99Z7bwj5f2XzymdB4G
// SIG // XLxmNCjB6aJ5TOlaiR0la47ghDkXJVor05q0OFD+zcgo
// SIG // Rt2R5aqiLJOx0j7RobkcvfRKqTuhlsw82801gg==
// SIG // End signature block
