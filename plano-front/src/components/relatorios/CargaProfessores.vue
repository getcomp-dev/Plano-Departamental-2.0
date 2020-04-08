<template>
  <div class="DashboardCargaProfessores row pr-2">
    <!-- Titulo -->
    <div
      class="div-titulo col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0"
      style="height: 38px;"
    >
      <div class="form-inline col-12 pl-0 mb-1 pr-1">
        <h1 class="titulo col-8 col-sm-5 col-md-4 col-lg-3 col-xl-3">
          Carga Professores
        </h1>

        <div
          class="form-group col-4 col-sm-7 col-md-8 col-lg-9 col-xl-9 mb-0 pr-0"
          style="justify-content: flex-end;"
        >
          <div class="d-flex">
            <b-button v-b-modal.modalFiltros title="Filtros" class="cancelbtn">
              <i class="fas fa-list-ul"></i>
            </b-button>

            <button
              type="button"
              class="relatbtn"
              title="Relatório"
              v-on:click.prevent="pdf"
            >
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

    <div class="divTable p-0" ref="carga">
      <table class="main-table table table-bordered table-hover table-sm">
        <thead class="thead-light sticky">
          <tr>
            <div style="font-size: 11px !important;" class="max-content">
              <th scope="col">
                <p
                  class="p-header clickable"
                  style="width: 130px; text-align: start !important;"
                  @click="toggleOrdProf_Main"
                >
                  Nome
                  <i
                    style="font-size: 0.6rem;"
                    :class="
                      ordemProf_Main.type == 'asc'
                        ? 'fas fa-arrow-down fa-sm'
                        : 'fas fa-arrow-up fa-sm'
                    "
                  ></i>
                </p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 24px;">S.</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 80px;">Cod</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 300px;">Disciplina</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 24px;">T.</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 180px;">Horário</p>
              </th>
              <th scope="col" id="creditos1">
                <p class="p-header" style="width: 32px;">CS1</p>
                <b-popover
                  :target="'creditos1'"
                  placement="bottom"
                  triggers="hover focus"
                >
                  <p>Somatório dos créditos no 1º semestre</p>
                </b-popover>
              </th>
              <th scope="col" id="creditos2">
                <p class="p-header" style="width: 32px;">CS2</p>
                <b-popover
                  :target="'creditos2'"
                  placement="bottom"
                  triggers="hover focus"
                >
                  <p>Somatório dos créditos no 2º semestre</p>
                </b-popover>
              </th>
              <th scope="col" id="creditostotal">
                <p class="p-header" style="width: 42px;">CTotal</p>
                <b-popover
                  :target="'creditostotal'"
                  placement="bottom"
                  triggers="hover focus"
                >
                  <p>Somatório total dos créditos</p>
                </b-popover>
              </th>
            </div>
          </tr>
        </thead>
        <tbody>
          <template v-if="Docentes.length > 0">
            <template v-for="professor in Docentes_Ativados_filtred">
              <template v-if="turmas(professor).length > 0">
                <div class="max-content" :key="professor.apelido">
                  <td class="prof-td">
                    <p style="width: 130px; text-align: start !important;">
                      {{ professor.apelido }}
                    </p>
                  </td>
                  <td class="prof-td">
                    <p style="width: 24px;"></p>
                  </td>
                  <td class="prof-td">
                    <p style="width: 80px;"></p>
                  </td>
                  <td class="prof-td">
                    <p style="width: 300px; height: 20px;"></p>
                  </td>
                  <td class="prof-td">
                    <p style="width: 24px;"></p>
                  </td>
                  <td class="prof-td">
                    <p style="width: 180px;"></p>
                  </td>
                  <td class="prof-td">
                    <p style="width: 32px;">{{ creditos1(professor) }}</p>
                  </td>
                  <td class="prof-td">
                    <p style="width: 32px;">{{ creditos2(professor) }}</p>
                  </td>
                  <td class="prof-td">
                    <p style="width: 42px;">{{ creditos(professor) }}</p>
                  </td>
                </div>
              </template>

              <template v-for="turma in turmas(professor)">
                <tr
                  v-for="disciplina in Disciplinas"
                  :key="
                    'turma' +
                      turma.id +
                      'disciplina' +
                      disciplina.id +
                      'professor' +
                      professor.id
                  "
                >
                  <template
                    v-if="
                      turma.Disciplina === disciplina.id &&
                        (turma.Docente1 === professor.id ||
                          turma.Docente2 === professor.id)
                    "
                  >
                    <div class="max-content">
                      <td>
                        <p style="width: 130px;"></p>
                      </td>
                      <td>
                        <p style="width: 24px;">{{ turma.periodo }}</p>
                      </td>
                      <td>
                        <p style="width: 80px;">{{ disciplina.codigo }}</p>
                      </td>
                      <td>
                        <p style="width: 300px;">{{ disciplina.nome }}</p>
                      </td>
                      <td>
                        <p style="width: 24px;">{{ turma.letra }}</p>
                      </td>
                      <td>
                        <div style="width: 180px;">
                          <template v-for="horario in Horarios">
                            <p
                              :key="horario.id"
                              v-if="horario.id === turma.Horario1"
                            >
                              {{ horario.horario }}
                              <template v-for="horario in Horarios">
                                <span
                                  :key="horario.id"
                                  v-if="horario.id === turma.Horario2"
                                  >/ {{ horario.horario }}</span
                                >
                              </template>
                            </p>
                          </template>
                        </div>
                      </td>

                      <td v-if="turma.periodo === 1">
                        <div style="width: 32px;">
                          <p v-if="turma.Docente1 > 0 && turma.Docente2 > 0">
                            {{
                              (disciplina.cargaTeorica +
                                disciplina.cargaPratica) /
                                2
                            }}
                          </p>

                          <p v-else>
                            {{
                              disciplina.cargaTeorica + disciplina.cargaPratica
                            }}
                          </p>
                        </div>
                      </td>

                      <td v-else>
                        <p style="width: 32px;"></p>
                      </td>

                      <td v-if="turma.periodo === 3">
                        <div style="width: 32px;">
                          <p v-if="turma.Docente1 > 0 && turma.Docente2 > 0">
                            {{
                              (disciplina.cargaTeorica +
                                disciplina.cargaPratica) /
                                2
                            }}
                          </p>
                          <p v-else>
                            {{
                              disciplina.cargaTeorica + disciplina.cargaPratica
                            }}
                          </p>
                        </div>
                      </td>
                      <td v-else>
                        <p style="width: 32px;"></p>
                      </td>

                      <td>
                        <p style="width: 42px;"></p>
                      </td>
                    </div>
                  </template>
                </tr>
              </template>

              <template v-for="carga in CargasPos">
                <template v-if="carga.Docente === professor.id">
                  <tr :key="'cargaPos' + carga.id + 'professor' + professor.id">
                    <div class="max-content">
                      <td>
                        <p style="width: 130px;"></p>
                      </td>
                      <td>
                        <p style="width: 24px;">{{ carga.trimestre }}</p>
                      </td>
                      <td>
                        <p style="width: 80px;"></p>
                      </td>
                      <td>
                        <p style="width: 300px;" class="toUpperCase">
                          Disciplina do {{ carga.programa }}
                        </p>
                      </td>
                      <td>
                        <p style="width: 24px;"></p>
                      </td>
                      <td>
                        <p style="width: 180px;"></p>
                      </td>

                      <td v-if="carga.trimestre == 1 || carga.trimestre == 2">
                        <p style="width: 32px;">{{ carga.creditos }}</p>
                      </td>
                      <td v-else>
                        <p style="width: 32px;"></p>
                      </td>

                      <td v-if="carga.trimestre == 3 || carga.trimestre == 4">
                        <p style="width: 32px;">{{ carga.creditos }}</p>
                      </td>
                      <td v-else>
                        <p style="width: 32px;"></p>
                      </td>

                      <td><p style="width: 42px;"></p></td>
                    </div>
                  </tr>
                </template>
              </template>
            </template>
            <template v-if="turmasSemAlocacao().length > 0 && SemAlocacao">
              <template v-if="turmasSemAlocacao().length > 0">
                <div style="width: ‭845‬px;" :key="'semAlocacao'">
                  <td class="prof-td">
                    <div style="width: 130px;">SEM ALOCAÇÃO</div>
                  </td>
                  <td class="prof-td">
                    <div style="width: 24px;"></div>
                  </td>
                  <td class="prof-td">
                    <div style="width: 80px;"></div>
                  </td>
                  <td class="prof-td">
                    <div style="width: 300px; height: 20px;"></div>
                  </td>
                  <td class="prof-td">
                    <div style="width: 24px;"></div>
                  </td>
                  <td class="prof-td">
                    <div style="width: 180px;"></div>
                  </td>
                  <td class="prof-td">
                    <div style="width: 32px;"></div>
                  </td>
                  <td class="prof-td">
                    <div style="width: 32px;"></div>
                  </td>
                  <td class="prof-td">
                    <div style="width: 42px;"></div>
                  </td>
                </div>
              </template>
              <template v-for="turma in turmasSemAlocacao()">
                <tr
                  v-for="disciplina in Disciplinas"
                  :key="
                    'turma' +
                      turma.id +
                      'disciplina' +
                      disciplina.id +
                      'semAlocacao'
                  "
                >
                  <template
                    v-if="
                      turma.Disciplina === disciplina.id &&
                        turma.Docente1 == null &&
                        turma.Docente2 == null
                    "
                  >
                    <div class="max-content">
                      <td>
                        <p style="width: 130px;"></p>
                      </td>
                      <td>
                        <p style="width: 24px;">{{ turma.periodo }}</p>
                      </td>
                      <td>
                        <p style="width: 80px;">{{ disciplina.codigo }}</p>
                      </td>
                      <td>
                        <p style="width: 300px;">{{ disciplina.nome }}</p>
                      </td>
                      <td>
                        <p style="width: 24px;">{{ turma.letra }}</p>
                      </td>
                      <td>
                        <div style="width: 180px;">
                          <template v-for="horario in Horarios">
                            <p
                              :key="horario.id"
                              v-if="horario.id === turma.Horario1"
                            >
                              {{ horario.horario }}
                              <template v-for="horario in Horarios">
                                <span
                                  :key="horario.id"
                                  v-if="horario.id === turma.Horario2"
                                  >/ {{ horario.horario }}</span
                                >
                              </template>
                            </p>
                          </template>
                        </div>
                      </td>

                      <td v-if="turma.periodo === 1">
                        <div style="width: 32px;">
                          <p v-if="turma.Docente1 > 0 && turma.Docente2 > 0">
                            {{
                              (disciplina.cargaTeorica +
                                disciplina.cargaPratica) /
                                2
                            }}
                          </p>

                          <p v-else>
                            {{
                              disciplina.cargaTeorica + disciplina.cargaPratica
                            }}
                          </p>
                        </div>
                      </td>

                      <td v-else>
                        <div style="width: 32px;"></div>
                      </td>

                      <td v-if="turma.periodo === 3">
                        <div style="width: 32px;">
                          <p v-if="turma.Docente1 > 0 && turma.Docente2 > 0">
                            {{
                              (disciplina.cargaTeorica +
                                disciplina.cargaPratica) /
                                2
                            }}
                          </p>
                          <p v-else>
                            {{
                              disciplina.cargaTeorica + disciplina.cargaPratica
                            }}
                          </p>
                        </div>
                      </td>
                      <td v-else>
                        <div style="width: 32px;"></div>
                      </td>

                      <td>
                        <div style="width: 42px;"></div>
                      </td>
                    </div>
                  </template>
                </tr>
              </template>
            </template>
          </template>
          <template v-else>
            <tr>
              <td colspan="2" class="text-center">
                <i class="fas fa-exclamation-triangle"></i> Nenhum curso
                encontrado!
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <b-modal id="modalAjuda" ref="ajudaModal" scrollable title="Ajuda">
      <div class="modal-body">
        <ul class="listas list-group">
          <li class="list-group-item">
            <strong>Para exibir conteúdo na Tabela:</strong> Clique em Docentes
            <i
              class="fas fa-list-ul cancelbtn px-1"
              style="font-size: 12px;"
            ></i>
            e selecione o(s) professor(es) que deseja ver, em seguida confirme
            em OK. Caso queira ver todos basta clicar em Selecionar Todos.
          </li>
          <li class="list-group-item">
            <strong>Para gerar relatório:</strong> Clique no botão Relatório
            <i
              class="far fa-file-alt relatbtn px-1"
              style="font-size: 12px;"
            ></i>
            e aguarde para fazer
            <font style="font-style: italic;">download</font> do mesmo.
          </li>
        </ul>
      </div>

      <div slot="modal-footer" style="display: none;"></div>
    </b-modal>

    <!-- Modals do botão para escolher docentes -->
    <b-modal
      id="modalFiltros"
      ref="modalFiltros"
      scrollable
      size="md"
      title="Filtros"
    >
      <div class="p-0 m-0" style="height: 30px; width: 465px;">
        <ul
          class="nav nav-tabs card-header-tabs m-0"
          style="font-size: 11px !important; height: 30px;"
        >
          <li class="nav-item">
            <a class="nav-link active border clickable">Perfis</a>
          </li>
        </ul>
      </div>

      <div class="col m-0 p-0 max-content" style="height: 450px !important;">
        <!-- TABLE PROFS -->
        <table
          class="table table-sm modal-table table-bordered"
          style="max-height: 450px !important;"
        >
          <thead class="thead-light sticky">
            <tr>
              <div style="font-size: 11px !important;" class="max-content">
                <th>
                  <div
                    class="m-0 input-group"
                    style="
                      width: 462px;
                      height: 35px;
                      padding-left: 4px;
                      padding-right: 20px;
                      padding-top: 4px;
                    "
                  >
                    <input
                      type="text"
                      class="form-control"
                      style="border-right: none;"
                      placeholder="Pesquise o nome de um docente..."
                      v-model="searchProf"
                    />
                    <div class="input-group-append" @click="searchProf = null">
                      <span
                        class="input-group-text"
                        style="height: 25px; font-size: 18px; cursor: pointer;"
                        >&times;</span
                      >
                    </div>
                  </div>
                </th>
              </div>
            </tr>

            <tr>
              <div style="font-size: 11px !important;" class="max-content">
                <th>
                  <p style="width: 25px;" class="p-header"></p>
                </th>
                <th>
                  <p
                    class="p-header clickable"
                    style="width: 436px; text-align: start;"
                    @click="toggleOrdProf_Modal()"
                  >
                    Nome
                    <i
                      style="font-size: 0.6rem;"
                      :class="
                        ordemProf_Modal.type == 'asc'
                          ? 'fas fa-arrow-down fa-sm'
                          : 'fas fa-arrow-up fa-sm'
                      "
                    ></i>
                  </p>
                </th>
              </div>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="docente in Docentes_Filtred"
              :key="`docente${docente.id}`"
            >
              <div class="max-content">
                <td>
                  <div style="width: 25px; height: inherit;" class="px-1">
                    <input
                      type="checkbox"
                      v-model="DocentesSelecionados"
                      :value="docente"
                      class="form-check-input position-static m-0"
                    />
                  </div>
                </td>
                <td>
                  <p style="width: 436px; text-align: start;">
                    {{ docente.apelido }}
                  </p>
                </td>
              </div>
            </tr>

            <tr>
              <div style="width: max-content;">
                <td>
                  <div style="width: 25px; height: inherit;" class="px-1">
                    <input
                      type="checkbox"
                      v-model="SemAlocacaoCheck"
                      class="form-check-input position-static m-0"
                    />
                  </div>
                </td>
                <td>
                  <p style="width: 436px; text-align: start;">SEM ALOCAÇÃO</p>
                </td>
              </div>
            </tr>
          </tbody>
        </table>
      </div>

      <div slot="modal-footer" class="w-100 m-0" style="display: flex;">
        <div class="w-100">
          <b-button
            class="btn-azul btn-df mr-2"
            variant="success"
            @click="selectAll()"
            >Selecionar Todos</b-button
          >
          <b-button
            class="btn-cinza btn-df mr-2"
            variant="secondary"
            @click="selectNone()"
            >Desmarcar Todos</b-button
          >
        </div>
        <b-button
          variant="success"
          @click="btnOK()"
          class="btn-verde btn-df mr-2"
          style="padding-right: 15px !important; padding-left: 15px !important;"
          >OK</b-button
        >
      </div>
    </b-modal>
  </div>
</template>

<script>
import _ from "lodash";
import jsPDF from "jspdf";
import pdfs from "@/common/services/pdfs";
import html2canvas from "html2canvas";
export default {
  name: "DashboardCargaProfessores",

  data() {
    return {
      DocentesSelecionados: [],
      DocentesAtivados: [],
      SemAlocacao: false,
      SemAlocacaoCheck: false,
      searchProf: null,
      ordemProf_Modal: { order: "apelido", type: "asc" },
      ordemProf_Main: { order: "apelido", type: "asc" },
    };
  },

  methods: {
    pdf() {
      pdfs.pdfCargaProfessores();
    },
    toggleOrdProf_Modal() {
      if (this.ordemProf_Modal.type == "asc") {
        this.ordemProf_Modal.type = "desc";
      } else {
        this.ordemProf_Modal.type = "asc";
      }
    },
    toggleOrdProf_Main() {
      if (this.ordemProf_Main.type == "asc") {
        this.ordemProf_Main.type = "desc";
      } else {
        this.ordemProf_Main.type = "asc";
      }
    },
    btnOK() {
      //Somente atualiza o vetor de perfis ativados quando o botão OK for clickado
      this.DocentesAtivados = [...this.DocentesSelecionados];
      this.SemAlocacao = this.SemAlocacaoCheck;
      this.$refs.modalFiltros.hide();
      this.searchProf = null;
    },

    selectAll() {
      if (this.DocentesSelecionados != []) this.DocentesSelecionados = [];
      for (var i = 0; i < this.$store.state.docente.Docentes.length; i++)
        this.DocentesSelecionados.push(this.$store.state.docente.Docentes[i]);
      this.SemAlocacaoCheck = true;
    },

    selectNone() {
      this.DocentesSelecionados = [];
      this.SemAlocacaoCheck = false;
    },

    turmas(professor) {
      return _.orderBy(
        _.filter(this.$store.state.turma.Turmas, (turma) => {
          return (
            turma.Docente1 === professor.id || turma.Docente2 === professor.id
          );
        }),
        ["periodo", "Disciplina", "letra"]
      );
    },

    turmasSemAlocacao() {
      return _.orderBy(
        _.filter(this.$store.state.turma.Turmas, (turma) => {
          return (
            turma.Docente1 == null &&
            turma.Docente2 == null &&
            turma.Disciplina != null
          );
        }),
        ["periodo", "Disciplina", "letra"]
      );
    },

    pos(professor) {
      return _.filter(this.$store.state.cargaPos.Cargas, (turma) => {
        return turma.Docente === professor.id;
      });
    },

    creditos1(professor) {
      var c = 0;
      for (var t = 0; t < this.$store.state.turma.Turmas.length; t++) {
        if (
          this.$store.state.turma.Turmas[t].periodo === 1 &&
          (this.$store.state.turma.Turmas[t].Docente1 === professor.id ||
            this.$store.state.turma.Turmas[t].Docente2 === professor.id)
        ) {
          for (
            var d = 0;
            d < this.$store.state.disciplina.Disciplinas.length;
            d++
          ) {
            if (
              this.$store.state.disciplina.Disciplinas[d].id ===
              this.$store.state.turma.Turmas[t].Disciplina
            ) {
              if (
                this.$store.state.turma.Turmas[t].Docente1 > 0 &&
                this.$store.state.turma.Turmas[t].Docente2 > 0
              ) {
                c +=
                  parseFloat(
                    this.$store.state.disciplina.Disciplinas[d].cargaPratica
                  ) / 2;
                c +=
                  parseFloat(
                    this.$store.state.disciplina.Disciplinas[d].cargaTeorica
                  ) / 2;
              } else {
                c += parseFloat(
                  this.$store.state.disciplina.Disciplinas[d].cargaPratica
                );
                c += parseFloat(
                  this.$store.state.disciplina.Disciplinas[d].cargaTeorica
                );
              }
            }
          }
        }
      }
      for (var t = 0; t < this.$store.state.cargaPos.Cargas.length; t++) {
        if (this.$store.state.cargaPos.Cargas[t].Docente === professor.id) {
          if (
            this.$store.state.cargaPos.Cargas[t].trimestre == 1 ||
            this.$store.state.cargaPos.Cargas[t].trimestre == 2
          ) {
            c += parseFloat(this.$store.state.cargaPos.Cargas[t].creditos);
          }
        }
      }
      return c;
    },

    creditos2(professor) {
      var c = 0;
      for (var t = 0; t < this.$store.state.turma.Turmas.length; t++) {
        if (
          this.$store.state.turma.Turmas[t].periodo === 3 &&
          (this.$store.state.turma.Turmas[t].Docente1 === professor.id ||
            this.$store.state.turma.Turmas[t].Docente2 === professor.id)
        ) {
          for (
            var d = 0;
            d < this.$store.state.disciplina.Disciplinas.length;
            d++
          ) {
            if (
              this.$store.state.disciplina.Disciplinas[d].id ===
              this.$store.state.turma.Turmas[t].Disciplina
            ) {
              if (
                this.$store.state.turma.Turmas[t].Docente1 > 0 &&
                this.$store.state.turma.Turmas[t].Docente2 > 0
              ) {
                c +=
                  parseFloat(
                    this.$store.state.disciplina.Disciplinas[d].cargaPratica
                  ) / 2;
                c +=
                  parseFloat(
                    this.$store.state.disciplina.Disciplinas[d].cargaTeorica
                  ) / 2;
              } else {
                c += parseFloat(
                  this.$store.state.disciplina.Disciplinas[d].cargaPratica
                );
                c += parseFloat(
                  this.$store.state.disciplina.Disciplinas[d].cargaTeorica
                );
              }
            }
          }
        }
      }
      for (var t = 0; t < this.$store.state.cargaPos.Cargas.length; t++) {
        if (this.$store.state.cargaPos.Cargas[t].Docente === professor.id) {
          if (this.$store.state.cargaPos.Cargas[t].trimestre == 3) {
            c += parseFloat(this.$store.state.cargaPos.Cargas[t].creditos);
          }
        }
      }
      return c;
    },

    creditos(professor) {
      var c = 0;
      for (var t = 0; t < this.$store.state.turma.Turmas.length; t++) {
        if (
          this.$store.state.turma.Turmas[t].Docente1 === professor.id ||
          this.$store.state.turma.Turmas[t].Docente2 === professor.id
        ) {
          for (
            var d = 0;
            d < this.$store.state.disciplina.Disciplinas.length;
            d++
          ) {
            if (
              this.$store.state.disciplina.Disciplinas[d].id ===
              this.$store.state.turma.Turmas[t].Disciplina
            ) {
              if (
                this.$store.state.turma.Turmas[t].Docente1 > 0 &&
                this.$store.state.turma.Turmas[t].Docente2 > 0
              ) {
                c +=
                  parseFloat(
                    this.$store.state.disciplina.Disciplinas[d].cargaPratica
                  ) / 2;
                c +=
                  parseFloat(
                    this.$store.state.disciplina.Disciplinas[d].cargaTeorica
                  ) / 2;
              } else {
                c += parseFloat(
                  this.$store.state.disciplina.Disciplinas[d].cargaPratica
                );
                c += parseFloat(
                  this.$store.state.disciplina.Disciplinas[d].cargaTeorica
                );
              }
            }
          }
        }
      }
      for (var t = 0; t < this.$store.state.cargaPos.Cargas.length; t++) {
        if (this.$store.state.cargaPos.Cargas[t].Docente === professor.id) {
          c += parseFloat(this.$store.state.cargaPos.Cargas[t].creditos);
        }
      }
      return c;
    },
  },

  computed: {
    CargasPos() {
      return _.orderBy(this.$store.state.cargaPos.Cargas, "trimestre");
    },

    Disciplinas() {
      return _.orderBy(this.$store.state.disciplina.Disciplinas, "nome");
    },
    Horarios() {
      return this.$store.state.horario.Horarios;
    },
    Docentes_Ativados_filtred() {
      return _.orderBy(
        this.DocentesAtivados,
        this.ordemProf_Main.order,
        this.ordemProf_Main.type
      );
    },
    Docentes_Filtred() {
      //Filtro ordem
      return _.orderBy(
        this.Docentes,
        this.ordemProf_Modal.order,
        this.ordemProf_Modal.type
      );
    },
    Docentes() {
      //Filtro search
      if (this.searchProf != null && this.searchProf != "") {
        return this.$store.state.docente.Docentes.filter((prof) => {
          return prof.ativo
            ? prof.apelido.match(this.searchProf.toUpperCase())
            : false;
        });
      }
      return this.$store.state.docente.Docentes;
    },
  },
};
</script>

<style scoped>
/* prefixed */

.DashboardCargaProfessores {
  max-width: 100%;
  overflow: hidden;
  margin: 0;
}
.main-table .p-header {
  padding: 0 5px 0 5px !important;
  margin: 0 !important;
  font-size: 11px !important;
  text-align: center;
  height: 18px;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}
.divTable {
  overflow: hidden;
  height: -webkit-max-content;
  height: -moz-max-content;
  height: max-content;
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
}

.main-table {
  display: block !important;
  overflow-y: scroll !important;
  overflow-x: auto !important;
  font-size: 11px !important;
  font-weight: normal !important;
  background-color: white;
  margin: 0 !important;
  height: -webkit-calc(100vh - 95px);
  height: -moz-calc(100vh - 95px);
  height: calc(100vh - 95px);
}
tbody {
  max-height: 100%;
  width: 100%;
}
.main-table td {
  text-align: center;
  vertical-align: middle !important;
  padding: 0 !important;
}

.main-table p {
  margin-bottom: 0 !important;
  text-align: center;
  padding-left: 5px;
  padding-right: 5px;
}

.main-table tr thead {
  display: block;
}
.main-table thead th {
  padding: 0 !important;
  font-size: 14px;
  text-align: center;
  height: 18px !important;
}
.main-table select {
  height: 15px !important;
  text-align: left;
}
.main-table input {
  height: 18px !important;
  text-align: center !important;
}
.main-table input[type="checkbox"] {
  margin-left: 0 !important;
  margin-top: 4px !important;
}

.sticky {
  display: block !important;
  overflow: hidden !important;
  position: sticky !important;
  position: -webkit-sticky !important;
  top: 0 !important;
  display: block !important;
  overflow: hidden !important;
  z-index: 3;
}
.sticky-bottom {
  display: block !important;
  overflow: hidden !important;
  position: sticky !important;
  position: -webkit-sticky !important;
  top: 38px !important;
  display: block !important;
  overflow: hidden !important;
  z-index: 3;
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
/* texto maiusculo */
.toUpperCase {
  text-transform: uppercase;
}

/* Botoes */
button {
  padding: 0;
  border: none;
  background: none;
  height: -webkit-max-content;
  height: -moz-max-content;
  height: max-content;
  width: 32px !important;
  margin-left: 4px;
  margin-right: 4px;
  margin-top: 0px;
  line-height: 50%;
  margin-bottom: 0px;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  text-align: center !important;
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
  color: #82a0ff !important;
  background-color: white;
}

.relatbtn:focus {
  color: #82a0ff;
  background-color: white;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #698dff;
}

.prof-td {
  background-color: rgba(0, 0, 0, 0.089);
  color: black;
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
/* ==== MODAL TABLE ==== */
.modal-table {
  display: block !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  font-size: 10px !important;
  font-weight: normal !important;
  background-color: white;
  margin: 0 !important;
}
.modal-table tr thead {
  display: block;
}
.modal-table th {
  padding: 0 !important;
  text-align: center !important;
  height: 18px !important;
}

.modal-table .p-header {
  padding: 0px 5px 0px 5px !important;
  margin: 0 !important;
  text-align: start;
  height: 18px !important;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}
.modal-table tbody {
  max-height: 100%;
  width: 100%;
}
.modal-table td {
  border-top: 0;
  text-align: center;
  vertical-align: middle !important;
  padding: 0 !important;
  margin: 0 !important;
  /* height: 22px !important; */
}
.modal-table p {
  margin: 0 !important;
  text-align: center;
  padding: 0 !important;
  padding-right: 5px !important;
  padding-left: 5px !important;
}
.modal-table input[type="checkbox"] {
  margin-left: 0 !important;
  margin-top: 4px !important;
  margin-bottom: auto !important;
  height: 13px !important;
}
.form-control {
  height: 25px !important;
  font-size: 12px !important;
  padding: 2px 5px 2px 5px !important;
  text-align: start;
}
/* FIM MODAL TABLE */
/* search */
.input-group-text:hover {
  color: rgb(102, 102, 102);
  background-color: #dddddd;
}
.input-group-text {
  background-color: #ffffff;
  border-left: none;
}

@media screen and (max-width: 355px) {
  .div-titulo {
    height: 70px !important;
  }
}
.active {
  background-color: #e9ecef !important;
  color: #495057 !important;
  cursor: default;
}
.max-content {
  width: -webkit-max-content !important;
  width: -moz-max-content !important;
  width: max-content !important;
}
/* APENAS NO FIREFOX */
@-moz-document url-prefix() {
  .main-table select {
    height: 15px !important;
    text-align: left;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    line-height: 8px;
    border: 0.5px solid rgb(133, 133, 133);
    -moz-border-radius: 2px;
    border-radius: 2px;
    background-color: rgb(245, 245, 245);
  }
  .main-table input {
    height: 18px !important;
    text-align: center;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    line-height: 8px;
    border: 0.5px solid rgb(92, 92, 92);
    -moz-border-radius: 2px;
    border-radius: 2px;
    background-color: rgb(245, 245, 245);
  }
}
.clickable {
  cursor: pointer !important;
}
</style>
