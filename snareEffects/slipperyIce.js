/**
 * Slippery Ice — Snare
 *
 * Trigger: A Familiar (controlled by an opponent of the snare owner)
 * selects exactly 1 target with its effect, AND the familiar's owner
 * controls at least 1 other legal target to redirect to.
 *
 * Uses trigger type 'effect-targeting' (same window as Letter of Lies),
 * but restricted to familiar sources and opponent-only.
 *
 * Effect: The snare owner picks 1 alternative target the familiar's
 * owner controls. That target becomes the effect's new target.
 *
 * Animation: Potion of Greed splash (card image appears, grows, fades).
 */
export default {
  checkTrigger(trigger, ownerId) {
    if (trigger.type !== 'effect-targeting') return false;
    // Only trigger for opponents' familiar effects
    if (trigger.sourcePlayerId === ownerId) return false;
    // Must have Slippery Ice alternatives (source player's own targets)
    if (!trigger._slipperyIceAlternatives || trigger._slipperyIceAlternatives.length === 0) return false;
    return true;
  },

  effect: {
    type: 'slippery-ice-redirect',
  },
};
