const models        = require('../models/index'),
    router          = require('express').Router(),
    io        = require('../library/socketIO').io;

router.post('/', function (req, res, next) {
    models.Perfil.create({
        nome: req.body.nome,
        abreviacao: req.body.abreviacao
    }).then(function (perfil) {
        io().emit('message', {'msg': 'Perfil criado!', 'perfil': perfil});

        res.send({
            success: true,
            message: 'Perfil cadastrado',
            perfil: perfil
        });
    }).catch(function(err) {
        return next(err, req, res);
    });
});

module.exports = router;