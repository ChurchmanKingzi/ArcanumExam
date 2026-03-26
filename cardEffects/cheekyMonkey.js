/**
 * Cheeky Monkey — Attacks 1 target for damage equal to
 * the number of cards in its owner's hand (can be 0).
 */
export default function cheekyMonkey(familiar, context) {
  const handSize = context.player ? context.player.hand.length : 0;
  return {
    targetsNeeded: 1,
    damage: handSize,
    minLivingTargets: 1,
  };
}
