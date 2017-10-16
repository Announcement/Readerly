import rgba from '../utilities/css/rgba'
import rgb from '../utilities/css/rgb'

import {white, transparent} from '../utilities/css/colors'

import shadow from '../utilities/css/shadow'
import url from '../utilities/css/url'

export default {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '80px',
  background: white,
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
    background: white,
  },
  button: {
    height: '36px',
    borderRadius: '2px',
    paddingLeft: '16px',
    paddingRight: '16px',
    outline: 'none',
    borderStyle: 'solid',
    borderColor: transparent,
    borderWidth: '0',
    minWidth: '88px',
    boxShadow: shadow('2dp')
  },
  'button.settings': {
    gridColumnStart: '2',
    gridColumnEnd: 'span 1',
    backgroundImage: url('images/settings.png'),
    backgroundSize: '32px 32px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minWidth: '36px',
    width: `${36 + 16 * 2}px`,
    content: '',
    color: transparent
  },
  'button.speed': {
    gridColumnStart: '3',
    gridColumnEnd: 'span 1',
    backgroundImage: url('images/rewind.png'),
    backgroundSize: '32px 32px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minWidth: '36px',
    width: `${36 + 16 * 2}px`,
    content: '',
    color: transparent
  },
  'button.close': {},
  'div.playback': {
    justifySelf: 'stretch',
    height: '36px',
    lineHeight: '36px',
    textAlign: 'center',
    fontSize: '35px'
  }
}
