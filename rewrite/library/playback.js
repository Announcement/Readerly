import cleanText from './utilities/clean-text'
import Dispatcher from './utilities/dispatcher'

const extractor = require('@knod/unfluff')
const tokenizer = require('@knod/sbd')

// {
//   wpm: 250,
//   _baseDelay: 1 / (250 / 60) * 1000, // based on wpm
//   slowStartDelay: 5,
//   sentenceDelay: 5,
//   otherPuncDelay: 2.5,
//   numericDelay: 2.0,
//   shortWordDelay: 1.3, // Will be obsolete
//   longWordDelay: 1.5, // Will be obsolete
//   codeBaseDelay: 3.0,
//   delayModifier: 1,
//   sentenceModifier: 1
// }

class Playback extends Dispatcher {
  constructor (it) {
    let configuration

    configuration = {}

    configuration.wordsPerMinute = 450
    configuration.sentenceEndDelay = 5

    super()

    this.element = it
    this.document = it.ownerDocument
    this.configuration = configuration
  }

  configure (it) {
    console.debug('playback is being configured', it)
    Object.assign(this.configuration, it)
  }

  full () {
    this.readElement(document.body)
  }

  readElement (element) {
    let text

    text = Playback.getText(element)

    this.text = text

    this.readText(text)
  }

  readText (text) {
    let sentences

    sentences = Playback.getSentences(text)

    this.text = text
    this.sentences = sentences

    this.readSentences(sentences)
  }

  readSentences (sentences) {
    let outputElement

    let forEachSentence
    let forEachWord
    let show

    outputElement = this.element.querySelector('div.text')

    show = (sentenceIndex, wordIndex) => {
      let configuration
      let timeout

      configuration = this.configuration
      timeout = 1000 * 60 / configuration.wordsPerMinute

      return new Promise(function (resolve, reject) {
        let sentence
        let word
        let delay

        removeChildren(outputElement)

        sentence = sentences[sentenceIndex]
        word = sentence[wordIndex]

        delay = Math.round(timeout / 5 * word.length)

        if (sentence.length === wordIndex + 1) {
          delay += timeout / 5 * configuration.sentenceEndDelay
        }

        Playback.readWord(word, outputElement)

        setTimeout(resolve, delay)
      })
    }

    forEachWord = async sentenceIndex => {
      let sentence
      let wordIndex

      sentence = sentences[sentenceIndex]

      for (wordIndex = 0; wordIndex < sentence.length; wordIndex++) {
        await show(sentenceIndex, wordIndex)
      }

      return true
    }

    forEachSentence = async sentences => {
      let index

      for (index = 0; index < sentences.length; index++) {
        await forEachWord(index)
      }

      return true
    }

    forEachSentence(sentences)

    function removeChildren (element) {
      while (element.firstChild) {
        element.removeChild(element.firstChild)
      }
    }
  }

  static readWord (it, element) {
    let $document
    let word
    let middle
    let beforeString
    let beforeText
    let afterString
    let afterText
    let centerText
    let centerString
    let centerElement
    let parity
    let offset

    $document = element.ownerDocument

    word = $document.createElement('span')
    middle = Math.floor(it.length / 2)
    parity = it.lenth % 2 === 0
    offset = 1

    if (!parity) {
      middle--
      offset++
    }
    // offset = !parity ? 2 : 1

    beforeString = it.substring(0, middle)
    centerString = it.substring(middle, middle + offset)
    afterString = it.substring(middle + offset)

    beforeText = $document.createTextNode(beforeString)
    centerText = $document.createTextNode(centerString)
    afterText = $document.createTextNode(afterString)

    centerElement = $document.createElement('mark')
    centerElement.appendChild(centerText)

    word.appendChild(beforeText)
    word.appendChild(centerElement)
    word.appendChild(afterText)

    element.appendChild(word)
  }

  static clean (it) {
    return _cleanText() || _cleanSentences()

    function _cleanText () {
      if (it.constructor === String) {
        return Playback.cleanText(it)
      }

      return null
    }

    function _cleanSentences () {
      if (it.constructor === Array) {
        return Playback.cleanSentences(it)
      }

      return null
    }
  }

  static cleanText (text) {
    return cleanText(text)
  }

  static cleanSentences (sentences) {
    let map
    let filter

    map = sentence => sentence.filter(word => word.trim())
    filter = sentence => sentence.length

    return sentences.map(map).filter(filter)
  }

  static getText (element) {
    let text
    let cleaned

    text = extractor.lazy(element.outerHTML).text()
    cleaned = Playback.clean(text)

    return cleaned
  }

  static getSentences (text) {
    let options
    let sentences
    let cleaned

    options = {parse_type: 'words'}
    sentences = tokenizer.sentences(text, options)
    cleaned = Playback.clean(sentences)

    return cleaned
  }
}

export default Playback
