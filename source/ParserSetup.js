/* ParserSetup.js
*
* Sets up options/functions for parser
*/

let $ = require('jquery')

let franc = require('franc')
let langCodes = require('./lib/parse/iso-639.json')
let unfluff = require('@knod/unfluff')
let sbd = require('@knod/sbd')

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
  var rSup = {}

  rSup.debug = false

  rSup.cleanNode = function (node) {
    /* ( DOM Node ) -> same DOM Node
    	*
    	* Removes unwanted elements from the node and returns it.
        * TODO: Add 'head' (not 'iframe', though)
	    */
    var $node = $(node),
      // 'sup' has been declared distracting
      // 'script' and 'style' have English, skewing language detection results
      toRemove = ['sup', 'script', 'style', 'head']

    for (let tagi = 0; tagi < toRemove.length; tagi++) {
      let tag = toRemove[tagi]
      $node.find(tag).remove()
    }

    return $node[0]
  }

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
    )
    if (lang === 'und') {
      lang = 'eng'
    }

    var iso6391Lang = langCodes[lang].iso6391

    if (rSup.debug) {
      // Help non-coder devs identify some bugs
      console.log(
        '~~~parse debug~~~ language detected:',
        lang,
        '->',
        iso6391Lang
      )
    }

    return iso6391Lang
  } // End rSup.detectLanguage()

  rSup.findArticle = function (node, lang) {
    /* ( DOM Node, Str ) -> Str
    	*
    	* Uses the language `lang` and a DOM Node to return
    	* the best guess at the main text of the article
	    */
    var html = $(node).html(),
      cmds = unfluff.lazy(html, lang),
      text = cmds.text()
    text = text.replace(/(\r\n|\n|\r)/gm, ' ')
    text = text.replace(/\s\s+/g, ' ')

    // Last ditch effort to get something if unfluff doesn't
    // get anything
    if (!text) {
      text = $(node).text()
    }

    if (rSup.debug) {
      // Help non-coder devs identify some bugs
      console.log('~~~parse debug~~~ article text identified (a string):', text)
    }

    return text
  } // End rSup.findArticle()

  rSup.cleanText = function (text) {
    /* (Str) -> Str
    	*
    	* Does whatever further text filtering, cleaning, and parsing needs
    	* to be done. Default does nothing
    	*/
    var cleaned = text

    var regexp = /[“]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[“]/g, '"')
    })

    var regexp = /[”]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[”]/g, '"')
    })

    var regexp = /['][\s]+["]+[\s]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/['][\s]+/g, '\'') + ' '
    })

    var cleaned = cleaned.replace(/[\s]+[*]+(?=[A-Z])/g, ' ')
    var cleaned = cleaned.replace(/[\s]+[*]+[\s]+(?=[A-Z])/g, ' ')

    var cleaned = cleaned.replace(/[.](?=[A-Z])/g, '. ')
    var cleaned = cleaned.replace(/[\s]+[.](?=[A-Z])/g, '. ')
    var cleaned = cleaned.replace(/[\s]+[.](?=[\s])+(?![A-Z])/g, '. ')
    var cleaned = cleaned.replace(/[.](?=[A-Z])/g, '. ')
    var cleaned = cleaned.replace(/[.][\s+]+(?=[A-Z])/g, '. ')
    var cleaned = cleaned.replace(/[\s]+[.](?![\s])+(?=[.])/g, '.')
    var cleaned = cleaned.replace(/[\s]+[.](?![\s])+(?=[a-z]|[A-Z])/g, '.')

    var cleaned = cleaned.replace(/[:](?=[A-Z])/g, ': ')
    var cleaned = cleaned.replace(/[\s]+[:](?=[A-Z])/g, ': ')
    var cleaned = cleaned.replace(/[\s]+[:](?=[\s])+(?![A-Z])/g, ': ')
    var cleaned = cleaned.replace(/(?![a-z])[:](?=[A-Z])/g, ': ')
    var cleaned = cleaned.replace(/(?![a-z])[:][\s+]+(?=[A-Z])/g, ': ')
    var cleaned = cleaned.replace(/[\s]+[:](?![\s])+(?=[.])/g, ':')
    var cleaned = cleaned.replace(/[\s]+[:](?![\s])+(?=[a-z]|[A-Z])/g, ':')

    var cleaned = cleaned.replace(/[\s]+[?](?=[A-Z])/g, '? ')
    var cleaned = cleaned.replace(/[\s]+[?](?=[\s])(?=[A-Z])/g, '? ')
    var cleaned = cleaned.replace(/[?](?=[A-Z])/g, '? ')
    var cleaned = cleaned.replace(/[?][\s]+(?=[A-Z])/g, '? ')
    var cleaned = cleaned.replace(/[\s]+[?](?=[\s])+(?=[.])/g, '?')
    var cleaned = cleaned.replace(/[\s]+[?](?![\s])+(?=[a-z]|[A-Z])/g, '?')
    var cleaned = cleaned.replace(/[.][\s]+[.]/g, '.. ')

    var regexp = /…/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/…/g, '...')
    })

    var cleaned = cleaned.replace(/[\s]+[.][\s]+/g, '.')

    var regexp = /([.]|[”])[\s]+[0-9]{1}[.][\s]+[A-Z]{1}/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.][\s]+(?=[A-Z])/g, ' ')
    })

    var regexp = /(Sir|St|Mr|Ms|Mrs|Jr|Sr|Sgt)[.]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.]/g, ' ')
    })

    var regexp = /(UK|USA|US)[.][A-Z]{1}/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.]/g, '. ')
    })

    var regexp = /[α-ωa-z][.][A-Z]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.]/g, '. ')
    })

    var regexp = /[)][.][A-Z]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.]/g, '. ')
    })

    var regexp = /['][.][A-Z]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.]/g, '. ')
    })

    var regexp = /["][.][A-Z]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.]/g, '. ')
    })

    var regexp = /[”][.][A-Z]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.]/g, '. ')
    })

    var regexp = /[\s]+[?][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[?]/g, '?')
    })

    var regexp = /[,][.][A-Z]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.]/g, '. ')
    })

    var cleaned = cleaned.replace(/[—]/g, ' ')

    var cleaned = cleaned.replace(/[\s]+[–][\s]+/g, ' ')

    var cleaned = cleaned.replace(/[\s]+[-][\s]+/g, ' ')

    var cleaned = cleaned.replace(/[\s]+[--][\s]+/g, ' ')

    var regexp = /([a-z]|[A-Z])+[)]([a-z]|[A-Z])/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[)]/g, ') ')
    })

    var cleaned = cleaned.replace(/…/g, '… ')

    var regexp = /([a-z]|[A-Z]|[ά-ωΑ-ώ])[.][(]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[(]/g, ' (')
    })

    var regexp = /([a-z]|[A-Z]|[ά-ωΑ-ώ])[.][0-9]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.]/g, '. ')
    })

    var regexp = /[\s]+[.]{3}/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]/g, '')
    })

    var regexp = /([a-z]|[ά-ω])[?][^'"]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[?]/g, '? ')
    })

    var regexp = /["][\s]+[)]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]/g, '')
    })

    var regexp = /[.][\s]+['][^A-ZΑ-ώ]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[']/g, '\' ')
    })

    var regexp = /[\s]+["][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/["][\s]+/g, '"')
    })

    var regexp = /[’][\s]+[.][”]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[.]+/g, '.')
    })

    var regexp = /[”][\s]+[?]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    })

    var regexp = /[\s]+["][)][,]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    })

    var regexp = /[?][\s]+[”]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    })

    var regexp = /[.][\s]+[’](?=[\s]+.+[’])/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[’]/g, ' ’')
    })

    var regexp = /[.][\s]+['](?=[\s]+.+['])/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[']/g, ' \'')
    })

    var regexp = /”-/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/”-/g, '” -')
    })

    var regexp = /[\s]+(!”)/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    })

    var regexp = /[!][’]([a-zA-Z]|[ά-ωΑ-ώ])/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[’]+/g, '’ ')
    })

    var regexp = /[,][’]([a-zA-Z]|[ά-ωΑ-ώ]){1,20}/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[’]+/g, '’ ')
    })

    var regexp = /[\s]+["]["]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+["]/g, '" ')
    })

    var regexp = /[’][\s]+[.]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]/g, '')
    })

    var regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[.][’]([a-zA-Z]|[ά-ωΑ-ώ])/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[’]/g, '’ ')
    })

    var regexp = /[\s]+[,][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[,]/g, ',')
    })

    var regexp = /[\s]+[)][.][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[)][.]/g, ').')
    })

    var regexp = /[.][’]([a-zA-Z]|[ά-ωΑ-ώ])/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.][’]/g, '.’ ')
    })

    var regexp = /[\s]+([a-z]|[ά-ω])[,]([a-z]|[ά-ω])[\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[,]/g, ', ')
    })

    var regexp = /[?][”][’]([a-zA-Z]|[ά-ωΑ-ώ])/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[’]/g, '’ ')
    })

    var regexp = /[\s]+["][)][.]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    })

    var regexp = /[\s]+["][.][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+["][.]/g, '".')
    })

    var regexp = /[\s]+[’][”][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[’][”]/g, '’”')
    })

    var regexp = /[\s]+[:][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[:]/g, ':')
    })

    var regexp = /[\s]+[;][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[;]/g, ';')
    })

    var regexp = /[\s]+[)][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[)]/g, ')')
    })

    var regexp = /[,][”][’]([a-zA-Z]|[ά-ωΑ-ώ])/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[’]/g, '’ ')
    })

    var regexp = /[U][\s][K]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]/g, '')
    })

    var regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[’][\s]+[sltdmve]{1,2}[\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[’][\s]+/g, '’')
    })

    var regexp = /([.]|[?]|[!])+[\s]+[’]([a-zA-Z]|[ά-ωΑ-ώ])/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[’]/g, '’ ')
    })

    var regexp = /[’][‘]([a-zA-Z]|[ά-ωΑ-ώ])/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[‘]/g, ' ‘')
    })

    var regexp = /[\s]+[’][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[’]/g, '’')
    })

    var regexp = /[\s]+[!][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[!]/g, '!')
    })

    var regexp = /[\s]+[?][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[?]/g, '?')
    })

    var regexp = /[“]([a-zA-Z]|[ά-ωΑ-ώ]).+[\s]+[“]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[“]/g, '“')
    })

    var regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[,][“]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[,]/g, ', ')
    })

    var regexp = /[?][\s]+[’][”][’]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[?][\s]+[’][”][’]/g, '?’”’ ')
    })

    var regexp = /[.][“]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.]/g, '. ')
    })

    var regexp = /[?][”]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[”]/g, '” ')
    })

    var regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[“]([a-zA-Z]|[ά-ωΑ-ώ])/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[“]/g, ' “')
    })

    var regexp = /[[]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[[]/g, '(')
    })

    var regexp = /]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/]/g, ')')
    })

    var regexp = /[\s]+[)][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[)]/g, ')')
    })

    var regexp = /[:][\s]+["][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[:][\s]+["][\s]+/g, ': "')
    })

    var regexp = /[a-z][\s]+["][.][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+["][.]/g, '".')
    })

    var regexp = /[:]["][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[:]["][\s]+/g, ': "')
    })

    var regexp = /[.][”][’]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[’]/g, '’ ')
    })

    var regexp = /[:][“]([A-Z]|[Α-ώ])/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[:]/g, ': ')
    })

    var regexp = /[\s]+[’][,]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[’]/g, '’')
    })

    var regexp = /[!][”][’]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[’]/g, '’ ')
    })

    var regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[’](so|of|or|to|on|at|it)/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[’]/g, '’ ')
    })

    var regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[.][’][(]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[’]/g, '’ ')
    })

    var regexp = /([£]|[$]|[€])[\s]+[0-9]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    })

    var regexp = /[£][\s]+[0-9]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    })

    var regexp = /[\s]+[‘][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[‘][\s]+/g, '‘')
    })

    var regexp = /[\s]+[)][,][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[)][,]/g, '),')
    })

    var regexp = /[0-9][\s]+[m][)][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[m]/g, 'm')
    })

    var regexp = /[’][\s]+[,][”][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[’][\s]+/g, '’')
    })

    var regexp = /[)][.]{3}/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[)]/g, ') ')
    })

    var regexp = /(We|They|we|they)([']|[’])[\s]+(re)/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    })

    var regexp = /([']|[’])[\s]+[?]["][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[?]["]/g, '?"')
    })

    var regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[.][\s]+(?:([a-zA-Z]|[ά-ωΑ-ώ])[.])/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.][\s]+/g, '.')
    })

    var regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[.][\s]+(?:([a-zA-Z]|[ά-ωΑ-ώ])[.])/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.][\s]+/g, '.')
    })

    var regexp = /(?:([a-zA-Z]|[ά-ωΑ-ώ])[.])([a-zA-Z]|[ά-ωΑ-ώ])[.][\s]+(?:([a-zA-Z]|[ά-ωΑ-ώ])[.])/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.][\s]+/g, '.')
    })

    var regexp = /[a][,][\s]+[k][,][\s]+[a]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    })

    var regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[.]{2,3}[\s]+(?:[.]{1})/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    })

    var regexp = /[:][“]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[:]/g, ': ')
    })

    var regexp = /([”]|[,])[“]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[“]/g, ' “')
    })

    var regexp = /[\s]+[“][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[“][\s]+/g, '“')
    })

    var regexp = /[0-9][’][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    })

    var regexp = /[.][\s]+[”]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    })

    var regexp = /[”]([A-Z]|[Α-ώ])/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[”]/g, '” ')
    })

    var regexp = /[0-9][\s]+(GB|MB|KB|Gb|Mb|Kb|gb|mb|kb)/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    })

    var regexp = /[\s]+["][,][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+["]/g, '"')
    })

    var regexp = /[!][“]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[!]/g, '! ')
    })

    var regexp = /[\s]+[.][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[.]/g, '.')
    })

    var regexp = /(you)[’][\s]+(re)/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[’][\s]+/g, '’')
    })

    var regexp = /[.]{3}[^.”'"]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.]{3}/g, '... ')
    })

    var regexp = /[\s]+[”][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[”]/g, '”')
    })

    var regexp = /[\s]+[”]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    })

    var regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[(]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[(]/g, ' (')
    })

    var regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[,]([a-zA-Z]|[ά-ωΑ-ώ])/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[,]/g, ', ')
    })

    var regexp = /[.][\s]+[?]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.][\s]+/g, '.')
    })

    var regexp = /[?][“]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[?]/g, '? ')
    })

    var regexp = /[\s]+[?]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[?]/g, '?')
    })

    var regexp = /[\s]+[-]([a-zA-Z]|[ά-ωΑ-ώ])[\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return ' (' + match.replace(/[\s]+/g, '') + ') '
    })

    var regexp = /[“][‘][.]{3}[\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    })

    var regexp = /[:]([a-zA-Z]|[ά-ωΑ-ώ])/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[:]/g, ': ')
    })

    var regexp = /[.]([a-zA-Z]|[ά-ωΑ-ώ])/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.]/g, '. ')
    })

    var regexp = /[\s]+[.][”]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    })

    var regexp = /[']([a-zA-Z]|[ά-ωΑ-ώ])[']/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match + ' '
    })

    var regexp = /(["])(?=(\\?))\2.*?\1/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return ' ' + match.replace(/["]/g, '"') + ' '
    })

    var regexp = /([”])(?=(\\?))\2.*?\1/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return ' ' + match.replace(/[”]/g, '"') + ' '
    })

    var regexp = /[\s]+["][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/["][\s]+/g, '"')
    })

    var regexp = /["][\s]+[.]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    })

    var regexp = /[^';!?.,a-zA-Zά-ωΑ-ώ ]["][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/["][\s]+/g, '"')
    })

    var regexp = /[\s]+[,][^.,a-zA-Zά-ωΑ-ώ]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[,]/g, ',')
    })

    var regexp = /[a-zA-Zά-ωΑ-ώ]{1}[.][\s]+[a-zA-Zά-ωΑ-ώ]{1}[.]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.][\s]+/g, '.')
    })

    var regexp = /[\s]+[(][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[(][\s]+/g, '(')
    })

    var regexp = /[\s]+[\/][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\/][\s]+/g, '/')
    })

    var regexp = /[\s]+([+]|[-]|[*]|[=])[\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    })

    var regexp = /[\s]+[)][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[)]/g, ')')
    })

    var regexp = /[^ ][“]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[“]/g, ' “')
    })

    var regexp = /[\s]+[(][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[(][\s]+/g, '(')
    })

    var regexp = /[(][\s]+[^]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[(][\s]+/g, '(')
    })

    var regexp = /(No)[.][\s]+[0-9]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    })

    var regexp = /[\s]+['][s][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[']/g, '\'')
    })

    var regexp = /[\s]+[)][,][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[)][,]/g, '),')
    })

    var regexp = /[\s]+[)][.][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[)][.]/g, '),')
    })

    var regexp = /[\s]+[’][s][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[’]/g, '’')
    })

    var regexp = /[\s]+[:][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[:]/g, ':')
    })

    var regexp = /[s][\s]+['][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[']/g, '\'')
    })

    var regexp = /[^a-zά-ω](?:[\s]+)[0-9][\s]+[A-ZΑ-ώ]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '. ')
    })

    var regexp = /[,][\s]*["](he|she|they|we|I)[\s]+(stated|said|told|says)[.]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[,][\s]*["]/g, '," ')
    })

    var regexp = /[\s]+[-]{2}[\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[-]{2}/g, ',')
    })

    var regexp = /[0-9][\s]+(GHz|MHz|Khz)/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    })

    var regexp = /[\s]+(will)[.](i)[.][\s]+(am)/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.][\s]+/g, '.')
    })

    var regexp = /[\s]+['][\s]+[s][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+['][\s]+/g, '\'')
    })

    var regexp = /[\s]+[.]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[.]/g, '.')
    })

    var regexp = /[\s]+[^]{1,10}["][(]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/["][(]/g, '" (')
    })

    var regexp = /[^ ][*]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[*]/g, ' *')
    })

    var regexp = /[^ ][)]["][^ ]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/["]/g, '" ')
    })

    var regexp = /[\s]+[,][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[,]/g, ',')
    })

    var regexp = /[\s]+[;][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[;]/g, ';')
    })

    var regexp = /[\s]+[ό][,][\s]+(τι)[\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[,][\s]+/g, ',')
    })

    var regexp = /[\s]+["][\s]+[^"]+[,]["]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/["][\s]+/g, '"')
    })

    var regexp = /[\s]+["]["][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+["]["][\s]+/g, '" "')
    })

    var regexp = /[,][\s]+["](he|she|they)/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[,][\s]+["]/g, '," ')
    })

    var regexp = /[^a-zA-Zά-ωΑ-ώ](I)['][\s]+(m)[\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/['][\s]+/g, '\'')
    })

    var regexp = /[U][.][S][.][^A-ZΑ-ώ]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[U][.][S][.]/g, 'U.S. ')
    })

    var regexp = /[\s]+[a-zA-Zά-ωΑ-ώ][\s]+[*][\s]+[a-zA-Zά-ωΑ-ώ][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[*][\s]+/g, '*')
    })

    var regexp = /[^0-9][\s]+[*][\s]+[^0-9]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[*][\s]+/g, ' ')
    })

    var regexp = /[’][\s]+[s][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[s]/g, 's')
    })

    var regexp = /[\s]+[.][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[.]/g, '.')
    })

    var regexp = /[\s]+[(][;][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[(][;][\s]+/g, '(;')
    })

    var regexp = /[\s]+[,][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[,]/g, ',')
    })

    var regexp = /[\s]+[)][)][.][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[)][)][.]/g, ')).')
    })

    var regexp = /[\s]+[^ ]+["][^,.)]{1,10}[\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/["]/g, '" ')
    })

    var regexp = /[^ ]["]["][^ ]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/["]["]/g, '" "')
    })

    var regexp = //g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(//g, ' ')
    })

    var regexp = /[\s]+["][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+["][\s]+/g, '"')
    })

    var regexp = /(["])(?=(\\?))\2.*?\1/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return ' ' + match + ' '
    })

    var regexp = /[a-zA-Zά-ωΑ-ώ]+[.][\s]+(co)[.][\s]+(in|uk)/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.][\s]+/g, '.')
    })

    var regexp = /(Ph)[.](D)[.]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.]/g, '')
    })

    var regexp = /(PhD)[\s]+[s][,]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    })

    var regexp = /[\s]+[,][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[,]/g, ',')
    })

    var regexp = /[\s]+[.][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[.]/g, '.')
    })

    var regexp = /[\s]+["][.][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+["][.]/g, '".')
    })

    var regexp = /[\s]+[(][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[(][\s]+/g, '(')
    })

    var regexp = /[\s]+[)]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[)]/g, ')')
    })

    var regexp = /[\s]+[)][,][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[)][,]/g, '),')
    })

    var regexp = /[\s]+[:][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[:]/g, ':')
    })

    var regexp = /[\s]+[;][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[;]/g, ';')
    })

    var regexp = /[.][\s]+["]["][\s]+[A-ZΑ-ώ]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+["]["][\s]+/g, '" "')
    })

    var regexp = /[,][\s]*["][^]{1,15}(stated|said|told|added)[.]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[,][\s]*["]/g, '," ')
    })

    var regexp = /[:]["][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[:]["][\s]+/g, ': "')
    })

    var regexp = /(but)["][\s]+[^]+[.]["][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/(but)["][\s]+/g, 'but "')
    })

    var regexp = /[a-zά-ω][.][A-ZΑ-ώ]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.]/g, '. ')
    })

    var regexp = /[.][\s]+[’]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.][\s]+[’]/g, '.’')
    })

    var regexp = /[a-zά-ωA-ZΑ-ώ][(]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[(]/g, ' (')
    })

    var regexp = /[:][\s]+[a-zά-ωA-ZΑ-ώ]["][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[:][\s]+/g, ':')
    })

    var regexp = /[!][a-zά-ωA-ZΑ-ώ]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[!]/g, '! ')
    })

    var regexp = /[•]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[•]/g, '')
    })

    var regexp = /[\s]+[.][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[.]/g, '.')
    })

    var regexp = /[*][^ ]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[*]/g, '')
    })

    var regexp = /(R'n')[\s]+[B][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[B]/g, 'B')
    })

    var regexp = /(κ.)[\s]+(ά.)[\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+(ά.)/g, 'ά.')
    })

    var regexp = /(κ.)[\s]+(α.)[\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+(α.)/g, 'α.')
    })

    var regexp = /[A-ZΑ-ώ][.][\s]+[A-ZΑ-ώ][.]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.][\s]+/g, '.')
    })

    var regexp = /[\s]+[,]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[,]/g, ',')
    })

    var regexp = /[.][\s]+(epub|pdf|zip|rar|tar)[\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.]/g, ' ')
    })

    var regexp = /[\s]+[&][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[&]/g, 'and')
    })

    var regexp = /[!]['][s]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[!]/g, '')
    })

    var regexp = /[\s]+[(]["][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[(]["][\s]+/g, '("')
    })

    var regexp = /[\s]+[’]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[’]/g, '’')
    })

    var regexp = /[\s]+[”]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[”]/g, '”')
    })

    var regexp = /[\s]+["]["][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+["]["][\s]+/g, '" "')
    })

    var regexp = /[\s]+["][,][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+["][,]/g, '",')
    })

    var regexp = /[0-9][.][\s]+[a-zά-ω]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '')
    })

    var regexp = /[\s]+[?][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[?]/g, '?')
    })

    var regexp = /[\s]+[)]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]+[)]/g, ')')
    })

    // remove big dashes
    var regexp = /[\u2014-\u2015\u2E3A\u2E3B]/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[-\u2014-\u2015\u2E3A\u2E3B]/g, ' ')
    })

    // remove regular dashes surrounded by space
    var regexp = /[\s]+[-\u2010-\u2011\uFE58\uFE63\uFF0D][\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[-\u2010-\u2011\uFE58\uFE63\uFF0D]/g, ' ')
    })

    var regexp = /[\s]+[a-zά-ω][,][a-zά-ω]{2}[\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[,]/g, '')
    })

    var regexp = /[\s]{2,}/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[\s]{2,}/g, ' ')
    })

    var regexp = /[.][\s]+(epub|pdf|zip|rar|tar|NET)/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/.[\s]/g, ' •')
    })

    var regexp = /[^ ]+[.][\s]+(com|net|co.uk|co.in|com.cy|gr|tk|info|me)[\s]+/g
    var cleaned = cleaned.replace(regexp, function (match) {
      return match.replace(/[.][\s]+/g, '.')
    })

    // Add your code here
    if (rSup.debug) {
      // Help non-coder devs identify some bugs
      console.log('~~~parse debug~~~ plain text cleaned (a string):', cleaned)
    }

    return cleaned
  } // End rSup.cleanText();  // End rSup.cleanText()

  rSup.splitSentences = function (text) {
    /* ( Str ) -> [[Str]
    	*
    	* Returns a list of sentences, which are each a list of words (strings).
        * Best results with English.
	    */
    var sentences = sbd.sentences(text, { parse_type: 'words' })

    if (rSup.debug) {
      // Help non-coder devs identify some bugs
      console.log(
        '~~~parse debug~~~ sentences (an array of arrays of strings):',
        sentences
      )
    }

    return sentences
  }

  return rSup
} // End ParserSetup() -> {}

// module.exports = ParserSetup
export default ParserSetup
