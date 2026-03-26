/**
 * Frost Rune — Snare
 *
 * Trigger: When the snare owner's Student is affected by an opponent's
 * Familiar through any means (damage, healing, energize, kill, etc.).
 * Does NOT trigger from Student attacks, Spells, Snares, Items, or poison.
 *
 * Effect: The source Familiar is encased in ice (animation), then
 * killed after the freeze resolves (~1s delay). On-death effects
 * (Cute Hydra, Ash Worms, etc.) still trigger normally.
 *
 * Animation: Ice crystals encase the familiar, freeze solid, then shatter.
 */
export default {
  checkTrigger(trigger, ownerId) {
    if (trigger.type !== 'familiar-effect-on-own-student') return false;
    // Only trigger when the snare owner's student was targeted
    if (!trigger.studentOwnerIds || !trigger.studentOwnerIds.includes(ownerId)) return false;
    // Source must be an opponent's familiar
    return trigger.sourcePlayerId !== ownerId;
  },

  effect: {
    type: 'frost-rune-kill',
  },
};
