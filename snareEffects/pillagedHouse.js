/**
 * Pillaged House — Snare
 *
 * Trigger: When an opponent activates a Snare (detected via the
 * card-played-by-opponent trigger with cardType 'Snare').
 *
 * Effect: The opponent who activated the triggering Snare must
 * immediately discard up to 2 cards from their hand. If they have
 * 0 cards, the effect fizzles. Resolves BEFORE the triggering Snare's
 * own effect, forming a stack (newest effect resolves first).
 *
 * Animation: Each discarded hand card is engulfed in flames for ~1s
 * before being removed.
 */
export default {
  checkTrigger(trigger, ownerId) {
    if (trigger.type !== 'card-played-by-opponent') return false;
    if (trigger.cardType !== 'Snare') return false;
    return trigger.cardPlayerId !== ownerId;
  },

  effect: {
    type: 'pillaged-house-discard',
  },
};
