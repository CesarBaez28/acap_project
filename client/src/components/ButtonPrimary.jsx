import PropTypes from 'prop-types';

/**
 * Componente de botón primario con estilo personalizado.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {function} props.onClick - Función que se ejecutará cuando se haga clic en el botón.
 * @param {string} props.type - Tipo del botón (por ejemplo, 'button', 'submit', 'reset').
 * @param {Object} props.styles - Estilos CSS adicionales proporcionados como un objeto.
 * @param {Object} props.additionalStyles - Estilos CSS adicionales proporcionados como un objeto, tiene prioridad sobre 'styles'.
 * @returns {JSX.Element} - Elemento JSX que representa el botón primario.
 */
export function ButtonPrimary(props) {
  // Define los estilos del botón combinando estilos predefinidos con estilos proporcionados como propiedades
  const buttonStyles = {
    padding: '.7rem 1rem',
    borderRadius: '0.5rem',
    border: "1px solid #0033A1",
    backgroundColor: '#0033A1',
    color: '#ffffff',
    cursor: 'pointer',
    fontSize: '1rem',
    ...props.styles,
    ...props.additionalStyles
  };

  // Retorna el elemento JSX del botón primario
  return (
    <button
      style={buttonStyles}
      onClick={props.onClick}
      type={props.type}
    >
      {/* Renderiza cualquier contenido hijo proporcionado */}
      {props.children}
    </button>
  );
}

ButtonPrimary.propTypes = {
  styles: PropTypes.object,
  additionalStyles: PropTypes.object,
  onClick: PropTypes.func,
  type: PropTypes.string,
  children: PropTypes.node
}
