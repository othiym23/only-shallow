'use strict'

function isArguments (object) {
  return Object.prototype.toString.call(object) === '[object Arguments]'
}

module.exports = function shallower (a, b) {
  return shallower_(a, b, [], [])
}

/**
 * This is a structural equality test, modeled on bits and pieces of loads of
 * other implementations of this algorithm, most notably the much stricter
 * `deeper`, from which this comment was copied.
 *
 * Everybody who writes one of these functions puts the documentation
 * inline, which makes it incredibly hard to follow. Here's what this version
 * of the algorithm does, in order:
 *
 * 1. Use loose equality (==) only for value types (non-objects). This is the
 *    biggest difference between only-shallow and deeper / deepest (along with
 *    being more of a duck-typer, because it doesn't care about constructor
 *    matching), and it needs to be careful to filter out objects (including
 *    Arrays).
 * 2. Since the only matching entities to get to this test must be objects, if
 *    a or b is not an object, they're clearly not the same. All unfiltered a
 *    and b getting are objects (including null).
 * 3. null is a singleton value object, so if either is null, return a === b
 * 4. It's much faster to compare dates by numeric value than by lexical value.
 * 5. Same goes for Regexps.
 * 6. The parts of an arguments list most people care about are the arguments
 *    themselves, not the callee, which you shouldn't be looking at anyway.
 * 7. Objects are more complex:
 *    a. ensure that a and b are on the same constructor chain
 *    b. ensure that a and b have the same number of own properties (which is
 *       what Object.keys returns).
 *    c. ensure that cyclical references don't blow up the stack.
 *    d. ensure that all the key names match (faster)
 *    e. esnure that all of the associated values match, recursively (slower)
 *
 * (SOMEWHAT UNTESTED) ASSUMPTIONS:
 *
 * o Functions are only considered identical if they unify to the same
 *   reference. To anything else is to invite the wrath of the halting problem.
 * o V8 is smart enough to optimize treating an Array like any other kind of
 *   object.
 * o Users of this function are cool with mutually recursive data structures
 *   that are otherwise identical being treated as the same.
 */
function shallower_ (a, b, ca, cb) {
  /*eslint eqeqeq:0*/
  if (typeof a !== 'object' && typeof b !== 'object' && a == b) {
    return true
  } else if (typeof a !== 'object' || typeof b !== 'object') {
    return false
  } else if (a === null || b === null) {
    return a === b
  } else if (Buffer.isBuffer(a) && Buffer.isBuffer(b)) {
    if (a.length !== b.length) return false

    for (var j = 0; j < a.length; j++) if (a[j] !== b[j]) return false

    return true
  } else if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime()
  } else if (a instanceof RegExp && b instanceof RegExp) {
    return a.source === b.source &&
    a.global === b.global &&
    a.multiline === b.multiline &&
    a.lastIndex === b.lastIndex &&
    a.ignoreCase === b.ignoreCase
  } else if (isArguments(a) || isArguments(b)) {
    if (!(isArguments(a) && isArguments(b))) return false

    var slice = Array.prototype.slice
    return shallower_(slice.call(a), slice.call(b), ca, cb)
  } else {
    var ka = Object.keys(a)
    var kb = Object.keys(b)
    if (ka.length !== kb.length) return false

    var cal = ca.length
    while (cal--) if (ca[cal] === a) return cb[cal] === b
    ca.push(a); cb.push(b)

    ka.sort(); kb.sort()
    for (var k = ka.length - 1; k >= 0; k--) if (ka[k] !== kb[k]) return false

    var key
    for (var l = ka.length - 1; l >= 0; l--) {
      key = ka[l]
      if (!shallower_(a[key], b[key], ca, cb)) return false
    }

    ca.pop(); cb.pop()

    return true
  }
}
