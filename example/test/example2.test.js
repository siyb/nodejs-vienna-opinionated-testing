/* eslint-env node, mocha */
/* eslint no-unused-expressions: "off" */

'use strict';

const assert = require('assert');

describe('Context', () => {
    beforeEach(done => { // using arrow style functions is ok here!
        this.fixture = {
            data: 2
        };
        done();
    });
    it('Should assert itself!', done => {
        console.log('data',this.fixture.data)
        assert.equal(this.fixture.data, 2);
        done();
    });
});