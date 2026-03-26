/**
 * Sword of the Chosen One — On-kill equip trigger.
 *
 * Triggers when the equipped student kills a target with a basic attack
 * (including Edgelord multi-kill), provided the equipped player does NOT
 * yet have all proctor approvals.
 *
 * Trigger fires: once per kill × once per copy of the sword equipped.
 * Queue order: kills first (outermost), sword copies inner.
 *
 * For each trigger:
 *   - Fizzle if equipped player already has all approvals.
 *   - Otherwise: the opponent whose target was killed (uncancellable) must
 *     click a proctor the equipped player does not yet have approval from.
 *   - The equipped player gains that proctor's approval.
 *
 * Logic in server.js:
 *   - hasSwordOfTheChosenOne(player) / countSwordsOfTheChosenOne(player)
 *   - Kill trigger in continueAfterNerdyCheese after Scimitar block
 *   - room._scocQueue: array of { equippedPlayerId, opponentPlayerId }
 *   - room._scocAfterFn: continuation after queue drains
 *   - processNextSCOC(room) — builds PA with effectType: 'sword-chosen-one-pick'
 *   - sword:chosenOnePick handler
 * Logic in game.js:
 *   - 'sword-chosen-one-pick' targetingMode with eligibleProctors
 *   - renderProctors: isSwordChosenOneMode branch for uncancellable pick
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: false,
  effect: null,
};
