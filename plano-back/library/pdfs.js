const models = require('../models/index'),
      _ = require('lodash')

var PdfPrinter = require('pdfmake'),
    fs = require('fs'),
    fonts = {
       Roboto: {
           normal: __dirname + '/fonts/Roboto-Regular.ttf',
           bold: __dirname + '/fonts/Roboto-Medium.ttf',
           italics: __dirname + '/fonts/Roboto-Italic.ttf',
           bolditalics: __dirname + '/fonts/Roboto-MediumItalic.ttf'
       }
    },
    printer = new PdfPrinter(fonts)

function Pdfs(){
    this.Salas = undefined
    this.Disciplinas = undefined
    this.Turmas = undefined
    this.Cargas = undefined
    this.Docentes = undefined
    this.Horarios = undefined
    this.Grades = undefined
    this.DisciplinasGrade = undefined
    this.TurmasExternas = undefined
    this.Pedidos = undefined
    this.PedidosExternos = undefined
    this.Plano = undefined
    this.Cursos = undefined

    this.ativos1 = {
        CCD: [[], [], [], [], [], [], [], [], [], []],
        CCN: [[], [], [], [], [], [], [], [], [], []],
        EC: [[], [], [], [], [], [], [], [], [], []],
        SI: [[], [], [], [], [], [], [], [], [], []],
        Eletivas:[]
    }
    this.ativos2 = {
        CCD: [[], [], [], [], [], [], [], [], [], []],
        CCN: [[], [], [], [], [], [], [], [], [], []],
        EC: [[], [], [], [], [], [], [], [], [], []],
        SI: [[], [], [], [], [], [], [], [], [], []],
        Eletivas:[]
    }
}

Pdfs.prototype.ready = () => new Promise((resolve, reject) => {
    console.log('Pedindo dados')
    this.Salas = models.Sala.findAll()
    this.Disciplinas = models.Disciplina.findAll()
    this.Turmas = models.Turma.findAll()
    this.Cargas = models.CargaPos.findAll()
    this.Docentes = models.Docente.findAll()
    this.Horarios = models.Horario.findAll()
    this.Grades = models.Grade.findAll()
    this.DisciplinasGrade = models.DisciplinaGrade.findAll()
    this.TurmasExternas = models.TurmaExterna.findAll()
    this.Pedidos = models.Pedido.findAll()
    this.PedidosExternos = models.PedidoExterno.findAll()
    this.Plano = models.Plano.findAll()
    this.Cursos = models.Curso.findAll()
    console.log('Resolvendo Promises')
    Promise.all([this.Salas, this.Disciplinas, this.Turmas, this.Cargas, this.Docentes, this.Horarios, this.Grades, this.DisciplinasGrade, this.TurmasExternas, this.Pedidos, this.PedidosExternos, this.Plano, this.Cursos]).then(async (result) => {
        this.Salas = []
        this.Disciplinas = []
        this.Turmas = []
        this.Cargas = []
        this.Docentes = []
        this.Horarios = []
        this.Grades = []
        this.DisciplinasGrade = []
        this.TurmasExternas = []
        this.Pedidos = []
        this.PedidosExternos = []
        this.Plano = []
        this.Cursos = []
        result[0].forEach(sala => this.Salas.push(sala.dataValues))
        result[1].forEach(disciplina => this.Disciplinas.push(disciplina.dataValues))
        result[2].forEach(turma => this.Turmas.push(turma.dataValues))
        result[3].forEach(carga => this.Cargas.push(carga.dataValues))
        result[4].forEach(docente => this.Docentes.push(docente.dataValues))
        result[5].forEach(horario => this.Horarios.push(horario.dataValues))
        result[6].forEach(grade => this.Grades.push(grade.dataValues))
        result[7].forEach(disciplinaGrade => this.DisciplinasGrade.push(disciplinaGrade.dataValues))
        result[8].forEach(turmaExterna => this.TurmasExternas.push(turmaExterna.dataValues))
        result[9].forEach(pedido => this.Pedidos.push(pedido.dataValues))
        result[10].forEach(pedidoExterno => this.PedidosExternos.push(pedidoExterno.dataValues))
        result[11].forEach(plano => this.Plano.push(plano.dataValues))
        result[12].forEach(curso => this.Cursos.push(curso.dataValues))
        console.log('Dados inicializados')
        await pdfAlocacaoLabs()
        console.log("Pdf Labs Criado")
        await pdfCargaProfessores()
        console.log("Pdf Cargas Criado")
        await pdfResumoHorarios()
        console.log("Pdf Horarios Criado")
        resolve()
    })
})

function checkTurmaLab (turma, labs){
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

}

function checkTurmaHorarioLabs (turma, horario, labs) {
    if(turma.Horario1==horario || turma.Horario2==horario) {
        let sala = checkTurmaLab(turma, labs)
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
            case 4: return true
                break

        }
        return true
    }else
        return false
}

function checkTurmaHorario (turma, horario) {
    if(turma.Horario1==horario || turma.Horario2==horario) {
        return true
    }else
        return false
}

const pdfAlocacaoLabs = () => new Promise((resolve) => {

    var tables = []
    var laboratorios = _.filter(this.Salas, ['laboratorio', true])
    var disciplinas = this.Disciplinas
    var turmas1 = _.filter(this.Turmas, ['periodo', 1])
    var turmas2 = _.filter(this.Turmas, ['periodo', 3])
    var seg = '', ter = '', qua = '', qui = '', sex = ''
    for(var i = 0; i < laboratorios.length; i++){
        tables.push({text: laboratorios[i].nome, bold:true, margin:[0, 10, 0, 10], fontSize:20})
        tables.push({text: "1º Semestre", bold:true, margin:[0, 10, 0, 10], fontSize:18})
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
        for(var d = 0; d< 7; d++) {
            for (var j = 0; j < turmas1.length; j++) {
                if(turmas1[j].Sala1===laboratorios[i].id || turmas1[j].Sala2===laboratorios[i].id){
                    if(d < 4) {
                        if (checkTurmaHorarioLabs(turmas1[j], 1 + d, laboratorios)) {
                            for (var k = 0; k < disciplinas.length; k++) {
                                if (turmas1[j].Disciplina === disciplinas[k].id) {
                                    if (seg !== '')
                                        seg = seg + ' '
                                    seg = seg + disciplinas[k].codigo + ' ' + turmas1[j].letra
                                }
                            }
                        }
                        if (checkTurmaHorarioLabs(turmas1[j], 7 + d, laboratorios)) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas1[j].Disciplina === disciplinas[k].id) {
                                    if (ter != '')
                                        ter = ter + ' '
                                    ter = ter + disciplinas[k].codigo + ' ' + turmas1[j].letra
                                }
                            }
                        }
                        if (checkTurmaHorarioLabs(turmas1[j], 13 + d, laboratorios)) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas1[j].Disciplina === disciplinas[k].id) {
                                    if (qua != '')
                                        qua = qua + ' '
                                    qua = qua + disciplinas[k].codigo + ' ' + turmas1[j].letra
                                }
                            }
                        }
                        if (checkTurmaHorarioLabs(turmas1[j], 19 + d, laboratorios)) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas1[j].Disciplina === disciplinas[k].id) {
                                    if (qui != '')
                                        qui = qui + ' '
                                    qui = qui + disciplinas[k].codigo + ' ' + turmas1[j].letra
                                }
                            }
                        }
                        if (checkTurmaHorarioLabs(turmas1[j], 25 + d, laboratorios)) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas1[j].Disciplina === disciplinas[k].id) {
                                    if (sex != '')
                                        sex = sex + ' '
                                    sex = sex + disciplinas[k].codigo + ' ' + turmas1[j].letra
                                }
                            }
                        }
                    } else if(d == 4) {
                        if (checkTurmaHorarioLabs(turmas1[j], 32, laboratorios)) {
                            for (var k = 0; k < disciplinas.length; k++) {
                                if (turmas1[j].Disciplina === disciplinas[k].id) {
                                    if (seg !== '')
                                        seg = seg + ' '
                                    seg = seg + disciplinas[k].codigo + ' ' + turmas1[j].letra
                                }
                            }
                        }
                        if (checkTurmaHorarioLabs(turmas1[j], 34, laboratorios)) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas1[j].Disciplina === disciplinas[k].id) {
                                    if (ter != '')
                                        ter = ter + ' '
                                    ter = ter + disciplinas[k].codigo + ' ' + turmas1[j].letra
                                }
                            }
                        }
                        if (checkTurmaHorarioLabs(turmas1[j], 36, laboratorios)) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas1[j].Disciplina === disciplinas[k].id) {
                                    if (qua != '')
                                        qua = qua + ' '
                                    qua = qua + disciplinas[k].codigo + ' ' + turmas1[j].letra
                                }
                            }
                        }
                        if (checkTurmaHorarioLabs(turmas1[j], 38, laboratorios)) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas1[j].Disciplina === disciplinas[k].id) {
                                    if (qui != '')
                                        qui = qui + ' '
                                    qui = qui + disciplinas[k].codigo + ' ' + turmas1[j].letra
                                }
                            }
                        }
                        if (checkTurmaHorarioLabs(turmas1[j], 40, laboratorios)) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas1[j].Disciplina === disciplinas[k].id) {
                                    if (sex != '')
                                        sex = sex + ' '
                                    sex = sex + disciplinas[k].codigo + ' ' + turmas1[j].letra
                                }
                            }
                        }
                    } else if(d > 4) {
                        if (checkTurmaHorarioLabs(turmas1[j],  d, laboratorios)) {
                            for (var k = 0; k < disciplinas.length; k++) {
                                if (turmas1[j].Disciplina === disciplinas[k].id) {
                                    if (seg !== '')
                                        seg = seg + ' '
                                    seg = seg + disciplinas[k].codigo + ' ' + turmas1[j].letra
                                }
                            }
                        }
                        if (checkTurmaHorarioLabs(turmas1[j], 6 + d, laboratorios)) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas1[j].Disciplina === disciplinas[k].id) {
                                    if (ter != '')
                                        ter = ter + ' '
                                    ter = ter + disciplinas[k].codigo + ' ' + turmas1[j].letra
                                }
                            }
                        }
                        if (checkTurmaHorarioLabs(turmas1[j], 12 + d, laboratorios)) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas1[j].Disciplina === disciplinas[k].id) {
                                    if (qua != '')
                                        qua = qua + ' '
                                    qua = qua + disciplinas[k].codigo + ' ' + turmas1[j].letra
                                }
                            }
                        }
                        if (checkTurmaHorarioLabs(turmas1[j], 18 + d, laboratorios)) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas1[j].Disciplina === disciplinas[k].id) {
                                    if (qui != '')
                                        qui = qui + ' '
                                    qui = qui + disciplinas[k].codigo + ' ' + turmas1[j].letra
                                }
                            }
                        }
                        if (checkTurmaHorarioLabs(turmas1[j], 24 + d, laboratorios)) {
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
            switch(d){
                case 0: tables[2+5*i].table.body.push([{text:'08 - 10', alignment:'center'}, {text: seg, alignment:'center'}, {text: ter, alignment:'center'}, {text: qua, alignment:'center'}, {text: qui, alignment:'center'}, {text: sex, alignment:'center'}])
                    break
                case 1: tables[2+5*i].table.body.push([{text:'10 - 12', alignment:'center'}, {text: seg, alignment:'center'}, {text: ter, alignment:'center'}, {text: qua, alignment:'center'}, {text: qui, alignment:'center'}, {text: sex, alignment:'center'}])
                    break
                case 2: tables[2+5*i].table.body.push([{text:'14 - 16', alignment:'center'}, {text: seg, alignment:'center'}, {text: ter, alignment:'center'}, {text: qua, alignment:'center'}, {text: qui, alignment:'center'}, {text: sex, alignment:'center'}])
                    break
                case 3: tables[2+5*i].table.body.push([{text:'16 - 18', alignment:'center'}, {text: seg, alignment:'center'}, {text: ter, alignment:'center'}, {text: qua, alignment:'center'}, {text: qui, alignment:'center'}, {text: sex, alignment:'center'}])
                    break
                case 4: tables[2+5*i].table.body.push([{text:'17 - 19', alignment:'center'}, {text: seg, alignment:'center'}, {text: ter, alignment:'center'}, {text: qua, alignment:'center'}, {text: qui, alignment:'center'}, {text: sex, alignment:'center'}])
                    break
                case 5: tables[2+5*i].table.body.push([{text:'19 - 21', alignment:'center'}, {text: seg, alignment:'center'}, {text: ter, alignment:'center'}, {text: qua, alignment:'center'}, {text: qui, alignment:'center'}, {text: sex, alignment:'center'}])
                    break
                case 6: tables[2+5*i].table.body.push([{text:'21 - 23', alignment:'center'}, {text: seg, alignment:'center'}, {text: ter, alignment:'center'}, {text: qua, alignment:'center'}, {text: qui, alignment:'center'}, {text: sex, alignment:'center'}])
                    break
            }
            seg = ter = qua = qui = sex = ''
        }

        tables.push({text: "2º Semestre", bold:true, margin:[0, 10, 0, 10], fontSize:18})
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
        for(var d = 0; d< 7; d++) {
            for (var j = 0; j < turmas2.length; j++) {
                if(turmas2[j].Sala1===laboratorios[i].id || turmas2[j].Sala2===laboratorios[i].id){
                    if(d < 4) {
                        if (checkTurmaHorarioLabs(turmas2[j], 1 + d, laboratorios)) {
                            for (var k = 0; k < disciplinas.length; k++) {
                                if (turmas2[j].Disciplina === disciplinas[k].id) {
                                    if (seg !== '')
                                        seg = seg + ' '
                                    seg = seg + disciplinas[k].codigo + ' ' + turmas2[j].letra
                                }
                            }
                        }
                        if (checkTurmaHorarioLabs(turmas2[j], 7 + d, laboratorios)) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas2[j].Disciplina === disciplinas[k].id) {
                                    if (ter != '')
                                        ter = ter + ' '
                                    ter = ter + disciplinas[k].codigo + ' ' + turmas2[j].letra
                                }
                            }
                        }
                        if (checkTurmaHorarioLabs(turmas2[j], 13 + d, laboratorios)) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas2[j].Disciplina === disciplinas[k].id) {
                                    if (qua != '')
                                        qua = qua + ' '
                                    qua = qua + disciplinas[k].codigo + ' ' + turmas2[j].letra
                                }
                            }
                        }
                        if (checkTurmaHorarioLabs(turmas2[j], 19 + d, laboratorios)) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas2[j].Disciplina === disciplinas[k].id) {
                                    if (qui != '')
                                        qui = qui + ' '
                                    qui = qui + disciplinas[k].codigo + ' ' + turmas2[j].letra
                                }
                            }
                        }
                        if (checkTurmaHorarioLabs(turmas2[j], 25 + d, laboratorios)) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas2[j].Disciplina === disciplinas[k].id) {
                                    if (sex != '')
                                        sex = sex + ' '
                                    sex = sex + disciplinas[k].codigo + ' ' + turmas2[j].letra
                                }
                            }
                        }
                    } else if(d == 4) {
                        if (checkTurmaHorarioLabs(turmas2[j], 32, laboratorios)) {
                            for (var k = 0; k < disciplinas.length; k++) {
                                if (turmas2[j].Disciplina === disciplinas[k].id) {
                                    if (seg !== '')
                                        seg = seg + ' '
                                    seg = seg + disciplinas[k].codigo + ' ' + turmas2[j].letra
                                }
                            }
                        }
                        if (checkTurmaHorarioLabs(turmas2[j], 34, laboratorios)) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas2[j].Disciplina === disciplinas[k].id) {
                                    if (ter != '')
                                        ter = ter + ' '
                                    ter = ter + disciplinas[k].codigo + ' ' + turmas2[j].letra
                                }
                            }
                        }
                        if (checkTurmaHorarioLabs(turmas2[j], 36, laboratorios)) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas2[j].Disciplina === disciplinas[k].id) {
                                    if (qua != '')
                                        qua = qua + ' '
                                    qua = qua + disciplinas[k].codigo + ' ' + turmas2[j].letra
                                }
                            }
                        }
                        if (checkTurmaHorarioLabs(turmas2[j], 38, laboratorios)) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas2[j].Disciplina === disciplinas[k].id) {
                                    if (qui != '')
                                        qui = qui + ' '
                                    qui = qui + disciplinas[k].codigo + ' ' + turmas2[j].letra
                                }
                            }
                        }
                        if (checkTurmaHorarioLabs(turmas2[j], 40, laboratorios)) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas2[j].Disciplina === disciplinas[k].id) {
                                    if (sex != '')
                                        sex = sex + ' '
                                    sex = sex + disciplinas[k].codigo + ' ' + turmas2[j].letra
                                }
                            }
                        }
                    } else if(d > 4) {
                        if (checkTurmaHorarioLabs(turmas2[j], d, laboratorios)) {
                            for (var k = 0; k < disciplinas.length; k++) {
                                if (turmas2[j].Disciplina === disciplinas[k].id) {
                                    if (seg !== '')
                                        seg = seg + ' '
                                    seg = seg + disciplinas[k].codigo + ' ' + turmas2[j].letra
                                }
                            }
                        }
                        if (checkTurmaHorarioLabs(turmas2[j], 6 + d, laboratorios)) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas2[j].Disciplina === disciplinas[k].id) {
                                    if (ter != '')
                                        ter = ter + ' '
                                    ter = ter + disciplinas[k].codigo + ' ' + turmas2[j].letra
                                }
                            }
                        }
                        if (checkTurmaHorarioLabs(turmas2[j], 12 + d, laboratorios)) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas2[j].Disciplina === disciplinas[k].id) {
                                    if (qua != '')
                                        qua = qua + ' '
                                    qua = qua + disciplinas[k].codigo + ' ' + turmas2[j].letra
                                }
                            }
                        }
                        if (checkTurmaHorarioLabs(turmas2[j], 18 + d, laboratorios)) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas2[j].Disciplina === disciplinas[k].id) {
                                    if (qui != '')
                                        qui = qui + ' '
                                    qui = qui + disciplinas[k].codigo + ' ' + turmas2[j].letra
                                }
                            }
                        }
                        if (checkTurmaHorarioLabs(turmas2[j], 24 + d, laboratorios)) {
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
                case 0: tables[4+5*i].table.body.push([{text:'08 - 10', alignment:'center'}, {text: seg, alignment:'center'}, {text: ter, alignment:'center'}, {text: qua, alignment:'center'}, {text: qui, alignment:'center'}, {text: sex, alignment:'center'}])
                    break
                case 1: tables[4+5*i].table.body.push([{text:'10 - 12', alignment:'center'}, {text: seg, alignment:'center'}, {text: ter, alignment:'center'}, {text: qua, alignment:'center'}, {text: qui, alignment:'center'}, {text: sex, alignment:'center'}])
                    break
                case 2: tables[4+5*i].table.body.push([{text:'14 - 16', alignment:'center'}, {text: seg, alignment:'center'}, {text: ter, alignment:'center'}, {text: qua, alignment:'center'}, {text: qui, alignment:'center'}, {text: sex, alignment:'center'}])
                    break
                case 3: tables[4+5*i].table.body.push([{text:'16 - 18', alignment:'center'}, {text: seg, alignment:'center'}, {text: ter, alignment:'center'}, {text: qua, alignment:'center'}, {text: qui, alignment:'center'}, {text: sex, alignment:'center'}])
                    break
                case 4: tables[4+5*i].table.body.push([{text:'17 - 19', alignment:'center'}, {text: seg, alignment:'center'}, {text: ter, alignment:'center'}, {text: qua, alignment:'center'}, {text: qui, alignment:'center'}, {text: sex, alignment:'center'}])
                    break
                case 5: tables[4+5*i].table.body.push([{text:'19 - 21', alignment:'center'}, {text: seg, alignment:'center'}, {text: ter, alignment:'center'}, {text: qua, alignment:'center'}, {text: qui, alignment:'center'}, {text: sex, alignment:'center'}])
                    break
                case 6: tables[4+5*i].table.body.push([{text:'21 - 23', alignment:'center'}, {text: seg, alignment:'center'}, {text: ter, alignment:'center'}, {text: qua, alignment:'center'}, {text: qui, alignment:'center'}, {text: sex, alignment:'center'}])
                    break
            }
            seg = ter = qua = qui = sex = ''
        }
    }

    console.log("Criando Documento")
    let docDefinitionLabs = {
        content: tables,
        header: {text:new Date(Date.now()).toLocaleString(), margin:[40, 20, 0, 0], fontSize:10}
    }

    console.log("Criando PDF")
    let pdfDocLabs = printer.createPdfKitDocument(docDefinitionLabs);
    let labsStream = fs.createWriteStream('Labs.pdf')
    labsStream.on("finish", resolve)
    pdfDocLabs.pipe(labsStream);
    pdfDocLabs.end();

})

function turmas(professor, turmas){
    return _.orderBy(_.filter(turmas,(turma) => {
        return (turma.Docente1===professor.id || turma.Docente2===professor.id)
    }),'periodo')
}

function pos(professor, cargas){
    return _.orderBy(_.filter(cargas,(turma) => {
        return (turma.Docente===professor.id)
    }), 'trimestre')
}

function creditos1(professor, turmas, disciplinas, cargas){
    var c = 0
    for (var t = 0; t < turmas.length; t++){
        if(turmas[t].periodo===1 && (turmas[t].Docente1===professor.id || turmas[t].Docente2===professor.id)){
            for (var d = 0; d < disciplinas.length; d++){
                if(disciplinas[d].id===turmas[t].Disciplina){
                    c+=parseInt(disciplinas[d].cargaPratica, 10)
                    c+=parseInt(disciplinas[d].cargaTeorica, 10)
                }
            }
        }
    }
    for(var t = 0; t < cargas.length; t++){
        if(cargas[t].Docente===professor.id){
            if(cargas[t].trimestre==1 || cargas[t].trimestre==2){
                c+= parseInt(cargas[t].creditos, 10)
            }
        }
    }
    return c
}

function creditos2(professor, turmas, disciplinas, cargas){
    var c = 0
    for (var t = 0; t < turmas.length; t++){
        if(turmas[t].periodo===3 && (turmas[t].Docente1===professor.id || turmas[t].Docente2===professor.id)){
            for (var d = 0; d < disciplinas.length; d++){
                if(disciplinas[d].id===turmas[t].Disciplina){
                    c+=parseInt(disciplinas[d].cargaPratica, 10)
                    c+=parseInt(disciplinas[d].cargaTeorica, 10)
                }
            }
        }
    }
    for(var t = 0; t < cargas.length; t++){
        if(cargas[t].Docente===professor.id){
            if(cargas[t].trimestre==3){
                c+= parseInt(cargas[t].creditos, 10)
            }
        }
    }
    return c
}

const pdfCargaProfessores = () => new Promise((resolve, reject) => {

    var tables = []
    var professores = _.orderBy(_.filter(this.Docentes, ['ativo', true]), 'apelido')
    var turmasProf
    var posProf
    var vazio = 0
    var horarioTotal = ''
    for(var i = 0; i < professores.length; i++){
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
                    text: 'C1:' + creditos1(professores[i], this.Turmas, this.Disciplinas, this.Cargas) + '|C2:' + creditos2(professores[i], this.Turmas, this.Disciplinas, this.Cargas),
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
                    horarioTotal = horario1.horario
                } else {
                    horarioTotal = horario1.horario + '/' + horario2.horario
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

    console.log("Criando Documento")
    let docDefinitionCargas = {
        content: tables,
        header: {text:new Date(Date.now()).toLocaleString(), margin:[40, 20, 0, 0], fontSize:10}
    }

    let printer = new PdfPrinter(fonts);

    console.log("Criando PDF")
    let pdfDocCargas = printer.createPdfKitDocument(docDefinitionCargas);
    let cargasStream = fs.createWriteStream('Cargas.pdf')
    cargasStream.on("finish", resolve)
    pdfDocCargas.pipe(cargasStream);
    pdfDocCargas.end();
})

function isEven (number) {
    if(number%2===0)
        return 'true'
    else
        return 'false'
}

function createHorarios1 (ano, semestre, listaDisciplinasGrade, listaTurmas, listaTurmasExternas, listaCursos, listaGrades, listaPedidos, listaPedidosExternos) {
    let ativos1 = {
        CCD: [[], [], [], [], [], [], [], [], [], []],
        CCN: [[], [], [], [], [], [], [], [], [], []],
        EC: [[], [], [], [], [], [], [], [], [], []],
        SI: [[], [], [], [], [], [], [], [], [], []],
        Eletivas:[]
    }

    let grade
    let grades
    let inicio = 1
    let fim
    let pedidos
    let pedidosExternos
    let disciplinaGrades = listaDisciplinasGrade
    let turmas = listaTurmas
    let turmasExternas = listaTurmasExternas

    if (semestre===1){
        if(listaCursos[0].semestreInicial==1){
            this.evenCCN = "false"
        }else if (listaCursos[0].semestreInicial==2){
            this.evenCCN = "true"
        }

        if(listaCursos[1].semestreInicial==1){
            this.evenEC = "false"
        }else if(listaCursos[1].semestreInicial==2){
            this.evenEC = "true"
        }

        if(listaCursos[2].semestreInicial==1){
            this.evenSI = "false"
        }else if(listaCursos[2].semestreInicial==2){
            this.evenSI = "true"
        }

        if(listaCursos[3].semestreInicial==1){
            this.evenCCD = "false"
        }else if(listaCursos[3].semestreInicial==2){
            this.evenCCD = "true"
        }
    }else{
        if(listaCursos[0].semestreInicial==1){
            this.evenCCN = "true"
        }else if (listaCursos[0].semestreInicial==2){
            this.evenCCN = "false"
        }

        if(listaCursos[1].semestreInicial==1){
            this.evenEC = "true"
        }else if(listaCursos[1].semestreInicial==2){
            this.evenEC = "false"
        }

        if(listaCursos[2].semestreInicial==1){
            this.evenSI = "true"
        }else if(listaCursos[2].semestreInicial==2){
            this.evenSI = "false"
        }

        if(listaCursos[3].semestreInicial==1){
            this.evenCCD = "true"
        }else if(listaCursos[3].semestreInicial==2){
            this.evenCCD = "false"
        }
    }


    //CC Diurno
    grades = _.filter(listaGrades, ['Curso', 4])
    grades = _.orderBy(grades, 'periodoInicio', 'desc')
    pedidos = _.filter(listaPedidos, ['Curso', 4])
    pedidosExternos = _.filter(listaPedidosExternos, ['Curso', 4])

    for (let i = 0; ((i < grades.length) && (inicio <= 10)); i++) {
        //grade
        grade = grades[i].id
        //inicio
        if(i===0)
            inicio = 1
        else
            inicio = fim+1
        //fim
        if(i+1 === grades.length)
            fim = 10
        else
        if(i==0)
            fim = 1 + 2*(ano - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (semestre - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
        else
            fim = inicio - 1 + 2*(parseInt(grades[i-1].periodoInicio.slice(0,4), 10) - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (parseInt(grades[i-1].periodoInicio.slice(5,6), 10) - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
        for (let k = 0; k < disciplinaGrades.length; k++) {
            if ((disciplinaGrades[k].Grade == grade) && (isEven(disciplinaGrades[k].periodo) == this.evenCCD) && (disciplinaGrades[k].periodo >= parseInt(inicio, 10)) && (disciplinaGrades[k].periodo <= parseInt(fim, 10))) {
                for (let j = 0; j < turmas.length; j++) {
                    if (turmas[j].periodo===1 && turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                        for (let p = 0; p < pedidos.length; p++) {
                            if ((pedidos[p].vagasPeriodizadas > 0) && (pedidos[p].Turma == turmas[j].id)) {
                                ativos1.CCD[disciplinaGrades[k].periodo - 1].push(turmas[j])
                            }
                        }
                    }
                }
                for (let j = 0; j < turmasExternas.length; j++) {
                    if (turmasExternas[j].periodo===1 && turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                        for (let p = 0; p < pedidosExternos.length; p++) {
                            if ((pedidosExternos[p].vagasPeriodizadas > 0) && (pedidosExternos[p].Turma == turmasExternas[j].id)) {
                                ativos1.CCD[disciplinaGrades[k].periodo - 1].push(turmasExternas[j])
                            }
                        }
                    }
                }
            }
        }
    }


    //CC Noturno está selecionado
    grades = _.filter(listaGrades, ['Curso', 1])
    grades = _.orderBy(grades, 'periodoInicio', 'desc')
    pedidos = _.filter(listaPedidos, ['Curso', 1])
    pedidosExternos = _.filter(listaPedidosExternos, ['Curso', 1])
    for (let i = 0; ((i < grades.length) && (inicio <= 10)); i++) {
        //grade
        grade = grades[i].id
        //inicio
        if(i===0)
            inicio = 1
        else
            inicio = fim+1
        //fim
        if(i+1 === grades.length)
            fim = 10
        else
        if(i==0)
            fim = 1 + 2*(ano - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (semestre - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
        else
            fim = inicio - 1 + 2*(parseInt(grades[i-1].periodoInicio.slice(0,4), 10) - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (parseInt(grades[i-1].periodoInicio.slice(5,6), 10) - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
        for (let k = 0; k < disciplinaGrades.length; k++) {
            if ((disciplinaGrades[k].Grade == grade) && (isEven(disciplinaGrades[k].periodo) == this.evenCCN) && (disciplinaGrades[k].periodo >= parseInt(inicio, 10)) && (disciplinaGrades[k].periodo <= parseInt(fim, 10))) {
                for (let j = 0; j < turmas.length; j++) {
                    if (turmas[j].periodo===1 && turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                        for (let p = 0; p < pedidos.length; p++) {
                            if ((pedidos[p].vagasPeriodizadas > 0) && (pedidos[p].Turma == turmas[j].id)) {
                                ativos1.CCN[disciplinaGrades[k].periodo - 1].push(turmas[j])
                            }
                        }
                    }
                }
                for (let j = 0; j < turmasExternas.length; j++) {
                    if (turmasExternas[j].periodo===1 && turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                        for (let p = 0; p < pedidosExternos.length; p++) {
                            if ((pedidosExternos[p].vagasPeriodizadas > 0) && (pedidosExternos[p].Turma == turmasExternas[j].id)) {
                                ativos1.CCN[disciplinaGrades[k].periodo - 1].push(turmasExternas[j])
                            }
                        }
                    }
                }
            }
        }
    }


    //SI está selecionado
    grades = _.filter(listaGrades, ['Curso', 3])
    grades = _.orderBy(grades, 'periodoInicio', 'desc')
    pedidos = _.filter(listaPedidos, ['Curso', 3])
    pedidosExternos = _.filter(listaPedidosExternos, ['Curso', 3])
    for (let i = 0; ((i < grades.length) && (inicio <= 10)); i++) {
        //grade
        grade = grades[i].id
        //inicio
        if(i===0)
            inicio = 1
        else
            inicio = fim+1
        //fim
        if(i+1 === grades.length)
            fim = 10
        else
        if(i==0)
            fim = 1 + 2*(ano - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (semestre - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
        else
            fim = inicio - 1 + 2*(parseInt(grades[i-1].periodoInicio.slice(0,4), 10) - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (parseInt(grades[i-1].periodoInicio.slice(5,6), 10) - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
        for (let k = 0; k < disciplinaGrades.length; k++) {
            if ((disciplinaGrades[k].Grade == grade) && (isEven(disciplinaGrades[k].periodo) == this.evenSI) && (disciplinaGrades[k].periodo >= parseInt(inicio, 10)) && (disciplinaGrades[k].periodo <= parseInt(fim, 10))) {
                for (let j = 0; j < turmas.length; j++) {
                    if (turmas[j].periodo===1 && turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                        for (let p = 0; p < pedidos.length; p++) {
                            if ((pedidos[p].vagasPeriodizadas > 0) && (pedidos[p].Turma == turmas[j].id)) {
                                ativos1.SI[disciplinaGrades[k].periodo - 1].push(turmas[j])
                            }
                        }
                    }
                }
                for (let j = 0; j < turmasExternas.length; j++) {
                    if (turmasExternas[j].periodo===1 && turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                        for (let p = 0; p < pedidosExternos.length; p++) {
                            if ((pedidosExternos[p].vagasPeriodizadas > 0) && (pedidosExternos[p].Turma == turmasExternas[j].id)) {
                                ativos1.SI[disciplinaGrades[k].periodo - 1].push(turmasExternas[j])
                            }
                        }
                    }
                }
            }
        }
    }


    //Engenharia Computacional está selecionado
    grades = _.filter(listaGrades, ['Curso', 2])
    grades = _.orderBy(grades, 'periodoInicio', 'desc')
    pedidos = _.filter(listaPedidos, ['Curso', 2])
    pedidosExternos = _.filter(listaPedidosExternos, ['Curso', 2])
    for (let i = 0; ((i < grades.length) && (inicio <= 10)); i++) {
        //grade
        grade = grades[i].id
        //inicio
        if(i===0)
            inicio = 1
        else
            inicio = fim+1
        //fim
        if(i+1 === grades.length)
            fim = 10
        else
        if(i==0)
            fim = 1 + 2*(ano - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (semestre - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
        else
            fim = inicio - 1 + 2*(parseInt(grades[i-1].periodoInicio.slice(0,4), 10) - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (parseInt(grades[i-1].periodoInicio.slice(5,6), 10) - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
        for (let k = 0; k < disciplinaGrades.length; k++) {
            if ((disciplinaGrades[k].Grade == grade) && (isEven(disciplinaGrades[k].periodo) == this.evenEC) && (disciplinaGrades[k].periodo >= parseInt(inicio, 10)) && (disciplinaGrades[k].periodo <= parseInt(fim, 10))) {
                for (let j = 0; j < turmas.length; j++) {
                    if (turmas[j].periodo===1 && turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                        for (let p = 0; p < pedidos.length; p++) {
                            if ((pedidos[p].vagasPeriodizadas > 0) && (pedidos[p].Turma == turmas[j].id)) {
                                ativos1.EC[disciplinaGrades[k].periodo - 1].push(turmas[j])
                            }
                        }
                    }
                }
                for (let j = 0; j < turmasExternas.length; j++) {
                    if (turmasExternas[j].periodo===1 && turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                        for (let p = 0; p < pedidosExternos.length; p++) {
                            if ((pedidosExternos[p].vagasPeriodizadas > 0) && (pedidosExternos[p].Turma == turmasExternas[j].id)) {
                                ativos1.EC[disciplinaGrades[k].periodo - 1].push(turmasExternas[j])
                            }
                        }
                    }
                }
            }
        }
    }

    //Eletivas está selecionado:
    let eletiva = true
    for(let t = 0; t<turmas.length;t++){
        for(let d = 0; d<disciplinaGrades.length; d++){
            if(turmas[t].periodo!=1 || turmas[t].Disciplina===disciplinaGrades[d].Disciplina){
                eletiva = false
            }
        }
        if(eletiva){
            ativos1.Eletivas.push(turmas[t])
        }else{
            eletiva = true
        }
    }

    return ativos1

}

function createHorarios2 (ano, semestre, listaDisciplinasGrade, listaTurmas, listaTurmasExternas, listaCursos, listaGrades, listaPedidos, listaPedidosExternos) {
    let ativos2 = {
        CCD: [[], [], [], [], [], [], [], [], [], []],
        CCN: [[], [], [], [], [], [], [], [], [], []],
        EC: [[], [], [], [], [], [], [], [], [], []],
        SI: [[], [], [], [], [], [], [], [], [], []],
        Eletivas:[]
    }

    let grade
    let grades
    let inicio = 1
    let fim
    let pedidos
    let pedidosExternos
    let disciplinaGrades = listaDisciplinasGrade
    let turmas = listaTurmas
    let turmasExternas = listaTurmasExternas

    if (semestre===1){
        if(listaCursos[0].semestreInicial==1){
            this.evenCCN = "false"
        }else if (listaCursos[0].semestreInicial==2){
            this.evenCCN = "true"
        }

        if(listaCursos[1].semestreInicial==1){
            this.evenEC = "false"
        }else if(listaCursos[1].semestreInicial==2){
            this.evenEC = "true"
        }

        if(listaCursos[2].semestreInicial==1){
            this.evenSI = "false"
        }else if(listaCursos[2].semestreInicial==2){
            this.evenSI = "true"
        }

        if(listaCursos[3].semestreInicial==1){
            this.evenCCD = "false"
        }else if(listaCursos[3].semestreInicial==2){
            this.evenCCD = "true"
        }
    }else{
        if(listaCursos[0].semestreInicial==1){
            this.evenCCN = "true"
        }else if (listaCursos[0].semestreInicial==2){
            this.evenCCN = "false"
        }

        if(listaCursos[1].semestreInicial==1){
            this.evenEC = "true"
        }else if(listaCursos[1].semestreInicial==2){
            this.evenEC = "false"
        }

        if(listaCursos[2].semestreInicial==1){
            this.evenSI = "true"
        }else if(listaCursos[2].semestreInicial==2){
            this.evenSI = "false"
        }

        if(listaCursos[3].semestreInicial==1){
            this.evenCCD = "true"
        }else if(listaCursos[3].semestreInicial==2){
            this.evenCCD = "false"
        }
    }


    //CC Diurno
    grades = _.filter(listaGrades, ['Curso', 4])
    grades = _.orderBy(grades, 'periodoInicio', 'desc')
    pedidos = _.filter(listaPedidos, ['Curso', 4])
    pedidosExternos = _.filter(listaPedidosExternos, ['Curso', 4])

    for (let i = 0; ((i < grades.length) && (inicio <= 10)); i++) {
        //grade
        grade = grades[i].id
        //inicio
        if(i===0)
            inicio = 1
        else
            inicio = fim+1
        //fim
        if(i+1 === grades.length)
            fim = 10
        else
        if(i==0)
            fim = 1 + 2*(ano - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (semestre - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
        else
            fim = inicio - 1 + 2*(parseInt(grades[i-1].periodoInicio.slice(0,4), 10) - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (parseInt(grades[i-1].periodoInicio.slice(5,6), 10) - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
        for (let k = 0; k < disciplinaGrades.length; k++) {
            if ((disciplinaGrades[k].Grade == grade) && (isEven(disciplinaGrades[k].periodo) == this.evenCCD) && (disciplinaGrades[k].periodo >= parseInt(inicio, 10)) && (disciplinaGrades[k].periodo <= parseInt(fim, 10))) {
                for (let j = 0; j < turmas.length; j++) {
                    if (turmas[j].periodo===3 && turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                        for (let p = 0; p < pedidos.length; p++) {
                            if ((pedidos[p].vagasPeriodizadas > 0) && (pedidos[p].Turma == turmas[j].id)) {
                                ativos2.CCD[disciplinaGrades[k].periodo - 1].push(turmas[j])
                            }
                        }
                    }
                }
                for (let j = 0; j < turmasExternas.length; j++) {
                    if (turmasExternas[j].periodo===3 && turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                        for (let p = 0; p < pedidosExternos.length; p++) {
                            if ((pedidosExternos[p].vagasPeriodizadas > 0) && (pedidosExternos[p].Turma == turmasExternas[j].id)) {
                                ativos2.CCD[disciplinaGrades[k].periodo - 1].push(turmasExternas[j])
                            }
                        }
                    }
                }
            }
        }
    }


    //CC Noturno está selecionado
    grades = _.filter(listaGrades, ['Curso', 1])
    grades = _.orderBy(grades, 'periodoInicio', 'desc')
    pedidos = _.filter(listaPedidos, ['Curso', 1])
    pedidosExternos = _.filter(listaPedidosExternos, ['Curso', 1])
    for (let i = 0; ((i < grades.length) && (inicio <= 10)); i++) {
        //grade
        grade = grades[i].id
        //inicio
        if(i===0)
            inicio = 1
        else
            inicio = fim+1
        //fim
        if(i+1 === grades.length)
            fim = 10
        else
        if(i==0)
            fim = 1 + 2*(ano - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (semestre - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
        else
            fim = inicio - 1 + 2*(parseInt(grades[i-1].periodoInicio.slice(0,4), 10) - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (parseInt(grades[i-1].periodoInicio.slice(5,6), 10) - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
        for (let k = 0; k < disciplinaGrades.length; k++) {
            if ((disciplinaGrades[k].Grade == grade) && (isEven(disciplinaGrades[k].periodo) == this.evenCCN) && (disciplinaGrades[k].periodo >= parseInt(inicio, 10)) && (disciplinaGrades[k].periodo <= parseInt(fim, 10))) {
                for (let j = 0; j < turmas.length; j++) {
                    if (turmas[j].periodo===3 && turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                        for (let p = 0; p < pedidos.length; p++) {
                            if ((pedidos[p].vagasPeriodizadas > 0) && (pedidos[p].Turma == turmas[j].id)) {
                                ativos2.CCN[disciplinaGrades[k].periodo - 1].push(turmas[j])
                            }
                        }
                    }
                }
                for (let j = 0; j < turmasExternas.length; j++) {
                    if (turmasExternas[j].periodo===3 && turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                        for (let p = 0; p < pedidosExternos.length; p++) {
                            if ((pedidosExternos[p].vagasPeriodizadas > 0) && (pedidosExternos[p].Turma == turmasExternas[j].id)) {
                                ativos2.CCN[disciplinaGrades[k].periodo - 1].push(turmasExternas[j])
                            }
                        }
                    }
                }
            }
        }
    }


    //SI está selecionado
    grades = _.filter(listaGrades, ['Curso', 3])
    grades = _.orderBy(grades, 'periodoInicio', 'desc')
    pedidos = _.filter(listaPedidos, ['Curso', 3])
    pedidosExternos = _.filter(listaPedidosExternos, ['Curso', 3])
    for (let i = 0; ((i < grades.length) && (inicio <= 10)); i++) {
        //grade
        grade = grades[i].id
        //inicio
        if(i===0)
            inicio = 1
        else
            inicio = fim+1
        //fim
        if(i+1 === grades.length)
            fim = 10
        else
        if(i==0)
            fim = 1 + 2*(ano - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (semestre - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
        else
            fim = inicio - 1 + 2*(parseInt(grades[i-1].periodoInicio.slice(0,4), 10) - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (parseInt(grades[i-1].periodoInicio.slice(5,6), 10) - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
        for (let k = 0; k < disciplinaGrades.length; k++) {
            if ((disciplinaGrades[k].Grade == grade) && (isEven(disciplinaGrades[k].periodo) == this.evenSI) && (disciplinaGrades[k].periodo >= parseInt(inicio, 10)) && (disciplinaGrades[k].periodo <= parseInt(fim, 10))) {
                for (let j = 0; j < turmas.length; j++) {
                    if (turmas[j].periodo===3 && turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                        for (let p = 0; p < pedidos.length; p++) {
                            if ((pedidos[p].vagasPeriodizadas > 0) && (pedidos[p].Turma == turmas[j].id)) {
                                ativos2.SI[disciplinaGrades[k].periodo - 1].push(turmas[j])
                            }
                        }
                    }
                }
                for (let j = 0; j < turmasExternas.length; j++) {
                    if (turmasExternas[j].periodo===3 && turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                        for (let p = 0; p < pedidosExternos.length; p++) {
                            if ((pedidosExternos[p].vagasPeriodizadas > 0) && (pedidosExternos[p].Turma == turmasExternas[j].id)) {
                                ativos2.SI[disciplinaGrades[k].periodo - 1].push(turmasExternas[j])
                            }
                        }
                    }
                }
            }
        }
    }


    //Engenharia Computacional está selecionado
    grades = _.filter(listaGrades, ['Curso', 2])
    grades = _.orderBy(grades, 'periodoInicio', 'desc')
    pedidos = _.filter(listaPedidos, ['Curso', 2])
    pedidosExternos = _.filter(listaPedidosExternos, ['Curso', 2])
    for (let i = 0; ((i < grades.length) && (inicio <= 10)); i++) {
        //grade
        grade = grades[i].id
        //inicio
        if(i===0)
            inicio = 1
        else
            inicio = fim+1
        //fim
        if(i+1 === grades.length)
            fim = 10
        else
        if(i==0)
            fim = 1 + 2*(ano - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (semestre - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
        else
            fim = inicio - 1 + 2*(parseInt(grades[i-1].periodoInicio.slice(0,4), 10) - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (parseInt(grades[i-1].periodoInicio.slice(5,6), 10) - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
        for (let k = 0; k < disciplinaGrades.length; k++) {
            if ((disciplinaGrades[k].Grade == grade) && (isEven(disciplinaGrades[k].periodo) == this.evenEC) && (disciplinaGrades[k].periodo >= parseInt(inicio, 10)) && (disciplinaGrades[k].periodo <= parseInt(fim, 10))) {
                for (let j = 0; j < turmas.length; j++) {
                    if (turmas[j].periodo===3 && turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                        for (let p = 0; p < pedidos.length; p++) {
                            if ((pedidos[p].vagasPeriodizadas > 0) && (pedidos[p].Turma == turmas[j].id)) {
                                ativos2.EC[disciplinaGrades[k].periodo - 1].push(turmas[j])
                            }
                        }
                    }
                }
                for (let j = 0; j < turmasExternas.length; j++) {
                    if (turmasExternas[j].periodo===3 && turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                        for (let p = 0; p < pedidosExternos.length; p++) {
                            if ((pedidosExternos[p].vagasPeriodizadas > 0) && (pedidosExternos[p].Turma == turmasExternas[j].id)) {
                                ativos2.EC[disciplinaGrades[k].periodo - 1].push(turmasExternas[j])
                            }
                        }
                    }
                }
            }
        }
    }

    //Eletivas está selecionado:
    let eletiva = true
    for(let t = 0; t<turmas.length;t++){
        for(let d = 0; d<disciplinaGrades.length; d++){
            if(turmas[t].periodo!=3 || turmas[t].Disciplina===disciplinaGrades[d].Disciplina){
                eletiva = false
            }
        }
        if(eletiva){
            ativos2.Eletivas.push(turmas[t])
        }else{
            eletiva = true
        }
    }

    return ativos2

}

const pdfResumoHorarios = () => new Promise((resolve, reject) =>  {

    var anoAtual = (_.isEmpty(this.Plano)?2019:this.Plano[0].ano)

    this.ativos1 = createHorarios1(anoAtual, 1, this.DisciplinasGrade, this.Turmas, this.TurmasExternas, this.Cursos, this.Grades, this.Pedidos, this.PedidosExternos)
    this.ativos2 = createHorarios2(anoAtual, 3, this.DisciplinasGrade, this.Turmas, this.TurmasExternas, this.Cursos, this.Grades, this.Pedidos, this.PedidosExternos)

    var tables = []
    var disciplinas = this.Disciplinas
    var periodosCCD1 = this.ativos1.CCD
    var periodosCCN1 = this.ativos1.CCN
    var periodosEC1 = this.ativos1.EC
    var periodosSI1 = this.ativos1.SI
    var eletivas1 = this.ativos1.Eletivas
    var seg = '', ter = '', qua = '', qui = '', sex = ''
    var vazio = 0
    tables.push({text:'1º Semestre', bold:true, margin:[0, 10, 0, 5], fontSize: 20})
    tables.push({text:'Ciência da Computação Diurno', bold:true, margin:[0, 10, 0, 5], fontSize: 20})

    for(var i = 0; i < 10; i++){
        if(periodosCCD1[i].length===0){
            vazio = vazio + 1
        }else {
            tables.push({text: (i + 1) + 'º Período', bold: true, margin:[0, 5, 0, 5]})
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
            for (var d = 0; d < 4; d++) {
                for (var j = 0; j < periodosCCD1[i].length; j++) {
                    if (checkTurmaHorario(periodosCCD1[i][j], 1 + d)) {
                        for (var k = 0; k < disciplinas.length; k++) {
                            if (periodosCCD1[i][j].Disciplina === disciplinas[k].id) {
                                if (seg !== '')
                                    seg = seg + ' '
                                seg = seg + disciplinas[k].codigo + ' ' + periodosCCD1[i][j].letra
                            }
                        }
                    }
                    if (checkTurmaHorario(periodosCCD1[i][j], 7 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosCCD1[i][j].Disciplina === disciplinas[k].id) {
                                if (ter != '')
                                    ter = ter + ' '
                                ter = ter + disciplinas[k].codigo + ' ' + periodosCCD1[i][j].letra
                            }
                        }
                    }
                    if (checkTurmaHorario(periodosCCD1[i][j], 13 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosCCD1[i][j].Disciplina === disciplinas[k].id) {
                                if (qua != '')
                                    qua = qua + ' '
                                qua = qua + disciplinas[k].codigo + ' ' + periodosCCD1[i][j].letra
                            }
                        }
                    }
                    if (checkTurmaHorario(periodosCCD1[i][j], 19 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosCCD1[i][j].Disciplina === disciplinas[k].id) {
                                if (qui != '')
                                    qui = qui + ' '
                                qui = qui + disciplinas[k].codigo + ' ' + periodosCCD1[i][j].letra
                            }
                        }
                    }
                    if (checkTurmaHorario(periodosCCD1[i][j], 25 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosCCD1[i][j].Disciplina === disciplinas[k].id) {
                                if (sex != '')
                                    sex = sex + ' '
                                sex = sex + disciplinas[k].codigo + ' ' + periodosCCD1[i][j].letra
                            }
                        }
                    }
                }

                switch (d) {
                    case 0:
                        tables[3 + 2 * (i-vazio)].table.body.push([{
                            text: '08 - 10',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 1:
                        tables[3 + 2 * (i-vazio)].table.body.push([{
                            text: '10 - 12',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 2:
                        tables[3 + 2 * (i-vazio)].table.body.push([{
                            text: '14 - 16',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 3:
                        tables[3 + 2 * (i-vazio)].table.body.push([{
                            text: '16 - 18',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 4:
                        tables[3 + 2 * (i-vazio)].table.body.push([{
                            text: '19 - 21',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 5:
                        tables[3 + 2 * (i-vazio)].table.body.push([{
                            text: '21 - 23',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                }
                seg = ter = qua = qui = sex = ''
            }
        }
    }

    tables.push({text:'Ciência da Computação Noturno', bold:true, margin:[0, 10, 0, 5], fontSize: 20, pageBreak:'before'})

    for(var i = 0; i < 10; i++){
        if(periodosCCN1[i].length===0){
            vazio = vazio + 1
        }else {
            tables.push({text: (i + 1) + 'º Período', bold: true, margin:[0, 5, 0, 5]})
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
            for (var d = 4; d < 6; d++) {
                for (var j = 0; j < periodosCCN1[i].length; j++) {
                    if (checkTurmaHorario(periodosCCN1[i][j], 1 + d)) {
                        for (var k = 0; k < disciplinas.length; k++) {
                            if (periodosCCN1[i][j].Disciplina === disciplinas[k].id) {
                                if (seg !== '')
                                    seg = seg + ' '
                                seg = seg + disciplinas[k].codigo + ' ' + periodosCCN1[i][j].letra
                            }
                        }
                    }
                    if (checkTurmaHorario(periodosCCN1[i][j], 7 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosCCN1[i][j].Disciplina === disciplinas[k].id) {
                                if (ter != '')
                                    ter = ter + ' '
                                ter = ter + disciplinas[k].codigo + ' ' + periodosCCN1[i][j].letra
                            }
                        }
                    }
                    if (checkTurmaHorario(periodosCCN1[i][j], 13 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosCCN1[i][j].Disciplina === disciplinas[k].id) {
                                if (qua != '')
                                    qua = qua + ' '
                                qua = qua + disciplinas[k].codigo + ' ' + periodosCCN1[i][j].letra
                            }
                        }
                    }
                    if (checkTurmaHorario(periodosCCN1[i][j], 19 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosCCN1[i][j].Disciplina === disciplinas[k].id) {
                                if (qui != '')
                                    qui = qui + ' '
                                qui = qui + disciplinas[k].codigo + ' ' + periodosCCN1[i][j].letra
                            }
                        }
                    }
                    if (checkTurmaHorario(periodosCCN1[i][j], 25 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosCCN1[i][j].Disciplina === disciplinas[k].id) {
                                if (sex != '')
                                    sex = sex + ' '
                                sex = sex + disciplinas[k].codigo + ' ' + periodosCCN1[i][j].letra
                            }
                        }
                    }
                }

                switch (d) {
                    case 0:
                        tables[24 + 2 * (i-vazio)].table.body.push([{
                            text: '08 - 10',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 1:
                        tables[24 + 2 * (i-vazio)].table.body.push([{
                            text: '10 - 12',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 2:
                        tables[24 + 2 * (i-vazio)].table.body.push([{
                            text: '14 - 16',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 3:
                        tables[24 + 2 * (i-vazio)].table.body.push([{
                            text: '16 - 18',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 4:
                        tables[24 + 2 * (i-vazio)].table.body.push([{
                            text: '19 - 21',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 5:
                        tables[24 + 2 * (i-vazio)].table.body.push([{
                            text: '21 - 23',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                }
                seg = ter = qua = qui = sex = ''
            }
        }
    }

    tables.push({text:'Engenharia Computacional', bold:true, margin:[0, 10, 0, 5], fontSize: 20, pageBreak:'before'})

    for(var i = 0; i < 10; i++){
        if(periodosEC1[i].length===0){
            vazio = vazio + 1
        }else {
            tables.push({text: (i + 1) + 'º Período', bold: true, margin:[0, 5, 0, 5]})
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
            for (var d = 0; d < 4; d++) {
                for (var j = 0; j < periodosEC1[i].length; j++) {
                    if (checkTurmaHorario(periodosEC1[i][j], 1 + d)) {
                        for (var k = 0; k < disciplinas.length; k++) {
                            if (periodosEC1[i][j].Disciplina === disciplinas[k].id) {
                                if (seg !== '')
                                    seg = seg + ' '
                                seg = seg + disciplinas[k].codigo + ' ' + periodosEC1[i][j].letra
                            }
                        }
                    }
                    if (checkTurmaHorario(periodosEC1[i][j], 7 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosEC1[i][j].Disciplina === disciplinas[k].id) {
                                if (ter != '')
                                    ter = ter + ' '
                                ter = ter + disciplinas[k].codigo + ' ' + periodosEC1[i][j].letra
                            }
                        }
                    }
                    if (checkTurmaHorario(periodosEC1[i][j], 13 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosEC1[i][j].Disciplina === disciplinas[k].id) {
                                if (qua != '')
                                    qua = qua + ' '
                                qua = qua + disciplinas[k].codigo + ' ' + periodosEC1[i][j].letra
                            }
                        }
                    }
                    if (checkTurmaHorario(periodosEC1[i][j], 19 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosEC1[i][j].Disciplina === disciplinas[k].id) {
                                if (qui != '')
                                    qui = qui + ' '
                                qui = qui + disciplinas[k].codigo + ' ' + periodosEC1[i][j].letra
                            }
                        }
                    }
                    if (checkTurmaHorario(periodosEC1[i][j], 25 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosEC1[i][j].Disciplina === disciplinas[k].id) {
                                if (sex != '')
                                    sex = sex + ' '
                                sex = sex + disciplinas[k].codigo + ' ' + periodosEC1[i][j].letra
                            }
                        }
                    }
                }

                switch (d) {
                    case 0:
                        tables[45 + 2 * (i-vazio)].table.body.push([{
                            text: '08 - 10',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 1:
                        tables[45 + 2 * (i-vazio)].table.body.push([{
                            text: '10 - 12',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 2:
                        tables[45 + 2 * (i-vazio)].table.body.push([{
                            text: '14 - 16',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 3:
                        tables[45 + 2 * (i-vazio)].table.body.push([{
                            text: '16 - 18',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 4:
                        tables[45 + 2 * (i-vazio)].table.body.push([{
                            text: '19 - 21',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 5:
                        tables[45 + 2 * (i-vazio)].table.body.push([{
                            text: '21 - 23',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                }
                seg = ter = qua = qui = sex = ''
            }
        }
    }

    tables.push({text:'Sistemas de Informação', bold:true, margin:[0, 10, 0, 5], fontSize: 20, pageBreak:'before'})

    for(var i = 0; i < 10; i++){
        if(periodosSI1[i].length===0){
            vazio = vazio + 1
        }else {
            tables.push({text: (i + 1) + 'º Período', bold: true, margin:[0, 5, 0, 5]})
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
            for (var d = 4; d < 6; d++) {
                for (var j = 0; j < periodosSI1[i].length; j++) {
                    if (checkTurmaHorario(periodosSI1[i][j], 1 + d)) {
                        for (var k = 0; k < disciplinas.length; k++) {
                            if (periodosSI1[i][j].Disciplina === disciplinas[k].id) {
                                if (seg !== '')
                                    seg = seg + ' '
                                seg = seg + disciplinas[k].codigo + ' ' + periodosSI1[i][j].letra
                            }
                        }
                    }
                    if (checkTurmaHorario(periodosSI1[i][j], 7 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosSI1[i][j].Disciplina === disciplinas[k].id) {
                                if (ter != '')
                                    ter = ter + ' '
                                ter = ter + disciplinas[k].codigo + ' ' + periodosSI1[i][j].letra
                            }
                        }
                    }
                    if (checkTurmaHorario(periodosSI1[i][j], 13 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosSI1[i][j].Disciplina === disciplinas[k].id) {
                                if (qua != '')
                                    qua = qua + ' '
                                qua = qua + disciplinas[k].codigo + ' ' + periodosSI1[i][j].letra
                            }
                        }
                    }
                    if (checkTurmaHorario(periodosSI1[i][j], 19 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosSI1[i][j].Disciplina === disciplinas[k].id) {
                                if (qui != '')
                                    qui = qui + ' '
                                qui = qui + disciplinas[k].codigo + ' ' + periodosSI1[i][j].letra
                            }
                        }
                    }
                    if (checkTurmaHorario(periodosSI1[i][j], 25 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosSI1[i][j].Disciplina === disciplinas[k].id) {
                                if (sex != '')
                                    sex = sex + ' '
                                sex = sex + disciplinas[k].codigo + ' ' + periodosSI1[i][j].letra
                            }
                        }
                    }
                }

                switch (d) {
                    case 0:
                        tables[66 + 2 * (i-vazio)].table.body.push([{
                            text: '08 - 10',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 1:
                        tables[66 + 2 * (i-vazio)].table.body.push([{
                            text: '10 - 12',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 2:
                        tables[66 + 2 * (i-vazio)].table.body.push([{
                            text: '14 - 16',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 3:
                        tables[66 + 2 * (i-vazio)].table.body.push([{
                            text: '16 - 18',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 4:
                        tables[66 + 2 * (i-vazio)].table.body.push([{
                            text: '19 - 21',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 5:
                        tables[66 + 2 * (i-vazio)].table.body.push([{
                            text: '21 - 23',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                }
                seg = ter = qua = qui = sex = ''
            }
        }
    }

    tables.push({text:'Eletivas', bold:true, margin:[0, 10, 0, 5], fontSize: 20, pageBreak:'before'})

    if(eletivas1.length===0){
        vazio = vazio + 1
    }else {
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
        for (var d = 0; d < 6; d++) {
            for (var j = 0; j < eletivas1.length; j++) {
                if (checkTurmaHorario(eletivas1[j], 1 + d)) {
                    for (var k = 0; k < disciplinas.length; k++) {
                        if (eletivas1[j].Disciplina === disciplinas[k].id) {
                            if (seg !== '')
                                seg = seg + ' '
                            seg = seg + disciplinas[k].codigo + ' ' + eletivas1[j].letra
                        }
                    }
                }
                if (checkTurmaHorario(eletivas1[j], 7 + d)) {
                    for (k = 0; k < disciplinas.length; k++) {
                        if (eletivas1[j].Disciplina === disciplinas[k].id) {
                            if (ter != '')
                                ter = ter + ' '
                            ter = ter + disciplinas[k].codigo + ' ' + eletivas1[j].letra
                        }
                    }
                }
                if (checkTurmaHorario(eletivas1[j], 13 + d)) {
                    for (k = 0; k < disciplinas.length; k++) {
                        if (eletivas1[j].Disciplina === disciplinas[k].id) {
                            if (qua != '')
                                qua = qua + ' '
                            qua = qua + disciplinas[k].codigo + ' ' + eletivas1[j].letra
                        }
                    }
                }
                if (checkTurmaHorario(eletivas1[j], 19 + d)) {
                    for (k = 0; k < disciplinas.length; k++) {
                        if (eletivas1[j].Disciplina === disciplinas[k].id) {
                            if (qui != '')
                                qui = qui + ' '
                            qui = qui + disciplinas[k].codigo + ' ' + eletivas1[j].letra
                        }
                    }
                }
                if (checkTurmaHorario(eletivas1[j], 25 + d)) {
                    for (k = 0; k < disciplinas.length; k++) {
                        if (eletivas1[j].Disciplina === disciplinas[k].id) {
                            if (sex != '')
                                sex = sex + ' '
                            sex = sex + disciplinas[k].codigo + ' ' + eletivas1[j].letra
                        }
                    }
                }
            }

            switch (d) {
                case 0:
                    tables[86 - 2 * vazio].table.body.push([{
                        text: '08 - 10',
                        alignment: 'center'
                    }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                        text: qua,
                        alignment: 'center'
                    }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                    break
                case 1:
                    tables[86 - 2 * vazio].table.body.push([{
                        text: '10 - 12',
                        alignment: 'center'
                    }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                        text: qua,
                        alignment: 'center'
                    }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                    break
                case 2:
                    tables[86 - 2 * vazio].table.body.push([{
                        text: '14 - 16',
                        alignment: 'center'
                    }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                        text: qua,
                        alignment: 'center'
                    }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                    break
                case 3:
                    tables[86 - 2 * vazio].table.body.push([{
                        text: '16 - 18',
                        alignment: 'center'
                    }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                        text: qua,
                        alignment: 'center'
                    }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                    break
                case 4:
                    tables[86 - 2 * vazio].table.body.push([{
                        text: '19 - 21',
                        alignment: 'center'
                    }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                        text: qua,
                        alignment: 'center'
                    }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                    break
                case 5:
                    tables[86 - 2 * vazio].table.body.push([{
                        text: '21 - 23',
                        alignment: 'center'
                    }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                        text: qua,
                        alignment: 'center'
                    }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                    break
            }
            seg = ter = qua = qui = sex = ''
        }
    }

    var periodosCCD2 = this.ativos2.CCD
    var periodosCCN2 = this.ativos2.CCN
    var periodosEC2 = this.ativos2.EC
    var periodosSI2 = this.ativos2.SI
    var eletivas2 = this.ativos2.Eletivas


    tables.push({text:'2º Semestre', bold:true, margin:[0, 10, 0, 5], fontSize: 20, pageBreak:'before'})
    tables.push({text:'Ciência da Computação Diurno', bold:true, margin:[0, 10, 0, 5], fontSize: 20})

    for(var i = 0; i < 10; i++){
        if(periodosCCD2[i].length===0){
            vazio = vazio + 1
        }else {
            tables.push({text: (i + 1) + 'º Período', bold: true, margin:[0, 5, 0, 5]})
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
            for (var d = 0; d < 4; d++) {
                for (var j = 0; j < periodosCCD2[i].length; j++) {
                    if (checkTurmaHorario(periodosCCD2[i][j], 1 + d)) {
                        for (var k = 0; k < disciplinas.length; k++) {
                            if (periodosCCD2[i][j].Disciplina === disciplinas[k].id) {
                                if (seg !== '')
                                    seg = seg + ' '
                                seg = seg + disciplinas[k].codigo + ' ' + periodosCCD2[i][j].letra
                            }
                        }
                    }
                    if (checkTurmaHorario(periodosCCD2[i][j], 7 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosCCD2[i][j].Disciplina === disciplinas[k].id) {
                                if (ter != '')
                                    ter = ter + ' '
                                ter = ter + disciplinas[k].codigo + ' ' + periodosCCD2[i][j].letra
                            }
                        }
                    }
                    if (checkTurmaHorario(periodosCCD2[i][j], 13 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosCCD2[i][j].Disciplina === disciplinas[k].id) {
                                if (qua != '')
                                    qua = qua + ' '
                                qua = qua + disciplinas[k].codigo + ' ' + periodosCCD2[i][j].letra
                            }
                        }
                    }
                    if (checkTurmaHorario(periodosCCD2[i][j], 19 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosCCD2[i][j].Disciplina === disciplinas[k].id) {
                                if (qui != '')
                                    qui = qui + ' '
                                qui = qui + disciplinas[k].codigo + ' ' + periodosCCD2[i][j].letra
                            }
                        }
                    }
                    if (checkTurmaHorario(periodosCCD2[i][j], 25 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosCCD2[i][j].Disciplina === disciplinas[k].id) {
                                if (sex != '')
                                    sex = sex + ' '
                                sex = sex + disciplinas[k].codigo + ' ' + periodosCCD2[i][j].letra
                            }
                        }
                    }
                }

                switch (d) {
                    case 0:
                        tables[90 + 2 * (i-vazio)].table.body.push([{
                            text: '08 - 10',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 1:
                        tables[90 + 2 * (i-vazio)].table.body.push([{
                            text: '10 - 12',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 2:
                        tables[90 + 2 * (i-vazio)].table.body.push([{
                            text: '14 - 16',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 3:
                        tables[90 + 2 * (i-vazio)].table.body.push([{
                            text: '16 - 18',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 4:
                        tables[90 + 2 * (i-vazio)].table.body.push([{
                            text: '19 - 21',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 5:
                        tables[90 + 2 * (i-vazio)].table.body.push([{
                            text: '21 - 23',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                }
                seg = ter = qua = qui = sex = ''
            }
        }
    }

    tables.push({text:'Ciência da Computação Noturno', bold:true, margin:[0, 10, 0, 5], fontSize: 20, pageBreak:'before'})

    for(var i = 0; i < 10; i++){
        if(periodosCCN2[i].length===0){
            vazio = vazio + 1
        }else {
            tables.push({text: (i + 1) + 'º Período', bold: true, margin:[0, 5, 0, 5]})
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
            for (var d = 4; d < 6; d++) {
                for (var j = 0; j < periodosCCN2[i].length; j++) {
                    if (checkTurmaHorario(periodosCCN2[i][j], 1 + d)) {
                        for (var k = 0; k < disciplinas.length; k++) {
                            if (periodosCCN2[i][j].Disciplina === disciplinas[k].id) {
                                if (seg !== '')
                                    seg = seg + ' '
                                seg = seg + disciplinas[k].codigo + ' ' + periodosCCN2[i][j].letra
                            }
                        }
                    }
                    if (checkTurmaHorario(periodosCCN2[i][j], 7 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosCCN2[i][j].Disciplina === disciplinas[k].id) {
                                if (ter != '')
                                    ter = ter + ' '
                                ter = ter + disciplinas[k].codigo + ' ' + periodosCCN2[i][j].letra
                            }
                        }
                    }
                    if (checkTurmaHorario(periodosCCN2[i][j], 13 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosCCN2[i][j].Disciplina === disciplinas[k].id) {
                                if (qua != '')
                                    qua = qua + ' '
                                qua = qua + disciplinas[k].codigo + ' ' + periodosCCN2[i][j].letra
                            }
                        }
                    }
                    if (checkTurmaHorario(periodosCCN2[i][j], 19 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosCCN2[i][j].Disciplina === disciplinas[k].id) {
                                if (qui != '')
                                    qui = qui + ' '
                                qui = qui + disciplinas[k].codigo + ' ' + periodosCCN2[i][j].letra
                            }
                        }
                    }
                    if (checkTurmaHorario(periodosCCN2[i][j], 25 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosCCN2[i][j].Disciplina === disciplinas[k].id) {
                                if (sex != '')
                                    sex = sex + ' '
                                sex = sex + disciplinas[k].codigo + ' ' + periodosCCN2[i][j].letra
                            }
                        }
                    }
                }

                switch (d) {
                    case 0:
                        tables[111 + 2 * (i-vazio)].table.body.push([{
                            text: '08 - 10',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 1:
                        tables[111 + 2 * (i-vazio)].table.body.push([{
                            text: '10 - 12',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 2:
                        tables[111 + 2 * (i-vazio)].table.body.push([{
                            text: '14 - 16',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 3:
                        tables[111 + 2 * (i-vazio)].table.body.push([{
                            text: '16 - 18',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 4:
                        tables[111 + 2 * (i-vazio)].table.body.push([{
                            text: '19 - 21',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 5:
                        tables[111 + 2 * (i-vazio)].table.body.push([{
                            text: '21 - 23',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                }
                seg = ter = qua = qui = sex = ''
            }
        }
    }

    tables.push({text:'Engenharia Computacional', bold:true, margin:[0, 10, 0, 5], fontSize: 20, pageBreak:'before'})

    for(var i = 0; i < 10; i++){
        if(periodosEC2[i].length===0){
            vazio = vazio + 1
        }else {
            tables.push({text: (i + 1) + 'º Período', bold: true, margin:[0, 5, 0, 5]})
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
            for (var d = 0; d < 4; d++) {
                for (var j = 0; j < periodosEC2[i].length; j++) {
                    if (checkTurmaHorario(periodosEC2[i][j], 1 + d)) {
                        for (var k = 0; k < disciplinas.length; k++) {
                            if (periodosEC2[i][j].Disciplina === disciplinas[k].id) {
                                if (seg !== '')
                                    seg = seg + ' '
                                seg = seg + disciplinas[k].codigo + ' ' + periodosEC2[i][j].letra
                            }
                        }
                    }
                    if (checkTurmaHorario(periodosEC2[i][j], 7 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosEC2[i][j].Disciplina === disciplinas[k].id) {
                                if (ter != '')
                                    ter = ter + ' '
                                ter = ter + disciplinas[k].codigo + ' ' + periodosEC2[i][j].letra
                            }
                        }
                    }
                    if (checkTurmaHorario(periodosEC2[i][j], 13 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosEC2[i][j].Disciplina === disciplinas[k].id) {
                                if (qua != '')
                                    qua = qua + ' '
                                qua = qua + disciplinas[k].codigo + ' ' + periodosEC2[i][j].letra
                            }
                        }
                    }
                    if (checkTurmaHorario(periodosEC2[i][j], 19 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosEC2[i][j].Disciplina === disciplinas[k].id) {
                                if (qui != '')
                                    qui = qui + ' '
                                qui = qui + disciplinas[k].codigo + ' ' + periodosEC2[i][j].letra
                            }
                        }
                    }
                    if (checkTurmaHorario(periodosEC2[i][j], 25 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosEC2[i][j].Disciplina === disciplinas[k].id) {
                                if (sex != '')
                                    sex = sex + ' '
                                sex = sex + disciplinas[k].codigo + ' ' + periodosEC2[i][j].letra
                            }
                        }
                    }
                }

                switch (d) {
                    case 0:
                        tables[132 + 2 * (i-vazio)].table.body.push([{
                            text: '08 - 10',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 1:
                        tables[132 + 2 * (i-vazio)].table.body.push([{
                            text: '10 - 12',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 2:
                        tables[132 + 2 * (i-vazio)].table.body.push([{
                            text: '14 - 16',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 3:
                        tables[132 + 2 * (i-vazio)].table.body.push([{
                            text: '16 - 18',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 4:
                        tables[132 + 2 * (i-vazio)].table.body.push([{
                            text: '19 - 21',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 5:
                        tables[132 + 2 * (i-vazio)].table.body.push([{
                            text: '21 - 23',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                }
                seg = ter = qua = qui = sex = ''
            }
        }
    }

    tables.push({text:'Sistemas de Informação', bold:true, margin:[0, 10, 0, 5], fontSize: 20, pageBreak:'before'})

    for(var i = 0; i < 10; i++){
        if(periodosSI2[i].length===0){
            vazio = vazio + 1
        }else {
            tables.push({text: (i + 1) + 'º Período', bold: true, margin:[0, 5, 0, 5]})
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
            for (var d = 4; d < 6; d++) {
                for (var j = 0; j < periodosSI2[i].length; j++) {
                    if (checkTurmaHorario(periodosSI2[i][j], 1 + d)) {
                        for (var k = 0; k < disciplinas.length; k++) {
                            if (periodosSI2[i][j].Disciplina === disciplinas[k].id) {
                                if (seg !== '')
                                    seg = seg + ' '
                                seg = seg + disciplinas[k].codigo + ' ' + periodosSI2[i][j].letra
                            }
                        }
                    }
                    if (checkTurmaHorario(periodosSI2[i][j], 7 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosSI2[i][j].Disciplina === disciplinas[k].id) {
                                if (ter != '')
                                    ter = ter + ' '
                                ter = ter + disciplinas[k].codigo + ' ' + periodosSI2[i][j].letra
                            }
                        }
                    }
                    if (checkTurmaHorario(periodosSI2[i][j], 13 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosSI2[i][j].Disciplina === disciplinas[k].id) {
                                if (qua != '')
                                    qua = qua + ' '
                                qua = qua + disciplinas[k].codigo + ' ' + periodosSI2[i][j].letra
                            }
                        }
                    }
                    if (checkTurmaHorario(periodosSI2[i][j], 19 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosSI2[i][j].Disciplina === disciplinas[k].id) {
                                if (qui != '')
                                    qui = qui + ' '
                                qui = qui + disciplinas[k].codigo + ' ' + periodosSI2[i][j].letra
                            }
                        }
                    }
                    if (checkTurmaHorario(periodosSI2[i][j], 25 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosSI2[i][j].Disciplina === disciplinas[k].id) {
                                if (sex != '')
                                    sex = sex + ' '
                                sex = sex + disciplinas[k].codigo + ' ' + periodosSI2[i][j].letra
                            }
                        }
                    }
                }

                switch (d) {
                    case 0:
                        tables[153 + 2 * (i-vazio)].table.body.push([{
                            text: '08 - 10',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 1:
                        tables[153 + 2 * (i-vazio)].table.body.push([{
                            text: '10 - 12',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 2:
                        tables[153 + 2 * (i-vazio)].table.body.push([{
                            text: '14 - 16',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 3:
                        tables[153 + 2 * (i-vazio)].table.body.push([{
                            text: '16 - 18',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 4:
                        tables[153 + 2 * (i-vazio)].table.body.push([{
                            text: '19 - 21',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 5:
                        tables[153 + 2 * (i-vazio)].table.body.push([{
                            text: '21 - 23',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                }
                seg = ter = qua = qui = sex = ''
            }
        }
    }

    tables.push({text:'Eletivas', bold:true, margin:[0, 10, 0, 5], fontSize: 20, pageBreak:'before'})

    if(eletivas2.length===0){
        vazio = vazio + 1
    }else {
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
        for (var d = 0; d < 6; d++) {
            for (var j = 0; j < eletivas2.length; j++) {
                if (checkTurmaHorario(eletivas2[j], 1 + d)) {
                    for (var k = 0; k < disciplinas.length; k++) {
                        if (eletivas2[j].Disciplina === disciplinas[k].id) {
                            if (seg !== '')
                                seg = seg + ' '
                            seg = seg + disciplinas[k].codigo + ' ' + eletivas2[j].letra
                        }
                    }
                }
                if (checkTurmaHorario(eletivas2[j], 7 + d)) {
                    for (k = 0; k < disciplinas.length; k++) {
                        if (eletivas2[j].Disciplina === disciplinas[k].id) {
                            if (ter != '')
                                ter = ter + ' '
                            ter = ter + disciplinas[k].codigo + ' ' + eletivas2[j].letra
                        }
                    }
                }
                if (checkTurmaHorario(eletivas2[j], 13 + d)) {
                    for (k = 0; k < disciplinas.length; k++) {
                        if (eletivas2[j].Disciplina === disciplinas[k].id) {
                            if (qua != '')
                                qua = qua + ' '
                            qua = qua + disciplinas[k].codigo + ' ' + eletivas2[j].letra
                        }
                    }
                }
                if (checkTurmaHorario(eletivas2[j], 19 + d)) {
                    for (k = 0; k < disciplinas.length; k++) {
                        if (eletivas2[j].Disciplina === disciplinas[k].id) {
                            if (qui != '')
                                qui = qui + ' '
                            qui = qui + disciplinas[k].codigo + ' ' + eletivas2[j].letra
                        }
                    }
                }
                if (checkTurmaHorario(eletivas2[j], 25 + d)) {
                    for (k = 0; k < disciplinas.length; k++) {
                        if (eletivas2[j].Disciplina === disciplinas[k].id) {
                            if (sex != '')
                                sex = sex + ' '
                            sex = sex + disciplinas[k].codigo + ' ' + eletivas2[j].letra
                        }
                    }
                }
            }

            switch (d) {
                case 0:
                    tables[173 - 2 * vazio].table.body.push([{
                        text: '08 - 10',
                        alignment: 'center'
                    }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                        text: qua,
                        alignment: 'center'
                    }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                    break
                case 1:
                    tables[173 - 2 * vazio].table.body.push([{
                        text: '10 - 12',
                        alignment: 'center'
                    }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                        text: qua,
                        alignment: 'center'
                    }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                    break
                case 2:
                    tables[173 - 2 * vazio].table.body.push([{
                        text: '14 - 16',
                        alignment: 'center'
                    }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                        text: qua,
                        alignment: 'center'
                    }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                    break
                case 3:
                    tables[173 - 2 * vazio].table.body.push([{
                        text: '16 - 18',
                        alignment: 'center'
                    }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                        text: qua,
                        alignment: 'center'
                    }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                    break
                case 4:
                    tables[173 - 2 * vazio].table.body.push([{
                        text: '19 - 21',
                        alignment: 'center'
                    }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                        text: qua,
                        alignment: 'center'
                    }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                    break
                case 5:
                    tables[173 - 2 * vazio].table.body.push([{
                        text: '21 - 23',
                        alignment: 'center'
                    }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                        text: qua,
                        alignment: 'center'
                    }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                    break
            }
            seg = ter = qua = qui = sex = ''
        }
    }


    console.log("Criando Documento")
    let docDefinitionHorario = {
        content: tables,
        header: {text:new Date(Date.now()).toLocaleString(), margin:[40, 20, 0, 0], fontSize:10}
    }

    let printer = new PdfPrinter(fonts);

    console.log("Criando PDF")
    let pdfDocHorario = printer.createPdfKitDocument(docDefinitionHorario);
    let horariosStream = fs.createWriteStream('Horarios.pdf')
    horariosStream.on("finish", resolve)
    pdfDocHorario.pipe(horariosStream);
    pdfDocHorario.end()

})

module.exports = Pdfs;