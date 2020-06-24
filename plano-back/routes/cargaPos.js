const models = require('../models/index'),
    router = require('express').Router(),
    ioBroadcast = require('../library/socketIO').broadcast,
    SM = require('../library/SocketMessages'),
    CustomError = require('../library/CustomError')

const history = function(params){
    models.History.create({
        tabelaModificada: 'CargaPos',
        campoModificado: params.fieldName,
        linhaModificada: params.lineId,
        valorAnterior: params.oldValue,
        valorNovo: params.newValue,
        tipoOperacao: params.operationType,
        usuario: params.user
    }).then(function (history) {
        ioBroadcast(SM.HISTORY_CREATED, {'msg': 'Log atualizado', 'History': history})
    })
}

router.post('/', function (req, res, next) {
    console.log('\nRequest de '+req.usuario.nome+'\n')
    models.CargaPos.create({
        trimestre: req.body.trimestre,
        programa: req.body.programa,
        Docente: req.body.Docente,
        creditos: req.body.creditos

    }).then(function (cargaPos) {
        ioBroadcast(SM.CARGA_POS_CREATED, {'msg': 'Carga registrada!', 'CargaPos': cargaPos})
        console.log('\nRequest de '+req.usuario.nome+'\n')

        history({operationType: "Create", user: req.usuario.nome, lineId: `${cargaPos.id}`})

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
    console.log('\nRequest de '+req.usuario.nome+'\n')
    models.CargaPos.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (cargaPos) {
        if (!cargaPos)
            throw new CustomError(400, 'Turma inválida')

        if(cargaPos.trimestre != req.body.trimestre)
            history({fieldName:'Trimestre', lineId:cargaPos.id, oldValue: cargaPos.trimestre, newValue: req.body.trimestre, operationType:'Edit', user: req.usuario.nome})

        if(cargaPos.programa != req.body.programa)
            history({fieldName:'Programa', lineId:cargaPos.id, oldValue: cargaPos.programa, newValue: req.body.programa, operationType:'Edit', user: req.usuario.nome})

        if(cargaPos.Docente != req.body.Docente)
            history({fieldName:'Docente', lineId:cargaPos.id, oldValue: cargaPos.Docente, newValue: req.body.Docente, operationType:'Edit', user: req.usuario.nome})

        if(cargaPos.creditos != req.body.creditos)
            history({fieldName:'Creditos', lineId:cargaPos.id, oldValue: cargaPos.creditos, newValue: req.body.creditos, operationType:'Edit', user: req.usuario.nome})


        return cargaPos.updateAttributes({
            trimestre: req.body.trimestre,
            programa: req.body.programa,
            Docente: req.body.Docente,
            creditos: req.body.creditos
        })
    }).then(function (cargaPos) {
        ioBroadcast(SM.CARGA_POS_UPDATED, {'msg': 'Carga atualizada!', 'CargaPos': cargaPos})
        console.log('\nRequest de '+req.usuario.nome+'\n')

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
    console.log('\nRequest de '+req.usuario.nome+'\n')
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
        console.log('\nRequest de '+req.usuario.nome+'\n')

        history({operationType: "Delete", user: req.usuario.nome, lineId: `${cargaPos.trimestre}/${cargaPos.programa}/${cargaPos.Docente}`})

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