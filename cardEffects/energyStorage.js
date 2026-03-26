/**
 * Energy Storage — Grants the player an "Energy Stored" buff.
 * The next time this round they would pay a card cost (discard cards as
 * payment), that entire payment is automatically skipped and the buff consumed.
 * If unused, the buff expires at the end of the round.
 *
 * Handled entirely server-side (no targeting needed).
 * Effect type: null — resolves immediately on play.
 */
export default function energyStorage(familiar, context) {
  return null; // no active tap effect — passive Item only
}
