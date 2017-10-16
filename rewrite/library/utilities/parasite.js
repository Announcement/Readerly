class Parasite {
  constructor(element) {
    this.element = element
  }

  static getText(it) {
    let childNodes
    let child
    let index
    let list

    let blacklist

    childNodes = it.childNodes
    list = []
    blacklist = []
    blacklist.push('script')
    blacklist.push('style')
    blacklist.push('pre')
    blacklist.push('code')
    blacklist.push('template')

    if (blacklist.indexOf(it.tagName.toLowerCase()) !== -1) {
      return list
    }

    for (index = 0; index < childNodes.length; index++) {
      child = childNodes[index]

      if (child.nodeType === 1) {
        list = list.concat(Parasite.getText(child))
      }

      if (child.nodeType === 3) {
        list.push({ name: it.tagName, content: child.textContent })
      }
    }

    return list
  }
}

export default Parasite
