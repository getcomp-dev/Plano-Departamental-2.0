const models = require('../models/index'),
    router = require('express').Router(),
    ioBroadcast = require('../library/socketIO').broadcast,
    SM = require('../library/SocketMessages')

const history = function(params){
    models.History.create({
        tabelaModificada: 'Disciplina',
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
    models.Disciplina.create({
        nome: req.body.nome,
        codigo: req.body.codigo,
        cargaTeorica: req.body.cargaTeorica,
        cargaPratica: req.body.cargaPratica,
        Perfil: req.body.Perfil,
        ead: req.body.ead,
        laboratorio: req.body.laboratorio,
    }).then(function (disciplina) {
        ioBroadcast(SM.DISCIPLINA_CREATED, {'msg': 'Disciplina criada!', 'Disciplina': disciplina})
        console.log('\nRequest de '+req.usuario.nome+'\n')
        history({operationType: "Create", user: req.usuario.nome, lineId: `${req.body.codigo}`})

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
    console.log('\nRequest de '+req.usuario.nome+'\n')
    models.Disciplina.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (disciplina) {
        if (!disciplina)
            throw new CustomError(400, 'Disciplina inválida')

        if(disciplina.nome != req.body.nome)
            history({fieldName:'Nome', lineId:disciplina.codigo, oldValue: disciplina.nome, newValue: req.body.nome, operationType:'Edit', user: req.usuario.nome})

        if(disciplina.codigo != req.body.codigo)
            history({fieldName:'Codigo', lineId:disciplina.codigo, oldValue: disciplina.codigo, newValue: req.body.codigo, operationType:'Edit', user: req.usuario.nome})

        if(disciplina.cargaTeorica != req.body.cargaTeorica)
            history({fieldName:'CargaTeorica', lineId:disciplina.codigo, oldValue: disciplina.cargaTeorica, newValue: req.body.cargaTeorica, operationType:'Edit', user: req.usuario.nome})

        if(disciplina.cargaPratica != req.body.cargaPratica)
            history({fieldName:'CargaPratica', lineId:disciplina.codigo, oldValue: disciplina.cargaPratica, newValue: req.body.cargaPratica, operationType:'Edit', user: req.usuario.nome})

        if(disciplina.Perfil != req.body.Perfil)
            history({fieldName:'Perfil', lineId:disciplina.codigo, oldValue: disciplina.Perfil, newValue: req.body.Perfil, operationType:'Edit', user: req.usuario.nome})

        if(disciplina.ead != req.body.ead)
            history({fieldName:'EAD', lineId:disciplina.codigo, oldValue: disciplina.ead, newValue: req.body.ead, operationType:'Edit', user: req.usuario.nome})

        if(disciplina.laboratorio != req.body.laboratorio)
            history({fieldName:'Laboratorio', lineId:disciplina.codigo, oldValue: disciplina.laboratorio, newValue: req.body.laboratorio, operationType:'Edit', user: req.usuario.nome})


        return disciplina.updateAttributes({
            nome: req.body.nome,
            codigo: req.body.codigo,
            cargaTeorica: req.body.cargaTeorica,
            cargaPratica: req.body.cargaPratica,
            Perfil: req.body.Perfil,
            ead: req.body.ead,
            laboratorio: req.body.laboratorio
        })
    }).then(function (disciplina) {
        ioBroadcast(SM.DISCIPLINA_UPDATED, {'msg': 'Disciplina atualizada!', 'Disciplina': disciplina})
        console.log('\nRequest de '+req.usuario.nome+'\n')

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
    console.log('\nRequest de '+req.usuario.nome+'\n')
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
        console.log('\nRequest de '+req.usuario.nome+'\n')

        history({operationType: "Delete", user: req.usuario.nome, lineId: `${disciplina.codigo}`})

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