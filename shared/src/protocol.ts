/**
 * Wire protocol shared between client and server. Keeping this in one
 * place (rather than duplicated in both packages) is what guarantees
 * client/server never drift out of sync on message shapes.
 *
 * Messages are plain JSON for now (readability during early development).
 * We can move to a compact binary encoding later without changing call
 * sites, since everything funnels through these types.
 */

// ---- Client -> Server ----

export interface ClientHelloMessage {
  type: "hello";
  /** Client-reported timestamp (ms since epoch), for round-trip diagnostics. */
  clientTime: number;
}

export type ClientMessage = ClientHelloMessage;

// ---- Server -> Client ----

export interface ServerWelcomeMessage {
  type: "welcome";
  /** Server-assigned id for this connection. */
  connectionId: string;
  /** Echoed back so the client can compute round-trip time. */
  clientTime: number;
  /** Server timestamp at send time. */
  serverTime: number;
}

export type ServerMessage = ServerWelcomeMessage;
