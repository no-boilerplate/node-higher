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

**What**: Wrapper around `ramda` `unless` function that allows for values to be used instead of functions.

**Why**: Because writing `() => { return 'some value'; }` all the time is awful.

**How**: `H.unless(_.isNull, 'test', value)` (where `_` is `lodash`) will return either `value` if it's not null or otherwise `'test'` string.

### `ifElse`

**What**: A concrete instance of `ramda` `ifElse` function that evaluates the given predicate or value and allows values to be used instead of functions.

**Why**: Because writing `H.isFalsy('replacement value', maybeUndefined && maybeUndefined.someMethod())` all the time is lame and this makes the purpose clearer.

**How**: `H.ifElse(maybeUndefined, MaybeUndefinedClass.someMethod, 'replacement value')` (where `_` is `lodash`) will return either `'replacement value` or the result of `MaybeUndefinedClass.someMethod` applied on `maybeUndefined`.

### `ifFalsy`

**What**: Wrapper around `unless` that tests the given value for falsy state.

**Why**: Because writing `(x) => { return !!x; }` all the time is tedious.

**How**: `H.ifFalsy('FALSE', '')` returns `'FALSE'`

### `ifNull`

**What**: Wrapper around `unless` that tests the given value for `null` value.

**Why**: Because writing `unless(_.isNull, ...` all the time is tedious.

**How**: `H.ifNull('<null>', null)` returns `'<null>'`

### `coerceFunction`

**What**: Returns either the given function or function returning the given value.

**Why**: Because it's useful internally and maybe it will be useful externally.

**How**: `H.coerceFunction(123)` will return function returning `123`

### `coerceArray`

**What**: Returns either the given array or the given non-array value within an array.

**Why**: Because writing `x = _.isArray(x) ? x : [x];` destroys neurons and I saw the example in Ramda documentation and loved it.

**How**: `H.coerceArray(123)` will return `[123]`

### `isNonEmptyString`

**What**: Returns true if and only if the given value is a non-empty string (even if all the characters are whitespaces)

**Why**: Because writing `_.String(value) && !_.isEmpty(value)` is bound to make you zombie sooner or later (and I want to avoid it).

**How**: `H.isNonEmptyString('')` will return `false` whereas `H.isNonEmptyString(' ')` will return `true`

### `contains`

**What**: Returns true if the given value is part of the given array.

**Why**: Because writing `_.indexOf(array, value) !== -1` is way too long.

**How**: `H.contains(['a', 'b'], 'c')` will return `false` whereas `H.isNonEmptyString(['a', 'b'], 'a')` will return `true`

### `noopIfNotFunction`

**What**: Returns `_.noop` if the given value is not a function thus guaranteeing that the returned value is always a function.

**Why**: Because writing `callback = _.isFunction(callback) ? callback : _.noop` has been written one too many times in the history of our Universe.

**How**: `H.noopIfNotFunction(undefined)` will return `_.noop` whereas `H.noopIfNotFunction(() => undefined)` will return `() => undefined` function.
