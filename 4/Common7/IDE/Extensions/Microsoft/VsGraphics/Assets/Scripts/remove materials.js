﻿
//
// remove all materials from selected object
//

function UndoableMaterialChange(child) {
    this._currentChild = child

    this.getName = function () {
        var IDS_MreUndoTriangulateRemoveMaterials = 154;
        return services.strings.getStringFromId(IDS_MreUndoTriangulateRemoveMaterials);
    }

    this.onDo = function () {

        this._oldMaterials = new Array();
        this._oldMaterialIndices = new Array();

        this._materialList = this._currentChild.behavior.materials;

        if (this._materialList != null && this._materialList.elementCount > 0) {
            // loop over all materials
            for (var j = 0; j < this._materialList.elementCount; j++) {

                var currentMaterial = this._materialList.getElement(j);
                this._oldMaterials.push(currentMaterial);
            }
            this._materialList.removeAll();

            var material = services.effects.createEffectInstance("Lambert");
            material.name = "Default - Lambert";

            var enableInPropWindow = 0x8;

            // set up the color traits
            var diffuseColorTrait = material.getOrCreateTrait("MaterialDiffuse", "float4", enableInPropWindow);
            diffuseColorTrait.value = [1, 1, 1, 1];

            var ambientColorTrait = material.getOrCreateTrait("MaterialAmbient", "float4", enableInPropWindow);
            ambientColorTrait.value = [1, 1, 1, 1]

            this._materialList.append(material);
        }

        // if the current child is a mesh get it's geometry and reset the polygon material indices
        if (this._currentChild.typeId == "Microsoft.VisualStudio.3D.Mesh") {
            var geom = this._currentChild.getTrait("Geometry").value;

            for (var k = 0; k < geom.polygonCount; k++) {
                var currentMaterialIndex = geom.getPolygonMaterialIndex(k);
                this._oldMaterialIndices.push(currentMaterialIndex);
                this._materialIndex = geom.setPolygonMaterialIndex(k, 0);
            }

            this._currentChild.behavior.recomputeCachedGeometry();
        }
    }

    this.onUndo = function () {

        this._materialList = this._currentChild.behavior.materials;
        this._materialList.removeAll();

        if (this._materialList != null && this._oldMaterials.length > 0) {
            // restore the materials
            for (var j = 0; j < this._oldMaterials.length; j++) {
                var prevMaterial = this._oldMaterials[j];
                this._materialList.append(prevMaterial);
            }
        }

        // restore the indices
        if (this._currentChild.typeId == "Microsoft.VisualStudio.3D.Mesh") {
            var geom = this._currentChild.getTrait("Geometry").value;
            for (var k = 0; k < this._oldMaterialIndices.length; k++) {
                var previousIndex = this._oldMaterialIndices[k];
                this._materialIndex = geom.setPolygonMaterialIndex(k, previousIndex);
            }

            this._currentChild.behavior.recomputeCachedGeometry();
        }
    }
}

function UndoableMultipleMaterialChange(targets) {
    this.getName = function () {
        var IDS_MreUndoTriangulateRemoveMaterials = 154;
        return services.strings.getStringFromId(IDS_MreUndoTriangulateRemoveMaterials);
    }
    this._undoableActions = [];
    this._counter = 0;
    this._targets = targets;

    for (var i = 0; i < this._targets.length; i++) {
        var element = this._targets[i];
        // loop over all children of selected element, looking
        // for children that have behaviors with valid list of materials
        for (var j = 0; j < element.childCount; j++) {
            // get child and its materials
            var child = element.getChild(j);
            this._undoableActions[this._counter] = new UndoableMaterialChange(child);
            this._counter++;
        }
    }

    this.onDo = function () {
        
        for (var i = 0; i < this._counter; i++) {
            this._undoableActions[i].onDo();
        }

        document.refreshPropertyWindow();
    }

    this.onUndo = function () {
        for (var i = 0; i < this._counter; i++) {
                this._undoableActions[i].onUndo();
            }

        document.refreshPropertyWindow();
    }
}

var targets = [];

// we might not have command args
try{
    if (commandArgs != null) {
        targets.push(commandArgs);
    }
}
catch (err) {}

var selectedElementCount = services.selection.count;
for (var i = 0; i < selectedElementCount; i++) {

    var selectedElement = services.selection.getElement(i);
    targets.push(selectedElement);
}

undoableItem = new UndoableMultipleMaterialChange(targets);
undoableItem.onDo();
services.undoService.addUndoableItem(undoableItem);

// SIG // Begin signature block
// SIG // MIIoKgYJKoZIhvcNAQcCoIIoGzCCKBcCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // qjwmlhUFvGFZ2675+8OeJm24rLJydeyd+09KhqKXCECg
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
// SIG // a/15n8G9bW1qyVJzEw16UM0xghoMMIIaCAIBATCBlTB+
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3Rv
// SIG // bjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMSgwJgYDVQQDEx9NaWNy
// SIG // b3NvZnQgQ29kZSBTaWduaW5nIFBDQSAyMDExAhMzAAAD
// SIG // rzBADkyjTQVBAAAAAAOvMA0GCWCGSAFlAwQCAQUAoIGu
// SIG // MBkGCSqGSIb3DQEJAzEMBgorBgEEAYI3AgEEMBwGCisG
// SIG // AQQBgjcCAQsxDjAMBgorBgEEAYI3AgEVMC8GCSqGSIb3
// SIG // DQEJBDEiBCDHMucd+LNYakxmYD9etnVrjvZnA518+4CD
// SIG // VHJ492G9DTBCBgorBgEEAYI3AgEMMTQwMqAUgBIATQBp
// SIG // AGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBAKNf8e+J
// SIG // fIPayn0NfElQsrOsVASADUjfNVm+6lKa0HBYPY2BQ756
// SIG // q07FeDK+lBYtwpoV+l3Eo2mrfkAjATAlEFohgAqKR7XC
// SIG // WnBvBvtDoEcniZRXeZIfYl/T1DMAUxFCOJeuUFRSsmhu
// SIG // ACqVuegiWFeU3B15XBE6nghxOZ7tZ+R2eHMA6+ekpLYr
// SIG // HGIG429MYKxlM0DDsFDPGnGVg/bf6s+XbDPERlkCmcvX
// SIG // f0zgv0s/zXw6ZAGtmfuc31t2vC5rMcOMJYlX1oYfEKdo
// SIG // 5EOpWGDlguJaXeKSJa72uxz+pHY4kJQ/S9iODH502HkT
// SIG // zGo1wmMX2fSayh0AJLZ5kZGvYaKhgheWMIIXkgYKKwYB
// SIG // BAGCNwMDATGCF4Iwghd+BgkqhkiG9w0BBwKgghdvMIIX
// SIG // awIBAzEPMA0GCWCGSAFlAwQCAQUAMIIBUgYLKoZIhvcN
// SIG // AQkQAQSgggFBBIIBPTCCATkCAQEGCisGAQQBhFkKAwEw
// SIG // MTANBglghkgBZQMEAgEFAAQgsfd5nLFGiBxF9PEz6R5L
// SIG // aVSWtDCUdJKFjYgABuiJoYACBmWgIz8/bxgTMjAyNDAx
// SIG // MTExOTAxMTAuMDczWjAEgAIB9KCB0aSBzjCByzELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjElMCMGA1UECxMcTWljcm9zb2Z0
// SIG // IEFtZXJpY2EgT3BlcmF0aW9uczEnMCUGA1UECxMeblNo
// SIG // aWVsZCBUU1MgRVNOOkYwMDItMDVFMC1EOTQ3MSUwIwYD
// SIG // VQQDExxNaWNyb3NvZnQgVGltZS1TdGFtcCBTZXJ2aWNl
// SIG // oIIR7DCCByAwggUIoAMCAQICEzMAAAHODxj3RZfnxv8A
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
// SIG // ahC0HVUzWLOhcGbyoYIDTzCCAjcCAQEwgfmhgdGkgc4w
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
// SIG // dGFtcCBQQ0EgMjAxMDANBgkqhkiG9w0BAQsFAAIFAOlK
// SIG // ocIwIhgPMjAyNDAxMTExNzIwMDJaGA8yMDI0MDExMjE3
// SIG // MjAwMlowdjA8BgorBgEEAYRZCgQBMS4wLDAKAgUA6Uqh
// SIG // wgIBADAJAgEAAgEwAgH/MAcCAQACAhIHMAoCBQDpS/NC
// SIG // AgEAMDYGCisGAQQBhFkKBAIxKDAmMAwGCisGAQQBhFkK
// SIG // AwKgCjAIAgEAAgMHoSChCjAIAgEAAgMBhqAwDQYJKoZI
// SIG // hvcNAQELBQADggEBAAx1zhhC/viCbee431Z2Payq1+t+
// SIG // b4XMO1jqntdiqEzmgmYrRTEWaTXUgBCFX293sgdK5Zia
// SIG // jlVHKU2TisnNsT92ixiDKOrI/MUFXwnCoA0Od2l1KyPy
// SIG // k3jsbcjtWtrFQ5MiQCIY91Z7Ihpa5PB9q0aBwvwruL4R
// SIG // E37Ni5Rtk4urZG8Krlx2A1SCCr8rj5Dqxwt5Iib7MKJV
// SIG // jADHfn/4m/GgBJkb63TSIh+rToIwH1qsec6enz52kLwp
// SIG // nAKmduZML0jOj4Wb992PaLheniWDDDBFBOEr+WMTR5rp
// SIG // ZKLHcynpqm6zclt1nfMr2JyY9IVSjdMtZuLH/l0E3HF3
// SIG // OnUVrFkxggQNMIIECQIBATCBkzB8MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1T
// SIG // dGFtcCBQQ0EgMjAxMAITMwAAAc4PGPdFl+fG/wABAAAB
// SIG // zjANBglghkgBZQMEAgEFAKCCAUowGgYJKoZIhvcNAQkD
// SIG // MQ0GCyqGSIb3DQEJEAEEMC8GCSqGSIb3DQEJBDEiBCDI
// SIG // FVCCg32RjfeTMSNA2aROz3tNIqDu0YWLKLFUTfwSfDCB
// SIG // +gYLKoZIhvcNAQkQAi8xgeowgecwgeQwgb0EIDJsz0F6
// SIG // L0XDUm53JRBfNMZszKsllLDMiaFZ3PL/LqxnMIGYMIGA
// SIG // pH4wfDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hp
// SIG // bmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoT
// SIG // FU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UEAxMd
// SIG // TWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIwMTACEzMA
// SIG // AAHODxj3RZfnxv8AAQAAAc4wIgQgG1XCYa+/DdwqzbC0
// SIG // ZdTTWZlWqUr/ulPSNWiavMFLKRIwDQYJKoZIhvcNAQEL
// SIG // BQAEggIAbgE8KG1usq9EQZntyyYPnnt1mwLQ4gDXabLT
// SIG // xWedAs56t0wmVNkfs821zUeS1VvEj62db2H3Uw2PW4zN
// SIG // FEn8jGdRacfYmNLsc1uJHONfBI4gfOBCtqB7lG21w9Fp
// SIG // 7aQ78F1ie+6noy+UYsFqdoVe1oqJZ5RDu4qMygIDte3A
// SIG // Wpcm6Obw+fpDDMQgzOfsA8Pwq+KlckqwnmDBh8Fes2a1
// SIG // dDQZtkaDLoVr1UVc/Ddl2FLDhaIUuFXfY4JXwUIQETxx
// SIG // XW57sI0GfdQjzLfsxptd1Njts8tRUkB2kH1midBUgk6/
// SIG // qZkU3BwZ8csGMsn0rRZUYGacAjrKoV71Elriidg/hc9T
// SIG // 1+p7lBT829XCPaH78Ukr5aJ6aegx9EtQ8v93fO+SG43S
// SIG // p7OMk5+Qxpabh6udjenBS6fSpd5RSX36d6Ms9ulGQlIY
// SIG // gKocEpJUGvQUlG8MrK314Me8qIbICy8iYO0Hba6DewxN
// SIG // P9gxL6eS2hPPRBz6UAJJouZ0Bnt9IZ/CFsN8sBJy6M+3
// SIG // nxHrIq7WF0figiBbhMmyrOrgSnU2JxW7RWXvg/5lcpEd
// SIG // gmmTSniKtuhYo3Vih5uvVU5f1RIFXRAQH2o4QVgTCLSO
// SIG // WiHiJNihyObw2HIJ19vowcqnW7xd/v/Ngjg5pbjn5xvL
// SIG // sOb81r8WpVZ9s8QpETW66uzlEwl7pSI=
// SIG // End signature block
