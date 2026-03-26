/**
 * Eyeballs
 *
 * Active (tap): Deal damage to 1 target equal to the number of cards
 * in the target controller's hand (0 is valid).
 *
 * Passive (handled in server.js / broadcastRoomState):
 * While controller has an alive Eyeballs, all opponent Snares are
 * revealed to that player. Once seen, snares remain known even after
 * Eyeballs dies.
 */
export default function eyeballs(familiar, context) {
  return {
    effectType: 'damage-targets',
    targetsNeeded: 1,
    damage: 0, // placeholder — actual damage computed at resolution
    damageByTargetControllerHandSize: true,
    minLivingTargets: 1,
  };
}
