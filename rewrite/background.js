let $browser

$browser = chrome || browser

function $sendMessage(id, message) {
  let packet
  let time

  packet = {}
  time = Date.now()

  Object.assign(packet, message, {time, id})

  try {
    chrome.runtime.sendMessage(packet)
    console.debug('using chrome.runtime.sendMessage')
  } catch (exception) {
    console.warn('Could not sendMessage using chrome.runtime', exception)
  }

  try {
    console.debug('using browser.runtime.sendMessage')
    browser.runtime.sendMessage(packet)
  } catch (exception) {
    console.warn('Could not sendMessage using browser.runtime', exception)
  }

  try {
    chrome.tabs.sendMessage(id, packet)
    console.debug('using chrome.tabs.sendMessage')
  } catch (exception) {
    console.warn('Could not sendMessage using chrome.tabs', exception)
  }

  try {
    console.debug('using browser.tabs.sendMessage')
    browser.tabs.sendMessage(id, packet)
  } catch (exception) {
    console.warn('Could not sendMessage using browser.tabs', exception)
  }
}

if (!$browser.browserAction.onClicked.hasListener(listener)) {
  $browser.browserAction.onClicked.addListener(listener)
}

function listener (tab) {
  let message = 'hi web page!'
  $sendMessage(tab.id, {
    tab,
    message
  })
}
