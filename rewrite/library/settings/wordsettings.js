import SettingsPanel from './settingspanel'
import Setting from './setting'

class WordSettings extends SettingsPanel {
  constructor (it) {
// console.debug('WordSettings')

    super(it)

    this.ensureMaxLettersShown()

    this.listen()
    // let maxLettersShown
    //
    // super('Word Settings')
    //
    // maxLettersShown = new Setting('Max Letters Shown')
    //
    // maxLettersShown.step = 1
    // maxLettersShown.minimum = 1
    // maxLettersShown.maximum = 25
    // maxLettersShown.value = 12
    //
    // maxLettersShown.sync()
    //
    // this.add(maxLettersShown)
  }


  listen () {
    this.maxLettersShown.on('change', value => this.update(this.configuration))
  }

  update () {
    this.dispatch('change', this.configuration)
  }

  get configuration () {
    let configuration

    configuration = {}

    configuration.maxLettersShown = this.maxLettersShown.value

    return configuration
  }

  ensureMaxLettersShown () {
    let that
    let element
    let setting

    that = this.element.querySelector('fieldset.max-letters-shown')

    element = that ||  this.createMaxLettersShown()
    setting = new Setting(element)

    setting.sync()

    this.maxLettersShown = setting
  }

  createMaxLettersShown () {}
}

export default WordSettings
