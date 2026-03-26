/**
 * Friendly Fireball — Snare
 *
 * Trigger: An opponent selects exactly 1 Student or Familiar as a
 * target for an eligible Spell's effect, AND that opponent controls
 * at least 1 other legal target for that Spell (the snare owner gets
 * to redirect the Spell to one of the caster's own targets).
 *
 * Phase: spell-targeting (Phase 1) — fires BEFORE the spell animation
 * plays, so the redirect can reroute the projectile mid-flight.
 *
 * Effect: The snare owner picks 1 alternative target the spell-selector
 * controls. That target becomes the Spell's new target.
 *
 * Animation: The Spell's own animation plays on the redirected target.
 * Projectile spells curve mid-flight toward the new target.
 */
export default {
  checkTrigger(trigger, ownerId) {
    if (trigger.type !== 'spell-targeting') return false;
    // Only trigger for opponents' spells (sourcePlayerId is the selector)
    const selectorId = trigger._selectorPlayerId || trigger.sourcePlayerId;
    if (selectorId === ownerId) return false;
    // Must have alternative targets
    if (!trigger._friendlyFireballAlternatives || trigger._friendlyFireballAlternatives.length === 0) return false;
    return true;
  },

  effect: {
    type: 'friendly-fireball-redirect',
    requiresTargeting: false, // custom targeting handled in _continueSnareEffect
  },
};
