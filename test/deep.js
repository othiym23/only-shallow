var tap = require('tap')
var test = tap.test
var same = require('../')

test("shouldn't care about key order and types", function (t) {
  t.ok(same({ a: 1, b: 2 }, { b: 2, a: '1' }))
  t.end()
})

test('same arrays match', function (t) {
  t.ok(same([1, 2, 3], [1, 2, 3]))
  t.end()
})

test("different arrays don't match", function (t) {
  t.notOk(same([1, 2, 3], [1, 2, 3, 4]))
  t.notOk(same([1, 2, 3], [1, 2, 4]))
  t.end()
})

test('empty arrays match', function (t) {
  t.ok(same([], []))
  t.ok(same({ x: [] }, { x: [] }))
  t.end()
})

test("shallower shouldn't care about key order recursively and types", function (t) {
  t.ok(same(
    { x: { a: 1, b: 2 }, y: { c: 3, d: 4 } },
    { y: { d: 4, c: 3 }, x: { b: '2', a: '1' } }
  ))
  t.end()
})

test('shallower handles null properly', function (t) {
  t.ok(same(
    { x: null },
    { x: null }
  ))
})

test("shallower shouldn't care about key order (but still might) and types", function (t) {
  t.ok(same(
    [
      { foo: { z: 100, y: 200, x: 300 } },
      'bar',
      11,
      { baz: { d: 4, a: 1, b: 2, c: 3 } }
    ],
    [
      { foo: { z: 100, y: 200, x: 300 } },
      'bar',
      11,
      { baz: { a: '1', b: '2', c: '3', d: '4' } }
    ]
  ))
  t.end()
})

test("shallower shouldn't blow up on circular data structures", function (t) {
  var x1 = { z: 4 }
  var y1 = { x: x1 }
  x1.y = y1

  var x2 = { z: 4 }
  var y2 = { x: x2 }
  x2.y = y2

  t.ok(same(x1, x2))
  t.end()
})
