//@ts-check
"use strict";
var EOL = require('os').EOL;
var fs = require('fs');
var path = require('path');

function find_tests(testFileList, discoverResultFile, projectFolder) {
    return new Promise(resolve => {
        var test = findTape(projectFolder);
        if (test === null) {
            return resolve();
        }

        var harness = test.getHarness({ exit: false });
        var tests = harness['_tests'];

        var count = 0;
        var testList = [];
        testFileList.split(';').forEach(function (testFile) {
            var testCases = loadTestCases(testFile);
            if (testCases === null) return; // continue to next testFile

            for (; count < tests.length; count++) {
                var t = tests[count];
                t._skip = true; // don't run tests
                testList.push({
                    name: t.name,
                    suite: '',
                    filepath: testFile,
                    line: 0,
                    column: 0
                });
            }
        });

        var fd = fs.openSync(discoverResultFile, 'w');
        fs.writeSync(fd, JSON.stringify(testList));
        fs.closeSync(fd);

        resolve();
    });
}
module.exports.find_tests = find_tests;

function run_tests(context) {
    return new Promise(resolve => {
        var tape = findTape(context.testCases[0].projectFolder);
        if (tape === null) {
            return resolve();
        }

        // Since the test events don't come in order we store all of them in this array
        // in the 'onFinish' event we loop through them and process anything remaining.
        var testState = [];
        var harness = tape.getHarness({ objectMode: true });

        harness.createStream({ objectMode: true }).on('data', function (evt) {
            var result;

            switch (evt.type) {
                case 'test':
                    result = {
                        fullyQualifiedName: context.getFullyQualifiedName(evt.name),
                        passed: undefined,
                        stdout: '',
                        stderr: ''
                    };

                    testState[evt.id] = result;

                    // Test is starting. Reset the result object. Send a "test start" event.
                    context.post({
                        type: 'test start',
                        fullyQualifiedName: result.fullyQualifiedName
                    });
                    break;
                case 'assert':
                    result = testState[evt.test];
                    if (!result) { break; }

                    // Correlate the success/failure asserts for this test. There may be multiple per test
                    var msg = "Operator: " + evt.operator + ". Expected: " + evt.expected + ". Actual: " + evt.actual + ". evt: " + JSON.stringify(evt) + "\n";
                    if (evt.ok) {
                        result.stdout += msg;
                        result.passed = result.passed === undefined ? true : result.passed;
                    } else {
                        result.stderr += msg + (evt.error.stack || evt.error.message) + "\n";
                        result.passed = false;
                    }
                    break;
                case 'end':
                    result = testState[evt.test];
                    if (!result) { break; }
                    // Test is done. Send a "result" event.
                    context.post({
                        type: 'result',
                        fullyQualifiedName: result.fullyQualifiedName,
                        result
                    });
                    context.clearOutputs();
                    testState[evt.test] = undefined;
                    break;
                default:
                    break;
            }
        });

        loadTestCases(context.testCases[0].testFile);

        // Skip those not selected to run. The rest will start running on the next tick.
        harness['_tests'].forEach(function (test) {
            if (!context.testCases.some(function (ti) { return ti.fullyQualifiedName === context.getFullyQualifiedName(test.name); })) {
                test._skip = true;
            }
        });

        harness.onFinish(function () {
            // loop through items in testState
            for (var i = 0; i < testState.length; i++) {
                if (testState[i]) {
                    var result = testState[i];
                    if (!result.passed) { result.passed = false; }
                    //callback({
                    //    'type': 'result',
                    //    'fullyQualifiedName': result.fullyQualifiedName,
                    //    'result': result
                    //});
                }
            }

            context.post({
                type: 'end'
            });

            return resolve();
        });
    });
}
module.exports.run_tests = run_tests;

function loadTestCases(testFile) {
    try {
        process.chdir(path.dirname(testFile));
        return require(testFile);
    } catch (e) {
        // we would like continue discover other files, so swallow, log and continue;
        logError("Test discovery error:", e, "in", testFile);
        return null;
    }
}

function findTape(projectFolder) {
    try {
        var tapePath = path.join(projectFolder, 'node_modules', 'tape');
        return require(tapePath);
    } catch (e) {
        logError(
            'Failed to find Tape package.  Tape must be installed in the project locally.' + EOL +
            'Install Tape locally using the npm manager via solution explorer' + EOL +
            'or with ".npm install tape --save-dev" via the Node.js interactive window.');
        return null;
    }
}

function logError() {
    var errorArgs = Array.prototype.slice.call(arguments);
    errorArgs.unshift("NTVS_ERROR:");
    console.error.apply(console, errorArgs);
}

// SIG // Begin signature block
// SIG // MIIoNgYJKoZIhvcNAQcCoIIoJzCCKCMCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // gjp5QqLiFGebVvw1qZ5vDC5UXUyr4654DYT2PXLcKvag
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
// SIG // ghoJMIIaBQIBATCBlTB+MQswCQYDVQQGEwJVUzETMBEG
// SIG // A1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9u
// SIG // ZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MSgwJgYDVQQDEx9NaWNyb3NvZnQgQ29kZSBTaWduaW5n
// SIG // IFBDQSAyMDExAhMzAAADri01UchTj1UdAAAAAAOuMA0G
// SIG // CWCGSAFlAwQCAQUAoIGuMBkGCSqGSIb3DQEJAzEMBgor
// SIG // BgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgorBgEE
// SIG // AYI3AgEVMC8GCSqGSIb3DQEJBDEiBCBgIROFDFuE4C0v
// SIG // BGzNLbKJjRdPRRITsp728xNptksDyTBCBgorBgEEAYI3
// SIG // AgEMMTQwMqAUgBIATQBpAGMAcgBvAHMAbwBmAHShGoAY
// SIG // aHR0cDovL3d3dy5taWNyb3NvZnQuY29tMA0GCSqGSIb3
// SIG // DQEBAQUABIIBAMB00UZ+Ury1zjA33FCqgrwI1HXF0VMw
// SIG // voEGj0YumwrP0AOznmj75d4s6lPCUbSbYDTMw9dbEKx6
// SIG // cW1K/DssBO37i7XD2Xj3eyGCyYHW4XivkFwyHElvtM0H
// SIG // 2M84wHZyJqvRyoOi0ab/25H/c36fmoQx82owz5RxNdnT
// SIG // 8BIVV62/f4DejKlc3e5CpeNmi6iWwRkuIWG+1mlxZL/t
// SIG // w/7woeorcE6M4eKOMlFtGRbgFuMnwJ9PsILEYRwn5Pgj
// SIG // U2lu1POkDPA3ruTjhXDKZroAiNTPigKAs5l+kuYFJw7W
// SIG // kFgYjV5li0lVGwnsjswmvcSgqfToiLooRvuM2UYZKm1z
// SIG // UlmhgheTMIIXjwYKKwYBBAGCNwMDATGCF38wghd7Bgkq
// SIG // hkiG9w0BBwKgghdsMIIXaAIBAzEPMA0GCWCGSAFlAwQC
// SIG // AQUAMIIBUQYLKoZIhvcNAQkQAQSgggFABIIBPDCCATgC
// SIG // AQEGCisGAQQBhFkKAwEwMTANBglghkgBZQMEAgEFAAQg
// SIG // IOFbtZQhrbXdpajSjOIvXNAooPP8+vdeVbXgh7AG/FoC
// SIG // BmV65PODoxgSMjAyMzEyMTkwOTEyMzIuMTdaMASAAgH0
// SIG // oIHRpIHOMIHLMQswCQYDVQQGEwJVUzETMBEGA1UECBMK
// SIG // V2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwG
// SIG // A1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSUwIwYD
// SIG // VQQLExxNaWNyb3NvZnQgQW1lcmljYSBPcGVyYXRpb25z
// SIG // MScwJQYDVQQLEx5uU2hpZWxkIFRTUyBFU046QTQwMC0w
// SIG // NUUwLUQ5NDcxJTAjBgNVBAMTHE1pY3Jvc29mdCBUaW1l
// SIG // LVN0YW1wIFNlcnZpY2WgghHqMIIHIDCCBQigAwIBAgIT
// SIG // MwAAAdYnaf9yLVbIrgABAAAB1jANBgkqhkiG9w0BAQsF
// SIG // ADB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
// SIG // Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
// SIG // TWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1N
// SIG // aWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAxMDAeFw0y
// SIG // MzA1MjUxOTEyMzRaFw0yNDAyMDExOTEyMzRaMIHLMQsw
// SIG // CQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQ
// SIG // MA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9z
// SIG // b2Z0IENvcnBvcmF0aW9uMSUwIwYDVQQLExxNaWNyb3Nv
// SIG // ZnQgQW1lcmljYSBPcGVyYXRpb25zMScwJQYDVQQLEx5u
// SIG // U2hpZWxkIFRTUyBFU046QTQwMC0wNUUwLUQ5NDcxJTAj
// SIG // BgNVBAMTHE1pY3Jvc29mdCBUaW1lLVN0YW1wIFNlcnZp
// SIG // Y2UwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoIC
// SIG // AQDPLM2Om8r5u3fcbDEOXydJtbkW5U34KFaftC+8QyNq
// SIG // plMIzSTC1ToE0zcweQCvPIfpYtyPB3jt6fPRprvhwCks
// SIG // Uw9p0OfmZzWPDvkt40BUStu813QlrloRdplLz2xpk29j
// SIG // IOZ4+rBbKaZkBPZ4R4LXQhkkHne0Y/Yh85ZqMMRaMWkB
// SIG // M6nUwV5aDiwXqdE9Jyl0i1aWYbCqzwBRdN7CTlAJxrJ4
// SIG // 7ov3uf/lFg9hnVQcqQYgRrRFpDNFMOP0gwz5Nj6a24GZ
// SIG // ncFEGRmKwImL+5KWPnVgvadJSRp6ZqrYV3FmbBmZtsF0
// SIG // hSlVjLQO8nxelGV7TvqIISIsv2bQMgUBVEz8wHFyU386
// SIG // 3gHj8BCbEpJzm75fLJsL3P66lJUNRN7CRsfNEbHdX/d6
// SIG // jopVOFwF7ommTQjpU37A/7YR0wJDTt6ZsXU+j/wYlo9b
// SIG // 22t1qUthqjRs32oGf2TRTCoQWLhJe3cAIYRlla/gEKlb
// SIG // uDDsG3926y4EMHFxTjsjrcZEbDWwjB3wrp11Dyg1QKcD
// SIG // yLUs2anBolvQwJTN0mMOuXO8tBz20ng/+Xw+4w+W9PMk
// SIG // vW1faYi435VjKRZsHfxIPjIzZ0wf4FibmVPJHZ+aTxGs
// SIG // VJPxydChvvGCf4fe8XfYY9P5lbn9ScKc4adTd44GCrBl
// SIG // J/JOsoA4OvNHY6W+XcKVcIIGWwIDAQABo4IBSTCCAUUw
// SIG // HQYDVR0OBBYEFGGaVDY7TQBiMCKg2+j/zRTcYsZOMB8G
// SIG // A1UdIwQYMBaAFJ+nFV0AXmJdg/Tl0mWnG1M1GelyMF8G
// SIG // A1UdHwRYMFYwVKBSoFCGTmh0dHA6Ly93d3cubWljcm9z
// SIG // b2Z0LmNvbS9wa2lvcHMvY3JsL01pY3Jvc29mdCUyMFRp
// SIG // bWUtU3RhbXAlMjBQQ0ElMjAyMDEwKDEpLmNybDBsBggr
// SIG // BgEFBQcBAQRgMF4wXAYIKwYBBQUHMAKGUGh0dHA6Ly93
// SIG // d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvY2VydHMvTWlj
// SIG // cm9zb2Z0JTIwVGltZS1TdGFtcCUyMFBDQSUyMDIwMTAo
// SIG // MSkuY3J0MAwGA1UdEwEB/wQCMAAwFgYDVR0lAQH/BAww
// SIG // CgYIKwYBBQUHAwgwDgYDVR0PAQH/BAQDAgeAMA0GCSqG
// SIG // SIb3DQEBCwUAA4ICAQDUv+RjNidwJxSbMk1IvS8LfxNM
// SIG // 8VaVhpxR1SkW+FRY6AKkn2s3On29nGEVlatblIv1qVTK
// SIG // krUxLYMZ0z+RA6mmfXue2Y7/YBbzM5kUeUgU2y1Mmbin
// SIG // 6xadT9DzECeE7E4+3k2DmZxuV+GLFYQsqkDbe8oy7+3B
// SIG // SiU29qyZAYT9vRDALPUC5ZwyoPkNfKbqjl3VgFTqIubE
// SIG // Qr56M0YdMWlqCqq0yVln9mPbhHHzXHOjaQsurohHCf7V
// SIG // T8ct79po34Fd8XcsqmyhdKBy1jdyknrik+F3vEl/90qa
// SIG // on5N8KTZoGtOFlaJFPnZ2DqQtb2WWkfuAoGWrGSA43My
// SIG // l7+PYbUsri/NrMvAd9Z+J9FlqsMwXQFxAB7ujJi4hP8B
// SIG // H8j6qkmy4uulU5SSQa6XkElcaKQYSpJcSjkjyTDIOpf6
// SIG // LZBTaFx6eeoqDZ0lURhiRqO+1yo8uXO89e6kgBeC8t1W
// SIG // N5ITqXnjocYgDvyFpptsUDgnRUiI1M/Ql/O299VktMkI
// SIG // L72i6Qd4BBsrj3Z+iLEnKP9epUwosP1m3N2v9yhXQ1Hi
// SIG // usJl63IfXIyfBJaWvQDgU3Jk4eIZSr/2KIj4ptXt496C
// SIG // RiHTi011kcwDpdjQLAQiCvoj1puyhfwVf2G5ZwBptIXi
// SIG // vNRba34KkD5oqmEoF1yRFQ84iDsf/giyn/XIT7YY/zCC
// SIG // B3EwggVZoAMCAQICEzMAAAAVxedrngKbSZkAAAAAABUw
// SIG // DQYJKoZIhvcNAQELBQAwgYgxCzAJBgNVBAYTAlVTMRMw
// SIG // EQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRt
// SIG // b25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRp
// SIG // b24xMjAwBgNVBAMTKU1pY3Jvc29mdCBSb290IENlcnRp
// SIG // ZmljYXRlIEF1dGhvcml0eSAyMDEwMB4XDTIxMDkzMDE4
// SIG // MjIyNVoXDTMwMDkzMDE4MzIyNVowfDELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgUENBIDIwMTAwggIiMA0GCSqGSIb3DQEBAQUA
// SIG // A4ICDwAwggIKAoICAQDk4aZM57RyIQt5osvXJHm9DtWC
// SIG // 0/3unAcH0qlsTnXIyjVX9gF/bErg4r25PhdgM/9cT8dm
// SIG // 95VTcVrifkpa/rg2Z4VGIwy1jRPPdzLAEBjoYH1qUoNE
// SIG // t6aORmsHFPPFdvWGUNzBRMhxXFExN6AKOG6N7dcP2CZT
// SIG // fDlhAnrEqv1yaa8dq6z2Nr41JmTamDu6GnszrYBbfowQ
// SIG // HJ1S/rboYiXcag/PXfT+jlPP1uyFVk3v3byNpOORj7I5
// SIG // LFGc6XBpDco2LXCOMcg1KL3jtIckw+DJj361VI/c+gVV
// SIG // mG1oO5pGve2krnopN6zL64NF50ZuyjLVwIYwXE8s4mKy
// SIG // zbnijYjklqwBSru+cakXW2dg3viSkR4dPf0gz3N9QZpG
// SIG // dc3EXzTdEonW/aUgfX782Z5F37ZyL9t9X4C626p+Nuw2
// SIG // TPYrbqgSUei/BQOj0XOmTTd0lBw0gg/wEPK3Rxjtp+iZ
// SIG // fD9M269ewvPV2HM9Q07BMzlMjgK8QmguEOqEUUbi0b1q
// SIG // GFphAXPKZ6Je1yh2AuIzGHLXpyDwwvoSCtdjbwzJNmSL
// SIG // W6CmgyFdXzB0kZSU2LlQ+QuJYfM2BjUYhEfb3BvR/bLU
// SIG // HMVr9lxSUV0S2yW6r1AFemzFER1y7435UsSFF5PAPBXb
// SIG // GjfHCBUYP3irRbb1Hode2o+eFnJpxq57t7c+auIurQID
// SIG // AQABo4IB3TCCAdkwEgYJKwYBBAGCNxUBBAUCAwEAATAj
// SIG // BgkrBgEEAYI3FQIEFgQUKqdS/mTEmr6CkTxGNSnPEP8v
// SIG // BO4wHQYDVR0OBBYEFJ+nFV0AXmJdg/Tl0mWnG1M1Gely
// SIG // MFwGA1UdIARVMFMwUQYMKwYBBAGCN0yDfQEBMEEwPwYI
// SIG // KwYBBQUHAgEWM2h0dHA6Ly93d3cubWljcm9zb2Z0LmNv
// SIG // bS9wa2lvcHMvRG9jcy9SZXBvc2l0b3J5Lmh0bTATBgNV
// SIG // HSUEDDAKBggrBgEFBQcDCDAZBgkrBgEEAYI3FAIEDB4K
// SIG // AFMAdQBiAEMAQTALBgNVHQ8EBAMCAYYwDwYDVR0TAQH/
// SIG // BAUwAwEB/zAfBgNVHSMEGDAWgBTV9lbLj+iiXGJo0T2U
// SIG // kFvXzpoYxDBWBgNVHR8ETzBNMEugSaBHhkVodHRwOi8v
// SIG // Y3JsLm1pY3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0
// SIG // cy9NaWNSb29DZXJBdXRfMjAxMC0wNi0yMy5jcmwwWgYI
// SIG // KwYBBQUHAQEETjBMMEoGCCsGAQUFBzAChj5odHRwOi8v
// SIG // d3d3Lm1pY3Jvc29mdC5jb20vcGtpL2NlcnRzL01pY1Jv
// SIG // b0NlckF1dF8yMDEwLTA2LTIzLmNydDANBgkqhkiG9w0B
// SIG // AQsFAAOCAgEAnVV9/Cqt4SwfZwExJFvhnnJL/Klv6lwU
// SIG // tj5OR2R4sQaTlz0xM7U518JxNj/aZGx80HU5bbsPMeTC
// SIG // j/ts0aGUGCLu6WZnOlNN3Zi6th542DYunKmCVgADsAW+
// SIG // iehp4LoJ7nvfam++Kctu2D9IdQHZGN5tggz1bSNU5HhT
// SIG // dSRXud2f8449xvNo32X2pFaq95W2KFUn0CS9QKC/GbYS
// SIG // EhFdPSfgQJY4rPf5KYnDvBewVIVCs/wMnosZiefwC2qB
// SIG // woEZQhlSdYo2wh3DYXMuLGt7bj8sCXgU6ZGyqVvfSaN0
// SIG // DLzskYDSPeZKPmY7T7uG+jIa2Zb0j/aRAfbOxnT99kxy
// SIG // bxCrdTDFNLB62FD+CljdQDzHVG2dY3RILLFORy3BFARx
// SIG // v2T5JL5zbcqOCb2zAVdJVGTZc9d/HltEAY5aGZFrDZ+k
// SIG // KNxnGSgkujhLmm77IVRrakURR6nxt67I6IleT53S0Ex2
// SIG // tVdUCbFpAUR+fKFhbHP+CrvsQWY9af3LwUFJfn6Tvsv4
// SIG // O+S3Fb+0zj6lMVGEvL8CwYKiexcdFYmNcP7ntdAoGokL
// SIG // jzbaukz5m/8K6TT4JDVnK+ANuOaMmdbhIurwJ0I9JZTm
// SIG // dHRbatGePu1+oDEzfbzL6Xu/OHBE0ZDxyKs6ijoIYn/Z
// SIG // cGNTTY3ugm2lBRDBcQZqELQdVTNYs6FwZvKhggNNMIIC
// SIG // NQIBATCB+aGB0aSBzjCByzELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjElMCMGA1UECxMcTWljcm9zb2Z0IEFtZXJpY2EgT3Bl
// SIG // cmF0aW9uczEnMCUGA1UECxMeblNoaWVsZCBUU1MgRVNO
// SIG // OkE0MDAtMDVFMC1EOTQ3MSUwIwYDVQQDExxNaWNyb3Nv
// SIG // ZnQgVGltZS1TdGFtcCBTZXJ2aWNloiMKAQEwBwYFKw4D
// SIG // AhoDFQD5r3DVRpAGQo9sTLUHeBC87NpK+qCBgzCBgKR+
// SIG // MHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5n
// SIG // dG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVN
// SIG // aWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMTHU1p
// SIG // Y3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEwMA0GCSqG
// SIG // SIb3DQEBCwUAAgUA6StR0zAiGA8yMDIzMTIxODIzMTg0
// SIG // M1oYDzIwMjMxMjE5MjMxODQzWjB0MDoGCisGAQQBhFkK
// SIG // BAExLDAqMAoCBQDpK1HTAgEAMAcCAQACAhVMMAcCAQAC
// SIG // AhPDMAoCBQDpLKNTAgEAMDYGCisGAQQBhFkKBAIxKDAm
// SIG // MAwGCisGAQQBhFkKAwKgCjAIAgEAAgMHoSChCjAIAgEA
// SIG // AgMBhqAwDQYJKoZIhvcNAQELBQADggEBAG2wDfSocGlc
// SIG // 5BWXFXqZdFBbuhAUfDQDV6BPMlGxCPwhDxnJOMZeTp4T
// SIG // ujUx3UeS+eM78Mw2II6kOUcycEdVQTf9Ip+DSeX7XoUA
// SIG // v5wbGAbwN7Jiez0NazsIgMSmAM57UpY5qW4UDFRElMeR
// SIG // tVeEf3XK1fBEQsoiOvI8B7HniJgKQGpHf6+FVB5ZIq/s
// SIG // TQ8/cAzNPVMsXMF/d3LsdTlnQk6AQmZIn0PihRPE4+f5
// SIG // /odNAAE6zKPdLxEmYXOMXhQGJgXCm0FRY8RioWZO9Y2y
// SIG // GFVuD6ARVxOdLW58MUkilO8VrIbuU8R8MinjEzCTpD/7
// SIG // DRakZlcp+dkpk8RjA20eItsxggQNMIIECQIBATCBkzB8
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3Rv
// SIG // bjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1NaWNy
// SIG // b3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAxMAITMwAAAdYn
// SIG // af9yLVbIrgABAAAB1jANBglghkgBZQMEAgEFAKCCAUow
// SIG // GgYJKoZIhvcNAQkDMQ0GCyqGSIb3DQEJEAEEMC8GCSqG
// SIG // SIb3DQEJBDEiBCDdlzpmnXUf+c7PYvN59igEhttKc6dy
// SIG // ErFCq9h3WURLTDCB+gYLKoZIhvcNAQkQAi8xgeowgecw
// SIG // geQwgb0EINbLTQ1XeNM+EBinOEJMjZd0jMNDur+AK+O8
// SIG // P12j5ST8MIGYMIGApH4wfDELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUtU3RhbXAg
// SIG // UENBIDIwMTACEzMAAAHWJ2n/ci1WyK4AAQAAAdYwIgQg
// SIG // yJkKpRhoieZdAV5ph/jTXUhZ9QBxRpahNKN41piuaIIw
// SIG // DQYJKoZIhvcNAQELBQAEggIAwkXBdCk3byshZhSVq4JO
// SIG // Dmmo/dhO0CFiQuG5aJgN7WDr6QablqIOQu4HoLPCXM5U
// SIG // cdx5wzMtlYAzDlBLwhT0QSM/5o1xUyShfvR9htL76h67
// SIG // LvvpATg8Jluz/CHtmbNoYGayk1Vl6hLPchS8CwbIHVhe
// SIG // 5ZNU5EIx07vTQGErqMlArkbe17YRNoVrvE4pjmN59FW6
// SIG // /0HQNI143Mwx20fhgoEc29wB8eIAoZC85CX8+bmOYmsw
// SIG // 6LT+ya1Ggi8zKKVBQwbdj5iRrhcUqDA5poXnIIbH9zxM
// SIG // cX/FiLOUxFlPIRLhpGIAzttIQJ5a1ZeUzZ3PK3v7ep8e
// SIG // oGVQRCrAQ1RUEH1eyBvDy9RaayDv2ALRofefju9/DufQ
// SIG // 5k9CwMoGSizTxTkOYfzhJ6gDzTuWUimvLsCYAes5i3xI
// SIG // fTPwb57wk/XNGnqr6Fu7peJqc1P8Ph3337by+P3vatcJ
// SIG // SOJW9Htag6Q8D18WhTFSalbZ3XiwQeEWkjT7kN/hib6G
// SIG // jPl3szWErgJZ3QWiWyRyBdhDl17jShZ+Wb0P9RY1d6AQ
// SIG // skgX2QE0b74KTul243JXqiL+6cAiccOnm0NHZDjyMIMU
// SIG // O8fSb12U1BAX+5tTYrkAFkvdxYwkdLrBfcxhXaUU2obs
// SIG // KvT2FnMHMSq67yy4pPRXqtvRpOxYUPHwfG9uph2a5lFfJzE=
// SIG // End signature block
