import { WebSocketUrl } from '../constants';

// Declaración de variables globales
let socket = null; // Almacena la instancia del objeto WebSocket
let onMessageCallback = null; // Almacena la función de devolución de llamada para mensajes entrantes

/**
 * Crea una instancia de WebSocket con la URL proporcionada y establece un manejador de eventos para mensajes entrantes.
 *
 * @param {string} requestParam - Parámetro adicional para incluir en la URL de WebSocket.
 * @returns {WebSocket} - Instancia de WebSocket creada.
 */
export function createSocket(requestParam) {
  // Construye la URL de WebSocket con el parámetro proporcionado
  const socketUrlWithParam = `${WebSocketUrl}?param=${requestParam}`;

  // Crea una nueva instancia de WebSocket con la URL construida
  socket = new WebSocket(socketUrlWithParam);

  // Establece un manejador de eventos para mensajes entrantes
  socket.onmessage = (event) => {
    const message = event.data;
    // Si hay una función de devolución de llamada registrada, llama a la función con el mensaje entrante
    if (onMessageCallback) {
      onMessageCallback(message);
    }
  };

  // Devuelve la instancia de WebSocket creada
  return socket;
}

/**
 * Registra una función de devolución de llamada para mensajes entrantes.
 *
 * @param {function} messageCallback - Función que se llamará con cada mensaje entrante.
 */
export function onMessage(messageCallback) {
  // Almacena la función de devolución de llamada proporcionada
  onMessageCallback = messageCallback;
}

/**
 * Envía un objeto de mensaje a través del WebSocket si está abierto.
 *
 * @param {object} messageObject - Objeto que se enviará como mensaje.
 */
export function sendMessage(messageObject) {
  // Verifica si la instancia de WebSocket está abierta
  if (socket && socket.readyState === WebSocket.OPEN) {
    // Convierte el objeto de mensaje a una cadena JSON y envía el mensaje a través del WebSocket
    const jsonString = JSON.stringify(messageObject);
    socket.send(jsonString);
  } else {
    // Imprime un mensaje de error si el WebSocket no está abierto
    console.error("WebSocket is not open.");
  }
}
