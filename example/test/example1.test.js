/* eslint-env node, mocha */
/* eslint no-unused-expressions: "off" */

'use strict';

describe('Basics', () => {
    before(done => {
        console.log('Before Master.');
        done();
    });
    after(done => {
        console.log('After Master.');
        done();
    });
    beforeEach(done => {
        console.log('Before Each Master.');
        done();
    });
    afterEach(done => {
        console.log('After Each Master.');
        done();
    });
    it('Should do nothing!', done => {
        done();
    })
    describe('Sub Test Suite.', () => {
        beforeEach(done => {
            console.log('Before Each Sub.');
            done();
        });
        afterEach(done => {
            console.log('After Each Sub.');
            done();
        });
        it('Should do more of nothing.', done => {
            done();
        });
        it.skip('Should not execute the test case', done => {
            // no reason to call done(), skipped!
        });
    });
    describe.skip('Skip this whole sub suite', () => {
        it('Should also be skipped!', done => {
            // no reason to call done(), skipped!
        });
        it('Should be skipped as well!', done => {
            // no reason to call done(), skipped!
        });
    });
});