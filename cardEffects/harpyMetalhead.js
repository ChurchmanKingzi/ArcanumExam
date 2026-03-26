/**
 * Harpy Metalhead — Select one of your own Equips, then deal 12 damage
 * to a single target. The selected Equip is destroyed afterward.
 * Fizzles if player has no Equips.
 */
export default function harpyMetalhead(familiar, context) {
  const player = context.player;
  if (!player) return null;

  const equips = player.equips || [];
  if (equips.length === 0) return null;

  return {
    effectType: 'metalhead-shred',
    damage: 12,
  };
}
