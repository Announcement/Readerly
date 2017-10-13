// playback-CSS.js
// css that's bundleable

// ;(function(root, playbackCSSFactory) {
//   // root is usually `window`
//   if (typeof define === 'function' && define.amd) {
//     // AMD. Register as an anonymous module.
//     define([], function() {
//       return (root.playbackCSS = playbackCSSFactory())
//     })
//   } else if (typeof module === 'object' && module.exports) {
//     // Node. Does not work with strict CommonJS, but only CommonJS-like
//     // environments that support module.exports, like Node.
//     module.exports = playbackCSSFactory()
//   } else {
//     // Browser globals
//     root.playbackCSS = playbackCSSFactory()
//   }
// })(this, function() {
//   'use strict'

export default "/* readerly-playback.css */\
\
/* ============================== */\
/* STRUCTURE */\
/* ============================== */\
#__rdly_progress {\
	position: relative;\
	height: 7px;\
	width: 100%;\
	/* function */\
	/*cursor: pointer;*/\
}\
#__rdly_percent_done {\
	position: relative;\
	height: 100%;\
	width: 0;\
	transition: width 200ms linear;\
}\
#__rdly_scrubber {\
	/* Probably needs to be an arrow pointing up. svg time */\
	position: absolute;\
	height: .75rem;\
	width: .5rem;\
	right: 0;\
	top:0;\
	transform: translate( 50%, 0 );\
}\
\
#__rdly_indicator {\
	/* Don't get in the way of text */\
	position: absolute;\
	z-index: -10;\
}\
#__rdly_text_button {\
	width: 100%;\
	height: 100%;\
	text-align: center;\
        outline: none;\
}\
#__rdly_loading {\
	/* Can't be centered with transform because transform is used to rotate it */\
	/* Horizontally centered by parent text-align */\
	display: inline-block;\
	width: 2em;\
	height: 2em;\
}\
\
#__rdly_restart {\
	/*position: relative;*/\
	/*width: 1.5em;*/\
	/*height: 1.5em;*/\
	/* function */\
	/*cursor: pointer;*/\
}\
\
#__rdly_playback_controls {\
	clear: both;\
	height: 1em;\
	/* For now */\
	display: none;\
}\
#__rdly_playback_controls:last-child {\
	padding-right: 0;\
}\
\
/* This should be controlled elsewhere */\
.__rdly-playback-button,\
.__rdly-playback-feedback {\
        user-select: none;\
	width: 2.5em;\
	height: 2.5em;\
}\
\
#__rdly_play_pause_feedback {\
	display: flex;\
	/*function*/\
        user-select: none;\
	pointer-events: none;\
        height: 100%;\
}\
#__rdly_play_feedback, #__rdly_pause_feedback {\
	display: flex;\
        user-select: none;\
    align-items: center;\
    justify-content: center;\
}\
\
\
/* ============================== */\
/* SKIN */\
/* ============================== */\
#__rdly_above_bar {\
	border-bottom: 0;\
}\
\
#__rdly_progress {\
	border:0;\
	border-top: 1px solid gray;\
	border-bottom: 1px solid gray;\
}\
#__rdly_percent_done {\
	background-color: #3498db;\
}\
#__rdly_scrubber {\
	/* temp */\
	/*background-color: rgba( 0, 0, 0, 0.2 );*/\
}\
\
\
\
#__rdly_indicator {\
	height: 1.52em;\
        top: 54%;\
        color:   #ff9999;\
}\
/* Somehow get rid of the need for #__rdly in this definition */\
#__rdly #__rdly_text_button {\
    background: none;\
    border: none;\
    height: 90%;\
    outline: none;\
\
	font-family: 'droid', serif;\
	font-size: 35px;\
	line-height: normal;\
	font-style: normal;\
	font-variant: none;\
	font-stretch: normal;\
	font-feature-settings: normal;\
	font-kerning: auto;\
	text-transform: none;\
}\
#__rdly_loading {\
	fill: rgba( 150, 150, 150, 1 );\
	/* temp for visibility before icon is chosen */\
	border: 1px solid gray;\
}\
\
#__rdly_play_feedback, #__rdly_pause_feedback {\
	border-radius: 50%;\
	width: 1.75em;\
        height: 1.75em;\
        font-size: inherit;\
        font-weight: bold;\
        color: rgb(220, 220, 220);\
        background: rgb(50, 50, 50);\
        user-select: none;\
}\
\
#__rdly_rewind_sentence {\
	/*background-image: url('');*/\
}\
#__rdly_rewind_word {\
	/*background-image: url('');*/\
}\
#__rdly_pause {\
	/*background-image: url('');*/\
}\
#__rdly_play {\
	/*background-image: url('');*/\
}\
#__rdly_fastforward_word {\
	/*background-image: url('');*/\
}\
#__rdly_fastforward_sentence {\
	/*background-image: url('');*/\
}\
\
#__rdly_restart {\
	/*background-image: url('');*/\
}\
\
.__rdly-selected {\
	background-color: salmon !important;\
}\
"
