const models = require('../models/index'),
  router = require('express').Router(),
  ioBroadcast = require('../library/socketIO').broadcast,
  SM = require('../library/SocketMessages')

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