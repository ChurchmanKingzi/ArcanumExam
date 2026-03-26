/**
 * Spider Avalanche — Snare
 *
 * Trigger: At the very start of end-of-round processing (before poison),
 * IF at least 1 opponent controls more than twice as many living Familiars
 * as the snare owner.
 *
 * Effect: The snare owner picks an eligible opponent (one with > 2× the
 * owner's familiar count). All targets that opponent controls take 5 damage.
 * Uncancellable, reconnect-persistent picker.
 *
 * Animation: Hundreds of spiders raining down on the target player's
 * entire side of the board.
 */
export default {
  checkTrigger(trigger, ownerId, room) {
    if (trigger.type !== 'spider-avalanche-round-end') return false;
    if (!room) return false;

    const owner = room.players.get(ownerId);
    if (!owner || owner.left) return false;

    const ownerFamCount = (owner.familiars || []).filter(f => f && f.currentHp > 0).length;

    // Check if at least 1 opponent has > 2× the owner's familiar count
    for (const [pid, p] of room.players) {
      if (pid === ownerId || p.left || p.won) continue;
      const oppFamCount = (p.familiars || []).filter(f => f && f.currentHp > 0).length;
      if (oppFamCount > ownerFamCount * 2) return true;
    }
    return false;
  },

  effect: {
    type: 'spider-avalanche-pick',
  },
};
