/**
 * Point-Blank Annihilation — Snare
 *
 * Trigger: A Familiar activates its active effect and that effect deals
 * direct damage (uses DIRECT_DAMAGE_EFFECTS / FAMILIAR_LEADS_TO_DAMAGE).
 *
 * Effect: After the effect resolves, twice the total effective damage
 * dealt is applied back to the Familiar itself as source-type recoil.
 *
 * Animation: An explosion engulfing the Familiar.
 */
export default {
  checkTrigger(trigger, ownerId) {
    if (trigger.type !== 'familiar-dealt-direct-damage') return false;
    // Can be activated by anyone (own familiars or opponents')
    return true;
  },

  effect: {
    type: 'point-blank-recoil',
  },
};
