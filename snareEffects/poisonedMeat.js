/**
 * Poisoned Meat — Snare
 *
 * Trigger: Any poisoned familiar taps to use its effect (even if fizzle).
 * This includes normal taps and Class Rep commands.
 *
 * Effect: The familiar's effect is negated (nothing happens) and the
 * familiar is instantly killed. On-death effects (Cute Hydra, etc.)
 * still trigger normally. The turn is still consumed.
 */
export default {
  checkTrigger(trigger, ownerId) {
    return trigger.type === 'poisoned-familiar-tapped';
  },

  effect: {
    type: 'kill-familiar',
  },
};
