import NavigationElement from './navigationelement'

class Tab extends NavigationElement {
  constructor (string) {
    super(string)

    this.element.classList.add('tab')
  }
}

export default Tab
