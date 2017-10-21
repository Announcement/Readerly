import Display from './library/display'

import getBrowser from './library/utilities/get-browser'
import exists from './library/utilities/exists'

let $browser
let display

main()

function onMessage (request, sender, sendResponse) {
  browserAction()
  commands()
  runtime()

  function browserAction () {
    if (request.message.indexOf('browserAction') === 0) {
      onClicked()
    }

    function onClicked () {
      if (request.message === 'browserAction:onClicked') {
        display.toggle()
      }
    }
  }

  function commands () {
    if (request.message.indexOf('commands') === 0) {
      onCommand()
    }

    function onCommand () {
      if (request.message === 'commands:onCommand') {}
    }
  }

  function runtime () {
    if (request.message.indexOf('runtime') === 0) {
      onUpdateAvailable()
      onSuspend()
    }

    function onUpdateAvailable () {
      if (request.message === 'runtime:onUpdateAvailable') {}
    }

    function onSuspend () {
      if (request.message === 'runtime:onSuspend') {}
    }
  }
}

function listen () {
  let onMessageCache

  runtime()
  extension()

  function runtime () {
    let source

    source= $browser.runtime

    onMessage()

    function onMessage () {
      let $event

      $event = source.onMessage

      if (exists($event) && !$event.hasListener(listener)) {
        $event.addListener(listener)
      }
    }
  }

  function extension () {
    let source

    source = $browser.extension

    onMessage()

    function onMessage () {
      let $event

      $event = source.onMessage

      if ($event && !$event.hasListener(listener)) {
        $event.addListener(listener)
      }
    }
  }

  function listener (request, sender, sendResponse) {
    let testListener = () => {
      return !exists(onMessageCache) || onMessageCache !== request.time
    }

    if (testListener()) {
      onMessageCache = request.time

      onMessage(request, sender, sendResponse)
    }
  }
}

function main () {
  let readerly

  $browser = getBrowser()

  if (document.querySelector('#readerly')) {
    readerly = document.querySelector('#readerly')
    readerly.parentNode.removeChild(readerly)
  }

  display = new Display()

  listen()
}
