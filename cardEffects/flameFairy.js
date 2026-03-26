/**
 * Flame Fairy — Energize: untaps a tapped target and deals 5 damage to it.
 * Can target any player's tapped student or familiar (including own).
 * Fizzles if no tapped, alive targets exist on the board.
 */
export default function flameFairy(familiar, context) {
  const room = context.room;
  if (!room) return null;

  let hasTapped = false;
  for (const [, p] of room.players) {
    if (p.left) continue;
    // Tapped alive student
    if (p.chosenStudent && p.tappedStudent && !p.studentDead && !p.won) {
      hasTapped = true;
      break;
    }
    // Tapped alive familiars
    for (const idx of (p.tappedFamiliars || [])) {
      if (p.familiars[idx] && p.familiars[idx].currentHp > 0) {
        hasTapped = true;
        break;
      }
    }
    if (hasTapped) break;
  }

  if (!hasTapped) return null;

  return {
    effectType: 'energize',
    damage: 5,
  };
}
