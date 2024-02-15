package com.acap.api.service;

import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.stereotype.Service;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.acap.api.model.User;
import com.acap.api.repository.UserRepository;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.util.Objects;

@Service
public class NotificationsService extends TextWebSocketHandler {
  private final CopyOnWriteArrayList<WebSocketSession> sessions = new CopyOnWriteArrayList<WebSocketSession>();
  private final UserRepository userRepository;

  public NotificationsService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public void afterConnectionEstablished(WebSocketSession session) throws Exception {
    String parametro = session.getUri().getQuery();

    String[] parametros = parametro.split("=");
    UUID userId = UUID.fromString(parametros[1]);
    Optional<User> userData = userRepository.findById(userId);

    if (userData.isPresent()) {
      User user = userData.get();
      session.getAttributes().put("user", user);
      sessions.add(session);
    }
  }

  @Override
  public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
    sessions.remove(session);
  }

  @Override
  protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
    
    JsonObject convertedObject = new Gson().fromJson(message.getPayload(), JsonObject.class);
    String locationTo = convertedObject.get("location").getAsString();

    for (WebSocketSession webSocketSession : sessions) {

      User targetUser = (User) webSocketSession.getAttributes().get("user");

      if (Objects.equals(targetUser.getLocation().getLocation(), locationTo)) {
        webSocketSession.sendMessage(message);
      } 
    }
  }
}
