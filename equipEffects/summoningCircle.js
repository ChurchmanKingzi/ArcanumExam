/**
 * Summoning Circle — Passive equip effect.
 *
 * While equipped: ALL Familiars in the equipped student's controller's own
 * discard pile are shown as phantom "pseudo-cards" in their hand, identically
 * to how Grave Crawler natively displays itself.
 *
 * Rules:
 *   - Works in both Preparation and Exam phases (same as Grave Crawler).
 *   - Mummy Guards lock blocks the effect entirely (no phantom cards shown).
 *   - Multiple Summoning Circles = same effect (boolean, doesn't stack).
 *   - The Familiars can be played from the phantom display using the same
 *     game:playGraveCrawler socket event with a `summoningCircle: true` flag.
 *   - Phantom cards cannot be discarded for cost or effect (same as Grave Crawler).
 *
 * Logic in server.js:
 *   - hasSummoningCircle(player) — presence check
 *   - broadcastRoomState: when hasSummoningCircle, graveCrawlersInDiscard is
 *     populated with ALL Familiars in discard (not just Grave Crawlers)
 *   - game:playGraveCrawler: when summoningCircle flag is set and player
 *     hasSummoningCircle, skips the Grave-Crawler-name check
 * Logic in game.js:
 *   - no additional changes needed; existing phantom-card rendering already
 *     handles variable familiar types via graveCrawlersInDiscard
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
