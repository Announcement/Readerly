import address from '../address'

export default function url (it, quotation = '"') {
  return `url(${quotation}${address(it)}${quotation})`
}
