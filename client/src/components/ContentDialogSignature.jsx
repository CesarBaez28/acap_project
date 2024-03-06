import { ButtonSecundary } from "./ButtonSecondary";
import '../styles/components/contentDialogSignature.css'
import { startSigning, clearSign, doneSigning } from "../utils/singWithTopazSystem";

/**
 * Componente que representa el contenido del diálogo para capturar la firma.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {function} props.setData - Función para almacenar la firma en los datos.
 * @param {function} props.setModalShow - Función para controlar la visibilidad del diálogo.
 * @returns {JSX.Element} - Elemento JSX que representa el contenido del diálogo de firma.
 */
export function ContentDialogSignature({ setData, setModalShow }) {

  /**
   * Manejador para iniciar el proceso de firma.
   */
  const handleSign = async () => {
    await startSigning();
  }

  /**
   * Manejador para finalizar el proceso de firma, obtener la firma y cerrar el diálogo.
   */
  const handleDone = async () => {
    const base64Signature = await doneSigning();
    setData(base64Signature);
    setModalShow(false);
  }

  /**
   * Manejador para borrar la firma en el área de firma.
   */
  const handleErase = async () => {
    await clearSign();
  }

  return (
    <>
      {/* Elemento Canvas para la captura de la firma */}
      <canvas id="cnv" className="canvas-sing"></canvas>

      {/* Contenedor de botones de acción */}
      <div className="button-sing-container">
        {/* Botón secundario para cancelar el proceso de firma */}
        <ButtonSecundary type="button" onClick={() => setModalShow(false)}>Cancelar</ButtonSecundary>
        {/* Botón secundario para iniciar el proceso de firma */}
        <ButtonSecundary type="button" onClick={handleSign}>Firmar</ButtonSecundary>
        {/* Botón secundario para borrar la firma en el área de firma */}
        <ButtonSecundary type="button" onClick={handleErase}>Limpiar</ButtonSecundary>
        {/* Botón secundario para finalizar el proceso de firma */}
        <ButtonSecundary type="button" onClick={handleDone}>Terminar</ButtonSecundary>
      </div>
    </>
  );
}
