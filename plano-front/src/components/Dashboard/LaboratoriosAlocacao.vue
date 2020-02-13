<template>
  <div class="DashboardLaboratoriosAlocacao row pr-2">
    <!-- Titulo -->

    <div
      class="col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0"
      style="height:38px;"
    >
      <div class="form-inline col-12 pl-0 mb-1 pr-1">
        <h1 class="col-xl-3 col-md-4 col-sm-5 col-7 px-0 pr-1 titulo">Laboratórios - Alocação</h1>

        <div
          class="form-group col-xl-9 col-md-8 col-sm-7 col-5 mb-0 p-0"
          style="justify-content: flex-end!important;"
        >
          <b-button v-b-modal.modalLaboratorios title="Laboratórios" class="cancelbtn">
            <i class="fas fa-list-ul"></i>
          </b-button>

          <button type="button" class="relatbtn" title="Relatório" v-on:click.prevent="pdf">
            <i class="far fa-file-alt"></i>
          </button>

          <b-button v-b-modal.modalAjuda title="Ajuda" class="relatbtn mt-1">
            <i class="fas fa-question"></i>
          </b-button>
        </div>
      </div>
    </div>
    <div class="w-100 mb-2 border-bottom"></div>

    <!-- <div class="col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0">
        <div class="form-inline col-12 col-sm-6 col-md-5 col-xl-3 pl-0 mb-2 pr-1">
          <h1 class="col-9 titulo">Laboratórios - Alocação</h1>
        </div>
          <div class="col-3 p-0">
            <b-button v-b-modal.modalLaboratorios title="Laboratorios" class="cancelbtn">
              <i class="fas fa-list-ul"></i>
            </b-button>
            <b-button v-b-modal.modalAjuda title="Ajuda" class="relatbtn">
              <i class="fas fa-question"></i>
            </b-button>
            <button type="button" class="relatbtn" title="Relatório" v-on:click.prevent="pdf">
              <i class="far fa-file-alt"></i>
            </button>
          </div>
        </div>
    <div class="w-100 mb-2 border-bottom"></div>-->

    <div class="col-12">
      <h6>1º SEMESTRE</h6>
      <div class="flex-container">
        <div class="tablab" v-for="lab in LaboratoriosAtivados" :key="'2-lab-id'+lab.id">
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
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 1)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 7)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 13)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 19)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 25)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
              </tr>

              <tr>
                <td class="tg-0lax tg-hor">10-12</td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 2)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 8)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 14)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 20)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 26)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
              </tr>

              <tr>
                <td class="tg-0lax tg-hor">14-16</td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 3)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 9)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 15)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 21)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 27)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
              </tr>

              <tr>
                <td class="tg-0lax tg-hor">16-18</td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 4)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 10)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 16)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 22)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 28)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
              </tr>

              <tr>
                <td class="tg-0lax tg-hor">17-19</td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 32)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 34)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 36)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 38)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 40)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
              </tr>

              <tr>
                <td class="tg-0lax tg-hor">18-20</td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 33)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 35)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 37)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 39)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 41)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
              </tr>

              <tr>
                <td class="tg-0lax tg-hor">19-21</td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 5)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 11)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 17)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 23)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 29)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
              </tr>

              <tr>
                <td class="tg-0lax tg-hor">21-23</td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 6)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 12)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 18)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 24)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas1"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 30)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <h6>2º SEMESTRE</h6>

      <div class="flex-container">
        <div class="tablab" :key="'2-lab-id'+lab.id" v-for="lab in LaboratoriosAtivados">
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
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 1)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 7)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 13)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 19)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 25)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
              </tr>

              <tr>
                <td class="tg-0lax tg-hor">10-12</td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 2)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 8)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 14)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 20)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 26)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
              </tr>

              <tr>
                <td class="tg-0lax tg-hor">14-16</td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 3)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 9)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 15)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 21)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 27)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
              </tr>

              <tr>
                <td class="tg-0lax tg-hor">16-18</td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 4)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 10)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 16)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 22)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 28)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
              </tr>

              <tr>
                <td class="tg-0lax tg-hor">17-19</td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 32)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 34)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 36)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 38)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 40)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
              </tr>

              <tr>
                <td class="tg-0lax tg-hor">18-20</td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 33)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 35)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 37)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 39)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 41)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
              </tr>

              <tr>
                <td class="tg-0lax tg-hor">19-21</td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 5)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 11)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 17)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 23)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 29)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
              </tr>

              <tr>
                <td class="tg-0lax tg-hor">21-23</td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 6)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 12)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 18)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 24)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
                <td class="tg-0lax">
                  <template
                    v-for="turma in Turmas2"
                    v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 30)"
                  >
                    <template
                      v-for="disciplina in Disciplinas"
                      v-if="turma.Disciplina === disciplina.id"
                    >{{disciplina.codigo}} {{turma.letra}}</template>
                  </template>
                </td>
              </tr>
            </table>
            <br />
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL DE AJUDA -->
    <b-modal id="modalAjuda" ref="ajudaModal" scrollable title="Ajuda">
      <div class="modal-body">
        <ul class="listas list-group">
          <li class="list-group-item">
            <strong>Para exibir conteúdo na tela: </strong> Clique em Laboratórios e selecione o(s) laboratório(s) que deseja 
            ver, em seguida confirme em OK. Caso queira ver todos basta clicar em Selecionar Todos.
          </li>
          <li class="list-group-item">
              <strong>Para gerar relatório:</strong> Clique no botão Relatório e aguarde para fazer <font style='font-style:italic;'>download</font> do mesmo.
          </li>
        </ul>
      </div>

      <div slot="modal-footer" style="display: none"></div>
    </b-modal>
    <!-- Modals do botão para escolher disciplinas -->
    <b-modal
      id="modalLaboratorios"
      ref="LaboratoriosModal"
      scrollable
      title="Selecione os laboratórios"
    >
      <div
        class="form-group col m-0 p-0 border"
        style="height: 395px; width:max-content; border-color: rgba(0,0,0,0.125);"
      >
        <table class="table table-sm modal-table" style="max-height: 392px !important;">
          <tr>
            <div style="width: max-content; font-size: 11px!important">
              <th class="border-0 p-0">
                <p style="width:25px !important" class="p-header"></p>
              </th>
              <th class="border-0">
                <p class="p-header" style="width: 424px; text-align:start">Nome</p>
              </th>
            </div>
          </tr>
          <tbody>
            <tr v-for="laboratorio in Laboratorios" :key="`laboratorio${laboratorio.id}`">
              <div style="width: max-content">
                <td style="padding:0;broder:0;margin:0!important;">
                  <div style="width:25px;">
                    <input
                      type="checkbox"
                      v-model="LaboratoriosSelecionados"
                      :value="laboratorio"
                      class="form-check-input position-static m-0"
                    />
                  </div>
                </td>
                <td>
                  <p style="width:424px; text-align:start">{{laboratorio.nome}}</p>
                </td>
              </div>
            </tr>
          </tbody>
        </table>
      </div>

      <div slot="modal-footer" style="display: flex; margin-right: 10px !important;">
        <b-button
          class="btn-azul btn-df mr-2"
          variant="success"
          @click="selectAll()"
        >Selecionar Todos</b-button>
        <b-button
          class="btn-cinza btn-df mr-2"
          variant="secondary"
          @click="selectNone()"
        >Desmarcar Todos</b-button>
        <b-button
          variant="success"
          @click="btnOK()"
          class="btn-verde btn-df mr-2"
          style="padding-right:15px!important; padding-left:15px!important;"
        >OK</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import _ from "lodash";
import pdfs from "../../common/services/pdfs";
export default {
  name: "DashboardLaboratoriosAlocacao",
  data() {
    return {
      value: 0,
      LaboratoriosSelecionados: [],
      LaboratoriosAtivados: []
    };
  },
  methods: {
    btnOK() {
      //Somente atualiza o vetor de perfis ativados quando o botão OK for clickado
      this.LaboratoriosAtivados = [
        ..._.orderBy(this.LaboratoriosSelecionados, "id")
      ];
      this.$refs.LaboratoriosModal.hide();
    },

    selectAll() {
      let labs = _.filter(this.$store.state.sala.Salas, ["laboratorio", true]);
      if (this.LaboratoriosSelecionados != [])
        this.LaboratoriosSelecionados = [];
      for (var i = 0; i < labs.length; i++)
        this.LaboratoriosSelecionados.push(labs[i]);
    },

    selectNone() {
      this.LaboratoriosSelecionados = [];
    },

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

.listas {
  line-height: 30px;
  font-size: 12px;
  text-align: justify;
  line-height: inherit;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.15);
}
strong {
  color: #007bff;
}

i.fas,
i.far {
  font-size: 25px;
}

.relatbtn {
  background-color: white;
  color: #9ab3ff !important;
}

.relatbtn:hover {
  background-color: white;
  color: #82a0ff !important;
}

.relatbtn:focus {
  color: #82a0ff;
  background-color: white;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #698dff;
}

button {
  padding: 0;
  border: none;
  background: none;
  height: -webkit-max-content;
  height: -moz-max-content;
  height: max-content;
  margin-right: 15px;
  margin-top: 5px;
  margin-bottom: 0px;
  transition: all 0.3s ease 0s;
  cursor: pointer;
}

h5 {
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  margin-top: 15px;
}
@media screen and (min-width: 1378px) {
  table {
    margin-left: auto;
    margin-right: auto;
  }
}
h6 {
  font-weight: bold;
  font-size: 20px;
  text-align: center;
}
td.tg-0lax {
  width: 66px !important;
}

td {
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

.tablab {
  flex-basis: 30%;
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
.btn-df {
  font-size: 12px;
  height: 25px;
  min-width: -webkit-max-content;
  min-width: -moz-max-content;
  min-width: max-content;
  max-width: -webkit-max-content;
  max-width: -moz-max-content;
  max-width: max-content;
  padding: 0 5px 0 5px;
}

.btn-azul {
  background-color: #718de0 !important;
  border-color: #9ab3ff !important;
}
.btn-azul:hover {
  background-color: rgb(74, 101, 190) !important;
  border-color: #82a0ff !important;
}

.btn-azul:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(122, 128, 124, 0.5) !important;
  -moz-box-shadow: 0 0 0 0.2rem rgba(108, 166, 127, 0.5) !important;
  box-shadow: 0 0 0 0.2rem rgba(108, 166, 127, 0.5) !important;
}

.btn-cinza {
  background-color: #999999 !important;
  border-color: #c3c3c3 !important;
}
.btn-cinza:hover {
  background-color: #747474 !important;
  border-color: #aaaaaa !important;
}

.btn-cinza:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(116, 124, 119, 0.74) !important;
  -moz-box-shadow: 0 0 0 0.2rem rgba(116, 124, 119, 0.74) !important;
  box-shadow: 0 0 0 0.2rem rgba(116, 124, 119, 0.74) !important;
}
.btn-verde {
  background-color: #70b670 !important;
  border-color: #a0e7a0 !important;
}
.btn-verde:hover {
  background-color: #4c8a4c !important;
  border-color: #77dd77 !important;
}

.btn-verde:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(108, 166, 127, 0.5) !important;
  -moz-box-shadow: 0 0 0 0.2rem rgba(108, 166, 127, 0.5) !important;
  box-shadow: 0 0 0 0.2rem rgba(108, 166, 127, 0.5) !important;
}

i.fas,
i.far {
  font-size: 25px;
}

.cancelbtn {
  background-color: white;
  color: #cfcfc4;
}
.cancelbtn:hover {
  background-color: white;
  color: #b8b4a8;
}

.cancelbtn:focus {
  background-color: white;
  color: #b8b8a8;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #ada89a;
}
</style>