/**
 * Surprise Party — Snare
 *
 * Trigger: An opponent's Student performs ANY action:
 *   - Basic attack (including Edgelord's multi-target attack)
 *   - Casting a Spell from hand
 *   - Summoning a Familiar from hand
 *   - Using an active Student effect (Band Kid, Caretaker, Class Clown,
 *     Emo, Nerd, School Idol)
 *
 * Effect: The action is completely negated.
 *   - The Student still taps if it would have been tapped normally.
 *   - If the negated action was a Spell or Familiar, the card and any
 *     payment go to the discard pile.
 *
 * Animation: Hundreds of colorful balloons rise from the bottom of the
 * screen while presents and cake appear everywhere. A BIG party!
 */
export default {
  checkTrigger(trigger, ownerId) {
    if (trigger.type === 'student-attack-confirmed') {
      return trigger.attackerPlayerId !== ownerId;
    }
    if (trigger.type === 'student-plays-card') {
      return trigger.sourcePlayerId !== ownerId;
    }
    if (trigger.type === 'student-effect-activated') {
      return trigger.sourcePlayerId !== ownerId;
    }
    return false;
  },

  effect: {
    type: 'surprise-party-negate',
  },
};
