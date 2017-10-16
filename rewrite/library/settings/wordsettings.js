import SettingsPanel from './settingspanel'
import Setting from './setting'

class WordSettings extends SettingsPanel {
  constructor() {
    let maxLettersShown

    super('Word Settings')

    maxLettersShown = new Setting('Max Letters Shown')

    maxLettersShown.step = 1
    maxLettersShown.minimum = 1
    maxLettersShown.maximum = 25
    maxLettersShown.value = 12

    maxLettersShown.sync()

    this.add(maxLettersShown)
  }
}

export default WordSettings
