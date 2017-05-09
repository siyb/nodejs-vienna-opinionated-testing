'use strict';

module.exports = (ctx) => {
    const reasons = {
        'de': 'Das ist nicht gut, ja!',
        'en': 'This is not good!'
    }
    return (userId) => {
        if (ctx.isOk()) {
            return {valid: true};
        } else {
            return {valid: false, message: reasons[ctx.getUserLanguage(userId)]};
        }
    };
};