function _url(it) {
  if (typeof browser === 'undefined') {
    return chrome.runtime.getURL(it)
  } else {
    return browser.extension.getURL(it)
  }
}

function url(it) {
  return `url("${_url(it)}")`
}

export default url
