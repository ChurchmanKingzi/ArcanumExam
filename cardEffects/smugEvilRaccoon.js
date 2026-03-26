/**
 * Smug Evil Raccoon — Choose any Equip or Snare on the board and return it
 * to its current controller's hand.
 *
 * Fizzles if no equips or snares exist on the board.
 *
 * NOTE: Familiar Tokens (The Gamer) are in the familiars array, so they're
 * naturally excluded — this effect only sees equips[] and snares[].
 */
export default function smugEvilRaccoon(familiar, context) {
  const room = context.room;
  if (!room) return null;

  let totalTargets = 0;
  for (const [, p] of room.players) {
    if (p.left) continue;
    totalTargets += (p.equips || []).length;
    totalTargets += (p.snares || []).length;
    totalTargets += (p.fieldSpells || []).length;
  }

  if (totalTargets === 0) return null;

  return {
    effectType: 'raccoon-bounce',
  };
}
