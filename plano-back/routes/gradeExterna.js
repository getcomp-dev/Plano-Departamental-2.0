const models = require('../models/index'),
    router = require('express').Router(),
    ioBroadcast = require('../library/socketIO').broadcast,
    SM = require('../library/SocketMessages')

const history = function(params){
    models.History.create({
        tabelaModificada: 'GradeExterna',
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
    models.GradeExterna.create({
        periodoInicio: req.body.periodoInicio,
        nome: req.body.nome,
        Curso: req.body.Curso
    }).then(function (grade) {
        ioBroadcast(SM.GRADE_EXTERNA_CREATED, {'msg': 'Grade criada!', 'GradeExterna': grade})
        console.log('\nRequest de '+req.usuario.nome+'\n')

        history({operationType: "Create", user: req.usuario.nome, lineId: `${req.body.Curso}/${req.body.nome}`})

        res.send({
            success: true,
            message: 'Grade criada!',
            GradeExterna: grade
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.get('/', function (req, res, next) {
    models.GradeExterna.findAll().then(function (grades) {
        res.send({
            success: true,
            message: 'Grades listadas',
            GradesExternas: grades
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.post('/:id([0-9]+)', function (req, res, next) {
    console.log('\nRequest de '+req.usuario.nome+'\n')
    models.GradeExterna.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (grade) {
        if (!grade)
            throw new CustomError(400, 'Grade inválida')

        if(grade.periodoInicio != req.body.periodoInicio)
            history({fieldName:'PeriodoInicio', lineId:`${grade.Curso}/${grade.nome}`, oldValue: grade.periodoInicio, newValue: req.body.periodoInicio, operationType:'Edit', user: req.usuario.nome})

        if(grade.nome != req.body.nome)
            history({fieldName:'Nome', lineId:`${grade.Curso}/${grade.nome}`, oldValue: grade.nome, newValue: req.body.nome, operationType:'Edit', user: req.usuario.nome})

        if(grade.Curso != req.body.Curso)
            history({fieldName:'Curso', lineId:`${grade.Curso}/${grade.nome}`, oldValue: grade.Curso, newValue: req.body.Curso, operationType:'Edit', user: req.usuario.nome})


        return grade.updateAttributes({
            periodoInicio: req.body.periodoInicio,
            nome: req.body.nome,
            Curso: req.body.Curso,
        })
    }).then(function (grade) {
        ioBroadcast(SM.GRADE_EXTERNA_UPDATED, {'msg': 'Grade atualizada!', 'GradeExterna': grade})
        console.log('\nRequest de '+req.usuario.nome+'\n')

        res.send({
            success: true,
            message: 'Grade atualizada',
            GradeExterna: grade
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.delete('/:id([0-9]+)', function (req, res, next) {
    console.log('\nRequest de '+req.usuario.nome+'\n')
    models.GradeExterna.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (grade) {
        if (!grade)
            throw new CustomError(400, 'Grade inválida')

        return grade.destroy()
    }).then(function (grade) {
        ioBroadcast(SM.GRADE_EXTERNA_DELETED, {'msg': 'Grade excluída!', 'GradeExterna': grade})
        console.log('\nRequest de '+req.usuario.nome+'\n')

        history({operationType: "Delete", user: req.usuario.nome, lineId: `${grade.Curso}/${grade.nome}`})

        res.send({
            success: true,
            message: 'Grade excluído',
            GradeExterna: grade
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

module.exports = router