const models = require('../models/index'),
    router = require('express').Router(),
    ioBroadcast = require('../library/socketIO').broadcast,
    SM = require('../library/SocketMessages'),
    CustomError = require('../library/CustomError')

router.post('/', function (req, res, next) {
    models.CargaPos.create({
        trimestre: req.body.trimestre,
        programa: req.body.programa,
        Docente: req.body.Docente,
        creditos: req.body.creditos

    }).then(function (cargaPos) {
        ioBroadcast(SM.CARGA_POS_CREATED, {'msg': 'Carga registrada!', 'CargaPos': cargaPos})

        res.send({
            success: true,
            message: 'Carga registrada!',
            CargaPos: cargaPos
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.get('/', function (req, res, next) {
    models.CargaPos.findAll().then(function (cargasPos) {
        res.send({
            success: true,
            message: 'Cargas listadas',
            CargasPos: cargasPos
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.post('/:id([0-9]+)', function (req, res, next) {
    models.CargaPos.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (cargaPos) {
        if (!cargaPos)
            throw new CustomError(400, 'Turma inválida')

        return cargaPos.updateAttributes({
            trimestre: req.body.trimestre,
            programa: req.body.programa,
            Docente: req.body.Docente,
            creditos: req.body.creditos
        })
    }).then(function (cargaPos) {
        ioBroadcast(SM.CARGA_POS_UPDATED, {'msg': 'Carga atualizada!', 'CargaPos': cargaPos})

        res.send({
            success: true,
            message: 'Carga atualizada',
            CargaPos: cargaPos
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.delete('/:id([0-9]+)', function (req, res, next) {
    models.CargaPos.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (cargaPos) {
        if (!cargaPos)
            throw new CustomError(400, 'Carga inválida')

        return cargaPos.destroy()
    }).then(function (cargaPos) {
        ioBroadcast(SM.CARGA_POS_DELETED, {'msg': 'Carga excluída!', 'CargaPos': cargaPos})

        res.send({
            success: true,
            message: 'Carga excluída',
            CargaPos: cargaPos
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

module.exports = router