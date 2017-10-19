export default function address (it) {
  if (typeof browser === 'undefined') {
    return chrome.runtime.getURL(it)
  } else {
    return browser.extension.getURL(it)
  }
}
