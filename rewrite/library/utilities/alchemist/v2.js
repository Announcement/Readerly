import exists from '../exists'
import * as matcher from '../matcher'
import what from '../get-type'
import has from '../has'
import $children from '../each-child'

export default function alchemist (plugins) {
  return used

  function using (it) {
    return plugins[it] || it
  }

  function used (it) {
    let object
    let history

    let node

    let text
    let attribute
    let children

    object = {}
    text = {}
    attribute = {}
    children = {}
    children.fix = {}

    history = []

    node = it

    attribute.is = { a: is, an: is }

    attribute.has = (it) => {
      let name
      let value

      !(name = it) && (name = take('name'))
      value = node.getAttribute('value')

      history.push(name)

      return value
    }
    attribute.get = (it) => {
      let name
      let value

      !(name = it) && (name = take('name'))
      !(value = take('value')) && (value = node.getAttribute('value'))

      history.push({ name, value })

      return value
    }
    attribute.set = (it = null, value) => {
      let name

      name= !(name = it) && (name = take('name'))
      node.setAttribute(name, value)

      history.push({ name, value })
    }
    attribute.fix = (it = null, problem) => {
      let name
      let value
      let method

      name = !(name = it) && (name = take('name'))
      value = node.getAttribute(name)
      method = using(problem)

      node.setAttribute(name, method(value))
    }
    attribute.begins = (it = null, pattern) => {
      let name
      let value

      name = !(name = it) && (name = take('name'))
      value = node.getAttribute(name)

      return matcher.begins(value)(pattern)
    }
    attribute.matches = (it = null, pattern) => {
      let name
      let value

      name = !(name = it) && (name = take('name'))
      value = node.getAttribute(name)

      return matcher.matches(value)(pattern)
    }

    text.get = () => {
      return it.textContent
    }
    text.set = (value) => {
      this.textContent = value
    }
    text.fix = (problem) => {
      text.set(using(problem)(text.get()))
    }
    text.begins = (pattern) => {}
    text.matches = (pattern) => {}

    children.has = () => {
      if (node.hasChildNodes()) {
        return true
      }
      return false
      // return [... node.childNodes].has
      //   .map(it => it.trim())
    }
    children.find = query => {
      return {
        each: node.querySelectorAll(query).forEach
      }
    }
    children.each = callback => {
      let $each
      let $finish

      $each = () => $children(node).map(used).map(it => it.each(callback))
      $finish = () => exists(node.tagName) && callback(node)

      $each()
      $finish()
    }

    children.fix.each = problem =>
      children.each(using(problem))
    children.fix.only = query => problem =>
      children.find(query).each(using(problem))
    children.fix.text = problem =>
      $children(node).map(used).map(it => it.text.fix(problem))
    children.fix.attribute = (name, problem) => {
      let available = () => {
        return arguments.length === 1 &&
          what(name) === 'string' &&
          plugins.hasOwnProperty(name) &&
          history.length === 0
      }

      if (available()) {

      }

      $children(node).map(used).map(it => {
        it.sync(history)
        it.attribute.fix(name, problem)
      })
    }

    // children.fix = (problem) => {
    //   return {
    //     get each () { children.each(it => using(problem)(it)) },
    //     text () { children.each(it => used(it).text.fix(problem)) }
    //   }
    // }

    object.attribute = attribute
    object.text = text
    object.children = children
    object.sync = sync

    return object

    function sync (item) {
      let combine = array => additions =>
        ([array, item.forEach(it => has(history)(it) && array.push(it))])[0]

      history = combine(history, item)
    }
    function take (property) {
      let that

      that = history.shift()
      history.push(that)

      return that[name] || that
    }
    function is (tagName) {
      tagName = tagName.toLowerCase()
        .replace(/image/g, 'img')
        .replace(/anchor/g, 'a')

      return node.tagName.toLowerCase() === tagName
    }
  }
}
