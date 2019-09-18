<template>
    <div class="DashboardHorarios row" v-if="Admin">
        <div class="col-8">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2">Lista Horarios</h1>
            </div>
<!-- -------------------------------------------- 1º periodo ----------------------------------------- -->
            <template v-if="periodo===1 || periodo===3">
                <h4>1º Semestre</h4>
<!-- -------------------------------------------- CC Diurno ----------------------------------------- -->
                <template v-if="activeCCD">
                    <h4>Ciência da Computação Diurno</h4>
                </template>

                <curso-diurno :Curso="ativos1.CCD"></curso-diurno>
<!-- -------------------------------------------- CC Noturno ----------------------------------------- -->
                <template v-if="activeCCN">
                    <h4>Ciência da Computação Noturno</h4>
                </template>

                <curso-noturno :Curso="ativos1.CCN"></curso-noturno>
<!-- -------------------------------------------- SI ----------------------------------------- -->
                <template v-if="activeSI">
                    <h4>Sistemas de Informação</h4>
                </template>

                <curso-noturno :Curso="ativos1.SI"></curso-noturno>
<!-- -------------------------------------------- EC ----------------------------------------- -->
                <template v-if="activeEC">
                    <h4>Engenharia Computacional</h4>
                </template>

                <curso-diurno :Curso="ativos1.EC"></curso-diurno>
<!-- -------------------------------------------- Eletivas ----------------------------------------- -->
                <template v-if="activeEletivas">
                    <h4>Eletivas</h4>
                </template>
                <horario-eletivas :Eletivas="ativos1.Eletivas"></horario-eletivas>
            </template>

<!-- -------------------------------------------- 2º periodo ----------------------------------------- -->
            <template v-if="periodo===2 || periodo===3">
                <h4>2º Semestre</h4>
<!-- -------------------------------------------- CC Diurno ----------------------------------------- -->
                <template v-if="activeCCD">
                    <h4>Ciência da Computação Diurno</h4>
                </template>

                <curso-diurno :Curso="ativos2.CCD"></curso-diurno>
<!-- -------------------------------------------- CC Noturno ----------------------------------------- -->
                <template v-if="activeCCN">
                    <h4>Ciência da Computação Noturno</h4>
                </template>

                <curso-noturno :Curso="ativos2.CCN"></curso-noturno>
<!-- -------------------------------------------- SI ----------------------------------------- -->
                <template v-if="activeSI">
                    <h4>Sistemas de Informação</h4>
                </template>

                <curso-noturno :Curso="ativos2.SI"></curso-noturno>
<!-- -------------------------------------------- EC ----------------------------------------- -->
                <template v-if="activeEC">
                    <h4>Engenharia Computacional</h4>
                </template>

                <curso-diurno :Curso="ativos2.EC"></curso-diurno>
<!-- -------------------------------------------- Eletivas ----------------------------------------- -->
                <template v-if="activeEletivas">
                    <h4>Eletivas</h4>
                </template>
                <horario-eletivas :Eletivas="ativos2.Eletivas"></horario-eletivas>
            </template>
<!-- ----------------------------------------------------------------------------------------------- -->
        </div>
        <div class="col">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1>Definir Grades</h1>
            </div>
            <b-alert :show="Boolean(error)" variant="danger" dismissible v-html="error">
            </b-alert>
            <form>
                <div class="form-group row" style="display: block;">
                    <form name="formPeriodo" id="formPeriodo" ref="formPrioso">
                        <div class="grade">
                            <label for="periodo" style="margin-right: 10px">Semestre:</label>
                            <b-form-select id="periodo" v-model="periodo" class="periodo" style="width: 94px;">
                                <option :value="1">1</option>
                                <option :value="2">2</option>
                                <option :value="3">Ambos</option>
                            </b-form-select>
                            <br/>
                        </div>
                    </form>
                    <b-form-checkbox v-model="selectAll" v-on:change="toggleAll">Selecionar Tudo</b-form-checkbox>
                    <b-form-checkbox-group v-model="cursos" stacked name="cursosCheck" :options="options" style="display: block;" v-on:change.capture="defineSelectAll">
                    </b-form-checkbox-group>
                </div>
                <div>
                <b-button variant="success" v-on:click="createHorarios" class="generate" style="width: 100px">Visualizar</b-button>
                </div>

            </form>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash'
    import cursoDiurno from './HorarioCursoDiurno.vue'
    import cursoNoturno from './HorarioCursoNoturno.vue'
    import horarioEletivas from './HorarioEletivas.vue'

    export default {
        name: 'DashboardHorarios',

        data () {
            return {
                cursos: [],
                error: undefined,
                options: [
                    {text: "CC Diurno", value:1},
                    {text: "CC Noturno", value:2},
                    {text: "SI", value:3},
                    {text: "Eng. Comp.", value:4},
                    {text: "Eletivas", value:5}
                ],
                evenCCN:"false",
                evenCCD:"false",
                evenEC:"false",
                evenSI:"false",

                ativos1: {
                    CCD: [[], [], [], [], [], [], [], [], [], []],
                    CCN: [[], [], [], [], [], [], [], [], [], []],
                    EC: [[], [], [], [], [], [], [], [], [], []],
                    SI: [[], [], [], [], [], [], [], [], [], []],
                    Eletivas:[]
                },

                ativos2: {
                    CCD: [[], [], [], [], [], [], [], [], [], []],
                    CCN: [[], [], [], [], [], [], [], [], [], []],
                    EC: [[], [], [], [], [], [], [], [], [], []],
                    SI: [[], [], [], [], [], [], [], [], [], []],
                    Eletivas:[]
                },
                selectAll:false,
                periodo: 1
            }
        },

        components: {
            cursoDiurno,
            cursoNoturno,
            horarioEletivas
        },

        methods: {
            defineSelectAll() {
              if(this.cursos.length === 5){
                  this.selectAll = true
              }else{
                  this.selectAll = false
              }
            },

            toggleAll(){
              if(this.cursos.length===5){
                  this.cursos = []
              }  else {
                  this.cursos = [1, 2, 3, 4, 5]
              }
            },

            isEven (number) {
                if(number%2===0)
                    return 'true'
                else
                    return 'false'
            },

            emptyTurmas () {
                this.ativos1 = {
                    CCD:[[], [], [], [], [], [], [], [], [], []],
                    CCN:[[], [], [], [], [], [], [], [], [], []],
                    EC:[[], [], [], [], [], [], [], [], [], []],
                    SI:[[], [], [], [], [], [], [], [], [], []],
                    Eletivas:[]
                }

                this.ativos2 = {
                    CCD:[[], [], [], [], [], [], [], [], [], []],
                    CCN:[[], [], [], [], [], [], [], [], [], []],
                    EC:[[], [], [], [], [], [], [], [], [], []],
                    SI:[[], [], [], [], [], [], [], [], [], []],
                    Eletivas:[]
                }
            },

            filterTurmas: function(t) {
                var check = false
                for (var turma in this.ativos1.CCN){
                    if(turma.id===t.id)
                        check = true
                }
                return check
            },

            checkTurmaHorario (turma, horario) {
                if(turma.Horario1==horario || turma.Horario2==horario) {
                    return true
                }else
                    return false
            },
            createHorarios: function () {
                var periodoSelecionado = parseInt(this.periodo, 10)
                this.emptyTurmas()
                if(periodoSelecionado === 1){
                    this.createHorarios1()
                } else if (periodoSelecionado === 2){
                    this.createHorarios2()
                } else {
                    this.createHorarios1()
                    this.createHorarios2()
                }
            },

            createHorarios1: function () {
                var grade
                var grades
                var inicio = 1
                var fim
                var pedidos
                var pedidosExternos
                var disciplinaGrades = this.$store.state.disciplinaGrade.DisciplinaGrades
                var turmas = _.filter(this.$store.state.turma.Turmas, ['periodo', 1])
                var turmasExternas = this.$store.state.turmaExterna.Turmas
                var anoAtual = this.$store.state.year
                var semestreAtual = 1

                    if(this.$store.state.curso.Cursos[0].semestreInicial==1){
                        this.evenCCN = "false"
                    }else if (this.$store.state.curso.Cursos[0].semestreInicial==2){
                        this.evenCCN = "true"
                    }

                    if(this.$store.state.curso.Cursos[1].semestreInicial==1){
                        this.evenEC = "false"
                    }else if(this.$store.state.curso.Cursos[1].semestreInicial==2){
                        this.evenEC = "true"
                    }

                    if(this.$store.state.curso.Cursos[2].semestreInicial==1){
                        this.evenSI = "false"
                    }else if(this.$store.state.curso.Cursos[2].semestreInicial==2){
                        this.evenSI = "true"
                    }

                    if(this.$store.state.curso.Cursos[3].semestreInicial==1){
                        this.evenCCD = "false"
                    }else if(this.$store.state.curso.Cursos[3].semestreInicial==2){
                        this.evenCCD = "true"
                    }

                //CC Diurno está selecionado
                if (_.indexOf(this.cursos, 1) > -1) {

                    grades = _.filter(this.$store.state.grade.Grades, ['Curso', 4])
                    grades = _.orderBy(grades, 'periodoInicio', 'desc')
                    pedidos = []
                    for (var t in this.$store.state.pedido.Pedidos){
                        for (var pedido in this.$store.state.pedido.Pedidos[t]){
                            if(this.$store.state.pedido.Pedidos[t][pedido].Curso===4){
                                pedidos.push(this.$store.state.pedido.Pedidos[t][pedido])
                            }
                        }
                    }
                    pedidosExternos = _.filter(this.$store.state.pedidoExterno.Pedidos, ['Curso', 4])

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
                                fim = 1 + 2*(parseInt(anoAtual, 10) - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (parseInt(semestreAtual, 10) - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
                            else
                                fim = inicio - 1 + 2*(parseInt(grades[i-1].periodoInicio.slice(0,4), 10) - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (parseInt(grades[i-1].periodoInicio.slice(5,6), 10) - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
                        for (var k = 0; k < disciplinaGrades.length; k++) {
                            if ((disciplinaGrades[k].Grade == grade) && (this.isEven(disciplinaGrades[k].periodo) == this.evenCCD) && (disciplinaGrades[k].periodo >= parseInt(inicio, 10)) && (disciplinaGrades[k].periodo <= parseInt(fim, 10))) {
                                for (var j = 0; j < turmas.length; j++) {
                                    if (turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                                        for (var p = 0; p < pedidos.length; p++) {
                                            if ((pedidos[p].vagasPeriodizadas > 0) && (pedidos[p].Turma == turmas[j].id)) {
                                                this.ativos1.CCD[disciplinaGrades[k].periodo - 1].push(turmas[j])
                                            }
                                        }
                                    }
                                }
                                for (var j = 0; j < turmasExternas.length; j++) {
                                    if (turmasExternas[j].periodo == 1 && turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina) {
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
                }

                //CC Noturno está selecionado
                if (_.indexOf(this.cursos, 2) > -1) {
                    grades = _.filter(this.$store.state.grade.Grades, ['Curso', 1])
                    grades = _.orderBy(grades, 'periodoInicio', 'desc')
                    pedidos = []
                    for (var t in this.$store.state.pedido.Pedidos){
                        for (var pedido in this.$store.state.pedido.Pedidos[t]){
                            if(this.$store.state.pedido.Pedidos[t][pedido].Curso===1){
                                pedidos.push(this.$store.state.pedido.Pedidos[t][pedido])
                            }
                        }
                    }
                    pedidosExternos = _.filter(this.$store.state.pedidoExterno.Pedidos, ['Curso', 1])
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
                                fim = 1 + 2*(parseInt(anoAtual, 10) - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (parseInt(semestreAtual, 10) - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
                            else
                                fim = inicio - 1 + 2*(parseInt(grades[i-1].periodoInicio.slice(0,4), 10) - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (parseInt(grades[i-1].periodoInicio.slice(5,6), 10) - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
                        for (var k = 0; k < disciplinaGrades.length; k++) {
                            if ((disciplinaGrades[k].Grade == grade) && (this.isEven(disciplinaGrades[k].periodo) == this.evenCCN) && (disciplinaGrades[k].periodo >= parseInt(inicio, 10)) && (disciplinaGrades[k].periodo <= parseInt(fim, 10))) {
                                for (var j = 0; j < turmas.length; j++) {
                                    if (turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                                        for (var p = 0; p < pedidos.length; p++) {
                                            if ((pedidos[p].vagasPeriodizadas > 0) && (pedidos[p].Turma == turmas[j].id)) {
                                                this.ativos1.CCN[disciplinaGrades[k].periodo - 1].push(turmas[j])
                                            }
                                        }
                                    }
                                }
                                for (var j = 0; j < turmasExternas.length; j++) {
                                    if (turmasExternas[j].periodo == 1 && turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina) {
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
                }

                //SI está selecionado
                if (_.indexOf(this.cursos, 3) > -1) {
                    grades = _.filter(this.$store.state.grade.Grades, ['Curso', 3])
                    grades = _.orderBy(grades, 'periodoInicio', 'desc')
                    pedidos = []
                    for (var t in this.$store.state.pedido.Pedidos){
                        for (var pedido in this.$store.state.pedido.Pedidos[t]){
                            if(this.$store.state.pedido.Pedidos[t][pedido].Curso===3){
                                pedidos.push(this.$store.state.pedido.Pedidos[t][pedido])
                            }
                        }
                    }
                    pedidosExternos = _.filter(this.$store.state.pedidoExterno.Pedidos, ['Curso', 3])
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
                                fim = 1 + 2*(parseInt(anoAtual, 10) - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (parseInt(semestreAtual, 10) - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
                            else
                                fim = inicio - 1 + 2*(parseInt(grades[i-1].periodoInicio.slice(0,4), 10) - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (parseInt(grades[i-1].periodoInicio.slice(5,6), 10) - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
                        for (var k = 0; k < disciplinaGrades.length; k++) {
                            if ((disciplinaGrades[k].Grade == grade) && (this.isEven(disciplinaGrades[k].periodo) == this.evenSI) && (disciplinaGrades[k].periodo >= parseInt(inicio, 10)) && (disciplinaGrades[k].periodo <= parseInt(fim, 10))) {
                                for (var j = 0; j < turmas.length; j++) {
                                    if (turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                                        for (var p = 0; p < pedidos.length; p++) {
                                            if ((pedidos[p].vagasPeriodizadas > 0) && (pedidos[p].Turma == turmas[j].id)) {
                                                this.ativos1.SI[disciplinaGrades[k].periodo - 1].push(turmas[j])
                                            }
                                        }
                                    }
                                }
                                for (var j = 0; j < turmasExternas.length; j++) {
                                    if (turmasExternas[j].periodo == 1 && turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina) {
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
                }

                //Engenharia Computacional está selecionado
                if (_.indexOf(this.cursos, 4) > -1) {
                    grades = _.filter(this.$store.state.grade.Grades, ['Curso', 2])
                    grades = _.orderBy(grades, 'periodoInicio', 'desc')
                    pedidos = []
                    for (var t in this.$store.state.pedido.Pedidos){
                        for (var pedido in this.$store.state.pedido.Pedidos[t]){
                            if(this.$store.state.pedido.Pedidos[t][pedido].Curso===2){
                                pedidos.push(this.$store.state.pedido.Pedidos[t][pedido])
                            }
                        }
                    }
                    pedidosExternos = _.filter(this.$store.state.pedidoExterno.Pedidos, ['Curso', 2])
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
                                fim = 1 + 2*(parseInt(anoAtual, 10) - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (parseInt(semestreAtual, 10) - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
                            else
                                fim = inicio - 1 + 2*(parseInt(grades[i-1].periodoInicio.slice(0,4), 10) - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (parseInt(grades[i-1].periodoInicio.slice(5,6), 10) - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
                        for (var k = 0; k < disciplinaGrades.length; k++) {
                            if ((disciplinaGrades[k].Grade == grade) && (this.isEven(disciplinaGrades[k].periodo) == this.evenEC) && (disciplinaGrades[k].periodo >= parseInt(inicio, 10)) && (disciplinaGrades[k].periodo <= parseInt(fim, 10))) {
                                for (var j = 0; j < turmas.length; j++) {
                                    if (turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                                        for (var p = 0; p < pedidos.length; p++) {
                                            if ((pedidos[p].vagasPeriodizadas > 0) && (pedidos[p].Turma == turmas[j].id)) {
                                                this.ativos1.EC[disciplinaGrades[k].periodo - 1].push(turmas[j])
                                            }
                                        }
                                    }
                                }
                                for (var j = 0; j < turmasExternas.length; j++) {
                                    if (turmasExternas[j].periodo == 1 && turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina) {
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
                }
                //Eletivas está selecionado:
                var eletiva = true
                if(_.indexOf(this.cursos, 5) > -1){
                    for(var t = 0; t<turmas.length;t++){
                        for(var d = 0; d<disciplinaGrades.length; d++){
                            if(turmas[t].Disciplina===disciplinaGrades[d].Disciplina){
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

                this.$store.commit('redefinirAtivas1', {Ativas: this.ativos1})
            },

            createHorarios2: function () {
                var grade
                var grades
                var inicio = 1
                var fim
                var pedidos
                var pedidosExternos
                var disciplinaGrades = this.$store.state.disciplinaGrade.DisciplinaGrades
                var turmas = _.filter(this.$store.state.turma.Turmas, ['periodo', 3])
                var turmasExternas = this.$store.state.turmaExterna.Turmas
                var anoAtual = this.$store.state.year
                var semestreAtual = 1

                if(this.$store.state.curso.Cursos[0].semestreInicial==1){
                    this.evenCCN = "true"
                }else if (this.$store.state.curso.Cursos[0].semestreInicial==2){
                    this.evenCCN = "false"
                }

                if(this.$store.state.curso.Cursos[1].semestreInicial==1){
                    this.evenEC = "true"
                }else if(this.$store.state.curso.Cursos[1].semestreInicial==2){
                    this.evenEC = "false"
                }

                if(this.$store.state.curso.Cursos[2].semestreInicial==1){
                    this.evenSI = "true"
                }else if(this.$store.state.curso.Cursos[2].semestreInicial==2){
                    this.evenSI = "false"
                }

                if(this.$store.state.curso.Cursos[3].semestreInicial==1){
                    this.evenCCD = "true"
                }else if(this.$store.state.curso.Cursos[3].semestreInicial==2){
                    this.evenCCD = "false"
                }

                //CC Diurno está selecionado
                if (_.indexOf(this.cursos, 1) > -1) {

                    grades = _.filter(this.$store.state.grade.Grades, ['Curso', 4])
                    grades = _.orderBy(grades, 'periodoInicio', 'desc')
                    pedidos = []
                    for (var t in this.$store.state.pedido.Pedidos){
                        for (var pedido in this.$store.state.pedido.Pedidos[t]){
                            if(this.$store.state.pedido.Pedidos[t][pedido].Curso===4){
                                pedidos.push(this.$store.state.pedido.Pedidos[t][pedido])
                            }
                        }
                    }
                    pedidosExternos = _.filter(this.$store.state.pedidoExterno.Pedidos, ['Curso', 4])

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
                            fim = 1 + 2*(parseInt(anoAtual, 10) - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (parseInt(semestreAtual, 10) - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
                        else
                            fim = inicio - 1 + 2*(parseInt(grades[i-1].periodoInicio.slice(0,4), 10) - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (parseInt(grades[i-1].periodoInicio.slice(5,6), 10) - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
                        for (var k = 0; k < disciplinaGrades.length; k++) {
                            if ((disciplinaGrades[k].Grade == grade) && (this.isEven(disciplinaGrades[k].periodo) == this.evenCCD) && (disciplinaGrades[k].periodo >= parseInt(inicio, 10)) && (disciplinaGrades[k].periodo <= parseInt(fim, 10))) {
                                for (var j = 0; j < turmas.length; j++) {
                                    if (turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                                        for (var p = 0; p < pedidos.length; p++) {
                                            if ((pedidos[p].vagasPeriodizadas > 0) && (pedidos[p].Turma == turmas[j].id)) {
                                                this.ativos2.CCD[disciplinaGrades[k].periodo - 1].push(turmas[j])
                                            }
                                        }
                                    }
                                }
                                for (var j = 0; j < turmasExternas.length; j++) {
                                    if (turmasExternas[j].periodo == 3 && turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                                        for (var p = 0; p < pedidosExternos.length; p++) {
                                            if ((pedidosExternos[p].vagasPeriodizadas > 0) && (pedidosExternos[p].Turma == turmasExternas[j].id)) {
                                                this.ativos2.CCD[disciplinaGrades[k].periodo - 1].push(turmasExternas[j])
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                //CC Noturno está selecionado
                if (_.indexOf(this.cursos, 2) > -1) {
                    grades = _.filter(this.$store.state.grade.Grades, ['Curso', 1])
                    grades = _.orderBy(grades, 'periodoInicio', 'desc')
                    pedidos = []
                    for (var t in this.$store.state.pedido.Pedidos){
                        for (var pedido in this.$store.state.pedido.Pedidos[t]){
                            if(this.$store.state.pedido.Pedidos[t][pedido].Curso===1){
                                pedidos.push(this.$store.state.pedido.Pedidos[t][pedido])
                            }
                        }
                    }
                    pedidosExternos = _.filter(this.$store.state.pedidoExterno.Pedidos, ['Curso', 1])
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
                            fim = 1 + 2*(parseInt(anoAtual, 10) - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (parseInt(semestreAtual, 10) - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
                        else
                            fim = inicio - 1 + 2*(parseInt(grades[i-1].periodoInicio.slice(0,4), 10) - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (parseInt(grades[i-1].periodoInicio.slice(5,6), 10) - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
                        for (var k = 0; k < disciplinaGrades.length; k++) {
                            if ((disciplinaGrades[k].Grade == grade) && (this.isEven(disciplinaGrades[k].periodo) == this.evenCCN) && (disciplinaGrades[k].periodo >= parseInt(inicio, 10)) && (disciplinaGrades[k].periodo <= parseInt(fim, 10))) {
                                for (var j = 0; j < turmas.length; j++) {
                                    if (turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                                        for (var p = 0; p < pedidos.length; p++) {
                                            if ((pedidos[p].vagasPeriodizadas > 0) && (pedidos[p].Turma == turmas[j].id)) {
                                                this.ativos2.CCN[disciplinaGrades[k].periodo - 1].push(turmas[j])
                                            }
                                        }
                                    }
                                }
                                for (var j = 0; j < turmasExternas.length; j++) {
                                    if (turmasExternas[j].periodo == 3 && turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                                        for (var p = 0; p < pedidosExternos.length; p++) {
                                            if ((pedidosExternos[p].vagasPeriodizadas > 0) && (pedidosExternos[p].Turma == turmasExternas[j].id)) {
                                                this.ativos2.CCN[disciplinaGrades[k].periodo - 1].push(turmasExternas[j])
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                //SI está selecionado
                if (_.indexOf(this.cursos, 3) > -1) {
                    grades = _.filter(this.$store.state.grade.Grades, ['Curso', 3])
                    grades = _.orderBy(grades, 'periodoInicio', 'desc')
                    pedidos = []
                    for (var t in this.$store.state.pedido.Pedidos){
                        for (var pedido in this.$store.state.pedido.Pedidos[t]){
                            if(this.$store.state.pedido.Pedidos[t][pedido].Curso===3){
                                pedidos.push(this.$store.state.pedido.Pedidos[t][pedido])
                            }
                        }
                    }
                    pedidosExternos = _.filter(this.$store.state.pedidoExterno.Pedidos, ['Curso', 3])
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
                            fim = 1 + 2*(parseInt(anoAtual, 10) - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (parseInt(semestreAtual, 10) - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
                        else
                            fim = inicio - 1 + 2*(parseInt(grades[i-1].periodoInicio.slice(0,4), 10) - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (parseInt(grades[i-1].periodoInicio.slice(5,6), 10) - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
                        for (var k = 0; k < disciplinaGrades.length; k++) {
                            if ((disciplinaGrades[k].Grade == grade) && (this.isEven(disciplinaGrades[k].periodo) == this.evenSI) && (disciplinaGrades[k].periodo >= parseInt(inicio, 10)) && (disciplinaGrades[k].periodo <= parseInt(fim, 10))) {
                                for (var j = 0; j < turmas.length; j++) {
                                    if (turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                                        for (var p = 0; p < pedidos.length; p++) {
                                            if ((pedidos[p].vagasPeriodizadas > 0) && (pedidos[p].Turma == turmas[j].id)) {
                                                this.ativos2.SI[disciplinaGrades[k].periodo - 1].push(turmas[j])
                                            }
                                        }
                                    }
                                }
                                for (var j = 0; j < turmasExternas.length; j++) {
                                    if (turmasExternas[j].periodo == 3 && turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                                        for (var p = 0; p < pedidosExternos.length; p++) {
                                            if ((pedidosExternos[p].vagasPeriodizadas > 0) && (pedidosExternos[p].Turma == turmasExternas[j].id)) {
                                                this.ativos2.SI[disciplinaGrades[k].periodo - 1].push(turmasExternas[j])
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                //Engenharia Computacional está selecionado
                if (_.indexOf(this.cursos, 4) > -1) {
                    grades = _.filter(this.$store.state.grade.Grades, ['Curso', 2])
                    grades = _.orderBy(grades, 'periodoInicio', 'desc')
                    pedidos = []
                    for (var t in this.$store.state.pedido.Pedidos){
                        for (var pedido in this.$store.state.pedido.Pedidos[t]){
                            if(this.$store.state.pedido.Pedidos[t][pedido].Curso===2){
                                pedidos.push(this.$store.state.pedido.Pedidos[t][pedido])
                            }
                        }
                    }
                    pedidosExternos = _.filter(this.$store.state.pedidoExterno.Pedidos, ['Curso', 2])
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
                            fim = 1 + 2*(parseInt(anoAtual, 10) - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (parseInt(semestreAtual, 10) - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
                        else
                            fim = inicio - 1 + 2*(parseInt(grades[i-1].periodoInicio.slice(0,4), 10) - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (parseInt(grades[i-1].periodoInicio.slice(5,6), 10) - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
                        for (var k = 0; k < disciplinaGrades.length; k++) {
                            if ((disciplinaGrades[k].Grade == grade) && (this.isEven(disciplinaGrades[k].periodo) == this.evenEC) && (disciplinaGrades[k].periodo >= parseInt(inicio, 10)) && (disciplinaGrades[k].periodo <= parseInt(fim, 10))) {
                                for (var j = 0; j < turmas.length; j++) {
                                    if (turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                                        for (var p = 0; p < pedidos.length; p++) {
                                            if ((pedidos[p].vagasPeriodizadas > 0) && (pedidos[p].Turma == turmas[j].id)) {
                                                this.ativos2.EC[disciplinaGrades[k].periodo - 1].push(turmas[j])
                                            }
                                        }
                                    }
                                }
                                for (var j = 0; j < turmasExternas.length; j++) {
                                    if (turmasExternas[j].periodo == 3 && turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                                        for (var p = 0; p < pedidosExternos.length; p++) {
                                            if ((pedidosExternos[p].vagasPeriodizadas > 0) && (pedidosExternos[p].Turma == turmasExternas[j].id)) {
                                                this.ativos2.EC[disciplinaGrades[k].periodo - 1].push(turmasExternas[j])
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                //Eletivas está selecionado:
                var eletiva = true
                if(_.indexOf(this.cursos, 5) > -1){
                    for(var t = 0; t<turmas.length;t++){
                        for(var d = 0; d<disciplinaGrades.length; d++){
                            if(turmas[t].Disciplina===disciplinaGrades[d].Disciplina){
                                eletiva = false
                            }
                        }
                        if(eletiva){
                            this.ativos2.Eletivas.push(turmas[t])
                        }else{
                            eletiva = true
                        }
                    }
                }

                this.$store.commit('redefinirAtivas2', {Ativas: this.ativos2})
            },

            horarioVazio(curso){
                if(curso.length!=0)
                    return true
                else
                    return false
            },

            checkPeriodo(turma, periodo){
                for (var g=0;g<this.$store.state.disciplinaGrade.DisciplinaGrades.length;g++){
                    if(this.$store.state.disciplinaGrade.DisciplinaGrades[g].Disciplina==turma && this.$store.state.disciplinaGrade.DisciplinaGrades[g].periodo==periodo) {
                        return true
                    }
                }
            },

            updateHorarios(){
                for (var i=0;i<10;i++) {
                    for (var j = 0; j < this.ativos1.CCD[i].length; j++)
                        for (var k = 0; k < this.$store.state.turma.Turmas.length; k++) {
                            if (this.ativos1.CCD[i][j].id == this.$store.state.turma.Turmas[k].id) {
                                this.ativos1.CCD[i].splice(j, 1, this.$store.state.turma.Turmas[k])
                            }
                        }
                    for (var j = 0; j < this.ativos1.CCN[i].length; j++)
                        for (var k = 0; k < this.$store.state.turma.Turmas.length; k++) {
                            if (this.ativos1.CCN[i][j].id == this.$store.state.turma.Turmas[k].id) {
                                this.ativos1.CCN[i].splice(j, 1, this.$store.state.turma.Turmas[k])
                            }
                        }
                    for (var j = 0; j < this.ativos1.EC[i].length; j++)
                        for (var k = 0; k < this.$store.state.turma.Turmas.length; k++) {
                            if (this.ativos1.EC[i][j].id == this.$store.state.turma.Turmas[k].id) {
                                this.ativos1.EC[i].splice(j, 1, this.$store.state.turma.Turmas[k])
                            }
                        }
                    for (var j = 0; j < this.ativos1.SI[i].length; j++)
                        for (var k = 0; k < this.$store.state.turma.Turmas.length; k++) {
                            if (this.ativos1.SI[i][j].id == this.$store.state.turma.Turmas[k].id) {
                                this.ativos1.SI[i].splice(j, 1, this.$store.state.turma.Turmas[k])
                            }
                        }
                }

                this.$store.commit('redefinirAtivas1', {Ativas: this.ativos1})

                for (var i=0;i<10;i++) {
                    for (var j = 0; j < this.ativos2.CCD[i].length; j++)
                        for (var k = 0; k < this.$store.state.turma.Turmas.length; k++) {
                            if (this.ativos2.CCD[i][j].id == this.$store.state.turma.Turmas[k].id) {
                                this.ativos2.CCD[i].splice(j, 1, this.$store.state.turma.Turmas[k])
                            }
                        }
                    for (var j = 0; j < this.ativos2.CCN[i].length; j++)
                        for (var k = 0; k < this.$store.state.turma.Turmas.length; k++) {
                            if (this.ativos2.CCN[i][j].id == this.$store.state.turma.Turmas[k].id) {
                                this.ativos2.CCN[i].splice(j, 1, this.$store.state.turma.Turmas[k])
                            }
                        }
                    for (var j = 0; j < this.ativos2.EC[i].length; j++)
                        for (var k = 0; k < this.$store.state.turma.Turmas.length; k++) {
                            if (this.ativos2.EC[i][j].id == this.$store.state.turma.Turmas[k].id) {
                                this.ativos2.EC[i].splice(j, 1, this.$store.state.turma.Turmas[k])
                            }
                        }
                    for (var j = 0; j < this.ativos2.SI[i].length; j++)
                        for (var k = 0; k < this.$store.state.turma.Turmas.length; k++) {
                            if (this.ativos2.SI[i][j].id == this.$store.state.turma.Turmas[k].id) {
                                this.ativos2.SI[i].splice(j, 1, this.$store.state.turma.Turmas[k])
                            }
                        }
                }

                this.$store.commit('redefinirAtivas1', {Ativas2: this.ativos2})


            }

        },

        computed: {

            Grades () {
                return this.$store.state.grade.Grades
            },

            Cursos () {
                return this.$store.state.curso.Cursos
            },

            Turmas () {
                return this.$store.state.turma.Turmas
            },

            Disciplinas () {
                return this.$store.state.disciplina.Disciplinas
            },

            DisciplinaGrades () {
                return this.$store.state.disciplinaGrade.DisciplinaGrades
            },

            GradesCCD () {
                return _.filter(this.$store.state.grade.Grades, ['Curso', 1])
            },

            GradesCCN () {
                return _.filter(this.$store.state.grade.Grades, ['Curso', 2])
            },
            GradesSI () {
                return _.filter(this.$store.state.grade.Grades, ['Curso', 3])
            },

            GradesEC () {
                return _.filter(this.$store.state.grade.Grades, ['Curso', 4])
            },

            activeCCD () {
                return _.indexOf(this.cursos, 1)>-1
            },

            activeCCN () {
                return _.indexOf(this.cursos, 2)>-1
            },

            activeSI () {
                return _.indexOf(this.cursos, 3)>-1
            },

            activeEC () {
                return _.indexOf(this.cursos, 4)>-1
            },

            activeEletivas () {
                return _.indexOf(this.cursos, 5)>-1
            },

            Admin () {
                if(this.$store.state.auth.Usuario.admin===1){
                    return true
                }else{
                    return false
                }
            },

            CursosSelecionados () {
                return this.cursos.length
            }
        },

        watch: {
            Turmas (newTurmas, oldTurmas) {
                this.updateHorarios()
            },

            CursosSelecionados: function(){
                if(this.cursos.length === 5){
                    this.selectAll = true
                }else{
                    this.selectAll = false
                }
            }
        }
    }
</script>

<style scoped>

    .quant {
        margin: 10px;
        padding-left: 4.5px;
        padding-right: 4.5px;
        padding-top: 0px;
        padding-bottom: 10.5px;
        height: 25px;
        width:25px;
        border-radius: 15px;
    }

    .periodo{
        display: inline;
        width: 72px;
        height: 24px;
        position:relative;
    }

    .relatorio {
        position:relative;
        margin-top: 10px;
    }

    td {
        width:91px !important;
        text-align: center !important;
    }

    th{
        text-align:center !important;
    }

    .tg  {border-collapse:collapse;border-spacing:0;border-color:#ccc;}
    .tg td{font-family:Arial, sans-serif;font-size:10px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:#ccc;color:#333;background-color:#fff;}
    .tg th{font-family:Arial, sans-serif;font-size:10px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:#ccc;color:#333;background-color:#f0f0f0;}
    .tg .tg-0lax{vertical-align:center}
</style>