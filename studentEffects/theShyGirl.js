/**
 * The Shy Girl
 *
 * PASSIVE – "Wallflower":
 *   This Student cannot be chosen as a target by any Familiar effects
 *   (damage, heal, poison, energize, guardian transfer — anything).
 *   Her own Familiars are normal targets. Student attacks and spells
 *   can still target her. Non-targeted effects (e.g. "damage ALL") still hit.
 *   → Implemented via isShyGirlProtected() checks in server.js handlers
 *     and shyGirlImmune flag in client rendering.
 *
 * ESCAPE – "Unnoticed Exit":
 *   Takes no damage for 2 entire consecutive Rounds.
 *   Any damage (attacks, spells, snares, poison — anything) resets the
 *   counter so the next clean streak starts from the following round.
 *   → Tracked via shyGirlCleanRounds / shyGirlDamagedThisRound on the player.
 */

export function escapeCondition(player, room) {
  return (player.shyGirlCleanRounds || 0) >= 2;
}

/**
 * Preview: will escape at end of this round if not damaged this round
 * AND already has 1 clean round banked.
 */
export function previewEscapeCondition(player, room) {
  if (player.shyGirlDamagedThisRound) return false;
  return (player.shyGirlCleanRounds || 0) >= 1;
}
