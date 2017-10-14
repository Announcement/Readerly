/* main.js
*
* TODO:
* - Cache whole page text when possible/read
* - Cache reading progress?
* - Remove html parsing from sbd node module
* - Break this up into more descrete modules
* - Combine Words.js and WordNav.js
* WARNING:
* WARNING:
* Storage is all user settings. Too cumbersome otherwise for now.
*/

;(function() {
  try {
    // console.debug('require')
    //console.log('First Point');
    // ============== SETUP ============== \\
    var $
    var Parser
    var ParserSetup
    var Settings
    var Storage
    var WordNav
    var WordSplitter
    var Delayer
    var Timer
    var Display
    var PlaybackUI
    var SettingsUI
    var SpeedSetsUI
    var WordSetsUI

    var parser
    var fragmentor
    var wordNav
    var storage
    var delayer
    var timer
    var coreDisplay
    var playback
    var settingsUI
    var speed
    var textElem
    var speedSetsUI
    var wordSetsUI
    var setts

    // try {
    $ = require('jquery')
    // } catch (e) {
    //   console.debug('jQuery Error!', e)
    // }

    // try {
    Parser = require('./lib/parse/Parser.js')
    // } catch (e) {
    //   console.debug('Parser Error!', e)
    // }

    // try {
    ParserSetup = require('./lib/ParserSetup.js')
    // } catch (e) {
    //   console.debug('ParserSetup Error!', e)
    // }

    // try {
    Settings = require('./lib/settings/Settings.js')
    Storage = require('./lib/ReaderlyStorage.js')
    WordNav = require('./lib/parse/WordNav.js')
    WordSplitter = require('./lib/parse/WordSplitter.js')
    Delayer = require('./lib/playback/StringTime.js')
    Timer = require('./lib/playback/ReaderlyTimer.js')
    Display = require('./lib/ReaderlyDisplay.js')
    PlaybackUI = require('./lib/playback/PlaybackUI.js')
    SettingsUI = require('./lib/settings/ReaderlySettings.js')
    SpeedSetsUI = require('./lib/settings/SpeedSettings.js')
    WordSetsUI = require('./lib/settings/WordSettings.js')
    // } catch (e) {
    //   console.debug('Other requirements', e)
    // }
    console.debug('definitions')

    function identifyCode(domNode) {
      if (domNode.tagName === 'PRE' || domNode.tagName === 'CODE') {
        return true
      } else if (domNode.childNodes.length === 1) {
        return identifyCode(domNode.childNodes[0])
      } else {
        return false
      }
    }

    function splitCode(domNode) {
      return Array.from(domNode.childNodes)
        .map(childNode => {
          let splitMethod
          let textContent = childNode.textContent

          if (textContent.trim().length === 0) {
            return
          } else {
            if (identifyCode(childNode)) {
              splitMethod = 'lines'
            } else {
              splitMethod = 'sentences'
            }

            return {
              splitMethod: splitMethod,
              text: textContent
            }
          }
        })
        .filter(item => {
          return item != null
        })
    }

    //console.log('2nd Point');

    function addEvents() {
      $(timer).on('starting', function showLoading() {
        playback && playback.wait()
      })
    } // End addEvents()

    function afterLoadSettings(oldSettings) {
      setts = new Settings(storage, oldSettings)
      delayer = new Delayer(setts._settings)
      timer = new Timer(delayer)
      coreDisplay = new Display(timer, undefined, setts)

      textElem = coreDisplay.nodes.textElements
      fragmentor = new WordSplitter(textElem, setts)

      playback = new PlaybackUI(timer, coreDisplay)
      settingsUI = new SettingsUI(coreDisplay)
      speedSetsUI = new SpeedSetsUI(setts, settingsUI)
      wordSetsUI = new WordSetsUI(setts, settingsUI)

      addEvents()
    } // End afterLoadSettings()

    function getParser() {
      var pSup = new ParserSetup()
      // FOR TESTING
      pSup.debug = false

      // Functions to pass to parser
      var cleanNode = pSup.cleanNode,
        detectLanguage = pSup.detectLanguage,
        findArticle = pSup.findArticle,
        cleanText = pSup.cleanText,
        splitSentences = pSup.splitSentences

      return new Parser(
        cleanNode,
        detectLanguage,
        findArticle,
        cleanText,
        splitSentences
      )
    } // End getParser()

    function init() {
      //console.log("Init Point");

      parser = getParser()
      parser.debug = false

      wordNav = new WordNav()
      storage = new Storage()

      // !!!FOR DEBUGGING ONLY!!!
      if (false) {
        storage.clear()
        console.log('cleared storage')
      }
      storage.loadAll(afterLoadSettings)
    } // End init()

    // ============== START IT UP ============== \\

    init()

    // ============== RUNTIME ============== \\

    function read(node) {
      //console.log("Read Point");

      var sentenceWords = parser.parse(node) // returns [[Str]]

      if (parser.debug) {
        // Help non-coder devs identify some bugs
        console.log(
          "~~~~~parse debug~~~~~ If any of those tests failed, the problem isn't with Readerly, it's with one of the other libraries. That problem will have to be fixed later."
        )
      }

      wordNav.process(sentenceWords, fragmentor)
      timer.start(wordNav)
      return true
    }

    function openReaderly() {
      //console.log("Open Point");

      coreDisplay.open()
      playback.wait() // Do we need this?
    }

    function stripNodes(node) {
      var elements = node.querySelectorAll(
        'svg, sup, script, style, video, head, header, title, div#cookie-policy, span.attribution, span.caption, div.trending-ticker, div.adblocker-message, q.quote__content, table.wikitable, div.rellink, div.thumbcaption, div.magnify, div.toc, div.thumb.tright, span.mw-editsection, p.media-title, div.cc_banner-wrapper, span.newsCaption, span.bullet, .ribbon__related__articles__module, .short-form-article__header, div.floatingad, div#ticker, div.breadcrumbs, div.left-menu, section.secondary-navigation, ul.exp, div.tip, .otherversionswrapper, .breadcrumbs.clear, .mb20, [itemprop=description], .cookie-notice, #sidebar-debugger-data, .c-related-list, .u-desktop-only, .c-nav-list__col, .c-nav-list__label, .c-nav-list__label, .art-pre-body-facebook__title, .art-pre-body-digital-sub, .read-more-links, .warning, .skinny-header, .publication-theme-button, .confirm, .video-headline, .timer-text, .vjs-control-text, .collection-creatorbox, .primary-nav-flyout__acc-close-flyout.vh, .secondary-nav-flyout__acc-close.vh,  .widget-wrap, .breakingNewsContainer, .content__dateline, .hatnote, .thumbcaption, .hiddenStructure, .hiddenStructure1, .infobox, #siteSub, #toc, #jump-to-nav, #siteSub, h1, h2, h3, h4, h5, h6, footer, figure, figcaption, aside, small, .n-skip-link, .o-cookie-message__description, span.message-title, a.visually-hidden, time, div.column--secondary, div#main-navigation-inside, span.wpneo-tooltip, noscript, div.tab-content, div.video-upsell-message, table.vertical-navbox, span.mbox-text-span, div.stackCommerceItemWrap, a.crumb, span.contrib-tagline, div.contributions__epic, div#contextlinks, p.figurecaption, date, tags, widget, div#bbccookies-prompt, a.title, a.syndication-btn, div.cat-list, div.reflist, div.newsletter, div.related-posts, p.h3title, span.greybar, div.video-wrapper, div#breadcrumb, div.breaking-news, span.nowrap, a.shiftnav-target, ul#menu-main-navigation, div.metabar-pad, a.twitter-follow-button, div.announcement_left, div.post-top, span.source, .article-meta-box, .fusion-megamenu-bullet, .udemy_code_details, .fullwidth-box, .tags-container, .mini-info-list, .ubermenu-target-title, .header-alert-banner, .prevnext, .summary, .Quick_links, .column-strip, .fmht, .ctag, .block-share, .post-footer, .player-with-placeholder__caption, .site-brand, .content-footer, .shareBar-follow-modal, .menu-info, .subTitle-follow-modal, #main-sections-nav-inner, .rich-link, #fb-messenger-modal, .meta__extras, .js-components-container, .meta__contact-header, .meta__twitter, .off-screen, .commerce-disclaimer, .social, .site-message, .skip, .overlay, .vjs-modal-dialog-description, .all-head-menu, #notices, #breadcrumbs, .pagenav-container, #announcementtabs-18-5, .announcementtext, .module-buttons, .userinfo, .widget-tabs-nav, .filter-options-list, .condense-text, .conversation-toolbar-wrapper, .main-title, .b-top-background__header-mainnav-subnav, #main-navbar-wrapper, #channel-subtabbar, #searchPopupContent, .content-nav, .ans_page_question_header, .EventHeader, .answer_user, .pre-btn, .nxt-btn, .topgooglead, .cc_message'
      )
      for (var i = 0; i < elements.length; i++) {
        elements[i].parentElement.removeChild(elements[i])
      }
    }

    function siteRule(var1, sitename, var2, element) {
      var var1 = var2.innerHTML
      if (var1.includes(sitename)) {
        var junkElements = var2.querySelectorAll(element)
        if (junkElements.length) {
          for (var i = 0, l = junkElements.length; i < l; i++) {
            junkElements[i].parentNode.removeChild(junkElements[i])
          }
        }
      }
    }

    function multisiteRule(var1, sitename, sitename2, var2, element) {
      var $page = $('html').clone()
      var pagex = $page[0]
      var var3 = pagex.innerHTML
      var var1 = var2.innerHTML
      if (var1.includes(sitename) && var3.includes(sitename2)) {
        var junkElements = var2.querySelectorAll(element)
        if (junkElements.length) {
          for (var i = 0, l = junkElements.length; i < l; i++) {
            junkElements[i].parentNode.removeChild(junkElements[i])
          }
        }
      }
    }

    function readSelectedText() {
      var selection = document.getSelection()
      var docFragment = selection.getRangeAt(0).cloneContents()

      var junkElements = docFragment.querySelectorAll(
        'h1, h2, h3, h4, h5, h6, #jump-to-nav, #siteSub, .infobox, [role=note], span.attribution, span.caption, div.adblocker-message, q.quote__content, table.wikitable, div.rellink, span.bullet, div.floatingad, span.mw-editsection, div.thumbcaption, div.magnify, div.toc'
      )
      if (junkElements.length) {
        for (var i = 0, l = junkElements.length; i < l; i++) {
          junkElements[i].parentNode.removeChild(junkElements[i])
        }
      }

      var supElements = docFragment.querySelectorAll('sup')
      if (supElements.length) {
        for (var i = 0, l = supElements.length; i < l; i++) {
          supElements[i].parentNode.removeChild(supElements[i])
        }
      }

      var scriptElements = docFragment.querySelectorAll('script')
      if (scriptElements.length) {
        for (var i = 0, l = scriptElements.length; i < l; i++) {
          scriptElements[i].parentNode.removeChild(scriptElements[i])
        }
      }

      var dumm = document.createElement('div')
      dumm.appendChild(docFragment.cloneNode(true))

      var dumm = dumm.innerHTML

      if (!dumm.match(/<\/p>/g)) {
        var dumm = '<p>' + dumm + '</p>'
      }

      var regexp = /<\/p>/g
      var dumm = dumm.replace(regexp, function(match) {
        return match.replace(/<\/p>/g, ' </p>')
      })

      //console.log(dumm);

      var regexp = /[\s]*(<br>)[\s]*/g
      var dumm = dumm.replace(regexp, function(match) {
        return match.replace(/[\s]*(<br>)[\s]*/g, ' ')
      })

      var regexp = /[a-zά-ω][\s]*(<br>)[\s]*[A-ZΑ-ώ]/g
      var dumm = dumm.replace(regexp, function(match) {
        return match.replace(/[\s]*(<br>)[\s]*/g, ' ')
      })

      var regexp = /[a-zά-ω][\s]*<\/div>[\s]*/g
      var dumm = dumm.replace(regexp, function(match) {
        return match.replace(/[\s]*<\/div>[\s]*/g, '. </div> ')
      })

      var regexp = /<p[^>]*>[^"]*["][^"]+[.][\s]*(<\/p>)/g
      var dumm = dumm.replace(regexp, function(match) {
        return match.replace(/[.][\s]*<\/p>/g, '."</p>')
      })

      var regexp = /<p[^>]*>[^"]*["][^"]+[?][\s]*(<\/p>)/g
      var dumm = dumm.replace(regexp, function(match) {
        return match.replace(/[?][\s]*<\/p>/g, '?"</p>')
      })

      var regexp = /<p[^>]*>[“][^“]+[.][\s]*["](<\/p>)/g
      var dumm = dumm.replace(regexp, function(match) {
        return match.replace(/[.][\s]*["](<\/p>)/g, '.</p>')
      })

      var dumm = dumm.replace(/[\s]+["]["][\s]+/g, ' "')

      //console.log(dumm);

      var regexp = /[&](nbsp)[;]/g
      var dumm = dumm.replace(regexp, function(match) {
        return match.replace(/[&](nbsp)[;]/g, ' ')
      })

      var dumm = dumm.replace(/[&](amp)[;]/g, '&')
      var dumm = dumm.replace(/[&](shy|quot|lt|gt)[;]/g, '')

      var regexp = /<\/p/g
      var dumm = dumm.replace(regexp, function(match) {
        return match + ' '
      })

      var regexp = /[^.](<\/li>)/g
      var dumm = dumm.replace(regexp, function(match) {
        return match.replace(/(<\/li>)/g, '.</li>')
      })

      var dumm = dumm.replace(/(\r\n|\n|\r)/gm, ' ')
      var dumm = dumm.replace(/\s\s+/gm, ' ')

      var dumm = dumm.replace(/<[^>]+>/g, '')
      var dumm = dumm.replace(/<\/[^>]+>/g, '')

      var cleaned = String(dumm)

      var cleaned = cleaned.replace(/[—]/g, '-')

      var cleaned = cleaned.replace(/[“]­/g, '"')
      var cleaned = cleaned.replace(/[”]­/g, '"')

      //console.log(dumm);

      openReaderly()
      return cleaned ? read(cleaned) : false
    }

    function readArticle() {
      openReaderly()
      var $clone = $('html').clone()
      var articlex = $clone[0]
      stripNodes(articlex)
      siteRule(
        clonex,
        'nature.com',
        articlex,
        'div.text-orange.content.grade-c-show, p.contrast-text.text13.hide-overflow'
      )
      siteRule(clonex, 'sparknotes.com', articlex, 'div.containerUGC')
      siteRule(clonex, 'independent.co.uk', articlex, 'div.image')
      siteRule(clonex, 'wowwiki.wikia.com', articlex, 'dl')
      siteRule(clonex, 'wow.gamepedia.com', articlex, 'dl')
      var clonex = articlex.innerHTML
      var clonex = clonex.replace(
        /<div class=["]hiddenStructure[^]+<\/div>/g,
        ''
      )
      var clonex = clonex.replace(
        /<a href=["]http:\/\/pages.email.bbc.com\/subscribe["] class=["]story-body__link["][^]+<\/a>/g,
        ''
      )
      var clonex = clonex.replace(/<sup[^>]*>[^]+<\/sup>/g, '')
      var clonex = clonex.replace(/<span[^>]*>|<\/span>/g, '')
      var clonex = clonex.replace(/<beelinespan[^>]*>|<\/beelinespan>/g, '')
      var clonex = clonex.replace(/<!--?[^]+?-->/g, '')
      var clonex = clonex.replace(/<!--[^]+?-->/g, '')
      var clonex = clonex.replace(/<!--[^]+-->/g, '')

      //console.log(clonex);

      var regexp = /<\/p>/g
      var clonex = clonex.replace(regexp, function(match) {
        return match.replace(/<\/p>/g, ' </p>')
      })

      var regexp = /[\s]*(<br>)[\s]*/g
      var clonex = clonex.replace(regexp, function(match) {
        return match.replace(/[\s]*(<br>)[\s]*/g, ' ')
      })

      var regexp = /<p[^>]*>[^"]*["][^"]+[.][\s]*(<\/p>)/g
      var clonex = clonex.replace(regexp, function(match) {
        return match.replace(/[.][\s]*<\/p>/g, '."</p>')
      })

      var regexp = /<p[^>]*>[^"]*["][^"]+[?][\s]*(<\/p>)/g
      var clonex = clonex.replace(regexp, function(match) {
        return match.replace(/[?][\s]*<\/p>/g, '?"</p>')
      })

      var regexp = /<p[^>]*>[“][^“]+[.][\s]*["](<\/p>)/g
      var clonex = clonex.replace(regexp, function(match) {
        return match.replace(/[.][\s]*["](<\/p>)/g, '.</p>')
      })

      var clonex = clonex.replace(/[\s]+["]["][\s]+/g, ' "')

      //console.log(clonex);

      var regexp = /[\s]*(<\/p>)[\s]*(<p>)[\s]*/g
      var clonex = clonex.replace(regexp, function(match) {
        return match.replace(/(<\/p>)[\s]*(<p>)/g, '')
      })

      //console.log(clonex);

      var regexp = /[^.](<\/li>)/g
      var clonex = clonex.replace(regexp, function(match) {
        return match.replace(/(<\/li>)/g, '.</li>')
      })

      var regexp = /[\s]+[.](<\/li>)/g
      var clonex = clonex.replace(regexp, function(match) {
        return match.replace(/[\s]+/g, '')
      })

      var regexp = /[.][\s]*[.][\s]*(<\/li>)/g
      var clonex = clonex.replace(regexp, function(match) {
        return match.replace(/[.][\s]*[.]/g, '.')
      })

      var clonex = clonex.replace(/(\r\n|\n|\r)/gm, ' ')
      var clonex = clonex.replace(/\s\s+/gm, ' ')

      var clonex = clonex.replace(/[“]­/g, '"')
      var clonex = clonex.replace(/[”]­/g, '"')

      var clonex = clonex.replace(/<a[^>]*>|<\/a>/g, '')
      var clonex = clonex.replace(/<i[^>]*>|<\/i>/g, '')
      var clonex = clonex.replace(/<em[^>]*>|<\/em>/g, '')
      var clonex = clonex.replace(/<hr>/g, '')

      // console.log(clonex);
      articlex.innerHTML = clonex
      //console.log(articlex);
      read(articlex)
    }

    // walk up the DOM until we have a node containing some text
    function findTextNode(node) {
      while (node.textContent === '' && node.parentElement !== null) {
        node = node.parentElement
      }

      //var html = node.innerHTML;
      //var html = html.replace(/<span[^>]*>|<\/span>/g, '');
      //node.innerHTML = html;
      return node
    }

    var lastTarget
    var lastSelected
    var selected = []

    function multiSelect(event) {
      //console.log(event.target);
      lastSelected = undefined
      var target = findTextNode(event.target)

      // if already selected, deselect
      var index = selected.indexOf(target)
      if (index !== -1) {
        target.classList.remove('__rdly-selected')
        selected.splice(index, 1)
        return
      }

      // don't do anything if the target is a sibling of an already selected node
      var contained = selected.some(function(node) {
        return node.contains(target)
      })
      if (contained) return

      // if the target is a parent of any already selected nodes, remove them
      selected = selected.filter(function(node) {
        var sibling = target.contains(node)
        if (sibling) node.classList.remove('__rdly-selected')

        return !sibling
      })

      target.classList.add('__rdly-selected')
      selected.push(target)
    }

    function finishMultiSelect() {
      var text = Array.from(document.getElementsByTagName('*'))
        .filter(function(node) {
          return selected.indexOf(node) !== -1
        })
        .map(function(node) {
          var clone = node.cloneNode(true)
          stripNodes(clone)

          return clone.textContent
        })
        .join(' ')

      openReaderly()
      read(text)
    }

    function selectionMoved(event) {
      if (event.ctrlKey || lastTarget === event.target) return

      lastSelected !== undefined &&
        lastSelected.classList !== undefined &&
        lastSelected.classList.remove('__rdly-selected')
      lastTarget = event.target

      var selected = findTextNode(event.target)
      lastSelected = selected

      selected.classList.add('__rdly-selected')
    }

    function selectionKeyUp(event) {
      switch (event.keyCode) {
        case 17: // Ctrl
          if (selected.length > 0) {
            finishMultiSelect()
            cleanupSelection()
          }
          break

        case 27: // Esc
          cleanupSelection()
          break

        default:
          return
      }

      return false
    }

    function selectionKeyDown(event) {
      switch (event.keyCode) {
        case 17: // Ctrl
          if (lastTarget !== undefined) {
            lastTarget.classList.remove('__rdly-selected')
            lastTarget = undefined
          }
          break

        default:
          return
      }

      return false
    }

    function selectionClicked(event) {
      event.preventDefault()
      event.stopPropagation()

      if (event.ctrlKey) {
        multiSelect(event)
      } else if (lastSelected) {
        openReaderly()
        var clone = lastSelected.cloneNode(true)
        stripNodes(clone)
        siteRule(
          clone1,
          'nature.com',
          clone,
          'div.text-orange.content.grade-c-show, p.contrast-text.text13.hide-overflow'
        )
        multisiteRule(
          clone1,
          'calibre',
          '<title>Bill Gates</title>',
          clone,
          '.boxtext'
        )

        var clone1 = clone.innerHTML
        //console.log(clone1);
        var wrapper = document.createElement('div')
        var storage = clone1.replace(
          /<div class=["]hiddenStructure.+[\s]*.+[\s]*.+<\/div>/g,
          ''
        )
        var storage = storage.replace(
          /<div class=["]col action tooltip hide["][^>]*>[\s]*.+[\s]*.+<\/div>/g,
          ''
        )
        var storage = storage.replace(
          /<div class=["]exp action tooltip["][^>]*>[\s]*.+[\s]*.+<\/div>/g,
          ''
        )
        var storage = storage.replace(
          /<div class=["]breadcrumbs clear["][^>]*><ul>[\s]+<li>.+[\s]*<li>.+[\s]*<li>.+[\s]*<li>.+[\s]*<\/ul><\/div>/g,
          ''
        )
        var storage = storage.replace(/<div[^>]*>|<\/div>/g, '')
        var storage = storage.replace(/<span[^>]*>|<\/span>/g, '')
        var storage = storage.replace(/<beelinespan[^>]*>|<\/beelinespan>/g, '')
        var storage = storage.replace(/<img[^>]*>.+<\/img>/g, '')
        var storage = storage.replace(/<img[^>]*>/g, '')
        var storage = storage.replace(/<\/img>/g, '')

        var regexp = /<\/p>/g
        var storage = storage.replace(regexp, function(match) {
          return match.replace(/<\/p>/g, ' </p>')
        })

        var regexp = /[\s]+([a-zA-Z]|[ά-ωΑ-ώ]){1,20}[\s]+[!]/g
        var storage = storage.replace(regexp, function(match) {
          return match.replace(/[\s]+[!]/g, '!')
        })

        var regexp = /(if)[\s]+[(]/g
        var storage = storage.replace(regexp, function(match) {
          return match.replace(/[\s]/g, '')
        })

        var storage = storage.replace(/<!--[\s\S]*?-->/gm, '')

        var regexp = /^[\s]+[{][\s]+/g
        var storage = storage.replace(regexp, function(match) {
          return match.replace(/[\s]+[{]/g, '}')
        })

        var regexp = /[\s]+[}][\s]+/g
        var storage = storage.replace(regexp, function(match) {
          return match.replace(/[\s]+[}]/g, '}')
        })

        var regexp = /[}][\s]+/g
        var storage = storage.replace(regexp, function(match) {
          return match.replace(/[}][\s]+/g, '')
        })

        var regexp = /[\s]+[(][\s]+/g
        var storage = storage.replace(regexp, function(match) {
          return match.replace(/[(][\s]+/g, '(')
        })

        var regexp = /(&nbsp;)+[)][,][\s]+/g
        var storage = storage.replace(regexp, function(match) {
          return match.replace(/(&nbsp;)+[)][,]/g, '),')
        })

        var regexp = /(&nbsp;)+[)][,][\s]+/g
        var storage = storage.replace(regexp, function(match) {
          return match.replace(/(&nbsp;)+[)][,]/g, '),')
        })

        var regexp = /<\/code>[\s]*[0-9]+[\s]*<\/pre>/g
        var storage = storage.replace(regexp, function(match) {
          return match.replace(/[\s]*[0-9]+[\s]*/g, '')
        })

        var regexp = /[}][\s]{2,}([a-zA-Z]|[ά-ωΑ-ώ])/g
        var storage = storage.replace(regexp, function(match) {
          return match.replace(/[\s]{2,}/g, ' ')
        })

        for (count = 0; count < 10; count++) {
          var splitregex = /(.{15,33})([\s]|[;]|[{]|[)])/gm
          var storage = storage.replace(splitregex, '$1\n')
        }

        //console.log(storage);

        var regexp = /<p[^>]*>[^"]*["][^"]+[.][\s]*(<\/p>)/g
        var storage = storage.replace(regexp, function(match) {
          return match.replace(/[.][\s]*<\/p>/g, '."</p>')
        })

        var regexp = /<p[^>]*>[^"]*["][^"]+[?][\s]*(<\/p>)/g
        var storage = storage.replace(regexp, function(match) {
          return match.replace(/[?][\s]*<\/p>/g, '?"</p>')
        })

        var regexp = /<p[^>]*>[“][^“]+[.][\s]*["](<\/p>)/g
        var storage = storage.replace(regexp, function(match) {
          return match.replace(/[.][\s]*["](<\/p>)/g, '.</p>')
        })

        var storage = storage.replace(/[\s]+["]["][\s]+/g, ' "')

        var regexp = /[^.](<\/li>)/g
        var storage = storage.replace(regexp, function(match) {
          return match.replace(/(<\/li>)/g, '.</li>')
        })

        var regexp = /[\s]+[.](<\/li>)/g
        var storage = storage.replace(regexp, function(match) {
          return match.replace(/[\s]+/g, '')
        })

        var regexp = /[.][\s]*[.][\s]*(<\/li>)/g
        var storage = storage.replace(regexp, function(match) {
          return match.replace(/[.][\s]*[.]/g, '.')
        })

        //console.log(storage);

        if (!storage.match(/<pre[^>]*>/g)) {
          var storage = storage.replace(/<\/pre>/g, '')
        }

        //console.log(storage);

        wrapper.innerHTML = storage

        storage = wrapper.innerHTML

        var regexp = /[\u2014-\u2015\u2E3A\u2E3B]/g
        var storage = storage.replace(regexp, function(match) {
          return match.replace(/[-\u2014-\u2015\u2E3A\u2E3B]/g, ' ')
        })

        // remove regular dashes surrounded by space
        var regexp = /[\s]+[-\u2010-\u2011\uFE58\uFE63\uFF0D][\s]+/g
        var storage = storage.replace(regexp, function(match) {
          return match.replace(/[-\u2010-\u2011\uFE58\uFE63\uFF0D]/g, ' ')
        })

        var storage = storage.replace(
          /(?:[a-zA-Z]|[ά-ωΑ-ώ])[\s]+[.](?:^[a-zA-Z]|[ά-ωΑ-ώ])/g,
          '.'
        )

        var regexp = /…/g
        var storage = storage.replace(regexp, function(match) {
          return match + ' '
        })

        var regexp = /[\s]+[.][\s]+/g
        var storage = storage.replace(regexp, function(match) {
          return match.replace(/[\s]+[.]/g, '.')
        })

        var storage = storage.replace(/<a[^>]*>|<\/a>/g, '')
        var storage = storage.replace(/<b[^>]*>|<\/b>/g, '')
        var storage = storage.replace(/<br>/g, ' ')

        var storage = storage.replace(/  +/g, ' ')

        var storage = storage.replace(/[.][”]­/g, '."')

        var storage = storage.replace(/[“]­/g, '"')
        var storage = storage.replace(/[”]­/g, '"')

        console.log(storage)

        wrapper.innerHTML = storage

        //console.log(wrapper);

        read(splitCode(wrapper))

        cleanupSelection()
      }

      return false
    }

    function getSelection() {
      // reset keyboard focus
      document.activeElement.blur()

      document.addEventListener('mousemove', selectionMoved)
      document.addEventListener('click', selectionClicked)
      document.addEventListener('keyup', selectionKeyUp)
      document.addEventListener('keydown', selectionKeyDown)
    }

    function halveSpeed() {
      var checkbox = coreDisplay.nodes.doc.getElementById(
        '__rdly_halvespeed_input'
      )
      checkbox.checked = !checkbox.checked
      checkbox.dispatchEvent(new Event('change'))
    }

    function cleanupSelection() {
      document.removeEventListener('mousemove', selectionMoved)
      document.removeEventListener('click', selectionClicked)
      document.removeEventListener('keyup', selectionKeyUp)
      document.removeEventListener('keydown', selectionKeyDown)

      if (lastSelected) {
        lastSelected.classList.remove('__rdly-selected')
      }

      for (var i = 0; i < selected.length; i++) {
        var element = selected[i]
        element.classList.remove('__rdly-selected')
      }

      selected = []
      lastSelected = undefined
      lastTarget = undefined
    }

    // ==============================
    // EXTENSION EVENT LISTENER
    // ==============================
    // try {
    var browser = chrome || browser

    browser.runtime.onMessage.addListener(function(
      request,
      sender,
      sendResponse
    ) {
      console.debug('runtime message', request, sender)
    })

    browser.extension.onMessage.addListener(function(
      request,
      sender,
      sendResponse
    ) {
      console.debug('extension message', request, sender)

      switch (request.functiontoInvoke) {
        case 'readSelectedText':
          readSelectedText()
          break
        case 'readFullPage':
          readArticle()
          break
        case 'getSelection':
          getSelection()
          break
        case 'halveSpeed':
          halveSpeed()
          break
      }
    }) // End event listener
    //   } catch (e) {
    //     console.debug('Browser runtime, extension error!', e)
    //   }
  } catch (e) {
    console.debug('Main script failed!', e)
  }
})()
