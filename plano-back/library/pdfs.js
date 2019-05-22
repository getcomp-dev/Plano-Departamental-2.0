
const models = require('../models/index'),
      _ = require('lodash')

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

Pdfs.prototype.ready = async function(){
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
    console.log('Resolvendo Promises')
    Promise.all([this.Salas, this.Disciplinas, this.Turmas, this.Cargas, this.Docentes, this.Horarios, this.Grades, this.DisciplinasGrade, this.TurmasExternas, this.Pedidos, this.PedidosExternos, this.Plano]).then(result => {
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
        console.log('Dados inicializados')
        this.pdfAlocacaoLabs()
        this.pdfCargaProfessores()
        this.pdfResumoHorarios()
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
                    if(checkTurmaHorario(turmas[j], 1 + d)){
                        for(var k = 0; k < disciplinas.length; k++){
                            if(turmas[j].Disciplina === disciplinas[k].id){
                                if(seg !== '')
                                    seg = seg + ' '
                                seg = seg + disciplinas[k].codigo + ' ' + turmas[j].letra
                            }
                        }
                    }
                    if(checkTurmaHorario(turmas[j], 7 + d)){
                        for(k = 0; k < disciplinas.length; k++){
                            if(turmas[j].Disciplina === disciplinas[k].id){
                                if(ter != '')
                                    ter = ter + ' '
                                ter = ter + disciplinas[k].codigo + ' ' + turmas[j].letra
                            }
                        }
                    }
                    if(checkTurmaHorario(turmas[j], 13 + d)){
                        for(k = 0; k < disciplinas.length; k++){
                            if(turmas[j].Disciplina === disciplinas[k].id){
                                if(qua != '')
                                    qua = qua + ' '
                                qua = qua + disciplinas[k].codigo + ' ' + turmas[j].letra
                            }
                        }
                    }
                    if(checkTurmaHorario(turmas[j], 19 + d)){
                        for(k = 0; k < disciplinas.length; k++){
                            if(turmas[j].Disciplina === disciplinas[k].id){
                                if(qui != '')
                                    qui = qui + ' '
                                qui = qui + disciplinas[k].codigo + ' ' + turmas[j].letra
                            }
                        }
                    }
                    if(checkTurmaHorario(turmas[j], 25 + d)){
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

    var pdfDoc = printer.createPdfKitDocument(docDefinition);
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

Pdfs.prototype.pdfCargaProfessores = function() {

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

function isEven (number) {
    if(number%2===0)
        return 'true'
    else
        return 'false'
}

function createHorarios1 (ano, semestre, listaDisciplinasGrade, listaTurmas, listaTurmasExternas, listaCursos, listaGrades, listaPedidos, listaPedidosExternos) {
    var grade
    var grades
    var inicio = 1
    var fim
    var pedidos
    var pedidosExternos
    var disciplinaGrades = listaDisciplinasGrade
    var turmas = listaTurmas
    var turmasExternas = listaTurmasExternas

    console.log(this.ativos1)

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
    console.log([this.evenCCD, this.evenCCN, this.evenSI, this.evenEC])

    //CC Diurno
    grades = _.filter(listaGrades, ['Curso', 4])
    grades = _.orderBy(grades, 'periodoInicio', 'desc')
    pedidos = []
    for (var t in listaPedidos){
        for (var pedido in listaPedidos[t]){
            if(listaPedidos[t][pedido].Curso===4){
                pedidos.push(listaPedidos[t][pedido])
            }
        }
    }
    pedidosExternos = _.filter(listaPedidosExternos, ['Curso', 4])
    console.log(grades.length)

    for (var i = 0; ((i < grades.length) && (inicio <= 10)); i++) {
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
        for (var k = 0; k < disciplinaGrades.length; k++) {
            if ((disciplinaGrades[k].Grade == grade) && (this.isEven(disciplinaGrades[k].periodo) == this.evenCCD) && (disciplinaGrades[k].periodo >= parseInt(inicio, 10)) && (disciplinaGrades[k].periodo <= parseInt(fim, 10))) {
                for (var j = 0; j < turmas.length; j++) {
                    if (turmas[j].periodo===1 && turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                        for (var p = 0; p < pedidos.length; p++) {
                            if ((pedidos[p].vagasPeriodizadas > 0) && (pedidos[p].Turma == turmas[j].id)) {
                                this.ativos1.CCD[disciplinaGrades[k].periodo - 1].push(turmas[j])
                            }
                        }
                    }
                }
                for (var j = 0; j < turmasExternas.length; j++) {
                    if (turmasExternas[j].periodo===1 && turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                        for (var p = 0; p < pedidosExternos.length; p++) {
                            if ((pedidosExternos[p].vagasPeriodizadas > 0) && (pedidosExternos[p].Turma == turmasExternas[j].id)) {
                                this.ativos1.CCD[disciplinaGrades[k].periodo - 1].push(turmasExternas[j])
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
    pedidos = []
    for (var t in listaPedidos){
        for (var pedido in listaPedidos[t]){
            if(listaPedidos[t][pedido].Curso===1){
                pedidos.push(listaPedidos[t][pedido])
            }
        }
    }
    pedidosExternos = _.filter(listaPedidosExternos, ['Curso', 1])
    for (var i = 0; ((i < grades.length) && (inicio <= 10)); i++) {
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
        for (var k = 0; k < disciplinaGrades.length; k++) {
            if ((disciplinaGrades[k].Grade == grade) && (this.isEven(disciplinaGrades[k].periodo) == this.evenCCN) && (disciplinaGrades[k].periodo >= parseInt(inicio, 10)) && (disciplinaGrades[k].periodo <= parseInt(fim, 10))) {
                for (var j = 0; j < turmas.length; j++) {
                    if (turmas[j].periodo===1 && turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                        for (var p = 0; p < pedidos.length; p++) {
                            if ((pedidos[p].vagasPeriodizadas > 0) && (pedidos[p].Turma == turmas[j].id)) {
                                this.ativos1.CCN[disciplinaGrades[k].periodo - 1].push(turmas[j])
                            }
                        }
                    }
                }
                for (var j = 0; j < turmasExternas.length; j++) {
                    if (turmasExternas[j].periodo===1 && turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                        for (var p = 0; p < pedidosExternos.length; p++) {
                            if ((pedidosExternos[p].vagasPeriodizadas > 0) && (pedidosExternos[p].Turma == turmasExternas[j].id)) {
                                this.ativos1.CCN[disciplinaGrades[k].periodo - 1].push(turmasExternas[j])
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
    pedidos = []
    for (var t in listaPedidos){
        for (var pedido in listaPedidos[t]){
            if(listaPedidos[t][pedido].Curso===3){
                pedidos.push(listaPedidos[t][pedido])
            }
        }
    }
    pedidosExternos = _.filter(listaPedidosExternos, ['Curso', 3])
    for (var i = 0; ((i < grades.length) && (inicio <= 10)); i++) {
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
        for (var k = 0; k < disciplinaGrades.length; k++) {
            if ((disciplinaGrades[k].Grade == grade) && (this.isEven(disciplinaGrades[k].periodo) == this.evenSI) && (disciplinaGrades[k].periodo >= parseInt(inicio, 10)) && (disciplinaGrades[k].periodo <= parseInt(fim, 10))) {
                for (var j = 0; j < turmas.length; j++) {
                    if (turmas[j].periodo===1 && turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                        for (var p = 0; p < pedidos.length; p++) {
                            if ((pedidos[p].vagasPeriodizadas > 0) && (pedidos[p].Turma == turmas[j].id)) {
                                this.ativos1.SI[disciplinaGrades[k].periodo - 1].push(turmas[j])
                            }
                        }
                    }
                }
                for (var j = 0; j < turmasExternas.length; j++) {
                    if (turmasExternas[j].periodo===1 && turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                        for (var p = 0; p < pedidosExternos.length; p++) {
                            if ((pedidosExternos[p].vagasPeriodizadas > 0) && (pedidosExternos[p].Turma == turmasExternas[j].id)) {
                                this.ativos1.SI[disciplinaGrades[k].periodo - 1].push(turmasExternas[j])
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
    pedidos = []
    for (var t in listaPedidos){
        for (var pedido in listaPedidos[t]){
            if(listaPedidos[t][pedido].Curso===2){
                pedidos.push(listaPedidos[t][pedido])
            }
        }
    }
    pedidosExternos = _.filter(listaPedidosExternos, ['Curso', 2])
    for (var i = 0; ((i < grades.length) && (inicio <= 10)); i++) {
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
        for (var k = 0; k < disciplinaGrades.length; k++) {
            if ((disciplinaGrades[k].Grade == grade) && (this.isEven(disciplinaGrades[k].periodo) == this.evenEC) && (disciplinaGrades[k].periodo >= parseInt(inicio, 10)) && (disciplinaGrades[k].periodo <= parseInt(fim, 10))) {
                for (var j = 0; j < turmas.length; j++) {
                    if (turmas[j].periodo===1 && turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                        for (var p = 0; p < pedidos.length; p++) {
                            if ((pedidos[p].vagasPeriodizadas > 0) && (pedidos[p].Turma == turmas[j].id)) {
                                this.ativos1.EC[disciplinaGrades[k].periodo - 1].push(turmas[j])
                            }
                        }
                    }
                }
                for (var j = 0; j < turmasExternas.length; j++) {
                    if (turmasExternas[j].periodo===1 && turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                        for (var p = 0; p < pedidosExternos.length; p++) {
                            if ((pedidosExternos[p].vagasPeriodizadas > 0) && (pedidosExternos[p].Turma == turmasExternas[j].id)) {
                                this.ativos1.EC[disciplinaGrades[k].periodo - 1].push(turmasExternas[j])
                            }
                        }
                    }
                }
            }
        }
    }

    //Eletivas está selecionado:
    var eletiva = true
    for(var t = 0; t<turmas.length;t++){
        for(var d = 0; d<disciplinaGrades.length; d++){
            if(turmas[t].periodo!=1 || turmas[t].Disciplina===disciplinaGrades[d].Disciplina){
                eletiva = false
            }
        }
        if(eletiva){
            this.ativos1.Eletivas.push(turmas[t])
        }else{
            eletiva = true
        }
    }


}

Pdfs.prototype.pdfResumoHorarios = function () {

    let anoAtual = (_.isEmpty(this.Plano)?2019:this.Plano[0].ano)

    createHorarios1(anoAtual, 1)
    createHorarios2(anoAtual, 3)
    console.log(this.ativos1)

    var tables = []
    var disciplinas = this.Disciplinas
    var periodosCCD1 = this.ativos1.CCD
    var periodosCCN1 = this.ativos1.CCN
    var periodosEC1 = this.ativos1.EC
    var periodosSI1 = this.ativos1.SI
    var eletivas1 = this.ativos1.Eletivas
    var seg = '', ter = '', qua = '', qui = '', sex = ''
    var vazio = 0
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
                    if (this.checkTurmaHorario(periodosCCD1[i][j], 1 + d)) {
                        for (var k = 0; k < disciplinas.length; k++) {
                            if (periodosCCD1[i][j].Disciplina === disciplinas[k].id) {
                                if (seg !== '')
                                    seg = seg + ' '
                                seg = seg + disciplinas[k].codigo + ' ' + periodosCCD1[i][j].letra
                            }
                        }
                    }
                    if (this.checkTurmaHorario(periodosCCD1[i][j], 7 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosCCD1[i][j].Disciplina === disciplinas[k].id) {
                                if (ter != '')
                                    ter = ter + ' '
                                ter = ter + disciplinas[k].codigo + ' ' + periodosCCD1[i][j].letra
                            }
                        }
                    }
                    if (this.checkTurmaHorario(periodosCCD1[i][j], 13 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosCCD1[i][j].Disciplina === disciplinas[k].id) {
                                if (qua != '')
                                    qua = qua + ' '
                                qua = qua + disciplinas[k].codigo + ' ' + periodosCCD1[i][j].letra
                            }
                        }
                    }
                    if (this.checkTurmaHorario(periodosCCD1[i][j], 19 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosCCD1[i][j].Disciplina === disciplinas[k].id) {
                                if (qui != '')
                                    qui = qui + ' '
                                qui = qui + disciplinas[k].codigo + ' ' + periodosCCD1[i][j].letra
                            }
                        }
                    }
                    if (this.checkTurmaHorario(periodosCCD1[i][j], 25 + d)) {
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
                        tables[2 + 2 * (i-vazio)].table.body.push([{
                            text: '08 - 10',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 1:
                        tables[2 + 2 * (i-vazio)].table.body.push([{
                            text: '10 - 12',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 2:
                        tables[2 + 2 * (i-vazio)].table.body.push([{
                            text: '14 - 16',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 3:
                        tables[2 + 2 * (i-vazio)].table.body.push([{
                            text: '16 - 18',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 4:
                        tables[2 + 2 * (i-vazio)].table.body.push([{
                            text: '19 - 21',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 5:
                        tables[2 + 2 * (i-vazio)].table.body.push([{
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
                    if (this.checkTurmaHorario(periodosCCN1[i][j], 1 + d)) {
                        for (var k = 0; k < disciplinas.length; k++) {
                            if (periodosCCN1[i][j].Disciplina === disciplinas[k].id) {
                                if (seg !== '')
                                    seg = seg + ' '
                                seg = seg + disciplinas[k].codigo + ' ' + periodosCCN1[i][j].letra
                            }
                        }
                    }
                    if (this.checkTurmaHorario(periodosCCN1[i][j], 7 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosCCN1[i][j].Disciplina === disciplinas[k].id) {
                                if (ter != '')
                                    ter = ter + ' '
                                ter = ter + disciplinas[k].codigo + ' ' + periodosCCN1[i][j].letra
                            }
                        }
                    }
                    if (this.checkTurmaHorario(periodosCCN1[i][j], 13 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosCCN1[i][j].Disciplina === disciplinas[k].id) {
                                if (qua != '')
                                    qua = qua + ' '
                                qua = qua + disciplinas[k].codigo + ' ' + periodosCCN1[i][j].letra
                            }
                        }
                    }
                    if (this.checkTurmaHorario(periodosCCN1[i][j], 19 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosCCN1[i][j].Disciplina === disciplinas[k].id) {
                                if (qui != '')
                                    qui = qui + ' '
                                qui = qui + disciplinas[k].codigo + ' ' + periodosCCN1[i][j].letra
                            }
                        }
                    }
                    if (this.checkTurmaHorario(periodosCCN1[i][j], 25 + d)) {
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
                        tables[23 + 2 * (i-vazio)].table.body.push([{
                            text: '08 - 10',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 1:
                        tables[23 + 2 * (i-vazio)].table.body.push([{
                            text: '10 - 12',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 2:
                        tables[23 + 2 * (i-vazio)].table.body.push([{
                            text: '14 - 16',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 3:
                        tables[23 + 2 * (i-vazio)].table.body.push([{
                            text: '16 - 18',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 4:
                        tables[23 + 2 * (i-vazio)].table.body.push([{
                            text: '19 - 21',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 5:
                        tables[23 + 2 * (i-vazio)].table.body.push([{
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
                    if (this.checkTurmaHorario(periodosEC1[i][j], 1 + d)) {
                        for (var k = 0; k < disciplinas.length; k++) {
                            if (periodosEC1[i][j].Disciplina === disciplinas[k].id) {
                                if (seg !== '')
                                    seg = seg + ' '
                                seg = seg + disciplinas[k].codigo + ' ' + periodosEC1[i][j].letra
                            }
                        }
                    }
                    if (this.checkTurmaHorario(periodosEC1[i][j], 7 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosEC1[i][j].Disciplina === disciplinas[k].id) {
                                if (ter != '')
                                    ter = ter + ' '
                                ter = ter + disciplinas[k].codigo + ' ' + periodosEC1[i][j].letra
                            }
                        }
                    }
                    if (this.checkTurmaHorario(periodosEC1[i][j], 13 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosEC1[i][j].Disciplina === disciplinas[k].id) {
                                if (qua != '')
                                    qua = qua + ' '
                                qua = qua + disciplinas[k].codigo + ' ' + periodosEC1[i][j].letra
                            }
                        }
                    }
                    if (this.checkTurmaHorario(periodosEC1[i][j], 19 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosEC1[i][j].Disciplina === disciplinas[k].id) {
                                if (qui != '')
                                    qui = qui + ' '
                                qui = qui + disciplinas[k].codigo + ' ' + periodosEC1[i][j].letra
                            }
                        }
                    }
                    if (this.checkTurmaHorario(periodosEC1[i][j], 25 + d)) {
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
                        tables[44 + 2 * (i-vazio)].table.body.push([{
                            text: '08 - 10',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 1:
                        tables[44 + 2 * (i-vazio)].table.body.push([{
                            text: '10 - 12',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 2:
                        tables[44 + 2 * (i-vazio)].table.body.push([{
                            text: '14 - 16',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 3:
                        tables[44 + 2 * (i-vazio)].table.body.push([{
                            text: '16 - 18',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 4:
                        tables[44 + 2 * (i-vazio)].table.body.push([{
                            text: '19 - 21',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 5:
                        tables[44 + 2 * (i-vazio)].table.body.push([{
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
                    if (this.checkTurmaHorario(periodosSI1[i][j], 1 + d)) {
                        for (var k = 0; k < disciplinas.length; k++) {
                            if (periodosSI1[i][j].Disciplina === disciplinas[k].id) {
                                if (seg !== '')
                                    seg = seg + ' '
                                seg = seg + disciplinas[k].codigo + ' ' + periodosSI1[i][j].letra
                            }
                        }
                    }
                    if (this.checkTurmaHorario(periodosSI1[i][j], 7 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosSI1[i][j].Disciplina === disciplinas[k].id) {
                                if (ter != '')
                                    ter = ter + ' '
                                ter = ter + disciplinas[k].codigo + ' ' + periodosSI1[i][j].letra
                            }
                        }
                    }
                    if (this.checkTurmaHorario(periodosSI1[i][j], 13 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosSI1[i][j].Disciplina === disciplinas[k].id) {
                                if (qua != '')
                                    qua = qua + ' '
                                qua = qua + disciplinas[k].codigo + ' ' + periodosSI1[i][j].letra
                            }
                        }
                    }
                    if (this.checkTurmaHorario(periodosSI1[i][j], 19 + d)) {
                        for (k = 0; k < disciplinas.length; k++) {
                            if (periodosSI1[i][j].Disciplina === disciplinas[k].id) {
                                if (qui != '')
                                    qui = qui + ' '
                                qui = qui + disciplinas[k].codigo + ' ' + periodosSI1[i][j].letra
                            }
                        }
                    }
                    if (this.checkTurmaHorario(periodosSI1[i][j], 25 + d)) {
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
                        tables[65 + 2 * (i-vazio)].table.body.push([{
                            text: '08 - 10',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 1:
                        tables[65 + 2 * (i-vazio)].table.body.push([{
                            text: '10 - 12',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 2:
                        tables[65 + 2 * (i-vazio)].table.body.push([{
                            text: '14 - 16',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 3:
                        tables[65 + 2 * (i-vazio)].table.body.push([{
                            text: '16 - 18',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 4:
                        tables[65 + 2 * (i-vazio)].table.body.push([{
                            text: '19 - 21',
                            alignment: 'center'
                        }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                            text: qua,
                            alignment: 'center'
                        }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                        break
                    case 5:
                        tables[65 + 2 * (i-vazio)].table.body.push([{
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
                if (this.checkTurmaHorario(eletivas1[j], 1 + d)) {
                    for (var k = 0; k < disciplinas.length; k++) {
                        if (eletivas1[j].Disciplina === disciplinas[k].id) {
                            if (seg !== '')
                                seg = seg + ' '
                            seg = seg + disciplinas[k].codigo + ' ' + eletivas1[j].letra
                        }
                    }
                }
                if (this.checkTurmaHorario(eletivas1[j], 7 + d)) {
                    for (k = 0; k < disciplinas.length; k++) {
                        if (eletivas1[j].Disciplina === disciplinas[k].id) {
                            if (ter != '')
                                ter = ter + ' '
                            ter = ter + disciplinas[k].codigo + ' ' + eletivas1[j].letra
                        }
                    }
                }
                if (this.checkTurmaHorario(eletivas1[j], 13 + d)) {
                    for (k = 0; k < disciplinas.length; k++) {
                        if (eletivas1[j].Disciplina === disciplinas[k].id) {
                            if (qua != '')
                                qua = qua + ' '
                            qua = qua + disciplinas[k].codigo + ' ' + eletivas1[j].letra
                        }
                    }
                }
                if (this.checkTurmaHorario(eletivas1[j], 19 + d)) {
                    for (k = 0; k < disciplinas.length; k++) {
                        if (eletivas1[j].Disciplina === disciplinas[k].id) {
                            if (qui != '')
                                qui = qui + ' '
                            qui = qui + disciplinas[k].codigo + ' ' + eletivas1[j].letra
                        }
                    }
                }
                if (this.checkTurmaHorario(eletivas1[j], 25 + d)) {
                    for (k = 0; k < disciplinas.length; k++) {
                        if (eletivas1[j].Disciplina === disciplinas[k].id) {
                            if (sex != '')
                                sex = sex + ' '
                            sex = sex + disciplinas[k].codigo + ' ' + eletivas1[j].letra
                        }
                    }
                }
            }
            console.log([seg, ter, qua, qui, sex])
            switch (d) {
                case 0:
                    tables[85 - 2 * vazio].table.body.push([{
                        text: '08 - 10',
                        alignment: 'center'
                    }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                        text: qua,
                        alignment: 'center'
                    }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                    break
                case 1:
                    tables[85 - 2 * vazio].table.body.push([{
                        text: '10 - 12',
                        alignment: 'center'
                    }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                        text: qua,
                        alignment: 'center'
                    }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                    break
                case 2:
                    tables[85 - 2 * vazio].table.body.push([{
                        text: '14 - 16',
                        alignment: 'center'
                    }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                        text: qua,
                        alignment: 'center'
                    }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                    break
                case 3:
                    tables[85 - 2 * vazio].table.body.push([{
                        text: '16 - 18',
                        alignment: 'center'
                    }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                        text: qua,
                        alignment: 'center'
                    }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                    break
                case 4:
                    tables[85 - 2 * vazio].table.body.push([{
                        text: '19 - 21',
                        alignment: 'center'
                    }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                        text: qua,
                        alignment: 'center'
                    }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                    break
                case 5:
                    tables[85 - 2 * vazio].table.body.push([{
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


    var docDefinition = {
        content: tables,
        header: {text:new Date(Date.now()).toLocaleString(), margin:[40, 20, 0, 0], fontSize:10}
    }

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

    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream('Horarios.pdf'));
    pdfDoc.end();
}

module.exports = Pdfs;