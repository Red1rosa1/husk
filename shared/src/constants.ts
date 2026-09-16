/**
 * All tunable balance/config numbers live here so they're never scattered
 * as magic numbers across client/server code.
 */

export const NETWORK = {
  /** Server simulation tick rate, in Hz. */
  TICK_RATE: 20,
  /** Derived tick duration in milliseconds. */
  get TICK_MS() {
    return 1000 / this.TICK_RATE;
  },
  /** Default WebSocket port for the game server. */
  DEFAULT_PORT: 8080,
} as const;
