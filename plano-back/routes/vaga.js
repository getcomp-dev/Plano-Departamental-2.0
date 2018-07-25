const models = require('../models/index'),
    router = require('express').Router(),
    ioBroadcast = require('../library/socketIO').broadcast,
    SM = require('../library/SocketMessages'),
    CustomError = require('../library/CustomError')

router.post('/', function (req, res, next) {
    models.Vaga.create({
        numero: req.body.numero,
        Turma: req.body.Turma,
        CursoId:  req.body.Curso,

    }).then(function (vaga) {
        ioBroadcast(SM.VAGA_CREATED, {'msg': 'Vaga solicitada!', 'Vaga': vaga})

        res.send({
            success: true,
            message: 'Vaga solicitada!',
            Vaga: vaga
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.get('/', function (req, res, next) {
    models.Vaga.findAll().then(function (vagas) {
        res.send({
            success: true,
            message: 'Vagas listadas',
            Vagas: vagas
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.post('/:Curso([0-9]+)&&:Turma([0-9]+)', function (req, res, next) {
    models.Vaga.findOne({
        where: {
            Turma: req.params.Turma,
            CursoId: req.params.Curso
        }
    }).then(function (vaga) {
        if (!vaga)
            throw new CustomError(400, 'Vaga inválida')

        return vaga.updateAttributes({

            numero: req.body.numero,
            Turma: req.body.Turma,
            CursoId:  req.body.Curso
        })
    }).then(function (vaga) {
        ioBroadcast(SM.VAGA_UPDATED, {'msg': 'Vaga atualizada!', 'Vaga': vaga})

        res.send({
            success: true,
            message: 'Vaga atualizada',
            Vaga: vaga
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.delete('/:Curso([0-9]+)&&:Turma([0-9]+)', function (req, res, next) {
    models.Turma.findOne({
        where: {
            Turma: req.params.Turma,
            CursoId: req.params.Curso
        }
    }).then(function (vaga) {
        if (!vaga)
            throw new CustomError(400, 'Vaga inválida')

        return vaga.destroy()
    }).then(function (vaga) {
        ioBroadcast(SM.VAGA_DELETED, {'msg': 'Vaga excluída!', 'Vaga': vaga})

        res.send({
            success: true,
            message: 'Vaga excluída',
            Vaga: vaga
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

module.exports = router