import * as data from './utilities/storage'
import stylesheet from './settings/stylesheet'

import Tabs from './view/tabs'

import SpeedSettings from './settings/speedsettings'
import WordSettings from './settings/wordsettings'

function scope(element) {
  let index

  element.classList.add('readerly')
  element.classList.add('settings')

  element.style.initial = 'all'

  for (index = 0; index < element.children.length; index++) {
    scope(element.children[index])
  }

  return element
}

class Settings {
  /**
   * @namespace
   *
   * @property {Tabs} tabs
   * @property {Array.<Panel>} panels
   */
  constructor() {
    let speedSettings
    let wordSettings

    this.tabs = new Tabs()
    this.panels = []
    this.element = document.createElement('section')

    speedSettings = new SpeedSettings()
    wordSettings = new WordSettings()

    this.panels.push(speedSettings)
    this.panels.push(wordSettings)

    this.tabs.add(speedSettings.tab)
    this.tabs.add(wordSettings.tab)

    this.element.appendChild(this.tabs.element)
    this.panels.forEach(it => this.element.appendChild(it.element))

    this.element = scope(this.element)
  }

  toggle() {
    !this.visible ? this.show() : this.hide()
  }

  show() {
    this.element.display = 'block'
  }

  hide() {
    this.element.display = 'none'
  }
}

export default Settings
