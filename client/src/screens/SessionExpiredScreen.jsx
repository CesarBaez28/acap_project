import '../styles/screens/sessionExpiredScreen.css'
import RefreshSvg from '../assets/refresh.svg?react'
import {ButtonSecundaryLink } from '../components/ButtonSecondaryLink'

/**
 * Componente que representa la pantalla de sesión expirada.
 * Proporciona un mensaje indicando que la sesión del usuario ha expirado y ofrece un botón para iniciar sesión nuevamente.
 *
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de sesión expirada.
 */
export function SessionExpiredScreen() {
  return (
    <section className='session-expired-section'>
      {/* Contenedor principal del componente */}
      <div className='session-expired-container col-10 col-md-8 col-lg-6'>
        {/* Contenido de la sesión expirada */}
        <div className='session-expired'>
          {/* Icono de recarga */}
          <RefreshSvg style={{ fill: "var(--main-color)", width: '80px', height: "80px" }} />
          {/* Título y texto informativo */}
          <h2 className='session-expired-title'>Su sesión ha expirado</h2>
          <p className='session-expired-text'>Para seguir usando la aplicación, favor de iniciar sesión de nuevo</p>
          
          {/* Botón de enlace para iniciar sesión */}
          <ButtonSecundaryLink href='/login'>
            Iniciar sesión
          </ButtonSecundaryLink>
        </div>
      </div>
    </section>
  );
}
