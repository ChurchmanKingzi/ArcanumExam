/**
 * Nature Fairy — Active: Fully heal any damaged Familiar (any player's, including self).
 * Passive: All OTHER Familiars this player controls take half damage (rounded up).
 */
export default function natureFairy(familiar, context) {
  return {
    effectType: 'nature-fairy-heal',
  };
}
