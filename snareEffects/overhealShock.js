/**
 * Overheal Shock — Snare
 *
 * Trigger: When any target's HP are healed in any way (via resolveTargetHeal).
 * Does NOT trigger from raw HP increases like Orc Skull (those bypass resolveTargetHeal).
 *
 * Effect: ALL healed targets are tapped (if not already) and receive 1 stack
 * of the "Shocked" debuff. Shocked targets do NOT untap during the normal
 * start-of-round untap — instead, all Shocked stacks are removed.
 * Shocked does NOT prevent or interact with mid-round Energize effects.
 *
 * Animation: Each healed target erratically jitters in random directions
 * before snapping back to its original position.
 */
export default {
  checkTrigger(trigger, ownerId) {
    return trigger.type === 'target-healed';
  },

  effect: {
    type: 'overheal-shock',
  },
};
