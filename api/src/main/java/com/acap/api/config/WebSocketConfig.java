package com.acap.api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.acap.api.service.NotificationsService;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {


  private final NotificationsService notificationsService;

  public WebSocketConfig(NotificationsService notificationsService) {
    this.notificationsService = notificationsService;
  }

  @Override
  public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
    registry.addHandler(notificationsService, "/notifications")
        .setAllowedOrigins("*");
  }
}
