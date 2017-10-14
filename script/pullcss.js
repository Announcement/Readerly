const fs = require('fs')
const util = require('util')

const prettier = require('prettier')
const postcss = require('postcss')

let readFile = util.promisify(fs.readFile)

let location = './original/lib/readerly-main.css'

readFile(location, {encoding: 'utf8'})
  .then(contents => {
    postcss([]).process(contents, {
      parser: postcss,
      filepath: location
    })
      .then(result => {
        console.log(result)
      })
      .catch(processError => {
        console.log('Could not process contents', processError.title)
      })

    console.log(contents)
  })
  .catch(readFileError => {
    console.log('File contents could not be retrieved.')
  })

// fs.readFile('./original/lib/readerly-main.css', function () {
//
// })

// postcss([])
//   .process(coreCSS, {from: 'original/lib/core-css', to: 'destination/core-css'})
//   .then(result => {
//     let options = {
//       parser: 'postcss',
//       filepath: 'core.css'
//     }
//     let pretty = prettier.format(result.css, options)
//     console.log(pretty)
//     // console.log(result.css)
//   })
//   .catch(it => {
//     console.log('error', it)
//   })
