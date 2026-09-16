# Husk

Browser-based multiplayer survival game (surviv.io-style battle royale flow,
Rust/DayZ-flavored tiered crafting, base decay, and full loot-drop-on-death).

## Stack

- **Client**: TypeScript + PixiJS, bundled with Vite.
- **Server**: Node.js + TypeScript, authoritative game loop, `ws` for transport.
- **Shared**: protocol/message types and constants used by both, so client
  and server can never drift out of sync.
- npm workspaces monorepo: `shared/`, `server/`, `client/`.

## Development

Install once from the repo root:

```sh
npm install
```

Build the shared package (required before running server or client, since
both import its compiled output):

```sh
npm run build:shared
```

Run the server (listens on `:8080` by default, override with `PORT`):

```sh
npm run dev:server
```

Run the client dev server (Vite, `:5173`, connects to `ws://<host>:8080`):

```sh
npm run dev:client
```

Then open http://localhost:5173 — the status line in the top-left will show
the WebSocket handshake result once connected.

## Status

- [x] Monorepo + hello-world WebSocket connection
- [ ] Milestone 1: world, movement, networking foundation
- [ ] Milestone 2: resources, inventory, crafting
- [ ] Milestone 3: combat
- [ ] Milestone 4: base building & decay
- [ ] Milestone 5: day/night cycle, mutants, shrinking zone
- [ ] Milestone 6: matchmaking, squads, polish
