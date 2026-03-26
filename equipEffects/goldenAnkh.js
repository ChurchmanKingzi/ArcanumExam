/**
 * Golden Ankh — Reactive Item
 *
 * Triggers automatically when the holder's Student would die (after Guardian Angel,
 * after Elixir of Immortality). Player is prompted to use it; if accepted, the Student
 * is revived at 1 HP.
 *
 * Key difference from Elixir of Immortality:
 *   - The Student ACTUALLY dies first, then is revived. Death-trigger effects (kill
 *     bonuses, death counters, Cool Kid, etc.) all fire as normal.
 *   - roundDeathCount is NOT decremented on revival.
 *   - HP restored to 1 (not 20).
 *   - Cost: 0 (no payment cards required).
 *
 * Priority order: Guardian Angel (auto) → Elixir of Immortality → Golden Ankh
 * If a player holds both Elixir and Ankh, Elixir is prompted first.
 * If Elixir is used, Ankh prompt is skipped (student no longer dead).
 *
 * Always ineligible for Potion Launcher, Copy Device, Heart of Cards.
 * Never manually playable — grayed out in hand at all times.
 */
export const goldenAnkh = {
  name: 'Golden Ankh',
  type: 'Item',
  reactive: true,
  effect: null, // resolved entirely in server.js (pendingAnkh system)
};
