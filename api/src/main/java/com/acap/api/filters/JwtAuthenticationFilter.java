package com.acap.api.filters;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.acap.api.model.User;
import com.acap.api.model.UserToken;
import com.acap.api.repository.UserRepository;
import com.acap.api.repository.UserTokenRepository;
import com.acap.api.utils.JwtUtils;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/*
 * Clase para gestionar la autenticación basada en JWT (Json Web Token)
 */
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

  private final JwtUtils jwtUtils;
  private final UserTokenRepository userTokenRepository;
  private final UserRepository userRepository;

  public JwtAuthenticationFilter(JwtUtils jwtUtils, UserTokenRepository userTokenRepository,
      UserRepository userRepository) {
    this.jwtUtils = jwtUtils;
    this.userTokenRepository = userTokenRepository;
    this.userRepository = userRepository;
  }

  // Método para intentar autenticar al usuario
  @Override
  public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
      throws AuthenticationException {

    User user = null;
    String username = "";
    String password = "";

    try {
      user = new ObjectMapper().readValue(request.getInputStream(), User.class);
      username = user.getUsername();
      password = user.getPassword();
    } catch (Exception e) {
      throw new RuntimeException(e);
    }

    // Crear un token de autenticación con el nombre de usuario y la contraseña
    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,
        password);

    // Devolver el resultado de la autenticación
    return getAuthenticationManager().authenticate(authenticationToken);
  }

  // Método que se ejecuta cuando la autenticación es exitosa
  @Override
  protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
      Authentication authResult) throws IOException, ServletException {

    // Obtener el usuario autenticado
    org.springframework.security.core.userdetails.User user = (org.springframework.security.core.userdetails.User) authResult
        .getPrincipal();

    // Generar un token de acceso
    String token = jwtUtils.generateAcessToken(user.getUsername());

    // Obtener el modelo de usuario desde el repositorio
    User userModel = userRepository.findByEmployeeNumber(user.getUsername());

    // Crear una entidad UserToken para almacenar el token generado
    UserToken userToken = UserToken.builder()
        .revoked(false)
        .token(token)
        .user(userModel)
        .build();

    // Guardar el UserToken en el repositorio
    userTokenRepository.save(userToken);

    // Obtener la fecha de vencimiento del token
    Date expirationDate = jwtUtils.getExpirationDateFromToken(token);

    // Crear una cookie para almacenar el token
    Cookie cookie = new Cookie("token", token);

    // Configurar la duración de la cookie en segundos
    cookie.setMaxAge((int) (expirationDate.getTime() / 1000));

    // Configurar la cookie para ser accesible solo mediante solicitudes HTTP
    cookie.setHttpOnly(false);

    // Configurar la cookie para ser segura (requiere conexión HTTPS)
    cookie.setSecure(false); // cambiar a true en producción

    // Configurar la ruta de la cookie
    cookie.setPath("/");

    // Agregar la cookie a la respuesta HTTP
    response.addCookie(cookie);

    // Agregar el token como encabezado de autorización en la respuesta HTTP
    response.addHeader("Authorization", token);

    // Crear un mapa para almacenar información adicional en la respuesta HTTP
    Map<String, Object> httpResponse = new HashMap<>();
    httpResponse.put("token", token);
    httpResponse.put("Message", "Authentication Successfully");

    // Escribir la respuesta HTTP como JSON
    response.getWriter().write(new ObjectMapper().writeValueAsString(httpResponse));
    response.setStatus(HttpServletResponse.SC_OK);
    response.setContentType("application/json");
    response.getWriter().flush();

    super.successfulAuthentication(request, response, chain, authResult);
  }
}

