import '../styles/components/option.css';
import { Link } from 'react-router-dom';

/**
 * Componente `Option` que representa una opción de navegación o acción.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.name - Nombre o etiqueta de la opción.
 * @param {string} props.href - URL a la que se redirige al hacer clic en la opción.
 * @param {JSX.Element} props.svg - Elemento SVG que representa un icono para la opción.
 * @param {Function} props.onClickFunction - Función que se ejecuta al hacer clic en la opción.
 * @returns {JSX.Element} - Elemento JSX que representa el componente `Option`.
 */
export function Option({ name, href, svg, onClickFunction }) {
  /**
   * Manejador del clic en la opción. Ejecuta la función proporcionada, si existe.
   */
  const handleClick = () => {
    if (onClickFunction && typeof onClickFunction === 'function') {
      onClickFunction();
    }
  }

  return (
    <Link to={href} className='link' onClick={handleClick}>
      <div className='option'>
        <span>
          {svg}
        </span>
        <h6>{name}</h6>
      </div>
    </Link>
  );
}
