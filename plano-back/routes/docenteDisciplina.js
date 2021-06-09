const models = require('../models/index'),
    router = require('express').Router(),
    ioBroadcast = require('../library/socketIO').broadcast,
    SM = require('../library/SocketMessages')

const history = function(params){
    models.History.create({
        tabelaModificada: 'DocenteDisciplina',
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
    models.DocenteDisciplina.create({
        preferencia: req.body.preferencia,
        Disciplina: req.body.Disciplina,
        Docente: req.body.Docente
    }).then(function (docenteDisciplina) {
        ioBroadcast(SM.DOCENTE_DISCIPLINA_CREATED, {'msg': 'Disciplina adicionada ao Docente!', 'DocenteDisciplina': docenteDisciplina})
        console.log('\nRequest de '+req.usuario.nome+'\n')

        history({operationType: "Create", user: req.usuario.nome, lineId: `${docenteDisciplina.Docente}/${docenteDisciplina.Disciplina}}`})

        res.send({
            success: true,
            message: 'Disciplina adicionada ao docente!',
            DocenteDisciplina: docenteDisciplina
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.get('/', function (req, res, next) {
    models.DocenteDisciplina.findAll().then(function (docenteDisciplina) {
        res.send({
            success: true,
            message: 'Preferências de docentes por disciplinas listadas',
            DocenteDisciplinas: docenteDisciplina
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.post('/:Docente([0-9]+)&&:Disciplina([0-9]+)', function (req, res, next) {
    console.log('\nRequest de '+req.usuario.nome+'\n')
    models.DocenteDisciplina.findOne({
        where: {
            Disciplina: req.params.Disciplina,
            Docente: req.params.Docente
        }
    }).then(function (docenteDisciplina) {
        if (!docenteDisciplina)
            throw new CustomError(400, 'Docente ou Disciplina inválido(s)')

        if(docenteDisciplina.preferencia != req.body.preferencia)
            history({fieldName:'preferencia', lineId:`${docenteDisciplina.Docente}/${docenteDisciplina.Disciplina}`, oldValue: docenteDisciplina.preferencia, newValue: req.body.preferencia, operationType:'Edit', user: req.usuario.nome})

        if(docenteDisciplina.Disciplina != req.body.Disciplina)
            history({fieldName:'Disciplina', lineId:`${docenteDisciplina.Docente}/${docenteDisciplina.Disciplina}`, oldValue: docenteDisciplina.Disciplina, newValue: req.body.Disciplina, operationType:'Edit', user: req.usuario.nome})

        if(docenteDisciplina.Docente != req.body.Docente)
            history({fieldName:'Docente', lineId:`${docenteDisciplina.Docente}/${docenteDisciplina.Disciplina}`, oldValue: docenteDisciplina.Docente, newValue: req.body.Docente, operationType:'Edit', user: req.usuario.nome})


        return docenteDisciplina.updateAttributes({
            preferencia: req.body.preferencia,
            Disciplina: req.body.Disciplina,
            Docente: req.body.Docente
        })
    }).then(function (docenteDisciplina) {
        ioBroadcast(SM.DOCENTE_DISCIPLINA_UPDATED, {'msg': 'Preferência do docente atualizada!', 'DocenteDisciplina': docenteDisciplina})
        console.log('\nRequest de '+req.usuario.nome+'\n')

        res.send({
            success: true,
            message: 'Preferência do docente atualizada',
            DocenteDisciplina: docenteDisciplina
        })
    }).catch(function (err) {
        return next(err , req, res)
    })
})

router.delete('/:Docente([0-9]+)&&:Disciplina([0-9]+)', function (req, res, next) {
    console.log('\nRequest de '+req.usuario.nome+'\n')
    models.DocenteDisciplina.findOne({
        where: {
            Disciplina: req.params.Disciplina,
            Docente: req.params.Docente
        }
    }).then(function (docenteDisciplina) {
        if (!docenteDisciplina)
            throw new CustomError(400, 'Docente ou Disciplina inválido(s)')

        return docenteDisciplina.destroy()
    }).then(function (docenteDisciplina) {
        ioBroadcast(SM.DOCENTE_DISCIPLINA_DELETED, {'msg': 'Preferência do docente excluída!', 'DocenteDisciplina': docenteDisciplina})
        console.log('\nRequest de '+req.usuario.nome+'\n')

        history({operationType: "Delete", user: req.usuario.nome, lineId: `${docenteDisciplina.Docente}/${docenteDisciplina.Disciplina}`})

        res.send({
            success: true,
            message: 'Preferância do docente excluída',
            DocenteDisciplina: docenteDisciplina
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

module.exports = router