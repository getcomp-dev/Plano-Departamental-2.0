<template>
    <div class="Grades Disciplinas" style="height: calc(100vh - 48px)" v-if="Admin">
        <div class="d-flex center-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom" style="overflow: auto; width: 100%">
            <h1 class="h2 col-11">Grades Disciplinas</h1>
            <div class="col-1">
                <b-form-input v-model="novoAno" v-on:keyup.native.enter="runNovoAno" style="width:60px !important; height: 30px; float: right; position:relative; text-align: center"></b-form-input>
            </div>
        </div>

        <div style="height: 80vh; overflow-y: scroll; overflow-x: scroll;" ref = "mainTable">
            <table class="table table-hover table-sm">
                <thead class="thead-light">
                <tr>
                    <th scope="col" style="width: 72px;"><p style="text-align: center">Cod</p></th>
                    <th scope="col" style="width: 400px"><p style="text-align: center">Disciplina</p></th>
                    <th scope="col" style="width: 135px"><p style="text-align:center">76A</p></th>
                    <th scope="col" style="width: 135px"><p style="text-align:center">35A</p></th>
                    <th scope="col" style="width: 135px"><p style="text-align:center">65C</p></th>
                    <th scope="col" style="width: 135px"><p style="text-align:center">65B</p></th>
                </tr>
                </thead>
                <tbody>

                    <template v-for="perfil in Perfis">
                        <tr v-for="disciplina in inPerfil(perfil, Disciplinas)" :key="disciplina.id"  v-bind:style="{backgroundColor: perfil.cor}">
                            <td style="border-style: solid; border-width: 1px; border-color: whitesmoke;"><p style="text-align: center">{{disciplina.codigo}}<p/></td>
                            <td style="border-style: solid; border-width: 1px; border-color: whitesmoke;"><p>{{disciplina.nome}}</p></td>
                            <td style="border-style: solid; border-width: 1px; border-color: whitesmoke;"><p style=" text-align: center">

                                <template v-if="disciplinasGrades[disciplina.id][2][0].length !== 0"> <template v-for="d in disciplinasGrades[disciplina.id][2][0]">1º Semestre: {{d}}º Período </template> </template>
                                <template v-if="disciplinasGrades[disciplina.id][2][1].length !== 0"> <template v-for="d in disciplinasGrades[disciplina.id][2][1]">2º Semestre: {{d}}º Período </template> </template>

                            </p></td>
                            <td style="border-style: solid; border-width: 1px; border-color: whitesmoke;"><p style=" text-align: center">

                                <template v-if="disciplinasGrades[disciplina.id][0][0].length !== 0"> <template v-for="d in disciplinasGrades[disciplina.id][0][0]">1º Semestre: {{d}}º Período </template> </template>
                                <template v-if="disciplinasGrades[disciplina.id][0][1].length !== 0"> <template v-for="d in disciplinasGrades[disciplina.id][0][1]">2º Semestre: {{d}}º Período </template> </template>

                            </p></td>
                            <td style="border-style: solid; border-width: 1px; border-color: whitesmoke;"><p style=" text-align: center">

                                <template v-if="disciplinasGrades[disciplina.id][3][0].length !== 0"> <template v-for="d in disciplinasGrades[disciplina.id][3][0]">1º Semestre: {{d}}º Período </template> </template>
                                <template v-if="disciplinasGrades[disciplina.id][3][1].length !== 0"> <template v-for="d in disciplinasGrades[disciplina.id][3][1]">2º Semestre: {{d}}º Período </template> </template>

                            </p></td>
                            <td style="border-style: solid; border-width: 1px; border-color: whitesmoke;"><p style=" text-align: center">

                                <template v-if="disciplinasGrades[disciplina.id][1][0].length !== 0"> <template v-for="d in disciplinasGrades[disciplina.id][1][0]">1º Semestre: {{d}}º Período </template> </template>
                                <template v-if="disciplinasGrades[disciplina.id][1][1].length !== 0"> <template v-for="d in disciplinasGrades[disciplina.id][1][1]">2º Semestre: {{d}}º Período </template> </template>

                            </p></td>


                        </tr>
                    </template>

                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash'

    export default {

        name: 'GradeDisciplinas',

        data () {
            return {
                error: undefined,
                ano: undefined,
                novoAno: undefined,
                disciplinasGrades: {},
                grades:{
                    1: undefined, //CCN
                    2: undefined, //EC
                    3: undefined, //SI
                    4: undefined  //CCD
                },
                gradesAtivas:{
                   1: [], //CCN
                   2: [], //EC
                   3: [], //SI
                   4: []  //CCD
                }
            }
        },

        beforeMount: function () {
            this.ano = this.$store.state.plano.Plano[0].ano
            this.novoAno = this.ano
            this.runAll()
        },

        methods: {

            inPerfil: function (perfil, disciplinas) {//Verifica se uma disciplina faz parte de um perfil
                return disciplinas.filter(function (disciplina) {
                    return disciplina.Perfil===perfil.id
                })

            },

            runNovoAno: function () {//executa runAll, modificando o ano
                console.log("novo Ano")
              if(this.ano != this.novoAno){
                  this.ano = this.novoAno
                  this.runAll()
              }
            },

            runAll: function () {//cria objeto para armazenar os períodos das disciplinas e chama as funções que a populam
                this.$store.state.disciplina.Disciplinas.forEach( d => {
                    this.disciplinasGrades[d.id] = [[[], []], [[], []], [[], []], [[], []]]//inisializa os períodos em 0 [Primeiro Semestre, Segundo Semestre]
                })
                this.getGrades()
                this.get1Periodo()
                this.get2Periodo()
            },

            getGrades: function () {//popula as grades disponíveis de cada curso em um objeto
                for(let i = 1; i <= 4; i++){
                    this.grades[i] = _.orderBy(_.filter(this.$store.state.grade.Grades, ['Curso', i]), 'periodoInicio', 'desc')
                }
            },

            get1Periodo: function () {//Armazena os períodos de cada disciplina no primeiro semestre
                //retorna lista com os ids das disciplinas
                let disciplinas = Object.keys(this.disciplinasGrades)
                //marca o último período em que uma grade é válida
                for(let i = 1; i <= 4; i++){
                    this.grades[i].forEach(g => {
                        let fim = 1 + 2*(this.ano - parseInt(g.periodoInicio.slice(0,4), 10)) + ((1 - parseInt(g.periodoInicio.slice(5,6), 10))/2)
                        if(fim > 10){
                            fim = 10
                        }
                        this.gradesAtivas[i].push({grade: g, fim:fim})
                    })
                    if(this.gradesAtivas[i][this.gradesAtivas[i].length - 1].fim !== 10){
                        this.gradesAtivas[i][this.gradesAtivas[i].length - 1].fim = 10
                    }
                }

                disciplinas.forEach(d => {
                    for(let i = 1; i <= 4; i++){//ids dos cursos de computação
                        let gradedisciplina
                        let curso = _.find(this.$store.state.curso.Cursos, ['id', i])
                        for(let j = 0; j < this.gradesAtivas[i].length; j++){//itera pelas grades de um curso, começando da mais recente (lista ordenada)
                            gradedisciplina = _.find(this.$store.state.disciplinaGrade.DisciplinaGrades, { 'Disciplina': parseInt(d, 10), 'Grade':this.gradesAtivas[i][j].grade.id})//Encontra a disciplina nas grades da computação, começando pela mais recente. Caso não encontre, retorna undefined
                            if(gradedisciplina !== undefined){//verifica se a disciplina está na grade procurada
                                if(gradedisciplina.periodo < this.gradesAtivas[i][j].grade.fim){//verifica se essa grade está sendo usada para essa disciplina(limite superior)
                                    if((j > 0) && (this.gradesAtivas[i][j].grade.fim < gradedisciplina.periodo) || j===0)//verifica se a disciplina não deveria estar incluída na grade anterior, ou se essa é a grade mais recente(limite inferior)
                                        break;//caso essa seja a grade correta, encerra o loop nas grades
                                    else
                                        gradedisciplina = undefined//necessário caso seja a última iteração do loop
                                }
                            }
                        }if(gradedisciplina !== undefined){
                            if((curso.semestreInicial === 1 || curso.semestreInicial === 3) &&(gradedisciplina.periodo % 2 === 1))//tem entrada de alunos no 1º semestre ou no 3º semestre -> terá períodos ímpares no primeiro semestre
                                this.disciplinasGrades[parseInt(d, 10)][i - 1][0].push(gradedisciplina.periodo)
                            if((curso.semestreInicial === 2 || curso.semestreInicial === 3) &&(gradedisciplina.periodo % 2 === 0))//tem entrada de alunos no 2º semestre ou no 3º semestre -> terá períodos pares no primeiro semestre
                                this.disciplinasGrades[parseInt(d, 10)][i - 1][0].push(gradedisciplina.periodo)
                        }
                    }
                })
            },

            get2Periodo: function () {//Armazena os períodos de cada disciplina no segundo semestre
                //retorna lista com os ids das disciplinas
                let disciplinas = Object.keys(this.disciplinasGrades)
                //marca o último período em que uma grade é válida
                for(let i = 1; i <= 4; i++){
                    this.grades[i].forEach(g => {
                        let fim = 1 + 2*(this.ano - parseInt(g.periodoInicio.slice(0,4), 10)) + ((3 - parseInt(g.periodoInicio.slice(5,6), 10))/2)
                        if(fim > 10){
                            fim = 10
                        }
                        this.gradesAtivas[i].push({grade: g, fim:fim})
                    })
                    if(this.gradesAtivas[i][this.gradesAtivas[i].length - 1].fim !== 10){
                        this.gradesAtivas[i][this.gradesAtivas[i].length - 1].fim = 10
                    }
                }

                disciplinas.forEach(d => {
                    for(let i = 1; i <= 4; i++){//ids dos cursos de computação
                        let gradedisciplina
                        let curso = _.find(this.$store.state.curso.Cursos, ['id', i])
                        for(let j = 0; j < this.gradesAtivas[i].length; j++){//itera pelas grades de um curso, começando da mais recente (lista ordenada)
                            gradedisciplina = _.find(this.$store.state.disciplinaGrade.DisciplinaGrades, { 'Disciplina': parseInt(d, 10), 'Grade':this.gradesAtivas[i][j].grade.id})//Encontra a disciplina nas grades da computação, começando pela mais recente. Caso não encontre, retorna undefined
                            if(gradedisciplina !== undefined){//verifica se a disciplina está na grade procurada
                                if(gradedisciplina.periodo < this.gradesAtivas[i][j].grade.fim){//verifica se essa grade está sendo usada para essa disciplina(limite superior)
                                    if((j > 0) && (this.gradesAtivas[i][j].grade.fim < gradedisciplina.periodo) || j===0)//verifica se a disciplina não deveria estar incluída na grade anterior, ou se essa é a grade mais recente(limite inferior)
                                        break;//caso essa seja a grade correta, encerra o loop nas grades
                                    else
                                        gradedisciplina = undefined//necessário caso seja a última iteração do loop
                                }
                            }
                        }if(gradedisciplina !== undefined){
                            if((curso.semestreInicial === 1 || curso.semestreInicial === 3) &&(gradedisciplina.periodo % 2 === 0))//tem entrada de alunos no 1º semestre ou no 3º semestre -> terá períodos pares no segundo semestre
                                this.disciplinasGrades[parseInt(d, 10)][i - 1][1].push(gradedisciplina.periodo)
                            if((curso.semestreInicial === 2 || curso.semestreInicial === 3) &&(gradedisciplina.periodo % 2 === 1))//tem entrada de alunos no 2º semestre ou no 3º semestre -> terá períodos ímpares no segundo semestre
                                this.disciplinasGrades[parseInt(d, 10)][i - 1][1].push(gradedisciplina.periodo)
                        }
                    }
                })
            }



        },

        computed: {
            Cursos () {
                return _.orderBy(this.$store.state.curso.Cursos, 'posicao')
            },

            CursosAtivos () {
                return this.$store.state.curso.Ativos
            },

            Disciplinas () {
                return this.$store.state.disciplina.Disciplinas
            },

            Docentes () {
                return _.orderBy(_.filter(this.$store.state.docente.Docentes, ['ativo', true]),'apelido')
            },

            Horarios () {
                return _.orderBy(this.$store.state.horario.Horarios,'horario')
            },

            Salas () {
                return _.orderBy(this.$store.state.sala.Salas,'nome')
            },

            Perfis () {
                return this.$store.state.perfil.Perfis
            },

            Turmas () {

                return _.orderBy(_.orderBy(_.filter(this.$store.state.turma.Turmas, function(t) { return t.Disciplina !== null}), 'letra'), 'Disciplina')
            },

            Deletar () {
                return this.$store.state.turma.Deletar
            },

            Pedidos () {
                return this.$store.state.pedido.Pedidos
            },

            isLoading () {
                return this.$store.state.isLoading
            },

            Admin () {
                if(this.$store.state.auth.Usuario.admin===1){
                    return true
                }else{
                    return false
                }
            }


        }
    }
</script>
<style scoped>

    .DashboardPrototipo{
        max-height: 90vh;
        max-width: 90vw;
        overflow: hidden;
    }

    table {
        font-size: 10px;
        table-layout: fixed;
        width: 1008px;
    }

    p {
        margin: 0px;
    }

    th {
        position: sticky;
        top: -1px;
    }

</style>
