
'use strict';

const _ = require('lodash');
const R = require('ramda');

class H {

    static coerceFunction(fnOrValue) {
        if (_.isFunction(fnOrValue)) {
            return fnOrValue;
        }

        if (_.isUndefined(fnOrValue)) {
            return _.noop;
        }

        return function() {
            return fnOrValue;
        };
    }

    static unless(predFnOrValue, whenFalseFnOrValue, x) {
        return R.unless(H.coerceFunction(predFnOrValue), H.coerceFunction(whenFalseFnOrValue), x);
    }

    static ifFalsy(whenFalseFnOrValue, x) {
        return H.unless(!!x, whenFalseFnOrValue, x);
    }

    static ifNull(whenFalseFnOrValue, x) {
        return H.unless(_.negate(_.isNull), whenFalseFnOrValue, x);
    }

    static ifElse(value, onTrueFnOrValue, onFalseFnOrValue) {
        return R.ifElse(
            () => { return !!value; },
            H.coerceFunction(onTrueFnOrValue).bind(value),
            H.coerceFunction(onFalseFnOrValue).bind(value))(value);
    }

    static isNonEmptyString(value) {
        return _.isString(value) && !_.isEmpty(value);
    }

    static contains(array, value) {
        return _.indexOf(array, value) !== -1;
    }

    static noopIfNotFunction(fn) {
        return _.isFunction(fn) ? fn : _.noop;
    }
}

//  Ripped of from Ramda docs.
H.coerceArray = R.unless(R.isArrayLike, R.of);

module.exports = H;
