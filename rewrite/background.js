let $browser

$browser = getBrowser()

main()

/** @see {@link utilities/get-browser} */
function getBrowser () {
  let $browser

  _chrome()
  _browser()

  function _chrome () {
    if (typeof browser === 'undefined') {
      $browser = chrome// console.debug('Browser detected as Chrome.')
    }
  }

  function _browser () {
    if (typeof browser !== 'undefined') {
      $browser = browser// console.debug('Browser detected as Firefox.')
    }
  }

  return $browser
}

/** @see {@link utilities/exists} */
function exists (it) {
  return it !== undefined && it !== null
}

function $sendMessage (id = null, message) {
  let time

  time = Date.now()

  testRuntime()
  testTabs()

  function testRuntime () {
    let packet

    packet = {}

    Object.assign(packet, message)
    Object.assign(packet, { time })

    if ($browser.runtime) {// console.debug('Runtime API is available.')

      debugRuntime(packet)
    }
  }

  function debugRuntime (packet) {
    let promise

    try {
      promise = $browser.runtime.sendMessage(packet)
    } catch (exception) {// console.debug('runtime.sendMessage is not available.', {exception})
    }

    invokePromise(promise)
  }

  function testTabs () {
    let packet

    packet = {}

    Object.assign(packet, message)
    Object.assign(packet, { time })
    Object.assign(packet, { id })

    if ($browser.tabs && id) {// console.debug('Tabs API is available.')

      debugTabs(id, packet)
    }
  }

  function debugTabs (id, packet) {
    let promise

    try {
      promise = $browser.tabs.sendMessage(id, packet)
    } catch (exception) {// console.debug('tabs.sendMessage is not available.', {exception})
    }

    invokePromise(promise)
  }

  function invokePromise (promise) {
    if (promise) {
      promise.then(resolvePromise).catch(repairPromise)
    }
  }

  function resolvePromise (message) {
    // console.debug('$sendMessage', 'resolvePromise', 'message', message)
  }

  function repairPromise (error) {
    // console.debug('$sendMessage', 'resolvePromise', 'error', error)
  }
}

function initialize () {
  browserAction()
  commands()
  runtime()

  function browserAction () {
    let api

    api = $browser.browserAction

    onClicked()

    function onClicked () {
      if (!api.onClicked.hasListener(click)) {
        api.onClicked.addListener(click)
      }
    }
  }

  function commands () {
    let api

    api = $browser.commands

    getAll()
    onCommand()

    function getAll () {
      api.getAll(it => console.log('commands', it))
    }

    function onCommand () {
      if (!api.onCommand.hasListener(command)) {
        api.onCommand.addListener(command)
      }
    }
  }

  function runtime () {
    let api

    api = $browser.runtime

    onUpdateAvailable()
    onSuspend()

    function onUpdateAvailable () {
      if (!api.onUpdateAvailable.hasListener(update)) {
        api.onUpdateAvailable.addListener(update)
      }
    }

    function onSuspend () {
      if (exists(api.onSuspend) && !api.onSuspend.hasListener(suspend)) {
        api.onSuspend.addListener(suspend)
      }
    }
  }
}

function main () {
  initialize()
}

function click (tab) {
  let message

  message = 'browserAction:onClicked'// console.debug(message)

  $sendMessage(tab.id, {
    tab,
    message
  })
}

function command (name) {
  let message

  message = 'commands:onCommand'// console.debug(message)

  $sendMessage({
    message,
    name
  })
}

function update (details) {
  let message

  message = 'runtime:onUpdateAvailable'// console.debug(message)

  $sendMessage({
    message,
    details
  })
}

function suspend () {
  let message

  message = 'runtime:onSuspend'// console.debug(message)

  $sendMessage({
    message
  })
}
