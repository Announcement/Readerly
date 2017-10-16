import * as data from './utilities/storage'
import generate from './settings/generate'
import stylesheet from './settings/stylesheet'

class Settings {
  constructor () {
    this.element = generate()
  }
}
