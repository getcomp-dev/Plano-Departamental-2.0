const models        = require('../models/index'),
    router          = require('express').Router(),
    _               = require('lodash'),
    passwordHash    = require('password-hash')

router.post('/', function (req, res, next) {
  models.Usuario.create({
    nome: req.body.nome,
    login: req.body.login,
    senha: passwordHash.generate(req.body.senha)
  }).then(function (usuario) {
    res.send({
      success: true,
      message: 'Usuário cadastrado',
      Usuario: _.omit(usuario.toJSON(), 'senha')
    })
  }).catch(function (err) {
    return next(err, req, res)
  })
})

router.post('/:id([0-9]+)', function (req, res, next) {
    models.Usuario.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (usuario) {
        if (!usuario)
            throw new CustomError(400, 'Usuário inválido')
        if (!passwordHash.verify(req.body.senhaAtual, usuario.senha))
            throw new CustomError(400, 'Senha atual incorreta')


        return usuario.updateAttributes({

            nome: req.body.nome,
            login: req.body.login,
            senha:  passwordHash.generate(req.body.senha),
        })
    }).then(function (usuario) {
        res.send({
            success: true,
            message: 'Usuário atualizado',
            Usuario: _.omit(usuario.toJSON(), 'senha')
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})


module.exports = router