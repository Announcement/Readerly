import address from '../address'

export default function url(it) {
  return `url("${address(it)}")`
}
