let a, b, n, v, s, i, h, t, r

n = Math.random()
b = Math.pow(2, 10)
r = []
a = ''

for (i = 0; i < 10; i++) {
  if (i % 3 === 0) {
    n = Math.random()
  }

  // if ()
  // are there ten bits available?

  n = n * b
  v = Math.floor(n)
  s = v.toString(2)
  a = a + s

  t = s.length - s.replace(/1/g, '').length
  h = 10 - t

  r.push([`${t} tails`, `${h} heads`])

  // console.log(v, s)
  // console.log(h, t)

  n = n - v
}

console.log(r)
console.log(a)
