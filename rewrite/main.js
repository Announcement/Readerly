import Display from './library/display'

let $browser
let display

$browser = chrome || browser

console.debug('Waiting for the document.')

document.addEventListener('DOMContentLoaded', function () {
  display = new Display()
})

$browser.runtime.onMessage.addListener(message)

function message (it) {
  display.open()
  display.focus()
}
