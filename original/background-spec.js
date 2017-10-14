var $browser
var port

$browser = chrome || browser

// console.debug('Opening a port')
// port = $browser.runtime.connect({name: "knockknock"})

function $sendMessage(id, message) {
  let packet
  let time

  packet = {}
  time = Date.now()

  Object.assign(packet, message, { time, id })

  // console.debug($browser.extension.getURL())
  console.debug('$sendMessage', id, packet)

  try {
    chrome.runtime.sendMessage(packet)
    console.debug('using chrome.runtime.sendMessage')
    // return true
  } catch (exception) {
    console.warn('Could not sendMessage using chrome.runtime', exception)
  }

  try {
    console.debug('using browser.runtime.sendMessage')

    // browser.tabs.executeScript(id, { file: 'main.js' }, function() {
    // console.debug('Running execute script')
    //
    // })
    browser.runtime.sendMessage(packet)

    // return true
  } catch (exception) {
    console.warn('Could not sendMessage using browser.runtime', exception)
  }

  // what chrome uses...
  try {
    chrome.tabs.sendMessage(id, packet)
    console.debug('using chrome.tabs.sendMessage')
    // return true
  } catch (exception) {
    console.warn('Could not sendMessage using chrome.tabs', exception)
  }

  try {
    console.debug('using browser.tabs.sendMessage')

    // browser.tabs.executeScript(id, { file: 'main.js' }, function() {
    // console.debug('Running execute script')
    // })
    browser.tabs.sendMessage(id, packet)

    // return true
  } catch (exception) {
    console.warn('Could not sendMessage using browser.tabs', exception)
  }
}

function onContextCLick(info, tab) {
  console.debug('onContextCLick', info, tab)
  $browser.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    function(tabs) {
      console.debug('query tabs')
      $sendMessage(tabs[0].id, {
        functiontoInvoke: 'readSelectedText',
        selectedText: info.selectionText
      })
    }
  )
}

function onReadSelectionShortcut() {
  console.debug('onReadSelectionShortcut')
  $browser.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    function(tabs) {
      console.debug('query tabs')
      $sendMessage(tabs[0].id, {
        functiontoInvoke: 'readSelectedText'
      })
    }
  )
}

function onGetSelection(info, tab) {
  console.debug('onGetSelection', info, tab)
  $browser.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    function(tabs) {
      console.debug('query tabs')
      $sendMessage(tabs[0].id, {
        functiontoInvoke: 'getSelection'
      })
    }
  )
}

function onIconClick(tab) {
  let bundle

  bundle = $browser.extension.getURL('bundle.js')

  console.debug('clickey click', bundle)

  $browser.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    list => {
      console.debug('list is here!')
      list.forEach(item => {
        console.debug(item)

        // lel chrome
        if (typeof browser === 'undefined') {
          $sendMessage(item.id, {
            functiontoInvoke: 'readFullPage'
          })
        }

        // firefox
        if (typeof browser !== 'undefined') {
          $sendMessage(item.id, {
            functiontoInvoke: 'readFullPage'
          })
          // try {
          //   // console.debug(
          //   //   'script',
          //   //   $browser.tabs
          //   //     .executeScript({
          //   //       file: '/bundle.js',
          //   //       allFrames: true
          //   //     })
          //   //     .then(it => {
          //   //       console.debug('then')
          //   //     })
          //   //     .catch(it => {
          //   //       console.debug('catch')
          //   //     })
          //   // )
          // } catch (exception) {
          //   console.debug('execution', exception)
          // }
        }
      })
    }
  )
  // results.then(it => {
  //   console.debug(it)
  // }).catch(it => {
  //   console.debug(it)
  // })

  // console.debug('onIconClick', results)
  // console.debug('onIconClick', tab)

  // console.debug(browser.tabs.getCurrent())

  // browser.browserAction.enable(tab.id)
  //
  // $browser.tabs.executeScript({file: "/bundle.js"})
  //   .then(it => {
  //     console.debug('then', it)
  //   })
  //   .catch(it => {
  //     console.debug('catch', it)
  //   })

  // console.debug('query tabs')
  // $browser.tabs.query({
  //   "active": true,
  //   "currentWindow": true
  // }, function (tabs) {
  //     $sendMessage(tabs[0].id, {
  //       "functiontoInvoke": "readFullPage"
  //     })
  //   })
}

function onHalveSpeed(info, tab) {
  console.debug('onHalveSpeed', info, tab)
  $browser.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    function(tabs) {
      console.debug('query tabs')
      $sendMessage(tabs[0].id, {
        functiontoInvoke: 'halveSpeed'
      })
    }
  )
}

// Write this in an expandable way in case we want to move beyond selection
var contexts = ['selection']

for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i]
  var title = 'Read Selected Text'
  var id = $browser.contextMenus.create({
    title: title,
    contexts: [context],
    onclick: onContextCLick
  })
}

$browser.contextMenus.create({
  title: 'Select text to read',
  onclick: onGetSelection
})

console.debug('$browser.browserAction.onClicked.addListener')
// Handle clicking on the browser icon
$browser.browserAction.onClicked.addListener(function(tab) {
  console.debug('browserAction.onclicked')
  onIconClick()
})

$browser.tabs.onCreated.addListener(function(tab) {
  let file

  console.debug(tab)
  // file =

  // browser.tabs.executeScript(tab.id, {file}, function() {
  //   console.debug('attached main.js')
  // })

  console.debug('created a tab', tab)
})

$browser.tabs.onUpdated.addListener(function(tab) {
  console.debug('updated a tab', tab)
})

$browser.tabs.onReplaced.addListener(function(tab) {
  console.debug('replaced a tab', tab)
})

console.debug('$browser.commands.onCommand.addListener')
$browser.commands.onCommand.addListener(function(command) {
  console.debug('$browser.commands.onCommand', command)

  switch (command) {
    case 'read_selection':
      onReadSelectionShortcut()
      break

    case 'graphical_selection':
      onGetSelection()
      break

    case 'halve_speed':
      onHalveSpeed()
      break
  }
})
