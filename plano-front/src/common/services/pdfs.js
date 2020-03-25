import _ from 'lodash'
import store from '../../vuex/store'

export default {

    checkTurmaLab (turma){
        let labs = _.filter(store.state.sala.Salas, ['laboratorio', true])
        let result = 0
        labs.forEach(lab => {
            if (lab.id === turma.Sala1)
                result += 1
            if (lab.id === turma.Sala2)
                result += 2
        })

        if(result === 1) {
            if (_.isNull(turma.Sala2)) {
                return 4
            }
        }
        return result

    },

    checkTurmaHorarioLabs (turma, horario, lab) {
        if(turma.Horario1==horario || turma.Horario2==horario) {
            let sala = this.checkTurmaLab(turma)
            switch(sala){
                case 0: return false
                    break
                case 1: if(turma.Horario1==horario)
                    return true
                else
                    return false
                    break
                case 2: if(turma.Horario2==horario)
                    return true
                else
                    return false
                    break
                case 3:
                    if (turma.Sala1 === lab){
                        if (turma.Horario1 == horario) return true;
                    }else if(turma.Sala2 === lab){
                        if (turma.Horario2 == horario) return true;
                    }
                    return false
                case 4: return true
                    break

            }
            return true
        }else
            return false
    },

    checkTurmaHorario (turma, horario) {
        if(turma.Horario1==horario || turma.Horario2==horario) {
            return true
        }else
            return false
    },

    pdfAlocacaoLabs() {
        var pdfMake = require('pdfmake/build/pdfmake.js')
        if (pdfMake.vfs == undefined){
            var pdfFonts = require('pdfmake/build/vfs_fonts.js')
            pdfMake.vfs = pdfFonts.pdfMake.vfs;
        }
        var tables = []
        var laboratorios = _.filter(store.state.sala.Salas, ['laboratorio', true])
        var disciplinas = _.orderBy(store.state.disciplina.Disciplinas, ['nome'])
        var turmas1 = _.filter(store.state.turma.Turmas, ['periodo', 1])
        var turmas2 = _.filter(store.state.turma.Turmas, ['periodo', 3])
        var seg = '', ter = '', qua = '', qui = '', sex = ''
        tables.push({text: "1º Semestre", bold:true, margin:[0, 10, 0, 10], fontSize:20})
        for(let i = 0; i < laboratorios.length; i++) {
            if(i % 3 === 0 && i !== 0){
                tables.push({text: laboratorios[i].nome, bold: true, margin: [0, 10, 0, 10], fontSize: 18, pageBreak:'before'})
            }else{
                tables.push({text: laboratorios[i].nome, bold: true, margin: [0, 10, 0, 10], fontSize: 18})
            }
            tables.push({
                table: {
                    widths: ['*', '*', '*', '*', '*', '*'],
                    headerRows: 1,
                    color: '#426',
                    body: [
                        [{text: 'Hora', alignment: 'center', bold: true}, {
                            text: 'Segunda',
                            alignment: 'center',
                            bold: true
                        }, {text: 'Terça', alignment: 'center', bold: true}, {
                            text: 'Quarta',
                            alignment: 'center',
                            bold: true
                        }, {text: 'Quinta', alignment: 'center', bold: true}, {
                            text: 'Sexta',
                            alignment: 'center',
                            bold: true
                        }],
                    ]
                }
            })
            for (var d = 0; d < 8; d++) {
                for (var j = 0; j < turmas1.length; j++) {
                    if (turmas1[j].Sala1 === laboratorios[i].id || turmas1[j].Sala2 === laboratorios[i].id) {
                        if (d < 4) {
                            if (this.checkTurmaHorarioLabs(turmas1[j], 1 + d, laboratorios[i].id)) {
                                for (var k = 0; k < disciplinas.length; k++) {
                                    if (turmas1[j].Disciplina === disciplinas[k].id) {
                                        if (seg !== '')
                                            seg = seg + ' '
                                        seg = seg + disciplinas[k].codigo + ' ' + turmas1[j].letra
                                    }
                                }
                            }
                            if (this.checkTurmaHorarioLabs(turmas1[j], 7 + d, laboratorios[i].id)) {
                                for (k = 0; k < disciplinas.length; k++) {
                                    if (turmas1[j].Disciplina === disciplinas[k].id) {
                                        if (ter != '')
                                            ter = ter + ' '
                                        ter = ter + disciplinas[k].codigo + ' ' + turmas1[j].letra
                                    }
                                }
                            }
                            if (this.checkTurmaHorarioLabs(turmas1[j], 13 + d, laboratorios[i].id)) {
                                for (k = 0; k < disciplinas.length; k++) {
                                    if (turmas1[j].Disciplina === disciplinas[k].id) {
                                        if (qua != '')
                                            qua = qua + ' '
                                        qua = qua + disciplinas[k].codigo + ' ' + turmas1[j].letra
                                    }
                                }
                            }
                            if (this.checkTurmaHorarioLabs(turmas1[j], 19 + d, laboratorios[i].id)) {
                                for (k = 0; k < disciplinas.length; k++) {
                                    if (turmas1[j].Disciplina === disciplinas[k].id) {
                                        if (qui != '')
                                            qui = qui + ' '
                                        qui = qui + disciplinas[k].codigo + ' ' + turmas1[j].letra
                                    }
                                }
                            }
                            if (this.checkTurmaHorarioLabs(turmas1[j], 25 + d, laboratorios[i].id)) {
                                for (k = 0; k < disciplinas.length; k++) {
                                    if (turmas1[j].Disciplina === disciplinas[k].id) {
                                        if (sex != '')
                                            sex = sex + ' '
                                        sex = sex + disciplinas[k].codigo + ' ' + turmas1[j].letra
                                    }
                                }
                            }
                        } else if (d === 4 || d === 5) {
                            if (this.checkTurmaHorarioLabs(turmas1[j], 28 + d, laboratorios[i].id)) {
                                for (var k = 0; k < disciplinas.length; k++) {
                                    if (turmas1[j].Disciplina === disciplinas[k].id) {
                                        if (seg !== '')
                                            seg = seg + ' '
                                        seg = seg + disciplinas[k].codigo + ' ' + turmas1[j].letra
                                    }
                                }
                            }
                            if (this.checkTurmaHorarioLabs(turmas1[j], 30 + d, laboratorios[i].id)) {
                                for (k = 0; k < disciplinas.length; k++) {
                                    if (turmas1[j].Disciplina === disciplinas[k].id) {
                                        if (ter != '')
                                            ter = ter + ' '
                                        ter = ter + disciplinas[k].codigo + ' ' + turmas1[j].letra
                                    }
                                }
                            }
                            if (this.checkTurmaHorarioLabs(turmas1[j], 32 + d, laboratorios[i].id)) {
                                for (k = 0; k < disciplinas.length; k++) {
                                    if (turmas1[j].Disciplina === disciplinas[k].id) {
                                        if (qua != '')
                                            qua = qua + ' '
                                        qua = qua + disciplinas[k].codigo + ' ' + turmas1[j].letra
                                    }
                                }
                            }
                            if (this.checkTurmaHorarioLabs(turmas1[j], 34 + d, laboratorios[i].id)) {
                                for (k = 0; k < disciplinas.length; k++) {
                                    if (turmas1[j].Disciplina === disciplinas[k].id) {
                                        if (qui != '')
                                            qui = qui + ' '
                                        qui = qui + disciplinas[k].codigo + ' ' + turmas1[j].letra
                                    }
                                }
                            }
                            if (this.checkTurmaHorarioLabs(turmas1[j], 36 + d, laboratorios[i].id)) {
                                for (k = 0; k < disciplinas.length; k++) {
                                    if (turmas1[j].Disciplina === disciplinas[k].id) {
                                        if (sex != '')
                                            sex = sex + ' '
                                        sex = sex + disciplinas[k].codigo + ' ' + turmas1[j].letra
                                    }
                                }
                            }
                        } else if (d > 5) {
                            if (this.checkTurmaHorarioLabs(turmas1[j], d - 1)) {
                                for (var k = 0; k < disciplinas.length; k++) {
                                    if (turmas1[j].Disciplina === disciplinas[k].id) {
                                        if (seg !== '')
                                            seg = seg + ' '
                                        seg = seg + disciplinas[k].codigo + ' ' + turmas1[j].letra
                                    }
                                }
                            }
                            if (this.checkTurmaHorarioLabs(turmas1[j], 5 + d, laboratorios[i].id)) {
                                for (k = 0; k < disciplinas.length; k++) {
                                    if (turmas1[j].Disciplina === disciplinas[k].id) {
                                        if (ter != '')
                                            ter = ter + ' '
                                        ter = ter + disciplinas[k].codigo + ' ' + turmas1[j].letra
                                    }
                                }
                            }
                            if (this.checkTurmaHorarioLabs(turmas1[j], 11 + d, laboratorios[i].id)) {
                                for (k = 0; k < disciplinas.length; k++) {
                                    if (turmas1[j].Disciplina === disciplinas[k].id) {
                                        if (qua != '')
                                            qua = qua + ' '
                                        qua = qua + disciplinas[k].codigo + ' ' + turmas1[j].letra
                                    }
                                }
                            }
                            if (this.checkTurmaHorarioLabs(turmas1[j], 17 + d, laboratorios[i].id)) {
                                for (k = 0; k < disciplinas.length; k++) {
                                    if (turmas1[j].Disciplina === disciplinas[k].id) {
                                        if (qui != '')
                                            qui = qui + ' '
                                        qui = qui + disciplinas[k].codigo + ' ' + turmas1[j].letra
                                    }
                                }
                            }
                            if (this.checkTurmaHorarioLabs(turmas1[j], 23 + d, laboratorios[i].id)) {
                                for (k = 0; k < disciplinas.length; k++) {
                                    if (turmas1[j].Disciplina === disciplinas[k].id) {
                                        if (sex != '')
                                            sex = sex + ' '
                                        sex = sex + disciplinas[k].codigo + ' ' + turmas1[j].letra
                                    }
                                }
                            }
                        }
                    }
                }
                switch (d) {
                    case 0:
                        tables[2 + 2 * i].table.body.push([{text: '08 - 10', alignment: 'center'}, {
                            text: seg,
                            alignment: 'center'
                        }, {text: ter, alignment: 'center'}, {text: qua, alignment: 'center'}, {
                            text: qui,
                            alignment: 'center'
                        }, {text: sex, alignment: 'center'}])
                        break
                    case 1:
                        tables[2 + 2 * i].table.body.push([{text: '10 - 12', alignment: 'center'}, {
                            text: seg,
                            alignment: 'center'
                        }, {text: ter, alignment: 'center'}, {text: qua, alignment: 'center'}, {
                            text: qui,
                            alignment: 'center'
                        }, {text: sex, alignment: 'center'}])
                        break
                    case 2:
                        tables[2 + 2 * i].table.body.push([{text: '14 - 16', alignment: 'center'}, {
                            text: seg,
                            alignment: 'center'
                        }, {text: ter, alignment: 'center'}, {text: qua, alignment: 'center'}, {
                            text: qui,
                            alignment: 'center'
                        }, {text: sex, alignment: 'center'}])
                        break
                    case 3:
                        tables[2 + 2 * i].table.body.push([{text: '16 - 18', alignment: 'center'}, {
                            text: seg,
                            alignment: 'center'
                        }, {text: ter, alignment: 'center'}, {text: qua, alignment: 'center'}, {
                            text: qui,
                            alignment: 'center'
                        }, {text: sex, alignment: 'center'}])
                        break
                    case 4:
                        tables[2 + 2 * i].table.body.push([{text: '17 - 19', alignment: 'center'}, {
                            text: seg,
                            alignment: 'center'
                        }, {text: ter, alignment: 'center'}, {text: qua, alignment: 'center'}, {
                            text: qui,
                            alignment: 'center'
                        }, {text: sex, alignment: 'center'}])
                        break
                    case 5:
                        tables[2 + 2 * i].table.body.push([{text: '18 - 20', alignment: 'center'}, {
                            text: seg,
                            alignment: 'center'
                        }, {text: ter, alignment: 'center'}, {text: qua, alignment: 'center'}, {
                            text: qui,
                            alignment: 'center'
                        }, {text: sex, alignment: 'center'}])
                        break
                    case 6:
                        tables[2 + 2 * i].table.body.push([{text: '19 - 21', alignment: 'center'}, {
                            text: seg,
                            alignment: 'center'
                        }, {text: ter, alignment: 'center'}, {text: qua, alignment: 'center'}, {
                            text: qui,
                            alignment: 'center'
                        }, {text: sex, alignment: 'center'}])
                        break
                    case 7:
                        tables[2 + 2 * i].table.body.push([{text: '21 - 23', alignment: 'center'}, {
                            text: seg,
                            alignment: 'center'
                        }, {text: ter, alignment: 'center'}, {text: qua, alignment: 'center'}, {
                            text: qui,
                            alignment: 'center'
                        }, {text: sex, alignment: 'center'}])
                        break
                }
                seg = ter = qua = qui = sex = ''
            }
        }
        console.log("ok2")
        tables.push({text: "2º Semestre", bold:true, margin:[0, 10, 0, 10], fontSize:20, pageBreak:'before'})
        for(let i = 0; i < laboratorios.length; i++){
            if(i % 3 === 0 && i !== 0){
                tables.push({text: laboratorios[i].nome, bold: true, margin: [0, 10, 0, 10], fontSize: 18, pageBreak:'before'})
            }else{
                tables.push({text: laboratorios[i].nome, bold: true, margin: [0, 10, 0, 10], fontSize: 18})
            }
            tables.push({
                table: {
                    widths: ['*', '*', '*', '*', '*', '*'],
                    headerRows:1,
                    color: '#426',
                    body: [
                        [{text:'Hora', alignment:'center', bold:true}, {text:'Segunda', alignment:'center', bold:true}, {text:'Terça', alignment:'center', bold:true}, {text:'Quarta', alignment: 'center', bold:true}, {text:'Quinta', alignment:'center', bold:true}, {text:'Sexta', alignment:'center', bold:true}],
                    ]
                }
            })
            for(var d = 0; d< 8; d++) {
                for (var j = 0; j < turmas2.length; j++) {
                    if(turmas2[j].Sala1===laboratorios[i].id || turmas2[j].Sala2===laboratorios[i].id){
                        if(d < 4) {
                            if (this.checkTurmaHorarioLabs(turmas2[j], 1 + d, laboratorios[i].id)) {
                                for (var k = 0; k < disciplinas.length; k++) {
                                    if (turmas2[j].Disciplina === disciplinas[k].id) {
                                        if (seg !== '')
                                            seg = seg + ' '
                                        seg = seg + disciplinas[k].codigo + ' ' + turmas2[j].letra
                                    }
                                }
                            }
                            if (this.checkTurmaHorarioLabs(turmas2[j], 7 + d, laboratorios[i].id)) {
                                for (k = 0; k < disciplinas.length; k++) {
                                    if (turmas2[j].Disciplina === disciplinas[k].id) {
                                        if (ter != '')
                                            ter = ter + ' '
                                        ter = ter + disciplinas[k].codigo + ' ' + turmas2[j].letra
                                    }
                                }
                            }
                            if (this.checkTurmaHorarioLabs(turmas2[j], 13 + d, laboratorios[i].id)) {
                                for (k = 0; k < disciplinas.length; k++) {
                                    if (turmas2[j].Disciplina === disciplinas[k].id) {
                                        if (qua != '')
                                            qua = qua + ' '
                                        qua = qua + disciplinas[k].codigo + ' ' + turmas2[j].letra
                                    }
                                }
                            }
                            if (this.checkTurmaHorarioLabs(turmas2[j], 19 + d, laboratorios[i].id)) {
                                for (k = 0; k < disciplinas.length; k++) {
                                    if (turmas2[j].Disciplina === disciplinas[k].id) {
                                        if (qui != '')
                                            qui = qui + ' '
                                        qui = qui + disciplinas[k].codigo + ' ' + turmas2[j].letra
                                    }
                                }
                            }
                            if (this.checkTurmaHorarioLabs(turmas2[j], 25 + d, laboratorios[i].id)) {
                                for (k = 0; k < disciplinas.length; k++) {
                                    if (turmas2[j].Disciplina === disciplinas[k].id) {
                                        if (sex != '')
                                            sex = sex + ' '
                                        sex = sex + disciplinas[k].codigo + ' ' + turmas2[j].letra
                                    }
                                }
                            }
                        } else if(d === 4 || d === 5) {
                            if (this.checkTurmaHorarioLabs(turmas2[j], 28 + d, laboratorios[i].id)) {
                                for (var k = 0; k < disciplinas.length; k++) {
                                    if (turmas2[j].Disciplina === disciplinas[k].id) {
                                        if (seg !== '')
                                            seg = seg + ' '
                                        seg = seg + disciplinas[k].codigo + ' ' + turmas2[j].letra
                                    }
                                }
                            }
                            if (this.checkTurmaHorarioLabs(turmas2[j], 30 + d, laboratorios[i].id)) {
                                for (k = 0; k < disciplinas.length; k++) {
                                    if (turmas2[j].Disciplina === disciplinas[k].id) {
                                        if (ter != '')
                                            ter = ter + ' '
                                        ter = ter + disciplinas[k].codigo + ' ' + turmas2[j].letra
                                    }
                                }
                            }
                            if (this.checkTurmaHorarioLabs(turmas2[j], 32 + d, laboratorios[i].id)) {
                                for (k = 0; k < disciplinas.length; k++) {
                                    if (turmas2[j].Disciplina === disciplinas[k].id) {
                                        if (qua != '')
                                            qua = qua + ' '
                                        qua = qua + disciplinas[k].codigo + ' ' + turmas2[j].letra
                                    }
                                }
                            }
                            if (this.checkTurmaHorarioLabs(turmas2[j], 34 + d, laboratorios[i].id)) {
                                for (k = 0; k < disciplinas.length; k++) {
                                    if (turmas2[j].Disciplina === disciplinas[k].id) {
                                        if (qui != '')
                                            qui = qui + ' '
                                        qui = qui + disciplinas[k].codigo + ' ' + turmas2[j].letra
                                    }
                                }
                            }
                            if (this.checkTurmaHorarioLabs(turmas2[j], 36 + d, laboratorios[i].id)) {
                                for (k = 0; k < disciplinas.length; k++) {
                                    if (turmas2[j].Disciplina === disciplinas[k].id) {
                                        if (sex != '')
                                            sex = sex + ' '
                                        sex = sex + disciplinas[k].codigo + ' ' + turmas2[j].letra
                                    }
                                }
                            }
                        } else if(d > 5) {
                            if (this.checkTurmaHorarioLabs(turmas2[j], d - 1)) {
                                for (var k = 0; k < disciplinas.length; k++) {
                                    if (turmas2[j].Disciplina === disciplinas[k].id) {
                                        if (seg !== '')
                                            seg = seg + ' '
                                        seg = seg + disciplinas[k].codigo + ' ' + turmas2[j].letra
                                    }
                                }
                            }
                            if (this.checkTurmaHorarioLabs(turmas2[j], 5 + d, laboratorios[i].id)) {
                                for (k = 0; k < disciplinas.length; k++) {
                                    if (turmas2[j].Disciplina === disciplinas[k].id) {
                                        if (ter != '')
                                            ter = ter + ' '
                                        ter = ter + disciplinas[k].codigo + ' ' + turmas2[j].letra
                                    }
                                }
                            }
                            if (this.checkTurmaHorarioLabs(turmas2[j], 11 + d, laboratorios[i].id)) {
                                for (k = 0; k < disciplinas.length; k++) {
                                    if (turmas2[j].Disciplina === disciplinas[k].id) {
                                        if (qua != '')
                                            qua = qua + ' '
                                        qua = qua + disciplinas[k].codigo + ' ' + turmas2[j].letra
                                    }
                                }
                            }
                            if (this.checkTurmaHorarioLabs(turmas2[j], 17 + d, laboratorios[i].id)) {
                                for (k = 0; k < disciplinas.length; k++) {
                                    if (turmas2[j].Disciplina === disciplinas[k].id) {
                                        if (qui != '')
                                            qui = qui + ' '
                                        qui = qui + disciplinas[k].codigo + ' ' + turmas2[j].letra
                                    }
                                }
                            }
                            if (this.checkTurmaHorarioLabs(turmas2[j], 23 + d, laboratorios[i].id)) {
                                for (k = 0; k < disciplinas.length; k++) {
                                    if (turmas2[j].Disciplina === disciplinas[k].id) {
                                        if (sex != '')
                                            sex = sex + ' '
                                        sex = sex + disciplinas[k].codigo + ' ' + turmas2[j].letra
                                    }
                                }
                            }
                        }
                    }
                }
                switch(d){
                    case 0: tables[3 + (2 * laboratorios.length)+ 2 * i].table.body.push([{text:'08 - 10', alignment:'center'}, {text: seg, alignment:'center'}, {text: ter, alignment:'center'}, {text: qua, alignment:'center'}, {text: qui, alignment:'center'}, {text: sex, alignment:'center'}])
                        break
                    case 1: tables[3 + (2 * laboratorios.length)+ 2 * i].table.body.push([{text:'10 - 12', alignment:'center'}, {text: seg, alignment:'center'}, {text: ter, alignment:'center'}, {text: qua, alignment:'center'}, {text: qui, alignment:'center'}, {text: sex, alignment:'center'}])
                        break
                    case 2: tables[3 + (2 * laboratorios.length)+ 2 * i].table.body.push([{text:'14 - 16', alignment:'center'}, {text: seg, alignment:'center'}, {text: ter, alignment:'center'}, {text: qua, alignment:'center'}, {text: qui, alignment:'center'}, {text: sex, alignment:'center'}])
                        break
                    case 3: tables[3 + (2 * laboratorios.length)+ 2 * i].table.body.push([{text:'16 - 18', alignment:'center'}, {text: seg, alignment:'center'}, {text: ter, alignment:'center'}, {text: qua, alignment:'center'}, {text: qui, alignment:'center'}, {text: sex, alignment:'center'}])
                        break
                    case 4: tables[3 + (2 * laboratorios.length)+ 2 * i].table.body.push([{text:'17 - 19', alignment:'center'}, {text: seg, alignment:'center'}, {text: ter, alignment:'center'}, {text: qua, alignment:'center'}, {text: qui, alignment:'center'}, {text: sex, alignment:'center'}])
                        break
                    case 5: tables[3 + (2 * laboratorios.length)+ 2 * i].table.body.push([{text:'18 - 20', alignment:'center'}, {text: seg, alignment:'center'}, {text: ter, alignment:'center'}, {text: qua, alignment:'center'}, {text: qui, alignment:'center'}, {text: sex, alignment:'center'}])
                        break
                    case 6: tables[3 + (2 * laboratorios.length)+ 2 * i].table.body.push([{text:'19 - 21', alignment:'center'}, {text: seg, alignment:'center'}, {text: ter, alignment:'center'}, {text: qua, alignment:'center'}, {text: qui, alignment:'center'}, {text: sex, alignment:'center'}])
                        break
                    case 7: tables[3 + (2 * laboratorios.length)+ 2 * i].table.body.push([{text:'21 - 23', alignment:'center'}, {text: seg, alignment:'center'}, {text: ter, alignment:'center'}, {text: qua, alignment:'center'}, {text: qui, alignment:'center'}, {text: sex, alignment:'center'}])
                        break
                }
                seg = ter = qua = qui = sex = ''
            }

        }
        console.log(tables)
        var docDefinition = {
            content: tables,
            header: {text:new Date(Date.now()).toLocaleString(), margin:[40, 20, 0, 0], fontSize:10}
        }
        pdfMake.createPdf(docDefinition).open()
    },

    turmas(professor){
        return _.orderBy(_.filter(store.state.turma.Turmas,(turma) => {
            return (turma.Docente1===professor.id || turma.Docente2===professor.id)
        }), ['periodo', 'Disciplina', 'letra'])
    },

    turmasSemAlocacao() {
        return _.orderBy(
            _.filter(store.state.turma.Turmas, turma => {
                return (
                    turma.Docente1 == null && turma.Docente2 == null && turma.Disciplina != null
                );
            }),
            ['periodo', 'Disciplina', 'letra']
        );
    },

    pos(professor){
        return _.orderBy(_.filter(store.state.cargaPos.Cargas,(turma) => {
            return (turma.Docente===professor.id)
        }), 'trimestre')
    },

    creditos1(professor){
        var c = 0
        for (var t = 0; t < store.state.turma.Turmas.length; t++){
            if(store.state.turma.Turmas[t].periodo===1 && (store.state.turma.Turmas[t].Docente1===professor.id || store.state.turma.Turmas[t].Docente2===professor.id)){
                for (var d = 0; d < store.state.disciplina.Disciplinas.length; d++){
                    if(store.state.disciplina.Disciplinas[d].id===store.state.turma.Turmas[t].Disciplina){
                        if((store.state.turma.Turmas[t].Docente1 > 0) && (store.state.turma.Turmas[t].Docente2 > 0)) {
                            c += (parseFloat(store.state.disciplina.Disciplinas[d].cargaPratica) / 2)
                            c += (parseFloat(store.state.disciplina.Disciplinas[d].cargaTeorica) / 2)
                        }else{
                            c += parseFloat(store.state.disciplina.Disciplinas[d].cargaPratica)
                            c += parseFloat(store.state.disciplina.Disciplinas[d].cargaTeorica)
                        }
                    }
                }
            }

        }
        for(var t = 0; t < store.state.cargaPos.Cargas.length; t++){
            if(store.state.cargaPos.Cargas[t].Docente===professor.id){
                if(store.state.cargaPos.Cargas[t].trimestre==1 || store.state.cargaPos.Cargas[t].trimestre==2){
                    c+= parseFloat(store.state.cargaPos.Cargas[t].creditos)
                }
            }
        }
        return c
    },

    creditos2(professor){
        var c = 0
        for (var t = 0; t < store.state.turma.Turmas.length; t++){
            if(store.state.turma.Turmas[t].periodo===3 && (store.state.turma.Turmas[t].Docente1===professor.id || store.state.turma.Turmas[t].Docente2===professor.id)){
                for (var d = 0; d < store.state.disciplina.Disciplinas.length; d++){
                    if(store.state.disciplina.Disciplinas[d].id===store.state.turma.Turmas[t].Disciplina){
                        if((store.state.turma.Turmas[t].Docente1 > 0) && (store.state.turma.Turmas[t].Docente2 > 0)) {
                            c += (parseFloat(store.state.disciplina.Disciplinas[d].cargaPratica) / 2)
                            c += (parseFloat(store.state.disciplina.Disciplinas[d].cargaTeorica) / 2)
                        }else{
                            c += parseFloat(store.state.disciplina.Disciplinas[d].cargaPratica)
                            c += parseFloat(store.state.disciplina.Disciplinas[d].cargaTeorica)
                        }
                    }
                }
            }

        }
        for(var t = 0; t < store.state.cargaPos.Cargas.length; t++){
            if(store.state.cargaPos.Cargas[t].Docente===professor.id){
                if(store.state.cargaPos.Cargas[t].trimestre==3){
                    c+= parseFloat(store.state.cargaPos.Cargas[t].creditos)
                }
            }
        }
        return c
    },

    pdfCargaProfessores() {

        var pdfMake = require('pdfmake/build/pdfmake.js')
        if (pdfMake.vfs == undefined){
            var pdfFonts = require('pdfmake/build/vfs_fonts.js')
            pdfMake.vfs = pdfFonts.pdfMake.vfs;
        }
        var tables = []
        var professores = _.orderBy(_.filter(store.state.docente.Docentes, ['ativo', true]), 'apelido')
        var turmasProf
        var posProf
        var vazio = 0
        for(var i = 0; i < professores.length; i++){
            turmasProf = this.turmas(professores[i])
            posProf = this.pos(professores[i])
            if(turmasProf.length === 0 && posProf.length === 0){
                vazio = vazio + 1
            }else {
                var cargatotal = 0
                tables.push({
                    columns: [{
                        text: professores[i].apelido,
                        bold: true
                    }, {
                        text: 'C1:' + this.creditos1(professores[i]) + '|C2:' + this.creditos2(professores[i]),
                        alignment: 'right',
                        bold:true
                    }], margin: [0, 10, 0, 10]
                })
                tables.push({
                    style: 'tableExample',
                    table: {
                        widths: [8, 68, '*', 18, 104, 24, 24],
                        headerRows: 1,
                        color: '#426',
                        body: [
                            [{text: 'S', bold: true}, {
                                text: 'Disciplina',
                                colSpan: 2,
                                bold: true
                            }, '', {text: 'T', alignment: 'center', bold: true}, {
                                text: 'Horário',
                                alignment: 'center',
                                bold: true
                            }, {text: 'C1', bold: true}, {text: 'C2', bold: true}],
                        ]
                    }
                })
                for (var j = 0; j < turmasProf.length; j++) {
                    var disciplina = undefined
                    var horario1 = undefined
                    var horario2 = undefined
                    var c1 = 0
                    var c2 = 0
                    for (var k = 0; k < store.state.disciplina.Disciplinas.length; k++) {
                        if (turmasProf[j].Disciplina === store.state.disciplina.Disciplinas[k].id) {
                            disciplina = store.state.disciplina.Disciplinas[k]
                        }
                    }
                    for (var l = 0; l < store.state.horario.Horarios.length; l++) {
                        if (turmasProf[j].Horario1 === store.state.horario.Horarios[l].id) {
                            horario1 = store.state.horario.Horarios[l]
                        }
                    }

                    for (var m = 0; m < store.state.horario.Horarios.length; m++) {
                        if (turmasProf[j].Horario2 === store.state.horario.Horarios[m].id) {
                            horario2 = store.state.horario.Horarios[m]
                        }
                    }
                    if(horario1===undefined && horario2===undefined){
                        horarioTotal = ''
                    }else if (horario2 === undefined) {
                        var horarioTotal = horario1.horario
                    } else if (horario1 === undefined) {
                        var horarioTotal = horario2.horario
                    }else{
                        var horarioTotal = horario1.horario + '/' + horario2.horario
                    }
                    if (turmasProf[j].periodo == 1) {
                        if((turmasProf[j].Docente1 > 0) && (turmasProf[j].Docente2 > 0))
                            c1 = (disciplina.cargaTeorica + disciplina.cargaPratica)/2
                        else
                            c1 = disciplina.cargaTeorica + disciplina.cargaPratica
                    } else {
                        if((turmasProf[j].Docente1 > 0) && (turmasProf[j].Docente2 > 0))
                            c2 = (disciplina.cargaTeorica + disciplina.cargaPratica)/2
                        else
                            c2 = disciplina.cargaTeorica + disciplina.cargaPratica
                    }
                    tables[1 + 2 * (i - vazio)].table.body.push([{text:turmasProf[j].periodo, alignment: 'center'}, {
                        text: disciplina.codigo,
                        alignment: 'center'
                    }, disciplina.nome, {text: turmasProf[j].letra, alignment: 'center'}, {
                        text: horarioTotal,
                        alignment: 'center'
                    }, {text:c1, alignment: 'center'}, {text:c2, alignment: 'center'}])
                }
                for (var n = 0; n < posProf.length; n++) {
                    var c1 = 0
                    var c2 = 0
                    if (posProf[n].trimestre === 1 || posProf[n].trimestre === 2) {
                        c1 = posProf[n].creditos
                    } else {
                        c2 = posProf[n].creditos
                    }
                    tables[1 + 2 * (i - vazio)].table.body.push([{text:posProf[n].trimestre, alignment: 'center'}, {
                        text: 'Disciplina do ' + posProf[n].programa,
                        colSpan: 2
                    }, '', '', '', {text:c1, alignment: 'center'}, {text:c2, alignment: 'center'}])
                }
            }
        }
        let turmasSemAlocacao = this.turmasSemAlocacao()
        if(turmasSemAlocacao.length > 0){
            tables.push({
                columns: [{
                    text: "SEM ALOCAÇÃO",
                    bold: true
                }], margin: [0, 10, 0, 10]
            })
            tables.push({
                style: 'tableExample',
                table: {
                    widths: [8, 68, '*', 18, 104, 24, 24],
                    headerRows: 1,
                    color: '#426',
                    body: [
                        [{text: 'S', bold: true}, {
                            text: 'Disciplina',
                            colSpan: 2,
                            bold: true
                        }, '', {text: 'T', alignment: 'center', bold: true}, {
                            text: 'Horário',
                            alignment: 'center',
                            bold: true
                        }, {text: 'C1', bold: true}, {text: 'C2', bold: true}],
                    ]
                }
            })
            for (var j = 0; j < turmasSemAlocacao.length; j++) {
                var disciplina = undefined
                var horario1 = undefined
                var horario2 = undefined
                var c1 = 0
                var c2 = 0
                for (var k = 0; k < store.state.disciplina.Disciplinas.length; k++) {
                    if (turmasSemAlocacao[j].Disciplina === store.state.disciplina.Disciplinas[k].id) {
                        disciplina = store.state.disciplina.Disciplinas[k]
                    }
                }
                for (var l = 0; l < store.state.horario.Horarios.length; l++) {
                    if (turmasSemAlocacao[j].Horario1 === store.state.horario.Horarios[l].id) {
                        horario1 = store.state.horario.Horarios[l]
                    }
                }

                for (var m = 0; m < store.state.horario.Horarios.length; m++) {
                    if (turmasSemAlocacao[j].Horario2 === store.state.horario.Horarios[m].id) {
                        horario2 = store.state.horario.Horarios[m]
                    }
                }
                if(horario1===undefined && horario2===undefined){
                    horarioTotal = ''
                }else if (horario2 === undefined) {
                    var horarioTotal = horario1.horario
                } else if (horario1 === undefined) {
                    var horarioTotal = horario2.horario
                }else{
                    var horarioTotal = horario1.horario + '/' + horario2.horario
                }
                if (turmasSemAlocacao[j].periodo == 1) {
                    if((turmasSemAlocacao[j].Docente1 > 0) && (turmasSemAlocacao[j].Docente2 > 0))
                        c1 = (disciplina.cargaTeorica + disciplina.cargaPratica)/2
                    else
                        c1 = disciplina.cargaTeorica + disciplina.cargaPratica
                } else {
                    if((turmasSemAlocacao[j].Docente1 > 0) && (turmasSemAlocacao[j].Docente2 > 0))
                        c2 = (disciplina.cargaTeorica + disciplina.cargaPratica)/2
                    else
                        c2 = disciplina.cargaTeorica + disciplina.cargaPratica
                }
                tables[1 + 2 * (i - vazio)].table.body.push([{text:turmasSemAlocacao[j].periodo, alignment: 'center'}, {
                    text: disciplina.codigo,
                    alignment: 'center'
                }, disciplina.nome, {text: turmasSemAlocacao[j].letra, alignment: 'center'}, {
                    text: horarioTotal,
                    alignment: 'center'
                }, {text:c1, alignment: 'center'}, {text:c2, alignment: 'center'}])
            }
        }

        var docDefinition = {
            content: tables,
            header: {text:new Date(Date.now()).toLocaleString(), margin:[40, 20, 0, 0], fontSize:10}
        }
        pdfMake.createPdf(docDefinition).open()
    },

    turmasRelatorioDisciplinas(disciplina, semestre) {
        return _.orderBy(
            _.filter(store.state.turma.Turmas, turma => {
                return (
                    (turma.Disciplina === disciplina.id) && (semestre === 1 ? (turma.periodo === 1 || turma.periodo === 2) : (turma.periodo === 3 || turma.periodo === 4))
                );
            }),
            ['periodo', 'letra']
        );
    },

    docentesRelatorioDisciplina(turma) {
        let d1 = _.find(store.state.docente.Docentes, {'id':turma.Docente1})
        let d2 = _.find(store.state.docente.Docentes, {'id':turma.Docente2})
        if(d1 === undefined && d2 === undefined){
            return ''
        }else if(d2 === undefined){
            return `${d1.apelido}`
        }else if(d1 === undefined){
            return `${d2.apelido}`
        }else {
            return `${d1.apelido} / ${d2.apelido}`
        }
    },

    vagasTurma(turma, semestre){
        if((semestre === 1 && (turma.periodo == 3 || turma.periodo == 4)) || (semestre === 2 && (turma.periodo == 1 || turma.periodo == 2)))
            return 0
        let pedidos = store.state.pedido.Pedidos[turma.id]
        let vagasP = 0
        let vagasNP = 0
        pedidos.forEach(p => {
            vagasP += p.vagasPeriodizadas
            vagasNP += p.vagasNaoPeriodizadas
        })
        return vagasP + vagasNP
    },

    vagasDisciplina(disciplina, semestre){
        let turmas = _.filter(store.state.turma.Turmas, {'Disciplina' : disciplina.id})
        let vagas = 0
        turmas.forEach(t => {
            vagas += this.vagasTurma(t, semestre)
        })
        return vagas
    },

    perfilDisciplina(disciplina){
        let perfil = _.find(store.state.perfil.Perfis, {'id': disciplina.Perfil})
        return perfil.abreviacao
    },

    curso(pedido){
        return _.find(store.state.curso.Cursos, { id: pedido.Curso });
    },

    pedidosTurma(turma){
        return _.sortBy(_.filter(
            store.state.pedido.Pedidos[turma.id],
            function(p) {
                return p.vagasPeriodizadas > 0 || p.vagasNaoPeriodizadas > 0;
            }
        ), (p) => {
            return this.curso(p).codigo
        });
    },

    pdfRelatorioDisciplinas() {
        var pdfMake = require('pdfmake/build/pdfmake.js')
        if (pdfMake.vfs == undefined){
            var pdfFonts = require('pdfmake/build/vfs_fonts.js')
            pdfMake.vfs = pdfFonts.pdfMake.vfs;
        }
        let tables = []
        let disciplinas = _.orderBy(store.state.disciplina.Disciplinas, 'codigo')
        let turmasDisc = undefined
        tables.push({
            text: 'Relação de turmas oferecidas pelo Departamento de Ciência da Computação', alignment: 'center', bold:true, fontSize: 10
        })
        tables.push({
            text: '1º Semestre - ' + store.state.plano.Plano[0].ano, alignment: 'center', bold:true, fontSize: 10, margin: [0, 0, 0, 5]
        })
        for(let i = 0; i < disciplinas.length; i++){
            turmasDisc = this.turmasRelatorioDisciplinas(disciplinas[i], 1)
            if(turmasDisc.length > 0){
                tables.push({
                    style: 'tableExample',
                    table: {
                        widths: [60, '*', 72],
                        headerRows: 1,
                        color: '#426',
                        body: [
                            [{text: disciplinas[i].codigo, alignment: 'left', bold: true, fontSize: 9},
                             {text: disciplinas[i].nome, alignment: 'left', bold: true, fontSize: 9},
                             {text: this.perfilDisciplina(disciplinas[i]), alignment: 'center', bold: true, fontSize: 9}]
                        ]
                    },

                    layout: {
                        vLineWidth: function () { return 0 }
                    }
                })

                for(let j = 0; j < turmasDisc.length; j++){
                    let docentes = this.docentesRelatorioDisciplina(turmasDisc[j])
                    let horario1 = _.find(store.state.horario.Horarios, {'id': turmasDisc[j].Horario1})
                    let horario2 = _.find(store.state.horario.Horarios, {'id': turmasDisc[j].Horario2})
                    let horarioTotal = undefined
                    if(horario1===undefined && horario2===undefined){
                        horarioTotal = ''
                    }else if (horario2 === undefined) {
                        horarioTotal = horario1.horario
                    } else if (horario1 === undefined) {
                        horarioTotal = horario2.horario
                    }else{
                        horarioTotal = horario1.horario + '/' + horario2.horario
                    }

                    tables.push({
                        style: 'tableExample',
                        table: {
                            widths: [16, '*', 110, 65, ],
                            headerRows: 1,
                            color: '#426',
                            body: [
                                [
                                    {text: 'T: ' + turmasDisc[j].letra, alignment: 'center', fontSize: 8},
                                    {text: 'Docentes: ' + docentes, alignment: 'left', fontSize: 8},
                                    {text: 'Horário: ' + horarioTotal, alignment: 'left', fontSize: 8},
                                    {text: 'Vagas: ' + this.vagasTurma(turmasDisc[j], 1), alignment: 'left', fontSize: 8}]
                            ]
                        },
                        layout: {
                            hLineWidth: function (i) { return (i === 0 ? (j === 0 ? 0 : 0.5) : 0) },
                            vLineWidth: function () { return 0 }
                        }
                    })
                    let pedidosTurma = this.pedidosTurma(turmasDisc[j])
                    console.log(pedidosTurma)
                    if(pedidosTurma.length > 0){
                        let tabelaCursosBody = [
                            [
                                {text: ''},
                                {text: 'Curso', alignment: 'center', bold: 'true', fontSize: 8},
                                {text: 'Grade', alignment: 'center', bold: 'true', fontSize: 8},
                                {text: 'Extra', alignment: 'center', bold: 'true', fontSize: 8},
                                {text: 'Total', alignment: 'center', bold: 'true', fontSize: 8},
                            ]
                        ]
                        for(let k = 0; k < pedidosTurma.length; k++){
                            tabelaCursosBody.push([
                                {text: ''},
                                {text: this.curso(pedidosTurma[k]).codigo + ' - ' + this.curso(pedidosTurma[k]).nome, alignment: 'left', fontSize: 8},
                                {text: pedidosTurma[k].vagasPeriodizadas, alignment: 'center', fontSize: 8},
                                {text: pedidosTurma[k].vagasNaoPeriodizadas, alignment: 'center', fontSize: 8},
                                {text: pedidosTurma[k].vagasPeriodizadas + pedidosTurma[k].vagasNaoPeriodizadas, alignment: 'center', fontSize: 8},
                            ])
                        }
                        tables.push({
                            style: 'tableExample',
                            table: {
                                widths: [10, '*', 24, 24, 24],
                                headerRows: 1,
                                color: '#426',
                                body: tabelaCursosBody
                            },
                            layout: {
                                hLineWidth: function () { return 0 },
                                vLineWidth: function () { return 0 }
                            }
                        })
                    }
                }
            }
        }
        tables.push({
            text: 'Relação de turmas oferecidas pelo Departamento de Ciência da Computação', alignment: 'center', bold:true, fontSize: 10, pageBreak:'before'
        })
        tables.push({
            text: '2º Semestre - ' + store.state.plano.Plano[0].ano, alignment: 'center', bold:true, fontSize: 10, margin: [0, 0, 0, 5]
        })
        for(let i = 0; i < disciplinas.length; i++){
            turmasDisc = this.turmasRelatorioDisciplinas(disciplinas[i], 2)
            if(turmasDisc.length > 0){
                tables.push({
                    style: 'tableExample',
                    table: {
                        widths: [60, '*', 72],
                        headerRows: 1,
                        color: '#426',
                        body: [
                            [{text: disciplinas[i].codigo, alignment: 'left', bold: true, fontSize: 9},
                                {text: disciplinas[i].nome, alignment: 'left', bold: true, fontSize: 9},
                                {text: this.perfilDisciplina(disciplinas[i]), alignment: 'center', bold: true, fontSize: 9}]
                        ]
                    },

                    layout: {
                        vLineWidth: function () { return 0 }
                    }
                })

                for(let j = 0; j < turmasDisc.length; j++){
                    let docentes = this.docentesRelatorioDisciplina(turmasDisc[j])
                    let horario1 = _.find(store.state.horario.Horarios, {'id': turmasDisc[j].Horario1})
                    let horario2 = _.find(store.state.horario.Horarios, {'id': turmasDisc[j].Horario2})
                    let horarioTotal = undefined
                    if(horario1===undefined && horario2===undefined){
                        horarioTotal = ''
                    }else if (horario2 === undefined) {
                        horarioTotal = horario1.horario
                    } else if (horario1 === undefined) {
                        horarioTotal = horario2.horario
                    }else{
                        horarioTotal = horario1.horario + '/' + horario2.horario
                    }

                    tables.push({
                        style: 'tableExample',
                        table: {
                            widths: [16, '*', 110, 65, ],
                            headerRows: 1,
                            color: '#426',
                            body: [
                                [
                                    {text: 'T: ' + turmasDisc[j].letra, alignment: 'center', fontSize: 8},
                                    {text: 'Docentes: ' + docentes, alignment: 'left', fontSize: 8},
                                    {text: 'Horário: ' + horarioTotal, alignment: 'left', fontSize: 8},
                                    {text: 'Vagas: ' + this.vagasTurma(turmasDisc[j], 2), alignment: 'left', fontSize: 8}]
                            ]
                        },
                        layout: {
                            hLineWidth: function (i) { return (i === 0 ? (j === 0 ? 0 : 0.5) : 0) },
                            vLineWidth: function () { return 0 }
                        }
                    })
                    let pedidosTurma = this.pedidosTurma(turmasDisc[j])
                    console.log(pedidosTurma)
                    if(pedidosTurma.length > 0){
                        let tabelaCursosBody = [
                            [
                                {text: ''},
                                {text: 'Curso', alignment: 'center', bold: 'true', fontSize: 8},
                                {text: 'Grade', alignment: 'center', bold: 'true', fontSize: 8},
                                {text: 'Extra', alignment: 'center', bold: 'true', fontSize: 8},
                                {text: 'Total', alignment: 'center', bold: 'true', fontSize: 8},
                            ]
                        ]
                        for(let k = 0; k < pedidosTurma.length; k++){
                            tabelaCursosBody.push([
                                {text: ''},
                                {text: this.curso(pedidosTurma[k]).codigo + ' - ' + this.curso(pedidosTurma[k]).nome, alignment: 'left', fontSize: 8},
                                {text: pedidosTurma[k].vagasPeriodizadas, alignment: 'center', fontSize: 8},
                                {text: pedidosTurma[k].vagasNaoPeriodizadas, alignment: 'center', fontSize: 8},
                                {text: pedidosTurma[k].vagasPeriodizadas + pedidosTurma[k].vagasNaoPeriodizadas, alignment: 'center', fontSize: 8},
                            ])
                        }
                        tables.push({
                            style: 'tableExample',
                            table: {
                                widths: [10, '*', 24, 24, 24],
                                headerRows: 1,
                                color: '#426',
                                body: tabelaCursosBody
                            },
                            layout: {
                                hLineWidth: function () { return 0 },
                                vLineWidth: function () { return 0 }
                            }
                        })
                    }
                }
            }
        }

        var docDefinition = {
            content: tables,
            footer: function(currentPage, pageCount) {
                return { columns: [
                    { text:new Date(Date.now()).toLocaleString(), margin:[30, 10, 0, 0], fontSize:8, alignment: `left` },
                    { text: currentPage.toString() + ' de ' + pageCount, alignment: 'right', margin:[0, 10, 30, 0], fontSize:8 }
                    ] }
            }
        }
        pdfMake.createPdf(docDefinition).open()
    }

}