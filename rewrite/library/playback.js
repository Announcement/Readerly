// import Parasite from './utilities/parasite'
const extractor = require('@knod/unfluff')

class Playback {
  constructor (it) {
    this.element = it
    this.text = extractor.lazy(it).text()
  }
}


export default Playback
