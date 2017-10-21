import address from './address'
import url from './css/url'
import alchemist from './alchemist'

let use
let using

let expression
let method

expression = {}
method = {}
using = {}

expression.url = /url\((['"]).+?\1\)/g

method.url = (match, quotation, uri) => url(uri, quotation)

using.url = it => it.replace(expression.url, method.url)
using.address = (uri) => address(uri)

use = alchemist(using)

export default function (it) {
  use(it).each(rebase)
}

function rebase (it) {
  it = use(it)

  link(it)
  script(it)
  style(it)
  image(it)
  anchor(it)
}

function link (it) {
  if (it.is.a('link') && it.has('href') && !it.begins('//'))
    it.attribute.fix('address')
}

function script (it) {
  if (it.is.a('script') && it.has('src'))
    it.attribute.fix('address')
}

function style (it) {
  if (it.is.a('style'))
    it.text.fix('url')
}

function image (it) {
  if (it.is.an('image') && it.has('src'))
    it.attribute.fix('address')
}

function anchor (it) {
  if (it.is.an('anchor') && it.has('href') && !it.begins('#'))
    it.attribute.fix('address')
}
