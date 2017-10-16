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
    this.element.appendChild(this.panels[0].element)
    // this.panels.forEach(it => this.element.appendChild(it.element))

    this.panels.forEach(panel => {
      panel.tab.element.addEventListener('click', () => {
        this.panels.forEach(it => {
          if (this.element.contains(it.element)) {
            this.element.removeChild(it.element)
          }
        })

        this.element.appendChild(panel.element)
      })
    })

    this.element = scope(this.element)
  }
}

export default Settings
