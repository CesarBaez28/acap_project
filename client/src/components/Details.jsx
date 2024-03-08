import '../styles/components/details.css';
import PropTypes from 'prop-types'

/**
 * Componente `Details` que representa un contenedor para mostrar detalles.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.date - Fecha para mostrar en el resumen.
 * @param {string} props.title - Título para mostrar en el resumen.
 * @param {JSX.Element} props.content - Contenido que se mostrará cuando se despliegue el detalle.
 * @returns {JSX.Element} - Elemento JSX que representa el componente `Details`.
 */
export function Details({ date, title, content }) {
  return (
    <details>
      <summary className='summary'>
        <header>
          <h4 className='title-date-summary'>{date}</h4>
          <h3 className='title-summary'>{title}</h3>
        </header>
      </summary>
      <article className='content-summary-container'>
        {content}
      </article>
    </details>
  );
}

Details.propTypes = {
  date: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.node
}