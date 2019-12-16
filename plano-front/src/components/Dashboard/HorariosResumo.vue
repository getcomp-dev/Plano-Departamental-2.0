<template>
  <div class="DashboardHorariosResumo row pr-2">
    <!-- Titulo -->
    <div
      class="col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0"
      style="height:38px;"
    >
      <div class="form-inline col-12 pl-0 mb-1 pr-1">
          <h1 class="col-12 titulo">Horários - Resumo</h1>
      </div>
    </div>

      <div class="w-100 mb-2 border-bottom"></div>
		<div class="col-12 p-0" style="padding-left: 15px !important;">
      <!-- ----------------------------------------------------------------------------------------------- -->
      <div class="title" style="text-align:center !important;">
        <h3>1º SEMESTRE</h3>
      </div>
      <!-- -------------------------------------------- CC Diurno ----------------------------------------- -->

      <div class="title">
        <h4 style="font-weight: bold; font-size: 12px;">
          <span style=" border-bottom: 1px solid #cccccc">Ciência da Computação Diurno</span>
        </h4>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.CCD[0])">
        <h5>1º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[0]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.CCD[1])">
        <h5>2º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[1]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.CCD[2])">
        <h5>3º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[2]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.CCD[3])">
        <h5>4º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[3]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.CCD[4])">
        <h5>5º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[4]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.CCD[5])">
        <h5>6º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[5]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.CCD[6])">
        <h5>7º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[6]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.CCD[7])">
        <h5>8º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[7]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.CCD[8])">
        <h5>9º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[8]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.CCD[9])">
        <h5>10º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCD[9]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>
      <br />
      <!------------------------------------------------- EC ------------------------------------------------->
      <div class="title">
        <h4>
          <span style=" border-bottom: 1px solid #cccccc">Engenharia Computacional</span>
        </h4>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.EC[0])">
        <h5>1º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[0]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.EC[1])">
        <h5>2º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[1]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.EC[2])">
        <h5>3º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[2]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.EC[3])">
        <h5>4º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>EC
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">08-10</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[3]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.EC[4])">
        <h5>5º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[4]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.EC[5])">
        <h5>6º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>EC
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">08-10</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[5]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.EC[6])">
        <h5>7º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[6]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.EC[7])">
        <h5>8º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[7]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.EC[8])">
        <h5>9º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[8]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.EC[9])">
        <h5>10º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.EC[9]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <!-- -------------------------------------------- CC Noturno ----------------------------------------- -->
      <div class="title">
        <h4>
          <span style=" border-bottom: 1px solid #cccccc">Ciência da Computação Noturno</span>
        </h4>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.CCN[0])">
        <h5>1º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[0]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[0]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[0]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[0]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[0]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[0]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[0]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[0]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[0]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[0]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.CCN[1])">
        <h5>2º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[1]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[1]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[1]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[1]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[1]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[1]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[1]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[1]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[1]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[1]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.CCN[2])">
        <h5>3º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[2]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[2]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[2]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[2]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[2]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[2]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[2]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[2]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[2]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[2]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.CCN[3])">
        <h5>4º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[3]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[3]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[3]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[3]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[3]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[3]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[3]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[3]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[3]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[3]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.CCN[4])">
        <h5>5º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[4]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[4]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[4]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[4]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[4]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[4]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[4]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[4]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[4]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[4]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.CCN[5])">
        <h5>6º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[5]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[5]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[5]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[5]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[5]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[5]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[5]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[5]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[5]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[5]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.CCN[6])">
        <h5>7º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[6]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[6]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[6]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[6]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[6]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[6]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[6]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[6]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[6]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[6]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.CCN[7])">
        <h5>8º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[7]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[7]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[7]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[7]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[7]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[7]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[7]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[7]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[7]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[7]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.CCN[8])">
        <h5>9º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[8]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[8]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[8]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[8]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[8]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[8]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[8]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[8]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[8]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[8]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.CCN[9])">
        <h5>10º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[9]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[9]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[9]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[9]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[9]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[9]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[9]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[9]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[9]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.CCN[9]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <!-- -------------------------------------------- SI ----------------------------------------- -->
      <br />
      <div class="title">
        <h4>
          <span style=" border-bottom: 1px solid #cccccc">Sistemas de Informação</span>
        </h4>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.SI[0])">
        <h5>1º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[0]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[0]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[0]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[0]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[0]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[0]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[0]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[0]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[0]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[0]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.SI[1])">
        <h5>2º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[1]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[1]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[1]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[1]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[1]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[1]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[1]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[1]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[1]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[1]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.SI[2])">
        <h5>3º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[2]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[2]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[2]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[2]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[2]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[2]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[2]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[2]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[2]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[2]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.SI[3])">
        <h5>4º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[3]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[3]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[3]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[3]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[3]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[3]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[3]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[3]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[3]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[3]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.SI[4])">
        <h5>5º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[4]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[4]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[4]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[4]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[4]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[4]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[4]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[4]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[4]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[4]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.SI[5])">
        <h5>6º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[5]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[5]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[5]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[5]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[5]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[5]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[5]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[5]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[5]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[5]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.SI[6])">
        <h5>7º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[6]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[6]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[6]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[6]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[6]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[6]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[6]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[6]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[6]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[6]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.SI[7])">
        <h5>8º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[7]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[7]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[7]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[7]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[7]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[7]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[7]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[7]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[7]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[7]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.SI[8])">
        <h5>9º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[8]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[8]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[8]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[8]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[8]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[8]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[8]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[8]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[8]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[8]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.SI[9])">
        <h5>10º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[9]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[9]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[9]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[9]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[9]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[9]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[9]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[9]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[9]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.SI[9]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

     

      
      <div class="title">
        <h4>
          <span style=" border-bottom: 1px solid #cccccc">Eletivas</span>
        </h4>
      </div>

      <div class="horario" v-if="horarioVazio(ativos1.Eletivas)">
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}    </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">17-19</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 32)">
                <template
                        v-for="disciplina in Disciplinas"
                        v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>

            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 34)">
                <template
                        v-for="disciplina in Disciplinas"
                        v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 36)">
                <template
                        v-for="disciplina in Disciplinas"
                        v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 38)">
                <template
                        v-for="disciplina in Disciplinas"
                        v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 40)">
                <template
                        v-for="disciplina in Disciplinas"
                        v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">18-20</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 33)">
                <template
                        v-for="disciplina in Disciplinas"
                        v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>

            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 35)">
                <template
                        v-for="disciplina in Disciplinas"
                        v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 37)">
                <template
                        v-for="disciplina in Disciplinas"
                        v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 39)">
                <template
                        v-for="disciplina in Disciplinas"
                        v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 41)">
                <template
                        v-for="disciplina in Disciplinas"
                        v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos1.Eletivas" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>
      <!-- ----------------------------------------------------------------------------------------------- -->
      <div class="title" style="text-align:center;">
        <h3>2º SEMESTRE</h3>
      </div>
      <!-- -------------------------------------------- CC Diurno ----------------------------------------- -->
      <div class="title">
        <h4>
          <span style=" border-bottom: 1px solid #cccccc">Ciência da Computação Diurno</span>
        </h4>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.CCD[0])">
        <h5>1º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[0]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.CCD[1])">
        <h5>2º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[1]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.CCD[2])">
        <h5>3º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[2]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.CCD[3])">
        <h5>4º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[3]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.CCD[4])">
        <h5>5º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[4]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.CCD[5])">
        <h5>6º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[5]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.CCD[6])">
        <h5>7º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[6]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.CCD[7])">
        <h5>8º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[7]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.CCD[8])">
        <h5>9º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[8]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.CCD[9])">
        <h5>10º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCD[9]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>
        
        <!---------------------------------------- EC ---------------------------------------->
        
      <div class="title title-hide">
        <h4>
          <span style=" border-bottom: 1px solid #cccccc">Engenharia Computacional</span>
        </h4>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.EC[0])">
        <h5>1º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[0]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.EC[1])">
        <h5>2º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[1]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.EC[2])">
        <h5>3º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[2]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.EC[3])">
        <h5>4º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[3]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.EC[4])">
        <h5>5º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[4]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.EC[5])">
        <h5>6º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[5]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.EC[6])">
        <h5>7º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[6]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.EC[7])">
        <h5>8º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[7]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.EC[8])">
        <h5>9º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[8]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.EC[9])">
        <h5>10º Período</h5>
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.EC[9]" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>
     
      <!-- -------------------------------------------- CC Noturno ----------------------------------------- -->
      <div class="title title-hide">
        <h4>
          <span style=" border-bottom: 1px solid #cccccc">Ciência da Computação Noturno</span>
        </h4>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.CCN[0])">
        <h5>1º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[0]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[0]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[0]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[0]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[0]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[0]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[0]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[0]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[0]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[0]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.CCN[1])">
        <h5>2º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[1]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[1]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[1]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[1]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[1]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[1]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[1]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[1]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[1]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[1]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.CCN[2])">
        <h5>3º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[2]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[2]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[2]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[2]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[2]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[2]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[2]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[2]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[2]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[2]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.CCN[3])">
        <h5>4º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[3]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[3]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[3]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[3]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[3]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[3]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[3]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[3]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[3]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[3]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.CCN[4])">
        <h5>5º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[4]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[4]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[4]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[4]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[4]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[4]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[4]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[4]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[4]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[4]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.CCN[5])">
        <h5>6º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[5]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[5]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[5]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[5]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[5]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[5]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[5]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[5]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[5]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[5]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.CCN[6])">
        <h5>7º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[6]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[6]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[6]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[6]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[6]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[6]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[6]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[6]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[6]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[6]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.CCN[7])">
        <h5>8º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[7]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[7]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[7]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[7]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[7]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[7]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[7]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[7]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[7]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[7]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.CCN[8])">
        <h5>9º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[8]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[8]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[8]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[8]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[8]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[8]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[8]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[8]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[8]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[8]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.CCN[9])">
        <h5>10º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[9]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[9]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[9]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[9]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[9]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[9]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[9]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[9]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[9]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.CCN[9]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <!-- -------------------------------------------- SI ----------------------------------------- -->
      <br />
      <div class="title">
        <h4>
          <span style=" border-bottom: 1px solid #cccccc">Sistemas de Informação</span>
        </h4>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.SI[0])">
        <h5>1º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[0]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[0]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[0]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[0]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[0]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[0]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[0]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[0]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[0]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[0]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.SI[1])">
        <h5>2º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[1]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[1]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[1]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[1]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[1]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[1]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[1]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[1]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[1]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[1]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.SI[2])">
        <h5>3º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[2]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[2]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[2]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[2]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[2]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[2]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[2]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[2]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[2]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[2]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.SI[3])">
        <h5>4º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[3]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[3]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[3]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[3]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[3]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[3]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[3]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[3]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[3]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[3]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.SI[4])">
        <h5>5º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[4]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[4]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[4]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[4]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[4]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[4]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[4]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[4]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[4]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[4]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.SI[5])">
        <h5>6º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[5]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[5]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[5]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[5]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[5]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[5]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[5]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[5]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[5]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[5]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.SI[6])">
        <h5>7º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[6]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[6]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[6]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[6]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[6]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[6]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[6]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[6]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[6]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[6]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.SI[7])">
        <h5>8º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[7]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[7]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[7]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[7]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[7]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[7]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[7]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[7]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[7]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[7]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.SI[8])">
        <h5>9º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[8]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[8]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[8]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[8]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[8]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[8]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[8]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[8]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[8]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[8]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      <div class="horario" v-if="horarioVazio(ativos2.SI[9])">
        <h5>10º Período</h5>
        <table class="tg tabela">
          <tr>
            <th class="tg-0lax">Horário</th>
            <th class="tg-0lax">Seg</th>
            <th class="tg-0lax">Ter</th>
            <th class="tg-0lax">Qua</th>
            <th class="tg-0lax">Qui</th>
            <th class="tg-0lax">Sex</th>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[9]" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[9]" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[9]" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[9]" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[9]" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[9]" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[9]" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[9]" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[9]" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            
            <td class="tg-0lax">
              <template v-for="turma in ativos2.SI[9]" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>

      
      <div class="title title-hide">
          <h4>
            <span style=" border-bottom: 1px solid #cccccc">Eletivas</span>
          </h4>
        </div>

      <div class="horario" v-if="horarioVazio(ativos2.Eletivas)">
        <table class="tg tabela">
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
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 1)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 7)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 13)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 19)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 25)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">10-12</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 2)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 8)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 14)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 20)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 26)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">14-16</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 3)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 9)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 15)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 21)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 27)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">16-18</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 4)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 10)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 16)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 22)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 28)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">17-19</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 32)">
                <template
                        v-for="disciplina in Disciplinas"
                        v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 34)">
                <template
                        v-for="disciplina in Disciplinas"
                        v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 36)">
                <template
                        v-for="disciplina in Disciplinas"
                        v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 38)">
                <template
                        v-for="disciplina in Disciplinas"
                        v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 40)">
                <template
                        v-for="disciplina in Disciplinas"
                        v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">18-20</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 33)">
                <template
                        v-for="disciplina in Disciplinas"
                        v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 35)">
                <template
                        v-for="disciplina in Disciplinas"
                        v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 37)">
                <template
                        v-for="disciplina in Disciplinas"
                        v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 39)">
                <template
                        v-for="disciplina in Disciplinas"
                        v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 41)">
                <template
                        v-for="disciplina in Disciplinas"
                        v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">19-21</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 5)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 11)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 17)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 23)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 29)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>

          <tr>
            <td class="tg-0lax tg-hor">21-23</td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 6)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 12)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 18)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 24)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
            <td class="tg-0lax">
              <template v-for="turma in ativos2.Eletivas" v-if="checkTurmaHorario(turma, 30)">
                <template
                  v-for="disciplina in Disciplinas"
                  v-if="turma.Disciplina === disciplina.id"
                >{{disciplina.codigo}}  </template>
              </template>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "DashboardHorariosResumo",

  data() {
    return {
      error: undefined,
      options: [
        { text: "CC Diurno", value: 1 },
        { text: "CC Noturno", value: 2 },
        { text: "SI", value: 3 },
        { text: "Eng. Comp.", value: 4 },
        { text: "Eletivas", value: 5 }
      ],
      evenCCN: "false",
      evenCCD: "false",
      evenEC: "false",
      evenSI: "false",

      ativos1: {
        CCD: [[], [], [], [], [], [], [], [], [], []],
        CCN: [[], [], [], [], [], [], [], [], [], []],
        EC: [[], [], [], [], [], [], [], [], [], []],
        SI: [[], [], [], [], [], [], [], [], [], []],
        Eletivas: []
      },

      ativos2: {
        CCD: [[], [], [], [], [], [], [], [], [], []],
        CCN: [[], [], [], [], [], [], [], [], [], []],
        EC: [[], [], [], [], [], [], [], [], [], []],
        SI: [[], [], [], [], [], [], [], [], [], []],
        Eletivas: []
      }
    };
  },

  beforeMount: function() {
    let anoAtual = _.isEmpty(this.$store.state.plano.Plano)
      ? 2019
      : this.$store.state.plano.Plano[0].ano;
    console.log([anoAtual, _.isEmpty(this.$store.state.plano.Plano)]);
    this.createHorarios1(anoAtual, 1);
    console.log(this.ativos1);
    this.createHorarios2(anoAtual, 3);
    console.log(this.ativos2);
    console.log(this.horarioVazio(this.ativos1.CCD[0]));
    console.log(this.ativos1.CCD[0]);
  },

  methods: {
    pdf() {
      var pdfMake = require("pdfmake/build/pdfmake.js");
      if (pdfMake.vfs == undefined) {
        var pdfFonts = require("pdfmake/build/vfs_fonts.js");
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
      }
      var tables = [];
      var disciplinas = this.$store.state.disciplina.Disciplinas;
      var periodosCCD1 = this.ativos1.CCD;
      var periodosCCN1 = this.ativos1.CCN;
      var periodosEC1 = this.ativos1.EC;
      var periodosSI1 = this.ativos1.SI;
      var eletivas1 = this.ativos1.Eletivas;
      var seg = "",
        ter = "",
        qua = "",
        qui = "",
        sex = "";
      var vazio = 0;
      tables.push({
        text: "1º Semestre",
        bold: false,
        margin: [0, 10, 0, 5],
        fontSize: 20
      });
      tables.push({
        text: "Ciência da Computação Diurno",
        bold: false,
        margin: [0, 10, 0, 5],
        fontSize: 20
      });

      for (var i = 0; i < 10; i++) {
        if (periodosCCD1[i].length === 0) {
          vazio = vazio + 1;
        } else {
          tables.push({
            text: i + 1 + "º Período",
            bold: false,
            margin: [0, 5, 0, 5]
          });
          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: [
                [
                  { text: "Hora", alignment: "center", bold: true },
                  {
                    text: "Segunda",
                    alignment: "center",
                    bold: true
                  },
                  { text: "Terça", alignment: "center", bold: true },
                  {
                    text: "Quarta",
                    alignment: "center",
                    bold: true
                  },
                  { text: "Quinta", alignment: "center", bold: true },
                  {
                    text: "Sexta",
                    alignment: "center",
                    bold: true
                  }
                ]
              ]
            }
          });
          for (var d = 0; d < 4; d++) {
            for (var j = 0; j < periodosCCD1[i].length; j++) {
              if (this.checkTurmaHorario(periodosCCD1[i][j], 1 + d)) {
                for (var k = 0; k < disciplinas.length; k++) {
                  if (periodosCCD1[i][j].Disciplina === disciplinas[k].id) {
                    if (seg !== "") seg = seg + " ";
                    seg =
                      seg +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCD1[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosCCD1[i][j], 7 + d)) {
                for (k = 0; k < disciplinas.length; k++) {
                  if (periodosCCD1[i][j].Disciplina === disciplinas[k].id) {
                    if (ter != "") ter = ter + " ";
                    ter =
                      ter +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCD1[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosCCD1[i][j], 13 + d)) {
                for (k = 0; k < disciplinas.length; k++) {
                  if (periodosCCD1[i][j].Disciplina === disciplinas[k].id) {
                    if (qua != "") qua = qua + " ";
                    qua =
                      qua +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCD1[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosCCD1[i][j], 19 + d)) {
                for (k = 0; k < disciplinas.length; k++) {
                  if (periodosCCD1[i][j].Disciplina === disciplinas[k].id) {
                    if (qui != "") qui = qui + " ";
                    qui =
                      qui +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCD1[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosCCD1[i][j], 25 + d)) {
                for (k = 0; k < disciplinas.length; k++) {
                  if (periodosCCD1[i][j].Disciplina === disciplinas[k].id) {
                    if (sex != "") sex = sex + " ";
                    sex =
                      sex +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCD1[i][j].letra;
                  }
                }
              }
            }

            switch (d) {
              case 0:
                tables[3 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "08 - 10",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 1:
                tables[3 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "10 - 12",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 2:
                tables[3 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "14 - 16",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 3:
                tables[3 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "16 - 18",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 4:
                tables[3 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "19 - 21",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 5:
                tables[3 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "21 - 23",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
            }
            seg = ter = qua = qui = sex = "";
          }
        }
      }

      tables.push({
        text: "Ciência da Computação Noturno",
        bold: true,
        margin: [0, 10, 0, 5],
        fontSize: 20,
        pageBreak: "before"
      });

      for (var i = 0; i < 10; i++) {
        if (periodosCCN1[i].length === 0) {
          vazio = vazio + 1;
        } else {
          tables.push({
            text: i + 1 + "º Período",
            bold: true,
            margin: [0, 5, 0, 5]
          });
          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: [
                [
                  { text: "Hora", alignment: "center", bold: true },
                  {
                    text: "Segunda",
                    alignment: "center",
                    bold: true
                  },
                  { text: "Terça", alignment: "center", bold: true },
                  {
                    text: "Quarta",
                    alignment: "center",
                    bold: true
                  },
                  { text: "Quinta", alignment: "center", bold: true },
                  {
                    text: "Sexta",
                    alignment: "center",
                    bold: true
                  }
                ]
              ]
            }
          });
          for (var d = 4; d < 6; d++) {
            for (var j = 0; j < periodosCCN1[i].length; j++) {
              if (this.checkTurmaHorario(periodosCCN1[i][j], 1 + d)) {
                for (var k = 0; k < disciplinas.length; k++) {
                  if (periodosCCN1[i][j].Disciplina === disciplinas[k].id) {
                    if (seg !== "") seg = seg + " ";
                    seg =
                      seg +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCN1[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosCCN1[i][j], 7 + d)) {
                for (k = 0; k < disciplinas.length; k++) {
                  if (periodosCCN1[i][j].Disciplina === disciplinas[k].id) {
                    if (ter != "") ter = ter + " ";
                    ter =
                      ter +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCN1[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosCCN1[i][j], 13 + d)) {
                for (k = 0; k < disciplinas.length; k++) {
                  if (periodosCCN1[i][j].Disciplina === disciplinas[k].id) {
                    if (qua != "") qua = qua + " ";
                    qua =
                      qua +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCN1[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosCCN1[i][j], 19 + d)) {
                for (k = 0; k < disciplinas.length; k++) {
                  if (periodosCCN1[i][j].Disciplina === disciplinas[k].id) {
                    if (qui != "") qui = qui + " ";
                    qui =
                      qui +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCN1[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosCCN1[i][j], 25 + d)) {
                for (k = 0; k < disciplinas.length; k++) {
                  if (periodosCCN1[i][j].Disciplina === disciplinas[k].id) {
                    if (sex != "") sex = sex + " ";
                    sex =
                      sex +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCN1[i][j].letra;
                  }
                }
              }
            }

            switch (d) {
              case 0:
                tables[24 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "08 - 10",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 1:
                tables[24 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "10 - 12",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 2:
                tables[24 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "14 - 16",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 3:
                tables[24 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "16 - 18",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 4:
                tables[24 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "19 - 21",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 5:
                tables[24 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "21 - 23",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
            }
            seg = ter = qua = qui = sex = "";
          }
        }
      }

      tables.push({
        text: "Engenharia Computacional",
        bold: true,
        margin: [0, 10, 0, 5],
        fontSize: 20,
        pageBreak: "before"
      });

      for (var i = 0; i < 10; i++) {
        if (periodosEC1[i].length === 0) {
          vazio = vazio + 1;
        } else {
          tables.push({
            text: i + 1 + "º Período",
            bold: true,
            margin: [0, 5, 0, 5]
          });
          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: [
                [
                  { text: "Hora", alignment: "center", bold: true },
                  {
                    text: "Segunda",
                    alignment: "center",
                    bold: true
                  },
                  { text: "Terça", alignment: "center", bold: true },
                  {
                    text: "Quarta",
                    alignment: "center",
                    bold: true
                  },
                  { text: "Quinta", alignment: "center", bold: true },
                  {
                    text: "Sexta",
                    alignment: "center",
                    bold: true
                  }
                ]
              ]
            }
          });
          for (var d = 0; d < 4; d++) {
            for (var j = 0; j < periodosEC1[i].length; j++) {
              if (this.checkTurmaHorario(periodosEC1[i][j], 1 + d)) {
                for (var k = 0; k < disciplinas.length; k++) {
                  if (periodosEC1[i][j].Disciplina === disciplinas[k].id) {
                    if (seg !== "") seg = seg + " ";
                    seg =
                      seg +
                      disciplinas[k].codigo +
                      " " +
                      periodosEC1[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosEC1[i][j], 7 + d)) {
                for (k = 0; k < disciplinas.length; k++) {
                  if (periodosEC1[i][j].Disciplina === disciplinas[k].id) {
                    if (ter != "") ter = ter + " ";
                    ter =
                      ter +
                      disciplinas[k].codigo +
                      " " +
                      periodosEC1[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosEC1[i][j], 13 + d)) {
                for (k = 0; k < disciplinas.length; k++) {
                  if (periodosEC1[i][j].Disciplina === disciplinas[k].id) {
                    if (qua != "") qua = qua + " ";
                    qua =
                      qua +
                      disciplinas[k].codigo +
                      " " +
                      periodosEC1[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosEC1[i][j], 19 + d)) {
                for (k = 0; k < disciplinas.length; k++) {
                  if (periodosEC1[i][j].Disciplina === disciplinas[k].id) {
                    if (qui != "") qui = qui + " ";
                    qui =
                      qui +
                      disciplinas[k].codigo +
                      " " +
                      periodosEC1[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosEC1[i][j], 25 + d)) {
                for (k = 0; k < disciplinas.length; k++) {
                  if (periodosEC1[i][j].Disciplina === disciplinas[k].id) {
                    if (sex != "") sex = sex + " ";
                    sex =
                      sex +
                      disciplinas[k].codigo +
                      " " +
                      periodosEC1[i][j].letra;
                  }
                }
              }
            }

            switch (d) {
              case 0:
                tables[45 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "08 - 10",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 1:
                tables[45 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "10 - 12",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 2:
                tables[45 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "14 - 16",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 3:
                tables[45 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "16 - 18",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 4:
                tables[45 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "19 - 21",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 5:
                tables[45 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "21 - 23",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
            }
            seg = ter = qua = qui = sex = "";
          }
        }
      }

      tables.push({
        text: "Sistemas de Informação",
        bold: true,
        margin: [0, 10, 0, 5],
        fontSize: 20,
        pageBreak: "before"
      });

      for (var i = 0; i < 10; i++) {
        if (periodosSI1[i].length === 0) {
          vazio = vazio + 1;
        } else {
          tables.push({
            text: i + 1 + "º Período",
            bold: true,
            margin: [0, 5, 0, 5]
          });
          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: [
                [
                  { text: "Hora", alignment: "center", bold: true },
                  {
                    text: "Segunda",
                    alignment: "center",
                    bold: true
                  },
                  { text: "Terça", alignment: "center", bold: true },
                  {
                    text: "Quarta",
                    alignment: "center",
                    bold: true
                  },
                  { text: "Quinta", alignment: "center", bold: true },
                  {
                    text: "Sexta",
                    alignment: "center",
                    bold: true
                  }
                ]
              ]
            }
          });
          for (var d = 4; d < 6; d++) {
            for (var j = 0; j < periodosSI1[i].length; j++) {
              if (this.checkTurmaHorario(periodosSI1[i][j], 1 + d)) {
                for (var k = 0; k < disciplinas.length; k++) {
                  if (periodosSI1[i][j].Disciplina === disciplinas[k].id) {
                    if (seg !== "") seg = seg + " ";
                    seg =
                      seg +
                      disciplinas[k].codigo +
                      " " +
                      periodosSI1[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosSI1[i][j], 7 + d)) {
                for (k = 0; k < disciplinas.length; k++) {
                  if (periodosSI1[i][j].Disciplina === disciplinas[k].id) {
                    if (ter != "") ter = ter + " ";
                    ter =
                      ter +
                      disciplinas[k].codigo +
                      " " +
                      periodosSI1[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosSI1[i][j], 13 + d)) {
                for (k = 0; k < disciplinas.length; k++) {
                  if (periodosSI1[i][j].Disciplina === disciplinas[k].id) {
                    if (qua != "") qua = qua + " ";
                    qua =
                      qua +
                      disciplinas[k].codigo +
                      " " +
                      periodosSI1[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosSI1[i][j], 19 + d)) {
                for (k = 0; k < disciplinas.length; k++) {
                  if (periodosSI1[i][j].Disciplina === disciplinas[k].id) {
                    if (qui != "") qui = qui + " ";
                    qui =
                      qui +
                      disciplinas[k].codigo +
                      " " +
                      periodosSI1[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosSI1[i][j], 25 + d)) {
                for (k = 0; k < disciplinas.length; k++) {
                  if (periodosSI1[i][j].Disciplina === disciplinas[k].id) {
                    if (sex != "") sex = sex + " ";
                    sex =
                      sex +
                      disciplinas[k].codigo +
                      " " +
                      periodosSI1[i][j].letra;
                  }
                }
              }
            }

            switch (d) {
              case 0:
                tables[66 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "08 - 10",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 1:
                tables[66 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "10 - 12",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 2:
                tables[66 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "14 - 16",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 3:
                tables[66 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "16 - 18",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 4:
                tables[66 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "19 - 21",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 5:
                tables[66 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "21 - 23",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
            }
            seg = ter = qua = qui = sex = "";
          }
        }
      }

      tables.push({
        text: "Eletivas",
        bold: true,
        margin: [0, 10, 0, 5],
        fontSize: 20,
        pageBreak: "before"
      });

      if (eletivas1.length === 0) {
        vazio = vazio + 1;
      } else {
        tables.push({
          table: {
            widths: ["*", "*", "*", "*", "*", "*"],
            headerRows: 1,
            color: "#426",
            body: [
              [
                { text: "Hora", alignment: "center", bold: true },
                {
                  text: "Segunda",
                  alignment: "center",
                  bold: true
                },
                { text: "Terça", alignment: "center", bold: true },
                {
                  text: "Quarta",
                  alignment: "center",
                  bold: true
                },
                { text: "Quinta", alignment: "center", bold: true },
                {
                  text: "Sexta",
                  alignment: "center",
                  bold: true
                }
              ]
            ]
          }
        });
        for (var d = 0; d < 6; d++) {
          for (var j = 0; j < eletivas1.length; j++) {
            if (this.checkTurmaHorario(eletivas1[j], 1 + d)) {
              for (var k = 0; k < disciplinas.length; k++) {
                if (eletivas1[j].Disciplina === disciplinas[k].id) {
                  if (seg !== "") seg = seg + " ";
                  seg = seg + disciplinas[k].codigo + " " + eletivas1[j].letra;
                }
              }
            }
            if (this.checkTurmaHorario(eletivas1[j], 7 + d)) {
              for (k = 0; k < disciplinas.length; k++) {
                if (eletivas1[j].Disciplina === disciplinas[k].id) {
                  if (ter != "") ter = ter + " ";
                  ter = ter + disciplinas[k].codigo + " " + eletivas1[j].letra;
                }
              }
            }
            if (this.checkTurmaHorario(eletivas1[j], 13 + d)) {
              for (k = 0; k < disciplinas.length; k++) {
                if (eletivas1[j].Disciplina === disciplinas[k].id) {
                  if (qua != "") qua = qua + " ";
                  qua = qua + disciplinas[k].codigo + " " + eletivas1[j].letra;
                }
              }
            }
            if (this.checkTurmaHorario(eletivas1[j], 19 + d)) {
              for (k = 0; k < disciplinas.length; k++) {
                if (eletivas1[j].Disciplina === disciplinas[k].id) {
                  if (qui != "") qui = qui + " ";
                  qui = qui + disciplinas[k].codigo + " " + eletivas1[j].letra;
                }
              }
            }
            if (this.checkTurmaHorario(eletivas1[j], 25 + d)) {
              for (k = 0; k < disciplinas.length; k++) {
                if (eletivas1[j].Disciplina === disciplinas[k].id) {
                  if (sex != "") sex = sex + " ";
                  sex = sex + disciplinas[k].codigo + " " + eletivas1[j].letra;
                }
              }
            }
          }
          console.log([seg, ter, qua, qui, sex]);
          switch (d) {
            case 0:
              tables[86 - 2 * vazio].table.body.push([
                {
                  text: "08 - 10",
                  alignment: "center"
                },
                { text: seg, alignment: "center" },
                { text: ter, alignment: "center" },
                {
                  text: qua,
                  alignment: "center"
                },
                { text: qui, alignment: "center" },
                { text: sex, alignment: "center" }
              ]);
              break;
            case 1:
              tables[86 - 2 * vazio].table.body.push([
                {
                  text: "10 - 12",
                  alignment: "center"
                },
                { text: seg, alignment: "center" },
                { text: ter, alignment: "center" },
                {
                  text: qua,
                  alignment: "center"
                },
                { text: qui, alignment: "center" },
                { text: sex, alignment: "center" }
              ]);
              break;
            case 2:
              tables[86 - 2 * vazio].table.body.push([
                {
                  text: "14 - 16",
                  alignment: "center"
                },
                { text: seg, alignment: "center" },
                { text: ter, alignment: "center" },
                {
                  text: qua,
                  alignment: "center"
                },
                { text: qui, alignment: "center" },
                { text: sex, alignment: "center" }
              ]);
              break;
            case 3:
              tables[86 - 2 * vazio].table.body.push([
                {
                  text: "16 - 18",
                  alignment: "center"
                },
                { text: seg, alignment: "center" },
                { text: ter, alignment: "center" },
                {
                  text: qua,
                  alignment: "center"
                },
                { text: qui, alignment: "center" },
                { text: sex, alignment: "center" }
              ]);
              break;
            case 4:
              tables[86 - 2 * vazio].table.body.push([
                {
                  text: "19 - 21",
                  alignment: "center"
                },
                { text: seg, alignment: "center" },
                { text: ter, alignment: "center" },
                {
                  text: qua,
                  alignment: "center"
                },
                { text: qui, alignment: "center" },
                { text: sex, alignment: "center" }
              ]);
              break;
            case 5:
              tables[86 - 2 * vazio].table.body.push([
                {
                  text: "21 - 23",
                  alignment: "center"
                },
                { text: seg, alignment: "center" },
                { text: ter, alignment: "center" },
                {
                  text: qua,
                  alignment: "center"
                },
                { text: qui, alignment: "center" },
                { text: sex, alignment: "center" }
              ]);
              break;
          }
          seg = ter = qua = qui = sex = "";
        }
      }

      var periodosCCD2 = this.ativos2.CCD;
      var periodosCCN2 = this.ativos2.CCN;
      var periodosEC2 = this.ativos2.EC;
      var periodosSI2 = this.ativos2.SI;
      var eletivas2 = this.ativos2.Eletivas;

      tables.push({
        text: "2º Semestre",
        bold: true,
        margin: [0, 10, 0, 5],
        fontSize: 20,
        pageBreak: "before"
      });
      tables.push({
        text: "Ciência da Computação Diurno",
        bold: true,
        margin: [0, 10, 0, 5],
        fontSize: 20
      });

      for (var i = 0; i < 10; i++) {
        if (periodosCCD2[i].length === 0) {
          vazio = vazio + 1;
        } else {
          tables.push({
            text: i + 1 + "º Período",
            bold: true,
            margin: [0, 5, 0, 5]
          });
          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: [
                [
                  { text: "Hora", alignment: "center", bold: true },
                  {
                    text: "Segunda",
                    alignment: "center",
                    bold: true
                  },
                  { text: "Terça", alignment: "center", bold: true },
                  {
                    text: "Quarta",
                    alignment: "center",
                    bold: true
                  },
                  { text: "Quinta", alignment: "center", bold: true },
                  {
                    text: "Sexta",
                    alignment: "center",
                    bold: true
                  }
                ]
              ]
            }
          });
          for (var d = 0; d < 4; d++) {
            for (var j = 0; j < periodosCCD2[i].length; j++) {
              if (this.checkTurmaHorario(periodosCCD2[i][j], 1 + d)) {
                for (var k = 0; k < disciplinas.length; k++) {
                  if (periodosCCD2[i][j].Disciplina === disciplinas[k].id) {
                    if (seg !== "") seg = seg + " ";
                    seg =
                      seg +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCD2[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosCCD2[i][j], 7 + d)) {
                for (k = 0; k < disciplinas.length; k++) {
                  if (periodosCCD2[i][j].Disciplina === disciplinas[k].id) {
                    if (ter != "") ter = ter + " ";
                    ter =
                      ter +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCD2[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosCCD2[i][j], 13 + d)) {
                for (k = 0; k < disciplinas.length; k++) {
                  if (periodosCCD2[i][j].Disciplina === disciplinas[k].id) {
                    if (qua != "") qua = qua + " ";
                    qua =
                      qua +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCD2[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosCCD2[i][j], 19 + d)) {
                for (k = 0; k < disciplinas.length; k++) {
                  if (periodosCCD2[i][j].Disciplina === disciplinas[k].id) {
                    if (qui != "") qui = qui + " ";
                    qui =
                      qui +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCD2[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosCCD2[i][j], 25 + d)) {
                for (k = 0; k < disciplinas.length; k++) {
                  if (periodosCCD2[i][j].Disciplina === disciplinas[k].id) {
                    if (sex != "") sex = sex + " ";
                    sex =
                      sex +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCD2[i][j].letra;
                  }
                }
              }
            }

            switch (d) {
              case 0:
                tables[90 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "08 - 10",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 1:
                tables[90 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "10 - 12",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 2:
                tables[90 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "14 - 16",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 3:
                tables[90 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "16 - 18",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 4:
                tables[90 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "19 - 21",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 5:
                tables[90 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "21 - 23",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
            }
            seg = ter = qua = qui = sex = "";
          }
        }
      }

      tables.push({
        text: "Ciência da Computação Noturno",
        bold: true,
        margin: [0, 10, 0, 5],
        fontSize: 20,
        pageBreak: "before"
      });

      for (var i = 0; i < 10; i++) {
        if (periodosCCN2[i].length === 0) {
          vazio = vazio + 1;
        } else {
          tables.push({
            text: i + 1 + "º Período",
            bold: true,
            margin: [0, 5, 0, 5]
          });
          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: [
                [
                  { text: "Hora", alignment: "center", bold: true },
                  {
                    text: "Segunda",
                    alignment: "center",
                    bold: true
                  },
                  { text: "Terça", alignment: "center", bold: true },
                  {
                    text: "Quarta",
                    alignment: "center",
                    bold: true
                  },
                  { text: "Quinta", alignment: "center", bold: true },
                  {
                    text: "Sexta",
                    alignment: "center",
                    bold: true
                  }
                ]
              ]
            }
          });
          for (var d = 4; d < 6; d++) {
            for (var j = 0; j < periodosCCN2[i].length; j++) {
              if (this.checkTurmaHorario(periodosCCN2[i][j], 1 + d)) {
                for (var k = 0; k < disciplinas.length; k++) {
                  if (periodosCCN2[i][j].Disciplina === disciplinas[k].id) {
                    if (seg !== "") seg = seg + " ";
                    seg =
                      seg +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCN2[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosCCN2[i][j], 7 + d)) {
                for (k = 0; k < disciplinas.length; k++) {
                  if (periodosCCN2[i][j].Disciplina === disciplinas[k].id) {
                    if (ter != "") ter = ter + " ";
                    ter =
                      ter +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCN2[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosCCN2[i][j], 13 + d)) {
                for (k = 0; k < disciplinas.length; k++) {
                  if (periodosCCN2[i][j].Disciplina === disciplinas[k].id) {
                    if (qua != "") qua = qua + " ";
                    qua =
                      qua +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCN2[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosCCN2[i][j], 19 + d)) {
                for (k = 0; k < disciplinas.length; k++) {
                  if (periodosCCN2[i][j].Disciplina === disciplinas[k].id) {
                    if (qui != "") qui = qui + " ";
                    qui =
                      qui +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCN2[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosCCN2[i][j], 25 + d)) {
                for (k = 0; k < disciplinas.length; k++) {
                  if (periodosCCN2[i][j].Disciplina === disciplinas[k].id) {
                    if (sex != "") sex = sex + " ";
                    sex =
                      sex +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCN2[i][j].letra;
                  }
                }
              }
            }

            switch (d) {
              case 0:
                tables[111 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "08 - 10",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 1:
                tables[111 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "10 - 12",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 2:
                tables[111 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "14 - 16",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 3:
                tables[111 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "16 - 18",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 4:
                tables[111 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "19 - 21",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 5:
                tables[111 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "21 - 23",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
            }
            seg = ter = qua = qui = sex = "";
          }
        }
      }

      tables.push({
        text: "Engenharia Computacional",
        bold: true,
        margin: [0, 10, 0, 5],
        fontSize: 20,
        pageBreak: "before"
      });

      for (var i = 0; i < 10; i++) {
        if (periodosEC2[i].length === 0) {
          vazio = vazio + 1;
        } else {
          tables.push({
            text: i + 1 + "º Período",
            bold: true,
            margin: [0, 5, 0, 5]
          });
          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: [
                [
                  { text: "Hora", alignment: "center", bold: true },
                  {
                    text: "Segunda",
                    alignment: "center",
                    bold: true
                  },
                  { text: "Terça", alignment: "center", bold: true },
                  {
                    text: "Quarta",
                    alignment: "center",
                    bold: true
                  },
                  { text: "Quinta", alignment: "center", bold: true },
                  {
                    text: "Sexta",
                    alignment: "center",
                    bold: true
                  }
                ]
              ]
            }
          });
          for (var d = 0; d < 4; d++) {
            for (var j = 0; j < periodosEC2[i].length; j++) {
              if (this.checkTurmaHorario(periodosEC2[i][j], 1 + d)) {
                for (var k = 0; k < disciplinas.length; k++) {
                  if (periodosEC2[i][j].Disciplina === disciplinas[k].id) {
                    if (seg !== "") seg = seg + " ";
                    seg =
                      seg +
                      disciplinas[k].codigo +
                      " " +
                      periodosEC2[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosEC2[i][j], 7 + d)) {
                for (k = 0; k < disciplinas.length; k++) {
                  if (periodosEC2[i][j].Disciplina === disciplinas[k].id) {
                    if (ter != "") ter = ter + " ";
                    ter =
                      ter +
                      disciplinas[k].codigo +
                      " " +
                      periodosEC2[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosEC2[i][j], 13 + d)) {
                for (k = 0; k < disciplinas.length; k++) {
                  if (periodosEC2[i][j].Disciplina === disciplinas[k].id) {
                    if (qua != "") qua = qua + " ";
                    qua =
                      qua +
                      disciplinas[k].codigo +
                      " " +
                      periodosEC2[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosEC2[i][j], 19 + d)) {
                for (k = 0; k < disciplinas.length; k++) {
                  if (periodosEC2[i][j].Disciplina === disciplinas[k].id) {
                    if (qui != "") qui = qui + " ";
                    qui =
                      qui +
                      disciplinas[k].codigo +
                      " " +
                      periodosEC2[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosEC2[i][j], 25 + d)) {
                for (k = 0; k < disciplinas.length; k++) {
                  if (periodosEC2[i][j].Disciplina === disciplinas[k].id) {
                    if (sex != "") sex = sex + " ";
                    sex =
                      sex +
                      disciplinas[k].codigo +
                      " " +
                      periodosEC2[i][j].letra;
                  }
                }
              }
            }

            switch (d) {
              case 0:
                tables[132 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "08 - 10",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 1:
                tables[132 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "10 - 12",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 2:
                tables[132 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "14 - 16",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 3:
                tables[132 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "16 - 18",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 4:
                tables[132 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "19 - 21",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 5:
                tables[132 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "21 - 23",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
            }
            seg = ter = qua = qui = sex = "";
          }
        }
      }

      tables.push({
        text: "Sistemas de Informação",
        bold: true,
        margin: [0, 10, 0, 5],
        fontSize: 20,
        pageBreak: "before"
      });

      for (var i = 0; i < 10; i++) {
        if (periodosSI2[i].length === 0) {
          vazio = vazio + 1;
        } else {
          tables.push({
            text: i + 1 + "º Período",
            bold: true,
            margin: [0, 5, 0, 5]
          });
          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: [
                [
                  { text: "Hora", alignment: "center", bold: true },
                  {
                    text: "Segunda",
                    alignment: "center",
                    bold: true
                  },
                  { text: "Terça", alignment: "center", bold: true },
                  {
                    text: "Quarta",
                    alignment: "center",
                    bold: true
                  },
                  { text: "Quinta", alignment: "center", bold: true },
                  {
                    text: "Sexta",
                    alignment: "center",
                    bold: true
                  }
                ]
              ]
            }
          });
          for (var d = 4; d < 6; d++) {
            for (var j = 0; j < periodosSI2[i].length; j++) {
              if (this.checkTurmaHorario(periodosSI2[i][j], 1 + d)) {
                for (var k = 0; k < disciplinas.length; k++) {
                  if (periodosSI2[i][j].Disciplina === disciplinas[k].id) {
                    if (seg !== "") seg = seg + " ";
                    seg =
                      seg +
                      disciplinas[k].codigo +
                      " " +
                      periodosSI2[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosSI2[i][j], 7 + d)) {
                for (k = 0; k < disciplinas.length; k++) {
                  if (periodosSI2[i][j].Disciplina === disciplinas[k].id) {
                    if (ter != "") ter = ter + " ";
                    ter =
                      ter +
                      disciplinas[k].codigo +
                      " " +
                      periodosSI2[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosSI2[i][j], 13 + d)) {
                for (k = 0; k < disciplinas.length; k++) {
                  if (periodosSI2[i][j].Disciplina === disciplinas[k].id) {
                    if (qua != "") qua = qua + " ";
                    qua =
                      qua +
                      disciplinas[k].codigo +
                      " " +
                      periodosSI2[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosSI2[i][j], 19 + d)) {
                for (k = 0; k < disciplinas.length; k++) {
                  if (periodosSI2[i][j].Disciplina === disciplinas[k].id) {
                    if (qui != "") qui = qui + " ";
                    qui =
                      qui +
                      disciplinas[k].codigo +
                      " " +
                      periodosSI2[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosSI2[i][j], 25 + d)) {
                for (k = 0; k < disciplinas.length; k++) {
                  if (periodosSI2[i][j].Disciplina === disciplinas[k].id) {
                    if (sex != "") sex = sex + " ";
                    sex =
                      sex +
                      disciplinas[k].codigo +
                      " " +
                      periodosSI2[i][j].letra;
                  }
                }
              }
            }

            switch (d) {
              case 0:
                tables[153 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "08 - 10",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 1:
                tables[153 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "10 - 12",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 2:
                tables[153 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "14 - 16",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 3:
                tables[153 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "16 - 18",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 4:
                tables[153 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "19 - 21",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 5:
                tables[153 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "21 - 23",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
            }
            seg = ter = qua = qui = sex = "";
          }
        }
      }

      tables.push({
        text: "Eletivas",
        bold: true,
        margin: [0, 10, 0, 5],
        fontSize: 20,
        pageBreak: "before"
      });

      if (eletivas2.length === 0) {
        vazio = vazio + 1;
      } else {
        tables.push({
          table: {
            widths: ["*", "*", "*", "*", "*", "*"],
            headerRows: 1,
            color: "#426",
            body: [
              [
                { text: "Hora", alignment: "center", bold: true },
                {
                  text: "Segunda",
                  alignment: "center",
                  bold: true
                },
                { text: "Terça", alignment: "center", bold: true },
                {
                  text: "Quarta",
                  alignment: "center",
                  bold: true
                },
                { text: "Quinta", alignment: "center", bold: true },
                {
                  text: "Sexta",
                  alignment: "center",
                  bold: true
                }
              ]
            ]
          }
        });
        for (var d = 0; d < 6; d++) {
          for (var j = 0; j < eletivas2.length; j++) {
            if (this.checkTurmaHorario(eletivas2[j], 1 + d)) {
              for (var k = 0; k < disciplinas.length; k++) {
                if (eletivas2[j].Disciplina === disciplinas[k].id) {
                  if (seg !== "") seg = seg + " ";
                  seg = seg + disciplinas[k].codigo + " " + eletivas2[j].letra;
                }
              }
            }
            if (this.checkTurmaHorario(eletivas2[j], 7 + d)) {
              for (k = 0; k < disciplinas.length; k++) {
                if (eletivas2[j].Disciplina === disciplinas[k].id) {
                  if (ter != "") ter = ter + " ";
                  ter = ter + disciplinas[k].codigo + " " + eletivas2[j].letra;
                }
              }
            }
            if (this.checkTurmaHorario(eletivas2[j], 13 + d)) {
              for (k = 0; k < disciplinas.length; k++) {
                if (eletivas2[j].Disciplina === disciplinas[k].id) {
                  if (qua != "") qua = qua + " ";
                  qua = qua + disciplinas[k].codigo + " " + eletivas2[j].letra;
                }
              }
            }
            if (this.checkTurmaHorario(eletivas2[j], 19 + d)) {
              for (k = 0; k < disciplinas.length; k++) {
                if (eletivas2[j].Disciplina === disciplinas[k].id) {
                  if (qui != "") qui = qui + " ";
                  qui = qui + disciplinas[k].codigo + " " + eletivas2[j].letra;
                }
              }
            }
            if (this.checkTurmaHorario(eletivas2[j], 25 + d)) {
              for (k = 0; k < disciplinas.length; k++) {
                if (eletivas2[j].Disciplina === disciplinas[k].id) {
                  if (sex != "") sex = sex + " ";
                  sex = sex + disciplinas[k].codigo + " " + eletivas2[j].letra;
                }
              }
            }
          }
          console.log([seg, ter, qua, qui, sex]);
          switch (d) {
            case 0:
              tables[173 - 2 * vazio].table.body.push([
                {
                  text: "08 - 10",
                  alignment: "center"
                },
                { text: seg, alignment: "center" },
                { text: ter, alignment: "center" },
                {
                  text: qua,
                  alignment: "center"
                },
                { text: qui, alignment: "center" },
                { text: sex, alignment: "center" }
              ]);
              break;
            case 1:
              tables[173 - 2 * vazio].table.body.push([
                {
                  text: "10 - 12",
                  alignment: "center"
                },
                { text: seg, alignment: "center" },
                { text: ter, alignment: "center" },
                {
                  text: qua,
                  alignment: "center"
                },
                { text: qui, alignment: "center" },
                { text: sex, alignment: "center" }
              ]);
              break;
            case 2:
              tables[173 - 2 * vazio].table.body.push([
                {
                  text: "14 - 16",
                  alignment: "center"
                },
                { text: seg, alignment: "center" },
                { text: ter, alignment: "center" },
                {
                  text: qua,
                  alignment: "center"
                },
                { text: qui, alignment: "center" },
                { text: sex, alignment: "center" }
              ]);
              break;
            case 3:
              tables[173 - 2 * vazio].table.body.push([
                {
                  text: "16 - 18",
                  alignment: "center"
                },
                { text: seg, alignment: "center" },
                { text: ter, alignment: "center" },
                {
                  text: qua,
                  alignment: "center"
                },
                { text: qui, alignment: "center" },
                { text: sex, alignment: "center" }
              ]);
              break;
            case 4:
              tables[173 - 2 * vazio].table.body.push([
                {
                  text: "19 - 21",
                  alignment: "center"
                },
                { text: seg, alignment: "center" },
                { text: ter, alignment: "center" },
                {
                  text: qua,
                  alignment: "center"
                },
                { text: qui, alignment: "center" },
                { text: sex, alignment: "center" }
              ]);
              break;
            case 5:
              tables[173 - 2 * vazio].table.body.push([
                {
                  text: "21 - 23",
                  alignment: "center"
                },
                { text: seg, alignment: "center" },
                { text: ter, alignment: "center" },
                {
                  text: qua,
                  alignment: "center"
                },
                { text: qui, alignment: "center" },
                { text: sex, alignment: "center" }
              ]);
              break;
          }
          seg = ter = qua = qui = sex = "";
        }
      }

      var docDefinition = {
        content: tables,
        header: {
          text: new Date(Date.now()).toLocaleString(),
          margin: [40, 20, 0, 0],
          fontSize: 10
        }
      };
      pdfMake.createPdf(docDefinition).open();
    },

    isEven(number) {
      if (number % 2 === 0) return "true";
      else return "false";
    },

    emptyTurmas1() {
      this.ativos1 = {
        CCD: [[], [], [], [], [], [], [], [], [], []],
        CCN: [[], [], [], [], [], [], [], [], [], []],
        EC: [[], [], [], [], [], [], [], [], [], []],
        SI: [[], [], [], [], [], [], [], [], [], []],
        Eletivas: []
      };
    },

    emptyTurmas2() {
      this.ativos2 = {
        CCD: [[], [], [], [], [], [], [], [], [], []],
        CCN: [[], [], [], [], [], [], [], [], [], []],
        EC: [[], [], [], [], [], [], [], [], [], []],
        SI: [[], [], [], [], [], [], [], [], [], []],
        Eletivas: []
      };
    },

    filterTurmas: function(t) {
      var check = false;
      for (var turma in this.ativos1.CCN) {
        if (turma.id === t.id) check = true;
      }
      return check;
    },

    createHorarios1: function(ano, semestre) {
      var grade;
      var grades;
      var inicio = 1;
      var fim;
      var pedidos;
      var pedidosExternos;
      var disciplinaGrades = this.$store.state.disciplinaGrade.DisciplinaGrades;
      var turmas = this.$store.state.turma.Turmas;
      var turmasExternas = this.$store.state.turmaExterna.Turmas;

      console.log(this.$store.state.curso.Cursos);

      if (semestre === 1) {
        if (this.$store.state.curso.Cursos[0].semestreInicial == 1) {
          this.evenCCN = "false";
        } else if (this.$store.state.curso.Cursos[0].semestreInicial == 2) {
          this.evenCCN = "true";
        }

        if (this.$store.state.curso.Cursos[1].semestreInicial == 1) {
          this.evenEC = "false";
        } else if (this.$store.state.curso.Cursos[1].semestreInicial == 2) {
          this.evenEC = "true";
        }

        if (this.$store.state.curso.Cursos[2].semestreInicial == 1) {
          this.evenSI = "false";
        } else if (this.$store.state.curso.Cursos[2].semestreInicial == 2) {
          this.evenSI = "true";
        }

        if (this.$store.state.curso.Cursos[3].semestreInicial == 1) {
          this.evenCCD = "false";
        } else if (this.$store.state.curso.Cursos[3].semestreInicial == 2) {
          this.evenCCD = "true";
        }
      } else {
        if (this.$store.state.curso.Cursos[0].semestreInicial == 1) {
          this.evenCCN = "true";
        } else if (this.$store.state.curso.Cursos[0].semestreInicial == 2) {
          this.evenCCN = "false";
        }

        if (this.$store.state.curso.Cursos[1].semestreInicial == 1) {
          this.evenEC = "true";
        } else if (this.$store.state.curso.Cursos[1].semestreInicial == 2) {
          this.evenEC = "false";
        }

        if (this.$store.state.curso.Cursos[2].semestreInicial == 1) {
          this.evenSI = "true";
        } else if (this.$store.state.curso.Cursos[2].semestreInicial == 2) {
          this.evenSI = "false";
        }

        if (this.$store.state.curso.Cursos[3].semestreInicial == 1) {
          this.evenCCD = "true";
        } else if (this.$store.state.curso.Cursos[3].semestreInicial == 2) {
          this.evenCCD = "false";
        }
      }
      console.log([this.evenCCD, this.evenCCN, this.evenSI, this.evenEC]);
      this.emptyTurmas1();

      //CC Diurno
      grades = _.filter(this.$store.state.grade.Grades, ["Curso", 4]);
      grades = _.orderBy(grades, "periodoInicio", "desc");
      pedidos = [];
      for (var t in this.$store.state.pedido.Pedidos) {
        for (var pedido in this.$store.state.pedido.Pedidos[t]) {
          if (this.$store.state.pedido.Pedidos[t][pedido].Curso === 4) {
            pedidos.push(this.$store.state.pedido.Pedidos[t][pedido]);
          }
        }
      }
      pedidosExternos = pedidosExternos = []
      for (let t in this.$store.state.pedidoExterno.Pedidos){
        for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]){
          if(this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso===4){
            pedidosExternos.push(this.$store.state.pedidoExterno.Pedidos[t][pedido])
          }
        }
      }
      console.log(grades.length);

      for (var i = 0; i < grades.length && inicio <= 10; i++) {
        //grade
        grade = grades[i].id;
        //inicio
        if (i === 0) inicio = 1;
        else inicio = fim + 1;
        //fim
        if (i + 1 === grades.length) fim = 10;
        else if (i == 0)
          fim =
            1 +
            2 * (ano - parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (semestre - parseInt(grades[i].periodoInicio.slice(5, 6), 10)) / 2;
        else
          fim =
            inicio -
            1 +
            2 *
              (parseInt(grades[i - 1].periodoInicio.slice(0, 4), 10) -
                parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (parseInt(grades[i - 1].periodoInicio.slice(5, 6), 10) -
              parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
              2;
        for (var k = 0; k < disciplinaGrades.length; k++) {
          if (
            disciplinaGrades[k].Grade == grade &&
            this.isEven(disciplinaGrades[k].periodo) == this.evenCCD &&
            disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
            disciplinaGrades[k].periodo <= parseInt(fim, 10)
          ) {
            for (var j = 0; j < turmas.length; j++) {
              if (
                turmas[j].periodo === 1 &&
                turmas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (var p = 0; p < pedidos.length; p++) {
                  if (
                    pedidos[p].vagasPeriodizadas > 0 &&
                    pedidos[p].Turma == turmas[j].id
                  ) {
                    this.ativos1.CCD[disciplinaGrades[k].periodo - 1].push(
                      turmas[j]
                    );
                  }
                }
              }
            }
            for (var j = 0; j < turmasExternas.length; j++) {
              if (
                turmasExternas[j].periodo === 1 &&
                turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (var p = 0; p < pedidosExternos.length; p++) {
                  if (
                    pedidosExternos[p].vagasPeriodizadas > 0 &&
                    pedidosExternos[p].Turma == turmasExternas[j].id
                  ) {
                    this.ativos1.CCD[disciplinaGrades[k].periodo - 1].push(
                      turmasExternas[j]
                    );
                  }
                }
              }
            }
          }
        }
      }

      //CC Noturno está selecionado
      grades = _.filter(this.$store.state.grade.Grades, ["Curso", 1]);
      grades = _.orderBy(grades, "periodoInicio", "desc");
      pedidos = [];
      for (var t in this.$store.state.pedido.Pedidos) {
        for (var pedido in this.$store.state.pedido.Pedidos[t]) {
          if (this.$store.state.pedido.Pedidos[t][pedido].Curso === 1) {
            pedidos.push(this.$store.state.pedido.Pedidos[t][pedido]);
          }
        }
      }
      pedidosExternos = pedidosExternos = []
      for (let t in this.$store.state.pedidoExterno.Pedidos){
        for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]){
          if(this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso===1){
            pedidosExternos.push(this.$store.state.pedidoExterno.Pedidos[t][pedido])
          }
        }
      }
      for (var i = 0; i < grades.length && inicio <= 10; i++) {
        //grade
        grade = grades[i].id;
        //inicio
        if (i === 0) inicio = 1;
        else inicio = fim + 1;
        //fim
        if (i + 1 === grades.length) fim = 10;
        else if (i == 0)
          fim =
            1 +
            2 * (ano - parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (semestre - parseInt(grades[i].periodoInicio.slice(5, 6), 10)) / 2;
        else
          fim =
            inicio -
            1 +
            2 *
              (parseInt(grades[i - 1].periodoInicio.slice(0, 4), 10) -
                parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (parseInt(grades[i - 1].periodoInicio.slice(5, 6), 10) -
              parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
              2;
        for (var k = 0; k < disciplinaGrades.length; k++) {
          if (
            disciplinaGrades[k].Grade == grade &&
            this.isEven(disciplinaGrades[k].periodo) == this.evenCCN &&
            disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
            disciplinaGrades[k].periodo <= parseInt(fim, 10)
          ) {
            for (var j = 0; j < turmas.length; j++) {
              if (
                turmas[j].periodo === 1 &&
                turmas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (var p = 0; p < pedidos.length; p++) {
                  if (
                    pedidos[p].vagasPeriodizadas > 0 &&
                    pedidos[p].Turma == turmas[j].id
                  ) {
                    this.ativos1.CCN[disciplinaGrades[k].periodo - 1].push(
                      turmas[j]
                    );
                  }
                }
              }
            }
            for (var j = 0; j < turmasExternas.length; j++) {
              if (
                turmasExternas[j].periodo === 1 &&
                turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (var p = 0; p < pedidosExternos.length; p++) {
                  if (
                    pedidosExternos[p].vagasPeriodizadas > 0 &&
                    pedidosExternos[p].Turma == turmasExternas[j].id
                  ) {
                    this.ativos1.CCN[disciplinaGrades[k].periodo - 1].push(
                      turmasExternas[j]
                    );
                  }
                }
              }
            }
          }
        }
      }

      //SI está selecionado
      grades = _.filter(this.$store.state.grade.Grades, ["Curso", 3]);
      grades = _.orderBy(grades, "periodoInicio", "desc");
      pedidos = [];
      for (var t in this.$store.state.pedido.Pedidos) {
        for (var pedido in this.$store.state.pedido.Pedidos[t]) {
          if (this.$store.state.pedido.Pedidos[t][pedido].Curso === 3) {
            pedidos.push(this.$store.state.pedido.Pedidos[t][pedido]);
          }
        }
      }
      pedidosExternos = pedidosExternos = []
      for (let t in this.$store.state.pedidoExterno.Pedidos){
        for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]){
          if(this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso===3){
            pedidosExternos.push(this.$store.state.pedidoExterno.Pedidos[t][pedido])
          }
        }
      }
      for (var i = 0; i < grades.length && inicio <= 10; i++) {
        //grade
        grade = grades[i].id;
        //inicio
        if (i === 0) inicio = 1;
        else inicio = fim + 1;
        //fim
        if (i + 1 === grades.length) fim = 10;
        else if (i == 0)
          fim =
            1 +
            2 * (ano - parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (semestre - parseInt(grades[i].periodoInicio.slice(5, 6), 10)) / 2;
        else
          fim =
            inicio -
            1 +
            2 *
              (parseInt(grades[i - 1].periodoInicio.slice(0, 4), 10) -
                parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (parseInt(grades[i - 1].periodoInicio.slice(5, 6), 10) -
              parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
              2;
        for (var k = 0; k < disciplinaGrades.length; k++) {
          if (
            disciplinaGrades[k].Grade == grade &&
            this.isEven(disciplinaGrades[k].periodo) == this.evenSI &&
            disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
            disciplinaGrades[k].periodo <= parseInt(fim, 10)
          ) {
            for (var j = 0; j < turmas.length; j++) {
              if (
                turmas[j].periodo === 1 &&
                turmas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (var p = 0; p < pedidos.length; p++) {
                  if (
                    pedidos[p].vagasPeriodizadas > 0 &&
                    pedidos[p].Turma == turmas[j].id
                  ) {
                    this.ativos1.SI[disciplinaGrades[k].periodo - 1].push(
                      turmas[j]
                    );
                  }
                }
              }
            }
            for (var j = 0; j < turmasExternas.length; j++) {
              if (
                turmasExternas[j].periodo === 1 &&
                turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (var p = 0; p < pedidosExternos.length; p++) {
                  if (
                    pedidosExternos[p].vagasPeriodizadas > 0 &&
                    pedidosExternos[p].Turma == turmasExternas[j].id
                  ) {
                    this.ativos1.SI[disciplinaGrades[k].periodo - 1].push(
                      turmasExternas[j]
                    );
                  }
                }
              }
            }
          }
        }
      }

      //Engenharia Computacional está selecionado
      grades = _.filter(this.$store.state.grade.Grades, ["Curso", 2]);
      grades = _.orderBy(grades, "periodoInicio", "desc");
      pedidos = [];
      for (var t in this.$store.state.pedido.Pedidos) {
        for (var pedido in this.$store.state.pedido.Pedidos[t]) {
          if (this.$store.state.pedido.Pedidos[t][pedido].Curso === 2) {
            pedidos.push(this.$store.state.pedido.Pedidos[t][pedido]);
          }
        }
      }
      pedidosExternos = pedidosExternos = []
      for (let t in this.$store.state.pedidoExterno.Pedidos){
        for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]){
          if(this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso===2){
            pedidosExternos.push(this.$store.state.pedidoExterno.Pedidos[t][pedido])
          }
        }
      }
      for (var i = 0; i < grades.length && inicio <= 10; i++) {
        //grade
        grade = grades[i].id;
        //inicio
        if (i === 0) inicio = 1;
        else inicio = fim + 1;
        //fim
        if (i + 1 === grades.length) fim = 10;
        else if (i == 0)
          fim =
            1 +
            2 * (ano - parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (semestre - parseInt(grades[i].periodoInicio.slice(5, 6), 10)) / 2;
        else
          fim =
            inicio -
            1 +
            2 *
              (parseInt(grades[i - 1].periodoInicio.slice(0, 4), 10) -
                parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (parseInt(grades[i - 1].periodoInicio.slice(5, 6), 10) -
              parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
              2;
        for (var k = 0; k < disciplinaGrades.length; k++) {
          if (
            disciplinaGrades[k].Grade == grade &&
            this.isEven(disciplinaGrades[k].periodo) == this.evenEC &&
            disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
            disciplinaGrades[k].periodo <= parseInt(fim, 10)
          ) {
            for (var j = 0; j < turmas.length; j++) {
              if (
                turmas[j].periodo === 1 &&
                turmas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (var p = 0; p < pedidos.length; p++) {
                  if (
                    pedidos[p].vagasPeriodizadas > 0 &&
                    pedidos[p].Turma == turmas[j].id
                  ) {
                    this.ativos1.EC[disciplinaGrades[k].periodo - 1].push(
                      turmas[j]
                    );
                  }
                }
              }
            }
            for (var j = 0; j < turmasExternas.length; j++) {
              if (
                turmasExternas[j].periodo === 1 &&
                turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (var p = 0; p < pedidosExternos.length; p++) {
                  if (
                    pedidosExternos[p].vagasPeriodizadas > 0 &&
                    pedidosExternos[p].Turma == turmasExternas[j].id
                  ) {
                    this.ativos1.EC[disciplinaGrades[k].periodo - 1].push(
                      turmasExternas[j]
                    );
                  }
                }
              }
            }
          }
        }
      }

      //Eletivas está selecionado:
      var eletiva = true;
      for (var t = 0; t < turmas.length; t++) {
        for (var d = 0; d < disciplinaGrades.length; d++) {
          if (
            turmas[t].periodo != 1 ||
            turmas[t].Disciplina === disciplinaGrades[d].Disciplina
          ) {
            eletiva = false;
          }
        }
        if (eletiva) {
          this.ativos1.Eletivas.push(turmas[t]);
        } else {
          eletiva = true;
        }
      }
    },

    createHorarios2: function(ano, semestre) {
      var grade;
      var grades;
      var inicio = 1;
      var fim;
      var pedidos;
      var pedidosExternos;
      var disciplinaGrades = this.$store.state.disciplinaGrade.DisciplinaGrades;
      var turmas = this.$store.state.turma.Turmas;
      var turmasExternas = this.$store.state.turmaExterna.Turmas;

      console.log(this.$store.state.curso.Cursos);

      if (semestre === 1) {
        if (this.$store.state.curso.Cursos[0].semestreInicial == 1) {
          this.evenCCN = "false";
        } else if (this.$store.state.curso.Cursos[0].semestreInicial == 2) {
          this.evenCCN = "true";
        }

        if (this.$store.state.curso.Cursos[1].semestreInicial == 1) {
          this.evenEC = "false";
        } else if (this.$store.state.curso.Cursos[1].semestreInicial == 2) {
          this.evenEC = "true";
        }

        if (this.$store.state.curso.Cursos[2].semestreInicial == 1) {
          this.evenSI = "false";
        } else if (this.$store.state.curso.Cursos[2].semestreInicial == 2) {
          this.evenSI = "true";
        }

        if (this.$store.state.curso.Cursos[3].semestreInicial == 1) {
          this.evenCCD = "false";
        } else if (this.$store.state.curso.Cursos[3].semestreInicial == 2) {
          this.evenCCD = "true";
        }
      } else {
        if (this.$store.state.curso.Cursos[0].semestreInicial == 1) {
          this.evenCCN = "true";
        } else if (this.$store.state.curso.Cursos[0].semestreInicial == 2) {
          this.evenCCN = "false";
        }

        if (this.$store.state.curso.Cursos[1].semestreInicial == 1) {
          this.evenEC = "true";
        } else if (this.$store.state.curso.Cursos[1].semestreInicial == 2) {
          this.evenEC = "false";
        }

        if (this.$store.state.curso.Cursos[2].semestreInicial == 1) {
          this.evenSI = "true";
        } else if (this.$store.state.curso.Cursos[2].semestreInicial == 2) {
          this.evenSI = "false";
        }

        if (this.$store.state.curso.Cursos[3].semestreInicial == 1) {
          this.evenCCD = "true";
        } else if (this.$store.state.curso.Cursos[3].semestreInicial == 2) {
          this.evenCCD = "false";
        }
      }
      console.log([this.evenCCD, this.evenCCN, this.evenSI, this.evenEC]);
      this.emptyTurmas2();

      //CC Diurno está selecionado

      grades = _.filter(this.$store.state.grade.Grades, ["Curso", 4]);
      grades = _.orderBy(grades, "periodoInicio", "desc");
      pedidos = [];
      for (var t in this.$store.state.pedido.Pedidos) {
        for (var pedido in this.$store.state.pedido.Pedidos[t]) {
          if (this.$store.state.pedido.Pedidos[t][pedido].Curso === 4) {
            pedidos.push(this.$store.state.pedido.Pedidos[t][pedido]);
          }
        }
      }
      pedidosExternos = pedidosExternos = []
      for (let t in this.$store.state.pedidoExterno.Pedidos){
        for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]){
          if(this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso===4){
            pedidosExternos.push(this.$store.state.pedidoExterno.Pedidos[t][pedido])
          }
        }
      }
      console.log(grades.length);

      for (var i = 0; i < grades.length && inicio <= 10; i++) {
        //grade
        grade = grades[i].id;
        //inicio
        if (i === 0) inicio = 1;
        else inicio = fim + 1;
        //fim
        if (i + 1 === grades.length) fim = 10;
        else if (i == 0)
          fim =
            1 +
            2 * (ano - parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (semestre - parseInt(grades[i].periodoInicio.slice(5, 6), 10)) / 2;
        else
          fim =
            inicio -
            1 +
            2 *
              (parseInt(grades[i - 1].periodoInicio.slice(0, 4), 10) -
                parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (parseInt(grades[i - 1].periodoInicio.slice(5, 6), 10) -
              parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
              2;
        for (var k = 0; k < disciplinaGrades.length; k++) {
          if (
            disciplinaGrades[k].Grade == grade &&
            this.isEven(disciplinaGrades[k].periodo) == this.evenCCD &&
            disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
            disciplinaGrades[k].periodo <= parseInt(fim, 10)
          ) {
            for (var j = 0; j < turmas.length; j++) {
              if (
                turmas[j].periodo === 3 &&
                turmas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (var p = 0; p < pedidos.length; p++) {
                  if (
                    pedidos[p].vagasPeriodizadas > 0 &&
                    pedidos[p].Turma == turmas[j].id
                  ) {
                    this.ativos2.CCD[disciplinaGrades[k].periodo - 1].push(
                      turmas[j]
                    );
                  }
                }
              }
            }
            for (var j = 0; j < turmasExternas.length; j++) {
              if (
                turmasExternas[j].periodo === 3 &&
                turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (var p = 0; p < pedidosExternos.length; p++) {
                  if (
                    pedidosExternos[p].vagasPeriodizadas > 0 &&
                    pedidosExternos[p].Turma == turmasExternas[j].id
                  ) {
                    this.ativos2.CCD[disciplinaGrades[k].periodo - 1].push(
                      turmasExternas[j]
                    );
                  }
                }
              }
            }
          }
        }
      }

      //CC Noturno está selecionado
      grades = _.filter(this.$store.state.grade.Grades, ["Curso", 1]);
      grades = _.orderBy(grades, "periodoInicio", "desc");
      pedidos = [];
      for (var t in this.$store.state.pedido.Pedidos) {
        for (var pedido in this.$store.state.pedido.Pedidos[t]) {
          if (this.$store.state.pedido.Pedidos[t][pedido].Curso === 1) {
            pedidos.push(this.$store.state.pedido.Pedidos[t][pedido]);
          }
        }
      }
      pedidosExternos = pedidosExternos = []
      for (let t in this.$store.state.pedidoExterno.Pedidos){
        for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]){
          if(this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso===1){
            pedidosExternos.push(this.$store.state.pedidoExterno.Pedidos[t][pedido])
          }
        }
      }
      for (var i = 0; i < grades.length && inicio <= 10; i++) {
        //grade
        grade = grades[i].id;
        //inicio
        if (i === 0) inicio = 1;
        else inicio = fim + 1;
        //fim
        if (i + 1 === grades.length) fim = 10;
        else if (i == 0)
          fim =
            1 +
            2 * (ano - parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (semestre - parseInt(grades[i].periodoInicio.slice(5, 6), 10)) / 2;
        else
          fim =
            inicio -
            1 +
            2 *
              (parseInt(grades[i - 1].periodoInicio.slice(0, 4), 10) -
                parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (parseInt(grades[i - 1].periodoInicio.slice(5, 6), 10) -
              parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
              2;
        for (var k = 0; k < disciplinaGrades.length; k++) {
          if (
            disciplinaGrades[k].Grade == grade &&
            this.isEven(disciplinaGrades[k].periodo) == this.evenCCN &&
            disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
            disciplinaGrades[k].periodo <= parseInt(fim, 10)
          ) {
            for (var j = 0; j < turmas.length; j++) {
              if (
                turmas[j].periodo === 3 &&
                turmas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (var p = 0; p < pedidos.length; p++) {
                  if (
                    pedidos[p].vagasPeriodizadas > 0 &&
                    pedidos[p].Turma == turmas[j].id
                  ) {
                    this.ativos2.CCN[disciplinaGrades[k].periodo - 1].push(
                      turmas[j]
                    );
                  }
                }
              }
            }
            for (var j = 0; j < turmasExternas.length; j++) {
              if (
                turmasExternas[j].periodo === 3 &&
                turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (var p = 0; p < pedidosExternos.length; p++) {
                  if (
                    pedidosExternos[p].vagasPeriodizadas > 0 &&
                    pedidosExternos[p].Turma == turmasExternas[j].id
                  ) {
                    this.ativos2.CCN[disciplinaGrades[k].periodo - 1].push(
                      turmasExternas[j]
                    );
                  }
                }
              }
            }
          }
        }
      }

      //SI está selecionado
      grades = _.filter(this.$store.state.grade.Grades, ["Curso", 3]);
      grades = _.orderBy(grades, "periodoInicio", "desc");
      pedidos = [];
      for (var t in this.$store.state.pedido.Pedidos) {
        for (var pedido in this.$store.state.pedido.Pedidos[t]) {
          if (this.$store.state.pedido.Pedidos[t][pedido].Curso === 3) {
            pedidos.push(this.$store.state.pedido.Pedidos[t][pedido]);
          }
        }
      }
      pedidosExternos = pedidosExternos = []
      for (let t in this.$store.state.pedidoExterno.Pedidos){
        for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]){
          if(this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso===3){
            pedidosExternos.push(this.$store.state.pedidoExterno.Pedidos[t][pedido])
          }
        }
      }
      for (var i = 0; i < grades.length && inicio <= 10; i++) {
        //grade
        grade = grades[i].id;
        //inicio
        if (i === 0) inicio = 1;
        else inicio = fim + 1;
        //fim
        if (i + 1 === grades.length) fim = 10;
        else if (i == 0)
          fim =
            1 +
            2 * (ano - parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (semestre - parseInt(grades[i].periodoInicio.slice(5, 6), 10)) / 2;
        else
          fim =
            inicio -
            1 +
            2 *
              (parseInt(grades[i - 1].periodoInicio.slice(0, 4), 10) -
                parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (parseInt(grades[i - 1].periodoInicio.slice(5, 6), 10) -
              parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
              2;
        for (var k = 0; k < disciplinaGrades.length; k++) {
          if (
            disciplinaGrades[k].Grade == grade &&
            this.isEven(disciplinaGrades[k].periodo) == this.evenSI &&
            disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
            disciplinaGrades[k].periodo <= parseInt(fim, 10)
          ) {
            for (var j = 0; j < turmas.length; j++) {
              if (
                turmas[j].periodo === 3 &&
                turmas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (var p = 0; p < pedidos.length; p++) {
                  if (
                    pedidos[p].vagasPeriodizadas > 0 &&
                    pedidos[p].Turma == turmas[j].id
                  ) {
                    this.ativos2.SI[disciplinaGrades[k].periodo - 1].push(
                      turmas[j]
                    );
                  }
                }
              }
            }
            for (var j = 0; j < turmasExternas.length; j++) {
              if (
                turmasExternas[j].periodo === 3 &&
                turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (var p = 0; p < pedidosExternos.length; p++) {
                  if (
                    pedidosExternos[p].vagasPeriodizadas > 0 &&
                    pedidosExternos[p].Turma == turmasExternas[j].id
                  ) {
                    this.ativos2.SI[disciplinaGrades[k].periodo - 1].push(
                      turmasExternas[j]
                    );
                  }
                }
              }
            }
          }
        }
      }

      //Engenharia Computacional está selecionado
      grades = _.filter(this.$store.state.grade.Grades, ["Curso", 2]);
      grades = _.orderBy(grades, "periodoInicio", "desc");
      pedidos = [];
      for (var t in this.$store.state.pedido.Pedidos) {
        for (var pedido in this.$store.state.pedido.Pedidos[t]) {
          if (this.$store.state.pedido.Pedidos[t][pedido].Curso === 2) {
            pedidos.push(this.$store.state.pedido.Pedidos[t][pedido]);
          }
        }
      }
      pedidosExternos = pedidosExternos = []
      for (let t in this.$store.state.pedidoExterno.Pedidos){
        for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]){
          if(this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso===2){
            pedidosExternos.push(this.$store.state.pedidoExterno.Pedidos[t][pedido])
          }
        }
      }
      for (var i = 0; i < grades.length && inicio <= 10; i++) {
        //grade
        grade = grades[i].id;
        //inicio
        if (i === 0) inicio = 1;
        else inicio = fim + 1;
        //fim
        if (i + 1 === grades.length) fim = 10;
        else if (i == 0)
          fim =
            1 +
            2 * (ano - parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (semestre - parseInt(grades[i].periodoInicio.slice(5, 6), 10)) / 2;
        else
          fim =
            inicio -
            1 +
            2 *
              (parseInt(grades[i - 1].periodoInicio.slice(0, 4), 10) -
                parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (parseInt(grades[i - 1].periodoInicio.slice(5, 6), 10) -
              parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
              2;
        for (var k = 0; k < disciplinaGrades.length; k++) {
          if (
            disciplinaGrades[k].Grade == grade &&
            this.isEven(disciplinaGrades[k].periodo) == this.evenEC &&
            disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
            disciplinaGrades[k].periodo <= parseInt(fim, 10)
          ) {
            for (var j = 0; j < turmas.length; j++) {
              if (
                turmas[j].periodo === 3 &&
                turmas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (var p = 0; p < pedidos.length; p++) {
                  if (
                    pedidos[p].vagasPeriodizadas > 0 &&
                    pedidos[p].Turma == turmas[j].id
                  ) {
                    this.ativos2.EC[disciplinaGrades[k].periodo - 1].push(
                      turmas[j]
                    );
                  }
                }
              }
            }
            for (var j = 0; j < turmasExternas.length; j++) {
              if (
                turmasExternas[j].periodo === 3 &&
                turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (var p = 0; p < pedidosExternos.length; p++) {
                  if (
                    pedidosExternos[p].vagasPeriodizadas > 0 &&
                    pedidosExternos[p].Turma == turmasExternas[j].id
                  ) {
                    this.ativos2.EC[disciplinaGrades[k].periodo - 1].push(
                      turmasExternas[j]
                    );
                  }
                }
              }
            }
          }
        }
      }

      //Eletivas está selecionado:
      var eletiva = true;
      for (var t = 0; t < turmas.length; t++) {
        for (var d = 0; d < disciplinaGrades.length; d++) {
          if (
            turmas[t].periodo != 3 ||
            turmas[t].Disciplina === disciplinaGrades[d].Disciplina
          ) {
            eletiva = false;
          }
        }
        if (eletiva) {
          this.ativos2.Eletivas.push(turmas[t]);
        } else {
          eletiva = true;
        }
      }
    },

    horarioVazio(curso) {
      if (curso.length != 0) return true;
      else return false;
    },

    checkTurmaHorario(turma, horario) {
      if (turma.Horario1 == horario || turma.Horario2 == horario) {
        return true;
      } else return false;
    },

    checkPeriodo(turma, periodo) {
      for (
        var g = 0;
        g < this.$store.state.disciplinaGrade.DisciplinaGrades.length;
        g++
      ) {
        if (
          this.$store.state.disciplinaGrade.DisciplinaGrades[g].Disciplina ==
            turma &&
          this.$store.state.disciplinaGrade.DisciplinaGrades[g].periodo ==
            periodo
        ) {
          return true;
        }
      }
    },

    updateHorarios() {
      for (var i = 0; i < 10; i++) {
        for (var j = 0; j < this.ativos.CCD[i].length; j++)
          for (var k = 0; k < this.$store.state.turma.Turmas.length; k++) {
            if (
              this.ativos.CCD[i][j].id == this.$store.state.turma.Turmas[k].id
            ) {
              this.ativos.CCD[i].splice(
                j,
                1,
                this.$store.state.turma.Turmas[k]
              );
            }
          }
        for (var j = 0; j < this.ativos.CCN[i].length; j++)
          for (var k = 0; k < this.$store.state.turma.Turmas.length; k++) {
            if (
              this.ativos.CCN[i][j].id == this.$store.state.turma.Turmas[k].id
            ) {
              this.ativos.CCN[i].splice(
                j,
                1,
                this.$store.state.turma.Turmas[k]
              );
            }
          }
        for (var j = 0; j < this.ativos.EC[i].length; j++)
          for (var k = 0; k < this.$store.state.turma.Turmas.length; k++) {
            if (
              this.ativos.EC[i][j].id == this.$store.state.turma.Turmas[k].id
            ) {
              this.ativos.EC[i].splice(j, 1, this.$store.state.turma.Turmas[k]);
            }
          }
        for (var j = 0; j < this.ativos.SI[i].length; j++)
          for (var k = 0; k < this.$store.state.turma.Turmas.length; k++) {
            if (
              this.ativos.SI[i][j].id == this.$store.state.turma.Turmas[k].id
            ) {
              this.ativos.SI[i].splice(j, 1, this.$store.state.turma.Turmas[k]);
            }
          }
      }

      this.$store.commit("redefinirAtivas", { Ativas: this.ativos });
    }
  },

  computed: {
    Grades() {
      return this.$store.state.grade.Grades;
    },

    Cursos() {
      return this.$store.state.curso.Cursos;
    },

    Turmas() {
      return this.$store.state.turma.Turmas;
    },

    Disciplinas() {
      return this.$store.state.disciplina.Disciplinas;
    },

    DisciplinaGrades() {
      return this.$store.state.disciplinaGrade.DisciplinaGrades;
    },

    GradesCCD() {
      return _.filter(this.$store.state.grade.Grades, ["Curso", 1]);
    },

    GradesCCN() {
      return _.filter(this.$store.state.grade.Grades, ["Curso", 2]);
    },
    GradesSI() {
      return _.filter(this.$store.state.grade.Grades, ["Curso", 3]);
    },

    GradesEC() {
      return _.filter(this.$store.state.grade.Grades, ["Curso", 4]);
    }
  },

  watch: {
    Turmas(newTurmas, oldTurmas) {
      this.updateHorarios();
    }
  }
};
</script>

<style scoped>
/* prefixed by https://autoprefixer.github.io (PostCSS: v7.0.23, autoprefixer: v9.7.3) */

.DashboardHorariosResumo {
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
.periodo {
  display: inline;
  width: 72px;
  height: 24px;
  position: relative;
}

.horario {
  float: left;
}

.title {
  clear: both;
  display: block;
  padding-top: 0px;
  text-align: start !important;
}


.tg {
  border-collapse: collapse;
  border-spacing: 0;
  border-color: #ccc;
  margin-bottom: 20px;
  margin-right: 20px;
}
.tg td {
  font-family: Arial, sans-serif;
  font-size: 11px;
  padding: 0px;
  border-style: solid;
  border-width: 1px;
  overflow: hidden;
  word-break: break-word;
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
  text-align: center;
  height: 22px;
  width: 49px !important;
}

h3 {
  font-weight: bold;
  font-size: 20px;
  text-align: center !important;
}
h4 {
  font-size: 12px !important;
  font-weight: bold !important;
}
h5 {
  font-size: 12px;
  font-weight: normal;
}
.horario {
  margin-left: auto;
  margin-right: auto;
}
@media screen and (min-width: 576px) {
  .title {
    text-align: start !important;
    
  }
}
@media screen and (max-width: 575px) {
  .title {
    text-align: center !important;
  }
}
</style>