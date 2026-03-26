/**
 * Barrel Home — Passive equip effect.
 *
 * While equipped (by any player): NO player may summon a Familiar through
 * any means (from hand, discard, or triggered effects) if they already
 * control 3 or more living Familiars.
 *
 * Logic handled in server.js via hasBarrelHome() + isBarrelHomeBlocked()
 * checks at every familiar summon site.
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
