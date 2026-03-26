/**
 * Serpent Cultist — Sacrifice an ally Familiar, then deal 12 damage to a target.
 * Fizzles if the player controls no other living Familiars.
 */
export default function serpentCultist(familiar, context) {
  const player = context.player;
  if (!player) return null;

  // Need at least one OTHER living familiar
  const otherLiving = (player.familiars || []).filter(
    f => (f.currentHp || 0) > 0 && f !== familiar
  );
  if (otherLiving.length === 0) return null;

  return {
    effectType: 'sacrifice-attack',
    damage: 12,
  };
}
