const models = require('../models/index'),
    router = require('express').Router(),
    ioBroadcast = require('../library/socketIO').broadcast,
    SM = require('../library/SocketMessages')

const history = function(params){
    models.History.create({
        tabelaModificada: 'ConceitoTurmaCurso',
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
    models.ConceitoTurmaCurso.create({
        avaliacao: req.body.avaliacao,
        quantidade: req.body.quantidade,
        Curso: req.body.Curso,
        Turma: req.body.Turma
    }).then(function (conceito) {
        ioBroadcast(SM.CONCEITO_TURMA_CURSO_CREATED, {'msg': 'Conceito criado!', 'ConceitoTurmaCurso': conceito})
        console.log('\nRequest de '+req.usuario.nome+'\n')

        history({operationType: "Create", user: req.usuario.nome, lineId: `${req.body.Curso}/${req.body.Turma}/${req.body.avaliacao}`})

        res.send({
            success: true,
            message: 'Conceito criado!',
            ConceitoTurmaCurso: conceito
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.get('/', function (req, res, next) {
    models.ConceitoTurmaCurso.findAll().then(function (conceitos) {
        res.send({
            success: true,
            message: 'Conceitos listados',
            ConceitoTurmaCursos: conceitos
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.post('/:id([0-9]+)', function (req, res, next) {
    console.log('\nRequest de '+req.usuario.nome+'\n')
    models.ConceitoTurmaCurso.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (conceito) {
        if (!conceito)
            throw new CustomError(400, 'Docente inválido')

        if(conceito.avaliacao != req.body.avaliacao)
            history({fieldName:'Avaliação', lineId:`${conceito.Curso}/${conceito.Turma}/${conceito.avaliacao}`, oldValue: conceito.avaliacao, newValue: req.body.avaliacao, operationType:'Edit', user: req.usuario.nome})

        if(conceito.apelido != req.body.apelido)
            history({fieldName:'Apelido', lineId:`${conceito.Curso}/${conceito.Turma}/${conceito.avaliacao}`, oldValue: conceito.quantidade, newValue: req.body.quantidade, operationType:'Edit', user: req.usuario.nome})

        return conceito.updateAttributes({
            avaliacao: req.body.avaliacao,
            quantidade: req.body.quantidade
        })
    }).then(function (conceito) {
        ioBroadcast(SM.CONCEITO_TURMA_CURSO_UPDATED, {'msg': 'Conceito atualizado!', 'ConceitoTurmaCurso': conceito})
        console.log('\nRequest de '+req.usuario.nome+'\n')

        res.send({
            success: true,
            message: 'Conceito atualizado',
            ConceitoTurmaCurso: conceito
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.delete('/:id([0-9]+)', function (req, res, next) {
    console.log('\nRequest de '+req.usuario.nome+'\n')
    models.ConceitoTurmaCurso.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (conceito) {
        if (!conceito)
            throw new CustomError(400, 'Conceito inválido')

        return conceito.destroy()
    }).then(function (conceito) {
        ioBroadcast(SM.CONCEITO_TURMA_CURSO_DELETED, {'msg': 'Conceito excluído!', 'ConceitoTurmaCurso': conceito})
        console.log('\nRequest de '+req.usuario.nome+'\n')

        history({operationType: "Delete", user: req.usuario.nome, lineId: `${conceito.Curso}/${conceito.Turma}/${conceito.avaliacao}`})

        res.send({
            success: true,
            message: 'Conceito excluído',
            ConceitoTurmaCurso: conceito
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

module.exports = router