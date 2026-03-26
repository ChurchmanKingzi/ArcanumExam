/**
 * Uncool Malfunction — Snare
 *
 * Trigger: At the start of a Round, if 1+ opposing Students have
 * Equips on them that aren't already Malfunctioning.
 *
 * Effect: The snare owner picks an enemy Student with 1+ Equip.
 * All Equips currently on that Student receive a "Malfunctioning" debuff.
 * Malfunctioning Equips are negated and never trigger their effects.
 * The debuff clears at end of Round.
 *
 * Animation: Black ominous smoke billowing from the affected Equips.
 */
export default {
  checkTrigger(trigger, ownerId, room) {
    if (trigger.type !== 'round-start-equips') return false;
    if (!room) return false;
    // Check if any opponent has non-malfunctioning equips
    for (const [pid, p] of room.players) {
      if (pid === ownerId) continue;
      if (p.left || p.studentDead || !p.chosenStudent) continue;
      if ((p.equips || []).some(e => !e.malfunctioning)) return true;
    }
    return false;
  },

  effect: {
    type: 'uncool-malfunction-pick',
    requiresTargeting: false,
  },
};
