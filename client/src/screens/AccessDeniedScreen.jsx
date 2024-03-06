import CancelSvg from '../assets/cancel.svg?react'
import { ButtonPrimary } from '../components/ButtonPrimary'

import '../styles/screens/accessDeniedScreen.css'
import { useNavigate } from 'react-router-dom'

/**
 * Componente que representa la pantalla de "Acceso Denegado".
 *
 * Este componente muestra un mensaje de acceso denegado y un botón para regresar a la página de inicio.
 *
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de "Acceso Denegado".
 */
export function AccessDeniedScreen() {
  // Utiliza el hook useNavigate para obtener la función de navegación
  const navigate = useNavigate();

  /**
   * Función que se ejecuta al hacer clic en el botón de "Regresar a la página de inicio".
   * Navega a la ruta '/dashboard'.
   */
  const handleGoHome = () => {
    navigate('/dashboard');
  };

  // Renderiza la pantalla de "Acceso Denegado"
  return (
    <div className="accees-denied-container">
      {/* Utiliza el componente CancelSvg para mostrar un icono de cancelación */}
      <CancelSvg style={{ fill: "var(--main-color)", width: '80px', height: "80px" }} />

      {/* Título y texto que indican que el acceso está denegado */}
      <h1 className='access-denied-title'>Acceso denegado</h1>
      <p className='access-denied-text'>Usted no tiene los permisos necesarios para visitar esta página</p>

      {/* Botón que llama a la función handleGoHome al hacer clic */}
      <ButtonPrimary onClick={handleGoHome}> Regresar a la página de inicio </ButtonPrimary>
    </div>
  );
}
