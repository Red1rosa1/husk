import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { WebSocketServer, type WebSocket } from "ws";
import { NETWORK, type ClientMessage, type ServerWelcomeMessage } from "@husk/shared";

const PORT = Number(process.env.PORT) || NETWORK.DEFAULT_PORT;

const httpServer = createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/plain" });
  res.end("husk game server\n");
});

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", (socket: WebSocket) => {
  const connectionId = randomUUID();
  console.log(`[connect] ${connectionId}`);

  socket.on("message", (raw) => {
    let message: ClientMessage;
    try {
      message = JSON.parse(raw.toString());
    } catch {
      console.warn(`[${connectionId}] received non-JSON message, ignoring`);
      return;
    }

    if (message.type === "hello") {
      console.log(`[${connectionId}] hello (clientTime=${message.clientTime})`);
      const welcome: ServerWelcomeMessage = {
        type: "welcome",
        connectionId,
        clientTime: message.clientTime,
        serverTime: Date.now(),
      };
      socket.send(JSON.stringify(welcome));
    }
  });

  socket.on("close", () => {
    console.log(`[disconnect] ${connectionId}`);
  });

  socket.on("error", (err) => {
    console.error(`[${connectionId}] socket error:`, err);
  });
});

httpServer.listen(PORT, () => {
  console.log(`husk server listening on :${PORT}`);
});
