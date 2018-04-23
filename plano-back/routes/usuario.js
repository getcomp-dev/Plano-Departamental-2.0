const models        = require('../models/index'),
    router          = require('express').Router(),
    jwt             = require('jsonwebtoken'),
    _               = require('lodash'),
    config          = require(__dirname + '/../config/index'),
    CustomError     = require('../library/CustomError'),
    ValidationError = require('../library/ValidationError'),
    passwordHash    = require('password-hash');

router.post('/create', function (req, res, next) {
    models.Usuario.create({
        nome: req.body.nome,
        login: req.body.login,
        senha: passwordHash.generate(req.body.senha)
    }).then(function () {
        res.send({
            success: true,
            message: 'Usuário cadastrado'
        });
    }).catch(function(err) {
        return next(err, req, res);
    });
});

router.post('/authenticate', function (req, res, next) {
    models.Usuario.findOne({
        where: {
            login: req.body.login
        },
        raw: true
    }).then(function (user) {
        if(!user)
            throw new CustomError(404, 'Usuário não encontrado');

        if(!passwordHash.verify(req.body.senha, user.senha))
            throw new CustomError(400, 'Senha inválida');

        res.send({
            success: true,
            message: 'Token criado',
            token: jwt.sign(_.omit(user, 'senha'), config.jwt.secret, { expiresIn: 60*60*5 }),
            usuario: _.omit(user, 'senha')
        });

    }).catch(function(err) {
        return next(err, req, res);
    });
});

router.get('/fetch', function (req, res, next) {
    models.Usuario.findOne({
        where: {
            id: req.user.id
        },
        raw: true
    }).then(function (user) {
        if(!user)
            throw new CustomError(404, 'Usuário não encontrado');

        res.send({
            success: true,
            message: 'Usuario encontrado',
            usuario: _.omit(user, 'password')
        });

    }).catch(function(err) {
        return next(err, req, res);
    });
});

module.exports = router;