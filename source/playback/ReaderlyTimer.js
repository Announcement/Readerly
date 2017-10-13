/* ReaderlyTimer.js
 *
 * Transmits fragments from Queue. Uses `delayer` to determine time
 * between each transmition.
 *
 * Based on https://github.com/jamestomasino/read_plugin/blob/master/Read.js
 *
 * TODO;
 * - Speed up with long ff or rewind
 * - ??: Make length delay proportional to word length?
 * - Long word delay not working? How about otherPunc? And do more
 * 	symbols need to be included in that set of otherPunc? Customizable?
 * - Implement more robust pausing? (store in bool and wait for appropriate time)
 *
 * DONE:
 * - Add extra paragraph pause back in
 * - Scrubbing doesn't restart the slow-start value
 *
 * NOTES/GUIDES:
 * - Always return Timer so functions can be chained
 * - Always send Timer as the first argument to events to
 * 	stay consistent.
 */
let $ = require('jquery')
// ;(function(root, timerFactory) {
//   // root is usually `window`
//   if (typeof define === 'function' && define.amd) {
//     // AMD. Register as an anonymous module.
//     define(['jquery'], function(jquery) {
//       return (root.ReaderlyTimer = timerFactory(jquery))
//     })
//   } else if (typeof module === 'object' && module.exports) {
//     // Node. Does not work with strict CommonJS, but only CommonJS-like
//     // environments that support module.exports, like Node.
//     module.exports = timerFactory(require('jquery'))
//   } else {
//     // Browser globals
//     root.ReaderlyTimer = timerFactory(root.jQuery)
//   }
// })(this, function($) {
//   'use strict'

var ReaderlyTimer = function(delayer) {
  /* ( {} ) -> ReaderlyTimer
         *
         */
  var rTim = {}

  rTim._init = function() {
    rTim.done = false

    rTim._timeoutID = null
    rTim._isPlaying = false
    rTim._wasPlaying = false

    // Moving around
    rTim._jumping = false
    rTim._incrementors = [0, 0, 1] // This is a regular 1 step forward move
    rTim._skipWhitespace = false
    rTim._whitespaceRegex = new RegExp('[\n\r]', 'g')
    rTim.util = rTim.prototype

    return rTim
  } // End rTim._init()

  // ============== PASSED ON DIRECTLY FROM QUEUE ============== \\

  rTim.getProgress = function() {
    return rTim._queue.getProgress()
  } // End rTim.gesProsress()

  rTim.getLength = function() {
    return rTim._queue.getLength()
  } // End rTim.gesProsress()
  rTim.getLastSentence = function() {
    return rTim._queue.getLastSentence()
  } // End rTim.gesProsress()
  rTim.getLastWord = function() {
    return rTim._queue.getLastWord()
  } // End rTim.gesProsress()
  rTim.getFragmentCount = function(word) {
    return rTim._queue.getFragmentCount(word)
  } // End rTim.gesProsress()
  rTim.lastWordFragmentCount = function() {
    return rTim.getFragmentCount(rTim.getLastWord())
  }

  // ============== FLOW CONTROL ============== \\

  rTim._noDelayMod = function(startDelay) {
    return startDelay
  }

  rTim._restart = function(startEventName, endEventName, startDelayModFunc) {
    if (startEventName) $(rTim).trigger(startEventName, [rTim])

    rTim.done = false

    // Start slow when next go through loop (restore countdown)
    var delayMod = startDelayModFunc || rTim._noDelayMod
    var delay = delayMod(delayer._settings.slowStartDelay)
    delayer.resetSlowStart(delay)

    // Just put the index at the right place
    rTim._queue.restart()
    rTim._pause(null, null, null)
    rTim.play()

    if (endEventName) $(rTim).trigger(endEventName, [rTim])

    return rTim
  } // End rTim._restart()

  rTim.start = function(queue) {
    // Queue is passed in here, so that a Timer doesn't
    // have to be destroyed every time something new is read

    if (!queue) {
      console.error(
        'No readable object was passed into PlaybackManager. `queue`:',
        rTim._queue
      )
    } else {
      $(rTim).trigger('startBegin', [rTim])

      rTim._queue = queue
      rTim._restart(null, null, null)

      $(rTim).trigger('startFinish', [rTim])
    } // end if no data passed in

    return rTim
  } // End rTim.start()

  rTim.restart = function() {
    rTim._restart('restartBegin', 'restartFinish', null)
    return rTim
  }

  // ??: 'playing' event should go off every time, but if we're
  // restarting without pausing first (pausing would trigger visual
  // feedback about pausing), then should the event not happen? That
  // means the "play" image won't fire off on restarts, even though
  // it feels like it should always fire on play.
  rTim._play = function(startEventName, endEventName) {
    /* ( Str, Str ) -> PlaybackManager
             *
             * For all 'play'-like activities
             * ??: Just one eventName which gets + 'Begin' and + 'Finish' where appropriate?
             */
    // "play" will always be forward. "rewind" can be play, but with "prev".
    rTim._pausesignal = 1
    rTim._incrementors = [0, 0, 1]

    if (startEventName) $(rTim).trigger(startEventName, [rTim])
    rTim.setProlongationCounter()
    rTim.lastWordFragments = {}
    if (!rTim._isPlaying) {
      rTim._isPlaying = true
      rTim._loop([0, 0, 0], false)
    }

    if (endEventName) $(rTim).trigger(endEventName, [rTim])

    return rTim
  } // End rTim._play()

  rTim.play = function() {
    if (rTim.done) {
      rTim.restart()
    } else {
      // Comes back here after restarted
      rTim._play('playBegin', 'playFinish')
    }
    return rTim
  } // End rTim.play()

  rTim._pause = function(startEventName, endEventName, startDelayModFunc) {
    /* ( Str, Str, Func ) -> PlaybackManager
             *
             * For all 'pause'-like activities
             */
    if (startEventName) $(rTim).trigger(startEventName, [rTim])

    clearTimeout(rTim._timeoutID) // Needed? Maybe more immediate.
    rTim._isPlaying = false
    // Start slow when next go through loop (restore countdown)
    var delayMod = startDelayModFunc || rTim._noDelayMod
    var delay = delayMod(delayer._settings.slowStartDelay)
    delayer.resetSlowStart(delay)

    if (endEventName) $(rTim).trigger(endEventName, [rTim])

    return rTim
  } // End rTim._pause()

  // Names for "pause":
  rTim.pause = function() {
    rTim._pause('pauseBegin', 'pauseFinish', null)
    return rTim
  }
  rTim.stop = function() {
    rTim._pause('stopBegin', 'stopFinish', null)
    return rTim
  }
  rTim.close = function() {
    rTim._pause('closeBegin', 'closeFinish', null)
    return rTim
  }

  rTim.togglePlayPause = function() {
    if (rTim._isPlaying) {
      rTim.pause()
    } else {
      rTim.play()
    }
    return rTim
  }

  // ========== FF and REWIND (arrow keys and other) ========== \\
  rTim._oneStepUntimed = function(changes) {
    // Or decrement :/
    rTim._wasPlaying = rTim._isPlaying
    rTim._pause(null, null, null)

    rTim._skipWhitespace = true
    rTim.once(changes)
    rTim._skipWhitespace = false

    if (rTim._wasPlaying) {
      rTim._play(null, null, null)
    }
    return rTim
  } // End rTim._oneStepUntimed()

  rTim.nextWord = function() {
    rTim._oneStepUntimed([0, 1, 0])
    return rTim
  }
  rTim.nextTwoSentences = function() {
    rTim._oneStepUntimed([2, 0, 0])
    return rTim
  }
  rTim.nextSentence = function() {
    rTim._oneStepUntimed([1, 0, 0])
    return rTim
  }

  rTim.prevWord = function() {
    rTim._oneStepUntimed([0, -1, 0])
    return rTim
  }
  rTim.prevTwoSentences = function() {
    rTim._oneStepUntimed([-2, 0, 0])
    return rTim
  }
  rTim.prevSentence = function() {
    rTim._oneStepUntimed([-1, 0, 0])
    return rTim
  }

  // =================== Scrubber bar =================== \\
  rTim.jumpTo = function(playbackObj) {
    // Argument to pass in? 'previous sentence'? 'next sentence'?
    // 'section of document'? An index number?
    // ??: How to give useful feedback from this?
    if (rTim._queue) {
      if (!rTim._jumping) {
        rTim._wasPlaying = rTim._isPlaying
        rTim._pause(null, null, null)
        rTim._jumping = true
      }

      var newIndex = playbackObj.amount,
        oldIndex = rTim._queue.getIndex()
      rTim.once([0, newIndex - oldIndex, 0])
    }
    return rTim
  } // End rTim.jumpTo()

  rTim.disengageJumpTo = function() {
    if (rTim._wasPlaying) {
      rTim._play(null, null, null)
    }
    rTim._jumping = false
    return rTim
  }

  // ================================
  // LOOPS
  // ================================

  rTim.signOf = function(num) {
    return typeof num === 'number'
      ? num ? (num < 0 ? -1 : 1) : num === num ? num : NaN
      : NaN
  }

  var isLastWord = function() {
    return rTim.getProgress() === 1
  }
  var isFragmented = function() {
    return rTim.lastWordFragmentCount() > 1
  }
  var doneNoProlongation = function() {
    return isLastWord() && !isFragmented()
  }
  var doneWithProlongation = function() {
    return isLastWord() && isFragmented() && !rTim.prolongCounter.decrement()
  }
  var isDone = function() {
    return doneNoProlongation() || doneWithProlongation()
  }
  var stopLoop = function() {
    $(rTim).trigger('done', [rTim])
    return !!rTim.stop()
  }
  var stoppedLoop = function() {
    return isDone() ? stopLoop() : false
  }

  rTim._wordsDone = function() {
    // Checks progress
    // Returns `true` if we're at the end of the words and fragments

    var progress = rTim.getProgress()
    // TODO: Needs some work. Fragile.

    $(rTim).trigger('progress', [
      rTim,
      progress,
      rTim._queue.index,
      rTim.getLength()
    ])

    // Stop if we've reached the end;
    rTim.done = stoppedLoop()

    return rTim.done
  } // End rTim._wordsDone()

  rTim._skipDirection = function(incrementors, frag) {
    var vector = [0, 0, 0]

    var hasOnlyNewLines = false,
      chars = frag // Doesn't change frag
    // DEBUGGING
    // Bug crops up when switching word lengths. Moreso at short lengths
    // May be to do with reseting the word to its start when word length is changed
    if (!chars) {
      console.log(
        'frag:',
        frag,
        '; chars:',
        chars,
        '; position:',
        rTim._queue.position
      )
    }
    var noWhitespace = chars.replace(rTim._whitespaceRegex, '')

    // If it's time to skip whitespace and there's nothing but whitespace
    // in the fragment, figure out which direction to move in, and
    // send info to move once in that direction
    if (rTim._skipWhitespace && noWhitespace.length === 0) {
      var senti = rTim._queue.position[0]

      if (incrementors[0] !== 0) {
        vector[0] = rTim.signOf(incrementors[0])
      } else if (incrementors[1] !== 0) {
        vector[1] = rTim.signOf(incrementors[1])
      } else if (incrementors[2] !== 0) {
        vector[2] = rTim.signOf(incrementors[2])

        // For when play passes [0, 0, 0]. ??: Does anything else ever do this?
        // We're going to have to skip in some direction or we'll never get anywhere
      } else {
        vector = [0, 0, 1] // ??: Always true?
      }
    }

    return vector
  } // End rTim._skipDirection()

  rTim._loop = function(incrementors, justOnce) {
    // https://jsfiddle.net/d1mgadeo/2/

    // Finish if we're at the end of the text

    // can't do if (!_isPlaying) because things that call .once() and such also pause

    $(rTim).trigger('loopBegin', [rTim])
    if (rTim._done) {
      return
    }
    // If, for example, calling the loop from the loop, just keep
    // going in the same global direction. Allows for stuff like
    // `._play()` to show current word, then keep going
    incrementors = incrementors || rTim._incrementors // ??: Too indirect?
    var frag = rTim._queue.getFragment(incrementors),
      skipDir = rTim._skipDirection(incrementors, frag) // [int, int, int] of -1, 0, or 1

    // !!! KEEP THIS even though it's not currently needed for sentences. I hope
    // to make paragraphs their own sentences for reasons of accessibility.
    // It's actually useful when navigating by word fragment.
    if (skipDir[0] !== 0 || skipDir[1] !== 0 || skipDir[2] !== 0) {
      $(rTim).trigger('loopSkip', [rTim, frag])
      rTim._loop(skipDir, justOnce)
    } else {
      if (!justOnce) {
        // How long this word will remain on the screen before changing
        var delay = delayer.calcDelay(frag, justOnce) // TODO: for fastforward, modify speed
        //console.log(delay);
        rTim._timeoutID = setTimeout(rTim._loop, delay)
      }

      // Send fragment after setTimeout so that you can easily
      // pause on "newWordFragment". Feels weird, though.
      $(rTim).trigger('newWordFragment', [rTim, frag])
      $(rTim).trigger('loopFinish', [rTim])
    } // end if skip fragment or not skip fragment

    // Finish if we're at the end of the text
    if (rTim._wordsDone()) {
      return rTim
    }

    return rTim // Return timeout id instead?
  } // End rTim._loop()

  rTim.once = function(incrementors) {
    $(rTim).trigger('onceBegin', [rTim])
    rTim._loop(incrementors, true)
    $(rTim).trigger('onceFinish', [rTim])

    return rTim
  } // End rTim.once()

  // ============== Utility ============== \\

  rTim.makeCounter = function(num) {
    var count = num
    var increment = function() {
      return (count = count + 1)
    }
    var decrement = function() {
      return (count = count - 1)
    }
    var getCount = function() {
      return count
    }
    return {
      increment: increment,
      decrement: decrement,
      getCount: getCount
    }
  }
  rTim.setProlongationCounter = function() {
    rTim.prolongCounter = rTim.makeCounter(rTim.lastWordFragmentCount())
  }
  // ============== Utility ============== \\

  rTim._init()
  return rTim
} // End ReaderlyTimer() -> {}
export default ReaderlyTimer
//   return ReaderlyTimer
// })
