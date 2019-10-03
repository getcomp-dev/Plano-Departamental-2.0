const models = require('../models/index'),
    router = require('express').Router(),
    ioBroadcast = require('../library/socketIO').broadcast,
    SM = require('../library/SocketMessages'),
    CustomError = require('../library/CustomError')

router.post('/', function (req, res, next) {
    console.log('\nRequest de '+req.usuario.nome+'\n')
    models.Turma.create({
        periodo: req.body.periodo,
        letra: req.body.letra,
        turno1:  req.body.turno1,
        turno2: req.body.turno2,
        Disciplina: req.body.Disciplina,
        Docente1: req.body.Docente1,
        Docente2: req.body.Docente2,
        Horario1: req.body.Horario1,
        Horario2: req.body.Horario2,
        Sala1: req.body.Sala1,
        Sala2: req.body.Sala2

    }).then(function (turma) {
        ioBroadcast(SM.TURMA_CREATED, {'msg': 'Turma criada!', 'Turma': turma})
        console.log('\nRequest de '+req.usuario.nome+'\n')

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
    models.Turma.findAll().then(function (turmas) {
        res.send({
            success: true,
            message: 'Turmas listadas',
            Turmas: turmas
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.post('/:id([0-9]+)', function (req, res, next) {
    console.log('\nRequest de '+req.usuario.nome+'\n')
    models.Turma.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (turma) {
        if (!turma)
            throw new CustomError(400, 'Turma inválida')

        return turma.updateAttributes({

            periodo: req.body.periodo,
            letra: req.body.letra,
            turno1:  req.body.turno1,
            turno2: req.body.turno2,
            Disciplina: req.body.Disciplina,
            Docente1: req.body.Docente1,
            Docente2: req.body.Docente2,
            Horario1: req.body.Horario1,
            Horario2: req.body.Horario2,
            Sala1: req.body.Sala1,
            Sala2: req.body.Sala2
        })
    }).then(function (turma) {
        ioBroadcast(SM.TURMA_UPDATED, {'msg': 'Turma atualizada!', 'Turma': turma})
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
    models.Turma.findAll().then(function (turmas) {
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
                if(req.body.docente===1){
                    turma.Docente1 = null
                    turma.Docente2 = null
                }
                if(req.body.sala===1){
                    turma.Sala1 = null
                    turma.sala2 = null
                }
                turma.save().then(function (turma) {
                    ioBroadcast(SM.TURMA_UPDATED, {'msg': 'Turma atualizada!', 'Turma': turma})
                })
            }
        }).catch(function (err) {
            return next(err, req, res)
    })
})

router.delete('/:id([0-9]+)', function (req, res, next) {
    console.log('\nRequest de '+req.usuario.nome+'\n')
    models.Turma.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (turma) {
        if (!turma)
            throw new CustomError(400, 'Turma inválida')

        return turma.destroy()
    }).then(function (turma) {
        ioBroadcast(SM.TURMA_DELETED, {'msg': 'Turma excluída!', 'Turma': turma})
        console.log('\nRequest de '+req.usuario.nome+'\n')

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