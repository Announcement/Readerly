import Tab from '../view/tab'
import Panel from '../view/panel'

class SettingsPanel extends Panel {
  constructor(name) {
    super()

    this.element = document.createElement('form')
    this.tab = new Tab(name)
  }

  add(option) {
    this.element.appendChild(option.element)
  }
}

export default SettingsPanel
