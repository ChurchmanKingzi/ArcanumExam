/**
 * Land Sharks — Attacks 3 different targets for 5 damage each.
 * Requires at least 3 living targets. Can target itself.
 */
export default function landSharks(familiar) {
  return {
    targetsNeeded: 3,
    damage: 5,
    minLivingTargets: 3,
    canSelfTarget: true,
  };
}
