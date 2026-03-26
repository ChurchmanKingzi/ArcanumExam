/**
 * Surprised Lion — Active: Deal 5 damage to any 1 target (except itself).
 * Passive: Whenever any player activates a Snare, the Lion's controller
 * must select any 1 target to deal 4 damage to (mandatory, uncancellable).
 */
export default function surprisedLion(familiar, context) {
  return {
    effectType: 'damage-targets',
    targetsNeeded: 1,
    damage: 5,
  };
}
