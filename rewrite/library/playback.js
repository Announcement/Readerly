import cleanText from './utilities/clean-text'

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

class Playback {
  constructor (it) {
    let configuration

// console.debug('playback:constructor')

    configuration = {}

    configuration.wordsPerMinute = 450
    configuration.sentenceEndDelay = 5

    this.element = it
    this.configuration = configuration
  }

  configure (it) {
// console.debug('playback is being configured', it)

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

    outputElement = this.element.querySelector('div.text')

    forEachSentence(sentences)

    show = (sentenceIndex, wordIndex) => {
      let configuration
      let timeout

      timeout = 1000 * 60 / configuration.wordsPerMinute

      configuration = this.configuration

      return new Promise(function (resolve, reject) {
        let sentence
        let word
        let text
        let delay

        removeChildren(outputElement)

        sentence = sentences[sentenceIndex]
        word = sentence[wordIndex]
        text = document.createTextNode(word)

        delay = Math.round(timeout / 5 * word.length)

        if (sentence.length === wordIndex + 1) {
          delay += timeout / 5 * configuration.sentenceEndDelay
        }

        outputElement.appendChild(text)

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

    function removeChildren (element) {
      while (element.firstChild) {
        element.removeChild(element.firstChild)
      }
    }
  }
}

export default Playback
