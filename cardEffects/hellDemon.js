/**
 * Hell Demon — Deal damage equal to 2× the number of Familiars
 * the active player controls to a single target (not itself).
 */
export default function hellDemon(familiar, context) {
  const player = context.player;
  if (!player) return null;

  const aliveFamiliars = (player.familiars || []).filter(f => f && f.currentHp > 0);
  // Pawn passive: counts as 2 Familiars
  let count = 0;
  for (const f of aliveFamiliars) {
    count += (f.name === 'Pawn' || (f.isClone && f.originalName === 'Pawn')) ? 2 : 1;
  }
  const damage = count * 2;
  if (damage <= 0) return null;

  return {
    effectType: 'damage-targets',
    targetsNeeded: 1,
    damage,
  };
}
