const models = require('../models/index'),
    router = require('express').Router(),
    ioBroadcast = require('../library/socketIO').broadcast,
    SM = require('../library/SocketMessages'),
    CustomError = require('../library/CustomError')

router.post('/', function (req, res, next) {
    models.Horario.create({
        horario: req.body.horario
    }).then(function (horario) {
        ioBroadcast(SM.HORARIO_CREATED, {'msg': 'Horário criado!', 'Horario': horario})

        res.send({
            success: true,
            message: 'Horário criado!',
            Horario: horario
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.get('/', function (req, res, next) {
    models.Horario.findAll().then(function (horarios) {
        res.send({
            success: true,
            message: 'Horarios listados',
            Horarios: horarios
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.post('/:id([0-9]+)', function (req, res, next) {
    models.Horario.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (horario) {
        if (!horario)
            throw new CustomError(400, 'Horário inválido')

        return horario.updateAttributes({
            horario: req.body.horario
        })
    }).then(function (horario) {
        ioBroadcast(SM.HORARIO_UPDATED, {'msg': 'Horário atualizado!', 'Horario': horario})

        res.send({
            success: true,
            message: 'Horário atualizado',
            Horario: horario
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.delete('/:id([0-9]+)', function (req, res, next) {
    models.Horario.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (horario) {
        if (!horario)
            throw new CustomError(400, 'Horário inválido')

        return horario.destroy()
    }).then(function (horario) {
        ioBroadcast(SM.HORARIO_DELETED, {'msg': 'Horário excluído!', 'Horario': horario})

        res.send({
            success: true,
            message: 'Horário excluído',
            Horario: horario
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

module.exports = router