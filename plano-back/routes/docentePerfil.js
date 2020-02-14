const models = require('../models/index'),
    router = require('express').Router(),
    ioBroadcast = require('../library/socketIO').broadcast,
    SM = require('../library/SocketMessages')

const history = function(params){
    models.History.create({
        tabelaModificada: 'DocentePerfil',
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
    models.DocentePerfil.create({
        Perfil: req.body.Perfil,
        DocenteId: req.body.Docente
    }).then(function (docentePerfil) {
        ioBroadcast(SM.DOCENTE_PERFIL_CREATED, {'msg': 'Relação Docente Perfil criada!', 'DocentePerfil': docentePerfil})
        console.log('\nRequest de '+req.usuario.nome+'\n')

        history({operationType: "Create", user: req.usuario.nome, lineId: `${req.body.Perfil}/${req.body.Docente}`})

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
    console.log('\nRequest de '+req.usuario.nome+'\n')
    models.DocentePerfil.findOne({
        where: {
            Perfil: req.params.Perfil,
            DocenteId: req.params.DocenteId
        }
    }).then(function (docentePerfil) {
        if (!docentePerfil)
            throw new CustomError(400, 'Relação Docente Perfil inválida')

        if(docentePerfil.Perfil != req.body.Perfil)
            history({fieldName:'Perfil', lineId:`${docentePerfil.Perfil}/${docentePerfil.Docente}`, oldValue: docentePerfil.Perfil, newValue: req.body.Perfil, operationType:'Edit', user: req.usuario.nome})

        if(docentePerfil.Docente != req.body.Docente)
            history({fieldName:'Docente', lineId:`${docentePerfil.Perfil}/${docentePerfil.Docente}`, oldValue: docentePerfil.Docente, newValue: req.body.Docente, operationType:'Edit', user: req.usuario.nome})


        return docentePerfil.updateAttributes({
            Perfil: req.params.Perfil,
            DocenteId: req.params.Docente
        })
    }).then(function (docentePerfil) {
        ioBroadcast(SM.DOCENTE_PERFIL_UPDATED, {'msg': 'Relação Docente Perfil atualizada!', 'DocentePerfil': docentePerfil})
        console.log('\nRequest de '+req.usuario.nome+'\n')

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
    console.log('\nRequest de '+req.usuario.nome+'\n')
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
        console.log('\nRequest de '+req.usuario.nome+'\n')

        history({operationType: "Delete", user: req.usuario.nome, lineId: `${req.params.Perfil}/${req.params.Docente}`})


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