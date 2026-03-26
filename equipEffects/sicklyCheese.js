/**
 * Sickly Cheese — Equip
 *
 * Trigger: Student basic attack hits any target.
 *
 * Effect: Each surviving target hit by the attack gains 1 stack of Poison.
 * Poison deals 5 damage per stack at the end of each round.
 *
 * Does NOT trigger on Nerdy Cheese bonus spell casts.
 *
 * Implementation: Passive marker equip. Logic lives in server.js attack resolution.
 * Key function: hasSicklyCheese()
 */
export const sicklyCheese = {
  name: 'Sickly Cheese',
  // Passive marker — all logic handled in server.js attack resolution
};
