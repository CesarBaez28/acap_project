import { jwtDecode } from "jwt-decode";
import { getCookieValue } from '../utils/getCookieValue'
import { TOKEN_NAME } from '../constants'
import { useContext, useEffect } from 'react'
import { deleteCookie } from '../utils/deleteCookie'
import { logout } from '../api/logout'
import { UserContext } from "../contexts/userContext";

/**
 * Componente React para notificar sobre la expiración del token JWT.
 */
export function TokenExpirationNotifier() {
  const { clearUser } = useContext(UserContext);

  useEffect(() => {
    /**
     * Verifica la expiración del token y realiza acciones correspondientes.
     */
    const checkTokenExpiration = async () => {
      const token = getCookieValue(TOKEN_NAME);

      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          // Borra la información del usuario y cierra sesión
          clearUser();
          await logout();
          deleteCookie(TOKEN_NAME);

          // Redirige a la página de sesión expirada
          window.location.href = '/session/expired';
          console.log('Token expirado');
        }
      }
    };

    /**
     * Maneja el cambio de visibilidad de la pestaña del navegador.
     * Verifica la expiración del token cuando la pestaña se vuelve visible.
     */
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

    // Limpiar el listener al desmontar el componente
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []); 
}