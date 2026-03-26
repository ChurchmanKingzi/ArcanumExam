/**
 * Plant Golem — Active: Deal 10 damage to itself (boosted by Leprechaun/Vanguard,
 * reduced by Rain's Blessing/Nature Fairy/etc.).
 * Passive: Prevents ALL players from casting Spells with their students.
 * Familiars like Chilly Wizzy and Skeleton Bard can still cast.
 */
export default function plantGolem(familiar, context) {
  return {
    effectType: 'plant-golem-self-damage',
    damage: 10,
    passiveEffect: true,
  };
}
