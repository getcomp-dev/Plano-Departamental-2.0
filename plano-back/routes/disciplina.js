const models = require('../models/index'),
    router = require('express').Router(),
    ioBroadcast = require('../library/socketIO').broadcast,
    SM = require('../library/SocketMessages')

router.post('/', function (req, res, next) {
    models.Disciplina.create({
        nome: req.body.nome,
        codigo: req.body.codigo,
        cargaTeorica: req.body.cargaTeorica,
        cargaPratica: req.body.cargaPratica,
        Perfil: req.body.Perfil,
        ead: req.body.ead
    }).then(function (disciplina) {
        ioBroadcast(SM.DISCIPLINA_CREATED, {'msg': 'Disciplina criada!', 'Disciplina': disciplina})

        res.send({
            success: true,
            message: 'Disciplina criada!',
            Disciplina: disciplina
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.get('/', function (req, res, next) {
    models.Disciplina.findAll().then(function (disciplinas) {
        res.send({
            success: true,
            message: 'Disciplinas listadas',
            Disciplinas: disciplinas
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.post('/:id([0-9]+)', function (req, res, next) {
    models.Disciplina.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (disciplina) {
        if (!disciplina)
            throw new CustomError(400, 'Disciplina inválida')

        return disciplina.updateAttributes({
            nome: req.body.nome,
            codigo: req.body.codigo,
            cargaTeorica: req.body.cargaTeorica,
            cargaPratica: req.body.cargaPratica,
            Perfil: req.body.Perfil,
            ead: req.body.ead
        })
    }).then(function (disciplina) {
        ioBroadcast(SM.DISCIPLINA_UPDATED, {'msg': 'Disciplina atualizada!', 'Disciplina': disciplina})

        res.send({
            success: true,
            message: 'Disciplina atualizada',
            Disciplina: disciplina
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.delete('/:id([0-9]+)', function (req, res, next) {
    models.Disciplina.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (disciplina) {
        if (!disciplina)
            throw new CustomError(400, 'Disciplina inválida')

        return disciplina.destroy()
    }).then(function (disciplina) {
        ioBroadcast(SM.DISCIPLINA_DELETED, {'msg': 'Disciplina excluída!', 'Disciplina': disciplina})

        res.send({
            success: true,
            message: 'Disciplina excluído',
            Disciplina: disciplina
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

module.exports = router