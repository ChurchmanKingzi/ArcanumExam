/**
 * Powder Keg — Snare
 *
 * Trigger: When any opponent affects 2+ targets with a single attack
 * or effect (multi-target damage), and the triggering opponent still
 * controls at least 1 living target (student or familiar).
 *
 * Effect: All living targets that the triggering opponent controls
 * (student + familiars) take 5 damage with damage type 'snare'.
 *
 * Animation: A large explosion centered on the opponent's student
 * (or middle familiar if no student).
 */
export default {
  checkTrigger(trigger, ownerId, room) {
    if (trigger.type !== 'multi-target-effect') return false;
    if (trigger.instigatorId === ownerId) return false;
    // Verify instigator still has living targets
    const instigator = room.players.get(trigger.instigatorId);
    if (!instigator || instigator.left) return false;
    let hasLiving = false;
    if (instigator.chosenStudent && !instigator.studentDead) hasLiving = true;
    if (!hasLiving) {
      for (const f of (instigator.familiars || [])) {
        if (f && (f.currentHp || 0) > 0) { hasLiving = true; break; }
      }
    }
    return hasLiving;
  },

  effect: {
    type: 'powder-keg-explode',
    damage: 5,
  },
};
