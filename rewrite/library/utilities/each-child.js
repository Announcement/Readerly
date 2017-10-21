export default function * $children (it) {
  let children
  let length
  let index

  children = it.children
  length = children.length

  while (length--) yield children[length - index - 1]
}
