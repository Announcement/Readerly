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
    let cleaned

    text = extractor.lazy(element.outerHTML).text()
    cleaned = Playback.clean(text)

    this.readText(cleaned)
  }

  readText (text) {
    let sentences
    let options

    options = {parse_type: 'words'}
    sentences = tokenizer.sentences(text, options)

    this.text = text
    this.sentences = Playback.clean(sentences)

    this.readSentences(this.sentences)
  }

  readSentences (sentences) {
    let outputElement

    let forEachSentence
    let forEachWord
    let show
    let output

    outputElement = this.element.querySelector('div.text')

    output = it => {
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

      word = this.document.createElement('span')
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

      beforeText = this.document.createTextNode(beforeString)
      centerText = this.document.createTextNode(centerString)
      afterText = this.document.createTextNode(afterString)

      centerElement = this.document.createElement('mark')
      centerElement.appendChild(centerText)

      word.appendChild(beforeText)
      word.appendChild(centerElement)
      word.appendChild(afterText)

      outputElement.appendChild(word)
    }
    show = (sentenceIndex, wordIndex) => {
      let configuration
      let timeout

      configuration = this.configuration

      timeout = 1000 * 60 / configuration.wordsPerMinute


      return new Promise(function (resolve, reject) {
        let sentence
        let word
        // let text
        let delay

        removeChildren(outputElement)

        sentence = sentences[sentenceIndex]
        word = sentence[wordIndex]
        // text = document.createTextNode(word)

        delay = Math.round(timeout / 5 * word.length)

        if (sentence.length === wordIndex + 1) {
          delay += timeout / 5 * configuration.sentenceEndDelay
        }

        output(word)

        // outputElement.appendChild(pretty(word))

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
}

export default Playback
