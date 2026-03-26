/**
 * Icy Grave — Snare
 *
 * Trigger: The snare owner's Student is hit by an opponent's Student or
 * Familiar (same as Booby Trap), AND the attacking player has 1+ untapped,
 * non-immune targets besides the attacker itself.
 * Immune familiars: Class Pet (owner-level), Mech, Golden Hind, Chilly Dog/Ifrit (owner-level tap block).
 * Immune students: Ifrit (owner-level tap block).
 *
 * Effect: The snare owner picks up to 2 of the attacker's untapped, non-immune
 * targets to tap (Exhaust). Uncancellable, reconnect-persistent.
 *
 * Animation: Thick ice sheets covering all selected targets.
 */
export default {
  checkTrigger(trigger, ownerId, room) {
    if (trigger.type !== 'student-damaged') return false;
    if (trigger.targetPlayerId !== ownerId) return false;
    const src = trigger.sourceType;
    if (src !== 'student' && src !== 'summoned-student' && src !== 'familiar') return false;
    if (!room) return false;
    const attacker = room.players.get(trigger.sourcePlayerId);
    if (!attacker || attacker.left) return false;

    // Owner-level immunities (inline — no access to server helpers in ES module)
    const hasClassPet = attacker.chosenStudent && !attacker.studentDead
      && attacker.chosenStudent.name === 'The Class Pet';
    const isMech = (f) => f.name === 'Futuristic Mech' || (f.isClone && f.cloneSourceName === 'Futuristic Mech');
    const isGH = (f) => !f.passiveNegated && (f.name === 'Golden Hind' || (f.isClone && f.cloneSourceName === 'Golden Hind'));
    const hasChillyDog = (attacker.familiars || []).some(f => f && f.name === 'Chilly Dog' && f.currentHp > 0 && !f.passiveNegated);
    const hasIfrit = (attacker.familiars || []).some(f => f && f.name === 'Ifrit' && f.currentHp > 0 && !f.passiveNegated);
    const famTapBlocked = hasClassPet || hasChillyDog || hasIfrit;

    let eligible = 0;
    // Check student (skip if attacker, skip if Ifrit protects)
    if (attacker.chosenStudent && !attacker.studentDead && !attacker.tappedStudent && !hasIfrit) {
      if (src !== 'student' && src !== 'summoned-student') eligible++;
    }
    // Check familiars (skip attacker, skip immune)
    if (!famTapBlocked) {
      for (let i = 0; i < (attacker.familiars || []).length; i++) {
        const f = attacker.familiars[i];
        if (!f || f.currentHp <= 0) continue;
        if ((attacker.tappedFamiliars || []).includes(i)) continue;
        if (src === 'familiar' && i === trigger.sourceFamiliarIndex) continue;
        if (isMech(f) || isGH(f)) continue;
        eligible++;
      }
    }
    return eligible > 0;
  },

  effect: {
    type: 'icy-grave-exhaust',
  },
};
