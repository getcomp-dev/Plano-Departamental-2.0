<template>
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
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
        </tr>

        <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
            <td class="tg-0lax"><template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
        </tr>
    </table>
</template>
<script>
    import _ from 'lodash'

    export default {
        name:'HorarioNoturno',
        props:{
            Turmas:Array
        },

        methods: {
            checkTurmaHorario (turma, horario) {
                if(turma.Horario1==horario || turma.Horario2==horario) {
                    return true
                }else
                    return false
            },
        },

        computed: {
            Disciplinas () {
                return this.$store.state.disciplina.Disciplinas
            }
        }
    }
</script>
<style scoped>
    td {
        width:60px !important;
        text-align: center !important;
    }

    th{
        height: 20px !important;
        text-align:center !important;
    }

    .tg  {
        border-collapse:collapse;
        border-spacing:0;
        border-color:#ccc;
        margin-bottom: 20px;
    }
     .tg td{
        font-family:Arial, sans-serif;
        font-size:11px;
        padding:0px;
        border-style:solid;
        border-width:1px;
        overflow:hidden;
        word-break:normal;
        border-color:rgba(189, 189, 189, 0.644);
        color:#333;
        background-color:#fff;
    }
    .tg th,
    .tg-hor{
        font-family:Arial, sans-serif;
        font-size:11px;
        font-weight:bold;
        padding:0px;
        border-style:solid;
        border-width:1px;
        overflow:hidden;
        word-break:normal;
        border-color:rgba(189, 189, 189, 0.623);
        color:#333;
        background-color:#e9ecef !important;
    }
    .tg .tg-0lax{
        vertical-align:center;
        height: 18px;
    }
</style>