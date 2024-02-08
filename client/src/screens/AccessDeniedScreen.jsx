import CancelSvg from '../assets/cancel.svg?react'
import { ButtonPrimary } from '../components/ButtonPrimary'

import '../styles/screens/accessDeniedScreen.css'
import { useNavigate } from 'react-router-dom'

export function AccessDeniedScreen() {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/dashboard')
  }

  return <>
    <div className="accees-denied-container">
      <CancelSvg style={{ fill: "var(--main-color)", width: '80px', height: "80px" }} />

      <h1 className='access-denied-title'>Acceso denegado</h1>
      <p className='access-denied-text'>Ustes no tiene los permisos necesarios para visitar esta página</p>
      <ButtonPrimary onClick={handleGoHome}> Regresar a la página de inicio </ButtonPrimary>
    </div>
  </>
}