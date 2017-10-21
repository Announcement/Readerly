let expressions
expressions = {}

expressions.range = /^([<>]=?|=|~|\^)/m
expressions.tag = /(?:-)(.+?)$/m

export default function assume (it) {
  let range
  let tag

  let parts

  it = it.trim()

  range = it.match(expressions.range)
  tag = it.match(expressions.tag)

  parts = it.replace(range, '').replace(tag, '').split(/\./g)

  if (parts.every(part => (/^\d+$/m).test(part))) {
    return false
  }

  add()

  return range + parts.join('.') + tag
  function add () {
    while (parts.lengt < 3) {
      parts.push('0')
    }
  }
}
