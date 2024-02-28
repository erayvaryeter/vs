//
// Copyright (c) Microsoft Corporation 2001-2002. All rights reserved.
//

var vsViewKindPrimary           = "{00000000-0000-0000-0000-000000000000}";
var vsViewKindDebugging         = "{7651A700-06E5-11D1-8EBD-00A0C90F26EA}";
var vsViewKindCode              = "{7651A701-06E5-11D1-8EBD-00A0C90F26EA}";
var vsViewKindDesigner          = "{7651A702-06E5-11D1-8EBD-00A0C90F26EA}";
var vsViewKindTextView          = "{7651A703-06E5-11D1-8EBD-00A0C90F26EA}";
var vsWindowKindSolutionExplorer= "{3AE79031-E1BC-11D0-8F78-00A0C9110057}";

var GUID_ItemType_PhysicalFolder= "{6BB5F8EF-4483-11D3-8BCF-00C04F8EC28C}";
var GUID_ItemType_VirtualFolder = "{6BB5F8F0-4483-11D3-8BCF-00C04F8EC28C}";
var GUID_ItemType_PhysicalFile  = "{6BB5F8EE-4483-11D3-8BCF-00C04F8EC28C}";

var vsWizardAddSubProject       = "{0F90E1D2-4999-11D1-B6D1-00A0C90F2744}";


function CreateVSProject(strProjectName, strProjectExt, strProjectPath, strTemplateFile)
{
    var solution = dte.Solution;
    var strSolutionName = "";

    if (wizard.FindSymbol("CLOSE_SOLUTION"))
    {
        solution.Close();
        strSolutionName = wizard.FindSymbol("VS_SOLUTION_NAME");
        if (strSolutionName.length)
        {
            var strSolutionPath = strProjectPath.substr(0, strProjectPath.length - strProjectName.length);
            solution.Create(strSolutionPath, strSolutionName);
        }
    }

    var strProjectFile = strProjectName + strProjectExt;

    var oTarget = wizard.FindSymbol("TARGET");
    var project;

    if (wizard.FindSymbol("WIZARD_TYPE") == vsWizardAddSubProject)
    {
        var prjItem = oTarget.AddFromTemplate(strTemplateFile, strProjectPath+"\\"+strProjectFile);
        project = prjItem.SubProject;
    }
    else
    {
        project = oTarget.AddFromTemplate(strTemplateFile, strProjectPath, strProjectFile);
    }
    return project;
}

function AddFileToVSProject(strItemName, selProj, selObj, strTemplateFile, bValidate)
{
    fso = new ActiveXObject("Scripting.FileSystemObject");
    AddBaseNameToWizard("SAFE_ITEM_NAME", strItemName, ".");

    if( bValidate )
    {
        var strSafeName = wizard.FindSymbol( "SAFE_ITEM_NAME" );
        if( !wizard.ValidateCLRIdentifier( strSafeName, false ))
        {
            strSafeName = "_" + strSafeName;
            wizard.AddSymbol("SAFE_ITEM_NAME", strSafeName);
        }
    }

    var isReferenceExpanded;
    if(selProj != null) 
        isReferenceExpanded = IsReferenceExpanded(selProj);

    // Get project item for selObj collection
    var folder = selObj.parent;

    var strURL = folder.Properties("URL").Value;
    if (strURL.length > 0) //if a web project
        var strProjectPath = folder.Properties("LocalPath");
    else
        var strProjectPath = folder.Properties("FullPath");

    var strItemFile = strProjectPath + strItemName;

    var fsoTemporaryFolder = 2;
    var tFolder = fso.GetSpecialFolder(fsoTemporaryFolder);
    var strTempName = fso.GetTempName();
    var strTempFile = tFolder.Path + "\\" + strTempName;
    SafeDeleteFile(fso, strTempFile);
    
    wizard.RenderTemplate(strTemplateFile, strTempFile, false);
    var item = folder.ProjectItems.AddFromTemplate(strTempFile, strItemName );
    SafeDeleteFile(fso, strTempFile);

    if(selProj != null)
    {
        if(isReferenceExpanded == true)
 	    ExpandReferencesNode(selProj);
        else
            CollapseReferencesNode(selProj);
    }

    return item;
}

function AddDependentFileToVSProject(strItemName, projectItem, strTemplateFilePath)
{
    fso = new ActiveXObject("Scripting.FileSystemObject");
    
    var fsoTemporaryFolder = 2;
    var tFolder = fso.GetSpecialFolder(fsoTemporaryFolder);
    var strTempName = fso.GetTempName();
    var strTempFile = tFolder.Path + "\\" + strTempName;
    SafeDeleteFile(fso, strTempFile);
    
    wizard.RenderTemplate(strTemplateFilePath, strTempFile, false);
    var item = projectItem.ProjectItems.AddFromTemplate(strTempFile, strItemName);
    SafeDeleteFile(fso, strTempFile);
    
    return item;
}

function AddBaseNameToWizard( strName, strValue, strDelim )
{
    var strLegalItemName;
    var nIndex = strValue.lastIndexOf(strDelim);
    if( nIndex > 0 )
        strLegalItemName = strValue.substr(0, nIndex);
    else
        strLegalItemName = strValue;
    wizard.AddSymbol(strName, CreateLegalIdentifier(strLegalItemName));
}

function SafeDeleteFile( fso, strFilespec )
{
	if (fso.FileExists(strFilespec))
	{
		var tmpFile = fso.GetFile(strFilespec);
		tmpFile.Delete();
	}
}

function GetDependentFileName(strMainFileName, strMainExtension, strDependentExtension)
{
    var strDependentFileName = strMainFileName;
    
    // If main file name is Something.vb, the dependent file name will be Something.resx
    // Otherwise, if main file name is Something.ext, the dependent file name will be Something.ext.resx.
    
    if (strMainFileName.toLowerCase().lastIndexOf(strMainExtension.toLowerCase()) == 
        strMainFileName.length - strMainExtension.length)
    {
        strDependentFileName = strMainFileName.substring(0, strMainFileName.length - strMainExtension.length) +
            strDependentExtension;
    }
    else 
    {
        strDependentFileName = strMainFileName + strDependentExtension;
    }
    
    return strDependentFileName;
}

function CreateLegalIdentifier(strName)
{
    var nLen = strName.length;
    var strLegalName = "";
    var cChar = strName.charAt(0);
    switch(cChar)
    {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            strLegalName += "_";
            break;
    }
    for (nCntr = 0; nCntr < nLen; nCntr++)
    {
        cChar = strName.charAt(nCntr);
        switch(cChar)
        {
            case " ":
            case "~":
            case "&":
            case "'":
            case "#":
            case "!":
            case "@":
            case "$":
            case "%":
            case "^":
            case "(":
            case ")":
            case "-":
            case "+":
            case "=":
            case "{":
            case "}":
            case "[":
            case "]":
            case ";":
            case ",":
            case "`":
            case ".":
                strLegalName += "_";
                break;
            default:
                strLegalName += cChar;
                break;
        }
    }
    return strLegalName;
}

function ReplaceDots(strName)
{
    var nLen = strName.length;
    var strLegalName = "";
    for (nCntr = 0; nCntr < nLen; nCntr++)
    {
        var cChar = strName.charAt(nCntr);
        if (cChar == ".")
                strLegalName += "_";
        else
                strLegalName += cChar;
    }
    return strLegalName;
}


function AddNamespaceSymbolToWizard(dtex, wizardx, selObj) 
{
    var parent = selObj.Parent;
    var kind = parent.Kind;
    if(kind == GUID_ItemType_PhysicalFolder)
    {
        wizardx.AddSymbol("NAMESPACE", parent.Properties("DefaultNamespace").Value);
    }
    else
    {
        wizardx.AddSymbol("NAMESPACE", parent.Properties("RootNamespace").Value);
    }
}


function AddDefaultClientScriptToWizard(dtex, wizardx, selProj)
{
    var prjScriptLang = selProj.Properties("DefaultClientScript").Value;
    // 0 = JScript
    // 1 = VBScript
    if(prjScriptLang == 0)
    {
        wizardx.AddSymbol("DEFAULT_CLIENT_SCRIPT", "JavaScript");
    }
    else
    {
        wizardx.AddSymbol("DEFAULT_CLIENT_SCRIPT", "VBScript");
    }
}

function AddDefaultTargetSchemaToWizard(dtex, wizardx, selProj)
{
    var prjTargetSchema = selProj.Properties("DefaultTargetSchema").Value;
    // 0 = IE3/Nav4
    // 1 = IE5
    // 2 = Nav4
    if(prjTargetSchema == 0)
    {
        wizardx.AddSymbol("DEFAULT_TARGET_SCHEMA", "http://schemas.microsoft.com/intellisense/ie3-2nav3-0");
    }
    else if( prjTargetSchema == 1)
    {
        wizardx.AddSymbol("DEFAULT_TARGET_SCHEMA", "http://schemas.microsoft.com/intellisense/ie5");
    }
    else
    {
        wizardx.AddSymbol("DEFAULT_TARGET_SCHEMA", "http://schemas.microsoft.com/intellisense/nav4-0");
    }
}

function AddDefaultDefaultHTMLPageLayoutToWizard(dtex, wizardx, selProj)
{
    var prjPageLayout = selProj.Properties("DefaultHTMLPageLayout").Value;
    // 0 = FlowLayout
    // 1 = GridLayout
    if(prjPageLayout == 0)
    {
        wizardx.AddSymbol("DEFAULT_HTML_LAYOUT", "FlowLayout");
    }
    else
    {
        wizardx.AddSymbol("DEFAULT_HTML_LAYOUT", "GridLayout");
    }
}
function AddDefaultWebFormsPropertiesToWizard(dtex, wizardx, selProj)
{
    AddDefaultClientScriptToWizard(dtex, wizardx, selProj);
    AddDefaultTargetSchemaToWizard(dtex, wizardx, selProj);
    AddDefaultDefaultHTMLPageLayoutToWizard(dtex, wizardx, selProj);
}


function IsReferenceExpanded(oProj)
{
    UIItem = GetUIReferencesNode(oProj);
    if( UIItem != null )
        return UIItem.Expanded;
}		

function ExpandReferencesNode(oProj)
{
    UIItem = GetUIReferencesNode(oProj);
    if( UIItem != null )
        UIItem.Expanded = true;
}

function CollapseReferencesNode(oProj)
{
    UIItem = GetUIReferencesNode(oProj);
    if( UIItem != null )
        UIItem.Expanded = false;
}

function GetUIReferencesNode(oProj)
{
    var L_strREferencesNode_Text = "References"; // This string needs to be localized
    var UIItemX = null;

    UIItemX = GetUIItem( oProj, L_strREferencesNode_Text);
    if( UIItemX )
        return UIItemX.UIHierarchyItems;
    else
        return null;
}

//
// Return the parent of the input hierarchy item. The parent may be a folder, 
// or a superproject or the solution.
//
function getParent(obj)
{
    var parent = obj.Collection.parent;
    //
    // is obj a project ?
    //
    if( parent == dte )
    {
        //
        // is obj a sub-project ?
        //
        if( IsSubProject(obj) )
        {                
            parent = obj.ParentProjectItem.Collection.parent;
        }
        else
        {
            //
            // obj is a top-level project
            //
            parent = null;
        }
    }
    return parent;    
}

function IsSubProject(oProj)
{
    try
    {
        var Parent = oProj.ParentProjectItem;
        if(Parent)
            return true;
        return false;
    }
    catch(e)
    {
        return false;
    }
}

//
// get the UIHierarchyItem for the projectitem, sName. 
// If sName is empty, returns the UIHierarchyItem for the project
//
function GetUIItem( oProj, sName )
{
    try
    {
        if( sName != "" )
        {
            sSaveName = sName;
            sName = oProj.Name + "\\" + sSaveName;
        }
        else
        {
            sName = oProj.Name;
        }

        var parent = getParent( oProj );

        while( parent != null )
        {
            sSaveName = sName;
            sName = parent.Name + "\\" + sSaveName;
            parent = getParent( parent );

        }

        //
        // we have arrived at the top of the soltuion explorer hierarchy - return the sName index into the solution's UIHierarchyItem collection
        //
        var strSolutionName = dte.Solution.Properties("Name");
        var vsHierObject = dte.Windows.Item(vsWindowKindSolutionExplorer).Object;   
        return vsHierObject.GetItem( strSolutionName + "\\" + sName );
    }	
    catch(e)
    {
        return null;
    }
}

//
// Finds the file already exist on the project
//
function DoesFileExistInProj(oProj, sName )
{
    try
    {
        return oProj.ProjectItems.Item(sName);

    }	
    catch(e)
    {
        return null;
    }
}

function SetErrorInfo(error)
{
    if(error.description.length > 0)
    {
        wizard.SetErrorInfo(error.description, error.number & 0xFFFFFFFF);
    }
}

function ReportError( strErr )
{
    if( dte.SuppressUI == false )
    {
        wizard.ReportError(strErr);
    }
}

function ProjectIsARootWeb(strProjectPath)
{
    // Returns true if strProjectPath is a root web. Is does this by counting
    // the forward slashes. Web roots are of the form: http://server. Assuming
    // no trailing slash, a web root will have 2 forward slashes, non webroots will
    // have 3 or more slashes. 
    var nCntr = 0;
    var cSlashes = 0;
    var nLen = strProjectPath.length - 1;   // Ignore last character
    for (nCntr = 0; nCntr < nLen; nCntr++)
    {
        // Count the forward slashes
        if(strProjectPath.charAt(nCntr) == "/")
            cSlashes++;
    }
    
    if(cSlashes == 2)
        return true;
    return false;
}

// SIG // Begin signature block
// SIG // MIInvQYJKoZIhvcNAQcCoIInrjCCJ6oCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // 4YdMNIXV59yR9PsfweZDIgJWtXFQwBnqn7Gz0v/1vnig
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
// SIG // a/15n8G9bW1qyVJzEw16UM0xghmfMIIZmwIBATCBlTB+
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3Rv
// SIG // bjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMSgwJgYDVQQDEx9NaWNy
// SIG // b3NvZnQgQ29kZSBTaWduaW5nIFBDQSAyMDExAhMzAAAD
// SIG // rzBADkyjTQVBAAAAAAOvMA0GCWCGSAFlAwQCAQUAoIGu
// SIG // MBkGCSqGSIb3DQEJAzEMBgorBgEEAYI3AgEEMBwGCisG
// SIG // AQQBgjcCAQsxDjAMBgorBgEEAYI3AgEVMC8GCSqGSIb3
// SIG // DQEJBDEiBCARoGUkXPQqrv6IwQePI633kyMNhwEiYp/F
// SIG // MBrLx11FUjBCBgorBgEEAYI3AgEMMTQwMqAUgBIATQBp
// SIG // AGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBALRZJ/7J
// SIG // WYHmPdrRvILXbDm6PJFwCdZ3fUYP4o62C0Azf4j50Hij
// SIG // Lc3p/4A3TJdWsOvdkXS6OpI6cEXE7PocmYvW3U2tkixJ
// SIG // XuyYzPjNEuy817+duzT89u+T/DiKAxe+llpRLzAGROVD
// SIG // jO4DaNmmNtdhB8S+WMFhVa3wArS7MUEd7fj9zRLr/wu1
// SIG // WoiBwx2FRCRbPrUpPh3yHeA0in+nKBL9pBjBaKUsUxh/
// SIG // KbqPwedbEmnmzEeLX8Pb2MzQPaKGXJBOROEHPcRsKGlp
// SIG // 8VU3YRfkqPSat3pJ8BYGa9w7gWBubV2LKDMAWtFVMKAH
// SIG // AsnitDgSZJFBlTUYaexraN2P3iyhghcpMIIXJQYKKwYB
// SIG // BAGCNwMDATGCFxUwghcRBgkqhkiG9w0BBwKgghcCMIIW
// SIG // /gIBAzEPMA0GCWCGSAFlAwQCAQUAMIIBWQYLKoZIhvcN
// SIG // AQkQAQSgggFIBIIBRDCCAUACAQEGCisGAQQBhFkKAwEw
// SIG // MTANBglghkgBZQMEAgEFAAQgwLE/UNZhbkvIy7WBZB4Y
// SIG // 3MRC1dqqTOzir2N25l8+fdICBmWDFnXeqhgTMjAyNDAx
// SIG // MTExODU0MTEuMzQ2WjAEgAIB9KCB2KSB1TCB0jELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjEtMCsGA1UECxMkTWljcm9zb2Z0
// SIG // IElyZWxhbmQgT3BlcmF0aW9ucyBMaW1pdGVkMSYwJAYD
// SIG // VQQLEx1UaGFsZXMgVFNTIEVTTjo4NkRGLTRCQkMtOTMz
// SIG // NTElMCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAg
// SIG // U2VydmljZaCCEXgwggcnMIIFD6ADAgECAhMzAAAB3V1X
// SIG // HZXUraobAAEAAAHdMA0GCSqGSIb3DQEBCwUAMHwxCzAJ
// SIG // BgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAw
// SIG // DgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3Nv
// SIG // ZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jvc29m
// SIG // dCBUaW1lLVN0YW1wIFBDQSAyMDEwMB4XDTIzMTAxMjE5
// SIG // MDcwOVoXDTI1MDExMDE5MDcwOVowgdIxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xLTArBgNVBAsTJE1pY3Jvc29mdCBJcmVs
// SIG // YW5kIE9wZXJhdGlvbnMgTGltaXRlZDEmMCQGA1UECxMd
// SIG // VGhhbGVzIFRTUyBFU046ODZERi00QkJDLTkzMzUxJTAj
// SIG // BgNVBAMTHE1pY3Jvc29mdCBUaW1lLVN0YW1wIFNlcnZp
// SIG // Y2UwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoIC
// SIG // AQCoTgOUROoud5x1ER+JZ3yi6fvSb4qbk7XLWoqwsTFE
// SIG // qz0suQlitg7a4kD/k+dh12zdoOwJLUNaUGW0wxhcyund
// SIG // N72GDawj7iSvj0bD9hT1Q4wV8uZqy0RcyBxy2ogGqGxO
// SIG // bxSbqMWdGVnSjArPGnI4R1Jn2mPu/fwke7jfgePsYyas
// SIG // L3aVP5qdJgKt3mq8h/gCpr+pZK0DfM4K3GwoB8LKr76k
// SIG // +pRBamKYu7ip+zAGG0ni3tKTHWrVeRFujVZ1zGDk0Srh
// SIG // j38nwSnUobmpS6PPJBu6mtpmwOZe+/l9OiQHrDJKMmK+
// SIG // P/QoAxYx1KXB0jg7o5RQSjItevM0XS3q3aVtGwV/RA7s
// SIG // dswTDGhCvDcsWsAhLgKu/vu5LRQG5d4VCrbs2AtRVGbl
// SIG // JdgaulNe0uAirKkd4rS0/ajXG9qQCeI6yA3ZZeU4KKnn
// SIG // +YKb/mHLwTPN+G1xTcMrXd7oww9uD/Q3fMX1Sb7po7AU
// SIG // EJCuU/6stx60CfLndZx0r7RVYuUmv7mxrmBKUvIBehg1
// SIG // jefym73hZHbKE1SD6PKZFoYz7NEO5wOfrgcUAeM5YxIy
// SIG // s+VluwQOMKZhZtuH4QZkY1eDW6fp+/HIAI7w0n05QOg2
// SIG // AXL9pMdSR9nSIWkZ0njl3j0+oTBdCJeffCzLtK8N+VYl
// SIG // FnAEJFDVE8UZ6hhcc+cPmbrDAwIDAQABo4IBSTCCAUUw
// SIG // HQYDVR0OBBYEFG6i9baMj1HaRcsh0gylo9COJcPxMB8G
// SIG // A1UdIwQYMBaAFJ+nFV0AXmJdg/Tl0mWnG1M1GelyMF8G
// SIG // A1UdHwRYMFYwVKBSoFCGTmh0dHA6Ly93d3cubWljcm9z
// SIG // b2Z0LmNvbS9wa2lvcHMvY3JsL01pY3Jvc29mdCUyMFRp
// SIG // bWUtU3RhbXAlMjBQQ0ElMjAyMDEwKDEpLmNybDBsBggr
// SIG // BgEFBQcBAQRgMF4wXAYIKwYBBQUHMAKGUGh0dHA6Ly93
// SIG // d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvY2VydHMvTWlj
// SIG // cm9zb2Z0JTIwVGltZS1TdGFtcCUyMFBDQSUyMDIwMTAo
// SIG // MSkuY3J0MAwGA1UdEwEB/wQCMAAwFgYDVR0lAQH/BAww
// SIG // CgYIKwYBBQUHAwgwDgYDVR0PAQH/BAQDAgeAMA0GCSqG
// SIG // SIb3DQEBCwUAA4ICAQAuVNmyDS4FyB1mzHKlbn/Y5FE/
// SIG // yvM8iwb7uYfCa6mEds/3mjtsqNTqHPUocr8W3vRmQ7u5
// SIG // JFM8UsidSGZLGWcOhQ6usmTU9zxIwBJ0RKUQS/Evpm14
// SIG // PjuFS0tC0pm/FyGYi7GqmdHwxHL9x3gPv8v6ipwkFpF4
// SIG // IaWhDMBjEM0ZIRsHBnV69cxqUOx08b37ue8RcWV9TJCp
// SIG // 1hRDSerq3fuLXlIF49J4CDsf/5d1zCtx7fE9vs7xiTQB
// SIG // fuf+agZO569O/cyAmxV78bYnTTeXqF3VvvawCJEvlBg9
// SIG // fQGXQa7benWfjnQKrgYg5GEOZFX1DCkt9ch0DhoJhcbg
// SIG // js06Vh2pa6qXSJZbMvCjbI+VPbDjYlgHfTzZchBx20GQ
// SIG // 5ovfwTZTmMk7dGHoS2w6L5mVDWs5O/TnfwPde5qgnU6q
// SIG // xMcARlD2zD/v73WFKmibKbqQZ1LYzn/++gwIVcvHv3us
// SIG // 0ffD5KZZpYjtm6y90N6w+vmQlXaxjPUZuoVAwQZL2Ifm
// SIG // I5hnXEORwelk/UXnPPqgx5m4S4V+GXWmq3efzl3i24Md
// SIG // n+y+EEEI9yoKo6gzliJ1YTRNYGLU1ix3uPPNnf5Oy7ot
// SIG // CtYPBGayg+5mjq7CSyjypXoHHifRQqmNbA1ClIUWtBB1
// SIG // FvmZCi5aISq0uxcI3ayDVpDwYG0M5wo3RNpuO0I02zCC
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
// SIG // cGNTTY3ugm2lBRDBcQZqELQdVTNYs6FwZvKhggLUMIIC
// SIG // PQIBATCCAQChgdikgdUwgdIxCzAJBgNVBAYTAlVTMRMw
// SIG // EQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRt
// SIG // b25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRp
// SIG // b24xLTArBgNVBAsTJE1pY3Jvc29mdCBJcmVsYW5kIE9w
// SIG // ZXJhdGlvbnMgTGltaXRlZDEmMCQGA1UECxMdVGhhbGVz
// SIG // IFRTUyBFU046ODZERi00QkJDLTkzMzUxJTAjBgNVBAMT
// SIG // HE1pY3Jvc29mdCBUaW1lLVN0YW1wIFNlcnZpY2WiIwoB
// SIG // ATAHBgUrDgMCGgMVADYjRxll2zWgz8Z8og2xDnIkoxYQ
// SIG // oIGDMIGApH4wfDELMAkGA1UEBhMCVVMxEzARBgNVBAgT
// SIG // Cldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAc
// SIG // BgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQG
// SIG // A1UEAxMdTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIw
// SIG // MTAwDQYJKoZIhvcNAQEFBQACBQDpSpSYMCIYDzIwMjQw
// SIG // MTEyMDAyMzUyWhgPMjAyNDAxMTMwMDIzNTJaMHQwOgYK
// SIG // KwYBBAGEWQoEATEsMCowCgIFAOlKlJgCAQAwBwIBAAIC
// SIG // E2gwBwIBAAICEUQwCgIFAOlL5hgCAQAwNgYKKwYBBAGE
// SIG // WQoEAjEoMCYwDAYKKwYBBAGEWQoDAqAKMAgCAQACAweh
// SIG // IKEKMAgCAQACAwGGoDANBgkqhkiG9w0BAQUFAAOBgQDh
// SIG // +O+HzKIUrzmJhdZOS5uT8kMz8o8/pwb8IsOAfhFcnLUM
// SIG // 1TCAwDmcK+u6OkoCfxreVFCKqbDMFQRQRPOwP6YFeKsE
// SIG // ut98gWL6EjoG8waqO26u4pmISYLjP8/Z+ySsR43v68C4
// SIG // flltYjzTzxtpZK6QhisonO8AV/61DX6gQJiKSjGCBA0w
// SIG // ggQJAgEBMIGTMHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQI
// SIG // EwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4w
// SIG // HAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xJjAk
// SIG // BgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAy
// SIG // MDEwAhMzAAAB3V1XHZXUraobAAEAAAHdMA0GCWCGSAFl
// SIG // AwQCAQUAoIIBSjAaBgkqhkiG9w0BCQMxDQYLKoZIhvcN
// SIG // AQkQAQQwLwYJKoZIhvcNAQkEMSIEIIyx/7WLJB7TwSWX
// SIG // 8jOXt2WMG3/GkUYmlEkbyB0U+8qhMIH6BgsqhkiG9w0B
// SIG // CRACLzGB6jCB5zCB5DCBvQQgYf8OLZplrE94mZx7R9FZ
// SIG // N+1AjdNpUcWPkYjjesAxY2YwgZgwgYCkfjB8MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQg
// SIG // VGltZS1TdGFtcCBQQ0EgMjAxMAITMwAAAd1dVx2V1K2q
// SIG // GwABAAAB3TAiBCBxPqIf6zTuSeY+2KCQbp1YQM1cUdft
// SIG // tIf0C443eP4nODANBgkqhkiG9w0BAQsFAASCAgB4Ac9a
// SIG // DMYbs91OTtyGsLlxwnbvnWR5ogYVOpqIhVxHCP+9cnNX
// SIG // vvRyGNxBJ+mO/+KFH0+kiBR/I5VKjbWlmAfSsCIpf0Ic
// SIG // B4S7qhCPA7DdUr15Hucg6t9WGVQCBg97TqYl49ui5zca
// SIG // 0YAxcwM+3T5PbSRXsaH7QG9pq+7QEv6pR5hJ6ZQ9FQtj
// SIG // I5bmOZ7E+jCCWyh+bDfV/7LxuaQSnp8TC+ri8b6n8kHx
// SIG // 1JVii9RI0ICQfiU5BZkDZe5QxmMaz93CnDnPlNXxmMDR
// SIG // PWYzxxwr+FwxRXvTS1zfE1H2ywAh6zFUoj4WTwVwFU+b
// SIG // d8h/pBqrH64s5+ZahwEzkgl0FL93U+F6RyuqImLKimVx
// SIG // udij9Lwo3jnk7gsbVXzU+ng39COCAoeDPFZ7yFaSnj6J
// SIG // t9cE890rcoXh6ds+R8oiM5wMcpFWoC6B+qxLSWVbUcXc
// SIG // /rZoNVnLEcXKZRqCRX0IPJCtx/LM6hsS6YgWY8vB2rFO
// SIG // NBnZ8nR9QP71Ti1Y/OmX3cjgO33GAQMq3XLztpPJRY3t
// SIG // 0XHzRrdRwcIMf+ypzMzFDzkKO8ydYBNYg+Iv5cxllMfE
// SIG // 7CwVRUKn9q+noeVllLRA7dJHAP0+vTFri7W+U4OLDBct
// SIG // WsuRbxfBFl/CQv99vcK8AcTKI1pWo0PH8ZknlXwIOmKa
// SIG // OzZn3Mq7Sugo5dPSUQ==
// SIG // End signature block
