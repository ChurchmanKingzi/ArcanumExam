/**
 * Blue-Ice Dragon — Attacks 1 target for damage equal to
 * the total number of all permanent cards on the board.
 */
export default function blueIceDragon(familiar, context) {
  const totalCards = context.countBoardCards ? context.countBoardCards(context.room) : 0;
  return {
    targetsNeeded: 1,
    damage: totalCards,
    minLivingTargets: 1,
  };
}
