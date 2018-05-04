const models    = require('../models/index'),
    router      = require('express').Router(),
    ioBroadcast = require('../library/socketIO').broadcast,
    SM = require('../library/SocketMessages')

router.post('/', function (req, res, next) {
  models.Perfil.create({
    nome: req.body.nome,
    abreviacao: req.body.abreviacao
  }).then(function (perfil) {
    ioBroadcast(SM.PERFIL_CREATED, {'msg': 'Perfil criado!', 'Perfil': perfil})

    res.send({
      success: true,
      message: 'Perfil criado!',
      Perfil: perfil
    })
  }).catch(function (err) {
    return next(err, req, res)
  })
})

router.get('/', function (req, res, next) {
  models.Perfil.findAll().then(function (perfis) {

    setTimeout(function() {
      res.send({
        success: true,
        message: 'Perfis listado',
        Perfis: perfis
      })
    }, 3000);

  }).catch(function (err) {
    return next(err, req, res)
  })
})

module.exports = router