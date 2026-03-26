/**
 * Spacial Crevice — Snare
 *
 * Trigger: Any card (Familiar, Equip, Snare, field Spell) is moved
 * from one player's side of the board to another player's side
 * (stolen, charmed, relocated, gifted, etc.).
 *
 * Effect: The transferred card is instead sent straight to the
 * discard pile (of the player it was taken from).
 *
 * Animation: A fissure opens in the battlefield and the card is
 * sucked into it, vanishing.
 */
export default {
  checkTrigger(trigger, ownerId) {
    if (trigger.type !== 'board-card-transferred') return false;
    // Triggers for ANY transfer, even if snare owner is involved
    return true;
  },

  effect: {
    type: 'spacial-crevice-discard',
  },
};
