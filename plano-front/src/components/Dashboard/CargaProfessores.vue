<template>
    <div class="DashboardCargaProfessores row">
        <div
                class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Carga Professores</h1>
            <p v-on:click="pdf1">teste 1</p>
            <p v-on:click="pdf2">teste 2</p>
        </div>
        <div style="width: 100%; height: 80vh; overflow: scroll" class="element" ref="carga">
        <table class="table table-hover table-sm">
            <thead class="thead-light">
            <tr>
                <th scope="col">Nome</th>
                <th scope="col">S.</th>
                <th scope="col">Disciplina</th>
                <th scope="col"></th>
                <th scope="col">T.</th>
                <th scope="col">Horário</th>
                <th scope="col" id="creditos1">
                    CS1
                    <b-popover :target="'creditos1'" :placement="bottom" triggers="hover focus">
                        <p>Somatório dos créditos no 1º semestre</p>
                    </b-popover>
                </th>
                <th scope="col" id="creditos2">
                    CS2
                    <b-popover :target="'creditos2'" :placement="bottom" triggers="hover focus">
                        <p>Somatório dos créditos no 2º semestre</p>
                    </b-popover>
                </th>
                <th scope="col" id="creditostotal">
                    CTotal
                    <b-popover :target="'creditostotal'" :placement="bottom" triggers="hover focus">
                        <p>Somatório total dos créditos</p>
                    </b-popover>
                </th>
            </tr>
            </thead>
            <tbody>
            <template v-if="Professores.length > 0">
            <template v-for="professor in Professores">
                <template v-if="turmas(professor).length > 0">
                    <td>{{professor.apelido}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{{creditos1(professor)}}</td>
                    <td>{{creditos2(professor)}}</td>
                    <td>{{creditos(professor)}}</td>
                </template>

                <template v-for="disciplina in Disciplinas">
                    <tr v-for="turma in turmas(professor)" v-if="turma.Disciplina===disciplina.id && (turma.Docente1===professor.id || turma.Docente2===professor.id)" :key="turma.id">
                        <td></td>
                        <td>{{turma.periodo}}</td>
                        <td>{{disciplina.codigo}}</td>
                        <td>{{disciplina.nome}}</td>
                        <td>{{turma.letra}}</td>
                        <td>
                            <template v-for="horario in Horarios" v-if="horario.id===turma.Horario1">{{horario.horario}}</template>
                            <template v-for="horario in Horarios" v-if="horario.id===turma.Horario2"> / {{horario.horario}}</template>
                        </td>
                        <td v-if="turma.periodo===1">{{disciplina.cargaTeorica + disciplina.cargaPratica}}</td>
                        <td v-else></td>
                        <td v-if="turma.periodo===3">{{disciplina.cargaTeorica + disciplina.cargaPratica}}</td>
                        <td v-else></td>
                        <td></td>
                    </tr>
                </template>
                <template v-for="carga in CargasPos" v-if="carga.Docente===professor.id">
                    <tr>
                        <td></td>
                        <td>{{carga.trimestre}}</td>
                        <td></td>
                        <td>Disciplina do {{carga.programa}}</td>
                        <td></td>
                        <td></td>
                        <td v-if="carga.trimestre==1 || carga.trimestre==2">{{carga.creditos}}</td>
                        <td v-else></td>
                        <td v-if="carga.trimestre==3">{{carga.creditos}}</td>
                        <td v-else></td>
                        <td></td>
                    </tr>
                </template>


            </template>
            </template>
            <template v-else>
                <tr>
                    <td colspan="2" class="text-center"><i class="fas fa-exclamation-triangle"></i> Nenhum curso encontrado!
                    </td>
                </tr>
            </template>
            </tbody>
        </table>
        </div>
    </div>

</template>

<script>
    import _ from 'lodash'
    import jsPDF from 'jspdf'
    import html2canvas from 'html2canvas'
    export default {
        name: 'DashboardCargaProfessores',

        methods: {

            pdf1() {

                var pdfMake = require('pdfmake/build/pdfmake.js')
                if (pdfMake.vfs == undefined){
                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                    pdfMake.vfs = pdfFonts.pdfMake.vfs;
                }
                var tables = [
                    {text: 'Carga Professores', alignment:'center', bold:true, margin:[0,0,0,30]},
                    {
                        style: 'tableExample',
                        table: {
                            widths: [8, 68, '*', 18, 104, 16, 16],
                            headerRows:1,
                            color: '#426',
                            body: [
                                [{text:'S', bold:true}, {text:'Disciplina', colSpan:2, bold:true}, '', {text:'T', alignment:'center', bold:true}, {text:'Horário', alignment: 'center', bold:true}, {text:'C1', bold:true}, {text:'C2', bold:true}],
                                /*[{text:'ALESSANDREIA', colSpan:5}, '', '', '', '', {text:'0', colSpan:2, alignment:'center'}, ''],
                                ['1', 'DCC061', 'Engenharia de Software', 'A', '2a 14-16 / 4a 16-18', '4', '0'],*/
                            ]
                        }
                    }]
                var professores = _.orderBy(this.$store.state.docente.Docentes, 'nome')
                for(var i = 0; i < professores.length; i++){
                    var cargatotal = 0
                    tables[1].table.body.push([{text:professores[i].apelido, colSpan:5, bold:true}, '', '', '', '', this.creditos1(professores[i]), this.creditos2(professores[i])])
                    var turmasProf = this.turmas(professores[i])
                    for(var j = 0; j < turmasProf.length; j++){
                        var disciplina = undefined
                        var horario1 = undefined
                        var horario2 = undefined
                        var c1 = 0
                        var c2 = 0
                        for (var k = 0; k < this.$store.state.disciplina.Disciplinas.length; k++){
                            if(turmasProf[j].Disciplina === this.$store.state.disciplina.Disciplinas[k].id){
                                disciplina = this.$store.state.disciplina.Disciplinas[k]
                            }
                        }
                        for(var l = 0; l < this.$store.state.horario.Horarios.length; l++){
                            if(turmasProf[j].Horario1 === this.$store.state.horario.Horarios[l].id){
                                horario1 = this.$store.state.horario.Horarios[l]
                            }
                        }

                        for(var m = 0; m < this.$store.state.horario.Horarios.length; m++){
                            if(turmasProf[j].Horario2 === this.$store.state.horario.Horarios[m].id){
                                horario2 = this.$store.state.horario.Horarios[m]
                            }
                        }
                        if(horario2 === undefined){
                            var horarioTotal = horario1.horario
                        }else{
                            var horarioTotal = horario1.horario + '/' + horario2.horario
                        }
                        if(turmasProf[j].periodo == 1){
                            c1 = disciplina.cargaTeorica + disciplina.cargaPratica
                        }else{
                            c2 = disciplina.cargaTeorica + disciplina.cargaPratica
                        }
                        tables[1].table.body.push([turmasProf[j].periodo, {text:disciplina.codigo, alignment:'center'}, disciplina.nome, {text:turmasProf[j].letra, alignment:'center'}, {text:horarioTotal, alignment:'center'}, c1, c2])
                    }
                    for(var n = 0; n < this.$store.state.cargaPos.Cargas.length; n++){
                        var c1 = 0
                        var c2 = 0
                        if(this.$store.state.cargaPos.Cargas[n].Docente===professores[i].id){
                            if(this.$store.state.cargaPos.Cargas[n].trimestre === 1 || this.$store.state.cargaPos.Cargas[n].trimestre === 2){
                                c1 = this.$store.state.cargaPos.Cargas[n].creditos
                            }else{
                                c2 = this.$store.state.cargaPos.Cargas[n].creditos
                            }
                            tables[1].table.body.push([this.$store.state.cargaPos.Cargas[n].trimestre, {text:'Disciplina do '+this.$store.state.cargaPos.Cargas[n].programa, colSpan: 2}, '', '', '', c1, c2])
                        }
                    }
                }

                var docDefinition = { content: tables }
                pdfMake.createPdf(docDefinition).open()
            },

            pdf2() {

                var pdfMake = require('pdfmake/build/pdfmake.js')
                if (pdfMake.vfs == undefined){
                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                    pdfMake.vfs = pdfFonts.pdfMake.vfs;
                }
                var tables = [
                    {text: 'Carga Professores', alignment:'center', bold:true, margin:[0,0,0,20]},
                ]
                var professores = _.orderBy(this.$store.state.docente.Docentes, 'nome')
                for(var i = 0; i < professores.length; i++){
                    var cargatotal = 0
                    tables.push({columns:[{text: professores[i].apelido, bold:true}, {text: 'C1: ' + this.creditos1(professores[i]) + '/C2: ' + this.creditos2(professores[i]), alignment:'right'}], margin:[0, 10, 0, 10]})
                    tables.push({
                        style: 'tableExample',
                        table: {
                            widths: [8, 68, '*', 18, 104, 16, 16],
                            headerRows:1,
                            color: '#426',
                            body: [
                                [{text:'S', bold:true}, {text:'Disciplina', colSpan:2, bold:true}, '', {text:'T', alignment:'center', bold:true}, {text:'Horário', alignment: 'center', bold:true}, {text:'C1', bold:true}, {text:'C2', bold:true}],
                            ]
                        }
                    })
                    var turmasProf = this.turmas(professores[i])
                    for(var j = 0; j < turmasProf.length; j++){
                        var disciplina = undefined
                        var horario1 = undefined
                        var horario2 = undefined
                        var c1 = 0
                        var c2 = 0
                        for (var k = 0; k < this.$store.state.disciplina.Disciplinas.length; k++){
                            if(turmasProf[j].Disciplina === this.$store.state.disciplina.Disciplinas[k].id){
                                disciplina = this.$store.state.disciplina.Disciplinas[k]
                            }
                        }
                        for(var l = 0; l < this.$store.state.horario.Horarios.length; l++){
                            if(turmasProf[j].Horario1 === this.$store.state.horario.Horarios[l].id){
                                horario1 = this.$store.state.horario.Horarios[l]
                            }
                        }

                        for(var m = 0; m < this.$store.state.horario.Horarios.length; m++){
                            if(turmasProf[j].Horario2 === this.$store.state.horario.Horarios[m].id){
                                horario2 = this.$store.state.horario.Horarios[m]
                            }
                        }
                        if(horario2 === undefined){
                            var horarioTotal = horario1.horario
                        }else{
                            var horarioTotal = horario1.horario + '/' + horario2.horario
                        }
                        if(turmasProf[j].periodo == 1){
                            c1 = disciplina.cargaTeorica + disciplina.cargaPratica
                        }else{
                            c2 = disciplina.cargaTeorica + disciplina.cargaPratica
                        }
                        tables[2+2*i].table.body.push([turmasProf[j].periodo, {text:disciplina.codigo, alignment:'center'}, disciplina.nome, {text:turmasProf[j].letra, alignment:'center'}, {text:horarioTotal, alignment:'center'}, c1, c2])
                    }
                    for(var n = 0; n < this.$store.state.cargaPos.Cargas.length; n++){
                        var c1 = 0
                        var c2 = 0
                        if(this.$store.state.cargaPos.Cargas[n].Docente===professores[i].id){
                            if(this.$store.state.cargaPos.Cargas[n].trimestre === 1 || this.$store.state.cargaPos.Cargas[n].trimestre === 2){
                                c1 = this.$store.state.cargaPos.Cargas[n].creditos
                            }else{
                                c2 = this.$store.state.cargaPos.Cargas[n].creditos
                            }
                            tables[2+2*i].table.body.push([this.$store.state.cargaPos.Cargas[n].trimestre, {text:'Disciplina do '+this.$store.state.cargaPos.Cargas[n].programa, colSpan: 2}, '', '', '', c1, c2])
                        }
                    }
                }

                var docDefinition = { content: tables }
                pdfMake.createPdf(docDefinition).open()
            },

            turmas(professor){
                return _.filter(this.$store.state.turma.Turmas,(turma) => {
                    return (turma.Docente1===professor.id || turma.Docente2===professor.id)
                })
            },

            creditos1(professor){
                var c = 0
                for (var t = 0; t < this.$store.state.turma.Turmas.length; t++){
                    if(this.$store.state.turma.Turmas[t].periodo===1 && (this.$store.state.turma.Turmas[t].Docente1===professor.id || this.$store.state.turma.Turmas[t].Docente2===professor.id)){
                        for (var d = 0; d < this.$store.state.disciplina.Disciplinas.length; d++){
                            if(this.$store.state.disciplina.Disciplinas[d].id===this.$store.state.turma.Turmas[t].Disciplina){
                                c+=parseInt(this.$store.state.disciplina.Disciplinas[d].cargaPratica, 10)
                                c+=parseInt(this.$store.state.disciplina.Disciplinas[d].cargaTeorica, 10)
                            }
                        }
                    }

                }
                for(var t = 0; t < this.$store.state.cargaPos.Cargas.length; t++){
                    if(this.$store.state.cargaPos.Cargas[t].Docente===professor.id){
                        if(this.$store.state.cargaPos.Cargas[t].trimestre==1 || this.$store.state.cargaPos.Cargas[t].trimestre==2){
                            c+= parseInt(this.$store.state.cargaPos.Cargas[t].creditos, 10)
                        }
                    }
                }
                return c
            },

            creditos2(professor){
                var c = 0
                for (var t = 0; t < this.$store.state.turma.Turmas.length; t++){
                    if(this.$store.state.turma.Turmas[t].periodo===3 && (this.$store.state.turma.Turmas[t].Docente1===professor.id || this.$store.state.turma.Turmas[t].Docente2===professor.id)){
                        for (var d = 0; d < this.$store.state.disciplina.Disciplinas.length; d++){
                            if(this.$store.state.disciplina.Disciplinas[d].id===this.$store.state.turma.Turmas[t].Disciplina){
                                c+=parseInt(this.$store.state.disciplina.Disciplinas[d].cargaPratica, 10)
                                c+=parseInt(this.$store.state.disciplina.Disciplinas[d].cargaTeorica, 10)
                            }
                        }
                    }

                }
                for(var t = 0; t < this.$store.state.cargaPos.Cargas.length; t++){
                    if(this.$store.state.cargaPos.Cargas[t].Docente===professor.id){
                        if(this.$store.state.cargaPos.Cargas[t].trimestre==3){
                            c+= parseInt(this.$store.state.cargaPos.Cargas[t].creditos, 10)
                        }
                    }
                }
                return c
            },

            creditos(professor){
                var c = 0
                for (var t = 0; t < this.$store.state.turma.Turmas.length; t++){
                    if(this.$store.state.turma.Turmas[t].Docente1===professor.id || this.$store.state.turma.Turmas[t].Docente2===professor.id){
                        for (var d = 0; d < this.$store.state.disciplina.Disciplinas.length; d++){
                            if(this.$store.state.disciplina.Disciplinas[d].id===this.$store.state.turma.Turmas[t].Disciplina){
                                c+=parseInt(this.$store.state.disciplina.Disciplinas[d].cargaPratica, 10)
                                c+=parseInt(this.$store.state.disciplina.Disciplinas[d].cargaTeorica, 10)
                            }
                        }
                    }

                }
                for(var t = 0; t < this.$store.state.cargaPos.Cargas.length; t++){
                    if(this.$store.state.cargaPos.Cargas[t].Docente===professor.id){
                        c+= parseInt(this.$store.state.cargaPos.Cargas[t].creditos, 10)

                    }
                }
                return c
            }
        },

        computed: {
            CargasPos () {
                return this.$store.state.cargaPos.Cargas
            },

            Disciplinas () {
                return _.orderBy(this.$store.state.disciplina.Disciplinas, 'nome')
            },
            Horarios () {
                return this.$store.state.horario.Horarios
            },
            Professores () {
                return _.orderBy(this.$store.state.docente.Docentes, 'nome')
            }
        }
    }
</script>

<style scoped>

    table {
        overflow: auto;
        max-height: 100%;
        max-width: 100%;
    }

    thead th {
        position: sticky;
        position: -webkit-sticky;
        top: -1px;
        background: white;
        z-index: 10;
    }

    .element::-webkit-scrollbar { width: 0 !important }

</style>