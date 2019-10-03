const models = require('../models/index'),
    router = require('express').Router(),
    ioBroadcast = require('../library/socketIO').broadcast,
    SM = require('../library/SocketMessages')

router.post('/', function (req, res, next) {
    console.log('\nRequest de '+req.usuario.nome+'\n')
    models.PedidoExterno.create({
        vagasPeriodizadas: req.body.vagasPeriodizadas,
        vagasNaoPeriodizadas: req.body.vagasNaoPeriodizadas,
        Curso: req.body.Curso,
        Turma: req.body.Turma
    }).then(function (pedido) {
        ioBroadcast(SM.PEDIDO_EXTERNO_CREATED, {'msg': 'Pedido criado!', 'Pedido': pedido})

        console.log('\nRequest de '+req.usuario.nome+'\n')
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
    models.PedidoExterno.findAll().then(function (pedidos) {
        res.send({
            success: true,
            message: 'Pedidos listados',
            Pedidos: pedidos
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.post('/:Curso([0-9]+)&&:Turma([0-9]+)', function (req, res, next) {
    console.log('\nRequest de '+req.usuario.nome+'\n')
    models.PedidoExterno.findOne({
        where: {
            Curso: req.params.Curso,
            Turma: req.params.Turma
        }
    }).then(function (pedido) {
        if (!pedido)
            throw new CustomError(400, 'Pedido inválido')

        return pedido.updateAttributes({
            vagasPeriodizadas: req.body.vagasPeriodizadas,
            vagasNaoPeriodizadas: req.body.vagasNaoPeriodizadas,
            Curso: req.body.Curso,
            Turma: req.body.Turma
        })
    }).then(function (pedido) {
        ioBroadcast(SM.PEDIDO_EXTERNO_UPDATED, {'msg': 'Pedido atualizado!', 'Pedido': pedido})

        console.log('\nRequest de '+req.usuario.nome+'\n')
        res.send({
            success: true,
            message: 'Pedido atualizado',
            Pedido: pedido
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

router.delete('/:Curso([0-9]+)&&:Turma([0-9]+)', function (req, res, next) {
    console.log('\nRequest de '+req.usuario.nome+'\n')
    models.PedidoExterno.findOne({
        where: {
            Curso: req.params.Curso,
            Turma: req.params.Turma
        }
    }).then(function (pedido) {
        if (!pedido)
            throw new CustomError(400, 'Pedido inválido')

        return pedido.destroy()
    }).then(function (pedido) {
        ioBroadcast(SM.PEDIDO_EXTERNO_DELETED, {'msg': 'Pedido excluído!', 'Pedido': pedido})

        console.log('\nRequest de '+req.usuario.nome+'\n')
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