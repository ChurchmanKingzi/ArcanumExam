/**
 * Unsettling Vulture — Active: Exhaust (tap) X untapped familiars,
 * where X = the variable cost paid when summoning this card.
 * If fewer than X valid targets exist, Vulture kills itself instead.
 */
export default function unsettlingVulture(familiar, context) {
  const x = familiar.paidCost || 1;
  return {
    effectType: 'vulture-exhaust',
    targetsNeeded: x,
  };
}
