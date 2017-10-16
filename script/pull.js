const fs = require('fs')
const util = require('util')
const path = require('path')

const postcss = require('postcss')
const posthtml = require('posthtml')

const cssnano = require('cssnano')
const htmlnano = require('htmlnano')

const prettier = require('prettier')
const tidy = require('posthtml-tidy')

const stylefmt = require('stylefmt')
const comments = require('postcss-discard-comments')
const glob = require('glob')
const assets = require('posthtml-inline-assets')
const collect = require('posthtml-collect-inline-styles')
const internal = require('posthtml-postcss')

const vfile = require('to-vfile')
const report = require('vfile-reporter')
const rehype = require('rehype')
const reformat = require('rehype-format')

let readFile = util.promisify(fs.readFile)
let writeFile = util.promisify(fs.writeFile)

let distribution = path.resolve(__dirname, '../distribution/page.html')
let original = path.resolve(__dirname, '../original/page.html')

let configuration

configuration = {}

configuration.cssnano = { preset: 'default' }
configuration.comments = { removeAll: true }
configuration.assets = { from: original }

configuration.htmlnano = {
  collapseWhitespace: false,
  removeComments: false,
  minifyCss: false,
  minifyJs: false,
  minifyJson: false,
  minifySvg: false,
  removeRedundantAttributes: false,
  collapseBooleanAttributes: false,
  mergeStyles: true,
  mergeScripts: false
}

configuration.tidy = {
  doctype: 'html5',
  indent: 'auto',
  indentSpaces: 2,
  markup: 'yes',
  sortAttributes: 'alpha',
  wrap: 80,
  verticalSpace: 'yes'
}

configuration.postcss = [
  cssnano(configuration.cssnano),
  comments(configuration.comments),
  stylefmt()
]

configuration.posthtml = [
  assets(configuration.assets),
  htmlnano(configuration.htmlnano),
  // collect,
  // internal(configuration.postcss, {}, /text\/css/),
  tidy(configuration.tidy)
]

// style('./original/lib/readerly-main.css', './distribution/lib/core.css')

glob("original/**/*.css", {}, async function (er, files) {
  let input
  let output
  let result

  if (!er) {
    for (file of files) {
      input = `./${file}`
      output = input.replace('original', 'distribution')

      result = await style(input, output)
    }
    // files.forEach(async file => {
    //   let input
    //   let output
    //
    //   input = `./${file}`
    //   output = input.replace('original', 'distribution')
    //   try {
    //     await style(input, output)
    //   } catch (e) {
    //     console.log(e)
    //   } finally {
    //     console.log('Donex with ', file)
    //   }
    // })

    // await page('./original/page.html', './distribution/page.html')
    // console.log('finished')
  }
})

page('./original/page.html', './distribution/page.html')
  .then(it => {})
  .catch(it => console.log(it))

async function page (input, output) {
  return new Promise((resolve, reject) => {
    readFile(input, {encoding: 'utf8'})
      .then(content => {
        let options

        options = {}

        return posthtml(configuration.posthtml)
          .process(content, options)
      })
      .then(result => {
        writeFile(output, result.html)
          .then(it => {
            console.log('=>', output)
            resolve(result)
          })
          .catch(it => {
            console.log('Could not write', output)
          })
      })
      .catch(error => {
        reject(error)
      })
  })
}

async function style (input, output) {
  return new Promise((resolve, reject) => {
    readFile(input, {encoding: 'utf8'})
      .then(contents => {
        return postcss(configuration.postcss)
          .process(contents, {
            parser: postcss,
            filepath: input
          })
      })
      .then(result => {
        let pretty
        let options

        options = {
          parser: 'postcss',
          filepath: input
        }

        pretty = prettier.format(result.css, options)
        resolve(pretty)
        writeFile(output, pretty)
          .then(it => {
            console.log('=>', output)
            resolve(pretty)
          })
          .catch(it => {
            console.warn('Could not write', it)
          })
      })
      .catch(error => {
        reject(error)
      })
  })
}
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


process.on('uncaughtException', it => {})
process.on('warning', it => {})
