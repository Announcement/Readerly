import Display from './library/display'
import Playback from './library/playback'

let $browser

let display
let everything

let onMessageCache
let queue

$browser = chrome || browser
queue = []

// $browser.runtime.onMessage.addListener(message)

// document.addEventListener('DOMContentLoaded', function () {
// })

display = new Display()
everything = new Playback(document.body.outerHTML)

function onMessage(request, sender, sendResponse) {
  if (onMessageCache === request.time) {
    return false
  }

  onMessageCache = request.time

  console.log(request)

  browserAction()
  commands()

  function browserAction () {
    if (request.message.indexOf('browserAction') === 0) {
      onClicked()
    }

    function onClicked () {
      if (request.message === 'browserAction:onClicked') {
        display.toggle(everything)
      }
    }
  }

  function commands () {
    if (request.message.indexOf('commands') === 0) {
      onCommand()
    }

    function onCommand () {
      if (request.message === 'commands:onCommand') {
        console.log(request.message, request.name)
      }
    }
  }
}

try {
  $browser.runtime.onMessage.addListener(function(
    request,
    sender,
    sendResponse
  ) {
    if (onMessageCache === request.time) {
      return false
    }
    console.debug('runtime message', request, sender)
    onMessage(request, sender, sendResponse)
  })
  console.debug('Listening to runtime messages :)')
} catch (e) {
  console.debug('Failed to read extension messages')
}

try {
  $browser.extension.onMessage.addListener(function(
    request,
    sender,
    sendResponse
  ) {
    if (onMessageCache === request.time) {
      return false
    }
    console.debug('extension message', request, sender)
    onMessage(request, sender, sendResponse)
  })
  console.debug('Listening to extension messages :)')
} catch (e) {
  console.debug('Failed to read extension messages')
}
