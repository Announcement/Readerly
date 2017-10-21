import Dispatcher from '../utilities/dispatcher'

class Panel extends Dispatcher {
  constructor (it) {
    let parent
    let element

    element = it
    parent = it.parentNode

    super()
    
    this.element = element
    this.parent = parent
  }

  get enabled () {
    return this.parent.contains(this.element)
  }

  capture (navigation) {

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
  remove () {
    this.parent.removeChild(this.element)
  }
  append () {
    this.parent.appendChild(this.element)
  }
}

export default Panel
