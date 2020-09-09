const router = require('express').Router(),
    exec = require('child_process').exec

router.post('/:planoOld([0-9]+)&&:planoNew([0-9]+)', function(req, res, next){
    exec('mysql -u root mult_planos -e "' +
        'insert into Turma(periodo, letra, turno1, turno2, Disciplina, Docente1, Docente2, Horario1, Horario2, Sala1, Sala2, Plano) select periodo, letra, turno1, turno2, Disciplina, Docente1, Docente2, Horario1, Horario2, Sala1, Sala2,' + req.params.planoNew + ' from Turma where Plano = '+ req.params.planoOld+';' +
        'insert into TurmaExterna(periodo, letra, turno1, turno2, Disciplina, Horario1, Horario2, Sala1, Sala2, Plano) select periodo, letra, turno1, turno2, Disciplina, Horario1, Horario2, Sala1, Sala2, ' + req.params.planoNew + ' from TurmaExterna where Plano = '+ req.params.planoOld +';'+
        'update Pedido as p1, Pedido as p2, Turma as t1, Turma as t2 set p1.vagasPeriodizadas = p2.vagasPeriodizadas, p1.vagasNaoPeriodizadas = p2.vagasNaoPeriodizadas where t1.Plano = '+ req.params.planoNew +' and t2.plano = '+ req.params.planoOld +' and t1.Disciplina = t2.Disciplina and t1.letra = t2.letra and p1.Turma = t1.id and p2.Turma = t2.id and p1.Curso = p2.Curso and t1.periodo = t2.periodo;'+
        'update PedidoExterno as p1, PedidoExterno as p2, TurmaExterna as t1, TurmaExterna as t2 set p1.vagasPeriodizadas = p2.vagasPeriodizadas, p1.vagasNaoPeriodizadas = p2.vagasNaoPeriodizadas where t1.Plano = '+ req.params.planoNew +' and t2.plano = '+ req.params.planoOld +' and t1.Disciplina = t2.Disciplina and t1.letra = t2.letra and p1.Turma = t1.id and p2.Turma = t2.id and p1.Curso = p2.Curso and t1.periodo = t2.periodo;'+
        'insert into CargaPos(trimestre, programa, creditos, docente, Plano) select trimestre, programa, creditos, docente, '+ req.params.planoNew +' from CargaPos where Plano = '+ req.params.planoOld +';'+
        '"', (error, stdout, stderr) => {
        if(error == null){
            res.send({
                success:true,
                message: "Cópia realizada com sucesso"
            })
        }else{
            res.send({
                success: false,
                error:error,
                stdout: stdout,
                stderr: stderr
            })
        }
    })
})

module.exports = router