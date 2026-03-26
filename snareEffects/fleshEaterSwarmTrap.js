/**
 * Flesh-Eater Swarm Trap — When any target would be healed (while not at max HP),
 * that healing is converted into damage instead.
 */
export default {
  checkTrigger(trigger, ownerId) {
    return trigger.type === 'target-healed';
  },

  effect: {
    type: 'convert-heal-to-damage',
  },
};
