/* eslint-env node, mocha */
/* eslint no-unused-expressions: "off" */

'use strict';

const expect = require('chai').expect;

describe('Assertions', () => {
    describe('deep', () => {
        it('should fail.', done => {
            expect({}).to.equal({}); // will fail, two differnt objects
            done();
        });
        it('should pass.', done => {
            expect({}).to.deep.equal({}); // does analysis on deep level and not via memory
            expect({}).to.be.deep.equal({}); // does the same as the statement above, fill words
            expect({}).deep.equal({}); // no fill words ;)
            done();
        });
    });
    describe('Testing for exceptions.', () => {
        beforeEach(done => {
            this.toTest = (nelson) => {
                if (nelson) throw new Error('haha!');
            };
            done();
        });
        it('should nelson the caller.', done => {
            expect(this.toTest.bind(null, true)).to.throw('haha'); // matching messages here, no "!" required
            done();
        });
    });
    describe('Property testing', done => {
        it('should not require additional parameters', done => {
            expect(true).to.be.true;
            expect(false).to.be.false;
            expect(undefined).not.to.be.ok;
            expect([]).to.be.empty;
            done();
        });
    });
});