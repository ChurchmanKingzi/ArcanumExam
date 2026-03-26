/**
 * Vengeful Ghost — Active: Deal 5 damage to any 1 target.
 * Passive: On death, its controller selects any alive Familiar on the board
 * (respecting immunities) to kill instantly. Uncancellable.
 * Passive handled server-side in processFamiliarDeath.
 */
export default function vengefulGhost(familiar, context) {
  return {
    effectType: 'damage-targets',
    damage: 5,
    targetsNeeded: 1,
  };
}
