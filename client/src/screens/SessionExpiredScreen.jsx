import '../styles/screens/sessionExpiredScreen.css'
import RefreshSvg from '../assets/refresh.svg?react'
import {ButtonSecundaryLink } from '../components/ButtonSecondaryLink'

export function SessionExpiredScreen () {
  return (
    <section className='session-expired-section'>
      <div className='session-expired-container col-10 col-md-8 col-lg-6'>
        <div className='session-expired'>
          <RefreshSvg style={{ fill: "var(--main-color)", width: '80px', height: "80px" }} />
          <h2 className='session-expired-title'>Su sessión ha expirado</h2>
          <p className='session-expired-text'>Para seguir usando la aplicación, favor de iniciar sesión de nuevo</p>

          <ButtonSecundaryLink href='/login'>
            Iniciar sesión
          </ButtonSecundaryLink>
        </div>
      </div>
    </section>
  )
}