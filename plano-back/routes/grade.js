const models = require('../models/index'),
    router = require('express').Router(),
    ioBroadcast = require('../library/socketIO').broadcast,
    SM = require('../library/SocketMessages')

router.post('/', function (req, res, next) {
    models.Grade.create({
        periodoInicio: req.body.periodoInicio,
        nome: req.body.nome,
        Curso: req.body.Curso
    }).then(function (grade) {
        ioBroadcast(SM.GRADE_CREATED, {'msg': 'Grade criada!', 'Grade': grade})

        res.send({
            success: true,
            message: 'Grade criada!',
            Grade: grade
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.get('/', function (req, res, next) {
    models.Grade.findAll().then(function (grades) {
        res.send({
            success: true,
            message: 'Grades listadas',
            Grades: grades
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.post('/:id([0-9]+)', function (req, res, next) {
    models.Grade.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (grade) {
        if (!grade)
            throw new CustomError(400, 'Grade inválida')

        return grade.updateAttributes({
            periodoInicio: req.body.periodoInicio,
            nome: req.body.nome,
            Curso: req.body.Curso,
        })
    }).then(function (grade) {
        ioBroadcast(SM.GRADE_UPDATED, {'msg': 'Grade atualizada!', 'Grade': grade})

        res.send({
            success: true,
            message: 'Grade atualizada',
            Grade: grade
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.delete('/:id([0-9]+)', function (req, res, next) {
    models.Grade.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (grade) {
        if (!grade)
            throw new CustomError(400, 'Grade inválida')

        return grade.destroy()
    }).then(function (grade) {
        ioBroadcast(SM.GRADE_DELETED, {'msg': 'Grade excluída!', 'Grade': grade})

        res.send({
            success: true,
            message: 'Grade excluído',
            Grade: grade
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

module.exports = router