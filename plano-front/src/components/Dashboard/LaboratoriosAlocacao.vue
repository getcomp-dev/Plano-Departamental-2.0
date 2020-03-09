<template>
  <div class="DashboardLaboratoriosAlocacao row pr-2">
    <!-- Titulo -->
    <div
      class="div-titulo col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0"
      style="height:38px;"
    >
      <div class="form-inline col-12 pl-0 mb-1 pr-1">
        <h1
          class="titulo col-xl-3 col-lg-4 col-md-5 col-sm-6 col-5 px-0 pr-1"
        >Horários - Laborátorios</h1>
        <div
          class="form-group col-xl-9 col-lg-8 col-md-7 col-sm-6 col-7 mb-0 p-0"
          style="justify-content: flex-end!important;"
        >
          <div class="input-group mr-3 ml-auto my-0 p-0">
            <select class="form-control form-control-sm" v-model="periodo">
              <option value="1">Primeiro</option>
              <option value="2">Segundo</option>
              <option value="3">Ambos</option>
            </select>
            <div class="input-group-append">
              <label class="input-group-text">Semestre</label>
            </div>
          </div>
          <div class="d-flex p-0 m-0">
            <b-button v-b-modal.modalLaboratorios title="Laboratórios" class="cancelbtn">
              <i class="fas fa-list-ul" style="padding-left: 6.5px"></i>
            </b-button>

            <button type="button" class="relatbtn" title="Relatório" v-on:click.prevent="pdf">
              <i class="far fa-file-alt"></i>
            </button>

            <b-button v-b-modal.modalAjuda title="Ajuda" class="relatbtn">
              <i class="fas fa-question"></i>
            </b-button>
          </div>
        </div>
      </div>
    </div>
    <div class="w-100 mb-2 border-bottom"></div>

    <div class="col-12 p-0 w-100">
      <template v-if="LaboratoriosAtivados.length != 0 && (periodo == 1 || periodo == 3)">
        <h3 class="title px-2" style="background-color: rgba(0, 0, 0, 0.089);">1º SEMESTRE</h3>
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 1, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 7, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 13, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 19, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 25, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 2, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 8, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 14, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 20, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 26, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 3, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 9, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 15, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 21, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 27, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 4, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 10, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 16, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 22, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 28, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 32, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 34, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 36, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 38, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 40, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 33, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 35, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 37, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 39, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 41, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 5, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 11, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 17, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 23, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 29, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 6, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 12, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 18, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 24, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 30, lab.id)"
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
      </template>
      <template v-if="LaboratoriosAtivados.length != 0 && (periodo == 2 || periodo == 3)">
        <h3 class="title px-2" style="background-color: rgba(0, 0, 0, 0.089);">2º SEMESTRE</h3>
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 1, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 7, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 13, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 19, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 25, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 2, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 8, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 14, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 20, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 26, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 3, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 9, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 15, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 21, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 27, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 4, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 10, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 16, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 22, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 28, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 32, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 34, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 36, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 38, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 40, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 33, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 35, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 37, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 39, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 41, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 5, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 11, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 17, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 23, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 29, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 6, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 12, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 18, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 24, lab.id)"
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
                      v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 30, lab.id)"
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
      </template>
    </div>

    <!-- MODAL DE AJUDA -->
    <b-modal id="modalAjuda" ref="ajudaModal" scrollable title="Ajuda">
      <div class="modal-body">
        <ul class="listas list-group">
          <li class="list-group-item">
            <strong>Para exibir conteúdo na tela:</strong> Clique em Laboratórios
            <i class="fas fa-list-ul cancelbtn px-1" style="font-size: 12px"></i>
            e selecione o(s) laboratório(s) que deseja
            ver, em seguida confirme em OK. Caso queira ver todos basta clicar em Selecionar Todos.
          </li>
          <li class="list-group-item">
            <strong>Para gerar relatório:</strong> Clique no botão Relatório
            <i
              class="far fa-file-alt relatbtn px-1"
              style="font-size: 12px"
            ></i>
            e aguarde para fazer
            <font style="font-style:italic;">download</font> do mesmo.
          </li>
        </ul>
      </div>
      <div slot="modal-footer" style="display: none"></div>
    </b-modal>

    <!-- Modals do botão para escolher laboratorio -->
    <b-modal
      id="modalLaboratorios"
      ref="LaboratoriosModal"
      scrollable
      title="Selecione os laboratórios"
      :size="'sm'"
    >
      <div
        class="form-group col m-0 p-0 border"
        style="width:100%; border-color: rgba(0,0,0,0.125);"
      >
        <table class="table table-sm modal-table" style="max-height: 392px !important;">
          <tr>
            <div style="width: max-content; font-size: 11px!important">
              <th class="border-0 p-0">
                <p style="width:25px !important" class="p-header"></p>
              </th>
              <th class="border-0">
                <p class="p-header" style="width: 230px; text-align:start">Nome</p>
              </th>
            </div>
          </tr>
          <tbody>
            <tr v-for="laboratorio in Laboratorios" :key="`laboratorio${laboratorio.id}`">
              <div style="width: max-content">
                <td style="padding:0;margin:0 auto !important;">
                  <div style="width:25px; height: 100%; margin:0 auto">
                    <input
                      type="checkbox"
                      v-model="LaboratoriosSelecionados"
                      :value="laboratorio"
                      class="form-check-input position-static m-0"
                    />
                  </div>
                </td>
                <td>
                  <p class="center-row" style="width:230px; text-align:start">{{laboratorio.nome}}</p>
                </td>
              </div>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- MODAL AJUDA -->
      <div slot="modal-footer" class="w-100 m-0" style="display: flex;">
        <div class="w-100 m-0 d-flex">
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
        </div>
        <b-button
          variant="success"
          @click="btnOK()"
          class="btn-verde btn-df mr-0"
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
      periodo: 3,
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

      return result;
    },

    checkTurmaHorario(turma, horario, lab) {
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
            if (turma.Sala1 === lab){
                if (turma.Horario1 == horario) return true;
            }else if(turma.Sala2 === lab){
                if (turma.Horario2 == horario) return true;
            }
            return false
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
      return _.concat(_.filter(this.$store.state.turma.Turmas, ["periodo", 1]), _.filter(this.$store.state.turmaExterna.Turmas, ["periodo", 1]));
    },

    Turmas2() {
      return _.concat(_.filter(this.$store.state.turma.Turmas, ["periodo", 3]), _.filter(this.$store.state.turmaExterna.Turmas, ["periodo", 3]))
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
.title {
  clear: both;
  display: block;
  padding-top: 0px;
  text-align: start !important;
  font-weight: bold;
  font-size: 18px;
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

.table {
  margin: 0px;
}

p {
  margin: 0px;
}

.center-row {
  font-size: 10px;
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
/* ====== BOTÕES ====== */
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

/* Formularios no topo da tela */
.input-group-text {
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: flex;
  -ms-flex-align: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  align-items: center;
  -ms-flex-pack: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -moz-box-pack: center;
  justify-content: center;
  margin-bottom: 0;
  /*===*/
  max-width: 70px;
  min-width: 70px;
  height: 25px !important;
  margin-left: -5px;
  padding-left: 15px;
  font-size: 12px !important;
}
.form-inline .input-group,
.form-inline {
  width: auto;
}
.form-group {
  display: -ms-flexbox;
  display: flex;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 0;
}
.form-control {
  height: 25px !important;
  font-size: 12px !important;
  padding: 0px 0px 0px 5px !important;
  min-width: 80px !important;
  max-width: 80px !important;
  text-align: start !important;
}
/* =========================== */
@media screen and (max-width: 575px) {
  .div-titulo {
    height: 70px !important;
  }
}
</style>