/**
 * Crimson Skull Spider — Active: Sacrifice one of your own Snares,
 * then deal 10 damage to any target (except this spider).
 * Fizzles if the player controls no Snares.
 *
 * Passive (handled in server.js): Whenever ANY player activates a Snare,
 * this spider's owner gets a mandatory prompt to deal 5 damage to any target
 * (except this spider).
 */
export default function crimsonSkullSpider(familiar, context) {
  const player = context.player;
  if (!player) return null;

  // Need at least one Snare on the board
  const snareCount = (player.snares || []).length;
  if (snareCount === 0) return null;

  return {
    effectType: 'crimson-snare-sacrifice',
    damage: 10,
  };
}
