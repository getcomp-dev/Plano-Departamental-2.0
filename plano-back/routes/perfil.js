const models    = require('../models/index'),
    router      = require('express').Router(),
    ioBroadcast = require('../library/socketIO').broadcast

router.post('/', function (req, res, next) {
  models.Perfil.create({
    nome: req.body.nome,
    abreviacao: req.body.abreviacao
  }).then(function (perfil) {
    ioBroadcast('message', {'msg': 'Perfil criado!', 'perfil': perfil})

    res.send({
      success: true,
      message: 'Perfil cadastrado',
      Perfil: perfil
    })
  }).catch(function (err) {
    return next(err, req, res)
  })
})

module.exports = router