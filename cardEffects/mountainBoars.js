/**
 * Mountain Boars — Deal damage equal to 3 × number of face-down Snares on the board.
 */
export default function mountainBoars(familiar, context) {
  const room = context.room;
  if (!room) return null;

  let faceDownSnares = 0;
  for (const [, p] of room.players) {
    if (p.left) continue;
    for (const s of (p.snares || [])) {
      if (!s.faceUp) faceDownSnares++;
    }
  }

  const damage = faceDownSnares * 3;
  if (damage <= 0) return null; // no face-down snares — fizzles

  return {
    effectType: 'damage-targets',
    targetsNeeded: 1,
    damage,
  };
}
