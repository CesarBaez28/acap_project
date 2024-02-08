import { useState, useEffect } from "react";

export function useBarcodeScanner(handleBarcodeScan) {
  const [barCode, setBarCode] = useState('')

  useEffect(() => {
    const handleKeyPress = (event) => {
      let barCodeText = barCode

      if (event.keyCode === 13 && barCodeText.length > 3) {
        setBarCode('')
        handleBarcodeScan(barCodeText);
        return
      }

      if (event.keyCode === 16) { return }

      barCodeText += event.key

      setTimeout(() => {
        barCodeText = ''
      }, 100);
      
      setBarCode(barCodeText)
    }

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };

  }, [barCode, handleBarcodeScan]);

  return [barCode, setBarCode];
}
