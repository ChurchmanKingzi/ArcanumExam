/**
 * Leprechaun — Active (tap): Select any Familiar on the board that has a
 * direct-damage effect, and give it +1 Lucky stack (+5 damage per stack).
 * Fizzles if no eligible familiars exist.
 *
 * Passive: All OTHER familiars the controller has deal +3 damage on direct
 * damage effects. Stacks with multiple Leprechauns.
 */
export default function leprechaun(familiar, context) {
  return {
    effectType: 'leprechaun-bless',
  };
}
