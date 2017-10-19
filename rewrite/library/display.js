import Settings from './settings'
import Playback from './playback'

import body from './display/body'
import head from './display/head'

import address from './utilities/address'
// import exists from './utilities/exists'

import zIndex from './utilities/css/z-index'

// let $browser = chrome || browser
//
// function url (it) {
//   if (typeof browser === 'undefined') {
//     return chrome.runtime.getURL(it)
//   } else {
//     return browser.extension.getURL(it)
//   }
// }

// function number (it) {
//   return parseInt(it, 10)
// }

class Display {
  /**
   *
   * @see {@link address}
   * @see {@link _load}
   * @see {@link stylize}
   */
  constructor () {
    // let settingsElement
    // let playbackElement
    let element

    // let settings
    // let playback

    this.filter = new WeakMap()
    this.zIndex = new WeakMap()

    // this.destroy(document.querySelector('iframe#readerly'))

    // element = document.createElement('object')
    element = document.createElement('iframe')

    // element.setAttribute('src', 'about:blank')
    // element.setAttribute('type', 'text/html')
    // element.setAttribute('data', address('display.html'))

    element.setAttribute('src', address('display.html'))
    element.addEventListener('load', () => this._load())

    // element.setAttribute('sandbox', 'allow-same-origin')
    // element.setAttribute('referrerpolicy', 'unsafe-url allow-same-origin')

    element.id = 'readerly'

    this.element = element
    this.initialized = false

    // console.debug(element.contentDocument)
    // console.debug(element.contentWindow.document)

    // this.settings = new Settings()
    // this.playback = new Playback()

    Display.stylize(this.element)
  }

  // destroy (it) {
  //   if (exists(it)) {
  //     it.parentNode.removeChild(it)
  //   }
  //
  //   if (exists(this.element) && exists(this.element.parentNode)) {
  //     this.element.parentNode.removeChild(this.element)
  //   }
  // }

  listen () {
    let $window
    let $document

    $window = this.element.contentWindow
    $document = this.element.contentDocument

// console.debug('display:listen')

    $document.head.appendChild(head())
    $document.body.appendChild(body())

// console.log($document.readyState)
// console.log($window, $document)
// console.log($document)
  }

  /**
   *
   * @see {@link resize}
   * @see {@link Playback}
   * @see {@link Settings}
   * @see {@link _settings}
   */
  _load () {
    let element

    let $window
    let $document

    let playbackElement
    let settingsElement

    let playback
    let settings

    let onAppend
    let onRemove
    let onShow
    let onToggle
    let onCollapse

    element = this.element

    $window = element.contentWindow
    $document = element.contentDocument

// console.debug('display:_load')

    $window.addEventListener('resize', () => this.resize())
    $window.requestAnimationFrame(() => this.resize())

    // this.refresh()

    playbackElement = $document.querySelector('section.playback')
    settingsElement = $document.querySelector('section.settings')

    playback = new Playback(playbackElement)
    settings = new Settings(settingsElement)


    this.playback = playback
    this.settings = settings

    settings.on('change', () => {
// console.debug('display - settings on change')
      // playback.configure(configuration)
    })

    onAppend = () => {
// console.debug('display:_load', 'onAppend()')

      this.resize()
    }

    onRemove = () => {
// console.debug('display:_load', 'onRemove()')

      this.resize()
    }

    onShow = () => {
// console.debug('display:_load', 'onShow()')

      this.resize()
    }

    onToggle = () => {
// console.debug('display:_load', 'onToggle()')

      this.resize()
    }

    onCollapse = () => {
// console.debug('display:_load', 'onCollapse()')

      this.resize()
    }

    settings.on('append', onAppend)
    settings.on('remove', onRemove)
    settings.on('show', onShow)
    settings.on('toggle', onToggle)
    settings.on('collapse', onCollapse)

    $document.querySelector('button.settings')
      .addEventListener('click', () => this._settings())

    playback.full()
  }

  _ready ($document, $window) {
// console.log('loaded')

    // let settingsButton
    // let speedButton
    // let closeButton
    // let progressElement
    //
    // element
    //   .querySelector('button.settings')
    //   .addEventListener('click', () => this._settings())
    //
    // element
    //   .querySelector('button.speed')
    //   .addEventListener('click', () => this._speed())
    //
    // element
    //   .querySelector('button.close')
    //   .addEventListener('click', () => this._close())
    //
    // element
    //   .querySelector('progress')
    //   .addEventListener('click', it => this._progress(it))
  }

  _settings () {
// console.debug('display:_settings')
    this.settings.toggle()
    this.resize()
  }

  _speed () {
// console.debug('display:_speed')
  }

  _close () {
// console.debug('display:_close')
    this.disable()
  }

  _progress (e) {
    // let progress
    // let percent
// console.debug('display:_progress')

    // progress = this.element.querySelector('progress')
    // console.log(progress.clientX, progress.clientWidth, e.clientX)
    // percent = e.clientX / progress.clientWidth
    // progress.setAttribute('value', parseInt(progress.getAttribute('min'), 10) * percent)


    // console.log(percent)
    // console.log(this.element)
    // console.log(e.x, e.y, progress.clientX, progress.clientWidth - prog)
  }

  resize () {
    let element

    let $window
    let $document

    let style

    element = this.element

    $window = element.contentWindow
    $document = element.contentDocument

// console.debug('display:resize')

    style = $window.getComputedStyle($document.body)

    element.style.height = style.getPropertyValue('height')

    this.refresh()
  }

  refresh () {
    // let userAgent
    // userAgent = window.navigator.userAgent
    // console.debug('display:refresh')
    //
    // if (/firefox\/5[78]/i.test(userAgent)) {
    //   document.write('')
    // }
  }

  toggle (it) {
// console.debug('display:toggle')

    return !this.enabled ? this.enable(it) : this.disable(it)
  }

  get enabled () {
// console.debug('display:enabled')

    return document.body.contains(this.element)
  }

  enable (it) {
// console.debug('display:enable')

    // if (it) this.stream(it)

    this.open()
    this.focus()
  }

  disable () {
// console.debug('display:disable')

    this.blur()
    this.close()
  }

  close () {
// console.debug('display:close')

    this.remove()
    this.stop()
  }

  remove () {
// console.debug('display:remove')

    document.body.removeChild(this.element)
  }

  append () {
// console.debug('display:append')

    document.body.appendChild(this.element)
  }

  stop () {
// console.debug('display:stop')

    this.timeout && clearTimeout(this.timeout)
  }

  initialize () {
// console.debug('display:initialize')

    // if (!this.initialized) {
    //   this.listen()
    // }
    //
    // this.initialized = true
  }

  open (playback) {
// console.debug('display:open')

    this.append()
    // this.initialize()
  }

  stream (content) {
    // let playbackElement
    // let progressElement
    // let words
    // let read
    //
    // let span
    // let text
    //
    // let maximum
    //
    // console.debug('display:stream')
    //
    // playbackElement = this.element.querySelector('.playback')
    // progressElement = this.element.querySelector('progress')
    //
    // console.debug('display:stream', 'content.text', content.text)
    //
    // words = content.text.split(/\s+/g)
    // maximum = words.length
    //
    // progressElement.setAttribute('max', maximum)
    //
    // read = () => {
    //   let span
    //   let text
    //   let value
    //
    //   console.debug('display:stream', 'read()')
    //
    //   value = parseInt(progressElement.getAttribute('value'), 10)
    //
    //   removeChildren(playbackElement)
    //
    //   span = document.createElement('span')
    //   text = document.createTextNode(words[value++])
    //
    //   progressElement.setAttribute('value', value)
    //   console.log(value, maximum)
    //
    //   span.appendChild(text)
    //   playbackElement.appendChild(span)
    //
    //   if (words.length > value) {
    //     this.timeout = setTimeout(read, 1000 * 60 / 200)
    //   }
    // }
    //
    // read()
    // removeChildren(playbackElement)
    //
    // function removeChildren (element) {
    //   console.debug('display:stream', 'removeChildren()')
    //
    //   while (element.firstChild) {
    //     element.removeChild(element.firstChild)
    //   }
    // }
  }

  static stylize (it) {
// console.debug('Display:stylize')

    it.style.position = 'fixed'
    it.style.top = '0'
    it.style.left = '0'
    it.style.width = '100%'
    it.style.outline = 'none'
    it.style.border = '0 solid transparent'
    // it.style.right = '0'
    // it.style.width = '100%'

    it.style['overflow-x'] = 'hidden'
    it.style['overflow-y'] = 'hidden'

  }

  focus () {
// console.debug('display:focus')

    document.querySelectorAll('body > *').forEach(it => {
// console.debug('display:focus', 'querySelectorAll forEach')

      if (it !== this.element) {
        this.filter.set(it, it.style.filter)
        it.style.filter = 'blur(4px)'
      }
    })

    this.element.style['z-index'] = zIndex.call(this) + 1
  }

  blur () {
// console.debug('display:blur')

    document.querySelectorAll('body > *').forEach(it => {
// console.debug('display:blur', 'querySelectorAll', 'forEach')

      if (this.filter.has(it)) {
        it.style.filter = this.filter.get(it)
      }
    })
  }
}

export default Display
