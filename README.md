[![only-shallow on npm](https://img.shields.io/npm/v/only-shallow.svg?style=flat)](http://npm.im/only-shallow)
[![Build Status](https://travis-ci.org/othiym23/only-shallow.svg?branch=v1.1.0)](https://travis-ci.org/othiym23/only-shallow)
[![Coverage Status](https://coveralls.io/repos/othiym23/only-shallow/badge.svg?branch=master&service=github)](https://coveralls.io/github/othiym23/only-shallow?branch=master)
[!["standard" style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# only-shallow

If [`deeper`](http://npm.im/deeper) and [`deepest`](http://npm.im/deepest) are
`assert.deepEqual()`'s strict East Coast siblings with engineering backgrounds,
`only-shallow` is their laid-back California cousin.  `only-shallow` is a
library for structurally comparing JavaScript objects. It supports recursive /
cyclical data structures, is written to avoid try / catch / throw (for speed),
and has no dependencies. It's not particularly strict about matching types.
It's more of a duck squeezer.

It has some optimizations but stresses correctness over raw speed. Unlike
`deepest`, it has no native dependencies, so you can use it, like, wherever.

If you install [Ben Noordhuis](http://github.com/bnoordhuis)'s
[buffertools](https://github.com/bnoordhuis/node-buffertools) into a project
using `only-shallow`, it will use that to speed up comparison of Buffers.

The core algorithm is based on those used by Node's assertion library and the
implementation of cycle detection in
[isEqual](http://underscorejs.org/#isEqual) in
[Underscore.js](http://underscorejs.org/).

I like to think the documentation is pretty OK.

`only-shallow` has this name because [I'm
old](https://www.youtube.com/watch?v=oiomcuNlVjk).

## installation

```
npm install only-shallow
```

## usage

```javascript
var deepEqual = require('only-shallow')

if (!deepEqual(obj1, obj2)) console.log("yay! diversity!");
```

## license

ISC. Go nuts.
