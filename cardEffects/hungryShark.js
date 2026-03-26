/**
 * Hungry Shark — Deal 8 damage to a single target,
 * then heal itself for 8 HP (capped at max).
 */
export default function hungryShark(familiar, context) {
  return {
    effectType: 'damage-targets',
    targetsNeeded: 1,
    damage: 8,
    selfHealAfter: 8,
  };
}
