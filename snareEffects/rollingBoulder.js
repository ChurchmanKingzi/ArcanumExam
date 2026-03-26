/**
 * Rolling Boulder — Snare
 *
 * Trigger: Any opponent casts or resolves a Spell (single-target, multi-target,
 * instant, or field spell). Uses spell-resolving / spell-multi-target for
 * targeting/instant spells (same window as Anti Magic Shield) and
 * spell-cast-by-student for field spells and as an early trigger window.
 * Additionally, the spellcasting opponent must control 1+ Familiars that
 * are NOT immune to single-target killing effects (same checks as Undead
 * Desert Worm: Class Pet immunity, Mech immunity, Golden Hind, summoned students).
 *
 * Effect: The snare owner picks one of the caster's eligible Familiars
 * and kills it. Non-cancellable picker. Uses processFamiliarDeath (kill).
 *
 * Animation: A giant rolling boulder rolls across the screen, crushing
 * the selected Familiar before it dies.
 */
export default {
  checkTrigger(trigger, ownerId, room) {
    if (trigger.type !== 'spell-resolving' && trigger.type !== 'spell-multi-target'
        && trigger.type !== 'spell-cast-by-student') return false;
    // Only trigger for opponents' spells
    if (trigger.casterPlayerId === ownerId) return false;
    if (!room) return false;
    // Caster must have 1+ killable familiars (same checks as Undead Desert Worm / delete-familiar)
    const caster = room.players.get(trigger.casterPlayerId);
    if (!caster || caster.left) return false;
    // Class Pet: entire player's familiars are immune
    if (caster.chosenStudent && !caster.studentDead
        && caster.chosenStudent.name === 'The Class Pet') return false;
    for (const f of (caster.familiars || [])) {
      if (!f || f.currentHp <= 0) continue;
      if (f.summoned) continue; // summoned students are not familiars
      // Mech immune
      if (f.name === 'Futuristic Mech' || (f.isClone && f.cloneSourceName === 'Futuristic Mech')) continue;
      // Golden Hind immune
      if (!f.passiveNegated && (f.name === 'Golden Hind' || (f.isClone && f.cloneSourceName === 'Golden Hind'))) continue;
      // Found at least one eligible familiar
      return true;
    }
    return false;
  },

  effect: {
    type: 'rolling-boulder-kill',
  },
};
