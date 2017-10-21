import has from './has'
import exists from './exists'

export default function combine (array, additions) {
  let both
  let opposite
  let and

  opposite = (previous, current) =>
    has(previous)(current) ? previous.concat([current]) : previous

  and = additions =>
    additions.reduce(opposite, array)

  both = exists(additions) ? and(additions) : and

  return both
}
