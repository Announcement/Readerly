'use strict';

/* Parser.js
 *
 * Make your own parser if you want, as long as
 * its .parse() returns a list of lists of strings.
 * (list of sentences which are lists of words)
 */

const $$1 = require('jquery');

// (function (root, parserFactory) {  // root is usually `window`
//     if (typeof define === 'function' && define.amd) {  // amd if possible
//         // AMD. Register as an anonymous module.
//         define( ['jquery'], function (jquery) { return (root.Parser = parserFactory(jquery) ); });
//     } else if (typeof module === 'object' && module.exports) {  // Node-ish next
//         // Node. Does not work with strict CommonJS, but only CommonJS-like
//         // environments that support module.exports, like Node.
//         module.exports = parserFactory( require('jquery') );
//     } else {  // Global if nothing else
//         // Browser globals
//         root.Parser = parserFactory( jQuery );
//     }
// }(this, function ($) {
/* (jQuery) -> Parser Constructor */

// "use strict";

// beware, this syntax has changed from numbered to labeled arguments.

var Parser = function({
  cleanNode,
  detectLanguage,
  findArticle,
  cleanText,
  splitSentences
}) {
  /* (func, func, func, func) -> Parser
    *
    * Given a set of functions, returns an object that can use those modules to
    * extract text as a list of sentences. If all that's being passed in is
    * text (not a DOM node), the only required modules are 'cleanText' and `splitSentences`.
    *
    * - 'cleanNode' accepts a DOM node and removes unwanted elements
    * - `detectLanguage` accepts a string of text and returns the code
    * for the detected language
    * - `findArticle` uses that language and a DOM Node containing text
    * to return the main text of the article
    * - `cleanText` accepts a string and does something (or nothing) to
    * it, then returns the changed (or same) string
    * - `splitSentences` accepts text (best with English) and returns a
    * list of sentences containing lists of words
    */
  var rPar = {};

  rPar.language = 'en';

  rPar.debug = true;

  rPar.cleanHTML = function($node) {
    // Remove unwanted nodes from the text
    $node.find('sup').remove();
    // These would have English, so they'd skew language detection results
    $node.find('script').remove();
    $node.find('style').remove();
    return $node
  };

  rPar.smallSample = function(node, desiredSampleLength) {
    /* ( jQuery Node, [int] ) -> Str
		*
		* Get a sample of the text (probably to use in detecting language)
		* A hack for language detection for now until language detection
		* is made lazy.
		*/
    var $node = $$1(node),
      halfSampleLength = desiredSampleLength / 2 || 500;

    var text = $node.text();
    text = text.replace(/\s\s+/g, ' ');

    // Average letter length of an English word = ~5 characters + a space
    var aproxNumWords = Math.floor(text.length / 6),
      halfNumWords = aproxNumWords / 2;

    // Want to get as close to 1k words as possible
    var startingPoint, length;
    if (halfNumWords > halfSampleLength) {
      length = halfSampleLength * 2;
      startingPoint = halfNumWords - halfSampleLength;
    } else {
      length = text.length;
      startingPoint = 0;
    }

    var sample = text.slice(startingPoint, startingPoint + length);

    if (rPar.debug) {
      // Help non-coder devs identify some bugs
      console.log(
        '~~~parse debug~~~ text sample to send to language detection (Readerly code, not from a library or package):',
        sample
      );
    }

    return sample
  }; // End rPar.smallSample()

  rPar.parse = function(input) {
    if (Array.isArray(input)) {
      return input
        .map(item => {
          if (item.splitMethod === 'sentences') {
            var temp = item.text;
            var temp = temp.replace(/(\r\n|\n|\r)/gm, ' ');
            return splitSentences(temp)
          } else if (item.splitMethod === 'lines') {
            return item.text.split('\n').map(line => {
              return [line]
            })
          } else {
            throw new Error(`Received invalid input: ${input}`)
          }
        })
        .reduce((combined, array) => {
          return combined.concat(array)
        }, [])
    } else {
      var rawText = '';

      if (typeof input === 'string') {
        rawText = input;
      } else {
        /* A DOM node was passed in */
        var $node = $$1(input);

        var clone = $node.clone()[0],
          clean = cleanNode(clone);

        var sampleText = rPar.smallSample(clean),
          lang = detectLanguage(sampleText);
        rPar.language = lang;

        rawText = findArticle(clean, lang);
      }

      var refinedText = cleanText(rawText);
      return splitSentences(refinedText)
    }
  }; // End rPar.parse()

  return rPar
}; // End Parser() -> {}

//     return Parser;
// }));

/* ParserSetup.js
*
* Sets up options/functions for parser
*/

let $$2 = require('jquery');

let franc = require('franc');
let langCodes = require('./lib/parse/iso-639.json');
let unfluff = require('@knod/unfluff');
let sbd = require('@knod/sbd');

// import * as $ from 'jquery'
// import * as franc from 'franc'
// import * as langCodes from './parse/iso-639.json'
// import * as unfluff from '@knod/unfluff'
// import * as sbd from '@knod/sbd'

/* (jQuery, {}, {}, {}, {}) -> Parser Setup Constructor */

var ParserSetup = function () {
  /* () -> ParserSetup
    *
    * Builds the options needed for the parser
    */
  var rSup = {};

  rSup.debug = false;

  rSup.cleanNode = function (node) {
    /* ( DOM Node ) -> same DOM Node
    	*
    	* Removes unwanted elements from the node and returns it.
        * TODO: Add 'head' (not 'iframe', though)
	    */
    var $node = $$2(node),
      // 'sup' has been declared distracting
      // 'script' and 'style' have English, skewing language detection results
      toRemove = ['sup', 'script', 'style', 'head'];

    for (let tagi = 0; tagi < toRemove.length; tagi++) {
      let tag = toRemove[tagi];
      $node.find(tag).remove();
    }

    return $node[0]
  };

  rSup.detectLanguage = function (text) {
    /* ( Str ) -> iso6391 language code Str
    	*
    	* Best guess. Defaults to English if none other is found.
    	*/
    var lang = franc(
      text,
      // The languages unfluff can handle atm
      {
        whitelist: [
          'ara',
          'bul',
          'ces',
          'dan',
          'deu',
          'ell',
          'eng',
          'spa',
          'fin',
          'fra',
          'hun',
          'ind',
          'ita',
          'kor',
          'nob',
          'nor',
          'pol',
          'por',
          'rus',
          'swe',
          'tha',
          'tur',
          'zho'
        ]
      }
    );
    if (lang === 'und') {
      lang = 'eng';
    }

    var iso6391Lang = langCodes[lang].iso6391;

    if (rSup.debug) {
      // Help non-coder devs identify some bugs
      console.log(
        '~~~parse debug~~~ language detected:',
        lang,
        '->',
        iso6391Lang
      );
    }

    return iso6391Lang
  }; // End rSup.detectLanguage()

  rSup.findArticle = function (node, lang) {
    /* ( DOM Node, Str ) -> Str
    	*
    	* Uses the language `lang` and a DOM Node to return
    	* the best guess at the main text of the article
	    */
    var html = $$2(node).html(),
      cmds = unfluff.lazy(html, lang),
      text = cmds.text();
    text = text.replace(/(\r\n|\n|\r)/gm, ' ');
    text = text.replace(/\s\s+/g, ' ');

    // Last ditch effort to get something if unfluff doesn't
    // get anything
    if (!text) {
      text = $$2(node).text();
    }

    if (rSup.debug) {
      // Help non-coder devs identify some bugs
      console.log('~~~parse debug~~~ article text identified (a string):', text);
    }

    return text
  }; // End rSup.findArticle()

  rSup.cleanText = function (text) {
    /* (Str) -> Str
    	*
    	* Does whatever further text filtering, cleaning, and parsing needs
    	* to be done. Default does nothing
    	*/
    var cleaned = text;

    var regexp = /[“]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[“]/g, '"')
    });

    var regexp = /[”]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[”]/g, '"')
    });

    var regexp = /['][\s]+["]+[\s]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/['][\s]+/g, '\'') + ' '
    });

    var cleaned = cleaned.replace(/[\s]+[*]+(?=[A-Z])/g, ' ');
    var cleaned = cleaned.replace(/[\s]+[*]+[\s]+(?=[A-Z])/g, ' ');

    var cleaned = cleaned.replace(/[.](?=[A-Z])/g, '. ');
    var cleaned = cleaned.replace(/[\s]+[.](?=[A-Z])/g, '. ');
    var cleaned = cleaned.replace(/[\s]+[.](?=[\s])+(?![A-Z])/g, '. ');
    var cleaned = cleaned.replace(/[.](?=[A-Z])/g, '. ');
    var cleaned = cleaned.replace(/[.][\s+]+(?=[A-Z])/g, '. ');
    var cleaned = cleaned.replace(/[\s]+[.](?![\s])+(?=[.])/g, '.');
    var cleaned = cleaned.replace(/[\s]+[.](?![\s])+(?=[a-z]|[A-Z])/g, '.');

    var cleaned = cleaned.replace(/[:](?=[A-Z])/g, ': ');
    var cleaned = cleaned.replace(/[\s]+[:](?=[A-Z])/g, ': ');
    var cleaned = cleaned.replace(/[\s]+[:](?=[\s])+(?![A-Z])/g, ': ');
    var cleaned = cleaned.replace(/(?![a-z])[:](?=[A-Z])/g, ': ');
    var cleaned = cleaned.replace(/(?![a-z])[:][\s+]+(?=[A-Z])/g, ': ');
    var cleaned = cleaned.replace(/[\s]+[:](?![\s])+(?=[.])/g, ':');
    var cleaned = cleaned.replace(/[\s]+[:](?![\s])+(?=[a-z]|[A-Z])/g, ':');

    var cleaned = cleaned.replace(/[\s]+[?](?=[A-Z])/g, '? ');
    var cleaned = cleaned.replace(/[\s]+[?](?=[\s])(?=[A-Z])/g, '? ');
    var cleaned = cleaned.replace(/[?](?=[A-Z])/g, '? ');
    var cleaned = cleaned.replace(/[?][\s]+(?=[A-Z])/g, '? ');
    var cleaned = cleaned.replace(/[\s]+[?](?=[\s])+(?=[.])/g, '?');
    var cleaned = cleaned.replace(/[\s]+[?](?![\s])+(?=[a-z]|[A-Z])/g, '?');
    var cleaned = cleaned.replace(/[.][\s]+[.]/g, '.. ');

    var regexp = /…/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/…/g, '...')
    });

    var cleaned = cleaned.replace(/[\s]+[.][\s]+/g, '.');

    var regexp = /([.]|[”])[\s]+[0-9]{1}[.][\s]+[A-Z]{1}/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.][\s]+(?=[A-Z])/g, ' ')
    });

    var regexp = /(Sir|St|Mr|Ms|Mrs|Jr|Sr|Sgt)[.]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.]/g, ' ')
    });

    var regexp = /(UK|USA|US)[.][A-Z]{1}/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.]/g, '. ')
    });

    var regexp = /[α-ωa-z][.][A-Z]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.]/g, '. ')
    });

    var regexp = /[)][.][A-Z]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.]/g, '. ')
    });

    var regexp = /['][.][A-Z]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.]/g, '. ')
    });

    var regexp = /["][.][A-Z]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.]/g, '. ')
    });

    var regexp = /[”][.][A-Z]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.]/g, '. ')
    });

    var regexp = /[\s]+[?][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[?]/g, '?')
    });

    var regexp = /[,][.][A-Z]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.]/g, '. ')
    });

    var cleaned = cleaned.replace(/[—]/g, ' ');

    var cleaned = cleaned.replace(/[\s]+[–][\s]+/g, ' ');

    var cleaned = cleaned.replace(/[\s]+[-][\s]+/g, ' ');

    var cleaned = cleaned.replace(/[\s]+[--][\s]+/g, ' ');

    var regexp = /([a-z]|[A-Z])+[)]([a-z]|[A-Z])/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[)]/g, ') ')
    });

    var cleaned = cleaned.replace(/…/g, '… ');

    var regexp = /([a-z]|[A-Z]|[ά-ωΑ-ώ])[.][(]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[(]/g, ' (')
    });

    var regexp = /([a-z]|[A-Z]|[ά-ωΑ-ώ])[.][0-9]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.]/g, '. ')
    });

    var regexp = /[\s]+[.]{3}/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]/g, '')
    });

    var regexp = /([a-z]|[ά-ω])[?][^'"]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[?]/g, '? ')
    });

    var regexp = /["][\s]+[)]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]/g, '')
    });

    var regexp = /[.][\s]+['][^A-ZΑ-ώ]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[']/g, '\' ')
    });

    var regexp = /[\s]+["][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/["][\s]+/g, '"')
    });

    var regexp = /[’][\s]+[.][”]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[.]+/g, '.')
    });

    var regexp = /[”][\s]+[?]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    });

    var regexp = /[\s]+["][)][,]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    });

    var regexp = /[?][\s]+[”]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    });

    var regexp = /[.][\s]+[’](?=[\s]+.+[’])/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[’]/g, ' ’')
    });

    var regexp = /[.][\s]+['](?=[\s]+.+['])/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[']/g, ' \'')
    });

    var regexp = /”-/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/”-/g, '” -')
    });

    var regexp = /[\s]+(!”)/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    });

    var regexp = /[!][’]([a-zA-Z]|[ά-ωΑ-ώ])/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[’]+/g, '’ ')
    });

    var regexp = /[,][’]([a-zA-Z]|[ά-ωΑ-ώ]){1,20}/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[’]+/g, '’ ')
    });

    var regexp = /[\s]+["]["]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+["]/g, '" ')
    });

    var regexp = /[’][\s]+[.]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]/g, '')
    });

    var regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[.][’]([a-zA-Z]|[ά-ωΑ-ώ])/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[’]/g, '’ ')
    });

    var regexp = /[\s]+[,][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[,]/g, ',')
    });

    var regexp = /[\s]+[)][.][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[)][.]/g, ').')
    });

    var regexp = /[.][’]([a-zA-Z]|[ά-ωΑ-ώ])/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.][’]/g, '.’ ')
    });

    var regexp = /[\s]+([a-z]|[ά-ω])[,]([a-z]|[ά-ω])[\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[,]/g, ', ')
    });

    var regexp = /[?][”][’]([a-zA-Z]|[ά-ωΑ-ώ])/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[’]/g, '’ ')
    });

    var regexp = /[\s]+["][)][.]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    });

    var regexp = /[\s]+["][.][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+["][.]/g, '".')
    });

    var regexp = /[\s]+[’][”][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[’][”]/g, '’”')
    });

    var regexp = /[\s]+[:][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[:]/g, ':')
    });

    var regexp = /[\s]+[;][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[;]/g, ';')
    });

    var regexp = /[\s]+[)][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[)]/g, ')')
    });

    var regexp = /[,][”][’]([a-zA-Z]|[ά-ωΑ-ώ])/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[’]/g, '’ ')
    });

    var regexp = /[U][\s][K]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]/g, '')
    });

    var regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[’][\s]+[sltdmve]{1,2}[\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[’][\s]+/g, '’')
    });

    var regexp = /([.]|[?]|[!])+[\s]+[’]([a-zA-Z]|[ά-ωΑ-ώ])/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[’]/g, '’ ')
    });

    var regexp = /[’][‘]([a-zA-Z]|[ά-ωΑ-ώ])/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[‘]/g, ' ‘')
    });

    var regexp = /[\s]+[’][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[’]/g, '’')
    });

    var regexp = /[\s]+[!][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[!]/g, '!')
    });

    var regexp = /[\s]+[?][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[?]/g, '?')
    });

    var regexp = /[“]([a-zA-Z]|[ά-ωΑ-ώ]).+[\s]+[“]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[“]/g, '“')
    });

    var regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[,][“]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[,]/g, ', ')
    });

    var regexp = /[?][\s]+[’][”][’]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[?][\s]+[’][”][’]/g, '?’”’ ')
    });

    var regexp = /[.][“]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.]/g, '. ')
    });

    var regexp = /[?][”]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[”]/g, '” ')
    });

    var regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[“]([a-zA-Z]|[ά-ωΑ-ώ])/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[“]/g, ' “')
    });

    var regexp = /[[]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[[]/g, '(')
    });

    var regexp = /]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/]/g, ')')
    });

    var regexp = /[\s]+[)][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[)]/g, ')')
    });

    var regexp = /[:][\s]+["][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[:][\s]+["][\s]+/g, ': "')
    });

    var regexp = /[a-z][\s]+["][.][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+["][.]/g, '".')
    });

    var regexp = /[:]["][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[:]["][\s]+/g, ': "')
    });

    var regexp = /[.][”][’]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[’]/g, '’ ')
    });

    var regexp = /[:][“]([A-Z]|[Α-ώ])/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[:]/g, ': ')
    });

    var regexp = /[\s]+[’][,]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[’]/g, '’')
    });

    var regexp = /[!][”][’]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[’]/g, '’ ')
    });

    var regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[’](so|of|or|to|on|at|it)/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[’]/g, '’ ')
    });

    var regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[.][’][(]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[’]/g, '’ ')
    });

    var regexp = /([£]|[$]|[€])[\s]+[0-9]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    });

    var regexp = /[£][\s]+[0-9]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    });

    var regexp = /[\s]+[‘][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[‘][\s]+/g, '‘')
    });

    var regexp = /[\s]+[)][,][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[)][,]/g, '),')
    });

    var regexp = /[0-9][\s]+[m][)][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[m]/g, 'm')
    });

    var regexp = /[’][\s]+[,][”][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[’][\s]+/g, '’')
    });

    var regexp = /[)][.]{3}/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[)]/g, ') ')
    });

    var regexp = /(We|They|we|they)([']|[’])[\s]+(re)/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    });

    var regexp = /([']|[’])[\s]+[?]["][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[?]["]/g, '?"')
    });

    var regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[.][\s]+(?:([a-zA-Z]|[ά-ωΑ-ώ])[.])/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.][\s]+/g, '.')
    });

    var regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[.][\s]+(?:([a-zA-Z]|[ά-ωΑ-ώ])[.])/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.][\s]+/g, '.')
    });

    var regexp = /(?:([a-zA-Z]|[ά-ωΑ-ώ])[.])([a-zA-Z]|[ά-ωΑ-ώ])[.][\s]+(?:([a-zA-Z]|[ά-ωΑ-ώ])[.])/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.][\s]+/g, '.')
    });

    var regexp = /[a][,][\s]+[k][,][\s]+[a]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    });

    var regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[.]{2,3}[\s]+(?:[.]{1})/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    });

    var regexp = /[:][“]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[:]/g, ': ')
    });

    var regexp = /([”]|[,])[“]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[“]/g, ' “')
    });

    var regexp = /[\s]+[“][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[“][\s]+/g, '“')
    });

    var regexp = /[0-9][’][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    });

    var regexp = /[.][\s]+[”]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    });

    var regexp = /[”]([A-Z]|[Α-ώ])/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[”]/g, '” ')
    });

    var regexp = /[0-9][\s]+(GB|MB|KB|Gb|Mb|Kb|gb|mb|kb)/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    });

    var regexp = /[\s]+["][,][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+["]/g, '"')
    });

    var regexp = /[!][“]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[!]/g, '! ')
    });

    var regexp = /[\s]+[.][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[.]/g, '.')
    });

    var regexp = /(you)[’][\s]+(re)/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[’][\s]+/g, '’')
    });

    var regexp = /[.]{3}[^.”'"]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.]{3}/g, '... ')
    });

    var regexp = /[\s]+[”][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[”]/g, '”')
    });

    var regexp = /[\s]+[”]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    });

    var regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[(]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[(]/g, ' (')
    });

    var regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[,]([a-zA-Z]|[ά-ωΑ-ώ])/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[,]/g, ', ')
    });

    var regexp = /[.][\s]+[?]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.][\s]+/g, '.')
    });

    var regexp = /[?][“]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[?]/g, '? ')
    });

    var regexp = /[\s]+[?]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[?]/g, '?')
    });

    var regexp = /[\s]+[-]([a-zA-Z]|[ά-ωΑ-ώ])[\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return ' (' + match.replace(/[\s]+/g, '') + ') '
    });

    var regexp = /[“][‘][.]{3}[\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    });

    var regexp = /[:]([a-zA-Z]|[ά-ωΑ-ώ])/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[:]/g, ': ')
    });

    var regexp = /[.]([a-zA-Z]|[ά-ωΑ-ώ])/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.]/g, '. ')
    });

    var regexp = /[\s]+[.][”]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    });

    var regexp = /[']([a-zA-Z]|[ά-ωΑ-ώ])[']/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match + ' '
    });

    var regexp = /(["])(?=(\\?))\2.*?\1/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return ' ' + match.replace(/["]/g, '"') + ' '
    });

    var regexp = /([”])(?=(\\?))\2.*?\1/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return ' ' + match.replace(/[”]/g, '"') + ' '
    });

    var regexp = /[\s]+["][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/["][\s]+/g, '"')
    });

    var regexp = /["][\s]+[.]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    });

    var regexp = /[^';!?.,a-zA-Zά-ωΑ-ώ ]["][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/["][\s]+/g, '"')
    });

    var regexp = /[\s]+[,][^.,a-zA-Zά-ωΑ-ώ]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[,]/g, ',')
    });

    var regexp = /[a-zA-Zά-ωΑ-ώ]{1}[.][\s]+[a-zA-Zά-ωΑ-ώ]{1}[.]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.][\s]+/g, '.')
    });

    var regexp = /[\s]+[(][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[(][\s]+/g, '(')
    });

    var regexp = /[\s]+[\/][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\/][\s]+/g, '/')
    });

    var regexp = /[\s]+([+]|[-]|[*]|[=])[\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    });

    var regexp = /[\s]+[)][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[)]/g, ')')
    });

    var regexp = /[^ ][“]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[“]/g, ' “')
    });

    var regexp = /[\s]+[(][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[(][\s]+/g, '(')
    });

    var regexp = /[(][\s]+[^]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[(][\s]+/g, '(')
    });

    var regexp = /(No)[.][\s]+[0-9]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    });

    var regexp = /[\s]+['][s][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[']/g, '\'')
    });

    var regexp = /[\s]+[)][,][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[)][,]/g, '),')
    });

    var regexp = /[\s]+[)][.][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[)][.]/g, '),')
    });

    var regexp = /[\s]+[’][s][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[’]/g, '’')
    });

    var regexp = /[\s]+[:][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[:]/g, ':')
    });

    var regexp = /[s][\s]+['][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[']/g, '\'')
    });

    var regexp = /[^a-zά-ω](?:[\s]+)[0-9][\s]+[A-ZΑ-ώ]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '. ')
    });

    var regexp = /[,][\s]*["](he|she|they|we|I)[\s]+(stated|said|told|says)[.]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[,][\s]*["]/g, '," ')
    });

    var regexp = /[\s]+[-]{2}[\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[-]{2}/g, ',')
    });

    var regexp = /[0-9][\s]+(GHz|MHz|Khz)/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    });

    var regexp = /[\s]+(will)[.](i)[.][\s]+(am)/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.][\s]+/g, '.')
    });

    var regexp = /[\s]+['][\s]+[s][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+['][\s]+/g, '\'')
    });

    var regexp = /[\s]+[.]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[.]/g, '.')
    });

    var regexp = /[\s]+[^]{1,10}["][(]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/["][(]/g, '" (')
    });

    var regexp = /[^ ][*]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[*]/g, ' *')
    });

    var regexp = /[^ ][)]["][^ ]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/["]/g, '" ')
    });

    var regexp = /[\s]+[,][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[,]/g, ',')
    });

    var regexp = /[\s]+[;][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[;]/g, ';')
    });

    var regexp = /[\s]+[ό][,][\s]+(τι)[\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[,][\s]+/g, ',')
    });

    var regexp = /[\s]+["][\s]+[^"]+[,]["]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/["][\s]+/g, '"')
    });

    var regexp = /[\s]+["]["][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+["]["][\s]+/g, '" "')
    });

    var regexp = /[,][\s]+["](he|she|they)/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[,][\s]+["]/g, '," ')
    });

    var regexp = /[^a-zA-Zά-ωΑ-ώ](I)['][\s]+(m)[\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/['][\s]+/g, '\'')
    });

    var regexp = /[U][.][S][.][^A-ZΑ-ώ]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[U][.][S][.]/g, 'U.S. ')
    });

    var regexp = /[\s]+[a-zA-Zά-ωΑ-ώ][\s]+[*][\s]+[a-zA-Zά-ωΑ-ώ][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[*][\s]+/g, '*')
    });

    var regexp = /[^0-9][\s]+[*][\s]+[^0-9]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[*][\s]+/g, ' ')
    });

    var regexp = /[’][\s]+[s][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[s]/g, 's')
    });

    var regexp = /[\s]+[.][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[.]/g, '.')
    });

    var regexp = /[\s]+[(][;][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[(][;][\s]+/g, '(;')
    });

    var regexp = /[\s]+[,][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[,]/g, ',')
    });

    var regexp = /[\s]+[)][)][.][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[)][)][.]/g, ')).')
    });

    var regexp = /[\s]+[^ ]+["][^,.)]{1,10}[\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/["]/g, '" ')
    });

    var regexp = /[^ ]["]["][^ ]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/["]["]/g, '" "')
    });

    var regexp = //g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(//g, ' ')
    });

    var regexp = /[\s]+["][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+["][\s]+/g, '"')
    });

    var regexp = /(["])(?=(\\?))\2.*?\1/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return ' ' + match + ' '
    });

    var regexp = /[a-zA-Zά-ωΑ-ώ]+[.][\s]+(co)[.][\s]+(in|uk)/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.][\s]+/g, '.')
    });

    var regexp = /(Ph)[.](D)[.]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.]/g, '')
    });

    var regexp = /(PhD)[\s]+[s][,]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    });

    var regexp = /[\s]+[,][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[,]/g, ',')
    });

    var regexp = /[\s]+[.][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[.]/g, '.')
    });

    var regexp = /[\s]+["][.][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+["][.]/g, '".')
    });

    var regexp = /[\s]+[(][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[(][\s]+/g, '(')
    });

    var regexp = /[\s]+[)]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[)]/g, ')')
    });

    var regexp = /[\s]+[)][,][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[)][,]/g, '),')
    });

    var regexp = /[\s]+[:][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[:]/g, ':')
    });

    var regexp = /[\s]+[;][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[;]/g, ';')
    });

    var regexp = /[.][\s]+["]["][\s]+[A-ZΑ-ώ]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+["]["][\s]+/g, '" "')
    });

    var regexp = /[,][\s]*["][^]{1,15}(stated|said|told|added)[.]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[,][\s]*["]/g, '," ')
    });

    var regexp = /[:]["][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[:]["][\s]+/g, ': "')
    });

    var regexp = /(but)["][\s]+[^]+[.]["][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/(but)["][\s]+/g, 'but "')
    });

    var regexp = /[a-zά-ω][.][A-ZΑ-ώ]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.]/g, '. ')
    });

    var regexp = /[.][\s]+[’]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.][\s]+[’]/g, '.’')
    });

    var regexp = /[a-zά-ωA-ZΑ-ώ][(]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[(]/g, ' (')
    });

    var regexp = /[:][\s]+[a-zά-ωA-ZΑ-ώ]["][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[:][\s]+/g, ':')
    });

    var regexp = /[!][a-zά-ωA-ZΑ-ώ]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[!]/g, '! ')
    });

    var regexp = /[•]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[•]/g, '')
    });

    var regexp = /[\s]+[.][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[.]/g, '.')
    });

    var regexp = /[*][^ ]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[*]/g, '')
    });

    var regexp = /(R'n')[\s]+[B][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[B]/g, 'B')
    });

    var regexp = /(κ.)[\s]+(ά.)[\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+(ά.)/g, 'ά.')
    });

    var regexp = /(κ.)[\s]+(α.)[\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+(α.)/g, 'α.')
    });

    var regexp = /[A-ZΑ-ώ][.][\s]+[A-ZΑ-ώ][.]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.][\s]+/g, '.')
    });

    var regexp = /[\s]+[,]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[,]/g, ',')
    });

    var regexp = /[.][\s]+(epub|pdf|zip|rar|tar)[\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.]/g, ' ')
    });

    var regexp = /[\s]+[&][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[&]/g, 'and')
    });

    var regexp = /[!]['][s]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[!]/g, '')
    });

    var regexp = /[\s]+[(]["][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[(]["][\s]+/g, '("')
    });

    var regexp = /[\s]+[’]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[’]/g, '’')
    });

    var regexp = /[\s]+[”]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[”]/g, '”')
    });

    var regexp = /[\s]+["]["][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+["]["][\s]+/g, '" "')
    });

    var regexp = /[\s]+["][,][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+["][,]/g, '",')
    });

    var regexp = /[0-9][.][\s]+[a-zά-ω]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    });

    var regexp = /[\s]+[?][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[?]/g, '?')
    });

    var regexp = /[\s]+[)]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[)]/g, ')')
    });

    // remove big dashes
    var regexp = /[\u2014-\u2015\u2E3A\u2E3B]/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[-\u2014-\u2015\u2E3A\u2E3B]/g, ' ')
    });

    // remove regular dashes surrounded by space
    var regexp = /[\s]+[-\u2010-\u2011\uFE58\uFE63\uFF0D][\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[-\u2010-\u2011\uFE58\uFE63\uFF0D]/g, ' ')
    });

    var regexp = /[\s]+[a-zά-ω][,][a-zά-ω]{2}[\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[,]/g, '')
    });

    var regexp = /[\s]{2,}/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]{2,}/g, ' ')
    });

    var regexp = /[.][\s]+(epub|pdf|zip|rar|tar|NET)/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/.[\s]/g, ' •')
    });

    var regexp = /[^ ]+[.][\s]+(com|net|co.uk|co.in|com.cy|gr|tk|info|me)[\s]+/g;
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.][\s]+/g, '.')
    });

    // Add your code here
    if (rSup.debug) {
      // Help non-coder devs identify some bugs
      console.log('~~~parse debug~~~ plain text cleaned (a string):', cleaned);
    }

    return cleaned
  }; // End rSup.cleanText();  // End rSup.cleanText()

  rSup.splitSentences = function (text) {
    /* ( Str ) -> [[Str]
    	*
    	* Returns a list of sentences, which are each a list of words (strings).
        * Best results with English.
	    */
    var sentences = sbd.sentences(text, { parse_type: 'words' });

    if (rSup.debug) {
      // Help non-coder devs identify some bugs
      console.log(
        '~~~parse debug~~~ sentences (an array of arrays of strings):',
        sentences
      );
    }

    return sentences
  };

  return rSup
}; // End ParserSetup() -> {}

// Settings.js

// ;(function(root, settingsFactory) {
//   // root is usually `window`
//   if (typeof define === 'function' && define.amd) {
//     // AMD. Register as an anonymous module.
//     define([], function() {
//       return (root.Settings = settingsFactory())
//     })
//   } else if (typeof module === 'object' && module.exports) {
//     // Node. Does not work with strict CommonJS, but only CommonJS-like
//     // environments that support module.exports, like Node.
//     module.exports = settingsFactory()
//   } else {
//     // Browser globals
//     root.Settings = settingsFactory()
//   }
// })(this, function() {
//   'use strict'

var Settings = function(storage, oldSettings) {
  var rSet = {};

  // ================================
  // SETUP
  // ================================

  rSet._debug = false;

  // Not needed, but might be nice to have:
  rSet.available = [
    // ==== delayer ====
    'wpm',
    '_baseDelay',
    'slowStartDelay',
    'sentenceDelay',
    'otherPuncDelay',
    'numericDelay',
    'shortWordDelay',
    'longWordDelay',
    'halfSpeed',
    // 'wordLengthDelays',
    // ==== fragmentor/splitter ====
    'maxNumCharacters'
  ];

  // !!! Only use for GETTING values, NOT for setting them !!!
  var _settings = (rSet._settings = {
    // ==== word delays ====
    wpm: 450,
    _baseDelay: 1 / (250 / 60) * 1000, // based on wpm
    slowStartDelay: 5,
    sentenceDelay: 4.7,
    otherPuncDelay: 1.1,
    numericDelay: 1.4,
    shortWordDelay: 1.0, // Will be obsolete
    longWordDelay: 1.1, // Will be obsolete
    delayModifier: 1,
    sentenceModifier: 1,
    // wordLengthDelays: { 1: 1.3, 2: 1.3, 3: 1.3,
    // 	4: 1, 5: 1, 6: 1,
    // 	7: 1.3, 8: 1.3, 9: 1.3,
    // 	10: 1.5, 11: 1.5, 12: 1.5, 13: 1.5,
    // 	14: 1.8, 15: 1.8, 16: 1.8  // Anything more will be 2?
    // },
    // ==== fragmentor/splitter ===
    maxNumCharacters: 12
  });

  // ================================
  // HOOKS
  // ================================
  rSet.add = function(settingName, initialVal, normalizingFunction) {
    // Don't override already existing setting
    if (_settings[settingName]) {
      console.warn(
        'The setting called',
        settingName,
        'already exists. Try using a different name. Check "yourSettings.available" for all the existing settings names.'
      );
      return rSet
    }

    rSet.available.push(settingName);
    _settings[settingName] = initialVal;
    rSet['_get_' + settingName] = normalizingFunction;
    rSet.set(settingName, initialVal);

    return rSet
  }; // End rSet.add()

  // ================================
  // RUNTIME
  // ================================

  rSet.set = function(settingName, value) {
    // ??: Convert all to lowercase instead? If we use of lowercase,
    // we can remove at least some typo mistakes and uncertainties.

    if (_settings[settingName] === undefined) {
      console.error(
        'There is no approved setting by the name of "' +
          settingName +
          '". Maybe check your capitalization. Also, you can check `yourSetayerObj.settingsAvailable` to see what setting names are available to you.'
      );
      return false
    }

    // If it's not a private/special variable
    if (settingName[0] !== '_') {
      // Save it in storage
      var val = rSet['_get_' + settingName](value); // normalize value
      _settings[settingName] = val; // Save locally

      // (First make it possible to use settingName as a key instead of
      // the literal word "settingName")
      var toSave = {};
      toSave[settingName] = val;
      storage.set(toSave); // ??: Should this be all lowercase too?

      if (rSet._debug) {
        console.log(
          'The setting',
          settingName,
          'has just been saved with the normalized value',
          val
        );
      }
    }

    return rSet
  }; // End rSet.set()

  rSet.isModifier = function(num) {
    return rSet._get_delayModifier(_settings.delayModifier) === num
  };

  rSet._withinLimits = function(val, min, max) {
    var minLimited = Math.max(min, val);
    return Math.min(max, minLimited)
  };

  rSet._toUsefulVal = function(val, min, max) {
    var num = parseFloat(val);
    return rSet._withinLimits(num, min, max)
  };

  rSet._calcBaseDelay = function(wpm) {
    return 1 / (wpm / 60) * 1000 // to milliseconds
  };

  // ======== Word Delays ========
  rSet._get_wpm = function(val) {
    var wpm = rSet._toUsefulVal(val, 25, 1000);
    _settings._baseDelay = rSet._calcBaseDelay(wpm); // to milliseconds
    return wpm
  };
  rSet._get_slowStartDelay = function(val) {
    return rSet._toUsefulVal(val, 0, 10)
  };
  rSet._get_sentenceDelay = function(val) {
    return rSet._toUsefulVal(val, 1, 10)
  };
  rSet._get_otherPuncDelay = function(val) {
    return rSet._toUsefulVal(val, 1, 10)
  };
  rSet._get_numericDelay = function(val) {
    return rSet._toUsefulVal(val, 1, 10)
  };
  rSet._get_shortWordDelay = function(val) {
    return rSet._toUsefulVal(val, 1, 10)
  };
  rSet._get_longWordDelay = function(val) {
    return rSet._toUsefulVal(val, 1, 10)
  };
  rSet._get_delayModifier = function(val) {
    return rSet._toUsefulVal(val, 1, 10)
  };
  rSet._get_sentenceModifier = function(val) {
    return val
  };

  // rSet._get_wordLengthDelays = function ( val ) {
  // 	return rSet._toUsefulVal( val, 1, 10 );
  // };

  // ======== Fragmentor/splitter ========
  rSet._get_maxNumCharacters = function(val) {
    return rSet._toUsefulVal(val, 1, 1000) // Minimum allowed characters = 1
  };

  // ================================
  // FILL IT IN
  // ================================

  rSet._init = function(oldSettings) {
    // Update local and long term memory settings based on what's passed in
    // Also normalizes values before saving them

    // FOR DEBUGGING
    if (rSet._debug) {
      storage.clear();
    }

    if (!oldSettings) {
      oldSettings = rSet.defaults;
      storage.set(rSet.defaults, function(val) {
        console.log('Settings saved for first time:', val);
      });
    }

    for (let key in _settings) {
      let val = oldSettings[key] || _settings[key];
      rSet.set(key, val);
    }

    return rSet
  }; // End rSet.init()

  // =========== BUILD =========== \\
  rSet._init(oldSettings);

  // To be invoked in a script
  return rSet
}; // End Settings() -> {}


//   return Settings
// })

/* ReaderlyStorage.js
*
* Destructive, unfortunately - doesn't mutate settings,
* just recreates them. All async :/
*
* For now, chrome extension storage. Migrate in future.
* https://developer.chrome.com/extensions/storage
*/

// ;(function(root, storeFactory) {
//   // root is usually `window`
//   if (typeof define === 'function' && define.amd) {
//     // AMD. Register as an anonymous module.
//     define([], function() {
//       return (root.ReaderlyStorage = storeFactory())
//     })
//   } else if (typeof module === 'object' && module.exports) {
//     // Node. Does not work with strict CommonJS, but only CommonJS-like
//     // environments that support module.exports, like Node.
//     module.exports = storeFactory()
//   } else {
//     // Browser globals
//     root.ReaderlyStorage = storeFactory()
//   }
// })(this, function() {
//   'use strict'

var ReaderlyStorage = function () {
  /* ( None ) -> ReaderlyStorage
	*
	*/
  var rSto = {};

  rSto.set = function (settings, callback) {
    // Set any number of settings values
    // Docs say no args returned
    chrome.storage.local.set(settings, callback);
  }; // End rSto.set()

  rSto.save = rSto.set;

  rSto.loadAll = function (callback) {
    chrome.storage.local.get(null, function loadOldReaderlySettings (settings) {
      callback(settings);
    });
  }; // End rSto.loadAll()

  rSto.get = function (keyOrKeys, callback) {
    chrome.storage.local.get(keyOrKeys, function loadOldReaderlySettings (
      settings
    ) {
      callback(settings);
    });
  }; // End rSto.get()

  rSto.cleanSave = function (settings, callback) {
    chrome.storage.local.clear(function clearReaderlySettings () {
      // Docs say no args returned
      chrome.storage.local.set(settings, callback);
    });
  }; // End rSto.cleanSave()

  rSto.clear = function (callback) {
    // Docs say no args returned
    chrome.storage.local.clear(callback);
  }; // End rSto.clear()

  rSto.remove = function (keyOrKeys, callback) {
    // Docs say no args returned
    chrome.storage.local.remove(keyOrKeys, callback);
  }; // End rSto.remove()

  return rSto
}; // End ReaderlyStorage() -> {}

//   return ReaderlyStorage
// })

/* WordNav.js
*
* Navigate the sentences and words in Words
*
* Based on https://github.com/jamestomasino/read_plugin/blob/master/ReadBlock.js
*
* TODO:
* - ??: Add delay for paragraph?
* - Reset values non-destructively
*
* DONE:
* - Go back a sentence - array of indexes where sentences start?
* - Change max word length - recombine split words (record of which
* words were split) and address each word that is longer than
* the max-word length.
* - Split Qeue into
*   Words and...
*   Word(s) Navigator/Trotter/Transporter/Traveler/Traverse/Walker/Explorer
*/

// ;(function(root, wNavFactory) {
//   // root is usually `window`
//   if (typeof define === 'function' && define.amd) {
//     // amd if possible
//     // AMD. Register as an anonymous module.
//     define([], function() {
//       return (root.WordNav = wNavFactory())
//     })
//   } else if (typeof module === 'object' && module.exports) {
//     // Node-ish next
//     // Node. Does not work with strict CommonJS, but only CommonJS-like
//     // environments that support module.exports, like Node.
//     module.exports = wNavFactory()
//   } else {
//     // Global if nothing else
//     // Browser globals
//     // !!! Broken !!!
//     root.WordNav = wNavFactory(Fragment, root) // root.sentences is undefined :P Not sure what to provide there
//   }
// })(this, function() {
//   'use strict'

// TODO: Do this without needing a new object each time
var WordNav = function() {
  /* ( None ) -> WordNav
    *
    * Provides commands for getting the words/fragments passed into
    * its `.process()`.
    * Always use .getFragment()
    */
  var wNav = {};

  wNav.words = null; // Contains .sentences, .positions

  wNav.index = 0
  ;(wNav.position = [0, 0, 0]), (wNav.currentWord = null); // [ Str ]
  wNav.fragmentor = null;

  // ==== Internal ==== \\
  wNav._progress = 0;
  var sentences = (wNav._sentences = null);
  var positions = (wNav._positions = []);

  wNav.process = function(senteceArray, fragmentor) {
    if (!senteceArray) {
      console.error(
        'WordNav needs dataz to .process(). You gave it dis:',
        senteceArray
      );
    }

    wNav.fragmentor = fragmentor;

    sentences = wNav.sentences = senteceArray;
    positions = wNav.positions = []; // TODO: ??: Empty non-destructively??

    for (let senti = 0; senti < sentences.length; senti++) {
      let sentence = sentences[senti];
      for (let wordi = 0; wordi < sentence.length; wordi++) {
        positions.push([senti, wordi]);
      }
    }

    return wNav
  };

  // ========= RUNTIME: TRAVELING THE WORDS/SENTENCES (for external use) ========= \\

  wNav.restart = function() {
    wNav.index = 0;
    wNav.position = [0, 0, 0];
    return wNav
  };

  wNav.getFragment = function(changesOrIndex) {
    /* ( [int, int, int] or int ) -> Str
        *
        * Currently it seems that only one of the ints can be something
        * other than 0.
        * ??: Find cases where that isn't true.
        */
    var frag = null;
    var pos = wNav.position,
      // wNav.currentWord isn't just a string. It's not from the sentence/word
      // array, it's a word once it has been fragmented into a list of strings
      rawWord = wNav.currentWord;

    // TODO:
    // If maxNumCharacters changed, re-fragment word and start at
    // the beginning of word

    // if plain index change/jump
    if (typeof changesOrIndex === 'number') {
      rawWord = wNav._stepWord(changesOrIndex);
      pos[2] = 0;

      // !!! CAN ONLY CHANGE ONE POSITION AT A TIME !!! \\

      // if sentence change
    } else if (changesOrIndex[0] !== 0) {
      // find new sentence and get the new index
      var index = wNav._stepSentence(changesOrIndex[0]);
      rawWord = wNav._stepWord(index);
      pos[2] = 0;

      // if word change
    } else if (changesOrIndex[1] !== 0) {
      index = wNav.index + changesOrIndex[1];
      rawWord = wNav._stepWord(index);
      pos[2] = 0;

      // if fragment change
    } else if (changesOrIndex[2] > 0) {
      // No provision for backwards fragment travel

      var fragi = pos[2] + changesOrIndex[2];

      // if current fragment starts new word
      if (fragi >= rawWord.length) {
        rawWord = wNav._stepWord(wNav.index + 1);
        pos[2] = 0;
      } else {
        // don't change index or current word, just current fragment position
        rawWord = wNav._stepWord(wNav.index);
        pos[2] = fragi;
      }

      // If no change, get whatever's current
    } else {
      rawWord = wNav._stepWord(wNav.index);
      pos[2] = 0;
    } // end if index or which position changed

    wNav.currentWord = wNav.fragmentor.process(rawWord);

    frag = wNav.currentWord[pos[2]];

    return frag
  }; // End wNav.getFragment()

  wNav._stepWord = function(index) {
    // ( int ) -> [ Str ]
    wNav.index = wNav.normalizeIndex(index);
    var pos = positions[wNav.index];
    wNav.position[0] = pos[0];
    wNav.position[1] = pos[1];

    var word = sentences[wNav.position[0]][wNav.position[1]];

    return word
  }; // End wNav._stepWord()

  wNav._stepSentence = function(sentenceChange) {
    // ( int ) -> Int
    if (sentenceChange === 0) {
      return 0
    }

    var pos = [wNav.position[0], wNav.position[1]],
      senti = pos[0],
      wordi = pos[1];

    // If in the last sentence, go to the last word
    if (sentenceChange > 0 && senti >= sentences.length - 1) {
      wordi = sentences[senti].length - 1;
    } else {
      // If we're in the middle of a sentence and we're
      // only going back one step, go back to the beginning of the sentence
      if (sentenceChange === -1 && wordi > 0) {
      } else {
        // No change to sentence
        // otherwise change sentence
        senti += sentenceChange;
      }
      // Either way, word is first word of sentence
      wordi = 0;
    } // end if at last sentence

    pos[1] = wordi;
    pos[0] = wNav.normalizeSentencePos(senti);

    var newIndex = wNav._sentenceChangeToIndex(sentenceChange, pos);
    if (newIndex === null) {
      newIndex = wNav.index;
    }

    return newIndex
  }; // End wNav._stepSentence

  wNav._sentenceChangeToIndex = function(sentenceChange, newPos) {
    /* ( int ) -> Int or null
        *
        * Given the direction of change and the position desired, find the
        * index of the new position.
        * Only used for sentence changes. If we need something else,
        * we'll see about that then. Just trying to speed up the search.
        */
    if (sentenceChange === 0) {
      return 0
    } // signOf shouldn't return NaN now

    var incrementor = signOf(sentenceChange), // 1 or -1
      tempi = wNav.index,
      found = false;

    // Until we find the position or there are no more positions left
    while (!found && positions[tempi]) {
      // Test out positions
      var pos = positions[tempi];
      if (pos[0] === newPos[0] && pos[1] === newPos[1]) {
        found = true;
      }
      // If not found, keep going until there are no more positions left in the list
      if (!found) {
        tempi += incrementor;
      }
    }

    // If we went through all the list we could and didn't find anything, say so
    // Not quite sure why that would happen, though
    if (!positions[tempi]) {
      tempi = null;
    }

    return tempi
  }; // End wNav._sentenceChangeToIndex()

  wNav._positionToIndex = function(pos) {
    /* ( [int, int] ) -> Int
        *
        * Given a [sentence, word] position, find the index of that
        * configuration in the positions list. If none found, return
        * -1. (There are ways to speed this up if needed, like checking
        * just sentence index first until sentence found, etc).
        *
        * This is different from ._sentenceChangeToIndex() because this
        * one searches the whole array, it doesn't start from the current
        * position and work in a direction (back of forward) from there.
        * TODO: Performance analysis on long texts
        */
    var index = positions.findIndex(function matchPosToIndex(potential) {
      var sent = pos[0] === potential[0],
        frag = pos[1] === potential[1];
      return sent && frag
    });
    return index
  };

  // ========== utilities ========== \\

  var signOf = function(num) {
    return typeof num === 'number'
      ? num ? (num < 0 ? -1 : 1) : num === num ? num : NaN
      : NaN
  };

  wNav.normalizeIndex = function(index) {
    index = Math.min(index, positions.length - 1); // max
    return Math.max(index, 0) // min
  };
  wNav.normalizeSentencePos = function(senti) {
    senti = Math.min(senti, sentences.length - 1);
    return Math.max(senti, 0)
  };

  // ========== gets ========== \\

  wNav.getProgress = function() {
    wNav._progress = (wNav.index + 1) / positions.length;
    return wNav._progress
  };
  wNav.getLength = function() {
    return positions.length
  };
  wNav.getIndex = function() {
    return wNav.index
  };
  wNav.getLastSentence = function() {
    return wNav.sentences[wNav.sentences.length - 1]
  };
  wNav.getLastWord = function() {
    return wNav.getLastSentence()[wNav.getLastSentence().length - 1]
  };
  wNav.getFragmentCount = function(word) {
    return Math.ceil(word.length / 10)
  };

  return wNav
}; // End WordNav() -> {}

//   return WordNav
// })

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
  var rSpt = {};

  // ============= SETUP ============= \\

  rSpt.charsNode = charsNode; // No reason I can see for this to be changed later, but still

  // ============= RUNTIME ============= \\

  rSpt._getMaxLength = function(word, styles) {
    // Get the max letters that can fit in the width
    var pxWidth = parseFloat(styles['width'].replace('px', '')),
      fontSize = parseFloat(styles['font-size'].replace('px', ''));

    var remWidth = Math.floor(pxWidth / fontSize);
    // Get the max letters that are allowed by the user
    // var userMaxChars = _wSetts.maxNumCharacters;
    var userMaxChars = settings._settings.maxNumCharacters;
    // Get the smaller of the two (the limiting factor)
    var maxChars = Math.min(userMaxChars, remWidth);

    return maxChars
  }; // End rSpt._getMaxLength()

  rSpt._makeCharsMap = function(chars, maxWithHyphen) {
    /* ( str, int ) -> [Int]
		*
		* Return an array of how many groups of how many strings
		* the final word array should contain.
		*/
    var splitGroupLengths = [],
      evenly = Math.floor(chars.length / maxWithHyphen);

    // If we were to split the word evenly, how many letters would
    // go in each group? How many groups would there be? (not counting the remainder)
    for (let numi = 0; numi < evenly; numi++) {
      splitGroupLengths.push(maxWithHyphen);
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
      toAddBack = halved + remainder;

    // And add that back into the mix, distributed in a... sensical? way
    // Right now: letters are removed from the starting strings in
    // order to make up for the last string (really I'd rather take from
    // every other group, visiting all eventually, but this is just
    // proof of concept)
    // Do that before adding the last group so we don't mess with the last group amount
    var lastIndx = splitGroupLengths.length,
      indx = 0;
    while (halved > 0) {
      splitGroupLengths[indx] = splitGroupLengths[indx] - 1;

      indx = indx + 1;
      // Start from the beginning string again if more need to be redistributed
      indx = indx % lastIndx;
      halved = halved - 1;
    }

    splitGroupLengths.push(toAddBack);

    return splitGroupLengths
  }; // End rSpt._makeCharsMap()

  rSpt._splitWord = function(chars, maxChars) {
    /* ( str, int ) -> [ str ]
		     *
		     * Returns `chars` as string split into, ideally, syllables,
		     * but in actual fact, just into parts of aproximately a
		     * certain length that each isn't longer than `maxChars`
		     *
		     * Note: Hyphens are added and accounted for.
		     */
    var split = [];

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
    );
    let specialCharacterCount =
      specialCharacters != null ? specialCharacters.length : 0;
    let hasSpace = chars.includes(' ');

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
      maybeHyphen = '-';
    // No dash for less than 4 characters
    if (maxChars < 4) {
      maxWithHyphen = maxChars;
      maybeHyphen = '';
    }

    var splitMap = rSpt._makeCharsMap(chars, maxWithHyphen);

    // Build the list of strings with the right number of letters
    // as determined by the map
    var start = 0;
    for (let numi = 0; numi < splitMap.length; numi++) {
      let str = chars.slice(start, start + splitMap[numi]);

      // Make sure last string doesn't get a hyphen
      if (numi < splitMap.length - 1) {
        // A string that already ends with a hyphen shouldn't get /another/ hypen
        if (!/-/.test(str)) {
          str = str + maybeHyphen;
        }
      }

      split.push(str);
      // Start the next one where we finished this one
      start = start + splitMap[numi];
    }

    return split
  }; // End rSpt._splitWord()

  // ========== EXTERNAL ========== \\

  rSpt.process = function(chars) {
    // Check the chars' container node each time in case its size has changed
    var styles = window.getComputedStyle(rSpt.charsNode),
      maxLength = rSpt._getMaxLength(chars, styles);

    var split = rSpt._splitWord(chars, maxLength);

    return split
  }; // End rSpt.process()

  return rSpt
}; // End WordSplitter() -> {}

//   return WordSplitter
// })

/* String-Time.js
*
* A constructor for an object that can return a float.
*
* Meant to be used with Readerly's other modules, this
* object is tricky, and very tangled up with the code
* that creates and uses it.
*
* The creator of a StringTime instance (stm) passes in a
* reference to an object, `settings`, which can contain
* these used properties:
*
* Base delay to work off of:
* - _baseDelay (>=0, usually based on desired words per
* 	minute)
* Delay modifiers:
* - slowStartDelay (>0)
* - sentenceDelay (>0)
* - otherPuncDelay (>0)
* - shortWordDelay (>0)
* - longWordDelay (>0)
* - numericDelay (>0)
*
* When `stm.calcDelay(str, bool)` is called, it tests the
* properties of the string `str`. It then uses the base
* delay multiplied whichever modifiers are relevant to return
* how many milliseconds a string should be displayed in the
* RSVP app.
*
* StringTime depends on `settings`'s properties repeatedly,
* so it shouldn't be destroyed.
*
* There are two other important features.
*
* 1. The `slowStartDelay` property lets `stm` start the RSVP
* reader slowly, then lets it gain speed. You can reset to
* your currently stored slow starting speed using
* `stm.resetSlowStart()`.
*
* 2. Passing a value of `true` as the optional second argument
* to `stm.calcDelay()` freezes the progress of that speeding
* up. In future, it may use that boolean to reset the slow
* starting speed.
*
* The functionality to add more delay modifiers after the
* fact hasn't been created yet.
*
*
* QUESTION: Should an instance be an object or a function?
* ANSWER: An object. If it's a function, its use of
* "settings/ state" data is buried inside the loop/timer
* (or wherever it's called from). That's too opaque. If
* it's an object, it's given the "settings" object right
* up front at the start. Much more transparent. Also, it
* does need some persistence for `._tempSlowStart`
*
*
* TODO:
* - Base an internal `baseDelay` on external `.wpm`, converting
* 	on the fly? Needs recalculating every time.
* - Build list of multipliers and testing functions then make that
* 	list modifiable
*/

// ;(function(root, timeFactory) {
//   // root is usually `window`
//   if (typeof define === 'function' && define.amd) {
//     // AMD. Register as an anonymous module.
//     define([], function() {
//       return (root.StringTime = timeFactory())
//     })
//   } else if (typeof module === 'object' && module.exports) {
//     // Node. Does not work with strict CommonJS, but only CommonJS-like
//     // environments that support module.exports, like Node.
//     module.exports = timeFactory()
//   } else {
//     // Browser globals
//     root.StringTime = timeFactory()
//   }
// })(this, function() {
//   'use strict'

var StringTime = function StringTime (settings) {
  /* ( {} ) -> StringTime
	*
	* See discription of module above
	*/
  var stm = {};

  var _setts = null;
  stm._tempSlowStart = null;

  // TODO: Rename 'slowStartDelay' to 'warmupDelay'
  var toMultiplyBy = (stm._toMultiplyBy = {
    hasPeriod: 'sentenceDelay',
    hasOtherPunc: 'otherPuncDelay',
    isShort: 'shortWordDelay',
    isLong: 'longWordDelay',
    isNumeric: 'numericDelay',
    isCode: 'codeBaseDelay'
  });

  var defaults = (stm.defaults = {
    wpm: 250,
    _baseDelay: 1 / (250 / 60) * 1000, // based on wpm
    slowStartDelay: 5,
    sentenceDelay: 5,
    otherPuncDelay: 2.5,
    numericDelay: 2.0,
    shortWordDelay: 1.3, // Will be obsolete
    longWordDelay: 1.5, // Will be obsolete
    codeBaseDelay: 3.0,
    delayModifier: 1,
    sentenceModifier: 1
  });

  var oldStart = defaults.slowStartDelay;

  // ============== HOOKS ============== \\

  // // TODO:
  // stm.add = function ( obj ) {
  // // // `obj` consists of a function to test the string's properties,
  // // // returning a boolean, a delay modifier name, and a default value
  // 	defaults[ modName ] = val;
  // 	mods.push( obj ); || mods[ modName ] = obj;
  // 	// Also maybe make sure it's not overwritting a pre-existing mod
  // };
  // stm.remove = function ( modName ) {
  // 	defaults[ modName ] = 1;
  // 	mods[ modName ] = { func: function() {return false;} };
  // };

  // ============== RUNTIME ============== \\

  // --- Timing --- \\

  stm.orDefault = function(propName) {
    /* ( str ) -> Number
		*
		* Determines whether to use a setting that's handed in
		* or a default one, throwing an error if necessary
		*/
    var val = null;

    if (_setts && _setts[propName] !== undefined) {
      var val = _setts[propName];
    } else {
      val = defaults[propName];
    }

    return val
  }; // End stm.orDefault()

  stm.calcDelay = function(str, justOnce) {
    /* ( str, bool || undefined ) -> Float
		*
		* See main description of module
		* `justOnce` can make sure ._tempSlowStart isn't used up
		* by things like .once() called repeatedly, like when the
		* scrubber is moved.
		*/
    // TODO: ??: if (justOnce) {return 0}? Check on use
    // cases (at the start of `.play()`).
    // TODO: ??: Always reset slowStart when justOnce ===
    // true?

    if (typeof str !== 'string') {
      throw new TypeError(
        'The first argument to `.calcDelay` was not a string. What you sent:',
        str
      )
    }
    if (justOnce !== undefined && typeof justOnce !== 'boolean') {
      throw new TypeError(
        'The optional second argument to `.calcDelay` was not undefined or a boolean. What you sent:',
        justOnce
      )
    }

    var processed = stm._process(str);

    var delay = stm.orDefault('_baseDelay') * stm.orDefault('delayModifier');

    var delayModKey;

    var PeriodCheck =
      (str.match(
        /^[(]*[^]+[)]*(["]|[”]|[’])*([.]|[?]|[!]|[…])[']*(["]|[”]|[’])*[)]*$/g
      ) ||
        str.match(
          /^[(]*[ά-ωΑ-ώ]+[)]*(["]|[”]|[’])*([.]|[?]|[!]|[…]|[;])[']*(["]|[”]|[’])*[)]*$/g
        )) &&
      !str.match(/^[(]*[^]*(Wham|Yahoo)[)]*([!])[']*(["]|[”]|[’])*[)]*$/g);

    var OtherPuncCheck = str.match(
      /^(["]|[”])*[(]*[^ ]{4,}[)]*(["]|[”])*([:]|[,])(["]|[”])*$/g
    );

    var NumericCheck1 =
      str.match(/^[0-9]+[%]*[,]*[)]*[:]*$/g) ||
      str.match(/^[(]*(Mr|Ms|Dr|Sir|No|St|vs)[)]*[.][,]*$/g) ||
      str.match(/^[(]*[a-zA-Zά-ωΑ-ώ][.][,]*$/g) ||
      str.match(/^[(]*[a-zά-ωA-ZΑ-ώ][.][a-zά-ωA-ZΑ-ώ][)]*[.][,]*$/g) ||
      str.match(/^[0-9]+[.]*[0-9]*(GHz|MHz|Khz)$/g) ||
      str.match(
        /^[a-zά-ωA-ZΑ-ώ]{1,5}[.][a-zά-ωA-ZΑ-ώ]{1,5}[.][a-zά-ωA-ZΑ-ώ]{1,5}$/g
      );

    var NumericCheck2 =
      str.match(/^[(][a-zά-ωA-ZΑ-ώ]+[)]$/g) ||
      str.match(/^[$][0-9]{1,3}[.][0-9]{1,3}$/g) ||
      str.match(/^[&]$/g) ||
      str.match(
        /^(Sept|Oct|Dec|Jan|Mar|Aug|Decem|Decemb|Nov|Novem|Novemb)[.]$/g
      ) ||
      str.match(/^[(][0-9]+([.]|[,])[0-9]+[a-zA-Zά-ωΑ-ώ][)]$/g) ||
      str.match(/^[(]*[κ][)]*[.][,]*$/g) ||
      str.match(/^["]*[a-zά-ωA-ZΑ-ώ]{1,10}[-][a-zά-ωA-ZΑ-ώ]{1,10}["]*[,]*$/g);

    var NumericCheck3 = str.match(
      /^["]*[a-zA-Zά-ωΑ-ώ]{4,}[:][a-zA-Zά-ωΑ-ώ]["]*$/g
    );

    var NumericCheck = NumericCheck1 || NumericCheck2 || NumericCheck3;

    var CodeCheck =
      !PeriodCheck &&
      !OtherPuncCheck &&
      !NumericCheck &&
      !str.match(/^[(][a-zA-Zά-ωΑ-ώ]+$/g) &&
      !str.match(/^[a-zA-Zά-ωΑ-ώ]+[)]$/g) &&
      !str.match(/^[(][a-zA-Zά-ωΑ-ώ]+[)]$/g);

    var Guard =
      str.match(
        /^[^a-zA-Zά-ωΑ-ώ0-9 ]{0,1}[a-zA-Zά-ωΑ-ώ]+[/]*[a-zA-Zά-ωΑ-ώ]*[-]*[']*[s]*["]*$/g
      ) || str.match(/^[^a-zA-Zά-ωΑ-ώ0-9 ]{0,1}[a-zA-Zά-ωΑ-ώ]+[-][^]+[-]$/g);

    var key = 'hasPeriod';
    if (PeriodCheck && !NumericCheck) {
      delayModKey = toMultiplyBy[key];
      delay *= stm.orDefault(delayModKey);
      delay *= stm.orDefault('sentenceModifier');
    }
    key = 'hasOtherPunc';
    if (OtherPuncCheck && !Guard) {
      delayModKey = toMultiplyBy[key];
      delay *= stm.orDefault(delayModKey);
    }
    key = 'isNumeric';
    if (NumericCheck && !Guard) {
      delayModKey = toMultiplyBy[key];
      delay *= stm.orDefault(delayModKey);
    }
    key = 'isShort';
    if (processed[key] && !PeriodCheck && !OtherPuncCheck && !NumericCheck) {
      delayModKey = toMultiplyBy[key];
      delay *= stm.orDefault(delayModKey);
    }
    key = 'isLong';
    if (processed[key] && !PeriodCheck && !OtherPuncCheck && !NumericCheck) {
      delayModKey = toMultiplyBy[key];
      delay *= stm.orDefault(delayModKey);
    }
    key = 'isCode';
    if (processed[key] && CodeCheck && str.length >= 6 && !Guard) {
      delayModKey = toMultiplyBy[key];
      delay *= stm.orDefault(delayModKey) + 0.5 * (str.length - 10);
    }

    // Otherwise, in some situations, we won't notice if slow start needs to change
    // TODO: ??: Keep this on the curve of the change, so don't completely reset??
    var nowStart = stm.orDefault('slowStartDelay');
    if (oldStart !== nowStart) {
      stm.resetSlowStart();
    }

    // Just after starting up again, go slowly, then speed up a bit
    // each time the loop is called, eating away at this number
    var extraDelay = stm._tempSlowStart;
    // Reduce ._tempSlowStart a bit each time
    // TODO: Make this customizable
    if (!justOnce) {
      stm._tempSlowStart = Math.max(1, extraDelay / 1.5);
    }

    if (!PeriodCheck) {
      delay = delay * stm._tempSlowStart;
    }
    //console.log(delay);
    return delay
  }; // End stm.calcDelay()

  stm.resetSlowStart = function(val) {
    /* ( num ) -> StringTime
		*
		* After restart or pause, assign a value to start the
		* text off slowly to warm the reader up to full speed.
		*/
    if (val) {
      stm._tempSlowStart = val;
    } else {
      oldStart = stm._tempSlowStart = stm.orDefault('slowStartDelay');
    }
    return stm
  }; // End stm.resetSlowStart()

  // --- Processing String --- \\

  stm._process = function(chars) {
    /* ( str ) -> {}
		*
		* Assesses the properties of a string, saving them in an object
		*/
    var result = { chars: chars };

    stm._setPuncProps(result);

    // TODO: Get from custom user settings
    // TODO: ??: Transition to array of lengths?
    var shortLength = 2,
      longLength = 8;

    var specialCharacters = chars.match(
      /[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]/g
    );
    var specialCharacterCount =
      specialCharacters != null ? specialCharacters.length : 0;
    var hasSpace = chars.includes(' ');
    result.hasPeriod = /[.!?]/.test(chars);
    result.isNumeric = /\d/.test(chars);

    result.isCode = hasSpace || specialCharacterCount / chars.length > 0.2;
    result.isShort =
      !result.isCode && !result.hasPeriod && chars.length <= shortLength;
    result.isLong =
      !result.isCode && !result.hasPeriod && chars.length >= longLength;

    return result
  }; // End stm._process()

  stm._setPuncProps = function(obj) {
    /* ( str ) -> {}
		*
		* Tests and sets the punctuation properties
		*/
    var str = obj.chars;

    // TODO: test for other sentence ending, punctuation, or nonsensical characters
    obj.hasPeriod = /[.!?]/.test(str);
    obj.hasOtherPunc = /["'()”’:;,_]/.test(str);

    return stm
  }; // End stm._setPuncProps()

  // ======= SET STARTING VALUES ======== \\

  // --- validation --- \\
  stm._checkSettings = function(settings) {
    /* ( {} ) -> StringTime
		*
		* Check all the custom settings to throw an error if needed
		*/
    if (!settings) {
      return stm
    }

    for (let key in toMultiplyBy) {
      let name = toMultiplyBy[key];
      stm.orDefault(name);
    }

    stm.orDefault('_baseDelay');
    stm.orDefault('slowStartDelay');
    stm.orDefault('delayModifier');

    return stm
  }; // End stm._checkSettings()

  stm._init = function(settings) {
    /* ( {} || falsy ) -> StringTime
		*
		* Set initial values
		*/
    _setts = stm._settings = settings;
    stm._checkSettings(settings);

    stm.resetSlowStart(); // Start at warmup setting
    return stm
  }; // End stm._init()

  stm._init(settings);

  return stm
}; // End StringTime() -> {}

//   return StringTime
// })

/* ReaderlyTimer.js
 *
 * Transmits fragments from Queue. Uses `delayer` to determine time
 * between each transmition.
 *
 * Based on https://github.com/jamestomasino/read_plugin/blob/master/Read.js
 *
 * TODO;
 * - Speed up with long ff or rewind
 * - ??: Make length delay proportional to word length?
 * - Long word delay not working? How about otherPunc? And do more
 * 	symbols need to be included in that set of otherPunc? Customizable?
 * - Implement more robust pausing? (store in bool and wait for appropriate time)
 *
 * DONE:
 * - Add extra paragraph pause back in
 * - Scrubbing doesn't restart the slow-start value
 *
 * NOTES/GUIDES:
 * - Always return Timer so functions can be chained
 * - Always send Timer as the first argument to events to
 * 	stay consistent.
 */
let $$3 = require('jquery');
// ;(function(root, timerFactory) {
//   // root is usually `window`
//   if (typeof define === 'function' && define.amd) {
//     // AMD. Register as an anonymous module.
//     define(['jquery'], function(jquery) {
//       return (root.ReaderlyTimer = timerFactory(jquery))
//     })
//   } else if (typeof module === 'object' && module.exports) {
//     // Node. Does not work with strict CommonJS, but only CommonJS-like
//     // environments that support module.exports, like Node.
//     module.exports = timerFactory(require('jquery'))
//   } else {
//     // Browser globals
//     root.ReaderlyTimer = timerFactory(root.jQuery)
//   }
// })(this, function($) {
//   'use strict'

var ReaderlyTimer = function(delayer) {
  /* ( {} ) -> ReaderlyTimer
         *
         */
  var rTim = {};

  rTim._init = function() {
    rTim.done = false;

    rTim._timeoutID = null;
    rTim._isPlaying = false;
    rTim._wasPlaying = false;

    // Moving around
    rTim._jumping = false;
    rTim._incrementors = [0, 0, 1]; // This is a regular 1 step forward move
    rTim._skipWhitespace = false;
    rTim._whitespaceRegex = new RegExp('[\n\r]', 'g');
    rTim.util = rTim.prototype;

    return rTim
  }; // End rTim._init()

  // ============== PASSED ON DIRECTLY FROM QUEUE ============== \\

  rTim.getProgress = function() {
    return rTim._queue.getProgress()
  }; // End rTim.gesProsress()

  rTim.getLength = function() {
    return rTim._queue.getLength()
  }; // End rTim.gesProsress()
  rTim.getLastSentence = function() {
    return rTim._queue.getLastSentence()
  }; // End rTim.gesProsress()
  rTim.getLastWord = function() {
    return rTim._queue.getLastWord()
  }; // End rTim.gesProsress()
  rTim.getFragmentCount = function(word) {
    return rTim._queue.getFragmentCount(word)
  }; // End rTim.gesProsress()
  rTim.lastWordFragmentCount = function() {
    return rTim.getFragmentCount(rTim.getLastWord())
  };

  // ============== FLOW CONTROL ============== \\

  rTim._noDelayMod = function(startDelay) {
    return startDelay
  };

  rTim._restart = function(startEventName, endEventName, startDelayModFunc) {
    if (startEventName) $$3(rTim).trigger(startEventName, [rTim]);

    rTim.done = false;

    // Start slow when next go through loop (restore countdown)
    var delayMod = startDelayModFunc || rTim._noDelayMod;
    var delay = delayMod(delayer._settings.slowStartDelay);
    delayer.resetSlowStart(delay);

    // Just put the index at the right place
    rTim._queue.restart();
    rTim._pause(null, null, null);
    rTim.play();

    if (endEventName) $$3(rTim).trigger(endEventName, [rTim]);

    return rTim
  }; // End rTim._restart()

  rTim.start = function(queue) {
    // Queue is passed in here, so that a Timer doesn't
    // have to be destroyed every time something new is read

    if (!queue) {
      console.error(
        'No readable object was passed into PlaybackManager. `queue`:',
        rTim._queue
      );
    } else {
      $$3(rTim).trigger('startBegin', [rTim]);

      rTim._queue = queue;
      rTim._restart(null, null, null);

      $$3(rTim).trigger('startFinish', [rTim]);
    } // end if no data passed in

    return rTim
  }; // End rTim.start()

  rTim.restart = function() {
    rTim._restart('restartBegin', 'restartFinish', null);
    return rTim
  };

  // ??: 'playing' event should go off every time, but if we're
  // restarting without pausing first (pausing would trigger visual
  // feedback about pausing), then should the event not happen? That
  // means the "play" image won't fire off on restarts, even though
  // it feels like it should always fire on play.
  rTim._play = function(startEventName, endEventName) {
    /* ( Str, Str ) -> PlaybackManager
             *
             * For all 'play'-like activities
             * ??: Just one eventName which gets + 'Begin' and + 'Finish' where appropriate?
             */
    // "play" will always be forward. "rewind" can be play, but with "prev".
    rTim._pausesignal = 1;
    rTim._incrementors = [0, 0, 1];

    if (startEventName) $$3(rTim).trigger(startEventName, [rTim]);
    rTim.setProlongationCounter();
    rTim.lastWordFragments = {};
    if (!rTim._isPlaying) {
      rTim._isPlaying = true;
      rTim._loop([0, 0, 0], false);
    }

    if (endEventName) $$3(rTim).trigger(endEventName, [rTim]);

    return rTim
  }; // End rTim._play()

  rTim.play = function() {
    if (rTim.done) {
      rTim.restart();
    } else {
      // Comes back here after restarted
      rTim._play('playBegin', 'playFinish');
    }
    return rTim
  }; // End rTim.play()

  rTim._pause = function(startEventName, endEventName, startDelayModFunc) {
    /* ( Str, Str, Func ) -> PlaybackManager
             *
             * For all 'pause'-like activities
             */
    if (startEventName) $$3(rTim).trigger(startEventName, [rTim]);

    clearTimeout(rTim._timeoutID); // Needed? Maybe more immediate.
    rTim._isPlaying = false;
    // Start slow when next go through loop (restore countdown)
    var delayMod = startDelayModFunc || rTim._noDelayMod;
    var delay = delayMod(delayer._settings.slowStartDelay);
    delayer.resetSlowStart(delay);

    if (endEventName) $$3(rTim).trigger(endEventName, [rTim]);

    return rTim
  }; // End rTim._pause()

  // Names for "pause":
  rTim.pause = function() {
    rTim._pause('pauseBegin', 'pauseFinish', null);
    return rTim
  };
  rTim.stop = function() {
    rTim._pause('stopBegin', 'stopFinish', null);
    return rTim
  };
  rTim.close = function() {
    rTim._pause('closeBegin', 'closeFinish', null);
    return rTim
  };

  rTim.togglePlayPause = function() {
    if (rTim._isPlaying) {
      rTim.pause();
    } else {
      rTim.play();
    }
    return rTim
  };

  // ========== FF and REWIND (arrow keys and other) ========== \\
  rTim._oneStepUntimed = function(changes) {
    // Or decrement :/
    rTim._wasPlaying = rTim._isPlaying;
    rTim._pause(null, null, null);

    rTim._skipWhitespace = true;
    rTim.once(changes);
    rTim._skipWhitespace = false;

    if (rTim._wasPlaying) {
      rTim._play(null, null, null);
    }
    return rTim
  }; // End rTim._oneStepUntimed()

  rTim.nextWord = function() {
    rTim._oneStepUntimed([0, 1, 0]);
    return rTim
  };
  rTim.nextTwoSentences = function() {
    rTim._oneStepUntimed([2, 0, 0]);
    return rTim
  };
  rTim.nextSentence = function() {
    rTim._oneStepUntimed([1, 0, 0]);
    return rTim
  };

  rTim.prevWord = function() {
    rTim._oneStepUntimed([0, -1, 0]);
    return rTim
  };
  rTim.prevTwoSentences = function() {
    rTim._oneStepUntimed([-2, 0, 0]);
    return rTim
  };
  rTim.prevSentence = function() {
    rTim._oneStepUntimed([-1, 0, 0]);
    return rTim
  };

  // =================== Scrubber bar =================== \\
  rTim.jumpTo = function(playbackObj) {
    // Argument to pass in? 'previous sentence'? 'next sentence'?
    // 'section of document'? An index number?
    // ??: How to give useful feedback from this?
    if (rTim._queue) {
      if (!rTim._jumping) {
        rTim._wasPlaying = rTim._isPlaying;
        rTim._pause(null, null, null);
        rTim._jumping = true;
      }

      var newIndex = playbackObj.amount,
        oldIndex = rTim._queue.getIndex();
      rTim.once([0, newIndex - oldIndex, 0]);
    }
    return rTim
  }; // End rTim.jumpTo()

  rTim.disengageJumpTo = function() {
    if (rTim._wasPlaying) {
      rTim._play(null, null, null);
    }
    rTim._jumping = false;
    return rTim
  };

  // ================================
  // LOOPS
  // ================================

  rTim.signOf = function(num) {
    return typeof num === 'number'
      ? num ? (num < 0 ? -1 : 1) : num === num ? num : NaN
      : NaN
  };

  var isLastWord = function() {
    return rTim.getProgress() === 1
  };
  var isFragmented = function() {
    return rTim.lastWordFragmentCount() > 1
  };
  var doneNoProlongation = function() {
    return isLastWord() && !isFragmented()
  };
  var doneWithProlongation = function() {
    return isLastWord() && isFragmented() && !rTim.prolongCounter.decrement()
  };
  var isDone = function() {
    return doneNoProlongation() || doneWithProlongation()
  };
  var stopLoop = function() {
    $$3(rTim).trigger('done', [rTim]);
    return !!rTim.stop()
  };
  var stoppedLoop = function() {
    return isDone() ? stopLoop() : false
  };

  rTim._wordsDone = function() {
    // Checks progress
    // Returns `true` if we're at the end of the words and fragments

    var progress = rTim.getProgress();
    // TODO: Needs some work. Fragile.

    $$3(rTim).trigger('progress', [
      rTim,
      progress,
      rTim._queue.index,
      rTim.getLength()
    ]);

    // Stop if we've reached the end;
    rTim.done = stoppedLoop();

    return rTim.done
  }; // End rTim._wordsDone()

  rTim._skipDirection = function(incrementors, frag) {
    var vector = [0, 0, 0];

    var hasOnlyNewLines = false,
      chars = frag; // Doesn't change frag
    // DEBUGGING
    // Bug crops up when switching word lengths. Moreso at short lengths
    // May be to do with reseting the word to its start when word length is changed
    if (!chars) {
      console.log(
        'frag:',
        frag,
        '; chars:',
        chars,
        '; position:',
        rTim._queue.position
      );
    }
    var noWhitespace = chars.replace(rTim._whitespaceRegex, '');

    // If it's time to skip whitespace and there's nothing but whitespace
    // in the fragment, figure out which direction to move in, and
    // send info to move once in that direction
    if (rTim._skipWhitespace && noWhitespace.length === 0) {
      if (incrementors[0] !== 0) {
        vector[0] = rTim.signOf(incrementors[0]);
      } else if (incrementors[1] !== 0) {
        vector[1] = rTim.signOf(incrementors[1]);
      } else if (incrementors[2] !== 0) {
        vector[2] = rTim.signOf(incrementors[2]);

        // For when play passes [0, 0, 0]. ??: Does anything else ever do this?
        // We're going to have to skip in some direction or we'll never get anywhere
      } else {
        vector = [0, 0, 1]; // ??: Always true?
      }
    }

    return vector
  }; // End rTim._skipDirection()

  rTim._loop = function(incrementors, justOnce) {
    // https://jsfiddle.net/d1mgadeo/2/

    // Finish if we're at the end of the text

    // can't do if (!_isPlaying) because things that call .once() and such also pause

    $$3(rTim).trigger('loopBegin', [rTim]);
    if (rTim._done) {
      return
    }
    // If, for example, calling the loop from the loop, just keep
    // going in the same global direction. Allows for stuff like
    // `._play()` to show current word, then keep going
    incrementors = incrementors || rTim._incrementors; // ??: Too indirect?
    var frag = rTim._queue.getFragment(incrementors),
      skipDir = rTim._skipDirection(incrementors, frag); // [int, int, int] of -1, 0, or 1

    // !!! KEEP THIS even though it's not currently needed for sentences. I hope
    // to make paragraphs their own sentences for reasons of accessibility.
    // It's actually useful when navigating by word fragment.
    if (skipDir[0] !== 0 || skipDir[1] !== 0 || skipDir[2] !== 0) {
      $$3(rTim).trigger('loopSkip', [rTim, frag]);
      rTim._loop(skipDir, justOnce);
    } else {
      if (!justOnce) {
        // How long this word will remain on the screen before changing
        var delay = delayer.calcDelay(frag, justOnce); // TODO: for fastforward, modify speed
        //console.log(delay);
        rTim._timeoutID = setTimeout(rTim._loop, delay);
      }

      // Send fragment after setTimeout so that you can easily
      // pause on "newWordFragment". Feels weird, though.
      $$3(rTim).trigger('newWordFragment', [rTim, frag]);
      $$3(rTim).trigger('loopFinish', [rTim]);
    } // end if skip fragment or not skip fragment

    // Finish if we're at the end of the text
    if (rTim._wordsDone()) {
      return rTim
    }

    return rTim // Return timeout id instead?
  }; // End rTim._loop()

  rTim.once = function(incrementors) {
    $$3(rTim).trigger('onceBegin', [rTim]);
    rTim._loop(incrementors, true);
    $$3(rTim).trigger('onceFinish', [rTim]);

    return rTim
  }; // End rTim.once()

  // ============== Utility ============== \\

  rTim.makeCounter = function(num) {
    var count = num;
    var increment = function() {
      return (count = count + 1)
    };
    var decrement = function() {
      return (count = count - 1)
    };
    var getCount = function() {
      return count
    };
    return {
      increment: increment,
      decrement: decrement,
      getCount: getCount
    }
  };
  rTim.setProlongationCounter = function() {
    rTim.prolongCounter = rTim.makeCounter(rTim.lastWordFragmentCount());
  };
  // ============== Utility ============== \\

  rTim._init();
  return rTim
}; // End ReaderlyTimer() -> {}

//   return ReaderlyTimer
// })

/* ReaderlyDisplay.js
 *
 * Just the Readerly text display, including areas for
 * future buttons. No settings, etc.
 *
 * Based on https://github.com/jamestomasino/read_plugin/blob/master/Read.js
 *
 * NOTES:
 * - name - ReaderlyBar? ReaderlySee?
 *
 * TODO:
 * - Consider prepending main element as opposed to appending it. Possibly
 * 	easer for screen readers/tabing to find more quickly (so the controls
 * 	can be accessed more quickly). Though now it's an iframe, so how does
 * 	that work for accessibility...? Maybe set up some tab-able controls
 * 	that are invisibile that are outside of the iframe...
 */

let $$4 = require('jquery');
let coreCSSstr = require('./lib/core-CSS');
let nouiCSSstr = require('./lib/settings/noui-CSS');
//
// (function(root, displayFactory) {  // root is usually `window`
//     if(typeof define === 'function' && define.amd) {
//         // AMD. Register as an anonymous module.
//         define(['jquery', 'core-CSS', 'settings/noui-CSS'], function(jquery, nouiCSS) {
//             return ( root.ReaderlyDisplay = displayFactory(jquery, nouiCSS) );
//         });
//     } else if(typeof module === 'object' && module.exports) {
//         // Node. Does not work with strict CommonJS, but only CommonJS-like
//         // environments that support module.exports, like Node.
//         module.exports = displayFactory(require('jquery'), require('./core-CSS'), require('./settings/noui-CSS'));
//     } else {
//         // Browser globals
//         root.ReaderlyDisplay = displayFactory(root.jQuery, root.nouiCSS);
//     }
// }(this, function($, coreCSSstr, nouiCSSstr) {

// 'use strict';

var ReaderlyDisplay = function (timer, parentNode, settings) {
  var rDis = {};

  rDis._toTrigger = [];

  var readerly, textElems, $iframe;

  var iframeStr = '<iframe id="__rdly_iframe"></iframe>';

  var cssStr = '<style>' + coreCSSstr + '\n' + nouiCSSstr + '</style>';

  //  TODO: Change (almost) all these to id's
  var htmlStr =
    '<div id="__rdly">\
	<div id="__rdly_above_bar" class="__rdly-main-section"></div>\
	<div id="__rdly_bar" class="__rdly-main-section">\
		<div class="__rdly-bar-section __rdly-bar-left"></div>\
		<div class="__rdly-bar-section __rdly-bar-center __rdly-transform-centered">\
			<div id="__rdly_above_text_elements"></div>\
			<div id="__rdly_left_text_elements"></div>\
			<div id="__rdly_text_elements"></div>\
			<div id="__rdly_right_text_elements"></div>\
			<div id="__rdly_below_text_elements"></div>\
		</div>\
		<div class="__rdly-bar-section __rdly-bar-right2">\
			<label for="__rdly_halvespeed_input">*</label>\
            <input id="__rdly_halvespeed_input" class="__rdly-checkbox-input" type="checkbox"/>\
		</div>\
		<div class="__rdly-bar-section __rdly-bar-right">\
			<button id="__rdly_close" class="__rdly-sup-menu-button">x</button>\
		</div>\
	</div>\
	<div id="__rdly_below_bar" class="__rdly-main-section __rdly-hidden"></div>\
</div>';

  // =========== HOOKS =========== \\

  rDis.addToTriggerList = function (newObjWithTriggerFuncts) {
    // TODO: Prevent duplicates
    rDis._toTrigger.push(newObjWithTriggerFuncts);
    return rDis
  };

  // =========== RUNTIME ACTIONS =========== \\

  rDis.close = function () {
    // This is where everything gets closed, paused, put away
    rDis.hide();
    for (let trigi = 0; trigi < rDis._toTrigger.length; trigi++) {
      let obj = rDis._toTrigger[trigi];
      if (obj.close) obj.close();
    }
    return rDis
  };

  rDis.open = function () {
    rDis.show();
    for (let trigi = 0; trigi < rDis._toTrigger.length; trigi++) {
      let obj = rDis._toTrigger[trigi];
      if (obj.open) obj.open();
    }
    return rDis
  };

  var keybinds = function (event) {
    switch (event.keyCode) {
      case 27: // Esc - close menu
        rDis.close();
        break

      case 192:
      case 32: // ' - toggle play/pause
        document.activeElement.blur();
        document.getElementById('__rdly_iframe').focus();
        $$4(readerly)
          .find('#__rdly_text_button')
          .click();
        break

      default:
        return
    }

    return false
  };

  var iframe;

  var style = document.createElement('style');

  var style2 = document.createElement('style');

  rDis.show = function () {
    $iframe.show();
    style.textContent =
      'p, a, i, li, h1, h2, h3, h4, h5, h6, img, div.tx, div.tx1, div.tx2 :not(iframe):not(script) { filter: blur(2.5px); user-select:none; pointer-events:none; } body :not(iframe):not(script) { user-select:none; pointer-events:none; } #__rdly_iframe { user-select:none; }';
    style2.textContent = 'html, body, .mw-body { background-color: #F5F5F5; } ';
    document.body.appendChild(style2);
    document.body.appendChild(style);
    window.addEventListener('keydown', keybinds);
    iframe = document.getElementById('__rdly_iframe');
    iframe.contentDocument.body.addEventListener('keydown', keybinds);
    document.getElementById('__rdly_iframe').focus();
    // $(readerly).slideDown(200);
    return rDis
  };

  rDis.hide = function () {
    $iframe.hide();
    document.body.removeChild(style);
    document.body.removeChild(style2);
    window.removeEventListener('keydown', keybinds);
    iframe.contentDocument.body.removeEventListener('keydown', keybinds);
    document.activeElement.blur();
    // $(readerly).slideUp(200);
    return rDis
  };

  rDis.destroy = function () {
    $$4(readerly).remove();
    return rDis
  };

  // iframe element sizing
  // https://jsfiddle.net/fpd4fb80/31/
  rDis._resizeIframeAndContents = function () {
    // There should only be one (for now...)
    var grower = $$4(readerly).find('.__rdly-to-grow')[0];

    // For when the element isn't made yet or isn't visible
    if (!grower) {
      return rDis
    }

    var scrollable = $$4(grower).parent()[0],
      scrollRect = scrollable.getBoundingClientRect();

    // Get the difference between the lowest point of the
    // unscrolled scrollable content and the lowest visible point
    // Takes into account everything above and including, but not
    // below, the scrollable content

    // Takes into account everything above the scrollable element
    // including borders/padding/etc.
    var top = scrollable.getBoundingClientRect().top,
      // Takes into account the height of the element that's
      // currently going to be scrolled
      height = grower.getBoundingClientRect().height,
      // The bottom of where the contents would end if you weren't
      // scrolled and no adjustments for size were made.
      potentialBottom = top + height,
      // The bottom of the the visible window
      screenBottom = document.documentElement.clientHeight,
      // How much needs to be subtracted (almost, see below) from the
      // scrollable node's height (not contents) in order to fit on the page.
      diff = potentialBottom - screenBottom;

    // Have taken care off stuff above and in the contents
    // Now will account for all the padding/borders, etc at
    // the bottom that may otherwise get cut off in some browsers
    // (Have to calcuate this again because the viewport might have changed on scroll)
    var scrollBottom = scrollable.getBoundingClientRect().bottom,
      // The bottom of the outer-most node, so we can pull everything
      // up to be visible
      outerBottom = readerly.getBoundingClientRect().bottom,
      bottomDiff = outerBottom - scrollBottom;

    diff = diff + bottomDiff;

    var newHeight = height;
    if (diff > 0) {
      newHeight = height - diff;
    }
    scrollable.style.height = newHeight + 'px';

    // Since the outer element is being used to determine the height of
    // the iframe, I assume it's at the very top of the iframe, so no
    // extra 'outer top' value needs to be subtracted.
    var currentOuterHeight = top + newHeight + bottomDiff;

    $iframe[0].style.height = currentOuterHeight + 'px';

    return rDis
  }; // End rDis._resizeIframeAndContents()

  rDis.update = function () {
    // Callable from outside to have the display resize what it needs it

    // Note on previous bug. Solution was to call function first without a delay
    // then with one.
    // Seemed to be a Chrome issue going on. Needed to call this twice with a delay.
    // Don't remember what it was, but it wasn't from lag. Something really didn't
    // work until this was called for the second time. Something to do with going
    // from height: 0 to whatever height
    setTimeout(rDis._resizeIframeAndContents, 4);
    // Delay probably won't work when there's a lot of lag.
    // TODO: Wait for an element to appear properly before calling resize
    return rDis
  };

  rDis.toggleHalfSpeed = function (event) {
    var delayModifier = event.target.checked ? 2.25 : 1;
    settings.set('delayModifier', delayModifier);

    var sentenceModifier = event.target.checked ? 0.6 : 1;
    settings.set('sentenceModifier', sentenceModifier);
  };

  // =========== INITIALIZE =========== \\

  var isSpeedHalved = settings.isModifier.bind(null, 2.25);
  rDis._addEvents = function () {
    $$4(rDis.nodes.close).on('touchend click', rDis.close);
    $$4(readerly).on('mousedown mouseup touchstart touchend', rDis.update);
    $$4(rDis.nodes.halfSpeed)[0].checked = isSpeedHalved();
    $$4(rDis.nodes.halfSpeed).on('change', rDis.toggleHalfSpeed);
    $$4(window).on('resize', rDis.update);
    // Event for content zooming?
    return rDis
  };

  rDis._addNodes = function (parentNode) {
    if (!parentNode) {
      parentNode = $$4(document.body)[0];
    }

    $iframe = $$4(iframeStr);
    $iframe.appendTo(parentNode);

    var doc = $iframe[0].contentDocument;
    doc.body.style['overflow-x'] = 'hidden';
    doc.body.style['overflow-y'] = 'hidden';

    readerly = rDis._readerlyNode = $$4(htmlStr)[0];
    $$4(readerly).appendTo(doc.body);

    // STYLES
    var $styles = $$4(cssStr);
    $styles.appendTo(doc.head);
    $iframe[0].style.minHeight = '81px';
    // ??: Is this useful?

    rDis.nodes = {
      doc: doc,
      head: doc.head,
      body: doc.body,
      readerly: readerly,
      above: $$4(readerly).find('#__rdly_above_bar')[0],
      bar: $$4(readerly).find('#__rdly-bar')[0],
      barLeft: $$4(readerly).find('.__rdly-bar-left')[0],
      barCenter: $$4(readerly).find('.__rdly-bar-center')[0],
      aboveText: $$4(readerly).find('#__rdly_above_text_elements')[0],
      leftOfText: $$4(readerly).find('#__rdly_left_text_elements')[0],
      textElements: $$4(readerly).find('#__rdly_text_elements')[0],
      rightOfText: $$4(readerly).find('#__rdly_right_text_elements')[0],
      belowText: $$4(readerly).find('#__rdly_below_text_elements')[0],
      barRight: $$4(readerly).find('.__rdly-bar-right')[0],
      close: $$4(readerly).find('#__rdly_close')[0],
      halfSpeed: $$4(readerly).find('#__rdly_halvespeed_input')[0],
      below: $$4(readerly).find('#__rdly_below_bar')[0]
    };
    return rDis
  }; // End rDis._addNodes()

  rDis._init = function (parentNode) {
    if (!$$4('#__rdly_iframe')[0]) {
      rDis
        ._addNodes(parentNode)
        ._addEvents()
        // This is in the wrong place
        // Reconfig needed. This should construct timer?
        // Create parent object instead?
        .addToTriggerList(timer);

      // This should not be visible until it's .show()n
      $iframe.hide();
      // $(readerly).hide( 0, rDis.update )
      $$4('#__rdly_iframe').hide(0);
    }
    return rDis
  };

  // =========== ADD NODE, ETC. =========== \\
  // Don't show at start, only when prompted
  rDis._init(parentNode);

  // To be called in a script
  return rDis
}; // End ReaderlyDisplay() -> {}


// }));

/* PlaybackUI.js
*
* Pause, play, rewind, fast-forward, and scrub
* controls. Includes progress bar. Name is not
* accurate, but it is clear and recognizable.
*
* Based on https://github.com/jamestomasino/read_plugin/blob/master/Read.js
*/

let $$5 = require('jquery');
let noUiSlider = require('@knod/nouislider');
let playbackCSSstr = require('./lib/playback/playback-CSS');

function PlaybackUI (timer, coreDisplay) {
  var rPUI = {};

  rPUI.modifierKeysDown = []; // Will be emptied when app is closed
  rPUI.sentenceModifierKey = 17; // 'ctrl'

  rPUI.isOpen = false;
  rPUI.isPlaying = false;
  rPUI.isScrubbing = false;
  rPUI.nodes = {};
  var nodes = rPUI.nodes;

  var progressNode;
  var indicator, textButton, textContainer, loading;
  var playPauseFeedback, playFeedback, pauseFeedback;
  var controls; // We'll see how this one shapes up
  var rewindSentence;
  var nonCharRegEx = /[.,\/@#!$%\^&\*;:{}\+=\-_`~()‘’'"“”\[\]<>\|\\]/g;

  var progStr = '<div id="__rdly_progress"></div>';

  var textContainerStr =
      '<div class="__rdly-flexible"><span id="__rdly-text-left" class="__rdly-text"></span><span id="__rdly-text-center" class="__rdly-text"></span><span id="__rdly-text-right" class="__rdly-text"></span></div>',
    indicatorStr =
      '<div id="__rdly_indicator" class="__rdly-center __rdly-flexible"><span>|</span></div>',
    textButtonStr =
      '<button id="__rdly_text_button" class="__rdly-transform-centered"></button>',
    loadingStr = '<div id="__rdly_loading" class="__rdly-hidden"></div>';

  var feedbackStr =
    '<div id="__rdly_play_pause_feedback" class="__rdly-transform-centered">\
	<div id="__rdly_pause_feedback" class="__rdly-playback-feedback __rdly-transform-centered">||</div>\
	<div id="__rdly_play_feedback" class="__rdly-playback-feedback __rdly-transform-centered">></div>\
</div>';

  // 		var controlsStr = '<div id="__rdly_playback_controls">\
  // 	<button id="__rdly_rewind_sentence" class="__rdly-playback-button"></button>\
  // 	<button id="__rdly_rewind_word" class="__rdly-playback-button"></button>\
  // 	<button id="__rdly_fastforward_word" class="__rdly-playback-button"></button>\
  // 	<button id="__rdly_fastforward_sentence" class="__rdly-playback-button"></button>\
  // </div>';

  var browser = chrome || browser,
    rewPath = browser.extension.getURL('images/rewind.png');
  var rewindSentenceStr =
    '<button id="__rdly_rewind-sentence" class="__rdly-big-menu-button">\
    	<img src="' +
    rewPath +
    '"></img>\
    </button>';

  var fontPath = browser.extension.getURL('fonts/ClearSansLight.ttf');

  // =========== RUNTIME ACTIONS =========== \\

  rPUI.clear = function() {
    rPUI.modifierKeysDown = [];
    window.removeEventListener('keydown', rPUI.keyDown);
    iframe.contentDocument.body.removeEventListener('keydown', rPUI.keyDown);
    return rPUI
  };
  rPUI.open = function() {
    rPUI.isOpen = true;
    return rPUI
  };
  rPUI.close = function() {
    rPUI.isOpen = false;
    return rPUI
  };

  rPUI.hideText = function() {
    $$5(textButton).addClass('__rdly-hidden');
    return rPUI
  };

  rPUI.showText = function() {
    $$5(textButton).removeClass('__rdly-hidden');
    return rPUI
  };

  rPUI.wait = function() {
    rPUI.hideText();
    $$5(loading).addClass('__rdly-rotating');
    $$5(loading).removeClass('__rdly-hidden');
    return rPUI
  };

  rPUI.stopWaiting = function() {
    $$5(loading).addClass('__rdly-hidden');
    $$5(loading).removeClass('__rdly-rotating');
    rPUI.showText();
    return rPUI
  };

  rPUI.clearText = function() {
    $$5(textButton).html('');
    return rPUI
  };

  // ----- DOM EVENTS ----- \\
  rPUI._play = function() {
    $$5(playFeedback).removeClass('__rdly-hidden');
    $$5(pauseFeedback).addClass('__rdly-hidden');
    // https://jsfiddle.net/aL7kxe78/3/ fadeOut (ends with display: none)
    // http://stackoverflow.com/a/4549418/3791179 <- opacity
    var x = $$5(playPauseFeedback)
      .fadeTo(0, 0.7)
      .fadeTo(700, 0);
    return rPUI
  };

  rPUI._pause = function() {
    $$5(pauseFeedback).removeClass('__rdly-hidden');
    $$5(playFeedback).addClass('__rdly-hidden');
    $$5(playPauseFeedback)
      .fadeTo(0, 0.7)
      .fadeTo(700, 0);
    return rPUI
  };

  rPUI._togglePlayPause = function() {
    timer.togglePlayPause();
    return rPUI
  };

  rPUI._rewindSentence = function() {
    timer.prevSentence();
    return rPUI
  };

  // ----- TIMER EVENTS ----- \\

  /*
			Moves one character (letter) from the middle string to start string and
			one character from end string into middle string
		*/
  rPUI._shiftCharacter = function(textParts) {
    textParts.startText += textParts.middleText;
    textParts.middleText = textParts.endText.substring(0, 1);
    textParts.endText = textParts.endText.substring(1);
  };

  var whiteSpaceRegexp = /^[\n\r\s]+$/;
  var paragraphSymbol =
    '<span class="__rdly-text-content"></span><span class="__rdly-text-content"></span><span class="__rdly-text-content"></span>';
  rPUI._showNewFragment = function(evnt, timer, fragment) {
    var chars = fragment;
    // Adds pauses for line breaks
    // TOOD: Deal with line breaks in timer instead?
    if (!whiteSpaceRegexp.test(chars)) {
      var startSpan = textContainer.querySelector('#__rdly-text-left');
      var middleSpan = textContainer.querySelector('#__rdly-text-center');
      var endSpan = textContainer.querySelector('#__rdly-text-right');

      var textParts = {
        startText: '',
        middleText: '',
        endText: ''
      };

      // Gets fragment without punctuation characters that won't count
      // towards its total length.
      var noPunctuationLength = chars.replace(nonCharRegEx, '').length;
      if (chars.includes(' ')) {
        textParts.startText = '';
        textParts.middleText = chars;
        textParts.endText = '';
      } else if (chars.includes(';') && chars.includes('"')) {
        textParts.startText = '';
        textParts.middleText = chars;
        textParts.endText = '';
      } else if (
        chars.includes(';') &&
        (chars.includes('(') || chars.includes(')'))
      ) {
        textParts.startText = '';
        textParts.middleText = chars;
        textParts.endText = '';
      } else if (chars.includes('<') && chars.includes('>')) {
        textParts.startText = '';
        textParts.middleText = chars;
        textParts.endText = '';
      } else if (chars.includes('/') || chars.includes('\\')) {
        textParts.startText = '';
        textParts.middleText = chars;
        textParts.endText = '';
      } else if (
        chars.includes('document.getElementById') ||
        chars.includes('createScene();')
      ) {
        textParts.startText = '';
        textParts.middleText = chars;
        textParts.endText = '';
      } else if (noPunctuationLength >= 20) {
        textParts.startText = '';
        textParts.middleText = chars;
        textParts.endText = '';
      } else if (noPunctuationLength >= 10) {
        textParts.startText = chars.substring(0, 3);
        textParts.middleText = chars.substring(3, 4);
        textParts.endText = chars.substring(4);
      } else if (noPunctuationLength >= 7) {
        textParts.startText = chars.substring(0, 2);
        textParts.middleText = chars.substring(2, 3);
        textParts.endText = chars.substring(3);
      } else if (noPunctuationLength >= 2) {
        textParts.startText = chars.substring(0, 1);
        textParts.middleText = chars.substring(1, 2);
        textParts.endText = chars.substring(2);
      } else {
        textParts.startText = '';
        textParts.middleText = chars;
        textParts.endText = '';
      }

      //In the case we only have one letter we won't shift at all
      if (noPunctuationLength >= 2) {
        /*If we start off with symbols we want them not to count for the indicator position so we will shift things appropriately.  Find number of non character symbols in textParts.startText and shift that many symbols left through the middle and end text. */
        var symbolsInStart = textParts.startText.match(nonCharRegEx);
        if (symbolsInStart) {
          for (var i = 0; i < symbolsInStart.length; i++) {
            rPUI._shiftCharacter(textParts);
          }
        }

        //If we end up with the middle character not being a letter shift over one until we end up at a non symbol
        while (
          textParts.middleText.match(nonCharRegEx) &&
          textParts.endText.length > 0 &&
          noPunctuationLength > 2
        ) {
          rPUI._shiftCharacter(textParts);
        }
      }

      startSpan.textContent = textParts.startText;
      middleSpan.textContent = textParts.middleText;
      endSpan.textContent = textParts.endText;
    } else {
      $$5(textButton).html(paragraphSymbol);
    }
    rPUI.stopWaiting();
    return rPUI
  };

  rPUI._showProgress = function(evnt, timer, fraction, indx, total) {
    // TODO: Needs some work
    if (!rPUI.isScrubbing) {
      // Don't mess timing up with transitions
      progressNode.noUiSlider.set(indx); // version 8 nouislider
    }
    return rPUI
  };

  rPUI._start = function() {
    progressNode.noUiSlider.updateOptions({
      range: { min: 0, max: timer.getLength() - 1 || 1 }
    });
    return rPUI
  };

  // --------- SCRUBBER EVENTS --------- \\
  rPUI._startScrubbing = function(values, handle) {
    rPUI.isScrubbing = true;
    return rPUI
  }; // End rPUI._startScrubbing()

  rPUI._updateScrubbedWords = function(values, handle) {
    timer.jumpTo({
      type: 'index',
      amount: parseInt(values[handle])
    });
    return rPUI
  }; // End rPUI._updateScrubbedWords()

  rPUI._stopScrubbing = function(values, handle) {
    rPUI.isScrubbing = false;
    timer.disengageJumpTo();
    return rPUI
  }; // End rPUI._stopScrubbing()

  rPUI.keyDown = function(evnt) {
    // If the app isn't open, don't want to get errors for trying
    // to do impossible stuff and don't want to change position in text
    if (!rPUI.isOpen) {
      return rPUI
    }

    if (evnt.ctrlKey && evnt.keyCode === 39) {
      timer.nextSentence();
    } else if (evnt.ctrlKey && evnt.keyCode === 37) {
      timer.prevSentence();
    } else if (evnt.shiftKey && evnt.keyCode === 39) {
      timer.nextTwoSentences();
    } else if (evnt.shiftKey && evnt.keyCode === 37) {
      timer.prevTwoSentences();
    } else if (evnt.keyCode === 39) {
      timer.nextWord();
    } else if (evnt.keyCode === 37) {
      timer.prevWord();
    }

    return rPUI
  }; // End rPUI.keyDown()

  // =========== INITIALIZE =========== \\

  rPUI._progressSlider = function(progNode) {
    /* ( DOM Node ) -> same DOM Node
		*
		* Turn the given data into one noUiSlider slider
		*/
    // To keep handles within the bar
    $$5(progNode).addClass('noUi-extended');

    var slider = noUiSlider.create(progNode, {
      range: { min: 0, max: 1 },
      start: 0,
      step: 1,
      connect: [true, false],
      //connect: 'lower',
      handles: 1,
      behaviour: 'tap'
    });

    return progNode
  }; // End rPUI._progressSlider()

  rPUI._addEvents = function() {
    // Timer events
    $$5(timer).on('playBegin', rPUI._play);
    $$5(timer).on('pauseFinish', rPUI._pause);
    $$5(timer).on('startFinish', rPUI._start);
    $$5(timer).on('newWordFragment', rPUI._showNewFragment);
    $$5(timer).on('progress', rPUI._showProgress);

    // Scrubber events
    progressNode.noUiSlider.on('start', rPUI._startScrubbing);
    progressNode.noUiSlider.on('slide', rPUI._updateScrubbedWords);
    progressNode.noUiSlider.on('change', rPUI._stopScrubbing);

    // DOM events
    $$5(textButton).on('touchend click', rPUI._togglePlayPause);
    $$5(rewindSentence).on('touchend click', rPUI._rewindSentence);

    // Keyboard input
    // Arrow keys only listen to the keydown and keyup event, not keypress
    //$(coreDisplay.nodes.doc).on( 'keydown', rPUI.keyDown );
    //$(coreDisplay.nodes.doc).on( 'keyup', rPUI.keyUp );
    //$(document.body).on( 'keydown', rPUI.keyDown );
    //$(document.body).on( 'keyup', rPUI.keyUp );
    var iframe;
    iframe = document.getElementById('__rdly_iframe');
    window.addEventListener('keydown', rPUI.keyDown);
    iframe.contentDocument.body.addEventListener('keydown', rPUI.keyDown);

    return rPUI
  }; // End rPUI._addEvents()

  rPUI._init = function (coreDisplay) {
    rPUI.modifierKeysDown = []; // TODO: Empty non-destructively
    rPUI.sentenceModifierKey = 17; // 'ctrl' TODO: Modifiable?

    progressNode = nodes.progressNode = $$5(progStr)[0];
    rPUI._progressSlider(progressNode);

    indicator = nodes.indicator = $$5(indicatorStr)[0];
    // ??: Should this really be a button? How do the rest of the controls fit into this?
    // ??: Should there just be an invisible set of controls that accessible aids can grab hold of
    textButton = nodes.textButton = $$5(textButtonStr)[0];
    textContainer = nodes.textContainer = $$5(textContainerStr)[0];
    loading = nodes.loading = $$5(loadingStr)[0];

    playPauseFeedback = nodes.playPauseFeedback = $$5(feedbackStr)[0];
    playFeedback = nodes.playFeedback = $$5(playPauseFeedback).find(
      '#__rdly_play_feedback'
    )[0];
    pauseFeedback = nodes.pauseFeedback = $$5(playPauseFeedback).find(
      '#__rdly_pause_feedback'
    )[0];

    // // Go in .rdly-bar-center .rdly-below?
    // controls = nodes.controls = $(controlsStr)[0];

    rewindSentence = nodes.rewindSentence = $$5(rewindSentenceStr)[0];

    var coreNodes = coreDisplay.nodes;
    $$5(progressNode).appendTo(coreNodes.above);
    $$5(playPauseFeedback).appendTo(coreNodes.barCenter);

    $$5(indicator).appendTo(coreNodes.textElements);
    $$5(textContainer).appendTo(coreNodes.textElements);
    $$5(textButton).appendTo(coreNodes.textElements);
    $$5(loading).appendTo(coreNodes.textElements);

    $$5(controls).appendTo(coreNodes.bar);
    $$5(rewindSentence).appendTo(coreNodes.barLeft);

    // STYLES
    playbackCSSstr =
      playbackCSSstr +
      '@font-face { font-family: Clear Sans Light;' +
      'src: url(' +
      fontPath +
      ');}';
    playbackCSSstr = '<style>' + playbackCSSstr + '</style>';
    var $css = $$5(playbackCSSstr);
    $css.appendTo(coreNodes.head);

    coreDisplay.addToTriggerList(rPUI);

    rPUI._addEvents();

    return rPUI
  }; // End rPUI._init()

  // =========== ADD NODE, ETC. =========== \\
  // Don't show at start, only when prompted
  rPUI._init(coreDisplay);

  // To be called in a script
  return rPUI
}

/* ReaderlySettings.js
*
* Should manage settings. Don't put them directly in here
* one by one. This should have functions that allow this
* object to be extended.
*
* TODO:
* ??: Add events/buttons for things like opening and closing settings?
* - ??: Don't close settings when closing readerly? If they were there
* 	on close, should they be there on re-open?
* - Stop scrolling on doc when being scrolled
*/

let $$6 = require('jquery');
let settingsCSSstr = require('./lib/settings/settings-CSS');

//
// ;(function(root, settingsFactory) {
//   // root is usually `window`
//   if (typeof define === 'function' && define.amd) {
//     // AMD. Register as an anonymous module.
//     define(['jquery', './settings/settings-CSS'], function(
//       jquery,
//       settingsCSS
//     ) {
//       return (root.ReaderlySettings = settingsFactory(jquery, settingsCSS))
//     })
//   } else if (typeof module === 'object' && module.exports) {
//     // Node. Does not work with strict CommonJS, but only CommonJS-like
//     // environments that support module.exports, like Node.
//     module.exports = settingsFactory(
//       require('jquery'),
//       require('./settings-CSS')
//     )
//   } else {
//     // Browser globals
//     root.ReaderlySettings = settingsFactory(root.jQuery, root.settingsCSS)
//   }
// })(this, function($, settingsCSSstr) {
//   'use strict'

var ReaderlySettings = function(coreDisplay) {
  var rSet = {};

  rSet.settings = {};

  rSet.nodes = {};
  rSet.menuNodes = {};

  rSet._isOpen = false;

  var opener, container, menus, tabs;

  // =========== ALLOW EXTENTIONS OF SETTINGS =========== \\

  // ---- Add a tab to go with the settings ---- \\
  rSet._hideLoneTab = function() {
    /* Make sure that if there's only one settings element,
		* the tabs don't show
		*/
    if (Object.keys(rSet.menuNodes).length <= 1) {
      $$6(tabs).addClass('__rdly-hidden');
      $$6(tabs).css({ display: 'none' });
    } else {
      $$6(tabs).removeClass('__rdly-hidden');
      $$6(tabs).css({ display: 'flex' });
    }
    return rSet
  };

  rSet._showMenu = function(evnt) {
    // Sent from a tab, DOES NOT SHOW THE NODE THAT CONTAINS ALL THE MENUS
    // Shows one individual menu, hiding the other menu nodes
    var $thisTab = $$6(evnt.target),
      id = evnt.target.id.replace(/_tab$/, ''),
      $menus = $$6(menus).find('.__rdly-settings-menu'),
      $tabs = $$6(tabs).children(),
      thisMenu = rSet.menuNodes[id];

    // Hide all, then show this one
    $menus.addClass('__rdly-hidden');
    $menus.css({ display: 'none' });
    $$6(thisMenu).removeClass('__rdly-hidden');
    $$6(thisMenu).css({ display: 'flex' });

    // There should only be one (for now...). It's height gets adjusted.
    // Should only have one child, which can grow.
    $menus.removeClass('__rdly-to-grow');
    $$6(thisMenu).addClass('__rdly-to-grow');

    // Same type of thing, showing this tab as active
    $tabs.removeClass('__rdly-active-ui');
    $thisTab.addClass('__rdly-active-ui');

    return rSet
  };

  rSet.destroyMenu = function(evnt) {
    var id = evnt.target.id; // Not a jQuery element

    $$6(rSet.menuNodes[id]).remove();
    rSet.menuNodes[id] = null;
    $$6($$6(tabs).find('#' + id + '_tab')).remove();

    return rSet
  };

  rSet._addTab = function(id, tabText) {
    var html =
        '<div id="' +
        id +
        '_tab" class="__rdly-settings-tab">' +
        tabText +
        '</div>',
      $tab = $$6(html);
    $tab.appendTo(tabs);
    rSet._hideLoneTab();

    $tab.on('touchend click', rSet._showMenu);

    return $tab
  };

  rSet.addMenu = function(menu) {
    // node, tabText ) {

    var node = menu.node,
      tabText = menu.tabText;

    var id = node.id;

    // Abort if already exists
    if (rSet.menuNodes[id]) {
      // Not sure how else to handle this gracefully...
      // Just refuse to add something with this ID? That seems cruel.
      console.warn(
        "A settings menu of this id is already in here. Please pick a different id or use mySettingsManager.destroyMenu( 'someID' ) to destroy it. Existing menu:",
        rSet.menuNodes[id]
      );
      return node
    }

    rSet.menuNodes[id] = node;

    // Otherwise keep going
    var $newNode = $$6(node);
    $newNode.addClass('__rdly-settings-menu');

    $$6(menus).append($newNode);
    $newNode[0].addEventListener(
      'destroyOneSettingsMenu',
      rSet._removeMenu,
      false
    ); // TODO: Remove this line
    rSet.settings[menu.id] = menu;

    var $tab = rSet._addTab(id, tabText);

    // Show the first menu added each time, just in case?
    $$6($$6(tabs).children()[0]).trigger('click');

    return rSet
  }; // End rSet.addMenu()

  // =========== BASE OBJECT =========== \\
  rSet._open = function() {
    $$6(coreDisplay.nodes.below).removeClass('__rdly-hidden');
    $$6(opener).addClass('__rdly-active-ui'); // different style

    rSet._isOpen = true;
    coreDisplay.update();

    return rSet
  };

  rSet.close = function(evnt) {
    // Allowed to be called externally
    $$6(coreDisplay.nodes.below).addClass('__rdly-hidden');
    $$6(opener).removeClass('__rdly-active-ui'); // different style

    rSet._isOpen = false;
    coreDisplay.update();

    return rSet
  };

  rSet._toggleOpenClose = function() {
    if (rSet._isOpen) {
      rSet.close();
    } else {
      rSet._open();
    }
    return rSet
  };

  rSet._addEvents = function() {
    $$6(opener).on('touchend click', rSet._toggleOpenClose);
    return rSet
  };

  rSet._addBase = function(coreDisplay) {
    var browser = chrome || browser,
      setPath = browser.extension.getURL('images/settings.png');
    var $open = $$6(
        '<button id="__rdly_open_settings" class="__rdly-big-menu-button">\
                                       <img class="__rdly-big-menu-button-image" src="' +
          setPath +
          '"></img>\
                                       </button>'
      ),
      $cont = $$6('<div id="__rdly_settings_container"></div>'),
      $taby = $$6('<div id="__rdly_settings_tabs"></div>'),
      $sets = $$6(
        '<div id="__rdly_settings_menus" class="__rdly-scrollable-y"></div>'
      );

    var coreNodes = coreDisplay.nodes,
      head = coreNodes.head,
      left = coreNodes.barLeft,
      below = coreNodes.below;

    var nodes = rSet.nodes;
    opener = nodes._openSettings = $open.prependTo(left)[0];
    container = nodes._settingsContainer = $cont.prependTo(below)[0];
    tabs = nodes._tabs = $taby.appendTo($cont)[0];
    menus = nodes._menus = $sets.appendTo($cont)[0];

    // STYLES
    settingsCSSstr = '<style>' + settingsCSSstr + '</style>';
    var $css = $$6(settingsCSSstr);
    $css.appendTo(head);

    return rSet
  };

  rSet._init = function(coreDisplay) {
    rSet._addBase(coreDisplay)._addEvents();

    coreDisplay.addToTriggerList(rSet);

    return rSet
  };

  // =========== CREATE =========== \\
  // Don't show at start, only when prompted
  rSet._init(coreDisplay);

  // To be called in a script
  return rSet
}; // End ReaderlySettings() -> {}

// To put on the window object, or export into a module
//   return ReaderlySettings
// })

/* SpeedSettings.js
*
* UI elements for setting various speeds/delays for
* certain characteristics of words, like length and
* punctuation.
*
* Based on https://github.com/jamestomasino/read_plugin/blob/master/Read.js
*/

let $$7 = require('jquery');
let noUiSlider$1 = require('@knod/nouislider');

// ;(function(root, speedsFactory) {
//   // root is usually `window`
//   if (typeof define === 'function' && define.amd) {
//     // AMD. Register as an anonymous module.
//     define(['jquery', '@knod/nouislider'], function(jquery, nouislider) {
//       return (root.SpeedSettings = speedsFactory(jquery))
//     })
//   } else if (typeof module === 'object' && module.exports) {
//     // Node. Does not work with strict CommonJS, but only CommonJS-like
//     // environments that support module.exports, like Node.
//     module.exports = speedsFactory(
//       require('jquery'),
//       require('@knod/nouislider')
//     )
//   } else {
//     // Browser globals
//     root.SpeedSettings = speedsFactory(root.jQuery, root.noUiSlider) // not sure noUi is here
//   }
// })(this, function($, noUiSlider) {
//   'use strict'

var SpeedSettings = function(settings, coreSettings) {
  var rSpd = {};

  rSpd.node = null;
  rSpd.id = 'speedSettings';
  rSpd.tabText = 'Speeds';

  rSpd._nodes = {};
  var nodes = rSpd._nodes;

  nodes.wpmInput = null;
  nodes.wpmSlider = null;
  //nodes.slowStartInput 		= null;
  //nodes.slowStartSlider 		= null;
  nodes.sentenceDelayInput = null;
  nodes.sentenceDelaySlider = null;
  nodes.puncDelayInput = null;
  nodes.puncDelaySlider = null;
  //nodes.shortWordDelayInput 	= null;
  //nodes.shortWordDelaySlider 	= null;
  nodes.longWordDelayInput = null;
  nodes.longWordDelaySlider = null;
  nodes.numericDelayInput = null;
  nodes.numericDelaySlider = null;

  rSpd._oneSlider = function(data) {
    /* ( {} ) -> Node (??)
		*
		* Turn the given data into one noUiSlider slider
		*/
    // To keep handles within the bar
    $$7(data.sliderNode).addClass('noUi-extended');

    var slider = noUiSlider$1.create(data.sliderNode, {
      range: { min: data.range.min, max: data.range.max },
      start: data.startVal,
      step: data.step,
      connect: 'lower',
      handles: 1,
      behaviour: 'extend-tap',
      // Not sure the below does anything
      serialization: {
        to: [data.inputNode],
        resolution: data.resolution
      }
    });

    data.sliderNode.noUiSlider.on('update', function(values, handle) {
      data.inputNode.value = values[handle];
      settings.set(data.operation, values[handle]);
    });

    data.inputNode.addEventListener('change', function() {
      data.sliderNode.noUiSlider.set(this.value);
      settings.set(data.operation, this.value);
    });

    return data.sliderNode
  }; // End rSpd._oneSlider()

  rSpd._makeSliders = function() {
    var slider = rSpd._oneSlider,
      nodes = rSpd._nodes,
      setts = settings._settings;

    slider({
      sliderNode: nodes.wpmSlider,
      range: { min: 25, max: 1000 },
      startVal: setts.wpm,
      step: 25,
      inputNode: nodes.wpmInput,
      resolution: 1,
      operation: 'wpm'
    });

    //slider({
    //sliderNode: nodes.slowStartSlider,
    //range: 		{ min: 0, max: 20 },
    //startVal: 	setts.slowStartDelay,
    //step: 		1,
    //inputNode: 	nodes.slowStartInput,
    //resolution:     1,
    //operation: 	'slowStartDelay'
    //});

    slider({
      sliderNode: nodes.sentenceDelaySlider,
      range: { min: 1, max: 5 },
      startVal: setts.sentenceDelay,
      step: 0.1,
      inputNode: nodes.sentenceDelayInput,
      resolution: 0.1,
      operation: 'sentenceDelay'
    });

    slider({
      sliderNode: nodes.puncDelaySlider,
      range: { min: 1, max: 1.5 },
      startVal: setts.otherPuncDelay,
      step: 0.1,
      inputNode: nodes.puncDelayInput,
      resolution: 0.1,
      operation: 'otherPuncDelay'
    });

    //slider({
    //sliderNode: nodes.shortWordDelaySlider,
    //range: 		{ min: 1, max: 5 },
    //startVal: 	setts.shortWordDelay,
    //step: 		0.1,
    //inputNode: 	nodes.shortWordDelayInput,
    //resolution:     0.1,
    //operation: 	'shortWordDelay'
    //});

    slider({
      sliderNode: nodes.longWordDelaySlider,
      range: { min: 1, max: 1.5 },
      startVal: setts.longWordDelay,
      step: 0.1,
      inputNode: nodes.longWordDelayInput,
      resolution: 0.1,
      operation: 'longWordDelay'
    });

    slider({
      sliderNode: nodes.numericDelaySlider,
      range: { min: 1, max: 1.5 },
      startVal: setts.numericDelay,
      step: 0.1,
      inputNode: nodes.numericDelayInput,
      resolution: 0.1,
      operation: 'numericDelay'
    });

    return rSpd
  }; // End rSpd._makeSliders()

  rSpd._assignSettingItems = function() {
    var nodes = rSpd._nodes,
      $menu = $$7(nodes.menu);

    nodes.wpmInput = $menu.find('#__rdly_wpm_input')[0];
    nodes.wpmSlider = $menu.find('#__rdly_wpm_slider')[0];
    //nodes.slowStartInput 		= $menu.find('#__rdly_slowstart_input')[0];
    //nodes.slowStartSlider 		= $menu.find('#__rdly_slowstart_slider')[0];
    nodes.sentenceDelayInput = $menu.find('#__rdly_sentencedelay_input')[0];
    nodes.sentenceDelaySlider = $menu.find('#__rdly_sentencedelay_slider')[0];
    nodes.puncDelayInput = $menu.find('#__rdly_puncdelay_input')[0];
    nodes.puncDelaySlider = $menu.find('#__rdly_puncdelay_slider')[0];
    //nodes.shortWordDelayInput 	= $menu.find('#__rdly_shortworddelay_input')[0];
    //nodes.shortWordDelaySlider 	= $menu.find('#__rdly_shortworddelay_slider')[0];
    nodes.longWordDelayInput = $menu.find('#__rdly_longworddelay_input')[0];
    nodes.longWordDelaySlider = $menu.find('#__rdly_longworddelay_slider')[0];
    nodes.numericDelayInput = $menu.find('#__rdly_numericdelay_input')[0];
    nodes.numericDelaySlider = $menu.find('#__rdly_numericdelay_slider')[0];

    return rSpd
  }; // End rSpd._assignSettingItems()

  rSpd._oneSetting = function(idName, label) {
    // Should the very specific classes be ids?
    return $$7(
      '<div id="__rdly_' +
        idName +
        '_setting" class="__rdly-setting">\
						<label class="__rdly-slider-label">' +
        label +
        '</label>\
						<div class="__rdly-slider-controls">\
							<input id="__rdly_' +
        idName +
        '_input" class="__rdly-slider-input" type="text"/>\
							<div id="__rdly_' +
        idName +
        '_slider" class="__rdly-slider"></div>\
						</div>\
					</div>'
    )
  }; // End rSpd._oneSetting()

  rSpd._addNodes = function(coreSettings) {
    var one = rSpd._oneSetting;

    // Maybe this should belong to something else - a settings manager
    var $menu = $$7('<div id="__rdly_speed_settings_menu"></div>');
    rSpd.node = $menu[0];

    coreSettings.addMenu(rSpd);

    rSpd._nodes.menu = $menu[0];

    one('wpm', 'Words Per Minute').appendTo($menu);
    //one( 'slowstart', 'Slow Start' ).appendTo($menu);
    one('sentencedelay', 'Sentence End Delay').appendTo($menu);
    one('puncdelay', 'Punctuation Delay').appendTo($menu);
    //one( 'shortworddelay', 'Short Word Delay' ).appendTo($menu);
    one('longworddelay', 'Long Word Delay').appendTo($menu);
    one('numericdelay', 'Special Pattern Delay').appendTo($menu);

    return rSpd
  }; // End rSpd._addNodes()

  rSpd._init = function(coreSettings) {
    rSpd._addNodes(coreSettings);
    rSpd._assignSettingItems();
    rSpd._makeSliders();

    // Events assigned with noUiSlider creation

    return rSpd
  };

  // =========== ADD NODE, ETC. =========== \\
  // Don't show at start, only when prompted
  rSpd._init(coreSettings);

  // To be called in a script
  return rSpd
}; // End SpeedSettings() -> {}

// To put on the window object, or export into a module
//   return SpeedSettings
// })

/* WordSettings.js
*
* UI elements for setting various word features, like
* max number of displayed characters.
*/

let $$8 = require('jquery');
let noUiSlider$2 = require('@knod/nouislider');

// ;(function(root, wordSetsFactory) {
//   // root is usually `window`
//   if (typeof define === 'function' && define.amd) {
//     // AMD. Register as an anonymous module.
//     define(['jquery', '@knod/nouislider'], function(jquery, nouislider) {
//       return (root.WordSettings = wordSetsFactory(jquery))
//     })
//   } else if (typeof module === 'object' && module.exports) {
//     // Node. Does not work with strict CommonJS, but only CommonJS-like
//     // environments that support module.exports, like Node.
//     module.exports = wordSetsFactory(
//       require('jquery'),
//       require('@knod/nouislider')
//     )
//   } else {
//     // Browser globals
//     root.WordSettings = wordSetsFactory(root.jQuery, root.noUiSlider) // not sure noUi is here
//   }
// })(this, function($, noUiSlider) {
//   'use strict'

var WordSettings = function(settings, coreSettings) {
  var wSets = {};

  wSets.node = null;
  wSets.tabText = 'Words';

  wSets._nodes = {};
  var nodes = wSets._nodes;

  nodes.maxCharsInput = null;
  nodes.maxCharsSlider = null;

  wSets._oneSlider = function(data) {
    /* ( {} ) -> ?
		*
		* Turn the given data into one noUiSlider slider
		*/
    // To keep handles within the bar
    $$8(data.sliderNode).addClass('noUi-extended');

    var slider = noUiSlider$2.create(data.sliderNode, {
      range: { min: data.range.min, max: data.range.max },
      start: data.startVal,
      step: data.step,
      connect: 'lower',
      handles: 1,
      behaviour: 'extend-tap',
      serialization: {
        to: [data.inputNode],
        resolution: data.resolution
      }
    });

    data.sliderNode.noUiSlider.on('update', function(values, handle) {
      data.inputNode.value = values[handle];
      settings.set(data.operation, values[handle]);
    });

    data.inputNode.addEventListener('change', function() {
      data.sliderNode.noUiSlider.set(this.value);
      settings.set(data.operation, this.value);
    });

    return data.sliderNode
  }; // End wSets._oneSlider()

  wSets._makeSliders = function() {
    var slider = wSets._oneSlider,
      nodes = wSets._nodes,
      setts = settings._settings;

    slider({
      sliderNode: nodes.maxCharsSlider,
      range: { min: 1, max: 25 },
      startVal: setts.maxNumCharacters,
      step: 1,
      inputNode: nodes.maxCharsInput,
      resolution: 1,
      operation: 'maxNumCharacters'
    });

    return wSets
  }; // End wSets._makeSliders()

  wSets._assignSettingItems = function() {
    var nodes = wSets._nodes,
      $menu = $$8(nodes.menu);

    nodes.maxCharsInput = $menu.find('#__rdly_maxchars_input')[0];
    nodes.maxCharsSlider = $menu.find('#__rdly_maxchars_slider')[0];

    return wSets
  }; // End wSets._assignSettingItems()

  wSets._oneSetting = function(idName, label) {
    // Should the very specific classes be ids?
    return $$8(
      '<div id="__rdly_' +
        idName +
        '_setting" class="__rdly-setting">\
						<label class="__rdly-slider-label">' +
        label +
        '</label>\
						<div class="__rdly-slider-controls">\
							<input id="__rdly_' +
        idName +
        '_input" class="__rdly-slider-input" type="text"/>\
							<div id="__rdly_' +
        idName +
        '_slider" class="__rdly-slider"></div>\
						</div>\
					</div>'
    )
  }; // End wSets._oneSetting()

  wSets._addNodes = function() {
    var one = wSets._oneSetting;

    // Maybe this should belong to something else - a settings manager
    var $menu = $$8('<div id="__rdly_word_settings_menu"></div>');
    wSets.node = $menu[0];

    wSets._nodes.menu = $menu[0];
    one('maxchars', 'Max Letters Shown').appendTo($menu);

    return wSets
  }; // End wSets._addNodes()

  wSets._init = function(coreSettings) {
    wSets._addNodes(coreSettings);
    // Have to add this to the iframe DOM /before/ setting up the
    // slider, otherwise wrong #document owns it
    coreSettings.addMenu(wSets);

    wSets._assignSettingItems();
    wSets._makeSliders();

    // Events assigned with noUiSlider creation

    return wSets
  };

  // =========== ADD NODE, ETC. =========== \\
  // Don't show at start, only when prompted
  wSets._init(coreSettings);

  // To be called in a script
  return wSets
}; // End WordSettings() -> {}

// To put on the window object, or export into a module
//   return WordSettings
// })

const $ = require('jquery');

//
// const Parser = require('./lib/parse/Parser.js')
// const ParserSetup = require('./lib/ParserSetup.js')
//
// const Settings = require('./lib/settings/Settings.js')
// const Storage = require('./lib/ReaderlyStorage.js')
// const WordNav = require('./lib/parse/WordNav.js')
// const WordSplitter = require('./lib/parse/WordSplitter.js')
// const Delayer = require('./lib/playback/StringTime. js')
// const Timer = require('./lib/playback/ReaderlyTimer.js')
// const Display = require('./lib/ReaderlyDisplay.js')
// const PlaybackUI = require('./lib/playback/PlaybackUI.js')
// const SettingsUI = require('./lib/settings/ReaderlySettings.js')
// const SpeedSetsUI = require('./lib/settings/SpeedSettings.js')
// const WordSetsUI = require('./lib/settings/WordSettings.js')

// import * as $ from 'jquery'
const $browser = chrome || browser;

let coreDisplay;
let delayer;
let fragmentor;
let lastSelected;
let lastTarget;
let parser;
let playback;
let selected;
let settingsUI;
let storage;
let timer;
let wordNav;

selected = [];

// document.body.style.border = '10px solid red'

init();
$browser.extension.onMessage.addListener(onMessage);


/**
 * Detect the type of code?
 * @method identifyCode
 *
 * @param documentNode
 *
 * @returns {boolean} Representing whether or not the node could be detected.
 */
function identifyCode (documentNode) {
  let statements;
  statements = [
    {
      test: () =>
        documentNode.tagName === 'PRE' || documentNode.tagName === 'CODE',

      unit: () => true
    },
    {
      test: () => documentNode.childNodes.length === 1,

      unit: () => identifyCode(documentNode.childNodes[0])
    },
    {
      test: () => true,

      unit: () => false
    }
  ];

  return statements.find(it => it.test()).unit()
}

/**
 * Get split methods for each childNode in documentNode.
 * @method splitCode
 *
 * @param {Node} documentNode
 */
function splitCode (documentNode) {
  let array;

  array = Array.from(documentNode.childNodes);

  return array.map(childNode => {
      let splitMethod;
      let textContent;

      textContent = childNode.textContent;

      if (textContent.trim().length !== 0) {
        splitMethod = (() => identifyCode(childNode) ? 'lines' : 'sentences')();
        return {
          splitMethod: splitMethod,
          text: textContent
        }
      }
    })
    .filter(it => it !== null)
}

/**
 * Listen for a timer event.
 * @method addEvents
 */
function addEvents () {
  $(timer).on('starting', playback.wait);
}

/**
 * Looks like the original author was using constructors in a silly way,
 * also set a timer and use addEvents.
 *
 * @method afterLoadSettings
 *
 * @param {object} oldSettings - The old settings I guess.
 */
function afterLoadSettings (oldSettings) {
  var setts 	= new Settings( storage, oldSettings );
  delayer 	= new StringTime( setts._settings );
  timer 		= new ReaderlyTimer( delayer );
  coreDisplay     = new ReaderlyDisplay( timer, undefined, setts );

  let textElem 	= coreDisplay.nodes.textElements;
  fragmentor 	= new WordSplitter( textElem, setts );

  playback 	= new PlaybackUI( timer, coreDisplay );
  settingsUI 	= new ReaderlySettings( coreDisplay );
  let speedSetsUI     = new SpeedSettings( setts, settingsUI );
  let wordSetsUI 	= new WordSettings( setts, settingsUI );

  addEvents();
}

/**
 * Generate a new initialized parser.
 * @method getParser
 *
 * @returns {Parser}
 */
function getParser () {
  let parserSetup;
  let parser;

  let cleanNode;
  let detectLanguage;
  let findArticle;
  let cleanText;
  let splitSentences;

  parserSetup = new ParserSetup();

  parserSetup.debug = false;

  cleanNode = parserSetup.cleanNode;
  detectLanguage = parserSetup.detectLanguage;
  findArticle = parserSetup.findArticle;
  cleanText = parserSetup.cleanText;
  splitSentences = parserSetup.splitSentences;

  parser = new Parser({
    cleanNode,
    detectLanguage,
    findArticle,
    cleanText,
    splitSentences
  });

  return parser
}

function init () {
  parser = getParser();
  parser.debug = false;
  wordNav = new WordNav();
  storage = new ReaderlyStorage();

  if (parser.debug) {
    storage.clear();
    console.debug('Cleared Storage');
  }

  storage.loadAll(afterLoadSettings);
}

/**
 * Some debugging stuff, process some stuff, parse some stuff, start a timer.
 * @method read
 *
 * @param {array|string} node - A quick peek at Parser.parse checks for array or string so i guess that's what they want.
 *
 * @returns {boolean} Will always be true, don't know why at the moment.
 */
function read (node) {
  let sentenceWords;

  sentenceWords = parser.parse(node);

  debug();

  wordNav.process(sentenceWords, fragmentor);
  timer.start(wordNav);

  return true

  /**
   * Help non-coder devs identify some bugs.
   * @method debug
   * @variation 1
   */
  function debug () {
    if (parser.debug) {
      console.log(
        "~~~~~parse debug~~~~~ If any of those tests failed, the problem isn't with Readerly, it's with one of the other libraries. That problem will have to be fixed later."
      );
    }
  }
}

/**
 * Open the core display and pause playback.
 * @method openReaderly
 */
function openReaderly () {
  coreDisplay.open();
  playback.wait();
}

function stripNodes (node) {
  let elements;

  elements = node.querySelectorAll(
    'svg, sup, script, style, video, head, header, title, div#cookie-policy, span.attribution, span.caption, div.trending-ticker, div.adblocker-message, q.quote__content, table.wikitable, div.rellink, div.thumbcaption, div.magnify, div.toc, div.thumb.tright, span.mw-editsection, p.media-title, div.cc_banner-wrapper, span.newsCaption, span.bullet, .ribbon__related__articles__module, .short-form-article__header, div.floatingad, div#ticker, div.breadcrumbs, div.left-menu, section.secondary-navigation, ul.exp, div.tip, .otherversionswrapper, .breadcrumbs.clear, .mb20, [itemprop=description], .cookie-notice, #sidebar-debugger-data, .c-related-list, .u-desktop-only, .c-nav-list__col, .c-nav-list__label, .c-nav-list__label, .art-pre-body-facebook__title, .art-pre-body-digital-sub, .read-more-links, .warning, .skinny-header, .publication-theme-button, .confirm, .video-headline, .timer-text, .vjs-control-text, .collection-creatorbox, .primary-nav-flyout__acc-close-flyout.vh, .secondary-nav-flyout__acc-close.vh,  .widget-wrap, .breakingNewsContainer, .content__dateline, .hatnote, .thumbcaption, .hiddenStructure, .hiddenStructure1, .infobox, #siteSub, #toc, #jump-to-nav, #siteSub, h1, h2, h3, h4, h5, h6, footer, figure, figcaption, aside, small, .n-skip-link, .o-cookie-message__description, span.message-title, a.visually-hidden, time, div.column--secondary, div#main-navigation-inside, span.wpneo-tooltip, noscript, div.tab-content, div.video-upsell-message, table.vertical-navbox, span.mbox-text-span, div.stackCommerceItemWrap, a.crumb, span.contrib-tagline, div.contributions__epic, div#contextlinks, p.figurecaption, date, tags, widget, div#bbccookies-prompt, a.title, a.syndication-btn, div.cat-list, div.reflist, div.newsletter, div.related-posts, p.h3title, span.greybar, div.video-wrapper, div#breadcrumb, div.breaking-news, span.nowrap, a.shiftnav-target, ul#menu-main-navigation, div.metabar-pad, a.twitter-follow-button, div.announcement_left, div.post-top, span.source, .article-meta-box, .fusion-megamenu-bullet, .udemy_code_details, .fullwidth-box, .tags-container, .mini-info-list, .ubermenu-target-title, .header-alert-banner, .prevnext, .summary, .Quick_links, .column-strip, .fmht, .ctag, .block-share, .post-footer, .player-with-placeholder__caption, .site-brand, .content-footer, .shareBar-follow-modal, .menu-info, .subTitle-follow-modal, #main-sections-nav-inner, .rich-link, #fb-messenger-modal, .meta__extras, .js-components-container, .meta__contact-header, .meta__twitter, .off-screen, .commerce-disclaimer, .social, .site-message, .skip, .overlay, .vjs-modal-dialog-description, .all-head-menu, #notices, #breadcrumbs, .pagenav-container, #announcementtabs-18-5, .announcementtext, .module-buttons, .userinfo, .widget-tabs-nav, .filter-options-list, .condense-text, .conversation-toolbar-wrapper, .main-title, .b-top-background__header-mainnav-subnav, #main-navbar-wrapper, #channel-subtabbar, #searchPopupContent, .content-nav, .ans_page_question_header, .EventHeader, .answer_user, .pre-btn, .nxt-btn, .topgooglead, .cc_message'
  );

  for (i = 0; i < elements.length; i++) {
    elements[i].parentElement.removeChild(elements[i]);
  }
}

function siteRule (var1, sitename, var2, element) {
  let html;
  let junkElements;
  let i;

  html = var2.innerHTML;

  if (html.includes(sitename)) {
    junkElements = var2.querySelectorAll(element);
    if (junkElements.length) {
      for (i = 0, l = junkElements.length; i < l; i++) {
        junkElements[i].parentNode.removeChild(junkElements[i]);
      }
    }
  }
}

function multisiteRule (var1, sitename, sitename2, var2, element) {
  let $page;
  let pagex;
  let i;
  let junkElements;

  $page = $('html').clone();
  pagex = $page[0];
  var3 = pagex.innerHTML;
  var1 = var2.innerHTML;

  if (var1.includes(sitename) && var3.includes(sitename2)) {
    junkElements = var2.querySelectorAll(element);
    if (junkElements.length) {
      for (i = 0, l = junkElements.length; i < l; i++) {
        junkElements[i].parentNode.removeChild(junkElements[i]);
      }
    }
  }
}

function readSelectedText () {
  selection = document.getSelection();
  docFragment = selection.getRangeAt(0).cloneContents();

  junkElements = docFragment.querySelectorAll(
    'h1, h2, h3, h4, h5, h6, #jump-to-nav, #siteSub, .infobox, [role=note], span.attribution, span.caption, div.adblocker-message, q.quote__content, table.wikitable, div.rellink, span.bullet, div.floatingad, span.mw-editsection, div.thumbcaption, div.magnify, div.toc'
  );
  if (junkElements.length) {
    for (i = 0, l = junkElements.length; i < l; i++) {
      junkElements[i].parentNode.removeChild(junkElements[i]);
    }
  }

  supElements = docFragment.querySelectorAll('sup');
  if (supElements.length) {
    for (i = 0, l = supElements.length; i < l; i++) {
      supElements[i].parentNode.removeChild(supElements[i]);
    }
  }

  scriptElements = docFragment.querySelectorAll('script');
  if (scriptElements.length) {
    for (i = 0, l = scriptElements.length; i < l; i++) {
      scriptElements[i].parentNode.removeChild(scriptElements[i]);
    }
  }

  dumm = document.createElement('div');
  dumm.appendChild(docFragment.cloneNode(true));

  dumm = dumm.innerHTML;

  if (!dumm.match(/<\/p>/g)) {
    dumm = '<p>' + dumm + '</p>';
  }

  regexp = /<\/p>/g;
  dumm = dumm.replace(regexp, function (match) {
    return match.replace(/<\/p>/g, ' </p>')
  });

  // console.log(dumm);

  regexp = /[\s]*(<br>)[\s]*/g;
  dumm = dumm.replace(regexp, function (match) {
    return match.replace(/[\s]*(<br>)[\s]*/g, ' ')
  });

  regexp = /[a-zά-ω][\s]*(<br>)[\s]*[A-ZΑ-ώ]/g;
  dumm = dumm.replace(regexp, function (match) {
    return match.replace(/[\s]*(<br>)[\s]*/g, ' ')
  });

  regexp = /[a-zά-ω][\s]*<\/div>[\s]*/g;
  dumm = dumm.replace(regexp, function (match) {
    return match.replace(/[\s]*<\/div>[\s]*/g, '. </div> ')
  });

  regexp = /<p[^>]*>[^"]*["][^"]+[.][\s]*(<\/p>)/g;
  dumm = dumm.replace(regexp, function (match) {
    return match.replace(/[.][\s]*<\/p>/g, '."</p>')
  });

  regexp = /<p[^>]*>[^"]*["][^"]+[?][\s]*(<\/p>)/g;
  dumm = dumm.replace(regexp, function (match) {
    return match.replace(/[?][\s]*<\/p>/g, '?"</p>')
  });

  regexp = /<p[^>]*>[“][^“]+[.][\s]*["](<\/p>)/g;
  dumm = dumm.replace(regexp, function (match) {
    return match.replace(/[.][\s]*["](<\/p>)/g, '.</p>')
  });

  dumm = dumm.replace(/[\s]+["]["][\s]+/g, ' "');

  // console.log(dumm);

  regexp = /[&](nbsp)[;]/g;
  dumm = dumm.replace(regexp, function (match) {
    return match.replace(/[&](nbsp)[;]/g, ' ')
  });

  dumm = dumm.replace(/[&](amp)[;]/g, '&');
  dumm = dumm.replace(/[&](shy|quot|lt|gt)[;]/g, '');

  regexp = /<\/p/g;
  dumm = dumm.replace(regexp, function (match) {
    return match + ' '
  });

  regexp = /[^.](<\/li>)/g;
  dumm = dumm.replace(regexp, function (match) {
    return match.replace(/(<\/li>)/g, '.</li>')
  });

  dumm = dumm.replace(/(\r\n|\n|\r)/gm, ' ');
  dumm = dumm.replace(/\s\s+/gm, ' ');

  dumm = dumm.replace(/<[^>]+>/g, '');
  dumm = dumm.replace(/<\/[^>]+>/g, '');

  cleaned = String(dumm);

  cleaned = cleaned.replace(/[—]/g, '-');

  cleaned = cleaned.replace(/[“]­/g, '"');
  cleaned = cleaned.replace(/[”]­/g, '"');

  // console.log(dumm);

  openReaderly();
  return cleaned ? read(cleaned) : false
}

function readArticle () {
  openReaderly();

  $clone = $('html').clone();
  articlex = $clone[0];
  stripNodes(articlex);
  siteRule(
    clonex,
    'nature.com',
    articlex,
    'div.text-orange.content.grade-c-show, p.contrast-text.text13.hide-overflow'
  );
  siteRule(clonex, 'sparknotes.com', articlex, 'div.containerUGC');
  siteRule(clonex, 'independent.co.uk', articlex, 'div.image');
  siteRule(clonex, 'wowwiki.wikia.com', articlex, 'dl');
  siteRule(clonex, 'wow.gamepedia.com', articlex, 'dl');
  clonex = articlex.innerHTML;
  clonex = clonex.replace(/<div class=["]hiddenStructure[^]+<\/div>/g, '');
  clonex = clonex.replace(
    /<a href=["]http:\/\/pages.email.bbc.com\/subscribe["] class=["]story-body__link["][^]+<\/a>/g,
    ''
  );
  clonex = clonex.replace(/<sup[^>]*>[^]+<\/sup>/g, '');
  clonex = clonex.replace(/<span[^>]*>|<\/span>/g, '');
  clonex = clonex.replace(/<beelinespan[^>]*>|<\/beelinespan>/g, '');
  clonex = clonex.replace(/<!--?[^]+?-->/g, '');
  clonex = clonex.replace(/<!--[^]+?-->/g, '');
  clonex = clonex.replace(/<!--[^]+-->/g, '');

  // console.log(clonex);

  regexp = /<\/p>/g;
  clonex = clonex.replace(regexp, function (match) {
    return match.replace(/<\/p>/g, ' </p>')
  });

  regexp = /[\s]*(<br>)[\s]*/g;
  clonex = clonex.replace(regexp, function (match) {
    return match.replace(/[\s]*(<br>)[\s]*/g, ' ')
  });

  regexp = /<p[^>]*>[^"]*["][^"]+[.][\s]*(<\/p>)/g;
  clonex = clonex.replace(regexp, function (match) {
    return match.replace(/[.][\s]*<\/p>/g, '."</p>')
  });

  regexp = /<p[^>]*>[^"]*["][^"]+[?][\s]*(<\/p>)/g;
  clonex = clonex.replace(regexp, function (match) {
    return match.replace(/[?][\s]*<\/p>/g, '?"</p>')
  });

  regexp = /<p[^>]*>[“][^“]+[.][\s]*["](<\/p>)/g;
  clonex = clonex.replace(regexp, function (match) {
    return match.replace(/[.][\s]*["](<\/p>)/g, '.</p>')
  });

  clonex = clonex.replace(/[\s]+["]["][\s]+/g, ' "');

  // console.log(clonex);

  regexp = /[\s]*(<\/p>)[\s]*(<p>)[\s]*/g;
  clonex = clonex.replace(regexp, function (match) {
    return match.replace(/(<\/p>)[\s]*(<p>)/g, '')
  });

  // console.log(clonex);

  regexp = /[^.](<\/li>)/g;
  clonex = clonex.replace(regexp, function (match) {
    return match.replace(/(<\/li>)/g, '.</li>')
  });

  regexp = /[\s]+[.](<\/li>)/g;
  clonex = clonex.replace(regexp, function (match) {
    return match.replace(/[\s]+/g, '')
  });

  regexp = /[.][\s]*[.][\s]*(<\/li>)/g;
  clonex = clonex.replace(regexp, function (match) {
    return match.replace(/[.][\s]*[.]/g, '.')
  });

  clonex = clonex.replace(/(\r\n|\n|\r)/gm, ' ');
  clonex = clonex.replace(/\s\s+/gm, ' ');

  clonex = clonex.replace(/[“]­/g, '"');
  clonex = clonex.replace(/[”]­/g, '"');

  clonex = clonex.replace(/<a[^>]*>|<\/a>/g, '');
  clonex = clonex.replace(/<i[^>]*>|<\/i>/g, '');
  clonex = clonex.replace(/<em[^>]*>|<\/em>/g, '');
  clonex = clonex.replace(/<hr>/g, '');

  console.log(clonex);
  articlex.innerHTML = clonex;
  // console.log(articlex);
  read(articlex);
}

function findTextNode (node) {
  while (node.textContent === '' && node.parentElement !== null) {
    node = node.parentElement;
  }

  return node
}

function multiSelect (event) {
  let target;
  let index;
  let contained;

  lastSelected = undefined;
  target = findTextNode(event.target);

  index = selected.indexOf(target);

  if (index !== -1) {
    target.classList.remove('__rdly-selected');
    selected.splice(index, 1);
    return
  }

  // don't do anything if the target is a sibling of an already selected node
  contained = selected.some(node => node.contains(target));
  if (contained) return

  // if the target is a parent of any already selected nodes, remove them
  selected = selected.filter(function (node) {
    let sibling;
    sibling = target.contains(node);
    if (sibling) node.classList.remove('__rdly-selected');

    return !sibling
  });

  target.classList.add('__rdly-selected');
  selected.push(target);
}

function finishMultiSelect () {
  text = Array.from(document.getElementsByTagName('*'))
    .filter(function (node) {
      return selected.indexOf(node) !== -1
    })
    .map(function (node) {
      clone = node.cloneNode(true);
      stripNodes(clone);

      return clone.textContent
    })
    .join(' ');

  openReaderly();
  read(text);
}

function selectionMoved (event) {
  if (event.ctrlKey || lastTarget === event.target) return

  lastSelected !== undefined &&
    lastSelected.classList !== undefined &&
    lastSelected.classList.remove('__rdly-selected');
  lastTarget = event.target;

  selected = findTextNode(event.target);
  lastSelected = selected;

  selected.classList.add('__rdly-selected');
}

function selectionKeyUp (event) {
  switch (event.keyCode) {
    case 17: // Ctrl
      if (selected.length > 0) {
        finishMultiSelect();
        cleanupSelection();
      }
      break

    case 27: // Esc
      cleanupSelection();
      break

    default:
      return
  }

  return false
}

function selectionKeyDown (event) {
  switch (event.keyCode) {
    case 17: // Ctrl
      if (lastTarget !== undefined) {
        lastTarget.classList.remove('__rdly-selected');
        lastTarget = undefined;
      }
      break

    default:
      return
  }

  return false
}

function selectionClicked (event) {
  let clone1;
  let wrapper;
  let storage;
  let regexp;
  let clone;
  let splitregex;
  let count;

  event.preventDefault();
  event.stopPropagation();

  if (event.ctrlKey) {
    multiSelect(event);
  } else if (lastSelected) {
    openReaderly();
    clone = lastSelected.cloneNode(true);
    stripNodes(clone);
    siteRule(clone1, 'nature.com', clone, 'div.text-orange.content.grade-c-show, p.contrast-text.text13.hide-overflow');
    multisiteRule(clone1, 'calibre', '<title>Bill Gates</title>', clone, '.boxtext');

    clone1 = clone.innerHTML;
    // console.log(clone1);
    wrapper = document.createElement('div');
    storage = clone1.replace(/<div class=["]hiddenStructure.+[\s]*.+[\s]*.+<\/div>/g, '');
    storage = storage.replace(/<div class=["]col action tooltip hide["][^>]*>[\s]*.+[\s]*.+<\/div>/g, '');
    storage = storage.replace(/<div class=["]exp action tooltip["][^>]*>[\s]*.+[\s]*.+<\/div>/g, '');
    storage = storage.replace(/<div class=["]breadcrumbs clear["][^>]*><ul>[\s]+<li>.+[\s]*<li>.+[\s]*<li>.+[\s]*<li>.+[\s]*<\/ul><\/div>/g, '');
    storage = storage.replace(/<div[^>]*>|<\/div>/g, '');
    storage = storage.replace(/<span[^>]*>|<\/span>/g, '');
    storage = storage.replace(/<beelinespan[^>]*>|<\/beelinespan>/g, '');
    storage = storage.replace(/<img[^>]*>.+<\/img>/g, '');
    storage = storage.replace(/<img[^>]*>/g, '');
    storage = storage.replace(/<\/img>/g, '');

    regexp = /<\/p>/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/<\/p>/g, ' <\/p>')
    });

    regexp = /[\s]+([a-zA-Z]|[ά-ωΑ-ώ]){1,20}[\s]+[!]/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/[\s]+[!]/g, '!')
    });

    regexp = /(if)[\s]+[(]/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/[\s]/g, '')
    });

    storage = storage.replace(/<!--[\s\S]*?-->/gm, '');

    regexp = /^[\s]+[{][\s]+/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/[\s]+[{]/g, '}')
    });

    regexp = /[\s]+[}][\s]+/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/[\s]+[}]/g, '}')
    });

    regexp = /[}][\s]+/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/[}][\s]+/g, '')
    });

    regexp = /[\s]+[(][\s]+/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/[(][\s]+/g, '(')
    });

    regexp = /(&nbsp;)+[)][,][\s]+/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/(&nbsp;)+[)][,]/g, '),')
    });

    regexp = /(&nbsp;)+[)][,][\s]+/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/(&nbsp;)+[)][,]/g, '),')
    });

    regexp = /<\/code>[\s]*[0-9]+[\s]*<\/pre>/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/[\s]*[0-9]+[\s]*/g, '')
    });

    regexp = /[}][\s]{2,}([a-zA-Z]|[ά-ωΑ-ώ])/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/[\s]{2,}/g, ' ')
    });

    for (count = 0; count < 10; count++) {
      splitregex = /(.{15,33})([\s]|[;]|[{]|[)])/gm;
      storage = storage.replace(splitregex, '$1\n');
    }

    // console.log(storage);

    regexp = /<p[^>]*>[^"]*["][^"]+[.][\s]*(<\/p>)/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/[.][\s]*<\/p>/g, '."<\/p>')
    });

    regexp = /<p[^>]*>[^"]*["][^"]+[?][\s]*(<\/p>)/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/[?][\s]*<\/p>/g, '?"<\/p>')
    });

    regexp = /<p[^>]*>[“][^“]+[.][\s]*["](<\/p>)/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/[.][\s]*["](<\/p>)/g, '.<\/p>')
    });

    storage = storage.replace(/[\s]+["]["][\s]+/g, ' "');

    regexp = /[^.](<\/li>)/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/(<\/li>)/g, '.<\/li>')
    });

    regexp = /[\s]+[.](<\/li>)/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    });

    regexp = /[.][\s]*[.][\s]*(<\/li>)/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/[.][\s]*[.]/g, '.')
    });

    // console.log(storage);

    if (!storage.match(/<pre[^>]*>/g)) {
      storage = storage.replace(/<\/pre>/g, '');
    }

    // console.log(storage);

    wrapper.innerHTML = storage;

    storage = wrapper.innerHTML;

    regexp = /[\u2014-\u2015\u2E3A\u2E3B]/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/[-\u2014-\u2015\u2E3A\u2E3B]/g, ' ')
    });

    // remove regular dashes surrounded by space
    regexp = /[\s]+[-\u2010-\u2011\uFE58\uFE63\uFF0D][\s]+/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/[-\u2010-\u2011\uFE58\uFE63\uFF0D]/g, ' ')
    });

    storage = storage.replace(/(?:[a-zA-Z]|[ά-ωΑ-ώ])[\s]+[.](?:^[a-zA-Z]|[ά-ωΑ-ώ])/g, '.');

    regexp = /…/g;
    storage = storage.replace(regexp, function (match) {
      return match + ' '
    });

    regexp = /[\s]+[.][\s]+/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/[\s]+[.]/g, '.')
    });

    storage = storage.replace(/<a[^>]*>|<\/a>/g, '');
    storage = storage.replace(/<b[^>]*>|<\/b>/g, '');
    storage = storage.replace(/<br>/g, ' ');

    storage = storage.replace(/  +/g, ' ');

    storage = storage.replace(/[.][”]­/g, '."');

    storage = storage.replace(/[“]­/g, '"');
    storage = storage.replace(/[”]­/g, '"');

    console.log(storage);

    wrapper.innerHTML = storage;

    // console.log(wrapper);

    read(splitCode(wrapper));

    cleanupSelection();
  }

  return false
}

function getSelection () {// reset keyboard focus
  document.activeElement.blur();

  document.addEventListener('mousemove', selectionMoved);
  document.addEventListener('click', selectionClicked);
  document.addEventListener('keyup', selectionKeyUp);
  document.addEventListener('keydown', selectionKeyDown);
}

function halveSpeed () {
  let checkbox;

  checkbox = coreDisplay.nodes.doc.getElementById('__rdly_halvespeed_input');
  checkbox.checked = !checkbox.checked;
  checkbox.dispatchEvent(new Event('change'));
}

function cleanupSelection () {
  let element;
  let i;

  document.removeEventListener('mousemove', selectionMoved);
  document.removeEventListener('click', selectionClicked);
  document.removeEventListener('keyup', selectionKeyUp);
  document.removeEventListener('keydown', selectionKeyDown);

  if (lastSelected) {
    lastSelected.classList.remove('__rdly-selected');
  }

  for (i = 0; i < selected.length; i++) {
    element = selected[i];
    element.classList.remove('__rdly-selected');
  }

  selected = [];
  lastSelected = undefined;
  lastTarget = undefined;
}

function onMessage (message, sender, sendResponse) {
  isReadSelectedText(message.functiontoInvoke);
  isReadFullPage(message.functiontoInvoke);
  isGetSelection(message.functiontoInvoke);
  isHalveSpeed(message.functiontoInvoke);

  function isReadSelectedText (it) {
    if (it === 'readSelectedText') readSelectedText();
  }

  function isReadFullPage (it) {
    if (it === 'readFullPage') readArticle();
  }

  function isGetSelection (it) {
    if (it === 'getSelection') getSelection();
  }

  function isHalveSpeed (it) {
    if (it === 'halveSpeed') halveSpeed();
  }
}
//# sourceMappingURL=main.stage1.js.map
