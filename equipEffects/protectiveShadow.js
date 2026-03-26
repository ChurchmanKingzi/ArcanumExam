/**
 * Protective Shadow — Passive equip effect.
 *
 * While equipped: any damage the equipped Student takes from any source
 * is halved (rounded up, Math.ceil(dmg / 2)) before other reductions apply.
 *
 * Priority: Protective Shadow fires BEFORE Weakening Crystal gets a chance
 * to react — WC owners see the already-halved value. For damage sources that
 * bypass the WC chain entirely, halving is applied at the top of the student
 * damage block inside resolveTargetDamage (guarded by t._psApplied to prevent
 * double-application on the WC path).
 *
 * Logic handled in server.js:
 *   - hasProtectiveShadow(player) — check helper
 *   - startWeakeningCrystalChain() — pre-halves damage before WC prompt,
 *     sets t._psApplied on affected student targets
 *   - resolveTargetDamage() — applies halving for WC-skipped paths
 *     (checks t._psApplied to avoid double-application)
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
