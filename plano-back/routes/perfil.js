const models = require('../models/index'),
  router = require('express').Router(),
  ioBroadcast = require('../library/socketIO').broadcast,
  SM = require('../library/SocketMessages'),
  CustomError = require('../library/CustomError')

const history = function(params){
    models.History.create({
        tabelaModificada: 'Perfil',
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
  models.Perfil.create({
    nome: req.body.nome,
    abreviacao: req.body.abreviacao,
    cor: req.body.cor
  }).then(function (perfil) {
    ioBroadcast(SM.PERFIL_CREATED, {'msg': 'Perfil criado!', 'Perfil': perfil})
    console.log('\nRequest de '+req.usuario.nome+'\n')

    history({operationType: "Create", user: req.usuario.nome, lineId: `${req.body.nome}`})

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
  console.log('\nRequest de '+req.usuario.nome+'\n')
  models.Perfil.findOne({
    where: {
      id: req.params.id
    }
  }).then(function (perfil) {
    if (!perfil)
      throw new CustomError(400, 'Perfil inválido')

    if(perfil.nome != req.body.nome)
      history({fieldName:'Nome', lineId:perfil.nome, oldValue: perfil.nome, newValue: req.body.nome, operationType:'Edit', user: req.usuario.nome})

    if(perfil.abreviacao != req.body.abreviacao)
      history({fieldName:'Abreviacao', lineId:perfil.nome, oldValue: perfil.abreviacao, newValue: req.body.abreviacao, operationType:'Edit', user: req.usuario.nome})

    if(perfil.cor != req.body.cor)
      history({fieldName:'cor', lineId:perfil.nome, oldValue: perfil.cor, newValue: req.body.cor, operationType:'Edit', user: req.usuario.nome})


      return perfil.updateAttributes({
      nome: req.body.nome,
      abreviacao: req.body.abreviacao,
      cor: req.body.cor
    })
  }).then(function (perfil) {
    ioBroadcast(SM.PERFIL_UPDATED, {'msg': 'Perfil atualizado!', 'Perfil': perfil})

    console.log('\nRequest de '+req.usuario.nome+'\n')
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
    console.log('\nRequest de '+req.usuario.nome+'\n')
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
    console.log('\nRequest de '+req.usuario.nome+'\n')

    history({operationType: "Delete", user: req.usuario.nome, lineId: `${perfil.nome}`})

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