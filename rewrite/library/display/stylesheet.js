import rgba from '../utilities/css/rgba'
import rgb from '../utilities/css/rgb'

import { white, transparent } from '../utilities/css/colors'

import shadow from '../utilities/css/shadow'
import url from '../utilities/css/url'
// function styleize(it, styles) {
//   if (!it) return false
//
//   let stylesheetElement
//   let stylesheetNode
//
//   // console.debug('styleize')
//
//   stylesheetElement = document.createElement('style')
//
//   document.head.appendChild(stylesheetElement)
//
//   stylesheetNode = document.styleSheets[document.styleSheets.length - 1]
//
//   this.stylesheet = stylesheetNode
//
//
//   // console.debug('Read virtual stylesheet')
//
//   Object.keys(styles).forEach(key => {
//     let value
//
//     value = styles[key]
//
//     if (value.constructor === Array) {
//       value = value.join(' ')
//     }
//
//     // console.debug(styles, key)
//
//     assign(key, value)
//     find(key, value)
//   })
//
//   function assign(key, value) {
//     key = key.replace(/([A-Z])/g, it => '-' + it.toLowerCase())
//
//     if (typeof value === 'string') {
//       it.style[key] = value
//     }
//   }
//
//   function find(key, value) {
//     if (typeof value === 'object') {
//       it.querySelectorAll(key).forEach(it => Display.styleize(it, value))
//     }
//   }
// }

export default {
  position: 'fixed',

  top: '0',
  left: '0',

  width: '100%',
  // minHeight: '80px',

  background: white,
  boxShadow: shadow('2dp'),

  display: 'flex',
  flexDirection: 'column',

  // alignItems: 'center',
  justifyContent: 'center',

  'section.display': {
    display: 'grid',
    height: '80px',

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
      background: white
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
      gridRowStart: '2',
      gridRowEnd: 'span 1',
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

    'button.close': {
      gridRowStart: '2',
      gridRowEnd: 'span 1',
      gridColumnStart: '5',
      gridColumnEnd: 'span 1'
    },

    'div.playback': {
      justifySelf: 'stretch',
      height: '36px',
      lineHeight: '36px',
      textAlign: 'center',
      fontSize: '35px'
    }
  },

  'section.settings': {
    justifySelf: 'stretch',
    alignSelf: 'stretch',
    background: white,

    'nav.navigation.tabs': {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-evenly',
      // borderTop: ['1px', 'solid', rgba(0, 0, 0, 0.37)],
      // borderBottom: ['1px', 'solid', rgba(0, 0, 0, 0.37)],
      boxShadow: 'inset 0 0 2px rgba(0, 0, 0, .37)',
      'a.navigation-element.tab': {
        minHeight: '48px',
        lineHeight: '48px',
        paddingLeft: '12px',
        paddingRight: '12px'
      }
    },

    form: {
      display: 'flex',
      justifyContent: 'space-evenly',
      flexWrap: 'wrap',
      fieldset: {
        display: 'inline-block',
        width: 'max-content',
        height: 'min-content'
      },
      'input.number': {
        width: '45px',
        height: '23px',
        verticalAlign: 'middle',
        outline: 'none',
        textAlign: 'center'
      },
      'input.range': {
        verticalAlign: 'middle',
        width: '120px',
        height: '32px'
      }
    }
  }
}
