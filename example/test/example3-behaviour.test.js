/* eslint-env node, mocha */
/* eslint no-unused-expressions: "off" */

'use strict';


module.exports = () => {
    describe('Product Behaviour.', () => {
        it('should have a price set', function (done) {
            if (!this.product.price) throw new Error('Illegal Price!');
            done();
        });
    });
};