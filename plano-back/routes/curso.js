const models    = require('../models/index'),
  router      = require('express').Router(),
  ioBroadcast = require('../library/socketIO').broadcast,
  SM = require('../library/SocketMessages')

router.post('/', function (req, res, next) {
  models.Curso.create({
    nome: req.body.nome
  }).then(function (curso) {
    ioBroadcast(SM.CURSO_CREATED, {'msg': 'Curso criado!', 'Curso': curso})

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

    setTimeout(function() {
      res.send({
        success: true,
        message: 'Cursos listado',
        Cursos: cursos
      })
    }, 1000);

  }).catch(function (err) {
    return next(err, req, res)
  })
})

module.exports = router