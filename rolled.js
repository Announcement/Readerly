'use strict'

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
}

var require$$0 = _interopDefault(require('jquery'))
var franc = _interopDefault(require('franc'))
var unfluff = _interopDefault(require('@knod/unfluff'))
var sbd = _interopDefault(require('@knod/sbd'))
var require$$1 = _interopDefault(require('@knod/nouislider'))

var $
$ = require$$0
var Parser = function(
  cleanNode,
  detectLanguage,
  findArticle,
  cleanText,
  splitSentences
) {
  var rPar = {}
  rPar.language = 'en'
  rPar.debug = true
  rPar.cleanHTML = function($node) {
    $node.find('sup').remove()
    $node.find('script').remove()
    $node.find('style').remove()
    return $node
  }
  rPar.smallSample = function(node, desiredSampleLength) {
    var $node = $(node),
      halfSampleLength = desiredSampleLength / 2 || 500
    var text = $node.text()
    text = text.replace(/\s\s+/g, ' ')
    var aproxNumWords = Math.floor(text.length / 6),
      halfNumWords = aproxNumWords / 2
    var startingPoint, length
    if (halfNumWords > halfSampleLength) {
      length = halfSampleLength * 2
      startingPoint = halfNumWords - halfSampleLength
    } else {
      length = text.length
      startingPoint = 0
    }
    var sample = text.slice(startingPoint, startingPoint + length)
    if (rPar.debug) {
      console.log(
        '~~~parse debug~~~ text sample to send to language detection (Readerly code, not from a library or package):',
        sample
      )
    }
    return sample
  }
  rPar.parse = function(input) {
    if (Array.isArray(input)) {
      return input
        .map(item => {
          if (item.splitMethod === 'sentences') {
            var temp = item.text
            var temp = temp.replace(/(\r\n|\n|\r)/gm, ' ')
            return splitSentences(temp)
          } else if (item.splitMethod === 'lines') {
            return item.text.split('\n').map(line => {
              return [line]
            })
          } else {
            throw new Error(`Received invalid input: ${input}`)
          }
        })
        .reduce((combined, array) => {
          return combined.concat(array)
        }, [])
    } else {
      var rawText = ''
      if (typeof input === 'string') {
        rawText = input
      } else {
        var $node = $(input)
        var clone = $node.clone()[0],
          clean = cleanNode(clone)
        var sampleText = rPar.smallSample(clean),
          lang = detectLanguage(sampleText)
        rPar.language = lang
        rawText = findArticle(clean, lang)
      }
      var refinedText = cleanText(rawText)
      return splitSentences(refinedText)
    }
  }
  return rPar
}
var Parser_1 = Parser

var aar = { terminologic: null, iso6391: 'aa', name: 'Afar' }
var abk = { terminologic: null, iso6391: 'ab', name: 'Abkhazian' }
var ace = { terminologic: null, iso6391: null, name: 'Achinese' }
var ach = { terminologic: null, iso6391: null, name: 'Acoli' }
var ada = { terminologic: null, iso6391: null, name: 'Adangme' }
var ady = { terminologic: null, iso6391: null, name: 'Adyghe; Adygei' }
var afa = { terminologic: null, iso6391: null, name: 'Afro-Asiatic languages' }
var afh = { terminologic: null, iso6391: null, name: 'Afrihili' }
var afr = { terminologic: null, iso6391: 'af', name: 'Afrikaans' }
var ain = { terminologic: null, iso6391: null, name: 'Ainu' }
var aka = { terminologic: null, iso6391: 'ak', name: 'Akan' }
var akk = { terminologic: null, iso6391: null, name: 'Akkadian' }
var alb = { terminologic: 'sqi', iso6391: 'sq', name: 'Albanian' }
var ale = { terminologic: null, iso6391: null, name: 'Aleut' }
var alg = { terminologic: null, iso6391: null, name: 'Algonquian languages' }
var als = { terminologic: 'sqi', iso6391: 'sq', name: 'Albanian' }
var alt = { terminologic: null, iso6391: null, name: 'Southern Altai' }
var amh = { terminologic: null, iso6391: 'am', name: 'Amharic' }
var ang = {
  terminologic: null,
  iso6391: null,
  name: 'English, Old (ca.450-1100)'
}
var anp = { terminologic: null, iso6391: null, name: 'Angika' }
var apa = { terminologic: null, iso6391: null, name: 'Apache languages' }
var ara = { terminologic: null, iso6391: 'ar', name: 'Arabic' }
var arb = { iso6392: 'ara', iso6391: 'ar', name: 'Arabic' }
var arc = {
  terminologic: null,
  iso6391: null,
  name: 'Official Aramaic (700-300 BCE); Imperial Aramaic (700-300 BCE)'
}
var arg = { terminologic: null, iso6391: 'an', name: 'Aragonese' }
var arm = { terminologic: 'hye', iso6391: 'hy', name: 'Armenian' }
var arn = { terminologic: null, iso6391: null, name: 'Mapudungun; Mapuche' }
var arp = { terminologic: null, iso6391: null, name: 'Arapaho' }
var art = { terminologic: null, iso6391: null, name: 'Artificial languages' }
var arw = { terminologic: null, iso6391: null, name: 'Arawak' }
var asm = { terminologic: null, iso6391: 'as', name: 'Assamese' }
var ast = {
  terminologic: null,
  iso6391: null,
  name: 'Asturian; Bable; Leonese; Asturleonese'
}
var ath = { terminologic: null, iso6391: null, name: 'Athapascan languages' }
var aus = { terminologic: null, iso6391: null, name: 'Australian languages' }
var ava = { terminologic: null, iso6391: 'av', name: 'Avaric' }
var ave = { terminologic: null, iso6391: 'ae', name: 'Avestan' }
var awa = { terminologic: null, iso6391: null, name: 'Awadhi' }
var aym = { terminologic: null, iso6391: 'ay', name: 'Aymara' }
var aze = { terminologic: null, iso6391: 'az', name: 'Azerbaijani' }
var bad = { terminologic: null, iso6391: null, name: 'Banda languages' }
var bai = { terminologic: null, iso6391: null, name: 'Bamileke languages' }
var bak = { terminologic: null, iso6391: 'ba', name: 'Bashkir' }
var bal = { terminologic: null, iso6391: null, name: 'Baluchi' }
var bam = { terminologic: null, iso6391: 'bm', name: 'Bambara' }
var ban = { terminologic: null, iso6391: null, name: 'Balinese' }
var baq = { terminologic: 'eus', iso6391: 'eu', name: 'Basque' }
var bas = { terminologic: null, iso6391: null, name: 'Basa' }
var bat = { terminologic: null, iso6391: null, name: 'Baltic languages' }
var bej = { terminologic: null, iso6391: null, name: 'Beja; Bedawiyet' }
var bel = { terminologic: null, iso6391: 'be', name: 'Belarusian' }
var bem = { terminologic: null, iso6391: null, name: 'Bemba' }
var ben = { terminologic: null, iso6391: 'bn', name: 'Bengali' }
var ber = { terminologic: null, iso6391: null, name: 'Berber languages' }
var bho = { terminologic: null, iso6391: null, name: 'Bhojpuri' }
var bih = { terminologic: null, iso6391: 'bh', name: 'Bihari languages' }
var bik = { terminologic: null, iso6391: null, name: 'Bikol' }
var bin = { terminologic: null, iso6391: null, name: 'Bini; Edo' }
var bis = { terminologic: null, iso6391: 'bi', name: 'Bislama' }
var bla = { terminologic: null, iso6391: null, name: 'Siksika' }
var bnt = { terminologic: null, iso6391: null, name: 'Bantu (Other)' }
var bod = { bibliographic: 'tib', iso6391: 'bo', name: 'Tibetan' }
var bos = { terminologic: null, iso6391: 'bs', name: 'Bosnian' }
var bra = { terminologic: null, iso6391: null, name: 'Braj' }
var bre = { terminologic: null, iso6391: 'br', name: 'Breton' }
var btk = { terminologic: null, iso6391: null, name: 'Batak languages' }
var bua = { terminologic: null, iso6391: null, name: 'Buriat' }
var bug = { terminologic: null, iso6391: null, name: 'Buginese' }
var bul = { terminologic: null, iso6391: 'bg', name: 'Bulgarian' }
var bur = { terminologic: 'mya', iso6391: 'my', name: 'Burmese' }
var byn = { terminologic: null, iso6391: null, name: 'Blin; Bilin' }
var cad = { terminologic: null, iso6391: null, name: 'Caddo' }
var cai = {
  terminologic: null,
  iso6391: null,
  name: 'Central American Indian languages'
}
var car = { terminologic: null, iso6391: null, name: 'Galibi Carib' }
var cat = { terminologic: null, iso6391: 'ca', name: 'Catalan; Valencian' }
var cau = { terminologic: null, iso6391: null, name: 'Caucasian languages' }
var ceb = { terminologic: null, iso6391: null, name: 'Cebuano' }
var cel = { terminologic: null, iso6391: null, name: 'Celtic languages' }
var ces = { bibliographic: 'cze', iso6391: 'cs', name: 'Czech' }
var cha = { terminologic: null, iso6391: 'ch', name: 'Chamorro' }
var chb = { terminologic: null, iso6391: null, name: 'Chibcha' }
var che = { terminologic: null, iso6391: 'ce', name: 'Chechen' }
var chg = { terminologic: null, iso6391: null, name: 'Chagatai' }
var chi = { terminologic: 'zho', iso6391: 'zh', name: 'Chinese' }
var chk = { terminologic: null, iso6391: null, name: 'Chuukese' }
var chm = { terminologic: null, iso6391: null, name: 'Mari' }
var chn = { terminologic: null, iso6391: null, name: 'Chinook jargon' }
var cho = { terminologic: null, iso6391: null, name: 'Choctaw' }
var chp = { terminologic: null, iso6391: null, name: 'Chipewyan; Dene Suline' }
var chr = { terminologic: null, iso6391: null, name: 'Cherokee' }
var chu = {
  terminologic: null,
  iso6391: 'cu',
  name:
    'Church Slavic; Old Slavonic; Church Slavonic; Old Bulgarian; Old Church Slavonic'
}
var chv = { terminologic: null, iso6391: 'cv', name: 'Chuvash' }
var chy = { terminologic: null, iso6391: null, name: 'Cheyenne' }
var cmc = { terminologic: null, iso6391: null, name: 'Chamic languages' }
var cmn = { bibliographic: 'chi', iso6391: 'zh', name: 'Chinese' }
var cop = { terminologic: null, iso6391: null, name: 'Coptic' }
var cor = { terminologic: null, iso6391: 'kw', name: 'Cornish' }
var cos = { terminologic: null, iso6391: 'co', name: 'Corsican' }
var cpe = {
  terminologic: null,
  iso6391: null,
  name: 'Creoles and pidgins, English based'
}
var cpf = {
  terminologic: null,
  iso6391: null,
  name: 'Creoles and pidgins, French-based '
}
var cpp = {
  terminologic: null,
  iso6391: null,
  name: 'Creoles and pidgins, Portuguese-based '
}
var cre = { terminologic: null, iso6391: 'cr', name: 'Cree' }
var crh = {
  terminologic: null,
  iso6391: null,
  name: 'Crimean Tatar; Crimean Turkish'
}
var crp = { terminologic: null, iso6391: null, name: 'Creoles and pidgins ' }
var csb = { terminologic: null, iso6391: null, name: 'Kashubian' }
var cus = { terminologic: null, iso6391: null, name: 'Cushitic languages' }
var cym = { bibliographic: 'wel', iso6391: 'cy', name: 'Welsh' }
var cze = { terminologic: 'ces', iso6391: 'cs', name: 'Czech' }
var dak = { terminologic: null, iso6391: null, name: 'Dakota' }
var dan = { terminologic: null, iso6391: 'da', name: 'Danish' }
var dar = { terminologic: null, iso6391: null, name: 'Dargwa' }
var day = { terminologic: null, iso6391: null, name: 'Land Dayak languages' }
var del = { terminologic: null, iso6391: null, name: 'Delaware' }
var den = { terminologic: null, iso6391: null, name: 'Slave (Athapascan)' }
var deu = { bibliographic: 'ger', iso6391: 'de', name: 'German' }
var dgr = { terminologic: null, iso6391: null, name: 'Dogrib' }
var din = { terminologic: null, iso6391: null, name: 'Dinka' }
var div = {
  terminologic: null,
  iso6391: 'dv',
  name: 'Divehi; Dhivehi; Maldivian'
}
var doi = { terminologic: null, iso6391: null, name: 'Dogri' }
var dra = { terminologic: null, iso6391: null, name: 'Dravidian languages' }
var dsb = { terminologic: null, iso6391: null, name: 'Lower Sorbian' }
var dua = { terminologic: null, iso6391: null, name: 'Duala' }
var dum = {
  terminologic: null,
  iso6391: null,
  name: 'Dutch, Middle (ca.1050-1350)'
}
var dut = { terminologic: 'nld', iso6391: 'nl', name: 'Dutch; Flemish' }
var dyu = { terminologic: null, iso6391: null, name: 'Dyula' }
var dzo = { terminologic: null, iso6391: 'dz', name: 'Dzongkha' }
var efi = { terminologic: null, iso6391: null, name: 'Efik' }
var egy = { terminologic: null, iso6391: null, name: 'Egyptian (Ancient)' }
var eka = { terminologic: null, iso6391: null, name: 'Ekajuk' }
var ell = { bibliographic: 'gre', iso6391: 'el', name: 'Greek, Modern (1453-)' }
var elx = { terminologic: null, iso6391: null, name: 'Elamite' }
var eng = { terminologic: null, iso6391: 'en', name: 'English' }
var enm = {
  terminologic: null,
  iso6391: null,
  name: 'English, Middle (1100-1500)'
}
var epo = { terminologic: null, iso6391: 'eo', name: 'Esperanto' }
var est = { terminologic: null, iso6391: 'et', name: 'Estonian' }
var eus = { bibliographic: 'baq', iso6391: 'eu', name: 'Basque' }
var ewe = { terminologic: null, iso6391: 'ee', name: 'Ewe' }
var ewo = { terminologic: null, iso6391: null, name: 'Ewondo' }
var fan = { terminologic: null, iso6391: null, name: 'Fang' }
var fao = { terminologic: null, iso6391: 'fo', name: 'Faroese' }
var fas = { bibliographic: 'per', iso6391: 'fa', name: 'Persian' }
var fat = { terminologic: null, iso6391: null, name: 'Fanti' }
var fij = { terminologic: null, iso6391: 'fj', name: 'Fijian' }
var fil = { terminologic: null, iso6391: null, name: 'Filipino; Pilipino' }
var fin = { terminologic: null, iso6391: 'fi', name: 'Finnish' }
var fiu = { terminologic: null, iso6391: null, name: 'Finno-Ugrian languages' }
var fon = { terminologic: null, iso6391: null, name: 'Fon' }
var fra = { bibliographic: 'fre', iso6391: 'fr', name: 'French' }
var fre = { terminologic: 'fra', iso6391: 'fr', name: 'French' }
var frm = {
  terminologic: null,
  iso6391: null,
  name: 'French, Middle (ca.1400-1600)'
}
var fro = {
  terminologic: null,
  iso6391: null,
  name: 'French, Old (842-ca.1400)'
}
var frr = { terminologic: null, iso6391: null, name: 'Northern Frisian' }
var frs = { terminologic: null, iso6391: null, name: 'Eastern Frisian' }
var fry = { terminologic: null, iso6391: 'fy', name: 'Western Frisian' }
var ful = { terminologic: null, iso6391: 'ff', name: 'Fulah' }
var fur = { terminologic: null, iso6391: null, name: 'Friulian' }
var gaa = { terminologic: null, iso6391: null, name: 'Ga' }
var gay = { terminologic: null, iso6391: null, name: 'Gayo' }
var gba = { terminologic: null, iso6391: null, name: 'Gbaya' }
var gem = { terminologic: null, iso6391: null, name: 'Germanic languages' }
var geo = { terminologic: 'kat', iso6391: 'ka', name: 'Georgian' }
var ger = { terminologic: 'deu', iso6391: 'de', name: 'German' }
var gez = { terminologic: null, iso6391: null, name: 'Geez' }
var gil = { terminologic: null, iso6391: null, name: 'Gilbertese' }
var gla = { terminologic: null, iso6391: 'gd', name: 'Gaelic; Scottish Gaelic' }
var gle = { terminologic: null, iso6391: 'ga', name: 'Irish' }
var glg = { terminologic: null, iso6391: 'gl', name: 'Galician' }
var glv = { terminologic: null, iso6391: 'gv', name: 'Manx' }
var gmh = {
  terminologic: null,
  iso6391: null,
  name: 'German, Middle High (ca.1050-1500)'
}
var goh = {
  terminologic: null,
  iso6391: null,
  name: 'German, Old High (ca.750-1050)'
}
var gon = { terminologic: null, iso6391: null, name: 'Gondi' }
var gor = { terminologic: null, iso6391: null, name: 'Gorontalo' }
var got = { terminologic: null, iso6391: null, name: 'Gothic' }
var grb = { terminologic: null, iso6391: null, name: 'Grebo' }
var grc = {
  terminologic: null,
  iso6391: null,
  name: 'Greek, Ancient (to 1453)'
}
var gre = { terminologic: 'ell', iso6391: 'el', name: 'Greek, Modern (1453-)' }
var grn = { terminologic: null, iso6391: 'gn', name: 'Guarani' }
var gsw = {
  terminologic: null,
  iso6391: null,
  name: 'Swiss German; Alemannic; Alsatian'
}
var guj = { terminologic: null, iso6391: 'gu', name: 'Gujarati' }
var gwi = { terminologic: null, iso6391: null, name: "Gwich'in" }
var hai = { terminologic: null, iso6391: null, name: 'Haida' }
var hat = { terminologic: null, iso6391: 'ht', name: 'Haitian; Haitian Creole' }
var hau = { terminologic: null, iso6391: 'ha', name: 'Hausa' }
var haw = { terminologic: null, iso6391: null, name: 'Hawaiian' }
var heb = { terminologic: null, iso6391: 'he', name: 'Hebrew' }
var her = { terminologic: null, iso6391: 'hz', name: 'Herero' }
var hil = { terminologic: null, iso6391: null, name: 'Hiligaynon' }
var him = {
  terminologic: null,
  iso6391: null,
  name: 'Himachali languages; Western Pahari languages'
}
var hin = { terminologic: null, iso6391: 'hi', name: 'Hindi' }
var hit = { terminologic: null, iso6391: null, name: 'Hittite' }
var hmn = { terminologic: null, iso6391: null, name: 'Hmong; Mong' }
var hmo = { terminologic: null, iso6391: 'ho', name: 'Hiri Motu' }
var hrv = { terminologic: null, iso6391: 'hr', name: 'Croatian' }
var hsb = { terminologic: null, iso6391: null, name: 'Upper Sorbian' }
var hun = { terminologic: null, iso6391: 'hu', name: 'Hungarian' }
var hup = { terminologic: null, iso6391: null, name: 'Hupa' }
var hye = { bibliographic: 'arm', iso6391: 'hy', name: 'Armenian' }
var iba = { terminologic: null, iso6391: null, name: 'Iban' }
var ibo = { terminologic: null, iso6391: 'ig', name: 'Igbo' }
var ice = { terminologic: 'isl', iso6391: 'is', name: 'Icelandic' }
var ido = { terminologic: null, iso6391: 'io', name: 'Ido' }
var iii = { terminologic: null, iso6391: 'ii', name: 'Sichuan Yi; Nuosu' }
var ijo = { terminologic: null, iso6391: null, name: 'Ijo languages' }
var iku = { terminologic: null, iso6391: 'iu', name: 'Inuktitut' }
var ile = { terminologic: null, iso6391: 'ie', name: 'Interlingue; Occidental' }
var ilo = { terminologic: null, iso6391: null, name: 'Iloko' }
var ina = {
  terminologic: null,
  iso6391: 'ia',
  name: 'Interlingua (International Auxiliary Language Association)'
}
var inc = { terminologic: null, iso6391: null, name: 'Indic languages' }
var ind = { terminologic: null, iso6391: 'id', name: 'Indonesian' }
var ine = { terminologic: null, iso6391: null, name: 'Indo-European languages' }
var inh = { terminologic: null, iso6391: null, name: 'Ingush' }
var ipk = { terminologic: null, iso6391: 'ik', name: 'Inupiaq' }
var ira = { terminologic: null, iso6391: null, name: 'Iranian languages' }
var iro = { terminologic: null, iso6391: null, name: 'Iroquoian languages' }
var isl = { bibliographic: 'ice', iso6391: 'is', name: 'Icelandic' }
var ita = { terminologic: null, iso6391: 'it', name: 'Italian' }
var jav = { terminologic: null, iso6391: 'jv', name: 'Javanese' }
var jbo = { terminologic: null, iso6391: null, name: 'Lojban' }
var jpn = { terminologic: null, iso6391: 'ja', name: 'Japanese' }
var jpr = { terminologic: null, iso6391: null, name: 'Judeo-Persian' }
var jrb = { terminologic: null, iso6391: null, name: 'Judeo-Arabic' }
var kaa = { terminologic: null, iso6391: null, name: 'Kara-Kalpak' }
var kab = { terminologic: null, iso6391: null, name: 'Kabyle' }
var kac = { terminologic: null, iso6391: null, name: 'Kachin; Jingpho' }
var kal = {
  terminologic: null,
  iso6391: 'kl',
  name: 'Kalaallisut; Greenlandic'
}
var kam = { terminologic: null, iso6391: null, name: 'Kamba' }
var kan = { terminologic: null, iso6391: 'kn', name: 'Kannada' }
var kar = { terminologic: null, iso6391: null, name: 'Karen languages' }
var kas = { terminologic: null, iso6391: 'ks', name: 'Kashmiri' }
var kat = { bibliographic: 'geo', iso6391: 'ka', name: 'Georgian' }
var kau = { terminologic: null, iso6391: 'kr', name: 'Kanuri' }
var kaw = { terminologic: null, iso6391: null, name: 'Kawi' }
var kaz = { terminologic: null, iso6391: 'kk', name: 'Kazakh' }
var kbd = { terminologic: null, iso6391: null, name: 'Kabardian' }
var kha = { terminologic: null, iso6391: null, name: 'Khasi' }
var khi = { terminologic: null, iso6391: null, name: 'Khoisan languages' }
var khm = { terminologic: null, iso6391: 'km', name: 'Central Khmer' }
var kho = { terminologic: null, iso6391: null, name: 'Khotanese; Sakan' }
var kik = { terminologic: null, iso6391: 'ki', name: 'Kikuyu; Gikuyu' }
var kin = { terminologic: null, iso6391: 'rw', name: 'Kinyarwanda' }
var kir = { terminologic: null, iso6391: 'ky', name: 'Kirghiz; Kyrgyz' }
var kmb = { terminologic: null, iso6391: null, name: 'Kimbundu' }
var kok = { terminologic: null, iso6391: null, name: 'Konkani' }
var kom = { terminologic: null, iso6391: 'kv', name: 'Komi' }
var kon = { terminologic: null, iso6391: 'kg', name: 'Kongo' }
var kor = { terminologic: null, iso6391: 'ko', name: 'Korean' }
var kos = { terminologic: null, iso6391: null, name: 'Kosraean' }
var kpe = { terminologic: null, iso6391: null, name: 'Kpelle' }
var krc = { terminologic: null, iso6391: null, name: 'Karachay-Balkar' }
var krl = { terminologic: null, iso6391: null, name: 'Karelian' }
var kro = { terminologic: null, iso6391: null, name: 'Kru languages' }
var kru = { terminologic: null, iso6391: null, name: 'Kurukh' }
var kua = { terminologic: null, iso6391: 'kj', name: 'Kuanyama; Kwanyama' }
var kum = { terminologic: null, iso6391: null, name: 'Kumyk' }
var kur = { terminologic: null, iso6391: 'ku', name: 'Kurdish' }
var kut = { terminologic: null, iso6391: null, name: 'Kutenai' }
var lad = { terminologic: null, iso6391: null, name: 'Ladino' }
var lah = { terminologic: null, iso6391: null, name: 'Lahnda' }
var lam = { terminologic: null, iso6391: null, name: 'Lamba' }
var lao = { terminologic: null, iso6391: 'lo', name: 'Lao' }
var lat = { terminologic: null, iso6391: 'la', name: 'Latin' }
var lav = { terminologic: null, iso6391: 'lv', name: 'Latvian' }
var lez = { terminologic: null, iso6391: null, name: 'Lezghian' }
var lim = {
  terminologic: null,
  iso6391: 'li',
  name: 'Limburgan; Limburger; Limburgish'
}
var lin = { terminologic: null, iso6391: 'ln', name: 'Lingala' }
var lit = { terminologic: null, iso6391: 'lt', name: 'Lithuanian' }
var lol = { terminologic: null, iso6391: null, name: 'Mongo' }
var loz = { terminologic: null, iso6391: null, name: 'Lozi' }
var ltz = {
  terminologic: null,
  iso6391: 'lb',
  name: 'Luxembourgish; Letzeburgesch'
}
var lua = { terminologic: null, iso6391: null, name: 'Luba-Lulua' }
var lub = { terminologic: null, iso6391: 'lu', name: 'Luba-Katanga' }
var lug = { terminologic: null, iso6391: 'lg', name: 'Ganda' }
var lui = { terminologic: null, iso6391: null, name: 'Luiseno' }
var lun = { terminologic: null, iso6391: null, name: 'Lunda' }
var luo = {
  terminologic: null,
  iso6391: null,
  name: 'Luo (Kenya and Tanzania)'
}
var lus = { terminologic: null, iso6391: null, name: 'Lushai' }
var mac = { terminologic: 'mkd', iso6391: 'mk', name: 'Macedonian' }
var mad = { terminologic: null, iso6391: null, name: 'Madurese' }
var mag = { terminologic: null, iso6391: null, name: 'Magahi' }
var mah = { terminologic: null, iso6391: 'mh', name: 'Marshallese' }
var mai = { terminologic: null, iso6391: null, name: 'Maithili' }
var mak = { terminologic: null, iso6391: null, name: 'Makasar' }
var mal = { terminologic: null, iso6391: 'ml', name: 'Malayalam' }
var man = { terminologic: null, iso6391: null, name: 'Mandingo' }
var mao = { terminologic: 'mri', iso6391: 'mi', name: 'Maori' }
var map = { terminologic: null, iso6391: null, name: 'Austronesian languages' }
var mar = { terminologic: null, iso6391: 'mr', name: 'Marathi' }
var mas = { terminologic: null, iso6391: null, name: 'Masai' }
var may = { terminologic: 'msa', iso6391: 'ms', name: 'Malay' }
var mdf = { terminologic: null, iso6391: null, name: 'Moksha' }
var mdr = { terminologic: null, iso6391: null, name: 'Mandar' }
var men = { terminologic: null, iso6391: null, name: 'Mende' }
var mga = {
  terminologic: null,
  iso6391: null,
  name: 'Irish, Middle (900-1200)'
}
var mic = { terminologic: null, iso6391: null, name: "Mi'kmaq; Micmac" }
var min = { terminologic: null, iso6391: null, name: 'Minangkabau' }
var mis = { terminologic: null, iso6391: null, name: 'Uncoded languages' }
var mkd = { bibliographic: 'mac', iso6391: 'mk', name: 'Macedonian' }
var mkh = { terminologic: null, iso6391: null, name: 'Mon-Khmer languages' }
var mlg = { terminologic: null, iso6391: 'mg', name: 'Malagasy' }
var mlt = { terminologic: null, iso6391: 'mt', name: 'Maltese' }
var mnc = { terminologic: null, iso6391: null, name: 'Manchu' }
var mni = { terminologic: null, iso6391: null, name: 'Manipuri' }
var mno = { terminologic: null, iso6391: null, name: 'Manobo languages' }
var moh = { terminologic: null, iso6391: null, name: 'Mohawk' }
var mon = { terminologic: null, iso6391: 'mn', name: 'Mongolian' }
var mos = { terminologic: null, iso6391: null, name: 'Mossi' }
var mri = { bibliographic: 'mao', iso6391: 'mi', name: 'Maori' }
var msa = { bibliographic: 'may', iso6391: 'ms', name: 'Malay' }
var mul = { terminologic: null, iso6391: null, name: 'Multiple languages' }
var mun = { terminologic: null, iso6391: null, name: 'Munda languages' }
var mus = { terminologic: null, iso6391: null, name: 'Creek' }
var mwl = { terminologic: null, iso6391: null, name: 'Mirandese' }
var mwr = { terminologic: null, iso6391: null, name: 'Marwari' }
var mya = { bibliographic: 'bur', iso6391: 'my', name: 'Burmese' }
var myn = { terminologic: null, iso6391: null, name: 'Mayan languages' }
var myv = { terminologic: null, iso6391: null, name: 'Erzya' }
var nah = { terminologic: null, iso6391: null, name: 'Nahuatl languages' }
var nai = {
  terminologic: null,
  iso6391: null,
  name: 'North American Indian languages'
}
var nap = { terminologic: null, iso6391: null, name: 'Neapolitan' }
var nau = { terminologic: null, iso6391: 'na', name: 'Nauru' }
var nav = { terminologic: null, iso6391: 'nv', name: 'Navajo; Navaho' }
var nbl = {
  terminologic: null,
  iso6391: 'nr',
  name: 'Ndebele, South; South Ndebele'
}
var nde = {
  terminologic: null,
  iso6391: 'nd',
  name: 'Ndebele, North; North Ndebele'
}
var ndo = { terminologic: null, iso6391: 'ng', name: 'Ndonga' }
var nds = {
  terminologic: null,
  iso6391: null,
  name: 'Low German; Low Saxon; German, Low; Saxon, Low'
}
var nep = { terminologic: null, iso6391: 'ne', name: 'Nepali' }
var nia = { terminologic: null, iso6391: null, name: 'Nias' }
var nic = {
  terminologic: null,
  iso6391: null,
  name: 'Niger-Kordofanian languages'
}
var niu = { terminologic: null, iso6391: null, name: 'Niuean' }
var nld = { bibliographic: 'dut', iso6391: 'nl', name: 'Dutch; Flemish' }
var nno = {
  terminologic: null,
  iso6391: 'nn',
  name: 'Norwegian Nynorsk; Nynorsk, Norwegian'
}
var nob = {
  terminologic: null,
  iso6391: 'nb',
  name: 'Bokmål, Norwegian; Norwegian Bokmål'
}
var nog = { terminologic: null, iso6391: null, name: 'Nogai' }
var non = { terminologic: null, iso6391: null, name: 'Norse, Old' }
var nor = { terminologic: null, iso6391: 'no', name: 'Norwegian' }
var nqo = { terminologic: null, iso6391: null, name: "N'Ko" }
var nso = {
  terminologic: null,
  iso6391: null,
  name: 'Pedi; Sepedi; Northern Sotho'
}
var nub = { terminologic: null, iso6391: null, name: 'Nubian languages' }
var nwc = {
  terminologic: null,
  iso6391: null,
  name: 'Classical Newari; Old Newari; Classical Nepal Bhasa'
}
var nya = { terminologic: null, iso6391: 'ny', name: 'Chichewa; Chewa; Nyanja' }
var nym = { terminologic: null, iso6391: null, name: 'Nyamwezi' }
var nyn = { terminologic: null, iso6391: null, name: 'Nyankole' }
var nyo = { terminologic: null, iso6391: null, name: 'Nyoro' }
var nzi = { terminologic: null, iso6391: null, name: 'Nzima' }
var oci = {
  terminologic: null,
  iso6391: 'oc',
  name: 'Occitan (post 1500); Provençal'
}
var oji = { terminologic: null, iso6391: 'oj', name: 'Ojibwa' }
var ori = { terminologic: null, iso6391: 'or', name: 'Oriya' }
var orm = { terminologic: null, iso6391: 'om', name: 'Oromo' }
var osa = { terminologic: null, iso6391: null, name: 'Osage' }
var oss = { terminologic: null, iso6391: 'os', name: 'Ossetian; Ossetic' }
var ota = {
  terminologic: null,
  iso6391: null,
  name: 'Turkish, Ottoman (1500-1928)'
}
var oto = { terminologic: null, iso6391: null, name: 'Otomian languages' }
var paa = { terminologic: null, iso6391: null, name: 'Papuan languages' }
var pag = { terminologic: null, iso6391: null, name: 'Pangasinan' }
var pal = { terminologic: null, iso6391: null, name: 'Pahlavi' }
var pam = { terminologic: null, iso6391: null, name: 'Pampanga; Kapampangan' }
var pan = { terminologic: null, iso6391: 'pa', name: 'Panjabi; Punjabi' }
var pap = { terminologic: null, iso6391: null, name: 'Papiamento' }
var pau = { terminologic: null, iso6391: null, name: 'Palauan' }
var peo = {
  terminologic: null,
  iso6391: null,
  name: 'Persian, Old (ca.600-400 B.C.)'
}
var per = { terminologic: 'fas', iso6391: 'fa', name: 'Persian' }
var phi = { terminologic: null, iso6391: null, name: 'Philippine languages' }
var phn = { terminologic: null, iso6391: null, name: 'Phoenician' }
var pli = { terminologic: null, iso6391: 'pi', name: 'Pali' }
var pol = { terminologic: null, iso6391: 'pl', name: 'Polish' }
var pon = { terminologic: null, iso6391: null, name: 'Pohnpeian' }
var por = { terminologic: null, iso6391: 'pt', name: 'Portuguese' }
var pra = { terminologic: null, iso6391: null, name: 'Prakrit languages' }
var pro = {
  terminologic: null,
  iso6391: null,
  name: 'Provençal, Old (to 1500)'
}
var pus = { terminologic: null, iso6391: 'ps', name: 'Pushto; Pashto' }
var que = { terminologic: null, iso6391: 'qu', name: 'Quechua' }
var raj = { terminologic: null, iso6391: null, name: 'Rajasthani' }
var rap = { terminologic: null, iso6391: null, name: 'Rapanui' }
var rar = {
  terminologic: null,
  iso6391: null,
  name: 'Rarotongan; Cook Islands Maori'
}
var roa = { terminologic: null, iso6391: null, name: 'Romance languages' }
var roh = { terminologic: null, iso6391: 'rm', name: 'Romansh' }
var rom = { terminologic: null, iso6391: null, name: 'Romany' }
var ron = {
  bibliographic: 'rum',
  iso6391: 'ro',
  name: 'Romanian; Moldavian; Moldovan'
}
var rum = {
  terminologic: 'ron',
  iso6391: 'ro',
  name: 'Romanian; Moldavian; Moldovan'
}
var run = { terminologic: null, iso6391: 'rn', name: 'Rundi' }
var rup = {
  terminologic: null,
  iso6391: null,
  name: 'Aromanian; Arumanian; Macedo-Romanian'
}
var rus = { terminologic: null, iso6391: 'ru', name: 'Russian' }
var sad = { terminologic: null, iso6391: null, name: 'Sandawe' }
var sag = { terminologic: null, iso6391: 'sg', name: 'Sango' }
var sah = { terminologic: null, iso6391: null, name: 'Yakut' }
var sai = {
  terminologic: null,
  iso6391: null,
  name: 'South American Indian (Other)'
}
var sal = { terminologic: null, iso6391: null, name: 'Salishan languages' }
var sam = { terminologic: null, iso6391: null, name: 'Samaritan Aramaic' }
var san = { terminologic: null, iso6391: 'sa', name: 'Sanskrit' }
var sas = { terminologic: null, iso6391: null, name: 'Sasak' }
var sat = { terminologic: null, iso6391: null, name: 'Santali' }
var scn = { terminologic: null, iso6391: null, name: 'Sicilian' }
var sco = { terminologic: null, iso6391: null, name: 'Scots' }
var sel = { terminologic: null, iso6391: null, name: 'Selkup' }
var sem = { terminologic: null, iso6391: null, name: 'Semitic languages' }
var sga = { terminologic: null, iso6391: null, name: 'Irish, Old (to 900)' }
var sgn = { terminologic: null, iso6391: null, name: 'Sign Languages' }
var shn = { terminologic: null, iso6391: null, name: 'Shan' }
var sid = { terminologic: null, iso6391: null, name: 'Sidamo' }
var sin = { terminologic: null, iso6391: 'si', name: 'Sinhala; Sinhalese' }
var sio = { terminologic: null, iso6391: null, name: 'Siouan languages' }
var sit = { terminologic: null, iso6391: null, name: 'Sino-Tibetan languages' }
var sla = { terminologic: null, iso6391: null, name: 'Slavic languages' }
var slo = { terminologic: 'slk', iso6391: 'sk', name: 'Slovak' }
var slk = { bibliographic: 'slo', iso6391: 'sk', name: 'Slovak' }
var slv = { terminologic: null, iso6391: 'sl', name: 'Slovenian' }
var sma = { terminologic: null, iso6391: null, name: 'Southern Sami' }
var sme = { terminologic: null, iso6391: 'se', name: 'Northern Sami' }
var smi = { terminologic: null, iso6391: null, name: 'Sami languages' }
var smj = { terminologic: null, iso6391: null, name: 'Lule Sami' }
var smn = { terminologic: null, iso6391: null, name: 'Inari Sami' }
var smo = { terminologic: null, iso6391: 'sm', name: 'Samoan' }
var sms = { terminologic: null, iso6391: null, name: 'Skolt Sami' }
var sna = { terminologic: null, iso6391: 'sn', name: 'Shona' }
var snd = { terminologic: null, iso6391: 'sd', name: 'Sindhi' }
var snk = { terminologic: null, iso6391: null, name: 'Soninke' }
var sog = { terminologic: null, iso6391: null, name: 'Sogdian' }
var som = { terminologic: null, iso6391: 'so', name: 'Somali' }
var son = { terminologic: null, iso6391: null, name: 'Songhai languages' }
var sot = { terminologic: null, iso6391: 'st', name: 'Sotho, Southern' }
var spa = { terminologic: null, iso6391: 'es', name: 'Spanish; Castilian' }
var sqi = { bibliographic: 'alb', iso6391: 'sq', name: 'Albanian' }
var srd = { terminologic: null, iso6391: 'sc', name: 'Sardinian' }
var srn = { terminologic: null, iso6391: null, name: 'Sranan Tongo' }
var srp = { terminologic: null, iso6391: 'sr', name: 'Serbian' }
var srr = { terminologic: null, iso6391: null, name: 'Serer' }
var ssa = { terminologic: null, iso6391: null, name: 'Nilo-Saharan languages' }
var ssw = { terminologic: null, iso6391: 'ss', name: 'Swati' }
var suk = { terminologic: null, iso6391: null, name: 'Sukuma' }
var sun = { terminologic: null, iso6391: 'su', name: 'Sundanese' }
var sus = { terminologic: null, iso6391: null, name: 'Susu' }
var sux = { terminologic: null, iso6391: null, name: 'Sumerian' }
var swa = { terminologic: null, iso6391: 'sw', name: 'Swahili' }
var swe = { terminologic: null, iso6391: 'sv', name: 'Swedish' }
var syc = { terminologic: null, iso6391: null, name: 'Classical Syriac' }
var syr = { terminologic: null, iso6391: null, name: 'Syriac' }
var tah = { terminologic: null, iso6391: 'ty', name: 'Tahitian' }
var tai = { terminologic: null, iso6391: null, name: 'Tai languages' }
var tam = { terminologic: null, iso6391: 'ta', name: 'Tamil' }
var tat = { terminologic: null, iso6391: 'tt', name: 'Tatar' }
var tel = { terminologic: null, iso6391: 'te', name: 'Telugu' }
var tem = { terminologic: null, iso6391: null, name: 'Timne' }
var ter = { terminologic: null, iso6391: null, name: 'Tereno' }
var tet = { terminologic: null, iso6391: null, name: 'Tetum' }
var tgk = { terminologic: null, iso6391: 'tg', name: 'Tajik' }
var tgl = { terminologic: null, iso6391: 'tl', name: 'Tagalog' }
var tha = { terminologic: null, iso6391: 'th', name: 'Thai' }
var tib = { terminologic: 'bod', iso6391: 'bo', name: 'Tibetan' }
var tig = { terminologic: null, iso6391: null, name: 'Tigre' }
var tir = { terminologic: null, iso6391: 'ti', name: 'Tigrinya' }
var tiv = { terminologic: null, iso6391: null, name: 'Tiv' }
var tkl = { terminologic: null, iso6391: null, name: 'Tokelau' }
var tlh = { terminologic: null, iso6391: null, name: 'Klingon; tlhIngan-Hol' }
var tli = { terminologic: null, iso6391: null, name: 'Tlingit' }
var tmh = { terminologic: null, iso6391: null, name: 'Tamashek' }
var tog = { terminologic: null, iso6391: null, name: 'Tonga (Nyasa)' }
var ton = { terminologic: null, iso6391: 'to', name: 'Tonga (Tonga Islands)' }
var tpi = { terminologic: null, iso6391: null, name: 'Tok Pisin' }
var tsi = { terminologic: null, iso6391: null, name: 'Tsimshian' }
var tsn = { terminologic: null, iso6391: 'tn', name: 'Tswana' }
var tso = { terminologic: null, iso6391: 'ts', name: 'Tsonga' }
var tuk = { terminologic: null, iso6391: 'tk', name: 'Turkmen' }
var tum = { terminologic: null, iso6391: null, name: 'Tumbuka' }
var tup = { terminologic: null, iso6391: null, name: 'Tupi languages' }
var tur = { terminologic: null, iso6391: 'tr', name: 'Turkish' }
var tut = { terminologic: null, iso6391: null, name: 'Altaic languages' }
var tvl = { terminologic: null, iso6391: null, name: 'Tuvalu' }
var twi = { terminologic: null, iso6391: 'tw', name: 'Twi' }
var tyv = { terminologic: null, iso6391: null, name: 'Tuvinian' }
var udm = { terminologic: null, iso6391: null, name: 'Udmurt' }
var uga = { terminologic: null, iso6391: null, name: 'Ugaritic' }
var uig = { terminologic: null, iso6391: 'ug', name: 'Uighur; Uyghur' }
var ukr = { terminologic: null, iso6391: 'uk', name: 'Ukrainian' }
var umb = { terminologic: null, iso6391: null, name: 'Umbundu' }
var und = { terminologic: null, iso6391: null, name: 'Undetermined' }
var urd = { terminologic: null, iso6391: 'ur', name: 'Urdu' }
var uzb = { terminologic: null, iso6391: 'uz', name: 'Uzbek' }
var vai = { terminologic: null, iso6391: null, name: 'Vai' }
var ven = { terminologic: null, iso6391: 've', name: 'Venda' }
var vie = { terminologic: null, iso6391: 'vi', name: 'Vietnamese' }
var vol = { terminologic: null, iso6391: 'vo', name: 'Volapük' }
var vot = { terminologic: null, iso6391: null, name: 'Votic' }
var wak = { terminologic: null, iso6391: null, name: 'Wakashan languages' }
var wal = { terminologic: null, iso6391: null, name: 'Walamo' }
var war = { terminologic: null, iso6391: null, name: 'Waray' }
var was = { terminologic: null, iso6391: null, name: 'Washo' }
var wel = { terminologic: 'cym', iso6391: 'cy', name: 'Welsh' }
var wen = { terminologic: null, iso6391: null, name: 'Sorbian languages' }
var wln = { terminologic: null, iso6391: 'wa', name: 'Walloon' }
var wol = { terminologic: null, iso6391: 'wo', name: 'Wolof' }
var xal = { terminologic: null, iso6391: null, name: 'Kalmyk; Oirat' }
var xho = { terminologic: null, iso6391: 'xh', name: 'Xhosa' }
var yao = { terminologic: null, iso6391: null, name: 'Yao' }
var yap = { terminologic: null, iso6391: null, name: 'Yapese' }
var yid = { terminologic: null, iso6391: 'yi', name: 'Yiddish' }
var yor = { terminologic: null, iso6391: 'yo', name: 'Yoruba' }
var ypk = { terminologic: null, iso6391: null, name: 'Yupik languages' }
var zap = { terminologic: null, iso6391: null, name: 'Zapotec' }
var zbl = {
  terminologic: null,
  iso6391: null,
  name: 'Blissymbols; Blissymbolics; Bliss'
}
var zen = { terminologic: null, iso6391: null, name: 'Zenaga' }
var zgh = {
  terminologic: null,
  iso6391: null,
  name: 'Standard Moroccan Tamazight'
}
var zha = { terminologic: null, iso6391: 'za', name: 'Zhuang; Chuang' }
var zho = { bibliographic: 'chi', iso6391: 'zh', name: 'Chinese' }
var znd = { terminologic: null, iso6391: null, name: 'Zande languages' }
var zul = { terminologic: null, iso6391: 'zu', name: 'Zulu' }
var zun = { terminologic: null, iso6391: null, name: 'Zuni' }
var zxx = {
  terminologic: null,
  iso6391: null,
  name: 'No linguistic content; Not applicable'
}
var zza = {
  terminologic: null,
  iso6391: null,
  name: 'Zaza; Dimili; Dimli; Kirdki; Kirmanjki; Zazaki'
}
var iso639 = {
  aar: aar,
  abk: abk,
  ace: ace,
  ach: ach,
  ada: ada,
  ady: ady,
  afa: afa,
  afh: afh,
  afr: afr,
  ain: ain,
  aka: aka,
  akk: akk,
  alb: alb,
  ale: ale,
  alg: alg,
  als: als,
  alt: alt,
  amh: amh,
  ang: ang,
  anp: anp,
  apa: apa,
  ara: ara,
  arb: arb,
  arc: arc,
  arg: arg,
  arm: arm,
  arn: arn,
  arp: arp,
  art: art,
  arw: arw,
  asm: asm,
  ast: ast,
  ath: ath,
  aus: aus,
  ava: ava,
  ave: ave,
  awa: awa,
  aym: aym,
  aze: aze,
  bad: bad,
  bai: bai,
  bak: bak,
  bal: bal,
  bam: bam,
  ban: ban,
  baq: baq,
  bas: bas,
  bat: bat,
  bej: bej,
  bel: bel,
  bem: bem,
  ben: ben,
  ber: ber,
  bho: bho,
  bih: bih,
  bik: bik,
  bin: bin,
  bis: bis,
  bla: bla,
  bnt: bnt,
  bod: bod,
  bos: bos,
  bra: bra,
  bre: bre,
  btk: btk,
  bua: bua,
  bug: bug,
  bul: bul,
  bur: bur,
  byn: byn,
  cad: cad,
  cai: cai,
  car: car,
  cat: cat,
  cau: cau,
  ceb: ceb,
  cel: cel,
  ces: ces,
  cha: cha,
  chb: chb,
  che: che,
  chg: chg,
  chi: chi,
  chk: chk,
  chm: chm,
  chn: chn,
  cho: cho,
  chp: chp,
  chr: chr,
  chu: chu,
  chv: chv,
  chy: chy,
  cmc: cmc,
  cmn: cmn,
  cop: cop,
  cor: cor,
  cos: cos,
  cpe: cpe,
  cpf: cpf,
  cpp: cpp,
  cre: cre,
  crh: crh,
  crp: crp,
  csb: csb,
  cus: cus,
  cym: cym,
  cze: cze,
  dak: dak,
  dan: dan,
  dar: dar,
  day: day,
  del: del,
  den: den,
  deu: deu,
  dgr: dgr,
  din: din,
  div: div,
  doi: doi,
  dra: dra,
  dsb: dsb,
  dua: dua,
  dum: dum,
  dut: dut,
  dyu: dyu,
  dzo: dzo,
  efi: efi,
  egy: egy,
  eka: eka,
  ell: ell,
  elx: elx,
  eng: eng,
  enm: enm,
  epo: epo,
  est: est,
  eus: eus,
  ewe: ewe,
  ewo: ewo,
  fan: fan,
  fao: fao,
  fas: fas,
  fat: fat,
  fij: fij,
  fil: fil,
  fin: fin,
  fiu: fiu,
  fon: fon,
  fra: fra,
  fre: fre,
  frm: frm,
  fro: fro,
  frr: frr,
  frs: frs,
  fry: fry,
  ful: ful,
  fur: fur,
  gaa: gaa,
  gay: gay,
  gba: gba,
  gem: gem,
  geo: geo,
  ger: ger,
  gez: gez,
  gil: gil,
  gla: gla,
  gle: gle,
  glg: glg,
  glv: glv,
  gmh: gmh,
  goh: goh,
  gon: gon,
  gor: gor,
  got: got,
  grb: grb,
  grc: grc,
  gre: gre,
  grn: grn,
  gsw: gsw,
  guj: guj,
  gwi: gwi,
  hai: hai,
  hat: hat,
  hau: hau,
  haw: haw,
  heb: heb,
  her: her,
  hil: hil,
  him: him,
  hin: hin,
  hit: hit,
  hmn: hmn,
  hmo: hmo,
  hrv: hrv,
  hsb: hsb,
  hun: hun,
  hup: hup,
  hye: hye,
  iba: iba,
  ibo: ibo,
  ice: ice,
  ido: ido,
  iii: iii,
  ijo: ijo,
  iku: iku,
  ile: ile,
  ilo: ilo,
  ina: ina,
  inc: inc,
  ind: ind,
  ine: ine,
  inh: inh,
  ipk: ipk,
  ira: ira,
  iro: iro,
  isl: isl,
  ita: ita,
  jav: jav,
  jbo: jbo,
  jpn: jpn,
  jpr: jpr,
  jrb: jrb,
  kaa: kaa,
  kab: kab,
  kac: kac,
  kal: kal,
  kam: kam,
  kan: kan,
  kar: kar,
  kas: kas,
  kat: kat,
  kau: kau,
  kaw: kaw,
  kaz: kaz,
  kbd: kbd,
  kha: kha,
  khi: khi,
  khm: khm,
  kho: kho,
  kik: kik,
  kin: kin,
  kir: kir,
  kmb: kmb,
  kok: kok,
  kom: kom,
  kon: kon,
  kor: kor,
  kos: kos,
  kpe: kpe,
  krc: krc,
  krl: krl,
  kro: kro,
  kru: kru,
  kua: kua,
  kum: kum,
  kur: kur,
  kut: kut,
  lad: lad,
  lah: lah,
  lam: lam,
  lao: lao,
  lat: lat,
  lav: lav,
  lez: lez,
  lim: lim,
  lin: lin,
  lit: lit,
  lol: lol,
  loz: loz,
  ltz: ltz,
  lua: lua,
  lub: lub,
  lug: lug,
  lui: lui,
  lun: lun,
  luo: luo,
  lus: lus,
  mac: mac,
  mad: mad,
  mag: mag,
  mah: mah,
  mai: mai,
  mak: mak,
  mal: mal,
  man: man,
  mao: mao,
  map: map,
  mar: mar,
  mas: mas,
  may: may,
  mdf: mdf,
  mdr: mdr,
  men: men,
  mga: mga,
  mic: mic,
  min: min,
  mis: mis,
  mkd: mkd,
  mkh: mkh,
  mlg: mlg,
  mlt: mlt,
  mnc: mnc,
  mni: mni,
  mno: mno,
  moh: moh,
  mon: mon,
  mos: mos,
  mri: mri,
  msa: msa,
  mul: mul,
  mun: mun,
  mus: mus,
  mwl: mwl,
  mwr: mwr,
  mya: mya,
  myn: myn,
  myv: myv,
  nah: nah,
  nai: nai,
  nap: nap,
  nau: nau,
  nav: nav,
  nbl: nbl,
  nde: nde,
  ndo: ndo,
  nds: nds,
  nep: nep,
  nia: nia,
  nic: nic,
  niu: niu,
  nld: nld,
  nno: nno,
  nob: nob,
  nog: nog,
  non: non,
  nor: nor,
  nqo: nqo,
  nso: nso,
  nub: nub,
  nwc: nwc,
  nya: nya,
  nym: nym,
  nyn: nyn,
  nyo: nyo,
  nzi: nzi,
  oci: oci,
  oji: oji,
  ori: ori,
  orm: orm,
  osa: osa,
  oss: oss,
  ota: ota,
  oto: oto,
  paa: paa,
  pag: pag,
  pal: pal,
  pam: pam,
  pan: pan,
  pap: pap,
  pau: pau,
  peo: peo,
  per: per,
  phi: phi,
  phn: phn,
  pli: pli,
  pol: pol,
  pon: pon,
  por: por,
  pra: pra,
  pro: pro,
  pus: pus,
  que: que,
  raj: raj,
  rap: rap,
  rar: rar,
  roa: roa,
  roh: roh,
  rom: rom,
  ron: ron,
  rum: rum,
  run: run,
  rup: rup,
  rus: rus,
  sad: sad,
  sag: sag,
  sah: sah,
  sai: sai,
  sal: sal,
  sam: sam,
  san: san,
  sas: sas,
  sat: sat,
  scn: scn,
  sco: sco,
  sel: sel,
  sem: sem,
  sga: sga,
  sgn: sgn,
  shn: shn,
  sid: sid,
  sin: sin,
  sio: sio,
  sit: sit,
  sla: sla,
  slo: slo,
  slk: slk,
  slv: slv,
  sma: sma,
  sme: sme,
  smi: smi,
  smj: smj,
  smn: smn,
  smo: smo,
  sms: sms,
  sna: sna,
  snd: snd,
  snk: snk,
  sog: sog,
  som: som,
  son: son,
  sot: sot,
  spa: spa,
  sqi: sqi,
  srd: srd,
  srn: srn,
  srp: srp,
  srr: srr,
  ssa: ssa,
  ssw: ssw,
  suk: suk,
  sun: sun,
  sus: sus,
  sux: sux,
  swa: swa,
  swe: swe,
  syc: syc,
  syr: syr,
  tah: tah,
  tai: tai,
  tam: tam,
  tat: tat,
  tel: tel,
  tem: tem,
  ter: ter,
  tet: tet,
  tgk: tgk,
  tgl: tgl,
  tha: tha,
  tib: tib,
  tig: tig,
  tir: tir,
  tiv: tiv,
  tkl: tkl,
  tlh: tlh,
  tli: tli,
  tmh: tmh,
  tog: tog,
  ton: ton,
  tpi: tpi,
  tsi: tsi,
  tsn: tsn,
  tso: tso,
  tuk: tuk,
  tum: tum,
  tup: tup,
  tur: tur,
  tut: tut,
  tvl: tvl,
  twi: twi,
  tyv: tyv,
  udm: udm,
  uga: uga,
  uig: uig,
  ukr: ukr,
  umb: umb,
  und: und,
  urd: urd,
  uzb: uzb,
  vai: vai,
  ven: ven,
  vie: vie,
  vol: vol,
  vot: vot,
  wak: wak,
  wal: wal,
  war: war,
  was: was,
  wel: wel,
  wen: wen,
  wln: wln,
  wol: wol,
  xal: xal,
  xho: xho,
  yao: yao,
  yap: yap,
  yid: yid,
  yor: yor,
  ypk: ypk,
  zap: zap,
  zbl: zbl,
  zen: zen,
  zgh: zgh,
  zha: zha,
  zho: zho,
  znd: znd,
  zul: zul,
  zun: zun,
  zxx: zxx,
  zza: zza,
  new: { terminologic: null, iso6391: null, name: 'Nepal Bhasa; Newari' },
  'qaa-qtz': {
    terminologic: null,
    iso6391: null,
    name: 'Reserved for local use'
  }
}

var iso639$1 = Object.freeze({
  aar: aar,
  abk: abk,
  ace: ace,
  ach: ach,
  ada: ada,
  ady: ady,
  afa: afa,
  afh: afh,
  afr: afr,
  ain: ain,
  aka: aka,
  akk: akk,
  alb: alb,
  ale: ale,
  alg: alg,
  als: als,
  alt: alt,
  amh: amh,
  ang: ang,
  anp: anp,
  apa: apa,
  ara: ara,
  arb: arb,
  arc: arc,
  arg: arg,
  arm: arm,
  arn: arn,
  arp: arp,
  art: art,
  arw: arw,
  asm: asm,
  ast: ast,
  ath: ath,
  aus: aus,
  ava: ava,
  ave: ave,
  awa: awa,
  aym: aym,
  aze: aze,
  bad: bad,
  bai: bai,
  bak: bak,
  bal: bal,
  bam: bam,
  ban: ban,
  baq: baq,
  bas: bas,
  bat: bat,
  bej: bej,
  bel: bel,
  bem: bem,
  ben: ben,
  ber: ber,
  bho: bho,
  bih: bih,
  bik: bik,
  bin: bin,
  bis: bis,
  bla: bla,
  bnt: bnt,
  bod: bod,
  bos: bos,
  bra: bra,
  bre: bre,
  btk: btk,
  bua: bua,
  bug: bug,
  bul: bul,
  bur: bur,
  byn: byn,
  cad: cad,
  cai: cai,
  car: car,
  cat: cat,
  cau: cau,
  ceb: ceb,
  cel: cel,
  ces: ces,
  cha: cha,
  chb: chb,
  che: che,
  chg: chg,
  chi: chi,
  chk: chk,
  chm: chm,
  chn: chn,
  cho: cho,
  chp: chp,
  chr: chr,
  chu: chu,
  chv: chv,
  chy: chy,
  cmc: cmc,
  cmn: cmn,
  cop: cop,
  cor: cor,
  cos: cos,
  cpe: cpe,
  cpf: cpf,
  cpp: cpp,
  cre: cre,
  crh: crh,
  crp: crp,
  csb: csb,
  cus: cus,
  cym: cym,
  cze: cze,
  dak: dak,
  dan: dan,
  dar: dar,
  day: day,
  del: del,
  den: den,
  deu: deu,
  dgr: dgr,
  din: din,
  div: div,
  doi: doi,
  dra: dra,
  dsb: dsb,
  dua: dua,
  dum: dum,
  dut: dut,
  dyu: dyu,
  dzo: dzo,
  efi: efi,
  egy: egy,
  eka: eka,
  ell: ell,
  elx: elx,
  eng: eng,
  enm: enm,
  epo: epo,
  est: est,
  eus: eus,
  ewe: ewe,
  ewo: ewo,
  fan: fan,
  fao: fao,
  fas: fas,
  fat: fat,
  fij: fij,
  fil: fil,
  fin: fin,
  fiu: fiu,
  fon: fon,
  fra: fra,
  fre: fre,
  frm: frm,
  fro: fro,
  frr: frr,
  frs: frs,
  fry: fry,
  ful: ful,
  fur: fur,
  gaa: gaa,
  gay: gay,
  gba: gba,
  gem: gem,
  geo: geo,
  ger: ger,
  gez: gez,
  gil: gil,
  gla: gla,
  gle: gle,
  glg: glg,
  glv: glv,
  gmh: gmh,
  goh: goh,
  gon: gon,
  gor: gor,
  got: got,
  grb: grb,
  grc: grc,
  gre: gre,
  grn: grn,
  gsw: gsw,
  guj: guj,
  gwi: gwi,
  hai: hai,
  hat: hat,
  hau: hau,
  haw: haw,
  heb: heb,
  her: her,
  hil: hil,
  him: him,
  hin: hin,
  hit: hit,
  hmn: hmn,
  hmo: hmo,
  hrv: hrv,
  hsb: hsb,
  hun: hun,
  hup: hup,
  hye: hye,
  iba: iba,
  ibo: ibo,
  ice: ice,
  ido: ido,
  iii: iii,
  ijo: ijo,
  iku: iku,
  ile: ile,
  ilo: ilo,
  ina: ina,
  inc: inc,
  ind: ind,
  ine: ine,
  inh: inh,
  ipk: ipk,
  ira: ira,
  iro: iro,
  isl: isl,
  ita: ita,
  jav: jav,
  jbo: jbo,
  jpn: jpn,
  jpr: jpr,
  jrb: jrb,
  kaa: kaa,
  kab: kab,
  kac: kac,
  kal: kal,
  kam: kam,
  kan: kan,
  kar: kar,
  kas: kas,
  kat: kat,
  kau: kau,
  kaw: kaw,
  kaz: kaz,
  kbd: kbd,
  kha: kha,
  khi: khi,
  khm: khm,
  kho: kho,
  kik: kik,
  kin: kin,
  kir: kir,
  kmb: kmb,
  kok: kok,
  kom: kom,
  kon: kon,
  kor: kor,
  kos: kos,
  kpe: kpe,
  krc: krc,
  krl: krl,
  kro: kro,
  kru: kru,
  kua: kua,
  kum: kum,
  kur: kur,
  kut: kut,
  lad: lad,
  lah: lah,
  lam: lam,
  lao: lao,
  lat: lat,
  lav: lav,
  lez: lez,
  lim: lim,
  lin: lin,
  lit: lit,
  lol: lol,
  loz: loz,
  ltz: ltz,
  lua: lua,
  lub: lub,
  lug: lug,
  lui: lui,
  lun: lun,
  luo: luo,
  lus: lus,
  mac: mac,
  mad: mad,
  mag: mag,
  mah: mah,
  mai: mai,
  mak: mak,
  mal: mal,
  man: man,
  mao: mao,
  map: map,
  mar: mar,
  mas: mas,
  may: may,
  mdf: mdf,
  mdr: mdr,
  men: men,
  mga: mga,
  mic: mic,
  min: min,
  mis: mis,
  mkd: mkd,
  mkh: mkh,
  mlg: mlg,
  mlt: mlt,
  mnc: mnc,
  mni: mni,
  mno: mno,
  moh: moh,
  mon: mon,
  mos: mos,
  mri: mri,
  msa: msa,
  mul: mul,
  mun: mun,
  mus: mus,
  mwl: mwl,
  mwr: mwr,
  mya: mya,
  myn: myn,
  myv: myv,
  nah: nah,
  nai: nai,
  nap: nap,
  nau: nau,
  nav: nav,
  nbl: nbl,
  nde: nde,
  ndo: ndo,
  nds: nds,
  nep: nep,
  nia: nia,
  nic: nic,
  niu: niu,
  nld: nld,
  nno: nno,
  nob: nob,
  nog: nog,
  non: non,
  nor: nor,
  nqo: nqo,
  nso: nso,
  nub: nub,
  nwc: nwc,
  nya: nya,
  nym: nym,
  nyn: nyn,
  nyo: nyo,
  nzi: nzi,
  oci: oci,
  oji: oji,
  ori: ori,
  orm: orm,
  osa: osa,
  oss: oss,
  ota: ota,
  oto: oto,
  paa: paa,
  pag: pag,
  pal: pal,
  pam: pam,
  pan: pan,
  pap: pap,
  pau: pau,
  peo: peo,
  per: per,
  phi: phi,
  phn: phn,
  pli: pli,
  pol: pol,
  pon: pon,
  por: por,
  pra: pra,
  pro: pro,
  pus: pus,
  que: que,
  raj: raj,
  rap: rap,
  rar: rar,
  roa: roa,
  roh: roh,
  rom: rom,
  ron: ron,
  rum: rum,
  run: run,
  rup: rup,
  rus: rus,
  sad: sad,
  sag: sag,
  sah: sah,
  sai: sai,
  sal: sal,
  sam: sam,
  san: san,
  sas: sas,
  sat: sat,
  scn: scn,
  sco: sco,
  sel: sel,
  sem: sem,
  sga: sga,
  sgn: sgn,
  shn: shn,
  sid: sid,
  sin: sin,
  sio: sio,
  sit: sit,
  sla: sla,
  slo: slo,
  slk: slk,
  slv: slv,
  sma: sma,
  sme: sme,
  smi: smi,
  smj: smj,
  smn: smn,
  smo: smo,
  sms: sms,
  sna: sna,
  snd: snd,
  snk: snk,
  sog: sog,
  som: som,
  son: son,
  sot: sot,
  spa: spa,
  sqi: sqi,
  srd: srd,
  srn: srn,
  srp: srp,
  srr: srr,
  ssa: ssa,
  ssw: ssw,
  suk: suk,
  sun: sun,
  sus: sus,
  sux: sux,
  swa: swa,
  swe: swe,
  syc: syc,
  syr: syr,
  tah: tah,
  tai: tai,
  tam: tam,
  tat: tat,
  tel: tel,
  tem: tem,
  ter: ter,
  tet: tet,
  tgk: tgk,
  tgl: tgl,
  tha: tha,
  tib: tib,
  tig: tig,
  tir: tir,
  tiv: tiv,
  tkl: tkl,
  tlh: tlh,
  tli: tli,
  tmh: tmh,
  tog: tog,
  ton: ton,
  tpi: tpi,
  tsi: tsi,
  tsn: tsn,
  tso: tso,
  tuk: tuk,
  tum: tum,
  tup: tup,
  tur: tur,
  tut: tut,
  tvl: tvl,
  twi: twi,
  tyv: tyv,
  udm: udm,
  uga: uga,
  uig: uig,
  ukr: ukr,
  umb: umb,
  und: und,
  urd: urd,
  uzb: uzb,
  vai: vai,
  ven: ven,
  vie: vie,
  vol: vol,
  vot: vot,
  wak: wak,
  wal: wal,
  war: war,
  was: was,
  wel: wel,
  wen: wen,
  wln: wln,
  wol: wol,
  xal: xal,
  xho: xho,
  yao: yao,
  yap: yap,
  yid: yid,
  yor: yor,
  ypk: ypk,
  zap: zap,
  zbl: zbl,
  zen: zen,
  zgh: zgh,
  zha: zha,
  zho: zho,
  znd: znd,
  zul: zul,
  zun: zun,
  zxx: zxx,
  zza: zza,
  default: iso639
})

var require$$2 = (iso639$1 && iso639) || iso639$1

var $$1
var franc$1
var langCodes
var unfluff$1
var sbd$1
$$1 = require$$0
franc$1 = franc
langCodes = require$$2
unfluff$1 = unfluff
sbd$1 = sbd
var ParserSetup = function() {
  var rSup
  console.debug('ParserSetup Initialize')
  rSup = {}
  rSup.debug = false
  rSup.cleanNode = function(node) {
    console.debug('rSup.cleanNode')
    var $node = $$1(node),
      toRemove = ['sup', 'script', 'style', 'head']
    for (let tagi = 0; tagi < toRemove.length; tagi++) {
      let tag = toRemove[tagi]
      $node.find(tag).remove()
    }
    return $node[0]
  }
  rSup.detectLanguage = function(text) {
    console.debug('rSup.detectLanguage')
    var lang = franc$1(text, {
      whitelist: [
        'ara',
        'bul',
        'ces',
        'dan',
        'deu',
        'ell',
        'eng',
        'spa',
        'fin',
        'fra',
        'hun',
        'ind',
        'ita',
        'kor',
        'nob',
        'nor',
        'pol',
        'por',
        'rus',
        'swe',
        'tha',
        'tur',
        'zho'
      ]
    })
    if (lang === 'und') {
      lang = 'eng'
    }
    var iso6391Lang = langCodes[lang].iso6391
    if (rSup.debug) {
      console.log(
        '~~~parse debug~~~ language detected:',
        lang,
        '->',
        iso6391Lang
      )
    }
    return iso6391Lang
  }
  rSup.findArticle = function(node, lang) {
    console.debug('rSup.findArticle')
    var html = $$1(node).html(),
      cmds = unfluff$1.lazy(html, lang),
      text = cmds.text()
    text = text.replace(/(\r\n|\n|\r)/gm, ' ')
    text = text.replace(/\s\s+/g, ' ')
    if (!text) {
      text = $$1(node).text()
    }
    if (rSup.debug) {
      console.log('~~~parse debug~~~ article text identified (a string):', text)
    }
    return text
  }
  rSup.cleanText = function(text) {
    console.debug('rSup.cleanText')
    var cleaned = text
    var regexp = /[“]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[“]/g, '"')
    })
    var regexp = /[”]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[”]/g, '"')
    })
    var regexp = /['][\s]+["]+[\s]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/['][\s]+/g, "'") + ' '
    })
    var cleaned = cleaned.replace(/[\s]+[*]+(?=[A-Z])/g, ' ')
    var cleaned = cleaned.replace(/[\s]+[*]+[\s]+(?=[A-Z])/g, ' ')
    var cleaned = cleaned.replace(/[.](?=[A-Z])/g, '. ')
    var cleaned = cleaned.replace(/[\s]+[.](?=[A-Z])/g, '. ')
    var cleaned = cleaned.replace(/[\s]+[.](?=[\s])+(?![A-Z])/g, '. ')
    var cleaned = cleaned.replace(/[.](?=[A-Z])/g, '. ')
    var cleaned = cleaned.replace(/[.][\s+]+(?=[A-Z])/g, '. ')
    var cleaned = cleaned.replace(/[\s]+[.](?![\s])+(?=[.])/g, '.')
    var cleaned = cleaned.replace(/[\s]+[.](?![\s])+(?=[a-z]|[A-Z])/g, '.')
    var cleaned = cleaned.replace(/[:](?=[A-Z])/g, ': ')
    var cleaned = cleaned.replace(/[\s]+[:](?=[A-Z])/g, ': ')
    var cleaned = cleaned.replace(/[\s]+[:](?=[\s])+(?![A-Z])/g, ': ')
    var cleaned = cleaned.replace(/(?![a-z])[:](?=[A-Z])/g, ': ')
    var cleaned = cleaned.replace(/(?![a-z])[:][\s+]+(?=[A-Z])/g, ': ')
    var cleaned = cleaned.replace(/[\s]+[:](?![\s])+(?=[.])/g, ':')
    var cleaned = cleaned.replace(/[\s]+[:](?![\s])+(?=[a-z]|[A-Z])/g, ':')
    var cleaned = cleaned.replace(/[\s]+[?](?=[A-Z])/g, '? ')
    var cleaned = cleaned.replace(/[\s]+[?](?=[\s])(?=[A-Z])/g, '? ')
    var cleaned = cleaned.replace(/[?](?=[A-Z])/g, '? ')
    var cleaned = cleaned.replace(/[?][\s]+(?=[A-Z])/g, '? ')
    var cleaned = cleaned.replace(/[\s]+[?](?=[\s])+(?=[.])/g, '?')
    var cleaned = cleaned.replace(/[\s]+[?](?![\s])+(?=[a-z]|[A-Z])/g, '?')
    var cleaned = cleaned.replace(/[.][\s]+[.]/g, '.. ')
    var regexp = /…/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/…/g, '...')
    })
    var cleaned = cleaned.replace(/[\s]+[.][\s]+/g, '.')
    var regexp = /([.]|[”])[\s]+[0-9]{1}[.][\s]+[A-Z]{1}/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[.][\s]+(?=[A-Z])/g, ' ')
    })
    var regexp = /(Sir|St|Mr|Ms|Mrs|Jr|Sr|Sgt)[.]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[.]/g, ' ')
    })
    var regexp = /(UK|USA|US)[.][A-Z]{1}/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[.]/g, '. ')
    })
    var regexp = /[α-ωa-z][.][A-Z]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[.]/g, '. ')
    })
    var regexp = /[)][.][A-Z]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[.]/g, '. ')
    })
    var regexp = /['][.][A-Z]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[.]/g, '. ')
    })
    var regexp = /["][.][A-Z]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[.]/g, '. ')
    })
    var regexp = /[”][.][A-Z]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[.]/g, '. ')
    })
    var regexp = /[\s]+[?][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[?]/g, '?')
    })
    var regexp = /[,][.][A-Z]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[.]/g, '. ')
    })
    var cleaned = cleaned.replace(/[—]/g, ' ')
    var cleaned = cleaned.replace(/[\s]+[–][\s]+/g, ' ')
    var cleaned = cleaned.replace(/[\s]+[-][\s]+/g, ' ')
    var cleaned = cleaned.replace(/[\s]+[--][\s]+/g, ' ')
    var regexp = /([a-z]|[A-Z])+[)]([a-z]|[A-Z])/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[)]/g, ') ')
    })
    var cleaned = cleaned.replace(/…/g, '… ')
    var regexp = /([a-z]|[A-Z]|[ά-ωΑ-ώ])[.][(]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[(]/g, ' (')
    })
    var regexp = /([a-z]|[A-Z]|[ά-ωΑ-ώ])[.][0-9]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[.]/g, '. ')
    })
    var regexp = /[\s]+[.]{3}/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]/g, '')
    })
    var regexp = /([a-z]|[ά-ω])[?][^'"]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[?]/g, '? ')
    })
    var regexp = /["][\s]+[)]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]/g, '')
    })
    var regexp = /[.][\s]+['][^A-ZΑ-ώ]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[']/g, "' ")
    })
    var regexp = /[\s]+["][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/["][\s]+/g, '"')
    })
    var regexp = /[’][\s]+[.][”]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[.]+/g, '.')
    })
    var regexp = /[”][\s]+[?]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+/g, '')
    })
    var regexp = /[\s]+["][)][,]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+/g, '')
    })
    var regexp = /[?][\s]+[”]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+/g, '')
    })
    var regexp = /[.][\s]+[’](?=[\s]+.+[’])/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[’]/g, ' ’')
    })
    var regexp = /[.][\s]+['](?=[\s]+.+['])/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[']/g, " '")
    })
    var regexp = /”-/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/”-/g, '” -')
    })
    var regexp = /[\s]+(!”)/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+/g, '')
    })
    var regexp = /[!][’]([a-zA-Z]|[ά-ωΑ-ώ])/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[’]+/g, '’ ')
    })
    var regexp = /[,][’]([a-zA-Z]|[ά-ωΑ-ώ]){1,20}/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[’]+/g, '’ ')
    })
    var regexp = /[\s]+["]["]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+["]/g, '" ')
    })
    var regexp = /[’][\s]+[.]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]/g, '')
    })
    var regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[.][’]([a-zA-Z]|[ά-ωΑ-ώ])/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[’]/g, '’ ')
    })
    var regexp = /[\s]+[,][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[,]/g, ',')
    })
    var regexp = /[\s]+[)][.][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[)][.]/g, ').')
    })
    var regexp = /[.][’]([a-zA-Z]|[ά-ωΑ-ώ])/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[.][’]/g, '.’ ')
    })
    var regexp = /[\s]+([a-z]|[ά-ω])[,]([a-z]|[ά-ω])[\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[,]/g, ', ')
    })
    var regexp = /[?][”][’]([a-zA-Z]|[ά-ωΑ-ώ])/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[’]/g, '’ ')
    })
    var regexp = /[\s]+["][)][.]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+/g, '')
    })
    var regexp = /[\s]+["][.][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+["][.]/g, '".')
    })
    var regexp = /[\s]+[’][”][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[’][”]/g, '’”')
    })
    var regexp = /[\s]+[:][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[:]/g, ':')
    })
    var regexp = /[\s]+[;][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[;]/g, ';')
    })
    var regexp = /[\s]+[)][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[)]/g, ')')
    })
    var regexp = /[,][”][’]([a-zA-Z]|[ά-ωΑ-ώ])/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[’]/g, '’ ')
    })
    var regexp = /[U][\s][K]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]/g, '')
    })
    var regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[’][\s]+[sltdmve]{1,2}[\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[’][\s]+/g, '’')
    })
    var regexp = /([.]|[?]|[!])+[\s]+[’]([a-zA-Z]|[ά-ωΑ-ώ])/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[’]/g, '’ ')
    })
    var regexp = /[’][‘]([a-zA-Z]|[ά-ωΑ-ώ])/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[‘]/g, ' ‘')
    })
    var regexp = /[\s]+[’][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[’]/g, '’')
    })
    var regexp = /[\s]+[!][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[!]/g, '!')
    })
    var regexp = /[\s]+[?][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[?]/g, '?')
    })
    var regexp = /[“]([a-zA-Z]|[ά-ωΑ-ώ]).+[\s]+[“]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[“]/g, '“')
    })
    var regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[,][“]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[,]/g, ', ')
    })
    var regexp = /[?][\s]+[’][”][’]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[?][\s]+[’][”][’]/g, '?’”’ ')
    })
    var regexp = /[.][“]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[.]/g, '. ')
    })
    var regexp = /[?][”]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[”]/g, '” ')
    })
    var regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[“]([a-zA-Z]|[ά-ωΑ-ώ])/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[“]/g, ' “')
    })
    var regexp = /[[]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[[]/g, '(')
    })
    var regexp = /]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/]/g, ')')
    })
    var regexp = /[\s]+[)][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[)]/g, ')')
    })
    var regexp = /[:][\s]+["][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[:][\s]+["][\s]+/g, ': "')
    })
    var regexp = /[a-z][\s]+["][.][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+["][.]/g, '".')
    })
    var regexp = /[:]["][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[:]["][\s]+/g, ': "')
    })
    var regexp = /[.][”][’]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[’]/g, '’ ')
    })
    var regexp = /[:][“]([A-Z]|[Α-ώ])/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[:]/g, ': ')
    })
    var regexp = /[\s]+[’][,]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[’]/g, '’')
    })
    var regexp = /[!][”][’]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[’]/g, '’ ')
    })
    var regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[’](so|of|or|to|on|at|it)/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[’]/g, '’ ')
    })
    var regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[.][’][(]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[’]/g, '’ ')
    })
    var regexp = /([£]|[$]|[€])[\s]+[0-9]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+/g, '')
    })
    var regexp = /[£][\s]+[0-9]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+/g, '')
    })
    var regexp = /[\s]+[‘][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[‘][\s]+/g, '‘')
    })
    var regexp = /[\s]+[)][,][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[)][,]/g, '),')
    })
    var regexp = /[0-9][\s]+[m][)][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[m]/g, 'm')
    })
    var regexp = /[’][\s]+[,][”][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[’][\s]+/g, '’')
    })
    var regexp = /[)][.]{3}/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[)]/g, ') ')
    })
    var regexp = /(We|They|we|they)([']|[’])[\s]+(re)/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+/g, '')
    })
    var regexp = /([']|[’])[\s]+[?]["][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[?]["]/g, '?"')
    })
    var regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[.][\s]+(?:([a-zA-Z]|[ά-ωΑ-ώ])[.])/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[.][\s]+/g, '.')
    })
    var regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[.][\s]+(?:([a-zA-Z]|[ά-ωΑ-ώ])[.])/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[.][\s]+/g, '.')
    })
    var regexp = /(?:([a-zA-Z]|[ά-ωΑ-ώ])[.])([a-zA-Z]|[ά-ωΑ-ώ])[.][\s]+(?:([a-zA-Z]|[ά-ωΑ-ώ])[.])/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[.][\s]+/g, '.')
    })
    var regexp = /[a][,][\s]+[k][,][\s]+[a]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+/g, '')
    })
    var regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[.]{2,3}[\s]+(?:[.]{1})/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+/g, '')
    })
    var regexp = /[:][“]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[:]/g, ': ')
    })
    var regexp = /([”]|[,])[“]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[“]/g, ' “')
    })
    var regexp = /[\s]+[“][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[“][\s]+/g, '“')
    })
    var regexp = /[0-9][’][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+/g, '')
    })
    var regexp = /[.][\s]+[”]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+/g, '')
    })
    var regexp = /[”]([A-Z]|[Α-ώ])/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[”]/g, '” ')
    })
    var regexp = /[0-9][\s]+(GB|MB|KB|Gb|Mb|Kb|gb|mb|kb)/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+/g, '')
    })
    var regexp = /[\s]+["][,][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+["]/g, '"')
    })
    var regexp = /[!][“]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[!]/g, '! ')
    })
    var regexp = /[\s]+[.][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[.]/g, '.')
    })
    var regexp = /(you)[’][\s]+(re)/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[’][\s]+/g, '’')
    })
    var regexp = /[.]{3}[^.”'"]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[.]{3}/g, '... ')
    })
    var regexp = /[\s]+[”][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[”]/g, '”')
    })
    var regexp = /[\s]+[”]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+/g, '')
    })
    var regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[(]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[(]/g, ' (')
    })
    var regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[,]([a-zA-Z]|[ά-ωΑ-ώ])/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[,]/g, ', ')
    })
    var regexp = /[.][\s]+[?]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[.][\s]+/g, '.')
    })
    var regexp = /[?][“]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[?]/g, '? ')
    })
    var regexp = /[\s]+[?]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[?]/g, '?')
    })
    var regexp = /[\s]+[-]([a-zA-Z]|[ά-ωΑ-ώ])[\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return ' (' + match.replace(/[\s]+/g, '') + ') '
    })
    var regexp = /[“][‘][.]{3}[\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+/g, '')
    })
    var regexp = /[:]([a-zA-Z]|[ά-ωΑ-ώ])/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[:]/g, ': ')
    })
    var regexp = /[.]([a-zA-Z]|[ά-ωΑ-ώ])/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[.]/g, '. ')
    })
    var regexp = /[\s]+[.][”]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+/g, '')
    })
    var regexp = /[']([a-zA-Z]|[ά-ωΑ-ώ])[']/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match + ' '
    })
    var regexp = /(["])(?=(\\?))\2.*?\1/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return ' ' + match.replace(/["]/g, '"') + ' '
    })
    var regexp = /([”])(?=(\\?))\2.*?\1/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return ' ' + match.replace(/[”]/g, '"') + ' '
    })
    var regexp = /[\s]+["][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/["][\s]+/g, '"')
    })
    var regexp = /["][\s]+[.]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+/g, '')
    })
    var regexp = /[^';!?.,a-zA-Zά-ωΑ-ώ ]["][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/["][\s]+/g, '"')
    })
    var regexp = /[\s]+[,][^.,a-zA-Zά-ωΑ-ώ]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[,]/g, ',')
    })
    var regexp = /[a-zA-Zά-ωΑ-ώ]{1}[.][\s]+[a-zA-Zά-ωΑ-ώ]{1}[.]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[.][\s]+/g, '.')
    })
    var regexp = /[\s]+[(][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[(][\s]+/g, '(')
    })
    var regexp = /[\s]+[\/][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\/][\s]+/g, '/')
    })
    var regexp = /[\s]+([+]|[-]|[*]|[=])[\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+/g, '')
    })
    var regexp = /[\s]+[)][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[)]/g, ')')
    })
    var regexp = /[^ ][“]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[“]/g, ' “')
    })
    var regexp = /[\s]+[(][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[(][\s]+/g, '(')
    })
    var regexp = /[(][\s]+[^]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[(][\s]+/g, '(')
    })
    var regexp = /(No)[.][\s]+[0-9]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+/g, '')
    })
    var regexp = /[\s]+['][s][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[']/g, "'")
    })
    var regexp = /[\s]+[)][,][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[)][,]/g, '),')
    })
    var regexp = /[\s]+[)][.][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[)][.]/g, '),')
    })
    var regexp = /[\s]+[’][s][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[’]/g, '’')
    })
    var regexp = /[\s]+[:][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[:]/g, ':')
    })
    var regexp = /[s][\s]+['][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[']/g, "'")
    })
    var regexp = /[^a-zά-ω](?:[\s]+)[0-9][\s]+[A-ZΑ-ώ]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+/g, '. ')
    })
    var regexp = /[,][\s]*["](he|she|they|we|I)[\s]+(stated|said|told|says)[.]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[,][\s]*["]/g, '," ')
    })
    var regexp = /[\s]+[-]{2}[\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[-]{2}/g, ',')
    })
    var regexp = /[0-9][\s]+(GHz|MHz|Khz)/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+/g, '')
    })
    var regexp = /[\s]+(will)[.](i)[.][\s]+(am)/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[.][\s]+/g, '.')
    })
    var regexp = /[\s]+['][\s]+[s][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+['][\s]+/g, "'")
    })
    var regexp = /[\s]+[.]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[.]/g, '.')
    })
    var regexp = /[\s]+[^]{1,10}["][(]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/["][(]/g, '" (')
    })
    var regexp = /[^ ][*]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[*]/g, ' *')
    })
    var regexp = /[^ ][)]["][^ ]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/["]/g, '" ')
    })
    var regexp = /[\s]+[,][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[,]/g, ',')
    })
    var regexp = /[\s]+[;][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[;]/g, ';')
    })
    var regexp = /[\s]+[ό][,][\s]+(τι)[\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[,][\s]+/g, ',')
    })
    var regexp = /[\s]+["][\s]+[^"]+[,]["]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/["][\s]+/g, '"')
    })
    var regexp = /[\s]+["]["][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+["]["][\s]+/g, '" "')
    })
    var regexp = /[,][\s]+["](he|she|they)/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[,][\s]+["]/g, '," ')
    })
    var regexp = /[^a-zA-Zά-ωΑ-ώ](I)['][\s]+(m)[\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/['][\s]+/g, "'")
    })
    var regexp = /[U][.][S][.][^A-ZΑ-ώ]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[U][.][S][.]/g, 'U.S. ')
    })
    var regexp = /[\s]+[a-zA-Zά-ωΑ-ώ][\s]+[*][\s]+[a-zA-Zά-ωΑ-ώ][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[*][\s]+/g, '*')
    })
    var regexp = /[^0-9][\s]+[*][\s]+[^0-9]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[*][\s]+/g, ' ')
    })
    var regexp = /[’][\s]+[s][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[s]/g, 's')
    })
    var regexp = /[\s]+[.][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[.]/g, '.')
    })
    var regexp = /[\s]+[(][;][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[(][;][\s]+/g, '(;')
    })
    var regexp = /[\s]+[,][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[,]/g, ',')
    })
    var regexp = /[\s]+[)][)][.][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[)][)][.]/g, ')).')
    })
    var regexp = /[\s]+[^ ]+["][^,.)]{1,10}[\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/["]/g, '" ')
    })
    var regexp = /[^ ]["]["][^ ]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/["]["]/g, '" "')
    })
    var regexp = //g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(//g, ' ')
    })
    var regexp = /[\s]+["][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+["][\s]+/g, '"')
    })
    var regexp = /(["])(?=(\\?))\2.*?\1/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return ' ' + match + ' '
    })
    var regexp = /[a-zA-Zά-ωΑ-ώ]+[.][\s]+(co)[.][\s]+(in|uk)/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[.][\s]+/g, '.')
    })
    var regexp = /(Ph)[.](D)[.]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[.]/g, '')
    })
    var regexp = /(PhD)[\s]+[s][,]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+/g, '')
    })
    var regexp = /[\s]+[,][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[,]/g, ',')
    })
    var regexp = /[\s]+[.][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[.]/g, '.')
    })
    var regexp = /[\s]+["][.][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+["][.]/g, '".')
    })
    var regexp = /[\s]+[(][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[(][\s]+/g, '(')
    })
    var regexp = /[\s]+[)]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[)]/g, ')')
    })
    var regexp = /[\s]+[)][,][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[)][,]/g, '),')
    })
    var regexp = /[\s]+[:][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[:]/g, ':')
    })
    var regexp = /[\s]+[;][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[;]/g, ';')
    })
    var regexp = /[.][\s]+["]["][\s]+[A-ZΑ-ώ]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+["]["][\s]+/g, '" "')
    })
    var regexp = /[,][\s]*["][^]{1,15}(stated|said|told|added)[.]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[,][\s]*["]/g, '," ')
    })
    var regexp = /[:]["][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[:]["][\s]+/g, ': "')
    })
    var regexp = /(but)["][\s]+[^]+[.]["][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/(but)["][\s]+/g, 'but "')
    })
    var regexp = /[a-zά-ω][.][A-ZΑ-ώ]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[.]/g, '. ')
    })
    var regexp = /[.][\s]+[’]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[.][\s]+[’]/g, '.’')
    })
    var regexp = /[a-zά-ωA-ZΑ-ώ][(]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[(]/g, ' (')
    })
    var regexp = /[:][\s]+[a-zά-ωA-ZΑ-ώ]["][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[:][\s]+/g, ':')
    })
    var regexp = /[!][a-zά-ωA-ZΑ-ώ]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[!]/g, '! ')
    })
    var regexp = /[•]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[•]/g, '')
    })
    var regexp = /[\s]+[.][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[.]/g, '.')
    })
    var regexp = /[*][^ ]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[*]/g, '')
    })
    var regexp = /(R'n')[\s]+[B][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[B]/g, 'B')
    })
    var regexp = /(κ.)[\s]+(ά.)[\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+(ά.)/g, 'ά.')
    })
    var regexp = /(κ.)[\s]+(α.)[\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+(α.)/g, 'α.')
    })
    var regexp = /[A-ZΑ-ώ][.][\s]+[A-ZΑ-ώ][.]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[.][\s]+/g, '.')
    })
    var regexp = /[\s]+[,]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[,]/g, ',')
    })
    var regexp = /[.][\s]+(epub|pdf|zip|rar|tar)[\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[.]/g, ' ')
    })
    var regexp = /[\s]+[&][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[&]/g, 'and')
    })
    var regexp = /[!]['][s]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[!]/g, '')
    })
    var regexp = /[\s]+[(]["][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[(]["][\s]+/g, '("')
    })
    var regexp = /[\s]+[’]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[’]/g, '’')
    })
    var regexp = /[\s]+[”]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[”]/g, '”')
    })
    var regexp = /[\s]+["]["][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+["]["][\s]+/g, '" "')
    })
    var regexp = /[\s]+["][,][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+["][,]/g, '",')
    })
    var regexp = /[0-9][.][\s]+[a-zά-ω]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+/g, '')
    })
    var regexp = /[\s]+[?][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[?]/g, '?')
    })
    var regexp = /[\s]+[)]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]+[)]/g, ')')
    })
    var regexp = /[\u2014-\u2015\u2E3A\u2E3B]/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[-\u2014-\u2015\u2E3A\u2E3B]/g, ' ')
    })
    var regexp = /[\s]+[-\u2010-\u2011\uFE58\uFE63\uFF0D][\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[-\u2010-\u2011\uFE58\uFE63\uFF0D]/g, ' ')
    })
    var regexp = /[\s]+[a-zά-ω][,][a-zά-ω]{2}[\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[,]/g, '')
    })
    var regexp = /[\s]{2,}/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[\s]{2,}/g, ' ')
    })
    var regexp = /[.][\s]+(epub|pdf|zip|rar|tar|NET)/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/.[\s]/g, ' •')
    })
    var regexp = /[^ ]+[.][\s]+(com|net|co.uk|co.in|com.cy|gr|tk|info|me)[\s]+/g
    var cleaned = cleaned.replace(regexp, function(match) {
      return match.replace(/[.][\s]+/g, '.')
    })
    if (rSup.debug) {
      console.log('~~~parse debug~~~ plain text cleaned (a string):', cleaned)
    }
    return cleaned
  }
  rSup.splitSentences = function(text) {
    console.debug('rSup.splitSentences')
    var sentences = sbd$1.sentences(text, { parse_type: 'words' })
    if (rSup.debug) {
      console.log(
        '~~~parse debug~~~ sentences (an array of arrays of strings):',
        sentences
      )
    }
    return sentences
  }
  return rSup
}
var ParserSetup_1 = ParserSetup

var Settings = function(storage, oldSettings) {
  var rSet = {}
  rSet._debug = false
  rSet.available = [
    'wpm',
    '_baseDelay',
    'slowStartDelay',
    'sentenceDelay',
    'otherPuncDelay',
    'numericDelay',
    'shortWordDelay',
    'longWordDelay',
    'halfSpeed',
    'maxNumCharacters'
  ]
  var _settings = (rSet._settings = {
    wpm: 450,
    _baseDelay: 1 / (250 / 60) * 1000,
    slowStartDelay: 5,
    sentenceDelay: 4.7,
    otherPuncDelay: 1.1,
    numericDelay: 1.4,
    shortWordDelay: 1.0,
    longWordDelay: 1.1,
    delayModifier: 1,
    sentenceModifier: 1,
    maxNumCharacters: 12
  })
  rSet.add = function(settingName, initialVal, normalizingFunction) {
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
  }
  rSet.set = function(settingName, value) {
    if (_settings[settingName] === undefined) {
      console.error(
        'There is no approved setting by the name of "' +
          settingName +
          '". Maybe check your capitalization. Also, you can check `yourSetayerObj.settingsAvailable` to see what setting names are available to you.'
      )
      return false
    }
    if (settingName[0] !== '_') {
      var val = rSet['_get_' + settingName](value)
      _settings[settingName] = val
      var toSave = {}
      toSave[settingName] = val
      storage.set(toSave)
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
  }
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
    return 1 / (wpm / 60) * 1000
  }
  rSet._get_wpm = function(val) {
    var wpm = rSet._toUsefulVal(val, 25, 1000)
    _settings._baseDelay = rSet._calcBaseDelay(wpm)
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
  rSet._get_maxNumCharacters = function(val) {
    return rSet._toUsefulVal(val, 1, 1000)
  }
  rSet._init = function(oldSettings) {
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
  }
  rSet._init(oldSettings)
  return rSet
}
var Settings_1 = Settings

var ReaderlyStorage = function() {
  var rSto = {}
  rSto.set = function(settings, callback) {
    chrome.storage.local.set(settings, callback)
  }
  rSto.save = rSto.set
  rSto.loadAll = function(callback) {
    chrome.storage.local.get(null, function loadOldReaderlySettings(settings) {
      callback(settings)
    })
  }
  rSto.get = function(keyOrKeys, callback) {
    chrome.storage.local.get(keyOrKeys, function loadOldReaderlySettings(
      settings
    ) {
      callback(settings)
    })
  }
  rSto.cleanSave = function(settings, callback) {
    chrome.storage.local.clear(function clearReaderlySettings() {
      chrome.storage.local.set(settings, callback)
    })
  }
  rSto.clear = function(callback) {
    chrome.storage.local.clear(callback)
  }
  rSto.remove = function(keyOrKeys, callback) {
    chrome.storage.local.remove(keyOrKeys, callback)
  }
  return rSto
}
var ReaderlyStorage_1 = ReaderlyStorage

var WordNav = function() {
  var wNav = {}
  wNav.words = null
  wNav.index = 0
  ;(wNav.position = [0, 0, 0]), (wNav.currentWord = null)
  wNav.fragmentor = null
  wNav._progress = 0
  var sentences = (wNav._sentences = null)
  var positions = (wNav._positions = [])
  wNav.process = function(senteceArray, fragmentor) {
    if (!senteceArray) {
      console.error(
        'WordNav needs dataz to .process(). You gave it dis:',
        senteceArray
      )
    }
    wNav.fragmentor = fragmentor
    sentences = wNav.sentences = senteceArray
    positions = wNav.positions = []
    for (let senti = 0; senti < sentences.length; senti++) {
      let sentence = sentences[senti]
      for (let wordi = 0; wordi < sentence.length; wordi++) {
        positions.push([senti, wordi])
      }
    }
    return wNav
  }
  wNav.restart = function() {
    wNav.index = 0
    wNav.position = [0, 0, 0]
    return wNav
  }
  wNav.getFragment = function(changesOrIndex) {
    var frag = null
    var pos = wNav.position,
      rawWord = wNav.currentWord
    if (typeof changesOrIndex === 'number') {
      rawWord = wNav._stepWord(changesOrIndex)
      pos[2] = 0
    } else if (changesOrIndex[0] !== 0) {
      var index = wNav._stepSentence(changesOrIndex[0])
      rawWord = wNav._stepWord(index)
      pos[2] = 0
    } else if (changesOrIndex[1] !== 0) {
      index = wNav.index + changesOrIndex[1]
      rawWord = wNav._stepWord(index)
      pos[2] = 0
    } else if (changesOrIndex[2] > 0) {
      var fragi = pos[2] + changesOrIndex[2]
      if (fragi >= rawWord.length) {
        rawWord = wNav._stepWord(wNav.index + 1)
        pos[2] = 0
      } else {
        rawWord = wNav._stepWord(wNav.index)
        pos[2] = fragi
      }
    } else {
      rawWord = wNav._stepWord(wNav.index)
      pos[2] = 0
    }
    wNav.currentWord = wNav.fragmentor.process(rawWord)
    frag = wNav.currentWord[pos[2]]
    return frag
  }
  wNav._stepWord = function(index) {
    wNav.index = wNav.normalizeIndex(index)
    var pos = positions[wNav.index]
    wNav.position[0] = pos[0]
    wNav.position[1] = pos[1]
    var word = sentences[wNav.position[0]][wNav.position[1]]
    return word
  }
  wNav._stepSentence = function(sentenceChange) {
    if (sentenceChange === 0) {
      return 0
    }
    var pos = [wNav.position[0], wNav.position[1]],
      senti = pos[0],
      wordi = pos[1]
    if (sentenceChange > 0 && senti >= sentences.length - 1) {
      wordi = sentences[senti].length - 1
    } else {
      if (sentenceChange === -1 && wordi > 0) {
      } else {
        senti += sentenceChange
      }
      wordi = 0
    }
    pos[1] = wordi
    pos[0] = wNav.normalizeSentencePos(senti)
    var newIndex = wNav._sentenceChangeToIndex(sentenceChange, pos)
    if (newIndex === null) {
      newIndex = wNav.index
    }
    return newIndex
  }
  wNav._sentenceChangeToIndex = function(sentenceChange, newPos) {
    if (sentenceChange === 0) {
      return 0
    }
    var incrementor = signOf(sentenceChange),
      tempi = wNav.index,
      found = false
    while (!found && positions[tempi]) {
      var pos = positions[tempi]
      if (pos[0] === newPos[0] && pos[1] === newPos[1]) {
        found = true
      }
      if (!found) {
        tempi += incrementor
      }
    }
    if (!positions[tempi]) {
      tempi = null
    }
    return tempi
  }
  wNav._positionToIndex = function(pos) {
    var index = positions.findIndex(function matchPosToIndex(potential) {
      var sent = pos[0] === potential[0],
        frag = pos[1] === potential[1]
      return sent && frag
    })
    return index
  }
  var signOf = function(num) {
    return typeof num === 'number'
      ? num ? (num < 0 ? -1 : 1) : num === num ? num : NaN
      : NaN
  }
  wNav.normalizeIndex = function(index) {
    index = Math.min(index, positions.length - 1)
    return Math.max(index, 0)
  }
  wNav.normalizeSentencePos = function(senti) {
    senti = Math.min(senti, sentences.length - 1)
    return Math.max(senti, 0)
  }
  wNav.getProgress = function() {
    wNav._progress = (wNav.index + 1) / positions.length
    return wNav._progress
  }
  wNav.getLength = function() {
    return positions.length
  }
  wNav.getIndex = function() {
    return wNav.index
  }
  wNav.getLastSentence = function() {
    return wNav.sentences[wNav.sentences.length - 1]
  }
  wNav.getLastWord = function() {
    return wNav.getLastSentence()[wNav.getLastSentence().length - 1]
  }
  wNav.getFragmentCount = function(word) {
    return Math.ceil(word.length / 10)
  }
  return wNav
}
var WordNav_1 = WordNav

var WordSplitter = function(charsNode, settings) {
  var rSpt = {}
  rSpt.charsNode = charsNode
  rSpt._getMaxLength = function(word, styles) {
    var pxWidth = parseFloat(styles['width'].replace('px', '')),
      fontSize = parseFloat(styles['font-size'].replace('px', ''))
    var remWidth = Math.floor(pxWidth / fontSize)
    var userMaxChars = settings._settings.maxNumCharacters
    var maxChars = Math.min(userMaxChars, remWidth)
    return maxChars
  }
  rSpt._makeCharsMap = function(chars, maxWithHyphen) {
    var splitGroupLengths = [],
      evenly = Math.floor(chars.length / maxWithHyphen)
    for (let numi = 0; numi < evenly; numi++) {
      splitGroupLengths.push(maxWithHyphen)
    }
    var remainder = chars.length % maxWithHyphen,
      needed = maxWithHyphen - remainder,
      halved = Math.floor(needed / 2),
      toAddBack = halved + remainder
    var lastIndx = splitGroupLengths.length,
      indx = 0
    while (halved > 0) {
      splitGroupLengths[indx] = splitGroupLengths[indx] - 1
      indx = indx + 1
      indx = indx % lastIndx
      halved = halved - 1
    }
    splitGroupLengths.push(toAddBack)
    return splitGroupLengths
  }
  rSpt._splitWord = function(chars, maxChars) {
    var split = []
    if (chars.length <= maxChars) {
      return [chars]
    }
    if (maxChars === 1) {
      return chars.split('')
    }
    let specialCharacters = chars.match(
      /[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]/g
    )
    let specialCharacterCount =
      specialCharacters != null ? specialCharacters.length : 0
    let hasSpace = chars.includes(' ')
    if (
      ((hasSpace || specialCharacterCount / chars.length > 0.2) &&
        !chars.match(/([a-zA-Z]|[ά-ωΑ-ώ])[-]([a-zA-Z]|[ά-ωΑ-ώ])/g)) ||
      chars.match(
        /([a-zA-Z]|[ά-ωΑ-ώ])+[.]([a-zA-Z]|[ά-ωΑ-ώ])+[.]([a-zA-Z]|[ά-ωΑ-ώ])+[;]/g
      )
    ) {
      return [chars]
    }
    var maxWithHyphen = maxChars - 1,
      maybeHyphen = '-'
    if (maxChars < 4) {
      maxWithHyphen = maxChars
      maybeHyphen = ''
    }
    var splitMap = rSpt._makeCharsMap(chars, maxWithHyphen)
    var start = 0
    for (let numi = 0; numi < splitMap.length; numi++) {
      let str = chars.slice(start, start + splitMap[numi])
      if (numi < splitMap.length - 1) {
        if (!/-/.test(str)) {
          str = str + maybeHyphen
        }
      }
      split.push(str)
      start = start + splitMap[numi]
    }
    return split
  }
  rSpt.process = function(chars) {
    var styles = window.getComputedStyle(rSpt.charsNode),
      maxLength = rSpt._getMaxLength(chars, styles)
    var split = rSpt._splitWord(chars, maxLength)
    return split
  }
  return rSpt
}
var WordSplitter_1 = WordSplitter

var StringTime = function(settings) {
  var stm = {}
  var _setts = null
  stm._tempSlowStart = null
  var toMultiplyBy = (stm._toMultiplyBy = {
    hasPeriod: 'sentenceDelay',
    hasOtherPunc: 'otherPuncDelay',
    isShort: 'shortWordDelay',
    isLong: 'longWordDelay',
    isNumeric: 'numericDelay',
    isCode: 'codeBaseDelay'
  })
  var defaults = (stm.defaults = {
    wpm: 250,
    _baseDelay: 1 / (250 / 60) * 1000,
    slowStartDelay: 5,
    sentenceDelay: 5,
    otherPuncDelay: 2.5,
    numericDelay: 2.0,
    shortWordDelay: 1.3,
    longWordDelay: 1.5,
    codeBaseDelay: 3.0,
    delayModifier: 1,
    sentenceModifier: 1
  })
  var oldStart = defaults.slowStartDelay
  stm.orDefault = function(propName) {
    var val = null
    if (_setts && _setts[propName] !== undefined) {
      var val = _setts[propName]
    } else {
      val = defaults[propName]
    }
    return val
  }
  stm.calcDelay = function(str, justOnce) {
    if (typeof str !== 'string') {
      throw new TypeError(
        'The first argument to `.calcDelay` was not a string. What you sent:',
        str
      )
    }
    if (justOnce !== undefined && typeof justOnce !== 'boolean') {
      throw new TypeError(
        'The optional second argument to `.calcDelay` was not undefined or a boolean. What you sent:',
        justOnce
      )
    }
    var processed = stm._process(str)
    var delay = stm.orDefault('_baseDelay') * stm.orDefault('delayModifier')
    var delayModKey
    var PeriodCheck =
      (str.match(
        /^[(]*[^]+[)]*(["]|[”]|[’])*([.]|[?]|[!]|[…])[']*(["]|[”]|[’])*[)]*$/g
      ) ||
        str.match(
          /^[(]*[ά-ωΑ-ώ]+[)]*(["]|[”]|[’])*([.]|[?]|[!]|[…]|[;])[']*(["]|[”]|[’])*[)]*$/g
        )) &&
      !str.match(/^[(]*[^]*(Wham|Yahoo)[)]*([!])[']*(["]|[”]|[’])*[)]*$/g)
    var OtherPuncCheck = str.match(
      /^(["]|[”])*[(]*[^ ]{4,}[)]*(["]|[”])*([:]|[,])(["]|[”])*$/g
    )
    var NumericCheck1 =
      str.match(/^[0-9]+[%]*[,]*[)]*[:]*$/g) ||
      str.match(/^[(]*(Mr|Ms|Dr|Sir|No|St|vs)[)]*[.][,]*$/g) ||
      str.match(/^[(]*[a-zA-Zά-ωΑ-ώ][.][,]*$/g) ||
      str.match(/^[(]*[a-zά-ωA-ZΑ-ώ][.][a-zά-ωA-ZΑ-ώ][)]*[.][,]*$/g) ||
      str.match(/^[0-9]+[.]*[0-9]*(GHz|MHz|Khz)$/g) ||
      str.match(
        /^[a-zά-ωA-ZΑ-ώ]{1,5}[.][a-zά-ωA-ZΑ-ώ]{1,5}[.][a-zά-ωA-ZΑ-ώ]{1,5}$/g
      )
    var NumericCheck2 =
      str.match(/^[(][a-zά-ωA-ZΑ-ώ]+[)]$/g) ||
      str.match(/^[$][0-9]{1,3}[.][0-9]{1,3}$/g) ||
      str.match(/^[&]$/g) ||
      str.match(
        /^(Sept|Oct|Dec|Jan|Mar|Aug|Decem|Decemb|Nov|Novem|Novemb)[.]$/g
      ) ||
      str.match(/^[(][0-9]+([.]|[,])[0-9]+[a-zA-Zά-ωΑ-ώ][)]$/g) ||
      str.match(/^[(]*[κ][)]*[.][,]*$/g) ||
      str.match(/^["]*[a-zά-ωA-ZΑ-ώ]{1,10}[-][a-zά-ωA-ZΑ-ώ]{1,10}["]*[,]*$/g)
    var NumericCheck3 = str.match(
      /^["]*[a-zA-Zά-ωΑ-ώ]{4,}[:][a-zA-Zά-ωΑ-ώ]["]*$/g
    )
    var NumericCheck = NumericCheck1 || NumericCheck2 || NumericCheck3
    var CodeCheck =
      !PeriodCheck &&
      !OtherPuncCheck &&
      !NumericCheck &&
      !str.match(/^[(][a-zA-Zά-ωΑ-ώ]+$/g) &&
      !str.match(/^[a-zA-Zά-ωΑ-ώ]+[)]$/g) &&
      !str.match(/^[(][a-zA-Zά-ωΑ-ώ]+[)]$/g)
    var Guard =
      str.match(
        /^[^a-zA-Zά-ωΑ-ώ0-9 ]{0,1}[a-zA-Zά-ωΑ-ώ]+[/]*[a-zA-Zά-ωΑ-ώ]*[-]*[']*[s]*["]*$/g
      ) || str.match(/^[^a-zA-Zά-ωΑ-ώ0-9 ]{0,1}[a-zA-Zά-ωΑ-ώ]+[-][^]+[-]$/g)
    var key = 'hasPeriod'
    if (PeriodCheck && !NumericCheck) {
      delayModKey = toMultiplyBy[key]
      delay *= stm.orDefault(delayModKey)
      delay *= stm.orDefault('sentenceModifier')
    }
    key = 'hasOtherPunc'
    if (OtherPuncCheck && !Guard) {
      delayModKey = toMultiplyBy[key]
      delay *= stm.orDefault(delayModKey)
    }
    key = 'isNumeric'
    if (NumericCheck && !Guard) {
      delayModKey = toMultiplyBy[key]
      delay *= stm.orDefault(delayModKey)
    }
    key = 'isShort'
    if (processed[key] && !PeriodCheck && !OtherPuncCheck && !NumericCheck) {
      delayModKey = toMultiplyBy[key]
      delay *= stm.orDefault(delayModKey)
    }
    key = 'isLong'
    if (processed[key] && !PeriodCheck && !OtherPuncCheck && !NumericCheck) {
      delayModKey = toMultiplyBy[key]
      delay *= stm.orDefault(delayModKey)
    }
    key = 'isCode'
    if (processed[key] && CodeCheck && str.length >= 6 && !Guard) {
      delayModKey = toMultiplyBy[key]
      delay *= stm.orDefault(delayModKey) + 0.5 * (str.length - 10)
    }
    var nowStart = stm.orDefault('slowStartDelay')
    if (oldStart !== nowStart) {
      stm.resetSlowStart()
    }
    var extraDelay = stm._tempSlowStart
    if (!justOnce) {
      stm._tempSlowStart = Math.max(1, extraDelay / 1.5)
    }
    if (!PeriodCheck) {
      delay = delay * stm._tempSlowStart
    }
    return delay
  }
  stm.resetSlowStart = function(val) {
    if (val) {
      stm._tempSlowStart = val
    } else {
      oldStart = stm._tempSlowStart = stm.orDefault('slowStartDelay')
    }
    return stm
  }
  stm._process = function(chars) {
    var result = { chars: chars }
    stm._setPuncProps(result)
    var shortLength = 2,
      longLength = 8
    var specialCharacters = chars.match(
      /[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]/g
    )
    var specialCharacterCount =
      specialCharacters != null ? specialCharacters.length : 0
    var hasSpace = chars.includes(' ')
    result.hasPeriod = /[.!?]/.test(chars)
    result.isNumeric = /\d/.test(chars)
    result.isCode = hasSpace || specialCharacterCount / chars.length > 0.2
    result.isShort =
      !result.isCode && !result.hasPeriod && chars.length <= shortLength
    result.isLong =
      !result.isCode && !result.hasPeriod && chars.length >= longLength
    return result
  }
  stm._setPuncProps = function(obj) {
    var str = obj.chars
    obj.hasPeriod = /[.!?]/.test(str)
    obj.hasOtherPunc = /["'()”’:;,_]/.test(str)
    return stm
  }
  stm._checkSettings = function(settings) {
    if (!settings) {
      return stm
    }
    for (let key in toMultiplyBy) {
      let name = toMultiplyBy[key]
      stm.orDefault(name)
    }
    stm.orDefault('_baseDelay')
    stm.orDefault('slowStartDelay')
    stm.orDefault('delayModifier')
    return stm
  }
  stm._init = function(settings) {
    _setts = stm._settings = settings
    stm._checkSettings(settings)
    stm.resetSlowStart()
    return stm
  }
  stm._init(settings)
  return stm
}
var StringTime_1 = StringTime

var $$2
$$2 = require$$0
var ReaderlyTimer = function(delayer) {
  var rTim = {}
  rTim._init = function() {
    rTim.done = false
    rTim._timeoutID = null
    rTim._isPlaying = false
    rTim._wasPlaying = false
    rTim._jumping = false
    rTim._incrementors = [0, 0, 1]
    rTim._skipWhitespace = false
    rTim._whitespaceRegex = new RegExp('[\n\r]', 'g')
    rTim.util = rTim.prototype
    return rTim
  }
  rTim.getProgress = function() {
    return rTim._queue.getProgress()
  }
  rTim.getLength = function() {
    return rTim._queue.getLength()
  }
  rTim.getLastSentence = function() {
    return rTim._queue.getLastSentence()
  }
  rTim.getLastWord = function() {
    return rTim._queue.getLastWord()
  }
  rTim.getFragmentCount = function(word) {
    return rTim._queue.getFragmentCount(word)
  }
  rTim.lastWordFragmentCount = function() {
    return rTim.getFragmentCount(rTim.getLastWord())
  }
  rTim._noDelayMod = function(startDelay) {
    return startDelay
  }
  rTim._restart = function(startEventName, endEventName, startDelayModFunc) {
    if (startEventName) $$2(rTim).trigger(startEventName, [rTim])
    rTim.done = false
    var delayMod = startDelayModFunc || rTim._noDelayMod
    var delay = delayMod(delayer._settings.slowStartDelay)
    delayer.resetSlowStart(delay)
    rTim._queue.restart()
    rTim._pause(null, null, null)
    rTim.play()
    if (endEventName) $$2(rTim).trigger(endEventName, [rTim])
    return rTim
  }
  rTim.start = function(queue) {
    if (!queue) {
      console.error(
        'No readable object was passed into PlaybackManager. `queue`:',
        rTim._queue
      )
    } else {
      $$2(rTim).trigger('startBegin', [rTim])
      rTim._queue = queue
      rTim._restart(null, null, null)
      $$2(rTim).trigger('startFinish', [rTim])
    }
    return rTim
  }
  rTim.restart = function() {
    rTim._restart('restartBegin', 'restartFinish', null)
    return rTim
  }
  rTim._play = function(startEventName, endEventName) {
    rTim._pausesignal = 1
    rTim._incrementors = [0, 0, 1]
    if (startEventName) $$2(rTim).trigger(startEventName, [rTim])
    rTim.setProlongationCounter()
    rTim.lastWordFragments = {}
    if (!rTim._isPlaying) {
      rTim._isPlaying = true
      rTim._loop([0, 0, 0], false)
    }
    if (endEventName) $$2(rTim).trigger(endEventName, [rTim])
    return rTim
  }
  rTim.play = function() {
    if (rTim.done) {
      rTim.restart()
    } else {
      rTim._play('playBegin', 'playFinish')
    }
    return rTim
  }
  rTim._pause = function(startEventName, endEventName, startDelayModFunc) {
    if (startEventName) $$2(rTim).trigger(startEventName, [rTim])
    clearTimeout(rTim._timeoutID)
    rTim._isPlaying = false
    var delayMod = startDelayModFunc || rTim._noDelayMod
    var delay = delayMod(delayer._settings.slowStartDelay)
    delayer.resetSlowStart(delay)
    if (endEventName) $$2(rTim).trigger(endEventName, [rTim])
    return rTim
  }
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
  rTim._oneStepUntimed = function(changes) {
    rTim._wasPlaying = rTim._isPlaying
    rTim._pause(null, null, null)
    rTim._skipWhitespace = true
    rTim.once(changes)
    rTim._skipWhitespace = false
    if (rTim._wasPlaying) {
      rTim._play(null, null, null)
    }
    return rTim
  }
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
  rTim.jumpTo = function(playbackObj) {
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
  }
  rTim.disengageJumpTo = function() {
    if (rTim._wasPlaying) {
      rTim._play(null, null, null)
    }
    rTim._jumping = false
    return rTim
  }
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
    $$2(rTim).trigger('done', [rTim])
    return !!rTim.stop()
  }
  var stoppedLoop = function() {
    return isDone() ? stopLoop() : false
  }
  rTim._wordsDone = function() {
    var progress = rTim.getProgress()
    $$2(rTim).trigger('progress', [
      rTim,
      progress,
      rTim._queue.index,
      rTim.getLength()
    ])
    rTim.done = stoppedLoop()
    return rTim.done
  }
  rTim._skipDirection = function(incrementors, frag) {
    var vector = [0, 0, 0]
    var hasOnlyNewLines = false,
      chars = frag
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
    if (rTim._skipWhitespace && noWhitespace.length === 0) {
      if (incrementors[0] !== 0) {
        vector[0] = rTim.signOf(incrementors[0])
      } else if (incrementors[1] !== 0) {
        vector[1] = rTim.signOf(incrementors[1])
      } else if (incrementors[2] !== 0) {
        vector[2] = rTim.signOf(incrementors[2])
      } else {
        vector = [0, 0, 1]
      }
    }
    return vector
  }
  rTim._loop = function(incrementors, justOnce) {
    $$2(rTim).trigger('loopBegin', [rTim])
    if (rTim._done) {
      return
    }
    incrementors = incrementors || rTim._incrementors
    var frag = rTim._queue.getFragment(incrementors),
      skipDir = rTim._skipDirection(incrementors, frag)
    if (skipDir[0] !== 0 || skipDir[1] !== 0 || skipDir[2] !== 0) {
      $$2(rTim).trigger('loopSkip', [rTim, frag])
      rTim._loop(skipDir, justOnce)
    } else {
      if (!justOnce) {
        var delay = delayer.calcDelay(frag, justOnce)
        rTim._timeoutID = setTimeout(rTim._loop, delay)
      }
      $$2(rTim).trigger('newWordFragment', [rTim, frag])
      $$2(rTim).trigger('loopFinish', [rTim])
    }
    if (rTim._wordsDone()) {
      return rTim
    }
    return rTim
  }
  rTim.once = function(incrementors) {
    $$2(rTim).trigger('onceBegin', [rTim])
    rTim._loop(incrementors, true)
    $$2(rTim).trigger('onceFinish', [rTim])
    return rTim
  }
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
  rTim._init()
  return rTim
}
var ReaderlyTimer_1 = ReaderlyTimer

var coreCSS =
  "\
  /*readerly-main.css\
* \
* Refer to main display script (currently ReaderlyDisplay.js\
* on 12/20/16) for DOM structure.\
* \
* Affects mostly main display, but also others.\
* \
* TODO:\
* - Implement more robust hiding. (jQuery .hide type thing atm)\
* - More robust defaults.\
*/\
\
/* ============================== */\
/* STRUCTURE */\
/* ============================== */\
#__rdly_iframe {\
  position: fixed;\
  top: 0;\
  left: 0;\
  width: 100%;\
  z-index: 4300200100;\
  /* Cannot get rid of scrollbars while retaining scrolling */\
  /* http://stackoverflow.com/questions/3296644/hiding-the-scrollbar-on-an-html-page */\
  /* https://stackoverflow.com/questions/16670931/hide-scroll-bar-but-still-being-able-to-scroll */\
  /* very simple example of alternative: https://jsfiddle.net/fpd4fb80/1/ (without iframe) */\
  /* example with iframe: https://jsfiddle.net/fpd4fb80/31/ */\
}\
html, body {\
  /* !!!! Not on the parent site please! !!!! */\
  // height: 100%;\
  // overflow: hidden;\
}\
\
#__rdly,\
#__rdly * {\
  box-sizing: border-box;\
}\
\
#__rdly {\
  display: flex;\
  flex-direction: column;\
  top: 0;\
  left: 0;\
  width: 100%;\
  transition: top 100ms linear;\
}\
\
.__rdly-main-section {\
  width: 100%;\
  display: flex;\
  /* For absolutely positioned children */\
  position: relative;\
}\
\
/* Should be 'top' and 'bottom' instead? */\
#__rdly #__rdly_above_bar {\
  top: 0;\
  /* function */\
  z-index: 50;\
}\
\
#__rdly_below_bar {\
  top: 100%;\
  display: flex;\
}\
\
#__rdly #__rdly_bar {\
  /* ??: Will this work if font-size is declared lower down? */\
  min-height: 2em;\
  text-align: center;\
  overflow: hidden;\
}\
\
/* ??: Generalize positions? Left, right, top, bottom, center, middle? */\
#__rdly .__rdly-bar-left,\
#__rdly .__rdly-bar-center,\
#__rdly .__rdly-bar-right {\
  /* vertically centered without flexbox */\
  position: absolute;\
  top: 50%;\
  transform: translateY(-50%);\
  height: 100%;\
  display: flex;\
  align-items: center;\
  align-content: center;\
  justify-content: center;\
}\
#__rdly .__rdly-bar-left,\
#__rdly .__rdly-bar-right {\
  padding: 0.75%;\
}\
#__rdly .__rdly-bar-left {\
  left: 0;\
  z-index: 1;\
}\
#__rdly .__rdly-bar-center {\
  height: 100%;\
  text-align: center;\
}\
#__rdly .__rdly-bar-right {\
  right: 0;\
}\
#__rdly .__rdly-bar-right2 {\
    position: absolute;\
    top: 60%;\
    display: flex;\
    right: 10px;\
    z-index: 9999;\
}\
.__rdly-sup-menu-button {\
    font-size: 18px !important;\
    height: 25px !important;\
}\
\
#__rdly #__rdly_close {\
  align-self: flex-start;\
}\
\
#__rdly #__rdly_text_elements {\
  /* em counts the widest possible text */\
  position:relative;\
  width: 1250;\
  height: 100%;\
  user-select: none;\
  //pointer-events: none;\
  -webkit-font-smoothing: antialiased !important;\
}\
\
/* Horizontally and vertically centered without flexbox */\
/* Comes last to take precedence */\
#__rdly .__rdly-transform-centered {\
  position: absolute;\
  top: 50%;\
  left: 50%;\
  transform: translate( -50% ,-50% );\
}\
\
div.__rdly-flexible{\
  display:flex;\
  position: absolute;\
  transform: translate(-50%,-50%);\
  left: 50%;\
  width: 100%;\
  top: 50%;\
}\
\
#__rdly_indicator {\
  position:absolute;\
  width: 100%;\
  left: 0;\
  top: 50%;\
  color: rgb(190,190,190);\
  transform: translate(0,calc(-50% - 1px));\
}\
\
div.__rdly-center{\
  justify-content: center;\
}\
\
.__rdly-text {\
  flex-grow: 1;\
  flex-basis: 20%;\
  display: flex;\
}\
\
#__rdly-text-left{\
    justify-content: flex-end;\
}\
\
#__rdly-text-center{\
  flex-grow: 0;\
  flex-basis: auto;\
}\
\
/* ============================== */\
/* SKIN */\
/* ============================== */\
#__rdly_iframe {\
  border: 0;\
  top: 40;\
}\
body {\
  margin: 0;\
}\
\
#__rdly div,\
#__rdly span,\
#__rdly a,\
#__rdly li {\
  /* font defaults from chrome inspection */\
  font-family: Clear Sans Light;\
  font-size: 15px;\
  line-height: normal;\
  font-style: normal;\
  font-weight: normal;\
  font-variant: none;\
  font-stretch: normal;\
  font-feature-settings: normal;\
  font-kerning: auto;\
  -webkit-font-smoothing: auto;\
  text-transform: none;\
}\
\
#__rdly {\
  /*border: 1px solid gray;*/\
  /*border-left: 0;*/\
  /*border-right: 0;*/\
  background-color: rgba(250, 250, 250, 1);\
}\
\
.__rdly-main-section {\
  border: 0;\
  border-bottom: 1px solid gray;\
}\
\
#__rdly #__rdly_bar,\
#__rdly #__rdly_bar div,\
#__rdly #__rdly_bar span,\
#__rdly #__rdly_bar a,\
#__rdly #__rdly_bar li {\
  font-size: 37px;\
  font-family: Clear Sans Light;\
}\
\
\
/* Should this be in readerly-main.css? new readerly-ui.css?*/\
#__rdly button::-moz-focus-inner,\
#__rdly input::-moz-focus-inner {\
  /*padding: 0;*/\
  /*background-color: rgba( 220, 220, 220, 1 );*/\
}\
\
#__rdly button {\
  border-radius: 3px;\
  user-select: none;\
  border-style: solid;\
  box-shadow: none;\
  outline: none;\
}\
\
label {\
  user-select: none;\
}\
\
#__rdly button {\
  background-color: rgba( 220, 220, 220, 1 );\
}\
#__rdly button:hover,\
#__rdly .__rdly-active-ui {\
  background-color: rgba(160, 160, 160, 1);\
  fill: rgba(100, 100, 100, 1);\
}\
/* TODO: add:\
#__rdly .__rdly-active-ui {\
  border-style: inset;\
}\
*/\
\
\
/* ============================== */\
/* FUNCTION */\
/* ============================== */\
\
#__rdly .__rdly-hidden {\
  display: none;\
}\
\
#__rdly .__rdly-rotating {\
    -webkit-animation:spin 4s linear infinite;\
    -moz-animation:spin 4s linear infinite;\
    animation:spin 4s linear infinite;\
}\
@-moz-keyframes spin {\
  100%\
  { -moz-transform: rotate(360deg); }\
}\
@-webkit-keyframes spin {\
  100%\
  { -webkit-transform: rotate(360deg); }\
}\
@keyframes spin {\
  100%\
  { transform:rotate(360deg); }\
}\
\
#__rdly .__rdly-scrollable-y {\
  display: block;\
  overflow-y: hidden;\
  overflow-x: hidden;\
}\
\
#__rdly .__rdly-scrollable-y > * {\
  height: auto;\
  overflow: hidden;\
}\
\
.__rdly-big-menu-button-image {\
  height: 27.75;\
}\
"
var coreCSS_1 = coreCSS

var nouiCSS =
  "/* noUi.css */\
\
.noUi-target,\
.noUi-target * {\
  -webkit-touch-callout: none;\
  -webkit-user-select: none;\
  -ms-touch-action: none;\
  -ms-user-select: none;\
  -moz-user-select: none;\
  -moz-box-sizing: border-box;\
  box-sizing: border-box;\
}\
\
/* instead of background, it seems, in v8 */\
.noUi-target {\
  background: #FAFAFA;\
  box-shadow: inset 0 1px 1px #B3B3B3;\
  border: 1px solid rgba( 80, 80, 80, 1 );\
}\
\
.noUi-base {\
  width: 100%;\
  height: 100%;\
  position: relative;\
}\
\
.noUi-origin {\
  position: absolute;\
  right: 0;\
  top: 0;\
  left: 0;\
  bottom: 0;\
}\
\
.noUi-handle {\
  position: relative;\
  z-index: 1;\
}\
\
.noUi-stacking .noUi-handle {\
  /* This class is applied to the lower origin when\
     its values is > 50%. */\
  z-index: 10;\
}\
\
.noUi-stacking + .noUi-origin {\
  /* Fix stacking order in IE7, which incorrectly\
     creates a new context for the origins. */\
  /* *z-index: -1; - Original. Meant to be this way? */\
  z-index: -1;\
}\
\
.noUi-state-tap .noUi-origin {\
  /*-webkit-transition: left 0.3s, top 0.3s;*/\
  /*transition: left 0.3s, top 0.3s;*/\
}\
\
.noUi-state-drag * {\
  cursor: inherit !important;\
}\
\
/* Slider size and handle placement */\
.noUi-horizontal {\
  height: 18px;\
}\
\
.noUi-horizontal .noUi-handle {\
  width: 32px;\
  height: 20px;\
  /* Can't do adjustable height that's good with small sizes (min-height) with no min-top too :/ */\
  /*min-height: 20px;*/\
  /*height: 140%;*/\
  /*top: 69%;*/\
  left: -16px;\
  /* vertical centering without flexbox */\
  top: 50%;\
  transform: translateY(-50%);\
}\
\
.noUi-vertical {\
  width: 18px;\
}\
\
.noUi-vertical .noUi-handle {\
  width: 28px;\
  height: 34px;\
  left: -6px;\
  top: -17px;\
}\
\
.noUi-vertical.noUi-extended {\
  padding: 15px 0;\
}\
\
.noUi-vertical.noUi-extended .noUi-origin {\
  height: 100%;\
  bottom: -15px;\
}\
\
/* Styling */\
.noUi-background {\
  background: #FAFAFA;\
  box-shadow: inset 0 1px 1px #B3B3B3;\
  border: 1px solid gray;\
}\
\
.noUi-connect {\
  position: absolute;\
  height: 100%;\
  background: #3498DB;\
  box-shadow: inset 0 0 3px rgba(51, 51, 51, 0.45);\
  /*border: 3px double black;*/\
  /*border: 1px solid rgba( 80, 80, 80, 1 );*/\
  -webkit-transition: background 450ms;\
  transition: background 450ms;\
}\
\
.noUi-origin {\
  border-radius: 2px;\
}\
\
.noUi-target {\
  box-shadow: inset 0 1px 1px #f0f0f0, 0 3px 6px -5px #bbbbbb;\
}\
\
/* Handles and cursors */\
.noUi-dragable {\
  cursor: w-resize;\
}\
\
.noUi-vertical .noUi-dragable {\
  cursor: n-resize;\
}\
\
.noUi-handle {\
  border: 1.5px solid #959191;\
  border-radius: 3px;\
  background: #FFF;\
  cursor: default;\
  box-shadow: inset 0 0 1px white, inset 0 1px 7px #ebebeb, 0 3px 6px -3px #bbbbbb;\
}\
\
.noUi-active {\
  box-shadow: inset 0 0 1px white, inset 0 1px 7px #dddddd, 0 3px 6px -3px #bbbbbb;\
}\
\
.noUi-handle:after {\
  left: 16px;\
}\
\
.noUi-vertical .noUi-handle:before,\
.noUi-vertical .noUi-handle:after {\
  width: 14px;\
  height: 1px;\
  left: 6px;\
  top: 14px;\
}\
\
.noUi-vertical .noUi-handle:after {\
  top: 17px;\
}\
\
/* Disabled state */\
[disabled].noUi-connect,\
[disabled] .noUi-connect {\
  background: #B8B8B8;\
}\
\
[disabled] .noUi-handle {\
  cursor: not-allowed;\
}\
\
/* Blocked state */\
.noUi-state-blocked.noUi-connect,\
.noUi-state-blocked .noUi-connect {\
  background: #4FDACF;\
}\
\
/* Containing handles within the slider bar (horizontal) */\
.noUi-horizontal.noUi-extended {\
	/*padding-right: 32px;*/\
  /* ??: Why is 32px not working? https://refreshless.com/nouislider/more/ bottom*/\
  padding-right: 30px;\
}\
.noUi-horizontal.noUi-extended .noUi-handle {\
	left: -1px;\
}\
.noUi-horizontal.noUi-extended .noUi-origin  {\
	right: -32px;\
}\
\
/*  PROGRESSS BAR AND SCRUBBER  */\
#__rdly_progress .noUi-handle {\
  top: 6px;\
  height: 15px;\
}\
#__rdly_progress .noUi-handle::before,\
#__rdly_progress .noUi-handle::after {\
  height: 80%;\
  top: 50%;\
  transform: translateY(-50%);\
}\
"
var nouiCSS_1 = nouiCSS

var $$3
var coreCSSstr
var nouiCSSstr
;($$3 = require$$0), (coreCSSstr = coreCSS_1), (nouiCSSstr = nouiCSS_1)
var ReaderlyDisplay = function(timer, parentNode, settings) {
  var rDis = {}
  rDis._toTrigger = []
  var readerly, textElems, $iframe
  var iframeStr = '<iframe id="__rdly_iframe"></iframe>'
  var cssStr = '<style>' + coreCSSstr + '\n' + nouiCSSstr + '</style>'
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
  rDis.addToTriggerList = function(newObjWithTriggerFuncts) {
    rDis._toTrigger.push(newObjWithTriggerFuncts)
    return rDis
  }
  rDis.close = function() {
    rDis.hide()
    for (let trigi = 0; trigi < rDis._toTrigger.length; trigi++) {
      let obj = rDis._toTrigger[trigi]
      if (obj.close) obj.close()
    }
    return rDis
  }
  rDis.open = function() {
    rDis.show()
    for (let trigi = 0; trigi < rDis._toTrigger.length; trigi++) {
      let obj = rDis._toTrigger[trigi]
      if (obj.open) obj.open()
    }
    return rDis
  }
  var keybinds = function(event) {
    switch (event.keyCode) {
      case 27:
        rDis.close()
        break
      case 192:
      case 32:
        document.activeElement.blur()
        document.getElementById('__rdly_iframe').focus()
        $$3(readerly)
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
  rDis.show = function() {
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
    return rDis
  }
  rDis.hide = function() {
    $iframe.hide()
    document.body.removeChild(style)
    document.body.removeChild(style2)
    window.removeEventListener('keydown', keybinds)
    iframe.contentDocument.body.removeEventListener('keydown', keybinds)
    document.activeElement.blur()
    return rDis
  }
  rDis.destroy = function() {
    $$3(readerly).remove()
    return rDis
  }
  rDis._resizeIframeAndContents = function() {
    var grower = $$3(readerly).find('.__rdly-to-grow')[0]
    if (!grower) {
      return rDis
    }
    var scrollable = $$3(grower).parent()[0],
      scrollRect = scrollable.getBoundingClientRect()
    var top = scrollable.getBoundingClientRect().top,
      height = grower.getBoundingClientRect().height,
      potentialBottom = top + height,
      screenBottom = document.documentElement.clientHeight,
      diff = potentialBottom - screenBottom
    var scrollBottom = scrollable.getBoundingClientRect().bottom,
      outerBottom = readerly.getBoundingClientRect().bottom,
      bottomDiff = outerBottom - scrollBottom
    diff = diff + bottomDiff
    var newHeight = height
    if (diff > 0) {
      newHeight = height - diff
    }
    scrollable.style.height = newHeight + 'px'
    var currentOuterHeight = top + newHeight + bottomDiff
    $iframe[0].style.height = currentOuterHeight + 'px'
    return rDis
  }
  rDis.update = function() {
    setTimeout(rDis._resizeIframeAndContents, 4)
    return rDis
  }
  rDis.toggleHalfSpeed = function(event) {
    var delayModifier = event.target.checked ? 2.25 : 1
    settings.set('delayModifier', delayModifier)
    var sentenceModifier = event.target.checked ? 0.6 : 1
    settings.set('sentenceModifier', sentenceModifier)
  }
  var isSpeedHalved = settings.isModifier.bind(null, 2.25)
  rDis._addEvents = function() {
    $$3(rDis.nodes.close).on('touchend click', rDis.close)
    $$3(readerly).on('mousedown mouseup touchstart touchend', rDis.update)
    $$3(rDis.nodes.halfSpeed)[0].checked = isSpeedHalved()
    $$3(rDis.nodes.halfSpeed).on('change', rDis.toggleHalfSpeed)
    $$3(window).on('resize', rDis.update)
    return rDis
  }
  rDis._addNodes = function(parentNode) {
    if (!parentNode) {
      parentNode = $$3(document.body)[0]
    }
    $iframe = $$3(iframeStr)
    $iframe.appendTo(parentNode)
    var doc = $iframe[0].contentDocument
    doc.body.style['overflow-x'] = 'hidden'
    doc.body.style['overflow-y'] = 'hidden'
    readerly = rDis._readerlyNode = $$3(htmlStr)[0]
    $$3(readerly).appendTo(doc.body)
    var $styles = $$3(cssStr)
    $styles.appendTo(doc.head)
    $iframe[0].style.minHeight = '81px'
    rDis.nodes = {
      doc: doc,
      head: doc.head,
      body: doc.body,
      readerly: readerly,
      above: $$3(readerly).find('#__rdly_above_bar')[0],
      bar: $$3(readerly).find('#__rdly-bar')[0],
      barLeft: $$3(readerly).find('.__rdly-bar-left')[0],
      barCenter: $$3(readerly).find('.__rdly-bar-center')[0],
      aboveText: $$3(readerly).find('#__rdly_above_text_elements')[0],
      leftOfText: $$3(readerly).find('#__rdly_left_text_elements')[0],
      textElements: $$3(readerly).find('#__rdly_text_elements')[0],
      rightOfText: $$3(readerly).find('#__rdly_right_text_elements')[0],
      belowText: $$3(readerly).find('#__rdly_below_text_elements')[0],
      barRight: $$3(readerly).find('.__rdly-bar-right')[0],
      close: $$3(readerly).find('#__rdly_close')[0],
      halfSpeed: $$3(readerly).find('#__rdly_halvespeed_input')[0],
      below: $$3(readerly).find('#__rdly_below_bar')[0]
    }
    return rDis
  }
  rDis._init = function(parentNode) {
    if (!$$3('#__rdly_iframe')[0]) {
      rDis
        ._addNodes(parentNode)
        ._addEvents()
        .addToTriggerList(timer)
      $iframe.hide()
      $$3('#__rdly_iframe').hide(0)
    }
    return rDis
  }
  rDis._init(parentNode)
  return rDis
}
var ReaderlyDisplay_1 = ReaderlyDisplay

var playbackCSS =
  "/* readerly-playback.css */\
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
var playbackCSS_1 = playbackCSS

var $$4
var noUiSlider
var playbackCSSstr
$$4 = require$$0
noUiSlider = require$$1
playbackCSSstr = playbackCSS_1
var PlaybackUI = function(timer, coreDisplay) {
  var rPUI = {}
  rPUI.modifierKeysDown = []
  rPUI.sentenceModifierKey = 17
  rPUI.isOpen = false
  rPUI.isPlaying = false
  rPUI.isScrubbing = false
  rPUI.nodes = {}
  var nodes = rPUI.nodes
  var progressNode
  var indicator, textButton, textContainer, loading
  var playPauseFeedback, playFeedback, pauseFeedback
  var controls
  var rewindSentence
  var nonCharRegEx = /[.,\/@#!$%\^&\*;:{}\+=\-_`~()‘’'"“”\[\]<>\|\\]/g
  var progStr = '<div id="__rdly_progress"></div>'
  var textContainerStr =
      '<div class="__rdly-flexible"><span id="__rdly-text-left" class="__rdly-text"></span><span id="__rdly-text-center" class="__rdly-text"></span><span id="__rdly-text-right" class="__rdly-text"></span></div>',
    indicatorStr =
      '<div id="__rdly_indicator" class="__rdly-center __rdly-flexible"><span>|</span></div>',
    textButtonStr =
      '<button id="__rdly_text_button" class="__rdly-transform-centered"></button>',
    loadingStr = '<div id="__rdly_loading" class="__rdly-hidden"></div>'
  var feedbackStr =
    '<div id="__rdly_play_pause_feedback" class="__rdly-transform-centered">\
	<div id="__rdly_pause_feedback" class="__rdly-playback-feedback __rdly-transform-centered">||</div>\
	<div id="__rdly_play_feedback" class="__rdly-playback-feedback __rdly-transform-centered">></div>\
</div>'
  var browser = chrome || browser,
    rewPath = browser.extension.getURL('images/rewind.png')
  var rewindSentenceStr =
    '<button id="__rdly_rewind-sentence" class="__rdly-big-menu-button">\
    	<img src="' +
    rewPath +
    '"></img>\
    </button>'
  var fontPath = browser.extension.getURL('fonts/ClearSansLight.ttf')
  rPUI.clear = function() {
    rPUI.modifierKeysDown = []
    window.removeEventListener('keydown', rPUI.keyDown)
    iframe.contentDocument.body.removeEventListener('keydown', rPUI.keyDown)
    return rPUI
  }
  rPUI.open = function() {
    rPUI.isOpen = true
    return rPUI
  }
  rPUI.close = function() {
    rPUI.isOpen = false
    return rPUI
  }
  rPUI.hideText = function() {
    $$4(textButton).addClass('__rdly-hidden')
    return rPUI
  }
  rPUI.showText = function() {
    $$4(textButton).removeClass('__rdly-hidden')
    return rPUI
  }
  rPUI.wait = function() {
    rPUI.hideText()
    $$4(loading).addClass('__rdly-rotating')
    $$4(loading).removeClass('__rdly-hidden')
    return rPUI
  }
  rPUI.stopWaiting = function() {
    $$4(loading).addClass('__rdly-hidden')
    $$4(loading).removeClass('__rdly-rotating')
    rPUI.showText()
    return rPUI
  }
  rPUI.clearText = function() {
    $$4(textButton).html('')
    return rPUI
  }
  rPUI._play = function() {
    $$4(playFeedback).removeClass('__rdly-hidden')
    $$4(pauseFeedback).addClass('__rdly-hidden')
    var x = $$4(playPauseFeedback)
      .fadeTo(0, 0.7)
      .fadeTo(700, 0)
    return rPUI
  }
  rPUI._pause = function() {
    $$4(pauseFeedback).removeClass('__rdly-hidden')
    $$4(playFeedback).addClass('__rdly-hidden')
    $$4(playPauseFeedback)
      .fadeTo(0, 0.7)
      .fadeTo(700, 0)
    return rPUI
  }
  rPUI._togglePlayPause = function() {
    timer.togglePlayPause()
    return rPUI
  }
  rPUI._rewindSentence = function() {
    timer.prevSentence()
    return rPUI
  }
  rPUI._shiftCharacter = function(textParts) {
    textParts.startText += textParts.middleText
    textParts.middleText = textParts.endText.substring(0, 1)
    textParts.endText = textParts.endText.substring(1)
  }
  var whiteSpaceRegexp = /^[\n\r\s]+$/
  var paragraphSymbol =
    '<span class="__rdly-text-content"></span><span class="__rdly-text-content"></span><span class="__rdly-text-content"></span>'
  rPUI._showNewFragment = function(evnt, timer, fragment) {
    var chars = fragment
    if (!whiteSpaceRegexp.test(chars)) {
      var startSpan = textContainer.querySelector('#__rdly-text-left')
      var middleSpan = textContainer.querySelector('#__rdly-text-center')
      var endSpan = textContainer.querySelector('#__rdly-text-right')
      var textParts = {
        startText: '',
        middleText: '',
        endText: ''
      }
      var noPunctuationLength = chars.replace(nonCharRegEx, '').length
      if (chars.includes(' ')) {
        textParts.startText = ''
        textParts.middleText = chars
        textParts.endText = ''
      } else if (chars.includes(';') && chars.includes('"')) {
        textParts.startText = ''
        textParts.middleText = chars
        textParts.endText = ''
      } else if (
        chars.includes(';') &&
        (chars.includes('(') || chars.includes(')'))
      ) {
        textParts.startText = ''
        textParts.middleText = chars
        textParts.endText = ''
      } else if (chars.includes('<') && chars.includes('>')) {
        textParts.startText = ''
        textParts.middleText = chars
        textParts.endText = ''
      } else if (chars.includes('/') || chars.includes('\\')) {
        textParts.startText = ''
        textParts.middleText = chars
        textParts.endText = ''
      } else if (
        chars.includes('document.getElementById') ||
        chars.includes('createScene();')
      ) {
        textParts.startText = ''
        textParts.middleText = chars
        textParts.endText = ''
      } else if (noPunctuationLength >= 20) {
        textParts.startText = ''
        textParts.middleText = chars
        textParts.endText = ''
      } else if (noPunctuationLength >= 10) {
        textParts.startText = chars.substring(0, 3)
        textParts.middleText = chars.substring(3, 4)
        textParts.endText = chars.substring(4)
      } else if (noPunctuationLength >= 7) {
        textParts.startText = chars.substring(0, 2)
        textParts.middleText = chars.substring(2, 3)
        textParts.endText = chars.substring(3)
      } else if (noPunctuationLength >= 2) {
        textParts.startText = chars.substring(0, 1)
        textParts.middleText = chars.substring(1, 2)
        textParts.endText = chars.substring(2)
      } else {
        textParts.startText = ''
        textParts.middleText = chars
        textParts.endText = ''
      }
      if (noPunctuationLength >= 2) {
        var symbolsInStart = textParts.startText.match(nonCharRegEx)
        if (symbolsInStart) {
          for (var i = 0; i < symbolsInStart.length; i++) {
            rPUI._shiftCharacter(textParts)
          }
        }
        while (
          textParts.middleText.match(nonCharRegEx) &&
          textParts.endText.length > 0 &&
          noPunctuationLength > 2
        ) {
          rPUI._shiftCharacter(textParts)
        }
      }
      startSpan.textContent = textParts.startText
      middleSpan.textContent = textParts.middleText
      endSpan.textContent = textParts.endText
    } else {
      $$4(textButton).html(paragraphSymbol)
    }
    rPUI.stopWaiting()
    return rPUI
  }
  rPUI._showProgress = function(evnt, timer, fraction, indx, total) {
    if (!rPUI.isScrubbing) {
      progressNode.noUiSlider.set(indx)
    }
    return rPUI
  }
  rPUI._start = function() {
    progressNode.noUiSlider.updateOptions({
      range: { min: 0, max: timer.getLength() - 1 || 1 }
    })
    return rPUI
  }
  rPUI._startScrubbing = function(values, handle) {
    rPUI.isScrubbing = true
    return rPUI
  }
  rPUI._updateScrubbedWords = function(values, handle) {
    timer.jumpTo({
      type: 'index',
      amount: parseInt(values[handle])
    })
    return rPUI
  }
  rPUI._stopScrubbing = function(values, handle) {
    rPUI.isScrubbing = false
    timer.disengageJumpTo()
    return rPUI
  }
  rPUI.keyDown = function(evnt) {
    if (!rPUI.isOpen) {
      return rPUI
    }
    if (evnt.ctrlKey && evnt.keyCode === 39) {
      timer.nextSentence()
    } else if (evnt.ctrlKey && evnt.keyCode === 37) {
      timer.prevSentence()
    } else if (evnt.shiftKey && evnt.keyCode === 39) {
      timer.nextTwoSentences()
    } else if (evnt.shiftKey && evnt.keyCode === 37) {
      timer.prevTwoSentences()
    } else if (evnt.keyCode === 39) {
      timer.nextWord()
    } else if (evnt.keyCode === 37) {
      timer.prevWord()
    }
    return rPUI
  }
  rPUI._progressSlider = function(progNode) {
    $$4(progNode).addClass('noUi-extended')
    var slider = noUiSlider.create(progNode, {
      range: { min: 0, max: 1 },
      start: 0,
      step: 1,
      connect: [true, false],
      handles: 1,
      behaviour: 'tap'
    })
    return progNode
  }
  rPUI._addEvents = function() {
    $$4(timer).on('playBegin', rPUI._play)
    $$4(timer).on('pauseFinish', rPUI._pause)
    $$4(timer).on('startFinish', rPUI._start)
    $$4(timer).on('newWordFragment', rPUI._showNewFragment)
    $$4(timer).on('progress', rPUI._showProgress)
    progressNode.noUiSlider.on('start', rPUI._startScrubbing)
    progressNode.noUiSlider.on('slide', rPUI._updateScrubbedWords)
    progressNode.noUiSlider.on('change', rPUI._stopScrubbing)
    $$4(textButton).on('touchend click', rPUI._togglePlayPause)
    $$4(rewindSentence).on('touchend click', rPUI._rewindSentence)
    var iframe
    iframe = document.getElementById('__rdly_iframe')
    window.addEventListener('keydown', rPUI.keyDown)
    iframe.contentDocument.body.addEventListener('keydown', rPUI.keyDown)
    return rPUI
  }
  rPUI._init = function(coreDisplay) {
    rPUI.modifierKeysDown = []
    rPUI.sentenceModifierKey = 17
    progressNode = nodes.progressNode = $$4(progStr)[0]
    rPUI._progressSlider(progressNode)
    indicator = nodes.indicator = $$4(indicatorStr)[0]
    textButton = nodes.textButton = $$4(textButtonStr)[0]
    textContainer = nodes.textContainer = $$4(textContainerStr)[0]
    loading = nodes.loading = $$4(loadingStr)[0]
    playPauseFeedback = nodes.playPauseFeedback = $$4(feedbackStr)[0]
    playFeedback = nodes.playFeedback = $$4(playPauseFeedback).find(
      '#__rdly_play_feedback'
    )[0]
    pauseFeedback = nodes.pauseFeedback = $$4(playPauseFeedback).find(
      '#__rdly_pause_feedback'
    )[0]
    rewindSentence = nodes.rewindSentence = $$4(rewindSentenceStr)[0]
    var coreNodes = coreDisplay.nodes
    $$4(progressNode).appendTo(coreNodes.above)
    $$4(playPauseFeedback).appendTo(coreNodes.barCenter)
    $$4(indicator).appendTo(coreNodes.textElements)
    $$4(textContainer).appendTo(coreNodes.textElements)
    $$4(textButton).appendTo(coreNodes.textElements)
    $$4(loading).appendTo(coreNodes.textElements)
    $$4(controls).appendTo(coreNodes.bar)
    $$4(rewindSentence).appendTo(coreNodes.barLeft)
    playbackCSSstr =
      playbackCSSstr +
      '@font-face { font-family: Clear Sans Light;' +
      'src: url(' +
      fontPath +
      ');}'
    playbackCSSstr = '<style>' + playbackCSSstr + '</style>'
    var $css = $$4(playbackCSSstr)
    $css.appendTo(coreNodes.head)
    coreDisplay.addToTriggerList(rPUI)
    rPUI._addEvents()
    return rPUI
  }
  rPUI._init(coreDisplay)
  return rPUI
}
var PlaybackUI_1 = PlaybackUI

var settingsCSS =
  '/* settings.css\
* \
* Refer to main settings script (currently ReaderlySettings.js\
* on 12/20/16) for DOM structure.\
* \
* Affects main settings, settings modules, and playback.\
* Consider name change.\
* \
* TODO:\
* - More robust defualts\
*/\
\
/* ============================== */\
/* SKIN */\
/* ============================== */\
/* Should this be in readerly-main.css? */\
#__rdly button {\
	position: relative;\
	padding: 0;\
  /* functional */\
  cursor: pointer;\
}\
\
#__rdly button,\
#__rdly label,\
#__rdly input {\
  /* font defaults from chrome inspection */\
  font-size: 15px;\
  line-height: normal;\
  font-style: normal;\
  font-weight: normal;\
  font-variant: none;\
  font-stretch: normal;\
  font-feature-settings: normal;\
  font-kerning: auto;\
  -webkit-font-smoothing: auto;\
  text-transform: none;\
}\
\
#__rdly .__rdly-big-menu-button {\
	width: 3em;\
	height: 3em;\
  /* default followed by desired setting */\
  margin: 0;\
	margin-right: .3em;\
}\
\
.__rdly-sup-menu-button {\
  position: relative;\
  top: 0;\
  right: 0;\
  width: 1.5em;\
  height: 1.5em;\
  margin: 0;\
}\
\
/* Solution to transition? https://stackoverflow.com/questions/3508605/how-can-i-transition-height-0-to-height-auto-using-css#8331169 */\
/* See comments on the thread */\
#__rdly_settings_container {\
  width: 100%;\
  display: flex;\
  flex-direction: column;\
  overflow: hidden;\
}\
\
#__rdly_settings_tabs,\
#__rdly_settings_menus,\
.__rdly_settings_menu {\
	position: relative;\
	width: 100%;\
}\
\
#__rdly_settings_tabs {\
	display: flex;\
	justify-content: center;\
	height: auto;\
  font-size: 1.23em;\
	overflow: hidden;\
}\
\
.__rdly-settings-tab {\
	flex-grow: 1;\
	padding: 0.1em;\
  display: flex;\
  justify-content: center;\
}\
\
#__rdly_settings_menus {\
	height: auto;\
	text-align: center;\
        overflow: hidden;\
}\
\
#__rdly .__rdly-settings-menu {\
  position: relative;\
  display: flex;\
  flex-wrap: wrap;\
  justify-content: space-around;\
  padding: 0 .5%;\
}\
\
#__rdly .__rdly-setting {\
  /* For more visibility, try even more vertical padding */\
  position: relative;\
  /* % causes weird rendering to happen in flexbox (maybe others too?) */\
  /*padding: 1.3% 1.5%;*/\
  padding: 13px;\
}\
\
#__rdly .__rdly-slider-controls {\
  display: flex;\
  align-items: center;\
  margin-top: 0.2rem;\
}\
\
#__rdly .__rdly-slider-input {\
  text-align: center;\
  width: 3.5em;\
  height: 1.6em;\
  font-size: 16px;\
  margin-right: 0.3em;\
  padding: 0;\
}\
\
#__rdly .__rdly-slider {\
  display: inline-block;\
  width: 150px;\
  height: 10px;\
}\
\
\
\
/* ============================== */\
/* SKIN */\
/* ============================== */\
/*#__rdly_below_bar .__rdly-section-open {\
  border-bottom: 0;\
}*/\
\
#__rdly_settings_container {\
	background-color: rgba( 230, 230, 230, 1);\
}\
\
#__rdly_settings_tabs {\
	border-bottom: 1px solid gray;\
}\
#__rdly_settings_tab {\
	border-right: 1px solid gray;\
}\
#__rdly_settings_tabs:last-child {\
	border-right: 0;\
}\
\
\
#__rdly .__rdly-slider-label {\
  font-size: 21px;\
}\
\
#__rdly .__rdly-slider-input {\
  -webkit-border-radius: 3px;\
  -moz-border-radius: 3px;\
  -ms-border-radius: 3px;\
  -o-border-radius: 3px;\
  border-radius: 3px;\
  -webkit-box-shadow: inset 1px 1px 3px rgba(179, 179, 179, 1);\
  -moz-box-shadow: inset 1px 1px 3px rgba(179, 179, 179, 1);\
  box-shadow: inset 1px 1px 3px rgba(179, 179, 179, 1);\
  /* Inset look with better color control */\
  border-top: 2px solid gray;\
  border-left: 2px solid gray;\
  border-right: 2px solid rgba(180,180,180, 1);\
  border-bottom: 2px solid rgba(180,180,180, 1);\
}\
\
#__rdly .__rdly-slider-input:focus {\
  border: 1px solid #3498db;\
  -webkit-border-radius: 2px;\
  -moz-border-radius: 2px;\
  -ms-border-radius: 2px;\
  -o-border-radius: 2px;\
  border-radius: 2px;\
}\
'
var settingsCSS_1 = settingsCSS

var $$5
var settingsCSSstr
$$5 = require$$0
settingsCSSstr = settingsCSS_1
var ReaderlySettings = function(coreDisplay) {
  var rSet = {}
  rSet.settings = {}
  rSet.nodes = {}
  rSet.menuNodes = {}
  rSet._isOpen = false
  var opener, container, menus, tabs
  rSet._hideLoneTab = function() {
    if (Object.keys(rSet.menuNodes).length <= 1) {
      $$5(tabs).addClass('__rdly-hidden')
      $$5(tabs).css({ display: 'none' })
    } else {
      $$5(tabs).removeClass('__rdly-hidden')
      $$5(tabs).css({ display: 'flex' })
    }
    return rSet
  }
  rSet._showMenu = function(evnt) {
    var $thisTab = $$5(evnt.target),
      id = evnt.target.id.replace(/_tab$/, ''),
      $menus = $$5(menus).find('.__rdly-settings-menu'),
      $tabs = $$5(tabs).children(),
      thisMenu = rSet.menuNodes[id]
    $menus.addClass('__rdly-hidden')
    $menus.css({ display: 'none' })
    $$5(thisMenu).removeClass('__rdly-hidden')
    $$5(thisMenu).css({ display: 'flex' })
    $menus.removeClass('__rdly-to-grow')
    $$5(thisMenu).addClass('__rdly-to-grow')
    $tabs.removeClass('__rdly-active-ui')
    $thisTab.addClass('__rdly-active-ui')
    return rSet
  }
  rSet.destroyMenu = function(evnt) {
    var id = evnt.target.id
    $$5(rSet.menuNodes[id]).remove()
    rSet.menuNodes[id] = null
    $$5($$5(tabs).find('#' + id + '_tab')).remove()
    return rSet
  }
  rSet._addTab = function(id, tabText) {
    var html =
        '<div id="' +
        id +
        '_tab" class="__rdly-settings-tab">' +
        tabText +
        '</div>',
      $tab = $$5(html)
    $tab.appendTo(tabs)
    rSet._hideLoneTab()
    $tab.on('touchend click', rSet._showMenu)
    return $tab
  }
  rSet.addMenu = function(menu) {
    var node = menu.node,
      tabText = menu.tabText
    var id = node.id
    if (rSet.menuNodes[id]) {
      console.warn(
        "A settings menu of this id is already in here. Please pick a different id or use mySettingsManager.destroyMenu( 'someID' ) to destroy it. Existing menu:",
        rSet.menuNodes[id]
      )
      return node
    }
    rSet.menuNodes[id] = node
    var $newNode = $$5(node)
    $newNode.addClass('__rdly-settings-menu')
    $$5(menus).append($newNode)
    $newNode[0].addEventListener(
      'destroyOneSettingsMenu',
      rSet._removeMenu,
      false
    )
    rSet.settings[menu.id] = menu
    var $tab = rSet._addTab(id, tabText)
    $$5($$5(tabs).children()[0]).trigger('click')
    return rSet
  }
  rSet._open = function() {
    $$5(coreDisplay.nodes.below).removeClass('__rdly-hidden')
    $$5(opener).addClass('__rdly-active-ui')
    rSet._isOpen = true
    coreDisplay.update()
    return rSet
  }
  rSet.close = function(evnt) {
    $$5(coreDisplay.nodes.below).addClass('__rdly-hidden')
    $$5(opener).removeClass('__rdly-active-ui')
    rSet._isOpen = false
    coreDisplay.update()
    return rSet
  }
  rSet._toggleOpenClose = function() {
    if (rSet._isOpen) {
      rSet.close()
    } else {
      rSet._open()
    }
    return rSet
  }
  rSet._addEvents = function() {
    $$5(opener).on('touchend click', rSet._toggleOpenClose)
    return rSet
  }
  rSet._addBase = function(coreDisplay) {
    var browser = chrome || browser,
      setPath = browser.extension.getURL('images/settings.png')
    var $open = $$5(
        '<button id="__rdly_open_settings" class="__rdly-big-menu-button">\
                                       <img class="__rdly-big-menu-button-image" src="' +
          setPath +
          '"></img>\
                                       </button>'
      ),
      $cont = $$5('<div id="__rdly_settings_container"></div>'),
      $taby = $$5('<div id="__rdly_settings_tabs"></div>'),
      $sets = $$5(
        '<div id="__rdly_settings_menus" class="__rdly-scrollable-y"></div>'
      )
    var coreNodes = coreDisplay.nodes,
      head = coreNodes.head,
      left = coreNodes.barLeft,
      below = coreNodes.below
    var nodes = rSet.nodes
    opener = nodes._openSettings = $open.prependTo(left)[0]
    container = nodes._settingsContainer = $cont.prependTo(below)[0]
    tabs = nodes._tabs = $taby.appendTo($cont)[0]
    menus = nodes._menus = $sets.appendTo($cont)[0]
    settingsCSSstr = '<style>' + settingsCSSstr + '</style>'
    var $css = $$5(settingsCSSstr)
    $css.appendTo(head)
    return rSet
  }
  rSet._init = function(coreDisplay) {
    rSet._addBase(coreDisplay)._addEvents()
    coreDisplay.addToTriggerList(rSet)
    return rSet
  }
  rSet._init(coreDisplay)
  return rSet
}
var ReaderlySettings_1 = ReaderlySettings

var $$6
var noUiSlider$1
$$6 = require$$0
noUiSlider$1 = require$$1
var SpeedSettings = function(settings, coreSettings) {
  var rSpd = {}
  rSpd.node = null
  rSpd.id = 'speedSettings'
  rSpd.tabText = 'Speeds'
  rSpd._nodes = {}
  var nodes = rSpd._nodes
  nodes.wpmInput = null
  nodes.wpmSlider = null
  nodes.sentenceDelayInput = null
  nodes.sentenceDelaySlider = null
  nodes.puncDelayInput = null
  nodes.puncDelaySlider = null
  nodes.longWordDelayInput = null
  nodes.longWordDelaySlider = null
  nodes.numericDelayInput = null
  nodes.numericDelaySlider = null
  rSpd._oneSlider = function(data) {
    $$6(data.sliderNode).addClass('noUi-extended')
    var slider = noUiSlider$1.create(data.sliderNode, {
      range: { min: data.range.min, max: data.range.max },
      start: data.startVal,
      step: data.step,
      connect: 'lower',
      handles: 1,
      behaviour: 'extend-tap',
      serialization: {
        to: [data.inputNode],
        resolution: data.resolution
      }
    })
    data.sliderNode.noUiSlider.on('update', function(values, handle) {
      data.inputNode.value = values[handle]
      settings.set(data.operation, values[handle])
    })
    data.inputNode.addEventListener('change', function() {
      data.sliderNode.noUiSlider.set(this.value)
      settings.set(data.operation, this.value)
    })
    return data.sliderNode
  }
  rSpd._makeSliders = function() {
    var slider = rSpd._oneSlider,
      nodes = rSpd._nodes,
      setts = settings._settings
    slider({
      sliderNode: nodes.wpmSlider,
      range: { min: 25, max: 1000 },
      startVal: setts.wpm,
      step: 25,
      inputNode: nodes.wpmInput,
      resolution: 1,
      operation: 'wpm'
    })
    slider({
      sliderNode: nodes.sentenceDelaySlider,
      range: { min: 1, max: 5 },
      startVal: setts.sentenceDelay,
      step: 0.1,
      inputNode: nodes.sentenceDelayInput,
      resolution: 0.1,
      operation: 'sentenceDelay'
    })
    slider({
      sliderNode: nodes.puncDelaySlider,
      range: { min: 1, max: 1.5 },
      startVal: setts.otherPuncDelay,
      step: 0.1,
      inputNode: nodes.puncDelayInput,
      resolution: 0.1,
      operation: 'otherPuncDelay'
    })
    slider({
      sliderNode: nodes.longWordDelaySlider,
      range: { min: 1, max: 1.5 },
      startVal: setts.longWordDelay,
      step: 0.1,
      inputNode: nodes.longWordDelayInput,
      resolution: 0.1,
      operation: 'longWordDelay'
    })
    slider({
      sliderNode: nodes.numericDelaySlider,
      range: { min: 1, max: 1.5 },
      startVal: setts.numericDelay,
      step: 0.1,
      inputNode: nodes.numericDelayInput,
      resolution: 0.1,
      operation: 'numericDelay'
    })
    return rSpd
  }
  rSpd._assignSettingItems = function() {
    var nodes = rSpd._nodes,
      $menu = $$6(nodes.menu)
    nodes.wpmInput = $menu.find('#__rdly_wpm_input')[0]
    nodes.wpmSlider = $menu.find('#__rdly_wpm_slider')[0]
    nodes.sentenceDelayInput = $menu.find('#__rdly_sentencedelay_input')[0]
    nodes.sentenceDelaySlider = $menu.find('#__rdly_sentencedelay_slider')[0]
    nodes.puncDelayInput = $menu.find('#__rdly_puncdelay_input')[0]
    nodes.puncDelaySlider = $menu.find('#__rdly_puncdelay_slider')[0]
    nodes.longWordDelayInput = $menu.find('#__rdly_longworddelay_input')[0]
    nodes.longWordDelaySlider = $menu.find('#__rdly_longworddelay_slider')[0]
    nodes.numericDelayInput = $menu.find('#__rdly_numericdelay_input')[0]
    nodes.numericDelaySlider = $menu.find('#__rdly_numericdelay_slider')[0]
    return rSpd
  }
  rSpd._oneSetting = function(idName, label) {
    return $$6(
      '<div id="__rdly_' +
        idName +
        '_setting" class="__rdly-setting">\
						<label class="__rdly-slider-label">' +
        label +
        '</label>\
						<div class="__rdly-slider-controls">\
							<input id="__rdly_' +
        idName +
        '_input" class="__rdly-slider-input" type="text"/>\
							<div id="__rdly_' +
        idName +
        '_slider" class="__rdly-slider"></div>\
						</div>\
					</div>'
    )
  }
  rSpd._addNodes = function(coreSettings) {
    var one = rSpd._oneSetting
    var $menu = $$6('<div id="__rdly_speed_settings_menu"></div>')
    rSpd.node = $menu[0]
    coreSettings.addMenu(rSpd)
    rSpd._nodes.menu = $menu[0]
    one('wpm', 'Words Per Minute').appendTo($menu)
    one('sentencedelay', 'Sentence End Delay').appendTo($menu)
    one('puncdelay', 'Punctuation Delay').appendTo($menu)
    one('longworddelay', 'Long Word Delay').appendTo($menu)
    one('numericdelay', 'Special Pattern Delay').appendTo($menu)
    return rSpd
  }
  rSpd._init = function(coreSettings) {
    rSpd._addNodes(coreSettings)
    rSpd._assignSettingItems()
    rSpd._makeSliders()
    return rSpd
  }
  rSpd._init(coreSettings)
  return rSpd
}
var SpeedSettings_1 = SpeedSettings

var $$7
var noUiSlider$2
$$7 = require$$0
noUiSlider$2 = require$$1
var WordSettings = function(settings, coreSettings) {
  var wSets = {}
  wSets.node = null
  wSets.tabText = 'Words'
  wSets._nodes = {}
  var nodes = wSets._nodes
  nodes.maxCharsInput = null
  nodes.maxCharsSlider = null
  wSets._oneSlider = function(data) {
    $$7(data.sliderNode).addClass('noUi-extended')
    var slider = noUiSlider$2.create(data.sliderNode, {
      range: { min: data.range.min, max: data.range.max },
      start: data.startVal,
      step: data.step,
      connect: 'lower',
      handles: 1,
      behaviour: 'extend-tap',
      serialization: {
        to: [data.inputNode],
        resolution: data.resolution
      }
    })
    data.sliderNode.noUiSlider.on('update', function(values, handle) {
      data.inputNode.value = values[handle]
      settings.set(data.operation, values[handle])
    })
    data.inputNode.addEventListener('change', function() {
      data.sliderNode.noUiSlider.set(this.value)
      settings.set(data.operation, this.value)
    })
    return data.sliderNode
  }
  wSets._makeSliders = function() {
    var slider = wSets._oneSlider,
      nodes = wSets._nodes,
      setts = settings._settings
    slider({
      sliderNode: nodes.maxCharsSlider,
      range: { min: 1, max: 25 },
      startVal: setts.maxNumCharacters,
      step: 1,
      inputNode: nodes.maxCharsInput,
      resolution: 1,
      operation: 'maxNumCharacters'
    })
    return wSets
  }
  wSets._assignSettingItems = function() {
    var nodes = wSets._nodes,
      $menu = $$7(nodes.menu)
    nodes.maxCharsInput = $menu.find('#__rdly_maxchars_input')[0]
    nodes.maxCharsSlider = $menu.find('#__rdly_maxchars_slider')[0]
    return wSets
  }
  wSets._oneSetting = function(idName, label) {
    return $$7(
      '<div id="__rdly_' +
        idName +
        '_setting" class="__rdly-setting">\
						<label class="__rdly-slider-label">' +
        label +
        '</label>\
						<div class="__rdly-slider-controls">\
							<input id="__rdly_' +
        idName +
        '_input" class="__rdly-slider-input" type="text"/>\
							<div id="__rdly_' +
        idName +
        '_slider" class="__rdly-slider"></div>\
						</div>\
					</div>'
    )
  }
  wSets._addNodes = function() {
    var one = wSets._oneSetting
    var $menu = $$7('<div id="__rdly_word_settings_menu"></div>')
    wSets.node = $menu[0]
    wSets._nodes.menu = $menu[0]
    one('maxchars', 'Max Letters Shown').appendTo($menu)
    return wSets
  }
  wSets._init = function(coreSettings) {
    wSets._addNodes(coreSettings)
    coreSettings.addMenu(wSets)
    wSets._assignSettingItems()
    wSets._makeSliders()
    return wSets
  }
  wSets._init(coreSettings)
  return wSets
}
var WordSettings_1 = WordSettings

;(function() {
  try {
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
    var textElem
    var speedSetsUI
    var wordSetsUI
    var setts
    $ = require$$0
    Parser = Parser_1
    ParserSetup = ParserSetup_1
    Settings = Settings_1
    Storage = ReaderlyStorage_1
    WordNav = WordNav_1
    WordSplitter = WordSplitter_1
    Delayer = StringTime_1
    Timer = ReaderlyTimer_1
    Display = ReaderlyDisplay_1
    PlaybackUI = PlaybackUI_1
    SettingsUI = ReaderlySettings_1
    SpeedSetsUI = SpeedSettings_1
    WordSetsUI = WordSettings_1
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
    function addEvents() {
      $(timer).on('starting', function showLoading() {
        playback && playback.wait()
      })
    }
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
    }
    function getParser() {
      var pSup = new ParserSetup()
      pSup.debug = false
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
    }
    function init() {
      parser = getParser()
      parser.debug = false
      wordNav = new WordNav()
      storage = new Storage()
      storage.loadAll(afterLoadSettings)
    }
    init()
    function read(node) {
      var sentenceWords = parser.parse(node)
      if (parser.debug) {
        console.log(
          "~~~~~parse debug~~~~~ If any of those tests failed, the problem isn't with Readerly, it's with one of the other libraries. That problem will have to be fixed later."
        )
      }
      wordNav.process(sentenceWords, fragmentor)
      timer.start(wordNav)
      return true
    }
    function openReaderly() {
      coreDisplay.open()
      playback.wait()
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
      var regexp = /[\s]*(<\/p>)[\s]*(<p>)[\s]*/g
      var clonex = clonex.replace(regexp, function(match) {
        return match.replace(/(<\/p>)[\s]*(<p>)/g, '')
      })
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
      articlex.innerHTML = clonex
      read(articlex)
    }
    function findTextNode(node) {
      while (node.textContent === '' && node.parentElement !== null) {
        node = node.parentElement
      }
      return node
    }
    var lastTarget
    var lastSelected
    var selected = []
    function multiSelect(event) {
      lastSelected = undefined
      var target = findTextNode(event.target)
      var index = selected.indexOf(target)
      if (index !== -1) {
        target.classList.remove('__rdly-selected')
        selected.splice(index, 1)
        return
      }
      var contained = selected.some(function(node) {
        return node.contains(target)
      })
      if (contained) return
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
        case 17:
          if (selected.length > 0) {
            finishMultiSelect()
            cleanupSelection()
          }
          break
        case 27:
          cleanupSelection()
          break
        default:
          return
      }
      return false
    }
    function selectionKeyDown(event) {
      switch (event.keyCode) {
        case 17:
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
        if (!storage.match(/<pre[^>]*>/g)) {
          var storage = storage.replace(/<\/pre>/g, '')
        }
        wrapper.innerHTML = storage
        storage = wrapper.innerHTML
        var regexp = /[\u2014-\u2015\u2E3A\u2E3B]/g
        var storage = storage.replace(regexp, function(match) {
          return match.replace(/[-\u2014-\u2015\u2E3A\u2E3B]/g, ' ')
        })
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
        read(splitCode(wrapper))
        cleanupSelection()
      }
      return false
    }
    function getSelection() {
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
    })
  } catch (e) {
    console.debug('Main script failed!', e)
  }
})()
var main = {}

module.exports = main
