const models = require('../models/index');
const { Op } = require("sequelize");

var table = process.argv[2];

const operations = {
    turma: function(form){
        models.Turma.create({
            periodo: form.periodo,
            letra: form.letra,
            turno1:  form.turno1,
            turno2: form.turno2,
            Disciplina: form.Disciplina,
            Docente1: form.Docente1,
            Docente2: form.Docente2,
            Horario1: form.Horario1,
            Horario2: form.Horario2,
            Sala1: form.Sala1,
            Sala2: form.Sala2,
            Plano: form.Plano
        }).then(
            function(turma) {
                process.send({turma: turma, sucess: true});
                process.disconnect();
            }
        ).catch(
            function(err) {
                process.send({err: err, success: false});
                process.disconnect();
            }
        )
    },
    turmaExterna: function(form){
        models.TurmaExterna.create({
            periodo: form.periodo,
            letra: form.letra,
            turno1:  form.turno1,
            turno2: form.turno2,
            Disciplina: form.Disciplina,
            Horario1: form.Horario1,
            Horario2: form.Horario2,
            Sala1: form.Sala1,
            Sala2: form.Sala2,
            Plano: form.Plano
        }).then(
            function(turma) {
                process.send({turma: turma, success: true});
                process.disconnect();
            }
        ).catch(
            function(err) {
                process.send({err: err, success: false});
                process.disconnect();
            }
        )

    },
    pedido: function(form){
        models.Pedido.update({
            vagasPeriodizadas: form.vagasPeriodizadas,
            vagasNaoPeriodizadas: form.vagasNaoPeriodizadas,
            editado1: form.editado1,
            editado2: form.editado2,

        }, {
            where:{
                Curso: form.Curso,
                Turma: form.Turma
            }
        }).then(
            function(pedido) {
                process.send({pedido: pedido, success: true});
                process.disconnect();
            }
        ).catch(
            function(err) {
                process.send({err: err, success: false});
                process.disconnect();
            }
        )
    },
    pedidoExterno: function(form){
        models.PedidoExterno.update({
            vagasPeriodizadas: form.vagasPeriodizadas,
            vagasNaoPeriodizadas: form.vagasNaoPeriodizadas
        }, {
            where:{
                Curso: form.Curso,
                Turma: form.Turma
            }
        }).then(
            function(pedido) {
                process.send({pedido: pedido, success: true});
                process.disconnect();
            }
        ).catch(
            function(err) {
                process.send({err: err, success: false});
                process.disconnect();
            }
        )
    }
};

process.on('message', function(form){
    operations[table](form);
});