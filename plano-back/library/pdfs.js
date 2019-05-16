const models = require('../models/index'),
      _ = require('lodash')

function Pdfs(){
    this.Salas = undefined
    this.Disciplinas = undefined
    this.Turmas = undefined
    this.Cargas = undefined
    this.Docentes = undefined
    this.Horarios = undefined
}

Pdfs.prototype.ready = async function(){
    console.log('Pedindo dados')
    this.Salas = models.Sala.findAll()
    this.Disciplinas = models.Disciplina.findAll()
    this.Turmas = models.Turma.findAll()
    this.Cargas = models.CargaPos.findAll()
    this.Docentes = models.Docente.findAll()
    this.Horarios = models.Horario.findAll()
    console.log('Resolvendo Promises')
    Promise.all([this.Salas, this.Disciplinas, this.Turmas, this.Cargas, this.Docentes, this.Horarios]).then(result => {
        this.Salas = []
        this.Disciplinas = []
        this.Turmas = []
        this.Cargas = []
        this.Docentes = []
        this.Horarios = []
        result[0].forEach(sala => this.Salas.push(sala.dataValues))
        result[1].forEach(disciplina => this.Disciplinas.push(disciplina.dataValues))
        result[2].forEach(turma => this.Turmas.push(turma.dataValues))
        result[3].forEach(carga => this.Cargas.push(carga.dataValues))
        result[4].forEach(docente => this.Docentes.push(docente.dataValues))
        result[5].forEach(horario => this.Horarios.push(horario.dataValues))
        console.log('Dados inicializados')
        this.Turmas.forEach(turma => console.log(turma))
        this.pdfAlocacaoLabs()
        this.pdfCargaProfessores()
        return true
    })
}


function checkTurmaHorario (turma, horario) {
    if(turma.Horario1==horario || turma.Horario2==horario) {
        return true
    }else
        return false
}

Pdfs.prototype.pdfAlocacaoLabs = function() {
    var pdfMake = require('pdfmake/build/pdfmake.js')
    if (pdfMake.vfs == undefined){
        var pdfFonts = require('pdfmake/build/vfs_fonts.js')
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
    }

    var tables = []
    var laboratorios = _.filter(this.Salas, ['laboratorio', true])
    var disciplinas = this.Disciplinas
    var turmas = this.Turmas
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

    var options = {}

    var fonts = {
        Roboto: {
            normal: '/home/planodcc/Plano-Departamental-2.0/plano-back/library/fonts/Roboto-Regular.ttf',
            bold: '/home/planodcc/Plano-Departamental-2.0/plano-back/library/fonts/Roboto-Medium.ttf',
            italics: '/home/planodcc/Plano-Departamental-2.0/plano-back/library/fonts/Roboto-Italic.ttf',
            bolditalics: '/home/planodcc/Plano-Departamental-2.0/plano-back/library/fonts/Roboto-MediumItalic.ttf'
        }
    };

    var PdfPrinter = require('pdfmake');
    var printer = new PdfPrinter(fonts);
    var fs = require('fs');

    var pdfDoc = printer.createPdfKitDocument(docDefinition, options);
    pdfDoc.pipe(fs.createWriteStream('Labs.pdf'));
    pdfDoc.end();
}

function turmas(professor, turmas){
    return _.filter(turmas,(turma) => {
        return (turma.Docente1===professor.id || turma.Docente2===professor.id)
    })
}

function pos(professor, cargas){
    return _.filter(cargas,(turma) => {
        return (turma.Docente===professor.id)
    })
}

function creditos1(professor){
    var c = 0
    for (var t = 0; t < this.Turmas.length; t++){
        if(this.Turmas[t].periodo===1 && (this.Turmas[t].Docente1===professor.id || this.Turmas[t].Docente2===professor.id)){
            for (var d = 0; d < this.Disciplinas.length; d++){
                if(this.Disciplinas[d].id===this.Turmas[t].Disciplina){
                    c+=parseInt(this.Disciplinas[d].cargaPratica, 10)
                    c+=parseInt(this.Disciplinas[d].cargaTeorica, 10)
                }
            }
        }
    }
    for(var t = 0; t < this.Cargas.length; t++){
        if(this.Cargas[t].Docente===professor.id){
            if(this.Cargas[t].trimestre==1 || this.Cargas[t].trimestre==2){
                c+= parseInt(this.Cargas[t].creditos, 10)
            }
        }
    }
    return c
}

function creditos2(professor){
    var c = 0
    for (var t = 0; t < this.Turmas.length; t++){
        if(this.Turmas[t].periodo===3 && (this.Turmas[t].Docente1===professor.id || this.Turmas[t].Docente2===professor.id)){
            for (var d = 0; d < this.Disciplinas.length; d++){
                if(this.Disciplinas[d].id===this.Turmas[t].Disciplina){
                    c+=parseInt(this.Disciplinas[d].cargaPratica, 10)
                    c+=parseInt(this.Disciplinas[d].cargaTeorica, 10)
                }
            }
        }
    }
    for(var t = 0; t < this.Cargas.length; t++){
        if(this.Cargas[t].Docente===professor.id){
            if(this.Cargas[t].trimestre==3){
                c+= parseInt(this.Cargas[t].creditos, 10)
            }
        }
    }
    return c
}

Pdfs.prototype.pdfCargaProfessores = function() {
    var pdfMake = require('pdfmake/build/pdfmake.js')
    if (pdfMake.vfs == undefined){
        var pdfFonts = require('pdfmake/build/vfs_fonts.js')
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
    }
    var tables = []
    var professores = _.orderBy(this.Docentes, 'apelido')
    var turmasProf
    var posProf
    var vazio = 0
    for(var i = 0; i < professores.length; i++){
        this.Turmas.forEach(turma => console.log(turma))
        turmasProf = turmas(professores[i], this.Turmas)
        posProf = pos(professores[i], this.Cargas)
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
                for (var k = 0; k < this.Disciplinas.length; k++) {
                    if (turmasProf[j].Disciplina === this.Disciplinas[k].id) {
                        disciplina = this.Disciplinas[k]
                    }
                }
                for (var l = 0; l < this.Horarios.length; l++) {
                    if (turmasProf[j].Horario1 === this.Horarios[l].id) {
                        horario1 = this.Horarios[l]
                    }
                }
                for (var m = 0; m < this.Horarios.length; m++) {
                    if (turmasProf[j].Horario2 === this.Horarios[m].id) {
                        horario2 = this.Horarios[m]
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

    var options = {}

    var fonts = {
        Roboto: {
            normal: '/home/planodcc/Plano-Departamental-2.0/plano-back/library/fonts/Roboto-Regular.ttf',
            bold: '/home/planodcc/Plano-Departamental-2.0/plano-back/library/fonts/Roboto-Medium.ttf',
            italics: '/home/planodcc/Plano-Departamental-2.0/plano-back/library/fonts/Roboto-Italic.ttf',
            bolditalics: '/home/planodcc/Plano-Departamental-2.0/plano-back/library/fonts/Roboto-MediumItalic.ttf'
        }
    };

    var PdfPrinter = require('pdfmake');
    var printer = new PdfPrinter(fonts);
    var fs = require('fs');

    var pdfDoc = printer.createPdfKitDocument(docDefinition, options);
    pdfDoc.pipe(fs.createWriteStream('Cargas.pdf'));
    pdfDoc.end();
}

module.exports = Pdfs;