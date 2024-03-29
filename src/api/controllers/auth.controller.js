const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');

const authService = require('./../services/auth.service')
const { jwtSecret, jwtExpirationInterval } = require('../../config/vars');

function JWTGenerate(id) {
    return jwt.sign(
        { id },
        jwtSecret,
        { expiresIn: jwtExpirationInterval }
    );
}

exports.register = (req, res, next) => {
    const user = req.body;

    try {
        authService.createAccount(user, (err, data) => {
            if (err) {
                return res.status(500).send({ success: false, error: err });
            } else {
                const generateToken = JWTGenerate(data.insertId);
                res.status(httpStatus.CREATED);
                return res.json({ success: true, token: generateToken });
            }
        });
    } catch (error) {
        return next(error);
    }
};

exports.updateUser = (req, res, next) => {
    const user = req.body;
    const update_id = req.params.id;

    try {
        authService.updateUser(user, update_id, req.user.parent_id, (err, data) => {
            if (err) {
                return res.status(500).send({ success: false, error: err });
            } else {
                return res.json({ success: true, data: 'User Updated Successfully' });
            }
        });
    } catch (error) {
        return next(error);
    }
};

exports.login = (req, res, next) => {
    const user = req.body;

    try {
        authService.logIn(user, (err, data) => {
            if (err) {
                return res.status(500).send({ success: false, error: err });
            } else {
                const generateToken = JWTGenerate(data.id);
                res.status(httpStatus.CREATED);
                return res.json({ success: true, token: generateToken, data });
            }
        });
    } catch (error) {
        return next(error);
    }
};

exports.getUsers = (req, res, next) => {
    try {
        authService.getUsers(req.user.parent_id, (err, data) => {
            if (err) {
                return res.status(500).send({ success: false, error: err });
            } else {
                return res.json({ success: true, data });
            }
        });
    } catch (error) {
        return next(error);
    }
};

exports.me = (req, res, next) => {
    try {
        return res.json({ success: true, data: req.user });
    } catch (error) {
        return next(error);
    }
};