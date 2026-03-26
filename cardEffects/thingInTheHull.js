/**
 * Thing in the Hull — Attacks 1 target for 10 damage.
 * If it kills a Familiar, the dead Familiar's card is added to
 * Thing in the Hull's owner's hand instead of going to the discard pile.
 */
export default function thingInTheHull(familiar, context) {
  return {
    targetsNeeded: 1,
    damage: 10,
    minLivingTargets: 1,
    stealFamiliarOnKill: true,
  };
}
