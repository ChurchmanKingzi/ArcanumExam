/**
 * Golden Apple — Item Card
 *
 * Cost: 0
 * Type: Item (manual play only)
 *
 * Play condition:
 *   At least one opponent must have a living target capable of dealing damage —
 *   a living Student, OR a living Familiar that passes familiarHasDirectDamageEffect.
 *   Tap state is irrelevant (targets can be untapped later).
 *
 * Effect:
 *   The player selects one eligible opponent.
 *   ALL living targets that opponent controls (Student + all living Familiars)
 *   receive 1 "Golden Apple" debuff stack (goldenAppleStacks = 1 per target).
 *
 * Tooltip:
 *   "The next damage a target that opponent controls deals this Round is also
 *    dealt to itself as recoil."
 *
 * Recoil mechanic:
 *   - Tracked via opts.recoilSource in resolveTargetDamage calls.
 *   - When a debuffed target deals ANY damage (attack, on-tap spell, passive,
 *     student spell), the total effective damage of that action is dealt back
 *     to the source target as Item-category damage (opts.goldenAppleRecoil: true).
 *   - Recoil respects protections (Coatl HP floor, Rain's Blessing, Diamond
 *     Golem, etc.) but does NOT trigger another recoil (not a student/familiar
 *     damage event — source is "Item").
 *   - On recoil trigger: ALL living targets of the owner lose 1 stack
 *     (including the triggering target). Stacks bottom at 0.
 *   - End of round: all remaining stacks are cleared via clearAllGoldenAppleStacks().
 *
 * Ineligible via: Copy Device, Heart of Cards (not in POTION_LAUNCHER_INELIGIBLE_ITEMS —
 *   can be played via Potion Launcher normally).
 *
 * NOT reactive — does not fire on student death, no timeout, no pendingXxx state.
 *
 * Server flow:
 *   1. game:playCard → golden-apple-select pendingActivation
 *   2. goldenApple:selectOpponent socket → applies stacks, discards card
 *   3. resolveTargetDamage (opts.recoilSource) → applies recoil on trigger
 */
export const goldenApple = {};
