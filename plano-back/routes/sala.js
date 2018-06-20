const models = require('../models/index'),
    router = require('express').Router(),
    ioBroadcast = require('../library/socketIO').broadcast,
    SM = require('../library/SocketMessages'),
    CustomError = require('../library/CustomError')

router.post('/', function (req, res, next) {
    models.Sala.create({
        nome: req.body.nome,
        laboratorio: req.body.laboratorio
    }).then(function (sala) {
        ioBroadcast(SM.SALA_CREATED, {'msg': 'Sala criada!', 'Sala': sala})

        res.send({
            success: true,
            message: 'Sala criada!',
            Sala: sala
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.get('/', function (req, res, next) {
    models.Sala.findAll().then(function (salas) {
        res.send({
            success: true,
            message: 'Salas listadas',
            Salas: salas
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.post('/:id([0-9]+)', function (req, res, next) {
    models.Sala.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (sala) {
        if (!sala)
            throw new CustomError(400, 'Sala inválida')

        return sala.updateAttributes({
            nome: req.body.nome,
            laboratorio: req.body.laboratorio
        })
    }).then(function (sala) {
        ioBroadcast(SM.SALA_UPDATED, {'msg': 'Sala atualizada!', 'Sala': sala})

        res.send({
            success: true,
            message: 'Sala atualizada',
            Sala: sala
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.delete('/:id([0-9]+)', function (req, res, next) {
    models.Sala.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (sala) {
        if (!sala)
            throw new CustomError(400, 'Sala inválida')

        return sala.destroy()
    }).then(function (sala) {
        ioBroadcast(SM.SALA_DELETED, {'msg': 'Sala excluído!', 'Sala': sala})

        res.send({
            success: true,
            message: 'Sala excluída',
            Sala: sala
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

module.exports = router