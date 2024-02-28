// (c) 2001 Microsoft Corporation
var bValidating = false;

//SET DIRECTION FUNCTION*************************************
//***********************************************************
function setDirection()
{
	if (document.dir == "rtl")
	{
		
		//SET CONTENT FRAME FLOW FOR RTL*********************
		//***************************************************
		var CatcHERa = document.all.tags("LI");
		var CatcHERb = document.all.tags("DIV");
		var CatcHERc = document.all.tags("SPAN");
		var CatcHERd = document.all.tags("INPUT");
		var CatcHERe = document.all.tags("TABLE");
		var CatcHERf = document.all.tags("BUTTON");
		var CatcHERg = document.all.tags("SELECT");
		var CatcHERg = document.all.tags("OBJECT");
		
		if (CatcHERa != null)
		{
		  for (var i = 0; i < CatcHERa.length; i++)
		  {
            if (CatcHERa[i].className.toLowerCase() == "list")
			{
			  CatcHERa[i].style.left = "0px";
			  CatcHERa[i].style.right = "-15px";
			}
		  }
		}
		
		if (CatcHERb != null)
		{
		  for (var i = 0; i < CatcHERb.length; i++)
		  {
            if (CatcHERb[i].className.toLowerCase() == "vertline")
			{
			  CatcHERb[i].style.left = "0px";
			  CatcHERb[i].style.right = "0px";
			}
            if (CatcHERb[i].className.toLowerCase() == "itemtextradiob")
			{
			  CatcHERb[i].style.left = "0px";
			  CatcHERb[i].style.right = "25px";
			}
            if (CatcHERb[i].className.toLowerCase() == "itemtextradioindenta")
			{
			  CatcHERb[i].style.left = "0px";
			  CatcHERb[i].style.right = "30px";
			}
            if (CatcHERb[i].className.toLowerCase() == "itemtextradioindentb")
			{
			  CatcHERb[i].style.left = "0px";
			  CatcHERb[i].style.right = "42px";
			}
            if (CatcHERb[i].className.toLowerCase() == "itemtextcheckboxa")
			{
			  CatcHERb[i].style.left = "0px";
			  CatcHERb[i].style.right = "15px";
			}
            if (CatcHERb[i].className.toLowerCase() == "itemtextcheckboxb")
			{
			  CatcHERb[i].style.left = "0px";
			  CatcHERb[i].style.right = "25px";
			}
            if (CatcHERb[i].className.toLowerCase() == "itemtextcheckboxindentb")
			{
			  CatcHERb[i].style.left = "0px";
			  CatcHERb[i].style.right = "42px";
			}
		  }
		}
		
		if (CatcHERc != null)
		{
		  for (var i = 0; i < CatcHERc.length; i++)
		  {
            if (CatcHERc[i].className.toLowerCase() == "vertline1")
			{
			  CatcHERc[i].style.left = "0px";
			  CatcHERc[i].style.right = "-1px";
			}
            if (CatcHERc[i].className.toLowerCase() == "itemtextindent")
			{
			  CatcHERc[i].style.left = "0px";
			  CatcHERc[i].style.right = "17px";
			}
		  }
		}
		
		if (CatcHERd != null)
		{
		  for (var i = 0; i < CatcHERd.length; i++)
		  {
            if (CatcHERd[i].className.toLowerCase() == "radio")
			{
			  CatcHERd[i].style.left = "0px";
			  CatcHERd[i].style.right = "6px";
			}
            if (CatcHERd[i].className.toLowerCase() == "checkbox")
			{
			  CatcHERd[i].style.marginLeft = "0px";
			  CatcHERd[i].style.marginRight = "-4px";
			}
            if (CatcHERd[i].className.toLowerCase() == "checkboxa")
			{
			  CatcHERd[i].style.marginLeft = "0px";
			  CatcHERd[i].style.marginRight = "10px";
			}
            if (CatcHERd[i].className.toLowerCase() == "sidebtn")
			{
			  CatcHERd[i].style.left = "0px";
			  CatcHERd[i].style.right = "9px";
			}
            if (CatcHERd[i].className.toLowerCase() == "sidebtn2")
			{
			  CatcHERd[i].style.left = "0px";
			  CatcHERd[i].style.right = "9px";
			}
            if (CatcHERd[i].className.toLowerCase() == "sidebtnb")
			{
			  CatcHERd[i].style.left = "0px";
			  CatcHERd[i].style.right = "9px";
			}
            if (CatcHERd[i].className.toLowerCase() == "checkboxindent")
			{
			  CatcHERd[i].style.marginLeft = "0px";
			  CatcHERd[i].style.marginRight = "23px";
			}
            if (CatcHERd[i].className.toLowerCase() == "radioindent")
			{
			  CatcHERd[i].style.marginLeft = "0px";
			  CatcHERd[i].style.marginRight = "23px";
			}
            if (CatcHERd[i].className.toLowerCase() == "radioindenta")
			{
			  CatcHERd[i].style.marginLeft = "0px";
			  CatcHERd[i].style.marginRight = "9px";
			}
            if (CatcHERd[i].className.toLowerCase() == "comment")
			{
			  CatcHERd[i].style.left = "0px";
			  CatcHERd[i].style.right = "8px";
			}
		  }
		}
		
		if (CatcHERe != null)
		{
		  for (var i = 0; i < CatcHERe.length; i++)
		  {
            if (CatcHERe[i].className.toLowerCase() == "linktextselected")
			{
			  CatcHERe[i].style.left = "0px";
			  CatcHERe[i].style.right = "10px";
			}
            if (CatcHERe[i].className.toLowerCase() == "linktextselectedindent")
			{
			  CatcHERe[i].style.left = "0px";
			  CatcHERe[i].style.right = "16px";
			}
            if (CatcHERe[i].className.toLowerCase() == "linktext")
			{
			  CatcHERe[i].style.left = "0px";
			  CatcHERe[i].style.right = "10px";
			}
            if (CatcHERe[i].className.toLowerCase() == "linktextindent")
			{
			  CatcHERe[i].style.left = "0px";
			  CatcHERe[i].style.right = "16px";
			}
		  }
		}
		
		if (CatcHERf != null)
		{
		  for (var i = 0; i < CatcHERf.length; i++)
		  {
            if (CatcHERf[i].className.toLowerCase() == "buttonclass")
			{
			  CatcHERf[i].style.marginLeft = "0px";
			  CatcHERf[i].style.marginRight = "8px";
			}
		  }
		}
		
		if (CatcHERg != null)
		{
		  for (var i = 0; i < CatcHERg.length; i++)
		  {
            if (CatcHERg[i].className.toLowerCase() == "sidebtn")
			{
			  CatcHERg[i].style.left = "0px";
			  CatcHERg[i].style.right = "9px";
			}
            if (CatcHERg[i].className.toLowerCase() == "sidebtn2")
			{
			  CatcHERg[i].style.left = "0px";
			  CatcHERg[i].style.right = "17px";
			}
            if (CatcHERg[i].className.toLowerCase() == "sidebtn2a")
			{
			  CatcHERg[i].style.left = "0px";
			  CatcHERg[i].style.right = "25px";
			}
            if (CatcHERg[i].className.toLowerCase() == "sidebtn2b")
			{
			  CatcHERg[i].style.left = "0px";
			  CatcHERg[i].style.right = "8px";
			}
		  }
		}
		
		if (CatcHERh != null)
		{
		  for (var i = 0; i < CatcHERh.length; i++)
		  {
            if (CatcHERh[i].className.toLowerCase() == "itemtext")
			{
			  CatcHERh[i].style.left = "0px";
			  CatcHERh[i].style.right = "8px";
			}
		  }
		}
		
		//SET INTRODUCTION FRAME FLOW FOR RTL****************
		//***************************************************
		
		//SET INTRODUCTION SUBHEADING TEXT ALIGNMENT*********
		document.all("SUBHEAD").style.marginLeft = "0px";
		document.all("SUBHEAD").style.marginRight = "10px";
		
		//SET INTRODUCTION IMAGE ALIGNMENT*******************
		document.all("IMAGE_TABLE").style.textAlign = "left";
	}
}

//SET POTENTIALLY DISABLED TABS FOR MOUSEOVER****************
//***********************************************************

function MouseOver(obj)
{

	if ((obj == null) || (typeof(obj) == "undefined"))
		return;
	
	else if ((obj.id != "DatSupBtn") || (obj.id != "BrowseBtn"))
	{
		obj.className = "activelink";
	}
	
	else if (obj.id == "DBSupport")
	{
		if (window.external.FindSymbol("APP_TYPE_DLG"))
		{ 
			obj.className = "inactivelink"; 
		}
	}
	
	else if ((obj.id == "CompoundDoc") || (obj.id == "DocTemp"))
	{
		if ((!window.external.FindSymbol("DOCVIEW")) || (window.external.IsSymbolDisabled("DOCVIEW")))
		{ 
			obj.className = "inactivelink";
		}
	} 
	else if (obj.id == "Notifications")
	{
		if (!GENERATE_FILTER.checked) 
		{ 
			obj.className = "inactivelink"; 
		}
	}
	else if (obj.id == "DatSupBtn")
	{
		if ((DB_VIEW_WITH_FILE.checked) || (DB_VIEW_NO_FILE.checked))
		{
			DatSupBtn.disabled = false;
			sdstitle.disabled = false;
		}
		
		else if ((!DB_VIEW_WITH_FILE.checked) && (!DB_VIEW_NO_FILE.checked))
		{
			DatSupBtn.disabled = true;
			sdstitle.disabled = true;
		}
	}
}

//SET POTENTIALLY DISABLED TABS FOR MOUSEOUT*****************
//***********************************************************
function MouseOut(obj)
{

	if ((obj == null) || (typeof(obj) == "undefined"))
		return;
	
	else if (obj.id == "DBSupport")
	{
	
		if (obj.className == "")
		{
			obj.className = ""
		}
		
		else
		{
			obj.className = "activelink"; 
		}
		
		if (window.external.FindSymbol("APP_TYPE_DLG")) 
		{ 
			obj.className = "inactivelink"; 
		}
	}
	
	else if ((obj.id == "CompoundDoc") || (obj.id == "DocTemp"))
	{
	
		if (obj.className == "")
		{
			obj.className = ""
		}
		
		else
		{
			obj.className = "activelink"; 
		}
		
		if ((!window.external.FindSymbol("DOCVIEW")) || (window.external.IsSymbolDisabled("DOCVIEW")))
		{ 
			obj.className = "inactivelink";
		}
	} 
	
	else if (obj.id == "Notifications")
	{
	
		if (obj.className == "")
		{
			obj.className = ""
		}
		
		else
		{
			obj.className = "activelink"; 
		}
		
		if (!window.external.FindSymbol("GENERATE_FILTER")) 
		{
			obj.className = "inactivelink";
		}
	}
	
	else if (obj.id == "DatSupBtn")
	{
	
		if ((DB_VIEW_WITH_FILE.checked) || (DB_VIEW_NO_FILE.checked))
		{
			DatSupBtn.disabled = false;
			sdstitle.disabled = false;
		}
		
		else if ((!DB_VIEW_WITH_FILE.checked) && (!DB_VIEW_NO_FILE.checked))
		{
			DatSupBtn.disabled = true;
			sdstitle.disabled = true;
		}
	}	
	
	else if (obj.id == "ServerOptions")
	{
	
		if (obj.className == "")
		{
			obj.className = ""
		}
		
		else
		{
			obj.className = "activelink"; 
		}
		
		if ((!window.external.FindSymbol("GENERATE_ISAPI")) && (!window.external.FindSymbol("COMBINE_PROJECTS")))
		{ 
			obj.className = "inactivelink"; 
		}
	}
	
	else if (obj.id == "AppOptions")
	{
		if (obj.className == "")
		{
			obj.className = ""
		}
		
		else
		{
			obj.className = "activelink"; 
		}
		
		if ((!window.external.FindSymbol("GENERATE_APP")) && (!window.external.FindSymbol("COMBINE_PROJECTS")))
		{
			obj.className = "inactivelink";
		}
	}
	
	else if (obj.id == "BrowseBtn")
	{
		obj.disabled = true;
		
		if ((GENERATE_ISAPI.checked) && (GENERATE_ISAPI.disabled == false))
		{
			obj.disabled = false;
		}
	}	
}

/******************************************************************************
 Description: OnKeyPress event handler for HTML pages
******************************************************************************/
function OnPress()
{
	// get outermost window for new UI with frames
	var oDefault = window;
	while (oDefault != oDefault.parent)
		oDefault = oDefault.parent;

	var bPreviousTab = false;

	if (event.keyCode != 0)
	{
		if (!event.repeat)
		{
			switch(event.keyCode)
			{
				// Enter
				case 13:
					if (event.srcElement.className && (event.srcElement.className.toLowerCase() == "activelink" || event.srcElement.className.toLowerCase() == "inactivelink"))
					{
						event.cancelBubble = true;
						event.srcElement.click();
						break;
					}
					if (event.srcElement.type == null ||
						(event.srcElement.type && event.srcElement.type != "button"))
						oDefault.FinishBtn.click();
					break;

				// Backspace		
				case 8:
					if (event.srcElement.type == null ||
						(event.srcElement.type && event.srcElement.type != "text"))
						event.returnValue = false;
					break;
					
				// Escape
				case 27:
					oDefault.CancelBtn.click();
					break;
			}
		}
	}
}

/*****************************************************************************
 Description: OnKeyDown event handler for HTML pages.
******************************************************************************/
function OnKey()
{
	//Get outermost window
	var oDefault = window;
	while (oDefault != oDefault.parent)
		oDefault = oDefault.parent;

	var bPreviousTab = false;

	if (event.keyCode != 0)
	{
		if (!event.repeat)
		{
			switch(event.keyCode)
			{
				// Enter key for <SELECT>, other controls handled in OnPress()
				case 13:
					if (event.srcElement.type && event.srcElement.type.substr(0,6) == "select")
						oDefault.FinishBtn.click();
					break;
					
				// Escape key for <SELECT>, other controls handled in OnPress()
				case 27:
					if (event.srcElement.type && event.srcElement.type.substr(0,6) == "select")
						oDefault.CancelBtn.click();
					break;

				//F1
				case 112:
					oDefault.HelpBtn.click();
					break;
					
				case 65:
				case 70:
				case 78:
					{
						if (event.ctrlKey)
							event.returnValue = false;
					}
					
					break;
					
				//Case for 33,9,34 have to be in this order
				//Page Up
				case 33:
					bPreviousTab = true;
					
				//Tab
				case 9:
					if (event.shiftKey)
						bPreviousTab = true;
						
				//Page Down
				case 34:
					if (event.ctrlKey && oDefault.tab_array != null && oDefault.tab_array.length > 1)
					{
						for (i = 0; i < oDefault.tab_array.length; i++)
						{
							if ((oDefault.tab_array[i].className.toLowerCase() == "activelink") || (oDefault.tab_array[i].className.toLowerCase() == "inactivelink"))
							{
								var j = 0;
								
								if (bPreviousTab)
								{
									j = i - 1;
									while (j != i)
									{
										if (j < 0)
										{
											j = oDefault.tab_array.length - 1;
										}
										if ((oDefault.tab_array[j].className.toLowerCase() == "activelink") || (oDefault.tab_array[j].className.toLowerCase() == "inactivelink"))
										{
											j--;
										}
										else
										{
											break;
										}
									}
									while ((oDefault.tab_array[j].className.toLowerCase() == "") || (oDefault.tab_array[j].className.toLowerCase() == "inactivelink"))
									{
										if (j == 0)
										{
											break;
										}
										if (oDefault.tab_array[j - 1].className.toLowerCase() == "inactivelink")
										{
											j--;
										}
										else
										{
											break;
										}
									}
									if (j == 0)
									{
										j = oDefault.tab_array.length - 1;
									}
									else
									{
										j = j - 1;
									}
								}
								else
								{
									j = i + 1;
									while (j != i)
									{
										if (j >= oDefault.tab_array.length)
										{
											j = 0;
										}
										if ((oDefault.tab_array[j].className.toLowerCase() == "activelink") || (oDefault.tab_array[j].className.toLowerCase() == "inactivelink"))
										{
											j++;
										}
										else
										{
											break;
										}
									}
									while ((oDefault.tab_array[j].className.toLowerCase() == "") || (oDefault.tab_array[j].className.toLowerCase() == "inactivelink"))
									{
										if (j == oDefault.tab_array.length - 1)
										{
											break;
										}
										if (oDefault.tab_array[j + 1].className.toLowerCase() == "inactivelink")
										{
											j++;
										}
										else
										{
											break;
										}
									}
									if (j == oDefault.tab_array.length - 1)
									{
										j = 0;
									}
									else
									{
										j = j + 1;
									}
								}
								//Prevent double notification when we pop up an error
								event.cancelBubble = true;
								oDefault.tab_array[j].click();
								break;
							}
						}
					}
					break;
							
				//Alt-Left arrow
				case 37:
					if (event.altKey)
						event.returnValue = false;
					break;
					
				//Alt-Right arrow
				case 39:					
					if (event.altKey)
						event.returnValue = false;
					break;

				default:
					break;				
			}
		}
	}
}

/******************************************************************************
 Description: KeyDown event handler for WizCombo control
    nKeyCode: Ascii code for key
******************************************************************************/
function OnWizComboKeyDown(nKeyCode)
{
	// Get outermost window
	var oDefault = window;
	while (oDefault != oDefault.parent)
		oDefault = oDefault.parent;

	switch(nKeyCode)
	{
		// Enter
		case 13:
			oDefault.FinishBtn.click();
			break;
			
		// Escape
		case 27:
			oDefault.CancelBtn.click();
			break;

		// F1
		case 112:
			oDefault.HelpBtn.click();
			break;
	}
}

//DO MOUSEOVER***********************************************
//***********************************************************
function MouseOverActiveText()
{
  	var e = window.event.srcElement;
	
	if (e && e.className.toLowerCase() == "activelink")
		{
		  e.className = "activelink2";
		}
}

//DO MOUSEOUT************************************************
//***********************************************************
function MouseOutActiveText()
{
  	var e = window.event.srcElement;
	
	if (e && e.className.toLowerCase() == "activelink2")
		{
		  e.className = "activelink";
		}
}


//SET MOUSEOVERS AND MOUSOUTS********************************
//***********************************************************
document.onmouseover = MouseOverActiveText;
document.onmouseout = MouseOutActiveText;
// SIG // Begin signature block
// SIG // MIIoNwYJKoZIhvcNAQcCoIIoKDCCKCQCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // GaS1/sPy4pJLgh6v9hgEgwMJnBviNIQmirRfwck7icig
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
// SIG // ghoKMIIaBgIBATCBlTB+MQswCQYDVQQGEwJVUzETMBEG
// SIG // A1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9u
// SIG // ZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MSgwJgYDVQQDEx9NaWNyb3NvZnQgQ29kZSBTaWduaW5n
// SIG // IFBDQSAyMDExAhMzAAADri01UchTj1UdAAAAAAOuMA0G
// SIG // CWCGSAFlAwQCAQUAoIGuMBkGCSqGSIb3DQEJAzEMBgor
// SIG // BgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgorBgEE
// SIG // AYI3AgEVMC8GCSqGSIb3DQEJBDEiBCAoWhE3VDCC1r/5
// SIG // 7btTn439Vp2rmVOcywNtIFHL9NkAHzBCBgorBgEEAYI3
// SIG // AgEMMTQwMqAUgBIATQBpAGMAcgBvAHMAbwBmAHShGoAY
// SIG // aHR0cDovL3d3dy5taWNyb3NvZnQuY29tMA0GCSqGSIb3
// SIG // DQEBAQUABIIBAKKYPilF+0uzYk9oEqv+tNxaye4vPrbI
// SIG // g0p1q7NWqMHhyAIfXInnX9/Fvbu93CNJyY/TAOVBWCqv
// SIG // JPR7jj59ShXRt/bqZDfI1liAV8/zODMowZ3F93mBI5HC
// SIG // fXZJMiXa7oe2oQXKjKtudzmPUdClJbEbAtpYwQplyjyE
// SIG // /b+6LXIK/ijbijjCgaW80WWKvM5VNI8yqaCXBQNRRIC1
// SIG // e0hdn54JhM2wS7J6JYjuz7/l880iysXyY5BWh3SJNZe+
// SIG // sxK0MUGJd8dj61VRSJ8fp8/K2p6Pvm1kTB4PwdsNBOOq
// SIG // Cwz64ZMTmeduNkCuJLk4DRCiuzH9Q4YH+42xOoTozU73
// SIG // eo2hgheUMIIXkAYKKwYBBAGCNwMDATGCF4Awghd8Bgkq
// SIG // hkiG9w0BBwKgghdtMIIXaQIBAzEPMA0GCWCGSAFlAwQC
// SIG // AQUAMIIBUgYLKoZIhvcNAQkQAQSgggFBBIIBPTCCATkC
// SIG // AQEGCisGAQQBhFkKAwEwMTANBglghkgBZQMEAgEFAAQg
// SIG // J0/tt+yzvVGlmH1seNyrOlI9snnG82gCfh+fod2CaH0C
// SIG // BmWgDhrQRBgTMjAyNDAxMTExODUyNDUuMjEzWjAEgAIB
// SIG // 9KCB0aSBzjCByzELMAkGA1UEBhMCVVMxEzARBgNVBAgT
// SIG // Cldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAc
// SIG // BgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjElMCMG
// SIG // A1UECxMcTWljcm9zb2Z0IEFtZXJpY2EgT3BlcmF0aW9u
// SIG // czEnMCUGA1UECxMeblNoaWVsZCBUU1MgRVNOOjg5MDAt
// SIG // MDVFMC1EOTQ3MSUwIwYDVQQDExxNaWNyb3NvZnQgVGlt
// SIG // ZS1TdGFtcCBTZXJ2aWNloIIR6jCCByAwggUIoAMCAQIC
// SIG // EzMAAAHTHTKaFztAMHMAAQAAAdMwDQYJKoZIhvcNAQEL
// SIG // BQAwfDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hp
// SIG // bmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoT
// SIG // FU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UEAxMd
// SIG // TWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIwMTAwHhcN
// SIG // MjMwNTI1MTkxMjI0WhcNMjQwMjAxMTkxMjI0WjCByzEL
// SIG // MAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24x
// SIG // EDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jv
// SIG // c29mdCBDb3Jwb3JhdGlvbjElMCMGA1UECxMcTWljcm9z
// SIG // b2Z0IEFtZXJpY2EgT3BlcmF0aW9uczEnMCUGA1UECxMe
// SIG // blNoaWVsZCBUU1MgRVNOOjg5MDAtMDVFMC1EOTQ3MSUw
// SIG // IwYDVQQDExxNaWNyb3NvZnQgVGltZS1TdGFtcCBTZXJ2
// SIG // aWNlMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKC
// SIG // AgEAtI6rkzeINcW4VwnPDFfnTrvFKnNym22lrYub3bAF
// SIG // jNQ+H1UovuDVoBrT/wVUWK1Y9qFZ5zMtHms4nUDieLlL
// SIG // HATGzx2jMWjaYG0RvRREERZ3AFKbVpyPlT5edzw+jDy9
// SIG // Ms/HBwtmQ98HheMPrjAwBpy9+gZJtLKzjV75zPXjb5xu
// SIG // XY6KRKoh6HVkmrkcnuLn7QUdrE8Bh1ZsSrtBkuHzvOzY
// SIG // GyeFRsyAkcmV8Pfkb71zBv44TNdR/AFisyqZ9KDBptTE
// SIG // jHjby1Fm99R0mXpMfzQRLV75naO+TldN9DR4CF4ocWBH
// SIG // koFCMX2yOTpoDKv1QwkKdq/38v+TVWtyowkKDapphDOq
// SIG // KwCdlyo2IRCc6KeJ1gnCfe9FOq16QTyuFxjSgRYYS2u+
// SIG // EzP8rExSKxFziRtX1Ll33HVm9BMdBQHk06+oJpgqq3iT
// SIG // XozR33xv1RHheyzb1KrmBUZ3YglIYMutuK1uqbXJ0E4k
// SIG // XxNEC/4CxeNZANr2TGM3HNehImF0EAWhd1wLTHbodXaV
// SIG // 6kzz0BDtzLOf+QfyrY4UrKTHD1L0b29+SFjfqvi/sxMI
// SIG // qYZpwhhU7sjjKnOUBNK7hjdzMdFb+sf4XDpml8ax0BqT
// SIG // SiOT5+/WJPPQHJalNplx89WR1qfigXNw+lT+y99iZcMY
// SIG // Scd2rGtPOcb9Fzw+fDEVtVmhr2kCAwEAAaOCAUkwggFF
// SIG // MB0GA1UdDgQWBBTSxyCGuBQA+PeM9+Yb8wpptONeYjAf
// SIG // BgNVHSMEGDAWgBSfpxVdAF5iXYP05dJlpxtTNRnpcjBf
// SIG // BgNVHR8EWDBWMFSgUqBQhk5odHRwOi8vd3d3Lm1pY3Jv
// SIG // c29mdC5jb20vcGtpb3BzL2NybC9NaWNyb3NvZnQlMjBU
// SIG // aW1lLVN0YW1wJTIwUENBJTIwMjAxMCgxKS5jcmwwbAYI
// SIG // KwYBBQUHAQEEYDBeMFwGCCsGAQUFBzAChlBodHRwOi8v
// SIG // d3d3Lm1pY3Jvc29mdC5jb20vcGtpb3BzL2NlcnRzL01p
// SIG // Y3Jvc29mdCUyMFRpbWUtU3RhbXAlMjBQQ0ElMjAyMDEw
// SIG // KDEpLmNydDAMBgNVHRMBAf8EAjAAMBYGA1UdJQEB/wQM
// SIG // MAoGCCsGAQUFBwMIMA4GA1UdDwEB/wQEAwIHgDANBgkq
// SIG // hkiG9w0BAQsFAAOCAgEAQGJYWKFEPuGmkOeDBTXxOhMv
// SIG // L+K1r/i7Q0UozDNl/YOLmpwPXFO1YrXaSD1f8xOr+ABI
// SIG // Xv1Z4NlAEeao9kld7M/nw6jelS1lGbCkdEEdiWFypxT0
// SIG // VY9ens2cj+83eR/CLL7HBHKJ3l/mkRxdMRhjOLQy60vO
// SIG // L4+kZtG4KFi11pzE2eZD+KMJxpptC7JiJ7rtBiqw2Z5H
// SIG // k1Zn5PIE08vHdctz9iGHNlCOIiWFwrkmigrhXjtMKsrH
// SIG // Kb4RkEp6NVwBSt6Gsm7g9ZkqEMU/au+/iwBhkG4kqBpY
// SIG // E40EGsmLEGj3BtUOEDcDjRqpAEgmU28yZZ5pB4JFpSki
// SIG // 07pTmopViGOIUtRGfsPrF9ASfS3DNeNoedTpVyzKDy6c
// SIG // xwG+sdtoqWgCeSn97shWjilsOIZ7tM1rPjyj3dfdp3Xi
// SIG // tqIFn2hXX5xL5Fgwx9naC/mQOUAXfF54LP5ndwa55Zdg
// SIG // ZGf4ImRP3ysqJa4kd2kwFgsRQlyiJfwpbtm254/an1WC
// SIG // 6QFUBHD2gn0wH+zmQZV5pbhE76tWP0jYcQujCdUCwp5F
// SIG // 0iP/4l2KZkSk+/N0CkYJqP+M7Y97i/We8W2xsSEoPj9B
// SIG // 00V9ecuE0XgWztkRTcgo/PIDjkZPrME9ZGil1HxgeM44
// SIG // OV7pcUm8t7izcUHmxOkxN3ACtPn52OVKR2hHZcOHu4ow
// SIG // ggdxMIIFWaADAgECAhMzAAAAFcXna54Cm0mZAAAAAAAV
// SIG // MA0GCSqGSIb3DQEBCwUAMIGIMQswCQYDVQQGEwJVUzET
// SIG // MBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVk
// SIG // bW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0
// SIG // aW9uMTIwMAYDVQQDEylNaWNyb3NvZnQgUm9vdCBDZXJ0
// SIG // aWZpY2F0ZSBBdXRob3JpdHkgMjAxMDAeFw0yMTA5MzAx
// SIG // ODIyMjVaFw0zMDA5MzAxODMyMjVaMHwxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1l
// SIG // LVN0YW1wIFBDQSAyMDEwMIICIjANBgkqhkiG9w0BAQEF
// SIG // AAOCAg8AMIICCgKCAgEA5OGmTOe0ciELeaLL1yR5vQ7V
// SIG // gtP97pwHB9KpbE51yMo1V/YBf2xK4OK9uT4XYDP/XE/H
// SIG // ZveVU3Fa4n5KWv64NmeFRiMMtY0Tz3cywBAY6GB9alKD
// SIG // RLemjkZrBxTzxXb1hlDcwUTIcVxRMTegCjhuje3XD9gm
// SIG // U3w5YQJ6xKr9cmmvHaus9ja+NSZk2pg7uhp7M62AW36M
// SIG // EBydUv626GIl3GoPz130/o5Tz9bshVZN7928jaTjkY+y
// SIG // OSxRnOlwaQ3KNi1wjjHINSi947SHJMPgyY9+tVSP3PoF
// SIG // VZhtaDuaRr3tpK56KTesy+uDRedGbsoy1cCGMFxPLOJi
// SIG // ss254o2I5JasAUq7vnGpF1tnYN74kpEeHT39IM9zfUGa
// SIG // RnXNxF803RKJ1v2lIH1+/NmeRd+2ci/bfV+Autuqfjbs
// SIG // Nkz2K26oElHovwUDo9Fzpk03dJQcNIIP8BDyt0cY7afo
// SIG // mXw/TNuvXsLz1dhzPUNOwTM5TI4CvEJoLhDqhFFG4tG9
// SIG // ahhaYQFzymeiXtcodgLiMxhy16cg8ML6EgrXY28MyTZk
// SIG // i1ugpoMhXV8wdJGUlNi5UPkLiWHzNgY1GIRH29wb0f2y
// SIG // 1BzFa/ZcUlFdEtsluq9QBXpsxREdcu+N+VLEhReTwDwV
// SIG // 2xo3xwgVGD94q0W29R6HXtqPnhZyacaue7e3PmriLq0C
// SIG // AwEAAaOCAd0wggHZMBIGCSsGAQQBgjcVAQQFAgMBAAEw
// SIG // IwYJKwYBBAGCNxUCBBYEFCqnUv5kxJq+gpE8RjUpzxD/
// SIG // LwTuMB0GA1UdDgQWBBSfpxVdAF5iXYP05dJlpxtTNRnp
// SIG // cjBcBgNVHSAEVTBTMFEGDCsGAQQBgjdMg30BATBBMD8G
// SIG // CCsGAQUFBwIBFjNodHRwOi8vd3d3Lm1pY3Jvc29mdC5j
// SIG // b20vcGtpb3BzL0RvY3MvUmVwb3NpdG9yeS5odG0wEwYD
// SIG // VR0lBAwwCgYIKwYBBQUHAwgwGQYJKwYBBAGCNxQCBAwe
// SIG // CgBTAHUAYgBDAEEwCwYDVR0PBAQDAgGGMA8GA1UdEwEB
// SIG // /wQFMAMBAf8wHwYDVR0jBBgwFoAU1fZWy4/oolxiaNE9
// SIG // lJBb186aGMQwVgYDVR0fBE8wTTBLoEmgR4ZFaHR0cDov
// SIG // L2NybC5taWNyb3NvZnQuY29tL3BraS9jcmwvcHJvZHVj
// SIG // dHMvTWljUm9vQ2VyQXV0XzIwMTAtMDYtMjMuY3JsMFoG
// SIG // CCsGAQUFBwEBBE4wTDBKBggrBgEFBQcwAoY+aHR0cDov
// SIG // L3d3dy5taWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNS
// SIG // b29DZXJBdXRfMjAxMC0wNi0yMy5jcnQwDQYJKoZIhvcN
// SIG // AQELBQADggIBAJ1VffwqreEsH2cBMSRb4Z5yS/ypb+pc
// SIG // FLY+TkdkeLEGk5c9MTO1OdfCcTY/2mRsfNB1OW27DzHk
// SIG // wo/7bNGhlBgi7ulmZzpTTd2YurYeeNg2LpypglYAA7AF
// SIG // vonoaeC6Ce5732pvvinLbtg/SHUB2RjebYIM9W0jVOR4
// SIG // U3UkV7ndn/OOPcbzaN9l9qRWqveVtihVJ9AkvUCgvxm2
// SIG // EhIRXT0n4ECWOKz3+SmJw7wXsFSFQrP8DJ6LGYnn8Atq
// SIG // gcKBGUIZUnWKNsIdw2FzLixre24/LAl4FOmRsqlb30mj
// SIG // dAy87JGA0j3mSj5mO0+7hvoyGtmW9I/2kQH2zsZ0/fZM
// SIG // cm8Qq3UwxTSwethQ/gpY3UA8x1RtnWN0SCyxTkctwRQE
// SIG // cb9k+SS+c23Kjgm9swFXSVRk2XPXfx5bRAGOWhmRaw2f
// SIG // pCjcZxkoJLo4S5pu+yFUa2pFEUep8beuyOiJXk+d0tBM
// SIG // drVXVAmxaQFEfnyhYWxz/gq77EFmPWn9y8FBSX5+k77L
// SIG // +DvktxW/tM4+pTFRhLy/AsGConsXHRWJjXD+57XQKBqJ
// SIG // C4822rpM+Zv/Cuk0+CQ1ZyvgDbjmjJnW4SLq8CdCPSWU
// SIG // 5nR0W2rRnj7tfqAxM328y+l7vzhwRNGQ8cirOoo6CGJ/
// SIG // 2XBjU02N7oJtpQUQwXEGahC0HVUzWLOhcGbyoYIDTTCC
// SIG // AjUCAQEwgfmhgdGkgc4wgcsxCzAJBgNVBAYTAlVTMRMw
// SIG // EQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRt
// SIG // b25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRp
// SIG // b24xJTAjBgNVBAsTHE1pY3Jvc29mdCBBbWVyaWNhIE9w
// SIG // ZXJhdGlvbnMxJzAlBgNVBAsTHm5TaGllbGQgVFNTIEVT
// SIG // Tjo4OTAwLTA1RTAtRDk0NzElMCMGA1UEAxMcTWljcm9z
// SIG // b2Z0IFRpbWUtU3RhbXAgU2VydmljZaIjCgEBMAcGBSsO
// SIG // AwIaAxUAUsdt3DHDQdSEMLPy2JEV2uyOSbCggYMwgYCk
// SIG // fjB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
// SIG // Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
// SIG // TWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1N
// SIG // aWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAxMDANBgkq
// SIG // hkiG9w0BAQsFAAIFAOlKjJswIhgPMjAyNDAxMTExNTQ5
// SIG // NDdaGA8yMDI0MDExMjE1NDk0N1owdDA6BgorBgEEAYRZ
// SIG // CgQBMSwwKjAKAgUA6UqMmwIBADAHAgEAAgIAhTAHAgEA
// SIG // AgISXzAKAgUA6UveGwIBADA2BgorBgEEAYRZCgQCMSgw
// SIG // JjAMBgorBgEEAYRZCgMCoAowCAIBAAIDB6EgoQowCAIB
// SIG // AAIDAYagMA0GCSqGSIb3DQEBCwUAA4IBAQBu4mYa7Y/f
// SIG // Eep4RB3SzBOSjoy/azCVrpQVoN+tYCSf17v1OQC9wMQB
// SIG // Oqt8/7pwF+BXGWYqScxVxr/X1NIi25e6jfkHvSbpTm9A
// SIG // sQyUl5VH9NI/KcV6YOvYirm1rVAyxHfSoLhzqY8+j4Pt
// SIG // YyXfBy6j4tgp20g1IWBmqpLeY2w++YTfTf/OY0+MTjLJ
// SIG // yym1BQt7cFIEjMy5CDdxqZxGcGmGD/tqysEIXCVDrpHo
// SIG // JKhqwDUBtbCPLFqSihQdpopsP5XkLCswI5isk2zsnJu9
// SIG // MI0V7zZOiGI+pZgorOtZDwGhxHxh4o+pPR5oudvPKcGc
// SIG // ik62OtfA7tfcpm2lpEv+NZpdMYIEDTCCBAkCAQEwgZMw
// SIG // fDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UEAxMdTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIwMTACEzMAAAHT
// SIG // HTKaFztAMHMAAQAAAdMwDQYJYIZIAWUDBAIBBQCgggFK
// SIG // MBoGCSqGSIb3DQEJAzENBgsqhkiG9w0BCRABBDAvBgkq
// SIG // hkiG9w0BCQQxIgQgYQzTSJIl2hXMpS1u1XOCv9hlmxvZ
// SIG // WfbdFMnON/TwnDIwgfoGCyqGSIb3DQEJEAIvMYHqMIHn
// SIG // MIHkMIG9BCCSZvTqxODuT1gNSmhWs7a/bj/eq0IBJ/rY
// SIG // BrWN8Tqq9TCBmDCBgKR+MHwxCzAJBgNVBAYTAlVTMRMw
// SIG // EQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRt
// SIG // b25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRp
// SIG // b24xJjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1w
// SIG // IFBDQSAyMDEwAhMzAAAB0x0ymhc7QDBzAAEAAAHTMCIE
// SIG // IPjmEL2gyr84o2+Hihr3M2jH+5beKbylc66WIuX9IyBP
// SIG // MA0GCSqGSIb3DQEBCwUABIICAJX1j+nv08hL00Pg57eO
// SIG // 0xCYKrkVCxPr/8kNHkdl0S7nUKSCEJL8vsa3xPzru075
// SIG // CLzLzWpHw+4KgFyWUAXtEG06w4zvpBOxDiZEpxISNKJ7
// SIG // VG/cKj+R8NISuoextivGIiFnHp9Y1NnmN9Xe381cUAEh
// SIG // sJgPU9z68jlUw6L4+y4aMC9EXn3jWmm2YwtsgmjpLerB
// SIG // iCpMLOVrVxe6n6uNosxHROcMYJSudNXKg2vnoANx9uEN
// SIG // 5AZsJGhckt2KR6pr0ksjPAKixOQ9b+A7enxwE13+6RQ9
// SIG // 8yB5z5hBGH+l7yWtfqUydtN9zRLA13u/tp8FTg02k7k3
// SIG // u5jQS2TOsD/Q3jTyyHBPG05900cHABUB6TkdvUPzTdJl
// SIG // DnkzLZy0lg9qEPhQ7zfni/7adxrYPd/d5BZKy/S4t19J
// SIG // FdcqvHC0diIzVg+EdhgIzqwq5U8e22pQAghBuxao2+T4
// SIG // wy7Cm1dseUlWHkPAhCdMIUo3ZcJtkxAAxMWiYUvJ5XrR
// SIG // 0acXJux1CM7SVH72Y7miDy/ukj6lpzrP9elrT9Ltgl4s
// SIG // s23EXhcGAWmtVqHnGBmUNtM/qB+G6XyupmxfGWsidazx
// SIG // FX2OGlOPVLbTrhkrJLjV1O06cgyKO8IieUZNtgZqWjNB
// SIG // KprZUnd5k1lYBr5hY//mdxIt8wOI0lfE32t7K8WE/8tS
// SIG // eNtH
// SIG // End signature block
