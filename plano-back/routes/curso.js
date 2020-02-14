const models = require('../models/index'),
  router = require('express').Router(),
  ioBroadcast = require('../library/socketIO').broadcast,
  SM = require('../library/SocketMessages')

const history = function(params){
    models.History.create({
        tabelaModificada: 'Curso',
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
    models.Curso.create({
    codigo: req.body.codigo,
    nome: req.body.nome,
    turno: req.body.turno,
    semestreInicial: req.body.semestreInicial,
    alunosEntrada: req.body.alunosEntrada,
    alunosEntrada2: req.body.alunosEntrada2,
    posicao: req.body.posicao
  }).then(function (curso) {
    ioBroadcast(SM.CURSO_CREATED, {'msg': 'Curso criado!', 'Curso': curso})
    console.log('\nRequest de '+req.usuario.nome+'\n')

    history({operationType: "Create", user: req.usuario.nome, lineId: `${req.body.codigo}`})

    res.send({
      success: true,
      message: 'Curso criado!',
      Curso: curso
    })
  }).catch(function (err) {
    return next(err, req, res)
  })
})

router.get('/', function (req, res, next) {
  models.Curso.findAll().then(function (cursos) {
    res.send({
      success: true,
      message: 'Cursos listado',
      Cursos: cursos
    })
  }).catch(function (err) {
    return next(err, req, res)
  })
})

router.post('/:id([0-9]+)', function (req, res, next) {
  console.log('\nRequest de '+req.usuario.nome+'\n')
  models.Curso.findOne({
    where: {
      id: req.params.id
    }
  }).then(function (curso) {
      if (!curso)
         throw new CustomError(400, 'Curso inválido')

      if(curso.codigo != req.body.codigo)
         history({fieldName:'Codigo', lineId:curso.codigo, oldValue: curso.codigo, newValue: req.body.codigo, operationType:'Edit', user: req.usuario.nome})

      if(curso.nome != req.body.nome)
          history({fieldName:'Nome', lineId:curso.codigo, oldValue: curso.nome, newValue: req.body.codigo, operationType:'Edit', user: req.usuario.nome})

      if(curso.turno != req.body.turno)
          history({fieldName:'Turno', lineId:curso.codigo, oldValue: curso.turno, newValue: req.body.codigo, operationType:'Edit', user: req.usuario.nome})

      if(curso.semestreInicial != req.body.semestreInicial)
          history({fieldName:'SemestreInicial', lineId:curso.codigo, oldValue: curso.semestreInicial, newValue: req.body.semestreInicial, operationType:'Edit', user: req.usuario.nome})

      if(curso.alunosEntrada != req.body.alunosEntrada)
          history({fieldName:'AlunosEntrada', lineId:curso.codigo, oldValue: curso.alunosEntrada, newValue: req.body.alunosEntrada, operationType:'Edit', user: req.usuario.nome})

      if(curso.alunosEntrada2 != req.body.alunosEntrada2)
          history({fieldName:'AlunosEntrada2', lineId:curso.codigo, oldValue: curso.alunosEntrada2, newValue: req.body.alunosEntrada2, operationType:'Edit', user: req.usuario.nome})

      if(curso.posicao != req.body.posicao)
          history({fieldName:'Posicao', lineId:curso.codigo, oldValue: curso.posicao, newValue: req.body.posicao, operationType:'Edit', user: req.usuario.nome})


      return curso.updateAttributes({
      codigo: req.body.codigo,
      nome: req.body.nome,
      turno: req.body.turno,
      semestreInicial: req.body.semestreInicial,
      alunosEntrada: req.body.alunosEntrada,
      alunosEntrada2: req.body.alunosEntrada2,
      posicao: req.body.posicao
      })
  }).then(function (curso) {
    ioBroadcast(SM.CURSO_UPDATED, {'msg': 'Curso atualizado!', 'Curso': curso})
    console.log('\nRequest de '+req.usuario.nome+'\n')

    res.send({
      success: true,
      message: 'Curso atualizado',
      Curso: curso
    })
  }).catch(function (err) {
    return next(err, req, res)
  })
})

router.delete('/:id([0-9]+)', function (req, res, next) {
  console.log('\nRequest de '+req.usuario.nome+'\n')
  models.Curso.findOne({
    where: {
      id: req.params.id
    }
  }).then(function (curso) {
    if (!curso)
      throw new CustomError(400, 'Curso inválido')

    return curso.destroy()
  }).then(function (curso) {
    ioBroadcast(SM.CURSO_DELETED, {'msg': 'Curso excluído!', 'Curso': curso})
    console.log('\nRequest de '+req.usuario.nome+'\n')

    history({operationType: "Delete", user: req.usuario.nome, lineId: `${curso.codigo}`})

    res.send({
      success: true,
      message: 'Curso excluído',
      Curso: curso
    })
  }).catch(function (err) {
    return next(err, req, res)
  })
})

module.exports = router