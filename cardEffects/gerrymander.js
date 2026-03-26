/**
 * Gerrymander — Active: Deal 5 damage to a single target.
 * Passive: The first time every Round each opponent would choose a
 * Familiar or Student with an effect, you choose the target for them.
 * Only 1 Gerrymander can be in play at a time. (Server-side.)
 */
export default function gerrymander(familiar, context) {
  return {
    effectType: 'damage-targets',
    targetsNeeded: 1,
    damage: 5,
  };
}
