const router = require('express').Router(),
      XLSX = require('xlsx'),
      models = require('../models/index')

router.post('/', function(req, res, next){
    let wb = XLSX.utils.book_new();
    let cursos = req.body.curso,
        turmas = req.body.turma,
        pedidos = req.body.pedidos,
        disciplinas = models.Disciplina.findAll(),
        docentes = models.Docente.findAll(),
        horarios = models.Horario.findAll(),
        salas = models.Sala.findAll()

    Promise.all([disciplinas, docentes, horarios, salas]).then(function (result) {
        let disciplinas = [],
            docentes = [],
            horarios = [],
            salas = []
        result[0].forEach((disciplina) => disciplinas.push(disciplina.dataValues))
        result[1].forEach((docente) => docentes.push(docente.dataValues))
        result[2].forEach((horario) => horarios.push(horario.dataValues))
        result[3].forEach((sala) => salas.push(sala.dataValues))
        let data = []
        var header = ["S.", "Cod", "Disciplina", "C.", "Turma", "Horário", "Docente", "Turno", "Sala", "Total"]
        if (cursos.length > 0) {
            cursos.forEach(function (curso) {
                header.push(curso.codigo)
            })
        }
        data.push(header)
        if (turmas.length > 0) {
            turmas.forEach(function (turma) {
                let line = []
                line.push(turma.periodo)
                let disciplina = disciplinas.find(function (disc, index, array) {
                    if (disc.id === turma.Disciplina)
                        return true
                    else
                        return false
                })
                if (disciplina !== undefined) {
                    console.log(disciplina.nome)
                    line.push(disciplina.codigo)
                    line.push(disciplina.nome)
                    let carga = (disciplina.cargaTeorica + disciplina.cargaPratica)
                    line.push(carga)
                } else {
                    line.push('')
                    line.push('')
                    line.push('')
                }
                line.push(turma.letra)
                let horario1 = horarios.find(function (hora, index, array) {
                    if (hora.id === turma.Horario1)
                        return true
                    else
                        return false
                })
                let horario2 = horarios.find(function (hora, index, array) {
                    if (hora.id === turma.Horario2)
                        return true
                    else
                        return false
                })
                if (horario1 === undefined) {
                    if (horario2 !== undefined) {
                        line.push(horario2.horario)
                    }
                    else {
                        line.push('')
                    }
                } else {
                    if (horario2 === undefined) {
                        line.push(horario1.horario)
                    } else {
                        line.push(horario1.horario + '/' + horario2.horario)
                    }
                }

                let docente = docentes.find(function (dcnt, index, array) {
                    if (dcnt.id === turma.Docente)
                        return true
                    else
                        return false
                })
                if (docente === undefined) {
                    line.push('')
                } else {
                    console.log(docente.apelido)
                    line.push(docente.apelido)
                }
                line.push(turma.turno)

                let sala1 = salas.find(function (sl, index, array) {
                    if (sl.id === turma.Sala1)
                        return true
                    else
                        return false
                })
                let sala2 = salas.find(function (sl, index, array) {
                    if (sl.id === turma.Sala2)
                        return true
                    else
                        return false
                })
                if (sala1 === undefined) {
                    if (sala2 !== undefined) {
                        line.push(sala2.nome)
                    }
                    else {
                        line.push('')
                    }
                } else {
                    if (sala2 === undefined) {
                        line.push(sala1.nome)
                    } else {
                        line.push(sala1.nome + '/' + sala2.nome)
                    }
                }
                let total = 0
                let pds = []
                cursos.forEach(function (curso) {
                    if (isArray(pedidos[turma.id])) {
                        let pedido = pedidos[turma.id].find(function (pd, index, array) {
                            if (pd.Curso = curso.id)
                                return true
                            else
                                return false
                        })
                        pds.push(pedido.vagasPeriodizadas + '/' + pedido.vagasNaoPeriodizadas)
                        total = total + pedido.vagasPeriodizadas + pedido.vagasNaoPeriodizadas
                    } else {
                        pd.push('')
                    }
                })
                line.push(total)
                line.push(...pds)
                data.push(line)
            })
        }
        console.log(data)
        let ws = XLSX.utils.aoa_to_sheet(data)
        XLSX.utils.book_append_sheet(wb, ws, "DCC")
        XLSX.writeFile(wb, 'tabelaPrincipal.xlsx')
        res.download('tabelaPrincipal.xlsx')
    }).catch(function (err) {
        return next(err, req, res)
    })

})


module.exports = router