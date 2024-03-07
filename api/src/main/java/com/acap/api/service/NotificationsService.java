package com.acap.api.service;

import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.lang.NonNull;
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

/**
 * Servicio que implementa la clase TextWebSocketHandler para manejar las conexiones WebSocket y enviar notificaciones.
 * Gestiona la conexión, desconexión y el manejo de mensajes de texto para enviar notificaciones a usuarios específicos.
 */
@Service
public class NotificationsService extends TextWebSocketHandler {

  // Almacena las sesiones WebSocket activas.
  private final CopyOnWriteArrayList<WebSocketSession> sessions = new CopyOnWriteArrayList<>();

  // Repositorio para acceder a datos de usuario.
  private final UserRepository userRepository;

  /**
   * Constructor del servicio de notificaciones WebSocket.
   *
   * @param userRepository Repositorio para acceder a datos de usuario.
   */
  public NotificationsService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Método que se ejecuta después de establecer una conexión WebSocket.
   * Obtiene el identificador del usuario a partir de la URL y agrega la sesión WebSocket correspondiente.
   *
   * @param session WebSocketSession que representa la sesión WebSocket establecida.
   * @throws Exception Excepción en caso de errores durante la conexión.
   */
  @SuppressWarnings("null")
  @Override
  public void afterConnectionEstablished(@NonNull WebSocketSession session) throws Exception {
    // Obtiene el parámetro 'userId' de la URL de la conexión.
    String parametro = Objects.requireNonNull(session.getUri().getQuery());

    // Divide los parámetros y obtiene el identificador del usuario.
    String[] parametros = parametro.split("=");
    UUID userId = UUID.fromString(Objects.requireNonNull(parametros[1]));

    // Busca el usuario en la base de datos.
    Optional<User> userData = userRepository.findById(userId);

    // Agrega la sesión WebSocket si el usuario está presente.
    userData.ifPresent(user -> {
      session.getAttributes().put("user", user);
      sessions.add(session);
    });
  }

  /**
   * Método que se ejecuta después de cerrar una conexión WebSocket.
   * Elimina la sesión WebSocket cerrada de la lista de sesiones activas.
   *
   * @param session WebSocketSession que representa la sesión WebSocket cerrada.
   * @param status  CloseStatus que indica el estado de cierre de la sesión.
   * @throws Exception Excepción en caso de errores durante la desconexión.
   */
  @Override
  public void afterConnectionClosed(@NonNull WebSocketSession session, @NonNull CloseStatus status) throws Exception {
    // Elimina la sesión WebSocket cerrada de la lista de sesiones activas.
    sessions.remove(session);
  }

  /**
   * Método que maneja los mensajes de texto recibidos a través de la conexión WebSocket.
   * Analiza el mensaje para obtener la ubicación y envía el mensaje a las sesiones de usuarios en la misma ubicación.
   *
   * @param session WebSocketSession que representa la sesión WebSocket actual.
   * @param message TextMessage que contiene el mensaje de texto recibido.
   * @throws Exception Excepción en caso de errores durante el manejo del mensaje.
   */
  @Override
  protected void handleTextMessage(@NonNull WebSocketSession session, @NonNull TextMessage message) throws Exception {
    // Convierte el mensaje JSON a un objeto JsonObject.
    JsonObject convertedObject = new Gson().fromJson(message.getPayload(), JsonObject.class);
    
    // Obtiene la ubicación del mensaje.
    String location = convertedObject.get("location").getAsString();

    // Envía el mensaje a las sesiones WebSocket de usuarios en la misma ubicación.
    for (WebSocketSession webSocketSession : sessions) {
      User targetUser = (User) webSocketSession.getAttributes().get("user");

      // Verifica si el usuario está en la misma ubicación.
      if (Objects.equals(targetUser.getLocation().getLocation(), location)) {
        webSocketSession.sendMessage(message);
      }
    }
  }
}

