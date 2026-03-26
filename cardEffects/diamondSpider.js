/**
 * Diamond Spider — Active: Same as Cheeky Monkey — attacks 1 target
 * for damage equal to the number of cards in its owner's hand.
 *
 * Passive (handled in server.js): Whenever ANY player activates a Snare,
 * this spider's owner may retrieve up to 2 non-Snare cards from their discard.
 */
export default function diamondSpider(familiar, context) {
  const handSize = context.player ? context.player.hand.length : 0;
  return {
    targetsNeeded: 1,
    damage: handSize,
    minLivingTargets: 1,
  };
}
