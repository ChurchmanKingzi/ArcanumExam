/**
 * Snare Effects Registry
 *
 * Maps snare card names to their effect modules.
 * Each module exports:
 *   checkTrigger(trigger, ownerId) => boolean
 *   effect: { type, damage?, ... }
 */

import antiIntruderSystem from './antiIntruderSystem.js';
import antiMagicShield from './antiMagicShield.js';
import antiMagicZone from './antiMagicZone.js';
import arsonTrap from './arsonTrap.js';
import bluff from './bluff.js';
import boilingOil from './boilingOil.js';
import bookTrap from './bookTrap.js';
import bottomlessSandHole from './bottomlessSandHole.js';
import bounceTrap from './bounceTrap.js';
import bucketPrank from './bucketPrank.js';
import captureNet from './captureNet.js';
import creepyClownInTheBox from './creepyClownInTheBox.js';
import crimsonWeb from './crimsonWeb.js';
import crystalWell from './crystalWell.js';
import deceptiveMelody from './deceptiveMelody.js';
import difficultyLever from './difficultyLever.js';
import divinePunishment from './divinePunishment.js';
import doomClock from './doomClock.js';
import eclipse from './eclipse.js';
import explodingDoor from './explodingDoor.js';
import explosiveDrone from './explosiveDrone.js';
import fireAllCannons from './fireAllCannons.js';
import friendlyFireball from './friendlyFireball.js';
import frostRune from './frostRune.js';
import ghostlyWarning from './ghostlyWarning.js';
import giftOfDeath from './giftOfDeath.js';
import glassWall from './glassWall.js';
import hotPotato from './hotPotato.js';
import icyGrave from './icyGrave.js';
import induceFear from './induceFear.js';
import invertedLevitation from './invertedLevitation.js';
import jumpscare from './jumpscare.js';
import jungleMoat from './jungleMoat.js';
import kidnapping from './kidnapping.js';
import lastSecondEscape from './lastSecondEscape.js';
import letterOfLies from './letterOfLies.js';
import magicMirror from './magicMirror.js';
import overchargedTrap from './overchargedTrap.js';
import overhealShock from './overhealShock.js';
import pillagedHouse from './pillagedHouse.js';
import pointBlankAnnihilation from './pointBlankAnnihilation.js';
import potionOfGreed from './potionOfGreed.js';
import powderKeg from './powderKeg.js';
import rainOfArrows from './rainOfArrows.js';
import reflection from './reflection.js';
import reversePrism from './reversePrism.js';
import reverseTrap from './reverseTrap.js';
import rollingBoulder from './rollingBoulder.js';
import boobyTrap from './boobyTrap.js';
import fleshEaterSwarmTrap from './fleshEaterSwarmTrap.js';
import poisonedMeat from './poisonedMeat.js';
import skullBombTrap from './skullBombTrap.js';
import skullCarpetBombing from './skullCarpetBombing.js';
import slipperyIce from './slipperyIce.js';
import spacialCrevice from './spacialCrevice.js';
import spiderAvalanche from './spiderAvalanche.js';
import spikeTrap from './spikeTrap.js';
import surpriseParty from './surpriseParty.js';
import theStinkPile from './theStinkPile.js';
import toxicTrap from './toxicTrap.js';
import treasury from './treasury.js';
import uncoolMalfunction from './uncoolMalfunction.js';
import unreasonableAnger from './unreasonableAnger.js';
import volcanicRiver from './volcanicRiver.js';
import woodenHorse from './woodenHorse.js';

const snareEffects = {
  'Anti Intruder System': antiIntruderSystem,
  'Anti Magic Shield': antiMagicShield,
  'Anti Magic Zone': antiMagicZone,
  'Arson Trap': arsonTrap,
  'Bluff': bluff,
  'Boiling Oil': boilingOil,
  'Book Trap': bookTrap,
  'Bottomless Sand Hole': bottomlessSandHole,
  'Bounce Trap': bounceTrap,
  'Bucket Prank': bucketPrank,
  'Capture Net': captureNet,
  'Creepy Clown in the Box': creepyClownInTheBox,
  'Crimson Web': crimsonWeb,
  'Crystal Well': crystalWell,
  'Deceptive Melody': deceptiveMelody,
  'Difficulty Lever': difficultyLever,
  'Divine Punishment': divinePunishment,
  'Doom Clock': doomClock,
  'Eclipse': eclipse,
  'Exploding Door': explodingDoor,
  'Explosive Drone': explosiveDrone,
  'Fire all Cannons': fireAllCannons,
  'Friendly Fireball': friendlyFireball,
  'Frost Rune': frostRune,
  'Ghostly Warning': ghostlyWarning,
  'Gift of Death': giftOfDeath,
  'Glass Wall': glassWall,
  'Hot Potato': hotPotato,
  'Icy Grave': icyGrave,
  'Induce Fear': induceFear,
  'Inverted Levitation': invertedLevitation,
  'Jumpscare': jumpscare,
  'Jungle Moat': jungleMoat,
  'Kidnapping': kidnapping,
  'Last Second Escape': lastSecondEscape,
  'Letter of Lies': letterOfLies,
  'Magic Mirror': magicMirror,
  'Overcharged Trap': overchargedTrap,
  'Overheal Shock': overhealShock,
  'Pillaged House': pillagedHouse,
  'Point-Blank Annihilation': pointBlankAnnihilation,
  'Potion of Greed': potionOfGreed,
  'Powder Keg': powderKeg,
  'Rain of Arrows': rainOfArrows,
  'Reflection': reflection,
  'Reverse Prism': reversePrism,
  'Reverse Trap': reverseTrap,
  'Rolling Boulder': rollingBoulder,
  'Skull Bomb Trap': skullBombTrap,
  'Skull Carpet Bombing': skullCarpetBombing,
  'Slippery Ice': slipperyIce,
  'Spacial Crevice': spacialCrevice,
  'Spider Avalanche': spiderAvalanche,
  'Spike Trap': spikeTrap,
  'Surprise Party': surpriseParty,
  'The Stink Pile': theStinkPile,
  'Booby Trap': boobyTrap,
  'Flesh-Eater Swarm Trap': fleshEaterSwarmTrap,
  'Poisoned Meat': poisonedMeat,
  'Toxic Trap': toxicTrap,
  'Treasury': treasury,
  'Uncool Malfunction': uncoolMalfunction,
  'Unreasonable Anger': unreasonableAnger,
  'Volcanic River': volcanicRiver,
  'Wooden Horse': woodenHorse,
};

/**
 * Get the snare effect module for a snare card, or null.
 */
export function getSnareEffect(snareName) {
  return snareEffects[snareName] || null;
}
