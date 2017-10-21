let hasError

hasError = request => reject =>
    request.readyState === 4 && request.status !== 200 && reject(request)

class Request {
  static serialize (object) {

    if (typeof object === 'string')
      return object

    return Object.keys(object)
      .map(key => [key, object[key]])
      .map(parameter => parameter.map(encodeURIComponent))
      .map(parameter => parameter.join('='))
      .join('&')
  }

  static preload (address) {
    let protocol
    let responseType

    protocol = 'GET'
    responseType = 'document'

    return new Promise((resolve, reject) => {
      Request.open({address, protocol, responseType})
        .then(request => resolve(request.responseXML))
        .catch(reject)
    })
  }

  static get (address, query) {
    let data
    let protocol

    data = query && Request.serialize(query) || query
    protocol = 'GET'

    return Request.open({address, protocol, data})
  }

  static post (address, query) {
    let data
    let protocol

    data = query && Request.serialize(query) || query
    protocol = 'POST'

    return Request.send({address, protocol, data})
  }

  static send ({
    address,
    data,
    protocol,
    responseType
  }) {
    let request
    let isError

    request = new XMLHttpRequest()
    isError = hasError(request)

    return new Promise((resolve, reject) => {
      request.open(protocol, address, true)
      if (responseType) request.responseType = responseType
      request.onload = () => resolve(request)
      request.onreadystatechange = () => isError(reject)
      request.send(data)
    })
  }

  static open ({
    address,
    data,
    protocol,
    responseType
  }) {
    let request
    let isError
    let url

    request = new XMLHttpRequest()
    isError = hasError(request)
    url = [address, data].filter(it => it).join('?')

    return new Promise((resolve, reject) => {
      request.open(protocol, url, true)
      if (responseType) request.responseType = responseType
      request.onload = () => resolve(request)
      request.onreadystatechange = () => isError(reject)
      request.send()
    })
  }
}

export default Request
