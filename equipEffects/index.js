/**
 * Equip Effects Registry
 *
 * Maps equip card names to their trigger modules.
 * Each module exports:
 *   onDestroyed: boolean — triggers when equip is destroyed
 *   onReturnedToHand: boolean — triggers when equip is returned to hand
 *   effect: { type, ... }
 */

import barbarianSword from './barbarianSword.js';
import barrelHome from './barrelHome.js';
import basicArmor from './basicArmor.js';
import bazooka from './bazooka.js';
import bombArrow from './bombArrow.js';
import charmOfBalance from './charmOfBalance.js';
import controlDevice from './controlDevice.js';
import controlMonitors from './controlMonitors.js';
import { crystalBallEffect } from './crystalBall.js';
import { doomsdayBombEffect } from './doomsdayBomb.js';
import { edgyCloakEffect } from './edgyCloak.js';
import { fieldStandardEffect } from './fieldStandard.js';
import { frozenScytheEffect } from './frozenScythe.js';
import { futureTechLampEffect } from './futureTechLamp.js';
import { giantHammerEffect } from './giantHammer.js';
import { gravediggersShovelEffect } from './gravediggersShovel.js';
import { guardianAngelEffect } from './guardianAngel.js';
import { halberdEffect } from './halberd.js';
import { hatOfMadnessEffect } from './hatOfMadness.js';
import rainViola from './rainViola.js';
import stormPiano from './stormPiano.js';
import thunderTrumpet from './thunderTrumpet.js';
import angryCheese from './angryCheese.js';
import antiMagicBlade from './antiMagicBlade.js';
import berserkMode from './berserkMode.js';
import cuteCheese from './cuteCheese.js';
import diverHelmet from './diverHelmet.js';
import forbiddenGrimoire from './forbiddenGrimoire.js';
import holyCheese from './holyCheese.js';
import magicModifier from './magicModifier.js';
import manaAbsorbingCrystal from './manaAbsorbingCrystal.js';
import nerdyCheese from './nerdyCheese.js';
import { coolCheese } from './coolCheese.js';
import { sicklyCheese } from './sicklyCheese.js';
import angelwingBackpack from './angelwingBackpack.js';
import antiMagnet from './antiMagnet.js';
import antiMagneticArmor from './antiMagneticArmor.js';
import balloons from './balloons.js';
import heartBow from './heartBow.js';
import heartOfIce from './heartOfIce.js';
import invisibilityCloak from './invisibilityCloak.js';
import jetpack from './jetpack.js';
import lifeforceHowitzer from './lifeforceHowitzer.js';
import literalCannon from './literalCannon.js';
import mechanizedFists from './mechanizedFists.js';
import mineCart from './mineCart.js';
import phantomsSword from './phantomsSword.js';
import pickaxe from './pickaxe.js';
import playingCards from './playingCards.js';
import possessedBlade from './possessedBlade.js';
import potionLauncher from './potionLauncher.js';
import bottledFlame from './bottledFlame.js';
import bottledLightning from './bottledLightning.js';
import burnedContract from './burnedContract.js';
import copyDevice from './copyDevice.js';
import gigaSteroids from './gigaSteroids.js';
import glassOfMarbles from './glassOfMarbles.js';
import { goldenAnkh } from './goldenAnkh.js';
import { goldenApple } from './goldenApple.js';
import protectiveShadow from './protectiveShadow.js';
import rocketFist from './rocketFist.js';
import scimitar from './scimitar.js';
import shieldOfDeath from './shieldOfDeath.js';
import shieldOfLife from './shieldOfLife.js';
import sinisterIdol from './sinisterIdol.js';
import skeletonKingsSword from './skeletonKingsSword.js';
import spikyArmor from './spikyArmor.js';
import stormBlade from './stormBlade.js';
import summoningCircle from './summoningCircle.js';
import swordOfTheChosenOne from './swordOfTheChosenOne.js';
import thawBlade from './thawBlade.js';
import theSunSword from './theSunSword.js';
import wantedPoster from './wantedPoster.js';
import wingedCrown from './wingedCrown.js';

const equipEffects = {
  'Barbarian Sword': barbarianSword,
  'Barrel Home': barrelHome,
  'Basic Armor': basicArmor,
  'Bazooka': bazooka,
  'Bomb Arrow': bombArrow,
  'Charm of Balance': charmOfBalance,
  'Control Device': controlDevice,
  'Control Monitors': controlMonitors,
  'Crystal Ball': crystalBallEffect,
  'Doomsday Bomb': doomsdayBombEffect,
  'Edgy Cloak': edgyCloakEffect,
  'Field Standard': fieldStandardEffect,
  'Frozen Scythe': frozenScytheEffect,
  'Future Tech Lamp': futureTechLampEffect,
  'Giant Hammer': giantHammerEffect,
  'Gravediggers Shovel': gravediggersShovelEffect,
  'Guardian Angel': guardianAngelEffect,
  'Halberd': halberdEffect,
  'Hat of Madness': hatOfMadnessEffect,
  'Rain Viola': rainViola,
  'Storm Piano': stormPiano,
  'Thunder Trumpet': thunderTrumpet,
  'Angry Cheese': angryCheese,
  'Angelwing Backpack': angelwingBackpack,
  'Anti-Magnet': antiMagnet,
  'Anti-Magnetic Armor': antiMagneticArmor,
  'Anti-Magic Blade': antiMagicBlade,
  'Balloons': balloons,
  'Berserk Mode': berserkMode,
  'Cool Cheese': coolCheese,
  'Sickly Cheese': sicklyCheese,
  'Cute Cheese': cuteCheese,
  'Diver Helmet': diverHelmet,
  'Forbidden Grimoire': forbiddenGrimoire,
  'Holy Cheese': holyCheese,
  'Magic Modifier': magicModifier,
  'Mana Absorbing Crystal': manaAbsorbingCrystal,
  'Nerdy Cheese': nerdyCheese,
  'Heart Bow': heartBow,
  'Heart of Ice': heartOfIce,
  'Invisibility Cloak': invisibilityCloak,
  'Jetpack': jetpack,
  'Lifeforce Howitzer': lifeforceHowitzer,
  'Literal Cannon': literalCannon,
  'Mechanized Fists': mechanizedFists,
  'Mine Cart': mineCart,
  'Phantoms Sword': phantomsSword,
  'Pickaxe': pickaxe,
  'Playing Cards': playingCards,
  'Possessed Blade': possessedBlade,
  'Potion Launcher': potionLauncher,
  'Bottled Flame': bottledFlame,
  'Bottled Lightning': bottledLightning,
  'Burned Contract': burnedContract,
  'Copy Device': copyDevice,
  'Giga Steroids': gigaSteroids,
  'Glass of Marbles': glassOfMarbles,
  'Golden Ankh': goldenAnkh,
  'Golden Apple': goldenApple,
  'Protective Shadow': protectiveShadow,
  'Rocket Fist': rocketFist,
  'Scimitar': scimitar,
  'Shield of Death': shieldOfDeath,
  'Shield of Life': shieldOfLife,
  'Sinister Idol': sinisterIdol,
  'Skeleton Kings Sword': skeletonKingsSword,
  'Spiky Armor': spikyArmor,
  'The Storm Blade': stormBlade,
  'Summoning Circle': summoningCircle,
  'Sword of the Chosen One': swordOfTheChosenOne,
  'Thaw Blade': thawBlade,
  'The Sun Sword': theSunSword,
  'Wanted Poster': wantedPoster,
  'Winged Crown': wingedCrown,
};

/**
 * Get the equip effect module for an equip card, or null.
 */
export function getEquipEffect(equipName) {
  return equipEffects[equipName] || null;
}
