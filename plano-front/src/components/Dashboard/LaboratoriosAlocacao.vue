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
                <h6>1º Semestre</h6>
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
                            <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        </tr>

                        <tr>
                            <td class="tg-0lax">10-12</td>
                            <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        </tr>

                        <tr>
                            <td class="tg-0lax">14-16</td>
                            <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        </tr>

                        <tr>
                            <td class="tg-0lax">16-18</td>
                            <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        </tr>

                        <tr>
                            <td class="tg-0lax">17-19</td>
                            <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 32)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 34)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 36)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 38)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 40)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        </tr>

                        <tr>
                            <td class="tg-0lax">19-21</td>
                            <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        </tr>

                        <tr>
                            <td class="tg-0lax">21-23</td>
                            <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                            <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        </tr>

                    </table>
                <h6>2º Semestre</h6>
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
                        <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">17-19</td>
                        <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 32)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 34)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 36)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 38)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 40)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                    </tr>
                </table>
            </div>
        </div>

    </div>
</template>

<script>
    import _ from 'lodash'
    import pdfs from '../../common/services/pdfs'
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

            checkTurmaLab (turma){
                let labs = _.filter(this.$store.state.sala.Salas, ['laboratorio', true])
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

            },

            checkTurmaHorario (turma, horario) {
                if(turma.Horario1==horario || turma.Horario2==horario) {
                    let sala = this.checkTurmaLab(turma)
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
            },

            pdf() {
                pdfs.pdfAlocacaoLabs()
            },

        },
        computed : {
            Laboratorios () {
                return _.filter(this.$store.state.sala.Salas, ['laboratorio', true])
            },

            Turmas1 () {
                return _.filter(this.$store.state.turma.Turmas, ['periodo', 1])
            },

            Turmas2 () {
                return _.filter(this.$store.state.turma.Turmas, ['periodo', 3])
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