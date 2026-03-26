/**
 * Tiny Phoenix — Active: Select a Familiar from any discard pile, pay its cost,
 * and summon it to your board.
 * Passive: On death, prompts owner to revive by discarding 1 card.
 */
export default function tinyPhoenix(familiar, context) {
  return {
    effectType: 'tiny-phoenix-summon',
  };
}
