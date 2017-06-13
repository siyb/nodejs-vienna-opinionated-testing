/* eslint-env node, mocha */
/* eslint no-unused-expressions: "off" */

'use strict';

const assert = require('assert');

describe('Context', () => {
    // using arrow style functions is ok here.
    beforeEach(done => {
        this.fixture = {
            data: 2
        };
        done();
    });
    // if we set the context using an arrow function, we need to use
    // the arrow notation here as well!
    it('Should assert itself!', done => {
        console.log('data',this.fixture.data)
        assert.equal(this.fixture.data, 2);
        done();
    });
});