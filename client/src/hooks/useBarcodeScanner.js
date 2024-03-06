import { useState, useEffect } from "react";

/**
 * Hook personalizado para gestionar la funcionalidad de escaneo de códigos de barras.
 *
 * @param {function} handleBarcodeScan - Función de retorno que se invoca cuando se escanea un código de barras válido.
 * @returns {[string, function]} - Un array que contiene el valor actual del código de barras y una función para actualizar ese valor.
 */
export function useBarcodeScanner(handleBarcodeScan) {
  // Estado para almacenar el valor del código de barras
  const [barCode, setBarCode] = useState('');

  useEffect(() => {
    // Función de manejo de eventos de teclado para escanear el código de barras
    const handleKeyPress = (event) => {
      let barCodeText = barCode;

      // Verificar si se presionó la tecla 'Enter' y si el código de barras tiene al menos 4 caracteres
      if (event.keyCode === 13 && barCodeText.length > 3) {
        setBarCode(''); // Limpiar el valor del código de barras después de escanear
        handleBarcodeScan(barCodeText); // Invocar la función de retorno con el código de barras escaneado
        return;
      }

      // Ignorar la tecla 'Shift'
      if (event.keyCode === 16) {
        return;
      }

      // Agregar el carácter de la tecla actual al valor del código de barras
      barCodeText += event.key;

      // Restablecer el valor del código de barras después de 100 milisegundos (para permitir la entrada rápida)
      setTimeout(() => {
        barCodeText = '';
      }, 100);

      // Actualizar el estado con el valor del código de barras
      setBarCode(barCodeText);
    };

    // Agregar el event listener para el evento de teclado
    document.addEventListener('keydown', handleKeyPress);

    // Eliminar el event listener al desmontar el componente
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };

  }, [barCode, handleBarcodeScan]);

  // Retornar el valor actual del código de barras y la función para actualizar ese valor
  return [barCode, setBarCode];
}

