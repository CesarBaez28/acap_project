import { ButtonSecundary } from "./ButtonSecondary"
import '../styles/components/contentDialogSignature.css'

export function ContentDialogSignature({ data, setData, setModalShow }) {

  const handleSing = () => {
    console.log("firmar")
  }

  const handleDone = () => {
    console.log("Terminado")
  }

  const handleErase = () => {
    console.log("Limpiar")
  }

  return <>
    <canvas className="canvas-sing"></canvas>

    <div className="button-sing-container">
      <ButtonSecundary type="button" onClick={() => setModalShow(false)}>Cancelar</ButtonSecundary>
      <ButtonSecundary type="button" onClick={handleSing}>Firmar</ButtonSecundary>
      <ButtonSecundary type="button" onClick={handleDone}>Terminar</ButtonSecundary>
      <ButtonSecundary type="button" onClick={handleErase}>Limpiar</ButtonSecundary>
    </div>
  </>
}