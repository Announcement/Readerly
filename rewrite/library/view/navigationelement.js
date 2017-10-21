import Dispatcher from '../utilities/dispatcher'

class NavigationElement extends Dispatcher {
  constructor (it) {
    super()

    this.element = it
    this.install()
  }

  _click (event) {
    this.dispatch('click', this.element)
    this.dispatch('navigate', this.element)

    event.preventDefault()

    return false
  }

  install () {
    this.element.addEventListener('click', event => this._click(event))
  }
}

export default NavigationElement
