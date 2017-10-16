class NavigationElement {
  constructor(string) {
    let element
    let text

    element = document.createElement('a')
    text = document.createTextNode(string)

    element.appendChild(text)
    element.classList.add('navigation-element')

    this.element = element
  }
}

export default NavigationElement
