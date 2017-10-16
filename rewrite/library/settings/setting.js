class Setting {
  constructor(label) {
    let fieldset
    let legend
    let number
    let range

    let text

    fieldset = document.createElement('fieldset')
    legend = document.createElement('legend')
    number = document.createElement('input')
    range = document.createElement('input')

    text = document.createTextNode(label)

    number.setAttribute('type', 'number')
    range.setAttribute('type', 'range')

    number.classList.add('number')
    range.classList.add('range')

    legend.appendChild(text)

    fieldset.appendChild(legend)
    fieldset.appendChild(number)
    fieldset.appendChild(range)

    this.number = number
    this.range = range

    this.element = fieldset
  }

  set maximum(value) {
    this.element.querySelector('input.number').setAttribute('max', value)
    this.element.querySelector('input.range').setAttribute('max', value)
  }

  set value(value) {
    this.element.querySelector('input.number').setAttribute('value', value)
    this.element.querySelector('input.range').setAttribute('value', value)
  }

  set minimum(value) {
    this.element.querySelector('input.number').setAttribute('min', value)
    this.element.querySelector('input.range').setAttribute('min', value)
  }

  set step(value) {
    this.element.querySelector('input.number').setAttribute('step', value)
    this.element.querySelector('input.range').setAttribute('step', value)
  }

  sync () {
    let range
    let number

    range = this.range
    number = this.number

    number.addEventListener('change', it => {
      if (range.value !== number.value) {
        range.value = number.value
      }
    })

    range.addEventListener('change', it => {
      if (number.value !== range.value) {
        number.value = range.value
      }
    })
  }

  static create({ name, minimum, maximum, step, value }) {
    let setting

    setting = new Setting(name)

    setMinimum()
    setMaximum()
    setStep()
    setValue()

    return setting

    function setMinimum() {
      if (minimum) setting.minimum = minimum
    }

    function setMaximum() {
      if (maximum) setting.maximum = maximum
    }

    function setStep() {
      if (step) setting.step = step
    }

    function setStep() {
      if (value) setting.value = value
    }
  }
}

export default Setting
