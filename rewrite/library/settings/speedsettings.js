import SettingsPanel from './settingspanel'
import Setting from './setting'

class SpeedSettings extends SettingsPanel {
  constructor (it) {

    super(it)

// console.debug('SpeedSettings')

    this.ensureWordsPerMinute()
    this.ensureSentenceEndDelay()
    this.ensurePunctuationDelay()
    this.ensureLongWordDelay()
    this.ensureSpecialPatternDelay()

    this.listen()
  }

  listen () {
// console.debug('speedsettings:listen is starting')

    // try {
    this.wordsPerMinute.on('change', () => this.update())
    this.sentenceEndDelay.on('change', () => this.update())
    this.punctuationDelay.on('change', () => this.update())
    this.longWordDelay.on('change', () => this.update())
    this.specialPatternDelay.on('change', () => this.update())
    // } catch (exception) {
    //   console.debug(this.constructor.name, 'failed to listen', {exception})
    // }

// console.debug('speedsettings:listen is done')
  }

  update () {
    this.dispatch('change', this.configuration)
  }

  get configuration () {
    let configuration

    configuration = {}

    configuration.wordsPerMinute = this.wordsPerMinute.value
    configuration.sentenceEndDelay = this.sentenceEndDelay.value
    configuration.punctuationDelay = this.punctuationDelay.value
    configuration.longWordDelay = this.longWordDelay.value
    configuration.specialPatternDelay = this.specialPatternDelay.value

    return configuration
  }

  ensureWordsPerMinute () {
    let that
    let element
    let setting

    that = this.element.querySelector('fieldset.words-per-minute')

    element = !that ? this.createWordsPerMinute() : that
    setting = new Setting(element)

    setting.sync()

    this.wordsPerMinute = setting
  }

  ensureSentenceEndDelay () {
    let that
    let element
    let setting

    that = this.element.querySelector('fieldset.sentence-end-delay')

    element = !that ? this.createSentenceEndDelay() : that
    setting = new Setting(element)

    setting.sync()

    this.sentenceEndDelay = setting
  }

  ensurePunctuationDelay () {
    let that
    let element
    let setting

    that = this.element.querySelector('fieldset.punctuation-delay')

    element = !that ? this.createPunctuationDelay() : that
    setting = new Setting(element)

    setting.sync()

    this.punctuationDelay = setting
  }

  ensureLongWordDelay () {
    let that
    let element
    let setting

    that = this.element.querySelector('fieldset.long-word-delay')

    element = !that ? this.createLongWordDelay() : that
    setting = new Setting(element)

    setting.sync()

    this.longWordDelay = setting
  }

  ensureSpecialPatternDelay () {
    let that
    let element
    let setting

    that = this.element.querySelector('fieldset.special-pattern-delay')

    element = !that ? this.createSpecialPatternDelay() : that
    setting = new Setting(element)

    setting.sync()

    this.specialPatternDelay = setting
  }

  createWordsPerMinute () {
// console.debug('create wpm')
  }
  createSentenceEndDelay () {
// console.debug('create sed')
  }
  createPunctuationDelay () {
// console.debug('create pd')
  }
  createLongWordDelay () {
// console.debug('create lwd')
  }
  createSpecialPatternDelay () {
// console.debug('create spd')
  }

  // constructor (it) {
    // let wordsPerMinute
    // let sentenceEndDelay
    // let punctuationDelay
    // let longWordDelay
    // let specialPatternDelay
    //
    // super('Speed Settings')
    //
    // wordsPerMinute = new Setting('Words Per Minute')
    // sentenceEndDelay = new Setting('Sentence End Delay')
    // punctuationDelay = new Setting('Punctuation Delay')
    // longWordDelay = new Setting('Long Word Delay')
    // specialPatternDelay = new Setting('Special Pattern Delay')
    //
    // wordsPerMinute.step = 25.00
    // sentenceEndDelay.step = 0.10
    // punctuationDelay.step = 0.10
    // longWordDelay.step = 0.10
    // specialPatternDelay.step = 0.10
    //
    // wordsPerMinute.minimum = 25.00
    // sentenceEndDelay.minimum = 1.00
    // punctuationDelay.minimum = 1.00
    // longWordDelay.minimum = 1.00
    // specialPatternDelay.minimum = 1.00
    //
    // wordsPerMinute.maximum = 1000.00
    // sentenceEndDelay.maximum = 5.00
    // punctuationDelay.maximum = 1.50
    // longWordDelay.maximum = 1.50
    // specialPatternDelay.maximum = 1.50
    //
    // wordsPerMinute.value = 450.00
    // sentenceEndDelay.value = 4.70
    // punctuationDelay.value = 1.10
    // longWordDelay.value = 1.10
    // specialPatternDelay.value = 1.40
    //
    // wordsPerMinute.sync()
    // sentenceEndDelay.sync()
    // punctuationDelay.sync()
    // longWordDelay.sync()
    // specialPatternDelay.sync()
    //
    // this.add(wordsPerMinute)
    // this.add(sentenceEndDelay)
    // this.add(punctuationDelay)
    // this.add(longWordDelay)
    // this.add(specialPatternDelay)
  // }
}

export default SpeedSettings
