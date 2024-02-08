import { ButtonSecundary } from "./ButtonSecondary"
import '../styles/components/contentDialogSignature.css'
import { startSigning } from "../utils/singWithTopazSystem"
import { clearSign } from "../utils/singWithTopazSystem"
import { doneSigning } from "../utils/singWithTopazSystem"

export function ContentDialogSignature({setData, setModalShow }) {

  const handleSing = async () => {
    await startSigning()
  }

  const handleDone = async () => {
    const stringBase64 = await doneSigning()
    setData(stringBase64)
  }

  const handleErase = async () => {
    await clearSign()
  }

  return <>
    <canvas id="cnv" className="canvas-sing"></canvas>

    <div className="button-sing-container">
      <ButtonSecundary type="button" onClick={() => setModalShow(false)}>Cancelar</ButtonSecundary>
      <ButtonSecundary type="button" onClick={handleSing}>Firmar</ButtonSecundary>
      <ButtonSecundary type="button" onClick={handleErase}>Limpiar</ButtonSecundary>
      <ButtonSecundary type="button" onClick={handleDone}>Terminar</ButtonSecundary>
    </div>
  </>
}