/**
 * Reverse Trap — Snare
 *
 * Trigger: When any opponent activates a Snare (fires during the
 * counter-snare window that opens after every snare activation).
 *
 * Effect: The opponent's Snare is completely negated. If that Snare
 * would have negated something else (e.g. a Spell, an Item, another
 * Snare), the original action proceeds as if the negated Snare never
 * fired. Uses the shared _eclipseNegated flag.
 *
 * Animation: The Reverse Trap card image appears center-screen,
 * growing rapidly while fading out (same as Potion of Greed).
 */
export default {
  checkTrigger(trigger, ownerId) {
    if (trigger.type !== 'card-played-by-opponent') return false;
    if (trigger.cardPlayerId === ownerId) return false;
    // Only trigger when the played card is a Snare
    if (trigger.cardType !== 'Snare') return false;
    return true;
  },

  effect: {
    type: 'reverse-trap-negate',
  },
};
