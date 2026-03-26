/**
 * Jumpscare — Snare
 *
 * Trigger: The snare owner's Student is targeted by an opponent's Student
 * via either an attack (tap to deal ATK damage) or any targeting Spell.
 * Passive effects, instant AoE spells, familiar effects are excluded.
 *
 * Effect: The attack or Spell is negated/fizzled. The opponent's Student
 * is still tapped (attack action / spell cost consumed).
 *
 * Uses existing trigger types:
 *   - student-attack-confirmed: opponent student attacks, owner's student is a target
 *   - spell-resolving: single-target spell cast by student, targeting owner's student
 *   - spell-multi-target: multi-target spell cast by student, owner's student among targets
 */
export default {
  checkTrigger(trigger, ownerId) {
    if (trigger.type === 'student-attack-confirmed') {
      // Opponent's student attacks and one of the targets is the owner's student
      if (trigger.attackerPlayerId === ownerId) return false;
      return (trigger.targets || []).some(t => t.playerId === ownerId && t.type === 'student');
    }
    if (trigger.type === 'spell-resolving') {
      // Targeting spell hitting the owner's student (from an opponent)
      if (trigger.casterPlayerId === ownerId) return false;
      if (trigger.targetPlayerId === ownerId && trigger.targetType === 'student') return true;
      return (trigger.affectedPlayers || []).some(ap =>
        ap.playerId === ownerId && (ap.targets || []).some(t => t.type === 'student')
      );
    }
    if (trigger.type === 'spell-multi-target') {
      // Multi-target spell hitting the owner's student (from an opponent)
      if (trigger.casterPlayerId === ownerId) return false;
      return (trigger.affectedPlayers || []).some(ap =>
        ap.playerId === ownerId && (ap.targets || []).some(t => t.type === 'student')
      );
    }
    return false;
  },

  effect: {
    type: 'jumpscare-negate',
  },
};
