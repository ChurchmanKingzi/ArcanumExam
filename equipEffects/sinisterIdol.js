/**
 * Sinister Idol — Passive equip effect (global item cost increase).
 *
 * While equipped: all Item cards in the hands of all OTHER players have
 * their cost increased by 1 per Sinister Idol that is NOT owned by that player.
 * Multiple Idols stack (including Idols from different opponents).
 *
 * Example (3 players, A and B each have 1 Idol):
 *   - A's items: +1 (B's Idol)
 *   - B's items: +1 (A's Idol)
 *   - C's items: +2 (A's Idol + B's Idol)
 *
 * Logic in server.js:
 *   - getSinisterIdolPenalty(room, playerId) — count opponent Idols
 *   - broadcastRoomState: sinisterIdolPenalty per player in you.data
 *   - game:playCard Item cost validation: + getSinisterIdolPenalty
 * Logic in game.js:
 *   - getEffectiveCost / canAfford: + sinisterIdolPenalty for Item type
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
