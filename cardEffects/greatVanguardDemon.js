/**
 * Great Vanguard Demon
 *
 * Active (tap): Deal damage equal to 2× the number of Familiars
 * the active player controls to a single target. Identical to Hell Demon.
 *
 * Passive (handled in server.js via getVanguardDemonBonus()):
 * For each Great Vanguard Demon a player controls, all damage dealt
 * by the player's OTHER Familiars' effects is increased by the number
 * of Familiars the player controls.
 */
import hellDemon from './hellDemon.js';

export default function greatVanguardDemon(familiar, context) {
  return hellDemon(familiar, context);
}
