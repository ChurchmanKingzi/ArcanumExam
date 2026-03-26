/**
 * Bottled Lightning — Item.
 *
 * Eligible only when ≥1 opponent has 2+ targetable living targets.
 * Eligible targets: alive, not Golden Hind. Students also blocked by Angelwing Backpack.
 *
 * Flow:
 *   1. Caster selects 2 targets from the SAME opponent (effectType 'bottled-lightning-pick').
 *   2. That opponent selects 1 target the caster controls (room.pendingBottledLightning, phase 'opponent-pick').
 *      → Fizzles silently if no valid caster targets exist.
 *   3. Lightning animation: caster's student → target1 → target2 → counterTarget (if any).
 *      Each bolt resolves 5 damage when it lands (bottledLightning:boltLanded).
 *
 * Server state: room.pendingBottledLightning = {
 *   casterId, casterName, opponentId, opponentName,
 *   target1: { playerId, type, familiarIndex },
 *   target2: { playerId, type, familiarIndex },
 *   counterTarget: { playerId, type, familiarIndex } | null,
 *   phase: 'opponent-pick' | 'animate',
 *   boltIndex: 0 | 1 | 2,
 *   potionLauncherAfterFn: fn | null,
 *   itemEffect: bool,
 * }
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: false,
  effect: null,
};
