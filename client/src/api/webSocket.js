import { WebSocketUrl } from "../constants"

export const socket = new WebSocket(WebSocketUrl)

export function onMessage(messageCallback) {
  socket.onmessage = (event) => {
    const message = event.data
    messageCallback(message)
  }

  socket.onerror = (error) => {
    console.error("WebSocket error:", error)
  }
}

export function sendMessage(message) {
  socket.send(message)
}
