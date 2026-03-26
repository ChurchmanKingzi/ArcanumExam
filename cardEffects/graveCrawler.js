/**
 * Grave Crawler — Active: Instantly kill any Familiar on the board (can target self or allies).
 * Blocked by Golden Hind, Mech, and Class Pet (non-damage effect).
 * Passive: While in the discard pile, may be summoned as if it were part of your hand.
 */
export default function graveCrawler(familiar, context) {
  return {
    effectType: 'kill-familiar',
  };
}
