/**
 * Gift of Death — Snare
 *
 * Trigger: An opponent's Student dies (HP <= 0), AFTER all other revival
 * mechanisms (Elixir, Death-Defying Blast, Golden Ankh) have had their
 * chance and the student is still dead.
 *
 * Effect: The dead Student is immediately revived with 20 HP. If the
 * revived player later wins the game, the Gift of Death player also
 * wins alongside them (reincarnation bond).
 *
 * Animation: Complex resurrection magic effect on the revived student.
 */
export default {
  checkTrigger(trigger, ownerId) {
    if (trigger.type !== 'opponent-student-died') return false;
    // Only trigger for opponents' students dying
    return trigger.deadPlayerId !== ownerId;
  },

  effect: {
    type: 'gift-of-death-revive',
  },
};
