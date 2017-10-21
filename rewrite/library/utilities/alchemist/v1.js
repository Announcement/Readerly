import exists from '../exists'
import * as matcher from '../matcher'
import what from '../get-type'

export default function alchemist (plugins) {
  let $starts = matcher.begins

  return use

  function using (it) {
    if (what(it) === 'string' && plugins.hasOwnProperty(it)) {
      return plugins[it]
    }

    return it
  }

  function use (element) {
    let history
    let object
    let attribute

    history = []

    object = {}
    attribute = {}

    object.attribute = {}
    object.is = {}

    object.element = element

    object.is.a = is
    object.is.an = is

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
        object.set(using(plugin)(text))
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
    attribute.fix = (it = null, problem) => {
      let name
      let value
      let repair

      if (!problem && it) {
        problem = it
        it = null
      }

      name = ensure(it)
      repair = using(problem)
      value = object.get(name)

      object.set(name, repair(value))
    }

    object.attribute = attribute
    return object

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

    function is (tagName) {
      tagName = tagName.toLowerCase()
        .replace(/image/g, 'img')
        .replace(/anchor/g, 'a')

      return element.tagName.toLowerCase() === tagName
    }

  }
}
