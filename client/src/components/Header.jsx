import '../styles/components/header.css'
import ProfileSvg from '../assets/profile.svg?react'
import BellSvg from '../assets/bell.svg?react'
import { useNavigate } from 'react-router-dom'
import { sendMessage } from '../api/webSocket'
import { useNotifications } from '../hooks/useNotifications'

export function Header() {
  const notifications = useNotifications()
  const navigate = useNavigate()

  const handleProfileButton = () => {
    navigate('/profile')
  }

  const handleNotifications = () => {
    sendMessage("Mensaje de prueba")
  }

  return (
    <div className="header-container">
      <header className="header">
        <div className='buttons-header-container'>
          <button onClick={handleNotifications} className='button-header button-notification'>
            <BellSvg />
          </button>
          <button onClick={handleProfileButton} className='button-header button-profile'>
            <ProfileSvg />
            <span>
              Perfil de usuario
            </span>
          </button>
        </div>
      </header>
    </div>
  )
}