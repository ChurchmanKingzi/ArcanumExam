/**
 * Wooden Horse — Snare
 *
 * Trigger: A Familiar the snare owner controls is killed (same as
 * Explosive Drone: damage, insta-kill, sacrifice, poison, etc.)
 * AND the snare owner has 1+ Familiars in hand with effective cost ≤ 2.
 *
 * Effect: The snare owner picks one of their cost ≤ 2 Familiars from
 * hand and summons it untapped without paying its cost.
 *
 * Animation: A Trojan Horse rolls into view and opens up to reveal
 * the newly summoned Familiar.
 */
export default {
  checkTrigger(trigger, ownerId, room) {
    if (trigger.type !== 'own-familiar-killed') return false;
    if (trigger.victimOwnerId !== ownerId) return false;
    if (!room) return false;
    // Check owner has 1+ cost ≤ 2 Familiars in hand
    const owner = room.players.get(ownerId);
    if (!owner || owner.left) return false;
    for (const c of (owner.hand || [])) {
      if (c.type !== 'Familiar') continue;
      if (c.name === 'Gerrymander') continue; // skip if Gerrymander already on board
      const baseCost = c.cost || 0;
      if (baseCost <= 2) return true;
    }
    return false;
  },

  effect: {
    type: 'wooden-horse-summon',
  },
};
