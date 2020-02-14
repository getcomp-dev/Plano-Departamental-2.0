const models = require('../models/index'),
    router = require('express').Router(),
    ioBroadcast = require('../library/socketIO').broadcast,
    SM = require('../library/SocketMessages'),
    CustomError = require('../library/CustomError')

const history = function(params){
    models.History.create({
        tabelaModificada: 'Sala',
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
    models.Sala.create({
        nome: req.body.nome,
        laboratorio: req.body.laboratorio
    }).then(function (sala) {
        ioBroadcast(SM.SALA_CREATED, {'msg': 'Sala criada!', 'Sala': sala})
        console.log('\nRequest de '+req.usuario.nome+'\n')

        history({operationType: "Create", user: req.usuario.nome, lineId: `${req.body.nome}`})

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
    console.log('\nRequest de '+req.usuario.nome+'\n')
    models.Sala.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (sala) {
        if (!sala)
            throw new CustomError(400, 'Sala inválida')

        if(sala.nome != req.body.nome)
            history({fieldName:'Nome', lineId:sala.nome, oldValue: sala.nome, newValue: req.body.nome, operationType:'Edit', user: req.usuario.nome})

        if(sala.laboratorio != req.body.laboratorio)
            history({fieldName:'Laboratorio', lineId:sala.nome, oldValue: sala.laboratorio, newValue: req.body.laboratorio, operationType:'Edit', user: req.usuario.nome})


        return sala.updateAttributes({
            nome: req.body.nome,
            laboratorio: req.body.laboratorio
        })
    }).then(function (sala) {
        ioBroadcast(SM.SALA_UPDATED, {'msg': 'Sala atualizada!', 'Sala': sala})
        console.log('\nRequest de '+req.usuario.nome+'\n')

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
    console.log('\nRequest de '+req.usuario.nome+'\n')
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
        console.log('\nRequest de '+req.usuario.nome+'\n')

        history({operationType: "Delete", user: req.usuario.nome, lineId: `${sala.nome}`})

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