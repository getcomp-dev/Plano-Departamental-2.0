const models = require('../models/index'),
    router = require('express').Router(),
    ioBroadcast = require('../library/socketIO').broadcast,
    SM = require('../library/SocketMessages')

const history = function(params){
    models.History.create({
        tabelaModificada: 'Docente',
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
    models.Docente.create({
        nome: req.body.nome,
        apelido: req.body.apelido,
        creditos: req.body.creditos,
        ativo: req.body.ativo
    }).then(function (docente) {
        ioBroadcast(SM.DOCENTE_CREATED, {'msg': 'Docente criado!', 'Docente': docente})
        console.log('\nRequest de '+req.usuario.nome+'\n')

        history({operationType: "Create", user: req.usuario.nome, lineId: `${req.body.nome}`})

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
    console.log('\nRequest de '+req.usuario.nome+'\n')
    models.Docente.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (docente) {
        if (!docente)
            throw new CustomError(400, 'Docente inválido')

        if(docente.nome != req.body.nome)
            history({fieldName:'Nome', lineId:docente.nome, oldValue: docente.nome, newValue: req.body.nome, operationType:'Edit', user: req.usuario.nome})

        if(docente.apelido != req.body.apelido)
            history({fieldName:'Apelido', lineId:docente.nome, oldValue: docente.apelido, newValue: req.body.apelido, operationType:'Edit', user: req.usuario.nome})

        if(docente.creditos != req.body.creditos)
            history({fieldName:'Creditos', lineId:docente.nome, oldValue: docente.creditos, newValue: req.body.creditos, operationType:'Edit', user: req.usuario.nome})

        if(docente.ativo != req.body.ativo)
            history({fieldName:'Ativo', lineId:docente.nome, oldValue: docente.ativo, newValue: req.body.ativo, operationType:'Edit', user: req.usuario.nome})

        return docente.updateAttributes({
            nome: req.body.nome,
            apelido: req.body.apelido,
            creditos: req.body.creditos,
            ativo: req.body.ativo
        })
    }).then(function (docente) {
        ioBroadcast(SM.DOCENTE_UPDATED, {'msg': 'Docente atualizado!', 'Docente': docente})
        console.log('\nRequest de '+req.usuario.nome+'\n')

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
    console.log('\nRequest de '+req.usuario.nome+'\n')
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
        console.log('\nRequest de '+req.usuario.nome+'\n')

        history({operationType: "Delete", user: req.usuario.nome, lineId: `${docente.nome}`})

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