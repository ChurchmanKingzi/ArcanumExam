/**
 * Control Device — Passive equip effect.
 *
 * At the start of every Round (before Snare prep, before Harpy Warrior guard
 * selection, before all other start-of-round effects), the equipped student's
 * owner is prompted to select any opponent's living Familiar that is not
 * protected by Class Pet or Futuristic Mech immunity.
 *
 * That Familiar is moved to the owner's side of the board for the duration
 * of the round. The Familiar remembers its original owner via
 * familiar.controlDeviceOriginalOwner (never overwritten by subsequent steals,
 * so chain-stealing works correctly).
 *
 * At the very start of end-of-round procedures, all stolen Familiars are
 * automatically returned to their original owners.
 *
 * If a stolen Familiar dies while under the thief's control, it goes to the
 * thief's discard pile (natural — death always goes to current board owner).
 *
 * Logic handled in server.js via:
 *   buildControlDeviceQueue(), processControlDeviceQueue(),
 *   enterControlDevicePhase(), applyControlDeviceSteal(),
 *   returnControlDeviceFamiliars()
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
