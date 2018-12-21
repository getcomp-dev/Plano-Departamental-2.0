<template>
    <div class="DashboardHorariosResumo row">
        <div class="col-12">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2">Horarios - Resumo</h1>
            </div>
            <!-- ----------------------------------------------------------------------------------------------- -->
            <h1>1º Período</h1>
            <!-- -------------------------------------------- CC Diurno ----------------------------------------- -->

            <h4>Ciência da Computação Diurno</h4>


            <template v-if="horarioVazio(ativos1.CCD[0])">
                <h5>1 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos1.CCD[1])">
                <h5>2 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos1.CCD[2])">
                <h5>3 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos1.CCD[3])">
                <h5>4 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos1.CCD[4])">
                <h5>5 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos1.CCD[5])">
                <h5>6 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos1.CCD[6])">
                <h5>7 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos1.CCD[7])">
                <h5>8 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos1.CCD[8])">
                <h5>9 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos1.CCD[9])">
                <h5>10 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <!-- -------------------------------------------- CC Noturno ----------------------------------------- -->

                <h4>Ciência da Computação Noturno</h4>


            <template v-if="horarioVazio(ativos1.CCN[0])">
                <h5>1 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[0]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[0]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[0]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[0]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[0]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[0]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[0]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[0]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[0]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[0]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos1.CCN[1])">
                <h5>2 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[1]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[1]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[1]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[1]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[1]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[1]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[1]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[1]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[1]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[1]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos1.CCN[2])">
                <h5>3 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[2]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[2]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[2]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[2]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[2]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[2]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[2]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[2]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[2]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[2]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos1.CCN[3])">
                <h5>4 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[3]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[3]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[3]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[3]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[3]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[3]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[3]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[3]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[3]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[3]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos1.CCN[4])">
                <h5>5 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[4]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[4]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[4]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[4]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[4]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[4]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[4]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[4]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[4]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[4]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos1.CCN[5])">
                <h5>6 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[5]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[5]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[5]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[5]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[5]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[5]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[5]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[5]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[5]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[5]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos1.CCN[6])">
                <h5>7 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[6]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[6]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[6]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[6]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[6]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[6]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[6]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[6]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[6]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[6]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos1.CCN[7])">
                <h5>8 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[7]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[7]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[7]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[7]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[7]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[7]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[7]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[7]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[7]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[7]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos1.CCN[8])">
                <h5>9 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[8]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[8]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[8]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[8]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[8]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[8]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[8]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[8]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[8]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[8]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos1.CCN[9])">
                <h5>10 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[9]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[9]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[9]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[9]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[9]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[9]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[9]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[9]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[9]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.CCN[9]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <!-- -------------------------------------------- SI ----------------------------------------- -->


                <h4>Sistemas de Informação</h4>


            <template v-if="horarioVazio(ativos1.SI[0])">
                <h5>1 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[0]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[0]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[0]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[0]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[0]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[0]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[0]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[0]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[0]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[0]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos1.SI[1])">
                <h5>2 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[1]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[1]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[1]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[1]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[1]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[1]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[1]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[1]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[1]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[1]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos1.SI[2])">
                <h5>3 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[2]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[2]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[2]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[2]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[2]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[2]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[2]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[2]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[2]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[2]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos1.SI[3])">
                <h5>4 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[3]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[3]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[3]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[3]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[3]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[3]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[3]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[3]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[3]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[3]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos1.SI[4])">
                <h5>5 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[4]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[4]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[4]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[4]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[4]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[4]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[4]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[4]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[4]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[4]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos1.SI[5])">
                <h5>6 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[5]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[5]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[5]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[5]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[5]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[5]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[5]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[5]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[5]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[5]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos1.SI[6])">
                <h5>7 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[6]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[6]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[6]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[6]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[6]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[6]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[6]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[6]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[6]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[6]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos1.SI[7])">
                <h5>8 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[7]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[7]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[7]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[7]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[7]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[7]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[7]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[7]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[7]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[7]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos1.SI[8])">
                <h5>9 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[8]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[8]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[8]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[8]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[8]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[8]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[8]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[8]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[8]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[8]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos1.SI[9])">
                <h5>10 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[9]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[9]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[9]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[9]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[9]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[9]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[9]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[9]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[9]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.SI[9]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <!-- -------------------------------------------- EC ----------------------------------------- -->


                <h4>Engenharia Computacional</h4>


            <template v-if="horarioVazio(ativos1.EC[0])">
                <h5>1 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos1.EC[1])">
                <h5>2 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos1.EC[2])">
                <h5>3 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos1.EC[3])">
                <h5>4 Período</h5>
                <table class="tg">
                    <tr>
                        <th class="tg-0lax">hora</th>
                        <th class="tg-0lax">Seg</th>EC                      <th class="tg-0lax">Ter</th>
                        <th class="tg-0lax">Qua</th>
                        <th class="tg-0lax">Qui</th>
                        <th class="tg-0lax">Sex</th>
                    </tr>


                    <tr>
                        <td class="tg-0lax">08-10</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos1.EC[4])">
                <h5>5 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos1.EC[5])">
                <h5>6 Período</h5>
                <table class="tg">
                    <tr>
                        <th class="tg-0lax">hora</th>
                        <th class="tg-0lax">Seg</th>
                        <th class="tg-0lax">Ter</th>
                        <th class="tg-0lax">Qua</th>
                        <th class="tg-0lax">Qui</th>
                        <th class="tg-0lax">Sex</th>EC                  </tr>


                    <tr>
                        <td class="tg-0lax">08-10</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos1.EC[6])">
                <h5>7 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos1.EC[7])">
                <h5>8 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos1.EC[8])">
                <h5>9 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos1.EC[9])">
                <h5>10 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

                <h4>Eletivas</h4>


            <template v-if="horarioVazio(ativos1.Eletivas)">
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
                        <td class="tg-0lax"><template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>


            <!-- ----------------------------------------------------------------------------------------------- -->
            <h1>2º Período</h1>
            <!-- -------------------------------------------- CC Diurno ----------------------------------------- -->

            <h4>Ciência da Computação Diurno</h4>


            <template v-if="horarioVazio(ativos2.CCD[0])">
                <h5>1 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos2.CCD[1])">
                <h5>2 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos2.CCD[2])">
                <h5>3 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos2.CCD[3])">
                <h5>4 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos2.CCD[4])">
                <h5>5 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos2.CCD[5])">
                <h5>6 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos2.CCD[6])">
                <h5>7 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos2.CCD[7])">
                <h5>8 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos2.CCD[8])">
                <h5>9 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos2.CCD[9])">
                <h5>10 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <!-- -------------------------------------------- CC Noturno ----------------------------------------- -->

            <h4>Ciência da Computação Noturno</h4>


            <template v-if="horarioVazio(ativos2.CCN[0])">
                <h5>1 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[0]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[0]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[0]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[0]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[0]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[0]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[0]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[0]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[0]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[0]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos2.CCN[1])">
                <h5>2 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[1]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[1]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[1]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[1]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[1]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[1]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[1]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[1]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[1]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[1]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos2.CCN[2])">
                <h5>3 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[2]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[2]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[2]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[2]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[2]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[2]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[2]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[2]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[2]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[2]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos2.CCN[3])">
                <h5>4 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[3]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[3]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[3]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[3]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[3]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[3]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[3]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[3]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[3]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[3]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos2.CCN[4])">
                <h5>5 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[4]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[4]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[4]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[4]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[4]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[4]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[4]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[4]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[4]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[4]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos2.CCN[5])">
                <h5>6 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[5]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[5]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[5]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[5]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[5]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[5]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[5]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[5]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[5]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[5]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos2.CCN[6])">
                <h5>7 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[6]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[6]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[6]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[6]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[6]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[6]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[6]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[6]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[6]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[6]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos2.CCN[7])">
                <h5>8 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[7]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[7]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[7]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[7]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[7]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[7]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[7]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[7]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[7]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[7]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos2.CCN[8])">
                <h5>9 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[8]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[8]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[8]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[8]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[8]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[8]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[8]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[8]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[8]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[8]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos2.CCN[9])">
                <h5>10 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[9]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[9]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[9]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[9]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[9]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[9]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[9]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[9]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[9]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.CCN[9]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <!-- -------------------------------------------- SI ----------------------------------------- -->


            <h4>Sistemas de Informação</h4>


            <template v-if="horarioVazio(ativos2.SI[0])">
                <h5>1 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[0]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[0]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[0]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[0]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[0]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[0]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[0]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[0]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[0]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[0]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos2.SI[1])">
                <h5>2 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[1]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[1]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[1]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[1]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[1]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[1]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[1]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[1]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[1]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[1]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos2.SI[2])">
                <h5>3 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[2]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[2]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[2]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[2]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[2]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[2]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[2]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[2]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[2]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[2]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos2.SI[3])">
                <h5>4 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[3]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[3]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[3]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[3]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[3]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[3]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[3]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[3]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[3]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[3]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos2.SI[4])">
                <h5>5 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[4]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[4]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[4]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[4]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[4]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[4]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[4]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[4]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[4]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[4]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos2.SI[5])">
                <h5>6 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[5]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[5]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[5]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[5]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[5]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[5]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[5]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[5]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[5]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[5]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos2.SI[6])">
                <h5>7 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[6]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[6]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[6]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[6]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[6]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[6]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[6]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[6]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[6]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[6]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos2.SI[7])">
                <h5>8 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[7]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[7]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[7]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[7]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[7]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[7]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[7]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[7]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[7]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[7]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos2.SI[8])">
                <h5>9 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[8]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[8]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[8]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[8]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[8]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[8]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[8]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[8]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[8]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[8]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <template v-if="horarioVazio(ativos2.SI[9])">
                <h5>10 Período</h5>
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
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[9]" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[9]" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[9]" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[9]" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[9]" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[9]" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[9]" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[9]" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[9]" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.SI[9]" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>
                </table>
            </template>

            <!-- -------------------------------------------- EC ----------------------------------------- -->


            <h4>Engenharia Computacional</h4>


            <template v-if="horarioVazio(ativos2.EC[0])">
                <h5>1 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos2.EC[1])">
                <h5>2 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos2.EC[2])">
                <h5>3 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos2.EC[3])">
                <h5>4 Período</h5>
                <table class="tg">
                    <tr>
                        <th class="tg-0lax">hora</th>
                        <th class="tg-0lax">Seg</th>EC                      <th class="tg-0lax">Ter</th>
                        <th class="tg-0lax">Qua</th>
                        <th class="tg-0lax">Qui</th>
                        <th class="tg-0lax">Sex</th>
                    </tr>


                    <tr>
                        <td class="tg-0lax">08-10</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos2.EC[4])">
                <h5>5 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos2.EC[5])">
                <h5>6 Período</h5>
                <table class="tg">
                    <tr>
                        <th class="tg-0lax">hora</th>
                        <th class="tg-0lax">Seg</th>
                        <th class="tg-0lax">Ter</th>
                        <th class="tg-0lax">Qua</th>
                        <th class="tg-0lax">Qui</th>
                        <th class="tg-0lax">Sex</th>EC                  </tr>


                    <tr>
                        <td class="tg-0lax">08-10</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos2.EC[6])">
                <h5>7 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos2.EC[7])">
                <h5>8 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos2.EC[8])">
                <h5>9 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <template v-if="horarioVazio(ativos2.EC[9])">
                <h5>10 Período</h5>
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
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

            <h4>Eletivas</h4>


            <template v-if="horarioVazio(ativos2.Eletivas)">
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
                        <td class="tg-0lax"><template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">10-12</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">14-16</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">16-18</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">19-21</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                    <tr>
                        <td class="tg-0lax">21-23</td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                        <td class="tg-0lax"><template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}}   </template></template></td>
                    </tr>

                </table>
            </template>

        </div>
    </div>
</template>

<script>
    import _ from 'lodash'

    export default {
        name: 'DashboardHorariosResumo',

        data () {
            return {
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
            }
        },

        beforeMount: function () {
            this.createHorarios1(2019, 1)
            console.log(this.ativos1)
            this.createHorarios2(2019, 3)
            console.log(this.ativos2)
            console.log(this.horarioVazio(this.ativos1.CCD[0]))
            console.log(this.ativos1.CCD[0])

        },

        methods: {
            isEven (number) {
                if(number%2===0)
                    return 'true'
                else
                    return 'false'
            },

            emptyTurmas1 () {
                this.ativos1 = {
                    CCD:[[], [], [], [], [], [], [], [], [], []],
                    CCN:[[], [], [], [], [], [], [], [], [], []],
                    EC:[[], [], [], [], [], [], [], [], [], []],
                    SI:[[], [], [], [], [], [], [], [], [], []],
                    Eletivas:[]
                }
            },

            emptyTurmas2 () {
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

            createHorarios1: function (ano, semestre) {
                var grade
                var grades
                var inicio = 1
                var fim
                var pedidos
                var pedidosExternos
                var disciplinaGrades = this.$store.state.disciplinaGrade.DisciplinaGrades
                var turmas = this.$store.state.turma.Turmas
                var turmasExternas = this.$store.state.turmaExterna.Turmas

                console.log(this.$store.state.curso.Cursos)

                if (semestre===1){
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
                }else{
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
                }
                console.log([this.evenCCD, this.evenCCN, this.evenSI, this.evenEC])
                this.emptyTurmas1()

                //CC Diurno está selecionado

                    grades = _.filter(this.$store.state.grade.Grades, ['Curso', 4])
                    grades = _.orderBy(grades, 'periodoInicio', 'desc')
                    pedidos = _.filter(this.$store.state.pedido.Pedidos, ['Curso', 4])
                    pedidosExternos = _.filter(this.$store.state.pedidoExterno.Pedidos, ['Curso', 4])
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
                    grades = _.filter(this.$store.state.grade.Grades, ['Curso', 1])
                    grades = _.orderBy(grades, 'periodoInicio', 'desc')
                    pedidos = _.filter(this.$store.state.pedido.Pedidos, ['Curso', 1])
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
                    grades = _.filter(this.$store.state.grade.Grades, ['Curso', 3])
                    grades = _.orderBy(grades, 'periodoInicio', 'desc')
                    pedidos = _.filter(this.$store.state.pedido.Pedidos, ['Curso', 3])
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
                    grades = _.filter(this.$store.state.grade.Grades, ['Curso', 2])
                    grades = _.orderBy(grades, 'periodoInicio', 'desc')
                    pedidos = _.filter(this.$store.state.pedido.Pedidos, ['Curso', 2])
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


            },

            createHorarios2: function (ano, semestre) {
                var grade
                var grades
                var inicio = 1
                var fim
                var pedidos
                var pedidosExternos
                var disciplinaGrades = this.$store.state.disciplinaGrade.DisciplinaGrades
                var turmas = this.$store.state.turma.Turmas
                var turmasExternas = this.$store.state.turmaExterna.Turmas

                console.log(this.$store.state.curso.Cursos)

                if (semestre===1){
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
                }else{
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
                }
                console.log([this.evenCCD, this.evenCCN, this.evenSI, this.evenEC])
                this.emptyTurmas2()

                //CC Diurno está selecionado

                grades = _.filter(this.$store.state.grade.Grades, ['Curso', 4])
                grades = _.orderBy(grades, 'periodoInicio', 'desc')
                pedidos = _.filter(this.$store.state.pedido.Pedidos, ['Curso', 4])
                pedidosExternos = _.filter(this.$store.state.pedidoExterno.Pedidos, ['Curso', 4])
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
                                if (turmas[j].periodo===3 && turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                                    for (var p = 0; p < pedidos.length; p++) {
                                        if ((pedidos[p].vagasPeriodizadas > 0) && (pedidos[p].Turma == turmas[j].id)) {
                                            this.ativos2.CCD[disciplinaGrades[k].periodo - 1].push(turmas[j])
                                        }
                                    }
                                }
                            }
                            for (var j = 0; j < turmasExternas.length; j++) {
                                if (turmasExternas[j].periodo===3 && turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina) {
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


                //CC Noturno está selecionado
                grades = _.filter(this.$store.state.grade.Grades, ['Curso', 1])
                grades = _.orderBy(grades, 'periodoInicio', 'desc')
                pedidos = _.filter(this.$store.state.pedido.Pedidos, ['Curso', 1])
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
                        fim = 1 + 2*(ano - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (semestre - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
                    else
                        fim = inicio - 1 + 2*(parseInt(grades[i-1].periodoInicio.slice(0,4), 10) - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (parseInt(grades[i-1].periodoInicio.slice(5,6), 10) - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
                    for (var k = 0; k < disciplinaGrades.length; k++) {
                        if ((disciplinaGrades[k].Grade == grade) && (this.isEven(disciplinaGrades[k].periodo) == this.evenCCN) && (disciplinaGrades[k].periodo >= parseInt(inicio, 10)) && (disciplinaGrades[k].periodo <= parseInt(fim, 10))) {
                            for (var j = 0; j < turmas.length; j++) {
                                if (turmas[j].periodo===3 && turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                                    for (var p = 0; p < pedidos.length; p++) {
                                        if ((pedidos[p].vagasPeriodizadas > 0) && (pedidos[p].Turma == turmas[j].id)) {
                                            this.ativos2.CCN[disciplinaGrades[k].periodo - 1].push(turmas[j])
                                        }
                                    }
                                }
                            }
                            for (var j = 0; j < turmasExternas.length; j++) {
                                if (turmasExternas[j].periodo===3 && turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina) {
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


                //SI está selecionado
                grades = _.filter(this.$store.state.grade.Grades, ['Curso', 3])
                grades = _.orderBy(grades, 'periodoInicio', 'desc')
                pedidos = _.filter(this.$store.state.pedido.Pedidos, ['Curso', 3])
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
                        fim = 1 + 2*(ano - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (semestre - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
                    else
                        fim = inicio - 1 + 2*(parseInt(grades[i-1].periodoInicio.slice(0,4), 10) - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (parseInt(grades[i-1].periodoInicio.slice(5,6), 10) - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
                    for (var k = 0; k < disciplinaGrades.length; k++) {
                        if ((disciplinaGrades[k].Grade == grade) && (this.isEven(disciplinaGrades[k].periodo) == this.evenSI) && (disciplinaGrades[k].periodo >= parseInt(inicio, 10)) && (disciplinaGrades[k].periodo <= parseInt(fim, 10))) {
                            for (var j = 0; j < turmas.length; j++) {
                                if (turmas[j].periodo===3 && turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                                    for (var p = 0; p < pedidos.length; p++) {
                                        if ((pedidos[p].vagasPeriodizadas > 0) && (pedidos[p].Turma == turmas[j].id)) {
                                            this.ativos2.SI[disciplinaGrades[k].periodo - 1].push(turmas[j])
                                        }
                                    }
                                }
                            }
                            for (var j = 0; j < turmasExternas.length; j++) {
                                if (turmasExternas[j].periodo===3 && turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina) {
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


                //Engenharia Computacional está selecionado
                grades = _.filter(this.$store.state.grade.Grades, ['Curso', 2])
                grades = _.orderBy(grades, 'periodoInicio', 'desc')
                pedidos = _.filter(this.$store.state.pedido.Pedidos, ['Curso', 2])
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
                        fim = 1 + 2*(ano - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (semestre - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
                    else
                        fim = inicio - 1 + 2*(parseInt(grades[i-1].periodoInicio.slice(0,4), 10) - parseInt(grades[i].periodoInicio.slice(0,4), 10)) + (parseInt(grades[i-1].periodoInicio.slice(5,6), 10) - parseInt(grades[i].periodoInicio.slice(5,6), 10))/2
                    for (var k = 0; k < disciplinaGrades.length; k++) {
                        if ((disciplinaGrades[k].Grade == grade) && (this.isEven(disciplinaGrades[k].periodo) == this.evenEC) && (disciplinaGrades[k].periodo >= parseInt(inicio, 10)) && (disciplinaGrades[k].periodo <= parseInt(fim, 10))) {
                            for (var j = 0; j < turmas.length; j++) {
                                if (turmas[j].periodo===3 && turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                                    for (var p = 0; p < pedidos.length; p++) {
                                        if ((pedidos[p].vagasPeriodizadas > 0) && (pedidos[p].Turma == turmas[j].id)) {
                                            this.ativos2.EC[disciplinaGrades[k].periodo - 1].push(turmas[j])
                                        }
                                    }
                                }
                            }
                            for (var j = 0; j < turmasExternas.length; j++) {
                                if (turmasExternas[j].periodo===3 && turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina) {
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

                //Eletivas está selecionado:
                var eletiva = true
                for(var t = 0; t<turmas.length;t++){
                    for(var d = 0; d<disciplinaGrades.length; d++){
                        if(turmas[t].periodo!=3 || turmas[t].Disciplina===disciplinaGrades[d].Disciplina){
                            eletiva = false
                        }
                    }
                    if(eletiva){
                        this.ativos2.Eletivas.push(turmas[t])
                    }else{
                        eletiva = true
                    }
                }

            },

            horarioVazio(curso){
                if(curso.length!=0)
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

            checkPeriodo(turma, periodo){
                for (var g=0;g<this.$store.state.disciplinaGrade.DisciplinaGrades.length;g++){
                    if(this.$store.state.disciplinaGrade.DisciplinaGrades[g].Disciplina==turma && this.$store.state.disciplinaGrade.DisciplinaGrades[g].periodo==periodo) {
                        return true
                    }
                }
            },

            updateHorarios(){
                for (var i=0;i<10;i++) {
                    for (var j = 0; j < this.ativos.CCD[i].length; j++)
                        for (var k = 0; k < this.$store.state.turma.Turmas.length; k++) {
                            if (this.ativos.CCD[i][j].id == this.$store.state.turma.Turmas[k].id) {
                                this.ativos.CCD[i].splice(j, 1, this.$store.state.turma.Turmas[k])
                            }
                        }
                    for (var j = 0; j < this.ativos.CCN[i].length; j++)
                        for (var k = 0; k < this.$store.state.turma.Turmas.length; k++) {
                            if (this.ativos.CCN[i][j].id == this.$store.state.turma.Turmas[k].id) {
                                this.ativos.CCN[i].splice(j, 1, this.$store.state.turma.Turmas[k])
                            }
                        }
                    for (var j = 0; j < this.ativos.EC[i].length; j++)
                        for (var k = 0; k < this.$store.state.turma.Turmas.length; k++) {
                            if (this.ativos.EC[i][j].id == this.$store.state.turma.Turmas[k].id) {
                                this.ativos.EC[i].splice(j, 1, this.$store.state.turma.Turmas[k])
                            }
                        }
                    for (var j = 0; j < this.ativos.SI[i].length; j++)
                        for (var k = 0; k < this.$store.state.turma.Turmas.length; k++) {
                            if (this.ativos.SI[i][j].id == this.$store.state.turma.Turmas[k].id) {
                                this.ativos.SI[i].splice(j, 1, this.$store.state.turma.Turmas[k])
                            }
                        }
                }

                this.$store.commit('redefinirAtivas', {Ativas: this.ativos})
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


        },

        watch: {
            Turmas (newTurmas, oldTurmas) {
                this.updateHorarios()
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