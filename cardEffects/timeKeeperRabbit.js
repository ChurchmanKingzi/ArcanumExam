/**
 * Time Keeper Rabbit — Active: Add 1 Time Counter to itself (auto-resolve).
 * Passive: Freezes the round counter and all round-end effects while alive.
 * On death (when no other Rabbits exist), releases all stored time at once,
 * incrementing the round counter and triggering all skipped round-end effects.
 */
export default function timeKeeperRabbit(familiar, context) {
  return {
    effectType: 'time-keeper-add-counter',
  };
}
