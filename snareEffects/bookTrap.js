/**
 * Book Trap — Snare
 *
 * Trigger: An opponent's Student casts a Spell (NOT familiar-cast spells
 * like Chilly Wizzy or Skeleton Mage).
 *
 * Effect: The Spell is entirely negated (cost still paid), and the
 * casting Student takes 5 damage. Animation: books flying into the student.
 */
export default {
  checkTrigger(trigger, ownerId) {
    if (trigger.type !== 'spell-cast-by-student') return false;
    // Only trigger for opponents' spells
    return trigger.casterPlayerId !== ownerId;
  },

  effect: {
    type: 'negate-spell-and-damage',
  },
};
