/**
 * Spike Trap — Snare
 *
 * Trigger: An opponent's Student confirms a basic attack (taps to deal damage).
 * This includes normal single-target attacks AND The Edgelord's multi-target attack.
 * Does NOT trigger from familiar attacks, spells, items, or other effects.
 *
 * Effect: The attack is negated entirely (no damage, no on-hit equip effects).
 * The Student still taps if it would have been tapped normally (i.e. not a
 * Class Rep command, bonus attack, Siren chain, or Bard chain).
 * Additionally, the attacker's Student takes damage equal to its own ATK stat.
 *
 * Animation: The attacking Student "falls down" off the bottom of the screen
 * on all clients, then pops back in at its original position. Metal spikes
 * shoot up from below at the Student's location.
 */
export default {
  checkTrigger(trigger, ownerId) {
    if (trigger.type !== 'student-attack-confirmed') return false;
    // Only trigger for opponents' student attacks
    return trigger.attackerPlayerId !== ownerId;
  },

  effect: {
    type: 'spike-trap-recoil',
  },
};
