<template>
    <div>
        <template v-if="horarioVazio(Eletivas)">
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
                    <td class="tg-0lax"><template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    <td class="tg-0lax"><template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    <td class="tg-0lax"><template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    <td class="tg-0lax"><template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    <td class="tg-0lax"><template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                </tr>

                <tr>
                    <td class="tg-0lax">10-12</td>
                    <td class="tg-0lax"><template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    <td class="tg-0lax"><template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    <td class="tg-0lax"><template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    <td class="tg-0lax"><template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    <td class="tg-0lax"><template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                </tr>

                <tr>
                    <td class="tg-0lax">14-16</td>
                    <td class="tg-0lax"><template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    <td class="tg-0lax"><template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    <td class="tg-0lax"><template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    <td class="tg-0lax"><template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    <td class="tg-0lax"><template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                </tr>

                <tr>
                    <td class="tg-0lax">16-18</td>
                    <td class="tg-0lax"><template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    <td class="tg-0lax"><template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    <td class="tg-0lax"><template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    <td class="tg-0lax"><template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    <td class="tg-0lax"><template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                </tr>

                <tr>
                    <td class="tg-0lax">19-21</td>
                    <td class="tg-0lax"><template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    <td class="tg-0lax"><template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    <td class="tg-0lax"><template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    <td class="tg-0lax"><template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    <td class="tg-0lax"><template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                </tr>

                <tr>
                    <td class="tg-0lax">21-23</td>
                    <td class="tg-0lax"><template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    <td class="tg-0lax"><template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    <td class="tg-0lax"><template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    <td class="tg-0lax"><template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    <td class="tg-0lax"><template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                </tr>

            </table>
        </template>
    </div>
</template>
<script>
    import _ from 'lodash'

    export default{
        name:'HorarioEletivas',
        props: {
            Eletivas: Array
        },

        methods: {
            horarioVazio(c){
                if(c.length!=0)
                    return true
                else
                    return false
            },
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