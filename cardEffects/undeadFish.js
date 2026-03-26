/**
 * Undead Fish — Active: Deal 4 damage to any 1 target (not itself).
 * Passive: At end of round, if Undead Fish died this round and is still
 * in its owner's discard pile, it automatically resummons itself to the board.
 * Fizzles if deleted, moved to hand, or discard pile was swapped.
 * (Passive is handled server-side in continueNewExamRound.)
 */
export default function undeadFish(familiar, context) {
  return {
    effectType: 'damage-targets',
    damage: 4,
    targetsNeeded: 1,
  };
}
