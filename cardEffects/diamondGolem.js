/**
 * Diamond Golem
 *
 * Active (tap): Deal 8 damage to 1 target.
 *
 * Passive (handled in server.js / resolveTargetDamage + poison):
 * While a player controls at least 1 alive Diamond Golem, any damage
 * their Familiars with cost ≤ 1 would take becomes 0.
 */
export default function diamondGolem(familiar, context) {
  return {
    effectType: 'damage-targets',
    targetsNeeded: 1,
    damage: 8,
  };
}
