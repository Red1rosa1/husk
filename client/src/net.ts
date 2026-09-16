import type { ClientHelloMessage, ServerMessage } from "@husk/shared";

export interface ConnectionHandlers {
  onWelcome?: (msg: Extract<ServerMessage, { type: "welcome" }>, rttMs: number) => void;
  onClose?: () => void;
  onError?: (err: Event) => void;
}

export function connect(url: string, handlers: ConnectionHandlers): WebSocket {
  const socket = new WebSocket(url);

  socket.addEventListener("open", () => {
    const hello: ClientHelloMessage = { type: "hello", clientTime: Date.now() };
    socket.send(JSON.stringify(hello));
  });

  socket.addEventListener("message", (event) => {
    const message: ServerMessage = JSON.parse(event.data);
    if (message.type === "welcome") {
      const rttMs = Date.now() - message.clientTime;
      handlers.onWelcome?.(message, rttMs);
    }
  });

  socket.addEventListener("close", () => handlers.onClose?.());
  socket.addEventListener("error", (err) => handlers.onError?.(err));

  return socket;
}
