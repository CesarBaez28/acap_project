package com.acap.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.acap.api.filters.JwtAuthenticationFilter;
import com.acap.api.filters.JwtAuthorizationFilter;
import com.acap.api.service.UserDetailsServiceImpl;
import com.acap.api.utils.JwtUtils;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

  private final UserDetailsServiceImpl userDetailsServiceImpl;
  private final JwtUtils jwtUtils;
  private final JwtAuthorizationFilter jwtAuthorizationFilter;

  public SecurityConfig (UserDetailsServiceImpl userDetailsServiceImpl, JwtUtils jwtUtils, JwtAuthorizationFilter jwtAuthorizationFilter) {
    this.jwtAuthorizationFilter = jwtAuthorizationFilter;
    this.userDetailsServiceImpl = userDetailsServiceImpl;
    this.jwtUtils = jwtUtils;
  }

  @Bean
  public SecurityFilterChain filterChain (HttpSecurity httpSecurity, AuthenticationManager authenticationManager) throws Exception {

    JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(jwtUtils);
    jwtAuthenticationFilter.setAuthenticationManager(authenticationManager);
    jwtAuthenticationFilter.setFilterProcessesUrl("/login");

    return httpSecurity
          .csrf(config -> config.disable())
          .authorizeHttpRequests(requests -> requests
            .requestMatchers("/users/login", "/privileges/get",  "/login/**").permitAll()
            .anyRequest().authenticated()
          )
          .sessionManagement(session -> session
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
          )
          .addFilter(jwtAuthenticationFilter)
          .addFilterBefore(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter.class)
          .build();
  } 

  @Bean
  PasswordEncoder passwordEncoder () {
    return new BCryptPasswordEncoder();
  }
  
  @Bean
  AuthenticationManager authenticationManager (HttpSecurity httpSecurity, PasswordEncoder passwordEncoder) throws Exception {
    return httpSecurity.getSharedObject(AuthenticationManagerBuilder.class)
      .userDetailsService(userDetailsServiceImpl)
      .passwordEncoder(passwordEncoder)
      .and().build();
  }

}
