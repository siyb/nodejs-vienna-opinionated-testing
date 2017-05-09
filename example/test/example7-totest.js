'use strict';

let uuid = require('uuid');

// "external" module
let UserModel = {
    getUserById: (userId) => {
        switch (userId) {
            case 1:
                return { email: 'first@user.com', firstName: 'First', lastName: 'First' };
            case 2:
                return { email: 'second@user.com', firstName: 'Second', lastName: 'Second' };
            default:
                throw new Error('User not found!');
        }
    }
};

// "external"" module
let send = (email, subject, text) => {
    // no-op
};

const _getUserEmailById = (userId) => {
    return UserModel.getUserById(userId).email;
};

let _generatePasswordResetLink = (userId) => {
    return 'http://mydomain.com/user/password-reset/' + userId + '/' + uuid.v4();
};

const _sendPasswordResetEmail = (email) => {
    send(email, 'Password Reset!', _generatePasswordResetLink());
};

module.exports = (userId) => {
    const email = getUserEmailById(userId);
    _sendPasswordResetEmail(email);
};