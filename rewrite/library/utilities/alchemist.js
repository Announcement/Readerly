import alchemist from './alchemist/versions'

export default function (plugins, options = {}) {
  return alchemist.v1(plugins)
}
