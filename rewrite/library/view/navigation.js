import Dispatcher from '../utilities/dispatcher'
import NavigationElement from './navigationelement'

class Navigation extends Dispatcher {
  constructor (item) {
    let nodes
    let elements

    super()

    nodes = [... item.querySelectorAll('a')]
    elements = nodes.map(it => new NavigationElement(it))

    this.elements = elements
    this.nodes = nodes

    this.install()
  }

  attach (element) {
    element.on('click', it => this._click(it))
    element.on('navigate', it => this._navigate(it))
  }
  install () {
    this.elements.forEach(it => this.attach(it))
  }

  _click (it) {
    this.dispatch('click', it)
  }
  _navigate (it) {
    this.dispatch('navigate', it)
  }
}

export default Navigation
