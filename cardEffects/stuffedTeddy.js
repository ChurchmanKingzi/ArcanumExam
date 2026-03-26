/**
 * Stuffed Teddy — Active: Deal 1 damage to any 1 target (except itself).
 * Passive: Opponents cannot target the controller's student with direct
 * damage effects (familiar effects, spells, snares, equips, items).
 * Student attacks and blanket AoE are NOT affected.
 */
export default function stuffedTeddy(familiar, context) {
  return {
    effectType: 'damage-targets',
    targetsNeeded: 1,
    damage: 1,
  };
}
