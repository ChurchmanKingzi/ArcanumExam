/**
 * Ghostly Warning — Snare
 *
 * Trigger: An opponent's Student casts a Spell (NOT familiar-cast spells).
 *
 * For INSTANT spells: triggers at spell-cast-by-student (before resolution).
 * For TARGETING spells: triggers at spell-resolving / spell-multi-target
 *   (after the caster confirms targets) or targeting-spell-confirmed-by-student
 *   (for spells targeting non-standard board entities like equips/snares).
 *
 * Effect: The Spell is negated but returned to caster's hand (revealed).
 */
export default {
  checkTrigger(trigger, ownerId) {
    // Instant spells: fire at declaration
    if (trigger.type === 'spell-cast-by-student') {
      if (trigger._isTargetingSpell) return false; // wait for confirm
      return trigger.casterPlayerId !== ownerId;
    }
    // Targeting spells: fire after targets confirmed
    if (trigger.type === 'spell-resolving' || trigger.type === 'spell-multi-target') {
      if (!trigger._studentCast) return false;
      return trigger.sourcePlayerId !== ownerId;
    }
    // Non-standard targets (equips, snares, field spells — e.g. The Yeeting)
    if (trigger.type === 'targeting-spell-confirmed-by-student') {
      return trigger.casterPlayerId !== ownerId;
    }
    return false;
  },

  effect: {
    type: 'ghostly-warning-negate',
  },
};
