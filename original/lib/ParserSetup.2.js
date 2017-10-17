var $
var franc
var langCodes
var unfluff
var sbd

$ = require('jquery')
franc = require('franc')
langCodes = require('./parse/iso-639.json')
unfluff = require('@knod/unfluff')
sbd = require('@knod/sbd')

var ParserSetup = function() {
  var d
  console.debug('ParserSetup Initialize')
  return (d = {
    debug: !1,
    cleanNode: function(a) {
      console.debug('rSup.cleanNode')
      a = $(a)
      for (
        var b = ['sup', 'script', 'style', 'head'], c = 0;
        c < b.length;
        c++
      ) {
        a.find(b[c]).remove()
      }
      return a[0]
    },
    detectLanguage: function(a) {
      console.debug('rSup.detectLanguage')
      a = franc(a, {
        whitelist: 'ara bul ces dan deu ell eng spa fin fra hun ind ita kor nob nor pol por rus swe tha tur zho'.split(
          ' '
        )
      })
      'und' === a && (a = 'eng')
      var b = langCodes[a].iso6391
      d.debug && console.log('~~~parse debug~~~ language detected:', a, '->', b)
      return b
    },
    findArticle: function(a, b) {
      console.debug('rSup.findArticle')
      var c = $(a).html()
      c = unfluff.lazy(c, b).text()
      c = c.replace(/(\r\n|\n|\r)/gm, ' ')
      ;(c = c.replace(/\s\s+/g, ' ')) || (c = $(a).text())
      d.debug &&
        console.log('~~~parse debug~~~ article text identified (a string):', c)
      return c
    },
    cleanText: function(a) {
      console.debug('rSup.cleanText')
      var b = /[\u201c]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\u201c]/g, '"')
      })
      b = /[\u201d]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\u201d]/g, '"')
      })
      b = /['][\s]+["]+[\s]/g
      a = a.replace(b, function(a) {
        return a.replace(/['][\s]+/g, "'") + ' '
      })
      a = a.replace(/[\s]+[*]+(?=[A-Z])/g, ' ')
      a = a.replace(/[\s]+[*]+[\s]+(?=[A-Z])/g, ' ')
      a = a.replace(/[.](?=[A-Z])/g, '. ')
      a = a.replace(/[\s]+[.](?=[A-Z])/g, '. ')
      a = a.replace(/[\s]+[.](?=[\s])+(?![A-Z])/g, '. ')
      a = a.replace(/[.](?=[A-Z])/g, '. ')
      a = a.replace(/[.][\s+]+(?=[A-Z])/g, '. ')
      a = a.replace(/[\s]+[.](?![\s])+(?=[.])/g, '.')
      a = a.replace(/[\s]+[.](?![\s])+(?=[a-z]|[A-Z])/g, '.')
      a = a.replace(/[:](?=[A-Z])/g, ': ')
      a = a.replace(/[\s]+[:](?=[A-Z])/g, ': ')
      a = a.replace(/[\s]+[:](?=[\s])+(?![A-Z])/g, ': ')
      a = a.replace(/(?![a-z])[:](?=[A-Z])/g, ': ')
      a = a.replace(/(?![a-z])[:][\s+]+(?=[A-Z])/g, ': ')
      a = a.replace(/[\s]+[:](?![\s])+(?=[.])/g, ':')
      a = a.replace(/[\s]+[:](?![\s])+(?=[a-z]|[A-Z])/g, ':')
      a = a.replace(/[\s]+[?](?=[A-Z])/g, '? ')
      a = a.replace(/[\s]+[?](?=[\s])(?=[A-Z])/g, '? ')
      a = a.replace(/[?](?=[A-Z])/g, '? ')
      a = a.replace(/[?][\s]+(?=[A-Z])/g, '? ')
      a = a.replace(/[\s]+[?](?=[\s])+(?=[.])/g, '?')
      a = a.replace(/[\s]+[?](?![\s])+(?=[a-z]|[A-Z])/g, '?')
      a = a.replace(/[.][\s]+[.]/g, '.. ')
      b = /\u2026/g
      a = a.replace(b, function(a) {
        return a.replace(/\u2026/g, '...')
      })
      a = a.replace(/[\s]+[.][\s]+/g, '.')
      b = /([.]|[\u201d])[\s]+[0-9]{1}[.][\s]+[A-Z]{1}/g
      a = a.replace(b, function(a) {
        return a.replace(/[.][\s]+(?=[A-Z])/g, ' ')
      })
      b = /(Sir|St|Mr|Ms|Mrs|Jr|Sr|Sgt)[.]/g
      a = a.replace(b, function(a) {
        return a.replace(/[.]/g, ' ')
      })
      b = /(UK|USA|US)[.][A-Z]{1}/g
      a = a.replace(b, function(a) {
        return a.replace(/[.]/g, '. ')
      })
      b = /[\u03b1-\u03c9a-z][.][A-Z]/g
      a = a.replace(b, function(a) {
        return a.replace(/[.]/g, '. ')
      })
      b = /[)][.][A-Z]/g
      a = a.replace(b, function(a) {
        return a.replace(/[.]/g, '. ')
      })
      b = /['][.][A-Z]/g
      a = a.replace(b, function(a) {
        return a.replace(/[.]/g, '. ')
      })
      b = /["][.][A-Z]/g
      a = a.replace(b, function(a) {
        return a.replace(/[.]/g, '. ')
      })
      b = /[\u201d][.][A-Z]/g
      a = a.replace(b, function(a) {
        return a.replace(/[.]/g, '. ')
      })
      b = /[\s]+[?][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[?]/g, '?')
      })
      b = /[,][.][A-Z]/g
      a = a.replace(b, function(a) {
        return a.replace(/[.]/g, '. ')
      })
      a = a.replace(/[\u2014]/g, ' ')
      a = a.replace(/[\s]+[\u2013][\s]+/g, ' ')
      a = a.replace(/[\s]+[-][\s]+/g, ' ')
      a = a.replace(/[\s]+[--][\s]+/g, ' ')
      b = /([a-z]|[A-Z])+[)]([a-z]|[A-Z])/g
      a = a.replace(b, function(a) {
        return a.replace(/[)]/g, ') ')
      })
      a = a.replace(/\u2026/g, '\u2026 ')
      b = /([a-z]|[A-Z]|[\u03ac-\u03c9\u0391-\u03ce])[.][(]/g
      a = a.replace(b, function(a) {
        return a.replace(/[(]/g, ' (')
      })
      b = /([a-z]|[A-Z]|[\u03ac-\u03c9\u0391-\u03ce])[.][0-9]/g
      a = a.replace(b, function(a) {
        return a.replace(/[.]/g, '. ')
      })
      b = /[\s]+[.]{3}/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]/g, '')
      })
      b = /([a-z]|[\u03ac-\u03c9])[?][^'"]/g
      a = a.replace(b, function(a) {
        return a.replace(/[?]/g, '? ')
      })
      b = /["][\s]+[)]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]/g, '')
      })
      b = /[.][\s]+['][^A-Z\u0391-\u03ce]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[']/g, "' ")
      })
      b = /[\s]+["][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/["][\s]+/g, '"')
      })
      b = /[\u2019][\s]+[.][\u201d]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[.]+/g, '.')
      })
      b = /[\u201d][\s]+[?]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+/g, '')
      })
      b = /[\s]+["][)][,]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+/g, '')
      })
      b = /[?][\s]+[\u201d]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+/g, '')
      })
      b = /[.][\s]+[\u2019](?=[\s]+.+[\u2019])/g
      a = a.replace(b, function(a) {
        return a.replace(/[\u2019]/g, ' \u2019')
      })
      b = /[.][\s]+['](?=[\s]+.+['])/g
      a = a.replace(b, function(a) {
        return a.replace(/[']/g, " '")
      })
      b = /\u201d-/g
      a = a.replace(b, function(a) {
        return a.replace(/\u201d-/g, '\u201d -')
      })
      b = /[\s]+(!\u201d)/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+/g, '')
      })
      b = /[!][\u2019]([a-zA-Z]|[\u03ac-\u03c9\u0391-\u03ce])/g
      a = a.replace(b, function(a) {
        return a.replace(/[\u2019]+/g, '\u2019 ')
      })
      b = /[,][\u2019]([a-zA-Z]|[\u03ac-\u03c9\u0391-\u03ce]){1,20}/g
      a = a.replace(b, function(a) {
        return a.replace(/[\u2019]+/g, '\u2019 ')
      })
      b = /[\s]+["]["]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+["]/g, '" ')
      })
      b = /[\u2019][\s]+[.]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]/g, '')
      })
      b = /([a-zA-Z]|[\u03ac-\u03c9\u0391-\u03ce])[.][\u2019]([a-zA-Z]|[\u03ac-\u03c9\u0391-\u03ce])/g
      a = a.replace(b, function(a) {
        return a.replace(/[\u2019]/g, '\u2019 ')
      })
      b = /[\s]+[,][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[,]/g, ',')
      })
      b = /[\s]+[)][.][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[)][.]/g, ').')
      })
      b = /[.][\u2019]([a-zA-Z]|[\u03ac-\u03c9\u0391-\u03ce])/g
      a = a.replace(b, function(a) {
        return a.replace(/[.][\u2019]/g, '.\u2019 ')
      })
      b = /[\s]+([a-z]|[\u03ac-\u03c9])[,]([a-z]|[\u03ac-\u03c9])[\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[,]/g, ', ')
      })
      b = /[?][\u201d][\u2019]([a-zA-Z]|[\u03ac-\u03c9\u0391-\u03ce])/g
      a = a.replace(b, function(a) {
        return a.replace(/[\u2019]/g, '\u2019 ')
      })
      b = /[\s]+["][)][.]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+/g, '')
      })
      b = /[\s]+["][.][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+["][.]/g, '".')
      })
      b = /[\s]+[\u2019][\u201d][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[\u2019][\u201d]/g, '\u2019\u201d')
      })
      b = /[\s]+[:][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[:]/g, ':')
      })
      b = /[\s]+[;][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[;]/g, ';')
      })
      b = /[\s]+[)][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[)]/g, ')')
      })
      b = /[,][\u201d][\u2019]([a-zA-Z]|[\u03ac-\u03c9\u0391-\u03ce])/g
      a = a.replace(b, function(a) {
        return a.replace(/[\u2019]/g, '\u2019 ')
      })
      b = /[U][\s][K]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]/g, '')
      })
      b = /([a-zA-Z]|[\u03ac-\u03c9\u0391-\u03ce])[\u2019][\s]+[sltdmve]{1,2}[\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\u2019][\s]+/g, '\u2019')
      })
      b = /([.]|[?]|[!])+[\s]+[\u2019]([a-zA-Z]|[\u03ac-\u03c9\u0391-\u03ce])/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[\u2019]/g, '\u2019 ')
      })
      b = /[\u2019][\u2018]([a-zA-Z]|[\u03ac-\u03c9\u0391-\u03ce])/g
      a = a.replace(b, function(a) {
        return a.replace(/[\u2018]/g, ' \u2018')
      })
      b = /[\s]+[\u2019][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[\u2019]/g, '\u2019')
      })
      b = /[\s]+[!][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[!]/g, '!')
      })
      b = /[\s]+[?][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[?]/g, '?')
      })
      b = /[\u201c]([a-zA-Z]|[\u03ac-\u03c9\u0391-\u03ce]).+[\s]+[\u201c]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[\u201c]/g, '\u201c')
      })
      b = /([a-zA-Z]|[\u03ac-\u03c9\u0391-\u03ce])[,][\u201c]/g
      a = a.replace(b, function(a) {
        return a.replace(/[,]/g, ', ')
      })
      b = /[?][\s]+[\u2019][\u201d][\u2019]/g
      a = a.replace(b, function(a) {
        return a.replace(
          /[?][\s]+[\u2019][\u201d][\u2019]/g,
          '?\u2019\u201d\u2019 '
        )
      })
      b = /[.][\u201c]/g
      a = a.replace(b, function(a) {
        return a.replace(/[.]/g, '. ')
      })
      b = /[?][\u201d]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\u201d]/g, '\u201d ')
      })
      b = /([a-zA-Z]|[\u03ac-\u03c9\u0391-\u03ce])[\u201c]([a-zA-Z]|[\u03ac-\u03c9\u0391-\u03ce])/g
      a = a.replace(b, function(a) {
        return a.replace(/[\u201c]/g, ' \u201c')
      })
      b = /[[]/g
      a = a.replace(b, function(a) {
        return a.replace(/[[]/g, '(')
      })
      b = /]/g
      a = a.replace(b, function(a) {
        return a.replace(/]/g, ')')
      })
      b = /[\s]+[)][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[)]/g, ')')
      })
      b = /[:][\s]+["][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[:][\s]+["][\s]+/g, ': "')
      })
      b = /[a-z][\s]+["][.][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+["][.]/g, '".')
      })
      b = /[:]["][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[:]["][\s]+/g, ': "')
      })
      b = /[.][\u201d][\u2019]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\u2019]/g, '\u2019 ')
      })
      b = /[:][\u201c]([A-Z]|[\u0391-\u03ce])/g
      a = a.replace(b, function(a) {
        return a.replace(/[:]/g, ': ')
      })
      b = /[\s]+[\u2019][,]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[\u2019]/g, '\u2019')
      })
      b = /[!][\u201d][\u2019]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\u2019]/g, '\u2019 ')
      })
      b = /([a-zA-Z]|[\u03ac-\u03c9\u0391-\u03ce])[\u2019](so|of|or|to|on|at|it)/g
      a = a.replace(b, function(a) {
        return a.replace(/[\u2019]/g, '\u2019 ')
      })
      b = /([a-zA-Z]|[\u03ac-\u03c9\u0391-\u03ce])[.][\u2019][(]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\u2019]/g, '\u2019 ')
      })
      b = /([\u00a3]|[$]|[\u20ac])[\s]+[0-9]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+/g, '')
      })
      b = /[\u00a3][\s]+[0-9]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+/g, '')
      })
      b = /[\s]+[\u2018][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\u2018][\s]+/g, '\u2018')
      })
      b = /[\s]+[)][,][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[)][,]/g, '),')
      })
      b = /[0-9][\s]+[m][)][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[m]/g, 'm')
      })
      b = /[\u2019][\s]+[,][\u201d][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\u2019][\s]+/g, '\u2019')
      })
      b = /[)][.]{3}/g
      a = a.replace(b, function(a) {
        return a.replace(/[)]/g, ') ')
      })
      b = /(We|They|we|they)([']|[\u2019])[\s]+(re)/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+/g, '')
      })
      b = /([']|[\u2019])[\s]+[?]["][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[?]["]/g, '?"')
      })
      b = /([a-zA-Z]|[\u03ac-\u03c9\u0391-\u03ce])[.][\s]+(?:([a-zA-Z]|[\u03ac-\u03c9\u0391-\u03ce])[.])/g
      a = a.replace(b, function(a) {
        return a.replace(/[.][\s]+/g, '.')
      })
      b = /([a-zA-Z]|[\u03ac-\u03c9\u0391-\u03ce])[.][\s]+(?:([a-zA-Z]|[\u03ac-\u03c9\u0391-\u03ce])[.])/g
      a = a.replace(b, function(a) {
        return a.replace(/[.][\s]+/g, '.')
      })
      b = /(?:([a-zA-Z]|[\u03ac-\u03c9\u0391-\u03ce])[.])([a-zA-Z]|[\u03ac-\u03c9\u0391-\u03ce])[.][\s]+(?:([a-zA-Z]|[\u03ac-\u03c9\u0391-\u03ce])[.])/g
      a = a.replace(b, function(a) {
        return a.replace(/[.][\s]+/g, '.')
      })
      b = /[a][,][\s]+[k][,][\s]+[a]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+/g, '')
      })
      b = /([a-zA-Z]|[\u03ac-\u03c9\u0391-\u03ce])[.]{2,3}[\s]+(?:[.]{1})/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+/g, '')
      })
      b = /[:][\u201c]/g
      a = a.replace(b, function(a) {
        return a.replace(/[:]/g, ': ')
      })
      b = /([\u201d]|[,])[\u201c]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\u201c]/g, ' \u201c')
      })
      b = /[\s]+[\u201c][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\u201c][\s]+/g, '\u201c')
      })
      b = /[0-9][\u2019][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+/g, '')
      })
      b = /[.][\s]+[\u201d]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+/g, '')
      })
      b = /[\u201d]([A-Z]|[\u0391-\u03ce])/g
      a = a.replace(b, function(a) {
        return a.replace(/[\u201d]/g, '\u201d ')
      })
      b = /[0-9][\s]+(GB|MB|KB|Gb|Mb|Kb|gb|mb|kb)/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+/g, '')
      })
      b = /[\s]+["][,][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+["]/g, '"')
      })
      b = /[!][\u201c]/g
      a = a.replace(b, function(a) {
        return a.replace(/[!]/g, '! ')
      })
      b = /[\s]+[.][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[.]/g, '.')
      })
      b = /(you)[\u2019][\s]+(re)/g
      a = a.replace(b, function(a) {
        return a.replace(/[\u2019][\s]+/g, '\u2019')
      })
      b = /[.]{3}[^.\u201d'"]/g
      a = a.replace(b, function(a) {
        return a.replace(/[.]{3}/g, '... ')
      })
      b = /[\s]+[\u201d][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[\u201d]/g, '\u201d')
      })
      b = /[\s]+[\u201d]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+/g, '')
      })
      b = /([a-zA-Z]|[\u03ac-\u03c9\u0391-\u03ce])[(]/g
      a = a.replace(b, function(a) {
        return a.replace(/[(]/g, ' (')
      })
      b = /([a-zA-Z]|[\u03ac-\u03c9\u0391-\u03ce])[,]([a-zA-Z]|[\u03ac-\u03c9\u0391-\u03ce])/g
      a = a.replace(b, function(a) {
        return a.replace(/[,]/g, ', ')
      })
      b = /[.][\s]+[?]/g
      a = a.replace(b, function(a) {
        return a.replace(/[.][\s]+/g, '.')
      })
      b = /[?][\u201c]/g
      a = a.replace(b, function(a) {
        return a.replace(/[?]/g, '? ')
      })
      b = /[\s]+[?]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[?]/g, '?')
      })
      b = /[\s]+[-]([a-zA-Z]|[\u03ac-\u03c9\u0391-\u03ce])[\s]+/g
      a = a.replace(b, function(a) {
        return ' (' + a.replace(/[\s]+/g, '') + ') '
      })
      b = /[\u201c][\u2018][.]{3}[\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+/g, '')
      })
      b = /[:]([a-zA-Z]|[\u03ac-\u03c9\u0391-\u03ce])/g
      a = a.replace(b, function(a) {
        return a.replace(/[:]/g, ': ')
      })
      b = /[.]([a-zA-Z]|[\u03ac-\u03c9\u0391-\u03ce])/g
      a = a.replace(b, function(a) {
        return a.replace(/[.]/g, '. ')
      })
      b = /[\s]+[.][\u201d]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+/g, '')
      })
      b = /[']([a-zA-Z]|[\u03ac-\u03c9\u0391-\u03ce])[']/g
      a = a.replace(b, function(a) {
        return a + ' '
      })
      b = /(["])(?=(\\?))\2.*?\1/g
      a = a.replace(b, function(a) {
        return ' ' + a.replace(/["]/g, '"') + ' '
      })
      b = /([\u201d])(?=(\\?))\2.*?\1/g
      a = a.replace(b, function(a) {
        return ' ' + a.replace(/[\u201d]/g, '"') + ' '
      })
      b = /[\s]+["][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/["][\s]+/g, '"')
      })
      b = /["][\s]+[.]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+/g, '')
      })
      b = /[^';!?.,a-zA-Z\u03ac-\u03c9\u0391-\u03ce ]["][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/["][\s]+/g, '"')
      })
      b = /[\s]+[,][^.,a-zA-Z\u03ac-\u03c9\u0391-\u03ce]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[,]/g, ',')
      })
      b = /[a-zA-Z\u03ac-\u03c9\u0391-\u03ce]{1}[.][\s]+[a-zA-Z\u03ac-\u03c9\u0391-\u03ce]{1}[.]/g
      a = a.replace(b, function(a) {
        return a.replace(/[.][\s]+/g, '.')
      })
      b = /[\s]+[(][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[(][\s]+/g, '(')
      })
      b = /[\s]+[\/][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\/][\s]+/g, '/')
      })
      b = /[\s]+([+]|[-]|[*]|[=])[\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+/g, '')
      })
      b = /[\s]+[)][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[)]/g, ')')
      })
      b = /[^ ][\u201c]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\u201c]/g, ' \u201c')
      })
      b = /[\s]+[(][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[(][\s]+/g, '(')
      })
      b = /[(][\s]+[^]/g
      a = a.replace(b, function(a) {
        return a.replace(/[(][\s]+/g, '(')
      })
      b = /(No)[.][\s]+[0-9]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+/g, '')
      })
      b = /[\s]+['][s][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[']/g, "'")
      })
      b = /[\s]+[)][,][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[)][,]/g, '),')
      })
      b = /[\s]+[)][.][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[)][.]/g, '),')
      })
      b = /[\s]+[\u2019][s][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[\u2019]/g, '\u2019')
      })
      b = /[\s]+[:][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[:]/g, ':')
      })
      b = /[s][\s]+['][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[']/g, "'")
      })
      b = /[^a-z\u03ac-\u03c9](?:[\s]+)[0-9][\s]+[A-Z\u0391-\u03ce]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+/g, '. ')
      })
      b = /[,][\s]*["](he|she|they|we|I)[\s]+(stated|said|told|says)[.]/g
      a = a.replace(b, function(a) {
        return a.replace(/[,][\s]*["]/g, '," ')
      })
      b = /[\s]+[-]{2}[\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[-]{2}/g, ',')
      })
      b = /[0-9][\s]+(GHz|MHz|Khz)/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+/g, '')
      })
      b = /[\s]+(will)[.](i)[.][\s]+(am)/g
      a = a.replace(b, function(a) {
        return a.replace(/[.][\s]+/g, '.')
      })
      b = /[\s]+['][\s]+[s][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+['][\s]+/g, "'")
      })
      b = /[\s]+[.]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[.]/g, '.')
      })
      b = /[\s]+[^]{1,10}["][(]/g
      a = a.replace(b, function(a) {
        return a.replace(/["][(]/g, '" (')
      })
      b = /[^ ][*]/g
      a = a.replace(b, function(a) {
        return a.replace(/[*]/g, ' *')
      })
      b = /[^ ][)]["][^ ]/g
      a = a.replace(b, function(a) {
        return a.replace(/["]/g, '" ')
      })
      b = /[\s]+[,][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[,]/g, ',')
      })
      b = /[\s]+[;][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[;]/g, ';')
      })
      b = /[\s]+[\u03cc][,][\s]+(\u03c4\u03b9)[\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[,][\s]+/g, ',')
      })
      b = /[\s]+["][\s]+[^"]+[,]["]/g
      a = a.replace(b, function(a) {
        return a.replace(/["][\s]+/g, '"')
      })
      b = /[\s]+["]["][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+["]["][\s]+/g, '" "')
      })
      b = /[,][\s]+["](he|she|they)/g
      a = a.replace(b, function(a) {
        return a.replace(/[,][\s]+["]/g, '," ')
      })
      b = /[^a-zA-Z\u03ac-\u03c9\u0391-\u03ce](I)['][\s]+(m)[\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/['][\s]+/g, "'")
      })
      b = /[U][.][S][.][^A-Z\u0391-\u03ce]/g
      a = a.replace(b, function(a) {
        return a.replace(/[U][.][S][.]/g, 'U.S. ')
      })
      b = /[\s]+[a-zA-Z\u03ac-\u03c9\u0391-\u03ce][\s]+[*][\s]+[a-zA-Z\u03ac-\u03c9\u0391-\u03ce][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[*][\s]+/g, '*')
      })
      b = /[^0-9][\s]+[*][\s]+[^0-9]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[*][\s]+/g, ' ')
      })
      b = /[\u2019][\s]+[s][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[s]/g, 's')
      })
      b = /[\s]+[.][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[.]/g, '.')
      })
      b = /[\s]+[(][;][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[(][;][\s]+/g, '(;')
      })
      b = /[\s]+[,][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[,]/g, ',')
      })
      b = /[\s]+[)][)][.][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[)][)][.]/g, ')).')
      })
      b = /[\s]+[^ ]+["][^,.)]{1,10}[\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/["]/g, '" ')
      })
      b = /[^ ]["]["][^ ]/g
      a = a.replace(b, function(a) {
        return a.replace(/["]["]/g, '" "')
      })
      b = /\u0097/g
      a = a.replace(b, function(a) {
        return a.replace(/\u0097/g, ' ')
      })
      b = /[\s]+["][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+["][\s]+/g, '"')
      })
      b = /(["])(?=(\\?))\2.*?\1/g
      a = a.replace(b, function(a) {
        return ' ' + a + ' '
      })
      b = /[a-zA-Z\u03ac-\u03c9\u0391-\u03ce]+[.][\s]+(co)[.][\s]+(in|uk)/g
      a = a.replace(b, function(a) {
        return a.replace(/[.][\s]+/g, '.')
      })
      b = /(Ph)[.](D)[.]/g
      a = a.replace(b, function(a) {
        return a.replace(/[.]/g, '')
      })
      b = /(PhD)[\s]+[s][,]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+/g, '')
      })
      b = /[\s]+[,][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[,]/g, ',')
      })
      b = /[\s]+[.][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[.]/g, '.')
      })
      b = /[\s]+["][.][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+["][.]/g, '".')
      })
      b = /[\s]+[(][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[(][\s]+/g, '(')
      })
      b = /[\s]+[)]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[)]/g, ')')
      })
      b = /[\s]+[)][,][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[)][,]/g, '),')
      })
      b = /[\s]+[:][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[:]/g, ':')
      })
      b = /[\s]+[;][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[;]/g, ';')
      })
      b = /[.][\s]+["]["][\s]+[A-Z\u0391-\u03ce]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+["]["][\s]+/g, '" "')
      })
      b = /[,][\s]*["][^]{1,15}(stated|said|told|added)[.]/g
      a = a.replace(b, function(a) {
        return a.replace(/[,][\s]*["]/g, '," ')
      })
      b = /[:]["][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[:]["][\s]+/g, ': "')
      })
      b = /(but)["][\s]+[^]+[.]["][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/(but)["][\s]+/g, 'but "')
      })
      b = /[a-z\u03ac-\u03c9][.][A-Z\u0391-\u03ce]/g
      a = a.replace(b, function(a) {
        return a.replace(/[.]/g, '. ')
      })
      b = /[.][\s]+[\u2019]/g
      a = a.replace(b, function(a) {
        return a.replace(/[.][\s]+[\u2019]/g, '.\u2019')
      })
      b = /[a-z\u03ac-\u03c9A-Z\u0391-\u03ce][(]/g
      a = a.replace(b, function(a) {
        return a.replace(/[(]/g, ' (')
      })
      b = /[:][\s]+[a-z\u03ac-\u03c9A-Z\u0391-\u03ce]["][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[:][\s]+/g, ':')
      })
      b = /[!][a-z\u03ac-\u03c9A-Z\u0391-\u03ce]/g
      a = a.replace(b, function(a) {
        return a.replace(/[!]/g, '! ')
      })
      b = /[\u2022]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\u2022]/g, '')
      })
      b = /[\s]+[.][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[.]/g, '.')
      })
      b = /[*][^ ]/g
      a = a.replace(b, function(a) {
        return a.replace(/[*]/g, '')
      })
      b = /(R'n')[\s]+[B][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[B]/g, 'B')
      })
      b = /(\u03ba.)[\s]+(\u03ac.)[\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+(\u03ac.)/g, '\u03ac.')
      })
      b = /(\u03ba.)[\s]+(\u03b1.)[\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+(\u03b1.)/g, '\u03b1.')
      })
      b = /[A-Z\u0391-\u03ce][.][\s]+[A-Z\u0391-\u03ce][.]/g
      a = a.replace(b, function(a) {
        return a.replace(/[.][\s]+/g, '.')
      })
      b = /[\s]+[,]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[,]/g, ',')
      })
      b = /[.][\s]+(epub|pdf|zip|rar|tar)[\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[.]/g, ' ')
      })
      b = /[\s]+[&][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[&]/g, 'and')
      })
      b = /[!]['][s]/g
      a = a.replace(b, function(a) {
        return a.replace(/[!]/g, '')
      })
      b = /[\s]+[(]["][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[(]["][\s]+/g, '("')
      })
      b = /[\s]+[\u2019]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[\u2019]/g, '\u2019')
      })
      b = /[\s]+[\u201d]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[\u201d]/g, '\u201d')
      })
      b = /[\s]+["]["][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+["]["][\s]+/g, '" "')
      })
      b = /[\s]+["][,][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+["][,]/g, '",')
      })
      b = /[0-9][.][\s]+[a-z\u03ac-\u03c9]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+/g, '')
      })
      b = /[\s]+[?][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[?]/g, '?')
      })
      b = /[\s]+[)]/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]+[)]/g, ')')
      })
      b = /[\u2014-\u2015\u2E3A\u2E3B]/g
      a = a.replace(b, function(a) {
        return a.replace(/[-\u2014-\u2015\u2E3A\u2E3B]/g, ' ')
      })
      b = /[\s]+[-\u2010-\u2011\uFE58\uFE63\uFF0D][\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[-\u2010-\u2011\uFE58\uFE63\uFF0D]/g, ' ')
      })
      b = /[\s]+[a-z\u03ac-\u03c9][,][a-z\u03ac-\u03c9]{2}[\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[,]/g, '')
      })
      b = /[\s]{2,}/g
      a = a.replace(b, function(a) {
        return a.replace(/[\s]{2,}/g, ' ')
      })
      b = /[.][\s]+(epub|pdf|zip|rar|tar|NET)/g
      a = a.replace(b, function(a) {
        return a.replace(/.[\s]/g, ' \u2022')
      })
      b = /[^ ]+[.][\s]+(com|net|co.uk|co.in|com.cy|gr|tk|info|me)[\s]+/g
      a = a.replace(b, function(a) {
        return a.replace(/[.][\s]+/g, '.')
      })
      d.debug &&
        console.log('~~~parse debug~~~ plain text cleaned (a string):', a)
      return a
    },
    splitSentences: function(a) {
      console.debug('rSup.splitSentences')
      a = sbd.sentences(a, { parse_type: 'words' })
      d.debug &&
        console.log(
          '~~~parse debug~~~ sentences (an array of arrays of strings):',
          a
        )
      return a
    }
  })
}
module.exports = ParserSetup
