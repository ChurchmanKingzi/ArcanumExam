/**
 * Spell Registry — Declarative definitions for targeting spells.
 *
 * Each entry replaces 5–6 scattered insertion points in server.js:
 *   • holdPayment list           → SPELL_REGISTRY.has(card.name)
 *   • game:playCard if-block     → generic handler calls setup()
 *   • resolveSpellEffect block   → generic handler calls setup()
 *   • cancel handler             → single generic pa.spellEffect check
 *   • isSpellCastable block      → castable() if defined
 *
 * To add a new targeting spell:
 *   1. Add a SPELL_REGISTRY entry here
 *   2. Add a socket confirm handler in server.js (the unique part)
 *   3. Add client-side targeting mode + UI in game.js (effectType-specific)
 *
 * Fields:
 *   effectType      — The targeting mode identifier (sent to client)
 *   logEmoji        — Console log prefix emoji
 *   gerrymanderable — Whether Gerrymander can redirect this spell's target
 *   castable(ctx)   — Optional. Returns false if spell can't be cast (used by
 *                      Chilly Wizzy passive to filter). Receives { room, player }.
 *   setup(ctx)      — Returns pendingActivation fields (merged with boilerplate),
 *                      or null if the spell should fizzle. Receives { room, playerId, player }.
 *   fizzleError     — Optional. Error message if precondition fails in setup (sent to client).
 */

const SPELL_REGISTRY = new Map();

// ── Burning Finger ──────────────────────────────────────────────────────
SPELL_REGISTRY.set('Burning Finger', {
  singleTargetDamage: true,
  effectType: 'burning-finger-target',
  logEmoji: '🔥',
  gerrymanderable: true,
  setup: () => ({
    targetsNeeded: 1,
    damage: 10,
  }),
});

// ── Energy Drain ────────────────────────────────────────────────────────
SPELL_REGISTRY.set('Energy Drain', {
  singleTargetDamage: true,
  effectType: 'energy-drain-target',
  logEmoji: '🟢',
  gerrymanderable: true,
  setup: () => ({
    targetsNeeded: 1,
    damage: 6,
    healAmount: 6,
    excludeSelfStudent: true,
  }),
});

// ── Energy Beam (two-phase: caster selects opponent → opponent picks own target) ─
SPELL_REGISTRY.set('Energy Beam', {
  effectType: 'energy-beam-select',
  logEmoji: '⚡',
  gerrymanderable: false,
  castable: ({ room }) => {
    let count = 0;
    for (const [, p] of room.players) {
      if (p.left) continue;
      if ((p.chosenStudent && !p.studentDead) || (p.familiars || []).some(f => f.currentHp > 0)) {
        count++;
        if (count >= 2) return true;
      }
    }
    return false;
  },
  setup: ({ room, playerId }) => {
    for (const [pid, p] of room.players) {
      if (pid === playerId || p.left) continue;
      if ((p.chosenStudent && !p.studentDead) || (p.familiars || []).some(f => f.currentHp > 0)) {
        return { damage: 12 };
      }
    }
    return null; // fizzle
  },
});

// ── Cure ────────────────────────────────────────────────────────────────
SPELL_REGISTRY.set('Cure', {
  effectType: 'cure-target',
  logEmoji: '💊',
  gerrymanderable: true,
  setup: () => ({
    targetsNeeded: 1,
  }),
});

// ── Serpent Lords Bite ──────────────────────────────────────────────────
SPELL_REGISTRY.set('Serpent Lords Bite', {
  effectType: 'serpent-bite-target',
  logEmoji: '🐍',
  gerrymanderable: true,
  setup: () => ({
    targetsNeeded: 1,
    poisonStacks: 3,
    animationType: 'snake-bite',
  }),
});

// ── Shamanic Curse (shares serpent-bite-target effectType) ──────────────
SPELL_REGISTRY.set('Shamanic Curse', {
  effectType: 'serpent-bite-target',
  logEmoji: '💀',
  gerrymanderable: false, // already registered via SLB's effectType
  setup: () => ({
    targetsNeeded: 1,
    poisonStacks: 2,
    animationType: 'shamanic-curse',
  }),
});

// ── Venom Infusion ─────────────────────────────────────────────────────
SPELL_REGISTRY.set('Venom Infusion', {
  effectType: 'venom-infusion-target',
  logEmoji: '🧪',
  gerrymanderable: true,
  fizzleError: 'No poisoned targets on the board',
  castable: ({ room }) => {
    // Inline: hasAnyPoisonedTarget
    for (const [, p] of room.players) {
      if (p.left) continue;
      if (p.chosenStudent && !p.studentDead && (p.chosenStudent.poisonStacks || 0) > 0) return true;
      for (const f of (p.familiars || [])) {
        if (f.currentHp > 0 && (f.poisonStacks || 0) > 0) return true;
      }
    }
    return false;
  },
  setup: ({ room }) => {
    // Inline: hasAnyPoisonedTarget check for fizzle
    let hasPoisoned = false;
    for (const [, p] of room.players) {
      if (p.left) continue;
      if (p.chosenStudent && !p.studentDead && (p.chosenStudent.poisonStacks || 0) > 0) { hasPoisoned = true; break; }
      for (const f of (p.familiars || [])) {
        if (f.currentHp > 0 && (f.poisonStacks || 0) > 0) { hasPoisoned = true; break; }
      }
      if (hasPoisoned) break;
    }
    if (!hasPoisoned) return null;
    return { targetsNeeded: 1 };
  },
});

// ── Poisoned Well ──────────────────────────────────────────────────────
SPELL_REGISTRY.set('Poisoned Well', {
  effectType: 'poisoned-well-select',
  logEmoji: '🟣',
  gerrymanderable: false,
  canPlay: ({ room, playerId }) => {
    for (const [pid, p] of room.players) {
      if (pid === playerId || p.left) continue;
      if ((p.chosenStudent && !p.studentDead) || (p.familiars || []).some(f => f.currentHp > 0)) return true;
    }
    return false;
  },
  canPlayError: 'No valid opponents to target!',
  setup: () => ({
    poisonStacks: 1,
    familiarsOnly: false,
  }),
});

// ── Toxic Fumes (shares poisoned-well-select effectType) ───────────────
SPELL_REGISTRY.set('Toxic Fumes', {
  effectType: 'poisoned-well-select',
  logEmoji: '🟣',
  gerrymanderable: false,
  canPlay: ({ room, playerId }) => {
    for (const [pid, p] of room.players) {
      if (pid === playerId || p.left) continue;
      if ((p.familiars || []).some(f => f.currentHp > 0)) return true;
    }
    return false;
  },
  canPlayError: 'No opponents have living Familiars!',
  setup: () => ({
    poisonStacks: 2,
    familiarsOnly: true,
  }),
});

// ── Flame Pillars (dynamic damage: 2 × discard pile size) ─────────────
SPELL_REGISTRY.set('Flame Pillars', {
  singleTargetDamage: true,
  effectType: 'spell-damage-target',
  logEmoji: '🔥',
  gerrymanderable: true,
  animationType: 'flame-pillar',
  setup: ({ player, heldCard, heldPayment }) => {
    // Preview damage: current discard + spell card + payment cards (about to be discarded)
    const futureDiscard = (player.discardPile || []).length
      + (heldCard ? 1 : 0) + (heldPayment || []).length;
    const damage = 2 * futureDiscard;
    return {
      targetsNeeded: 1,
      damage,
    };
  },
  // Recompute after commitSpellCast has actually moved cards to discard pile
  computeDamage: ({ player }) => {
    return 2 * (player.discardPile || []).length;
  },
});

// ── Icebolt (5 damage + tap if untapped) ──────────────────────────────
SPELL_REGISTRY.set('Icebolt', {
  singleTargetDamage: true,
  effectType: 'spell-damage-target',
  logEmoji: '❄️',
  gerrymanderable: true,
  animationType: 'icebolt',
  projectile: true, // damage deferred until client signals projectile impact
  tapIfUntapped: true,
  targetLabel: 'Select a target to freeze!',
  setup: () => ({
    targetsNeeded: 1,
    damage: 5,
  }),
});

// ── Magic Hammer (15 damage, all targets) ─────────────────────────────
SPELL_REGISTRY.set('Magic Hammer', {
  singleTargetDamage: true,
  effectType: 'spell-damage-target',
  logEmoji: '🔨',
  gerrymanderable: true,
  animationType: 'magic-hammer',
  projectile: true,
  targetLabel: 'Select a target to smash!',
  setup: () => ({
    targetsNeeded: 1,
    damage: 15,
  }),
});

// ── Phoenix Bombardment (damage = student's missing HP) ───────────────
SPELL_REGISTRY.set('Phoenix Bombardment', {
  singleTargetDamage: true,
  effectType: 'spell-damage-target',
  logEmoji: '🔥🐦',
  gerrymanderable: true,
  animationType: 'phoenix-bombardment',
  projectile: true,
  targetLabel: 'Select a target to bombard!',
  setup: ({ player }) => {
    const student = player.chosenStudent;
    const damage = student ? Math.max(0, student.hp - student.currentHp) : 0;
    return {
      targetsNeeded: 1,
      damage,
      excludeSelfStudent: true,
    };
  },
  // Recompute after commitSpellCast (HP may have changed from cheese procs etc.)
  computeDamage: ({ player }) => {
    const student = player.chosenStudent;
    return student ? Math.max(0, student.hp - student.currentHp) : 0;
  },
});

// ── Pressure Projectile (25 piercing to familiar only) ────────────────
SPELL_REGISTRY.set('Pressure Projectile', {
  singleTargetDamage: true,
  effectType: 'spell-damage-target',
  logEmoji: '💧',
  gerrymanderable: true,
  animationType: 'pressure-projectile',
  projectile: true,
  targetLabel: 'Select a Familiar to destroy!',
  canPlay: ({ room, playerId }) => {
    // Must have at least one living enemy familiar on the board
    for (const [pid, p] of room.players) {
      if (pid === playerId || p.left || p.won) continue;
      if ((p.familiars || []).some(f => f && f.currentHp > 0)) return true;
    }
    return false;
  },
  canPlayError: 'No enemy Familiars in play!',
  setup: () => ({
    targetsNeeded: 1,
    damage: 25,
    familiarsOnly: true,
    excludeSelfStudent: true,
    piercing: true,
    bypassAntiMagicBlade: true,
  }),
});

// ── Sun Beam (dual-mode: Burn 10 or Heal 10, any target incl. self) ───
SPELL_REGISTRY.set('Sun Beam', {
  singleTargetDamage: true,
  effectType: 'sun-beam-target',
  logEmoji: '☀️',
  gerrymanderable: true,
  animationType: 'sun-beam',
  setup: () => ({
    targetsNeeded: 1,
    damage: 10,
    healAmount: 10,
  }),
});

// ═══════════════════════════════════════════════════════════════════════════
//  FIELD SPELLS — placed on board instead of discarded
// ═══════════════════════════════════════════════════════════════════════════

// ── Death-Defying Blast (field spell — saves the next student(s) who die) ──
SPELL_REGISTRY.set('Death-Defying Blast', {
  fieldSpell: true,
  logEmoji: '💜⚡',
  fieldSetup: (card) => {
    // Timestamp used to determine which Blast fires first when multiple are in play
    card.blastPlacedAt = Date.now();
  },
});

// ── Gathering Storm (field spell — accumulates storm counters) ─────────
SPELL_REGISTRY.set('Gathering Storm', {
  fieldSpell: true,
  logEmoji: '⛈️',
  fieldSetup: (card) => { card.stormCounters = 0; },
});

// ── Magic Show (field spell — all Spells cost 0 while active) ──────────
SPELL_REGISTRY.set('Magic Show', {
  fieldSpell: true,
  logEmoji: '🎩',
});

// ── Spider Hive (field spell — spawns spiders each round) ──────────────
SPELL_REGISTRY.set('Spider Hive', {
  fieldSpell: true,
  logEmoji: '🕷️',
});

// ═══════════════════════════════════════════════════════════════════════════
//  INSTANT SPELLS — resolve immediately, no targeting needed
//  NOTE: resolve() functions are registered in server.js (need server utilities)
// ═══════════════════════════════════════════════════════════════════════════

// ── Armageddon (instant AoE — 5 × round number damage to ALL targets) ─
SPELL_REGISTRY.set('Armageddon', {
  instant: true,
  logEmoji: '🔥🔥🔥',
});

// ── Lightball (instant self-cleanse — removes poison, heals cleansed) ──
SPELL_REGISTRY.set('Lightball', {
  instant: true,
  logEmoji: '💡',
  // castable set in server.js (needs hasOwnPoisonedTarget)
});

// ── Neurotoxin (instant AoE — taps poisoned, poisons all) ─────────────
SPELL_REGISTRY.set('Neurotoxin', {
  instant: true,
  logEmoji: '☠️☣️',
});

// ── Big Oopsie (instant AoE — 10 dmg to all familiars of caster + adjacent players) ─
SPELL_REGISTRY.set('Big Oopsie', {
  instant: true,
  logEmoji: '💥',
  // castable: injected in server.js (needs adjacency helpers)
  // resolve injected in server.js (needs adjacency helpers)
});

// ── Aurora Borealis (copy eligible spell from any opponent's discard, free) ─
SPELL_REGISTRY.set('Aurora Borealis', {
  effectType: 'aurora-borealis-pick',
  logEmoji: '🌌',
  gerrymanderable: false,
  // castable + setup injected in server.js (need server utilities)
});

// ── Arms Trade (select 2 equips on different students, swap them) ──────
SPELL_REGISTRY.set('Arms Trade', {
  effectType: 'arms-trade-select',
  logEmoji: '🤝',
  gerrymanderable: false,
  // castable: injected in server.js (needs full room state)
  setup: () => ({
    canCancel: true,
  }),
});

// ═══════════════════════════════════════════════════════════════════════════
//  VANILLA SPELLS — no special server logic; play → discard → tap → done.
//  Registered so the SPELL_REGISTRY is the single source of truth for all
//  spells and the playCard handler has one unified code path.
//  To add an effect later, just replace { vanilla: true } with the real def.
// ═══════════════════════════════════════════════════════════════════════════

// ── Create Illusion (copy any non-Gerrymander familiar on board as an Illusion) ─
SPELL_REGISTRY.set('Create Illusion', {
  effectType: 'create-illusion-pick',
  logEmoji: '🌀🪞',
  gerrymanderable: false,
  fizzleError: 'No valid Familiars on the board to copy!',
  castable: ({ room }) => {
    for (const [, p] of room.players) {
      if (p.left) continue;
      if ((p.familiars || []).some(f => f && f.currentHp > 0 && f.name !== 'Gerrymander')) return true;
    }
    return false;
  },
  setup: ({ room }) => {
    const eligibleFamiliars = [];
    for (const [pid, p] of room.players) {
      if (p.left) continue;
      (p.familiars || []).forEach((f, fi) => {
        if (f && f.currentHp > 0 && f.name !== 'Gerrymander') {
          eligibleFamiliars.push({ ownerPlayerId: pid, familiarIndex: fi, familiarName: f.name, familiarHp: f.hp, familiarPath: f.path });
        }
      });
    }
    if (eligibleFamiliars.length === 0) return null;
    return { eligibleFamiliars, canCancel: true };
  },
});


// ── Detection (reveal all snares to caster, then pick any to destroy) ────
SPELL_REGISTRY.set('Detection', {
  effectType: 'detection-pick',
  logEmoji: '🔍',
  gerrymanderable: false,
  fizzleError: 'No Snares on the board to detect!',
  castable: ({ room }) => {
    for (const [, p] of room.players) {
      if (p.left) continue;
      if ((p.snares || []).length > 0) return true;
    }
    return false;
  },
  setup: ({ room, playerId }) => {
    // Build the full snare list (caster sees all — name, owner, index)
    const allSnares = [];
    for (const [pid, p] of room.players) {
      if (p.left) continue;
      (p.snares || []).forEach((s, i) => {
        allSnares.push({ ownerPlayerId: pid, snareIndex: i, name: s.name, path: s.path });
      });
    }
    if (allSnares.length === 0) return null;
    return { allSnares, canCancel: true };
  },
});


SPELL_REGISTRY.set('Curse', {
  effectType: 'curse-familiar-target',
  logEmoji: '🩻',
  gerrymanderable: true,
  fizzleError: 'No valid Familiars to curse!',
  // castable + setup injected in server.js (needs familiarHasDirectDamageEffect)
});

SPELL_REGISTRY.set('Body Swap', {
  effectType: 'body-swap-pick-discard',
  logEmoji: '🔄',
  gerrymanderable: false,
  // castable + setup injected in server.js
});

// ── Butterfly Cloud (select opponent → 5 damage all their targets + Hidden buff) ─
SPELL_REGISTRY.set('Butterfly Cloud', {
  effectType: 'butterfly-cloud-select',
  logEmoji: '🦋',
  gerrymanderable: false,
  // castable + setup injected in server.js
});

// ── Fireshield (equips to own Student — reflects 5 dmg on student/familiar hits) ─
SPELL_REGISTRY.set('Fireshield', {
  instant: true,
  logEmoji: '🔥🛡️',
  // resolve injected server-side
});

// ── Hole in the Sky (multi-select from all discards — delete up to 3 per pile) ─
SPELL_REGISTRY.set('Hole in the Sky', {
  effectType: 'hole-in-sky-pick',
  logEmoji: '🌑',
  gerrymanderable: false,
  castable: ({ room }) => {
    for (const [, p] of room.players) {
      if (p.left) continue;
      if ((p.discardPile || []).length > 0) return true;
    }
    return false;
  },
  setup: ({ room }) => {
    // Build per-player discard data in examTurnOrder
    const piles = [];
    const order = room.examTurnOrder && room.examTurnOrder.length > 0
      ? room.examTurnOrder
      : [...room.players.keys()];
    for (const pid of order) {
      const p = room.players.get(pid);
      if (!p || p.left) continue;
      piles.push({
        playerId: pid,
        playerName: p.name,
        cards: (p.discardPile || []).map((c, i) => ({ discardIndex: i, name: c.name, path: c.path, type: c.type })),
      });
    }
    if (!piles.some(pile => pile.cards.length > 0)) return null;
    return { piles, canCancel: true };
  },
});

// ── Great Filter (instant — kill all non-immune familiars with HP <= 5) ──
SPELL_REGISTRY.set('Great Filter', {
  instant: true,
  logEmoji: '💜',
  // castable + resolve injected server-side
});

// ── Flash Flood (select opponent with untapped familiars — exhaust all their familiars) ─
SPELL_REGISTRY.set('Flash Flood', {
  effectType: 'flash-flood-select',
  logEmoji: '🌊',
  gerrymanderable: false,
  // castable + setup injected server-side
});

// ── Flame Avalanche (select opponent — 8 dmg to all targets of them + seat neighbors) ─
SPELL_REGISTRY.set('Flame Avalanche', {
  effectType: 'flame-avalanche-select',
  logEmoji: '🌋',
  gerrymanderable: false,
  // castable + setup injected server-side (needs adjacency helpers + getActivePlayers)
});

// ── Firewall (select opponent with tapped targets — deal 10 to all their tapped) ─
SPELL_REGISTRY.set('Firewall', {
  effectType: 'firewall-select',
  logEmoji: '🔥🧱',
  gerrymanderable: false,
  // castable + setup injected server-side (needs tappedStudent/tappedFamiliars)
});

// ── Butterfly Form (spell attaches to chosen Student as equip, grants permanent Hidden) ─
SPELL_REGISTRY.set('Butterfly Form', {
  effectType: 'butterfly-form-select',
  logEmoji: '🦋✨',
  gerrymanderable: false,
  // castable + setup injected in server.js
});

// ── Diplomacy (instant — sets room.peaceful for the rest of the round) ───
SPELL_REGISTRY.set('Diplomacy', {
  instant: true,
  logEmoji: '🕊️',
  // resolve injected in server.js
});

// ── Fire Bolts (2 familiars, 10 damage each) ──────────────────────────────
SPELL_REGISTRY.set('Fire Bolts', {
  effectType: 'fire-bolts-target',
  logEmoji: '🔥',
  gerrymanderable: false,
  // castable + setup injected server-side (needs isGoldenHind)
});

// ── Fireball (2 targets incl. students, 8 damage each, bigger fire projectiles) ─
SPELL_REGISTRY.set('Fireball', {
  effectType: 'fireball-target',
  logEmoji: '🔥',
  gerrymanderable: false,
  // castable + setup injected server-side (needs isGoldenHind)
});

// ── Explosion (single target + adjacents — 8 damage each) ────────────────
SPELL_REGISTRY.set('Explosion', {
  effectType: 'explosion-target',
  logEmoji: '💥',
  gerrymanderable: true,
  // castable + setup injected server-side (needs turn-order + board state)
});

// ── Dream Dust (instant — apply dreamDust buff to all own Familiars + new summons) ─
SPELL_REGISTRY.set('Dream Dust', {
  instant: true,
  logEmoji: '🫧',
  // resolve injected server-side
});

// ── Dread (instant — delete all lowest-cost Familiars on board) ──────────
SPELL_REGISTRY.set('Dread', {
  instant: true,
  logEmoji: '👁️',
  // castable + resolve injected server-side (needs immune checks, cost logic)
});

// ── Disruption Ray (single target — apply Weakened debuff) ───────────────
SPELL_REGISTRY.set('Disruption Ray', {
  effectType: 'disruption-ray-target',
  logEmoji: '🟣',
  gerrymanderable: true,
  castable: ({ room }) => {
    for (const [, p] of room.players) {
      if (p.left) continue;
      if (p.chosenStudent && !p.studentDead) return true;
      if ((p.familiars || []).some(f => f && f.currentHp > 0)) return true;
    }
    return false;
  },
  setup: ({ room }) => {
    const eligibleTargets = [];
    for (const [pid, p] of room.players) {
      if (p.left) continue;
      if (p.chosenStudent && !p.studentDead)
        eligibleTargets.push({ playerId: pid, type: 'student' });
      (p.familiars || []).forEach((f, fi) => {
        if (f && f.currentHp > 0) eligibleTargets.push({ playerId: pid, type: 'familiar', familiarIndex: fi });
      });
    }
    if (eligibleTargets.length === 0) return null;
    return { eligibleTargets, targetsNeeded: 1, canCancel: true };
  },
});



SPELL_REGISTRY.set('Cataclysm', {
  instant: true,
  logEmoji: '☄️🔥',
  // resolve injected in server.js
});

// ── Chaos Magic (opponent picks spell from caster's discard → caster resolves it free) ─
SPELL_REGISTRY.set('Chaos Magic', {
  effectType: 'chaos-magic-select',
  logEmoji: '🌀',
  gerrymanderable: false,
  // castable + setup injected in server.js
});

// ── Cold Coffin (pick untapped Familiar → tap + permanent Sealed in Ice debuff) ──
SPELL_REGISTRY.set('Cold Coffin', {
  effectType: 'exhaust-familiar',
  logEmoji: '❄️⚰️',
  gerrymanderable: false,
  // castable + setup injected in server.js
});

// ── Confusing Melody (instant — all opponents' Familiars gain Confused debuff) ──
SPELL_REGISTRY.set('Confusing Melody', {
  instant: true,
  logEmoji: '🎵😵',
  // resolve injected in server.js
});

// ── Cosmic Balance (select opponent → larger hand discards difference) ─
SPELL_REGISTRY.set('Cosmic Balance', {
  effectType: 'cosmic-balance-select',
  logEmoji: '⚖️',
  gerrymanderable: false,
  // castable + setup injected in server.js
});

// ── Iceage (instant — tap all untapped, non-immune opponent targets) ──────
SPELL_REGISTRY.set('Iceage', {
  instant: true,
  logEmoji: '🧊',
  // castable + resolve injected server-side (needs tap protection helpers)
});

// ── Reincarnation (revive dead Student at 50% HP, bond for shared win) ──────
SPELL_REGISTRY.set('Reincarnation', {
  effectType: 'reincarnation-select',
  logEmoji: '✨',
  gerrymanderable: false,
  // castable + setup injected server-side
});

// ── Rain of Spores (select opponent → force discard 3 cards) ─────────────
SPELL_REGISTRY.set('Rain of Spores', {
  effectType: 'rain-of-spores-select',
  logEmoji: '🍄',
  gerrymanderable: false,
  // castable + setup injected server-side
});

// ── Overheat (select an equipped Student → bounce all its Equips to hand) ───
SPELL_REGISTRY.set('Overheat', {
  effectType: 'overheat-select',
  logEmoji: '🔥',
  gerrymanderable: false,
  // castable + setup injected server-side
});

// ── Most Secret Magic (mark a Proctor for approval next round, like Coatl) ──
SPELL_REGISTRY.set('Most Secret Magic', {
  effectType: 'most-secret-magic-pick',
  logEmoji: '✨',
  gerrymanderable: false,
  // castable + setup injected server-side (needs getCoatlEligibleProctors)
});

// ── Mana Beacon (pick 1-3 Spells from own discard → return to hand) ─────────
SPELL_REGISTRY.set('Mana Beacon', {
  effectType: 'mana-beacon-pick',
  logEmoji: '🔵',
  gerrymanderable: false,
  castable: ({ room, player, playerId }) => {
    const p = player || room.players.get(playerId);
    return !!(p && (p.discardPile || []).some(c => c.type === 'Spell'));
  },
  setup: ({ room, player, playerId }) => {
    const p = player || room.players.get(playerId);
    if (!p) return null;
    const spells = (p.discardPile || [])
      .map((c, i) => ({ discardIndex: i, name: c.name, path: c.path, cost: c.cost }))
      .filter(({ discardIndex }) => p.discardPile[discardIndex].type === 'Spell');
    if (spells.length === 0) return null;
    return { spells, canCancel: true };
  },
});

// ── Love Shot (steal opponent's non-immune Familiar, arrives untapped) ──────
SPELL_REGISTRY.set('Love Shot', {
  effectType: 'school-idol-charm',
  logEmoji: '💖',
  gerrymanderable: false,
  // castable + setup injected server-side (needs countDarkGearTargets or similar)
});

// ── Looming Threat (reveal a Familiar in hand + Looming marker → summon at round end) ─
SPELL_REGISTRY.set('Looming Threat', {
  effectType: 'looming-threat-pick',
  logEmoji: '🌑',
  gerrymanderable: false,
  // castable + setup injected server-side
});

// ── Live Show (vote to win — majority of other players must approve) ────────
SPELL_REGISTRY.set('Live Show', {
  instant: true,
  logEmoji: '🎤',
  castable: ({ room, player, playerId }) => {
    // Can always cast as long as there's at least 1 other non-left, non-timedout player to vote
    const cid = playerId || (player ? [...room.players.entries()].find(([,p]) => p === player)?.[0] : null);
    for (const [pid, p] of room.players) {
      if (pid !== cid && !p.left) return true;
    }
    return false;
  },
  // resolve injected server-side (needs win flow helpers)
});

// ── Shrink (equip to student — 50% size, ATK capped at 1) ───────────────────
SPELL_REGISTRY.set('Shrink', {
  effectType: 'shrink-select',
  logEmoji: '🔻',
  gerrymanderable: false,
  castable: ({ room }) => {
    for (const [, p] of room.players) {
      if (!p.left && !p.studentDead && p.chosenStudent && !(p.equips || []).some(e => e.name === "Anti-Magic Blade")) return true;
    }
    return false;
  },
  setup: ({ room }) => {
    const validTargets = [];
    for (const [id, p] of room.players) {
      if (p.left || p.studentDead || !p.chosenStudent || (p.equips || []).some(e => e.name === 'Anti-Magic Blade')) continue;
      validTargets.push({ playerId: id, playerName: p.name });
    }
    if (validTargets.length === 0) return null;
    return { validTargets, canCancel: true };
  },
});

// ── Shooting Star (wish for a card — take all copies from all discards) ──────
SPELL_REGISTRY.set('Shooting Star', {
  effectType: 'shooting-star-pick',
  logEmoji: '🌠',
  gerrymanderable: false,
  castable: ({ room }) => {
    for (const [, p] of room.players) {
      if (!p.left && p.discardPile && p.discardPile.length > 0) return true;
    }
    return false;
  },
  setup: ({ room }) => {
    // Build deduplicated card list with counts, preserving one entry per name
    const seen = new Map(); // name → { name, count, anyPath }
    for (const [, p] of room.players) {
      if (p.left) continue;
      for (const c of (p.discardPile || [])) {
        if (!c) continue;
        const entry = seen.get(c.name);
        if (entry) { entry.count++; }
        else { seen.set(c.name, { name: c.name, count: 1, path: c.path || null }); }
      }
    }
    const cards = [...seen.values()];
    if (cards.length === 0) return null;
    return { cards, canCancel: true };
  },
});

// ── Rusty Touch (destroy 1 Equip in play — same as Rusting Crystal) ─────────
SPELL_REGISTRY.set('Rusty Touch', {
  effectType: 'destroy-equip',
  logEmoji: '🦀',
  gerrymanderable: false,
  castable: ({ room }) => [...room.players.values()].some(p => !p.left && (p.equips || []).length > 0),
  setup: () => ({ canCancel: true, rustyTouch: true }),
});

// ── Rockfall (choose up to 2 adjacent targets, 15 damage each) ───────────
SPELL_REGISTRY.set('Rockfall', {
  effectType: 'rockfall-target',
  logEmoji: '🪨',
  gerrymanderable: false,
  // castable + setup injected server-side (uses buildExplosionArray)
});

// Song of Rain
SPELL_REGISTRY.set('Song of Rain', {
  effectType: 'song-of-rain-select',
  logEmoji: '🌧️',
  gerrymanderable: false,
  castable: ({ room }) => {
    for (const [, p] of room.players) {
      if (!p.left && !p.studentDead && p.chosenStudent && !(p.equips || []).some(e => e.name === 'Anti-Magic Blade')) return true;
    }
    return false;
  },
  setup: ({ room }) => {
    const validTargets = [];
    for (const [id, p] of room.players) {
      if (p.left || p.studentDead || !p.chosenStudent) continue;
      if ((p.equips || []).some(e => e.name === 'Anti-Magic Blade')) continue;
      validTargets.push({ playerId: id, playerName: p.name });
    }
    if (validTargets.length === 0) return null;
    return { validTargets, canCancel: true };
  },
});

// ── Summoning Ritual ─────────────────────────────────────────────────────────
// Phase 1: pick own familiar to sacrifice
// Phase 2: pick any familiar from any discard pile (excl. same name as sacrifice)
SPELL_REGISTRY.set('Summoning Ritual', {
  effectType: 'summoning-ritual-sacrifice',
  logEmoji: '🗡️',
  gerrymanderable: false,
  castable: ({ room, playerId }) => {
    // Need 1+ own familiars alive
    const player = room.players.get(playerId);
    if (!player || !(player.familiars || []).some(f => f && f.currentHp > 0)) return false;
    // Need 1+ familiars in any discard pile (different name handled at setup)
    for (const [, p] of room.players) {
      if (p.left) continue;
      if ((p.discardPile || []).some(c => c.type === 'Familiar')) return true;
    }
    return false;
  },
  setup: ({ room, playerId, player }) => {
    const sacrifices = [];
    for (let i = 0; i < (player.familiars || []).length; i++) {
      const f = player.familiars[i];
      if (f && f.currentHp > 0) sacrifices.push({ familiarIndex: i, name: f.name });
    }
    if (sacrifices.length === 0) return null;
    // Check at least one discard familiar with a different name exists
    const sacrificeNames = new Set(sacrifices.map(s => s.name));
    let hasValidReplacement = false;
    for (const [, p] of room.players) {
      if (p.left) continue;
      if ((p.discardPile || []).some(c => c.type === 'Familiar' && !sacrificeNames.has(c.name))) {
        hasValidReplacement = true; break;
      }
    }
    if (!hasValidReplacement) return null;
    return { sacrifices, canCancel: true };
  },
});

// ── Transformation ──────────────────────────────────────────────────────────
// Phase 1: pick own familiar to transform (must have valid discard target at cost ≤ sacrifice+1)
// Phase 2: pick familiar from any discard pile with cost ≤ sacrifice cost + 1
SPELL_REGISTRY.set('Transformation', {
  effectType: 'transformation-sacrifice',
  logEmoji: '✨',
  gerrymanderable: false,
  castable: ({ room, playerId }) => {
    const player = room.players.get(playerId);
    if (!player) return false;
    // Collect all discard familiars
    const discardFamiliars = [];
    for (const [, p] of room.players) {
      if (p.left) continue;
      for (const c of (p.discardPile || [])) {
        if (c.type === 'Familiar') discardFamiliars.push(c);
      }
    }
    if (discardFamiliars.length === 0) return false;
    // Need at least 1 own familiar that has a valid discard target (cost ≤ sacrifice+1, different name)
    for (const f of (player.familiars || [])) {
      if (!f || f.currentHp <= 0) continue;
      const maxCost = (f.cost || 0) + 1;
      if (discardFamiliars.some(d => d.name !== f.name && (d.cost || 0) <= maxCost)) return true;
    }
    return false;
  },
  setup: ({ room, playerId, player }) => {
    // Collect all discard familiars
    const discardFamiliars = [];
    for (const [, p] of room.players) {
      if (p.left) continue;
      for (const c of (p.discardPile || [])) {
        if (c.type === 'Familiar') discardFamiliars.push(c);
      }
    }
    // Only include familiars that have at least 1 valid replacement in any discard
    const sacrifices = [];
    for (let i = 0; i < (player.familiars || []).length; i++) {
      const f = player.familiars[i];
      if (!f || f.currentHp <= 0) continue;
      const maxCost = (f.cost || 0) + 1;
      if (discardFamiliars.some(d => d.name !== f.name && (d.cost || 0) <= maxCost)) {
        sacrifices.push({ familiarIndex: i, name: f.name, cost: f.cost || 0 });
      }
    }
    if (sacrifices.length === 0) return null;
    return { sacrifices, canCancel: true };
  },
});

// ── Transmission (choose: move hand cards to opponent OR move equip to another student) ──
SPELL_REGISTRY.set('Transmission', {
  effectType: 'transmission-choose',
  logEmoji: '📡',
  gerrymanderable: false,
  castable: ({ room, playerId }) => {
    const player = room.players.get(playerId);
    if (!player) return false;
    // Can move equip if has equips on main student
    if ((player.equips || []).length > 0) return true;
    // Can move cards if has hand cards besides Transmission itself
    if ((player.hand || []).some(c => c.name !== 'Transmission')) return true;
    return false;
  },
  setup: ({ room, playerId, player }) => {
    // Hand has already been stripped of the spell card + payment at this point
    const canMoveCards = (player.hand || []).length >= 1;
    const canMoveEquip = (player.equips || []).length >= 1;
    if (!canMoveCards && !canMoveEquip) return null;
    return { canMoveCards, canMoveEquip, canCancel: true };
  },
});

// ── Trap Sabotage (select 1+ snares on board to destroy) ────────────────────
SPELL_REGISTRY.set('Trap Sabotage', {
  effectType: 'trap-sabotage-pick',
  logEmoji: '💣',
  gerrymanderable: false,
  castable: ({ room }) => {
    for (const [, p] of room.players) {
      if (p.left) continue;
      if ((p.snares || []).length > 0) return true;
    }
    return false;
  },
  setup: ({ room }) => {
    // Just need 1+ snare on the board — client handles selection
    let hasSnare = false;
    for (const [, p] of room.players) {
      if (p.left) continue;
      if ((p.snares || []).length > 0) { hasSnare = true; break; }
    }
    if (!hasSnare) return null;
    return { canCancel: true };
  },
});

// ── Ultimate Weapon Experiment (pick up to 1 Equip per discard pile, equip all free) ─
SPELL_REGISTRY.set('Ultimate Weapon Experiment', {
  effectType: 'uwe-pick',
  logEmoji: '⚗️',
  gerrymanderable: false,
  castable: ({ room }) => {
    for (const [, p] of room.players) {
      if (p.left) continue;
      if ((p.discardPile || []).some(c => c.type === 'Equip')) return true;
    }
    return false;
  },
  setup: ({ room }) => {
    const piles = [];
    const order = room.examTurnOrder && room.examTurnOrder.length > 0
      ? room.examTurnOrder
      : [...room.players.keys()];
    for (const pid of order) {
      const p = room.players.get(pid);
      if (!p || p.left) continue;
      const equips = (p.discardPile || [])
        .map((c, i) => ({ discardIndex: i, name: c.name, path: c.path, type: c.type }))
        .filter(c => c.type === 'Equip');
      piles.push({ playerId: pid, playerName: p.name, cards: equips });
    }
    if (!piles.some(pile => pile.cards.length > 0)) return null;
    return { piles, canCancel: true };
  },
});

// ── Touch of the Glacier (tap one untapped non-immune target — no damage) ────
SPELL_REGISTRY.set('Touch of the Glacier', {
  effectType: 'glacier-touch-target',
  logEmoji: '🧊',
  gerrymanderable: false,
  castable: ({ room, playerId }) => {
    for (const [pid, p] of room.players) {
      if (p.left) continue;
      const isOwn = pid === playerId;
      // Chilly Dog / Ifrit only block opponent tapping
      const hasTapBlock = !isOwn && (p.familiars || []).some(f => f && f.currentHp > 0 && !f.passiveNegated && (f.name === 'Chilly Dog' || f.name === 'Ifrit'));
      const hasAMB = (p.equips || []).some(e => e.name === 'Anti-Magic Blade');
      const hasAngelwing = (p.equips || []).some(e => e.name === 'Angelwing Backpack');
      // Check student (skip own student — it's the caster for hand-cast and will be tapped)
      if (!isOwn && p.chosenStudent && !p.studentDead && !p.tappedStudent && !hasTapBlock && !hasAMB && !hasAngelwing) return true;
      // Check familiars (Class Pet = student effect; Mech/Golden Hind = per-familiar)
      if (!hasTapBlock) {
        const hasClassPet = p.chosenStudent && !p.studentDead && p.chosenStudent.name === 'The Class Pet';
        if (!hasClassPet) {
          for (let i = 0; i < (p.familiars || []).length; i++) {
            const f = p.familiars[i];
            if (!f || f.currentHp <= 0) continue;
            if ((p.tappedFamiliars || []).includes(i)) continue;
            if (f.mechImmune || f.goldenHindImmune) continue;
            return true;
          }
        }
      }
    }
    return false;
  },
  setup: () => ({ canCancel: true }),
});

// ── Voodoo Curse (link caster's student to an opponent student — mirror all effects) ─
SPELL_REGISTRY.set('Voodoo Curse', {
  effectType: 'voodoo-curse-target',
  logEmoji: '🪆',
  gerrymanderable: false,
  castable: ({ room, playerId }) => {
    for (const [pid, p] of room.players) {
      if (p.left || pid === playerId) continue;
      if (p.chosenStudent && !p.studentDead) return true;
    }
    return false;
  },
  setup: () => ({ canCancel: true }),
});

const VANILLA_SPELLS = [
];

// ── Spell Shackles (equip — recoil 5× spell cost on cast) ────────────────────
SPELL_REGISTRY.set('Spell Shackles', {
  effectType: 'spell-shackles-select',
  logEmoji: '⛓️',
  gerrymanderable: false,
  castable: ({ room }) => {
    for (const [, p] of room.players) {
      if (!p.left && !p.studentDead && p.chosenStudent && !(p.equips || []).some(e => e.name === 'Anti-Magic Blade')) return true;
    }
    return false;
  },
  setup: ({ room }) => {
    const validTargets = [];
    for (const [id, p] of room.players) {
      if (p.left || p.studentDead || !p.chosenStudent) continue;
      if ((p.equips || []).some(e => e.name === 'Anti-Magic Blade')) continue;
      validTargets.push({ playerId: id, playerName: p.name });
    }
    if (validTargets.length === 0) return null;
    return { validTargets, canCancel: true };
  },
});

// ── The Yeeting (throw student at any non-student board card to destroy it) ──
SPELL_REGISTRY.set('The Yeeting', {
  effectType: 'yeeting-select',
  logEmoji: '🤾',
  gerrymanderable: false,
  castable: ({ room }) => {
    // Need at least one non-student board card anywhere (familiar, equip, snare, field spell)
    for (const [, p] of room.players) {
      if (p.left) continue;
      if ((p.familiars || []).some(f => f && f.currentHp > 0)) return true;
      if ((p.equips || []).length > 0) return true;
      if ((p.snares || []).length > 0) return true;
      if ((p.fieldSpells || []).length > 0) return true;
    }
    return false;
  },
  setup: ({ room }) => {
    // No validTargets needed — the client enumerates all board cards dynamically
    return { canCancel: true };
  },
});


for (const name of VANILLA_SPELLS) {
  SPELL_REGISTRY.set(name, { vanilla: true });
}

export { SPELL_REGISTRY };
