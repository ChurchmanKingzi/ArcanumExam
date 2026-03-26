/**
 * Jungle Moat — Snare
 *
 * Trigger: A Spell would affect 1+ Familiars (damage, healing, status, buffs,
 * insta-kill — any effect). Fires on spell-resolving, spell-multi-target, and
 * spell-cast-by-student (instant spells only, not targeting declarations).
 *
 * Effect: Familiar-targeting effects of the spell are negated. Student effects
 * still apply. If the spell ONLY targets familiars, it's fully negated.
 *
 * Animation: A wide river of water flowing across the screen.
 */
export default {
  checkTrigger(trigger) {
    if (trigger.type === 'spell-resolving') {
      // Single-target spell targeting a familiar
      if (trigger.targetType === 'familiar') return true;
      return (trigger.affectedPlayers || []).some(ap =>
        (ap.targets || []).some(t => t.type === 'familiar')
      );
    }
    if (trigger.type === 'spell-multi-target') {
      // Multi-target spell with any familiar among targets
      return (trigger.affectedPlayers || []).some(ap =>
        (ap.targets || []).some(t => t.type === 'familiar')
      );
    }
    if (trigger.type === 'spell-cast-by-student') {
      // Instant spell (not a targeting spell declaration)
      if (trigger._isTargetingSpell) return false;
      return (trigger._highlightTargets || []).some(t => t.type === 'familiar');
    }
    return false;
  },

  effect: {
    type: 'jungle-moat-protect',
  },
};
