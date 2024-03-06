/**
 * Módulo para la firma digital utilizando el dispositivo Topaz.
 * Se exporta la variable `isValidDemo` que indica si la demostración es válida.
 */

import { Topaz } from "./sigPlusExliteWraper";

/** Variable que indica si la demostración es válida. */
export let isValidDemo;

/**
 * Inicia el proceso de firma digital.
 * Verifica si el dispositivo está conectado y limpia los objetos de la tableta y del formulario.
 * Inicia la firma en vivo en el elemento de lienzo especificado.
 */
export async function startSigning() {
  // Verifica si el dispositivo está conectado.
  await ValidateLCDDemo();

  // Si la demostración no es válida, retorna.
  if (!isValidDemo) return;

  // Limpia la tableta y los objetos del formulario.
  clearSign();

  // Inicia la firma en vivo en el elemento de lienzo especificado.
  let sign = Topaz.Canvas.Sign;
  await sign.StartSign(document.getElementById('cnv'));
}

/**
 * Finaliza el proceso de firma digital.
 * Obtiene la imagen de la firma en formato base64.
 * Limpia la tableta y restablece el estado.
 * Elimina las etiquetas personalizadas y devuelve la respuesta.
 * @returns {string} - Base64String de la imagen de la firma.
 */
export async function doneSigning() {
  let sign = Topaz.Canvas.Sign;

  // Obtiene la imagen de la firma en formato base64.
  let response = await sign.GetSignatureImage();

  let lCDTablet = Topaz.Canvas.LCDTablet;

  // Limpia la tableta y restablece el estado.
  await lCDTablet.ClearTablet();
  await sign.SetTabletState(0);
  await lCDTablet.ClearSigWindow(1);
  let sigWindow = Topaz.SignatureCaptureWindow;
  await sigWindow.Sign.SignComplete();

  // Elimina las etiquetas personalizadas.
  deleteTags();

  return response;
}

/**
 * Limpia la firma digital y restablece el formulario.
 */
export async function clearSign() {
  let sign = Topaz.Canvas.Sign;

  // Limpia la firma digital.
  sign.ClearSign();

  // Elimina todas las etiquetas personalizadas.
  deleteTags();

  let lCDTablet = Topaz.Canvas.LCDTablet;

  // Restablece los datos del formulario.
  await lCDTablet.ClearSigWindow(1);
  await lCDTablet.ClearTablet();
}

/**
 * Elimina todas las etiquetas personalizadas con el nombre 'myextdataelem'.
 */
export function deleteTags() {
  // Obtiene todas las etiquetas con el nombre 'myextdataelem'.
  let myextdataelems = document.querySelectorAll("myextdataelem");

  // Elimina todas las etiquetas 'myextdataelem'.
  myextdataelems.forEach(function (element) {
    element.parentNode.removeChild(element);
  });
}

/**
 * Verifica si la demostración del dispositivo Topaz es válida.
 * Actualiza la variable `isValidDemo` en consecuencia.
 */
async function ValidateLCDDemo() {
  // Inicializa la validez de la demostración.
  isValidDemo = true;

  // Verifica si la extensión SigPlusExtLite está instalada.
  let isInstalled = document.documentElement.getAttribute('SigPlusExtLiteExtension-installed');
  if (!isInstalled) {
    isValidDemo = false;
    alert("La extensión SigPlusExtLite de Topaz no está instalada o está deshabilitada. Por favor, instale o habilite la extensión.");
    return;
  }

  // Verifica la versión de la extensión en Firefox.
  if (navigator.userAgent.indexOf("Firefox") != -1) {
    let extensionVersion = document.documentElement.getAttribute('Extension-version');
    if (extensionVersion == null) {
      isValidDemo = false;
      alert("Hay disponible una nueva versión de la extensión SigPlusExtLite: https://addons.mozilla.org/en-US/firefox/addon/topaz-sigplusextlite-extension/. \nSe recomienda instalar la nueva extensión.");
      return;
    }
  }

  // Obtiene el estado del dispositivo Topaz.
  let global = Topaz.Global;
  let response = await global.GetDeviceStatus();

  // Verifica el estado del dispositivo Topaz.
  if (response == 0) {
    isValidDemo = false;
    alert("Topaz SigPlusExtLite no pudo encontrar un dispositivo Topaz conectado.");
  } else if (response == -2) {
    isValidDemo = false;
    alert("SDK de Topaz SigPlusExtLite no instalado o no es compatible con esta función.");
    return;
  } else if (response == -3) {
    isValidDemo = false;
    alert("Topaz SigPlusExtLite no pudo encontrar controladores SigPlus instalados.");
    return;
  }
}
