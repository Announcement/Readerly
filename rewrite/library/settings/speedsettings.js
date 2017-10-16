import SettingsPanel from './settingspanel'
import Setting from './setting'

class SpeedSettings extends SettingsPanel {
  constructor() {
    let wordsPerMinute
    let sentenceEndDelay
    let punctuationDelay
    let longWordDelay
    let specialPatternDelay

    super('Speed Settings')

    wordsPerMinute = new Setting('Words Per Minute')
    sentenceEndDelay = new Setting('Sentence End Delay')
    punctuationDelay = new Setting('Punctuation Delay')
    longWordDelay = new Setting('Long Word Delay')
    specialPatternDelay = new Setting('Special Pattern Delay')    

    wordsPerMinute.step = 25.00
    sentenceEndDelay.step = 0.10
    punctuationDelay.step = 0.10
    longWordDelay.step = 0.10
    specialPatternDelay.step = 0.10

    wordsPerMinute.minimum = 25.00
    sentenceEndDelay.minimum = 1.00
    punctuationDelay.minimum = 1.00
    longWordDelay.minimum = 1.00
    specialPatternDelay.minimum = 1.00

    wordsPerMinute.maximum = 1000.00
    sentenceEndDelay.maximum = 5.00
    punctuationDelay.maximum = 1.50
    longWordDelay.maximum = 1.50
    specialPatternDelay.maximum = 1.50

    wordsPerMinute.value = 450.00
    sentenceEndDelay.value = 4.70
    punctuationDelay.value = 1.10
    longWordDelay.value = 1.10
    specialPatternDelay.value = 1.40

    wordsPerMinute.sync()
    sentenceEndDelay.sync()
    punctuationDelay.sync()
    longWordDelay.sync()
    specialPatternDelay.sync

    this.add(wordsPerMinute)
    this.add(sentenceEndDelay)
    this.add(punctuationDelay)
    this.add(longWordDelay)
    this.add(specialPatternDelay)
  }
}

export default SpeedSettings
