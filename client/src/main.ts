import { connect } from "./net.js";

const statusEl = document.getElementById("status")!;

const wsUrl = `${location.protocol === "https:" ? "wss" : "ws"}://${location.hostname}:8080`;

statusEl.textContent = `connecting to ${wsUrl}...`;

connect(wsUrl, {
  onWelcome: (msg, rttMs) => {
    statusEl.textContent =
      `connected\nconnectionId: ${msg.connectionId}\nround-trip: ${rttMs}ms`;
    console.log("welcome", msg, `rtt=${rttMs}ms`);
  },
  onClose: () => {
    statusEl.textContent = "disconnected";
  },
  onError: (err) => {
    console.error("ws error", err);
    statusEl.textContent = "connection error (is the server running?)";
  },
});
