/**
 * Induce Fear — Snare
 *
 * Trigger: Any Familiar (own or opponent's) selects a Student as a target
 * for its ACTIVE effect. At least one target being a Student is enough
 * (e.g. Land Shark multi-target). Passive effects are excluded.
 *
 * Effect: The Familiar's effect is negated. The Familiar still taps, and
 * any cost (Serpent Cultist sacrifice, Crimson Skull Spider snare discard)
 * is still paid.
 *
 * Animation: Scared emojis and ghosts swarming over the Familiar.
 */
export default {
  checkTrigger(trigger, ownerId) {
    if (trigger.type !== 'familiar-active-targets-student') return false;
    // Trigger for any familiar targeting any student (own or opponent)
    return true;
  },

  effect: {
    type: 'induce-fear-negate',
  },
};
