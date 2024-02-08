import { Topaz } from "./sigPlusExliteWraper";
export let isValidDemo

/*Start signing*/
export async function startSigning() {
  // Check device is connected or not.
  await ValidateLCDDemo();

  if (!isValidDemo) return;

  /* Clear tablet and form objects */
  clearSign();

  /* start live signing */
  let sign = Topaz.Canvas.Sign;
  await sign.StartSign(document.getElementById('cnv'));
}

export async function doneSigning() {
  let sign = Topaz.Canvas.Sign;

  /* Get base64String */
  let response = await sign.GetSignatureImage();
  let returnString = ''

  if (response != null) {
    let location = response.search("base64,");
    returnString = response.slice(location + 7, response.length);
  }

  let lCDTablet = Topaz.Canvas.LCDTablet;
  await lCDTablet.ClearTablet();
  await sign.SetTabletState(0);
  await lCDTablet.ClearSigWindow(1);
  let sigWindow = Topaz.SignatureCaptureWindow;
  await sigWindow.Sign.SignComplete();

  deleteTags()
  return returnString
}

/* Clear signature */
export async function clearSign() {
  /* clear sign */
  let sign = Topaz.Canvas.Sign;
  sign.ClearSign();

  /*Delete all <myextdataelem> tags*/
  deleteTags()

  /* Reset form data */
  let lCDTablet = Topaz.Canvas.LCDTablet;
  await lCDTablet.ClearSigWindow(1);
  await lCDTablet.ClearTablet();
}

export function deleteTags() {
  // Get all <myextdataelem> tags 
  var myextdataelems = document.querySelectorAll("myextdataelem")

  // Delete all <myextdataelem> tags
  myextdataelems.forEach(function (element) {
    element.parentNode.removeChild(element)
  })
}

async function ValidateLCDDemo() {

  isValidDemo = true;
  var isInstalled = document.documentElement.getAttribute('SigPlusExtLiteExtension-installed');
  if (!isInstalled) {
    isValidDemo = false;
    alert("Topaz SigPlusExtLite extension is either not installed or disabled. Please install or enable extension.");
    return;
  }
  if (navigator.userAgent.indexOf("Firefox") != -1) {
    var extensionVersion = document.documentElement.getAttribute('Extension-version');
    if (extensionVersion == null) {
      isValidDemo = false;
      alert("A new version of the SigPlusExtLite extension is available: https://addons.mozilla.org/en-US/firefox/addon/topaz-sigplusextlite-extension/. \nIt is highly recommended that the new extension be installed.");
      return;
    }
  }

  let global = Topaz.Global;
  var response = await global.GetDeviceStatus();
  if (response == 0) {
    isValidDemo = false;
    alert("Topaz SigPlusExtLite could not find a topaz device attached.");
    return;
  }
  else if (response == -2) {
    isValidDemo = false;
    alert("Topaz SigPlusExtLite SDK either not installed or doesn't support this feature.");
    return;
  }
  else if (response == -3) {
    isValidDemo = false;
    alert("Topaz SigPlusExtLite could not find SigPlus drivers installed.");
    return;
  }
}