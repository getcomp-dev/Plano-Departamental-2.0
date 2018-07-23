const models = require('../models/index'),
    router = require('express').Router(),
    ioBroadcast = require('../library/socketIO').broadcast,
    SM = require('../library/SocketMessages')

router.post('/', function (req, res, next) {
    models.DocentePerfil.create({
        Perfil: req.body.Perfil,
        DocenteId: req.body.Docente
    }).then(function (docentePerfil) {
        ioBroadcast(SM.DOCENTE_PERFIL_CREATED, {'msg': 'Relação Docente Perfil criada!', 'DocentePerfil': docentePerfil})

        res.send({
            success: true,
            message: 'Relação Docente Perfil criada!',
            DocentePerfil: docentePerfil
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.get('/', function (req, res, next) {
    models.DocentePerfil.findAll().then(function (docentePerfis) {
        res.send({
            success: true,
            message: 'Relação Docente Perfil listadas',
            DocentePerfis: docentePerfis
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.post('/:Docente([0-9]+)&&:Perfil([0-9]+)', function (req, res, next) {
    models.DocentePerfil.findOne({
        where: {
            Perfil: req.params.Perfil,
            DocenteId: req.params.DocenteId
        }
    }).then(function (docentePerfil) {
        if (!docentePerfil)
            throw new CustomError(400, 'Relação Docente Perfil inválida')

        return docentePerfil.updateAttributes({
            Perfil: req.params.Perfil,
            DocenteId: req.params.Docente
        })
    }).then(function (docentePerfil) {
        ioBroadcast(SM.DOCENTE_PERFIL_UPDATED, {'msg': 'Relação Docente Perfil atualizada!', 'DocentePerfil': docentePerfil})

        res.send({
            success: true,
            message: 'Relação Docente Perfil atualizada',
            DocentePerfil: docentePerfil
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.delete('/:Docente([0-9]+)&&:Perfil([0-9]+)', function (req, res, next) {
    models.DocentePerfil.findOne({
        where: {
            Perfil: req.params.Perfil,
            DocenteId: req.params.Docente
        }
    }).then(function (docentePerfil) {
        if (!docentePerfil)
            throw new CustomError(400, 'Relação Docente Perfil inválida')

        return docentePerfil.destroy()
    }).then(function (docentePerfil) {
        ioBroadcast(SM.DOCENTE_PERFIL_DELETED, {'msg': 'Relação Docente Perfil excluída!', 'DocentePerfil': docentePerfil})

        res.send({
            success: true,
            message: 'Relação Docente Perfil excluída',
            DocentePerfil: docentePerfil
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

module.exports = router