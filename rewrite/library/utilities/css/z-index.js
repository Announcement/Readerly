export default function zIndex () {
  let zIndexMaximum

  zIndexMaximum = 0

  document.querySelectorAll('body *').forEach(it => {
    let number

    if (it !== this.element && it && it.style && it.style['z-index']) {
      number = parseInt(it.style['z-index'], 10)
      zIndexMaximum = Math.max(number, zIndexMaximum)
    }
  })

  return zIndexMaximum
}
