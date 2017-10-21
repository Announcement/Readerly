import what from './get-type'

let from = it => JSON.stringify(it)
let clean = it => it.replace(/\s*/g, '')
let reset = it => clean(from(it))

let $array = array => {
  return {
    has: item => array.map(reset).includes(reset(item))
  }
}

let $object = object => {
  return {
    has: string => object.hasOwnProperty(string)
  }
}

export default function has (it) {
  let result

  object()
  array()

  return result.has

  function object () {
    if (what(it) === 'object') {
      result = $object(it)
    }
  }

  function array () {
    if (what(it) === 'array') {
      result = $array(it)
    }
  }
}
