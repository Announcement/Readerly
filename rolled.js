'use strict'
function _interopDefault(a) {
  return a && typeof a === 'object' && 'default' in a ? a['default'] : a
}
var require$$0 = _interopDefault(require('jquery')),
  franc = _interopDefault(require('franc')),
  unfluff = _interopDefault(require('@knod/unfluff')),
  sbd = _interopDefault(require('@knod/sbd')),
  require$$1 = _interopDefault(require('@knod/nouislider')),
  $
$ = require$$0
var Parser = function(a, b, c, d, e) {
    var f = {}
    f.language = 'en'
    f.debug = !0
    f.cleanHTML = function(a) {
      a.find('sup').remove()
      a.find('script').remove()
      a.find('style').remove()
      return a
    }
    f.smallSample = function(a, b) {
      var c = $(a),
        d = b / 2 || 500,
        e = c.text()
      e = e.replace(/\s\s+/g, ' ')
      var g = Math.floor(e.length / 6),
        h = g / 2,
        i,
        j
      h > d ? ((j = d * 2), (i = h - d)) : ((j = e.length), (i = 0))
      var k = e.slice(i, i + j)
      f.debug &&
        console.log(
          '~~~parse debug~~~ text sample to send to language detection (Readerly code, not from a library or package):',
          k
        )
      return k
    }
    f.parse = function(g) {
      if (Array.isArray(g)) {
        return g
          .map(a => {
            if (a.splitMethod === 'sentences') {
              var b = a.text,
                b = b.replace(/(\r\n|\n|\r)/gm, ' ')
              return e(b)
            } else if (a.splitMethod === 'lines') {
              return a.text.split('\n').map(a => {
                return [a]
              })
            } else {
              throw new Error(`Received invalid input: ${g}`)
            }
          })
          .reduce((a, b) => {
            return a.concat(b)
          }, [])
      } else {
        var h = ''
        if (typeof g === 'string') h = g
        else {
          var i = $(g),
            j = i.clone()[0],
            k = a(j),
            l = f.smallSample(k),
            m = b(l)
          f.language = m
          h = c(k, m)
        }
        var n = d(h)
        return e(n)
      }
    }
    return f
  },
  Parser_1 = Parser,
  aar = { terminologic: null, iso6391: 'aa', name: 'Afar' },
  abk = { terminologic: null, iso6391: 'ab', name: 'Abkhazian' },
  ace = { terminologic: null, iso6391: null, name: 'Achinese' },
  ach = { terminologic: null, iso6391: null, name: 'Acoli' },
  ada = { terminologic: null, iso6391: null, name: 'Adangme' },
  ady = { terminologic: null, iso6391: null, name: 'Adyghe; Adygei' },
  afa = { terminologic: null, iso6391: null, name: 'Afro-Asiatic languages' },
  afh = { terminologic: null, iso6391: null, name: 'Afrihili' },
  afr = { terminologic: null, iso6391: 'af', name: 'Afrikaans' },
  ain = { terminologic: null, iso6391: null, name: 'Ainu' },
  aka = { terminologic: null, iso6391: 'ak', name: 'Akan' },
  akk = { terminologic: null, iso6391: null, name: 'Akkadian' },
  alb = { terminologic: 'sqi', iso6391: 'sq', name: 'Albanian' },
  ale = { terminologic: null, iso6391: null, name: 'Aleut' },
  alg = { terminologic: null, iso6391: null, name: 'Algonquian languages' },
  als = { terminologic: 'sqi', iso6391: 'sq', name: 'Albanian' },
  alt = { terminologic: null, iso6391: null, name: 'Southern Altai' },
  amh = { terminologic: null, iso6391: 'am', name: 'Amharic' },
  ang = {
    terminologic: null,
    iso6391: null,
    name: 'English, Old (ca.450-1100)'
  },
  anp = { terminologic: null, iso6391: null, name: 'Angika' },
  apa = { terminologic: null, iso6391: null, name: 'Apache languages' },
  ara = { terminologic: null, iso6391: 'ar', name: 'Arabic' },
  arb = { iso6392: 'ara', iso6391: 'ar', name: 'Arabic' },
  arc = {
    terminologic: null,
    iso6391: null,
    name: 'Official Aramaic (700-300 BCE); Imperial Aramaic (700-300 BCE)'
  },
  arg = { terminologic: null, iso6391: 'an', name: 'Aragonese' },
  arm = { terminologic: 'hye', iso6391: 'hy', name: 'Armenian' },
  arn = { terminologic: null, iso6391: null, name: 'Mapudungun; Mapuche' },
  arp = { terminologic: null, iso6391: null, name: 'Arapaho' },
  art = { terminologic: null, iso6391: null, name: 'Artificial languages' },
  arw = { terminologic: null, iso6391: null, name: 'Arawak' },
  asm = { terminologic: null, iso6391: 'as', name: 'Assamese' },
  ast = {
    terminologic: null,
    iso6391: null,
    name: 'Asturian; Bable; Leonese; Asturleonese'
  },
  ath = { terminologic: null, iso6391: null, name: 'Athapascan languages' },
  aus = { terminologic: null, iso6391: null, name: 'Australian languages' },
  ava = { terminologic: null, iso6391: 'av', name: 'Avaric' },
  ave = { terminologic: null, iso6391: 'ae', name: 'Avestan' },
  awa = { terminologic: null, iso6391: null, name: 'Awadhi' },
  aym = { terminologic: null, iso6391: 'ay', name: 'Aymara' },
  aze = { terminologic: null, iso6391: 'az', name: 'Azerbaijani' },
  bad = { terminologic: null, iso6391: null, name: 'Banda languages' },
  bai = { terminologic: null, iso6391: null, name: 'Bamileke languages' },
  bak = { terminologic: null, iso6391: 'ba', name: 'Bashkir' },
  bal = { terminologic: null, iso6391: null, name: 'Baluchi' },
  bam = { terminologic: null, iso6391: 'bm', name: 'Bambara' },
  ban = { terminologic: null, iso6391: null, name: 'Balinese' },
  baq = { terminologic: 'eus', iso6391: 'eu', name: 'Basque' },
  bas = { terminologic: null, iso6391: null, name: 'Basa' },
  bat = { terminologic: null, iso6391: null, name: 'Baltic languages' },
  bej = { terminologic: null, iso6391: null, name: 'Beja; Bedawiyet' },
  bel = { terminologic: null, iso6391: 'be', name: 'Belarusian' },
  bem = { terminologic: null, iso6391: null, name: 'Bemba' },
  ben = { terminologic: null, iso6391: 'bn', name: 'Bengali' },
  ber = { terminologic: null, iso6391: null, name: 'Berber languages' },
  bho = { terminologic: null, iso6391: null, name: 'Bhojpuri' },
  bih = { terminologic: null, iso6391: 'bh', name: 'Bihari languages' },
  bik = { terminologic: null, iso6391: null, name: 'Bikol' },
  bin = { terminologic: null, iso6391: null, name: 'Bini; Edo' },
  bis = { terminologic: null, iso6391: 'bi', name: 'Bislama' },
  bla = { terminologic: null, iso6391: null, name: 'Siksika' },
  bnt = { terminologic: null, iso6391: null, name: 'Bantu (Other)' },
  bod = { bibliographic: 'tib', iso6391: 'bo', name: 'Tibetan' },
  bos = { terminologic: null, iso6391: 'bs', name: 'Bosnian' },
  bra = { terminologic: null, iso6391: null, name: 'Braj' },
  bre = { terminologic: null, iso6391: 'br', name: 'Breton' },
  btk = { terminologic: null, iso6391: null, name: 'Batak languages' },
  bua = { terminologic: null, iso6391: null, name: 'Buriat' },
  bug = { terminologic: null, iso6391: null, name: 'Buginese' },
  bul = { terminologic: null, iso6391: 'bg', name: 'Bulgarian' },
  bur = { terminologic: 'mya', iso6391: 'my', name: 'Burmese' },
  byn = { terminologic: null, iso6391: null, name: 'Blin; Bilin' },
  cad = { terminologic: null, iso6391: null, name: 'Caddo' },
  cai = {
    terminologic: null,
    iso6391: null,
    name: 'Central American Indian languages'
  },
  car = { terminologic: null, iso6391: null, name: 'Galibi Carib' },
  cat = { terminologic: null, iso6391: 'ca', name: 'Catalan; Valencian' },
  cau = { terminologic: null, iso6391: null, name: 'Caucasian languages' },
  ceb = { terminologic: null, iso6391: null, name: 'Cebuano' },
  cel = { terminologic: null, iso6391: null, name: 'Celtic languages' },
  ces = { bibliographic: 'cze', iso6391: 'cs', name: 'Czech' },
  cha = { terminologic: null, iso6391: 'ch', name: 'Chamorro' },
  chb = { terminologic: null, iso6391: null, name: 'Chibcha' },
  che = { terminologic: null, iso6391: 'ce', name: 'Chechen' },
  chg = { terminologic: null, iso6391: null, name: 'Chagatai' },
  chi = { terminologic: 'zho', iso6391: 'zh', name: 'Chinese' },
  chk = { terminologic: null, iso6391: null, name: 'Chuukese' },
  chm = { terminologic: null, iso6391: null, name: 'Mari' },
  chn = { terminologic: null, iso6391: null, name: 'Chinook jargon' },
  cho = { terminologic: null, iso6391: null, name: 'Choctaw' },
  chp = { terminologic: null, iso6391: null, name: 'Chipewyan; Dene Suline' },
  chr = { terminologic: null, iso6391: null, name: 'Cherokee' },
  chu = {
    terminologic: null,
    iso6391: 'cu',
    name:
      'Church Slavic; Old Slavonic; Church Slavonic; Old Bulgarian; Old Church Slavonic'
  },
  chv = { terminologic: null, iso6391: 'cv', name: 'Chuvash' },
  chy = { terminologic: null, iso6391: null, name: 'Cheyenne' },
  cmc = { terminologic: null, iso6391: null, name: 'Chamic languages' },
  cmn = { bibliographic: 'chi', iso6391: 'zh', name: 'Chinese' },
  cop = { terminologic: null, iso6391: null, name: 'Coptic' },
  cor = { terminologic: null, iso6391: 'kw', name: 'Cornish' },
  cos = { terminologic: null, iso6391: 'co', name: 'Corsican' },
  cpe = {
    terminologic: null,
    iso6391: null,
    name: 'Creoles and pidgins, English based'
  },
  cpf = {
    terminologic: null,
    iso6391: null,
    name: 'Creoles and pidgins, French-based '
  },
  cpp = {
    terminologic: null,
    iso6391: null,
    name: 'Creoles and pidgins, Portuguese-based '
  },
  cre = { terminologic: null, iso6391: 'cr', name: 'Cree' },
  crh = {
    terminologic: null,
    iso6391: null,
    name: 'Crimean Tatar; Crimean Turkish'
  },
  crp = { terminologic: null, iso6391: null, name: 'Creoles and pidgins ' },
  csb = { terminologic: null, iso6391: null, name: 'Kashubian' },
  cus = { terminologic: null, iso6391: null, name: 'Cushitic languages' },
  cym = { bibliographic: 'wel', iso6391: 'cy', name: 'Welsh' },
  cze = { terminologic: 'ces', iso6391: 'cs', name: 'Czech' },
  dak = { terminologic: null, iso6391: null, name: 'Dakota' },
  dan = { terminologic: null, iso6391: 'da', name: 'Danish' },
  dar = { terminologic: null, iso6391: null, name: 'Dargwa' },
  day = { terminologic: null, iso6391: null, name: 'Land Dayak languages' },
  del = { terminologic: null, iso6391: null, name: 'Delaware' },
  den = { terminologic: null, iso6391: null, name: 'Slave (Athapascan)' },
  deu = { bibliographic: 'ger', iso6391: 'de', name: 'German' },
  dgr = { terminologic: null, iso6391: null, name: 'Dogrib' },
  din = { terminologic: null, iso6391: null, name: 'Dinka' },
  div = {
    terminologic: null,
    iso6391: 'dv',
    name: 'Divehi; Dhivehi; Maldivian'
  },
  doi = { terminologic: null, iso6391: null, name: 'Dogri' },
  dra = { terminologic: null, iso6391: null, name: 'Dravidian languages' },
  dsb = { terminologic: null, iso6391: null, name: 'Lower Sorbian' },
  dua = { terminologic: null, iso6391: null, name: 'Duala' },
  dum = {
    terminologic: null,
    iso6391: null,
    name: 'Dutch, Middle (ca.1050-1350)'
  },
  dut = { terminologic: 'nld', iso6391: 'nl', name: 'Dutch; Flemish' },
  dyu = { terminologic: null, iso6391: null, name: 'Dyula' },
  dzo = { terminologic: null, iso6391: 'dz', name: 'Dzongkha' },
  efi = { terminologic: null, iso6391: null, name: 'Efik' },
  egy = { terminologic: null, iso6391: null, name: 'Egyptian (Ancient)' },
  eka = { terminologic: null, iso6391: null, name: 'Ekajuk' },
  ell = { bibliographic: 'gre', iso6391: 'el', name: 'Greek, Modern (1453-)' },
  elx = { terminologic: null, iso6391: null, name: 'Elamite' },
  eng = { terminologic: null, iso6391: 'en', name: 'English' },
  enm = {
    terminologic: null,
    iso6391: null,
    name: 'English, Middle (1100-1500)'
  },
  epo = { terminologic: null, iso6391: 'eo', name: 'Esperanto' },
  est = { terminologic: null, iso6391: 'et', name: 'Estonian' },
  eus = { bibliographic: 'baq', iso6391: 'eu', name: 'Basque' },
  ewe = { terminologic: null, iso6391: 'ee', name: 'Ewe' },
  ewo = { terminologic: null, iso6391: null, name: 'Ewondo' },
  fan = { terminologic: null, iso6391: null, name: 'Fang' },
  fao = { terminologic: null, iso6391: 'fo', name: 'Faroese' },
  fas = { bibliographic: 'per', iso6391: 'fa', name: 'Persian' },
  fat = { terminologic: null, iso6391: null, name: 'Fanti' },
  fij = { terminologic: null, iso6391: 'fj', name: 'Fijian' },
  fil = { terminologic: null, iso6391: null, name: 'Filipino; Pilipino' },
  fin = { terminologic: null, iso6391: 'fi', name: 'Finnish' },
  fiu = { terminologic: null, iso6391: null, name: 'Finno-Ugrian languages' },
  fon = { terminologic: null, iso6391: null, name: 'Fon' },
  fra = { bibliographic: 'fre', iso6391: 'fr', name: 'French' },
  fre = { terminologic: 'fra', iso6391: 'fr', name: 'French' },
  frm = {
    terminologic: null,
    iso6391: null,
    name: 'French, Middle (ca.1400-1600)'
  },
  fro = {
    terminologic: null,
    iso6391: null,
    name: 'French, Old (842-ca.1400)'
  },
  frr = { terminologic: null, iso6391: null, name: 'Northern Frisian' },
  frs = { terminologic: null, iso6391: null, name: 'Eastern Frisian' },
  fry = { terminologic: null, iso6391: 'fy', name: 'Western Frisian' },
  ful = { terminologic: null, iso6391: 'ff', name: 'Fulah' },
  fur = { terminologic: null, iso6391: null, name: 'Friulian' },
  gaa = { terminologic: null, iso6391: null, name: 'Ga' },
  gay = { terminologic: null, iso6391: null, name: 'Gayo' },
  gba = { terminologic: null, iso6391: null, name: 'Gbaya' },
  gem = { terminologic: null, iso6391: null, name: 'Germanic languages' },
  geo = { terminologic: 'kat', iso6391: 'ka', name: 'Georgian' },
  ger = { terminologic: 'deu', iso6391: 'de', name: 'German' },
  gez = { terminologic: null, iso6391: null, name: 'Geez' },
  gil = { terminologic: null, iso6391: null, name: 'Gilbertese' },
  gla = { terminologic: null, iso6391: 'gd', name: 'Gaelic; Scottish Gaelic' },
  gle = { terminologic: null, iso6391: 'ga', name: 'Irish' },
  glg = { terminologic: null, iso6391: 'gl', name: 'Galician' },
  glv = { terminologic: null, iso6391: 'gv', name: 'Manx' },
  gmh = {
    terminologic: null,
    iso6391: null,
    name: 'German, Middle High (ca.1050-1500)'
  },
  goh = {
    terminologic: null,
    iso6391: null,
    name: 'German, Old High (ca.750-1050)'
  },
  gon = { terminologic: null, iso6391: null, name: 'Gondi' },
  gor = { terminologic: null, iso6391: null, name: 'Gorontalo' },
  got = { terminologic: null, iso6391: null, name: 'Gothic' },
  grb = { terminologic: null, iso6391: null, name: 'Grebo' },
  grc = { terminologic: null, iso6391: null, name: 'Greek, Ancient (to 1453)' },
  gre = { terminologic: 'ell', iso6391: 'el', name: 'Greek, Modern (1453-)' },
  grn = { terminologic: null, iso6391: 'gn', name: 'Guarani' },
  gsw = {
    terminologic: null,
    iso6391: null,
    name: 'Swiss German; Alemannic; Alsatian'
  },
  guj = { terminologic: null, iso6391: 'gu', name: 'Gujarati' },
  gwi = { terminologic: null, iso6391: null, name: "Gwich'in" },
  hai = { terminologic: null, iso6391: null, name: 'Haida' },
  hat = { terminologic: null, iso6391: 'ht', name: 'Haitian; Haitian Creole' },
  hau = { terminologic: null, iso6391: 'ha', name: 'Hausa' },
  haw = { terminologic: null, iso6391: null, name: 'Hawaiian' },
  heb = { terminologic: null, iso6391: 'he', name: 'Hebrew' },
  her = { terminologic: null, iso6391: 'hz', name: 'Herero' },
  hil = { terminologic: null, iso6391: null, name: 'Hiligaynon' },
  him = {
    terminologic: null,
    iso6391: null,
    name: 'Himachali languages; Western Pahari languages'
  },
  hin = { terminologic: null, iso6391: 'hi', name: 'Hindi' },
  hit = { terminologic: null, iso6391: null, name: 'Hittite' },
  hmn = { terminologic: null, iso6391: null, name: 'Hmong; Mong' },
  hmo = { terminologic: null, iso6391: 'ho', name: 'Hiri Motu' },
  hrv = { terminologic: null, iso6391: 'hr', name: 'Croatian' },
  hsb = { terminologic: null, iso6391: null, name: 'Upper Sorbian' },
  hun = { terminologic: null, iso6391: 'hu', name: 'Hungarian' },
  hup = { terminologic: null, iso6391: null, name: 'Hupa' },
  hye = { bibliographic: 'arm', iso6391: 'hy', name: 'Armenian' },
  iba = { terminologic: null, iso6391: null, name: 'Iban' },
  ibo = { terminologic: null, iso6391: 'ig', name: 'Igbo' },
  ice = { terminologic: 'isl', iso6391: 'is', name: 'Icelandic' },
  ido = { terminologic: null, iso6391: 'io', name: 'Ido' },
  iii = { terminologic: null, iso6391: 'ii', name: 'Sichuan Yi; Nuosu' },
  ijo = { terminologic: null, iso6391: null, name: 'Ijo languages' },
  iku = { terminologic: null, iso6391: 'iu', name: 'Inuktitut' },
  ile = { terminologic: null, iso6391: 'ie', name: 'Interlingue; Occidental' },
  ilo = { terminologic: null, iso6391: null, name: 'Iloko' },
  ina = {
    terminologic: null,
    iso6391: 'ia',
    name: 'Interlingua (International Auxiliary Language Association)'
  },
  inc = { terminologic: null, iso6391: null, name: 'Indic languages' },
  ind = { terminologic: null, iso6391: 'id', name: 'Indonesian' },
  ine = { terminologic: null, iso6391: null, name: 'Indo-European languages' },
  inh = { terminologic: null, iso6391: null, name: 'Ingush' },
  ipk = { terminologic: null, iso6391: 'ik', name: 'Inupiaq' },
  ira = { terminologic: null, iso6391: null, name: 'Iranian languages' },
  iro = { terminologic: null, iso6391: null, name: 'Iroquoian languages' },
  isl = { bibliographic: 'ice', iso6391: 'is', name: 'Icelandic' },
  ita = { terminologic: null, iso6391: 'it', name: 'Italian' },
  jav = { terminologic: null, iso6391: 'jv', name: 'Javanese' },
  jbo = { terminologic: null, iso6391: null, name: 'Lojban' },
  jpn = { terminologic: null, iso6391: 'ja', name: 'Japanese' },
  jpr = { terminologic: null, iso6391: null, name: 'Judeo-Persian' },
  jrb = { terminologic: null, iso6391: null, name: 'Judeo-Arabic' },
  kaa = { terminologic: null, iso6391: null, name: 'Kara-Kalpak' },
  kab = { terminologic: null, iso6391: null, name: 'Kabyle' },
  kac = { terminologic: null, iso6391: null, name: 'Kachin; Jingpho' },
  kal = { terminologic: null, iso6391: 'kl', name: 'Kalaallisut; Greenlandic' },
  kam = { terminologic: null, iso6391: null, name: 'Kamba' },
  kan = { terminologic: null, iso6391: 'kn', name: 'Kannada' },
  kar = { terminologic: null, iso6391: null, name: 'Karen languages' },
  kas = { terminologic: null, iso6391: 'ks', name: 'Kashmiri' },
  kat = { bibliographic: 'geo', iso6391: 'ka', name: 'Georgian' },
  kau = { terminologic: null, iso6391: 'kr', name: 'Kanuri' },
  kaw = { terminologic: null, iso6391: null, name: 'Kawi' },
  kaz = { terminologic: null, iso6391: 'kk', name: 'Kazakh' },
  kbd = { terminologic: null, iso6391: null, name: 'Kabardian' },
  kha = { terminologic: null, iso6391: null, name: 'Khasi' },
  khi = { terminologic: null, iso6391: null, name: 'Khoisan languages' },
  khm = { terminologic: null, iso6391: 'km', name: 'Central Khmer' },
  kho = { terminologic: null, iso6391: null, name: 'Khotanese; Sakan' },
  kik = { terminologic: null, iso6391: 'ki', name: 'Kikuyu; Gikuyu' },
  kin = { terminologic: null, iso6391: 'rw', name: 'Kinyarwanda' },
  kir = { terminologic: null, iso6391: 'ky', name: 'Kirghiz; Kyrgyz' },
  kmb = { terminologic: null, iso6391: null, name: 'Kimbundu' },
  kok = { terminologic: null, iso6391: null, name: 'Konkani' },
  kom = { terminologic: null, iso6391: 'kv', name: 'Komi' },
  kon = { terminologic: null, iso6391: 'kg', name: 'Kongo' },
  kor = { terminologic: null, iso6391: 'ko', name: 'Korean' },
  kos = { terminologic: null, iso6391: null, name: 'Kosraean' },
  kpe = { terminologic: null, iso6391: null, name: 'Kpelle' },
  krc = { terminologic: null, iso6391: null, name: 'Karachay-Balkar' },
  krl = { terminologic: null, iso6391: null, name: 'Karelian' },
  kro = { terminologic: null, iso6391: null, name: 'Kru languages' },
  kru = { terminologic: null, iso6391: null, name: 'Kurukh' },
  kua = { terminologic: null, iso6391: 'kj', name: 'Kuanyama; Kwanyama' },
  kum = { terminologic: null, iso6391: null, name: 'Kumyk' },
  kur = { terminologic: null, iso6391: 'ku', name: 'Kurdish' },
  kut = { terminologic: null, iso6391: null, name: 'Kutenai' },
  lad = { terminologic: null, iso6391: null, name: 'Ladino' },
  lah = { terminologic: null, iso6391: null, name: 'Lahnda' },
  lam = { terminologic: null, iso6391: null, name: 'Lamba' },
  lao = { terminologic: null, iso6391: 'lo', name: 'Lao' },
  lat = { terminologic: null, iso6391: 'la', name: 'Latin' },
  lav = { terminologic: null, iso6391: 'lv', name: 'Latvian' },
  lez = { terminologic: null, iso6391: null, name: 'Lezghian' },
  lim = {
    terminologic: null,
    iso6391: 'li',
    name: 'Limburgan; Limburger; Limburgish'
  },
  lin = { terminologic: null, iso6391: 'ln', name: 'Lingala' },
  lit = { terminologic: null, iso6391: 'lt', name: 'Lithuanian' },
  lol = { terminologic: null, iso6391: null, name: 'Mongo' },
  loz = { terminologic: null, iso6391: null, name: 'Lozi' },
  ltz = {
    terminologic: null,
    iso6391: 'lb',
    name: 'Luxembourgish; Letzeburgesch'
  },
  lua = { terminologic: null, iso6391: null, name: 'Luba-Lulua' },
  lub = { terminologic: null, iso6391: 'lu', name: 'Luba-Katanga' },
  lug = { terminologic: null, iso6391: 'lg', name: 'Ganda' },
  lui = { terminologic: null, iso6391: null, name: 'Luiseno' },
  lun = { terminologic: null, iso6391: null, name: 'Lunda' },
  luo = { terminologic: null, iso6391: null, name: 'Luo (Kenya and Tanzania)' },
  lus = { terminologic: null, iso6391: null, name: 'Lushai' },
  mac = { terminologic: 'mkd', iso6391: 'mk', name: 'Macedonian' },
  mad = { terminologic: null, iso6391: null, name: 'Madurese' },
  mag = { terminologic: null, iso6391: null, name: 'Magahi' },
  mah = { terminologic: null, iso6391: 'mh', name: 'Marshallese' },
  mai = { terminologic: null, iso6391: null, name: 'Maithili' },
  mak = { terminologic: null, iso6391: null, name: 'Makasar' },
  mal = { terminologic: null, iso6391: 'ml', name: 'Malayalam' },
  man = { terminologic: null, iso6391: null, name: 'Mandingo' },
  mao = { terminologic: 'mri', iso6391: 'mi', name: 'Maori' },
  map = { terminologic: null, iso6391: null, name: 'Austronesian languages' },
  mar = { terminologic: null, iso6391: 'mr', name: 'Marathi' },
  mas = { terminologic: null, iso6391: null, name: 'Masai' },
  may = { terminologic: 'msa', iso6391: 'ms', name: 'Malay' },
  mdf = { terminologic: null, iso6391: null, name: 'Moksha' },
  mdr = { terminologic: null, iso6391: null, name: 'Mandar' },
  men = { terminologic: null, iso6391: null, name: 'Mende' },
  mga = { terminologic: null, iso6391: null, name: 'Irish, Middle (900-1200)' },
  mic = { terminologic: null, iso6391: null, name: "Mi'kmaq; Micmac" },
  min = { terminologic: null, iso6391: null, name: 'Minangkabau' },
  mis = { terminologic: null, iso6391: null, name: 'Uncoded languages' },
  mkd = { bibliographic: 'mac', iso6391: 'mk', name: 'Macedonian' },
  mkh = { terminologic: null, iso6391: null, name: 'Mon-Khmer languages' },
  mlg = { terminologic: null, iso6391: 'mg', name: 'Malagasy' },
  mlt = { terminologic: null, iso6391: 'mt', name: 'Maltese' },
  mnc = { terminologic: null, iso6391: null, name: 'Manchu' },
  mni = { terminologic: null, iso6391: null, name: 'Manipuri' },
  mno = { terminologic: null, iso6391: null, name: 'Manobo languages' },
  moh = { terminologic: null, iso6391: null, name: 'Mohawk' },
  mon = { terminologic: null, iso6391: 'mn', name: 'Mongolian' },
  mos = { terminologic: null, iso6391: null, name: 'Mossi' },
  mri = { bibliographic: 'mao', iso6391: 'mi', name: 'Maori' },
  msa = { bibliographic: 'may', iso6391: 'ms', name: 'Malay' },
  mul = { terminologic: null, iso6391: null, name: 'Multiple languages' },
  mun = { terminologic: null, iso6391: null, name: 'Munda languages' },
  mus = { terminologic: null, iso6391: null, name: 'Creek' },
  mwl = { terminologic: null, iso6391: null, name: 'Mirandese' },
  mwr = { terminologic: null, iso6391: null, name: 'Marwari' },
  mya = { bibliographic: 'bur', iso6391: 'my', name: 'Burmese' },
  myn = { terminologic: null, iso6391: null, name: 'Mayan languages' },
  myv = { terminologic: null, iso6391: null, name: 'Erzya' },
  nah = { terminologic: null, iso6391: null, name: 'Nahuatl languages' },
  nai = {
    terminologic: null,
    iso6391: null,
    name: 'North American Indian languages'
  },
  nap = { terminologic: null, iso6391: null, name: 'Neapolitan' },
  nau = { terminologic: null, iso6391: 'na', name: 'Nauru' },
  nav = { terminologic: null, iso6391: 'nv', name: 'Navajo; Navaho' },
  nbl = {
    terminologic: null,
    iso6391: 'nr',
    name: 'Ndebele, South; South Ndebele'
  },
  nde = {
    terminologic: null,
    iso6391: 'nd',
    name: 'Ndebele, North; North Ndebele'
  },
  ndo = { terminologic: null, iso6391: 'ng', name: 'Ndonga' },
  nds = {
    terminologic: null,
    iso6391: null,
    name: 'Low German; Low Saxon; German, Low; Saxon, Low'
  },
  nep = { terminologic: null, iso6391: 'ne', name: 'Nepali' },
  nia = { terminologic: null, iso6391: null, name: 'Nias' },
  nic = {
    terminologic: null,
    iso6391: null,
    name: 'Niger-Kordofanian languages'
  },
  niu = { terminologic: null, iso6391: null, name: 'Niuean' },
  nld = { bibliographic: 'dut', iso6391: 'nl', name: 'Dutch; Flemish' },
  nno = {
    terminologic: null,
    iso6391: 'nn',
    name: 'Norwegian Nynorsk; Nynorsk, Norwegian'
  },
  nob = {
    terminologic: null,
    iso6391: 'nb',
    name: 'Bokmål, Norwegian; Norwegian Bokmål'
  },
  nog = { terminologic: null, iso6391: null, name: 'Nogai' },
  non = { terminologic: null, iso6391: null, name: 'Norse, Old' },
  nor = { terminologic: null, iso6391: 'no', name: 'Norwegian' },
  nqo = { terminologic: null, iso6391: null, name: "N'Ko" },
  nso = {
    terminologic: null,
    iso6391: null,
    name: 'Pedi; Sepedi; Northern Sotho'
  },
  nub = { terminologic: null, iso6391: null, name: 'Nubian languages' },
  nwc = {
    terminologic: null,
    iso6391: null,
    name: 'Classical Newari; Old Newari; Classical Nepal Bhasa'
  },
  nya = { terminologic: null, iso6391: 'ny', name: 'Chichewa; Chewa; Nyanja' },
  nym = { terminologic: null, iso6391: null, name: 'Nyamwezi' },
  nyn = { terminologic: null, iso6391: null, name: 'Nyankole' },
  nyo = { terminologic: null, iso6391: null, name: 'Nyoro' },
  nzi = { terminologic: null, iso6391: null, name: 'Nzima' },
  oci = {
    terminologic: null,
    iso6391: 'oc',
    name: 'Occitan (post 1500); Provençal'
  },
  oji = { terminologic: null, iso6391: 'oj', name: 'Ojibwa' },
  ori = { terminologic: null, iso6391: 'or', name: 'Oriya' },
  orm = { terminologic: null, iso6391: 'om', name: 'Oromo' },
  osa = { terminologic: null, iso6391: null, name: 'Osage' },
  oss = { terminologic: null, iso6391: 'os', name: 'Ossetian; Ossetic' },
  ota = {
    terminologic: null,
    iso6391: null,
    name: 'Turkish, Ottoman (1500-1928)'
  },
  oto = { terminologic: null, iso6391: null, name: 'Otomian languages' },
  paa = { terminologic: null, iso6391: null, name: 'Papuan languages' },
  pag = { terminologic: null, iso6391: null, name: 'Pangasinan' },
  pal = { terminologic: null, iso6391: null, name: 'Pahlavi' },
  pam = { terminologic: null, iso6391: null, name: 'Pampanga; Kapampangan' },
  pan = { terminologic: null, iso6391: 'pa', name: 'Panjabi; Punjabi' },
  pap = { terminologic: null, iso6391: null, name: 'Papiamento' },
  pau = { terminologic: null, iso6391: null, name: 'Palauan' },
  peo = {
    terminologic: null,
    iso6391: null,
    name: 'Persian, Old (ca.600-400 B.C.)'
  },
  per = { terminologic: 'fas', iso6391: 'fa', name: 'Persian' },
  phi = { terminologic: null, iso6391: null, name: 'Philippine languages' },
  phn = { terminologic: null, iso6391: null, name: 'Phoenician' },
  pli = { terminologic: null, iso6391: 'pi', name: 'Pali' },
  pol = { terminologic: null, iso6391: 'pl', name: 'Polish' },
  pon = { terminologic: null, iso6391: null, name: 'Pohnpeian' },
  por = { terminologic: null, iso6391: 'pt', name: 'Portuguese' },
  pra = { terminologic: null, iso6391: null, name: 'Prakrit languages' },
  pro = { terminologic: null, iso6391: null, name: 'Provençal, Old (to 1500)' },
  pus = { terminologic: null, iso6391: 'ps', name: 'Pushto; Pashto' },
  que = { terminologic: null, iso6391: 'qu', name: 'Quechua' },
  raj = { terminologic: null, iso6391: null, name: 'Rajasthani' },
  rap = { terminologic: null, iso6391: null, name: 'Rapanui' },
  rar = {
    terminologic: null,
    iso6391: null,
    name: 'Rarotongan; Cook Islands Maori'
  },
  roa = { terminologic: null, iso6391: null, name: 'Romance languages' },
  roh = { terminologic: null, iso6391: 'rm', name: 'Romansh' },
  rom = { terminologic: null, iso6391: null, name: 'Romany' },
  ron = {
    bibliographic: 'rum',
    iso6391: 'ro',
    name: 'Romanian; Moldavian; Moldovan'
  },
  rum = {
    terminologic: 'ron',
    iso6391: 'ro',
    name: 'Romanian; Moldavian; Moldovan'
  },
  run = { terminologic: null, iso6391: 'rn', name: 'Rundi' },
  rup = {
    terminologic: null,
    iso6391: null,
    name: 'Aromanian; Arumanian; Macedo-Romanian'
  },
  rus = { terminologic: null, iso6391: 'ru', name: 'Russian' },
  sad = { terminologic: null, iso6391: null, name: 'Sandawe' },
  sag = { terminologic: null, iso6391: 'sg', name: 'Sango' },
  sah = { terminologic: null, iso6391: null, name: 'Yakut' },
  sai = {
    terminologic: null,
    iso6391: null,
    name: 'South American Indian (Other)'
  },
  sal = { terminologic: null, iso6391: null, name: 'Salishan languages' },
  sam = { terminologic: null, iso6391: null, name: 'Samaritan Aramaic' },
  san = { terminologic: null, iso6391: 'sa', name: 'Sanskrit' },
  sas = { terminologic: null, iso6391: null, name: 'Sasak' },
  sat = { terminologic: null, iso6391: null, name: 'Santali' },
  scn = { terminologic: null, iso6391: null, name: 'Sicilian' },
  sco = { terminologic: null, iso6391: null, name: 'Scots' },
  sel = { terminologic: null, iso6391: null, name: 'Selkup' },
  sem = { terminologic: null, iso6391: null, name: 'Semitic languages' },
  sga = { terminologic: null, iso6391: null, name: 'Irish, Old (to 900)' },
  sgn = { terminologic: null, iso6391: null, name: 'Sign Languages' },
  shn = { terminologic: null, iso6391: null, name: 'Shan' },
  sid = { terminologic: null, iso6391: null, name: 'Sidamo' },
  sin = { terminologic: null, iso6391: 'si', name: 'Sinhala; Sinhalese' },
  sio = { terminologic: null, iso6391: null, name: 'Siouan languages' },
  sit = { terminologic: null, iso6391: null, name: 'Sino-Tibetan languages' },
  sla = { terminologic: null, iso6391: null, name: 'Slavic languages' },
  slo = { terminologic: 'slk', iso6391: 'sk', name: 'Slovak' },
  slk = { bibliographic: 'slo', iso6391: 'sk', name: 'Slovak' },
  slv = { terminologic: null, iso6391: 'sl', name: 'Slovenian' },
  sma = { terminologic: null, iso6391: null, name: 'Southern Sami' },
  sme = { terminologic: null, iso6391: 'se', name: 'Northern Sami' },
  smi = { terminologic: null, iso6391: null, name: 'Sami languages' },
  smj = { terminologic: null, iso6391: null, name: 'Lule Sami' },
  smn = { terminologic: null, iso6391: null, name: 'Inari Sami' },
  smo = { terminologic: null, iso6391: 'sm', name: 'Samoan' },
  sms = { terminologic: null, iso6391: null, name: 'Skolt Sami' },
  sna = { terminologic: null, iso6391: 'sn', name: 'Shona' },
  snd = { terminologic: null, iso6391: 'sd', name: 'Sindhi' },
  snk = { terminologic: null, iso6391: null, name: 'Soninke' },
  sog = { terminologic: null, iso6391: null, name: 'Sogdian' },
  som = { terminologic: null, iso6391: 'so', name: 'Somali' },
  son = { terminologic: null, iso6391: null, name: 'Songhai languages' },
  sot = { terminologic: null, iso6391: 'st', name: 'Sotho, Southern' },
  spa = { terminologic: null, iso6391: 'es', name: 'Spanish; Castilian' },
  sqi = { bibliographic: 'alb', iso6391: 'sq', name: 'Albanian' },
  srd = { terminologic: null, iso6391: 'sc', name: 'Sardinian' },
  srn = { terminologic: null, iso6391: null, name: 'Sranan Tongo' },
  srp = { terminologic: null, iso6391: 'sr', name: 'Serbian' },
  srr = { terminologic: null, iso6391: null, name: 'Serer' },
  ssa = { terminologic: null, iso6391: null, name: 'Nilo-Saharan languages' },
  ssw = { terminologic: null, iso6391: 'ss', name: 'Swati' },
  suk = { terminologic: null, iso6391: null, name: 'Sukuma' },
  sun = { terminologic: null, iso6391: 'su', name: 'Sundanese' },
  sus = { terminologic: null, iso6391: null, name: 'Susu' },
  sux = { terminologic: null, iso6391: null, name: 'Sumerian' },
  swa = { terminologic: null, iso6391: 'sw', name: 'Swahili' },
  swe = { terminologic: null, iso6391: 'sv', name: 'Swedish' },
  syc = { terminologic: null, iso6391: null, name: 'Classical Syriac' },
  syr = { terminologic: null, iso6391: null, name: 'Syriac' },
  tah = { terminologic: null, iso6391: 'ty', name: 'Tahitian' },
  tai = { terminologic: null, iso6391: null, name: 'Tai languages' },
  tam = { terminologic: null, iso6391: 'ta', name: 'Tamil' },
  tat = { terminologic: null, iso6391: 'tt', name: 'Tatar' },
  tel = { terminologic: null, iso6391: 'te', name: 'Telugu' },
  tem = { terminologic: null, iso6391: null, name: 'Timne' },
  ter = { terminologic: null, iso6391: null, name: 'Tereno' },
  tet = { terminologic: null, iso6391: null, name: 'Tetum' },
  tgk = { terminologic: null, iso6391: 'tg', name: 'Tajik' },
  tgl = { terminologic: null, iso6391: 'tl', name: 'Tagalog' },
  tha = { terminologic: null, iso6391: 'th', name: 'Thai' },
  tib = { terminologic: 'bod', iso6391: 'bo', name: 'Tibetan' },
  tig = { terminologic: null, iso6391: null, name: 'Tigre' },
  tir = { terminologic: null, iso6391: 'ti', name: 'Tigrinya' },
  tiv = { terminologic: null, iso6391: null, name: 'Tiv' },
  tkl = { terminologic: null, iso6391: null, name: 'Tokelau' },
  tlh = { terminologic: null, iso6391: null, name: 'Klingon; tlhIngan-Hol' },
  tli = { terminologic: null, iso6391: null, name: 'Tlingit' },
  tmh = { terminologic: null, iso6391: null, name: 'Tamashek' },
  tog = { terminologic: null, iso6391: null, name: 'Tonga (Nyasa)' },
  ton = { terminologic: null, iso6391: 'to', name: 'Tonga (Tonga Islands)' },
  tpi = { terminologic: null, iso6391: null, name: 'Tok Pisin' },
  tsi = { terminologic: null, iso6391: null, name: 'Tsimshian' },
  tsn = { terminologic: null, iso6391: 'tn', name: 'Tswana' },
  tso = { terminologic: null, iso6391: 'ts', name: 'Tsonga' },
  tuk = { terminologic: null, iso6391: 'tk', name: 'Turkmen' },
  tum = { terminologic: null, iso6391: null, name: 'Tumbuka' },
  tup = { terminologic: null, iso6391: null, name: 'Tupi languages' },
  tur = { terminologic: null, iso6391: 'tr', name: 'Turkish' },
  tut = { terminologic: null, iso6391: null, name: 'Altaic languages' },
  tvl = { terminologic: null, iso6391: null, name: 'Tuvalu' },
  twi = { terminologic: null, iso6391: 'tw', name: 'Twi' },
  tyv = { terminologic: null, iso6391: null, name: 'Tuvinian' },
  udm = { terminologic: null, iso6391: null, name: 'Udmurt' },
  uga = { terminologic: null, iso6391: null, name: 'Ugaritic' },
  uig = { terminologic: null, iso6391: 'ug', name: 'Uighur; Uyghur' },
  ukr = { terminologic: null, iso6391: 'uk', name: 'Ukrainian' },
  umb = { terminologic: null, iso6391: null, name: 'Umbundu' },
  und = { terminologic: null, iso6391: null, name: 'Undetermined' },
  urd = { terminologic: null, iso6391: 'ur', name: 'Urdu' },
  uzb = { terminologic: null, iso6391: 'uz', name: 'Uzbek' },
  vai = { terminologic: null, iso6391: null, name: 'Vai' },
  ven = { terminologic: null, iso6391: 've', name: 'Venda' },
  vie = { terminologic: null, iso6391: 'vi', name: 'Vietnamese' },
  vol = { terminologic: null, iso6391: 'vo', name: 'Volapük' },
  vot = { terminologic: null, iso6391: null, name: 'Votic' },
  wak = { terminologic: null, iso6391: null, name: 'Wakashan languages' },
  wal = { terminologic: null, iso6391: null, name: 'Walamo' },
  war = { terminologic: null, iso6391: null, name: 'Waray' },
  was = { terminologic: null, iso6391: null, name: 'Washo' },
  wel = { terminologic: 'cym', iso6391: 'cy', name: 'Welsh' },
  wen = { terminologic: null, iso6391: null, name: 'Sorbian languages' },
  wln = { terminologic: null, iso6391: 'wa', name: 'Walloon' },
  wol = { terminologic: null, iso6391: 'wo', name: 'Wolof' },
  xal = { terminologic: null, iso6391: null, name: 'Kalmyk; Oirat' },
  xho = { terminologic: null, iso6391: 'xh', name: 'Xhosa' },
  yao = { terminologic: null, iso6391: null, name: 'Yao' },
  yap = { terminologic: null, iso6391: null, name: 'Yapese' },
  yid = { terminologic: null, iso6391: 'yi', name: 'Yiddish' },
  yor = { terminologic: null, iso6391: 'yo', name: 'Yoruba' },
  ypk = { terminologic: null, iso6391: null, name: 'Yupik languages' },
  zap = { terminologic: null, iso6391: null, name: 'Zapotec' },
  zbl = {
    terminologic: null,
    iso6391: null,
    name: 'Blissymbols; Blissymbolics; Bliss'
  },
  zen = { terminologic: null, iso6391: null, name: 'Zenaga' },
  zgh = {
    terminologic: null,
    iso6391: null,
    name: 'Standard Moroccan Tamazight'
  },
  zha = { terminologic: null, iso6391: 'za', name: 'Zhuang; Chuang' },
  zho = { bibliographic: 'chi', iso6391: 'zh', name: 'Chinese' },
  znd = { terminologic: null, iso6391: null, name: 'Zande languages' },
  zul = { terminologic: null, iso6391: 'zu', name: 'Zulu' },
  zun = { terminologic: null, iso6391: null, name: 'Zuni' },
  zxx = {
    terminologic: null,
    iso6391: null,
    name: 'No linguistic content; Not applicable'
  },
  zza = {
    terminologic: null,
    iso6391: null,
    name: 'Zaza; Dimili; Dimli; Kirdki; Kirmanjki; Zazaki'
  },
  iso639 = {
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
  },
  iso639$1 = Object.freeze({
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
  }),
  require$$2 = (iso639$1 && iso639) || iso639$1,
  $$1,
  franc$1,
  langCodes,
  unfluff$1,
  sbd$1
$$1 = require$$0
franc$1 = franc
langCodes = require$$2
unfluff$1 = unfluff
sbd$1 = sbd
var ParserSetup = function() {
    var a
    console.debug('ParserSetup Initialize')
    a = {}
    a.debug = !1
    a.cleanNode = function(a) {
      console.debug('rSup.cleanNode')
      var b = $$1(a),
        c = ['sup', 'script', 'style', 'head']
      for (let a = 0; a < c.length; a++) {
        let d = c[a]
        b.find(d).remove()
      }
      return b[0]
    }
    a.detectLanguage = function(b) {
      console.debug('rSup.detectLanguage')
      var c = franc$1(b, {
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
      c === 'und' && (c = 'eng')
      var d = langCodes[c].iso6391
      a.debug && console.log('~~~parse debug~~~ language detected:', c, '->', d)
      return d
    }
    a.findArticle = function(b, c) {
      console.debug('rSup.findArticle')
      var d = $$1(b).html(),
        e = unfluff$1.lazy(d, c),
        f = e.text()
      f = f.replace(/(\r\n|\n|\r)/gm, ' ')
      f = f.replace(/\s\s+/g, ' ')
      f || (f = $$1(b).text())
      a.debug &&
        console.log('~~~parse debug~~~ article text identified (a string):', f)
      return f
    }
    a.cleanText = function(b) {
      console.debug('rSup.cleanText')
      var c = b,
        d = /[“]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[“]/g, '"')
        }),
        d = /[”]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[”]/g, '"')
        }),
        d = /['][\s]+["]+[\s]/g,
        c = c.replace(d, function(a) {
          return a.replace(/['][\s]+/g, "'") + ' '
        }),
        c = c.replace(/[\s]+[*]+(?=[A-Z])/g, ' '),
        c = c.replace(/[\s]+[*]+[\s]+(?=[A-Z])/g, ' '),
        c = c.replace(/[.](?=[A-Z])/g, '. '),
        c = c.replace(/[\s]+[.](?=[A-Z])/g, '. '),
        c = c.replace(/[\s]+[.](?=[\s])+(?![A-Z])/g, '. '),
        c = c.replace(/[.](?=[A-Z])/g, '. '),
        c = c.replace(/[.][\s+]+(?=[A-Z])/g, '. '),
        c = c.replace(/[\s]+[.](?![\s])+(?=[.])/g, '.'),
        c = c.replace(/[\s]+[.](?![\s])+(?=[a-z]|[A-Z])/g, '.'),
        c = c.replace(/[:](?=[A-Z])/g, ': '),
        c = c.replace(/[\s]+[:](?=[A-Z])/g, ': '),
        c = c.replace(/[\s]+[:](?=[\s])+(?![A-Z])/g, ': '),
        c = c.replace(/(?![a-z])[:](?=[A-Z])/g, ': '),
        c = c.replace(/(?![a-z])[:][\s+]+(?=[A-Z])/g, ': '),
        c = c.replace(/[\s]+[:](?![\s])+(?=[.])/g, ':'),
        c = c.replace(/[\s]+[:](?![\s])+(?=[a-z]|[A-Z])/g, ':'),
        c = c.replace(/[\s]+[?](?=[A-Z])/g, '? '),
        c = c.replace(/[\s]+[?](?=[\s])(?=[A-Z])/g, '? '),
        c = c.replace(/[?](?=[A-Z])/g, '? '),
        c = c.replace(/[?][\s]+(?=[A-Z])/g, '? '),
        c = c.replace(/[\s]+[?](?=[\s])+(?=[.])/g, '?'),
        c = c.replace(/[\s]+[?](?![\s])+(?=[a-z]|[A-Z])/g, '?'),
        c = c.replace(/[.][\s]+[.]/g, '.. '),
        d = /…/g,
        c = c.replace(d, function(a) {
          return a.replace(/…/g, '...')
        }),
        c = c.replace(/[\s]+[.][\s]+/g, '.'),
        d = /([.]|[”])[\s]+[0-9]{1}[.][\s]+[A-Z]{1}/g,
        c = c.replace(d, function(a) {
          return a.replace(/[.][\s]+(?=[A-Z])/g, ' ')
        }),
        d = /(Sir|St|Mr|Ms|Mrs|Jr|Sr|Sgt)[.]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[.]/g, ' ')
        }),
        d = /(UK|USA|US)[.][A-Z]{1}/g,
        c = c.replace(d, function(a) {
          return a.replace(/[.]/g, '. ')
        }),
        d = /[α-ωa-z][.][A-Z]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[.]/g, '. ')
        }),
        d = /[)][.][A-Z]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[.]/g, '. ')
        }),
        d = /['][.][A-Z]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[.]/g, '. ')
        }),
        d = /["][.][A-Z]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[.]/g, '. ')
        }),
        d = /[”][.][A-Z]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[.]/g, '. ')
        }),
        d = /[\s]+[?][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[?]/g, '?')
        }),
        d = /[,][.][A-Z]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[.]/g, '. ')
        }),
        c = c.replace(/[—]/g, ' '),
        c = c.replace(/[\s]+[–][\s]+/g, ' '),
        c = c.replace(/[\s]+[-][\s]+/g, ' '),
        c = c.replace(/[\s]+[--][\s]+/g, ' '),
        d = /([a-z]|[A-Z])+[)]([a-z]|[A-Z])/g,
        c = c.replace(d, function(a) {
          return a.replace(/[)]/g, ') ')
        }),
        c = c.replace(/…/g, '… '),
        d = /([a-z]|[A-Z]|[ά-ωΑ-ώ])[.][(]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[(]/g, ' (')
        }),
        d = /([a-z]|[A-Z]|[ά-ωΑ-ώ])[.][0-9]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[.]/g, '. ')
        }),
        d = /[\s]+[.]{3}/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]/g, '')
        }),
        d = /([a-z]|[ά-ω])[?][^'"]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[?]/g, '? ')
        }),
        d = /["][\s]+[)]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]/g, '')
        }),
        d = /[.][\s]+['][^A-ZΑ-ώ]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[']/g, "' ")
        }),
        d = /[\s]+["][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/["][\s]+/g, '"')
        }),
        d = /[’][\s]+[.][”]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[.]+/g, '.')
        }),
        d = /[”][\s]+[?]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+/g, '')
        }),
        d = /[\s]+["][)][,]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+/g, '')
        }),
        d = /[?][\s]+[”]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+/g, '')
        }),
        d = /[.][\s]+[’](?=[\s]+.+[’])/g,
        c = c.replace(d, function(a) {
          return a.replace(/[’]/g, ' ’')
        }),
        d = /[.][\s]+['](?=[\s]+.+['])/g,
        c = c.replace(d, function(a) {
          return a.replace(/[']/g, " '")
        }),
        d = /”-/g,
        c = c.replace(d, function(a) {
          return a.replace(/”-/g, '” -')
        }),
        d = /[\s]+(!”)/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+/g, '')
        }),
        d = /[!][’]([a-zA-Z]|[ά-ωΑ-ώ])/g,
        c = c.replace(d, function(a) {
          return a.replace(/[’]+/g, '’ ')
        }),
        d = /[,][’]([a-zA-Z]|[ά-ωΑ-ώ]){1,20}/g,
        c = c.replace(d, function(a) {
          return a.replace(/[’]+/g, '’ ')
        }),
        d = /[\s]+["]["]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+["]/g, '" ')
        }),
        d = /[’][\s]+[.]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]/g, '')
        }),
        d = /([a-zA-Z]|[ά-ωΑ-ώ])[.][’]([a-zA-Z]|[ά-ωΑ-ώ])/g,
        c = c.replace(d, function(a) {
          return a.replace(/[’]/g, '’ ')
        }),
        d = /[\s]+[,][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[,]/g, ',')
        }),
        d = /[\s]+[)][.][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[)][.]/g, ').')
        }),
        d = /[.][’]([a-zA-Z]|[ά-ωΑ-ώ])/g,
        c = c.replace(d, function(a) {
          return a.replace(/[.][’]/g, '.’ ')
        }),
        d = /[\s]+([a-z]|[ά-ω])[,]([a-z]|[ά-ω])[\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[,]/g, ', ')
        }),
        d = /[?][”][’]([a-zA-Z]|[ά-ωΑ-ώ])/g,
        c = c.replace(d, function(a) {
          return a.replace(/[’]/g, '’ ')
        }),
        d = /[\s]+["][)][.]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+/g, '')
        }),
        d = /[\s]+["][.][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+["][.]/g, '".')
        }),
        d = /[\s]+[’][”][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[’][”]/g, '’”')
        }),
        d = /[\s]+[:][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[:]/g, ':')
        }),
        d = /[\s]+[;][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[;]/g, ';')
        }),
        d = /[\s]+[)][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[)]/g, ')')
        }),
        d = /[,][”][’]([a-zA-Z]|[ά-ωΑ-ώ])/g,
        c = c.replace(d, function(a) {
          return a.replace(/[’]/g, '’ ')
        }),
        d = /[U][\s][K]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]/g, '')
        }),
        d = /([a-zA-Z]|[ά-ωΑ-ώ])[’][\s]+[sltdmve]{1,2}[\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[’][\s]+/g, '’')
        }),
        d = /([.]|[?]|[!])+[\s]+[’]([a-zA-Z]|[ά-ωΑ-ώ])/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[’]/g, '’ ')
        }),
        d = /[’][‘]([a-zA-Z]|[ά-ωΑ-ώ])/g,
        c = c.replace(d, function(a) {
          return a.replace(/[‘]/g, ' ‘')
        }),
        d = /[\s]+[’][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[’]/g, '’')
        }),
        d = /[\s]+[!][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[!]/g, '!')
        }),
        d = /[\s]+[?][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[?]/g, '?')
        }),
        d = /[“]([a-zA-Z]|[ά-ωΑ-ώ]).+[\s]+[“]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[“]/g, '“')
        }),
        d = /([a-zA-Z]|[ά-ωΑ-ώ])[,][“]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[,]/g, ', ')
        }),
        d = /[?][\s]+[’][”][’]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[?][\s]+[’][”][’]/g, '?’”’ ')
        }),
        d = /[.][“]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[.]/g, '. ')
        }),
        d = /[?][”]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[”]/g, '” ')
        }),
        d = /([a-zA-Z]|[ά-ωΑ-ώ])[“]([a-zA-Z]|[ά-ωΑ-ώ])/g,
        c = c.replace(d, function(a) {
          return a.replace(/[“]/g, ' “')
        }),
        d = /[[]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[[]/g, '(')
        }),
        d = /]/g,
        c = c.replace(d, function(a) {
          return a.replace(/]/g, ')')
        }),
        d = /[\s]+[)][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[)]/g, ')')
        }),
        d = /[:][\s]+["][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[:][\s]+["][\s]+/g, ': "')
        }),
        d = /[a-z][\s]+["][.][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+["][.]/g, '".')
        }),
        d = /[:]["][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[:]["][\s]+/g, ': "')
        }),
        d = /[.][”][’]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[’]/g, '’ ')
        }),
        d = /[:][“]([A-Z]|[Α-ώ])/g,
        c = c.replace(d, function(a) {
          return a.replace(/[:]/g, ': ')
        }),
        d = /[\s]+[’][,]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[’]/g, '’')
        }),
        d = /[!][”][’]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[’]/g, '’ ')
        }),
        d = /([a-zA-Z]|[ά-ωΑ-ώ])[’](so|of|or|to|on|at|it)/g,
        c = c.replace(d, function(a) {
          return a.replace(/[’]/g, '’ ')
        }),
        d = /([a-zA-Z]|[ά-ωΑ-ώ])[.][’][(]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[’]/g, '’ ')
        }),
        d = /([£]|[$]|[€])[\s]+[0-9]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+/g, '')
        }),
        d = /[£][\s]+[0-9]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+/g, '')
        }),
        d = /[\s]+[‘][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[‘][\s]+/g, '‘')
        }),
        d = /[\s]+[)][,][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[)][,]/g, '),')
        }),
        d = /[0-9][\s]+[m][)][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[m]/g, 'm')
        }),
        d = /[’][\s]+[,][”][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[’][\s]+/g, '’')
        }),
        d = /[)][.]{3}/g,
        c = c.replace(d, function(a) {
          return a.replace(/[)]/g, ') ')
        }),
        d = /(We|They|we|they)([']|[’])[\s]+(re)/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+/g, '')
        }),
        d = /([']|[’])[\s]+[?]["][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[?]["]/g, '?"')
        }),
        d = /([a-zA-Z]|[ά-ωΑ-ώ])[.][\s]+(?:([a-zA-Z]|[ά-ωΑ-ώ])[.])/g,
        c = c.replace(d, function(a) {
          return a.replace(/[.][\s]+/g, '.')
        }),
        d = /([a-zA-Z]|[ά-ωΑ-ώ])[.][\s]+(?:([a-zA-Z]|[ά-ωΑ-ώ])[.])/g,
        c = c.replace(d, function(a) {
          return a.replace(/[.][\s]+/g, '.')
        }),
        d = /(?:([a-zA-Z]|[ά-ωΑ-ώ])[.])([a-zA-Z]|[ά-ωΑ-ώ])[.][\s]+(?:([a-zA-Z]|[ά-ωΑ-ώ])[.])/g,
        c = c.replace(d, function(a) {
          return a.replace(/[.][\s]+/g, '.')
        }),
        d = /[a][,][\s]+[k][,][\s]+[a]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+/g, '')
        }),
        d = /([a-zA-Z]|[ά-ωΑ-ώ])[.]{2,3}[\s]+(?:[.]{1})/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+/g, '')
        }),
        d = /[:][“]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[:]/g, ': ')
        }),
        d = /([”]|[,])[“]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[“]/g, ' “')
        }),
        d = /[\s]+[“][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[“][\s]+/g, '“')
        }),
        d = /[0-9][’][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+/g, '')
        }),
        d = /[.][\s]+[”]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+/g, '')
        }),
        d = /[”]([A-Z]|[Α-ώ])/g,
        c = c.replace(d, function(a) {
          return a.replace(/[”]/g, '” ')
        }),
        d = /[0-9][\s]+(GB|MB|KB|Gb|Mb|Kb|gb|mb|kb)/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+/g, '')
        }),
        d = /[\s]+["][,][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+["]/g, '"')
        }),
        d = /[!][“]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[!]/g, '! ')
        }),
        d = /[\s]+[.][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[.]/g, '.')
        }),
        d = /(you)[’][\s]+(re)/g,
        c = c.replace(d, function(a) {
          return a.replace(/[’][\s]+/g, '’')
        }),
        d = /[.]{3}[^.”'"]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[.]{3}/g, '... ')
        }),
        d = /[\s]+[”][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[”]/g, '”')
        }),
        d = /[\s]+[”]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+/g, '')
        }),
        d = /([a-zA-Z]|[ά-ωΑ-ώ])[(]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[(]/g, ' (')
        }),
        d = /([a-zA-Z]|[ά-ωΑ-ώ])[,]([a-zA-Z]|[ά-ωΑ-ώ])/g,
        c = c.replace(d, function(a) {
          return a.replace(/[,]/g, ', ')
        }),
        d = /[.][\s]+[?]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[.][\s]+/g, '.')
        }),
        d = /[?][“]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[?]/g, '? ')
        }),
        d = /[\s]+[?]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[?]/g, '?')
        }),
        d = /[\s]+[-]([a-zA-Z]|[ά-ωΑ-ώ])[\s]+/g,
        c = c.replace(d, function(a) {
          return ' (' + a.replace(/[\s]+/g, '') + ') '
        }),
        d = /[“][‘][.]{3}[\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+/g, '')
        }),
        d = /[:]([a-zA-Z]|[ά-ωΑ-ώ])/g,
        c = c.replace(d, function(a) {
          return a.replace(/[:]/g, ': ')
        }),
        d = /[.]([a-zA-Z]|[ά-ωΑ-ώ])/g,
        c = c.replace(d, function(a) {
          return a.replace(/[.]/g, '. ')
        }),
        d = /[\s]+[.][”]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+/g, '')
        }),
        d = /[']([a-zA-Z]|[ά-ωΑ-ώ])[']/g,
        c = c.replace(d, function(a) {
          return a + ' '
        }),
        d = /(["])(?=(\\?))\2.*?\1/g,
        c = c.replace(d, function(a) {
          return ' ' + a.replace(/["]/g, '"') + ' '
        }),
        d = /([”])(?=(\\?))\2.*?\1/g,
        c = c.replace(d, function(a) {
          return ' ' + a.replace(/[”]/g, '"') + ' '
        }),
        d = /[\s]+["][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/["][\s]+/g, '"')
        }),
        d = /["][\s]+[.]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+/g, '')
        }),
        d = /[^';!?.,a-zA-Zά-ωΑ-ώ ]["][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/["][\s]+/g, '"')
        }),
        d = /[\s]+[,][^.,a-zA-Zά-ωΑ-ώ]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[,]/g, ',')
        }),
        d = /[a-zA-Zά-ωΑ-ώ]{1}[.][\s]+[a-zA-Zά-ωΑ-ώ]{1}[.]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[.][\s]+/g, '.')
        }),
        d = /[\s]+[(][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[(][\s]+/g, '(')
        }),
        d = /[\s]+[\/][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\/][\s]+/g, '/')
        }),
        d = /[\s]+([+]|[-]|[*]|[=])[\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+/g, '')
        }),
        d = /[\s]+[)][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[)]/g, ')')
        }),
        d = /[^ ][“]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[“]/g, ' “')
        }),
        d = /[\s]+[(][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[(][\s]+/g, '(')
        }),
        d = /[(][\s]+[^]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[(][\s]+/g, '(')
        }),
        d = /(No)[.][\s]+[0-9]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+/g, '')
        }),
        d = /[\s]+['][s][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[']/g, "'")
        }),
        d = /[\s]+[)][,][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[)][,]/g, '),')
        }),
        d = /[\s]+[)][.][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[)][.]/g, '),')
        }),
        d = /[\s]+[’][s][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[’]/g, '’')
        }),
        d = /[\s]+[:][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[:]/g, ':')
        }),
        d = /[s][\s]+['][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[']/g, "'")
        }),
        d = /[^a-zά-ω](?:[\s]+)[0-9][\s]+[A-ZΑ-ώ]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+/g, '. ')
        }),
        d = /[,][\s]*["](he|she|they|we|I)[\s]+(stated|said|told|says)[.]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[,][\s]*["]/g, '," ')
        }),
        d = /[\s]+[-]{2}[\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[-]{2}/g, ',')
        }),
        d = /[0-9][\s]+(GHz|MHz|Khz)/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+/g, '')
        }),
        d = /[\s]+(will)[.](i)[.][\s]+(am)/g,
        c = c.replace(d, function(a) {
          return a.replace(/[.][\s]+/g, '.')
        }),
        d = /[\s]+['][\s]+[s][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+['][\s]+/g, "'")
        }),
        d = /[\s]+[.]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[.]/g, '.')
        }),
        d = /[\s]+[^]{1,10}["][(]/g,
        c = c.replace(d, function(a) {
          return a.replace(/["][(]/g, '" (')
        }),
        d = /[^ ][*]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[*]/g, ' *')
        }),
        d = /[^ ][)]["][^ ]/g,
        c = c.replace(d, function(a) {
          return a.replace(/["]/g, '" ')
        }),
        d = /[\s]+[,][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[,]/g, ',')
        }),
        d = /[\s]+[;][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[;]/g, ';')
        }),
        d = /[\s]+[ό][,][\s]+(τι)[\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[,][\s]+/g, ',')
        }),
        d = /[\s]+["][\s]+[^"]+[,]["]/g,
        c = c.replace(d, function(a) {
          return a.replace(/["][\s]+/g, '"')
        }),
        d = /[\s]+["]["][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+["]["][\s]+/g, '" "')
        }),
        d = /[,][\s]+["](he|she|they)/g,
        c = c.replace(d, function(a) {
          return a.replace(/[,][\s]+["]/g, '," ')
        }),
        d = /[^a-zA-Zά-ωΑ-ώ](I)['][\s]+(m)[\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/['][\s]+/g, "'")
        }),
        d = /[U][.][S][.][^A-ZΑ-ώ]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[U][.][S][.]/g, 'U.S. ')
        }),
        d = /[\s]+[a-zA-Zά-ωΑ-ώ][\s]+[*][\s]+[a-zA-Zά-ωΑ-ώ][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[*][\s]+/g, '*')
        }),
        d = /[^0-9][\s]+[*][\s]+[^0-9]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[*][\s]+/g, ' ')
        }),
        d = /[’][\s]+[s][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[s]/g, 's')
        }),
        d = /[\s]+[.][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[.]/g, '.')
        }),
        d = /[\s]+[(][;][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[(][;][\s]+/g, '(;')
        }),
        d = /[\s]+[,][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[,]/g, ',')
        }),
        d = /[\s]+[)][)][.][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[)][)][.]/g, ')).')
        }),
        d = /[\s]+[^ ]+["][^,.)]{1,10}[\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/["]/g, '" ')
        }),
        d = /[^ ]["]["][^ ]/g,
        c = c.replace(d, function(a) {
          return a.replace(/["]["]/g, '" "')
        }),
        d = //g,
        c = c.replace(d, function(a) {
          return a.replace(//g, ' ')
        }),
        d = /[\s]+["][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+["][\s]+/g, '"')
        }),
        d = /(["])(?=(\\?))\2.*?\1/g,
        c = c.replace(d, function(a) {
          return ' ' + a + ' '
        }),
        d = /[a-zA-Zά-ωΑ-ώ]+[.][\s]+(co)[.][\s]+(in|uk)/g,
        c = c.replace(d, function(a) {
          return a.replace(/[.][\s]+/g, '.')
        }),
        d = /(Ph)[.](D)[.]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[.]/g, '')
        }),
        d = /(PhD)[\s]+[s][,]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+/g, '')
        }),
        d = /[\s]+[,][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[,]/g, ',')
        }),
        d = /[\s]+[.][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[.]/g, '.')
        }),
        d = /[\s]+["][.][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+["][.]/g, '".')
        }),
        d = /[\s]+[(][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[(][\s]+/g, '(')
        }),
        d = /[\s]+[)]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[)]/g, ')')
        }),
        d = /[\s]+[)][,][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[)][,]/g, '),')
        }),
        d = /[\s]+[:][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[:]/g, ':')
        }),
        d = /[\s]+[;][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[;]/g, ';')
        }),
        d = /[.][\s]+["]["][\s]+[A-ZΑ-ώ]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+["]["][\s]+/g, '" "')
        }),
        d = /[,][\s]*["][^]{1,15}(stated|said|told|added)[.]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[,][\s]*["]/g, '," ')
        }),
        d = /[:]["][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[:]["][\s]+/g, ': "')
        }),
        d = /(but)["][\s]+[^]+[.]["][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/(but)["][\s]+/g, 'but "')
        }),
        d = /[a-zά-ω][.][A-ZΑ-ώ]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[.]/g, '. ')
        }),
        d = /[.][\s]+[’]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[.][\s]+[’]/g, '.’')
        }),
        d = /[a-zά-ωA-ZΑ-ώ][(]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[(]/g, ' (')
        }),
        d = /[:][\s]+[a-zά-ωA-ZΑ-ώ]["][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[:][\s]+/g, ':')
        }),
        d = /[!][a-zά-ωA-ZΑ-ώ]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[!]/g, '! ')
        }),
        d = /[•]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[•]/g, '')
        }),
        d = /[\s]+[.][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[.]/g, '.')
        }),
        d = /[*][^ ]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[*]/g, '')
        }),
        d = /(R'n')[\s]+[B][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[B]/g, 'B')
        }),
        d = /(κ.)[\s]+(ά.)[\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+(ά.)/g, 'ά.')
        }),
        d = /(κ.)[\s]+(α.)[\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+(α.)/g, 'α.')
        }),
        d = /[A-ZΑ-ώ][.][\s]+[A-ZΑ-ώ][.]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[.][\s]+/g, '.')
        }),
        d = /[\s]+[,]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[,]/g, ',')
        }),
        d = /[.][\s]+(epub|pdf|zip|rar|tar)[\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[.]/g, ' ')
        }),
        d = /[\s]+[&][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[&]/g, 'and')
        }),
        d = /[!]['][s]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[!]/g, '')
        }),
        d = /[\s]+[(]["][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[(]["][\s]+/g, '("')
        }),
        d = /[\s]+[’]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[’]/g, '’')
        }),
        d = /[\s]+[”]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[”]/g, '”')
        }),
        d = /[\s]+["]["][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+["]["][\s]+/g, '" "')
        }),
        d = /[\s]+["][,][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+["][,]/g, '",')
        }),
        d = /[0-9][.][\s]+[a-zά-ω]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+/g, '')
        }),
        d = /[\s]+[?][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[?]/g, '?')
        }),
        d = /[\s]+[)]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]+[)]/g, ')')
        }),
        d = /[\u2014-\u2015\u2E3A\u2E3B]/g,
        c = c.replace(d, function(a) {
          return a.replace(/[-\u2014-\u2015\u2E3A\u2E3B]/g, ' ')
        }),
        d = /[\s]+[-\u2010-\u2011\uFE58\uFE63\uFF0D][\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[-\u2010-\u2011\uFE58\uFE63\uFF0D]/g, ' ')
        }),
        d = /[\s]+[a-zά-ω][,][a-zά-ω]{2}[\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[,]/g, '')
        }),
        d = /[\s]{2,}/g,
        c = c.replace(d, function(a) {
          return a.replace(/[\s]{2,}/g, ' ')
        }),
        d = /[.][\s]+(epub|pdf|zip|rar|tar|NET)/g,
        c = c.replace(d, function(a) {
          return a.replace(/.[\s]/g, ' •')
        }),
        d = /[^ ]+[.][\s]+(com|net|co.uk|co.in|com.cy|gr|tk|info|me)[\s]+/g,
        c = c.replace(d, function(a) {
          return a.replace(/[.][\s]+/g, '.')
        })
      a.debug &&
        console.log('~~~parse debug~~~ plain text cleaned (a string):', c)
      return c
    }
    a.splitSentences = function(b) {
      console.debug('rSup.splitSentences')
      var c = sbd$1.sentences(b, { parse_type: 'words' })
      a.debug &&
        console.log(
          '~~~parse debug~~~ sentences (an array of arrays of strings):',
          c
        )
      return c
    }
    return a
  },
  ParserSetup_1 = ParserSetup,
  Settings = function(a, b) {
    var c = {}
    c._debug = !1
    c.available = [
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
    var d = (c._settings = {
      wpm: 450,
      _baseDelay: 240,
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
    c.add = function(a, b, e) {
      if (d[a]) {
        console.warn(
          'The setting called',
          a,
          'already exists. Try using a different name. Check "yourSettings.available" for all the existing settings names.'
        )
        return c
      }
      c.available.push(a)
      d[a] = b
      c['_get_' + a] = e
      c.set(a, b)
      return c
    }
    c.set = function(b, e) {
      if (d[b] === undefined) {
        console.error(
          'There is no approved setting by the name of "' +
            b +
            '". Maybe check your capitalization. Also, you can check `yourSetayerObj.settingsAvailable` to see what setting names are available to you.'
        )
        return !1
      }
      if (b[0] !== '_') {
        var f = c['_get_' + b](e)
        d[b] = f
        var g = {}
        g[b] = f
        a.set(g)
        c._debug &&
          console.log(
            'The setting',
            b,
            'has just been saved with the normalized value',
            f
          )
      }
      return c
    }
    c.isModifier = function(a) {
      return c._get_delayModifier(d.delayModifier) === a
    }
    c._withinLimits = function(a, b, c) {
      var d = Math.max(b, a)
      return Math.min(c, d)
    }
    c._toUsefulVal = function(a, b, d) {
      var e = parseFloat(a)
      return c._withinLimits(e, b, d)
    }
    c._calcBaseDelay = function(a) {
      return 1 / (a / 60) * 1000
    }
    c._get_wpm = function(a) {
      var b = c._toUsefulVal(a, 25, 1000)
      d._baseDelay = c._calcBaseDelay(b)
      return b
    }
    c._get_slowStartDelay = function(a) {
      return c._toUsefulVal(a, 0, 10)
    }
    c._get_sentenceDelay = function(a) {
      return c._toUsefulVal(a, 1, 10)
    }
    c._get_otherPuncDelay = function(a) {
      return c._toUsefulVal(a, 1, 10)
    }
    c._get_numericDelay = function(a) {
      return c._toUsefulVal(a, 1, 10)
    }
    c._get_shortWordDelay = function(a) {
      return c._toUsefulVal(a, 1, 10)
    }
    c._get_longWordDelay = function(a) {
      return c._toUsefulVal(a, 1, 10)
    }
    c._get_delayModifier = function(a) {
      return c._toUsefulVal(a, 1, 10)
    }
    c._get_sentenceModifier = function(a) {
      return a
    }
    c._get_maxNumCharacters = function(a) {
      return c._toUsefulVal(a, 1, 1000)
    }
    c._init = function(b) {
      c._debug && a.clear()
      b ||
        ((b = c.defaults || {}),
        a.set(c.defaults, function(a) {
          console.log('Settings saved for first time:', a)
        }))
      console.debug('oldSettings', b)
      for (let a in d) {
        let e = b[a] || d[a]
        c.set(a, e)
      }
      return c
    }
    c._init(b)
    return c
  },
  Settings_1 = Settings,
  ReaderlyStorage = function() {
    var a = {}
    a.set = function(a, b) {
      console.debug('ReaderlyStorage', a)
      a !== null && a !== undefined && chrome.storage.local.set(a, b)
    }
    a.save = a.set
    a.loadAll = function(a) {
      chrome.storage.local
        .get()
        .then(a)
        .catch(b => {
          console.debug('loadAll,chrome.storage.local.get failed', b)
          a()
        })
    }
    a.get = function(a, b) {
      chrome.storage.local.get(a, function c(a) {
        b(a)
      })
    }
    a.cleanSave = function(a, b) {
      chrome.storage.local.clear(function c() {
        console.debug('cleanSave', a)
        chrome.storage.local.set(a, b)
      })
    }
    a.clear = function(a) {
      chrome.storage.local.clear(a)
    }
    a.remove = function(a, b) {
      chrome.storage.local.remove(a, b)
    }
    return a
  },
  ReaderlyStorage_1 = ReaderlyStorage,
  WordNav = function() {
    var a = {}
    a.words = null
    a.index = 0
    ;(a.position = [0, 0, 0]), (a.currentWord = null)
    a.fragmentor = null
    a._progress = 0
    var b = (a._sentences = null),
      c = (a._positions = [])
    a.process = function(d, e) {
      d ||
        console.error('WordNav needs dataz to .process(). You gave it dis:', d)
      a.fragmentor = e
      b = a.sentences = d
      c = a.positions = []
      for (let a = 0; a < b.length; a++) {
        let d = b[a]
        for (let b = 0; b < d.length; b++) c.push([a, b])
      }
      return a
    }
    a.restart = function() {
      a.index = 0
      a.position = [0, 0, 0]
      return a
    }
    a.getFragment = function(b) {
      var c = null,
        d = a.position,
        e = a.currentWord
      if (typeof b === 'number') (e = a._stepWord(b)), (d[2] = 0)
      else if (b[0] !== 0) {
        var f = a._stepSentence(b[0])
        e = a._stepWord(f)
        d[2] = 0
      } else if (b[1] !== 0)
        (f = a.index + b[1]), (e = a._stepWord(f)), (d[2] = 0)
      else if (b[2] > 0) {
        var g = d[2] + b[2]
        g >= e.length
          ? ((e = a._stepWord(a.index + 1)), (d[2] = 0))
          : ((e = a._stepWord(a.index)), (d[2] = g))
      } else (e = a._stepWord(a.index)), (d[2] = 0)
      a.currentWord = a.fragmentor.process(e)
      c = a.currentWord[d[2]]
      return c
    }
    a._stepWord = function(d) {
      a.index = a.normalizeIndex(d)
      var e = c[a.index]
      a.position[0] = e[0]
      a.position[1] = e[1]
      var f = b[a.position[0]][a.position[1]]
      return f
    }
    a._stepSentence = function(c) {
      if (c === 0) {
        return 0
      }
      var d = [a.position[0], a.position[1]],
        e = d[0],
        f = d[1]
      c > 0 && e >= b.length - 1
        ? (f = b[e].length - 1)
        : ((c === -1 && f > 0) || (e += c), (f = 0))
      d[1] = f
      d[0] = a.normalizeSentencePos(e)
      var g = a._sentenceChangeToIndex(c, d)
      g === null && (g = a.index)
      return g
    }
    a._sentenceChangeToIndex = function(b, e) {
      if (b === 0) {
        return 0
      }
      var f = d(b),
        g = a.index,
        h = !1
      while (!h && c[g]) {
        var i = c[g]
        i[0] === e[0] && i[1] === e[1] && (h = !0)
        h || (g += f)
      }
      c[g] || (g = null)
      return g
    }
    a._positionToIndex = function(a) {
      var b = c.findIndex(function c(b) {
        var d = a[0] === b[0],
          e = a[1] === b[1]
        return d && e
      })
      return b
    }
    var d = function(a) {
      return typeof a === 'number'
        ? a ? (a < 0 ? -1 : 1) : a === a ? a : NaN
        : NaN
    }
    a.normalizeIndex = function(a) {
      a = Math.min(a, c.length - 1)
      return Math.max(a, 0)
    }
    a.normalizeSentencePos = function(a) {
      a = Math.min(a, b.length - 1)
      return Math.max(a, 0)
    }
    a.getProgress = function() {
      a._progress = (a.index + 1) / c.length
      return a._progress
    }
    a.getLength = function() {
      return c.length
    }
    a.getIndex = function() {
      return a.index
    }
    a.getLastSentence = function() {
      return a.sentences[a.sentences.length - 1]
    }
    a.getLastWord = function() {
      return a.getLastSentence()[a.getLastSentence().length - 1]
    }
    a.getFragmentCount = function(a) {
      return Math.ceil(a.length / 10)
    }
    return a
  },
  WordNav_1 = WordNav,
  WordSplitter = function(a, b) {
    var c = {}
    c.charsNode = a
    c._getMaxLength = function(a, c) {
      var d = parseFloat(c.width.replace('px', '')),
        e = parseFloat(c['font-size'].replace('px', '')),
        f = Math.floor(d / e),
        g = b._settings.maxNumCharacters,
        h = Math.min(g, f)
      return h
    }
    c._makeCharsMap = function(a, b) {
      var c = [],
        d = Math.floor(a.length / b)
      for (let a = 0; a < d; a++) c.push(b)
      var e = a.length % b,
        f = b - e,
        g = Math.floor(f / 2),
        h = g + e,
        i = c.length,
        j = 0
      while (g > 0) (c[j] = c[j] - 1), (j += 1), (j %= i), (g -= 1)
      c.push(h)
      return c
    }
    c._splitWord = function(a, b) {
      var d = []
      if (a.length <= b) {
        return [a]
      }
      if (b === 1) {
        return a.split('')
      }
      let e = a.match(/[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]/g),
        f = e != null ? e.length : 0,
        g = a.includes(' ')
      if (
        ((g || f / a.length > 0.2) &&
          !a.match(/([a-zA-Z]|[ά-ωΑ-ώ])[-]([a-zA-Z]|[ά-ωΑ-ώ])/g)) ||
        a.match(
          /([a-zA-Z]|[ά-ωΑ-ώ])+[.]([a-zA-Z]|[ά-ωΑ-ώ])+[.]([a-zA-Z]|[ά-ωΑ-ώ])+[;]/g
        )
      ) {
        return [a]
      }
      var h = b - 1,
        i = '-'
      b < 4 && ((h = b), (i = ''))
      var j = c._makeCharsMap(a, h),
        k = 0
      for (let b = 0; b < j.length; b++) {
        let c = a.slice(k, k + j[b])
        b < j.length - 1 && (/-/.test(c) || (c += i))
        d.push(c)
        k += j[b]
      }
      return d
    }
    c.process = function(a) {
      var b = window.getComputedStyle(c.charsNode),
        d = c._getMaxLength(a, b),
        e = c._splitWord(a, d)
      return e
    }
    return c
  },
  WordSplitter_1 = WordSplitter,
  StringTime = function(a) {
    var b = {},
      c = null
    b._tempSlowStart = null
    var d = (b._toMultiplyBy = {
        hasPeriod: 'sentenceDelay',
        hasOtherPunc: 'otherPuncDelay',
        isShort: 'shortWordDelay',
        isLong: 'longWordDelay',
        isNumeric: 'numericDelay',
        isCode: 'codeBaseDelay'
      }),
      e = (b.defaults = {
        wpm: 250,
        _baseDelay: 240,
        slowStartDelay: 5,
        sentenceDelay: 5,
        otherPuncDelay: 2.5,
        numericDelay: 2.0,
        shortWordDelay: 1.3,
        longWordDelay: 1.5,
        codeBaseDelay: 3.0,
        delayModifier: 1,
        sentenceModifier: 1
      }),
      f = e.slowStartDelay
    b.orDefault = function(a) {
      var b = null
      if (c && c[a] !== undefined) b = c[a]
      else b = e[a]
      return b
    }
    b.calcDelay = function(a, c) {
      if (typeof a !== 'string') {
        throw new TypeError(
          'The first argument to `.calcDelay` was not a string. What you sent:',
          a
        )
      }
      if (c !== undefined && typeof c !== 'boolean') {
        throw new TypeError(
          'The optional second argument to `.calcDelay` was not undefined or a boolean. What you sent:',
          c
        )
      }
      var e = b._process(a),
        g = b.orDefault('_baseDelay') * b.orDefault('delayModifier'),
        h,
        i =
          (a.match(
            /^[(]*[^]+[)]*(["]|[”]|[’])*([.]|[?]|[!]|[…])[']*(["]|[”]|[’])*[)]*$/g
          ) ||
            a.match(
              /^[(]*[ά-ωΑ-ώ]+[)]*(["]|[”]|[’])*([.]|[?]|[!]|[…]|[;])[']*(["]|[”]|[’])*[)]*$/g
            )) &&
          !a.match(/^[(]*[^]*(Wham|Yahoo)[)]*([!])[']*(["]|[”]|[’])*[)]*$/g),
        j = a.match(
          /^(["]|[”])*[(]*[^ ]{4,}[)]*(["]|[”])*([:]|[,])(["]|[”])*$/g
        ),
        k =
          a.match(/^[0-9]+[%]*[,]*[)]*[:]*$/g) ||
          a.match(/^[(]*(Mr|Ms|Dr|Sir|No|St|vs)[)]*[.][,]*$/g) ||
          a.match(/^[(]*[a-zA-Zά-ωΑ-ώ][.][,]*$/g) ||
          a.match(/^[(]*[a-zά-ωA-ZΑ-ώ][.][a-zά-ωA-ZΑ-ώ][)]*[.][,]*$/g) ||
          a.match(/^[0-9]+[.]*[0-9]*(GHz|MHz|Khz)$/g) ||
          a.match(
            /^[a-zά-ωA-ZΑ-ώ]{1,5}[.][a-zά-ωA-ZΑ-ώ]{1,5}[.][a-zά-ωA-ZΑ-ώ]{1,5}$/g
          ),
        l =
          a.match(/^[(][a-zά-ωA-ZΑ-ώ]+[)]$/g) ||
          a.match(/^[$][0-9]{1,3}[.][0-9]{1,3}$/g) ||
          a.match(/^[&]$/g) ||
          a.match(
            /^(Sept|Oct|Dec|Jan|Mar|Aug|Decem|Decemb|Nov|Novem|Novemb)[.]$/g
          ) ||
          a.match(/^[(][0-9]+([.]|[,])[0-9]+[a-zA-Zά-ωΑ-ώ][)]$/g) ||
          a.match(/^[(]*[κ][)]*[.][,]*$/g) ||
          a.match(/^["]*[a-zά-ωA-ZΑ-ώ]{1,10}[-][a-zά-ωA-ZΑ-ώ]{1,10}["]*[,]*$/g),
        m = a.match(/^["]*[a-zA-Zά-ωΑ-ώ]{4,}[:][a-zA-Zά-ωΑ-ώ]["]*$/g),
        n = k || l || m,
        o =
          !i &&
          !j &&
          !n &&
          !a.match(/^[(][a-zA-Zά-ωΑ-ώ]+$/g) &&
          !a.match(/^[a-zA-Zά-ωΑ-ώ]+[)]$/g) &&
          !a.match(/^[(][a-zA-Zά-ωΑ-ώ]+[)]$/g),
        p =
          a.match(
            /^[^a-zA-Zά-ωΑ-ώ0-9 ]{0,1}[a-zA-Zά-ωΑ-ώ]+[/]*[a-zA-Zά-ωΑ-ώ]*[-]*[']*[s]*["]*$/g
          ) || a.match(/^[^a-zA-Zά-ωΑ-ώ0-9 ]{0,1}[a-zA-Zά-ωΑ-ώ]+[-][^]+[-]$/g),
        q = 'hasPeriod'
      i &&
        !n &&
        ((h = d[q]),
        (g *= b.orDefault(h)),
        (g *= b.orDefault('sentenceModifier')))
      q = 'hasOtherPunc'
      j && !p && ((h = d[q]), (g *= b.orDefault(h)))
      q = 'isNumeric'
      n && !p && ((h = d[q]), (g *= b.orDefault(h)))
      q = 'isShort'
      e[q] && !i && !j && !n && ((h = d[q]), (g *= b.orDefault(h)))
      q = 'isLong'
      e[q] && !i && !j && !n && ((h = d[q]), (g *= b.orDefault(h)))
      q = 'isCode'
      e[q] &&
        o &&
        a.length >= 6 &&
        !p &&
        ((h = d[q]), (g *= b.orDefault(h) + 0.5 * (a.length - 10)))
      var r = b.orDefault('slowStartDelay')
      f !== r && b.resetSlowStart()
      var s = b._tempSlowStart
      c || (b._tempSlowStart = Math.max(1, s / 1.5))
      i || (g *= b._tempSlowStart)
      return g
    }
    b.resetSlowStart = function(a) {
      a
        ? (b._tempSlowStart = a)
        : (f = b._tempSlowStart = b.orDefault('slowStartDelay'))
      return b
    }
    b._process = function(a) {
      var c = { chars: a }
      b._setPuncProps(c)
      var d = 2,
        e = 8,
        f = a.match(/[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]/g),
        g = f != null ? f.length : 0,
        h = a.includes(' ')
      c.hasPeriod = /[.!?]/.test(a)
      c.isNumeric = /\d/.test(a)
      c.isCode = h || g / a.length > 0.2
      c.isShort = !c.isCode && !c.hasPeriod && a.length <= d
      c.isLong = !c.isCode && !c.hasPeriod && a.length >= e
      return c
    }
    b._setPuncProps = function(a) {
      var c = a.chars
      a.hasPeriod = /[.!?]/.test(c)
      a.hasOtherPunc = /["'()”’:;,_]/.test(c)
      return b
    }
    b._checkSettings = function(a) {
      if (!a) {
        return b
      }
      for (let a in d) {
        let c = d[a]
        b.orDefault(c)
      }
      b.orDefault('_baseDelay')
      b.orDefault('slowStartDelay')
      b.orDefault('delayModifier')
      return b
    }
    b._init = function(a) {
      c = b._settings = a
      b._checkSettings(a)
      b.resetSlowStart()
      return b
    }
    b._init(a)
    return b
  },
  StringTime_1 = StringTime,
  $$2
$$2 = require$$0
var ReaderlyTimer = function(a) {
    var b = {}
    b._init = function() {
      b.done = !1
      b._timeoutID = null
      b._isPlaying = !1
      b._wasPlaying = !1
      b._jumping = !1
      b._incrementors = [0, 0, 1]
      b._skipWhitespace = !1
      b._whitespaceRegex = new RegExp('[\n\r]', 'g')
      b.util = b.prototype
      return b
    }
    b.getProgress = function() {
      return b._queue.getProgress()
    }
    b.getLength = function() {
      return b._queue.getLength()
    }
    b.getLastSentence = function() {
      return b._queue.getLastSentence()
    }
    b.getLastWord = function() {
      return b._queue.getLastWord()
    }
    b.getFragmentCount = function(a) {
      return b._queue.getFragmentCount(a)
    }
    b.lastWordFragmentCount = function() {
      return b.getFragmentCount(b.getLastWord())
    }
    b._noDelayMod = function(a) {
      return a
    }
    b._restart = function(c, d, e) {
      c && $$2(b).trigger(c, [b])
      b.done = !1
      var f = e || b._noDelayMod,
        g = f(a._settings.slowStartDelay)
      a.resetSlowStart(g)
      b._queue.restart()
      b._pause(null, null, null)
      b.play()
      d && $$2(b).trigger(d, [b])
      return b
    }
    b.start = function(a) {
      a
        ? ($$2(b).trigger('startBegin', [b]),
          (b._queue = a),
          b._restart(null, null, null),
          $$2(b).trigger('startFinish', [b]))
        : console.error(
            'No readable object was passed into PlaybackManager. `queue`:',
            b._queue
          )
      return b
    }
    b.restart = function() {
      b._restart('restartBegin', 'restartFinish', null)
      return b
    }
    b._play = function(a, c) {
      b._pausesignal = 1
      b._incrementors = [0, 0, 1]
      a && $$2(b).trigger(a, [b])
      b.setProlongationCounter()
      b.lastWordFragments = {}
      b._isPlaying || ((b._isPlaying = !0), b._loop([0, 0, 0], !1))
      c && $$2(b).trigger(c, [b])
      return b
    }
    b.play = function() {
      b.done ? b.restart() : b._play('playBegin', 'playFinish')
      return b
    }
    b._pause = function(c, d, e) {
      c && $$2(b).trigger(c, [b])
      clearTimeout(b._timeoutID)
      b._isPlaying = !1
      var f = e || b._noDelayMod,
        g = f(a._settings.slowStartDelay)
      a.resetSlowStart(g)
      d && $$2(b).trigger(d, [b])
      return b
    }
    b.pause = function() {
      b._pause('pauseBegin', 'pauseFinish', null)
      return b
    }
    b.stop = function() {
      b._pause('stopBegin', 'stopFinish', null)
      return b
    }
    b.close = function() {
      b._pause('closeBegin', 'closeFinish', null)
      return b
    }
    b.togglePlayPause = function() {
      b._isPlaying ? b.pause() : b.play()
      return b
    }
    b._oneStepUntimed = function(a) {
      b._wasPlaying = b._isPlaying
      b._pause(null, null, null)
      b._skipWhitespace = !0
      b.once(a)
      b._skipWhitespace = !1
      b._wasPlaying && b._play(null, null, null)
      return b
    }
    b.nextWord = function() {
      b._oneStepUntimed([0, 1, 0])
      return b
    }
    b.nextTwoSentences = function() {
      b._oneStepUntimed([2, 0, 0])
      return b
    }
    b.nextSentence = function() {
      b._oneStepUntimed([1, 0, 0])
      return b
    }
    b.prevWord = function() {
      b._oneStepUntimed([0, -1, 0])
      return b
    }
    b.prevTwoSentences = function() {
      b._oneStepUntimed([-2, 0, 0])
      return b
    }
    b.prevSentence = function() {
      b._oneStepUntimed([-1, 0, 0])
      return b
    }
    b.jumpTo = function(a) {
      if (b._queue) {
        b._jumping ||
          ((b._wasPlaying = b._isPlaying),
          b._pause(null, null, null),
          (b._jumping = !0))
        var c = a.amount,
          d = b._queue.getIndex()
        b.once([0, c - d, 0])
      }
      return b
    }
    b.disengageJumpTo = function() {
      b._wasPlaying && b._play(null, null, null)
      b._jumping = !1
      return b
    }
    b.signOf = function(a) {
      return typeof a === 'number'
        ? a ? (a < 0 ? -1 : 1) : a === a ? a : NaN
        : NaN
    }
    var c = function() {
        return b.getProgress() === 1
      },
      d = function() {
        return b.lastWordFragmentCount() > 1
      },
      e = function() {
        return c() && !d()
      },
      f = function() {
        return c() && d() && !b.prolongCounter.decrement()
      },
      g = function() {
        return e() || f()
      },
      h = function() {
        $$2(b).trigger('done', [b])
        return !!b.stop()
      },
      i = function() {
        return g() ? h() : !1
      }
    b._wordsDone = function() {
      var a = b.getProgress()
      $$2(b).trigger('progress', [b, a, b._queue.index, b.getLength()])
      b.done = i()
      return b.done
    }
    b._skipDirection = function(a, c) {
      var d = [0, 0, 0],
        f = c
      f ||
        console.log('frag:', c, '; chars:', f, '; position:', b._queue.position)
      var g = f.replace(b._whitespaceRegex, '')
      b._skipWhitespace &&
        g.length === 0 &&
        (a[0] !== 0
          ? (d[0] = b.signOf(a[0]))
          : a[1] !== 0
            ? (d[1] = b.signOf(a[1]))
            : a[2] !== 0 ? (d[2] = b.signOf(a[2])) : (d = [0, 0, 1]))
      return d
    }
    b._loop = function(c, d) {
      $$2(b).trigger('loopBegin', [b])
      if (b._done) {
        return
      }
      c = c || b._incrementors
      var e = b._queue.getFragment(c),
        f = b._skipDirection(c, e)
      if (f[0] !== 0 || f[1] !== 0 || f[2] !== 0)
        $$2(b).trigger('loopSkip', [b, e]), b._loop(f, d)
      else {
        if (!d) {
          var g = a.calcDelay(e, d)
          b._timeoutID = setTimeout(b._loop, g)
        }
        $$2(b).trigger('newWordFragment', [b, e])
        $$2(b).trigger('loopFinish', [b])
      }
      if (b._wordsDone()) {
        return b
      }
      return b
    }
    b.once = function(a) {
      $$2(b).trigger('onceBegin', [b])
      b._loop(a, !0)
      $$2(b).trigger('onceFinish', [b])
      return b
    }
    b.makeCounter = function(a) {
      var b = a,
        c = function() {
          return (b += 1)
        },
        d = function() {
          return (b -= 1)
        },
        e = function() {
          return b
        }
      return { increment: c, decrement: d, getCount: e }
    }
    b.setProlongationCounter = function() {
      b.prolongCounter = b.makeCounter(b.lastWordFragmentCount())
    }
    b._init()
    return b
  },
  ReaderlyTimer_1 = ReaderlyTimer,
  coreCSS =
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
",
  coreCSS_1 = coreCSS,
  nouiCSS =
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
",
  nouiCSS_1 = nouiCSS,
  $$3,
  coreCSSstr,
  nouiCSSstr
;($$3 = require$$0), (coreCSSstr = coreCSS_1), (nouiCSSstr = nouiCSS_1)
var ReaderlyDisplay = function(a, b, c) {
    var d = {}
    d._toTrigger = []
    var f,
      h,
      i =
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
    d.addToTriggerList = function(a) {
      d._toTrigger.push(a)
      return d
    }
    d.close = function() {
      d.hide()
      for (let a = 0; a < d._toTrigger.length; a++) {
        let b = d._toTrigger[a]
        b.close && b.close()
      }
      return d
    }
    d.open = function() {
      d.show()
      for (let a = 0; a < d._toTrigger.length; a++) {
        let b = d._toTrigger[a]
        b.open && b.open()
      }
      return d
    }
    var j = function(a) {
        switch (a.keyCode) {
          case 27:
            d.close()
            break
          case 192:
          case 32:
            document.activeElement.blur()
            document.getElementById('__rdly_iframe').focus()
            $$3(f)
              .find('#__rdly_text_button')
              .click()
            break
          default:
            return
        }
        return !1
      },
      k,
      l = document.createElement('style'),
      m = document.createElement('style')
    d.show = function() {
      h.show()
      l.textContent =
        'p, a, i, li, h1, h2, h3, h4, h5, h6, img, div.tx, div.tx1, div.tx2 :not(iframe):not(script) { filter: blur(2.5px); user-select:none; pointer-events:none; } body :not(iframe):not(script) { user-select:none; pointer-events:none; } #__rdly_iframe { user-select:none; }'
      m.textContent = 'html, body, .mw-body { background-color: #F5F5F5; } '
      document.body.appendChild(m)
      document.body.appendChild(l)
      window.addEventListener('keydown', j)
      k = document.getElementById('__rdly_iframe')
      k.contentDocument.body.addEventListener('keydown', j)
      document.getElementById('__rdly_iframe').focus()
      return d
    }
    d.hide = function() {
      h.hide()
      document.body.removeChild(l)
      document.body.removeChild(m)
      window.removeEventListener('keydown', j)
      k.contentDocument.body.removeEventListener('keydown', j)
      document.activeElement.blur()
      return d
    }
    d.destroy = function() {
      $$3(f).remove()
      return d
    }
    d._resizeIframeAndContents = function() {
      var a = $$3(f).find('.__rdly-to-grow')[0]
      if (!a) {
        return d
      }
      var b = $$3(a).parent()[0],
        e = b.getBoundingClientRect().top,
        g = a.getBoundingClientRect().height,
        i = e + g,
        j = document.documentElement.clientHeight,
        k = i - j,
        l = b.getBoundingClientRect().bottom,
        m = f.getBoundingClientRect().bottom,
        n = m - l
      k += n
      var o = g
      k > 0 && (o = g - k)
      b.style.height = o + 'px'
      var p = e + o + n
      h[0].style.height = p + 'px'
      return d
    }
    d.update = function() {
      setTimeout(d._resizeIframeAndContents, 4)
      return d
    }
    d.toggleHalfSpeed = function(a) {
      var b = a.target.checked ? 2.25 : 1
      c.set('delayModifier', b)
      var d = a.target.checked ? 0.6 : 1
      c.set('sentenceModifier', d)
    }
    var n = c.isModifier.bind(null, 2.25)
    d._addEvents = function() {
      $$3(d.nodes.close).on('touchend click', d.close)
      $$3(f).on('mousedown mouseup touchstart touchend', d.update)
      $$3(d.nodes.halfSpeed)[0].checked = n()
      $$3(d.nodes.halfSpeed).on('change', d.toggleHalfSpeed)
      $$3(window).on('resize', d.update)
      return d
    }
    d._addNodes = function(a) {
      !(() => {
        var b, c, g, h, j
        j = '__rdly'
        a = a || document.body
        try {
          ;(b = document.createElement('iframe')),
            (c = document.createElement('style')),
            (b.src = browser.extension.getURL('page.html')),
            document.body.appendChild(b),
            (g = b.contentDocument),
            (h = b.contentWindow),
            (g.body.style['overflow-x'] = 'hidden'),
            (g.body.style['overflow-y'] = 'hidden'),
            (g.body.innerHTML = i),
            (c.innerHTML = [coreCSSstr, nouiCSSstr].join('\n')),
            g.head.appendChild(c),
            (b.style['min-height'] = '81px'),
            (f = g.querySelector('#' + j)),
            (d._readerlyNode = f),
            (d.nodes = {
              doc: g,
              head: g.head,
              body: g.body,
              readerly: f,
              above: f.querySelectorAll('#__rdly_above_bar')[0],
              bar: f.querySelectorAll('#__rdly-bar')[0],
              barLeft: f.querySelectorAll('.__rdly-bar-left')[0],
              barCenter: f.querySelectorAll('.__rdly-bar-center')[0],
              aboveText: f.querySelectorAll('#__rdly_above_text_elements')[0],
              leftOfText: f.querySelectorAll('#__rdly_left_text_elements')[0],
              textElements: f.querySelectorAll('#__rdly_text_elements')[0],
              rightOfText: f.querySelectorAll('#__rdly_right_text_elements')[0],
              belowText: f.querySelectorAll('#__rdly_below_text_elements')[0],
              barRight: f.querySelectorAll('.__rdly-bar-right')[0],
              close: f.querySelectorAll('#__rdly_close')[0],
              halfSpeed: f.querySelectorAll('#__rdly_halvespeed_input')[0],
              below: f.querySelectorAll('#__rdly_below_bar')[0]
            }),
            console.debug(g),
            console.debug(h)
        } catch (a) {
          console.debug('_addNodes', a)
        }
      })()
      h = $$3(k)
      return d
    }
    d._init = function(b) {
      $$3('#__rdly_iframe')[0] ||
        (d
          ._addNodes(b)
          ._addEvents()
          .addToTriggerList(a),
        h.hide(),
        $$3('#__rdly_iframe').hide(0))
      return d
    }
    d._init(b)
    return d
  },
  ReaderlyDisplay_1 = ReaderlyDisplay,
  playbackCSS =
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
",
  playbackCSS_1 = playbackCSS,
  $$4,
  noUiSlider,
  playbackCSSstr
$$4 = require$$0
noUiSlider = require$$1
playbackCSSstr = playbackCSS_1
var PlaybackUI = function(a, b) {
    var c = {}
    c.modifierKeysDown = []
    c.sentenceModifierKey = 17
    c.isOpen = !1
    c.isPlaying = !1
    c.isScrubbing = !1
    c.nodes = {}
    var d = c.nodes,
      e,
      f,
      g,
      h,
      i,
      j,
      k,
      l,
      m,
      n,
      o = /[.,\/@#!$%\^&\*;:{}\+=\-_`~()‘’'"“”\[\]<>\|\\]/g,
      p = '<div id="__rdly_progress"></div>',
      q =
        '<div class="__rdly-flexible"><span id="__rdly-text-left" class="__rdly-text"></span><span id="__rdly-text-center" class="__rdly-text"></span><span id="__rdly-text-right" class="__rdly-text"></span></div>',
      r =
        '<div id="__rdly_indicator" class="__rdly-center __rdly-flexible"><span>|</span></div>',
      s =
        '<button id="__rdly_text_button" class="__rdly-transform-centered"></button>',
      t = '<div id="__rdly_loading" class="__rdly-hidden"></div>',
      u =
        '<div id="__rdly_play_pause_feedback" class="__rdly-transform-centered">\
	<div id="__rdly_pause_feedback" class="__rdly-playback-feedback __rdly-transform-centered">||</div>\
	<div id="__rdly_play_feedback" class="__rdly-playback-feedback __rdly-transform-centered">></div>\
</div>',
      v = chrome || v,
      w = v.extension.getURL('images/rewind.png'),
      x =
        '<button id="__rdly_rewind-sentence" class="__rdly-big-menu-button">\
    	<img src="' +
        w +
        '"></img>\
    </button>',
      y = v.extension.getURL('fonts/ClearSansLight.ttf')
    c.clear = function() {
      c.modifierKeysDown = []
      window.removeEventListener('keydown', c.keyDown)
      iframe.contentDocument.body.removeEventListener('keydown', c.keyDown)
      return c
    }
    c.open = function() {
      c.isOpen = !0
      return c
    }
    c.close = function() {
      c.isOpen = !1
      return c
    }
    c.hideText = function() {
      $$4(g).addClass('__rdly-hidden')
      return c
    }
    c.showText = function() {
      $$4(g).removeClass('__rdly-hidden')
      return c
    }
    c.wait = function() {
      c.hideText()
      $$4(i).addClass('__rdly-rotating')
      $$4(i).removeClass('__rdly-hidden')
      return c
    }
    c.stopWaiting = function() {
      $$4(i).addClass('__rdly-hidden')
      $$4(i).removeClass('__rdly-rotating')
      c.showText()
      return c
    }
    c.clearText = function() {
      $$4(g).html('')
      return c
    }
    c._play = function() {
      $$4(k).removeClass('__rdly-hidden')
      $$4(l).addClass('__rdly-hidden')
      return c
    }
    c._pause = function() {
      $$4(l).removeClass('__rdly-hidden')
      $$4(k).addClass('__rdly-hidden')
      $$4(j)
        .fadeTo(0, 0.7)
        .fadeTo(700, 0)
      return c
    }
    c._togglePlayPause = function() {
      a.togglePlayPause()
      return c
    }
    c._rewindSentence = function() {
      a.prevSentence()
      return c
    }
    c._shiftCharacter = function(a) {
      a.startText += a.middleText
      a.middleText = a.endText.substring(0, 1)
      a.endText = a.endText.substring(1)
    }
    var z = /^[\n\r\s]+$/,
      A =
        '<span class="__rdly-text-content"></span><span class="__rdly-text-content"></span><span class="__rdly-text-content"></span>'
    c._showNewFragment = function(a, b, d) {
      var e = d
      if (!z.test(e)) {
        var f = h.querySelector('#__rdly-text-left'),
          i = h.querySelector('#__rdly-text-center'),
          j = h.querySelector('#__rdly-text-right'),
          k = { startText: '', middleText: '', endText: '' },
          l = e.replace(o, '').length
        e.includes(' ')
          ? ((k.startText = ''), (k.middleText = e), (k.endText = ''))
          : e.includes(';') && e.includes('"')
            ? ((k.startText = ''), (k.middleText = e), (k.endText = ''))
            : e.includes(';') && (e.includes('(') || e.includes(')'))
              ? ((k.startText = ''), (k.middleText = e), (k.endText = ''))
              : e.includes('<') && e.includes('>')
                ? ((k.startText = ''), (k.middleText = e), (k.endText = ''))
                : e.includes('/') || e.includes('\\')
                  ? ((k.startText = ''), (k.middleText = e), (k.endText = ''))
                  : e.includes('document.getElementById') ||
                    e.includes('createScene();')
                    ? ((k.startText = ''), (k.middleText = e), (k.endText = ''))
                    : l >= 20
                      ? ((k.startText = ''),
                        (k.middleText = e),
                        (k.endText = ''))
                      : l >= 10
                        ? ((k.startText = e.substring(0, 3)),
                          (k.middleText = e.substring(3, 4)),
                          (k.endText = e.substring(4)))
                        : l >= 7
                          ? ((k.startText = e.substring(0, 2)),
                            (k.middleText = e.substring(2, 3)),
                            (k.endText = e.substring(3)))
                          : l >= 2
                            ? ((k.startText = e.substring(0, 1)),
                              (k.middleText = e.substring(1, 2)),
                              (k.endText = e.substring(2)))
                            : ((k.startText = ''),
                              (k.middleText = e),
                              (k.endText = ''))
        if (l >= 2) {
          var m = k.startText.match(o)
          if (m) {
            for (var n = 0; n < m.length; n++) c._shiftCharacter(k)
          }
          while (k.middleText.match(o) && k.endText.length > 0 && l > 2)
            c._shiftCharacter(k)
        }
        f.textContent = k.startText
        i.textContent = k.middleText
        j.textContent = k.endText
      } else $$4(g).html(A)
      c.stopWaiting()
      return c
    }
    c._showProgress = function(a, b, d, f, g) {
      c.isScrubbing || e.noUiSlider.set(f)
      return c
    }
    c._start = function() {
      e.noUiSlider.updateOptions({
        range: { min: 0, max: a.getLength() - 1 || 1 }
      })
      return c
    }
    c._startScrubbing = function(a, b) {
      c.isScrubbing = !0
      return c
    }
    c._updateScrubbedWords = function(b, d) {
      a.jumpTo({ type: 'index', amount: parseInt(b[d]) })
      return c
    }
    c._stopScrubbing = function(b, d) {
      c.isScrubbing = !1
      a.disengageJumpTo()
      return c
    }
    c.keyDown = function(b) {
      if (!c.isOpen) {
        return c
      }
      b.ctrlKey && b.keyCode === 39
        ? a.nextSentence()
        : b.ctrlKey && b.keyCode === 37
          ? a.prevSentence()
          : b.shiftKey && b.keyCode === 39
            ? a.nextTwoSentences()
            : b.shiftKey && b.keyCode === 37
              ? a.prevTwoSentences()
              : b.keyCode === 39
                ? a.nextWord()
                : b.keyCode === 37 && a.prevWord()
      return c
    }
    c._progressSlider = function(a) {
      $$4(a).addClass('noUi-extended')
      return a
    }
    c._addEvents = function() {
      $$4(a).on('playBegin', c._play)
      $$4(a).on('pauseFinish', c._pause)
      $$4(a).on('startFinish', c._start)
      $$4(a).on('newWordFragment', c._showNewFragment)
      $$4(a).on('progress', c._showProgress)
      e.noUiSlider.on('start', c._startScrubbing)
      e.noUiSlider.on('slide', c._updateScrubbedWords)
      e.noUiSlider.on('change', c._stopScrubbing)
      $$4(g).on('touchend click', c._togglePlayPause)
      $$4(n).on('touchend click', c._rewindSentence)
      var b
      b = document.getElementById('__rdly_iframe')
      window.addEventListener('keydown', c.keyDown)
      b.contentDocument.body.addEventListener('keydown', c.keyDown)
      return c
    }
    c._init = function(a) {
      c.modifierKeysDown = []
      c.sentenceModifierKey = 17
      e = d.progressNode = $$4(p)[0]
      c._progressSlider(e)
      f = d.indicator = $$4(r)[0]
      g = d.textButton = $$4(s)[0]
      h = d.textContainer = $$4(q)[0]
      i = d.loading = $$4(t)[0]
      j = d.playPauseFeedback = $$4(u)[0]
      k = d.playFeedback = $$4(j).find('#__rdly_play_feedback')[0]
      l = d.pauseFeedback = $$4(j).find('#__rdly_pause_feedback')[0]
      n = d.rewindSentence = $$4(x)[0]
      var b = a.nodes
      $$4(e).appendTo(b.above)
      $$4(j).appendTo(b.barCenter)
      $$4(f).appendTo(b.textElements)
      $$4(h).appendTo(b.textElements)
      $$4(g).appendTo(b.textElements)
      $$4(i).appendTo(b.textElements)
      $$4(m).appendTo(b.bar)
      $$4(n).appendTo(b.barLeft)
      playbackCSSstr =
        playbackCSSstr +
        '@font-face { font-family: Clear Sans Light;' +
        'src: url(' +
        y +
        ');}'
      playbackCSSstr = '<style>' + playbackCSSstr + '</style>'
      var o = $$4(playbackCSSstr)
      o.appendTo(b.head)
      a.addToTriggerList(c)
      c._addEvents()
      return c
    }
    c._init(b)
    return c
  },
  PlaybackUI_1 = PlaybackUI,
  settingsCSS =
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
',
  settingsCSS_1 = settingsCSS,
  $$5,
  settingsCSSstr
$$5 = require$$0
settingsCSSstr = settingsCSS_1
var ReaderlySettings = function(a) {
    var b = {}
    b.settings = {}
    b.nodes = {}
    b.menuNodes = {}
    b._isOpen = !1
    var c, d, e, f
    b._hideLoneTab = function() {
      Object.keys(b.menuNodes).length <= 1
        ? ($$5(f).addClass('__rdly-hidden'), $$5(f).css({ display: 'none' }))
        : ($$5(f).removeClass('__rdly-hidden'), $$5(f).css({ display: 'flex' }))
      return b
    }
    b._showMenu = function(a) {
      var c = $$5(a.target),
        d = a.target.id.replace(/_tab$/, ''),
        g = $$5(e).find('.__rdly-settings-menu'),
        h = $$5(f).children(),
        i = b.menuNodes[d]
      g.addClass('__rdly-hidden')
      g.css({ display: 'none' })
      $$5(i).removeClass('__rdly-hidden')
      $$5(i).css({ display: 'flex' })
      g.removeClass('__rdly-to-grow')
      $$5(i).addClass('__rdly-to-grow')
      h.removeClass('__rdly-active-ui')
      c.addClass('__rdly-active-ui')
      return b
    }
    b.destroyMenu = function(a) {
      var c = a.target.id
      $$5(b.menuNodes[c]).remove()
      b.menuNodes[c] = null
      $$5($$5(f).find('#' + c + '_tab')).remove()
      return b
    }
    b._addTab = function(a, c) {
      var d =
          '<div id="' + a + '_tab" class="__rdly-settings-tab">' + c + '</div>',
        e = $$5(d)
      e.appendTo(f)
      b._hideLoneTab()
      e.on('touchend click', b._showMenu)
      return e
    }
    b.addMenu = function(a) {
      var c = a.node,
        g = c.id
      if (b.menuNodes[g]) {
        console.warn(
          "A settings menu of this id is already in here. Please pick a different id or use mySettingsManager.destroyMenu( 'someID' ) to destroy it. Existing menu:",
          b.menuNodes[g]
        )
        return c
      }
      b.menuNodes[g] = c
      var h = $$5(c)
      h.addClass('__rdly-settings-menu')
      $$5(e).append(h)
      h[0].addEventListener('destroyOneSettingsMenu', b._removeMenu, !1)
      b.settings[a.id] = a
      $$5($$5(f).children()[0]).trigger('click')
      return b
    }
    b._open = function() {
      $$5(a.nodes.below).removeClass('__rdly-hidden')
      $$5(c).addClass('__rdly-active-ui')
      b._isOpen = !0
      a.update()
      return b
    }
    b.close = function(d) {
      $$5(a.nodes.below).addClass('__rdly-hidden')
      $$5(c).removeClass('__rdly-active-ui')
      b._isOpen = !1
      a.update()
      return b
    }
    b._toggleOpenClose = function() {
      b._isOpen ? b.close() : b._open()
      return b
    }
    b._addEvents = function() {
      $$5(c).on('touchend click', b._toggleOpenClose)
      return b
    }
    b._addBase = function(a) {
      var g = chrome || g,
        h = g.extension.getURL('images/settings.png'),
        i = $$5(
          '<button id="__rdly_open_settings" class="__rdly-big-menu-button">\
                                       <img class="__rdly-big-menu-button-image" src="' +
            h +
            '"></img>\
                                       </button>'
        ),
        j = $$5('<div id="__rdly_settings_container"></div>'),
        k = $$5('<div id="__rdly_settings_tabs"></div>'),
        l = $$5(
          '<div id="__rdly_settings_menus" class="__rdly-scrollable-y"></div>'
        ),
        m = a.nodes,
        n = m.head,
        o = m.barLeft,
        p = m.below,
        q = b.nodes
      c = q._openSettings = i.prependTo(o)[0]
      d = q._settingsContainer = j.prependTo(p)[0]
      f = q._tabs = k.appendTo(j)[0]
      e = q._menus = l.appendTo(j)[0]
      settingsCSSstr = '<style>' + settingsCSSstr + '</style>'
      var r = $$5(settingsCSSstr)
      r.appendTo(n)
      return b
    }
    b._init = function(a) {
      b._addBase(a)._addEvents()
      a.addToTriggerList(b)
      return b
    }
    b._init(a)
    return b
  },
  ReaderlySettings_1 = ReaderlySettings,
  $$6,
  noUiSlider$1
$$6 = require$$0
noUiSlider$1 = require$$1
var SpeedSettings = function(a, b) {
    var c = {}
    c.node = null
    c.id = 'speedSettings'
    c.tabText = 'Speeds'
    c._nodes = {}
    var d = c._nodes
    d.wpmInput = null
    d.wpmSlider = null
    d.sentenceDelayInput = null
    d.sentenceDelaySlider = null
    d.puncDelayInput = null
    d.puncDelaySlider = null
    d.longWordDelayInput = null
    d.longWordDelaySlider = null
    d.numericDelayInput = null
    d.numericDelaySlider = null
    c._oneSlider = function(b) {
      $$6(b.sliderNode).addClass('noUi-extended')
      b.sliderNode.noUiSlider.on('update', function(c, d) {
        b.inputNode.value = c[d]
        a.set(b.operation, c[d])
      })
      b.inputNode.addEventListener('change', function() {
        b.sliderNode.noUiSlider.set(this.value)
        a.set(b.operation, this.value)
      })
      return b.sliderNode
    }
    c._makeSliders = function() {
      var b = c._oneSlider,
        d = c._nodes,
        e = a._settings
      b({
        sliderNode: d.wpmSlider,
        range: { min: 25, max: 1000 },
        startVal: e.wpm,
        step: 25,
        inputNode: d.wpmInput,
        resolution: 1,
        operation: 'wpm'
      })
      b({
        sliderNode: d.sentenceDelaySlider,
        range: { min: 1, max: 5 },
        startVal: e.sentenceDelay,
        step: 0.1,
        inputNode: d.sentenceDelayInput,
        resolution: 0.1,
        operation: 'sentenceDelay'
      })
      b({
        sliderNode: d.puncDelaySlider,
        range: { min: 1, max: 1.5 },
        startVal: e.otherPuncDelay,
        step: 0.1,
        inputNode: d.puncDelayInput,
        resolution: 0.1,
        operation: 'otherPuncDelay'
      })
      b({
        sliderNode: d.longWordDelaySlider,
        range: { min: 1, max: 1.5 },
        startVal: e.longWordDelay,
        step: 0.1,
        inputNode: d.longWordDelayInput,
        resolution: 0.1,
        operation: 'longWordDelay'
      })
      b({
        sliderNode: d.numericDelaySlider,
        range: { min: 1, max: 1.5 },
        startVal: e.numericDelay,
        step: 0.1,
        inputNode: d.numericDelayInput,
        resolution: 0.1,
        operation: 'numericDelay'
      })
      return c
    }
    c._assignSettingItems = function() {
      var a = c._nodes,
        b = $$6(a.menu)
      a.wpmInput = b.find('#__rdly_wpm_input')[0]
      a.wpmSlider = b.find('#__rdly_wpm_slider')[0]
      a.sentenceDelayInput = b.find('#__rdly_sentencedelay_input')[0]
      a.sentenceDelaySlider = b.find('#__rdly_sentencedelay_slider')[0]
      a.puncDelayInput = b.find('#__rdly_puncdelay_input')[0]
      a.puncDelaySlider = b.find('#__rdly_puncdelay_slider')[0]
      a.longWordDelayInput = b.find('#__rdly_longworddelay_input')[0]
      a.longWordDelaySlider = b.find('#__rdly_longworddelay_slider')[0]
      a.numericDelayInput = b.find('#__rdly_numericdelay_input')[0]
      a.numericDelaySlider = b.find('#__rdly_numericdelay_slider')[0]
      return c
    }
    c._oneSetting = function(a, b) {
      return $$6(
        '<div id="__rdly_' +
          a +
          '_setting" class="__rdly-setting">\
						<label class="__rdly-slider-label">' +
          b +
          '</label>\
						<div class="__rdly-slider-controls">\
							<input id="__rdly_' +
          a +
          '_input" class="__rdly-slider-input" type="text"/>\
							<div id="__rdly_' +
          a +
          '_slider" class="__rdly-slider"></div>\
						</div>\
					</div>'
      )
    }
    c._addNodes = function(a) {
      var b = c._oneSetting,
        d = $$6('<div id="__rdly_speed_settings_menu"></div>')
      c.node = d[0]
      a.addMenu(c)
      c._nodes.menu = d[0]
      b('wpm', 'Words Per Minute').appendTo(d)
      b('sentencedelay', 'Sentence End Delay').appendTo(d)
      b('puncdelay', 'Punctuation Delay').appendTo(d)
      b('longworddelay', 'Long Word Delay').appendTo(d)
      b('numericdelay', 'Special Pattern Delay').appendTo(d)
      return c
    }
    c._init = function(a) {
      c._addNodes(a)
      c._assignSettingItems()
      c._makeSliders()
      return c
    }
    c._init(b)
    return c
  },
  SpeedSettings_1 = SpeedSettings,
  $$7,
  noUiSlider$2
$$7 = require$$0
noUiSlider$2 = require$$1
var WordSettings = function(a, b) {
    var c = {}
    c.node = null
    c.tabText = 'Words'
    c._nodes = {}
    var d = c._nodes
    d.maxCharsInput = null
    d.maxCharsSlider = null
    c._oneSlider = function(b) {
      $$7(b.sliderNode).addClass('noUi-extended')
      b.sliderNode.noUiSlider.on('update', function(c, d) {
        b.inputNode.value = c[d]
        a.set(b.operation, c[d])
      })
      b.inputNode.addEventListener('change', function() {
        b.sliderNode.noUiSlider.set(this.value)
        a.set(b.operation, this.value)
      })
      return b.sliderNode
    }
    c._makeSliders = function() {
      var b = c._oneSlider,
        d = c._nodes,
        e = a._settings
      b({
        sliderNode: d.maxCharsSlider,
        range: { min: 1, max: 25 },
        startVal: e.maxNumCharacters,
        step: 1,
        inputNode: d.maxCharsInput,
        resolution: 1,
        operation: 'maxNumCharacters'
      })
      return c
    }
    c._assignSettingItems = function() {
      var a = c._nodes,
        b = $$7(a.menu)
      a.maxCharsInput = b.find('#__rdly_maxchars_input')[0]
      a.maxCharsSlider = b.find('#__rdly_maxchars_slider')[0]
      return c
    }
    c._oneSetting = function(a, b) {
      return $$7(
        '<div id="__rdly_' +
          a +
          '_setting" class="__rdly-setting">\
						<label class="__rdly-slider-label">' +
          b +
          '</label>\
						<div class="__rdly-slider-controls">\
							<input id="__rdly_' +
          a +
          '_input" class="__rdly-slider-input" type="text"/>\
							<div id="__rdly_' +
          a +
          '_slider" class="__rdly-slider"></div>\
						</div>\
					</div>'
      )
    }
    c._addNodes = function() {
      var a = c._oneSetting,
        b = $$7('<div id="__rdly_word_settings_menu"></div>')
      c.node = b[0]
      c._nodes.menu = b[0]
      a('maxchars', 'Max Letters Shown').appendTo(b)
      return c
    }
    c._init = function(a) {
      c._addNodes(a)
      a.addMenu(c)
      c._assignSettingItems()
      c._makeSliders()
      return c
    }
    c._init(b)
    return c
  },
  WordSettings_1 = WordSettings
!(function() {
  try {
    var a,
      b,
      c,
      d,
      f,
      g,
      h,
      i,
      j,
      k,
      l,
      m,
      n,
      o,
      p,
      q,
      r,
      s,
      t,
      u,
      v,
      w,
      x,
      y,
      z,
      A,
      B,
      C
    a = require$$0
    b = Parser_1
    c = ParserSetup_1
    d = Settings_1
    f = ReaderlyStorage_1
    g = WordNav_1
    h = WordSplitter_1
    i = StringTime_1
    j = ReaderlyTimer_1
    k = ReaderlyDisplay_1
    l = PlaybackUI_1
    m = ReaderlySettings_1
    n = SpeedSettings_1
    o = WordSettings_1
    console.debug('definitions')
    function H(a) {
      if (a.tagName === 'PRE' || a.tagName === 'CODE') {
        return !0
      } else if (a.childNodes.length === 1) {
        return H(a.childNodes[0])
      } else {
        return !1
      }
    }
    function I(a) {
      return Array.from(a.childNodes)
        .map(a => {
          let b,
            c = a.textContent
          if (c.trim().length === 0) {
            return
          } else {
            H(a) ? (b = 'lines') : (b = 'sentences')
            return { splitMethod: b, text: c }
          }
        })
        .filter(a => {
          return a != null
        })
    }
    function J() {
      a(u).on('starting', function a() {
        w && w.wait()
      })
    }
    function K(a) {
      try {
        ;(B = new d(s, a)),
          (t = new i(B._settings)),
          (u = new j(t)),
          (v = new k(u, undefined, B)),
          (y = v.nodes.textElements),
          (q = new h(y, B)),
          (w = new l(u, v)),
          (x = new m(v)),
          (z = new n(B, x)),
          (A = new o(B, x)),
          J()
      } catch (a) {
        console.debug('afterLoadSettings, Display probably failed :(', a)
      } finally {
        console.debug('afterLoadSettings is finished.', {
          setts: B,
          delayer: t,
          timer: u,
          coreDisplay: v,
          fragmentor: q,
          playback: w,
          settingsUI: x,
          speedSetsUI: z,
          wordSetsUI: A
        })
      }
    }
    function L() {
      var a = new c()
      a.debug = !1
      var d = a.cleanNode,
        e = a.detectLanguage,
        f = a.findArticle,
        g = a.cleanText,
        h = a.splitSentences
      return new b(d, e, f, g, h)
    }
    function M() {
      p = L()
      p.debug = !1
      r = new g()
      s = new f()
      s.loadAll(K)
    }
    M()
    function N(a) {
      var b = p.parse(a)
      p.debug &&
        console.log(
          "~~~~~parse debug~~~~~ If any of those tests failed, the problem isn't with Readerly, it's with one of the other libraries. That problem will have to be fixed later."
        )
      r.process(b, q)
      u.start(r)
      return !0
    }
    function O() {
      console.debug('openReaderly')
      v.open()
      w.wait()
    }
    function P(a) {
      var b = a.querySelectorAll(
        'svg, sup, script, style, video, head, header, title, div#cookie-policy, span.attribution, span.caption, div.trending-ticker, div.adblocker-message, q.quote__content, table.wikitable, div.rellink, div.thumbcaption, div.magnify, div.toc, div.thumb.tright, span.mw-editsection, p.media-title, div.cc_banner-wrapper, span.newsCaption, span.bullet, .ribbon__related__articles__module, .short-form-article__header, div.floatingad, div#ticker, div.breadcrumbs, div.left-menu, section.secondary-navigation, ul.exp, div.tip, .otherversionswrapper, .breadcrumbs.clear, .mb20, [itemprop=description], .cookie-notice, #sidebar-debugger-data, .c-related-list, .u-desktop-only, .c-nav-list__col, .c-nav-list__label, .c-nav-list__label, .art-pre-body-facebook__title, .art-pre-body-digital-sub, .read-more-links, .warning, .skinny-header, .publication-theme-button, .confirm, .video-headline, .timer-text, .vjs-control-text, .collection-creatorbox, .primary-nav-flyout__acc-close-flyout.vh, .secondary-nav-flyout__acc-close.vh,  .widget-wrap, .breakingNewsContainer, .content__dateline, .hatnote, .thumbcaption, .hiddenStructure, .hiddenStructure1, .infobox, #siteSub, #toc, #jump-to-nav, #siteSub, h1, h2, h3, h4, h5, h6, footer, figure, figcaption, aside, small, .n-skip-link, .o-cookie-message__description, span.message-title, a.visually-hidden, time, div.column--secondary, div#main-navigation-inside, span.wpneo-tooltip, noscript, div.tab-content, div.video-upsell-message, table.vertical-navbox, span.mbox-text-span, div.stackCommerceItemWrap, a.crumb, span.contrib-tagline, div.contributions__epic, div#contextlinks, p.figurecaption, date, tags, widget, div#bbccookies-prompt, a.title, a.syndication-btn, div.cat-list, div.reflist, div.newsletter, div.related-posts, p.h3title, span.greybar, div.video-wrapper, div#breadcrumb, div.breaking-news, span.nowrap, a.shiftnav-target, ul#menu-main-navigation, div.metabar-pad, a.twitter-follow-button, div.announcement_left, div.post-top, span.source, .article-meta-box, .fusion-megamenu-bullet, .udemy_code_details, .fullwidth-box, .tags-container, .mini-info-list, .ubermenu-target-title, .header-alert-banner, .prevnext, .summary, .Quick_links, .column-strip, .fmht, .ctag, .block-share, .post-footer, .player-with-placeholder__caption, .site-brand, .content-footer, .shareBar-follow-modal, .menu-info, .subTitle-follow-modal, #main-sections-nav-inner, .rich-link, #fb-messenger-modal, .meta__extras, .js-components-container, .meta__contact-header, .meta__twitter, .off-screen, .commerce-disclaimer, .social, .site-message, .skip, .overlay, .vjs-modal-dialog-description, .all-head-menu, #notices, #breadcrumbs, .pagenav-container, #announcementtabs-18-5, .announcementtext, .module-buttons, .userinfo, .widget-tabs-nav, .filter-options-list, .condense-text, .conversation-toolbar-wrapper, .main-title, .b-top-background__header-mainnav-subnav, #main-navbar-wrapper, #channel-subtabbar, #searchPopupContent, .content-nav, .ans_page_question_header, .EventHeader, .answer_user, .pre-btn, .nxt-btn, .topgooglead, .cc_message'
      )
      for (var c = 0; c < b.length; c++) b[c].parentElement.removeChild(b[c])
    }
    function Q(a, b, c, d) {
      a = c.innerHTML
      if (a.includes(b)) {
        var e = c.querySelectorAll(d)
        if (e.length) {
          for (var f = 0, g = e.length; f < g; f++)
            e[f].parentNode.removeChild(e[f])
        }
      }
    }
    function R(b, c, d, e, f) {
      var g = a('html').clone(),
        h = g[0],
        i = h.innerHTML,
        b = e.innerHTML
      if (b.includes(c) && i.includes(d)) {
        var j = e.querySelectorAll(f)
        if (j.length) {
          for (var k = 0, l = j.length; k < l; k++)
            j[k].parentNode.removeChild(j[k])
        }
      }
    }
    function S() {
      var a = document.getSelection(),
        b = a.getRangeAt(0).cloneContents(),
        c = b.querySelectorAll(
          'h1, h2, h3, h4, h5, h6, #jump-to-nav, #siteSub, .infobox, [role=note], span.attribution, span.caption, div.adblocker-message, q.quote__content, table.wikitable, div.rellink, span.bullet, div.floatingad, span.mw-editsection, div.thumbcaption, div.magnify, div.toc'
        )
      if (c.length) {
        for (var d = 0, e = c.length; d < e; d++)
          c[d].parentNode.removeChild(c[d])
      }
      var f = b.querySelectorAll('sup')
      if (f.length) {
        for (d = 0, e = f.length; d < e; d++) f[d].parentNode.removeChild(f[d])
      }
      var g = b.querySelectorAll('script')
      if (g.length) {
        for (d = 0, e = g.length; d < e; d++) g[d].parentNode.removeChild(g[d])
      }
      var h = document.createElement('div')
      h.appendChild(b.cloneNode(!0))
      h = h.innerHTML
      if (!h.match(/<\/p>/g)) h = '<p>' + h + '</p>'
      var i = /<\/p>/g,
        h = h.replace(i, function(a) {
          return a.replace(/<\/p>/g, ' </p>')
        }),
        i = /[\s]*(<br>)[\s]*/g,
        h = h.replace(i, function(a) {
          return a.replace(/[\s]*(<br>)[\s]*/g, ' ')
        }),
        i = /[a-zά-ω][\s]*(<br>)[\s]*[A-ZΑ-ώ]/g,
        h = h.replace(i, function(a) {
          return a.replace(/[\s]*(<br>)[\s]*/g, ' ')
        }),
        i = /[a-zά-ω][\s]*<\/div>[\s]*/g,
        h = h.replace(i, function(a) {
          return a.replace(/[\s]*<\/div>[\s]*/g, '. </div> ')
        }),
        i = /<p[^>]*>[^"]*["][^"]+[.][\s]*(<\/p>)/g,
        h = h.replace(i, function(a) {
          return a.replace(/[.][\s]*<\/p>/g, '."</p>')
        }),
        i = /<p[^>]*>[^"]*["][^"]+[?][\s]*(<\/p>)/g,
        h = h.replace(i, function(a) {
          return a.replace(/[?][\s]*<\/p>/g, '?"</p>')
        }),
        i = /<p[^>]*>[“][^“]+[.][\s]*["](<\/p>)/g,
        h = h.replace(i, function(a) {
          return a.replace(/[.][\s]*["](<\/p>)/g, '.</p>')
        }),
        h = h.replace(/[\s]+["]["][\s]+/g, ' "'),
        i = /[&](nbsp)[;]/g,
        h = h.replace(i, function(a) {
          return a.replace(/[&](nbsp)[;]/g, ' ')
        }),
        h = h.replace(/[&](amp)[;]/g, '&'),
        h = h.replace(/[&](shy|quot|lt|gt)[;]/g, ''),
        i = /<\/p/g,
        h = h.replace(i, function(a) {
          return a + ' '
        }),
        i = /[^.](<\/li>)/g,
        h = h.replace(i, function(a) {
          return a.replace(/(<\/li>)/g, '.</li>')
        }),
        h = h.replace(/(\r\n|\n|\r)/gm, ' '),
        h = h.replace(/\s\s+/gm, ' '),
        h = h.replace(/<[^>]+>/g, ''),
        h = h.replace(/<\/[^>]+>/g, ''),
        j = String(h),
        j = j.replace(/[—]/g, '-'),
        j = j.replace(/[“]­/g, '"'),
        j = j.replace(/[”]­/g, '"')
      O()
      return j ? N(j) : !1
    }
    function T() {
      console.debug('readArticle')
      O()
      var b = a('html').clone(),
        c = b[0]
      P(c)
      Q(
        d,
        'nature.com',
        c,
        'div.text-orange.content.grade-c-show, p.contrast-text.text13.hide-overflow'
      )
      Q(d, 'sparknotes.com', c, 'div.containerUGC')
      Q(d, 'independent.co.uk', c, 'div.image')
      Q(d, 'wowwiki.wikia.com', c, 'dl')
      Q(d, 'wow.gamepedia.com', c, 'dl')
      var d = c.innerHTML,
        d = d.replace(/<div class=["]hiddenStructure[^]+<\/div>/g, ''),
        d = d.replace(
          /<a href=["]http:\/\/pages.email.bbc.com\/subscribe["] class=["]story-body__link["][^]+<\/a>/g,
          ''
        ),
        d = d.replace(/<sup[^>]*>[^]+<\/sup>/g, ''),
        d = d.replace(/<span[^>]*>|<\/span>/g, ''),
        d = d.replace(/<beelinespan[^>]*>|<\/beelinespan>/g, ''),
        d = d.replace(/<!--?[^]+?-->/g, ''),
        d = d.replace(/<!--[^]+?-->/g, ''),
        d = d.replace(/<!--[^]+-->/g, ''),
        e = /<\/p>/g,
        d = d.replace(e, function(a) {
          return a.replace(/<\/p>/g, ' </p>')
        }),
        e = /[\s]*(<br>)[\s]*/g,
        d = d.replace(e, function(a) {
          return a.replace(/[\s]*(<br>)[\s]*/g, ' ')
        }),
        e = /<p[^>]*>[^"]*["][^"]+[.][\s]*(<\/p>)/g,
        d = d.replace(e, function(a) {
          return a.replace(/[.][\s]*<\/p>/g, '."</p>')
        }),
        e = /<p[^>]*>[^"]*["][^"]+[?][\s]*(<\/p>)/g,
        d = d.replace(e, function(a) {
          return a.replace(/[?][\s]*<\/p>/g, '?"</p>')
        }),
        e = /<p[^>]*>[“][^“]+[.][\s]*["](<\/p>)/g,
        d = d.replace(e, function(a) {
          return a.replace(/[.][\s]*["](<\/p>)/g, '.</p>')
        }),
        d = d.replace(/[\s]+["]["][\s]+/g, ' "'),
        e = /[\s]*(<\/p>)[\s]*(<p>)[\s]*/g,
        d = d.replace(e, function(a) {
          return a.replace(/(<\/p>)[\s]*(<p>)/g, '')
        }),
        e = /[^.](<\/li>)/g,
        d = d.replace(e, function(a) {
          return a.replace(/(<\/li>)/g, '.</li>')
        }),
        e = /[\s]+[.](<\/li>)/g,
        d = d.replace(e, function(a) {
          return a.replace(/[\s]+/g, '')
        }),
        e = /[.][\s]*[.][\s]*(<\/li>)/g,
        d = d.replace(e, function(a) {
          return a.replace(/[.][\s]*[.]/g, '.')
        }),
        d = d.replace(/(\r\n|\n|\r)/gm, ' '),
        d = d.replace(/\s\s+/gm, ' '),
        d = d.replace(/[“]­/g, '"'),
        d = d.replace(/[”]­/g, '"'),
        d = d.replace(/<a[^>]*>|<\/a>/g, ''),
        d = d.replace(/<i[^>]*>|<\/i>/g, ''),
        d = d.replace(/<em[^>]*>|<\/em>/g, ''),
        d = d.replace(/<hr>/g, '')
      c.innerHTML = d
      N(c)
    }
    function U(a) {
      while (a.textContent === '' && a.parentElement !== null)
        a = a.parentElement
      return a
    }
    var D,
      E,
      F = []
    function V(a) {
      E = undefined
      var b = U(a.target),
        c = F.indexOf(b)
      if (c !== -1) {
        b.classList.remove('__rdly-selected')
        F.splice(c, 1)
        return
      }
      var d = F.some(function(a) {
        return a.contains(b)
      })
      if (d) return
      F = F.filter(function(a) {
        var c = b.contains(a)
        c && a.classList.remove('__rdly-selected')
        return !c
      })
      b.classList.add('__rdly-selected')
      F.push(b)
    }
    function W() {
      var a = Array.from(document.getElementsByTagName('*'))
        .filter(function(a) {
          return F.indexOf(a) !== -1
        })
        .map(function(a) {
          var b = a.cloneNode(!0)
          P(b)
          return b.textContent
        })
        .join(' ')
      O()
      N(a)
    }
    function X(a) {
      if (a.ctrlKey || D === a.target) return
      E !== undefined &&
        E.classList !== undefined &&
        E.classList.remove('__rdly-selected')
      D = a.target
      var b = U(a.target)
      E = b
      b.classList.add('__rdly-selected')
    }
    function Y(a) {
      switch (a.keyCode) {
        case 17:
          F.length > 0 && (W(), ab())
          break
        case 27:
          ab()
          break
        default:
          return
      }
      return !1
    }
    function Z(a) {
      switch (a.keyCode) {
        case 17:
          D !== undefined &&
            (D.classList.remove('__rdly-selected'), (D = undefined))
          break
        default:
          return
      }
      return !1
    }
    function _(a) {
      a.preventDefault()
      a.stopPropagation()
      if (a.ctrlKey) V(a)
      else if (E) {
        O()
        var b = E.cloneNode(!0)
        P(b)
        Q(
          c,
          'nature.com',
          b,
          'div.text-orange.content.grade-c-show, p.contrast-text.text13.hide-overflow'
        )
        R(c, 'calibre', '<title>Bill Gates</title>', b, '.boxtext')
        var c = b.innerHTML,
          d = document.createElement('div'),
          e = c.replace(
            /<div class=["]hiddenStructure.+[\s]*.+[\s]*.+<\/div>/g,
            ''
          ),
          e = e.replace(
            /<div class=["]col action tooltip hide["][^>]*>[\s]*.+[\s]*.+<\/div>/g,
            ''
          ),
          e = e.replace(
            /<div class=["]exp action tooltip["][^>]*>[\s]*.+[\s]*.+<\/div>/g,
            ''
          ),
          e = e.replace(
            /<div class=["]breadcrumbs clear["][^>]*><ul>[\s]+<li>.+[\s]*<li>.+[\s]*<li>.+[\s]*<li>.+[\s]*<\/ul><\/div>/g,
            ''
          ),
          e = e.replace(/<div[^>]*>|<\/div>/g, ''),
          e = e.replace(/<span[^>]*>|<\/span>/g, ''),
          e = e.replace(/<beelinespan[^>]*>|<\/beelinespan>/g, ''),
          e = e.replace(/<img[^>]*>.+<\/img>/g, ''),
          e = e.replace(/<img[^>]*>/g, ''),
          e = e.replace(/<\/img>/g, ''),
          f = /<\/p>/g,
          e = e.replace(f, function(a) {
            return a.replace(/<\/p>/g, ' </p>')
          }),
          f = /[\s]+([a-zA-Z]|[ά-ωΑ-ώ]){1,20}[\s]+[!]/g,
          e = e.replace(f, function(a) {
            return a.replace(/[\s]+[!]/g, '!')
          }),
          f = /(if)[\s]+[(]/g,
          e = e.replace(f, function(a) {
            return a.replace(/[\s]/g, '')
          }),
          e = e.replace(/<!--[\s\S]*?-->/gm, ''),
          f = /^[\s]+[{][\s]+/g,
          e = e.replace(f, function(a) {
            return a.replace(/[\s]+[{]/g, '}')
          }),
          f = /[\s]+[}][\s]+/g,
          e = e.replace(f, function(a) {
            return a.replace(/[\s]+[}]/g, '}')
          }),
          f = /[}][\s]+/g,
          e = e.replace(f, function(a) {
            return a.replace(/[}][\s]+/g, '')
          }),
          f = /[\s]+[(][\s]+/g,
          e = e.replace(f, function(a) {
            return a.replace(/[(][\s]+/g, '(')
          }),
          f = /(&nbsp;)+[)][,][\s]+/g,
          e = e.replace(f, function(a) {
            return a.replace(/(&nbsp;)+[)][,]/g, '),')
          }),
          f = /(&nbsp;)+[)][,][\s]+/g,
          e = e.replace(f, function(a) {
            return a.replace(/(&nbsp;)+[)][,]/g, '),')
          }),
          f = /<\/code>[\s]*[0-9]+[\s]*<\/pre>/g,
          e = e.replace(f, function(a) {
            return a.replace(/[\s]*[0-9]+[\s]*/g, '')
          }),
          f = /[}][\s]{2,}([a-zA-Z]|[ά-ωΑ-ώ])/g,
          e = e.replace(f, function(a) {
            return a.replace(/[\s]{2,}/g, ' ')
          })
        for (count = 0; count < 10; count++) {
          var g = /(.{15,33})([\s]|[;]|[{]|[)])/gm,
            e = e.replace(g, '$1\n')
        }
        ;(f = /<p[^>]*>[^"]*["][^"]+[.][\s]*(<\/p>)/g),
          (e = e.replace(f, function(a) {
            return a.replace(/[.][\s]*<\/p>/g, '."</p>')
          })),
          (f = /<p[^>]*>[^"]*["][^"]+[?][\s]*(<\/p>)/g),
          (e = e.replace(f, function(a) {
            return a.replace(/[?][\s]*<\/p>/g, '?"</p>')
          })),
          (f = /<p[^>]*>[“][^“]+[.][\s]*["](<\/p>)/g),
          (e = e.replace(f, function(a) {
            return a.replace(/[.][\s]*["](<\/p>)/g, '.</p>')
          })),
          (e = e.replace(/[\s]+["]["][\s]+/g, ' "')),
          (f = /[^.](<\/li>)/g),
          (e = e.replace(f, function(a) {
            return a.replace(/(<\/li>)/g, '.</li>')
          })),
          (f = /[\s]+[.](<\/li>)/g),
          (e = e.replace(f, function(a) {
            return a.replace(/[\s]+/g, '')
          })),
          (f = /[.][\s]*[.][\s]*(<\/li>)/g),
          (e = e.replace(f, function(a) {
            return a.replace(/[.][\s]*[.]/g, '.')
          }))
        if (!e.match(/<pre[^>]*>/g)) e = e.replace(/<\/pre>/g, '')
        d.innerHTML = e
        e = d.innerHTML
        ;(f = /[\u2014-\u2015\u2E3A\u2E3B]/g),
          (e = e.replace(f, function(a) {
            return a.replace(/[-\u2014-\u2015\u2E3A\u2E3B]/g, ' ')
          })),
          (f = /[\s]+[-\u2010-\u2011\uFE58\uFE63\uFF0D][\s]+/g),
          (e = e.replace(f, function(a) {
            return a.replace(/[-\u2010-\u2011\uFE58\uFE63\uFF0D]/g, ' ')
          })),
          (e = e.replace(
            /(?:[a-zA-Z]|[ά-ωΑ-ώ])[\s]+[.](?:^[a-zA-Z]|[ά-ωΑ-ώ])/g,
            '.'
          )),
          (f = /…/g),
          (e = e.replace(f, function(a) {
            return a + ' '
          })),
          (f = /[\s]+[.][\s]+/g),
          (e = e.replace(f, function(a) {
            return a.replace(/[\s]+[.]/g, '.')
          })),
          (e = e.replace(/<a[^>]*>|<\/a>/g, '')),
          (e = e.replace(/<b[^>]*>|<\/b>/g, '')),
          (e = e.replace(/<br>/g, ' ')),
          (e = e.replace(/  +/g, ' ')),
          (e = e.replace(/[.][”]­/g, '."')),
          (e = e.replace(/[“]­/g, '"')),
          (e = e.replace(/[”]­/g, '"'))
        console.debug(e)
        d.innerHTML = e
        N(I(d))
        ab()
      }
      return !1
    }
    function $() {
      document.activeElement.blur()
      document.addEventListener('mousemove', X)
      document.addEventListener('click', _)
      document.addEventListener('keyup', Y)
      document.addEventListener('keydown', Z)
    }
    function aa() {
      var a = v.nodes.doc.getElementById('__rdly_halvespeed_input')
      a.checked = !a.checked
      a.dispatchEvent(new Event('change'))
    }
    function ab() {
      document.removeEventListener('mousemove', X)
      document.removeEventListener('click', _)
      document.removeEventListener('keyup', Y)
      document.removeEventListener('keydown', Z)
      E && E.classList.remove('__rdly-selected')
      for (var a = 0; a < F.length; a++) {
        var b = F[a]
        b.classList.remove('__rdly-selected')
      }
      F = []
      E = undefined
      D = undefined
    }
    var G = chrome || G
    try {
      G.runtime.onMessage.addListener(function(a, b, c) {
        if (C === a.time) {
          return !1
        }
        console.debug('runtime message', a, b)
        ac(a, b, c)
      }),
        console.debug('Listening to runtime messages :)')
    } catch (a) {
      console.debug('Failed to read extension messages')
    }
    try {
      G.extension.onMessage.addListener(function(a, b, c) {
        if (C === a.time) {
          return !1
        }
        console.debug('extension message', a, b)
        ac(a, b, c)
      }),
        console.debug('Listening to extension messages :)')
    } catch (a) {
      console.debug('Failed to read extension messages')
    }
    function ac(a, b, c) {
      if (C === a.time) {
        return !1
      }
      C = a.time
      switch (a.functiontoInvoke) {
        case 'readSelectedText':
          S()
          break
        case 'readFullPage':
          T()
          break
        case 'getSelection':
          $()
          break
        case 'halveSpeed':
          aa()
          break
      }
    }
  } catch (a) {
    console.debug('Main script failed!', a)
  }
})()
var main = {}
module.exports = main
