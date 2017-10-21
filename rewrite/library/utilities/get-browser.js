export default function getBrowser () {
  let $browser

  _chrome()
  _browser()

  function _chrome () {
    if (typeof browser === 'undefined') {
      $browser = chrome
    }
  }

  function _browser () {
    if (typeof browser !== 'undefined') {
      $browser = browser
    }
  }

  return $browser
}
