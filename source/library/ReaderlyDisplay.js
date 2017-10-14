/* ReaderlyDisplay.js
 *
 * Just the Readerly text display, including areas for
 * future buttons. No settings, etc.
 *
 * Based on https://github.com/jamestomasino/read_plugin/blob/master/Read.js
 *
 * NOTES:
 * - name - ReaderlyBar? ReaderlySee?
 *
 * TODO:
 * - Consider prepending main element as opposed to appending it. Possibly
 * 	easer for screen readers/tabing to find more quickly (so the controls
 * 	can be accessed more quickly). Though now it's an iframe, so how does
 * 	that work for accessibility...? Maybe set up some tab-able controls
 * 	that are invisibile that are outside of the iframe...
 */

let $ = require('jquery')
let coreCSSstr = require('./core-CSS')
let nouiCSSstr = require('./settings/noui-CSS')
//
// (function(root, displayFactory) {  // root is usually `window`
//     if(typeof define === 'function' && define.amd) {
//         // AMD. Register as an anonymous module.
//         define(['jquery', 'core-CSS', 'settings/noui-CSS'], function(jquery, nouiCSS) {
//             return ( root.ReaderlyDisplay = displayFactory(jquery, nouiCSS) );
//         });
//     } else if(typeof module === 'object' && module.exports) {
//         // Node. Does not work with strict CommonJS, but only CommonJS-like
//         // environments that support module.exports, like Node.
//         module.exports = displayFactory(require('jquery'), require('./core-CSS'), require('./settings/noui-CSS'));
//     } else {
//         // Browser globals
//         root.ReaderlyDisplay = displayFactory(root.jQuery, root.nouiCSS);
//     }
// }(this, function($, coreCSSstr, nouiCSSstr) {

// 'use strict';

var ReaderlyDisplay = function (timer, parentNode, settings) {
  var rDis = {}

  rDis._toTrigger = []

  var readerly, textElems, $iframe

  var iframeStr = '<iframe id="__rdly_iframe"></iframe>'

  var cssStr = '<style>' + coreCSSstr + '\n' + nouiCSSstr + '</style>'

  //  TODO: Change (almost) all these to id's
  var htmlStr =
    '<div id="__rdly">\
	<div id="__rdly_above_bar" class="__rdly-main-section"></div>\
	<div id="__rdly_bar" class="__rdly-main-section">\
		<div class="__rdly-bar-section __rdly-bar-left"></div>\
		<div class="__rdly-bar-section __rdly-bar-center __rdly-transform-centered">\
			<div id="__rdly_above_text_elements"></div>\
			<div id="__rdly_left_text_elements"></div>\
			<div id="__rdly_text_elements"></div>\
			<div id="__rdly_right_text_elements"></div>\
			<div id="__rdly_below_text_elements"></div>\
		</div>\
		<div class="__rdly-bar-section __rdly-bar-right2">\
			<label for="__rdly_halvespeed_input">*</label>\
            <input id="__rdly_halvespeed_input" class="__rdly-checkbox-input" type="checkbox"/>\
		</div>\
		<div class="__rdly-bar-section __rdly-bar-right">\
			<button id="__rdly_close" class="__rdly-sup-menu-button">x</button>\
		</div>\
	</div>\
	<div id="__rdly_below_bar" class="__rdly-main-section __rdly-hidden"></div>\
</div>'

  // =========== HOOKS =========== \\

  rDis.addToTriggerList = function (newObjWithTriggerFuncts) {
    // TODO: Prevent duplicates
    rDis._toTrigger.push(newObjWithTriggerFuncts)
    return rDis
  }

  // =========== RUNTIME ACTIONS =========== \\

  rDis.close = function () {
    // This is where everything gets closed, paused, put away
    rDis.hide()
    for (let trigi = 0; trigi < rDis._toTrigger.length; trigi++) {
      let obj = rDis._toTrigger[trigi]
      if (obj.close) obj.close()
    }
    return rDis
  }

  rDis.open = function () {
    rDis.show()
    for (let trigi = 0; trigi < rDis._toTrigger.length; trigi++) {
      let obj = rDis._toTrigger[trigi]
      if (obj.open) obj.open()
    }
    return rDis
  }

  var keybinds = function (event) {
    switch (event.keyCode) {
      case 27: // Esc - close menu
        rDis.close()
        break

      case 192:
      case 32: // ' - toggle play/pause
        document.activeElement.blur()
        document.getElementById('__rdly_iframe').focus()
        $(readerly)
          .find('#__rdly_text_button')
          .click()
        break

      default:
        return
    }

    return false
  }

  var iframe

  var style = document.createElement('style')

  var style2 = document.createElement('style')

  rDis.show = function () {
    $iframe.show()
    style.textContent =
      'p, a, i, li, h1, h2, h3, h4, h5, h6, img, div.tx, div.tx1, div.tx2 :not(iframe):not(script) { filter: blur(2.5px); user-select:none; pointer-events:none; } body :not(iframe):not(script) { user-select:none; pointer-events:none; } #__rdly_iframe { user-select:none; }'
    style2.textContent = 'html, body, .mw-body { background-color: #F5F5F5; } '
    document.body.appendChild(style2)
    document.body.appendChild(style)
    window.addEventListener('keydown', keybinds)
    iframe = document.getElementById('__rdly_iframe')
    iframe.contentDocument.body.addEventListener('keydown', keybinds)
    document.getElementById('__rdly_iframe').focus()
    // $(readerly).slideDown(200);
    return rDis
  }

  rDis.hide = function () {
    $iframe.hide()
    document.body.removeChild(style)
    document.body.removeChild(style2)
    window.removeEventListener('keydown', keybinds)
    iframe.contentDocument.body.removeEventListener('keydown', keybinds)
    document.activeElement.blur()
    // $(readerly).slideUp(200);
    return rDis
  }

  rDis.destroy = function () {
    $(readerly).remove()
    return rDis
  }

  // iframe element sizing
  // https://jsfiddle.net/fpd4fb80/31/
  rDis._resizeIframeAndContents = function () {
    // There should only be one (for now...)
    var grower = $(readerly).find('.__rdly-to-grow')[0]

    // For when the element isn't made yet or isn't visible
    if (!grower) {
      return rDis
    }

    var scrollable = $(grower).parent()[0],
      scrollRect = scrollable.getBoundingClientRect()

    // Get the difference between the lowest point of the
    // unscrolled scrollable content and the lowest visible point
    // Takes into account everything above and including, but not
    // below, the scrollable content

    // Takes into account everything above the scrollable element
    // including borders/padding/etc.
    var top = scrollable.getBoundingClientRect().top,
      // Takes into account the height of the element that's
      // currently going to be scrolled
      height = grower.getBoundingClientRect().height,
      // The bottom of where the contents would end if you weren't
      // scrolled and no adjustments for size were made.
      potentialBottom = top + height,
      // The bottom of the the visible window
      screenBottom = document.documentElement.clientHeight,
      // How much needs to be subtracted (almost, see below) from the
      // scrollable node's height (not contents) in order to fit on the page.
      diff = potentialBottom - screenBottom

    // Have taken care off stuff above and in the contents
    // Now will account for all the padding/borders, etc at
    // the bottom that may otherwise get cut off in some browsers
    // (Have to calcuate this again because the viewport might have changed on scroll)
    var scrollBottom = scrollable.getBoundingClientRect().bottom,
      // The bottom of the outer-most node, so we can pull everything
      // up to be visible
      outerBottom = readerly.getBoundingClientRect().bottom,
      bottomDiff = outerBottom - scrollBottom

    diff = diff + bottomDiff

    var newHeight = height
    if (diff > 0) {
      newHeight = height - diff
    }
    scrollable.style.height = newHeight + 'px'

    // Since the outer element is being used to determine the height of
    // the iframe, I assume it's at the very top of the iframe, so no
    // extra 'outer top' value needs to be subtracted.
    var currentOuterHeight = top + newHeight + bottomDiff

    $iframe[0].style.height = currentOuterHeight + 'px'

    return rDis
  } // End rDis._resizeIframeAndContents()

  rDis.update = function () {
    // Callable from outside to have the display resize what it needs it

    // Note on previous bug. Solution was to call function first without a delay
    // then with one.
    // Seemed to be a Chrome issue going on. Needed to call this twice with a delay.
    // Don't remember what it was, but it wasn't from lag. Something really didn't
    // work until this was called for the second time. Something to do with going
    // from height: 0 to whatever height
    setTimeout(rDis._resizeIframeAndContents, 4)
    // Delay probably won't work when there's a lot of lag.
    // TODO: Wait for an element to appear properly before calling resize
    return rDis
  }

  rDis.toggleHalfSpeed = function (event) {
    var delayModifier = event.target.checked ? 2.25 : 1
    settings.set('delayModifier', delayModifier)

    var sentenceModifier = event.target.checked ? 0.6 : 1
    settings.set('sentenceModifier', sentenceModifier)
  }

  // =========== INITIALIZE =========== \\

  var isSpeedHalved = settings.isModifier.bind(null, 2.25)
  rDis._addEvents = function () {
    $(rDis.nodes.close).on('touchend click', rDis.close)
    $(readerly).on('mousedown mouseup touchstart touchend', rDis.update)
    $(rDis.nodes.halfSpeed)[0].checked = isSpeedHalved()
    $(rDis.nodes.halfSpeed).on('change', rDis.toggleHalfSpeed)
    $(window).on('resize', rDis.update)
    // Event for content zooming?
    return rDis
  }

  rDis._addNodes = function (parentNode) {
    if (!parentNode) {
      parentNode = $(document.body)[0]
    }

    $iframe = $(iframeStr)
    $iframe.appendTo(parentNode)

    var doc = $iframe[0].contentDocument
    doc.body.style['overflow-x'] = 'hidden'
    doc.body.style['overflow-y'] = 'hidden'

    readerly = rDis._readerlyNode = $(htmlStr)[0]
    $(readerly).appendTo(doc.body)

    // STYLES
    var $styles = $(cssStr)
    $styles.appendTo(doc.head)
    $iframe[0].style.minHeight = '81px'
    // ??: Is this useful?

    rDis.nodes = {
      doc: doc,
      head: doc.head,
      body: doc.body,
      readerly: readerly,
      above: $(readerly).find('#__rdly_above_bar')[0],
      bar: $(readerly).find('#__rdly-bar')[0],
      barLeft: $(readerly).find('.__rdly-bar-left')[0],
      barCenter: $(readerly).find('.__rdly-bar-center')[0],
      aboveText: $(readerly).find('#__rdly_above_text_elements')[0],
      leftOfText: $(readerly).find('#__rdly_left_text_elements')[0],
      textElements: $(readerly).find('#__rdly_text_elements')[0],
      rightOfText: $(readerly).find('#__rdly_right_text_elements')[0],
      belowText: $(readerly).find('#__rdly_below_text_elements')[0],
      barRight: $(readerly).find('.__rdly-bar-right')[0],
      close: $(readerly).find('#__rdly_close')[0],
      halfSpeed: $(readerly).find('#__rdly_halvespeed_input')[0],
      below: $(readerly).find('#__rdly_below_bar')[0]
    }
    return rDis
  } // End rDis._addNodes()

  rDis._init = function (parentNode) {
    if (!$('#__rdly_iframe')[0]) {
      rDis
        ._addNodes(parentNode)
        ._addEvents()
        // This is in the wrong place
        // Reconfig needed. This should construct timer?
        // Create parent object instead?
        .addToTriggerList(timer)

      // This should not be visible until it's .show()n
      $iframe.hide()
      // $(readerly).hide( 0, rDis.update )
      $('#__rdly_iframe').hide(0)
    }
    return rDis
  }

  // =========== ADD NODE, ETC. =========== \\
  // Don't show at start, only when prompted
  rDis._init(parentNode)

  // To be called in a script
  return rDis
} // End ReaderlyDisplay() -> {}

// To put on the window object, or export into a module
// return ReaderlyDisplay;
// module.exports = ReaderlyDisplay
export default ReaderlyDisplay
// }));
