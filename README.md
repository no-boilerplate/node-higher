# node-higher
Higher order functions for functional programming

Composition of [`ramda`](https://www.npmjs.com/package/ramda) and [`lodash`](https://www.npmjs.com/package/lodash) which both offer some similar but different features and paradigms *and* complementing features that need combining.

`higher` follows the paradigm of `ramda` in expecting the data on which to operate on is usually supplied last.

## Installation

`npm install higher --save`

## Use

```js
const H = require('higher');
H.unless(_.isUndefined, 'test', test);
```

## Functions

### `unless`

What: Wrapper around `ramda` `unless` function that allows for values to be used instead of functions.
Why: Because writing `() => { return 'some value'; }` all the time is awful.
How: `H.unless(_.isNull, 'test', value)` (where `_` is `lodash`) will return either `value` if it's not null or otherwise `'test'` string.

### `ifFalsy`

What: Wrapper around `unless` that tests the given value for falsy state.
Why: Because writing `(x) => { return !!x; }` all the time is tedious.
How: `H.ifFalsy('FALSE', '')` returns `'FALSE'`

### `ifNull`

What: Wrapper around `unless` that tests the given value for `null` value.
Why: Because writing `unless(_.isNull, ...` all the time is tedious.
How: `H.ifNull('<null>', null)` returns `'<null>'`

### `coerceFunction`

What: Returns either the given function or function returning the given value.
Why: Because it's useful internally and maybe it will be useful externally.
How: `H.coerceFunction(123)` will return function returning `123`

### `coerceArray`

What: Returns either the given array or the given non-array value within an array.
Why: Because writing `x = _.isArray(x) ? x : [x];` destroys neurons and I saw the example in Ramda documentation and loved it.
How: `H.coerceArray(123)` will return `[123]`
