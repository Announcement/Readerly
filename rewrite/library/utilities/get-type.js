/**
 * Get typeof an object.
 * @method typeof5
 *
 * @param {?} it - Item to find the type of.
 *
 * @returns {string} Representing the type.
 */
function typeof5 (it) {
  let toString
  let string
  let list
  let second
  let section
  let lowercase

  toString = Object.prototype.toString
  string = toString.call(it)
  list = string.split(' ')
  second = list[1]
  section = second.slice(0, -1)
  lowercase = section.toLowerCase()

  return lowercase
}

export default typeof5
