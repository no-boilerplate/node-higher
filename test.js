
'use strict';

const _ = require('lodash');
const assert = require('assert');
const H = require('.');

describe('H', function() {
    it('coerceFunction', function() {
        const fn = () => { return 'test'; };
        assert(H.coerceFunction(fn) === fn);
        var coercedFn = H.coerceFunction('test');
        assert(_.isFunction(coercedFn));
        assert(coercedFn() === 'test');
        coercedFn = H.coerceFunction();
        assert(coercedFn === _.noop);
        assert(coercedFn() === undefined);
    });

    it('unless', function() {
        assert(H.unless(false, 'FALSE', true) === 'FALSE');
        assert(H.unless(false, 'FALSE', false) === 'FALSE');
        assert(H.unless(_.identity, 'FALSE', true) === true);
        assert(H.unless(_.identity, 'FALSE', false) === 'FALSE');
        assert(H.unless(_.identity, _.identity, true) === true);
        assert(H.unless(_.identity, _.identity, false) === false);
    });

    it('ifFalsy', function() {
        assert(H.ifFalsy('FALSY', false) === 'FALSY');
        assert(H.ifFalsy('FALSY', true) === true);
        assert(H.ifFalsy('FALSY', 0) === 'FALSY');
        assert(H.ifFalsy('FALSY', 1) === 1);
        assert(H.ifFalsy('FALSY', '') === 'FALSY');
        assert(H.ifFalsy('FALSY', ' ') === ' ');
        assert(H.ifFalsy('FALSY', null) === 'FALSY');
        assert(H.ifFalsy('FALSY', !null) === !null);
        assert(H.ifFalsy('FALSY', undefined) === 'FALSY');
        assert(H.ifFalsy('FALSY', !undefined) === !undefined);
        assert(H.ifFalsy(_.identity, true) === true);
        assert(H.ifFalsy(_.identity, false) === false);
    });

    it('ifNull', function() {
        assert(H.ifNull('NULL', null) === 'NULL');
        assert(H.ifNull('FALSE', false) === false);
        assert(H.ifNull(_.identity, null) === null);
        assert(H.ifNull(_.identity, true) === true);
    });

    it('coerceArray', function() {
        assert(_.isEqual(H.coerceArray(null), [null]));
        assert(_.isEqual(H.coerceArray([null]), [null]));
    });

    it('ifElse', function() {
        var test = 'TEST';
        assert.equal(H.ifElse(test, String.prototype.toLowerCase, 'never'), 'test');
        test = null;
        assert.equal(H.ifElse(test, String.prototype.toLowerCase, 'never'), 'never');
        assert.equal(H.ifElse(123, 456, 789), 456);
        assert.equal(H.ifElse('', 'no', 'yes'), 'yes');
    });

    it('isNonEmptyString', function() {
      assert(H.isNonEmptyString('xyz'));
      assert(H.isNonEmptyString(' '));
      assert(!H.isNonEmptyString(''));
      assert(!H.isNonEmptyString(123));
      assert(!H.isNonEmptyString({}));
      assert(!H.isNonEmptyString([]));
      assert(!H.isNonEmptyString(null));
      assert(!H.isNonEmptyString(undefined));
    });

    it('contains', function() {
      assert(H.contains(['a', 'b'], 'a'));
      assert(H.contains(['a', 'b'], 'b'));
      assert(!H.contains(['a', 'b'], 'c'));
      assert(!H.contains({'a': 'b'}, 'a'));
      assert(!H.contains({'a': 'b'}, 'b'));
      assert(!H.contains());
      assert(!H.contains(123));
      assert(!H.contains({}));
      assert(!H.contains([]));
      assert(!H.contains(null));
      assert(!H.contains(undefined));
    });

    it('noopIfNotFunction', function() {
      assert.equal(H.noopIfNotFunction(H.noopIfNotFunction), H.noopIfNotFunction);
      assert.equal(H.noopIfNotFunction(), _.noop);
      assert.equal(H.noopIfNotFunction(123), _.noop);
      assert.equal(H.noopIfNotFunction({}), _.noop);
      assert.equal(H.noopIfNotFunction([]), _.noop);
      assert.equal(H.noopIfNotFunction(null), _.noop);
      assert.equal(H.noopIfNotFunction(undefined), _.noop);
    });
});
