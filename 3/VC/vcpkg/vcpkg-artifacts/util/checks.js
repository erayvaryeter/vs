"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.isGithubRepo = exports.checkOptionalArrayOfStrings = exports.checkOptionalBool = exports.checkOptionalString = exports.isIterable = exports.isNullish = exports.isPrimitive = void 0;
const yaml_1 = require("yaml");
const i18n_1 = require("../i18n");
const error_kind_1 = require("../interfaces/error-kind");
/** @internal */
function isPrimitive(value) {
    switch (typeof value) {
        case 'string':
        case 'number':
        case 'boolean':
            return true;
    }
    return false;
}
exports.isPrimitive = isPrimitive;
/** @internal */
function isNullish(value) {
    return value === null || value === undefined || value === '' || value === 0;
}
exports.isNullish = isNullish;
/** @internal */
function isIterable(source) {
    return !!source && typeof (source) !== 'string' && !!source[Symbol.iterator];
}
exports.isIterable = isIterable;
function* checkOptionalString(parent, range, name) {
    switch (typeof parent.get(name)) {
        case 'string':
        case 'undefined':
            break;
        default:
            yield { message: (0, i18n_1.i) `${name} must be a string`, range: range, category: error_kind_1.ErrorKind.IncorrectType };
    }
}
exports.checkOptionalString = checkOptionalString;
function* checkOptionalBool(parent, range, name) {
    switch (typeof parent.get(name)) {
        case 'boolean':
        case 'undefined':
            break;
        default:
            yield { message: (0, i18n_1.i) `${name} must be a bool`, range: range, category: error_kind_1.ErrorKind.IncorrectType };
    }
}
exports.checkOptionalBool = checkOptionalBool;
function checkOptionalArrayOfStringsImpl(parent, range, name) {
    const val = parent.get(name);
    if ((0, yaml_1.isSeq)(val)) {
        for (const entry of val.items) {
            if (!(0, yaml_1.isScalar)(entry) || typeof entry.value !== 'string') {
                return true;
            }
        }
    }
    else if (typeof val !== 'undefined') {
        return true;
    }
    return false;
}
function* checkOptionalArrayOfStrings(parent, range, name) {
    if (checkOptionalArrayOfStringsImpl(parent, range, name)) {
        yield { message: (0, i18n_1.i) `${name} must be an array of strings, or unset`, range: range, category: error_kind_1.ErrorKind.IncorrectType };
    }
}
exports.checkOptionalArrayOfStrings = checkOptionalArrayOfStrings;
function isGithubRepo(uri) {
    return uri.authority.toLowerCase() === 'github.com' && !!(/\/[a-zA-Z0-9-_]*\/[a-zA-Z0-9-_]*$/g.exec(uri.path));
}
exports.isGithubRepo = isGithubRepo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tzLmpzIiwic291cmNlUm9vdCI6Imh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9taWNyb3NvZnQvdmNwa2ctdG9vbC9tYWluL3ZjcGtnLWFydGlmYWN0cy8iLCJzb3VyY2VzIjpbInV0aWwvY2hlY2tzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1Q0FBdUM7QUFDdkMsa0NBQWtDOzs7QUFFbEMsK0JBQWdEO0FBQ2hELGtDQUE0QjtBQUM1Qix5REFBcUQ7QUFJckQsZ0JBQWdCO0FBQ2hCLFNBQWdCLFdBQVcsQ0FBQyxLQUFVO0lBQ3BDLFFBQVEsT0FBTyxLQUFLLEVBQUU7UUFDcEIsS0FBSyxRQUFRLENBQUM7UUFDZCxLQUFLLFFBQVEsQ0FBQztRQUNkLEtBQUssU0FBUztZQUNaLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFSRCxrQ0FRQztBQUVELGdCQUFnQjtBQUNoQixTQUFnQixTQUFTLENBQUMsS0FBVTtJQUNsQyxPQUFPLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssRUFBRSxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUM7QUFDOUUsQ0FBQztBQUZELDhCQUVDO0FBRUQsZ0JBQWdCO0FBQ2hCLFNBQWdCLFVBQVUsQ0FBSSxNQUFXO0lBQ3ZDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssUUFBUSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQy9FLENBQUM7QUFGRCxnQ0FFQztBQUVELFFBQWUsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLE1BQWUsRUFBRSxLQUErQixFQUFFLElBQVk7SUFDakcsUUFBUSxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDL0IsS0FBSyxRQUFRLENBQUM7UUFDZCxLQUFLLFdBQVc7WUFDZCxNQUFNO1FBQ1I7WUFDRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUEsUUFBQyxFQUFBLEdBQUcsSUFBSSxtQkFBbUIsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxzQkFBUyxDQUFDLGFBQWEsRUFBRSxDQUFDO0tBQ25HO0FBQ0gsQ0FBQztBQVJELGtEQVFDO0FBRUQsUUFBZSxDQUFDLENBQUMsaUJBQWlCLENBQUMsTUFBZSxFQUFFLEtBQStCLEVBQUUsSUFBWTtJQUMvRixRQUFRLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUMvQixLQUFLLFNBQVMsQ0FBQztRQUNmLEtBQUssV0FBVztZQUNkLE1BQU07UUFDUjtZQUNFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBQSxRQUFDLEVBQUEsR0FBRyxJQUFJLGlCQUFpQixFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLHNCQUFTLENBQUMsYUFBYSxFQUFFLENBQUM7S0FDakc7QUFDSCxDQUFDO0FBUkQsOENBUUM7QUFFRCxTQUFTLCtCQUErQixDQUFDLE1BQWUsRUFBRSxLQUErQixFQUFFLElBQVk7SUFDckcsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixJQUFJLElBQUEsWUFBSyxFQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ2QsS0FBSyxNQUFNLEtBQUssSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFO1lBQzdCLElBQUksQ0FBQyxJQUFBLGVBQVEsRUFBQyxLQUFLLENBQUMsSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFO2dCQUN2RCxPQUFPLElBQUksQ0FBQzthQUNiO1NBQ0Y7S0FDRjtTQUFNLElBQUksT0FBTyxHQUFHLEtBQUssV0FBVyxFQUFFO1FBQ3JDLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFFRCxRQUFlLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxNQUFlLEVBQUUsS0FBK0IsRUFBRSxJQUFZO0lBQ3pHLElBQUksK0JBQStCLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRTtRQUN4RCxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUEsUUFBQyxFQUFBLEdBQUcsSUFBSSx3Q0FBd0MsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxzQkFBUyxDQUFDLGFBQWEsRUFBRSxDQUFDO0tBQ3RIO0FBQ0gsQ0FBQztBQUpELGtFQUlDO0FBRUQsU0FBZ0IsWUFBWSxDQUFDLEdBQVE7SUFDbkMsT0FBTyxHQUFHLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxLQUFLLFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxvQ0FBb0MsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDakgsQ0FBQztBQUZELG9DQUVDIn0=
// SIG // Begin signature block
// SIG // MIIoKwYJKoZIhvcNAQcCoIIoHDCCKBgCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // DNCGfk+QmLQ03bRyBYCW94K/O4IV3RLwsNDPxZD7qcug
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
// SIG // DQEJBDEiBCBkbEUexJ8K3MXrsa+YZBzjl1kvBbQOb8G8
// SIG // YMQ+24OrizBCBgorBgEEAYI3AgEMMTQwMqAUgBIATQBp
// SIG // AGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBADZpmp13
// SIG // X+ICS1RcQSs8wZ2KyuXCtahfPKTP02HcvF8HV2lHSE3E
// SIG // +DS8Zd4cerBMpJGHMRNbUgnIBJV50rRf20bpD/5NXYEk
// SIG // ICdy8Z11dqVboAJUJYdrsTa7Ay7JAg+GYCe8nZDwz26g
// SIG // gZNkHmgKtF3TQ3EclxPPOpc1IJZehy/X+plWG7PWEtwv
// SIG // P7OX9xSIeqvpN4tHVFej4U6rnY1r4AKTDSC+iCaLO5Wz
// SIG // vpsr3wzLHGrmeOeqy6NMTGl213ezgV1Ov6POVtWbLcA6
// SIG // tCDv6oAHLE7No+zZxfJDqFHg5FIYZNN1fbXrKHfeYmHY
// SIG // 3+nORUC9neObE5HUDX6ljnekpPehgheXMIIXkwYKKwYB
// SIG // BAGCNwMDATGCF4Mwghd/BgkqhkiG9w0BBwKgghdwMIIX
// SIG // bAIBAzEPMA0GCWCGSAFlAwQCAQUAMIIBUgYLKoZIhvcN
// SIG // AQkQAQSgggFBBIIBPTCCATkCAQEGCisGAQQBhFkKAwEw
// SIG // MTANBglghkgBZQMEAgEFAAQgSfH14tRUPiU10PtmUwTw
// SIG // 8A9LabA9TthUM8Y6Bbs1Di0CBmVo24AwLBgTMjAyMzEy
// SIG // MTIxOTAzMzcuNjcxWjAEgAIB9KCB0aSBzjCByzELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjElMCMGA1UECxMcTWljcm9zb2Z0
// SIG // IEFtZXJpY2EgT3BlcmF0aW9uczEnMCUGA1UECxMeblNo
// SIG // aWVsZCBUU1MgRVNOOjM3MDMtMDVFMC1EOTQ3MSUwIwYD
// SIG // VQQDExxNaWNyb3NvZnQgVGltZS1TdGFtcCBTZXJ2aWNl
// SIG // oIIR7TCCByAwggUIoAMCAQICEzMAAAHU5OkDL8CsaawA
// SIG // AQAAAdQwDQYJKoZIhvcNAQELBQAwfDELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgUENBIDIwMTAwHhcNMjMwNTI1MTkxMjI3WhcN
// SIG // MjQwMjAxMTkxMjI3WjCByzELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjElMCMGA1UECxMcTWljcm9zb2Z0IEFtZXJpY2EgT3Bl
// SIG // cmF0aW9uczEnMCUGA1UECxMeblNoaWVsZCBUU1MgRVNO
// SIG // OjM3MDMtMDVFMC1EOTQ3MSUwIwYDVQQDExxNaWNyb3Nv
// SIG // ZnQgVGltZS1TdGFtcCBTZXJ2aWNlMIICIjANBgkqhkiG
// SIG // 9w0BAQEFAAOCAg8AMIICCgKCAgEAmFPeLZsCJJd+d0ln
// SIG // o9cm1nEgG7vBS8ExLTr8N7lzKWtQ5w1w8G7ZC3PqE/AT
// SIG // bYvLft/E8JLX4KADPTfwTh8k+AqVwdR8J9WGKL7mLo6E
// SIG // FfZJslOg+kLbUyCje32U46DbSISOQgZMEvjJMAsHWjcs
// SIG // kr48D72bsR/ETXDjgfAAQ4SR/r8P43r/httBxNBsGnd9
// SIG // t8eLgOLS5BNHvcmg+8f7NRd5bezYuO6STBjC6mUAiu1A
// SIG // lHlmrlhfcGSDUOOfbUjyHv8SurbS8mB83dw3kUS8UD/+
// SIG // 3O6DyTwxYKWxgdh0SWhNKbkUQ6Igz+yScWK/kwRMYSNr
// SIG // pWVm4C+An1msMG9S7CZhViR26hq+qNIq1uyKg5H9qhGz
// SIG // EU9VlDNeReaAXOS4NfJW97FFu5ET7ysJn2kQZK5opdB/
// SIG // 7b9x2MhOgOPdGRRHD5Onc2ACnwnt7yqUVROHT6AylZwi
// SIG // 1Ey5KtX/6Z7g/2RhydnG7iHq/bpkGLvxc9Qwa3gvAkbN
// SIG // 8yZuPByEt623i1GLvwvd41SCTpaygL/6pmEcpow5qX82
// SIG // b37xgRlGzqcfuKH8KgUy7oQHzuxWc99/DbbIw86t7Ikd
// SIG // HD++KfVLjV9U6c+CmSzPBpc2S43t2h3w95rpazyDIqZ1
// SIG // agZJGNdmtrJbGyJY3t7qvAUq4+9uf8BwreB8l1uFoExj
// SIG // 4s8hMU0CAwEAAaOCAUkwggFFMB0GA1UdDgQWBBQ82ozH
// SIG // cLQGehKAeR3nXLK7tAx2STAfBgNVHSMEGDAWgBSfpxVd
// SIG // AF5iXYP05dJlpxtTNRnpcjBfBgNVHR8EWDBWMFSgUqBQ
// SIG // hk5odHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3Bz
// SIG // L2NybC9NaWNyb3NvZnQlMjBUaW1lLVN0YW1wJTIwUENB
// SIG // JTIwMjAxMCgxKS5jcmwwbAYIKwYBBQUHAQEEYDBeMFwG
// SIG // CCsGAQUFBzAChlBodHRwOi8vd3d3Lm1pY3Jvc29mdC5j
// SIG // b20vcGtpb3BzL2NlcnRzL01pY3Jvc29mdCUyMFRpbWUt
// SIG // U3RhbXAlMjBQQ0ElMjAyMDEwKDEpLmNydDAMBgNVHRMB
// SIG // Af8EAjAAMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMIMA4G
// SIG // A1UdDwEB/wQEAwIHgDANBgkqhkiG9w0BAQsFAAOCAgEA
// SIG // tMVDz/srcJLXUYWJWfQZOP2y8yzs6vsHAu1QGkUBxkUv
// SIG // iD8lP/Di4laF3KMiiiokUOyvXPdDnTPqi+D4syp0rSww
// SIG // bFk/nbNYWsjZE8J4VXGXgNRBipTWb3ZU7AlMSeQu8qGU
// SIG // JgPtpaZNODxo3BYR9YBkaYc/rXAzSvwrSifj6xLjY+7I
// SIG // JgaKfyRUHGMpoj/76/nbnaykHkrXE1fVtd3JthQ+Rf11
// SIG // jt+04vhuE4NQZFNuUQPrfEQlsvyB7oN662M6lHHVUau1
// SIG // IEZeNGCJEzZ7nKOp8u7xAZlhY3K+0pL6P0FrnjvDQLz9
// SIG // mSn90DH4nZh9cb8cfYfcFVOq7xEPz1CYt6aKWLK0CrqI
// SIG // KYXT6h2eY/TqEPhIwAlH4CZR55/BlWz1t8RqZQpF28hB
// SIG // 4XkDXf2t1/9s6UsBETjnMtWGnkKrn5RopQH9MuNABSql
// SIG // tkNck29fXEVwaUc22VTvkV1AeAOlC9RNV47c6/2/as/V
// SIG // OFDVfMMvGL/9O26d4QBX8QeJp9HPjzvmBb9mLFb2AE1S
// SIG // NpcC/UA0hLfBdEVui3pMT3725JlUkcD+qX+QFH5KqKCm
// SIG // uqX6kwp3aRk+9R8opbXpWjIUVLDVZGiswCa1KBEko+7E
// SIG // z9WRokvSYCPqdwDuX5zIbd5ixzIOvBrM0h+Fst71AyaY
// SIG // 1E2C7Wk1pELc+lKmTze1l4YwggdxMIIFWaADAgECAhMz
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
// SIG // BAsTHm5TaGllbGQgVFNTIEVTTjozNzAzLTA1RTAtRDk0
// SIG // NzElMCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAg
// SIG // U2VydmljZaIjCgEBMAcGBSsOAwIaAxUALTNdlo6NscQO
// SIG // bHbswf9x3c2ZokiggYMwgYCkfjB8MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1T
// SIG // dGFtcCBQQ0EgMjAxMDANBgkqhkiG9w0BAQsFAAIFAOkj
// SIG // Ky8wIhgPMjAyMzEyMTIxODU1NDNaGA8yMDIzMTIxMzE4
// SIG // NTU0M1owdzA9BgorBgEEAYRZCgQBMS8wLTAKAgUA6SMr
// SIG // LwIBADAKAgEAAgIdUQIB/zAHAgEAAgITmTAKAgUA6SR8
// SIG // rwIBADA2BgorBgEEAYRZCgQCMSgwJjAMBgorBgEEAYRZ
// SIG // CgMCoAowCAIBAAIDB6EgoQowCAIBAAIDAYagMA0GCSqG
// SIG // SIb3DQEBCwUAA4IBAQA2SYYF2YnTr1hewke028QP+VNo
// SIG // Kx4Tt+oEqTFtZmRcsc7BwvO0UgcFbjpYw9JmRuL0cK96
// SIG // HxiRlJIhyDT+vYUXnAfckPa1w9h/FKZrpbarWJvbVOSe
// SIG // BiWpZcWZQ7tHNHxyUhquaWUiLCCHAByIEbMymkMbploN
// SIG // dmn8ziTT/ZokgodSJ1ICqe/WNuFHFMN4ZmzrXrC5zmRJ
// SIG // goJXEPWVMB1xqzPlpNvuTM8ElkuqlBVRSxgh/SbUy979
// SIG // 1fl4o0SoB5wc9Ou8hE5pMa1rXo8HPPFUtwpGa0U1TXO2
// SIG // eMCE/7Bp2OUbbbx/xVrsJlAOM09yExYiz6Qp43r/hJlE
// SIG // WqREsDdVMYIEDTCCBAkCAQEwgZMwfDELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgUENBIDIwMTACEzMAAAHU5OkDL8CsaawAAQAA
// SIG // AdQwDQYJYIZIAWUDBAIBBQCgggFKMBoGCSqGSIb3DQEJ
// SIG // AzENBgsqhkiG9w0BCRABBDAvBgkqhkiG9w0BCQQxIgQg
// SIG // 54r6IEO/In6bP5A3A1vGxOdTx29G+5HXOoDoJ5kRgLow
// SIG // gfoGCyqGSIb3DQEJEAIvMYHqMIHnMIHkMIG9BCDM6of6
// SIG // 2BSlzpc71kucQrT4vWlPnwVJMSK4l6dlkz1iNzCBmDCB
// SIG // gKR+MHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNo
// SIG // aW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQK
// SIG // ExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMT
// SIG // HU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEwAhMz
// SIG // AAAB1OTpAy/ArGmsAAEAAAHUMCIEIGHblMYwQPrTiB/l
// SIG // /8JTiwCEXy7uh+4pCbi2SXZyAJ3mMA0GCSqGSIb3DQEB
// SIG // CwUABIICAGZ3qPoNQ1emW3rI/+/1ZZ2ZaUd/D7u0FshH
// SIG // UIetSGIm1j9T8c83JhZ3+9Zj3DpBbBQgA+BeJLLLk4K7
// SIG // jcIUxJuC7YJhC1OdUVfXFBh+3T58x3dyI3Uc/9hyXFNq
// SIG // VOF/tg2OP26f3/Z6pe17FL1ZSgjnLRVMhK6+FFwBpPrQ
// SIG // oRkkH3UmSomy+pzXvwxyh1SegBJn4Zhesw7zG/79hVHX
// SIG // Pi1GNYIwrC3h6K06hYp02b7IUkgbJG55DVLvL1F2pkTR
// SIG // kOb2s5Wup4HrmSc2cCj9RhjtMyFHMYViKvi7Lv/KP06V
// SIG // YV3hC5tRwmqcl40dQ3MCf4sW2U6bV8LZwjT1e/TlGEet
// SIG // BQ5m9C0/EPEtSJ/GSGssKYYtTsxn+nbVSpN6bkYi42xA
// SIG // zD015BPmZDHC5fBcOC1Xv0nrS32EDWKcIA4d1JV15rkn
// SIG // KLgvVAQThgcJ+i/VJrRPKLiEDDDHulfAyQ4wEcYid+Ww
// SIG // FmRTpMHhSaneC/rpA50ILQrIckG5NZsgWmWMTLmLMj72
// SIG // vSE0udZaYWrP0h0ooFlFlS5X0UVp50PGL3jn39h6TNAW
// SIG // nZHzSPg4s8oUkxTYwlvXp0t5aXYSuTXU8BLoAkTBz/7+
// SIG // jR0uAsZuOQbeMf+KG9vFwDicM4Cth89WlhPq2Y2yeodL
// SIG // uzGA4/Cgn7+i1RDYPL3MTYsHFxtFKrol
// SIG // End signature block