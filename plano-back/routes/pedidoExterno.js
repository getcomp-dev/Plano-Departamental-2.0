const models = require('../models/index'),
    router = require('express').Router(),
    ioBroadcast = require('../library/socketIO').broadcast,
    SM = require('../library/SocketMessages')

const history = function(params){
    models.History.create({
        tabelaModificada: 'PedidoExterno',
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

        if(pedido.vagasPeriodizadas != req.body.vagasPeriodizadas)
            history({fieldName:'VagasPeriodizadas', lineId:`${pedido.Turma}/${pedido.Curso}`, oldValue: pedido.vagasPeriodizadas, newValue: req.body.vagasPeriodizadas, operationType:'Edit', user: req.usuario.nome})

        if(pedido.vagasNaoPeriodizadas != req.body.vagasNaoPeriodizadas)
            history({fieldName:'VagasNaoPeriodizadas', lineId:`${pedido.Turma}/${pedido.Curso}`, oldValue: pedido.vagasNaoPeriodizadas, newValue: req.body.vagasNaoPeriodizadas, operationType:'Edit', user: req.usuario.nome})

        if(pedido.Curso != req.body.Curso)
            history({fieldName:'Curso', lineId:`${pedido.Turma}/${pedido.Curso}`, oldValue: pedido.Curso, newValue: req.body.Curso, operationType:'Edit', user: req.usuario.nome})

        if(pedido.Turma != req.body.Turma)
            history({fieldName:'Turma', lineId:`${pedido.Turma}/${pedido.Curso}`, oldValue: pedido.Turma, newValue: req.body.Turma, operationType:'Edit', user: req.usuario.nome})



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