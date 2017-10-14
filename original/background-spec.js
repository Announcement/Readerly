var $browser
var port

$browser = chrome || browser

// console.log('Opening a port')
// port = $browser.runtime.connect({name: "knockknock"})

function $sendMessage(id, message) {
  // console.log($browser.extension.getURL())
  console.log('$sendMessage', id, message)

  try {
    chrome.runtime.sendMessage({ id, message })
    console.log('using chrome.runtime.sendMessage')
    // return true
  } catch (exception) {
    console.warn('Could not sendMessage using chrome.runtime', exception)
  }

  try {
    console.debug('Running execute script')

    browser.tabs.executeScript(id, { file: 'main.js' }, function() {
      console.debug('using browser.runtime.sendMessage')

      browser.runtime.sendMessage({ id, message })
    })

    // return true
  } catch (exception) {
    console.warn('Could not sendMessage using browser.runtime', exception)
  }

  // what chrome uses...
  try {
    chrome.tabs.sendMessage(id, message)
    console.log('using chrome.tabs.sendMessage')
    // return true
  } catch (exception) {
    console.warn('Could not sendMessage using chrome.tabs', exception)
  }

  try {
    console.debug('Running execute script')

    browser.tabs.executeScript(id, { file: 'main.js' }, function() {
      console.log('using browser.tabs.sendMessage')
      browser.tabs.sendMessage(id, message)
    })

    // return true
  } catch (exception) {
    console.warn('Could not sendMessage using browser.tabs', exception)
  }
}

function onContextCLick(info, tab) {
  console.log('onContextCLick', info, tab)
  $browser.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    function(tabs) {
      console.log('query tabs')
      $sendMessage(tabs[0].id, {
        functiontoInvoke: 'readSelectedText',
        selectedText: info.selectionText
      })
    }
  )
}

function onReadSelectionShortcut() {
  console.log('onReadSelectionShortcut')
  $browser.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    function(tabs) {
      console.log('query tabs')
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
      console.log('query tabs')
      $sendMessage(tabs[0].id, {
        functiontoInvoke: 'getSelection'
      })
    }
  )
}

function onIconClick(tab) {
  let bundle

  bundle = $browser.extension.getURL('bundle.js')

  console.log('clickey click', bundle)

  $browser.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    list => {
      console.log('list is here!')
      list.forEach(item => {
        console.log(item)

        // lel chrome
        if (typeof browser === "undefined") {
          $sendMessage(item.id, {
            functiontoInvoke: 'readFullPage'
          })
        }

        // firefox
        if (typeof browser !== "undefined") {
          try {
            console.log(
              'script',
              $browser.tabs.executeScript({
                file: '/bundle.js',
                allFrames: true
              })
              .then(it => {
                console.debug('then')
              })
              .catch(it => {
                console.debug('catch')
              })
            )
          } catch (exception) {
            console.log('execution', exception)
          }
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

  // console.log(browser.tabs.getCurrent())

  // browser.browserAction.enable(tab.id)
  //
  // $browser.tabs.executeScript({file: "/bundle.js"})
  //   .then(it => {
  //     console.log('then', it)
  //   })
  //   .catch(it => {
  //     console.log('catch', it)
  //   })

  // console.log('query tabs')
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
  console.log('onHalveSpeed', info, tab)
  $browser.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    function(tabs) {
      console.log('query tabs')
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

console.log('$browser.browserAction.onClicked.addListener')
// Handle clicking on the browser icon
$browser.browserAction.onClicked.addListener(function(tab) {
  console.log('browserAction.onclicked')
  onIconClick()
})

$browser.tabs.onCreated.addListener(function(tab) {
  let file

  console.log(tab)
  // file =

  // browser.tabs.executeScript(tab.id, {file}, function() {
  //   console.log('attached main.js')
  // })

  console.log('created a tab', tab)
})

$browser.tabs.onUpdated.addListener(function(tab) {
  console.log('updated a tab', tab)
})

$browser.tabs.onReplaced.addListener(function(tab) {
  console.log('replaced a tab', tab)
})

console.log('$browser.commands.onCommand.addListener')
$browser.commands.onCommand.addListener(function(command) {
  console.log('$browser.commands.onCommand', command)

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
