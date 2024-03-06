import '../styles/components/cardMenu.css';
import { Link } from 'react-router-dom';

/**
 * Componente de tarjeta de menú que muestra un título y opciones de enlace.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.title - Título de la tarjeta de menú.
 * @param {Array} props.options - Lista de opciones de enlace con propiedades 'label' y 'href'.
 * @returns {JSX.Element} - Elemento JSX que representa la tarjeta de menú con opciones de enlace.
 */
export function CardMenu({ title, options }) {
  // Retorna el elemento JSX de la tarjeta de menú 
  return (
    <article className='card-option col-12 col-md-6 col-lg-4'>
      <div className='card-option-container'>
        <div className='card-option-header-container'>
          {/* Encabezado de la tarjeta con el título proporcionado */}
          <header className='card-option-header'>
            <h2>{title}</h2>
          </header>
        </div>
        <div className='card-options'>
          {/* Mapea las opciones y crea enlaces con las propiedades proporcionadas */}
          {options.map((option, index) => (
            <Link to={option.href} key={index} className='option-link'>
              {option.label}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
