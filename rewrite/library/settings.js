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
  }

  /**
   * Check if the settigns view is enabled
   * @returns {boolean} Representing whether or not the panel is visible.
   */
  get enabled () {
    return this.parent.contains(this.element)
  }

  /**
   * Get configuration from each of its children's settings.
   * @returns {object} Populated with properties pertaining of all available settings.
   */
  get configuration () {
    let configuration

    configuration = {}

    Object.assign(configuration, this.speed.configuration)
    Object.assign(configuration, this.words.configuration)

    return configuration
  }

  /**
   * Disable if enabled or enable if disabled
   * @method toggle
   */
  toggle () {
    if (this.enabled === false) {
      this.append()
    } else {
      this.remove()
    }
  }

  /**
   * Remove the Settings View from its parent.
   * @method remove
   */
  remove () {
    this.parent.removeChild(this.element)

    this.dispatch('remove')
  }

  /**
   * Append the Settings View from its parent.
   * @method append
   */
  append () {
    this.parent.appendChild(this.element)

    this.dispatch('append')
  }

  /**
   * Hide all of the child Setting Views.
   * @method collapse
   */
  collapse () {
    this.speed.hide()
    this.word.hide()

    this.dispatch('collapse')
  }

  /**
   * This is what happens when for the speed child.
   * @method _speed
   */
  _speed () {
    this.collapse()
    this.speed.show()

    this.dispatch('show')
  }

  /**
   * This is what happens when for the word child.
   * @method _word
   */
  _word () {
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
        this._word()
      }
    }

    speed()
    word()

    this.dispatch('navigate')
  }
}

export default Settings
