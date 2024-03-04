import { jwtDecode } from "jwt-decode";
import { getCookieValue } from '../utils/getCookieValue'
import { TOKEN_NAME } from '../constants'
import { useContext, useEffect } from 'react'
import { deleteCookie } from '../utils/deleteCookie'
import { logout } from '../api/logout'
import { UserContext } from "../contexts/userContext";

export function TokenExpirationNotifier() {
  const { clearUser } = useContext(UserContext)

  useEffect(() => {
    const checkTokenExpiration = async () => {
      const token = getCookieValue(TOKEN_NAME)

      if (token) {
        const decodedToken = jwtDecode(token)
        const currentTime = Date.now() / 1000

        if (decodedToken.exp < currentTime) {
          clearUser()
          await logout()
          deleteCookie(TOKEN_NAME)
          window.location.href = '/session/expired';
          console.log('Token expirado')
        }
      }
    }

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // La pestaña está visible, verifica la expiración del token
        checkTokenExpiration();
      }
    };

    // Agregar un listener para el evento de cambio de visibilidad
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Verificar la expiración del token al cargar el componente
    checkTokenExpiration();

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [])
}