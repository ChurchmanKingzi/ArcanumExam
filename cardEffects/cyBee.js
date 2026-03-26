/**
 * Cy-Bee — Relocates an Equip card from one student to another.
 * Phase 1: Select any Equip on the board.
 * Phase 2: Select any student except the one it's currently on.
 */
export default function cyBee(familiar, context) {
  // Count total equips on the board
  let totalEquips = 0;
  if (context.room) {
    for (const [, p] of context.room.players) {
      if (p.left) continue;
      totalEquips += (p.equips || []).length;
    }
  }
  if (totalEquips === 0) return null; // no equips → no effect

  return {
    effectType: 'relocate-equip',
  };
}
