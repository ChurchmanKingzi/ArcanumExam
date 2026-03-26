/**
 * Pawn — Active: Deal 4 damage to any one target.
 * Passive: Counts as 2 Familiars for effects that count Familiar numbers
 * (Graveworm, Hell Demon, Great Vanguard Demon, The Familiar Trainer).
 */
export default function pawn(familiar, context) {
  return {
    effectType: 'damage-targets',
    targetsNeeded: 1,
    damage: 4,
  };
}
