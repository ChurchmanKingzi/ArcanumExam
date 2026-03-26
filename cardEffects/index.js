/**
 * Card Effects Registry
 */

import threeHeadedGiant from './threeHeadedGiant.js';
import anglerAngel from './anglerAngel.js';
import ashWorms from './ashWorms.js';
import bird from './bird.js';
import blueIceDragon from './blueIceDragon.js';
import bombGolems from './bombGolems.js';
import goldenEgg from './goldenEgg.js';
import goldenHind from './goldenHind.js';
import gorgonSister from './gorgonSister.js';
import graveCrawler from './graveCrawler.js';
import bomblebee from './bomblebee.js';
import catMummy from './catMummy.js';
import chillyDog from './chillyDog.js';
import chillyWizzy from './chillyWizzy.js';
import cuteHydra from './cuteHydra.js';
import brainSpider from './brainSpider.js';
import cheekyMonkey from './cheekyMonkey.js';
import corruptedShark from './corruptedShark.js';
import corruptedSiren from './corruptedSiren.js';
import crimsonSkullSpider from './crimsonSkullSpider.js';
import diamondSpider from './diamondSpider.js';
import countryHarpy from './countryHarpy.js';
import cyBee from './cyBee.js';
import doubleHeadedPhoenix from './doubleHeadedPhoenix.js';
import dwarfSmith from './dwarfSmith.js';
import flameFairy from './flameFairy.js';
import gerrymander from './gerrymander.js';
import goblinChief from './goblinChief.js';
import goldenLadybug from './goldenLadybug.js';
import goldenVermin from './goldenVermin.js';
import graveworm from './graveworm.js';
import guardianStatue from './guardianStatue.js';
import hammerHorse from './hammerHorse.js';
import haressassin from './haressassin.js';
import harpy from './harpy.js';
import harpyMetalhead from './harpyMetalhead.js';
import harpyWarrior from './harpyWarrior.js';
import hellDemon from './hellDemon.js';
import hellPup from './hellPup.js';
import hungryOrc from './hungryOrc.js';
import ifrit from './ifrit.js';
import inconspicuousLawnGnome from './inconspicuousLawnGnome.js';
import livingGlacier from './livingGlacier.js';
import mimic from './mimic.js';
import moonlightHawk from './moonlightHawk.js';
import mrSnowman from './mrSnowman.js';
import mummyGuards from './mummyGuards.js';
import pawn from './pawn.js';
import plantGolem from './plantGolem.js';
import reproducingSlime from './reproducingSlime.js';
import royalCorgi from './royalCorgi.js';
import sandyBlob from './sandyBlob.js';
import stuffedTeddy from './stuffedTeddy.js';
import surprisedLion from './surprisedLion.js';
import timeKeeperRabbit from './timeKeeperRabbit.js';
import tinyPhoenix from './tinyPhoenix.js';
import natureFairy from './natureFairy.js';
import leprechaun from './leprechaun.js';
import hungryShark from './hungryShark.js';
import infectedPests from './infectedPests.js';
import jarRats from './jarRats.js';
import landPiranha from './landPiranha.js';
import landSharks from './landSharks.js';
import littleSpooder from './littleSpooder.js';
import manEaterBirds from './manEaterBirds.js';
import moonlightButterfly from './moonlightButterfly.js';
import mountainBoars from './mountainBoars.js';
import nightmare from './nightmare.js';
import oracle from './oracle.js';
import pengu from './pengu.js';
import rappingHarpy from './rappingHarpy.js';
import rainFairy from './rainFairy.js';
import scavengingCrane from './scavengingCrane.js';
import serpentCultist from './serpentCultist.js';
import snobbit from './snobbit.js';
import spawnMother from './spawnMother.js';
import thingInTheHull from './thingInTheHull.js';
import warCyclops from './warCyclops.js';
import werz from './werz.js';
import whiteBull from './whiteBull.js';
import skeletonArcher from './skeletonArcher.js';
import skeletonBard from './skeletonBard.js';
import clone from './clone.js';
import coatl from './coatl.js';
import creationFairy from './creationFairy.js';
import cryingSeagulls from './cryingSeagulls.js';
import skeletonHealer from './skeletonHealer.js';
import skeletonMage from './skeletonMage.js';
import skeletonNecromancer from './skeletonNecromancer.js';
import skeletonPriest from './skeletonPriest.js';
import skeletonReaper from './skeletonReaper.js';
import smugEvilRaccoon from './smugEvilRaccoon.js';
import undeadDesertWorm from './undeadDesertWorm.js';
import unsettlingVulture from './unsettlingVulture.js';
import deepseaIdol from './deepseaIdol.js';
import cuteBunny from './cuteBunny.js';
import cuteFamiliar from './cuteFamiliar.js';
import diamondGolem from './diamondGolem.js';
import eyeballs from './eyeballs.js';
import futuristicMech from './futuristicMech.js';
import greatKingTrex from './greatKingTrex.js';
import greatVanguardDemon from './greatVanguardDemon.js';
import familiarToken from './familiarToken.js';
import helicopterSnowman from './helicopterSnowman.js';
import undeadScorpion from './undeadScorpion.js';
import undurdle from './undurdle.js';
import vengefulGhost from './vengefulGhost.js';
import warhorse from './warhorse.js';
import undeadFish from './undeadFish.js';

const effects = {
  '3-Headed Giant':        threeHeadedGiant,
  'Angler Angel':          anglerAngel,
  'Ash Worms':             ashWorms,
  'Bird':                  bird,
  'Blue-Ice Dragon':       blueIceDragon,
  'Bomb Golems':           bombGolems,
  'Golden Egg':            goldenEgg,
  'Golden Hind':           goldenHind,
  'Gorgon Sister':         gorgonSister,
  'Grave Crawler':         graveCrawler,
  'Bomblebee':             bomblebee,
  'Cat Mummy':             catMummy,
  'Chilly Dog':            chillyDog,
  'Chilly Wizzy':          chillyWizzy,
  'Cute Hydra':            cuteHydra,
  'Brain Spider':          brainSpider,
  'Cheeky Monkey':         cheekyMonkey,
  'Corrupted Shark':       corruptedShark,
  'Corrupted Siren':       corruptedSiren,
  'Crimson Skull Spider':  crimsonSkullSpider,
  'Diamond Spider':        diamondSpider,
  'Country Harpy':         countryHarpy,
  'Cy-Bee':                cyBee,
  'Double-Headed Phoenix': doubleHeadedPhoenix,
  'Dwarf Smith':           dwarfSmith,
  'Flame Fairy':           flameFairy,
  'Gerrymander':           gerrymander,
  'Goblin Chief':          goblinChief,
  'Golden Ladybug':        goldenLadybug,
  'Golden Vermin':         goldenVermin,
  'Graveworm':             graveworm,
  'Guardian Statue':       guardianStatue,
  'Hammer Horse':          hammerHorse,
  'Haressassin':           haressassin,
  'Harp-y':                harpy,
  'Harpy Metalhead':       harpyMetalhead,
  'Harpy Warrior':         harpyWarrior,
  'Hell Demon':            hellDemon,
  'Hell Pup':              hellPup,
  'Hungry Orc':            hungryOrc,
  'Ifrit':                 ifrit,
  'Inconspicuous Lawn Gnome': inconspicuousLawnGnome,
  'Living Glacier':          livingGlacier,
  'Mimic':                   mimic,
  'Moonlight Hawk':          moonlightHawk,
  'Mr. Snowman':             mrSnowman,
  'Mummy Guards':            mummyGuards,
  'Pawn':                    pawn,
  'Plant Golem':             plantGolem,
  'Reproducing Slime':       reproducingSlime,
  'Royal Corgi':             royalCorgi,
  'Sandy Blob':              sandyBlob,
  'Stuffed Teddy':           stuffedTeddy,
  'Surprised Lion':          surprisedLion,
  'Time Keeper Rabbit':      timeKeeperRabbit,
  'Tiny Phoenix':            tinyPhoenix,
  'Nature Fairy':            natureFairy,
  'Leprechaun':              leprechaun,
  'Hungry Shark':          hungryShark,
  'Infected Pests':        infectedPests,
  'Jar Rats':              jarRats,
  'Land Piranha':          landPiranha,
  'Land Sharks':           landSharks,
  'Little Spooder':        littleSpooder,
  'Man-Eater Birds':       manEaterBirds,
  'Moonlight Butterfly':   moonlightButterfly,
  'Mountain Boars':        mountainBoars,
  'Nightmare':             nightmare,
  'Oracle':                oracle,
  'Pengu':                 pengu,
  'Rapping Harpy':         rappingHarpy,
  'Rain Fairy':            rainFairy,
  'Scavenging Crane':      scavengingCrane,
  'Serpent Cultist':       serpentCultist,
  'Snobbit':               snobbit,
  'The Spawn Mother':      spawnMother,
  'Thing in the Hull':     thingInTheHull,
  'War Cyclops':           warCyclops,
  'Werz':                  werz,
  'White Bull':            whiteBull,
  'Skeleton Archer':       skeletonArcher,
  'Skeleton Bard':         skeletonBard,
  'Clone':                 clone,
  'Coatl':                 coatl,
  'Creation Fairy':        creationFairy,
  'Crying Seagulls':       cryingSeagulls,
  'Skeleton Healer':       skeletonHealer,
  'Skeleton Mage':         skeletonMage,
  'Skeleton Necromancer':  skeletonNecromancer,
  'Skeleton Priest':       skeletonPriest,
  'Skeleton Reaper':       skeletonReaper,
  'Smug Evil Raccoon':     smugEvilRaccoon,
  'Undead Desert Worm':    undeadDesertWorm,
  'Unsettling Vulture':    unsettlingVulture,
  'Deepsea Idol':          deepseaIdol,
  'Familiar Token':        familiarToken,
  'Cute Bunny':            cuteBunny,
  'Cute Familiar':         cuteFamiliar,
  'Diamond Golem':         diamondGolem,
  'Eyeballs':              eyeballs,
  'Futuristic Mech':       futuristicMech,
  'Great King Trex':       greatKingTrex,
  'Great Vanguard Demon':  greatVanguardDemon,
  'Helicopter Snowman':    helicopterSnowman,
  'Undead Fish':           undeadFish,
  'Undead Scorpion':       undeadScorpion,
  'Undurdle':              undurdle,
  'Vengeful Ghost':        vengefulGhost,
  'Warhorse':              warhorse,
};

/**
 * Get the activation effect for a familiar, or null if it has none.
 */
export function getFamiliarEffect(familiar, context = {}) {
  // Clone: use originalName for active effect lookup (Clone keeps bard-copy)
  const lookupName = familiar.isClone ? (familiar.originalName || 'Clone') : familiar.name;
  const fn = effects[lookupName];
  if (!fn) return null;
  return fn(familiar, context);
}
