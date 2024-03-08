import '../styles/components/mainContent.css';
import PropTypes from 'prop-types'

/**
 * Componente `MainContent` que representa el contenido principal de la aplicación.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {JSX.Element} props.content - Elemento JSX que representa el contenido principal a renderizar.
 * @returns {JSX.Element} - Elemento JSX que representa el componente `MainContent`.
 */
export function MainContent({ content }) {
  return (
    <main className="main-content">
      <div className="main-container">
        {content}
      </div>
    </main>
  );
}

MainContent.propTypes = {
  content: PropTypes.node
}