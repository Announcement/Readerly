import address from './address'
import exists from './exists'

// let $has
// let $attribute
let $starts

// $has = element => attribute =>
//   element.hasAttribute(attribute)

// $attribute = element => attribute =>
//   element.getAttribute(attribute)

$starts = haystack => needle =>
  haystack.indexOf(needle) === 0

function use (element) {
  let object
  let history

  object = {}
  history = []

  function previous () {
    return history[history.length - 1]
  }

  function ensure (attribute) {
    if (exists(attribute)) {
      history.push(attribute)
    } else {
      attribute = previous()
    }

    return attribute
  }

  function _is (tagName) {
    tagName = tagName.toLowerCase()
      .replace(/image/g, 'img')
      .replace(/anchor/g, 'a')

    return element.tagName.toLowerCase() === tagName
  }

  object.is = { a: _is, an: _is }

  object.get = attribute => {
    attribute = ensure(attribute)

    object.value = element.getAttribute(attribute)

    return object.value
  }

  object.set = (attribute = null, value) => {
    attribute = ensure(attribute)

    element.setAttribute(attribute, value)

    object.value = value
  }

  object.has = attribute => {
    attribute = ensure(attribute)

    return element.hasAttribute(attribute)
  }

  object.rebase = attribute => {
    attribute = ensure(attribute)
    object.get(attribute)
    object.set(attribute, address(object.value))
  }

  object.begins = string => {
    object.get()
    return $starts(object.value)(string)
  }

  object.text = () => {
    return {
      replace: () => {
        return {
          with: () => {

          }
        }
      }
    }
  }

  return object
}

function rebase (it) {
  if (typeof it.tagName !== 'undefined') {
    rebaseLink(it)
    rebaseScript(it)
    rebaseStyle(it)
    rebaseImage(it)
    rebaseAnchor(it)
  }

  it.childNodes.forEach(rebase)
}


function rebaseLink (it) {
  it = use(it)

  if (it.is.a('link') && it.has('href')) {
    it.rebase()
  }
}

function rebaseScript (it) {
  it = use(it)

  if (it.is.a('script') && it.has('src')) {
    it.rebase()
  }
}

function rebaseStyle (it) {
  it = use(it)

  if (it.is.a('style')) {
    it.textContent = it.textContent.replace(
      /url\((['"]).+?\1\)/g,
      (result, quotation, uri) => {
        return `url(${quotation}${address(uri)}${quotation})`
      }
    )
  }
}

function rebaseImage (it) {
  it = use(it)

  if (it.is.an('image') && it.has('src')) {
    it.rebase()
  }
}

function rebaseAnchor (it) {
  it = use(it)

  if (it.is.an('anchor') && it.has('href') && !it.begins('#')) it.rebase()
}

export default rebase
