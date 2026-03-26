/**
 * Skull Bomb Trap — Snare
 *
 * Trigger: When any opponent adds 1+ cards from any discard pile to
 * their hand (same trigger window as Potion of Greed:
 * 'opponent-recovered-from-discard').
 *
 * Effect: The snare owner gets an uncancellable, reconnect-persistent
 * single-target picker to deal 10 damage to any 1 target on the board.
 * When the target is confirmed, the recovered cards are also deleted
 * (removed from the game entirely — NOT sent to discard).
 *
 * Animation: Explosion on the damage target, then skull-themed
 * explosions on each recovered card in the opponent's hand before
 * the cards are deleted.
 */
export default {
  checkTrigger(trigger, ownerId) {
    if (trigger.type !== 'opponent-recovered-from-discard') return false;
    // Only trigger for opponents' recovery
    if (trigger.recoveryPlayerId === ownerId) return false;
    return true;
  },

  effect: {
    type: 'skull-bomb-trap-damage',
  },
};
