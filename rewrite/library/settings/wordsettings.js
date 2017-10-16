import SettingsPanel from './settingspanel'
import Setting from './setting'

class WordSettings extends SettingsPanel {
  constructor() {
    let maxLettersShown

    super('Word Settings')

    maxLettersShown = new Setting('Max Letters Shown')

    this.add(maxLettersShown)
  }
}

export default WordSettings
