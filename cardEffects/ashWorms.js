/**
 * Ash Worms — Active: Deal 2 damage to any 1 target (except itself).
 * Passive: When discarded from hand, auto-summons to the board (server-side).
 */
export default function ashWorms(familiar, context) {
  return {
    effectType: 'damage-targets',
    damage: 2,
    targetsNeeded: 1,
  };
}
