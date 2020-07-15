const models = require('../models/index'),
    router = require('express').Router(),
    ioBroadcast = require('../library/socketIO').broadcast,
    SM = require('../library/SocketMessages'),
    CustomError = require('../library/CustomError')

const history = function(params){
    models.History.create({
        tabelaModificada: 'Plano',
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

router.post('/', function (req, res, next) {
    console.log('\nRequest de '+req.usuario.nome+'\n')
    models.Plano.create({
        ano: req.body.ano,
        obs: req.body.nome,
        obs: req.body.obs
    }).then(function (plano) {
        ioBroadcast(SM.PLANO_CREATED, {'msg': 'Plano criado!', 'Plano': plano})
        console.log('\nRequest de '+req.usuario.nome+'\n')

        res.send({
            success: true,
            message: 'Plano criado!',
            Plano: plano
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.post('/:id([0-9]+)', function (req, res, next) {
    console.log('\nRequest de '+req.usuario.nome+'\n')
    models.Plano.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (plano) {
        if (!plano)
            throw new CustomError(400, 'Ano inválido')

        return plano.updateAttributes({
            ano: req.body.ano,
            obs: req.body.nome,
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

router.delete('/:id([0-9]+)', function (req, res, next) {
    console.log('\nRequest de '+req.usuario.nome+'\n')
    models.Plano.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (plano) {
        if (!plano)
            throw new CustomError(400, 'Plano inválido')

        return plano.destroy()
    }).then(function (plano) {
        ioBroadcast(SM.PLANO_DELETED, {'msg': 'Plano excluído!', 'Plano': plano})
        console.log('\nRequest de '+req.usuario.nome+'\n')

        history({operationType: "Delete", user: req.usuario.nome, lineId: `${plano.ano}`})

        res.send({
            success: true,
            message: 'Plano excluído',
            Plano: plano
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})


module.exports = router