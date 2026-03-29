/**
 * The Class Pet
 *
 * Passive Effect: All of this player's Familiars are immune to ALL effects
 * except direct damage. They cannot be healed, poisoned, bounced, charmed,
 * energized, sacrificed (kill part), or affected by any non-damage effect.
 * Their effects CAN still be copied by Corrupted Siren (copying doesn't
 * affect the Familiar itself). A Familiar's OWN self-triggered effects
 * (like Pengu's swap) still work.
 *
 * Handled server-side via hasClassPetImmunity() checks — no active effect.
 *
 * Escape Condition: At end of round, if the player has controlled at least
 * 1 Familiar for 2 full consecutive rounds without any dying. Losing a
 * Familiar resets the counter.
 */

/**
 * No active effect — The Class Pet's passive is handled server-side.
 */
export function activeEffect(student, context) {
  return null;
}

/**
 * Escape condition — checked at end of each round.
 * Uses the same "would-be" pattern as Chuunibyou:
 *   classPetSurvivalRounds = consecutive full rounds survived so far
 *   classPetFamiliarDied   = flag set if any familiar died this round
 *
 * Win if the would-be survival count (after this round) >= 2.
 */
export function escapeCondition(player, room) {
  const livingFamiliars = (player.familiars || []).filter(f => f && (f.currentHp || 0) > 0).length;
  if (livingFamiliars === 0) return false; // must control at least 1 familiar
  if (player.classPetFamiliarDied) return false; // a familiar died this round — streak breaks
  const wouldBeSurvival = (player.classPetSurvivalRounds || 0) + 1;
  return wouldBeSurvival >= 2;
}
