/**
 * Moonlight Butterfly — Deal 10 damage to a single target,
 * then bounce itself back to owner's hand.
 */
export default function moonlightButterfly(familiar) {
  return {
    effectType: 'damage-targets',
    targetsNeeded: 1,
    damage: 10,
    selfBounceAfter: true,
  };
}
