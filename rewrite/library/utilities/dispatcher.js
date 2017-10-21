let $listener
let $queue

$listener = new WeakMap()
$queue = new WeakMap()

class Dispatcher {
  constructor () {
    $listener.set(this, {})
    $queue.set(this, {})

    // console.debug(this.constructor.name, '<-', 'Dispatcher  ')
  }

  get listener () {
    return $listener.get(this)
  }

  set listener (value) {
    return $listener.set(this, value)
  }

  get queue () {
    return $queue.get(this)
  }

  set queue (value) {
    return $queue.set(this, value)
  }

  _ensure (eventName) {
    let _listener
    let _queue

    _listener = () => {
      if (!this.listener.hasOwnProperty(eventName)) {
        this.listener[eventName] = []
      }
    }

    _queue = () => {
      if (!this.queue.hasOwnProperty(eventName)) {
        this.queue[eventName] = []
      }
    }

    _listener()
    _queue()
  }

  _consume (eventName) {
    let testListener
    let forEachQueue

    forEachQueue = () => {
      // let _listener
      let _queue

      // let listener
      let queue

      let item

      // _listener = $listener.get(this)
      _queue = $queue.get(this)

      // listener = _listener[eventName]
      queue = _queue[eventName]

      while (queue.length) {
        item = queue.shift()
        $listener.get(this)[eventName].forEach(it => it(item))
      }

      _queue[eventName] = queue
      $queue.set(this, _queue)
    }

    testListener = () => {
      let _listener

      let listener

      _listener = $listener.get(this)

      listener = _listener[eventName]

      if (listener.length > 0) {
        forEachQueue()
      }
    }

    testListener()
  }

  on (eventName, callback) {
    let _listener
    // let _queue

    let listener
    // let queue

    // _queue = $queue.get(this)

    // queue = _queue[eventName]

    this._ensure(eventName)

    _listener = $listener.get(this)
    listener = _listener[eventName]

    listener.push(callback)

    _listener[eventName] = listener
    $listener.set(this, _listener)

    this._consume(eventName)

    // _queue[eventName] = queue
    //
    // $queue.set(this, _queue)
  }

  dispatch (eventName, data = null) {
    // let _listener
    let _queue

    // let listener
    let queue

    // _listener = $listener.get(this)

    // listener = _listener[eventName]

    // console.debug(this.constructor.name,
    //   'Dispatcher:dispatch', 'eventName', eventName)

    this._ensure(eventName)

    _queue = $queue.get(this)
    queue = _queue[eventName]

    queue.push(data)

    _queue[eventName] = queue

    $queue.set(this, _queue)
    this._consume(eventName)


    // _listener[eventName] = listener
    //
    // $listener.set(this, _listener)
  }

  debug () {
    return {
      listener: this.listener,
      queue: this.queue
    }
  }
}

export default Dispatcher
