# ArcanumExam — Maintenance & Integration Guide

This file tracks **cross-cutting effects** that new cards, students, or mechanics must
be mindful of. When implementing anything new, **check every section below** to see if
your addition interacts with an existing system.

---

## 🛡️ Class Pet Immunity

**What:** All Familiars of a player with an active Class Pet are **immune to ALL effects
except direct damage**. This includes beneficial effects (healing, Guardian transfer),
hostile effects (poison, bounce, charm, energize, sacrifice-kill, instant kill), and
control (School Idol steal).

**Allowed through immunity:**
- Direct damage (attacks, spells like Armageddon, Booby Trap snare)
- The Familiar's own self-triggered effects (Pengu self-swap, Moonlight Butterfly self-bounce)
- Siren/Bard **copying** the familiar's effect (doesn't affect the familiar itself)

**When adding a new effect that targets familiars:**
- Server: Call `hasClassPetImmunity(ownerPlayer)` before applying any non-damage effect
- Client: Check `opp.classPetImmunity` / `you.classPetImmunity` to exclude from targeting UI
- If the effect mixes damage + non-damage (like Energize = untap + damage): the entire
  effect is blocked if the non-damage part is the prerequisite

**Key function:** `hasClassPetImmunity(player)` in server.js

---

## 📓 Average Student Double Action

**What:** The first Familiar a player taps each round acts a second time immediately
(mandatory, non-cancellable).

**When adding new familiar-tapping code:**
- **Always** use `tapFamiliar(player, familiarIndex)` instead of
  `player.tappedFamiliars.push(idx)` — the helper tracks the bonus trigger
- The bonus activation happens in `advanceExamTurn()` after each action resolves

**Key function:** `tapFamiliar(player, idx)` in server.js

---

## ✨ Chuunibyou Spell Cost Reduction

**What:** All spells cost 2 less (minimum 0) for a player with an active Chuunibyou.

**When adding new spell cost logic:**
- **Always** use `getEffectiveSpellCost(player, baseCost)` instead of reading `card.cost`
  directly for affordability/payment checks
- Client uses `canAfford(card, handSize, scr)` and `getEffectiveCost(card, scr)` helpers
  with the broadcast `spellCostReduction` value

**Key function:** `getEffectiveSpellCost(player, baseCost)` in server.js

---

## 🚫 Buffoon Disabled Proctors

**What:** At exam start, each Buffoon player permanently disables one proctor. Nobody
can earn that proctor's approval; existing approvals are removed.

**When adding a new proctor:**
- Approval-granting logic **must** check `isProctorDisabled(room, proctorName)` before
  granting
- `countApprovals(room, player)` and `previewProctorApprovals()` already exclude disabled
  proctors, but any new counting or display logic must also respect this

**Key function:** `isProctorDisabled(room, proctorName)` in server.js  
**Key data:** `room.disabledProctors[]` array

---

## 💀 Summoned Students (Necromancer)

**What:** Skeleton Necromancer can summon dead students as familiars. Summoned students
**contribute passive effects** but **NOT escape conditions**.

**When adding a new student passive effect:**
- Use `hasActiveStudentEffect(player, 'Student Name')` instead of checking
  `player.chosenStudent.name` directly — this checks both primary AND summoned copies
- Escape conditions in `studentEffects/*.js` only fire for `chosenStudent` (the index
  system handles this automatically)

**Key function:** `hasActiveStudentEffect(player, studentName)` in server.js  
**Summoned flag:** `familiar.summoned === true` in the familiars array

---

## 📊 Proctor Approval Tracking

Several proctors grant approvals based on tracked player actions. New cards/effects that
modify the game state should call the appropriate tracking functions:

| Tracker | Proctor | When to call |
|---------|---------|-------------|
| `trackBoardRemoval(room, instigatorId, count)` | Groundskeeper | Familiars die, equips destroyed, snares removed by effects |
| `trackCardPlayed(player, card)` | Witch Teacher | Any card played/activated (also tracks spell streak for Chuunibyou) |
| `trackHandDiscard(player, count)` | Disliked Teacher | Cards leave a player's hand involuntarily or voluntarily |
| `updateLibrarianApproval(room)` | Librarian | Auto-called in `broadcastRoomState()` — no manual action needed |
| `checkProctorApprovals(room)` | Familiar Trainer | Auto-called at prep phase end — no manual action needed |

**When adding effects that remove cards from the board or hand, call the relevant tracker.**

---

## 🪤 Snare Reaction System

**What:** When a student takes damage or is healed, snares can react (Booby Trap deals
counter-damage, Flesh Eater Swarm converts healing to damage).

**When adding new damage/healing resolution:**
- Use `resolveTargetDamage(room, targets, damage, instigatorId)` for damage — it handles
  snare triggers, familiar death processing, and board removal tracking
- Use `resolveTargetHeal(room, healTargets, sourceInfo, afterFn)` for healing — it handles
  heal-to-damage snare conversion
- Do **not** modify `currentHp` directly unless you have a very specific reason

---

## ⚔️ Equip Trigger System

**What:** Some equips trigger effects when equipped (Storm Piano bounces, Thunder Trumpet
deals damage, Rain Viola heals).

**When adding a new equip with an on-equip trigger:**
- Register the trigger in `equipEffects/` and add to the index
- Triggers use `room.pendingEquipTrigger` and resolve before the turn continues
- Check `hasClassPetImmunity()` if the trigger targets familiars with non-damage effects

---

## 🎵 Siren/Bard Copy Exclusions

**What:** Corrupted Siren and Skeleton Bard can copy other familiars' effects. Some
effects must not be copyable to prevent infinite recursion or broken interactions.

**When adding a new familiar effect:**
- If the effect involves copying/charming other familiars, add it to the exclusion list
  in `canEffectActivate()` (line with `charm-familiar || bard-copy`) and the Siren/Bard
  handlers
- Most standard effects (damage, heal, poison, etc.) are fine to copy

---

## 🚫 No-Spells (Imp King)

**What:** When Imp King's effect is active, `room.noSpells = true` and no spells can be
cast that round.

**When adding new spell-casting pathways:**
- Check `room.noSpells` before allowing spell play
- Currently checked in `game:playCard` handler

---

## 🎓 School Idol Steal

**What:** School Idol can steal opponent familiars by paying half their cost.

**When adding familiars with special board-presence effects:**
- Consider what happens when the familiar changes owner mid-game
- The `stolenFrom` property tracks the original owner
- Summoned students (`familiar.summoned`) cannot be stolen

---

## 📋 Class Rep Command

**What:** Once per round, the Class Rep player can tap and act with an opponent's
untapped Familiar as if they owned it. The charge recharges at round start. Blocked
by Class Pet immunity.

**When adding new familiar effects:**
- Commanded familiars use `getCommandSourceFamiliar(room, pa, player)` to resolve
  the actual familiar object (lives in the **owner's** array, not the commander's)
- `tapResolvedSource()` handles re-tapping correctly for both normal and bonus actions
- The `pa.classRepCommand` object on `pendingActivation` signals a command is active:
  `{ ownerPlayerId, ownerFamiliarIndex }`
- Instigator credit (damage tracking, board removals, etc.) goes to the **Class Rep**
  player, not the familiar's actual owner

**Average Student interaction:**
- If the Class Rep also has an Average Student passive, the first commanded familiar
  triggers the bonus (acts twice). The `-99` sentinel on `_avgStudentPendingBonusFamIdx`
  signals this in `advanceExamTurn()`

**Key functions:**
- `countCommandableFamiliars(room, playerId)` — counts available enemy familiars
- `getCommandSourceFamiliar(room, pa, player)` — resolves familiar from owner's array
- `tapResolvedSource(room, pa, player)` — handles tapping + Average Student tracking
- `countUntappedTargets(player, room)` — includes commandable familiars in turn counting

**Key data:** `player.classRepChargeReady` (boolean, recharges each round)

---

## 🛡️ Cool Kid Protection

**What:** Whenever the Cool Kid player's Familiars would take damage and they have
cards in hand, the game pauses for a 10-second prompt. Accepting costs 1 card
(forced, non-cancellable discard) and reduces all familiar damage from that event to 0.
Students still take damage normally. Each poison tick on each familiar is a separate prompt.

**When adding new damage sources:**
- `resolveTargetDamage()` automatically intercepts damage to Cool Kid familiars
  (stored in `room.coolKidHeldDamage[]` for deferred processing)
- For new damage paths outside `resolveTargetDamage`, check
  `hasActiveStudentEffect(owner, 'The Cool Kid')` and store held damage manually
- `advanceExamTurn()` processes the held queue via `setupCoolKidProtect()`
- Poison damage interception is handled directly in `resolvePoisonDamage()`

**Prompt lifecycle:**
1. Damage event → familiars identified → held in `room.coolKidHeldDamage[]`
2. `advanceExamTurn()` → `setupCoolKidProtect()` → `room.pendingCoolKidProtect`
3. Phase: `prompting` (10s timer) → player clicks Yes → `discarding` (forced, no timer)
4. After discard: damage cancelled. On decline/timeout: damage applied via
   `applyCoolKidHeldDamage()`. Both call `afterFn` to process next in queue.

**Escape condition — "Peaceful Round":**
- `room.roundDeathCount` tracks student + familiar deaths per round
- Reset at round start (in the round-scoped effect reset block)
- Incremented by `processFamiliarDeath()` and student deaths in `resolveTargetDamage()`/poison

**Key functions:**
- `setupCoolKidProtect(room, afterFn)` — recursive prompt queue processor
- `applyCoolKidHeldDamage(room, held)` — applies deferred damage (index-safe)
- `buildCoolKidProtectState(ckp, playerId)` — per-player broadcast state

**Key data:** `room.coolKidHeldDamage[]`, `room.pendingCoolKidProtect`, `room.roundDeathCount`

---

### ⚔️ The Edgelord — "Cleave" (Multi-Target Student Attack)

**Passive effect:** When The Edgelord taps their student to attack, they must select
one target per eligible player (including themselves). All targets take full ATK damage
simultaneously as a single event.

**Eligible players:** Have at least one living target (student or familiar) and haven't left.
Won players with living targets are still eligible.

**Targeting rules:**
- One target per player (student OR one of their familiars)
- Edgelord CAN target their own student/familiars
- Clicking another target from the same player swaps (doesn't deselect)
- All hits resolve in a single `resolveTargetDamage()` call → one snare trigger, one Cool Kid prompt

**Server flow:**
1. `exam:tap` → detects Edgelord via `hasActiveStudentEffect(player, 'The Edgelord')`
2. `getEdgelordEligiblePlayerIds(room)` → computes eligible player list
3. `buildStudentAttackActivation()` → creates `damage-targets` with `edgelordAttack: true` + `eligiblePlayerIds`
4. `familiar:attack` validation → checks per-player uniqueness + all eligible players covered
5. Self-exclusion skipped when `pa.edgelordAttack` is true

**Client flow:**
- `targetingMode.edgelordAttack = true` + `eligiblePlayerIds` passed through
- `toggleTarget()` enforces one-per-player with swap behavior
- Targeting label: "⚔️ Choose 1 target per player! (n/total)"
- Own student self-exclusion disabled via `!targetingMode.edgelordAttack` check

**Key functions:** `getEdgelordEligiblePlayerIds()`, `buildStudentAttackActivation()`

**Escape condition — "Total Annihilation":** End-of-round check. Wins if no living
familiars exist on the board for any non-left player. Left players' boards are fully
cleaned up via `cleanupLeftPlayer()`, so they never block this condition.

---

### 🎮 The Gamer — "Token Forge" (Item → Familiar Token)

**Passive effect:** When The Gamer plays an Item, after resolving, that Item becomes
a "Familiar Token" added to the player's familiars. The token:
- Has 5 HP, deals 5 damage to 1 target when tapped
- Retains original Item card art, display name is "Familiar Token"
- Starts untapped (usable immediately)
- No `summoned` flag — treated as a normal familiar (targetable by everything)
- When killed, goes to discard pile like any familiar

**Hook points:**
1. `game:playCard` Item branch → `convertItemToGamerToken()` instead of discard
2. `familiar:reviveItem` (Hammer Horse) → same conversion after display

**Token tap effect:** Registered as `'Familiar Token'` in `cardEffects/index.js`
(simple `damage-targets`, 1 target, 5 damage).

**Key function:** `convertItemToGamerToken(player, itemCard)`

**Key data:** Token object has `gamerToken: true` flag and `originalName` for identification.

**Escape condition:** (to be implemented)

---

### 🐺 The Loner — "Solitude" (No-Familiar Heal + Escape)

**Passive effect:** At end of each round (in `startNewExamRound`), if The Loner's
controller has no living familiars, heal The Loner by 25 HP (capped at max). Emits
a `healEvent` for animation.

**Escape condition — "True Solitude":** At end of round 3+ (`examRound >= 4`),
if The Loner is alive, not summoned, and its controller NEVER controlled any
familiars throughout the entire game (`player.loner_everHadFamiliar` is falsy).

**Familiar tracking:** `trackFamiliarGained(player)` sets `player.loner_everHadFamiliar = true`.
Called from all 5 familiar acquisition points:
1. Playing a Familiar from hand
2. Gamer token conversion
3. Reviving from discard (Phoenix etc.)
4. Caretaker summon
5. Charm/steal transfer

Flag is cleared on game restart (`p.loner_everHadFamiliar = false`).

---

### 🧠 The Prodigy — "Effortless" (Cost Ignore) + "Effortless Victory" (Instant Escape)

**Passive:** Each exam round, gains 1 charge (`prodigyChargeReady`). When the player would pay a discard cost > 0, a 10s prompt appears: "Ignore this Cost?". Accepting consumes the charge and sets cost to 0. Charge only consumed on "Yes".

**Cost paths covered (server + client):**
- `game:playCard` — hand cards (Spells, Familiars, Items, Equips)
- `familiar:mageSpellPay` — Skeleton Mage spell from discard
- `familiar:reviveItem` — Hammer Horse item revival
- `familiar:reviveEquip` — equip revival
- `student:caretakerSummon` — Caretaker summon cost
- `student:schoolIdolCharm` — School Idol charm cost
- Snare activation costs (future — currently all snares are free)

**Escape (INSTANT):** Wins immediately when any other non-left player reaches exactly 3 proctor approvals while The Prodigy has exactly 0. Uses `instantEscapeCondition` pattern (same as The Nerd).

**Escape Preview (⚠️):** Uses dedicated `previewInstantEscapeCondition` which checks: Prodigy at 0 current approvals with no pending, AND any other player currently < 3 would reach 3+ with their pending end-of-round approvals. `room.pendingApprovals` is attached to the preview room by `broadcastRoomState` before calling `previewEscapeConditions`. The `studentEffects/index.js` preview loop prefers `previewInstantEscapeCondition` over `instantEscapeCondition` when available.

**Important:** `broadcastRoomState()` runs `checkInstantEscapeConditions()` after `updateLibrarianApproval()` so that real-time Librarian approval changes can trigger The Prodigy's escape mid-turn.

---

### 💥 The Rowdy — "Tough Crowd" (Approval Threshold +1) + "Survivor" (Round 5 Escape)

**Passive:** While The Rowdy is active, all players need 5 proctor approvals instead of 4 to win. Implemented via `getApprovalsToWin(room)` which replaced the old `APPROVALS_TO_WIN` constant. Threshold drops back to 4 if The Rowdy dies, wins, or leaves (checked via `hasActiveStudentEffect`). Broadcast to client as `state.approvalsToWin`.

**Escape (round-end):** At end of Round 5 specifically (`examRound === 6` after increment), alive = win. Uses standard `escapeCondition` (not instant).

**Important:** Two safeguards prevent the threshold drop (5→4) from letting others sneak in when The Rowdy wins:
1. **Escape case:** After escape conditions, if The Rowdy (or The Teachers Agent) was active before but isn't anymore (just won), and `isGameOver` → bail out before proctor approval processing. This bailout is shared between both students.
2. **Approval case:** `checkWinConditions` snapshots `getApprovalsToWin()` once at loop start, so Rowdy winning at 5 mid-iteration doesn't lower the bar for subsequent players.

These are Rowdy-specific. Normally, escapes and proctor wins are processed together equivalently.

---

### 🕵️ The Teachers Agent — "Teacher's Favourite" (Approval Block) + "Riding Coattails" (Instant Escape)

**Passive:** While The Teachers Agent is alive, not won, not left, and has 3+ proctor approvals, no other player can win via proctor approvals. Enforced in `checkWinConditions()` which snapshots `teachersAgentBlockerId` before the loop and skips all other players. Broadcast to client as `state.teachersAgentBlocking` (boolean). Helper: `isTeachersAgentBlocking(room)`.

**Escape (INSTANT):** Wins immediately when any other non-won, non-left player reaches 4+ proctor approvals while she has 3+. The threshold is always literally 4, regardless of The Rowdy's effect. Uses `instantEscapeCondition` + `previewInstantEscapeCondition` in `studentEffects/theTeachersAgent.js`.

**Escape Preview (⚠️):** Shows when Teachers Agent has 3+ (or would reach 3+ with pending), AND any other player currently < 4 would reach 4+ with pending end-of-round approvals.

**Important:** Same two safeguards as The Rowdy prevent the approval block from lifting when Teachers Agent wins:
1. **Escape case:** The early bailout after escape conditions now tracks both Rowdy and Teachers Agent. If either was active before escapes but isn't after, and `isGameOver` → bail before proctors.
2. **Approval case:** `checkWinConditions` snapshots the blocking status at loop start, so Teachers Agent winning mid-iteration doesn't unblock others.

---

### 🔀 The Transfer Student — "New Kid Discount" (Familiar Cost -1) + "Sacrificial Lambs" (Escape)

**Passive:** All Familiars cost 1 less (minimum 0) for this player, including during Preparation Phase. Implemented via `getEffectiveFamiliarCost(player, baseCost)` — mirrors `getEffectiveSpellCost`. Applied in:
- `game:playCard` handler (Familiar branch)
- `canPlayAnyCard()` (prep phase affordability)
- `student:caretakerSummon` (cost per familiar)
- Client: `canAfford()` and `getEffectiveCost()` extended with `familiarCostReduction` param; Caretaker picker uses `getFamCost()` helper.
- Broadcast: `state.you.familiarCostReduction` (both prep and exam phases).

**Escape (round-end):** At exam start, if player has 3+ familiars, all are marked (`transferMarked: true`). ALL marked familiars must be killed by opponents. Tracked per-player:
- `transferEscapeActive` — marking happened (3+ fams at exam start)
- `transferEscapeRuined` — permanently broken
- `transferMarkedTotal` — initial count
- `transferMarkedKilledByOpponents` — count killed by opponents

**What counts as a valid (opponent) kill:**
- `instigatorId !== playerId` for combat deaths
- Poison death where `transferSelfPoisoned` is false

**What ruins the escape permanently:**
- Self-inflicted kill (`instigatorId === playerId`, or `cause === 'sacrifice'`)
- Poison death where familiar has `transferSelfPoisoned: true`
- Familiar bounced back to hand (any bounce of a marked familiar)
- Revived familiars lose their mark (no longer count)

**Per-familiar tracking:**
- `familiar.transferMarked` — visual 🎯 badge
- `familiar.transferSelfPoisoned` — set if any poison stacks applied by the familiar's owner

**Key code locations:**
- Marking: exam start init in `startExam()` (after tapped state init)
- Death tracking: `processFamiliarDeath()` — checks cause/instigator
- Bounce ruin: `bounceFamiliar()` — checks `transferMarked`
- Poison tracking: `familiar:poisonTarget` and `poison-all` handlers
- Escape condition: `studentEffects/theTransferStudent.js`

**Visual:** 🎯 badge on marked familiars (red gradient, bottom-right), both player and opponent boards.

---

## 🧬 Clone — Passive Copy + Active Bard-Copy

**Passive (board entry):** When Clone enters the board (summon, revive, swap-in — NOT
control transfer), its owner selects any non-Clone, non-summoned, living Familiar on any
player's board. Clone permanently (until it leaves the board) adopts the target's **name**
(for passive effect matching), copies its **max HP** (current + max), and gains a 🧬 badge.
If no eligible targets exist, nothing happens.

**Active effect:** Identical to Skeleton Bard — `effectType: 'bard-copy'`. Uses shared
`isCopierFamiliar()` exclusion system (Bard, Clone, Siren can't target each other).

**The rename trick:** Clone's `name` property is changed to the copied Familiar's name.
This makes ALL name-based passive checks automatically work (Chilly Dog protection,
Chilly Wizzy reaction, Angler Angel cost reduction, Bomblebee explosion, spider passives).

**Identity preservation:**
- `familiar.isClone = true` — survives rename, used for copier exclusion checks
- `familiar.originalName = 'Clone'` — used by `getFamiliarEffect()` to look up Clone's
  *own* active effect (bard-copy) instead of the copied Familiar's active
- `familiar.cloneSourceName` — display only (🧬 badge tooltip)

**When adding a new Familiar with a passive effect:**
- If the passive is checked by name (e.g. `f.name === 'My New Familiar'`), Clone
  automatically inherits it when it copies that Familiar — no extra code needed
- If the passive uses a different mechanism, verify Clone interaction manually

**Board exit cleanup:** `resetCloneState(familiar)` restores `name = 'Clone'`, original HP,
and removes all clone flags. Called before discard/bounce/hand-return.

**Key functions:**
- `setupCloneSelection(room, playerId, familiarIndex)` — finds targets, creates prompt
- `applyCloneTransform(familiar, targetFamiliar)` — renames + copies HP + sets flags
- `resetCloneState(familiar)` — restores identity on board exit
- `isCopierFamiliar(familiarOrName)` — checks Bard/Clone for copy exclusions

**Key data:** `familiar.isClone`, `familiar.originalName`, `familiar.cloneSourceName`

---

## ❄️ Chilly Wizzy — Passive Spell Reaction + Active Reveal

**Passive (effect-tap reaction):** Whenever ANY target is tapped by an effect (not normal
activation), ALL players with a living Chilly Wizzy + affordable castable spells get a
10-second Yes/No prompt. Accepting enters spell selection → payment → cast. Multiple
players resolve sequentially in turn order.

**Active (tap to reveal):** Owner selects a Spell in hand; it's revealed to all opponents
with a -3 cost reduction badge. Uses `chillyWizzyRevealed` flag on the card.

**When adding new effect-tap sources:**
- Set `room._effectTapOccurred = true` when tapping via effects
- The check happens in `advanceExamTurn()` after each action resolves
- Use `tapFamiliar()` helper which handles both Average Student and effect-tap tracking

**When adding new spell-casting pathways:**
- CW reaction spells bypass normal spell-casting restrictions (no student tap needed)
- Check `room.chillyWizzyReaction` phase to avoid conflicts with pending CW reactions
- Variable-cost spells via CW need proper `minCost`/`maxCost` handling (not hardcoded)

**CW + Clone interaction:** If Clone copies Chilly Wizzy's name, it counts as a living
CW for the reaction check (`f.name === 'Chilly Wizzy'`). Both real CW and Clone-CW
can provide simultaneous reaction eligibility.

**Key data:** `room.chillyWizzyReaction` (phase, eligible, playerStates, queuedSpells),
`room._effectTapOccurred`, `card.chillyWizzyRevealed`

---

## 🚀 Sneeze Rocket — AoE Buff + Variable Cost

**What:** An equip that gives a Familiar an AoE buff. When the buffed Familiar activates,
its single-target effect hits ALL targets of one opponent instead of one.

**Stacking:** Multiple Sneeze Rockets stack (`sneezeRocketStacks`). One stack is consumed
per AoE activation.

**Bard/Clone/Siren chain interaction:** When a copier copies a Sneeze Rocket-buffed
Familiar, the AoE applies to the copied activation. The `sneezeRocketBardChain` system
handles this: stores chain metadata, defers resolution, then applies AoE to all targets.

**Variable cost:** Cost is -1 (variable) with `minCost: 0`, `maxCost: 0` — always free.

**When adding new single-target familiar effects:**
- `trySneezeRocketAoeIntercept()` automatically intercepts in `activateFamiliar()`
- New effect types may need to be added to the intercept whitelist if they should support AoE
- Effects with `targetsNeeded > 1` are NOT intercepted (already multi-target)

**Key functions:** `trySneezeRocketAoeIntercept()`, `resolveSneezeRocketAoe()`,
`resolveSneezeRocketBardChain()`

**Key data:** `familiar.sneezeRocketStacks`, `room.sneezeRocketBardChain`

---

## 🐉 Coatl — Active: Delayed Proctor Approval + Passive: Student Undying

**Active (tap):** Owner selects a Proctor they don't already have approval for AND don't
already have a pending Coatl counter on. At the end of the NEXT round, that Proctor's
approval is granted to the player who activated Coatl (lingering — survives Coatl death,
controller change, etc.). If no eligible proctors exist, taps for no effect.

**Fizzle conditions at resolution:**
- Proctor is disabled (Buffoon) → no approval granted, counter removed
- Player already earned the approval by other means → counter removed
- Player left or won → counter removed

**Passive (board presence):** While Coatl (or Clone copying Coatl) is alive on the board,
its owner's student HP cannot drop below 1 from ANY damage source (combat, spells, poison,
storm, etc.). Direct kill effects (if any existed) would bypass this.

**Data structures:**
- `room.coatlCounters[]` — array of `{ playerId, playerName, proctorName, grantAtExamRound }`
- `grantAtExamRound = room.examRound + 2` at activation time (fires after next round's increment)
- Resolved in `continueNewExamRound()` before standard proctor approvals
- Broadcast to client as `state.coatlPending` (map: proctorName → [playerIds])

**Protection implementation:**
- `hasCoatlProtection(player)` — checks for living Coatl (by name, so Clone works)
- Applied in `resolveTargetDamage()` and `resolvePoisonDamage()` student branches
- HP floor changed from 0 to 1 when protection is active

**Visual:**
- 🐉 badge on protected students (both own and opponent boards)
- Coatl-pending proctor stamps: semi-transparent with green pulsing glow, distinct from
  natural pending stamps (which are plain semi-transparent)

**Key functions:**
- `getCoatlEligibleProctors(room, playerId)` — eligible proctors for selection
- `hasCoatlProtection(player)` — board presence check
- `buildCoatlPendingMap(room)` — broadcast helper

**Key data:** `room.coatlCounters[]`, `state.coatlPending`, `familiar.name === 'Coatl'`

---

## 🔮 Magic Modifier Spell Cost Override

**What:** At the start of each exam round (after snare placement), players with a Magic
Modifier equip are prompted to discard any number of cards (including 0). The average of
all owners' discard counts (rounded mathematically) becomes the flat spell cost for the
entire round. This override **cannot be changed by any other effect** (Chuunibyou, Chilly
Wizzy, Forbidden Grimoire, Magic Show — all ignored). Even variable-cost spells become
the fixed modifier cost. Persists even if the equip is destroyed mid-round.

**When adding a new spell cost modifier:**
- `getEffectiveSpellCost()` checks `room.magicModifierCost` FIRST — if set, it returns
  that value immediately, skipping all other cost logic
- Client-side `canAfford()` and `getEffectiveCost()` also check `lastState.magicModifierCost`
  as a flat override before any other reductions
- New cost-modifying effects should NOT bypass `magicModifierCost` — it is intentionally
  the highest-priority override

**Key functions:**
- `enterMagicModifierPhase(room)` — enters `magic-modifier-discard` sub-phase
- `checkMagicModifierComplete(room)` — averages counts, sets `room.magicModifierCost`
- `getEffectiveSpellCost()` — returns override when set

**Key data:** `room.magicModifierCost`, `room.magicModifierAnnouncement`, `player.magicModifierReady`

---

## 💎 Mana Absorbing Crystal Spell Cost Increase

**What:** Each Mana Absorbing Crystal on opponents' boards increases the cost of ALL
Spells cast by the player by 1. Multiple Crystals across multiple opponents stack.

**Cost priority (highest to lowest):**
1. Magic Modifier (`magicModifierCost`) — flat override, trumps everything
2. Crystal penalty — applied AFTER flat-zero effects (Magic Show, Grimoire)
3. Reductions (Chuunibyou -2, Chilly Wizzy -3) — applied AFTER Crystal increase

**Variable-cost spells (Frost Breaker):** Crystal doesn't increase the discard cost.
Instead, it reduces the effective targets: `targetsNeeded = max(0, paidCost + 1 - crystalPenalty)`.
The client warns the player when effective targets would be 0.

**Key functions:**
- `countOpponentCrystals(room, playerId)` — counts all Crystals on opponents' boards
- `getEffectiveSpellCost()` — integrates Crystal penalty into cost chain
- Client `canAfford()` / `getEffectiveCost()` — mirror server logic with `manaCrystalPenalty`

**Key data:** `state.you.manaCrystalPenalty` (broadcast per-player), equip name `'Mana Absorbing Crystal'`

---

## 🤖 Futuristic Mech Immunity

**What:** Futuristic Mech (and Clones copying it) is **immune to ALL non-damage effects**,
similar to Class Pet but scoped to a single familiar. This includes beneficial effects
(heal, energize, cure, Rain's Blessing) and hostile effects (poison, charm, exhaust,
bounce, delete, sacrifice-kill).

**Only allowed through:**
- Direct damage (attacks, spells, AoE, equip triggers)
- Death from damage (HP reaching 0)

**When adding a new non-damage effect that targets familiars:**
- Server: Call `isMechImmune(familiar)` before applying non-damage effects
- Client: Check `card.mechImmune` to exclude from non-damage targeting UI
- Target counting: `countExhaustTargets()` and similar functions already exclude Mech

**Key function:** `isMechImmune(familiar)` in server.js
**Key data:** `card.mechImmune` in broadcast state (set via `isGoldenHind(f)` pattern)

---

## 🦌 Golden Hind Immortality

**What:** Golden Hind (and Clones copying it) is **completely immune to ALL damage and
ALL killing**. It can **only** die through its own active upkeep effect (`golden-hind-upkeep`
cause). This is the strongest protection in the game — it survives Armageddon, Bomblebee
explosions, Storm damage, poison ticks, Undead Desert Worm deletion, Serpent Cultist
sacrifice, and everything else.

**Active upkeep:** Discard 1 card from hand, or kill the Hind. If the player has no cards,
Golden Hind auto-dies. Player can cancel out of the discard UI to take a different action
instead (canCancel: true).

**When adding a new effect that deals damage or kills familiars:**
- Server: Call `isGoldenHind(familiar)` and skip/block if true
- Client: Check `card.goldenHindImmune` to exclude from damage/kill targeting UI
- `resolveTargetDamage()` has a safety net that blocks damage even if a target leaks through
- `processFamiliarDeath()` has a guard that blocks death unless `cause === 'golden-hind-upkeep'`
- Target counting: `countAllDamageTargets()`, `countDeleteTargets()` already exclude Golden Hind
- AoE target building: All loops that build AoE target lists must skip `isGoldenHind(fam)`

**Non-damaging effects that DO work on Golden Hind:**
- Charm, exhaust, bounce, energize — all work normally
- Heal, cure, Rain's Blessing — all work normally

**When adding a new hasTarget/availability check for damage effects:**
- Always include `&& !isGoldenHind(f)` in the familiar filter

**Key function:** `isGoldenHind(familiar)` in server.js
**Key data:** `card.goldenHindImmune` in broadcast state

---

## 🔀 Gerrymander — Effect Redirect

**What:** Gerrymander is a unique familiar (only one can exist on the board at a time).
When an opponent activates a single-target effect, the Gerrymander controller gets to
**redirect** where that effect lands — choosing any valid target for that specific effect.

**Uniqueness enforcement:**
- Only one Gerrymander can exist on the board across all players
- Playing a second Gerrymander destroys all copies immediately
- Gerrymander cannot be summoned while one is already on board (blocked in play validation)
- Gerrymander is excluded from Clone's copy targets

**Redirect mechanics:**
- Applies to effects in `GERRYMANDERABLE_EFFECTS` (single-target damage, exhaust, delete,
  charm, energize, poison, cure, heal, bounce, sacrifice-attack target phase, etc.)
- Multi-phase effects (Serpent Cultist, Crimson Snare Sacrifice): redirect happens in the
  target selection phase only, not the sacrifice/snare selection phase
- The Gerrymander controller enters targeting mode and picks a valid target
- If the controller disconnects during redirect, their pending entry is cleaned up
- Reconnection restores the redirect targeting UI

**When adding a new single-target familiar effect:**
- Check if it should be added to `GERRYMANDERABLE_EFFECTS`
- If yes, the redirect automatically applies via `tryGerrymanderRedirect()`
- Ensure `gatherSneezeRocketAoeTargets()` / Gerrymander target building excludes
  immune targets (Class Pet, Mech, Golden Hind as appropriate)

**Key functions:** `isGerrymanderOnBoard(room)`, `findGerrymanderController(room, excludePlayerId)`,
`tryGerrymanderRedirect(room)`, `isGerrymanderableActivation(pa)`
**Key data:** `GERRYMANDERABLE_EFFECTS` set, `pa.gerrymanderPlayerId`, `state.gerrymanderOnBoard`

---

## 🗿 Gorgon Sister — Petrify (Tap + Energize Block)

**Active:** Select any 1 untapped Familiar or Student (any player's, but not herself).
Taps the target AND applies a **Petrified** debuff. Petrified targets cannot be energized
(Flame Fairy, Hell Pup, Frost Breaker, etc. cannot select them). Petrified clears at end
of round.

**Passive:** When Gorgon Sister dies (or is bounced/deleted), all targets *this specific
instance* petrified immediately lose their Petrified debuff AND become untapped.

**Instance tracking:** Each Gorgon Sister (including Clones) gets a unique `_gorgonId`
via `ensureGorgonId()`. Petrified targets store `petrifiedByGorgonId` so only the
correct Gorgon's death releases them.

**When adding a new energize-like effect:**
- Server: Check `fam.petrified` / `player.studentPetrified` before allowing energize
- Client: Check `card.petrified` / `opp.studentPetrified` to exclude from energize targeting
- `countFrostBreakerTargets()` already excludes petrified targets

**Blocked by:** Class Pet immunity (non-damage), Mech immunity (non-damage),
Chilly Dog passive (blocks opponent tap effects). Golden Hind is NOT blocked (non-damaging).

**Gerrymander:** `petrify-target` is in `GERRYMANDERABLE_EFFECTS`.
**Sneeze Rocket AoE:** Petrify has full AoE support (all untapped targets of chosen player).
**Siren/Bard copy:** Supported — copier gets own `_gorgonId`.

**Key functions:** `isGorgonSister(familiar)`, `ensureGorgonId(room, familiar)`,
`countPetrifyTargets(room, playerId, familiarIndex)`, `resolveGorgonSisterDeath(room, dead)`
**Key data:** `f.petrified`, `f.petrifiedByGorgonId`, `p.studentPetrified`,
`p.studentPetrifiedByGorgonId`, `pa.gorgonId`, `card.petrified` (broadcast)

---

## 🗡️ Harpy Warrior — Single-Target Damage + Guard Redirect

**Active — 5 Damage:**
Simple single-target hit for 5 damage. Card effect in `harpyWarrior.js`.

**Passive — Guard:**
At the start of every round, AFTER placing snares (and magic modifier), each alive Harpy
Warrior prompts its owner to choose one of their OTHER targets (familiar or student) to Guard.
The dialogue is game-stopping, reconnect-persistent, and uncancellable.
All players are prompted **simultaneously** (per-player state, like snare placement).

- `player.harpyGuardReady` — boolean, true when done or no Harpies
- `player.pendingHarpyGuard` — current prompt `{ familiarIndex, familiarName, eligibleTargets }`
- `player._harpyGuardQueue` — array of familiar indices remaining
- Does NOT use `room.pendingActivation` — fully per-player

- Cannot guard: itself, other Harpy Warriors, already-guarded targets
- If no valid targets → fizzles silently
- Guard resets every round (cleared alongside Taunt/White Bull/Gorgon at line ~3103,
  then `enterHarpyGuardPhaseOrTurns()` re-prompts)

**Damage Redirect:**
Any damage to the guarded target is redirected to the Harpy instead. Excess damage beyond
what kills the Harpy **vanishes** — it does NOT spill back to the original target.

**White Bull Interaction:**
- White Bull takes priority over Harpy Guard for non-Bull targets
- If Harpy guards the Bull specifically, damage flows: original target → Bull (White Bull
  passive) → Harpy (Guard redirect). This chain is handled in the White Bull application
  section of `resolveTargetDamage()`.

**Guard Cleanup:**
- `clearHarpyGuardsForLostTarget(player, type, idx)` — called when a guarded target
  leaves the board (death, bounce, deletion)
- `adjustHarpyGuardIndices(player, removedIndex)` — adjusts familiar indices when a
  familiar is spliced out
- Both called in `processFamiliarDeath()` / `deleteFamiliar()` paths

**Server-side helpers** (after line ~1374):
- `isHarpyWarrior(familiar)` — name/clone check
- `findHarpyGuardingTarget(player, targetType, familiarIndex)` — returns `{harpyIndex, harpy}` or null
- `clearHarpyGuardsForLostTarget(player, targetType, familiarIndex)`
- `adjustHarpyGuardIndices(player, removedIndex)`
- `clearAllHarpyGuards(room)` — round-start full clear
- `getHarpyGuardEligibleTargets(player, harpyFamiliarIndex)` — excludes self, other Harpies, already-guarded
- `enterHarpyGuardPhaseOrTurns(room)` — entry point after snares; builds per-player queues
- `advancePlayerHarpyGuard(room, player)` — pops player's queue, sets pendingHarpyGuard or marks ready
- `checkHarpyGuardComplete(room)` — checks all players ready, advances to turns

**Client-side:**
- Reads `state.you.pendingHarpyGuard` (per-player, NOT `state.pendingActivation`)
- `harpy-guard-select` targeting mode — student click and familiar click both emit
  `harpy:guardSelect` with `{ targetType, targetFamiliarIndex }`
- `harpy-guard-waiting` targeting mode — shown while waiting for other players
- Eligible targets highlighted; ineligible dimmed
- 🗡️ guard badge (`harpy-guard-badge`) shown on own/opponent familiars and students

**Disconnect handling:**
- If player disconnects during harpy-guard phase → mark `harpyGuardReady = true`, check complete
- Both temporary disconnect and permanent leave handlers updated

---

## 😈 Great Vanguard Demon — Familiar-Count Damage + Damage Aura

**Active — 2× Familiar Count Damage:**
Identical to Hell Demon — `damage = 2 × player's alive familiar count`. The effect file
(`greatVanguardDemon.js`) directly reuses `hellDemon()`.

**Passive — Damage Aura:**
For each alive Great Vanguard Demon a player controls, **all direct damage** dealt by the
player's **other** Familiars' effects is increased by the player's total alive familiar count.

Example: Player has 1 Vanguard Demon + 1 Hell Demon (2 familiars total):
- Vanguard active: 2×2 = 4 (no self-bonus)
- Hell Demon active: 2×2 + 2 = 6 (base 4 + Vanguard bonus of 1×2)

Two Vanguard Demons buff each other (but not themselves): with 2 Vanguards + 1 other
(3 familiars), each Vanguard gets +3 from the other Vanguard.

**What gets the bonus:**
- All familiar active effects (`damage-targets`, `energize`, `equip-damage-target`)
- Sneeze Rocket AoE (familiar's damage, just spread)
- Crimson Skull Spider passive damage
- Serpent Cultist sacrifice damage
- Bomblebee death explosion
- Bard copies (Bard is the player's own familiar)

**What does NOT get the bonus:**
- Siren charm (opponent's familiar acting, marked with `sirenCharm: true`)
- Class Rep command (opponent's familiar, marked with `classRepCommand`)
- Spells, Equips, Snare traps, Equip pet triggers
- Students

**Server-side:**
- `isGreatVanguardDemon(familiar)` — name/clone check
- `getVanguardDemonBonus(player, sourceIsVanguard)` — returns `vanguardCount × aliveCount`
  (with self-exclusion when `sourceIsVanguard` is true)
- `computeVanguardBonusForPA(room, pa)` — convenience wrapper that reads `pa.sourceType`,
  `pa.sirenCharm`, `pa.classRepCommand` to determine whether bonus applies; returns 0 for
  non-familiar sources, Siren, and Class Rep
- Bonus applied via `{ vanguardBonus }` option in `resolveTargetDamage()`, which adds the
  bonus to both flat `damage` and per-target `t.damage` values

**Key call sites modified:**
- Main `damage-targets` handler (line ~13100)
- Sneeze Rocket AoE handler
- Equip-damage-target (equip shred)
- Single-target and AoE energize
- Serpent Cultist sacrifice
- Crimson Skull Spider active (snare sacrifice) and passive
- Bomblebee explosion

---

## 🦖 Great King Trex — Single-Target Damage + Familiar Cost Reduction

**Active — 10 Damage:**
Tap → deal 10 damage to 1 target (familiar or student). Standard `damage-targets` with
`targetsNeeded: 1`. Same pattern as other single-target damage familiars. Blocked by Golden
Hind (immune to damage), Gerrymander-redirectable, Sneeze Rocket AoE-able.

**Passive — Familiar Cost Reduction:**
For each alive Great King Trex a player controls, the costs of their **other** (non-Trex)
Familiars are reduced by 2 (minimum 0). Applies to all summon paths from the player's own
hand or discard pile: prep phase, exam phase, Cute Bunny, Nerdy Cheese, Grave Crawler
phantom, Cute Familiar replacement, Caretaker summon, etc.

Great King Trex does NOT benefit from its own cost reduction — only other Familiars do.
Clone copying Trex counts as a Trex for the count but also doesn't get the self-discount.

**Server-side:**
- `getGreatKingTrexReduction(player)` — returns `count * 2` for alive Trexes
- `getEffectiveFamiliarCost(player, baseCost, cardName)` — applies Transfer Student + Trex
  reduction, excluding Trex self-discount when `cardName === 'Great King Trex'`
- All call sites pass card name as third argument

**State broadcast:**
- `familiarCostReduction` — total reduction (Transfer Student + Trex)
- `trexReduction` — Trex-specific portion (for client-side exclusion)

**Client-side:**
- `canAfford()` / `getEffectiveCost()` — subtract `trexReduction` from `fcr` when
  `card.name === 'Great King Trex'`
- Cost badge display: same Trex exclusion logic
- Caretaker picker `getFamCost()`: same Trex exclusion logic

---

## 🪦 Grave Crawler — Kill Familiar + Discard Summon

**Active — Kill Familiar:**
Tap → select **any** alive familiar (any player, CAN include itself) → instant kill via
`processFamiliarDeath()`. All on-death passives fire normally. Blocked by Golden Hind
(immune to killing), Class Pet (non-damage effect), Mech (non-damage effect).
Effect type `kill-familiar`, Gerrymander-redirectable, Sneeze Rocket AoE-able (kills ALL).

**Passive — Discard Pile Summon:**
While the player can summon a familiar (prep phase, untapped student turn, or effect-based
like Cute Bunny), each Grave Crawler in the discard pile appears as a **phantom card** at the
far right of the player's hand. The phantom is semi-transparent, dashed-border, labeled
"🪦 Discard". Clicking it summons the Grave Crawler from discard as if it was part of hand.

Phantom cards do **NOT** count as cards in hand — they can't be discarded, can't be targeted
by hand effects, and are excluded from hand-size counts.

**Effect-based summoning** (Cute Bunny `cute-bunny-summon`): When an effect lets the player
summon a familiar from hand, Grave Crawlers in discard also appear as selectable options.
The `fromDiscard: true, discardIndex` params route to the Grave Crawler discard path.

**Key functions:**
- `isGraveCrawler(fam)` — name check (+ Clone support)
- `getGraveCrawlersInDiscard(player)` — returns `[{ discardIndex, card }]`
- `countKillTargets(room, pid, idx)` — counts valid kill targets (includes self)
- Socket: `familiar:kill` — resolution handler for kill-familiar
- Socket: `game:playGraveCrawler` — phantom card summon from discard
- Socket: `familiar:cuteBunnySummon` with `fromDiscard: true` — Cute Bunny path

**State broadcast:**
- `you.graveCrawlersInDiscard` — array of `{ discardIndex, name, path, type, cost, hp }`

**Delete vs Kill distinction:**
- **Kill** (`kill-familiar`): `processFamiliarDeath()` → card goes to discard, all death passives fire
- **Delete** (`delete-familiar`): `processFamiliarDeath()` first (death passives fire), THEN card
  removed from discard pile (deleted from game entirely). Delete = kill + remove from game.

---

## 🧪 Potion Launcher — Item-From-Discard Activation

**What:** An equip that, after any basic student attack fully resolves, offers the player
a timed prompt to activate one eligible Item from their discard pile — paying its normal
cost from hand. Can only fire once per round (`itemUsedThisRound`). Multiple copies give
multiple charges (each checks the flag again after the previous charge resolves).

**Trigger position in the attack chain:**
`_doBerserkAndAdvance` → `_afterPossessedBladeRecoil` → **Potion Launcher prompt** →
`_afterPotionLauncher` → Berserk check → `advanceExamTurn`

Does **not** fire on Nerdy Cheese bonus cast (`pa.isNerdyCheeseBonusCast`) or Lifeforce
Howitzer shots.

**Multi-phase prompt lifecycle:**
1. `prompt` — 10-second Yes/No (timer stored on `room.pendingPotionLauncher`)
2. `select` — card-image picker (uses `revive-picker` UI, same as Scavenging Crane)
3. `paying` — normal Item payment flow from `pendingActivation`

**When adding a new Item:**
1. **Board-state eligibility** — add a guard to `getPotionLauncherEligibleItems()` if the
   item requires specific conditions (e.g. a poisoned target for Cool Drink)
2. **Dispatch case** — add a case in `dispatchPotionLauncherItemEffect()` if the item
   has a multi-step resolution (pending states). Items with no interaction resolve via
   the generic fall-through that calls `potionAfterFn()` directly
3. **Resolution handler** — if the item's socket handler ends with `broadcastRoomState(room)`,
   it must instead check `pa.potionLauncherAfterFn` first:
   ```js
   if (pa.potionLauncherAfterFn) {
     pa.potionLauncherAfterFn();
   } else {
     broadcastRoomState(room);
   }
   ```
4. **`damage-targets` / `poison-target` path** — items using these effectTypes resolve
   through `continueAfterNerdyCheese`, which already checks `pa.potionLauncherAfterFn`
   and sets `room._potionLauncherItemAfterFn` — no extra work needed
5. **Special case — own payment flow** — if the item has a built-in cost dialogue AFTER
   its target selection (like Sneeze Rocket), skip the Potion Launcher payment phase and
   dispatch directly. Set `potionAfterFn` as `pa.potionLauncherAfterFn` so it fires when
   the item's OWN resolution handler finishes

**Reconnect persistence:**
- `prompt` — timer restarted fresh on reconnect
- `select` — eligible items re-evaluated, picker restored
- `paying` — item restored to discard, drops back to `select`
- `swapSocketId()` updates `pendingPotionLauncher.playerId` on reconnect

**Key functions:**
- `countPotionLaunchers(player)` — equip count
- `getPotionLauncherEligibleItems(room, playerId)` — board-state-filtered discard Items
- `getPotionLauncherItemCost(player, card)` — effective cost (Mine Cart + Royal Corgi)
- `setupPotionLauncherPrompt(room, playerId, chargesRemaining, afterFn)` — starts the chain
- `dispatchPotionLauncherItemEffect(room, socket, player, card, paymentCards, prodigy, potionAfterFn, context)`

**Key data:** `room.pendingPotionLauncher` `{ phase, playerId, chargesRemaining, afterFn, timer, eligibleItems?, selectedItemCard?, cost? }`

---

## 🃏 Playing Cards — Crit Hit on Student Attack

**What:** An equip that, after a basic student attack hits 1+ targets but BEFORE Jetpack
evasion and damage, offers the attacker a 10-second prompt to discard one hand card and
double all damage. Multiple copies give multiple charges (sequential prompts). Doubling
applies to both `pa.damage` and all `pa.damageByType` entries before Jetpack and `_magnetResolveFn`.

**Trigger position in the attack chain:**
`familiar:confirmTargets` (after Magnet intercept check) → **Playing Cards prompt** →
Jetpack reaction → `_magnetResolveFn`

Only fires for:
- `pa.sourceType === 'student'` or `'summoned-student'`
- NOT `pa.isNerdyCheeseBonusCast`
- At least 1 target selected AND player has ≥1 card in hand

**When adding a new student attack source** that bypasses `familiar:confirmTargets`:
- Manually call `setupPlayingCardsPrompt()` before damage resolution if the source
  should support crits, following the same condition checks

**Reconnect:** auto-skips all remaining charges.

**Key functions:**
- `countPlayingCards(player)` — equip count
- `setupPlayingCardsPrompt(room, playerId, chargesRemaining, afterFn)` — starts the chain

**Key data:** `room.pendingPlayingCards` `{ playerId, chargesRemaining, afterFn, timer, phase? }`

---

## ⚔️ Possessed Blade — ATK Bonus + Recoil Damage

**What:** An equip that adds +8 ATK per copy to the student's base attack. After any
student attack resolves (including Berserk bonus attacks), each Possessed Blade deals
4 recoil damage to the **owner's own student** sequentially with ~350ms pauses.

**ATK bonus:** Applied in `getEffectiveStudentAtk()` — `possessedBladeBonus` added to
`bonusWithoutFists`.

**Recoil trigger position:**
`_doBerserkAndAdvance` → **`applyOneBladeRecoil()` chain** → `_afterPossessedBladeRecoil`

Only fires for:
- `isStudentAttack === true` AND NOT `pa.isNerdyCheeseBonusCast`

Does NOT fire on Lifeforce Howitzer shots (early return from `_doBerserkAndAdvance`).

**Recoil damage properties:**
- Applies Rain's Blessing reduction and Basic Armor reduction
- Applies Coatl HP floor (student can't die to recoil if Coatl is alive)
- Calls `trackStudentDamage()` → increments Doomsday Bomb counters, `roundStudentDamage`, `shyGirlDamagedThisRound`
- Triggers Heart of Ice exhaust queue
- Triggers Guardian Angel on lethal hit
- Does NOT trigger snares, Field Standard, or Cool Kid (self-inflicted)
- `isPossessedBladeRecoil: true` flag on `damageEvents`

**When adding new recoil-like self-damage effects:**
- Follow the same property list above — omitting e.g. snare triggers is intentional

---

## 🏷️ Quick Checklist for New Cards

When implementing a new card, verify against these:

- [ ] **Familiar effect?** → Can Siren/Bard copy it? Add to `canEffectActivate()` and
      `setupCopiedEffectActivation()` if so
- [ ] **Targets familiars?** → Check `hasClassPetImmunity(owner)` for non-damage effects
- [ ] **Deals damage?** → Use `resolveTargetDamage()` (handles snares + death + tracking)
- [ ] **Heals?** → Use `resolveTargetHeal()` (handles snare conversion)
- [ ] **Removes cards from board?** → Call `trackBoardRemoval()`
- [ ] **Played from hand?** → Call `trackCardPlayed()`
- [ ] **Forces discard?** → Call `trackHandDiscard()`
- [ ] **Taps a familiar?** → Use `tapFamiliar()` helper (Average Student tracking)
- [ ] **Involves spell costs?** → Use `getEffectiveSpellCost()` (Chuunibyou reduction, Magic Modifier override, Mana Crystal increase)
- [ ] **Modifies spell costs?** → Magic Modifier sets a flat override via `room.magicModifierCost` that **cannot** be changed by other effects; Mana Absorbing Crystal increases cost by 1 per Crystal on opponents' boards (applied before reductions, after flat overrides like Grimoire/Magic Show)
- [ ] **Grants proctor approval?** → Check `isProctorDisabled()` (Buffoon)
- [ ] **New student passive?** → Use `hasActiveStudentEffect()` (summoned student support)
- [ ] **Is a spell?** → Check `room.noSpells` (Imp King)
- [ ] **Commandable by Class Rep?** → Effects resolve with Class Rep as instigator
- [ ] **Deals damage to familiars?** → Cool Kid auto-intercepts in `resolveTargetDamage()`
- [ ] **Adds familiar to player's board?** → Call `trackFamiliarGained()` (Loner escape)
- [ ] **Costs a Familiar?** → Use `getEffectiveFamiliarCost()` (Transfer Student reduction)
- [ ] **Applies poison to familiars?** → Track `transferSelfPoisoned` if owner poisons own marked familiar
- [ ] **Bounces a familiar?** → Transfer Student escape ruined if marked familiar bounced
- [ ] **New Familiar passive?** → Clone automatically inherits name-based passives; verify non-name-based ones
- [ ] **Effect taps targets?** → Set `room._effectTapOccurred = true` (Chilly Wizzy reaction)
- [ ] **Single-target Familiar effect?** → Sneeze Rocket AoE intercept applies automatically
- [ ] **Variable-cost spell?** → Set `minCost`/`maxCost` in `MIN_VARIABLE_COST`/`MAX_VARIABLE_COST`; ensure CW payment path handles it
- [ ] **Deals damage to students?** → Coatl protection floors HP at 1 (automatic in `resolveTargetDamage`/`resolvePoisonDamage`)
- [ ] **Targets familiars with non-damage effects?** → Check `isMechImmune(fam)` (Futuristic Mech blocks all non-damage)
- [ ] **Deals damage or kills familiars?** → Check `isGoldenHind(fam)` and skip (immune to ALL damage and killing)
- [ ] **Builds AoE/hasTarget checks for damage?** → Exclude Golden Hind from familiar filters (`!isGoldenHind(f)`)
- [ ] **New single-target familiar effect?** → Consider adding to `GERRYMANDERABLE_EFFECTS` (Gerrymander redirect)
- [ ] **Energize-like effect (untap + damage)?** → Check `fam.petrified` / `player.studentPetrified` (Gorgon Sister blocks energize)
- [ ] **Kills a familiar?** → Use `processFamiliarDeath()` for kills (triggers all death passives); use `deleteFamiliar()` for delete (kills first, then removes from game)
- [ ] **Summons from hand?** → Consider whether Grave Crawlers in discard should appear as options (Cute Bunny-style integration)
- [ ] **Reduces familiar costs?** → Update `getEffectiveFamiliarCost()` + both `familiarCostReduction` broadcasts + client `canAfford`/`getEffectiveCost` (see Great King Trex pattern)
- [ ] **Deals familiar damage?** → Pass `{ vanguardBonus: computeVanguardBonusForPA(room, pa) }` to `resolveTargetDamage()` (see Great Vanguard Demon pattern)
- [ ] **Removes a familiar/student from board?** → Call `clearHarpyGuardsForLostTarget()` + `adjustHarpyGuardIndices()` (Harpy Warrior guard cleanup)
- [ ] **New Item card?** → Check Potion Launcher AND Copy Device interactions (see those sections):
  - Add board-state guard to **both** `getPotionLauncherEligibleItems()` and `getCopyDeviceEligibleItems()`
  - Add dispatch case to `dispatchPotionLauncherItemEffect()` if it has multi-step resolution
  - If its resolution handler ends with `broadcastRoomState()`, check `pa.potionLauncherAfterFn` first
  - Items using `damage-targets` / `poison-target` effectTypes are handled automatically via `continueAfterNerdyCheese`
  - Items with their own built-in payment dialogue: skip PL payment phase, set `potionAfterFn` as `pa.potionLauncherAfterFn`
  - Always-ineligible items (reactive-only / no manual trigger): add to `POTION_LAUNCHER_INELIGIBLE_ITEMS`
- [ ] **New student attack source?** → Check whether Playing Cards and Possessed Blade should fire (both skip `pa.isNerdyCheeseBonusCast` and Lifeforce Howitzer; Playing Cards also requires `sourceType === 'student'/'summoned-student'`)
- [ ] **New single-target effect (targetsNeeded === 1)?** → Add effectType to `FLASHBANG_SINGLE_TARGET_TYPES` (see Flashbang section)
- [ ] **New equip trigger targeting 1 student/familiar?** → Add to `isFlashbangBlockedEquipTrigger()` if it should be Flashbang-blocked
- [ ] **New effect targeting an opponent's student?** → Call `tryConsumeInvisibleStack(room, targetPlayer)` before applying; skip if it returns true (see Invisibility Cloak section)
- [ ] **New healing source?** → Route through `resolveTargetHeal()` so Lifeforce Howitzer fires automatically
- [ ] **New forced-discard effect?** → Set `pickaxeSkippable: hasPickaxe(player)` on `pendingActivation`; add a case to `pickaxe:skip` handler (see Pickaxe section)

---

## 📠 Copy Device — Item-From-Any-Discard Copy (Free)

**What:** An Item that lets the player pick any eligible Item from **any** player's discard pile
and activate its effect for free. The original card stays in the owner's discard (it is copied,
not taken). Exception: Deepsea Idol is removed from the source discard to prevent duplication.

**Eligibility (same as Potion Launcher, plus one extra rule):**
- `POTION_LAUNCHER_INELIGIBLE_ITEMS` exclusion set applies to both Copy Device and Potion Launcher
- Variable-cost items (`cost === -1`) are excluded
- Copy Device cannot copy itself
- All board-state guards in `getCopyDeviceEligibleItems()` mirror those in `getPotionLauncherEligibleItems()`

**Resolution:** Uses `dispatchPotionLauncherItemEffect()` — the same resolution path as Potion Launcher.
After selection, Copy Device and any payment are committed to discard; the copied item's effect is
executed with `_noPushDiscard: true` so the copy never enters any discard pile itself.

**Reconnect handling:** On reconnect, eligible items are re-evaluated. If none remain, Copy Device
and payment are silently returned to hand and `itemUsedThisRound` is cleared.

**When adding a new Item:**
1. Add board-state guard to **both** `getPotionLauncherEligibleItems()` and `getCopyDeviceEligibleItems()`
2. Add dispatch case to `dispatchPotionLauncherItemEffect()` if the item has multi-step resolution
3. If the item is always ineligible (reactive-only / no manual trigger), add it to `POTION_LAUNCHER_INELIGIBLE_ITEMS`

**Key functions:**
- `getCopyDeviceEligibleItems(room, activatorId)` — board-state-filtered Items from all discards
- `dispatchPotionLauncherItemEffect(...)` — shared resolution path (same as Potion Launcher)
- `POTION_LAUNCHER_INELIGIBLE_ITEMS` — shared Set of always-excluded item names

**Key data:** `room.pendingCopyDevice` `{ playerId, eligibleItems, heldCard, heldPayment }`

---

## 🃏 Heart of Cards — Copy Any Card from Opponent's Hand

**What:** An Item that lets the player pick an opponent and one card from that opponent's hand.
The revealed card's effect is executed immediately. The outcome depends on the copied card's type:

| Type | Outcome |
|------|---------|
| **Familiar** | Summoned to the activator's board as a Familiar (HoC becomes that Familiar permanently) |
| **Equip** | Immediately equipped to activator's student (HoC becomes that Equip permanently) |
| **Spell** | Cast immediately; field spells placed permanently, others resolve and HoC goes to discard |
| **Item** | Activated immediately; HoC goes to activator's discard afterward |
| Variable-cost spell, vanilla spell, no-target Familiar | Fizzles — HoC goes to discard |

**Permanent copies (`heartOfCardsCopy: true`):** Familiars and Equips that result from Heart of Cards
carry this flag. When they leave the board for any reason (destroyed, bounced, stolen, etc.),
`revertHeartOfCardsCard()` converts them back into a plain "Heart of Cards" item card before
sending to hand or discard.

**Key call sites for revert:**
- Equip destruction (`destroyEquip()`)
- Equip returned to hand (bounce effects)
- Familiar death / deletion (`processFamiliarDeath()`)

**Ineligibility:** Heart of Cards is in `POTION_LAUNCHER_INELIGIBLE_ITEMS` and cannot itself be
activated via Potion Launcher or Copy Device.

**When adding new permanent board effects (equip or familiar interactions):**
- If your code removes a HoC-sourced equip or familiar, call `revertHeartOfCardsCard()` first
- If you add a new Item activation path (like Copy Device), route it through
  `dispatchPotionLauncherItemEffect()` so Heart of Cards items resolve correctly

**Key functions:**
- `getHeartOfCardsEligibleOpponents(room, activatorId)` — opponents with non-empty hands
- `revertHeartOfCardsCard(card)` — strips copy properties, returns plain HoC item card
- `dispatchPotionLauncherItemEffect(...)` — shared Item resolution (used for copied Items)

---

## 💥 Flashbang — Single-Target Effect Suppressor

**What:** An Item that sets `room.flashbanged = true` for the rest of the current round.
While flashbanged, any action that would prompt a player to select **exactly 1** Student or
Familiar target fizzles immediately (card consumed, tap applied, no effect).

**What is blocked:**

*Fixed single-target effectTypes* (`FLASHBANG_SINGLE_TARGET_TYPES` Set — add new ones here):
- `energize`, `exhaust-familiar`, `charm-familiar`, `petrify-target`, `delete-familiar`,
  `kill-familiar`, `rains-blessing-target`, `leprechaun-bless`, `giga-steroids-buff`,
  `sneeze-rocket-pick`, `school-idol-charm`, `ifrit-target`, `spell-damage-target`,
  `burning-finger-target`, `energy-drain-target`, `cure-target`, `serpent-bite-target`,
  `venom-infusion-target`, `sun-beam-target`, `action-figures-pick`, `metalhead-shred`,
  `relocate-equip`, `sacrifice-attack`, `guardian-transfer`, `clone-select`

*Variable-count effectTypes blocked only when `targetsNeeded === 1`:*
- `damage-targets`, `heal-target`, `poison-target`, `multi-energize`, `vulture-exhaust`
- Exception: `pa.edgelordAttack === true` is never blocked (1 target per player = multi-target overall)

*Equip triggers blocked* (`isFlashbangBlockedEquipTrigger()`):
- `bounce-familiar`, `equip-damage-target`

**What is NOT blocked:**
- AoE effects (targetsNeeded > 1)
- Edgelord attacks
- Effects on the activator's own pieces (self-targeting)
- Familiar passives / passive-only effects

**When adding a new single-target effect:**
- Add its effectType to `FLASHBANG_SINGLE_TARGET_TYPES`
- If it's a new equip trigger, add it to `isFlashbangBlockedEquipTrigger()`
- For variable-count effects that can be single (targetsNeeded === 1), they are handled automatically

**Key state:** `room.flashbanged` (boolean, cleared at round start in `startNewExamRound`)
**Key functions:** `isFlashbangBlocked(pa)`, `isFlashbangBlockedEquipTrigger(pet)`, `doFlashbangSpellFizzle(...)`

---

## 👻 Invisibility Cloak — Per-Stack Opponent Effect Shield

**What:** An Equip that grants the owner's student `invisibleStacks` equal to the number of
Invisibility Cloaks equipped. Each stack blocks **one opponent effect** that targets the student,
consuming that stack. Stacks are refreshed at the start of every round (including after frozen
turn cycle resets) and cleared at round end.

**What it blocks (any effect from an opponent targeting the student):**
- All damage (in `resolveTargetDamage` — including AoE, any source — even friendly fire is blocked
  at this point; the check reads ANY source when `invisibleStacks > 0`)
- Poison effects from Items, Snares (Toxic Trap), Familiar passives (Neurotoxin)
- Charm / untap / energize / exhaust / petrify effects on the student
- Spell effects targeting the student
- Steal / swap effects
- Equip triggers targeting the student

**What it does NOT block:**
- Effects targeting the player's Familiars (stacks only protect the student)
- The owner's own effects on their own student (most checks guard `targetPlayerId !== activatorId`)

**Stack management:**
- `p.invisibleStacks = countInvisibilityCloaks(p)` set at round start + frozen-turn-cycle reset
- `clampInvisibleStacks(player)` called whenever a Cloak is removed (destroyed, reverted, etc.)
- `clearAllInvisibleStacks(room)` called in `startNewExamRound` at round end

**When adding a new effect that targets an opponent's student:**
```js
if (tryConsumeInvisibleStack(room, targetPlayer)) {
  // Effect is blocked — skip application
  return; // or continue;
}
// Apply effect normally
```
Call this immediately before applying the effect. `tryConsumeInvisibleStack` returns `true` and
records a `invisibleBlockEvents` entry (triggers the client shield animation) if blocked.

**Key functions:**
- `tryConsumeInvisibleStack(room, player)` — consumes 1 stack, returns true if blocked
- `clampInvisibleStacks(player)` — call after any Cloak is removed
- `clearAllInvisibleStacks(room)` — round-end clear
- `countInvisibilityCloaks(player)` — equip count

**Key data:** `player.invisibleStacks` (number); `room.invisibleBlockEvents[]` (animation)

---

## 🔫 Lifeforce Howitzer — Heal-Reactive Shot

**What:** An Equip that fires a shot whenever the owner's student is healed. Each Howitzer
fires one shot per student heal event. Shot damage = the actual heal amount applied (after
HP-cap clamping). The shot prompts the Howitzer owner to select any target **except** the
student that was just healed.

**Trigger:** Inside `resolveTargetHeal()`, after heals are applied to students. A shot is
queued for each `(student healed × Howitzer count)` combination. Shots are processed
sequentially via `_processHowitzerQueue()`.

**What triggers the Howitzer:**
Any healing routed through `resolveTargetHeal()` — familiar effects, spells, items, equip triggers,
snare reactions, etc.

**What does NOT trigger the Howitzer:**
- Familiar HP restoration (only student heals count — `eh.type !== 'student'` skips the queue)
- Possessed Blade recoil (`_doBerserkAndAdvance` has an early return before Howitzer)
- Nerdy Cheese bonus cast path (same early return)
- The Howitzer shot itself (it uses a separate continuation path that doesn't re-enter `resolveTargetHeal`)

**Shot properties:**
- `pa.howitzerShot: true` — marks this as a Howitzer activation (not a normal student attack)
- `pa.howitzerExcludeStudent` — prevents targeting the healed student
- Fires as a student attack projectile animation (green energy bolt)
- Does NOT trigger Playing Cards or Possessed Blade recoil (checked in `_doBerserkAndAdvance`)

**When adding a new healing source:**
- Always route through `resolveTargetHeal(room, healTargets, sourceInfo, afterFn)` — the Howitzer
  hook lives there and fires automatically
- Do **not** modify `currentHp` directly unless intentionally bypassing the Howitzer

**Key functions:**
- `hasHowitzer(player)` — equip presence check
- `countHowitzers(player)` — equip count (for multi-shot)
- `_processHowitzerQueue(room, queue, afterFn)` — sequential shot processor
- `resolveTargetHeal(room, healTargets, sourceInfo, afterFn)` — mandatory routing point

---

## ⛏️ Pickaxe — Forced-Discard Skip

**What:** An Equip that lets the owner skip any effect that forces them to discard cards from
their hand. When a `pendingActivation` has `pickaxeSkippable: true`, the player sees a
"Skip (Pickaxe)" button in the client and can emit `pickaxe:skip` to avoid the discard.

**Covered effectTypes** (handled in `pickaxe:skip` socket handler):

| effectType | Source | Notes |
|------------|--------|-------|
| `awaiting-discard` | Forced opponent-discard effects (e.g. Burned Contract, Hat of Madness owner penalty) | Multi-player queue; each queued player gets their own skip check |
| `self-discard` | Familiar's own discard cost (e.g. Scavenging Crane, clones of self-discard familiars) | Taps source familiar as normal, skip the discard only |
| `golden-hind-upkeep` | Golden Hind upkeep card payment | Tap source, skip the discard |

**When adding a new effect that forces a hand discard:**
1. Set `pickaxeSkippable: hasPickaxe(player)` on the `pendingActivation` object
2. Add a case to the `pickaxe:skip` socket handler that resolves the pending state cleanly
   (tap the source if applicable, clear `pendingActivation`, call afterFn or `advanceExamTurn`)
3. If the discard loops through multiple players (like `awaiting-discard`), propagate
   `pickaxeSkippable: hasPickaxe(nextPlayer)` to each next player in the queue

**Key function:** `hasPickaxe(player)` — equip presence check
**Key handler:** `socket.on('pickaxe:skip', ...)` — covers all three effectTypes above

