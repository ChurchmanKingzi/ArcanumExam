/**
 * Booby Trap — When your student takes direct damage from a student attack
 * (tap to deal damage) or a Familiar effect, deal 15 damage to the source.
 * Does NOT trigger from Spell effects, Snares, poison, etc.
 */
export default {
  /**
   * Check if this snare should be eligible to activate for a given trigger.
   * @param {object} trigger - { type, sourcePlayerId, sourceType, sourceFamiliarIndex, targetPlayerId, ... }
   * @param {string} ownerId - the snare owner's player ID
   */
  checkTrigger(trigger, ownerId) {
    if (trigger.type !== 'student-damaged') return false;
    if (trigger.targetPlayerId !== ownerId) return false;
    // Only trigger from student attacks or familiar effects
    const src = trigger.sourceType;
    return src === 'student' || src === 'summoned-student' || src === 'familiar';
  },

  /**
   * Effect config resolved by the server.
   * type: 'damage-source' means deal damage back to the trigger's source.
   */
  effect: {
    type: 'damage-source',
    damage: 15,
  },
};
