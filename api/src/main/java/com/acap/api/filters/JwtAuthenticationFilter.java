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

    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,
        password);

    return getAuthenticationManager().authenticate(authenticationToken);
  }

  @SuppressWarnings("null")
  @Override
  protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
      Authentication authResult) throws IOException, ServletException {

    org.springframework.security.core.userdetails.User user = (org.springframework.security.core.userdetails.User) authResult
        .getPrincipal();

    String token = jwtUtils.generateAcessToken(user.getUsername());

    User userModel = userRepository.findByEmployeeNumber(user.getUsername());

    var userToken = UserToken.builder()
        .revoked(false)
        .token(token)
        .user(userModel)
        .build();

    userTokenRepository.save(userToken);

    Date expirationDate = jwtUtils.getExpirationDateFromToken(token);

    Cookie cookie = new Cookie("token", token);

    cookie.setMaxAge((int) (expirationDate.getTime() / 1000));
    cookie.setHttpOnly(false);
    cookie.setSecure(false); // cambiar a true en producción
    cookie.setPath("/");

    response.addCookie(cookie);

    response.addHeader("Authorization", token);

    Map<String, Object> httpResponse = new HashMap<>();
    httpResponse.put("token", token);
    httpResponse.put("Message", "Authentication Succesfully");

    response.getWriter().write(new ObjectMapper().writeValueAsString(httpResponse));
    response.setStatus(HttpStatus.OK.value());
    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
    response.getWriter().flush();

    super.successfulAuthentication(request, response, chain, authResult);
  }
}
