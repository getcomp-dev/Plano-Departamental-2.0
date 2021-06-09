const models        = require('../models/index'),
    router          = require('express').Router(),
    ioBroadcast = require('../library/socketIO').broadcast,
    SM = require('../library/SocketMessages'),
    CustomError = require('../library/CustomError'),
    _               = require('lodash'),
    passwordHash    = require('password-hash')

router.post('/', function (req, res, next) {
  models.Usuario.create({
    nome: req.body.nome,
    login: req.body.login,
    senha: passwordHash.generate(req.body.senha),
    admin: req.body.admin
  }).then(function (usuario) {
    ioBroadcast(SM.USUARIO_CREATED, {'msg': 'Usuário criado!', 'Usuario': usuario})
    res.send({
      success: true,
      message: 'Usuário cadastrado',
      Usuario: _.omit(usuario.toJSON(), 'senha')
    })
  }).catch(function (err) {
    return next(err, req, res)
  })
})

router.get('/', function (req, res, next) {
    models.Usuario.findAll().then(function (usuarios) {
        res.send({
            success: true,
            message: 'Usuários listados',
            Usuarios: usuarios
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
            admin: req.body.admin
        })
    }).then(function (usuario) {
        ioBroadcast(SM.USUARIO_UPDATED, {'msg': 'Usu[ario atualizado!', 'Usuario': usuario})
        res.send({
            success: true,
            message: 'Usuário atualizado',
            Usuario: _.omit(usuario.toJSON(), 'senha')
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.post('/super/:id([0-9]+)', function (req, res, next) {
    models.Usuario.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (usuario) {
        if (!usuario)
            throw new CustomError(400, 'Usuário inválido')
        if(req.body.senha){
            return usuario.updateAttributes({

                nome: req.body.nome,
                login: req.body.login,
                senha:  passwordHash.generate(req.body.senha),
                admin: req.body.admin
            })
        } else {
            return usuario.updateAttributes({

                nome: req.body.nome,
                login: req.body.login,
                admin: req.body.admin
            })
        }

    }).then(function (usuario) {
        ioBroadcast(SM.USUARIO_UPDATED, {'msg': 'Usu[ario atualizado!', 'Usuario': usuario})
        res.send({
            success: true,
            message: 'Usuário atualizado',
            Usuario: _.omit(usuario.toJSON(), 'senha')
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.delete('/:id([0-9]+)', function (req, res, next) {
    models.Usuario.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (usuario) {
        if (!usuario)
            throw new CustomError(400, 'Usuário inválido')

        return usuario.destroy()
    }).then(function (usuario) {
        ioBroadcast(SM.USUARIO_DELETED, {'msg': 'Usuário excluído!', 'Usuario': usuario})

        res.send({
            success: true,
            message: 'Usuário excluído',
            Usuario: usuario
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})


module.exports = router