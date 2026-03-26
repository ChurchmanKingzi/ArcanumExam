/**
 * War Cyclops — Deals damage to 1 target equal to owner's student currentAtk.
 * Fizzles if student is dead, missing, or ATK is 0.
 */
export default function warCyclops(familiar, context) {
  const player = context.player;
  if (!player) return null;

  if (!player.chosenStudent || player.studentDead) return null;

  const atk = player.chosenStudent.currentAtk || 0;
  if (atk <= 0) return null;

  return {
    effectType: 'damage-targets',
    targetsNeeded: 1,
    damage: atk,
  };
}
