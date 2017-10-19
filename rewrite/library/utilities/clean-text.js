export default function cleanText (text) {
  var cleaned
  var regexp

  cleaned = text

  regexp = /[“]/g
  cleaned = cleaned.replace(regexp, match => match.replace(/[“]/g, '"'))

  regexp = /[”]/g
  cleaned = cleaned.replace(regexp, match => match.replace(/[”]/g, '"'))

  regexp = /['][\s]+["]+[\s]/g
  cleaned = cleaned.replace(
    regexp,
    match => match.replace(/['][\s]+/g, '\'') + ' '
  )

  cleaned = cleaned.replace(/[\s]+[*]+(?=[A-Z])/g, ' ')
  cleaned = cleaned.replace(/[\s]+[*]+[\s]+(?=[A-Z])/g, ' ')
  cleaned = cleaned.replace(/[.](?=[A-Z])/g, '. ')
  cleaned = cleaned.replace(/[\s]+[.](?=[A-Z])/g, '. ')
  cleaned = cleaned.replace(/[\s]+[.](?=[\s])+(?![A-Z])/g, '. ')
  cleaned = cleaned.replace(/[.](?=[A-Z])/g, '. ')
  cleaned = cleaned.replace(/[.][\s+]+(?=[A-Z])/g, '. ')
  cleaned = cleaned.replace(/[\s]+[.](?![\s])+(?=[.])/g, '.')
  cleaned = cleaned.replace(/[\s]+[.](?![\s])+(?=[a-z]|[A-Z])/g, '.')
  cleaned = cleaned.replace(/[:](?=[A-Z])/g, ': ')
  cleaned = cleaned.replace(/[\s]+[:](?=[A-Z])/g, ': ')
  cleaned = cleaned.replace(/[\s]+[:](?=[\s])+(?![A-Z])/g, ': ')
  cleaned = cleaned.replace(/(?![a-z])[:](?=[A-Z])/g, ': ')
  cleaned = cleaned.replace(/(?![a-z])[:][\s+]+(?=[A-Z])/g, ': ')
  cleaned = cleaned.replace(/[\s]+[:](?![\s])+(?=[.])/g, ':')
  cleaned = cleaned.replace(/[\s]+[:](?![\s])+(?=[a-z]|[A-Z])/g, ':')
  cleaned = cleaned.replace(/[\s]+[?](?=[A-Z])/g, '? ')
  cleaned = cleaned.replace(/[\s]+[?](?=[\s])(?=[A-Z])/g, '? ')
  cleaned = cleaned.replace(/[?](?=[A-Z])/g, '? ')
  cleaned = cleaned.replace(/[?][\s]+(?=[A-Z])/g, '? ')
  cleaned = cleaned.replace(/[\s]+[?](?=[\s])+(?=[.])/g, '?')
  cleaned = cleaned.replace(/[\s]+[?](?![\s])+(?=[a-z]|[A-Z])/g, '?')
  cleaned = cleaned.replace(/[.][\s]+[.]/g, '.. ')

  regexp = /…/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/…/g, '...')
  })
  cleaned = cleaned.replace(/[\s]+[.][\s]+/g, '.')

  regexp = /([.]|[”])[\s]+[0-9]{1}[.][\s]+[A-Z]{1}/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[.][\s]+(?=[A-Z])/g, ' ')
  })

  regexp = /(Sir|St|Mr|Ms|Mrs|Jr|Sr|Sgt)[.]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[.]/g, ' ')
  })

  regexp = /(UK|USA|US)[.][A-Z]{1}/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[.]/g, '. ')
  })

  regexp = /[α-ωa-z][.][A-Z]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[.]/g, '. ')
  })

  regexp = /[)][.][A-Z]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[.]/g, '. ')
  })

  regexp = /['][.][A-Z]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[.]/g, '. ')
  })

  regexp = /["][.][A-Z]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[.]/g, '. ')
  })

  regexp = /[”][.][A-Z]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[.]/g, '. ')
  })

  regexp = /[\s]+[?][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[?]/g, '?')
  })

  regexp = /[,][.][A-Z]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[.]/g, '. ')
  })
  cleaned = cleaned.replace(/[—]/g, ' ')
  cleaned = cleaned.replace(/[\s]+[–][\s]+/g, ' ')
  cleaned = cleaned.replace(/[\s]+[-][\s]+/g, ' ')
  cleaned = cleaned.replace(/[\s]+[--][\s]+/g, ' ')
  regexp = /([a-z]|[A-Z])+[)]([a-z]|[A-Z])/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[)]/g, ') ')
  })
  cleaned = cleaned.replace(/…/g, '… ')
  regexp = /([a-z]|[A-Z]|[ά-ωΑ-ώ])[.][(]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[(]/g, ' (')
  })

  regexp = /([a-z]|[A-Z]|[ά-ωΑ-ώ])[.][0-9]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[.]/g, '. ')
  })

  regexp = /[\s]+[.]{3}/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]/g, '')
  })

  regexp = /([a-z]|[ά-ω])[?][^'"]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[?]/g, '? ')
  })

  regexp = /["][\s]+[)]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]/g, '')
  })

  regexp = /[.][\s]+['][^A-ZΑ-ώ]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[']/g, '\' ')
  })

  regexp = /[\s]+["][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/["][\s]+/g, '"')
  })

  regexp = /[’][\s]+[.][”]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[.]+/g, '.')
  })

  regexp = /[”][\s]+[?]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+/g, '')
  })

  regexp = /[\s]+["][)][,]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+/g, '')
  })

  regexp = /[?][\s]+[”]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+/g, '')
  })

  regexp = /[.][\s]+[’](?=[\s]+.+[’])/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[’]/g, ' ’')
  })

  regexp = /[.][\s]+['](?=[\s]+.+['])/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[']/g, ' \'')
  })

  regexp = /”-/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/”-/g, '” -')
  })

  regexp = /[\s]+(!”)/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+/g, '')
  })

  regexp = /[!][’]([a-zA-Z]|[ά-ωΑ-ώ])/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[’]+/g, '’ ')
  })

  regexp = /[,][’]([a-zA-Z]|[ά-ωΑ-ώ]){1,20}/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[’]+/g, '’ ')
  })

  regexp = /[\s]+["]["]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+["]/g, '" ')
  })

  regexp = /[’][\s]+[.]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]/g, '')
  })

  regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[.][’]([a-zA-Z]|[ά-ωΑ-ώ])/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[’]/g, '’ ')
  })

  regexp = /[\s]+[,][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[,]/g, ',')
  })

  regexp = /[\s]+[)][.][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[)][.]/g, ').')
  })

  regexp = /[.][’]([a-zA-Z]|[ά-ωΑ-ώ])/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[.][’]/g, '.’ ')
  })

  regexp = /[\s]+([a-z]|[ά-ω])[,]([a-z]|[ά-ω])[\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[,]/g, ', ')
  })

  regexp = /[?][”][’]([a-zA-Z]|[ά-ωΑ-ώ])/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[’]/g, '’ ')
  })

  regexp = /[\s]+["][)][.]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+/g, '')
  })

  regexp = /[\s]+["][.][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+["][.]/g, '".')
  })

  regexp = /[\s]+[’][”][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[’][”]/g, '’”')
  })

  regexp = /[\s]+[:][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[:]/g, ':')
  })

  regexp = /[\s]+[;][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[;]/g, ';')
  })

  regexp = /[\s]+[)][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[)]/g, ')')
  })

  regexp = /[,][”][’]([a-zA-Z]|[ά-ωΑ-ώ])/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[’]/g, '’ ')
  })

  regexp = /[U][\s][K]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]/g, '')
  })

  regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[’][\s]+[sltdmve]{1,2}[\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[’][\s]+/g, '’')
  })

  regexp = /([.]|[?]|[!])+[\s]+[’]([a-zA-Z]|[ά-ωΑ-ώ])/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[’]/g, '’ ')
  })

  regexp = /[’][‘]([a-zA-Z]|[ά-ωΑ-ώ])/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[‘]/g, ' ‘')
  })

  regexp = /[\s]+[’][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[’]/g, '’')
  })

  regexp = /[\s]+[!][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[!]/g, '!')
  })

  regexp = /[\s]+[?][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[?]/g, '?')
  })

  regexp = /[“]([a-zA-Z]|[ά-ωΑ-ώ]).+[\s]+[“]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[“]/g, '“')
  })

  regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[,][“]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[,]/g, ', ')
  })

  regexp = /[?][\s]+[’][”][’]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[?][\s]+[’][”][’]/g, '?’”’ ')
  })

  regexp = /[.][“]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[.]/g, '. ')
  })

  regexp = /[?][”]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[”]/g, '” ')
  })

  regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[“]([a-zA-Z]|[ά-ωΑ-ώ])/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[“]/g, ' “')
  })

  regexp = /[[]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[[]/g, '(')
  })

  regexp = /]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/]/g, ')')
  })

  regexp = /[\s]+[)][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[)]/g, ')')
  })

  regexp = /[:][\s]+["][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[:][\s]+["][\s]+/g, ': "')
  })

  regexp = /[a-z][\s]+["][.][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+["][.]/g, '".')
  })

  regexp = /[:]["][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[:]["][\s]+/g, ': "')
  })

  regexp = /[.][”][’]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[’]/g, '’ ')
  })

  regexp = /[:][“]([A-Z]|[Α-ώ])/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[:]/g, ': ')
  })

  regexp = /[\s]+[’][,]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[’]/g, '’')
  })

  regexp = /[!][”][’]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[’]/g, '’ ')
  })

  regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[’](so|of|or|to|on|at|it)/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[’]/g, '’ ')
  })

  regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[.][’][(]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[’]/g, '’ ')
  })

  regexp = /([£]|[$]|[€])[\s]+[0-9]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+/g, '')
  })

  regexp = /[£][\s]+[0-9]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+/g, '')
  })

  regexp = /[\s]+[‘][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[‘][\s]+/g, '‘')
  })

  regexp = /[\s]+[)][,][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[)][,]/g, '),')
  })

  regexp = /[0-9][\s]+[m][)][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[m]/g, 'm')
  })

  regexp = /[’][\s]+[,][”][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[’][\s]+/g, '’')
  })

  regexp = /[)][.]{3}/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[)]/g, ') ')
  })

  regexp = /(We|They|we|they)([']|[’])[\s]+(re)/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+/g, '')
  })

  regexp = /([']|[’])[\s]+[?]["][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[?]["]/g, '?"')
  })

  regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[.][\s]+(?:([a-zA-Z]|[ά-ωΑ-ώ])[.])/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[.][\s]+/g, '.')
  })

  regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[.][\s]+(?:([a-zA-Z]|[ά-ωΑ-ώ])[.])/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[.][\s]+/g, '.')
  })

  regexp = /(?:([a-zA-Z]|[ά-ωΑ-ώ])[.])([a-zA-Z]|[ά-ωΑ-ώ])[.][\s]+(?:([a-zA-Z]|[ά-ωΑ-ώ])[.])/g

  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[.][\s]+/g, '.')
  })

  regexp = /[a][,][\s]+[k][,][\s]+[a]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+/g, '')
  })

  regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[.]{2,3}[\s]+(?:[.]{1})/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+/g, '')
  })

  regexp = /[:][“]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[:]/g, ': ')
  })

  regexp = /([”]|[,])[“]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[“]/g, ' “')
  })

  regexp = /[\s]+[“][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[“][\s]+/g, '“')
  })

  regexp = /[0-9][’][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+/g, '')
  })

  regexp = /[.][\s]+[”]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+/g, '')
  })

  regexp = /[”]([A-Z]|[Α-ώ])/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[”]/g, '” ')
  })

  regexp = /[0-9][\s]+(GB|MB|KB|Gb|Mb|Kb|gb|mb|kb)/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+/g, '')
  })

  regexp = /[\s]+["][,][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+["]/g, '"')
  })

  regexp = /[!][“]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[!]/g, '! ')
  })

  regexp = /[\s]+[.][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[.]/g, '.')
  })

  regexp = /(you)[’][\s]+(re)/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[’][\s]+/g, '’')
  })

  regexp = /[.]{3}[^.”'"]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[.]{3}/g, '... ')
  })

  regexp = /[\s]+[”][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[”]/g, '”')
  })

  regexp = /[\s]+[”]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+/g, '')
  })

  regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[(]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[(]/g, ' (')
  })

  regexp = /([a-zA-Z]|[ά-ωΑ-ώ])[,]([a-zA-Z]|[ά-ωΑ-ώ])/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[,]/g, ', ')
  })

  regexp = /[.][\s]+[?]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[.][\s]+/g, '.')
  })

  regexp = /[?][“]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[?]/g, '? ')
  })

  regexp = /[\s]+[?]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[?]/g, '?')
  })

  regexp = /[\s]+[-]([a-zA-Z]|[ά-ωΑ-ώ])[\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return ' (' + match.replace(/[\s]+/g, '') + ') '
  })

  regexp = /[“][‘][.]{3}[\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+/g, '')
  })

  regexp = /[:]([a-zA-Z]|[ά-ωΑ-ώ])/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[:]/g, ': ')
  })

  regexp = /[.]([a-zA-Z]|[ά-ωΑ-ώ])/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[.]/g, '. ')
  })

  regexp = /[\s]+[.][”]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+/g, '')
  })

  regexp = /[']([a-zA-Z]|[ά-ωΑ-ώ])[']/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match + ' '
  })

  regexp = /(["])(?=(\\?))\2.*?\1/g
  cleaned = cleaned.replace(regexp, function (match) {
    return ' ' + match.replace(/["]/g, '"') + ' '
  })

  regexp = /([”])(?=(\\?))\2.*?\1/g
  cleaned = cleaned.replace(regexp, function (match) {
    return ' ' + match.replace(/[”]/g, '"') + ' '
  })

  regexp = /[\s]+["][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/["][\s]+/g, '"')
  })

  regexp = /["][\s]+[.]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+/g, '')
  })

  regexp = /[^';!?.,a-zA-Zά-ωΑ-ώ ]["][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/["][\s]+/g, '"')
  })

  regexp = /[\s]+[,][^.,a-zA-Zά-ωΑ-ώ]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[,]/g, ',')
  })

  regexp = /[a-zA-Zά-ωΑ-ώ]{1}[.][\s]+[a-zA-Zά-ωΑ-ώ]{1}[.]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[.][\s]+/g, '.')
  })

  regexp = /[\s]+[(][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[(][\s]+/g, '(')
  })

  regexp = /[\s]+[\/][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\/][\s]+/g, '/')
  })

  regexp = /[\s]+([+]|[-]|[*]|[=])[\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+/g, '')
  })

  regexp = /[\s]+[)][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[)]/g, ')')
  })

  regexp = /[^ ][“]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[“]/g, ' “')
  })

  regexp = /[\s]+[(][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[(][\s]+/g, '(')
  })

  regexp = /[(][\s]+[^]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[(][\s]+/g, '(')
  })

  regexp = /(No)[.][\s]+[0-9]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+/g, '')
  })

  regexp = /[\s]+['][s][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[']/g, '\'')
  })

  regexp = /[\s]+[)][,][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[)][,]/g, '),')
  })

  regexp = /[\s]+[)][.][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[)][.]/g, '),')
  })

  regexp = /[\s]+[’][s][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[’]/g, '’')
  })

  regexp = /[\s]+[:][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[:]/g, ':')
  })

  regexp = /[s][\s]+['][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[']/g, '\'')
  })

  regexp = /[^a-zά-ω](?:[\s]+)[0-9][\s]+[A-ZΑ-ώ]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+/g, '. ')
  })

  regexp = /[,][\s]*["](he|she|they|we|I)[\s]+(stated|said|told|says)[.]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[,][\s]*["]/g, '," ')
  })

  regexp = /[\s]+[-]{2}[\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[-]{2}/g, ',')
  })

  regexp = /[0-9][\s]+(GHz|MHz|Khz)/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+/g, '')
  })

  regexp = /[\s]+(will)[.](i)[.][\s]+(am)/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[.][\s]+/g, '.')
  })

  regexp = /[\s]+['][\s]+[s][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+['][\s]+/g, '\'')
  })

  regexp = /[\s]+[.]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[.]/g, '.')
  })

  regexp = /[\s]+[^]{1,10}["][(]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/["][(]/g, '" (')
  })

  regexp = /[^ ][*]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[*]/g, ' *')
  })

  regexp = /[^ ][)]["][^ ]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/["]/g, '" ')
  })

  regexp = /[\s]+[,][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[,]/g, ',')
  })

  regexp = /[\s]+[;][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[;]/g, ';')
  })

  regexp = /[\s]+[ό][,][\s]+(τι)[\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[,][\s]+/g, ',')
  })

  regexp = /[\s]+["][\s]+[^"]+[,]["]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/["][\s]+/g, '"')
  })

  regexp = /[\s]+["]["][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+["]["][\s]+/g, '" "')
  })

  regexp = /[,][\s]+["](he|she|they)/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[,][\s]+["]/g, '," ')
  })

  regexp = /[^a-zA-Zά-ωΑ-ώ](I)['][\s]+(m)[\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/['][\s]+/g, '\'')
  })

  regexp = /[U][.][S][.][^A-ZΑ-ώ]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[U][.][S][.]/g, 'U.S. ')
  })

  regexp = /[\s]+[a-zA-Zά-ωΑ-ώ][\s]+[*][\s]+[a-zA-Zά-ωΑ-ώ][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[*][\s]+/g, '*')
  })

  regexp = /[^0-9][\s]+[*][\s]+[^0-9]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[*][\s]+/g, ' ')
  })

  regexp = /[’][\s]+[s][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[s]/g, 's')
  })

  regexp = /[\s]+[.][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[.]/g, '.')
  })

  regexp = /[\s]+[(][;][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[(][;][\s]+/g, '(;')
  })

  regexp = /[\s]+[,][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[,]/g, ',')
  })

  regexp = /[\s]+[)][)][.][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[)][)][.]/g, ')).')
  })

  regexp = /[\s]+[^ ]+["][^,.)]{1,10}[\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/["]/g, '" ')
  })

  regexp = /[^ ]["]["][^ ]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/["]["]/g, '" "')
  })

  regexp = //g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(//g, ' ')
  })

  regexp = /[\s]+["][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+["][\s]+/g, '"')
  })

  regexp = /(["])(?=(\\?))\2.*?\1/g
  cleaned = cleaned.replace(regexp, function (match) {
    return ' ' + match + ' '
  })

  regexp = /[a-zA-Zά-ωΑ-ώ]+[.][\s]+(co)[.][\s]+(in|uk)/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[.][\s]+/g, '.')
  })

  regexp = /(Ph)[.](D)[.]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[.]/g, '')
  })

  regexp = /(PhD)[\s]+[s][,]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+/g, '')
  })

  regexp = /[\s]+[,][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[,]/g, ',')
  })

  regexp = /[\s]+[.][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[.]/g, '.')
  })

  regexp = /[\s]+["][.][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+["][.]/g, '".')
  })

  regexp = /[\s]+[(][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[(][\s]+/g, '(')
  })

  regexp = /[\s]+[)]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[)]/g, ')')
  })

  regexp = /[\s]+[)][,][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[)][,]/g, '),')
  })

  regexp = /[\s]+[:][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[:]/g, ':')
  })

  regexp = /[\s]+[;][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[;]/g, ';')
  })

  regexp = /[.][\s]+["]["][\s]+[A-ZΑ-ώ]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+["]["][\s]+/g, '" "')
  })

  regexp = /[,][\s]*["][^]{1,15}(stated|said|told|added)[.]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[,][\s]*["]/g, '," ')
  })

  regexp = /[:]["][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[:]["][\s]+/g, ': "')
  })

  regexp = /(but)["][\s]+[^]+[.]["][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/(but)["][\s]+/g, 'but "')
  })

  regexp = /[a-zά-ω][.][A-ZΑ-ώ]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[.]/g, '. ')
  })

  regexp = /[.][\s]+[’]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[.][\s]+[’]/g, '.’')
  })

  regexp = /[a-zά-ωA-ZΑ-ώ][(]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[(]/g, ' (')
  })

  regexp = /[:][\s]+[a-zά-ωA-ZΑ-ώ]["][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[:][\s]+/g, ':')
  })

  regexp = /[!][a-zά-ωA-ZΑ-ώ]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[!]/g, '! ')
  })

  regexp = /[•]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[•]/g, '')
  })

  regexp = /[\s]+[.][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[.]/g, '.')
  })

  regexp = /[*][^ ]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[*]/g, '')
  })

  regexp = /(R'n')[\s]+[B][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[B]/g, 'B')
  })

  regexp = /(κ.)[\s]+(ά.)[\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+(ά.)/g, 'ά.')
  })

  regexp = /(κ.)[\s]+(α.)[\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+(α.)/g, 'α.')
  })

  regexp = /[A-ZΑ-ώ][.][\s]+[A-ZΑ-ώ][.]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[.][\s]+/g, '.')
  })

  regexp = /[\s]+[,]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[,]/g, ',')
  })

  regexp = /[.][\s]+(epub|pdf|zip|rar|tar)[\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[.]/g, ' ')
  })

  regexp = /[\s]+[&][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[&]/g, 'and')
  })

  regexp = /[!]['][s]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[!]/g, '')
  })

  regexp = /[\s]+[(]["][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[(]["][\s]+/g, '("')
  })

  regexp = /[\s]+[’]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[’]/g, '’')
  })

  regexp = /[\s]+[”]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[”]/g, '”')
  })

  regexp = /[\s]+["]["][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+["]["][\s]+/g, '" "')
  })

  regexp = /[\s]+["][,][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+["][,]/g, '",')
  })

  regexp = /[0-9][.][\s]+[a-zά-ω]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+/g, '')
  })

  regexp = /[\s]+[?][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[?]/g, '?')
  })

  regexp = /[\s]+[)]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]+[)]/g, ')')
  })
  // remove big dashes
  regexp = /[\u2014-\u2015\u2E3A\u2E3B]/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[-\u2014-\u2015\u2E3A\u2E3B]/g, ' ')
  })
  // remove regular dashes surrounded by space
  regexp = /[\s]+[-\u2010-\u2011\uFE58\uFE63\uFF0D][\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[-\u2010-\u2011\uFE58\uFE63\uFF0D]/g, ' ')
  })

  regexp = /[\s]+[a-zά-ω][,][a-zά-ω]{2}[\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[,]/g, '')
  })

  regexp = /[\s]{2,}/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[\s]{2,}/g, ' ')
  })

  regexp = /[.][\s]+(epub|pdf|zip|rar|tar|NET)/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/.[\s]/g, ' •')
  })

  regexp = /[^ ]+[.][\s]+(com|net|co.uk|co.in|com.cy|gr|tk|info|me)[\s]+/g
  cleaned = cleaned.replace(regexp, function (match) {
    return match.replace(/[.][\s]+/g, '.')
  })

  return cleaned
}
