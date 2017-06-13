/* eslint-env node, mocha */
/* eslint no-unused-expressions: "off" */

'use strict';

const productBehaviour = require('./example3-behaviour.test');

describe('SharedBehaviour', function () {
    // using arrow style functions is not ok here, tests in
    // shared behaviour that rely on the context will fail!
    beforeEach(function (done) {
        this.product = {
            price: 1
        };
        done();
    });
    it('Another Product Related Test.', function (done)  {
        done();
    });
    productBehaviour();
});