/**
 * Explosive Drone — Snare
 *
 * Trigger: A Familiar the snare owner controls is killed in any way
 * (damage, insta-kill, self-kill, sacrifice, poison, etc.).
 *
 * Effect: The snare owner gets an immediate, uncancellable,
 * reconnect-persistent single-target picker to deal 8 damage
 * (damage type: Snare) to any 1 target on the board.
 *
 * Animation: Explosion on the selected target.
 */
export default {
  checkTrigger(trigger, ownerId) {
    if (trigger.type !== 'own-familiar-killed') return false;
    // Only trigger for the snare owner's own familiars dying
    return trigger.victimOwnerId === ownerId;
  },

  effect: {
    type: 'explosive-drone-damage',
  },
};
