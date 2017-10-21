/**
 * Sometimes it is not safe to reference a variable without typeof in front of it.
 * @method dangerous
 * @param {object} it - Any random object to be tested for safety.
 * @returns {boolean} Representing safeness.
 */
function dangerous (it) {
  return typeof it === 'undefined'
}

/**
 * Compare an item to undefined and null.
 * @method empty
 * @param {object} it - Item to be tested for existance.
 * @returns {boolean} Representing an item's existance.
 */
function empty (it) {
  return it === undefined || it === null
}

/**
 * Run an exists comparison, except now safely.
 * @method safe
 * @param {object} it - Item to be tested.
 * @returns {boolean} Representing an items existance.
 */
export default function safe (it) {
  return dangerous(it) || empty(it)
}
