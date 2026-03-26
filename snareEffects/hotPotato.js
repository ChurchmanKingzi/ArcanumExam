/**
 * Hot Potato — Snare
 *
 * Trigger: A card is equipped to any Student (normal Equip or equip-subtype
 * Spell like Fireshield, Shrink, Song of Rain, Spell Shackles, Butterfly Form).
 * Must have at least 1 other living Student on the board to redirect to.
 *
 * Effect: The snare owner picks any OTHER Student on the board (including
 * summoned Students). The equipped card is moved from the original target
 * to the new target, ignoring normal equip restrictions.
 *
 * Animation: The equip card bounces in a high arc from original to new target.
 */
export default {
  checkTrigger(trigger, ownerId, room) {
    if (trigger.type !== 'equip-landed-on-student') return false;
    // Must have at least 1 other living student to redirect to
    if (!room) return false;
    let otherStudents = 0;
    for (const [pid, p] of room.players) {
      if (p.left || p.won) continue;
      if (pid === trigger.targetPlayerId) continue; // skip original target
      if (p.chosenStudent && !p.studentDead) otherStudents++;
      // Count summoned students in familiar slots
      for (const f of (p.familiars || [])) {
        if (f && f.summoned && f.currentHp > 0) otherStudents++;
      }
    }
    return otherStudents > 0;
  },

  effect: {
    type: 'hot-potato-redirect',
  },
};
