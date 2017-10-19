import Navigation from './navigation'

class Tabs extends Navigation {
  constructor () {
    super()

    this.element.classList.add('tabs')
  }

  add (tab) {
    this.element.appendChild(tab.element)
  }
}

export default Tabs
