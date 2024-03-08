import "../styles/components/card.css";
import PropTypes from "prop-types";

/**
 * Componente de tarjeta que envuelve y estiliza su contenido.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {ReactNode} props.children - Contenido que se mostrará dentro de la tarjeta.
 * @returns {JSX.Element} - Elemento JSX que representa la tarjeta estilizada con su contenido.
 */
export function Card({ children }) {
  // Retorna el elemento JSX de la tarjeta
  return (
    <div className="info-card">
      <div className="info-card-container">
        {/* Renderiza cualquier contenido hijo proporcionado */}
        {children}
      </div>
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node
}
