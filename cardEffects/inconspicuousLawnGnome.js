/**
 * Inconspicuous Lawn Gnome — Active (tap): Deal damage to any 1 target
 * (except itself) equal to its own current HP.
 *
 * Passive: At end of every round (after poison), current and max HP are doubled.
 */
export default function inconspicuousLawnGnome(familiar, context) {
  const damage = familiar.currentHp || 0;
  if (damage <= 0) return null;
  return {
    effectType: 'damage-targets',
    targetsNeeded: 1,
    damage,
  };
}
