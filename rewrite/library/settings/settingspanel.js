// import Tab from '../view/tab'
import Panel from '../view/panel'

class SettingsPanel extends Panel {
  constructor (it) {
    let parent

    parent = it.parentNode

    super()

// console.debug(this.constructor.name, '<-', 'SettingsPanel')

    this.element = it
    this.parent = parent

    this.remove()
  }

  hide () {
    this.enabled && this.remove()
  }

  show () {
    !this.enabled && this.append()
  }

  toggle () {
    !this.enabled ? this.append() : this.remove()
  }

  get enabled () {
    return this.parent.contains(this.element)
  }

  remove () {
    this.parent.removeChild(this.element)
  }

  append () {
    this.parent.appendChild(this.element)
  }
  // add(option) {
  //   this.element.appendChild(option.element)
  // }
}

export default SettingsPanel
