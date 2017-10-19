import Dispatcher from '../utilities/dispatcher'

class Navigation extends Dispatcher {
  constructor (it) {
    let elements
    // let list

    super()

    this.element = it

    // console.debug('navigation:constructor', 'fetch elements')

    elements = it.querySelectorAll('a')

    // console.debug('navigation:constructor', 'elements', elements)

    this.elements = elements

    this.install()
    // list = [...elements]

    // console.debug('navigation:constructor', 'list', list)

    // list.forEach(item => {
      // console.debug('navigation:constructor', 'list.forEach', 'item', item)

      // item.addEventListener('click', () => this._click(item))
    // })

    // let element
    //
    // element = document.createElement('nav')
    // element.classList.add('navigation')
    //
    // this.element = element
  }

  click (element) {
    this.dispatch('click', element)
  }

  install () {
    let list

    list = [...this.elements]

    list.forEach(it => {
      it.addEventListener('click', () => this.click(it))
    })
  }
}

export default Navigation
