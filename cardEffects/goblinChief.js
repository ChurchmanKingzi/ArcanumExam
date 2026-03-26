/**
 * Goblin Chief — Deals 5 damage to 1 target.
 * The entire activation (targeting, attack, damage, death) is flagged noSnares,
 * preventing any Snare from triggering at any point during the effect.
 */
export default function goblinChief(familiar, context) {
  return {
    effectType: 'damage-targets',
    targetsNeeded: 1,
    damage: 5,
    noSnares: true,
  };
}
