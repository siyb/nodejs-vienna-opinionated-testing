'use strict';

const expect = require('chai').expect;
const request = require('supertest');
const rewire = require('rewire');
const sinon = require('sinon');

const app = require('./example8-express');

const toTest = rewire('./example8-express.js');
const replyHandler = toTest.__get__('replyHandler');
const errorHandler = toTest.__get__('errorHandler');
const users = toTest.__get__('users');

describe('Integration Test', () => {
    describe('handler', () => {
        beforeEach(done => {
            this.send = sinon.spy();
            this.res = {
                status: sinon.stub().returns({
                    send: this.send
                })
            };
            this.error = new Error('test error');
            this.error.status = 400;
            done();
        });
        describe('errorHandler', () => {
            it('should handle errors.', done => {
                this.error.status = undefined;
                errorHandler(this.error, null, this.res, null);
                expect(this.res.status.withArgs(500).calledOnce).to.be.true;
                expect(this.send.calledOnce).to.be.true;
                done();
            });
            it('should handle custom http errors.', done => {
                this.error.status = 401;
                errorHandler(this.error, null, this.res, null);
                expect(this.res.status.withArgs(401).calledOnce).to.be.true;
                expect(this.send.calledOnce).to.be.true;
                done();
            });
        });
        describe('replyHandler', () => {
            it('should handle empty payloads.', done => {
                replyHandler(null, this.res, null);
                expect(this.res.status.withArgs(204).calledOnce).to.be.true;
                expect(this.send.calledOnce).to.be.true;
                done();
            });
            it('should handle regular payloads.', done => {
                this.res.payload = { regular: 'payload' };
                replyHandler(null, this.res, null);
                expect(this.res.status.withArgs(200).calledOnce).to.be.true;
                expect(this.send.withArgs({ success: true, payload: this.res.payload }).called).to.be.true;
                done();
            });
            it('should handle custom http return codes', done => {
                this.res.payload = { regular: 'payload', status: 201 };
                replyHandler(null, this.res, null);
                expect(this.res.status.withArgs(201).calledOnce).to.be.true;
                done();
            });
        });
    });
    describe('routes', () => {
        beforeEach(done => {
            users.pop();
            users.push({ id: 1 });
            done();
        });
        it('should return a user if a valid id is specified.', done => {
            request(app)
                .get('/user/1')
                .expect(200)
                .end((err, res) => {
                    expect(err).to.not.exist;
                    expect(res.body.success).to.be.true;
                    expect(res.body.payload).to.deep.equal({ id: 1 });
                    done();
                });
        });
        it('should not return a user if there is no match.', done => {
            request(app)
                .get('/user/2')
                .expect(404)
                .end((err, res) => {
                    expect(err).to.not.exist;
                    expect(res.body.success).to.be.false;
                    expect(res.body.payload).to.deep.equal({ id: 2 });
                    done();
                });
        });
        it('should create a user', done => {
            request(app)
                .post('/user/')
                .send({id: 3})
                .expect(201)
                .end((err, res) => {
                    users.pop();
                    expect(err).to.not.exist;
                    expect(res.body.success).to.be.true;
                    expect(res.body.payload).to.deep.equal({ id: 3 });
                    done();
                });
        });
    })
});
