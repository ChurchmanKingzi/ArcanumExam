/**
 * Creepy Clown in the Box — Snare
 *
 * Trigger: When the player's own Student takes ANY damage from ANY source.
 * Additional requirement: 1+ Familiars in at least one opponent's discard pile.
 *
 * Effect: Owner picks 1 Familiar from any opponent's discard pile to summon
 * under their control (tapped, cost ignored). Picker is uncancellable
 * and reconnect-persistent.
 * Animation: Jack-in-the-box in front of owner's student.
 */
export default {
  checkTrigger(trigger, ownerId, room) {
    if (trigger.type !== 'student-damaged') return false;
    // Only trigger for own student being damaged
    if (trigger.targetPlayerId !== ownerId) return false;
    // Additional requirement: 1+ Familiars in at least 1 opponent's discard pile
    if (!room) return false;
    for (const [pid, p] of room.players) {
      if (pid === ownerId || p.left) continue;
      if ((p.discardPile || []).some(c => c.type === 'Familiar')) return true;
    }
    return false; // no opponent familiars in any discard
  },

  effect: {
    type: 'creepy-clown-summon',
  },
};
