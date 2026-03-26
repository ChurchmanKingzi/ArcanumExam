/**
 * Harpy Warrior
 *
 * Active (tap): Deal 5 damage to 1 target.
 *
 * Passive (handled in server.js):
 * At round start (after snares), player chooses one of their own targets
 * (student or familiar, excluding other Harpy Warriors and already-guarded targets)
 * to Guard. Damage to the guarded target is redirected to the Harpy Warrior.
 * Guard resets each round.
 */
export default function harpyWarrior(familiar, context) {
  return {
    effectType: 'damage-targets',
    targetsNeeded: 1,
    damage: 5,
    minLivingTargets: 1,
  };
}
