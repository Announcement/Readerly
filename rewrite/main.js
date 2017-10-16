import Display from './library/display'

let $browser
let display
let onMessageCache
let queue

$browser = chrome || browser
queue = []

// $browser.runtime.onMessage.addListener(message)

console.debug('Waiting for the document.')

// document.addEventListener('DOMContentLoaded', function () {
// })

console.debug('Trying to load display.')

display = new Display()

console.debug('The display is finally ready.')

function onMessage (request, sender, sendResponse) {
  if (onMessageCache === request.time) {
    return false
  }

  onMessageCache = request.time

  display.open()
  display.focus()
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
