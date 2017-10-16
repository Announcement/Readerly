(function () {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var rewindImageSource = void 0;
var settingsImageSource = void 0;
function url(it) {
  if (typeof browser === 'undefined') {
    return chrome.runtime.getURL(it);
  } else {
    return browser.extension.getURL(it);
  }
}
settingsImageSource = url('images/settings.png');
rewindImageSource = url('images/rewind.png');
console.debug(settingsImageSource);
console.debug(rewindImageSource);
function shadow(elevation) {
  var sketch = void 0;
  sketch = {};
  sketch['2dp'] = [['0', '0', '4px', rgba(0, 0, 0, .14)], ['0', '3px', '4px', rgba(0, 0, 0, .12)], ['0', '1px', '5px', rgba(128, 128, 128, .20)]].map(function (it) {
    return it.join(' ');
  }).join(', ');
  return sketch[elevation];
}
var stylesheet = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '80px',
  background: rgba(255, 255, 255, 0.8),
  boxShadow: shadow('2dp'),
  display: 'grid',
  justifyItems: 'center',
  alignItems: 'center',
  gridTemplateRows: '4px 1fr',
  gridTemplateColumns: '24px min-content min-content 1fr min-content 24px',
  gridColumnGap: '8px',
  progress: {
    gridColumnStart: '1',
    gridColumnEnd: 'span 6',
    width: '100%',
    height: '100%',
    WebkitAppearance: 'none',
    background: 'white'
  },
  button: {
    height: '36px',
    borderRadius: '2px',
    paddingLeft: '16px',
    paddingRight: '16px',
    outline: 'none',
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderWidth: '0',
    minWidth: '88px',
    boxShadow: shadow('2dp')
  },
  'button.settings': {
    gridColumnStart: '2',
    gridColumnEnd: 'span 1',
    backgroundImage: 'url("' + settingsImageSource + '")',
    backgroundSize: '32px 32px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minWidth: '36px',
    width: 36 + 16 * 2 + 'px',
    content: '',
    color: 'transparent'
  },
  'button.speed': {
    gridColumnStart: '3',
    gridColumnEnd: 'span 1',
    backgroundImage: 'url("' + rewindImageSource + '")',
    backgroundSize: '32px 32px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minWidth: '36px',
    width: 36 + 16 * 2 + 'px',
    content: '',
    color: 'transparent'
  },
  'button.close': {}
};
function rgba(red, green, blue, alpha) {
  return 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + alpha + ')';
}
var Display = function () {
  function Display() {
    classCallCheck(this, Display);
    this.filter = new WeakMap();
    this.zIndex = new WeakMap();
    console.debug('generate display');
    this.element = this.generate();
    console.debug('element', this.element);
    Display.styleize(this.element, stylesheet);
    console.debug('The display has been stylized.');
  }
  createClass(Display, [{
    key: 'generate',
    value: function generate() {
      var _this = this;
      var element = void 0;
      var progressElement = void 0;
      var settingsElement = void 0;
      var speedElement = void 0;
      var playbackElement = void 0;
      var closeElement = void 0;
      var checkElement = void 0;
      var settingsText = void 0;
      var speedText = void 0;
      var closeText = void 0;
      element = document.createElement('section');
      progressElement = document.createElement('progress');
      settingsElement = document.createElement('button');
      speedElement = document.createElement('button');
      closeElement = document.createElement('button');
      checkElement = document.createElement('input');
      playbackElement = document.createElement('div');
      settingsText = document.createTextNode('Settings');
      speedText = document.createTextNode('Speed');
      closeText = document.createTextNode('Close');
      settingsElement.appendChild(settingsText);
      speedElement.appendChild(speedText);
      closeElement.appendChild(closeText);
      element.appendChild(progressElement);
      element.appendChild(settingsElement);
      element.appendChild(speedElement);
      element.appendChild(playbackElement);
      element.appendChild(closeElement);
      progressElement.setAttribute('value', '50');
      progressElement.setAttribute('max', '100');
      settingsElement.classList.add('settings');
      speedElement.classList.add('speed');
      playbackElement.classList.add('playback');
      closeElement.classList.add('close');
      console.debug('attach listeners');
      settingsElement.addEventListener('click', function () {
        return _this._settings();
      });
      speedElement.addEventListener('click', function () {
        return _this._speed();
      });
      closeElement.addEventListener('click', function () {
        return _this._close();
      });
      element.id = 'readerly';
      function scope(element) {
        var index = void 0;
        element.classList.add('readerly');
        element.style.initial = 'all';
        for (index = 0; index < element.children.length; index++) {
          scope(element.children[index]);
        }
      }
      console.debug('run scope');
      scope(element);
      console.debug('finish scope');
      return element;
    }
  }, {
    key: '_settings',
    value: function _settings() {}
  }, {
    key: '_speed',
    value: function _speed() {}
  }, {
    key: '_close',
    value: function _close() {
      this.blur();
      this.close();
    }
  }, {
    key: 'close',
    value: function close() {
      document.body.removeChild(this.element);
    }
  }, {
    key: 'open',
    value: function open() {
      document.body.appendChild(this.element);
    }
  }, {
    key: 'focus',
    value: function focus() {
      var _this2 = this;
      var zIndexMaximum = void 0;
      zIndexMaximum = 0;
      document.querySelectorAll('body > *').forEach(function (it) {
        if (it !== _this2.element) {
          _this2.filter.set(it, it.style.filter);
          it.style.filter = 'blur(4px)';
        }
      });
      document.querySelectorAll('body *').forEach(function (it) {
        if (it !== _this2.element && it.style['z-index']) {
          zIndexMaximum = Math.max(parseInt(it.style['z-index'], 10), zIndexMaximum);
        }
      });
      this.element.style['z-index'] = zIndexMaximum + 1;
    }
  }, {
    key: 'blur',
    value: function blur() {
      var _this3 = this;
      document.querySelectorAll('body > *').forEach(function (it) {
        if (_this3.filter.has(it)) {
          it.style.filter = _this3.filter.get(it);
        }
      });
    }
  }], [{
    key: 'styleize',
    value: function styleize(it, styles) {
      if (!it) return false;
      var stylesheetElement = void 0;
      var stylesheetNode = void 0;
      console.debug('styleize');
      stylesheetElement = document.createElement('style');
      document.head.appendChild(stylesheetElement);
      stylesheetNode = document.styleSheets[document.styleSheets.length - 1];
      this.stylesheet = stylesheetNode;
      console.debug('insert rules');
      if (typeof browser === 'undefined') {
        this.stylesheet.insertRule('progress::-webkit-progress-bar { background: #8C9EFF; }');
        this.stylesheet.insertRule('progress::-webkit-progress-value { background: #3D5AFE; }');
      }
      console.debug('Read virtual stylesheet');
      Object.keys(styles).forEach(function (key) {
        var value = void 0;
        value = styles[key];
        if (value.constructor === Array) {
          value = value.join(' ');
        }
        console.debug(styles, key);
        assign(key, value);
        find(key, value);
      });
      function assign(key, value) {
        key = key.replace(/([A-Z])/g, function (it) {
          return '-' + it.toLowerCase();
        });
        if (typeof value === 'string') {
          it.style[key] = value;
        }
      }
      function find(key, value) {
        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
          it.querySelectorAll(key).forEach(function (it) {
            return Display.styleize(it, value);
          });
        }
      }
    }
  }]);
  return Display;
}();

var $browser = void 0;
var display = void 0;
var onMessageCache = void 0;
$browser = chrome || browser;
console.debug('Waiting for the document.');
console.debug('Trying to load display.');
display = new Display();
console.debug('The display is finally ready.');
function onMessage(request, sender, sendResponse) {
  if (onMessageCache === request.time) {
    return false;
  }
  onMessageCache = request.time;
  display.open();
  display.focus();
}
try {
  $browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (onMessageCache === request.time) {
      return false;
    }
    console.debug('runtime message', request, sender);
    onMessage(request, sender, sendResponse);
  });
  console.debug('Listening to runtime messages :)');
} catch (e) {
  console.debug('Failed to read extension messages');
}
try {
  $browser.extension.onMessage.addListener(function (request, sender, sendResponse) {
    if (onMessageCache === request.time) {
      return false;
    }
    console.debug('extension message', request, sender);
    onMessage(request, sender, sendResponse);
  });
  console.debug('Listening to extension messages :)');
} catch (e) {
  console.debug('Failed to read extension messages');
}

}());
//# sourceMappingURL=build.js.map
