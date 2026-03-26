/**
 * Sandy Blob — Active: Deal 2 damage to any 1 target (except itself).
 * Passive: Whenever any other familiar (globally) takes a turn,
 * each alive Sandy Blob deals 2 damage to a random opponent target.
 */
export default function sandyBlob(familiar, context) {
  return {
    effectType: 'damage-targets',
    targetsNeeded: 1,
    damage: 2,
  };
}
