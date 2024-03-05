package com.acap.api.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

import com.acap.api.repository.UserTokenRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

/**
 * Servicio que implementa la interfaz LogoutHandler para manejar la lógica de cierre de sesión.
 * Se encarga de invalidar y revocar el token de usuario al realizar la acción de cierre de sesión.
 */
@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {

  private final UserTokenRepository userTokenRepository;

  /**
   * Método que se ejecuta al realizar una acción de cierre de sesión.
   * Invalida y revoca el token de usuario asociado a la sesión.
   *
   * @param request        HttpServletRequest que representa la solicitud HTTP.
   * @param response       HttpServletResponse que representa la respuesta HTTP.
   * @param authentication Objeto Authentication que contiene información de autenticación del usuario.
   */
  @Override
  public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
    // Obtiene el token de autorización del encabezado de la solicitud.
    final String tokenHeader = request.getHeader("Authorization");
    final String jwt;

    // Verifica si el token es nulo o no comienza con "Bearer ".
    if (tokenHeader == null || !tokenHeader.startsWith("Bearer ")) {
      return;
    }

    // Extrae el token JWT de la cadena de encabezado.
    jwt = tokenHeader.substring(7);

    // Busca el token almacenado en la base de datos.
    var storedToken = userTokenRepository.findByToken(jwt).orElse(null);

    // Revoca el token si se encuentra almacenado en la base de datos.
    if (storedToken != null) {
      storedToken.setRevoked(true);
      userTokenRepository.save(storedToken);
    }
  }
}

