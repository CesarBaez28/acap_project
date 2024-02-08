import '../styles/components/header.css'
import ProfileSvg from '../assets/profile.svg?react'
import BellSvg from '../assets/bell.svg?react'
import { useNavigate } from 'react-router-dom'

export function Header() {
  const navigate = useNavigate()

  const handleProfileButton = () => {
    navigate('/profile')
  }

  return (
    <div className="header-container">
      <header className="header">
        <div className='buttons-header-container'>
          <button className='button-header button-notification'>
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