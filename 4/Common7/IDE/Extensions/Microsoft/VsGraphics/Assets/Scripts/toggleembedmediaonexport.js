﻿function trySetDesignerProp(tname, ttype, val) {
    var trait = document.designerProps.getOrCreateTrait(tname, ttype, 0);
    trait.value = val;
}

if (command.getTrait("state").value == 0) {
    command.getTrait("state").value = 2;
    trySetDesignerProp("embedMedia", "bool", true);
}
else {
    command.getTrait("state").value = 0;
    trySetDesignerProp("embedMedia", "bool", false);
}


// SIG // Begin signature block
// SIG // MIInwAYJKoZIhvcNAQcCoIInsTCCJ60CAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // Zvc/2/PDQrz4dsHSLA8yUjZq70hV9jCC73dpH82vmISg
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
// SIG // a/15n8G9bW1qyVJzEw16UM0xghmiMIIZngIBATCBlTB+
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3Rv
// SIG // bjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMSgwJgYDVQQDEx9NaWNy
// SIG // b3NvZnQgQ29kZSBTaWduaW5nIFBDQSAyMDExAhMzAAAD
// SIG // rzBADkyjTQVBAAAAAAOvMA0GCWCGSAFlAwQCAQUAoIGu
// SIG // MBkGCSqGSIb3DQEJAzEMBgorBgEEAYI3AgEEMBwGCisG
// SIG // AQQBgjcCAQsxDjAMBgorBgEEAYI3AgEVMC8GCSqGSIb3
// SIG // DQEJBDEiBCDJCDiUg0lrXyRztCztoWxU040IR+MBVR8X
// SIG // vNaHHkH/SzBCBgorBgEEAYI3AgEMMTQwMqAUgBIATQBp
// SIG // AGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBABS2o4/f
// SIG // 5Gdi4TvFPpqMJnOioI3/bvpiPz8LtSVgngVy/l3/XyMo
// SIG // 1PySJIPlkTDZd903u2+CfMEiwv4/vYrLWvi0GWRkae1n
// SIG // e4lmYTHU3HW1jjtbgmg6wRtGW1g/A7Uc8QdSamd7vcTo
// SIG // S+sc2FsOufJeaTN/5/19PvkO5RNrIv9cvAAj5vTsY6NA
// SIG // 1NtaHyndW6K5Di66GVvmlHDHv5iGnL8sGuzzHiMAtxj8
// SIG // p5/hWne+QJuo6PizaWTRhu0vX9w73SmUMvHDbjh2MYDZ
// SIG // 6Vb8o2pbETGTGBtWXwzp3JfZ7ZSoOEczd+pEuyjUfvwp
// SIG // WBe1Alr2tdkjEU0w4RGCMz7hD3ahghcsMIIXKAYKKwYB
// SIG // BAGCNwMDATGCFxgwghcUBgkqhkiG9w0BBwKgghcFMIIX
// SIG // AQIBAzEPMA0GCWCGSAFlAwQCAQUAMIIBWQYLKoZIhvcN
// SIG // AQkQAQSgggFIBIIBRDCCAUACAQEGCisGAQQBhFkKAwEw
// SIG // MTANBglghkgBZQMEAgEFAAQgrjW+nSXH4lYZqC/SsgxK
// SIG // VriaAGPqoSb6nggSTs7YsSkCBmWDM5jL2RgTMjAyNDAx
// SIG // MTExOTAxMTIuNTcxWjAEgAIB9KCB2KSB1TCB0jELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjEtMCsGA1UECxMkTWljcm9zb2Z0
// SIG // IElyZWxhbmQgT3BlcmF0aW9ucyBMaW1pdGVkMSYwJAYD
// SIG // VQQLEx1UaGFsZXMgVFNTIEVTTjpGQzQxLTRCRDQtRDIy
// SIG // MDElMCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAg
// SIG // U2VydmljZaCCEXswggcnMIIFD6ADAgECAhMzAAAB4pmZ
// SIG // lfHc4yDrAAEAAAHiMA0GCSqGSIb3DQEBCwUAMHwxCzAJ
// SIG // BgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAw
// SIG // DgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3Nv
// SIG // ZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jvc29m
// SIG // dCBUaW1lLVN0YW1wIFBDQSAyMDEwMB4XDTIzMTAxMjE5
// SIG // MDcyNVoXDTI1MDExMDE5MDcyNVowgdIxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xLTArBgNVBAsTJE1pY3Jvc29mdCBJcmVs
// SIG // YW5kIE9wZXJhdGlvbnMgTGltaXRlZDEmMCQGA1UECxMd
// SIG // VGhhbGVzIFRTUyBFU046RkM0MS00QkQ0LUQyMjAxJTAj
// SIG // BgNVBAMTHE1pY3Jvc29mdCBUaW1lLVN0YW1wIFNlcnZp
// SIG // Y2UwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoIC
// SIG // AQC1Y7WYVfpBZm/HCkKYNps4rA5USPe/Bm9mphr2wJgn
// SIG // dOCVRnk3v0BszPCm0KzA6Jewwu40tNyZHKz7FovVqVcL
// SIG // CHJEUPAJF9YnQRvR4cgrKQGr37r8+eZIZe26z0Mex/fV
// SIG // CW7BN8DJqZiWrD1qYBdOc2Zb6VkA1Cw3CGMpeZVyOB1W
// SIG // eTejEsVjvM8Fq+K/cZDJlF7OyAsQya+Wt/UknjwCUSMs
// SIG // 52iHNFs2ejBXE0cyyzcjwROCq1b9SxXfehTcQM8J3rUn
// SIG // j4PPBJkXs69k9x0xRJZ3iV8kGHemEO3giHO8pZVqGNNw
// SIG // hIPYIaK6falCnAVHxXEuFxJX9xkhEZ5cybCu7P2Rj1OH
// SIG // Wh09o1hqGIWtkAjppIIzpgRQqkBRcBZrD62Y+HkLM2Ma
// SIG // uHOB6j51LuIU+Gqqb1Gd6iDl23clONqTS/d3J9Kz005X
// SIG // jlLDkG4L5UXbYRQgXqcX2+p27Kd33GWjwX027V1WvJy0
// SIG // LjAgasn7Hm7qp28I/pR0H6iqYr6cneyglgAqI+/F1MGK
// SIG // stR8mJ0rU5nuE/byurtjvyk4X0TniR4koOOMphY/t+CH
// SIG // BRIT6IGirzTbE1ZuEG6qYQspJ68AcqqKwQix+m5ZUbST
// SIG // CcJruxkXU0LCMdhzCqqYRLaUptc97nwEnT64D4bECERZ
// SIG // B2RrooS9SY4+C7twmwJoWtJTqwIDAQABo4IBSTCCAUUw
// SIG // HQYDVR0OBBYEFESEDhHavu0HbJabSYgkTaV4CdoFMB8G
// SIG // A1UdIwQYMBaAFJ+nFV0AXmJdg/Tl0mWnG1M1GelyMF8G
// SIG // A1UdHwRYMFYwVKBSoFCGTmh0dHA6Ly93d3cubWljcm9z
// SIG // b2Z0LmNvbS9wa2lvcHMvY3JsL01pY3Jvc29mdCUyMFRp
// SIG // bWUtU3RhbXAlMjBQQ0ElMjAyMDEwKDEpLmNybDBsBggr
// SIG // BgEFBQcBAQRgMF4wXAYIKwYBBQUHMAKGUGh0dHA6Ly93
// SIG // d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvY2VydHMvTWlj
// SIG // cm9zb2Z0JTIwVGltZS1TdGFtcCUyMFBDQSUyMDIwMTAo
// SIG // MSkuY3J0MAwGA1UdEwEB/wQCMAAwFgYDVR0lAQH/BAww
// SIG // CgYIKwYBBQUHAwgwDgYDVR0PAQH/BAQDAgeAMA0GCSqG
// SIG // SIb3DQEBCwUAA4ICAQDkVEQxq1UU257pX7INnE7Msoe2
// SIG // F74VVOzWTJCEwEGLBRD1YL0r4gspa+Wqd5Gu+mM9Lf+p
// SIG // cbnMyOsO7V6vJ+FsVFIHI+cAIZzaK4Zw/JY2Km3JN+34
// SIG // IGCt/sBMC4T9Txgubb1ytMWKJlNZ1PpVzsvWUZ0oSPx2
// SIG // XRa8NrK4LbG1qMPTjLgA0uZYO6JK12tnWgjhp8bmg9SD
// SIG // vuuRO6r9jtFtLBo+wFnTozXaXsT67KS9ihHDjHiVZpJP
// SIG // ztIGp4Rc8xwJ1o7TVp3lNdVkOgcb/DqTdX2PcM0KIsnI
// SIG // LzjiTPd6HeeRBnl8XxfG6Hy1ZVBN8yIpKEnnfvLOtTQz
// SIG // /sfUTMmtpsCv2LNcXbw5WUx53SCrLH5rt77v2vgRX9ri
// SIG // KMnFU7wUKb/3a0SQ+vHqONNZpAkRZJsv/gZkJUa8dq2q
// SIG // agLuZNDXr/olHQVCpl/4jmime+b7kIO4QogQOcSJuWSF
// SIG // w0pV+O8MBWq9/wYE8J7TKva2ukEQHkv6P7mFpJr6rxPA
// SIG // Kt/EJioE4gZ1kkv7lT3GhxMgK58hYeRvqnghpi+ODHxJ
// SIG // xRIcXN7Gj5l4XujIUoAiBiVGQwO99+p0A/H5+Muud+C3
// SIG // pfi7k+ReWxbdJi8Hfh+RsRszm2Zpv3N6RFrR79boO3Uv
// SIG // w363HdbJ9hOIJOFtS9Y3UQWyvccJDJsGPgh2XjErwTCC
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
// SIG // cGNTTY3ugm2lBRDBcQZqELQdVTNYs6FwZvKhggLXMIIC
// SIG // QAIBATCCAQChgdikgdUwgdIxCzAJBgNVBAYTAlVTMRMw
// SIG // EQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRt
// SIG // b25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRp
// SIG // b24xLTArBgNVBAsTJE1pY3Jvc29mdCBJcmVsYW5kIE9w
// SIG // ZXJhdGlvbnMgTGltaXRlZDEmMCQGA1UECxMdVGhhbGVz
// SIG // IFRTUyBFU046RkM0MS00QkQ0LUQyMjAxJTAjBgNVBAMT
// SIG // HE1pY3Jvc29mdCBUaW1lLVN0YW1wIFNlcnZpY2WiIwoB
// SIG // ATAHBgUrDgMCGgMVABabmWn6dG56SXSIX4gdXfKU6IZv
// SIG // oIGDMIGApH4wfDELMAkGA1UEBhMCVVMxEzARBgNVBAgT
// SIG // Cldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAc
// SIG // BgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQG
// SIG // A1UEAxMdTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIw
// SIG // MTAwDQYJKoZIhvcNAQEFBQACBQDpSgjBMCIYDzIwMjQw
// SIG // MTExMTQyNzEzWhgPMjAyNDAxMTIxNDI3MTNaMHcwPQYK
// SIG // KwYBBAGEWQoEATEvMC0wCgIFAOlKCMECAQAwCgIBAAIC
// SIG // IBYCAf8wBwIBAAICEVIwCgIFAOlLWkECAQAwNgYKKwYB
// SIG // BAGEWQoEAjEoMCYwDAYKKwYBBAGEWQoDAqAKMAgCAQAC
// SIG // AwehIKEKMAgCAQACAwGGoDANBgkqhkiG9w0BAQUFAAOB
// SIG // gQCZoFwMEOh2vbF9TnrekqPLfvv2vFBH24yq/6ip8p88
// SIG // MxraQ8cn98BJutpHEB5/PViRf5+/8Q9dqgnoeEmA5Mfj
// SIG // wChI05k793iwsSoWnVNo2YB62PSAY/tsYn+W5lSePR2u
// SIG // P+8q9XM68hVg85Yx6vZpVlyE9aJdAEMmpYCooifLqjGC
// SIG // BA0wggQJAgEBMIGTMHwxCzAJBgNVBAYTAlVTMRMwEQYD
// SIG // VQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25k
// SIG // MR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24x
// SIG // JjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBD
// SIG // QSAyMDEwAhMzAAAB4pmZlfHc4yDrAAEAAAHiMA0GCWCG
// SIG // SAFlAwQCAQUAoIIBSjAaBgkqhkiG9w0BCQMxDQYLKoZI
// SIG // hvcNAQkQAQQwLwYJKoZIhvcNAQkEMSIEIGdfkfcjfLbQ
// SIG // U026B5yLCjwbhCSA2OzjD2ESCORRhZuwMIH6BgsqhkiG
// SIG // 9w0BCRACLzGB6jCB5zCB5DCBvQQgK4kqShD9JrjGwVBE
// SIG // zg6C+HeS1OiP247nCGZDiQiPf/8wgZgwgYCkfjB8MQsw
// SIG // CQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQ
// SIG // MA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9z
// SIG // b2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1NaWNyb3Nv
// SIG // ZnQgVGltZS1TdGFtcCBQQ0EgMjAxMAITMwAAAeKZmZXx
// SIG // 3OMg6wABAAAB4jAiBCBtqiRm9/lY6pjo9I03JxRM3JiB
// SIG // w1BAnpD8FPIx+Qu+/TANBgkqhkiG9w0BAQsFAASCAgCk
// SIG // v+nEruTIsb+mbsmW3tnL9wQySRz6b4BkzU7a8yYwfs3A
// SIG // ySSbdgrn8GpHy61gYX3O1cXTBJMjTnwi+Uy+l7/PwdIA
// SIG // Muwj1/TPPxmReirbo0aHfUxf1Nfxsr9dEvyI/8C+OZ+j
// SIG // Ff0PhVn2Q1lwmepimjhI2WwwQ9LN03mjisWhUAdK5Dc/
// SIG // MjrwtR/PKAFTC1In4vnf9e4x+QCTaZwDNVZdDKrSXd8i
// SIG // Oo+qGEmFAbuMY2HCaT9vgmy65pcbEh2+ifyo+YavSw4B
// SIG // jjmOodcvmc6nc93eJYfLOq7OHnWz7ZgjHZYpMTeb16yL
// SIG // rYdW6xt8adVAF8gcIu9vo0UzRhnKwQnMDpOK6N+HrJYn
// SIG // k23QqJvQR+rDPZS8Z1xICJ2OdTu5Vx9tV1rJcQvthc/G
// SIG // oJbNaz2onwtu66WzWCf1XFAK8xxO6LiKQbymOjq1a9W2
// SIG // J4rP5FT7+6VCic6UtHqDEa42zlrResz5MXUwY8g01K8t
// SIG // 2J29wdHgL1VQwhGoKmDdXKXsUfeSUlX9zxZUa+xv/dZQ
// SIG // INAjqPJWijp/MnHeyO39VXawFfUQV7jbXrMCXmdNiniW
// SIG // 6T5F11n1byY8+j0opzfErJB3vp9BkBNDTiGuQMCVcu9j
// SIG // BIG8bFcxc7pUTNl7gfXcKR/xUs8sI8XkeU6xpgwZc/Ub
// SIG // f7bbkBLDcg8yBEEnqlZt+g==
// SIG // End signature block