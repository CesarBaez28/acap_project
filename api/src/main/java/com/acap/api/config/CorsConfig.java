package com.acap.api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/* 
 * Clase encargada de la configuración
 * del cors de la aplicación
*/
@Configuration
@EnableWebMvc
public class CorsConfig implements WebMvcConfigurer {

  // Método de configuración para permitir el CORS
  @Override
  public void addCorsMappings(CorsRegistry registry) {
    
    // Configuración para permitir solicitudes CORS desde cualquier origen ("**")
    registry.addMapping("/**")

        // Métodos HTTP permitidos en solicitudes CORS
        .allowedMethods("GET", "POST", "PUT", "DELETE")

        // Permitir el envío de credenciales (como cookies) en solicitudes CORS
        .allowCredentials(true)

        // Orígenes permitidos para solicitudes CORS
        .allowedOrigins("http://localhost:8080", "http://localhost:5173");
  }
}
