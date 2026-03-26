/**
 * Skeleton King's Sword — Passive equip effect (on-attack trigger).
 *
 * Triggers after EVERY student attack (including bonus attacks, Berserk,
 * Nerdy Cheese bonus casts, and Edgelord multi-target cleave).
 *
 * When triggered: if the player's own discard pile contains any Familiars
 * whose effective cost (with all modifiers) the player can afford with their
 * current hand, AND neither Mummy Guards lock nor Barrel Home blocks it,
 * the player gets a cancellable picker to summon one from discard.
 *
 * Payment uses the standard "select cards from hand" flow.
 * The summoned Familiar enters play UNTAPPED (unlike Tiny Phoenix which taps).
 *
 * Multiple Swords queue consecutively:
 *   - Each copy opens the picker in turn.
 *   - If the player CANCELS, all remaining copies are skipped.
 *   - After the queue is exhausted (or cancelled), the chain resumes normally.
 *
 * Reconnect persistence: queue + afterFn stored on room._sksQueue / room._sksAfterFn.
 * On reconnect, if room.pendingActivation.effectType === 'sks-summon' the client
 * re-opens the picker from pa.eligibleFamiliars (rebuilt at broadcast time).
 *
 * Logic in server.js:
 *   - hasSkeletonsKingsSword(player) / countSkeletonKingsSwords(player)
 *   - setupSKSChain(room, playerId, afterFn) — builds queue, starts first prompt
 *   - processNextSKS(room) — picks next entry or calls afterFn
 *   - familiar:sksSubmit — payment submit socket (untapped summon)
 *   - familiar:sksCancel — skip remaining queue
 *   - continueAfterSnares() — trigger after isStudentAttack (all attack types)
 * Logic in game.js:
 *   - showSkeletonKingsSwordPicker(eligibleFamiliars)
 *   - 'sks-summon' / 'sks-pay' targetingMode branches
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
