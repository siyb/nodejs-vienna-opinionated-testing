'use strict';

const validator = require('validator');
const _ = require('lodash');

const includeFunctions = ['is'];

module.exports = chai => {
  chai.use(function (_chai, utils) {
    _.functions(validator).forEach(fnct => {
      includeFunctions.forEach(includeFnct => {
        if (fnct == includeFnct || fnct.startsWith(includeFnct)) {
          const validatorFnctName = fnct.substring(2);
          const fnctName = validatorFnctName.substring(0, 1).toLowerCase().concat(validatorFnctName.substring(1));
          const validate = validator[fnct];
          if (validate.length === 2) {
            _chai.Assertion.addMethod(fnctName, function (opts) {
              const obj = this._obj;
              console.log(validate)
              this.assert(
                validate(obj, opts) === true,
                'expected #{this} to be ' + fnctName,
                'expected #{this} to not be ' + fnctName
              );
            });
          } else {
            _chai.Assertion.addProperty(fnctName, function () {
              const obj = this._obj;
              this.assert(
                validate(obj) === true,
                'expected #{this} to be ' + fnctName,
                'expected #{this} to not be ' + fnctName
              );
            });
          }
        }
      });
    });
  });
};
