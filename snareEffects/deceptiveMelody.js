/**
 * Deceptive Melody — Snare
 *
 * Trigger: An opponent kills a Familiar the snare owner controls through
 * damage or an instant kill effect (NOT poison, self-destruct, recoil).
 * Additional: that opponent controls 1+ untapped, non-immune Familiars.
 * Immune: Class Pet (owner-level), Mech (per-familiar), Chilly Dog/Ifrit (owner-level tap block).
 *
 * Effect: ALL non-immune Familiars that opponent controls are tapped.
 * Animation: Music notes swarming the opponent's side of the board.
 */
export default {
  checkTrigger(trigger, ownerId, room) {
    if (trigger.type !== 'familiar-killed-by-opponent') return false;
    if (trigger.victimOwnerId !== ownerId) return false;
    if (trigger.killerId === ownerId) return false;
    if (!room) return false;
    const killer = room.players.get(trigger.killerId);
    if (!killer || killer.left) return false;

    // Owner-level immunities (inline — no access to server helpers in ES module)
    const hasClassPet = killer.chosenStudent && !killer.studentDead
      && killer.chosenStudent.name === 'The Class Pet';
    const hasChillyDog = (killer.familiars || []).some(f => f && f.name === 'Chilly Dog' && f.currentHp > 0 && !f.passiveNegated);
    const hasIfrit = (killer.familiars || []).some(f => f && f.name === 'Ifrit' && f.currentHp > 0 && !f.passiveNegated);
    if (hasClassPet || hasChillyDog || hasIfrit) return false;

    const isMech = (f) => f.name === 'Futuristic Mech' || (f.isClone && f.cloneSourceName === 'Futuristic Mech');

    // Count untapped familiars that are not Mech immune
    const untapped = (killer.familiars || []).filter((f, i) => {
      if (!f || f.currentHp <= 0) return false;
      if (killer.tappedFamiliars.includes(i)) return false;
      if (isMech(f)) return false;
      return true;
    });
    return untapped.length > 0;
  },

  effect: {
    type: 'deceptive-melody-tap',
  },
};
