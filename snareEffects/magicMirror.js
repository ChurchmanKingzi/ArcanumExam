/**
 * Magic Mirror — Snare
 *
 * Trigger: An opponent casts a Spell through any means — hand-cast by
 * Student, familiar-cast (Chilly Wizzy, Skeleton Mage), or via another
 * spell effect (Chaos Magic, Aurora Borealis).
 *
 * Effect: The original Spell fizzles (caster still taps, costs still paid).
 * Then the Magic Mirror owner's Student casts a free copy of that Spell.
 * If the copy has no eligible targets, it fizzles silently.
 * The Mirror owner's Student is NOT tapped from the free copy.
 */
export default {
  checkTrigger(trigger, ownerId) {
    // Student hand-cast spells (instant + targeting) — fires at declaration
    if (trigger.type === 'spell-cast-by-student') {
      return trigger.casterPlayerId !== ownerId;
    }
    // Non-hand-cast spells (familiar, copy, chaos) — fires before resolution
    if (trigger.type === 'spell-non-hand-cast') {
      return trigger.casterPlayerId !== ownerId;
    }
    return false;
  },

  effect: {
    type: 'magic-mirror-reflect',
  },
};
