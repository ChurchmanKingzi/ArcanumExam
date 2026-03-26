/**
 * Fire all Cannons — Snare
 *
 * Trigger: An opponent summons a Familiar through any means (from hand,
 * via effects like Cute Familiar / Tiny Phoenix, or self-revival like
 * Cute Hydra).
 *
 * Additional: The snare owner must control 1+ living Familiars to sacrifice.
 *
 * Effect: The snare owner sacrifices one of their own Familiars, then
 * the newly summoned Familiar is killed. A cannonball projectile flies
 * from the sacrificed Familiar's position to the summoned Familiar.
 *
 * Animation: Cannonball projectile from sacrifice → summoned familiar,
 * explosion on impact, then the summoned familiar dies.
 */
export default {
  checkTrigger(trigger, ownerId, room) {
    if (trigger.type !== 'familiar-summoned') return false;
    // Only trigger for opponent summons
    if (trigger.summonerPlayerId === ownerId) return false;
    // Owner must have 1+ living familiars to sacrifice
    if (!room) return false;
    const owner = room.players.get(ownerId);
    if (!owner || owner.left) return false;
    const livingFamiliars = (owner.familiars || []).filter(f => f && f.currentHp > 0 && !f.summoned);
    return livingFamiliars.length > 0;
  },

  effect: {
    type: 'fire-all-cannons',
  },
};
