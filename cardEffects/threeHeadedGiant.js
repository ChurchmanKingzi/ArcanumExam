/**
 * 3-Headed Giant — Attacks 3 targets for 15 damage each.
 * Requires at least 3 living targets to activate. Can target itself.
 */
export default function threeHeadedGiant(familiar) {
  return {
    targetsNeeded: 3,
    damage: 15,
    minLivingTargets: 3,
    canSelfTarget: true,
  };
}
