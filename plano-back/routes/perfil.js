const models = require('../models/index'),
  router = require('express').Router(),
  ioBroadcast = require('../library/socketIO').broadcast,
  SM = require('../library/SocketMessages'),
  CustomError = require('../library/CustomError')

router.post('/', function (req, res, next) {
  models.Perfil.create({
    nome: req.body.nome,
    abreviacao: req.body.abreviacao,
    cor: req.body.cor
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
    res.send({
      success: true,
      message: 'Perfis listado',
      Perfis: perfis
    })
  }).catch(function (err) {
    return next(err, req, res)
  })
})

router.post('/:id([0-9]+)', function (req, res, next) {
  models.Perfil.findOne({
    where: {
      id: req.params.id
    }
  }).then(function (perfil) {
    if (!perfil)
      throw new CustomError(400, 'Perfil inválido')

    return perfil.updateAttributes({
      nome: req.body.nome,
      abreviacao: req.body.abreviacao,
      cor: req.body.cor
    })
  }).then(function (perfil) {
    ioBroadcast(SM.PERFIL_UPDATED, {'msg': 'Perfil atualizado!', 'Perfil': perfil})

    res.send({
      success: true,
      message: 'Perfil atualizado',
      Perfil: perfil
    })
  }).catch(function (err) {
    return next(err, req, res)
  })
})

router.delete('/:id([0-9]+)', function (req, res, next) {
  models.Perfil.findOne({
    where: {
      id: req.params.id
    }
  }).then(function (perfil) {
    if (!perfil)
      throw new CustomError(400, 'Perfil inválido')

    return perfil.destroy()
  }).then(function (perfil) {
    ioBroadcast(SM.PERFIL_DELETED, {'msg': 'Perfil excluído!', 'Perfil': perfil})

    res.send({
      success: true,
      message: 'Perfil excluído',
      Perfil: perfil
    })
  }).catch(function (err) {
    return next(err, req, res)
  })
})

module.exports = router