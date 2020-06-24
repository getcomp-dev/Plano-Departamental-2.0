const models = require('../models/index'),
    router = require('express').Router(),
    ioBroadcast = require('../library/socketIO').broadcast,
    SM = require('../library/SocketMessages'),
    CustomError = require('../library/CustomError')

const history = function(params){
    models.History.create({
        tabelaModificada: 'TurmaExterna',
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
    models.TurmaExterna.create({
        periodo: req.body.periodo,
        letra: req.body.letra,
        turno1:  req.body.turno1,
        turno2: req.body.turno2,
        Disciplina: req.body.Disciplina,
        Horario1: req.body.Horario1,
        Horario2: req.body.Horario2,
        Sala1: req.body.Sala1,
        Sala2: req.body.Sala2

    }).then(function (turma) {
        ioBroadcast(SM.TURMA_EXTERNA_CREATED, {'msg': 'Turma criada!', 'Turma': turma})
        console.log('\nRequest de '+req.usuario.nome+'\n')

        history({operationType: "Create", user: req.usuario.nome, lineId: `${turma.letra}/${turma.Disciplina}`})

        res.send({
            success: true,
            message: 'Turma criada!',
            Turma: turma
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.get('/', function (req, res, next) {
    models.TurmaExterna.findAll().then(function (turmas) {
        res.send({
            success: true,
            message: 'Turmas Externas listadas',
            Turmas: turmas
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.post('/:id([0-9]+)', function (req, res, next) {
    console.log('\nRequest de '+req.usuario.nome+'\n')
    models.TurmaExterna.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (turma) {
        if (!turma)
            throw new CustomError(400, 'Turma inválida')

        if(turma.periodo != req.body.periodo)
            history({fieldName:'Periodo', lineId:`${turma.letra}/${turma.Disciplina}`, oldValue: turma.periodo, newValue: req.body.periodo, operationType:'Edit', user: req.usuario.nome})

        if(turma.letra != req.body.letra)
            history({fieldName:'letra', lineId:`${turma.letra}/${turma.Disciplina}`, oldValue: turma.letra, newValue: req.body.letra, operationType:'Edit', user: req.usuario.nome})

        if(turma.turno1 != req.body.turno1)
            history({fieldName:'Turno1', lineId:`${turma.letra}/${turma.Disciplina}`, oldValue: turma.turno1, newValue: req.body.turno1, operationType:'Edit', user: req.usuario.nome})

        if(turma.turno2 != req.body.turno2)
            history({fieldName:'Turno2', lineId:`${turma.letra}/${turma.Disciplina}`, oldValue: turma.turno2, newValue: req.body.turno2, operationType:'Edit', user: req.usuario.nome})

        if(turma.Disciplina != req.body.Disciplina)
            history({fieldName:'Disciplina', lineId:`${turma.letra}/${turma.Disciplina}`, oldValue: turma.Disciplina, newValue: req.body.Disciplina, operationType:'Edit', user: req.usuario.nome})

         if(turma.Horario1 != req.body.Horario1)
            history({fieldName:'Horario1', lineId:`${turma.letra}/${turma.Disciplina}`, oldValue: turma.Horario1, newValue: req.body.Horario1, operationType:'Edit', user: req.usuario.nome})

        if(turma.Horario2 != req.body.Horario2)
            history({fieldName:'Horario2', lineId:`${turma.letra}/${turma.Disciplina}`, oldValue: turma.Horario2, newValue: req.body.Horario2, operationType:'Edit', user: req.usuario.nome})

        if(turma.Sala1 != req.body.Sala1)
            history({fieldName:'Sala1', lineId:`${turma.letra}/${turma.Disciplina}`, oldValue: turma.Sala1, newValue: req.body.Sala1, operationType:'Edit', user: req.usuario.nome})

        if(turma.Sala2 != req.body.Sala2)
            history({fieldName:'Sala2', lineId:`${turma.letra}/${turma.Disciplina}`, oldValue: turma.Sala2, newValue: req.body.Sala2, operationType:'Edit', user: req.usuario.nome})


        return turma.updateAttributes({

            periodo: req.body.periodo,
            letra: req.body.letra,
            turno1:  req.body.turno1,
            turno2: req.body.turno2,
            Disciplina: req.body.Disciplina,
            Horario1: req.body.Horario1,
            Horario2: req.body.Horario2,
            Sala1: req.body.Sala1,
            Sala2: req.body.Sala2
        })
    }).then(function (turma) {
        ioBroadcast(SM.TURMA_EXTERNA_UPDATED, {'msg': 'Turma atualizada!', 'Turma': turma})
        console.log('\nRequest de '+req.usuario.nome+'\n')

        res.send({
            success: true,
            message: 'Turma atualizada',
            Turma: turma
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.post('/clear', function(req, res, next) {
    console.log('\nRequest de '+req.usuario.nome+'\n')
    models.TurmaExterna.findAll().then(function (turmas) {
        for(let turma in turmas){
            if(req.body.periodo===1)
                turma.periodo = null
            if(req.body.letra===1)
                turma.letra = null
            if(req.body.horario===1){
                turma.Horario1 = null
                turma.Horario2 = null
                turma.turno1 = null
            }
            if(req.body.sala===1){
                turma.Sala1 = null
                turma.sala2 = null
            }
            turma.save().then(function (turma) {
                ioBroadcast(SM.TURMA_EXTERNA_UPDATED, {'msg': 'Turma atualizada!', 'Turma': turma})
            })
        }
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.delete('/:id([0-9]+)', function (req, res, next) {
    console.log('\nRequest de '+req.usuario.nome+'\n')
    models.TurmaExterna.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (turma) {
        if (!turma)
            throw new CustomError(400, 'Turma inválida')

        return turma.destroy()
    }).then(function (turma) {
        ioBroadcast(SM.TURMA_EXTERNA_DELETED, {'msg': 'Turma excluída!', 'Turma': turma})
        console.log('\nRequest de '+req.usuario.nome+'\n')

        history({operationType: "Delete", user: req.usuario.nome, lineId: `${turma.letra}/${turma.Disciplina}`})

        res.send({
            success: true,
            message: 'Turma excluída',
            Turma: turma
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

module.exports = router