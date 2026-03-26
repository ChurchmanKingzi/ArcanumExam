/**
 * Undead Desert Worm — Active: Select any familiar (except itself) and Delete it
 * (remove from game entirely, not to discard). Blocked by Class Pet immunity.
 */
export default function undeadDesertWorm(familiar, context) {
  return {
    effectType: 'delete-familiar',
  };
}
