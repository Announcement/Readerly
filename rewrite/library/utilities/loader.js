// import semver from 'semver'

export default function loader (object) {
  // let versions
  //
  // versions = Object.keys(object)
  //   .map(name => {
  //     let version
  //     let clean
  //
  //     version = getVersion(name)
  //     clean = semver.clean(version)
  //
  //     return {
  //       name,
  //       version,
  //       clean
  //     }
  //   })
  //   .sort((a, b) => semver.compare(a.name, b.name))
  // return function find (it) {
  //
  // }
}
// let versions
// let version
//
// versions = Object.keys(alchemist)
//   .filter(empty)
//   .map(name => {
//     let version
//     let clean
//
//     version = getVersion(name)
//     clean = semver.clean(version)
//
//     return {
//       name,
//       version,
//       clean
//     }
//   })
//   .sort((a, b) => semver.compare(a.clean, b.clean))
//
// experimental()
// manual()
// fallback()
//
// return version
//
// function manual () {
//   if (exists(options.version) && options.version !== 'latest') {
//     configure(options.version)
//   }
// }
//
// function experimental () {
//   let latest = () =>
//     options.experimental || options.version === 'latest'
//
//   if (latest()) {
//     configure(versions[0])
//   }
// }
//
// function fallback () {
//   configure('v1')
// }
// function highest (item) {
//   let clean
//   let fixed
//
//   clean = versions.map(it => it.clean)
//   fixed = getVersion(item)
//
//   if (semver.intersects(clean, fixed))  {
//     version = semver.maxSatisfying(clean, fixed)
//   }
// }
// function configure (item) {
//   if (!exists(version)) {
//     highest(item)
//   }
// }
