import rgba from './rgba'

function shadow(elevation) {
  let sketch

  sketch = {}

  sketch['2dp'] = [
    ['0', '0', '4px', rgba(0, 0, 0, 0.14)],
    ['0', '3px', '4px', rgba(0, 0, 0, 0.12)],
    ['0', '1px', '5px', rgba(128, 128, 128, 0.2)]
  ]
    .map(it => it.join(' '))
    .join(', ')

  return sketch[elevation]
}

export default shadow
