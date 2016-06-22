
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

        return () => {
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

}

//  Ripped of from Ramda docs.
H.coerceArray = R.unless(R.isArrayLike, R.of);

module.exports = H;
