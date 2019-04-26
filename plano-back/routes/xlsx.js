const express = require('express'),
      router = require('express').Router(),
      XLSX = require('xlsx'),
      models = require('../models/index'),
      _ = require('lodash')

router.post('/', function(req, res, next){
    let wb = XLSX.utils.book_new();
    let cursos = models.Curso.findAll(),
        turmas = models.Turma.findAll(),
        pedidos = req.body.pedidos,
        disciplinas = models.Disciplina.findAll(),
        docentes = models.Docente.findAll(),
        horarios = models.Horario.findAll(),
        salas = models.Sala.findAll(),
        perfis = models.Perfil.findAll()

    Promise.all([cursos, turmas, disciplinas, docentes, horarios, salas, perfis]).then(function (result) {
        let cursos = [],
            turmas = [],
            disciplinas = [],
            docentes = [],
            horarios = [],
            salas = [],
            perfis = []
        result[0].forEach((curso) => cursos.push(curso.dataValues))
        result[1].forEach((turma) => turmas.push(turma.dataValues))
        result[2].forEach((disciplina) => disciplinas.push(disciplina.dataValues))
        result[3].forEach((docente) => docentes.push(docente.dataValues))
        result[4].forEach((horario) => horarios.push(horario.dataValues))
        result[5].forEach((sala) => salas.push(sala.dataValues))
        result[6].forEach((perfil) => perfis.push(perfil.dataValues))

        cursos = _.orderBy(cursos, 'posicao')
        turmas = _.orderBy(_.orderBy(_.orderBy(_.orderBy(_.filter(turmas, function(t) { return t.Disciplina !== null}), 'letra'), 'Disciplina'), 'Perfil'), 'periodo')

        let data = []
        var header = ["S.", "Cod", "Disciplina", "C.", "Turma", "Horário", "Docente", "Turno", "Sala", "Total"]
        if (cursos.length > 0) {
            cursos.forEach(function (curso) {
                header.push(curso.codigo)
            })
        }
        data.push(header)
        if (turmas.length > 0) {
            perfis.forEach((perfil) => {
            for(let i = 0; i < turmas.length; i++) {
                let turma = turmas[i]
                if(turma.periodo===3)
                    continue
                let line = []
                let disciplina = disciplinas.find(function (disc, index, array) {
                    if (disc.id === turma.Disciplina)
                        return true
                    else
                        return false
                })
                if(disciplina.Perfil !== perfil.id)
                    continue

                line.push(turma.periodo)

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
                const pedidosTurma = pedidos[turma.id]
                for(let i = 0; i < cursos.length; i++){
                    let curso = cursos[i]
                    if (Array.isArray(pedidosTurma)) {
                        let pedido = pedidosTurma.find(function (pd, index, array) {
                            if (parseInt(pd.Curso) === parseInt(curso.id))
                                return true
                            else
                                return false
                        })
                        if(pedido){
                            pds.push(pedido.vagasPeriodizadas + '/' + pedido.vagasNaoPeriodizadas)
                            total = total + pedido.vagasPeriodizadas + pedido.vagasNaoPeriodizadas
                        }else{
                            pds.push('')
                        }
                    } else {
                        pds.push('')
                    }
                }
                line.push(total)
                console.log(pds)
                pds.forEach(function(pd){
                    line.push(pd)
                })
                data.push(line)
            }
            })

            perfis.forEach((perfil) => {
                for(let i = 0; i < turmas.length; i++) {
                    let turma = turmas[i]
                    if(turma.periodo===1)
                        continue
                    let line = []
                    let disciplina = disciplinas.find(function (disc, index, array) {
                        if (disc.id === turma.Disciplina)
                            return true
                        else
                            return false
                    })
                    if(disciplina.Perfil !== perfil.id)
                        continue

                    line.push(turma.periodo)

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
                    const pedidosTurma = pedidos[turma.id]
                    for(let i = 0; i < cursos.length; i++){
                        let curso = cursos[i]
                        if (Array.isArray(pedidosTurma)) {
                            let pedido = pedidosTurma.find(function (pd, index, array) {
                                if (parseInt(pd.Curso) === parseInt(curso.id))
                                    return true
                                else
                                    return false
                            })
                            if(pedido){
                                pds.push(pedido.vagasPeriodizadas + '/' + pedido.vagasNaoPeriodizadas)
                                total = total + pedido.vagasPeriodizadas + pedido.vagasNaoPeriodizadas
                            }else{
                                pds.push('')
                            }
                        } else {
                            pds.push('')
                        }
                    }
                    line.push(total)
                    console.log(pds)
                    pds.forEach(function(pd){
                        line.push(pd)
                    })
                    data.push(line)
                }
            })

        }
        let ws = XLSX.utils.aoa_to_sheet(data)
        XLSX.utils.book_append_sheet(wb, ws, "DCC")

        let turmasExternas = models.TurmaExterna.findAll(),
            pedidosExternos = models.PedidoExterno.findAll()

        Promise.all([turmasExternas, pedidosExternos]).then(function(result){
            let turmasExternas = [],
                pedidosExternos = []
            result[0].forEach(turma => turmasExternas.push(turma.dataValues))
            result[1].forEach(pedido => pedidosExternos.push(pedido.dataValues))

            turmasExternas = _.orderBy(_.orderBy(_.filter(turmasExternas, function(t) { return t.Disciplina !== null}), 'letra'), 'Disciplina')

            let dataExterna = []
            const header = ["S.", "Cod", "Disciplina", "C.", "Turma", "Horário", "Turno", "Sala", "Total", "35A", "65B", "76A", "65C"]
            dataExterna.push(header)
            for(let i=0; i < turmasExternas.length; i++) {
                let turma = turmasExternas[i]
                if (turma.periodo === 3)
                    continue
                let line = []
                let disciplina = disciplinas.find(function (disc, index, array) {
                    if (disc.id === turma.Disciplina)
                        return true
                    else
                        return false
                })
                line.push(turma.periodo)

                if (disciplina !== undefined) {
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
                for (let i = 0; i < 4; i++) {
                    let pedido = pedidosExternos.find(function (pd, index, array) {
                        if ((pd.Curso === i) && (pd.Turma === turma.id))
                            return true
                        else
                            return false
                    })
                    if (pedido) {
                        pds.push(pedido.vagasPeriodizadas + '/' + pedido.vagasNaoPeriodizadas)
                        total = total + pedido.vagasPeriodizadas + pedido.vagasNaoPeriodizadas
                    } else {
                        pds.push('')
                    }

                }

                line.push(total)
                pds.forEach(function (pd) {
                    line.push(pd)
                })
                data.push(line)
            }

            for(let i=0; i < turmasExternas.length; i++) {
                let turma = turmasExternas[i]
                if (turma.periodo === 1)
                    continue
                let line = []
                let disciplina = disciplinas.find(function (disc, index, array) {
                    if (disc.id === turma.Disciplina)
                        return true
                    else
                        return false
                })
                line.push(turma.periodo)

                if (disciplina !== undefined) {
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
                for (let i = 0; i < 4; i++) {
                    let pedido = pedidosExternos.find(function (pd, index, array) {
                        if ((pd.Curso === i) && (pd.Turma === turma.id))
                            return true
                        else
                            return false
                    })
                    if (pedido) {
                        pds.push(pedido.vagasPeriodizadas + '/' + pedido.vagasNaoPeriodizadas)
                        total = total + pedido.vagasPeriodizadas + pedido.vagasNaoPeriodizadas
                    } else {
                        pds.push('')
                    }

                }

                line.push(total)
                pds.forEach(function (pd) {
                    line.push(pd)
                })
                data.push(line)
            }
            let wsExterno = XLSX.utils.aoa_to_sheet(dataExterna)
            XLSX.utils.book_append_sheet(wb, wsExterno, "Externas")

        })
    })
    XLSX.writeFile(wb, 'tabelaPrincipal.xlsx')
    res.send({success:true})
})

router.get('/download', function(req, res, next){
    res.download('./tabelaPrincipal.xlsx', 'tabelas.xlsx')
})


module.exports = router