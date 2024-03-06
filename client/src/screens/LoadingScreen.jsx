import '../styles/screens/loadingScreen.css'

/**
 * Componente que representa la pantalla de carga.
 * Muestra una animación de carga (spinner) y un mensaje indicando que la aplicación está en proceso de carga.
 *
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de carga.
 */
export function LoadingScreen() {
  return (
    <div className="loading">
      {/* Elemento visual para indicar la carga (spinner) */}
      <div className="spinner"></div>
      
      {/* Mensaje indicando que la aplicación está en proceso de carga */}
      <h2>Loading...</h2>
    </div>
  );
}
