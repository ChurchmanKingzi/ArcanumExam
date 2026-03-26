/**
 * Hell Pup — Deal 8 damage to a single target.
 * If the target dies, trigger a mandatory Energize effect
 * (untap a tapped target + deal 5 damage to it).
 */
export default function hellPup(familiar, context) {
  return {
    effectType: 'damage-targets',
    targetsNeeded: 1,
    damage: 8,
    bonusOnKill: 'energize',
  };
}
