import address from '../utilities/address'
// import * as style from '../../style/head.css'

export default function generate () {
  let element
  // let text

  element = document.createElement('link')

  // console.log('style', style)

  // text = document.createTextNode(style)
  //
  element.setAttribute('rel', 'stylesheet')
  element.setAttribute('type', 'text/css')
  element.setAttribute('href', address('style/head.css'))
  element.setAttribute('crossorigin', 'anonymous')

  return element
}
