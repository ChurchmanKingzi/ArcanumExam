/**
 * White Bull — When tapped, all other targets the owner controls
 * receive damage redirection: any damage they would take is fully
 * redirected to White Bull for the rest of the round.
 * Excess damage beyond lethal is absorbed. Works even on AoE.
 */
export default function whiteBull(familiar, context) {
  return {
    effectType: 'white-bull',
  };
}
