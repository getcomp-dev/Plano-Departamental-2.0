const models = require('../models/index'),
    router = require('express').Router(),
    ioBroadcast = require('../library/socketIO').broadcast,
    SM = require('../library/SocketMessages')

router.post('/', function (req, res, next) {
    models.DisciplinaGrade.create({
        periodo: req.body.periodo,
        Disciplina: req.body.Disciplina,
        Grade: req.body.Grade
    }).then(function (disciplinaGrade) {
        ioBroadcast(SM.DISCIPLINA_GRADE_CREATED, {'msg': 'Disciplina adicionada à Grade!', 'DisciplinaGrade': disciplinaGrade})

        res.send({
            success: true,
            message: 'Disciplina adicionada à grade!',
            DisciplinaGrade: disciplinaGrade
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.get('/', function (req, res, next) {
    models.DisciplinaGrade.findAll().then(function (disciplinaGrades) {
        res.send({
            success: true,
            message: 'Disciplinas por grade listadas',
            DisciplinaGrades: disciplinaGrades
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.post('/:Disciplina([0-9]+)&&:Grade([0-9]+)', function (req, res, next) {
    models.DisciplinaGrade.findOne({
        where: {
            Disciplina: req.params.Disciplina,
            Grade: req.params.Grade
        }
    }).then(function (disciplinaGrade) {
        if (!disciplinaGrade)
            throw new CustomError(400, 'Disciplina ou Grade inválida')

        return disciplinaGrade.updateAttributes({
            periodo: req.body.periodo,
            Disciplina: req.body.Disciplina,
            Grade: req.body.Grade
        })
    }).then(function (disciplinaGrade) {
        ioBroadcast(SM.DISCIPLINA_GRADE_UPDATED, {'msg': 'Disciplina da grade atualizada!', 'DisciplinaGrade': disciplinaGrade})

        res.send({
            success: true,
            message: 'Disciplina na grade atualizada',
            DisciplinaGrade: disciplinaGrade
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.delete('/:Disciplina([0-9]+)&&:Grade([0-9]+)', function (req, res, next) {
    models.DisciplinaGrade.findOne({
        where: {
            Disciplina: req.params.Disciplina,
            Grade: req.params.Grade
        }
    }).then(function (disciplinaGrade) {
        if (!disciplinaGrade)
            throw new CustomError(400, 'Disciplina ou Grade inválida')

        return disciplinaGrade.destroy()
    }).then(function (disciplinaGrade) {
        ioBroadcast(SM.DISCIPLINA_GRADE_DELETED, {'msg': 'Disciplina excluída da grade!', 'DisciplinaGrade': disciplinaGrade})

        res.send({
            success: true,
            message: 'Disciplina excluída da Grade',
            DisciplinaGrade: disciplinaGrade
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

module.exports = router