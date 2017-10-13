/* WordSplitter.js
*
* Based on https://github.com/jamestomasino/read_plugin/blob/master/ReadBlock.js
*
* Split a word into fragments based on... its length?
*/

// ;(function(root, splitFactory) {
//   // root is usually `window`
//   if (typeof define === 'function' && define.amd) {
//     // AMD. Register as an anonymous module.
//     define([], function() {
//       return (root.WordSplitter = splitFactory())
//     })
//   } else if (typeof module === 'object' && module.exports) {
//     // Node. Does not work with strict CommonJS, but only CommonJS-like
//     // environments that support module.exports, like Node.
//     module.exports = splitFactory()
//   } else {
//     // Browser globals
//     root.WordSplitter = splitFactory()
//   }
// })(this, function() {
//   'use strict'

var WordSplitter = function(charsNode, settings) {
  /* ( DOM Node, {} ) -> WordSplitter
	*
	* Returns an object that takes a string and returns an array
	* of strings, each of which isn't longer than it should
	* be.
	*/
  var rSpt = {}

  // ============= SETUP ============= \\

  rSpt.charsNode = charsNode // No reason I can see for this to be changed later, but still

  // ============= RUNTIME ============= \\

  rSpt._getMaxLength = function(word, styles) {
    // Get the max letters that can fit in the width
    var pxWidth = parseFloat(styles['width'].replace('px', '')),
      fontSize = parseFloat(styles['font-size'].replace('px', ''))

    var remWidth = Math.floor(pxWidth / fontSize)
    // Get the max letters that are allowed by the user
    // var userMaxChars = _wSetts.maxNumCharacters;
    var userMaxChars = settings._settings.maxNumCharacters
    // Get the smaller of the two (the limiting factor)
    var maxChars = Math.min(userMaxChars, remWidth)

    return maxChars
  } // End rSpt._getMaxLength()

  rSpt._makeCharsMap = function(chars, maxWithHyphen) {
    /* ( str, int ) -> [Int]
		*
		* Return an array of how many groups of how many strings
		* the final word array should contain.
		*/
    var splitGroupLengths = [],
      evenly = Math.floor(chars.length / maxWithHyphen)

    // If we were to split the word evenly, how many letters would
    // go in each group? How many groups would there be? (not counting the remainder)
    for (let numi = 0; numi < evenly; numi++) {
      splitGroupLengths.push(maxWithHyphen)
    }

    // Find how much would remain after dividing the string evenly
    // If there's an imbalance, redistribute a bit
    var remainder = chars.length % maxWithHyphen,
      // How many letters are missing
      needed = maxWithHyphen - remainder,
      // We'll add some back in by taking away letters from others
      halved = Math.floor(needed / 2),
      // `havled` removes characters counts from other items
      // Have to remember to add them to the very end (the remainder)
      toAddBack = halved + remainder

    // And add that back into the mix, distributed in a... sensical? way
    // Right now: letters are removed from the starting strings in
    // order to make up for the last string (really I'd rather take from
    // every other group, visiting all eventually, but this is just
    // proof of concept)
    // Do that before adding the last group so we don't mess with the last group amount
    var lastIndx = splitGroupLengths.length,
      indx = 0
    while (halved > 0) {
      splitGroupLengths[indx] = splitGroupLengths[indx] - 1

      indx = indx + 1
      // Start from the beginning string again if more need to be redistributed
      indx = indx % lastIndx
      halved = halved - 1
    }

    splitGroupLengths.push(toAddBack)

    return splitGroupLengths
  } // End rSpt._makeCharsMap()

  rSpt._splitWord = function(chars, maxChars) {
    /* ( str, int ) -> [ str ]
		     *
		     * Returns `chars` as string split into, ideally, syllables,
		     * but in actual fact, just into parts of aproximately a
		     * certain length that each isn't longer than `maxChars`
		     *
		     * Note: Hyphens are added and accounted for.
		     */
    var split = []

    // If it doesn't need to be broken up at all, just return what we have in an array
    if (chars.length <= maxChars) {
      return [chars]
    }

    // TODO: Allow custom inclusion of hyphens. If hyphens are excluded
    // suggest whitespace indicators instead.
    // ??: If maxChars < 4, suggest space indicators instead of hypens?

    // If it's just one character long, it's super easy. There's
    // not even room for a hyphen. ??: Suggest whitespace indicators?
    if (maxChars === 1) {
      return chars.split('')
    }

    // Detect code snippets
    let specialCharacters = chars.match(
      /[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]/g
    )
    let specialCharacterCount =
      specialCharacters != null ? specialCharacters.length : 0
    let hasSpace = chars.includes(' ')

    if (
      ((hasSpace || specialCharacterCount / chars.length > 0.2) &&
        !chars.match(/([a-zA-Z]|[ά-ωΑ-ώ])[-]([a-zA-Z]|[ά-ωΑ-ώ])/g)) ||
      chars.match(
        /([a-zA-Z]|[ά-ωΑ-ώ])+[.]([a-zA-Z]|[ά-ωΑ-ώ])+[.]([a-zA-Z]|[ά-ωΑ-ώ])+[;]/g
      )
    ) {
      return [chars]
    }

    // Remember we're adding a dash to break up words
    var maxWithHyphen = maxChars - 1,
      maybeHyphen = '-'
    // No dash for less than 4 characters
    if (maxChars < 4) {
      maxWithHyphen = maxChars
      maybeHyphen = ''
    }

    var splitMap = rSpt._makeCharsMap(chars, maxWithHyphen)

    // Build the list of strings with the right number of letters
    // as determined by the map
    var start = 0
    for (let numi = 0; numi < splitMap.length; numi++) {
      let str = chars.slice(start, start + splitMap[numi])

      // Make sure last string doesn't get a hyphen
      if (numi < splitMap.length - 1) {
        // A string that already ends with a hyphen shouldn't get /another/ hypen
        if (!/-/.test(str)) {
          str = str + maybeHyphen
        }
      }

      split.push(str)
      // Start the next one where we finished this one
      start = start + splitMap[numi]
    }

    return split
  } // End rSpt._splitWord()

  // ========== EXTERNAL ========== \\

  rSpt.process = function(chars) {
    // Check the chars' container node each time in case its size has changed
    var styles = window.getComputedStyle(rSpt.charsNode),
      maxLength = rSpt._getMaxLength(chars, styles)

    var split = rSpt._splitWord(chars, maxLength)

    return split
  } // End rSpt.process()

  return rSpt
} // End WordSplitter() -> {}
export default WordSplitter
//   return WordSplitter
// })
