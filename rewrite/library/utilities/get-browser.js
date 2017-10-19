export default function getBrowser () {
  let $browser

  _chrome()
  _browser()

  function _chrome () {
    if (typeof browser === 'undefined') {
      $browser = chrome

// console.debug('Browser detected as Chrome.')
    }
  }

  function _browser () {
    if (typeof browser !== 'undefined') {
      $browser = browser

// console.debug('Browser detected as Firefox.')
    }
  }

  return $browser
}
