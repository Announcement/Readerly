let rewindImageSource
let settingsImageSource

function url (it) {
  if (typeof browser === 'undefined') {
    return chrome.runtime.getURL(it)
  } else {
    return browser.extension.getURL(it)
  }
}

settingsImageSource = url('images/settings.png')
rewindImageSource = url('images/rewind.png')


function shadow (elevation) {
  let sketch

  sketch = {}

  sketch['2dp'] =
    [
      ['0', '0', '4px', rgba(0, 0, 0, .14)],
      ['0', '3px', '4px', rgba(0, 0, 0, .12)],
      ['0', '1px', '5px', rgba(128, 128, 128, .20)]
    ].map(it => it.join(' ')).join(', ')

  return sketch[elevation]
}

function rgba(red, green, blue, alpha) {
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

export default {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '80px',
  background: rgba(255, 255, 255, 0.8),
  boxShadow: shadow('2dp'),
  display: 'grid',
  justifyItems: 'center',
  alignItems: 'center',
  gridTemplateRows: '4px 1fr',
  gridTemplateColumns: '24px min-content min-content 1fr min-content 24px',
  gridColumnGap: '8px',
  progress: {
    gridColumnStart: '1',
    gridColumnEnd: 'span 6',
    width: '100%',
    height: '100%',
    WebkitAppearance: 'none',
    background: 'white',
  },
  button: {
    height: '36px',
    borderRadius: '2px',
    paddingLeft: '16px',
    paddingRight: '16px',
    outline: 'none',
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderWidth: '0',
    minWidth: '88px',
    boxShadow: shadow('2dp')
  },
  'button.settings': {
    gridColumnStart: '2',
    gridColumnEnd: 'span 1',
    backgroundImage: `url("${settingsImageSource}")`,
    backgroundSize: '32px 32px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minWidth: '36px',
    width: `${36 + 16 * 2}px`,
    content: '',
    color: 'transparent'
  },
  'button.speed': {
    gridColumnStart: '3',
    gridColumnEnd: 'span 1',
    backgroundImage: `url("${rewindImageSource}")`,
    backgroundSize: '32px 32px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minWidth: '36px',
    width: `${36 + 16 * 2}px`,
    content: '',
    color: 'transparent'
  },
  'button.close': {},
  'div.playback': {
    justifySelf: 'stretch',
    height: '36px',
    lineHeight: '36px',
    textAlign: 'center'
  }
}
