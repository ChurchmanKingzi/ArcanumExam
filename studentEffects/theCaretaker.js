/**
 * The Caretaker
 *
 * Active Effect: Summon up to 2 Familiars from hand or discard pile
 * (player still pays their costs by discarding cards from hand).
 *
 * Escape Condition: At end of round, control strictly more than twice
 * as many living familiars as any other single player (including won/dead).
 */

/**
 * Active effect — returns effect descriptor or null if no valid targets.
 */
export function activeEffect(student, context) {
  const room = context.room;
  const player = context.player;
  if (!room || !player) return null;

  const handSize = player.hand.length;

  // Gather available familiars from hand
  const handFamiliars = [];
  for (let i = 0; i < player.hand.length; i++) {
    if (player.hand[i].type === 'Familiar') {
      // Cost to summon from hand = card.cost, but selecting it reduces hand by 1
      // so effective budget = handSize - 1 (the familiar leaves hand, can't be discarded)
      const cost = player.hand[i].cost || 0;
      if (cost <= handSize - 1) {
        handFamiliars.push(i);
      }
    }
  }

  // Gather available familiars from discard
  const discardFamiliars = [];
  for (let i = 0; i < (player.discardPile || []).length; i++) {
    if (player.discardPile[i].type === 'Familiar') {
      const cost = player.discardPile[i].cost || 0;
      if (cost <= handSize) {
        discardFamiliars.push(i);
      }
    }
  }

  if (handFamiliars.length === 0 && discardFamiliars.length === 0) return null;

  return {
    effectType: 'caretaker-summon',
    effectLabel: '🐾 Summon',
  };
}

/**
 * Escape condition — checked at end of each round.
 * Win if player controls strictly more than twice as many living familiars
 * as any other single player. Summoned students don't count as familiars.
 */
export function escapeCondition(player, room) {
  const countFamiliars = (p) => (p.familiars || []).filter(f => f && !f.summoned).length;

  const myCount = countFamiliars(player);
  if (myCount === 0) return false; // need at least 1

  for (const [pid, p] of room.players) {
    if (pid === player.id) continue;
    if (p.left) continue;
    // Include won and dead players
    const otherCount = countFamiliars(p);
    if (myCount <= 2 * otherCount) return false; // need strictly MORE than 2×
  }
  return true;
}
