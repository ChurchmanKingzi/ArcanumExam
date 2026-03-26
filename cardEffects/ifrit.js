/**
 * Ifrit — Active (tap): Select a single-target damage Spell from own discard pile,
 * then deal that Spell's damage to any target (except Ifrit itself).
 * The Spell is NOT consumed — it stays in discard and only determines damage.
 *
 * Passive: Protects ALL own targets (student + familiars) from being tapped via effects.
 */
export default function ifrit(familiar, context) {
  return {
    effectType: 'ifrit-spell-select',
  };
}
