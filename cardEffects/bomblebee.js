/**
 * Bomblebee — Active: Deal 4 damage to any 1 target.
 * Passive: When it dies, deals 4 damage to ALL targets on the board
 * (including own student and familiars). Handled server-side.
 */
export default function bomblebee(familiar, context) {
  return {
    effectType: 'damage-targets',
    damage: 4,
    targetsNeeded: 1,
  };
}
