// Settings.js

// ;(function(root, settingsFactory) {
//   // root is usually `window`
//   if (typeof define === 'function' && define.amd) {
//     // AMD. Register as an anonymous module.
//     define([], function() {
//       return (root.Settings = settingsFactory())
//     })
//   } else if (typeof module === 'object' && module.exports) {
//     // Node. Does not work with strict CommonJS, but only CommonJS-like
//     // environments that support module.exports, like Node.
//     module.exports = settingsFactory()
//   } else {
//     // Browser globals
//     root.Settings = settingsFactory()
//   }
// })(this, function() {
//   'use strict'

var Settings = function(storage, oldSettings) {
  var rSet = {}

  // ================================
  // SETUP
  // ================================

  rSet._debug = false

  // Not needed, but might be nice to have:
  rSet.available = [
    // ==== delayer ====
    'wpm',
    '_baseDelay',
    'slowStartDelay',
    'sentenceDelay',
    'otherPuncDelay',
    'numericDelay',
    'shortWordDelay',
    'longWordDelay',
    'halfSpeed',
    // 'wordLengthDelays',
    // ==== fragmentor/splitter ====
    'maxNumCharacters'
  ]

  // !!! Only use for GETTING values, NOT for setting them !!!
  var _settings = (rSet._settings = {
    // ==== word delays ====
    wpm: 450,
    _baseDelay: 1 / (250 / 60) * 1000, // based on wpm
    slowStartDelay: 5,
    sentenceDelay: 4.7,
    otherPuncDelay: 1.1,
    numericDelay: 1.4,
    shortWordDelay: 1.0, // Will be obsolete
    longWordDelay: 1.1, // Will be obsolete
    delayModifier: 1,
    sentenceModifier: 1,
    // wordLengthDelays: { 1: 1.3, 2: 1.3, 3: 1.3,
    // 	4: 1, 5: 1, 6: 1,
    // 	7: 1.3, 8: 1.3, 9: 1.3,
    // 	10: 1.5, 11: 1.5, 12: 1.5, 13: 1.5,
    // 	14: 1.8, 15: 1.8, 16: 1.8  // Anything more will be 2?
    // },
    // ==== fragmentor/splitter ===
    maxNumCharacters: 12
  })

  // ================================
  // HOOKS
  // ================================
  rSet.add = function(settingName, initialVal, normalizingFunction) {
    // Don't override already existing setting
    if (_settings[settingName]) {
      console.warn(
        'The setting called',
        settingName,
        'already exists. Try using a different name. Check "yourSettings.available" for all the existing settings names.'
      )
      return rSet
    }

    rSet.available.push(settingName)
    _settings[settingName] = initialVal
    rSet['_get_' + settingName] = normalizingFunction
    rSet.set(settingName, initialVal)

    return rSet
  } // End rSet.add()

  // ================================
  // RUNTIME
  // ================================

  rSet.set = function(settingName, value) {
    // ??: Convert all to lowercase instead? If we use of lowercase,
    // we can remove at least some typo mistakes and uncertainties.

    if (_settings[settingName] === undefined) {
      console.error(
        'There is no approved setting by the name of "' +
          settingName +
          '". Maybe check your capitalization. Also, you can check `yourSetayerObj.settingsAvailable` to see what setting names are available to you.'
      )
      return false
    }

    // If it's not a private/special variable
    if (settingName[0] !== '_') {
      // Save it in storage
      var val = rSet['_get_' + settingName](value) // normalize value
      _settings[settingName] = val // Save locally

      // (First make it possible to use settingName as a key instead of
      // the literal word "settingName")
      var toSave = {}
      toSave[settingName] = val
      storage.set(toSave) // ??: Should this be all lowercase too?

      if (rSet._debug) {
        console.log(
          'The setting',
          settingName,
          'has just been saved with the normalized value',
          val
        )
      }
    }

    return rSet
  } // End rSet.set()

  rSet.isModifier = function(num) {
    return rSet._get_delayModifier(_settings.delayModifier) === num
  }

  rSet._withinLimits = function(val, min, max) {
    var minLimited = Math.max(min, val)
    return Math.min(max, minLimited)
  }

  rSet._toUsefulVal = function(val, min, max) {
    var num = parseFloat(val)
    return rSet._withinLimits(num, min, max)
  }

  rSet._calcBaseDelay = function(wpm) {
    return 1 / (wpm / 60) * 1000 // to milliseconds
  }

  // ======== Word Delays ========
  rSet._get_wpm = function(val) {
    var wpm = rSet._toUsefulVal(val, 25, 1000)
    _settings._baseDelay = rSet._calcBaseDelay(wpm) // to milliseconds
    return wpm
  }
  rSet._get_slowStartDelay = function(val) {
    return rSet._toUsefulVal(val, 0, 10)
  }
  rSet._get_sentenceDelay = function(val) {
    return rSet._toUsefulVal(val, 1, 10)
  }
  rSet._get_otherPuncDelay = function(val) {
    return rSet._toUsefulVal(val, 1, 10)
  }
  rSet._get_numericDelay = function(val) {
    return rSet._toUsefulVal(val, 1, 10)
  }
  rSet._get_shortWordDelay = function(val) {
    return rSet._toUsefulVal(val, 1, 10)
  }
  rSet._get_longWordDelay = function(val) {
    return rSet._toUsefulVal(val, 1, 10)
  }
  rSet._get_delayModifier = function(val) {
    return rSet._toUsefulVal(val, 1, 10)
  }
  rSet._get_sentenceModifier = function(val) {
    return val
  }

  // rSet._get_wordLengthDelays = function ( val ) {
  // 	return rSet._toUsefulVal( val, 1, 10 );
  // };

  // ======== Fragmentor/splitter ========
  rSet._get_maxNumCharacters = function(val) {
    return rSet._toUsefulVal(val, 1, 1000) // Minimum allowed characters = 1
  }

  // ================================
  // FILL IT IN
  // ================================

  rSet._init = function(oldSettings) {
    // Update local and long term memory settings based on what's passed in
    // Also normalizes values before saving them

    // FOR DEBUGGING
    if (rSet._debug) {
      storage.clear()
    }

    if (!oldSettings) {
      oldSettings = rSet.defaults
      storage.set(rSet.defaults, function(val) {
        console.log('Settings saved for first time:', val)
      })
    }

    for (let key in _settings) {
      let val = oldSettings[key] || _settings[key]
      rSet.set(key, val)
    }

    return rSet
  } // End rSet.init()

  // =========== BUILD =========== \\
  rSet._init(oldSettings)

  // To be invoked in a script
  return rSet
} // End Settings() -> {}
module.exports = Settings
// To put on the window object, or export into a module
//   return Settings
// })
