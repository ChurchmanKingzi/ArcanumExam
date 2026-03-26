/**
 * The Transfer Student
 *
 * PASSIVE – "New Kid Discount":
 *   All Familiars cost 1 less (minimum 0) for this player,
 *   including during the Preparation Phase.
 *   → Implemented via getEffectiveFamiliarCost() in server.js.
 *
 * ESCAPE – "Sacrificial Lambs":
 *   At the start of the Exam Phase, if this player has 3+ Familiars,
 *   they are all marked (transferMarked). All marked Familiars must be
 *   killed by opponents' cards/effects/attacks. If ANY marked Familiar
 *   is self-killed (instigator = this player), bounced, or dies from
 *   poison that includes self-inflicted stacks → permanently ruined.
 *   Revived familiars lose their mark; they no longer count.
 *
 *   Tracked via:
 *     player.transferEscapeActive     — marking happened (3+ fams at exam start)
 *     player.transferEscapeRuined     — permanently broken
 *     player.transferMarkedTotal      — initial count of marked familiars
 *     player.transferMarkedKilledByOpponents — count killed by opponents
 *     familiar.transferMarked         — visual/logical mark per familiar
 *     familiar.transferSelfPoisoned   — any self-applied poison on this familiar
 */

/**
 * Escape condition — checked at end of each round.
 * All initially-marked familiars must have been killed by opponents.
 */
export function escapeCondition(player, room) {
  if (!player.transferEscapeActive) return false;
  if (player.transferEscapeRuined) return false;
  return (player.transferMarkedKilledByOpponents || 0) >= (player.transferMarkedTotal || 0);
}

/**
 * Preview: escape indicator (⚠️) shows when condition is already met
 * (all marked familiars dead by opponents, not ruined).
 */
export function previewEscapeCondition(player, room) {
  return escapeCondition(player, room);
}
