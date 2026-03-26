/**
 * The Class Clown
 *
 * Active Effect: Choose an opponent with 1+ cards in hand.
 * That opponent must select up to 2 cards to give to the Class Clown player.
 *
 * Escape Condition: At end of round, Class Clown player has 8+ cards in hand
 * AND all non-won other players have 0 cards in hand.
 */

/**
 * Active effect — returns effect descriptor or null if no valid targets.
 */
export function activeEffect(student, context) {
  const room = context.room;
  const player = context.player;
  if (!room || !player) return null;

  // Check at least one opponent has cards in hand
  let hasTarget = false;
  for (const [pid, p] of room.players) {
    if (p.left || pid === player.id) continue;
    if ((p.hand || []).length > 0) {
      hasTarget = true;
      break;
    }
  }

  if (!hasTarget) return null;

  return {
    effectType: 'clown-steal',
    effectLabel: '🤡 Steal Cards',
  };
}

/**
 * Escape condition — checked at end of each round.
 * Win if player has 8+ cards in hand AND all non-won opponents have 0 cards.
 * Players with dead students still count (must have 0 cards), but won players are ignored.
 */
export function escapeCondition(player, room) {
  if ((player.hand || []).length < 8) return false;

  for (const [pid, p] of room.players) {
    if (pid === player.id) continue;
    if (p.left || p.won) continue;
    // Dead-student players still count — they must have 0 cards
    if ((p.hand || []).length > 0) return false;
  }
  return true;
}
