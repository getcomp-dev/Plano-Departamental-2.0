<template>
  <div class="DashboardLaboratoriosAlocacao row pr-2">
    <!-- Titulo -->
    <div class="col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0">
      <div class="form-inline col-12 pl-0 mb-2 pr-1">
        <h1 class="col-12 titulo">Laboratórios - Alocação</h1>
      </div>
    </div>
    <div class="w-100 mb-2 border-bottom"></div>
    <div class="col-12">
      <h6>1º SEMESTRE</h6>
      <div class="flex-container">
        <div v-for="lab in Laboratorios" :key="lab.nome">
          <h5 class="lab-num">{{lab.nome}}</h5>
          <div class="row m-0">
            <table class="tg">
                  <tr>
                      <th class="tg-0lax">Horário</th>
                      <th class="tg-0lax">Seg</th>
                      <th class="tg-0lax">Ter</th>
                      <th class="tg-0lax">Qua</th>
                      <th class="tg-0lax">Qui</th>
                      <th class="tg-0lax">Sex</th>
                  </tr>

                  <tr>
                      <td class="tg-0lax tg-hor">08-10</td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                  </tr>

                  <tr>
                      <td class="tg-0lax tg-hor">10-12</td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                  </tr>

                  <tr>
                      <td class="tg-0lax tg-hor">14-16</td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                  </tr>

                  <tr>
                      <td class="tg-0lax tg-hor">16-18</td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                  </tr>

                  <tr>
                      <td class="tg-0lax tg-hor">17-19</td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 32)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 34)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 36)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 38)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 40)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                  </tr>

                  <tr>
                      <td class="tg-0lax tg-hor">18-20</td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 33)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 35)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 37)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 39)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 41)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                  </tr>

                  <tr>
                      <td class="tg-0lax tg-hor">19-21</td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                  </tr>

                  <tr>
                      <td class="tg-0lax tg-hor">21-23</td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                  </tr>

              </table>
          </div>
        </div>
      </div>

      <h6>2º SEMESTRE</h6>

      <div class="flex-container">
        <div v-for="lab in Laboratorios">
          <h5 class="lab-num">{{lab.nome}}</h5>
          <div class="row m-0">
              <table class="tg">
                  <tr>
                      <th class="tg-0lax">Horário</th>
                      <th class="tg-0lax">Seg</th>
                      <th class="tg-0lax">Ter</th>
                      <th class="tg-0lax">Qua</th>
                      <th class="tg-0lax">Qui</th>
                      <th class="tg-0lax">Sex</th>
                  </tr>

                  <tr>
                      <td class="tg-0lax tg-hor">08-10</td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                  </tr>

                  <tr>
                      <td class="tg-0lax tg-hor">10-12</td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                  </tr>

                  <tr>
                      <td class="tg-0lax tg-hor">14-16</td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                  </tr>

                  <tr>
                      <td class="tg-0lax tg-hor">16-18</td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                  </tr>

                  <tr>
                      <td class="tg-0lax tg-hor">17-19</td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 32)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 34)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 36)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 38)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 40)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                  </tr>

                  <tr>
                      <td class="tg-0lax tg-hor">18-20</td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 33)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 35)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 37)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 39)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 41)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                  </tr>

                  <tr>
                      <td class="tg-0lax tg-hor">19-21</td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                  </tr>

                  <tr>
                      <td class="tg-0lax tg-hor">21-23</td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                      <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                  </tr>
              </table>
            <br />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import pdfs from "../../common/services/pdfs";
export default {
  name: "DashboardLaboratoriosAlocacao",
  data() {
    return {
      value: 0
    };
  },
  created: function() {
    console.log(this.$store.state.sala.Salas);
    console.log(_.filter(this.$store.state.sala.Salas, ["laboratorio", true]));
  },

  methods: {
    checkTurmaLab(turma) {
      let labs = _.filter(this.$store.state.sala.Salas, ["laboratorio", true]);
      let result = 0;
      labs.forEach(lab => {
        if (lab.id === turma.Sala1) result += 1;
        if (lab.id === turma.Sala2) result += 2;
      });

      if (result === 1) {
        if (_.isNull(turma.Sala2)) {
          return 4;
        }
      }
      return result;
    },

    checkTurmaHorario(turma, horario) {
      if (turma.Horario1 == horario || turma.Horario2 == horario) {
        let sala = this.checkTurmaLab(turma);
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
          case 4:
            return true;
            break;
        }
        return true;
      } else return false;
    },

    pdf() {
      pdfs.pdfAlocacaoLabs();
    }
  },
  computed: {
    Laboratorios() {
      return _.filter(this.$store.state.sala.Salas, ["laboratorio", true]);
    },

    Turmas1() {
      return _.filter(this.$store.state.turma.Turmas, ["periodo", 1]);
    },

    Turmas2() {
      return _.filter(this.$store.state.turma.Turmas, ["periodo", 3]);
    },

    Disciplinas() {
      return this.$store.state.disciplina.Disciplinas;
    }
  }
};
</script>

<style scoped>
/* prefixed by https://autoprefixer.github.io (PostCSS: v7.0.23, autoprefixer: v9.7.3) */

.DashboardLaboratoriosAlocacao {
  max-width: 100%;
  overflow: hidden;
  margin: 0;
}
.titulo {
  font-size: 25px;
  font-weight: normal;
  padding-left: 0;
  margin: 0 !important;
}

h5 {
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  margin-top: 15px;
}
h6 {
  font-weight: bold;
  font-size: 20px;
  text-align: center;
}
td {
  width: 66px !important;
  text-align: center !important;
}

th {
  text-align: center !important;
}

.flex-container {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -moz-box-orient: horizontal;
  -moz-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: space-evenly;
  -webkit-justify-content: space-evenly;
  -moz-box-pack: space-evenly;
  -ms-flex-pack: space-evenly;
  justify-content: space-evenly;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

.tg {
  border-collapse: collapse;
  border-spacing: 0;
  border-color: #ccc;
  margin-bottom: 20px;
}
.tg td {
  font-family: Arial, sans-serif;
  font-size: 11px;
  padding: 0px;
  border-style: solid;
  border-width: 1px;
  overflow: hidden;
  word-break: normal;
  border-color: rgba(189, 189, 189, 0.644);
  color: #333;
  background-color: #fff;
}
.tg th,
.tg-hor { 
  font-family: Arial, sans-serif;
  font-size: 11px;
  font-weight: bold;
  padding: 0px;
  border-style: solid;
  border-width: 1px;
  overflow: hidden;
  word-break: normal;
  border-color: rgba(189, 189, 189, 0.623);
  color: #333;
  background-color: #e9ecef !important;
}
.tg .tg-0lax {
  vertical-align: center;
  height: 22px;
}
@media screen and (max-width: 575px) {
  .lab-num {
    font-size: 22px !important;
  }
}
</style>