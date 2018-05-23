const models = require('../models/index'),
    router = require('express').Router(),
    ioBroadcast = require('../library/socketIO').broadcast,
    SM = require('../library/SocketMessages')

router.post('/', function (req, res, next) {
    models.Pedido.create({
        departamento: req.body.departamento,
        responsavel: req.body.responsavel,
        telefone: req.body.telefone,
        descricao: req.body.descricao,
        vagasPeriodizadasSolicitadas: req.body.vagasPeriodizadasSolicitadas,
        vagasNaoPeriodizadasSolicitadas: req.body.vagasNaoPeriodizadasSolicitadas,
        vagasPeriodizadasAtendidas: req.body.vagasPeriodizadasAtendidas,
        vagasNaoPeriodizadasAtendidas: req.body.vagasNaoPeriodizadasAtendidas,
        Disciplina: req.body.Disciplina
    }).then(function (pedido) {
        ioBroadcast(SM.PEDIDO_CREATED, {'msg': 'Pedido criado!', 'Pedido': pedido})

        res.send({
            success: true,
            message: 'Pedido criado!',
            Pedido: pedido
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.get('/', function (req, res, next) {
    models.Pedido.findAll().then(function (pedidos) {
        res.send({
            success: true,
            message: 'Pedidos listados',
            Pedidos: pedidos
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.post('/:id([0-9]+)', function (req, res, next) {
    models.Pedido.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (pedido) {
        if (!pedido)
            throw new CustomError(400, 'Pedido inválido')

        return pedido.updateAttributes({
            departamento: req.body.departamento,
            responsavel: req.body.responsavel,
            telefone: req.body.telefone,
            descricao: req.body.descricao,
            vagasPeriodizadasSolicitadas: req.body.vagasPeriodizadasSolicitadas,
            vagasNaoPeriodizadasSolicitadas: req.body.vagasNaoPeriodizadasSolicitadas,
            vagasPeriodizadasAtendidas: req.body.vagasPeriodizadasAtendidas,
            vagasNaoPeriodizadasAtendidas: req.body.vagasNaoPeriodizadasAtendidas,
            Disciplina: req.body.Disciplina
        })
    }).then(function (pedido) {
        ioBroadcast(SM.PEDIDO_UPDATED, {'msg': 'Pedido atualizado!', 'Pedido': pedido})

        res.send({
            success: true,
            message: 'Pedido atualizado',
            Pedido: pedido
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.delete('/:id([0-9]+)', function (req, res, next) {
    models.Pedido.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (pedido) {
        if (!pedido)
            throw new CustomError(400, 'Pedido inválido')

        return pedido.destroy()
    }).then(function (pedido) {
        ioBroadcast(SM.PEDIDO_DELETED, {'msg': 'Pedido excluído!', 'Pedido': pedido})

        res.send({
            success: true,
            message: 'Pedido excluído',
            Pedido: pedido
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

module.exports = router