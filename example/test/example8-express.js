'use strict';

const express = require('express');
const app = express();
const json = require('body-parser').json;

const users = require('./example8-users');

const replyHandler = (req, res, next) => {
    const status = res.payload === undefined || res.payload === null ? 204 : res.payload.status || 200;
    if (res.payload) delete res.payload.status;
    return res.status(status).send({ success: true, payload: res.payload });
};

const errorHandler = (err, req, res, next) => {
    const status = err.status;
    delete err.status;
    return res.status(status || 500).send({ success: false, payload: err });
};

app.use(json());

const router = express.Router();

router.post('/', (req, res, next) => {
    const user = getUserById(req.params.id);
    if (user) return next({ status: 409, message: 'user already exists!' });
    users.push(req.body);
    res.payload = req.body;
    res.payload.status = 201;
    return next();
});

// this function is indirectly tested using integration and not unit tests!
const _getUserById = (users, userId) => {
    const result = users.filter(user => {
        return user.id === parseInt(userId);
    });
    if (result.length > 1) throw new Error('Result not unique! ' + userId);
    return result[0];
};

const getUserById = _getUserById.bind(null, users);

router.get('/:id', (req, res, next) => {
    const user = getUserById(req.params.id);
    if (!user) return next({ status: 404, id: parseInt(req.params.id) });
    res.payload = user;
    return next();
});

app.use('/user', router);

app.use(replyHandler);
app.use(errorHandler);

module.exports = app;