/**
 * Living Glacier — Active (tap): Deal 15 damage to a single target.
 *
 * Passive (server-side): When Living Glacier dies or is deleted/expelled,
 * all remaining turns are skipped and the round ends immediately.
 */
export default function livingGlacier(familiar, context) {
  return {
    effectType: 'damage-targets',
    targetsNeeded: 1,
    damage: 15,
  };
}
