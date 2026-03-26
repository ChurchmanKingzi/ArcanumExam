/**
 * Playing Cards — Passive equip.
 *
 * Whenever the equipped Student hits 1+ targets with a basic student attack
 * (including Edgelord multi-attack, same trigger as Bomb Arrow) AND the
 * attacking player has 1+ cards in hand, they get a timed "Discard a card
 * to make it a Critical Hit?" prompt (10s timer, default = skip).
 *
 * Accepting leads to a single-card discard. Actually discarding doubles
 * pa.damage (and all pa.damageByType values) for the entire attack —
 * ALL hit targets receive the doubled damage.
 *
 * Multiple Playing Cards: each copy gives one additional crit charge per
 * attack, processed sequentially. 2 copies → up to 2 discards → up to 4×.
 *
 * Timing: fires BEFORE Jetpack evasion and before _magnetResolveFn damage.
 *
 * Reconnect: auto-skips any pending charge.
 *
 * Server:
 *   - countPlayingCards(player) — count of copies
 *   - setupPlayingCardsPrompt() — sets room.pendingPlayingCards, auto-skip timer
 *   - playingCards:skip / playingCards:accept / playingCards:pay socket handlers
 *   - Intercept in familiar:confirmTargets handler before Jetpack
 * Client: showPlayingCardsPrompt() with timer bar; discard picker on accept
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
