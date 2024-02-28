//
//  Copyright (c) Microsoft Corporation. All rights reserved.
//
'use strict';
GettingStartedDispatchObject.addEventListener("initialize", function (args) {
    var head = document.head;
    var script = document.createElement('script');
    var inlineScript = document.createTextNode(args.Script);
    script.appendChild(inlineScript);
    head.appendChild(script);
    document.body.innerHTML = args.Content;
    var _loop_1 = function (i) {
        var link = document.links[i];
        link.onclick = function () {
            welcomePageUtils.onClick(link.id, link.href);
            return false;
        };
    };
    // on click telemetry handlers
    for (var i = 0; i < document.links.length; i++) {
        _loop_1(i);
    }
    // remove simple page div
    document.getElementById('simple-page').style.display = 'none';
    if (isSharing) {
        document.getElementById('step-share').style.display = 'none';
        document.getElementById('step-joined-Debug').style.display = 'none';
        document.getElementById('step-joined-Edit').style.display = 'none';
        document.getElementById('step-sign-in').style.display = 'none';
        document.getElementById('step-sign-in-before-share').style.display = 'none';
        document.getElementById('join-uri-copy-button').onclick = function () { return welcomePageUtils.copyLink(); };
    }
    else if (isJoinedAnonymously) {
        document.getElementById('step-share').style.display = 'none';
        document.getElementById('step-invite').style.display = 'none';
        document.getElementById('step-collaborate').style.display = 'none';
        document.getElementById('step-sign-in-before-share').style.display = 'none';
        document.getElementById('sign-in-button').onclick = function () { return welcomePageUtils.onSignInClick(); };
    }
    else if (isJoined) {
        document.getElementById('step-share').style.display = 'none';
        document.getElementById('step-invite').style.display = 'none';
        document.getElementById('step-collaborate').style.display = 'none';
        document.getElementById('step-sign-in').style.display = 'none';
        document.getElementById('step-sign-in-before-share').style.display = 'none';
    }
    else if (isShareButtonClickedFirstTimeAnonymously) {
        document.getElementById('join-uri').style.display = 'none';
        document.getElementById('join-uri-copy-button').style.display = 'none';
        document.getElementById('join-uri-box').style.display = 'none';
        document.getElementById('share-with-yourself-link').style.display = 'none';
        document.getElementById('step-joined-Debug').style.display = 'none';
        document.getElementById('step-joined-Edit').style.display = 'none';
        document.getElementById('step-sign-in').style.display = 'none';
        document.getElementById('sign-in-button-before-share').onclick = function () { return welcomePageUtils.onSignInClickBeforeShare(); };
    }
    else {
        document.getElementById('join-uri').style.display = 'none';
        document.getElementById('join-uri-copy-button').style.display = 'none';
        document.getElementById('join-uri-box').style.display = 'none';
        document.getElementById('share-with-yourself-link').style.display = 'none';
        document.getElementById('step-joined-Debug').style.display = 'none';
        document.getElementById('step-joined-Edit').style.display = 'none';
        document.getElementById('step-sign-in').style.display = 'none';
        document.getElementById('step-sign-in-before-share').style.display = 'none';
    }
});
var Message = /** @class */ (function () {
    function Message(type, description, action) {
        if (description === void 0) { description = null; }
        if (action === void 0) { action = null; }
        this.type = type;
        this.description = description;
        this.action = action;
    }
    return Message;
}());
var WelcomePageUtils = /** @class */ (function () {
    function WelcomePageUtils() {
        this.windowExternal = window.external;
    }
    Object.defineProperty(WelcomePageUtils, "Instance", {
        get: function () {
            if (!WelcomePageUtils.singleton) {
                WelcomePageUtils.singleton = new WelcomePageUtils();
            }
            return WelcomePageUtils.singleton;
        },
        enumerable: false,
        configurable: true
    });
    WelcomePageUtils.prototype.copyLink = function () {
        var message = new Message('copyUrl');
        if (GettingStartedDispatchObject) {
            GettingStartedDispatchObject.RaiseGettingStartedEvent(JSON.stringify(message));
        }
    };
    WelcomePageUtils.prototype.joinYourself = function () {
        var message = new Message('joinYourself');
        if (GettingStartedDispatchObject) {
            GettingStartedDispatchObject.RaiseGettingStartedEvent(JSON.stringify(message));
        }
    };
    WelcomePageUtils.prototype.onClick = function (text, action) {
        var message = new Message('onClick', text, action);
        if (GettingStartedDispatchObject) {
            GettingStartedDispatchObject.RaiseGettingStartedEvent(JSON.stringify(message));
        }
    };
    WelcomePageUtils.prototype.onSignInClick = function () {
        var message = new Message('onSignInClick');
        if (GettingStartedDispatchObject) {
            GettingStartedDispatchObject.RaiseGettingStartedEvent(JSON.stringify(message));
        }
    };
    WelcomePageUtils.prototype.onSignInClickBeforeShare = function () {
        var message = new Message('onSignInClickBeforeShare');
        if (GettingStartedDispatchObject) {
            GettingStartedDispatchObject.RaiseGettingStartedEvent(JSON.stringify(message));
        }
    };
    return WelcomePageUtils;
}());
var welcomePageUtils = WelcomePageUtils.Instance;
// disable right-click
document.oncontextmenu = function () { return false; };
//# sourceMappingURL=gettingStarted.js.map
// SIG // Begin signature block
// SIG // MIIoKAYJKoZIhvcNAQcCoIIoGTCCKBUCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // VYgZQ3odJZDfQP4+wcxri7VLgb+VUVIOp2g2vv5pTfOg
// SIG // gg12MIIF9DCCA9ygAwIBAgITMwAAA061PHrBhG/rKwAA
// SIG // AAADTjANBgkqhkiG9w0BAQsFADB+MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSgwJgYDVQQDEx9NaWNyb3NvZnQgQ29kZSBT
// SIG // aWduaW5nIFBDQSAyMDExMB4XDTIzMDMxNjE4NDMyOVoX
// SIG // DTI0MDMxNDE4NDMyOVowdDELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjEeMBwGA1UEAxMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
// SIG // 3QiojSOiARVrryVJn+lnTiamZiMGLORuwCQ+VG3C+rbA
// SIG // vhATw269+qRRqNW7FKed50chWJ53KDIPBStHfIy5cNJY
// SIG // HsQw6+4InH9szgRVqn7/50i8MyRTT+VtNwxf9daGddq0
// SIG // hahpZvjuOnEY0wxQaTEQmWRnXWZUQY4r28tHiNVYEw9U
// SIG // 7wHXwWEHvNn4ZlkJGEf5VpgCvr1v9fmzu4x2sV0zQsSy
// SIG // AVtOxfDwY1HMBcccn23tphweIdS+FNDn2vh1/2kREO0q
// SIG // mGc+fbFzNskjn72MiI56kjvNDRgWs+Q78yBvPCdPgTYT
// SIG // rto5eg33Ko2ELNR/zzEkCCuhO5Vw10qV8wIDAQABo4IB
// SIG // czCCAW8wHwYDVR0lBBgwFgYKKwYBBAGCN0wIAQYIKwYB
// SIG // BQUHAwMwHQYDVR0OBBYEFJzHO2Z/7pCgbAYlpMHTX7De
// SIG // aXcAMEUGA1UdEQQ+MDykOjA4MR4wHAYDVQQLExVNaWNy
// SIG // b3NvZnQgQ29ycG9yYXRpb24xFjAUBgNVBAUTDTIzMDAx
// SIG // Mis1MDA1MTYwHwYDVR0jBBgwFoAUSG5k5VAF04KqFzc3
// SIG // IrVtqMp1ApUwVAYDVR0fBE0wSzBJoEegRYZDaHR0cDov
// SIG // L3d3dy5taWNyb3NvZnQuY29tL3BraW9wcy9jcmwvTWlj
// SIG // Q29kU2lnUENBMjAxMV8yMDExLTA3LTA4LmNybDBhBggr
// SIG // BgEFBQcBAQRVMFMwUQYIKwYBBQUHMAKGRWh0dHA6Ly93
// SIG // d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvY2VydHMvTWlj
// SIG // Q29kU2lnUENBMjAxMV8yMDExLTA3LTA4LmNydDAMBgNV
// SIG // HRMBAf8EAjAAMA0GCSqGSIb3DQEBCwUAA4ICAQA9tb/a
// SIG // R6C3QUjZRQI5pJseF8TmQD7FccV2w8kL9fpBg3vV6YAZ
// SIG // 09ZV58eyQ6RTCgcAMiMHSJ5r4SvaRgWt9U8ni96e0drN
// SIG // C/EgATz0SRwBJODR6QV8R45uEyo3swG0qqm4LMtdGOyg
// SIG // KcvvVKymtpBprLgErJPeT1Zub3puzpk7ONr5tASVFPiT
// SIG // 0C4PGP7HY907Uny2GGQGicEwCIIu3Yc5+YWrS6Ow4c/u
// SIG // E/jKxXfui1GtlN86/e0MMw7YcfkT/f0WZ7q+Ip80kLBu
// SIG // QwlSDKQNZdjVhANygHGtLSNpeoUDWLGii9ZHn3Xxwqz8
// SIG // RK8vKJyY8hhr/WCqC7+gDjuzoSRJm0Jc/8ZLGBtjfyUj
// SIG // ifkKmKRkxLmBWFVmop+x3uo4G+NSW6Thig3RP2/ldqv4
// SIG // F1IBXtoHcE6Qg7L4fEjEaKtfwTV3K+4kwFN/FYK/N4lb
// SIG // T2JhYWTlTNFC6f5Ck1aIqyKT9igsU+DnpDnLbfIK2J4S
// SIG // dekDI5jL+aOd4YzRVzsYoJEFmM1DvusOdINBQHhWvObo
// SIG // AggepVxJNtRRQdRXSB6Y0kH/iz/1tjlfx34Qt7kz4Cm0
// SIG // bV6PN02WBLnaKMmfwFbtPLIm2dzJBjiTkSxETcCpthu6
// SIG // KnTr+EI/GdCaxoDM4+OjRSgMZC0qROaB0GD9R7T8dZT3
// SIG // w+4jUmybD+i4lB1x9TCCB3owggVioAMCAQICCmEOkNIA
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
// SIG // TrU8esGEb+srAAAAAANOMA0GCWCGSAFlAwQCAQUAoIGu
// SIG // MBkGCSqGSIb3DQEJAzEMBgorBgEEAYI3AgEEMBwGCisG
// SIG // AQQBgjcCAQsxDjAMBgorBgEEAYI3AgEVMC8GCSqGSIb3
// SIG // DQEJBDEiBCA/ksCmpPVWDa7gvm4KHjIip802cu+bUv3w
// SIG // 9+xTrmpjbzBCBgorBgEEAYI3AgEMMTQwMqAUgBIATQBp
// SIG // AGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBAEIacpeV
// SIG // CHjl0W+3J8v8WwVvDdNqFHBwbLQpcycxNG0td2/NxzRd
// SIG // Gr6uXm8JV3lr7ALmdW/lXXIuGtFypFU6IrZVr+cyShzT
// SIG // CkFStKrG7SK1EaM3iZqvwNBg8HH0XveR6M5pJ1FsNaUq
// SIG // HZ7Svisw/PBh/vg/YcVxgkpGSVhLSra6IYqOGUTeLv0r
// SIG // OLDG4YYkrhaG4Xk7sSO4kffr2aLqCH5VKETXjjn2204O
// SIG // ACqEJxB4aykG+cPtW2MxnGNdqqN7+qqXaB6Mvhhqq8WU
// SIG // RliasnzpwCHrO31GHJLSNZIu5ANa/INWbYbJNbacxSgf
// SIG // fW+EO1tL6GrFn1GPm84b8aDRlQChgheUMIIXkAYKKwYB
// SIG // BAGCNwMDATGCF4Awghd8BgkqhkiG9w0BBwKgghdtMIIX
// SIG // aQIBAzEPMA0GCWCGSAFlAwQCAQUAMIIBUgYLKoZIhvcN
// SIG // AQkQAQSgggFBBIIBPTCCATkCAQEGCisGAQQBhFkKAwEw
// SIG // MTANBglghkgBZQMEAgEFAAQgv7/cFuTYfdFCXG6YHyYz
// SIG // K/J42lU4x2ucKZjiZuVbGrUCBmVorWptcRgTMjAyMzEy
// SIG // MDcxMjUwMzguMDUyWjAEgAIB9KCB0aSBzjCByzELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjElMCMGA1UECxMcTWljcm9zb2Z0
// SIG // IEFtZXJpY2EgT3BlcmF0aW9uczEnMCUGA1UECxMeblNo
// SIG // aWVsZCBUU1MgRVNOOjk2MDAtMDVFMC1EOTQ3MSUwIwYD
// SIG // VQQDExxNaWNyb3NvZnQgVGltZS1TdGFtcCBTZXJ2aWNl
// SIG // oIIR6jCCByAwggUIoAMCAQICEzMAAAHY/EszpR3YhRUA
// SIG // AQAAAdgwDQYJKoZIhvcNAQELBQAwfDELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgUENBIDIwMTAwHhcNMjMwNTI1MTkxMjQwWhcN
// SIG // MjQwMjAxMTkxMjQwWjCByzELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjElMCMGA1UECxMcTWljcm9zb2Z0IEFtZXJpY2EgT3Bl
// SIG // cmF0aW9uczEnMCUGA1UECxMeblNoaWVsZCBUU1MgRVNO
// SIG // Ojk2MDAtMDVFMC1EOTQ3MSUwIwYDVQQDExxNaWNyb3Nv
// SIG // ZnQgVGltZS1TdGFtcCBTZXJ2aWNlMIICIjANBgkqhkiG
// SIG // 9w0BAQEFAAOCAg8AMIICCgKCAgEAzXjrKdH14AM+xlBd
// SIG // Dfv9BB3EBa4usJYk25kDZhZvA4tAnkPJ+G3drXebW7c0
// SIG // 7BJO3WNv55lmPZKhL2r23WEWzXPhLL/DX7+jDCJh/bQq
// SIG // +SsbNueDENI5qUbnK5t7h1uNtQn72tITUBCjdTUtK2nd
// SIG // VP2Tpnvlf0HknViqHwk4cX/37E3keNVm6lDQCTf5pd7G
// SIG // zh/Gi4V8kxxu7Fbf1lEi6U9Hy5TV2BkV82rydalDnj88
// SIG // o/OoYiss0CS04yq+xqUxhckoiHDFv58iujSu0Y38taHy
// SIG // 3Ub77RyHSb6Zj0s3twh/z2BVNtU6oSIWdfgEu0ZQ6NfD
// SIG // Egxjx6UwlsKO5YLWNaWOkbzyILhd623bb4aMo5+Zj27O
// SIG // aYIxjvN6HQTT+yJSgI+AWx1F3h4rdw2toOwOI4nCqyzI
// SIG // 6OrBnnrSaHiqKI+YjU12w8CyjPR5VHV2Us+tn7QmVbiv
// SIG // RQYJADvTETdqagZ6bQRn5ZZvttRS5OhN71VzBhweXjoB
// SIG // XwMvOF5SInsnEAKyA7BJvdihyBThjoGZVsXuvZXl7zB4
// SIG // 2CZaaNlVTLS8Fy3d7Y0v9e96LhjEWoiyJy5uKCIKg7Y1
// SIG // CKr8GEFId0TesMHRe+Zzpq6a/MEcNZ/wSlkOZoUMWjAa
// SIG // qr5G7rtbC3kjD79jzGSHXVz24jrwMWnaj5AXDD1AZq8k
// SIG // mKC08cMCAwEAAaOCAUkwggFFMB0GA1UdDgQWBBT2049M
// SIG // fD2QS2J9DGQSOpxoeaiJVjAfBgNVHSMEGDAWgBSfpxVd
// SIG // AF5iXYP05dJlpxtTNRnpcjBfBgNVHR8EWDBWMFSgUqBQ
// SIG // hk5odHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3Bz
// SIG // L2NybC9NaWNyb3NvZnQlMjBUaW1lLVN0YW1wJTIwUENB
// SIG // JTIwMjAxMCgxKS5jcmwwbAYIKwYBBQUHAQEEYDBeMFwG
// SIG // CCsGAQUFBzAChlBodHRwOi8vd3d3Lm1pY3Jvc29mdC5j
// SIG // b20vcGtpb3BzL2NlcnRzL01pY3Jvc29mdCUyMFRpbWUt
// SIG // U3RhbXAlMjBQQ0ElMjAyMDEwKDEpLmNydDAMBgNVHRMB
// SIG // Af8EAjAAMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMIMA4G
// SIG // A1UdDwEB/wQEAwIHgDANBgkqhkiG9w0BAQsFAAOCAgEA
// SIG // rpwOmkj+PKCdVQ/kjBdf+0hYkxg+s8iwtybvR7S46mGK
// SIG // tRSVlMddCOV6lNGpXF01BVKFCFD0r33l/3V9DIKH1Bvn
// SIG // Dl3aJGhx0paOj2SA151ApaZEYsfcQjd+8hQaXMBi8xGZ
// SIG // QyiW9oA6vxQRgvLJ05QUhDgY1dHhPCAlVJDicyALbRMW
// SIG // nkFieUnq1K+t56ul+z5kL5NTixZdxSaFuPucyqq4mPzy
// SIG // hrLDmgOWYwWRMlPqO/j94nC/8GdBt8ppU/hGuIfX96uW
// SIG // lXRlQXbIWGv0noRpp1LxjAPI+QrduIp8fm1TrhfxP9i4
// SIG // yKfphGq8uZjk6wDVSi8ptpFt3kMRfyPXI/O8Z3YmB+eV
// SIG // 361jJPW7EU6MTqUW/RKWwgeXEsijb8UPA9NKndk53VRC
// SIG // RaYMgR0CUv1xCuaaHiWeaoJghQI+FVDwf3T1x3U5tUFy
// SIG // SN3Duw0cj1GQGDMENyoT5TNoT9jnwSSK/1bA7Id7Myy9
// SIG // mSbnq47IYcWBlW6DLnfWjaEY5c9THJ+IhKLWuLWptuBc
// SIG // Q8h66hZuhFELv6Q2BA6rrr0BRm+YJSHJOKyqgZ0Za0aI
// SIG // kY9KnYTt56KLVYP9Uj9M0ywtUa8Y7kxFXtzyqxE27b3D
// SIG // g6Bofddl67X+MGzMKa2vI2LM8696X9PdOc8y/G/J/JLj
// SIG // AQoQWHxXbPdeik43OExjVPUwggdxMIIFWaADAgECAhMz
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
// SIG // BAsTHm5TaGllbGQgVFNTIEVTTjo5NjAwLTA1RTAtRDk0
// SIG // NzElMCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAg
// SIG // U2VydmljZaIjCgEBMAcGBSsOAwIaAxUASKfvsVCfn/OV
// SIG // a5283ZETEqQZry+ggYMwgYCkfjB8MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1T
// SIG // dGFtcCBQQ0EgMjAxMDANBgkqhkiG9w0BAQsFAAIFAOkb
// SIG // vXowIhgPMjAyMzEyMDcwMzQxNDZaGA8yMDIzMTIwODAz
// SIG // NDE0NlowdDA6BgorBgEEAYRZCgQBMSwwKjAKAgUA6Ru9
// SIG // egIBADAHAgEAAgIjqzAHAgEAAgITozAKAgUA6R0O+gIB
// SIG // ADA2BgorBgEEAYRZCgQCMSgwJjAMBgorBgEEAYRZCgMC
// SIG // oAowCAIBAAIDB6EgoQowCAIBAAIDAYagMA0GCSqGSIb3
// SIG // DQEBCwUAA4IBAQAkfUf34hVwj58R4NsVUo2I05akfuQu
// SIG // GnNMg2Ek4Ztm82b0ZyiLKVKiiKi8MO+J9nyXOR0tAULv
// SIG // qH1DlVMzwQwg1o+Bla5QD9fGPJM/qXhxgQecPjp2Ux+G
// SIG // Ly3m1n8QL3OaNHb6qjaVr0J+ajKr31T2Bf4/b5jmOTrO
// SIG // VUbE7NkDPpF7JLRRrnzA/8QdNmiHANHWTsAs6a/Hw8J3
// SIG // 6cQabcfXBnyYJn0J6QSzjmb9tHRWMZLOYnl9hLYdm/N7
// SIG // YIWZbgQqafeXC5O2sOFRSg3vIkOx0HKlKWCv8iwGfVm8
// SIG // hYVHaDxUXGG1Gq17JlCeJ2tuKw2UBBLkJP3QvgSqm+CQ
// SIG // C6irMYIEDTCCBAkCAQEwgZMwfDELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUtU3Rh
// SIG // bXAgUENBIDIwMTACEzMAAAHY/EszpR3YhRUAAQAAAdgw
// SIG // DQYJYIZIAWUDBAIBBQCgggFKMBoGCSqGSIb3DQEJAzEN
// SIG // BgsqhkiG9w0BCRABBDAvBgkqhkiG9w0BCQQxIgQgXL9u
// SIG // joaO/V/93uG2NPGkcc6TnBB8SWc9Fw5beVanJ7cwgfoG
// SIG // CyqGSIb3DQEJEAIvMYHqMIHnMIHkMIG9BCA64yF//AmT
// SIG // d0UwATDbebu9zIt6N35r6to/EopPtrO+VDCBmDCBgKR+
// SIG // MHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5n
// SIG // dG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVN
// SIG // aWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMTHU1p
// SIG // Y3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEwAhMzAAAB
// SIG // 2PxLM6Ud2IUVAAEAAAHYMCIEIDfgCt5H9GU51XiYXUfC
// SIG // 8Lf7RIBsMN17V37fRHRixPfxMA0GCSqGSIb3DQEBCwUA
// SIG // BIICAFmjCfRSAvE1adDtYEiQ4vwuvTQ/ZEFD3G/pOYuq
// SIG // Dgb4RdvogONqlrCnRYyXeVto20rHmbJ2uB2eZ8uhSnX0
// SIG // 3P9dfGAaAsR2bGWNmLit4Nx4rwzTpdzQDaWyQWAg60EL
// SIG // +wpNqKBdxV8nswDDl1n0/IbRq984yxbuNB7W+C5u5bjm
// SIG // xQ7gccQ4lhQafacnkMToYrweCuiv9u96MywhFazJ4/rc
// SIG // 7D+NYupaDaV9TKjoq6OYu+fAl9AshB2Ar3uzkJhnPbuL
// SIG // hYhfVMN8jBelyKXYdJZBJPgBWI5ADhbWjJYqKjH9/GNf
// SIG // E6FlZK4fNAfMYjp9uPlTcsgozeGLzS+a8xh8X4rAy3+V
// SIG // koimPsl69ydzcEN7z59I8t2Ijn5MGkGNKkDkG2SMFnFz
// SIG // nyh8wAbdyQkkIC9FLXohpRmKLQ/bS4IdytUQfq8FMm9q
// SIG // /+luiph7jqSAf0KcBzUfrw/Mkj5IIqMl//h7+9wpDyZi
// SIG // V9O1LLNImr48FIPczY7rOveU+JGiv+Q7SWCHsmeU/Z+K
// SIG // G25lx9gM7eoSv2i1osIn4meXztCTSr80R7WrdOOKW209
// SIG // 9LiNT81S0xvskZh5qAdopL83VeykJmxdwA4igryGvgbk
// SIG // vbUCRzEMKGZsMiQVUXOfrD7OPS+UWACyXnifbYjDMI1M
// SIG // Xk5Nlpk/QuRKqllhWapsZ8ssqn23
// SIG // End signature block
