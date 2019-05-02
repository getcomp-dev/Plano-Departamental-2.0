import _ from 'lodash'
import store from '../../vuex/store'

export default {
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
        var disciplinas = store.state.disciplina.Disciplinas
        var turmas = store.state.turma.Turmas
        var seg = '', ter = '', qua = '', qui = '', sex = ''
        for(var i = 0; i < laboratorios.length; i++){
            tables.push({text: laboratorios[i].nome, bold:true, margin:[0, 10, 0, 10], fontSize:20})
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
            for(var d = 0; d< 6; d++) {
                for (var j = 0; j < turmas.length; j++) {
                    if(turmas[j].Sala1===laboratorios[i].id || turmas[j].Sala2===laboratorios[i].id){
                        if(this.checkTurmaHorario(turmas[j], 1 + d)){
                            for(var k = 0; k < disciplinas.length; k++){
                                if(turmas[j].Disciplina === disciplinas[k].id){
                                    if(seg !== '')
                                        seg = seg + ' '
                                    seg = seg + disciplinas[k].codigo + ' ' + turmas[j].letra
                                }
                            }
                        }
                        if(this.checkTurmaHorario(turmas[j], 7 + d)){
                            for(k = 0; k < disciplinas.length; k++){
                                if(turmas[j].Disciplina === disciplinas[k].id){
                                    if(ter != '')
                                        ter = ter + ' '
                                    ter = ter + disciplinas[k].codigo + ' ' + turmas[j].letra
                                }
                            }
                        }
                        if(this.checkTurmaHorario(turmas[j], 13 + d)){
                            for(k = 0; k < disciplinas.length; k++){
                                if(turmas[j].Disciplina === disciplinas[k].id){
                                    if(qua != '')
                                        qua = qua + ' '
                                    qua = qua + disciplinas[k].codigo + ' ' + turmas[j].letra
                                }
                            }
                        }
                        if(this.checkTurmaHorario(turmas[j], 19 + d)){
                            for(k = 0; k < disciplinas.length; k++){
                                if(turmas[j].Disciplina === disciplinas[k].id){
                                    if(qui != '')
                                        qui = qui + ' '
                                    qui = qui + disciplinas[k].codigo + ' ' + turmas[j].letra
                                }
                            }
                        }
                        if(this.checkTurmaHorario(turmas[j], 25 + d)){
                            for(k = 0; k < disciplinas.length; k++){
                                if(turmas[j].Disciplina === disciplinas[k].id){
                                    if(sex != '')
                                        sex = sex + ' '
                                    sex = sex + disciplinas[k].codigo + ' ' + turmas[j].letra
                                }
                            }
                        }
                    }
                }
                switch(d){
                    case 0: tables[1+2*i].table.body.push([{text:'08 - 10', alignment:'center'}, {text: seg, alignment:'center'}, {text: ter, alignment:'center'}, {text: qua, alignment:'center'}, {text: qui, alignment:'center'}, {text: sex, alignment:'center'}])
                        break
                    case 1: tables[1+2*i].table.body.push([{text:'10 - 12', alignment:'center'}, {text: seg, alignment:'center'}, {text: ter, alignment:'center'}, {text: qua, alignment:'center'}, {text: qui, alignment:'center'}, {text: sex, alignment:'center'}])
                        break
                    case 2: tables[1+2*i].table.body.push([{text:'14 - 16', alignment:'center'}, {text: seg, alignment:'center'}, {text: ter, alignment:'center'}, {text: qua, alignment:'center'}, {text: qui, alignment:'center'}, {text: sex, alignment:'center'}])
                        break
                    case 3: tables[1+2*i].table.body.push([{text:'16 - 18', alignment:'center'}, {text: seg, alignment:'center'}, {text: ter, alignment:'center'}, {text: qua, alignment:'center'}, {text: qui, alignment:'center'}, {text: sex, alignment:'center'}])
                        break
                    case 4: tables[1+2*i].table.body.push([{text:'19 - 21', alignment:'center'}, {text: seg, alignment:'center'}, {text: ter, alignment:'center'}, {text: qua, alignment:'center'}, {text: qui, alignment:'center'}, {text: sex, alignment:'center'}])
                        break
                    case 5: tables[1+2*i].table.body.push([{text:'21 - 23', alignment:'center'}, {text: seg, alignment:'center'}, {text: ter, alignment:'center'}, {text: qua, alignment:'center'}, {text: qui, alignment:'center'}, {text: sex, alignment:'center'}])
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

    pdfAlocacaoLabsBlob() {
        var pdfMake = require('pdfmake/build/pdfmake.js')
        if (pdfMake.vfs == undefined){
            var pdfFonts = require('pdfmake/build/vfs_fonts.js')
            pdfMake.vfs = pdfFonts.pdfMake.vfs;
        }
        var tables = []
        var laboratorios = _.filter(store.state.sala.Salas, ['laboratorio', true])
        var disciplinas = store.state.disciplina.Disciplinas
        var turmas = store.state.turma.Turmas
        var seg = '', ter = '', qua = '', qui = '', sex = ''
        for(var i = 0; i < laboratorios.length; i++){
            tables.push({text: laboratorios[i].nome, bold:true, margin:[0, 10, 0, 10], fontSize:20})
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
            for(var d = 0; d< 6; d++) {
                for (var j = 0; j < turmas.length; j++) {
                    if(turmas[j].Sala1===laboratorios[i].id || turmas[j].Sala2===laboratorios[i].id){
                        if(this.checkTurmaHorario(turmas[j], 1 + d)){
                            for(var k = 0; k < disciplinas.length; k++){
                                if(turmas[j].Disciplina === disciplinas[k].id){
                                    if(seg !== '')
                                        seg = seg + ' '
                                    seg = seg + disciplinas[k].codigo + ' ' + turmas[j].letra
                                }
                            }
                        }
                        if(this.checkTurmaHorario(turmas[j], 7 + d)){
                            for(k = 0; k < disciplinas.length; k++){
                                if(turmas[j].Disciplina === disciplinas[k].id){
                                    if(ter != '')
                                        ter = ter + ' '
                                    ter = ter + disciplinas[k].codigo + ' ' + turmas[j].letra
                                }
                            }
                        }
                        if(this.checkTurmaHorario(turmas[j], 13 + d)){
                            for(k = 0; k < disciplinas.length; k++){
                                if(turmas[j].Disciplina === disciplinas[k].id){
                                    if(qua != '')
                                        qua = qua + ' '
                                    qua = qua + disciplinas[k].codigo + ' ' + turmas[j].letra
                                }
                            }
                        }
                        if(this.checkTurmaHorario(turmas[j], 19 + d)){
                            for(k = 0; k < disciplinas.length; k++){
                                if(turmas[j].Disciplina === disciplinas[k].id){
                                    if(qui != '')
                                        qui = qui + ' '
                                    qui = qui + disciplinas[k].codigo + ' ' + turmas[j].letra
                                }
                            }
                        }
                        if(this.checkTurmaHorario(turmas[j], 25 + d)){
                            for(k = 0; k < disciplinas.length; k++){
                                if(turmas[j].Disciplina === disciplinas[k].id){
                                    if(sex != '')
                                        sex = sex + ' '
                                    sex = sex + disciplinas[k].codigo + ' ' + turmas[j].letra
                                }
                            }
                        }
                    }
                }
                switch(d){
                    case 0: tables[1+2*i].table.body.push([{text:'08 - 10', alignment:'center'}, {text: seg, alignment:'center'}, {text: ter, alignment:'center'}, {text: qua, alignment:'center'}, {text: qui, alignment:'center'}, {text: sex, alignment:'center'}])
                        break
                    case 1: tables[1+2*i].table.body.push([{text:'10 - 12', alignment:'center'}, {text: seg, alignment:'center'}, {text: ter, alignment:'center'}, {text: qua, alignment:'center'}, {text: qui, alignment:'center'}, {text: sex, alignment:'center'}])
                        break
                    case 2: tables[1+2*i].table.body.push([{text:'14 - 16', alignment:'center'}, {text: seg, alignment:'center'}, {text: ter, alignment:'center'}, {text: qua, alignment:'center'}, {text: qui, alignment:'center'}, {text: sex, alignment:'center'}])
                        break
                    case 3: tables[1+2*i].table.body.push([{text:'16 - 18', alignment:'center'}, {text: seg, alignment:'center'}, {text: ter, alignment:'center'}, {text: qua, alignment:'center'}, {text: qui, alignment:'center'}, {text: sex, alignment:'center'}])
                        break
                    case 4: tables[1+2*i].table.body.push([{text:'19 - 21', alignment:'center'}, {text: seg, alignment:'center'}, {text: ter, alignment:'center'}, {text: qua, alignment:'center'}, {text: qui, alignment:'center'}, {text: sex, alignment:'center'}])
                        break
                    case 5: tables[1+2*i].table.body.push([{text:'21 - 23', alignment:'center'}, {text: seg, alignment:'center'}, {text: ter, alignment:'center'}, {text: qua, alignment:'center'}, {text: qui, alignment:'center'}, {text: sex, alignment:'center'}])
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
        return pdfMake.createPdf(docDefinition)
    },

    turmas(professor){
        return _.filter(store.state.turma.Turmas,(turma) => {
            return (turma.Docente1===professor.id || turma.Docente2===professor.id)
        })
    },

    pos(professor){
        return _.filter(store.state.cargaPos.Cargas,(turma) => {
            return (turma.Docente===professor.id)
        })
    },

    creditos1(professor){
        var c = 0
        for (var t = 0; t < store.state.turma.Turmas.length; t++){
            if(store.state.turma.Turmas[t].periodo===1 && (store.state.turma.Turmas[t].Docente1===professor.id || store.state.turma.Turmas[t].Docente2===professor.id)){
                for (var d = 0; d < store.state.disciplina.Disciplinas.length; d++){
                    if(store.state.disciplina.Disciplinas[d].id===store.state.turma.Turmas[t].Disciplina){
                        c+=parseInt(store.state.disciplina.Disciplinas[d].cargaPratica, 10)
                        c+=parseInt(store.state.disciplina.Disciplinas[d].cargaTeorica, 10)
                    }
                }
            }

        }
        for(var t = 0; t < store.state.cargaPos.Cargas.length; t++){
            if(store.state.cargaPos.Cargas[t].Docente===professor.id){
                if(store.state.cargaPos.Cargas[t].trimestre==1 || store.state.cargaPos.Cargas[t].trimestre==2){
                    c+= parseInt(store.state.cargaPos.Cargas[t].creditos, 10)
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
                        c+=parseInt(store.state.disciplina.Disciplinas[d].cargaPratica, 10)
                        c+=parseInt(store.state.disciplina.Disciplinas[d].cargaTeorica, 10)
                    }
                }
            }

        }
        for(var t = 0; t < store.state.cargaPos.Cargas.length; t++){
            if(store.state.cargaPos.Cargas[t].Docente===professor.id){
                if(store.state.cargaPos.Cargas[t].trimestre==3){
                    c+= parseInt(store.state.cargaPos.Cargas[t].creditos, 10)
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
        var professores = _.orderBy(store.state.docente.Docentes, 'apelido')
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
                        widths: [8, 68, '*', 18, 104, 16, 16],
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
                    } else {
                        var horarioTotal = horario1.horario + '/' + horario2.horario
                    }
                    if (turmasProf[j].periodo == 1) {
                        c1 = disciplina.cargaTeorica + disciplina.cargaPratica
                    } else {
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

        var docDefinition = {
            content: tables,
            header: {text:new Date(Date.now()).toLocaleString(), margin:[40, 20, 0, 0], fontSize:10}
        }
        pdfMake.createPdf(docDefinition).open()
    },

    pdfCargaProfessoresBlob() {

        var pdfMake = require('pdfmake/build/pdfmake.js')
        if (pdfMake.vfs == undefined){
            var pdfFonts = require('pdfmake/build/vfs_fonts.js')
            pdfMake.vfs = pdfFonts.pdfMake.vfs;
        }
        var tables = []
        var professores = _.orderBy(store.state.docente.Docentes, 'apelido')
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
                        widths: [8, 68, '*', 18, 104, 16, 16],
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
                    } else {
                        var horarioTotal = horario1.horario + '/' + horario2.horario
                    }
                    if (turmasProf[j].periodo == 1) {
                        c1 = disciplina.cargaTeorica + disciplina.cargaPratica
                    } else {
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

        var docDefinition = {
            content: tables,
            header: {text:new Date(Date.now()).toLocaleString(), margin:[40, 20, 0, 0], fontSize:10}
        }
        return pdfMake.createPdf(docDefinition)
    },
}