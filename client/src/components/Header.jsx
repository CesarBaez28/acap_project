import '../styles/components/header.css';
import ProfileSvg from '../assets/profile.svg?react';
import BellSvg from '../assets/bell.svg?react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../hooks/useNotifications';
import { useGetShipmentsNotifications } from '../hooks/useGetShipmentsNotifications';
import { useState } from 'react';
import { useGetCintasNotifications } from '../hooks/useGetCintasNotifications';

/**
 * Componente `Header` que representa la barra de encabezado de la aplicación.
 *
 * @component
 * @returns {JSX.Element} - Elemento JSX que representa el componente `Header`.
 */
export function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useNotifications();
  useGetShipmentsNotifications(notifications, setNotifications);
  useGetCintasNotifications(notifications, setNotifications);

  const navigate = useNavigate();

  /**
   * Manejador del botón de perfil que redirige al usuario a la página de perfil.
   */
  const handleProfileButton = () => {
    navigate('/profile');
  };

  /**
   * Manejador del botón de notificaciones que muestra u oculta el panel de notificaciones.
   */
  const handleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="header-container">
      <header className="header">
        <div className='header-title-container'>
          <h1 className='header-title'>ABCS Application</h1>
        </div>
        <div className='buttons-header-container'>
          <button onClick={handleNotifications} className='button-header button-notification'>
            {notifications.length !== 0
              ? (
                <div className='notifications-count-container'>
                  <BellSvg />
                  <div className='notification-count' >{notifications.length}</div>
                </div>
              )
              : <BellSvg />
            }
          </button>

          {showNotifications === true
            ? (
              <div className='notifications-pop-up-container'>
                <div className='notifications-pop-up'>
                  {notifications.length !== 0
                    ? notifications.map((item) => (
                      <div className='notification-text' key={item.message}>
                        <div>{item.message}</div>
                        <div>Fecha: {item.date}</div>
                      </div>
                    ))
                    : <div className='notification-not-found'> No hay notificaciones </div>
                  }
                </div>
              </div>
            )
            : null
          }

          <button onClick={handleProfileButton} className='button-header button-profile'>
            <ProfileSvg />
          </button>
        </div>
      </header>
    </div>
  );
}
