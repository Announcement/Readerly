import Settings from './settings'
import Playback from './playback'
import address from './utilities/address'
import zIndex from './utilities/css/z-index'
import Request from './utilities/request'
import rebase from './utilities/rebase'

class Display {
  /**
   *
   * @see {@link address}
   * @see {@link _load}
   * @see {@link stylize}
   */
  constructor () {
    let element

    let chrome
    let firefox

    let contents
    let sentences

    this.filter = new WeakMap()
    this.zIndex = new WeakMap()

    contents = Playback.getText(document.body)
    sentences = Playback.getSentences(contents)

    element = document.createElement('iframe')
    element.setAttribute('height', 80)

    element.id = 'readerly'

    this.element = element
    this.contents = contents
    this.sentences = sentences
    this.initialized = false

    /**
     * load display.html to the iframe with ajax.
     * @method chrome
     */
    chrome = () => {
      element.setAttribute('src', 'about:blank')
      element.addEventListener('load', () => this._chrome())
    }

    /**
     * Load display.html to the iframe automatically.
     * @method firefox
     */
    firefox = () => {
      element.setAttribute('src', address('display.html'))
      element.addEventListener('load', () => this._firefox())
    }

    this.stylesheet()

    typeof browser === 'undefined' ? chrome() : firefox()
  }

  get enabled () {
    // console.debug('display:enabled')

    return document.body.contains(this.element)
  }

  /**
   * Load the extension styles with a stylesheet injected into the page document head.
   *
   * @async
   * @method stylesheet
   */
  async _chrome () {
    let $window
    let $document

    let remote
    let element

    element = this.element

    $window = element.contentWindow
    $document = element.contentDocument || $window.document

    remote = await Request.preload(address('display.html'))

    rebase(remote)

    $document.head.innerHTML = remote.head.innerHTML
    $document.body.innerHTML = remote.body.innerHTML

    this.resize()
    this._load()
  }
  async _firefox () {
    this._load()
  }

  async stylesheet () {
    let request
    let element

    element = document.createElement('style')
    request = await Request.get(address('style/extension.css'))
    element.textContent = request.responseText

    document.head.appendChild(element)
  }

  _load () {
    let element

    let $window
    let $document

    let playbackElement
    let settingsElement
    let outputElement

    let playback
    let settings

    element = this.element

    $window = element.contentWindow
    $document = element.contentDocument

    $window.addEventListener('resize', () => this.resize())

    playbackElement = $document.querySelector('section.playback')
    settingsElement = $document.querySelector('section.settings')
    outputElement = playbackElement.querySelector('div.text')

    Playback.readWord(this.sentences[0][0], outputElement)

    playback = new Playback(playbackElement)
    settings = new Settings(settingsElement)

    $window.requestAnimationFrame(() => this.resize())

    this.playback = playback
    this.settings = settings

    settings.on('change', configuration => {
      playback.configure(configuration)
    })

    settings.on('click', () => this.resize())
    settings.on('append', () => this.resize())
    settings.on('remove', () => this.resize())
    settings.on('show', () => this.resize())
    settings.on('toggle', () => this.resize())
    settings.on('collapse', () => this.resize())
    settings.on('navigate', () => this.resize())

    $document.querySelector('button.settings')
      .addEventListener('click', () => this._settings())

    $document.querySelector('button.close')
      .addEventListener('click', () => this._close())

    $document.querySelector('button.speed')
      .addEventListener('click', () => this._speed())

    playback.full()
  }
  _ready ($document, $window) {}
  _settings () {
    this.settings.toggle()
  }
  _speed () {
    this.playback.blink()
  }
  _close () {
    this.disable()
  }
  _progress (e) {}

  resize () {
    let element

    let $window
    let $document

    let style

    element = this.element

    $window = element.contentWindow
    $document = element.contentDocument

    window.requestAnimationFrame(() => {
      style = $window.getComputedStyle($document.body)
      element.style.height = style.getPropertyValue('height')
      this.refresh()
    })
  }
  refresh () {}
  toggle () {
    return !this.enabled ? this.enable() : this.disable()
  }
  enable () {
    this.open()
    this.focus()
  }
  disable () {
    this.blur()
    this.close()
  }
  close () {
    this.remove()
    this.stop()
  }
  remove () {
    document.body.removeChild(this.element)
  }
  append () {
    document.body.appendChild(this.element)
    this.element.style.height = '80px'
    this.resize()
  }
  stop () {
    this.timeout && clearTimeout(this.timeout)
  }
  initialize () {}
  open (playback) {
    this.append()
    this.resize()
  }
  stream (content) {}
  focus () {
    document.querySelectorAll('body > *').forEach(it => {
      if (it !== this.element) {
        this.filter.set(it, it.style.filter)
        it.style.filter = 'blur(4px)'
      }
    })

    this.element.style['z-index'] = zIndex.call(this) + 1
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
