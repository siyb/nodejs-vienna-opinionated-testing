/* eslint-env node, mocha */
/* eslint no-unused-expressions: "off" */

'use strict';

const toTest = require('./example6-totest');
const expect = require('chai').expect;
const sinon = require('sinon');

describe('Mocking', () => {
    it('should not cause validation errors.', done => {
        const stubCtx = {};
        stubCtx.isOk = sinon.stub().returns(true);
        expect(toTest(stubCtx)()).to.deep.equal({ valid: true });
        expect(stubCtx.isOk.calledOnce).to.be.true;
        done();
    });
    it('should not cause validation errors.', done => {
        const stubCtx = {};
        stubCtx.isOk = sinon.stub().returns(false);
        // we do not need to manipulate the behaviour of getUserLanguage for this test
        stubCtx.getUserLanguage = sinon.spy();
        expect(toTest(stubCtx)().valid).to.equal(false);
        expect(stubCtx.getUserLanguage.calledOnce).to.be.true;
        expect(stubCtx.isOk.calledOnce).to.be.true;
        done();
    });
    it('should localize validation error messages.', done => {
        const stubCtx = {};
        stubCtx.isOk = sinon.stub().returns(false);
        stubCtx.getUserLanguage = sinon.stub();
        stubCtx.getUserLanguage.withArgs(1).returns('de');
        stubCtx.getUserLanguage.withArgs(2).returns('en');

        expect(toTest(stubCtx)(1)).to.deep.equal({ valid: false, message: 'Das ist nicht gut, ja!' });
        expect(toTest(stubCtx)(2)).to.deep.equal({ valid: false, message: 'This is not good!' });
        done();
    });
});