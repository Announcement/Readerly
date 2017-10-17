let $browser

$browser = chrome || browser

function $sendMessage(id = null, message) {
  let packet
  let time

  packet = {}
  time = Date.now()

  Object.assign(packet, message)
  Object.assign(packet, { time })

  if (id) {
    Object.assign(packet, { id })
  }

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

  if (id) {
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
}

if (!$browser.browserAction.onClicked.hasListener(click)) {
  $browser.browserAction.onClicked.addListener(click)
}

if (!$browser.commands.onCommand.hasListener(command)) {
  $browser.commands.onCommand.addListener(command)
}

$browser.commands.getAll(it => {
  console.log(it)
})

function click (tab) {
  let message

  message = 'browserAction:onClicked'

  $sendMessage(tab.id, {
    tab,
    message
  })
}

function command (name) {
  let message

  message = 'commands:onCommand'

  $sendMessage({
    message,
    name
  })
}
