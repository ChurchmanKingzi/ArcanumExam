/**
 * Golden Egg — Active: Gain 1 Hatch Counter on itself (then taps).
 * Passive (server-side): At end of every round, prompt owner to hatch.
 *   Hatching kills Golden Egg and replaces it with a Familiar from hand/discard
 *   whose cost ≤ hatchCounters. Replacement is summoned tapped at no cost.
 */
export default function goldenEgg(familiar) {
  return {
    effectType: 'golden-egg-incubate',
  };
}
