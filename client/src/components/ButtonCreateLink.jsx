import '../styles/components/buttonCreate.css'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

/**
 * Componente de enlace de botón de creación con texto y un ícono SVG.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.text - Texto que se mostrará en el botón.
 * @param {JSX.Element} props.svg - Elemento SVG que se mostrará junto al texto en el botón.
 * @param {string} props.href - URL a la que se redirigirá al hacer clic en el botón.
 * @returns {JSX.Element} - Elemento JSX que representa el botón de creación como un enlace.
 */
export function ButtonCreateLink({ text, svg, href }) {
  return (
    <div className="button-create-container">
      {/* Utiliza el componente Link para crear un enlace con la URL proporcionada */}
      <Link to={href} className="button-create">
        {/* Elemento SVG para el ícono */}
        {svg}
        {/* Elemento de texto */}
        <span>
          {text}
        </span>
      </Link>
    </div>
  );
}

ButtonCreateLink.propTypes = {
  text: PropTypes.string,
  svg: PropTypes.element,
  href: PropTypes.string
}