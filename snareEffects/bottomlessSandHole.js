/**
 * Bottomless Sand Hole — Snare
 *
 * Trigger: When the player's own target (Student or Familiar) gets targeted
 * by an opponent's Familiar's effect (damage, energize, heal, kill, etc.).
 *
 * Effect: The familiar effect resolves normally first. Then the attacking
 * familiar is killed (same logic as Burned Contract). Animation: a hole
 * opens under the opponent's familiar and it falls in.
 */
export default {
  checkTrigger(trigger, ownerId) {
    if (trigger.type !== 'familiar-effect-on-own-target') return false;
    // Only trigger for snare owner's targets being affected
    if (!trigger.targetOwnerIds || !trigger.targetOwnerIds.includes(ownerId)) return false;
    // Source must be an opponent's familiar
    return trigger.sourcePlayerId !== ownerId;
  },

  effect: {
    type: 'bottomless-sand-hole-kill',
  },
};
