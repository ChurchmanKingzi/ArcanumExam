/**
 * Royal Corgi — Active: Apply "Royalty" debuff to ALL opponents.
 * Each Royalty stack increases all card costs by +2 (applied before decreases).
 * Debuffs clear on payment or at end of round.
 * Passive: None (debuff IS the passive pressure).
 */
export default function royalCorgi(familiar, context) {
  return {
    effectType: 'royal-corgi-debuff',
  };
}
