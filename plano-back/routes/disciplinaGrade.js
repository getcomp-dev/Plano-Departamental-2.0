const models = require('../models/index'),
    router = require('express').Router(),
    ioBroadcast = require('../library/socketIO').broadcast,
    SM = require('../library/SocketMessages')

const history = function(params){
    models.History.create({
        tabelaModificada: 'DisciplinaGrade',
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
    models.DisciplinaGrade.create({
        periodo: req.body.periodo,
        Disciplina: req.body.Disciplina,
        Grade: req.body.Grade
    }).then(function (disciplinaGrade) {
        ioBroadcast(SM.DISCIPLINA_GRADE_CREATED, {'msg': 'Disciplina adicionada à Grade!', 'DisciplinaGrade': disciplinaGrade})
        console.log('\nRequest de '+req.usuario.nome+'\n')

        history({operationType: "Create", user: req.usuario.nome, lineId: `${disciplinaGrade.periodo}/${disciplinaGrade.Disciplina}/${disciplinaGrade.Grade}`})

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
    console.log('\nRequest de '+req.usuario.nome+'\n')
    models.DisciplinaGrade.findOne({
        where: {
            Disciplina: req.params.Disciplina,
            Grade: req.params.Grade
        }
    }).then(function (disciplinaGrade) {
        if (!disciplinaGrade)
            throw new CustomError(400, 'Disciplina ou Grade inválida')

        if(disciplinaGrade.periodo != req.body.periodo)
            history({fieldName:'Periodo', lineId:`${disciplinaGrade.periodo}/${disciplinaGrade.Disciplina}/${disciplinaGrade.Grade}`, oldValue: disciplinaGrade.periodo, newValue: req.body.periodo, operationType:'Edit', user: req.usuario.nome})

        if(disciplinaGrade.Disciplina != req.body.Disciplina)
            history({fieldName:'Disciplina', lineId:`${disciplinaGrade.periodo}/${disciplinaGrade.Disciplina}/${disciplinaGrade.Grade}`, oldValue: disciplinaGrade.Disciplina, newValue: req.body.Disciplina, operationType:'Edit', user: req.usuario.nome})

        if(disciplinaGrade.Grade != req.body.Grade)
            history({fieldName:'Grade', lineId:`${disciplinaGrade.periodo}/${disciplinaGrade.Disciplina}/${disciplinaGrade.Grade}`, oldValue: disciplinaGrade.Grade, newValue: req.body.Grade, operationType:'Edit', user: req.usuario.nome})


        return disciplinaGrade.updateAttributes({
            periodo: req.body.periodo,
            Disciplina: req.body.Disciplina,
            Grade: req.body.Grade
        })
    }).then(function (disciplinaGrade) {
        ioBroadcast(SM.DISCIPLINA_GRADE_UPDATED, {'msg': 'Disciplina da grade atualizada!', 'DisciplinaGrade': disciplinaGrade})
        console.log('\nRequest de '+req.usuario.nome+'\n')

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
    console.log('\nRequest de '+req.usuario.nome+'\n')
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
        console.log('\nRequest de '+req.usuario.nome+'\n')

        history({operationType: "Delete", user: req.usuario.nome, lineId: `${disciplinaGrade.periodo}/${disciplinaGrade.Disciplina}/${disciplinaGrade.Grade}`})

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