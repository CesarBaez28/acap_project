import { WebSocketUrl } from "../constants"

let socket = null
let onMessageCallback = null

export function createSocket(requestParam) {
  const socketUrlWithParam = `${WebSocketUrl}?param=${requestParam}`
  
  socket = new WebSocket(socketUrlWithParam)

  socket.onmessage = (event) => {
    const message = event.data
    if (onMessageCallback) {
      onMessageCallback(message)
    }
  };

  return socket
}

export function onMessage(messageCallback) {
  onMessageCallback = messageCallback;
}

export function sendMessage(messageObject) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    const jsonString = JSON.stringify(messageObject);
    socket.send(jsonString);
  } else {
    console.error("WebSocket is not open.");
  }
}
