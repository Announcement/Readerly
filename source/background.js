const $browser = chrome || browser

let contexts

contexts = []

contexts.push('selection')

contexts.forEach(context => {
  let title
  let id
  let object

  title = 'Read Selecected Text'

  object = {}
  object.title = title
  object.contexts = [context]
  object.onclick = onContextClick

  id = $browser.contextMenus.create(object)
})

// $browser.browserAction.onClicked.addListener(onIconClick)
$browser.commands.onCommand.addListener(onCommand)
/**
 * Does some things and stuff.
 * @method onContextClick
 *
 * @param {object} info - blah
 * @param {object} tab - blah
 */
function onContextClick (info, tab) {
  let queryInfo
  let querying

  queryInfo = {
    active: true,
    currentWindow: true
  }

  querying = $browser.tabs.query(queryInfo)

  querying
    .then(resolve)
    .catch(failure)

  function failure (it) {
    console.error('onContextClick', it)
  }

  function resolve (tabs) {
    let tabId
    let message

    tabId = tabs[0].id
    message = {}
    message.functiontoInvoke = 'readSelectedText'
    message.selectedText = info.selectionText

    $browser.tabs.sendMessage(tabId, message)
  }
}

function onReadSelectionShortcut () {
  let queryInfo

  queryInfo = {
    active: true,
    currentWindow: true
  }

  $browser.tabs.query(queryInfo)
    .then(resolve)
    .catch(failure)

  function failure (it) {
    console.error('onReadSelectionShortcut', it)
  }

  function resolve (tabs) {
    let tabId
    let message

    tabId = tabs[0].id
    message = {}
    message.functiontoInvoke = 'readSelectedText'

    $browser.tabs.sendMessage(tabId, message)
  }
}

function onGetSelection (info, tab) {
  let queryInfo

  queryInfo = {
    active: true,
    currentWindow: true
  }

  $browser.tabs.query(queryInfo)
    .then(resolve)
    .catch(failure)

  function failure (it) {
    console.error('onGetSelection', it)
  }

  function resolve (tabs) {
    let tabId
    let message

    tabId = tabs[0].id
    message = {}
    message.functiontoInvoke = 'getSelection'

    $browser.tabs.sendMessage(tabId, message)
  }
}

function onIconClick (info, tab) {
  let queryInfo

  queryInfo = {
    active: true,
    currentWindow: true
  }

  $browser.tabs.query(queryInfo)
    .then(resolve)
    .catch(failure)

  function failure (it) {
    console.error('onIconClick', it)
  }

  function resolve (tabs) {
    let tabId
    let message

    tabId = tabs[0].id
    message = {}
    message.functiontoInvoke = 'readFullPage'

    $browser.tabs.sendMessage(tabId, message)
  }
}

function onHalveSpeed (info, tab) {
  let queryInfo

  queryInfo = {
    active: true,
    currentWindow: true
  }

  $browser.tabs.query(queryInfo)
    .then(resolve)
    .catch(failure)

  function failure (it) {
    console.error('onContextClick', it)
  }

  function resolve (tabs) {
    let tabId
    let message

    tabId = tabs[0].id
    message = {}
    message.functiontoInvoke = 'halveSpeed'

    $browser.tabs.sendMessage(tabId, message)
  }
}

function onCommand (command) {
  readSelection()
  graphicalSelection()
  halveSpeed()

  function readSelection () {
    if (command === 'read_selection') {
      onReadSelectionShortcut()
    }
  }

  function graphicalSelection () {
    if (command === 'graphical_selection') {
      onGetSelection()
    }
  }

  function halveSpeed () {
    if (command === 'halve_speed') {
      onHalveSpeed()
    }
  }
}
