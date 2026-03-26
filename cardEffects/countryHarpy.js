/**
 * Country Harpy — Forces a chosen opponent to discard 1 card.
 * Cannot target opponents with 0 hand cards.
 */
export default function countryHarpy(familiar, context) {
  return {
    effectType: 'select-opponent',
    opponentAction: 'force-discard',
    discardCount: 1,
  };
}
