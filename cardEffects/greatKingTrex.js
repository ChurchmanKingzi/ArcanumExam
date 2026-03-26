/**
 * Great King Trex
 *
 * Active (tap): Deal 10 damage to 1 target (familiar or student).
 *
 * Passive (handled in server.js):
 * For each Great King Trex a player controls, the costs of their
 * OTHER Familiars are reduced by 2 (minimum 0). Applies to all
 * summon paths from the player's own hand or discard pile.
 */
export default function greatKingTrex(familiar, context) {
  return {
    effectType: 'damage-targets',
    targetsNeeded: 1,
    damage: 10,
    minLivingTargets: 1,
  };
}
