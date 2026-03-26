/**
 * Wanted Poster — On-kill equip trigger.
 *
 * Triggers when the equipped student kills a target (same trigger as
 * Sword of the Chosen One: student basic + Edgelord, not Berserk/NerdyCheese bonus).
 * Only triggers if the player's own discard pile is non-empty.
 *
 * When triggered: uncancellable, reconnect-persistent picker showing the
 * player's own discard pile. Player selects min(N, discard.length) cards
 * to retrieve directly to hand, where N = number of Wanted Posters equipped.
 * All selected cards move from discard to hand simultaneously.
 *
 * Multiple kills queue consecutively (one prompt per kill).
 * If discard is empty when a queued prompt fires, it fizzles.
 *
 * Logic in server.js:
 *   - hasWantedPoster(player) / countWantedPosters(player)
 *   - Kill trigger in continueAfterNerdyCheese (after SCOC), sets room._wantedPosterQueue
 *   - processNextWantedPoster(room) — sets PA effectType: 'wanted-poster-retrieve'
 *   - familiar:wantedPosterRetrieve({ discardIndices }) handler
 * Logic in game.js:
 *   - 'wanted-poster-retrieve' targetingMode with selectedIndices Set
 *   - showWantedPosterPicker(discardPile, needed) — multi-select discard picker
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: false,
  effect: null,
};
