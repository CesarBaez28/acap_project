import '../styles/components/loadingIndicator.css';

/**
 * Componente `LoadingIndicator` que muestra un indicador de carga.
 *
 * @component
 * @returns {JSX.Element} - Elemento JSX que representa el componente `LoadingIndicator`.
 */
export function LoadingIndicator() {
  return (
    <div className="loading-indicator">
      <div className="loading-indicator-spinner"></div>
      <h3>Loading...</h3>
    </div>
  );
}
