let begins
let matches

begins = it => pattern =>
  expression('^' + pattern).test(it)

matches = it => pattern =>
  expression(pattern).test(it)

export {
  begins,
  matches
}

function expression (it) {
  let pattern = it
    .replace(/\*/g, '.+?')
  
  return new RegExp(pattern, 'm')
}
