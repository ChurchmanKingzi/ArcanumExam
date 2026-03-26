/**
 * Capture Net — Snare
 *
 * Trigger: When an opponent's Familiar takes a turn
 * (gets tapped to resolve its active effect).
 *
 * Effect: After the turn fully resolves, the Familiar is stolen
 * and moved under the Capture Net user's control permanently
 * (remains tapped). Animation: net falling from above.
 */
export default {
  checkTrigger(trigger, ownerId) {
    if (trigger.type !== 'familiar-took-turn') return false;
    // Only trigger for opponent familiars
    return trigger.sourcePlayerId !== ownerId;
  },

  effect: {
    type: 'capture-familiar',
  },
};
