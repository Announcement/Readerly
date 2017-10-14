'use strict';

var _Parser = require('./source/library/parse/Parser');

var _Parser2 = _interopRequireDefault(_Parser);

var _ParserSetup = require('./source/library/ParserSetup');

var _ParserSetup2 = _interopRequireDefault(_ParserSetup);

var _Settings = require('./source/library/settings/Settings');

var _Settings2 = _interopRequireDefault(_Settings);

var _ReaderlyStorage = require('./source/library/ReaderlyStorage');

var _ReaderlyStorage2 = _interopRequireDefault(_ReaderlyStorage);

var _WordNav = require('./source/library/parse/WordNav');

var _WordNav2 = _interopRequireDefault(_WordNav);

var _WordSplitter = require('./source/library/parse/WordSplitter');

var _WordSplitter2 = _interopRequireDefault(_WordSplitter);

var _StringTime = require('./source/library/playback/StringTime');

var _StringTime2 = _interopRequireDefault(_StringTime);

var _ReaderlyTimer = require('./source/library/playback/ReaderlyTimer');

var _ReaderlyTimer2 = _interopRequireDefault(_ReaderlyTimer);

var _ReaderlyDisplay = require('./source/library/ReaderlyDisplay');

var _ReaderlyDisplay2 = _interopRequireDefault(_ReaderlyDisplay);

var _PlaybackUI = require('./source/library/playback/PlaybackUI.js');

var _PlaybackUI2 = _interopRequireDefault(_PlaybackUI);

var _ReaderlySettings = require('./source/library/settings/ReaderlySettings.js');

var _ReaderlySettings2 = _interopRequireDefault(_ReaderlySettings);

var _SpeedSettings = require('./source/library/settings/SpeedSettings.js');

var _SpeedSettings2 = _interopRequireDefault(_SpeedSettings);

var _WordSettings = require('./source/library/settings/WordSettings.js');

var _WordSettings2 = _interopRequireDefault(_WordSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $ = require('jquery');

//
// const Parser = require('./lib/parse/Parser.js')
// const ParserSetup = require('./lib/ParserSetup.js')
//
// const Settings = require('./lib/settings/Settings.js')
// const Storage = require('./lib/ReaderlyStorage.js')
// const WordNav = require('./lib/parse/WordNav.js')
// const WordSplitter = require('./lib/parse/WordSplitter.js')
// const Delayer = require('./lib/playback/StringTime. js')
// const Timer = require('./lib/playback/ReaderlyTimer.js')
// const Display = require('./lib/ReaderlyDisplay.js')
// const PlaybackUI = require('./lib/playback/PlaybackUI.js')
// const SettingsUI = require('./lib/settings/ReaderlySettings.js')
// const SpeedSetsUI = require('./lib/settings/SpeedSettings.js')
// const WordSetsUI = require('./lib/settings/WordSettings.js')

// import * as $ from 'jquery'
var $browser = chrome || browser;

var coreDisplay = void 0;
var delayer = void 0;
var fragmentor = void 0;
var lastSelected = void 0;
var lastTarget = void 0;
var parser = void 0;
var playback = void 0;
var selected = void 0;
var settingsUI = void 0;
var speed = void 0;
var storage = void 0;
var timer = void 0;
var wordNav = void 0;

selected = [];

// document.body.style.border = '10px solid red'

init();
$browser.extension.onMessage.addListener(onMessage);

/**
 * Detect the type of code?
 * @method identifyCode
 *
 * @param documentNode
 *
 * @returns {boolean} Representing whether or not the node could be detected.
 */
function identifyCode(documentNode) {
  var statements = void 0;
  var that = void 0;

  statements = [{
    test: function test() {
      return documentNode.tagName === 'PRE' || documentNode.tagName === 'CODE';
    },

    unit: function unit() {
      return true;
    }
  }, {
    test: function test() {
      return documentNode.childNodes.length === 1;
    },

    unit: function unit() {
      return identifyCode(documentNode.childNodes[0]);
    }
  }, {
    test: function test() {
      return true;
    },

    unit: function unit() {
      return false;
    }
  }];

  return statements.find(function (it) {
    return it.test();
  }).unit();
}

/**
 * Get split methods for each childNode in documentNode.
 * @method splitCode
 *
 * @param {Node} documentNode
 */
function splitCode(documentNode) {
  var array = void 0;

  array = Array.from(documentNode.childNodes);

  return array.map(function (childNode) {
    var splitMethod = void 0;
    var textContent = void 0;

    textContent = childNode.textContent;

    if (textContent.trim().length !== 0) {
      splitMethod = function () {
        return identifyCode(childNode) ? 'lines' : 'sentences';
      }();
      return {
        splitMethod: splitMethod,
        text: textContent
      };
    }
  }).filter(function (it) {
    return it !== null;
  });
}

/**
 * Listen for a timer event.
 * @method addEvents
 */
function addEvents() {
  $(timer).on('starting', playback.wait);
}

/**
 * Looks like the original author was using constructors in a silly way,
 * also set a timer and use addEvents.
 *
 * @method afterLoadSettings
 *
 * @param {object} oldSettings - The old settings I guess.
 */
function afterLoadSettings(oldSettings) {
  var setts;
  var speedSetsUI = void 0;
  var wordSetsUI = void 0;

  setts = new _Settings2.default(storage, oldSettings);
  delayer = new _StringTime2.default(setts._settings);
  timer = new _ReaderlyTimer2.default(delayer);
  coreDisplay = new _ReaderlyDisplay2.default(timer, undefined, setts);

  var textElem = coreDisplay.nodes.textElements;
  fragmentor = new _WordSplitter2.default(textElem, setts);

  playback = new _PlaybackUI2.default(timer, coreDisplay);
  settingsUI = new _ReaderlySettings2.default(coreDisplay);
  speedSetsUI = new _SpeedSettings2.default(setts, settingsUI);
  wordSetsUI = new _WordSettings2.default(setts, settingsUI);

  addEvents();
}

/**
 * Generate a new initialized parser.
 * @method getParser
 *
 * @returns {Parser}
 */
function getParser() {
  var parserSetup = void 0;
  var parser = void 0;

  var cleanNode = void 0;
  var detectLanguage = void 0;
  var findArticle = void 0;
  var cleanText = void 0;
  var splitSentences = void 0;

  parserSetup = new _ParserSetup2.default();

  parserSetup.debug = false;

  cleanNode = parserSetup.cleanNode;
  detectLanguage = parserSetup.detectLanguage;
  findArticle = parserSetup.findArticle;
  cleanText = parserSetup.cleanText;
  splitSentences = parserSetup.splitSentences;

  parser = new _Parser2.default({
    cleanNode: cleanNode,
    detectLanguage: detectLanguage,
    findArticle: findArticle,
    cleanText: cleanText,
    splitSentences: splitSentences
  });

  return parser;
}

function init() {
  parser = getParser();
  parser.debug = false;
  wordNav = new _WordNav2.default();
  storage = new _ReaderlyStorage2.default();

  if (parser.debug) {
    storage.clear();
    console.debug('Cleared Storage');
  }

  storage.loadAll(afterLoadSettings);
}

/**
 * Some debugging stuff, process some stuff, parse some stuff, start a timer.
 * @method read
 *
 * @param {array|string} node - A quick peek at Parser.parse checks for array or string so i guess that's what they want.
 *
 * @returns {boolean} Will always be true, don't know why at the moment.
 */
function read(node) {
  var sentenceWords = void 0;

  sentenceWords = parser.parse(node);

  debug();

  wordNav.process(sentenceWords, fragmentor);
  timer.start(wordNav);

  return true;

  /**
   * Help non-coder devs identify some bugs.
   * @method debug
   * @variation 1
   */
  function debug() {
    if (parser.debug) {
      console.log('~~~~~parse debug~~~~~ If any of those tests failed, the problem isn\'t with Readerly, it\'s with one of the other libraries. That problem will have to be fixed later.');
    }
  }
}

/**
 * Open the core display and pause playback.
 * @method openReaderly
 */
function openReaderly() {
  coreDisplay.open();
  playback.wait();
}

function stripNodes(node) {
  var elements = void 0;

  elements = node.querySelectorAll('svg, sup, script, style, video, head, header, title, div#cookie-policy, span.attribution, span.caption, div.trending-ticker, div.adblocker-message, q.quote__content, table.wikitable, div.rellink, div.thumbcaption, div.magnify, div.toc, div.thumb.tright, span.mw-editsection, p.media-title, div.cc_banner-wrapper, span.newsCaption, span.bullet, .ribbon__related__articles__module, .short-form-article__header, div.floatingad, div#ticker, div.breadcrumbs, div.left-menu, section.secondary-navigation, ul.exp, div.tip, .otherversionswrapper, .breadcrumbs.clear, .mb20, [itemprop=description], .cookie-notice, #sidebar-debugger-data, .c-related-list, .u-desktop-only, .c-nav-list__col, .c-nav-list__label, .c-nav-list__label, .art-pre-body-facebook__title, .art-pre-body-digital-sub, .read-more-links, .warning, .skinny-header, .publication-theme-button, .confirm, .video-headline, .timer-text, .vjs-control-text, .collection-creatorbox, .primary-nav-flyout__acc-close-flyout.vh, .secondary-nav-flyout__acc-close.vh,  .widget-wrap, .breakingNewsContainer, .content__dateline, .hatnote, .thumbcaption, .hiddenStructure, .hiddenStructure1, .infobox, #siteSub, #toc, #jump-to-nav, #siteSub, h1, h2, h3, h4, h5, h6, footer, figure, figcaption, aside, small, .n-skip-link, .o-cookie-message__description, span.message-title, a.visually-hidden, time, div.column--secondary, div#main-navigation-inside, span.wpneo-tooltip, noscript, div.tab-content, div.video-upsell-message, table.vertical-navbox, span.mbox-text-span, div.stackCommerceItemWrap, a.crumb, span.contrib-tagline, div.contributions__epic, div#contextlinks, p.figurecaption, date, tags, widget, div#bbccookies-prompt, a.title, a.syndication-btn, div.cat-list, div.reflist, div.newsletter, div.related-posts, p.h3title, span.greybar, div.video-wrapper, div#breadcrumb, div.breaking-news, span.nowrap, a.shiftnav-target, ul#menu-main-navigation, div.metabar-pad, a.twitter-follow-button, div.announcement_left, div.post-top, span.source, .article-meta-box, .fusion-megamenu-bullet, .udemy_code_details, .fullwidth-box, .tags-container, .mini-info-list, .ubermenu-target-title, .header-alert-banner, .prevnext, .summary, .Quick_links, .column-strip, .fmht, .ctag, .block-share, .post-footer, .player-with-placeholder__caption, .site-brand, .content-footer, .shareBar-follow-modal, .menu-info, .subTitle-follow-modal, #main-sections-nav-inner, .rich-link, #fb-messenger-modal, .meta__extras, .js-components-container, .meta__contact-header, .meta__twitter, .off-screen, .commerce-disclaimer, .social, .site-message, .skip, .overlay, .vjs-modal-dialog-description, .all-head-menu, #notices, #breadcrumbs, .pagenav-container, #announcementtabs-18-5, .announcementtext, .module-buttons, .userinfo, .widget-tabs-nav, .filter-options-list, .condense-text, .conversation-toolbar-wrapper, .main-title, .b-top-background__header-mainnav-subnav, #main-navbar-wrapper, #channel-subtabbar, #searchPopupContent, .content-nav, .ans_page_question_header, .EventHeader, .answer_user, .pre-btn, .nxt-btn, .topgooglead, .cc_message');

  for (i = 0; i < elements.length; i++) {
    elements[i].parentElement.removeChild(elements[i]);
  }
}

function siteRule(var1, sitename, var2, element) {
  var html = void 0;
  var junkElements = void 0;
  var i = void 0;

  html = var2.innerHTML;

  if (html.includes(sitename)) {
    junkElements = var2.querySelectorAll(element);
    if (junkElements.length) {
      for (i = 0, l = junkElements.length; i < l; i++) {
        junkElements[i].parentNode.removeChild(junkElements[i]);
      }
    }
  }
}

function multisiteRule(var1, sitename, sitename2, var2, element) {
  var $page = void 0;
  var pagex = void 0;
  var i = void 0;
  var junkElements = void 0;

  $page = $('html').clone();
  pagex = $page[0];
  var3 = pagex.innerHTML;
  var1 = var2.innerHTML;

  if (var1.includes(sitename) && var3.includes(sitename2)) {
    junkElements = var2.querySelectorAll(element);
    if (junkElements.length) {
      for (i = 0, l = junkElements.length; i < l; i++) {
        junkElements[i].parentNode.removeChild(junkElements[i]);
      }
    }
  }
}

function readSelectedText() {
  selection = document.getSelection();
  docFragment = selection.getRangeAt(0).cloneContents();

  junkElements = docFragment.querySelectorAll('h1, h2, h3, h4, h5, h6, #jump-to-nav, #siteSub, .infobox, [role=note], span.attribution, span.caption, div.adblocker-message, q.quote__content, table.wikitable, div.rellink, span.bullet, div.floatingad, span.mw-editsection, div.thumbcaption, div.magnify, div.toc');
  if (junkElements.length) {
    for (i = 0, l = junkElements.length; i < l; i++) {
      junkElements[i].parentNode.removeChild(junkElements[i]);
    }
  }

  supElements = docFragment.querySelectorAll('sup');
  if (supElements.length) {
    for (i = 0, l = supElements.length; i < l; i++) {
      supElements[i].parentNode.removeChild(supElements[i]);
    }
  }

  scriptElements = docFragment.querySelectorAll('script');
  if (scriptElements.length) {
    for (i = 0, l = scriptElements.length; i < l; i++) {
      scriptElements[i].parentNode.removeChild(scriptElements[i]);
    }
  }

  dumm = document.createElement('div');
  dumm.appendChild(docFragment.cloneNode(true));

  dumm = dumm.innerHTML;

  if (!dumm.match(/<\/p>/g)) {
    dumm = '<p>' + dumm + '</p>';
  }

  regexp = /<\/p>/g;
  dumm = dumm.replace(regexp, function (match) {
    return match.replace(/<\/p>/g, ' </p>');
  });

  // console.log(dumm);

  regexp = /[\s]*(<br>)[\s]*/g;
  dumm = dumm.replace(regexp, function (match) {
    return match.replace(/[\s]*(<br>)[\s]*/g, ' ');
  });

  regexp = /[a-zά-ω][\s]*(<br>)[\s]*[A-ZΑ-ώ]/g;
  dumm = dumm.replace(regexp, function (match) {
    return match.replace(/[\s]*(<br>)[\s]*/g, ' ');
  });

  regexp = /[a-zά-ω][\s]*<\/div>[\s]*/g;
  dumm = dumm.replace(regexp, function (match) {
    return match.replace(/[\s]*<\/div>[\s]*/g, '. </div> ');
  });

  regexp = /<p[^>]*>[^"]*["][^"]+[.][\s]*(<\/p>)/g;
  dumm = dumm.replace(regexp, function (match) {
    return match.replace(/[.][\s]*<\/p>/g, '."</p>');
  });

  regexp = /<p[^>]*>[^"]*["][^"]+[?][\s]*(<\/p>)/g;
  dumm = dumm.replace(regexp, function (match) {
    return match.replace(/[?][\s]*<\/p>/g, '?"</p>');
  });

  regexp = /<p[^>]*>[“][^“]+[.][\s]*["](<\/p>)/g;
  dumm = dumm.replace(regexp, function (match) {
    return match.replace(/[.][\s]*["](<\/p>)/g, '.</p>');
  });

  dumm = dumm.replace(/[\s]+["]["][\s]+/g, ' "');

  // console.log(dumm);

  regexp = /[&](nbsp)[;]/g;
  dumm = dumm.replace(regexp, function (match) {
    return match.replace(/[&](nbsp)[;]/g, ' ');
  });

  dumm = dumm.replace(/[&](amp)[;]/g, '&');
  dumm = dumm.replace(/[&](shy|quot|lt|gt)[;]/g, '');

  regexp = /<\/p/g;
  dumm = dumm.replace(regexp, function (match) {
    return match + ' ';
  });

  regexp = /[^.](<\/li>)/g;
  dumm = dumm.replace(regexp, function (match) {
    return match.replace(/(<\/li>)/g, '.</li>');
  });

  dumm = dumm.replace(/(\r\n|\n|\r)/gm, ' ');
  dumm = dumm.replace(/\s\s+/gm, ' ');

  dumm = dumm.replace(/<[^>]+>/g, '');
  dumm = dumm.replace(/<\/[^>]+>/g, '');

  cleaned = String(dumm);

  cleaned = cleaned.replace(/[—]/g, '-');

  cleaned = cleaned.replace(/[“]­/g, '"');
  cleaned = cleaned.replace(/[”]­/g, '"');

  // console.log(dumm);

  openReaderly();
  return cleaned ? read(cleaned) : false;
}

function readArticle() {
  openReaderly();

  $clone = $('html').clone();
  articlex = $clone[0];
  stripNodes(articlex);
  siteRule(clonex, 'nature.com', articlex, 'div.text-orange.content.grade-c-show, p.contrast-text.text13.hide-overflow');
  siteRule(clonex, 'sparknotes.com', articlex, 'div.containerUGC');
  siteRule(clonex, 'independent.co.uk', articlex, 'div.image');
  siteRule(clonex, 'wowwiki.wikia.com', articlex, 'dl');
  siteRule(clonex, 'wow.gamepedia.com', articlex, 'dl');
  clonex = articlex.innerHTML;
  clonex = clonex.replace(/<div class=["]hiddenStructure[^]+<\/div>/g, '');
  clonex = clonex.replace(/<a href=["]http:\/\/pages.email.bbc.com\/subscribe["] class=["]story-body__link["][^]+<\/a>/g, '');
  clonex = clonex.replace(/<sup[^>]*>[^]+<\/sup>/g, '');
  clonex = clonex.replace(/<span[^>]*>|<\/span>/g, '');
  clonex = clonex.replace(/<beelinespan[^>]*>|<\/beelinespan>/g, '');
  clonex = clonex.replace(/<!--?[^]+?-->/g, '');
  clonex = clonex.replace(/<!--[^]+?-->/g, '');
  clonex = clonex.replace(/<!--[^]+-->/g, '');

  // console.log(clonex);

  regexp = /<\/p>/g;
  clonex = clonex.replace(regexp, function (match) {
    return match.replace(/<\/p>/g, ' </p>');
  });

  regexp = /[\s]*(<br>)[\s]*/g;
  clonex = clonex.replace(regexp, function (match) {
    return match.replace(/[\s]*(<br>)[\s]*/g, ' ');
  });

  regexp = /<p[^>]*>[^"]*["][^"]+[.][\s]*(<\/p>)/g;
  clonex = clonex.replace(regexp, function (match) {
    return match.replace(/[.][\s]*<\/p>/g, '."</p>');
  });

  regexp = /<p[^>]*>[^"]*["][^"]+[?][\s]*(<\/p>)/g;
  clonex = clonex.replace(regexp, function (match) {
    return match.replace(/[?][\s]*<\/p>/g, '?"</p>');
  });

  regexp = /<p[^>]*>[“][^“]+[.][\s]*["](<\/p>)/g;
  clonex = clonex.replace(regexp, function (match) {
    return match.replace(/[.][\s]*["](<\/p>)/g, '.</p>');
  });

  clonex = clonex.replace(/[\s]+["]["][\s]+/g, ' "');

  // console.log(clonex);

  regexp = /[\s]*(<\/p>)[\s]*(<p>)[\s]*/g;
  clonex = clonex.replace(regexp, function (match) {
    return match.replace(/(<\/p>)[\s]*(<p>)/g, '');
  });

  // console.log(clonex);

  regexp = /[^.](<\/li>)/g;
  clonex = clonex.replace(regexp, function (match) {
    return match.replace(/(<\/li>)/g, '.</li>');
  });

  regexp = /[\s]+[.](<\/li>)/g;
  clonex = clonex.replace(regexp, function (match) {
    return match.replace(/[\s]+/g, '');
  });

  regexp = /[.][\s]*[.][\s]*(<\/li>)/g;
  clonex = clonex.replace(regexp, function (match) {
    return match.replace(/[.][\s]*[.]/g, '.');
  });

  clonex = clonex.replace(/(\r\n|\n|\r)/gm, ' ');
  clonex = clonex.replace(/\s\s+/gm, ' ');

  clonex = clonex.replace(/[“]­/g, '"');
  clonex = clonex.replace(/[”]­/g, '"');

  clonex = clonex.replace(/<a[^>]*>|<\/a>/g, '');
  clonex = clonex.replace(/<i[^>]*>|<\/i>/g, '');
  clonex = clonex.replace(/<em[^>]*>|<\/em>/g, '');
  clonex = clonex.replace(/<hr>/g, '');

  console.log(clonex);
  articlex.innerHTML = clonex;
  // console.log(articlex);
  read(articlex);
}

function findTextNode(node) {
  while (node.textContent === '' && node.parentElement !== null) {
    node = node.parentElement;
  }

  return node;
}

function multiSelect(event) {
  var target = void 0;
  var index = void 0;
  var contained = void 0;

  lastSelected = undefined;
  target = findTextNode(event.target);

  index = selected.indexOf(target);

  if (index !== -1) {
    target.classList.remove('__rdly-selected');
    selected.splice(index, 1);
    return;
  }

  // don't do anything if the target is a sibling of an already selected node
  contained = selected.some(function (node) {
    return node.contains(target);
  });
  if (contained) return;

  // if the target is a parent of any already selected nodes, remove them
  selected = selected.filter(function (node) {
    var sibling = void 0;
    sibling = target.contains(node);
    if (sibling) node.classList.remove('__rdly-selected');

    return !sibling;
  });

  target.classList.add('__rdly-selected');
  selected.push(target);
}

function finishMultiSelect() {
  text = Array.from(document.getElementsByTagName('*')).filter(function (node) {
    return selected.indexOf(node) !== -1;
  }).map(function (node) {
    clone = node.cloneNode(true);
    stripNodes(clone);

    return clone.textContent;
  }).join(' ');

  openReaderly();
  read(text);
}

function selectionMoved(event) {
  if (event.ctrlKey || lastTarget === event.target) return;

  lastSelected !== undefined && lastSelected.classList !== undefined && lastSelected.classList.remove('__rdly-selected');
  lastTarget = event.target;

  selected = findTextNode(event.target);
  lastSelected = selected;

  selected.classList.add('__rdly-selected');
}

function selectionKeyUp(event) {
  switch (event.keyCode) {
    case 17:
      // Ctrl
      if (selected.length > 0) {
        finishMultiSelect();
        cleanupSelection();
      }
      break;

    case 27:
      // Esc
      cleanupSelection();
      break;

    default:
      return;
  }

  return false;
}

function selectionKeyDown(event) {
  switch (event.keyCode) {
    case 17:
      // Ctrl
      if (lastTarget !== undefined) {
        lastTarget.classList.remove('__rdly-selected');
        lastTarget = undefined;
      }
      break;

    default:
      return;
  }

  return false;
}

function selectionClicked(event) {
  var clone1 = void 0;
  var wrapper = void 0;
  var storage = void 0;
  var regexp = void 0;
  var clone = void 0;
  var splitregex = void 0;
  var count = void 0;

  event.preventDefault();
  event.stopPropagation();

  if (event.ctrlKey) {
    multiSelect(event);
  } else if (lastSelected) {
    openReaderly();
    clone = lastSelected.cloneNode(true);
    stripNodes(clone);
    siteRule(clone1, 'nature.com', clone, 'div.text-orange.content.grade-c-show, p.contrast-text.text13.hide-overflow');
    multisiteRule(clone1, 'calibre', '<title>Bill Gates</title>', clone, '.boxtext');

    clone1 = clone.innerHTML;
    // console.log(clone1);
    wrapper = document.createElement('div');
    storage = clone1.replace(/<div class=["]hiddenStructure.+[\s]*.+[\s]*.+<\/div>/g, '');
    storage = storage.replace(/<div class=["]col action tooltip hide["][^>]*>[\s]*.+[\s]*.+<\/div>/g, '');
    storage = storage.replace(/<div class=["]exp action tooltip["][^>]*>[\s]*.+[\s]*.+<\/div>/g, '');
    storage = storage.replace(/<div class=["]breadcrumbs clear["][^>]*><ul>[\s]+<li>.+[\s]*<li>.+[\s]*<li>.+[\s]*<li>.+[\s]*<\/ul><\/div>/g, '');
    storage = storage.replace(/<div[^>]*>|<\/div>/g, '');
    storage = storage.replace(/<span[^>]*>|<\/span>/g, '');
    storage = storage.replace(/<beelinespan[^>]*>|<\/beelinespan>/g, '');
    storage = storage.replace(/<img[^>]*>.+<\/img>/g, '');
    storage = storage.replace(/<img[^>]*>/g, '');
    storage = storage.replace(/<\/img>/g, '');

    regexp = /<\/p>/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/<\/p>/g, ' </p>');
    });

    regexp = /[\s]+([a-zA-Z]|[ά-ωΑ-ώ]){1,20}[\s]+[!]/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/[\s]+[!]/g, '!');
    });

    regexp = /(if)[\s]+[(]/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/[\s]/g, '');
    });

    storage = storage.replace(/<!--[\s\S]*?-->/gm, '');

    regexp = /^[\s]+[{][\s]+/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/[\s]+[{]/g, '}');
    });

    regexp = /[\s]+[}][\s]+/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/[\s]+[}]/g, '}');
    });

    regexp = /[}][\s]+/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/[}][\s]+/g, '');
    });

    regexp = /[\s]+[(][\s]+/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/[(][\s]+/g, '(');
    });

    regexp = /(&nbsp;)+[)][,][\s]+/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/(&nbsp;)+[)][,]/g, '),');
    });

    regexp = /(&nbsp;)+[)][,][\s]+/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/(&nbsp;)+[)][,]/g, '),');
    });

    regexp = /<\/code>[\s]*[0-9]+[\s]*<\/pre>/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/[\s]*[0-9]+[\s]*/g, '');
    });

    regexp = /[}][\s]{2,}([a-zA-Z]|[ά-ωΑ-ώ])/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/[\s]{2,}/g, ' ');
    });

    for (count = 0; count < 10; count++) {
      splitregex = /(.{15,33})([\s]|[;]|[{]|[)])/gm;
      storage = storage.replace(splitregex, '$1\n');
    }

    // console.log(storage);

    regexp = /<p[^>]*>[^"]*["][^"]+[.][\s]*(<\/p>)/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/[.][\s]*<\/p>/g, '."</p>');
    });

    regexp = /<p[^>]*>[^"]*["][^"]+[?][\s]*(<\/p>)/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/[?][\s]*<\/p>/g, '?"</p>');
    });

    regexp = /<p[^>]*>[“][^“]+[.][\s]*["](<\/p>)/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/[.][\s]*["](<\/p>)/g, '.</p>');
    });

    storage = storage.replace(/[\s]+["]["][\s]+/g, ' "');

    regexp = /[^.](<\/li>)/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/(<\/li>)/g, '.</li>');
    });

    regexp = /[\s]+[.](<\/li>)/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/[\s]+/g, '');
    });

    regexp = /[.][\s]*[.][\s]*(<\/li>)/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/[.][\s]*[.]/g, '.');
    });

    // console.log(storage);

    if (!storage.match(/<pre[^>]*>/g)) {
      storage = storage.replace(/<\/pre>/g, '');
    }

    // console.log(storage);

    wrapper.innerHTML = storage;

    storage = wrapper.innerHTML;

    regexp = /[\u2014-\u2015\u2E3A\u2E3B]/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/[-\u2014-\u2015\u2E3A\u2E3B]/g, ' ');
    });

    // remove regular dashes surrounded by space
    regexp = /[\s]+[-\u2010-\u2011\uFE58\uFE63\uFF0D][\s]+/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/[-\u2010-\u2011\uFE58\uFE63\uFF0D]/g, ' ');
    });

    storage = storage.replace(/(?:[a-zA-Z]|[ά-ωΑ-ώ])[\s]+[.](?:^[a-zA-Z]|[ά-ωΑ-ώ])/g, '.');

    regexp = /…/g;
    storage = storage.replace(regexp, function (match) {
      return match + ' ';
    });

    regexp = /[\s]+[.][\s]+/g;
    storage = storage.replace(regexp, function (match) {
      return match.replace(/[\s]+[.]/g, '.');
    });

    storage = storage.replace(/<a[^>]*>|<\/a>/g, '');
    storage = storage.replace(/<b[^>]*>|<\/b>/g, '');
    storage = storage.replace(/<br>/g, ' ');

    storage = storage.replace(/  +/g, ' ');

    storage = storage.replace(/[.][”]­/g, '."');

    storage = storage.replace(/[“]­/g, '"');
    storage = storage.replace(/[”]­/g, '"');

    console.log(storage);

    wrapper.innerHTML = storage;

    // console.log(wrapper);

    read(splitCode(wrapper));

    cleanupSelection();
  }

  return false;
}

function getSelection() {
  // reset keyboard focus
  document.activeElement.blur();

  document.addEventListener('mousemove', selectionMoved);
  document.addEventListener('click', selectionClicked);
  document.addEventListener('keyup', selectionKeyUp);
  document.addEventListener('keydown', selectionKeyDown);
}

function halveSpeed() {
  var checkbox = void 0;

  checkbox = coreDisplay.nodes.doc.getElementById('__rdly_halvespeed_input');
  checkbox.checked = !checkbox.checked;
  checkbox.dispatchEvent(new Event('change'));
}

function cleanupSelection() {
  var element = void 0;
  var i = void 0;

  document.removeEventListener('mousemove', selectionMoved);
  document.removeEventListener('click', selectionClicked);
  document.removeEventListener('keyup', selectionKeyUp);
  document.removeEventListener('keydown', selectionKeyDown);

  if (lastSelected) {
    lastSelected.classList.remove('__rdly-selected');
  }

  for (i = 0; i < selected.length; i++) {
    element = selected[i];
    element.classList.remove('__rdly-selected');
  }

  selected = [];
  lastSelected = undefined;
  lastTarget = undefined;
}

function onMessage(message, sender, sendResponse) {
  console.debug(message, sender);

  isReadSelectedText(message.functiontoInvoke);
  isReadFullPage(message.functiontoInvoke);
  isGetSelection(message.functiontoInvoke);
  isHalveSpeed(message.functiontoInvoke);

  function isReadSelectedText(it) {
    if (it === 'readSelectedText') readSelectedText();
  }

  function isReadFullPage(it) {
    if (it === 'readFullPage') readArticle();
  }

  function isGetSelection(it) {
    if (it === 'getSelection') getSelection();
  }

  function isHalveSpeed(it) {
    if (it === 'halveSpeed') halveSpeed();
  }
}