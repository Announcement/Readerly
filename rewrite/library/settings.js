// import * as data from './utilities/storage'
// import stylesheet from './settings/stylesheet'

// import Tabs from './view/tabs'
import Navigation from './view/navigation'

import SpeedSettings from './settings/speedsettings'
import WordSettings from './settings/wordsettings'

import Dispatcher from './utilities/dispatcher'

class Settings extends Dispatcher {
  /**
   * @namespace
   *
   * @property {Tabs} tabs
   * @property {Array.<Panel>} panels
   */

   /**
    * @method constructor
    * @constructs Settings
    *
    * @param {Element} it - Settings element.
    */
  constructor (it) {
    let speedSettingsElement
    let wordSettingsElement
    let navigationElement
    let parentElement

    let speedSettings
    let wordSettings
    let navigation

    // console.debug('settings:constructor')

    speedSettingsElement = it.querySelector('form.speed')
    wordSettingsElement = it.querySelector('form.word')
    navigationElement = it.querySelector('nav')

    parentElement = it.parentNode

    super()

    this.element = it
    this.parent = parentElement

    // console.debug('settings:constructor', 'prepare to load')

    navigation = new Navigation(navigationElement)
    speedSettings = new SpeedSettings(speedSettingsElement)
    wordSettings = new WordSettings(wordSettingsElement)

    // console.debug('settings:constructor', 'submodules', navigation, speedSettings, wordSettings)

    this.parent = parentElement
    this.navigation = navigation
    this.speed = speedSettings
    this.word = wordSettings

    navigation.on('click', element => {
      this._navigate(element)
    })

    speedSettings.on('change', () => {
      console.debug('settings - speed on change')
      this.dispatch('change', this.configuration)
    })

    wordSettings.on('change', () => {
      console.debug('settings - word on change')
      this.dispatch('change', this.configuration)
    })

    this.remove()

    // it.parentElement.removeChild(it)
    // let speedSettings
    // let wordSettings
    //
    // this.tabs = new Tabs()
    // this.panels = []
    // this.element = document.createElement('section')
    //
    // speedSettings = new SpeedSettings()
    // wordSettings = new WordSettings()
    //
    // this.panels.push(speedSettings)
    // this.panels.push(wordSettings)
    //
    // this.tabs.add(speedSettings.tab)
    // this.tabs.add(wordSettings.tab)
    //
    // this.element.appendChild(this.tabs.element)
    // this.element.appendChild(this.panels[0].element)
    // // this.panels.forEach(it => this.element.appendChild(it.element))
    //
    // this.panels.forEach(panel => {
    //   panel.tab.element.addEventListener('click', () => {
    //     this.panels.forEach(it => {
    //       if (this.element.contains(it.element)) {
    //         this.element.removeChild(it.element)
    //       }
    //     })
    //
    //     this.element.appendChild(panel.element)
    //   })
    // })
    //
    // this.element = scope(this.element)
  }

  toggle () {
  // console.debug('settings:toggle')

  // console.debug('settings:toggle', 'this.parent', this.parent)
  // console.debug('settings:toggle', 'this.element', this.element)
  // console.debug('settings:toggle', 'this.enabled', this.enabled)

    if (this.enabled === false) {
      // console.debug('settings:toggle', 'should call this.append()')
      this.append()
    } else {
      // console.debug('settings:toggle', 'should call this.remove()')
      this.remove()
    }

    // this.dispatch('toggle')

    // !this.enabled ? this.append() : this.remove()
  }

  get enabled () {
// console.debug('settings:enabled')

    return this.parent.contains(this.element)
  }

  remove () {
// console.debug('settings:remove')

    // this.element.parentNode.removeChild(this.element)
    this.parent.removeChild(this.element)

    this.dispatch('remove')
  }

  append () {
// console.debug('settings:append')

    this.parent.appendChild(this.element)

    this.dispatch('append')
  }

  get configuration () {
    let configuration

    configuration = {}

    Object.assign(configuration, this.speed.configuration)
    Object.assign(configuration, this.words.configuration)

    return configuration
  }

  collapse () {
// console.debug('settings:collapse')

    this.speed.hide()
    this.word.hide()

    this.dispatch('collapse')
  }

  _speed () {
// console.debug('settings:_speed')

    this.collapse()
    this.speed.show()

    this.dispatch('show')
  }

  _word () {
// console.debug('settings:_word')

    this.collapse()
    this.word.show()

    this.dispatch('show')
  }

  _navigate (element) {
    let reference
    let speed
    let word

    console.debug('navigate')

    reference = element.getAttribute('href')

    // console.debug('settings:_navigate', reference)

    speed = () => {
      if (reference === '#readerly-settings-speed') {
        this._speed()
      }
    }

    word = () => {
      if (reference === '#readerly-settings-word') {
        this._word()
      }
    }

    speed()
    word()
  }
}

export default Settings
