function scope(element) {
  let index

  element.classList.add('readerly')
  element.classList.add('display')

  element.style.initial = 'all'

  for (index = 0; index < element.children.length; index++) {
    scope(element.children[index])
  }

  return element
}

export default function generate() {
  let element
  let progressElement
  let settingsElement
  let speedElement
  let playbackElement
  let closeElement
  let checkElement

  let settingsText
  let speedText
  let closeText

  element = document.createElement('section')

  progressElement = document.createElement('progress')
  settingsElement = document.createElement('button')
  speedElement = document.createElement('button')
  closeElement = document.createElement('button')
  checkElement = document.createElement('input')
  playbackElement = document.createElement('div')

  settingsText = document.createTextNode('Settings')
  speedText = document.createTextNode('Speed')
  closeText = document.createTextNode('Close')

  settingsElement.appendChild(settingsText)
  speedElement.appendChild(speedText)
  closeElement.appendChild(closeText)

  element.appendChild(progressElement)
  element.appendChild(settingsElement)
  element.appendChild(speedElement)
  element.appendChild(playbackElement)
  element.appendChild(closeElement)

  // progressElement.setAttribute('value', '50')
  // progressElement.setAttribute('max', '100')

  settingsElement.classList.add('settings')
  speedElement.classList.add('speed')
  playbackElement.classList.add('playback')
  closeElement.classList.add('close')
  element.classList.add('display')

  return scope(element)
}
