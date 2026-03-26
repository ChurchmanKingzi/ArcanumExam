/**
 * Haressassin — Deals damage to 1 target equal to owner's student missing HP
 * (maxHP - currentHP). Fizzles if student is dead, off the board (won),
 * or at full HP (missing HP <= 0).
 */
export default function haressassin(familiar, context) {
  const player = context.player;
  if (!player) return null;

  if (!player.chosenStudent || player.studentDead || player.won) return null;

  const missingHp = player.chosenStudent.hp - player.chosenStudent.currentHp;
  if (missingHp <= 0) return null;

  return {
    effectType: 'damage-targets',
    targetsNeeded: 1,
    damage: missingHp,
  };
}
