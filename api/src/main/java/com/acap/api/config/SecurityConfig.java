package com.acap.api.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.acap.api.filters.JwtAuthenticationFilter;
import com.acap.api.filters.JwtAuthorizationFilter;
import com.acap.api.repository.UserRepository;
import com.acap.api.repository.UserTokenRepository;
import com.acap.api.service.UserDetailsServiceImpl;
import com.acap.api.utils.JwtUtils;

import jakarta.servlet.http.HttpServletResponse;

/*
 * Clase para la configuración 
 * de la seguridad de la aplicación 
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

  private final UserDetailsServiceImpl userDetailsServiceImpl;
  private final JwtUtils jwtUtils;
  private final JwtAuthorizationFilter jwtAuthorizationFilter;
  private final UserRepository userRepository;
  private final UserTokenRepository userTokenRepository;
  private final LogoutHandler logoutHandler;

  public SecurityConfig(UserDetailsServiceImpl userDetailsServiceImpl,
      JwtUtils jwtUtils,
      JwtAuthorizationFilter jwtAuthorizationFilter,
      UserRepository userRepository,
      UserTokenRepository userTokenRepository,
      LogoutHandler logoutHandler) {
    this.userRepository = userRepository;
    this.userTokenRepository = userTokenRepository;
    this.logoutHandler = logoutHandler;
    this.jwtAuthorizationFilter = jwtAuthorizationFilter;
    this.userDetailsServiceImpl = userDetailsServiceImpl;
    this.jwtUtils = jwtUtils;
  }

  // Configuración principal de seguridad
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity httpSecurity, AuthenticationManager authenticationManager)
      throws Exception {

    // Creación y configuración del filtro de autenticación JWT
    JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(jwtUtils, userTokenRepository,
        userRepository);
    jwtAuthenticationFilter.setAuthenticationManager(authenticationManager);
    jwtAuthenticationFilter.setFilterProcessesUrl("/authenticate");

    return httpSecurity
        // Configuración de CORS
        .cors(Customizer.withDefaults())
        // Desactivar CSRF
        .csrf(config -> config.disable())
        // Configuración de autorización de solicitudes HTTP
        .authorizeHttpRequests(requests -> requests
            .requestMatchers("/users/login", "/privileges/get", "/authenticate/**", "/notifications").permitAll()
            .anyRequest().authenticated())
        // Configuración de la gestión de sesiones (en este caso, sin sesiones)
        .sessionManagement(session -> session
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        // Agregar el filtro de autenticación JWT al filtro de seguridad
        .addFilter(jwtAuthenticationFilter)
        // Agregar el filtro de autorización JWT antes del filtro de autenticación por
        // nombre de usuario y contraseña
        .addFilterBefore(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter.class)
        // Configuración de la funcionalidad de cierre de sesión
        .logout(logout -> logout
            .logoutUrl("/logout")
            .addLogoutHandler(logoutHandler)
            .logoutSuccessHandler((request, response, authentication) -> {
              SecurityContextHolder.clearContext();
              response.setStatus(HttpServletResponse.SC_OK);
            }))
        // Construir la configuración de seguridad
        .build();
  }

  // Configuración del codificador de contraseñas BCrypt
  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  // Configuración de CORS
  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
    configuration.setAllowedMethods(Arrays.asList("POST", "PUT", "GET", "OPTIONS", "DELETE", "PATCH", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true);
    configuration.addExposedHeader("Message");
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }

  // Configuración del administrador de autenticación
  @Bean
  AuthenticationManager authenticationManager(HttpSecurity httpSecurity, PasswordEncoder passwordEncoder)
      throws Exception {
    return httpSecurity.getSharedObject(AuthenticationManagerBuilder.class)
        .userDetailsService(userDetailsServiceImpl)
        .passwordEncoder(passwordEncoder)
        .and().build();
  }

}
