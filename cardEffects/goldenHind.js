/**
 * Golden Hind — Active: Discard 1 card from hand, or kill this Familiar.
 * Passive (server-side): Completely immune to all damage and killing effects.
 * Can only die through its own active effect.
 */
export default function goldenHind(familiar) {
  return {
    effectType: 'golden-hind-upkeep',
  };
}
