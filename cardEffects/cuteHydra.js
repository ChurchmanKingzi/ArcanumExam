/**
 * Cute Hydra — Variable cost (1-3). Active: Select UP TO X targets
 * (familiars + students, any player, not self), deal 3X damage to each.
 * On death: if controller has hand cards, prompt to revive by discarding 1-3 cards.
 */
export default function cuteHydra(familiar, context) {
  const x = Math.min(familiar.paidCost || 1, 3);
  return {
    effectType: 'hydra-attack',
    maxTargets: x,
    damage: 3 * x,
  };
}
