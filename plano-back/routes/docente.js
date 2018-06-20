const models = require('../models/index'),
    router = require('express').Router(),
    ioBroadcast = require('../library/socketIO').broadcast,
    SM = require('../library/SocketMessages')

router.post('/', function (req, res, next) {
    models.Docente.create({
        nome: req.body.nome,
        apelido: req.body.apelido,
        creditos: req.body.creditos,
        ativo: req.body.ativo
    }).then(function (docente) {
        ioBroadcast(SM.DOCENTE_CREATED, {'msg': 'Docente criado!', 'Docente': docente})

        res.send({
            success: true,
            message: 'Docente criado!',
            Docente: docente
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.get('/', function (req, res, next) {
    models.Docente.findAll().then(function (docentes) {
        res.send({
            success: true,
            message: 'Docentes listados',
            Docentes: docentes
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.post('/:id([0-9]+)', function (req, res, next) {
    models.Docente.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (docente) {
        if (!docente)
            throw new CustomError(400, 'Docente inválido')

        return docente.updateAttributes({
            nome: req.body.nome,
            apelido: req.body.apelido,
            creditos: req.body.creditos,
            ativo: req.body.ativo
        })
    }).then(function (docente) {
        ioBroadcast(SM.DOCENTE_UPDATED, {'msg': 'Docente atualizado!', 'Docente': docente})

        res.send({
            success: true,
            message: 'Docente atualizado',
            Docente: docente
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.delete('/:id([0-9]+)', function (req, res, next) {
    models.Docente.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (docente) {
        if (!docente)
            throw new CustomError(400, 'Docente inválido')

        return docente.destroy()
    }).then(function (docente) {
        ioBroadcast(SM.DOCENTE_DELETED, {'msg': 'Docente excluído!', 'Docente': docente})

        res.send({
            success: true,
            message: 'Docente excluído',
            Docente: docente
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

module.exports = router