import Tab from '../view/tab'
import Tabs from '../view/tabs'
import Panel from '../view/panel'
import Navigation from '../view/navigation'
import NavigationElement from '../view/navigationelement'

import SettingsPanel from './settingspanel'
import WordSettings from './wordsettings'
import SpeedSettings from './speedsettings'
import Settings from '../settings'

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

export default function generate() {
  let element
  let settings

  let tabs

  let speedListItemElement
  let wordListItemElement
  let speedAnchorElement
  let wordAnchorElement
  let speedAnchorText
  let wordAnchorText

  element = document.createElement('section')
  settings = new Settings()

  element.appendChild(settings.tab.element)
  settings.panels.forEach(panel => element.appendChild(panel))

  return scope(element)
}
