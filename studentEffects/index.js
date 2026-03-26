/**
 * Student Effects Registry
 *
 * Each student effect module can export:
 *   activeEffect(student, context)    → effect descriptor or null
 *   escapeCondition(player, room)     → boolean
 */

import * as theBandKid from './theBandKid.js';
import * as theCaretaker from './theCaretaker.js';
import * as theClassClown from './theClassClown.js';
import * as theEmo from './theEmo.js';
import * as theNerd from './theNerd.js';
import * as theSchoolIdol from './theSchoolIdol.js';
import * as theAverageStudent from './theAverageStudent.js';
import * as theBuffoon from './theBuffoon.js';
import * as theChuunibyou from './theChuunibyou.js';
import * as theClassPet from './theClassPet.js';
import * as theClassRep from './theClassRep.js';
import * as theCoolKid from './theCoolKid.js';
import * as theEdgelord from './theEdgelord.js';
import * as theGamer from './theGamer.js';
import * as theLoner from './theLoner.js';
import * as theProdigy from './theProdigy.js';
import * as theRowdy from './theRowdy.js';
import * as theShyGirl from './theShyGirl.js';
import * as theTeachersAgent from './theTeachersAgent.js';
import * as theTransferStudent from './theTransferStudent.js';

const effects = {
  'The Band Kid': theBandKid,
  'The Caretaker': theCaretaker,
  'The Class Clown': theClassClown,
  'The Emo': theEmo,
  'The Nerd': theNerd,
  'The School Idol': theSchoolIdol,
  'The Average Student': theAverageStudent,
  'The Buffoon': theBuffoon,
  'The Chuunibyou': theChuunibyou,
  'The Class Pet': theClassPet,
  'The Class Rep': theClassRep,
  'The Cool Kid': theCoolKid,
  'The Edgelord': theEdgelord,
  'The Gamer': theGamer,
  'The Loner': theLoner,
  'The Prodigy': theProdigy,
  'The Rowdy': theRowdy,
  'The Shy Girl': theShyGirl,
  'The Teachers Agent': theTeachersAgent,
  'The Transfer Student': theTransferStudent,
};

/**
 * Get the active effect for a student, or null if it has none.
 */
export function getStudentActiveEffect(student, context = {}) {
  const entry = effects[student.name];
  if (!entry || !entry.activeEffect) return null;
  return entry.activeEffect(student, context);
}

/**
 * Preview which players would win via escape condition right now.
 * Includes both round-end AND instant conditions.
 * Returns a Set of playerIds. Does NOT modify any state.
 */
export function previewEscapeConditions(room) {
  const ready = new Set();
  for (const [pid, player] of room.players) {
    if (player.left || player.won || player.studentDead) continue;
    if (!player.chosenStudent) continue;

    // Portal override: use the target student's escape condition instead
    const escapeName = player.portalEscapeOverride || player.chosenStudent.name;
    const entry = effects[escapeName];
    if (!entry) continue;

    // Use preview-specific function if available for round-end escapes,
    // otherwise fall back to the live escapeCondition
    // Skip if escape condition permanently negated (Divine Punishment) or Stinky
    if (!player.escapeConditionNegated && !player.stinky) {
      if (entry.previewEscapeCondition) {
        if (entry.previewEscapeCondition(player, room)) ready.add(pid);
      } else if (entry.escapeCondition && entry.escapeCondition(player, room)) {
        ready.add(pid);
      }
    }
    // Instant escape: always use the player's actual student (Portal doesn't override instant escapes)
    const instantEntry = effects[player.chosenStudent.name];
    // Use preview-specific function if available (can account for pending approvals),
    // otherwise fall back to the live instantEscapeCondition
    if (instantEntry?.previewInstantEscapeCondition) {
      if (instantEntry.previewInstantEscapeCondition(player, room)) ready.add(pid);
    } else if (instantEntry?.instantEscapeCondition && instantEntry.instantEscapeCondition(player, room)) {
      ready.add(pid);
    }
  }
  return ready;
}

/**
 * Check INSTANT escape conditions (e.g. The Nerd's approval lead).
 * Called wherever proctor approvals or other triggers change.
 * Returns array of { playerId, playerName } for newly winning players.
 */
export function checkInstantEscapeConditions(room) {
  const candidates = [];
  for (const [pid, player] of room.players) {
    if (player.left || player.won || player.studentDead) continue;
    if (!player.chosenStudent) continue;

    const entry = effects[player.chosenStudent.name];
    if (!entry || !entry.instantEscapeCondition) continue;

    if (entry.instantEscapeCondition(player, room)) {
      candidates.push(pid);
    }
  }

  const newWinners = [];
  for (const pid of candidates) {
    const player = room.players.get(pid);
    if (!player) continue;
    player.won = true;
    room.winners.push(pid);
    player.chosenStudent = null;
    player.tappedStudent = true;
    player.discardPile.push(...(player.equips || []));
    player.equips = [];
    newWinners.push({ playerId: pid, playerName: player.name });
    console.log(`🎉 ${player.name} WINS via Instant Escape Condition!`);
  }
  return newWinners;
}

/**
 * Check escape conditions for all non-won, non-dead, non-summoned students.
/**
 * Preview which players WOULD win by regular escape conditions, read-only.
 * Skips players with escapeConditionNegated (Divine Punishment).
 * Returns array of { playerId, playerName }.
 */
export function previewRegularEscapeWinners(room) {
  const wouldWin = [];
  for (const [pid, player] of room.players) {
    if (player.left || player.won || player.studentDead) continue;
    if (!player.chosenStudent) continue;
    if (player.escapeConditionNegated) continue;
    if (player.stinky) continue; // The Stink Pile
    const escapeName = player.portalEscapeOverride || player.chosenStudent.name;
    const entry = effects[escapeName];
    if (!entry || !entry.escapeCondition) continue;
    if (entry.escapeCondition(player, room)) {
      wouldWin.push({ playerId: pid, playerName: player.name });
    }
  }
  return wouldWin;
}

/**
 * Check escape conditions for all non-won, non-dead, non-summoned students.
 * Returns array of { playerId, playerName } for newly winning players.
 */
export function checkEscapeConditions(room) {
  // First pass: evaluate all conditions WITHOUT modifying state
  const candidates = [];
  for (const [pid, player] of room.players) {
    if (player.left || player.won || player.studentDead) continue;
    if (!player.chosenStudent) continue;
    if (player.escapeConditionNegated) continue; // Divine Punishment
    if (player.stinky) continue; // The Stink Pile
    const escapeName = player.portalEscapeOverride || player.chosenStudent.name;
    const entry = effects[escapeName];
    if (!entry || !entry.escapeCondition) continue;

    if (entry.escapeCondition(player, room)) {
      candidates.push(pid);
    }
  }

  // Second pass: apply wins
  const newWinners = [];
  for (const pid of candidates) {
    const player = room.players.get(pid);
    if (!player) continue;
    player.won = true;
    room.winners.push(pid);
    // Remove student from game (same as proctor approval win)
    player.chosenStudent = null;
    player.tappedStudent = true;
    // Discard their equips
    player.discardPile.push(...(player.equips || []));
    player.equips = [];
    newWinners.push({ playerId: pid, playerName: player.name });
    console.log(`🎉 ${player.name} WINS via Escape Condition!`);
  }
  return newWinners;
}
