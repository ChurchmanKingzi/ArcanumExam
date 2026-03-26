/**
 * Futuristic Mech
 *
 * Active (tap): Deal damage to 1 target equal to 3× the total number
 * of Equips on the board (all players combined).
 *
 * Passive (handled in server.js via isMechImmune()):
 * Innately immune to everything except damage (same as Class Pet
 * protection, but only for itself).
 */
export default function futuristicMech(familiar, context) {
  const room = context.room;
  let totalEquips = 0;
  if (room && room.players) {
    for (const [, p] of room.players) {
      totalEquips += (p.equips || []).length;
    }
  }
  return {
    effectType: 'damage-targets',
    targetsNeeded: 1,
    damage: 3 * totalEquips,
    minLivingTargets: 1,
  };
}
