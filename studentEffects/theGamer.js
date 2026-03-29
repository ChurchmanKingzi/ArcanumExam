/**
 * The Gamer — Student Effect
 *
 * PASSIVE: "Token Forge" — Whenever The Gamer plays an Item, after resolving,
 * that Item becomes a "Familiar Token" added to the player's Familiars.
 * The token has 5 HP and deals 5 damage to 1 target when tapped.
 * It retains its original card art and starts untapped.
 *
 * ESCAPE: "Army Builder" — At end of round, The Gamer controls 6+ living Familiars.
 *
 * The passive is handled in server.js via hasActiveStudentEffect('The Gamer')
 * checks in game:playCard and familiar:reviveItem handlers.
 * The token's tap effect is registered as 'Familiar Token' in cardEffects/index.js.
 */

/**
 * Escape Condition: Control 6 or more living Familiars.
 */
export function escapeCondition(player, room) {
  const living = (player.familiars || []).filter(f => f && (f.currentHp || 0) > 0).length;
  return living >= 6;
}
