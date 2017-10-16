import stylesheet from './display/stylesheet'
import generate from './display/generate'
import Settings from './settings'

let $browser = chrome || browser

class Display {
  constructor() {
    this.filter = new WeakMap()
    this.zIndex = new WeakMap()

    this.element = document.createElement('section')
    this.element.classList.add('display')

    this.settings = new Settings()

    this.element.appendChild(generate())
    this.element.appendChild(this.settings.element)
    this.element.id = 'readerly'

    console.debug(this.element)

    this.listen()

    Display.styleize(this.element, stylesheet)
    this.element.removeChild(this.settings.element)
  }

  listen() {
    let element

    element = this.element

    element
      .querySelector('button.settings')
      .addEventListener('click', () => this._settings())

    element
      .querySelector('button.speed')
      .addEventListener('click', () => this._speed())

    element
      .querySelector('button.close')
      .addEventListener('click', () => this._close())
  }

  _settings() {
    if (this.element.contains(this.settings.element)) {
      this.element.removeChild(this.settings.element)
    } else {
      this.element.appendChild(this.settings.element)
    }
  }

  _speed() {}
  _close() {
    this.blur()
    this.close()
  }

  toggle (it) {
    if (document.body.contains(this.element)) {
      this.close()
      this.blur()
    } else {
      this.open()
      this.focus()
      
      if (it) this.stream(it)
    }
  }

  close() {
    document.body.removeChild(this.element)

    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  }

  open(playback) {
    document.body.appendChild(this.element)
  }

  stream(content) {
    let playbackElement
    let progressElement
    let words
    let read

    let span
    let text

    let value
    let maximum

    playbackElement = this.element.querySelector('.playback')
    progressElement = this.element.querySelector('progress')

    console.debug(content.text)

    words = content.text.split(/\s+/g)
    maximum = words.length
    value = 0

    progressElement.setAttribute('max', maximum)
    progressElement.setAttribute('value', value)

    read = () => {
      let span
      let text

      while (playbackElement.firstChild) {
        playbackElement.removeChild(playbackElement.firstChild)
      }

      span = document.createElement('span')
      text = document.createTextNode(words[value++])

      progressElement.setAttribute('value', value)
      console.log(value, maximum)

      span.appendChild(text)
      playbackElement.appendChild(span)

      if (words.length > value) {
        this.timeout = setTimeout(read, 1000 * 60 / 200)
      }
    }

    read()

    while (playbackElement.firstChild) {
      playbackElement.removeChild(playbackElement.firstChild)
    }
  }

  static styleize(it, styles) {
    if (!it) return false

    let stylesheetElement
    let stylesheetNode

    // console.debug('styleize')

    stylesheetElement = document.createElement('style')

    document.head.appendChild(stylesheetElement)

    stylesheetNode = document.styleSheets[document.styleSheets.length - 1]

    this.stylesheet = stylesheetNode

    // console.debug('insert rules')

    // these are to override the default progress bar in chrome since they look like garbage.
    if (typeof browser === 'undefined') {
      this.stylesheet.insertRule(
        'progress::-webkit-progress-bar { background: #8C9EFF; }'
      )
      this.stylesheet.insertRule(
        'progress::-webkit-progress-value { background: #3D5AFE; }'
      )
    }

    // console.debug('Read virtual stylesheet')

    Object.keys(styles).forEach(key => {
      let value

      value = styles[key]

      if (value.constructor === Array) {
        value = value.join(' ')
      }

      // console.debug(styles, key)

      assign(key, value)
      find(key, value)
    })

    function assign(key, value) {
      key = key.replace(/([A-Z])/g, it => '-' + it.toLowerCase())

      if (typeof value === 'string') {
        it.style[key] = value
      }
    }

    function find(key, value) {
      if (typeof value === 'object') {
        it.querySelectorAll(key).forEach(it => Display.styleize(it, value))
      }
    }
  }

  focus() {
    let zIndexMaximum

    zIndexMaximum = 0

    document.querySelectorAll('body > *').forEach(it => {
      if (it !== this.element) {
        this.filter.set(it, it.style.filter)
        it.style.filter = 'blur(4px)'
      }
    })

    document.querySelectorAll('body *').forEach(it => {
      if (it !== this.element && it.style['z-index']) {
        zIndexMaximum = Math.max(
          parseInt(it.style['z-index'], 10),
          zIndexMaximum
        )
      }
    })

    this.element.style['z-index'] = zIndexMaximum + 1
  }

  blur() {
    document.querySelectorAll('body > *').forEach(it => {
      if (this.filter.has(it)) {
        it.style.filter = this.filter.get(it)
      }
    })
  }
}

export default Display
