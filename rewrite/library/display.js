import Playback from './playback'

let $browser = chrome || browser

let rewindImageSource
let settingsImageSource

function url (it) {
  if (typeof browser === 'undefined') {
    return chrome.runtime.getURL(it)
  } else {
    return browser.extension.getURL(it)
  }
}

settingsImageSource = url('images/settings.png')
rewindImageSource = url('images/rewind.png')


function shadow (elevation) {
  let sketch

  sketch = {}

  sketch['2dp'] =
    [
      ['0', '0', '4px', rgba(0, 0, 0, .14)],
      ['0', '3px', '4px', rgba(0, 0, 0, .12)],
      ['0', '1px', '5px', rgba(128, 128, 128, .20)]
    ].map(it => it.join(' ')).join(', ')

  return sketch[elevation]
}

let stylesheet = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '80px',
  background: rgba(255, 255, 255, 0.8),
  boxShadow: shadow('2dp'),
  display: 'grid',
  justifyItems: 'center',
  alignItems: 'center',
  gridTemplateRows: '4px 1fr',
  gridTemplateColumns: '24px min-content min-content 1fr min-content 24px',
  gridColumnGap: '8px',
  progress: {
    gridColumnStart: '1',
    gridColumnEnd: 'span 6',
    width: '100%',
    height: '100%',
    WebkitAppearance: 'none',
    background: 'white',
  },
  button: {
    height: '36px',
    borderRadius: '2px',
    paddingLeft: '16px',
    paddingRight: '16px',
    outline: 'none',
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderWidth: '0',
    minWidth: '88px',
    boxShadow: shadow('2dp')
  },
  'button.settings': {
    gridColumnStart: '2',
    gridColumnEnd: 'span 1',
    backgroundImage: `url("${settingsImageSource}")`,
    backgroundSize: '32px 32px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minWidth: '36px',
    width: `${36 + 16 * 2}px`,
    content: '',
    color: 'transparent'
  },
  'button.speed': {
    gridColumnStart: '3',
    gridColumnEnd: 'span 1',
    backgroundImage: `url("${rewindImageSource}")`,
    backgroundSize: '32px 32px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minWidth: '36px',
    width: `${36 + 16 * 2}px`,
    content: '',
    color: 'transparent'
  },
  'button.close': {},
  'div.playback': {
    justifySelf: 'stretch',
    boxShadow: shadow('2dp')
  }
}

function rgba(red, green, blue, alpha) {
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

class Display {
  constructor () {
    this.filter = new WeakMap()
    this.zIndex = new WeakMap()

    // console.debug('generate display')
    this.element = this.generate()
    // console.debug('element', this.element)

    Display.styleize(this.element, stylesheet)
    // console.debug('The display has been stylized.')

  }

  generate () {
    let element
    let progressElement
    let settingsElement
    let speedElement
    let playbackElement
    let closeElement
    let checkElement

    let settingsText
    let speedText
    let closeText

    element = document.createElement('section')

    progressElement = document.createElement('progress')
    settingsElement = document.createElement('button')
    speedElement = document.createElement('button')
    closeElement = document.createElement('button')
    checkElement = document.createElement('input')
    playbackElement = document.createElement('div')

    settingsText = document.createTextNode('Settings')
    speedText = document.createTextNode('Speed')
    closeText = document.createTextNode('Close')

    settingsElement.appendChild(settingsText)
    speedElement.appendChild(speedText)
    closeElement.appendChild(closeText)

    element.appendChild(progressElement)
    element.appendChild(settingsElement)
    element.appendChild(speedElement)
    element.appendChild(playbackElement)
    element.appendChild(closeElement)

    // settingsElement.setAttribute('src', settingsImageSource)
    // speedElement.setAttribute('src', rewindImageSource)
    // element.appendChild(checkElement)

    // checkElement.setAttribute('type', 'checkbox')
    progressElement.setAttribute('value', '50')
    progressElement.setAttribute('max', '100')

    settingsElement.classList.add('settings')
    speedElement.classList.add('speed')
    playbackElement.classList.add('playback')
    closeElement.classList.add('close')
    // checkElement.classList.add('check')

    settingsElement.addEventListener('click', () => this._settings())
    speedElement.addEventListener('click', () => this._speed())
    closeElement.addEventListener('click', () => this._close())

    element.id = 'readerly'

    function scope (element) {
      let index

      element.classList.add('readerly')
      element.style.initial = 'all'

      for (index = 0; index < element.children.length; index++) {
        scope(element.children[index])
      }
    }
    // console.debug('run scope')
    scope(element)
    // console.debug('finish scope')

    return element
  }

  _settings () {}
  _speed () {}
  _close () {
    this.blur()
    this.close()
  }

  close () {
    document.body.removeChild(this.element)
  }

  open (playback) {

    document.body.appendChild(this.element)
  }

  stream (content) {
    let playbackElement
    let span
    let text

    playbackElement = this.element.querySelector('.playback')
    span = document.createElement('span')
    text = document.createTextNode(content.text.match(/\w+/)[0])

    span.appendChild(text)
    playbackElement.appendChild(span)
  }

  static styleize (it, styles) {
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
      this.stylesheet.insertRule('progress::-webkit-progress-bar { background: #8C9EFF; }')
      this.stylesheet.insertRule('progress::-webkit-progress-value { background: #3D5AFE; }')
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

    function assign (key, value) {
      key = key.replace(/([A-Z])/g, it => '-' + it.toLowerCase())

      if (typeof value === 'string') {
        it.style[key] = value
      }
    }

    function find (key, value) {
      if (typeof value === 'object') {
        it.querySelectorAll(key).forEach(it => Display.styleize(it, value))
      }
    }
  }

  focus () {
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
        zIndexMaximum = Math.max(parseInt(it.style['z-index'], 10), zIndexMaximum)
      }
    })

    this.element.style['z-index'] = zIndexMaximum + 1
  }

  blur () {
    document.querySelectorAll('body > *').forEach(it => {
      if (this.filter.has(it)) {
        it.style.filter = this.filter.get(it)
      }
    })
  }
}


export default Display
