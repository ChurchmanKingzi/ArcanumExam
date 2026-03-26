/**
 * Spiky Armor — Passive equip effect (damage reduction + attack counter).
 *
 * 1. DAMAGE REDUCTION: Reduces all incoming student damage by 4 (minimum 1),
 *    applied after Protective Shadow / Diver Helmet / Rain's Blessing / Spice Mortar,
 *    alongside Basic Armor (both stack independently).
 *    Multiple Spiky Armors each reduce by 4 (i.e. 2 armors = -8, min 1).
 *
 * 2. ATTACK COUNTER: When the student is hit specifically by an ATTACK
 *    (damageCategory === 'attack'), after damage resolution, for each copy
 *    of Spiky Armor, queue one uncancellable destroy-equip prompt (like Fire Bomb)
 *    if any Equips are on the board. Prompts fire consecutively.
 *    If no Equips are on the board for a given prompt, that copy fizzles.
 *
 * Logic in server.js:
 *   - hasSpikArmor(player) / countSpikyArmors(player)
 *   - resolveTargetDamage(): -4 reduction, collect _spikyArmorCandidates
 *     (only when opts.damageCategory === 'attack')
 *   - drainSpikyArmorCandidates(room, afterFn)
 *   - processNextSpikyArmor(room) — sets PA effectType: 'destroy-equip',
 *     sourceType: 'equip-spiky-armor', canCancel: false
 *   - familiar:destroyEquip — handles equip-spiky-armor source type
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
