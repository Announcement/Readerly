import address from './address'
import exists from './exists'
import url from './css/url'

let $starts

let using

let expression
let method

expression = {}
method = {}
using = {}

expression.url = /url\((['"]).+?\1\)/g

method.url = (match, quotation, uri) => url(uri, quotation)
using.url = it => it.replace(expression.url, method.url)

$starts = haystack => needle =>
  haystack.indexOf(needle) === 0

function use (element) {
  let object
  let history

  object = {}
  history = []

  object.element = element

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
    let text
    let object

    text = element.textContent

    object = {}

    object.set = it => {
      element.textContent = it || text
    }

    object.fix = plugin => {
      object.set((plugin || using[plugin])(text))
    }


    return object
  }

  object.each = callback => {
    let children
    let index

    children = element.children

    for (index = 0; index < children.length; index++) {
      use(children[index]).each(callback)
    }

    finish()

    function finish () {
      if (typeof element.tagName !== 'undefined') {
        callback(element)
      }
    }
  }

  return object
}

export default function (it) {
  use(it).each(rebase)
}

function rebase (it) {
  rebaseLink(it)
  rebaseScript(it)
  rebaseStyle(it)
  rebaseImage(it)
  rebaseAnchor(it)
}

function rebaseLink (it) {
  it = use(it)

  if (it.is.a('link') && it.has('href')) it.rebase()
}

function rebaseScript (it) {
  it = use(it)

  if (it.is.a('script') && it.has('src')) it.rebase()
}

function rebaseStyle (it) {
  it = use(it)

  if (it.is.a('style')) it.text.fix('url')
}

function rebaseImage (it) {
  it = use(it)

  if (it.is.an('image') && it.has('src')) it.rebase()
}

function rebaseAnchor (it) {
  it = use(it)

  if (it.is.an('anchor') && it.has('href') && !it.begins('#')) it.rebase()
}
