package com.acap.api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.acap.api.service.NotificationsService;

/*
 * Clase para configurar WebSocket 
 * en la aplicación
 */
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

  private final NotificationsService notificationsService;

  public WebSocketConfig(NotificationsService notificationsService) {
    this.notificationsService = notificationsService;
  }

  // Método para registrar manejadores de WebSocket
  @Override
  public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {

    // Registrar el servicio de notificaciones como manejador de WebSocket en la
    // ruta "/notifications"
    registry.addHandler(notificationsService, "/notifications")
    
        // Permitir solicitudes desde cualquier origen (CORS)
        .setAllowedOrigins("*");
  }
}
