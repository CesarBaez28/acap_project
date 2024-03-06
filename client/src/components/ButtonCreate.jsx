import '../styles/components/buttonCreate.css'

/**
 * Componente de botón de creación con texto y un ícono SVG.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.text - Texto que se mostrará en el botón.
 * @param {JSX.Element} props.svg - Elemento SVG que se mostrará junto al texto en el botón.
 * @param {function} props.onClick - Función que se ejecutará cuando se haga clic en el botón.
 * @returns {JSX.Element} - Elemento JSX que representa el botón de creación.
 */
export function ButtonCreate({ text, svg, onClick }) {
  return (
    <div className="button-create-container">
      {/* Contenedor del botón con clases de estilo */}
      <button onClick={onClick} className="button-create">
        {/* Elemento SVG para el ícono */}
        {svg}
        {/* Elemento de texto */}
        <span>
          {text}
        </span>
      </button>
    </div>
  );
}
