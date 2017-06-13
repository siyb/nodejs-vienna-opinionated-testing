/* eslint-env node, mocha */
/* eslint no-unused-expressions: "off" */

'use strict';

const chai = require('chai');
const plugin = require('./example5-plugin');

// commented out because our plugin breaks stuff in other tests,
// the taken approach is pretty naive ;).
//plugin(chai);

const expect = chai.expect;

describe('Plugin', done => {
    it('should feature all is* function of validator.js', done => {
        expect('ce503e78168f4d448b3c061fd12d6d04').to.be.hexadecimal;
        done();
    });
});