const models = require('../models/index'),
    router = require('express').Router(),
    ioBroadcast = require('../library/socketIO').broadcast,
    SM = require('../library/SocketMessages'),
    CustomError = require('../library/CustomError')

router.get('/', function (req, res, next) {
    models.Plano.findAll().then(function (plano) {
        res.send({
            success: true,
            message: 'Plano listado',
            Plano: plano
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.post('/:ano([0-9]+)', function (req, res, next) {
    console.log('\nRequest de '+req.usuario.nome+'\n')
    models.Plano.findOne({
        where: {
            ano: req.params.ano
        }
    }).then(function (plano) {
        if (!plano)
            throw new CustomError(400, 'Ano inválido')

        return plano.updateAttributes({
            ano: req.body.ano,
            obs: req.body.obs
        })
    }).then(function (plano) {
        ioBroadcast(SM.PLANO_UPDATED, {'msg': 'Plano atualizado!', 'Plano': plano})
        console.log('\nRequest de '+req.usuario.nome+'\n')

        res.send({
            success: true,
            message: 'Plano atualizado!',
            Plano: plano
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})


module.exports = router