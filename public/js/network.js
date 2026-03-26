// ═══════════════════════════════════════════════════════════════════════════
//  network.js — Socket.IO wrapper with event emitter pattern
// ═══════════════════════════════════════════════════════════════════════════

let socket = null;

export function connect() {
  socket = io({ transports: ['websocket', 'polling'] });
  return socket;
}

export function getSocket() {
  return socket;
}

export function emit(event, data) {
  if (socket) socket.emit(event, data);
}

export function on(event, handler) {
  if (socket) socket.on(event, handler);
}

export function off(event, handler) {
  if (socket) socket.off(event, handler);
}
