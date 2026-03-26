/**
 * Brain Spider — Distracts a Proctor until the end of the following round.
 * The distracted Proctor's approvals don't count toward winning.
 */
export default function brainSpider(familiar, context) {
  return {
    effectType: 'proctor-distract',
  };
}
