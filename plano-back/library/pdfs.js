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

function checkTurmaLab (turma){
    let labs = _.filter(this.Salas, ["laboratorio", true]);
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

function checkTurmaHorarioLabs (turma, horario, lab) {
    if(turma.Horario1==horario || turma.Horario2==horario) {
        let sala = checkTurmaLab(turma)
        switch (sala) {
            case 0:
                return false;
                break;
            case 1:
                if (turma.Horario1 == horario) return true;
                else return false;
                break;
            case 2:
                if (turma.Horario2 == horario) return true;
                else return false;
                break;
            case 3:
                if (turma.Sala1 === lab) {
                    if (turma.Horario1 == horario) return true;
                } else if (turma.Sala2 === lab) {
                    if (turma.Horario2 == horario) return true;
                }
                return false;
            case 4:
                return true;
                break;
        }
        return true;
    } else return false;
}

function checkTurmaHorario (turma, horario) {
    if(turma.Horario1==horario || turma.Horario2==horario) {
        return true
    }else
        return false
}

const pdfAlocacaoLabs = () => new Promise((resolve) => {
    var tables = [];
    tables.push({
        columns: [
            {
                image:
                    "data:image/png;base64,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",
                fit: [60, 60],
                alignment: "left",
                width: "16%",
            },
            [
                {
                    text: "Relação de horários das turmas em laboratórios do",
                    alignment: "center",
                    bold: true,
                    fontSize: 10,
                },
                {
                    text: "Departamento de Ciência da Computação",
                    alignment: "center",
                    bold: true,
                    fontSize: 10,
                },
            ],
            {
                image:
                    "data:image/png;base64,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",
                fit: [60, 60],
                alignment: "right",
                width: "16%",
            },
        ],
    });
    tables.push({
        text: "1º Semestre " + this.Plano[0].ano,
        alignment: "center",
        bold: true,
        fontSize: 10,
        margin: [0, 0, 0, 5],
    });
    var laboratorios = _.filter(this.Salas, {laboratorio: true});
    var disciplinas = _.orderBy(this.Disciplinas, ["nome"]);
    var turmas1 = _.filter(this.Turmas, {periodo: 1, Plano: 1]);
    var turmas2 = _.filter(this.Turmas, {periodo: 3, Plano: 1]);
    var seg = "",
        ter = "",
        qua = "",
        qui = "",
        sex = "";
    for (let i = 0; i < laboratorios.length; i++) {
        if (i % 4 === 0 && i !== 0) {
            tables.push({
                text: laboratorios[i].nome,
                bold: true,
                margin: [0, 10, 0, 10],
                fontSize: 9,
                pageBreak: "before",
            });
        } else {
            tables.push({
                text: laboratorios[i].nome,
                bold: true,
                margin: [0, 10, 0, 10],
                fontSize: 9,
            });
        }
        let tableLabsBody = [
            [
                { text: "Horário", alignment: "center", bold: true, fontSize: 8 },
                {
                    text: "Segunda",
                    alignment: "center",
                    bold: true,
                    fontSize: 8,
                },
                {
                    text: "Terça",
                    alignment: "center",
                    bold: true,
                    fontSize: 8,
                },
                {
                    text: "Quarta",
                    alignment: "center",
                    bold: true,
                    fontSize: 8,
                },
                {
                    text: "Quinta",
                    alignment: "center",
                    bold: true,
                    fontSize: 8,
                },
                {
                    text: "Sexta",
                    alignment: "center",
                    bold: true,
                    fontSize: 8,
                },
            ],
        ];

        for (var d = 0; d < 8; d++) {
            for (var j = 0; j < turmas1.length; j++) {
                if (
                    turmas1[j].Sala1 === laboratorios[i].id ||
                    turmas1[j].Sala2 === laboratorios[i].id
                ) {
                    if (d < 4) {
                        if (
                            checkTurmaHorarioLabs(
                                turmas1[j],
                                1 + d,
                                laboratorios[i].id
                            )
                        ) {
                            for (var k = 0; k < disciplinas.length; k++) {
                                if (turmas1[j].Disciplina === disciplinas[k].id) {
                                    if (seg !== "") seg = seg + " ";
                                    seg = seg + disciplinas[k].codigo + " " + turmas1[j].letra;
                                }
                            }
                        }
                        if (
                            checkTurmaHorarioLabs(
                                turmas1[j],
                                7 + d,
                                laboratorios[i].id
                            )
                        ) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas1[j].Disciplina === disciplinas[k].id) {
                                    if (ter != "") ter = ter + " ";
                                    ter = ter + disciplinas[k].codigo + " " + turmas1[j].letra;
                                }
                            }
                        }
                        if (
                            checkTurmaHorarioLabs(
                                turmas1[j],
                                13 + d,
                                laboratorios[i].id
                            )
                        ) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas1[j].Disciplina === disciplinas[k].id) {
                                    if (qua != "") qua = qua + " ";
                                    qua = qua + disciplinas[k].codigo + " " + turmas1[j].letra;
                                }
                            }
                        }
                        if (
                            checkTurmaHorarioLabs(
                                turmas1[j],
                                19 + d,
                                laboratorios[i].id
                            )
                        ) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas1[j].Disciplina === disciplinas[k].id) {
                                    if (qui != "") qui = qui + " ";
                                    qui = qui + disciplinas[k].codigo + " " + turmas1[j].letra;
                                }
                            }
                        }
                        if (
                            checkTurmaHorarioLabs(
                                turmas1[j],
                                25 + d,
                                laboratorios[i].id
                            )
                        ) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas1[j].Disciplina === disciplinas[k].id) {
                                    if (sex != "") sex = sex + " ";
                                    sex = sex + disciplinas[k].codigo + " " + turmas1[j].letra;
                                }
                            }
                        }
                    } else if (d === 4 || d === 5) {
                        if (
                            checkTurmaHorarioLabs(
                                turmas1[j],
                                28 + d,
                                laboratorios[i].id
                            )
                        ) {
                            for (var k = 0; k < disciplinas.length; k++) {
                                if (turmas1[j].Disciplina === disciplinas[k].id) {
                                    if (seg !== "") seg = seg + " ";
                                    seg = seg + disciplinas[k].codigo + " " + turmas1[j].letra;
                                }
                            }
                        }
                        if (
                            checkTurmaHorarioLabs(
                                turmas1[j],
                                30 + d,
                                laboratorios[i].id
                            )
                        ) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas1[j].Disciplina === disciplinas[k].id) {
                                    if (ter != "") ter = ter + " ";
                                    ter = ter + disciplinas[k].codigo + " " + turmas1[j].letra;
                                }
                            }
                        }
                        if (
                            checkTurmaHorarioLabs(
                                turmas1[j],
                                32 + d,
                                laboratorios[i].id
                            )
                        ) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas1[j].Disciplina === disciplinas[k].id) {
                                    if (qua != "") qua = qua + " ";
                                    qua = qua + disciplinas[k].codigo + " " + turmas1[j].letra;
                                }
                            }
                        }
                        if (
                            checkTurmaHorarioLabs(
                                turmas1[j],
                                34 + d,
                                laboratorios[i].id
                            )
                        ) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas1[j].Disciplina === disciplinas[k].id) {
                                    if (qui != "") qui = qui + " ";
                                    qui = qui + disciplinas[k].codigo + " " + turmas1[j].letra;
                                }
                            }
                        }
                        if (
                            checkTurmaHorarioLabs(
                                turmas1[j],
                                36 + d,
                                laboratorios[i].id
                            )
                        ) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas1[j].Disciplina === disciplinas[k].id) {
                                    if (sex != "") sex = sex + " ";
                                    sex = sex + disciplinas[k].codigo + " " + turmas1[j].letra;
                                }
                            }
                        }
                    } else if (d > 5) {
                        if (checkTurmaHorarioLabs(turmas1[j], d - 1)) {
                            for (var k = 0; k < disciplinas.length; k++) {
                                if (turmas1[j].Disciplina === disciplinas[k].id) {
                                    if (seg !== "") seg = seg + " ";
                                    seg = seg + disciplinas[k].codigo + " " + turmas1[j].letra;
                                }
                            }
                        }
                        if (
                            checkTurmaHorarioLabs(
                                turmas1[j],
                                5 + d,
                                laboratorios[i].id
                            )
                        ) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas1[j].Disciplina === disciplinas[k].id) {
                                    if (ter != "") ter = ter + " ";
                                    ter = ter + disciplinas[k].codigo + " " + turmas1[j].letra;
                                }
                            }
                        }
                        if (
                            checkTurmaHorarioLabs(
                                turmas1[j],
                                11 + d,
                                laboratorios[i].id
                            )
                        ) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas1[j].Disciplina === disciplinas[k].id) {
                                    if (qua != "") qua = qua + " ";
                                    qua = qua + disciplinas[k].codigo + " " + turmas1[j].letra;
                                }
                            }
                        }
                        if (
                            checkTurmaHorarioLabs(
                                turmas1[j],
                                17 + d,
                                laboratorios[i].id
                            )
                        ) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas1[j].Disciplina === disciplinas[k].id) {
                                    if (qui != "") qui = qui + " ";
                                    qui = qui + disciplinas[k].codigo + " " + turmas1[j].letra;
                                }
                            }
                        }
                        if (
                            checkTurmaHorarioLabs(
                                turmas1[j],
                                23 + d,
                                laboratorios[i].id
                            )
                        ) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas1[j].Disciplina === disciplinas[k].id) {
                                    if (sex != "") sex = sex + " ";
                                    sex = sex + disciplinas[k].codigo + " " + turmas1[j].letra;
                                }
                            }
                        }
                    }
                }
            }
            switch (d) {
                case 0:
                    tableLabsBody.push([
                        { text: "08 - 10", alignment: "center", fontSize: 8 },
                        {
                            text: seg,
                            alignment: "center",
                            fontSize: 8,
                        },
                        { text: ter, alignment: "center", fontSize: 8 },
                        { text: qua, alignment: "center", fontSize: 8 },
                        {
                            text: qui,
                            alignment: "center",
                            fontSize: 8,
                        },
                        { text: sex, alignment: "center", fontSize: 8 },
                    ]);
                    break;
                case 1:
                    tableLabsBody.push([
                        { text: "10 - 12", alignment: "center", fontSize: 8 },
                        {
                            text: seg,
                            alignment: "center",
                            fontSize: 8,
                        },
                        { text: ter, alignment: "center", fontSize: 8 },
                        { text: qua, alignment: "center", fontSize: 8 },
                        {
                            text: qui,
                            alignment: "center",
                            fontSize: 8,
                        },
                        { text: sex, alignment: "center", fontSize: 8 },
                    ]);
                    break;
                case 2:
                    tableLabsBody.push([
                        { text: "14 - 16", alignment: "center", fontSize: 8 },
                        {
                            text: seg,
                            alignment: "center",
                            fontSize: 8,
                        },
                        { text: ter, alignment: "center", fontSize: 8 },
                        { text: qua, alignment: "center", fontSize: 8 },
                        {
                            text: qui,
                            alignment: "center",
                            fontSize: 8,
                        },
                        { text: sex, alignment: "center", fontSize: 8 },
                    ]);
                    break;
                case 3:
                    tableLabsBody.push([
                        { text: "16 - 18", alignment: "center", fontSize: 8 },
                        {
                            text: seg,
                            alignment: "center",
                            fontSize: 8,
                        },
                        { text: ter, alignment: "center", fontSize: 8 },
                        { text: qua, alignment: "center", fontSize: 8 },
                        {
                            text: qui,
                            alignment: "center",
                            fontSize: 8,
                        },
                        { text: sex, alignment: "center", fontSize: 8 },
                    ]);
                    break;
                case 4:
                    tableLabsBody.push([
                        { text: "17 - 19", alignment: "center", fontSize: 8 },
                        {
                            text: seg,
                            alignment: "center",
                            fontSize: 8,
                        },
                        { text: ter, alignment: "center", fontSize: 8 },
                        { text: qua, alignment: "center", fontSize: 8 },
                        {
                            text: qui,
                            alignment: "center",
                            fontSize: 8,
                        },
                        { text: sex, alignment: "center", fontSize: 8 },
                    ]);
                    break;
                case 5:
                    tableLabsBody.push([
                        { text: "18 - 20", alignment: "center", fontSize: 8 },
                        {
                            text: seg,
                            alignment: "center",
                            fontSize: 8,
                        },
                        { text: ter, alignment: "center", fontSize: 8 },
                        { text: qua, alignment: "center", fontSize: 8 },
                        {
                            text: qui,
                            alignment: "center",
                            fontSize: 8,
                        },
                        { text: sex, alignment: "center", fontSize: 8 },
                    ]);
                    break;
                case 6:
                    tableLabsBody.push([
                        { text: "19 - 21", alignment: "center", fontSize: 8 },
                        {
                            text: seg,
                            alignment: "center",
                            fontSize: 8,
                        },
                        { text: ter, alignment: "center", fontSize: 8 },
                        { text: qua, alignment: "center", fontSize: 8 },
                        {
                            text: qui,
                            alignment: "center",
                            fontSize: 8,
                        },
                        { text: sex, alignment: "center", fontSize: 8 },
                    ]);
                    break;
                case 7:
                    tableLabsBody.push([
                        { text: "21 - 23", alignment: "center", fontSize: 8 },
                        {
                            text: seg,
                            alignment: "center",
                            fontSize: 8,
                        },
                        { text: ter, alignment: "center", fontSize: 8 },
                        { text: qua, alignment: "center", fontSize: 8 },
                        {
                            text: qui,
                            alignment: "center",
                            fontSize: 8,
                        },
                        { text: sex, alignment: "center", fontSize: 8 },
                    ]);
                    break;
            }
            seg = ter = qua = qui = sex = "";
        }
        tables.push({
            table: {
                widths: ["*", "*", "*", "*", "*", "*"],
                headerRows: 1,
                color: "#426",
                body: tableLabsBody,
            },
        });
    }
    tables.push({
        columns: [
            {
                image:
                    "data:image/png;base64,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",
                fit: [60, 60],
                alignment: "left",
                width: "16%",
                pageBreak: "before",
            },
            [
                {
                    text: "Relação de horários das turmas em laboratórios do",
                    alignment: "center",
                    bold: true,
                    fontSize: 10,
                    pageBreak: "before",
                },
                {
                    text: "Departamento de Ciência da Computação",
                    alignment: "center",
                    bold: true,
                    fontSize: 10,
                },
            ],
            {
                image:
                    "data:image/png;base64,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",
                fit: [60, 60],
                alignment: "right",
                width: "16%",
                pageBreak: "before",
            },
        ],
    });
    tables.push({
        text: "2º Semestre " + this.Plano[0].ano,
        alignment: "center",
        bold: true,
        fontSize: 10,
        margin: [0, 0, 0, 5],
    });
    for (let i = 0; i < laboratorios.length; i++) {
        if (i % 4 === 0 && i !== 0) {
            tables.push({
                text: laboratorios[i].nome,
                bold: true,
                margin: [0, 10, 0, 10],
                fontSize: 9,
                pageBreak: "before",
            });
        } else {
            tables.push({
                text: laboratorios[i].nome,
                bold: true,
                margin: [0, 10, 0, 10],
                fontSize: 9,
            });
        }
        let tableLabsBody = [
            [
                { text: "Horário", alignment: "center", bold: true, fontSize: 8 },
                {
                    text: "Segunda",
                    alignment: "center",
                    bold: true,
                    fontSize: 8,
                },
                {
                    text: "Terça",
                    alignment: "center",
                    bold: true,
                    fontSize: 8,
                },
                {
                    text: "Quarta",
                    alignment: "center",
                    bold: true,
                    fontSize: 8,
                },
                {
                    text: "Quinta",
                    alignment: "center",
                    bold: true,
                    fontSize: 8,
                },
                {
                    text: "Sexta",
                    alignment: "center",
                    bold: true,
                    fontSize: 8,
                },
            ],
        ];

        for (var d = 0; d < 8; d++) {
            for (var j = 0; j < turmas2.length; j++) {
                if (
                    turmas2[j].Sala1 === laboratorios[i].id ||
                    turmas2[j].Sala2 === laboratorios[i].id
                ) {
                    if (d < 4) {
                        if (
                            checkTurmaHorarioLabs(
                                turmas2[j],
                                1 + d,
                                laboratorios[i].id
                            )
                        ) {
                            for (var k = 0; k < disciplinas.length; k++) {
                                if (turmas2[j].Disciplina === disciplinas[k].id) {
                                    if (seg !== "") seg = seg + " ";
                                    seg = seg + disciplinas[k].codigo + " " + turmas2[j].letra;
                                }
                            }
                        }
                        if (
                            checkTurmaHorarioLabs(
                                turmas2[j],
                                7 + d,
                                laboratorios[i].id
                            )
                        ) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas2[j].Disciplina === disciplinas[k].id) {
                                    if (ter != "") ter = ter + " ";
                                    ter = ter + disciplinas[k].codigo + " " + turmas2[j].letra;
                                }
                            }
                        }
                        if (
                            checkTurmaHorarioLabs(
                                turmas2[j],
                                13 + d,
                                laboratorios[i].id
                            )
                        ) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas2[j].Disciplina === disciplinas[k].id) {
                                    if (qua != "") qua = qua + " ";
                                    qua = qua + disciplinas[k].codigo + " " + turmas2[j].letra;
                                }
                            }
                        }
                        if (
                            checkTurmaHorarioLabs(
                                turmas2[j],
                                19 + d,
                                laboratorios[i].id
                            )
                        ) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas2[j].Disciplina === disciplinas[k].id) {
                                    if (qui != "") qui = qui + " ";
                                    qui = qui + disciplinas[k].codigo + " " + turmas2[j].letra;
                                }
                            }
                        }
                        if (
                            checkTurmaHorarioLabs(
                                turmas2[j],
                                25 + d,
                                laboratorios[i].id
                            )
                        ) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas2[j].Disciplina === disciplinas[k].id) {
                                    if (sex != "") sex = sex + " ";
                                    sex = sex + disciplinas[k].codigo + " " + turmas2[j].letra;
                                }
                            }
                        }
                    } else if (d === 4 || d === 5) {
                        if (
                            checkTurmaHorarioLabs(
                                turmas2[j],
                                28 + d,
                                laboratorios[i].id
                            )
                        ) {
                            for (var k = 0; k < disciplinas.length; k++) {
                                if (turmas2[j].Disciplina === disciplinas[k].id) {
                                    if (seg !== "") seg = seg + " ";
                                    seg = seg + disciplinas[k].codigo + " " + turmas2[j].letra;
                                }
                            }
                        }
                        if (
                            checkTurmaHorarioLabs(
                                turmas2[j],
                                30 + d,
                                laboratorios[i].id
                            )
                        ) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas2[j].Disciplina === disciplinas[k].id) {
                                    if (ter != "") ter = ter + " ";
                                    ter = ter + disciplinas[k].codigo + " " + turmas2[j].letra;
                                }
                            }
                        }
                        if (
                            checkTurmaHorarioLabs(
                                turmas2[j],
                                32 + d,
                                laboratorios[i].id
                            )
                        ) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas2[j].Disciplina === disciplinas[k].id) {
                                    if (qua != "") qua = qua + " ";
                                    qua = qua + disciplinas[k].codigo + " " + turmas2[j].letra;
                                }
                            }
                        }
                        if (
                            checkTurmaHorarioLabs(
                                turmas2[j],
                                34 + d,
                                laboratorios[i].id
                            )
                        ) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas2[j].Disciplina === disciplinas[k].id) {
                                    if (qui != "") qui = qui + " ";
                                    qui = qui + disciplinas[k].codigo + " " + turmas2[j].letra;
                                }
                            }
                        }
                        if (
                            checkTurmaHorarioLabs(
                                turmas2[j],
                                36 + d,
                                laboratorios[i].id
                            )
                        ) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas2[j].Disciplina === disciplinas[k].id) {
                                    if (sex != "") sex = sex + " ";
                                    sex = sex + disciplinas[k].codigo + " " + turmas2[j].letra;
                                }
                            }
                        }
                    } else if (d > 5) {
                        if (checkTurmaHorarioLabs(turmas2[j], d - 1)) {
                            for (var k = 0; k < disciplinas.length; k++) {
                                if (turmas2[j].Disciplina === disciplinas[k].id) {
                                    if (seg !== "") seg = seg + " ";
                                    seg = seg + disciplinas[k].codigo + " " + turmas2[j].letra;
                                }
                            }
                        }
                        if (
                            checkTurmaHorarioLabs(
                                turmas2[j],
                                5 + d,
                                laboratorios[i].id
                            )
                        ) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas2[j].Disciplina === disciplinas[k].id) {
                                    if (ter != "") ter = ter + " ";
                                    ter = ter + disciplinas[k].codigo + " " + turmas2[j].letra;
                                }
                            }
                        }
                        if (
                            checkTurmaHorarioLabs(
                                turmas2[j],
                                11 + d,
                                laboratorios[i].id
                            )
                        ) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas2[j].Disciplina === disciplinas[k].id) {
                                    if (qua != "") qua = qua + " ";
                                    qua = qua + disciplinas[k].codigo + " " + turmas2[j].letra;
                                }
                            }
                        }
                        if (
                            checkTurmaHorarioLabs(
                                turmas2[j],
                                17 + d,
                                laboratorios[i].id
                            )
                        ) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas2[j].Disciplina === disciplinas[k].id) {
                                    if (qui != "") qui = qui + " ";
                                    qui = qui + disciplinas[k].codigo + " " + turmas2[j].letra;
                                }
                            }
                        }
                        if (
                            checkTurmaHorarioLabs(
                                turmas2[j],
                                23 + d,
                                laboratorios[i].id
                            )
                        ) {
                            for (k = 0; k < disciplinas.length; k++) {
                                if (turmas2[j].Disciplina === disciplinas[k].id) {
                                    if (sex != "") sex = sex + " ";
                                    sex = sex + disciplinas[k].codigo + " " + turmas2[j].letra;
                                }
                            }
                        }
                    }
                }
            }
            switch (d) {
                case 0:
                    tableLabsBody.push([
                        { text: "08 - 10", alignment: "center", fontSize: 8 },
                        { text: seg, alignment: "center", fontSize: 8 },
                        { text: ter, alignment: "center", fontSize: 8 },
                        { text: qua, alignment: "center", fontSize: 8 },
                        { text: qui, alignment: "center", fontSize: 8 },
                        { text: sex, alignment: "center", fontSize: 8 },
                    ]);
                    break;
                case 1:
                    tableLabsBody.push([
                        { text: "10 - 12", alignment: "center", fontSize: 8 },
                        { text: seg, alignment: "center", fontSize: 8 },
                        { text: ter, alignment: "center", fontSize: 8 },
                        { text: qua, alignment: "center", fontSize: 8 },
                        { text: qui, alignment: "center", fontSize: 8 },
                        { text: sex, alignment: "center", fontSize: 8 },
                    ]);
                    break;
                case 2:
                    tableLabsBody.push([
                        { text: "14 - 16", alignment: "center", fontSize: 8 },
                        { text: seg, alignment: "center", fontSize: 8 },
                        { text: ter, alignment: "center", fontSize: 8 },
                        { text: qua, alignment: "center", fontSize: 8 },
                        { text: qui, alignment: "center", fontSize: 8 },
                        { text: sex, alignment: "center", fontSize: 8 },
                    ]);
                    break;
                case 3:
                    tableLabsBody.push([
                        { text: "16 - 18", alignment: "center", fontSize: 8 },
                        { text: seg, alignment: "center", fontSize: 8 },
                        { text: ter, alignment: "center", fontSize: 8 },
                        { text: qua, alignment: "center", fontSize: 8 },
                        { text: qui, alignment: "center", fontSize: 8 },
                        { text: sex, alignment: "center", fontSize: 8 },
                    ]);
                    break;
                case 4:
                    tableLabsBody.push([
                        { text: "17 - 19", alignment: "center", fontSize: 8 },
                        { text: seg, alignment: "center", fontSize: 8 },
                        { text: ter, alignment: "center", fontSize: 8 },
                        { text: qua, alignment: "center", fontSize: 8 },
                        { text: qui, alignment: "center", fontSize: 8 },
                        { text: sex, alignment: "center", fontSize: 8 },
                    ]);
                    break;
                case 5:
                    tableLabsBody.push([
                        { text: "18 - 20", alignment: "center", fontSize: 8 },
                        { text: seg, alignment: "center", fontSize: 8 },
                        { text: ter, alignment: "center", fontSize: 8 },
                        { text: qua, alignment: "center", fontSize: 8 },
                        { text: qui, alignment: "center", fontSize: 8 },
                        { text: sex, alignment: "center", fontSize: 8 },
                    ]);
                    break;
                case 6:
                    tableLabsBody.push([
                        { text: "19 - 21", alignment: "center", fontSize: 8 },
                        { text: seg, alignment: "center", fontSize: 8 },
                        { text: ter, alignment: "center", fontSize: 8 },
                        { text: qua, alignment: "center", fontSize: 8 },
                        { text: qui, alignment: "center", fontSize: 8 },
                        { text: sex, alignment: "center", fontSize: 8 },
                    ]);
                    break;
                case 7:
                    tableLabsBody.push([
                        { text: "21 - 23", alignment: "center", fontSize: 8 },
                        { text: seg, alignment: "center", fontSize: 8 },
                        { text: ter, alignment: "center", fontSize: 8 },
                        { text: qua, alignment: "center", fontSize: 8 },
                        { text: qui, alignment: "center", fontSize: 8 },
                        { text: sex, alignment: "center", fontSize: 8 },
                    ]);
                    break;
            }
            seg = ter = qua = qui = sex = "";
        }

        tables.push({
            table: {
                widths: ["*", "*", "*", "*", "*", "*"],
                headerRows: 1,
                color: "#426",
                body: tableLabsBody,
            },
        });
    }
    console.log(tables);
    var docDefinitionLabs = {
        content: tables,
        footer: function(currentPage, pageCount) {
            return {
                columns: [
                    {
                        text: new Date(Date.now()).toLocaleString(),
                        margin: [30, 10, 0, 0],
                        fontSize: 8,
                        alignment: `left`,
                    },
                    {
                        text: currentPage.toString() + " de " + pageCount,
                        alignment: "right",
                        margin: [0, 10, 30, 0],
                        fontSize: 8,
                    },
                ],
            };
        },
    };
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
    }),['periodo', 'Disciplina', 'letra'])
}

function turmasSemAlocacao(turmas){
    return _.orderBy(_.filter(turmas, turma => {
            return (turma.Docente1 == null && turma.Docente2 == null && turma.Disciplina != null);
        }),
        ['periodo', 'Disciplina', 'letra']
    );
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
                    if((turmas[t].Docente1 > 0) && (turmas[t].Docente2 > 0)) {
                        c += (parseFloat(disciplinas[d].cargaPratica) / 2)
                        c += (parseFloat(disciplinas[d].cargaTeorica) / 2)
                    }else{
                        c += parseFloat(disciplinas[d].cargaPratica)
                        c += parseFloat(disciplinas[d].cargaTeorica)
                    }
                }
            }
        }
    }
    for(var t = 0; t < cargas.length; t++){
        if(cargas[t].Docente===professor.id){
            if(cargas[t].trimestre==1 || cargas[t].trimestre==2){
                c+= parseFloat(cargas[t].creditos, 10)
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
                    if((turmas[t].Docente1 > 0) && (turmas[t].Docente2 > 0)) {
                        c += (parseFloat(disciplinas[d].cargaPratica) / 2)
                        c += (parseFloat(disciplinas[d].cargaTeorica) / 2)
                    }else{
                        c += parseFloat(disciplinas[d].cargaPratica)
                        c += parseFloat(disciplinas[d].cargaTeorica)
                    }
                }
            }
        }
    }
    for(var t = 0; t < cargas.length; t++){
        if(cargas[t].Docente===professor.id){
            if(cargas[t].trimestre==3){
                c+= parseFloat(cargas[t].creditos, 10)
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
                } else if (horario1 === undefined) {
                    horarioTotal = horario2.horario
                }else{
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
    let turmasSemAloc = turmasSemAlocacao(this.Turmas)
    if(turmasSemAloc.length > 0){
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
        for (var j = 0; j < turmasSemAloc.length; j++) {
            var disciplina = undefined
            var horario1 = undefined
            var horario2 = undefined
            var c1 = 0
            var c2 = 0
            for (var k = 0; k < this.Disciplinas.length; k++) {
                if (turmasSemAloc[j].Disciplina === this.Disciplinas[k].id) {
                    disciplina = this.Disciplinas[k]
                }
            }
            for (var l = 0; l < this.Horarios.length; l++) {
                if (turmasSemAloc[j].Horario1 === this.Horarios[l].id) {
                    horario1 = this.Horarios[l]
                }
            }

            for (var m = 0; m < this.Horarios.length; m++) {
                if (turmasSemAloc[j].Horario2 === this.Horarios[m].id) {
                    horario2 = this.Horarios[m]
                }
            }
            if(horario1===undefined && horario2===undefined){
                horarioTotal = ''
            }else if (horario2 === undefined) {
                horarioTotal = horario1.horario
            } else if (horario1 === undefined) {
                horarioTotal = horario2.horario
            }else{
                horarioTotal = horario1.horario + '/' + horario2.horario
            }
            if (turmasSemAloc[j].periodo == 1) {
                if((turmasSemAloc[j].Docente1 > 0) && (turmasSemAloc[j].Docente2 > 0))
                    c1 = (disciplina.cargaTeorica + disciplina.cargaPratica)/2
                else
                    c1 = disciplina.cargaTeorica + disciplina.cargaPratica
            } else {
                if((turmasSemAloc[j].Docente1 > 0) && (turmasSemAloc[j].Docente2 > 0))
                    c2 = (disciplina.cargaTeorica + disciplina.cargaPratica)/2
                else
                    c2 = disciplina.cargaTeorica + disciplina.cargaPratica
            }
            tables[1 + 2 * (i - vazio)].table.body.push([{text:turmasSemAloc[j].periodo, alignment: 'center'}, {
                text: disciplina.codigo,
                alignment: 'center'
            }, disciplina.nome, {text: turmasSemAloc[j].letra, alignment: 'center'}, {
                text: horarioTotal,
                alignment: 'center'
            }, {text:c1, alignment: 'center'}, {text:c2, alignment: 'center'}])
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

    inicio = 1
    for (let i = 0; ((i < grades.length) && (inicio <= 10)); i++) {
        //grade
        grade = grades[i].id
        //inicio
        if(i!==0)
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
    inicio = 1
    for (let i = 0; ((i < grades.length) && (inicio <= 10)); i++) {
        //grade
        grade = grades[i].id
        //inicio
        if(i!==0)
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
    inicio = 1
    for (let i = 0; ((i < grades.length) && (inicio <= 10)); i++) {
        //grade
        grade = grades[i].id
        //inicio
        if(i!==0)
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
    inicio = 1
    for (let i = 0; ((i < grades.length) && (inicio <= 10)); i++) {
        //grade
        grade = grades[i].id
        //inicio
        if(i!==0)
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

    inicio = 1
    for (let i = 0; ((i < grades.length) && (inicio <= 10)); i++) {
        //grade
        grade = grades[i].id
        //inicio
        if(i!==0)
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
    inicio = 1
    for (let i = 0; ((i < grades.length) && (inicio <= 10)); i++) {
        //grade
        grade = grades[i].id
        //inicio
        if(i!==0)
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
    inicio = 1
    for (let i = 0; ((i < grades.length) && (inicio <= 10)); i++) {
        //grade
        grade = grades[i].id
        //inicio
        if(i!==0)
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
    inicio = 1
    for (let i = 0; ((i < grades.length) && (inicio <= 10)); i++) {
        //grade
        grade = grades[i].id
        //inicio
        if(i!==0)
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
        for (var d = 0; d < 8; d++) {
            for (var j = 0; j < eletivas1.length; j++) {
                if (checkTurmaHorario(eletivas1[j], ((d === 4 || d === 5) ? 28 : 1) + ((d > 5) ? d - 2 : d))) {
                    for (var k = 0; k < disciplinas.length; k++) {
                        if (eletivas1[j].Disciplina === disciplinas[k].id) {
                            if (seg !== '')
                                seg = seg + ' '
                            seg = seg + disciplinas[k].codigo + ' ' + eletivas1[j].letra
                        }
                    }
                }
                if (checkTurmaHorario(eletivas1[j], ((d === 4 || d === 5) ? 30 : 7) + ((d > 5) ? d - 2 : d))) {
                    for (k = 0; k < disciplinas.length; k++) {
                        if (eletivas1[j].Disciplina === disciplinas[k].id) {
                            if (ter != '')
                                ter = ter + ' '
                            ter = ter + disciplinas[k].codigo + ' ' + eletivas1[j].letra
                        }
                    }
                }
                if (checkTurmaHorario(eletivas1[j], ((d === 4 || d === 5) ? 32 : 13) + ((d > 5) ? d - 2 : d))) {
                    for (k = 0; k < disciplinas.length; k++) {
                        if (eletivas1[j].Disciplina === disciplinas[k].id) {
                            if (qua != '')
                                qua = qua + ' '
                            qua = qua + disciplinas[k].codigo + ' ' + eletivas1[j].letra
                        }
                    }
                }
                if (checkTurmaHorario(eletivas1[j], ((d === 4 || d === 5) ? 34 : 19) + ((d > 5) ? d - 2 : d))) {
                    for (k = 0; k < disciplinas.length; k++) {
                        if (eletivas1[j].Disciplina === disciplinas[k].id) {
                            if (qui != '')
                                qui = qui + ' '
                            qui = qui + disciplinas[k].codigo + ' ' + eletivas1[j].letra
                        }
                    }
                }
                if (checkTurmaHorario(eletivas1[j], ((d === 4 || d === 5) ? 36 : 25) + ((d > 5) ? d - 2 : d))) {
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
                        text: '17 - 19',
                        alignment: 'center'
                    }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                        text: qua,
                        alignment: 'center'
                    }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                    break
                case 5:
                    tables[86 - 2 * vazio].table.body.push([{
                        text: '18 - 20',
                        alignment: 'center'
                    }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                        text: qua,
                        alignment: 'center'
                    }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                    break
                case 6:
                    tables[86 - 2 * vazio].table.body.push([{
                        text: '19 - 21',
                        alignment: 'center'
                    }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                        text: qua,
                        alignment: 'center'
                    }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                    break
                case 7:
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
        for (var d = 0; d < 8; d++) {
            for (var j = 0; j < eletivas2.length; j++) {
                if (checkTurmaHorario(eletivas2[j], ((d === 4 || d === 5) ? 28 : 1) + ((d > 5) ? d - 2 : d))) {
                    for (var k = 0; k < disciplinas.length; k++) {
                        if (eletivas2[j].Disciplina === disciplinas[k].id) {
                            if (seg !== '')
                                seg = seg + ' '
                            seg = seg + disciplinas[k].codigo + ' ' + eletivas2[j].letra
                        }
                    }
                }
                if (checkTurmaHorario(eletivas2[j], ((d === 4 || d === 5) ? 30 : 7) + ((d > 5) ? d - 2 : d))) {
                    for (k = 0; k < disciplinas.length; k++) {
                        if (eletivas2[j].Disciplina === disciplinas[k].id) {
                            if (ter != '')
                                ter = ter + ' '
                            ter = ter + disciplinas[k].codigo + ' ' + eletivas2[j].letra
                        }
                    }
                }
                if (checkTurmaHorario(eletivas2[j], ((d === 4 || d === 5) ? 32 : 13) + ((d > 5) ? d - 2 : d))) {
                    for (k = 0; k < disciplinas.length; k++) {
                        if (eletivas2[j].Disciplina === disciplinas[k].id) {
                            if (qua != '')
                                qua = qua + ' '
                            qua = qua + disciplinas[k].codigo + ' ' + eletivas2[j].letra
                        }
                    }
                }
                if (checkTurmaHorario(eletivas2[j], ((d === 4 || d === 5) ? 34 : 19) + ((d > 5) ? d - 2 : d))) {
                    for (k = 0; k < disciplinas.length; k++) {
                        if (eletivas2[j].Disciplina === disciplinas[k].id) {
                            if (qui != '')
                                qui = qui + ' '
                            qui = qui + disciplinas[k].codigo + ' ' + eletivas2[j].letra
                        }
                    }
                }
                if (checkTurmaHorario(eletivas2[j], ((d === 4 || d === 5) ? 36 : 25) + ((d > 5) ? d - 2 : d))) {
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
                        text: '17 - 19',
                        alignment: 'center'
                    }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                        text: qua,
                        alignment: 'center'
                    }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                    break
                case 5:
                    tables[173 - 2 * vazio].table.body.push([{
                        text: '18 - 20',
                        alignment: 'center'
                    }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                        text: qua,
                        alignment: 'center'
                    }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                    break
                case 6:
                    tables[173 - 2 * vazio].table.body.push([{
                        text: '19 - 21',
                        alignment: 'center'
                    }, {text: seg, alignment: 'center'}, {text: ter, alignment: 'center'}, {
                        text: qua,
                        alignment: 'center'
                    }, {text: qui, alignment: 'center'}, {text: sex, alignment: 'center'}])
                    break
                case 7:
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