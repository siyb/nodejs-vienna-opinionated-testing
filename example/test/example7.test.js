/* eslint-env node, mocha */
/* eslint no-unused-expressions: "off" */

'use strict';

const rewire = require('rewire');
const expect = require('chai').expect;
const sinon = require('sinon');

// note: rewire, not require!
const toTest = rewire('./example7-totest');
const _getUserEmailById = toTest.__get__('_getUserEmailById');
const _generatePasswordResetLink = toTest.__get__('_generatePasswordResetLink');
const _sendPasswordResetEmail = toTest.__get__('_sendPasswordResetEmail');
const send = toTest.__get__('send');

describe('Rewire', () => {
    it('should get the correct user email.', done => {
        toTest.__with__({
            UserModel: {
                getUserById: sinon.stub().returns({ email: 'my@user.com', firstName: 'My', lastName: 'My' })
            }
        })(() => {
            const email = _getUserEmailById(); // userId does not matter since we are using a stub
            expect(email).to.equal('my@user.com');
            done();
        });
    });
    it('should generate the correct pw reset url.', done => {
        toTest.__with__({
            uuid: {
                v4: sinon.stub().returns('fake-uuid')
            }
        })(() => {
            const url = _generatePasswordResetLink(1);
            expect(url).to.equal('http://mydomain.com/user/password-reset/1/fake-uuid');
            done();
        });
    });
    it('should send out emails', done => {
        // we need to set "send" here because we need to access the instance for verification reasons,
        // __with__ does not work in this case, since a call to toTest.__get__('send') would not return
	// the mock created in the __with__ block.
        const oldSend = toTest.__get__('send');
        toTest.__set__('send', sinon.stub());

        toTest.__with__({
            _generatePasswordResetLink: sinon.stub().returns('fake-link')
        })(() => {
            _sendPasswordResetEmail('test@test.com');
            expect(toTest.__get__('send').withArgs('test@test.com', 'Password Reset!', 'fake-link').calledOnce).to.be.true;

            toTest.__set__('send', oldSend); // do not forget to reset the send function!
            done();
        });
    });
});
