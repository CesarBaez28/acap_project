import '../styles/components/contentDialogMessage.css';
import { ButtonPrimary } from './ButtonPrimary';

/**
 * Componente que representa un diálogo de mensaje con un ícono, texto y un botón de aceptar.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {ReactNode} props.svg - Elemento JSX que representa el ícono del mensaje.
 * @param {string} props.text - Texto del mensaje a ser mostrado.
 * @param {Function} props.onClick - Función a ser ejecutada al hacer clic en el botón de aceptar.
 * @returns {JSX.Element} - Elemento JSX que representa el diálogo de mensaje.
 */
export function ContentDialogMessage({ svg, text, ...props }) {
  return (
    <>
      {/* Contenedor principal del diálogo de mensaje */}
      <div className="dialog-message-container">
        {/* Contenedor del ícono del mensaje */}
        <span>{svg}</span>

        {/* Texto del mensaje */}
        <span className='dialog-message-text'>{text}</span>
      </div>

      {/* Contenedor del botón de aceptar */}
      <div className='button-dialo-message'>
        {/* Botón primario con la etiqueta "Aceptar" */}
        <ButtonPrimary onClick={props.onClick}>Aceptar</ButtonPrimary>
      </div>
    </>
  );
}
