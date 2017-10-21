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
    let parentElement
    let navigationElement
    let speedSettingsElement
    let wordSettingsElement

    let navigation
    let speedSettings
    let wordSettings

    // console.debug('settings:constructor')

    parentElement = it.parentNode

    navigationElement = it.querySelector('nav')
    speedSettingsElement = it.querySelector('form.speed')
    wordSettingsElement = it.querySelector('form.word')

    super()

    this.element = it
    this.parent = parentElement

    navigation = new Navigation(navigationElement)
    speedSettings = new SpeedSettings(speedSettingsElement)
    wordSettings = new WordSettings(wordSettingsElement)

    speedSettings.hide()
    wordSettings.hide()

    wordSettings.capture(navigation)
    speedSettings.capture(navigation)

    this.parent = parentElement
    this.navigation = navigation
    this.speed = speedSettings
    this.word = wordSettings

    navigation.on('click', element => {
      this.dispatch('click', element)
      this._navigate(element)
    })

    speedSettings.on('change', configuration => {
      this.dispatch('change', configuration)
    })

    wordSettings.on('change', configuration => {
      this.dispatch('change', configuration)
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

  /**
   * Check if the settigns view is enabled
   * @returns {boolean} Representing whether or not the panel is visible.
   */
  get enabled () {
    // console.debug('settings:enabled')

    return this.parent.contains(this.element)
  }

  /**
   * Get configuration from each of its children's settings.
   * @returns {object} Populated with properties pertaining of all available settings.
   */
  get configuration () {
    let configuration

    configuration = {}

    // console.debug(this.speed)
    // console.debug(this.words)

    Object.assign(configuration, this.speed.configuration)
    Object.assign(configuration, this.words.configuration)

    return configuration
  }

  /**
   * Disable if enabled or enable if disabled
   * @method toggle
   */
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

  /**
   * Remove the Settings View from its parent.
   * @method remove
   */
  remove () {
    // console.debug('settings:remove')

    // this.element.parentNode.removeChild(this.element)
    this.parent.removeChild(this.element)

    this.dispatch('remove')
  }

  /**
   * Append the Settings View from its parent.
   * @method append
   */
  append () {
    // console.debug('settings:append')

    this.parent.appendChild(this.element)

    this.dispatch('append')
  }

  /**
   * Hide all of the child Setting Views.
   * @method collapse
   */
  collapse () {
    // console.debug('settings:collapse')

    this.speed.hide()
    this.word.hide()

    this.dispatch('collapse')
  }

  /**
   * This is what happens when for the speed child.
   * @method _speed
   */
  _speed () {
    // console.debug('settings:_speed')

    this.collapse()
    this.speed.show()

    this.dispatch('show')
  }

  /**
   * This is what happens when for the word child.
   * @method _word
   */
  _word () {
    // console.debug('settings:_word')

    this.collapse()
    this.word.show()

    this.dispatch('show')
  }

  /**
   * This is what happens when for the speed child.
   * @method _navigate
   */
  _navigate (element) {
    let speed
    let word

    /**
     * Handle potential speed navigation.
     * @method speed
     */
    speed = () => {
      if (element.classList.contains('speed')) {
        this._speed()
      }
    }

    word = () => {
      if (element.classList.contains('word')) {
      // if (reference === '#readerly-settings-word') {
        this._word()
      }
    }

    speed()
    word()

    this.dispatch('navigate')
  }
}

export default Settings
