/**
 * Clone — Copy any Familiar's effect and perform it.
 * Identical mechanic to Skeleton Bard.
 * Fizzles if no other Familiar with a usable effect exists.
 */
export default function clone(familiar, context) {
  return { effectType: 'bard-copy' };
}
