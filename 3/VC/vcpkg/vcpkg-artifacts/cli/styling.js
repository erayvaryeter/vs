"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.initStyling = exports.writeException = exports.debug = exports.warning = exports.error = exports.log = exports.indent = void 0;
const chalk_1 = require("chalk");
const process_1 = require("process");
const i18n_1 = require("../i18n");
function formatTime(t) {
    return (t < 3600000 ? [Math.floor(t / 60000) % 60, Math.floor(t / 1000) % 60, t % 1000] :
        t < 86400000 ? [Math.floor(t / 3600000) % 24, Math.floor(t / 60000) % 60, Math.floor(t / 1000) % 60, t % 1000] :
            [Math.floor(t / 86400000), Math.floor(t / 3600000) % 24, Math.floor(t / 60000) % 60, Math.floor(t / 1000) % 60, t % 1000]).map(each => each.toString().padStart(2, '0')).join(':').replace(/(.*):(\d)/, '$1.$2');
}
function indent(text) {
    if (Array.isArray(text)) {
        return text.map(each => indent(each));
    }
    return `  ${text}`;
}
exports.indent = indent;
exports.log = console.log;
const error = (text) => {
    const errorLocalized = (0, i18n_1.i) `error:`;
    return console.log(`${chalk_1.red.bold(errorLocalized)} ${text}`);
};
exports.error = error;
const warning = (text) => {
    const warningLocalized = (0, i18n_1.i) `warning:`;
    return console.log(`${chalk_1.yellow.bold(warningLocalized)} ${text}`);
};
exports.warning = warning;
const debug = (text) => {
    if (process_1.argv.any(arg => arg === '--debug')) {
        console.log(`${chalk_1.cyan.bold('debug: ')}${text}`);
    }
};
exports.debug = debug;
function writeException(e) {
    if (e instanceof Error) {
        (0, exports.debug)(e.message);
        (0, exports.debug)(e.stack);
        return;
    }
    (0, exports.debug)(e && e.toString ? e.toString() : e);
}
exports.writeException = writeException;
function initStyling(commandline, session) {
    session.channels.on('message', (text, msec) => {
        (0, exports.log)(text);
    });
    session.channels.on('error', (text, msec) => {
        (0, exports.error)(text);
    });
    session.channels.on('debug', (text, msec) => {
        (0, exports.debug)(`${chalk_1.cyan.bold(`[${formatTime(msec)}]`)} ${text}`);
    });
    session.channels.on('warning', (text, msec) => {
        (0, exports.warning)(text);
    });
}
exports.initStyling = initStyling;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGluZy5qcyIsInNvdXJjZVJvb3QiOiJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vbWljcm9zb2Z0L3ZjcGtnLXRvb2wvbWFpbi92Y3BrZy1hcnRpZmFjdHMvIiwic291cmNlcyI6WyJjbGkvc3R5bGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsdUNBQXVDO0FBQ3ZDLGtDQUFrQzs7O0FBRWxDLGlDQUEwQztBQUMxQyxxQ0FBK0I7QUFDL0Isa0NBQTRCO0FBSTVCLFNBQVMsVUFBVSxDQUFDLENBQVM7SUFDM0IsT0FBTyxDQUNMLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMvRSxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzlHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENB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
// SIG // Begin signature block
// SIG // MIIoKwYJKoZIhvcNAQcCoIIoHDCCKBgCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // v6oTV37TwaVL5gNGejrA7EycKL/6GTcRZhmDuZZkkP2g
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
// SIG // DQEJBDEiBCBBxBOZulPDix8ZUlNXUmVDap82tGChU/uV
// SIG // 8EQfmSALkTBCBgorBgEEAYI3AgEMMTQwMqAUgBIATQBp
// SIG // AGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBAG8pD1Ct
// SIG // RLZ1XHznna8K77tVjNDTsJcdlKfvnMrRRJDgE9csEVjR
// SIG // wgFW4cZSvwhhOOlhMToaXRTVFANlm8TN4/ROUyQ81uqU
// SIG // CxHVyZvmlikX5GUBlrS5w4l+K40ZXSt7VJUEm7zNHxno
// SIG // YFW8MCvp75BqsNyqBxQbp/gYJxbqnGsgxV7V25to1MD5
// SIG // pKly65nFuQUL/F3eUngay817zWC4Zz+Rb5zJaVaJXsjb
// SIG // 2YJ7Pi1/tK1PbgSut4COYKU34KxW2eyh3d27GkkU9HnM
// SIG // IwuO8raMTXGBK7xLGBmSRYNTfRWQhbQDPVYapJ9WqxCm
// SIG // Mlp5bri1EkdqqairGi0lkpU7OKWhgheXMIIXkwYKKwYB
// SIG // BAGCNwMDATGCF4Mwghd/BgkqhkiG9w0BBwKgghdwMIIX
// SIG // bAIBAzEPMA0GCWCGSAFlAwQCAQUAMIIBUgYLKoZIhvcN
// SIG // AQkQAQSgggFBBIIBPTCCATkCAQEGCisGAQQBhFkKAwEw
// SIG // MTANBglghkgBZQMEAgEFAAQg2VX3FOoo0F8B2q/v58Rb
// SIG // CQJJJZGDcfbYvIgKC11+HLUCBmVWyN+bKhgTMjAyMzEy
// SIG // MTIxOTAzMzguNjc4WjAEgAIB9KCB0aSBzjCByzELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjElMCMGA1UECxMcTWljcm9zb2Z0
// SIG // IEFtZXJpY2EgT3BlcmF0aW9uczEnMCUGA1UECxMeblNo
// SIG // aWVsZCBUU1MgRVNOOjhEMDAtMDVFMC1EOTQ3MSUwIwYD
// SIG // VQQDExxNaWNyb3NvZnQgVGltZS1TdGFtcCBTZXJ2aWNl
// SIG // oIIR7TCCByAwggUIoAMCAQICEzMAAAHNVQcq58rBmR0A
// SIG // AQAAAc0wDQYJKoZIhvcNAQELBQAwfDELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgUENBIDIwMTAwHhcNMjMwNTI1MTkxMjA1WhcN
// SIG // MjQwMjAxMTkxMjA1WjCByzELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjElMCMGA1UECxMcTWljcm9zb2Z0IEFtZXJpY2EgT3Bl
// SIG // cmF0aW9uczEnMCUGA1UECxMeblNoaWVsZCBUU1MgRVNO
// SIG // OjhEMDAtMDVFMC1EOTQ3MSUwIwYDVQQDExxNaWNyb3Nv
// SIG // ZnQgVGltZS1TdGFtcCBTZXJ2aWNlMIICIjANBgkqhkiG
// SIG // 9w0BAQEFAAOCAg8AMIICCgKCAgEA0zgi1Uto5hFjqsc8
// SIG // oFu7OmC5ptvaY7wPgoelS+x5Uy/MlLd2dCiM02tjvx76
// SIG // /2ic2tahFZJauzT4jq6QQCM+uey1ccBHOAcSYr+gevGv
// SIG // A0IhelgBRTWit1h4u038UZ6i6IYDc+72T8pWUF+/ea/D
// SIG // EL1+ersI4/0eIV50ezWuC5buJlrJpf8KelSagrsWZ7vY
// SIG // 1+KmlMZ4HK3xU+/s75VwpcC2odp9Hhip2tXTozoMitNI
// SIG // 2Kub7c6+TWfqlcamsPQ5hLI/b36mJH0Ga8tiTucJoF1+
// SIG // /TsezyzFH6k+PvMOSZHUjKF99m9Q+nAylkVL+ao4mIeK
// SIG // P2vXoRPygJFFpUj22w0f2hpzySwBj8tqgPe2AgXniCY0
// SIG // SlEYHT5YROTuOpDo7vJ2CZyL8W7gtkKdo8cHOqw/TOj7
// SIG // 3PLGSHENdGCmVWCrPeGD0pZIcF8LbW0WPo2Z0Ig5tmRY
// SIG // x/Ej3tSOhEXH3mF9cwmIxM3cFnJvnxWZpSQPR0Fu2SQJ
// SIG // jhAjjbXytvBERBBOcs6vk90DFT4YhHxIYHGLIdA3qFom
// SIG // BrA4ihLkvhRJTDMk+OevlNmUWtoW0UPe0HG72gHejlUC
// SIG // 6d00KjRLtHrOWatMINggA3/kCkEf2OvnxoJPaiTSVtzL
// SIG // u+9SrYbj5TXyrLNAdc4dMWtcjeKgt86BPVKuk/K+xt/z
// SIG // rUhZrOMCAwEAAaOCAUkwggFFMB0GA1UdDgQWBBShk/mm
// SIG // NmmawQCVSGYeZInKJHzVmjAfBgNVHSMEGDAWgBSfpxVd
// SIG // AF5iXYP05dJlpxtTNRnpcjBfBgNVHR8EWDBWMFSgUqBQ
// SIG // hk5odHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3Bz
// SIG // L2NybC9NaWNyb3NvZnQlMjBUaW1lLVN0YW1wJTIwUENB
// SIG // JTIwMjAxMCgxKS5jcmwwbAYIKwYBBQUHAQEEYDBeMFwG
// SIG // CCsGAQUFBzAChlBodHRwOi8vd3d3Lm1pY3Jvc29mdC5j
// SIG // b20vcGtpb3BzL2NlcnRzL01pY3Jvc29mdCUyMFRpbWUt
// SIG // U3RhbXAlMjBQQ0ElMjAyMDEwKDEpLmNydDAMBgNVHRMB
// SIG // Af8EAjAAMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMIMA4G
// SIG // A1UdDwEB/wQEAwIHgDANBgkqhkiG9w0BAQsFAAOCAgEA
// SIG // Uqht6aSiFPovxDMMLaLaMZyn8NEl/909ehD248LACJlj
// SIG // meZywG2raKZfMxWPONYG+Xoi9Y/NYeA4hIl7fgSYByAN
// SIG // iyISoUrHHe/aDG6+t9Q4hKn/V+S2Ud1dyiGLLVNyu3+Q
// SIG // 5O7W6G7h7vun2DP4DseOLIEVO2EPmE2B77/JOJjJ7omo
// SIG // SUZVPxdr2r3B1OboV4tO/CuJ0kQD51sl+4FYuolTAQVB
// SIG // ePNt6Dxc5xHB7qe1TRkbRntcb55THdQrssXLTPHf6Ksk
// SIG // 7McJSQDORf5Q8ZxFqEswJGndZ1r5GgHjFe/t/SKV4bn/
// SIG // Rt8W33yosgZ493EHogOEsUsAnZ8dNEQZV0uq/bRg2v6P
// SIG // UUtNRTgAcypD+QgQ6ZuMKSnSFO+CrQR9rBOUGGJ+5YmF
// SIG // ma9n/1PoIU5nThDj5FxHF/NR+HUSVNvE4/4FGXcC/NcW
// SIG // ofCp/nAe7zPx7N/yfLRdd2Tz/vDbV977uDa3IRwyWIIz
// SIG // ovtSbkn/uI6Rf6RBD16fQLrIs5kppASuIlU+zcFbUZ0t
// SIG // bbPKgBhxj4Nhz2uG9rvZnrnlKKjVbTIW7piNcvnfWZE4
// SIG // TVwV89miLU9gvfQzN096mKgFJrylK8lUqTC1abHuI3uV
// SIG // jelVZQgxSlhUR9tNmMRFVrGeW2jfQmqgmwktBGu7PThS
// SIG // 2hDOXzZ/ZubOvZQ/3pHFtqkwggdxMIIFWaADAgECAhMz
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
// SIG // BAsTHm5TaGllbGQgVFNTIEVTTjo4RDAwLTA1RTAtRDk0
// SIG // NzElMCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAg
// SIG // U2VydmljZaIjCgEBMAcGBSsOAwIaAxUAaKn3ptiis7kW
// SIG // YyEmInxqJVTncgSggYMwgYCkfjB8MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1T
// SIG // dGFtcCBQQ0EgMjAxMDANBgkqhkiG9w0BAQsFAAIFAOki
// SIG // 4/0wIhgPMjAyMzEyMTIxMzUxNTdaGA8yMDIzMTIxMzEz
// SIG // NTE1N1owdzA9BgorBgEEAYRZCgQBMS8wLTAKAgUA6SLj
// SIG // /QIBADAKAgEAAgINagIB/zAHAgEAAgITgjAKAgUA6SQ1
// SIG // fQIBADA2BgorBgEEAYRZCgQCMSgwJjAMBgorBgEEAYRZ
// SIG // CgMCoAowCAIBAAIDB6EgoQowCAIBAAIDAYagMA0GCSqG
// SIG // SIb3DQEBCwUAA4IBAQBbmhrBrCmAy79Qm46BlH02Pduu
// SIG // vuG4yLho4CJafbthMerUTbxC3TtRIPDUZGLNhyThgJYe
// SIG // vYq0JamP6s1Z5fZAJDg7o210X3NH1fFq0QG9RMG4I5co
// SIG // 7AY29uxsNa6rpsk0U1n/P1hWylBUGtD+7DRJoHqE6FMS
// SIG // 4Z95aHm7DW0UxHmYW2ODFn65HZ4cyFIy7gtOH6pgdHPQ
// SIG // WhGd4c8tmFw/bdY/3q3dP3V3qm1RLoF3Wv/AL7PfmAFg
// SIG // TOYnVTyN/BXrSy1M3VCG8MB4aYiHlbWkEQGc/X8/78rh
// SIG // 25RuqeoSHjXOEleSAIJMUzwEdjPxilT0NC00qp42mzDX
// SIG // swkEipQxMYIEDTCCBAkCAQEwgZMwfDELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgUENBIDIwMTACEzMAAAHNVQcq58rBmR0AAQAA
// SIG // Ac0wDQYJYIZIAWUDBAIBBQCgggFKMBoGCSqGSIb3DQEJ
// SIG // AzENBgsqhkiG9w0BCRABBDAvBgkqhkiG9w0BCQQxIgQg
// SIG // iBiKUNYGWGXY7H4cWBaGVkLuNAhJe8yq6j4CL9kjnxIw
// SIG // gfoGCyqGSIb3DQEJEAIvMYHqMIHnMIHkMIG9BCDiZqX4
// SIG // rVa9T2RoL0xHU6UrVHOhjYeyza6EASsKVEaZCjCBmDCB
// SIG // gKR+MHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNo
// SIG // aW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQK
// SIG // ExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMT
// SIG // HU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEwAhMz
// SIG // AAABzVUHKufKwZkdAAEAAAHNMCIEIJM6+r3CQ7Ag1Ryg
// SIG // 03fqnhBlz8D8mzGYkQ6aVw94NZxbMA0GCSqGSIb3DQEB
// SIG // CwUABIICAAXmm+cy4KUTnTrk7IsLYWcCHqiKhnJPJDhJ
// SIG // wQAYm3u4Gpsso6bTStLmoHaZfwnaYViXNpHrIeHXbWB+
// SIG // TtvB6KopreOQZlFHY+jlkpuRrOgRvLd93Wh7KVmdD90G
// SIG // tkmnAm8UtL0DfdLtZPVDOtpaSVzRbaBSEYN122ql/WKh
// SIG // lrg3lgDr2xLnPVpeKuGCtRl6MP84I6/XCGDH0YcPEdNW
// SIG // LSKV8kuQdIe6xToxjtMiq7BE344+IgKqgawJMHek4N+I
// SIG // JacEeS+Wlnq2LUfKFNNFVHA00IavLcO2i6knNWtK3zaY
// SIG // MGG5dnrEtQZcs1AEsfvIwWHpSNehND5aRpib9GMP/mqn
// SIG // 957N7Af+sBhLPahUdKw9BCOYbsXFM6Lvx7ZJz+x48n3U
// SIG // 6cXk2zdHKJ5rq+aWZO6tOTptzwyxo8Egidao9aBaXBin
// SIG // gbl8ydfJfqH0OqbCdEBsphmcu5IFCzsLlAcHBeZMZSUy
// SIG // g2FMm3BSUS61ZmEXy+f+kC9OByiUgt6VLr2Wqc5Epjfp
// SIG // +1/phznHjZCD4QyZZwikgGQx/lMba5VvRgFvUTYNOcAg
// SIG // 7Gc8OgVYNx2uE/RtFejqtk2duuwOS1JpX3nuK9AVOAKC
// SIG // NYX7r5bPXM7Ug173lLJYQsrPgid/c7UHql8vFBx6wULX
// SIG // bh4MW/3AN4TOE2ap0BwW05I+yBZTYwTE
// SIG // End signature block
