<template>
    <div class="DashboardLaboratoriosAlocacao row">
        <div class="col-12">
            <div
                    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2">Laboratórios - Alocação</h1>
                <button type="button" class="btn btn-success col-sm-1" v-on:click.prevent="pdf" style=""> Relatório </button>
            </div>
            <div v-for="lab in Laboratorios">
                <h5>{{lab.nome}}</h5>
                    <table class="tg">
                        <tr>
                            <th class="tg-0lax">hora</th>
                            <th class="tg-0lax">Seg</th>
                            <th class="tg-0lax">Ter</th>
                            <th class="tg-0lax">Qua</th>
                            <th class="tg-0lax">Qui</th>
                            <th class="tg-0lax">Sex</th>
                        </tr>

                        <tr>
                            <td class="tg-0lax">08-10</td>
                            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        </tr>

                        <tr>
                            <td class="tg-0lax">10-12</td>
                            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        </tr>

                        <tr>
                            <td class="tg-0lax">14-16</td>
                            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        </tr>

                        <tr>
                            <td class="tg-0lax">16-18</td>
                            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        </tr>

                        <tr>
                            <td class="tg-0lax">19-21</td>
                            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        </tr>

                        <tr>
                            <td class="tg-0lax">21-23</td>
                            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        </tr>

                    </table>
            </div>
        </div>

    </div>
</template>

<script>
    import _ from 'lodash'
    export default {
        name: 'DashboardLaboratoriosAlocacao',
        data () {
            return {
                value:0
            }
        },
        created : function() {
          console.log(this.$store.state.sala.Salas)
          console.log(_.filter(this.$store.state.sala.Salas, ['laboratorio', true]))
        },

        methods : {
            checkTurmaHorario (turma, horario) {
                if(turma.Horario1==horario || turma.Horario2==horario) {
                    return true
                }else
                    return false
            },

            pdf() {

                var pdfMake = require('pdfmake/build/pdfmake.js')
                if (pdfMake.vfs == undefined){
                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                    pdfMake.vfs = pdfFonts.pdfMake.vfs;
                }
                var tables = []
                var laboratorios = _.filter(this.$store.state.sala.Salas, ['laboratorio', true])
                var disciplinas = this.$store.state.disciplina.Disciplinas
                var turmas = this.$store.state.turma.Turmas
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

        },
        computed : {
            Laboratorios () {
                return _.filter(this.$store.state.sala.Salas, ['laboratorio', true])
            },

            Turmas () {
                return this.$store.state.turma.Turmas
            },

            Disciplinas () {
                return this.$store.state.disciplina.Disciplinas
            }
        }
    }
</script>

<style scoped>
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