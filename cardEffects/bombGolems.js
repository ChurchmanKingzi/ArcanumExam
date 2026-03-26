/**
 * Bomb Golems — Active: At 2+ counters, deal 30 damage to 1 target, then self-destructs.
 * At <2 counters, taps for no effect.
 * Passive: Gains 1 counter at the end of every round (server-side).
 */
export default function bombGolems(familiar, context) {
  if ((familiar.bombCounters || 0) < 2) {
    return {
      effectType: 'bomb-golems-dormant',
    };
  }

  return {
    effectType: 'damage-targets',
    damage: 30,
    targetsNeeded: 1,
    selfDestroyAfter: true,
  };
}
