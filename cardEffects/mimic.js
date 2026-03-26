/**
 * Mimic — Active (tap): Deal damage to 1 target equal to the total number
 * of Snares in ALL players' discard piles.
 *
 * Passive (server-side): On death/delete, player picks any Snare from any
 * discard pile and places it face-down among their own Snares.
 */
export default function mimic(familiar, context) {
  const room = context.room;
  if (!room) return null;

  let snareCount = 0;
  for (const [, p] of room.players) {
    if (p.left) continue;
    for (const card of (p.discardPile || [])) {
      if (card.type === 'Snare') snareCount++;
    }
  }

  if (snareCount <= 0) return null;

  return {
    effectType: 'damage-targets',
    targetsNeeded: 1,
    damage: snareCount,
  };
}
