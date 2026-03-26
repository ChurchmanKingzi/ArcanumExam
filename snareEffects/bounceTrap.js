/**
 * Bounce Trap — Snare
 *
 * Trigger: When an opponent's Familiar takes a turn
 * (gets tapped to resolve its active effect).
 *
 * Effect: The Familiar's effect resolves normally, but afterwards
 * it is bounced back to its controller's hand.
 * Animation: The Familiar is shot upward off the screen.
 */
export default {
  checkTrigger(trigger, ownerId) {
    if (trigger.type !== 'familiar-took-turn') return false;
    // Only trigger for opponent familiars
    return trigger.sourcePlayerId !== ownerId;
  },

  effect: {
    type: 'bounce-familiar-to-hand',
  },
};
