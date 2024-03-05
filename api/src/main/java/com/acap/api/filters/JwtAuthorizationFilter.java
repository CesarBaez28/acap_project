package com.acap.api.filters;

import java.io.IOException;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.acap.api.repository.UserTokenRepository;
import com.acap.api.service.UserDetailsServiceImpl;
import com.acap.api.utils.JwtUtils;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/*
 * Clase para filtrar las solicitudes y verificar la validez del token JWT en el encabezado de autorización
 */
@Component
public class JwtAuthorizationFilter extends OncePerRequestFilter {

  private final JwtUtils jwtUtils;
  private final UserDetailsServiceImpl userDetailsServiceImpl;
  private final UserTokenRepository userTokenRepository;

  public JwtAuthorizationFilter(JwtUtils jwtUtils, UserDetailsServiceImpl userDetailsServiceImpl,
      UserTokenRepository userTokenRepository) {
    this.jwtUtils = jwtUtils;
    this.userDetailsServiceImpl = userDetailsServiceImpl;
    this.userTokenRepository = userTokenRepository;
  }

  // Método para filtrar las solicitudes y realizar la autorización basada en el
  // token JWT
  @Override
  protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
      @NonNull FilterChain filterChain) throws ServletException, IOException {

    // Obtener el token del encabezado de autorización
    String tokenHeader = request.getHeader("Authorization");

    // Verificar si el token está presente y tiene el formato correcto
    if (tokenHeader != null && tokenHeader.startsWith("Bearer ")) {
      String token = tokenHeader.substring(7);

      // Verificar la validez del token en el repositorio y que no esté revocado
      var isTokenValid = userTokenRepository.findByToken(token)
          .map(t -> !t.getRevoked())
          .orElse(false);

      // Verificar la validez del token JWT y que no esté revocado
      if (jwtUtils.isTokenValid(token) && Boolean.TRUE.equals(isTokenValid)) {
        // Obtener el nombre de usuario del token
        String username = jwtUtils.getUsernameFromToken(token);

        // Cargar los detalles del usuario desde el servicio
        UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(username);

        // Crear un objeto de autenticación basado en el usuario y sus roles
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,
            null, userDetails.getAuthorities());

        // Establecer la autenticación en el contexto de seguridad de Spring
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
      }
    }

    // Continuar con la cadena de filtros
    filterChain.doFilter(request, response);
  }
}