/**
 * Cool Cheese — Equip
 *
 * Trigger: Student attack hits a target (same trigger as Nerdy Cheese).
 *
 * Effect: The controlling player is immediately prompted (uncancellable,
 * reconnect-persistent) to select one of their own alive targets (student
 * or familiar). That target gains +1 stack of "taunting".
 *
 * Taunting mechanic:
 * - While a player has at least 1 taunting target, opponents MUST target
 *   a taunting target with their attacks/effects, unless the taunting
 *   target is not a viable target for that specific effect.
 * - Opponents can choose freely between multiple taunting targets.
 * - The restriction does NOT apply to the controlling player's own actions.
 * - Self-hits by the controlling player do NOT consume taunting stacks.
 *
 * Stack removal:
 * - When an opponent's attack or effect hits a taunting target, that target
 *   loses 1 stack of taunting.
 * - "Hit" includes ANY targeting effect: damage, heal, poison, exhaust,
 *   charm, bounce, delete, energize, etc.
 *
 * End of Round:
 * - All taunting stacks on all targets are removed just before proctor
 *   approvals and escape conditions.
 *
 * Interaction with Cool Cheese + Nerdy Cheese:
 * - Cool Cheese prompt fires first (simple forced pick), then Nerdy Cheese.
 *
 * Implementation: Passive marker equip. Logic lives in server.js.
 * Key functions: hasCoolCheese(), setupCoolCheesePrompt(),
 *   validateTauntingRestriction(), consumeTauntingStacks()
 * Key data: target.taunting (stack count), room.pendingCoolCheese
 */
export const coolCheese = {
  name: 'Cool Cheese',
  // Passive marker — all logic handled in server.js attack resolution
};
