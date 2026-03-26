/**
 * Jar Rats — Inflict 1 stack of Poison on a single target (can target self).
 */
export default function jarRats(familiar, context) {
  return {
    effectType: 'poison-target',
    targetsNeeded: 1,
    poisonStacks: 1,
  };
}
