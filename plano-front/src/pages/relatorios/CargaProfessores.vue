<template>
  <div class="main-component row p-0">
    <PageTitle :title="'Carga Professores'">
      <template #aside>
        <b-button
          v-b-modal.modalFiltros
          title="Filtros"
          class="btn-custom btn-icon cancelbtn"
        >
          <i class="fas fa-list-ul"></i>
        </b-button>

        <b-button
          v-b-modal.modalRelatorio
          type="button"
          class="btn-custom btn-icon relatbtn"
          title="Relatório"
        >
          <i class="far fa-file-pdf"></i>
        </b-button>

        <b-button
          v-b-modal.modalAjuda
          title="Ajuda"
          class="btn-custom btn-icon relatbtn"
        >
          <i class="fas fa-question"></i>
        </b-button>
      </template>
    </PageTitle>

    <div class="divTable p-0" ref="carga">
      <table class="main-table table table-bordered table-hover table-sm">
        <thead class="thead-light max-content sticky">
          <tr>
            <div style="font-size: 11px !important;" class="max-content sticky">
              <th scope="col">
                <p
                  class="p-header clickable"
                  style="width: 130px; text-align: start !important;"
                  @click="toggleOrder(orednacaoDocentesMain, 'apelido')"
                >
                  Nome
                  <i
                    style="font-size: 0.6rem;"
                    :class="setIconByOrder(orednacaoDocentesMain, 'apelido')"
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
              <th scope="col" id="IDcreditos1">
                <p class="p-header" style="width: 32px;">CS1</p>
                <b-popover
                  :target="'IDcreditos1'"
                  placement="bottom"
                  triggers="hover focus"
                >
                  <p>Somatório dos créditos no 1º semestre</p>
                </b-popover>
              </th>
              <th scope="col" id="IDcreditos2">
                <p class="p-header" style="width: 32px;">CS2</p>
                <b-popover
                  :target="'IDcreditos2'"
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
          <template v-for="professor in DocentesOrderedMain">
            <tr class="prof-td" :key="professor.apelido">
              <div class="max-content">
                <td>
                  <p style="width: 130px; text-align: start !important;">
                    {{ professor.apelido }}
                  </p>
                </td>
                <td>
                  <p style="width: 24px;"></p>
                </td>
                <td>
                  <p style="width: 80px;"></p>
                </td>
                <td>
                  <p style="width: 300px"></p>
                </td>
                <td>
                  <p style="width: 24px;"></p>
                </td>
                <td>
                  <p style="width: 180px;"></p>
                </td>
                <td>
                  <p style="width: 32px;">{{ professor.cred1 }}</p>
                </td>
                <td>
                  <p style="width: 32px;">{{ professor.cred2 }}</p>
                </td>
                <td>
                  <p style="width: 42px;">
                    {{ professor.cred1 + professor.cred2 }}
                  </p>
                </td>
              </div>
            </tr>

            <template v-for="turma in turmasInDocentes1Semestre(professor)">
              <tr :key="'turma' + turma.id + professor.apelido">
                <div class="max-content">
                  <td>
                    <p style="width: 130px;"></p>
                  </td>
                  <td>
                    <p style="width: 24px;">{{ turma.periodo }}</p>
                  </td>
                  <td>
                    <p style="width: 80px;">{{ turma.disciplina_codigo }}</p>
                  </td>
                  <td>
                    <p style="width: 300px;">{{ turma.disciplina_nome }}</p>
                  </td>
                  <td>
                    <p style="width: 24px;">{{ turma.letra }}</p>
                  </td>
                  <td>
                    <p style="width: 180px">
                      <span v-for="horario in Horarios" :key="horario.id">
                        {{
                          horario.id === turma.Horario1 ? horario.horario : ""
                        }}
                        {{
                          horario.id === turma.Horario2
                            ? " / " + horario.horario
                            : ""
                        }}
                      </span>
                    </p>
                  </td>

                  <td>
                    <p style="width: 32px;">
                      <span v-if="turma.periodo === 1">
                        {{
                          turma.Docente1 > 0 && turma.Docente2 > 0
                            ? (turma.disciplina_cargaTeorica +
                                turma.disciplina_cargaPratica) /
                              2
                            : turma.disciplina_cargaTeorica +
                              turma.disciplina_cargaPratica
                        }}
                      </span>
                    </p>
                  </td>

                  <td>
                    <p style="width:32px">
                      <span v-if="turma.periodo === 3"
                        >{{
                          turma.Docente1 > 0 && turma.Docente2 > 0
                            ? (turma.disciplina_cargaTeorica +
                                turma.disciplina_cargaPratica) /
                              2
                            : turma.disciplina_cargaTeorica +
                              turma.disciplina_cargaPratica
                        }}
                      </span>
                    </p>
                  </td>

                  <td>
                    <p style="width: 42px;"></p>
                  </td>
                </div>
              </tr>
            </template>

            <template v-for="carga in cargasPos1(professor.id)">
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

                  <td>
                    <p style="width: 32px;">
                      {{
                        carga.trimestre == 1 || carga.trimestre == 2
                          ? carga.creditos
                          : ""
                      }}
                    </p>
                  </td>

                  <td>
                    <p style="width: 32px;">
                      {{
                        carga.trimestre == 3 || carga.trimestre == 4
                          ? carga.creditos
                          : ""
                      }}
                    </p>
                  </td>

                  <td><p style="width: 42px;"></p></td>
                </div>
              </tr>
            </template>

            <template v-for="turma in turmasInDocentes2Semestre(professor)">
              <tr :key="'turma' + turma.id + professor.apelido">
                <div class="max-content">
                  <td>
                    <p style="width: 130px;"></p>
                  </td>
                  <td>
                    <p style="width: 24px;">{{ turma.periodo }}</p>
                  </td>
                  <td>
                    <p style="width: 80px;">{{ turma.disciplina_codigo }}</p>
                  </td>
                  <td>
                    <p style="width: 300px;">{{ turma.disciplina_nome }}</p>
                  </td>
                  <td>
                    <p style="width: 24px;">{{ turma.letra }}</p>
                  </td>
                  <td>
                    <p style="width: 180px">
                      <span v-for="horario in Horarios" :key="horario.id">
                        {{
                          horario.id === turma.Horario1 ? horario.horario : ""
                        }}
                        {{
                          horario.id === turma.Horario2
                            ? " / " + horario.horario
                            : ""
                        }}
                      </span>
                    </p>
                  </td>

                  <td>
                    <p style="width: 32px;">
                      <span v-if="turma.periodo === 1">
                        {{
                          turma.Docente1 > 0 && turma.Docente2 > 0
                            ? (turma.disciplina_cargaTeorica +
                                turma.disciplina_cargaPratica) /
                              2
                            : turma.disciplina_cargaTeorica +
                              turma.disciplina_cargaPratica
                        }}
                      </span>
                    </p>
                  </td>

                  <td>
                    <p style="width:32px">
                      <span v-if="turma.periodo === 3"
                        >{{
                          turma.Docente1 > 0 && turma.Docente2 > 0
                            ? (turma.disciplina_cargaTeorica +
                                turma.disciplina_cargaPratica) /
                              2
                            : turma.disciplina_cargaTeorica +
                              turma.disciplina_cargaPratica
                        }}
                      </span>
                    </p>
                  </td>

                  <td>
                    <p style="width: 42px;"></p>
                  </td>
                </div>
              </tr>
            </template>

            <template v-for="carga in cargasPos2(professor.id)">
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

                  <td>
                    <p style="width: 32px;">
                      {{
                        carga.trimestre == 1 || carga.trimestre == 2
                          ? carga.creditos
                          : ""
                      }}
                    </p>
                  </td>

                  <td>
                    <p style="width: 32px;">
                      {{
                        carga.trimestre == 3 || carga.trimestre == 4
                          ? carga.creditos
                          : ""
                      }}
                    </p>
                  </td>

                  <td><p style="width: 42px;"></p></td>
                </div>
              </tr>
            </template>
          </template>

          <template
            v-if="turmasSemAlocacao().length > 0 && docenteSemAlocacao.ativado"
          >
            <div class="max-content">
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
                <div style="width: 300px;"></div>
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

            <template v-for="turma in turmasSemAlocacao()">
              <tr :key="'turma' + turma.id + 'semAlocacao'">
                <div class="max-content">
                  <td>
                    <p style="width: 130px;"></p>
                  </td>
                  <td>
                    <p style="width: 24px;">{{ turma.periodo }}</p>
                  </td>
                  <td>
                    <p style="width: 80px;">{{ turma.disciplina_codigo }}</p>
                  </td>
                  <td>
                    <p style="width: 300px;">{{ turma.disciplina_nome }}</p>
                  </td>
                  <td>
                    <p style="width: 24px;">{{ turma.letra }}</p>
                  </td>
                  <td>
                    <p style="width:180px">
                      <template v-for="horario in Horarios">
                        <span :key="horario.id">
                          {{
                            horario.id === turma.Horario1 ? horario.horario : ""
                          }}
                          {{
                            horario.id === turma.Horario2
                              ? " / " + horario.horario
                              : ""
                          }}
                        </span>
                      </template>
                    </p>
                  </td>

                  <td>
                    <p style="width: 32px">
                      <span v-if="turma.periodo === 1">
                        {{
                          turma.Docente1 > 0 && turma.Docente2 > 0
                            ? (turma.disciplina_cargaTeorica +
                                turma.disciplina_cargaPratica) /
                              2
                            : turma.disciplina_cargaTeorica +
                              turma.disciplina_cargaPratica
                        }}
                      </span>
                    </p>
                  </td>

                  <td>
                    <p style="width: 32px;">
                      <span v-if="turma.periodo === 3">
                        {{
                          turma.Docente1 > 0 && turma.Docente2 > 0
                            ? (turma.disciplina_cargaTeorica +
                                turma.disciplina_cargaPratica) /
                              2
                            : turma.disciplina_cargaTeorica +
                              turma.disciplina_cargaPratica
                        }}
                      </span>
                    </p>
                  </td>

                  <td>
                    <div style="width: 42px;"></div>
                  </td>
                </div>
              </tr>
            </template>
          </template>

          <template v-if="Docentes.length === 0">
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

    <b-modal
      id="modalAjuda"
      ref="ajudaModal"
      scrollable
      title="Ajuda"
      hide-footer
    >
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
              class="far fa-file-pdf relatbtn px-1"
              style="font-size: 12px;"
            ></i>
            e selecione se deseja o relatório completo, com todos os docentess,
            ou apenas o relatório parcial, com os docentes selecionados.
          </li>
        </ul>
      </div>
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
            <a class="nav-link active border clickable">Docentes</a>
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
              <div
                style="font-size: 11px !important;"
                class="max-content sticky"
              >
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
                      v-model="searchDocentes"
                    />
                    <div
                      class="input-group-append"
                      @click="clearSearchDocentes()"
                    >
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
                    @click="toggleOrder(ordenacaoDocentesModal, 'apelido')"
                  >
                    Nome
                    <i
                      style="font-size: 0.6rem;"
                      :class="setIconByOrder(ordenacaoDocentesModal, 'apelido')"
                    ></i>
                  </p>
                </th>
              </div>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="docente in DocentesOrderedModal"
              :key="`docente${docente.id}`"
            >
              <div class="max-content">
                <td>
                  <div style="width: 25px; height: inherit;" class="px-1">
                    <input
                      type="checkbox"
                      v-model="filtroDocentes.selecionados"
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
                      v-model="docenteSemAlocacao.selecionado"
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
            class="btn-azul btn-custom btn-modal"
            variant="success"
            @click="selectAllDocentes()"
            >Selecionar Todos</b-button
          >
          <b-button
            class="btn-cinza btn-custom btn-modal"
            variant="secondary"
            @click="selectNone()"
            >Desmarcar Todos</b-button
          >
        </div>
        <b-button
          variant="success"
          @click="btnOK()"
          class="btn-verde btn-custom btn-modal px-3"
          >OK</b-button
        >
      </div>
    </b-modal>

    <!-- Modal para escolher relatório parcial ou completo-->
    <b-modal
      id="modalRelatorio"
      ref="relatorioModal"
      size="sm"
      scrollable
      title="Relatório"
      hide-footer
    >
      <ul class="listas list-group">
        <li class="list-group-item clickable" v-on:click="pdf(1)">
          <strong>Parcial</strong>
        </li>
        <li class="list-group-item clickable" v-on:click="pdf(2)">
          <strong>Completo</strong>
        </li>
      </ul>
    </b-modal>
  </div>
</template>

<script>
import _ from "lodash";
import pdfs from "@/common/services/pdfs";
import PageTitle from "@/components/PageTitle";
import ordenacaoMixin from "@/ordenacao-mixin";

export default {
  name: "DashboardCargaProfessores",
  components: { PageTitle },
  mixins: [ordenacaoMixin],
  data() {
    return {
      searchDocentes: null,
      filtroDocentes: {
        ativados: [],
        selecionados: [],
      },
      docenteSemAlocacao: {
        ativado: true,
        selecionado: true,
      },
      ordenacaoDocentesModal: { order: "apelido", type: "asc" },
      orednacaoDocentesMain: { order: "apelido", type: "asc" },
    };
  },
  beforeMount() {
    this.selectAllDocentes();
    this.filtroDocentes.ativados = [...this.filtroDocentes.selecionados];
    this.docenteSemAlocacao.ativado = this.docenteSemAlocacao.selecionado;
  },
  methods: {
    pdf(opt) {
      if (opt === 1) {
        pdfs.pdfCargaProfessores({
          Docentes: this.filtroDocentes.ativados,
          SemAlocacao: this.docenteSemAlocacao.ativado,
        });
      }
      if (opt === 2) {
        pdfs.pdfCargaProfessores({
          Docentes: this.DocentesInCreditos,
          SemAlocacao: true,
        });
      }
    },
    btnOK() {
      this.filtroDocentes.ativados = [...this.filtroDocentes.selecionados];
      this.docenteSemAlocacao.ativado = this.docenteSemAlocacao.selecionado;
      this.$refs.modalFiltros.hide();
      this.clearSearchDocentes();
    },
    selectAllDocentes() {
      this.filtroDocentes.selecionados = [...this.DocentesInCreditos];
      this.docenteSemAlocacao.selecionado = true;
    },
    selectNone() {
      this.filtroDocentes.selecionados.length = 0;
      this.docenteSemAlocacao.selecionado = false;
    },
    turmaInDocentes(docente) {
      let turmasResult = _.filter(this.Turmas, (turma) => {
        if (turma.Docente1 === docente.id || turma.Docente2 === docente.id) {
          _.find(this.Disciplinas, (disciplina) => {
            if (turma.Disciplina === disciplina.id) {
              turma.disciplina_nome = disciplina.nome;
              turma.disciplina_codigo = disciplina.codigo;
              turma.disciplina_cargaTeorica = disciplina.cargaTeorica;
              turma.disciplina_cargaPratica = disciplina.cargaPratica;
              return true;
            }
          });
          return true;
        }
        return false;
      });

      return _.orderBy(turmasResult, ["periodo", "Disciplina", "letra"]);
    },
    turmasInDocentes1Semestre(docente) {
      return _.filter(this.turmaInDocentes(docente), function(turma) {
        return turma.periodo == 1 || turma.periodo == 2;
      });
    },
    turmasInDocentes2Semestre(docente) {
      return _.filter(this.turmaInDocentes(docente), function(turma) {
        return turma.periodo == 3 || turma.periodo == 4;
      });
    },
    turmasSemAlocacao() {
      return _.orderBy(
        _.filter(this.Turmas, (turma) => {
          if (
            turma.Docente1 == null &&
            turma.Docente2 == null &&
            turma.Disciplina != null
          ) {
            _.find(this.Disciplinas, (disciplina) => {
              if (turma.Disciplina === disciplina.id) {
                turma.disciplina_nome = disciplina.nome;
                turma.disciplina_codigo = disciplina.codigo;
                turma.disciplina_cargaTeorica = disciplina.cargaTeorica;
                turma.disciplina_cargaPratica = disciplina.cargaPratica;
              }
            });
            return true;
          }
          return false;
        }),
        ["periodo", "Disciplina", "letra"]
      );
    },
    calculaCreditos(docente) {
      var creditosTotais = { periodo1: 0, periodo2: 0 };

      for (let t = 0; t < this.Turmas.length; t++) {
        if (
          this.Turmas[t].Docente1 === docente.id ||
          this.Turmas[t].Docente2 === docente.id
        ) {
          for (var d = 0; d < this.Disciplinas.length; d++) {
            if (this.Disciplinas[d].id === this.Turmas[t].Disciplina) {
              if (this.Turmas[t].Docente1 > 0 && this.Turmas[t].Docente2 > 0) {
                //PRIMEIRO PERIODO
                if (this.Turmas[t].periodo === 1) {
                  creditosTotais.periodo1 +=
                    parseFloat(this.Disciplinas[d].cargaPratica) / 2;
                  creditosTotais.periodo1 +=
                    parseFloat(this.Disciplinas[d].cargaTeorica) / 2;
                } else {
                  //SEGUNDO PERIODO
                  creditosTotais.periodo2 +=
                    parseFloat(this.Disciplinas[d].cargaPratica) / 2;
                  creditosTotais.periodo2 +=
                    parseFloat(this.Disciplinas[d].cargaTeorica) / 2;
                }
              } else {
                //PRIMEIRO PERIODO
                if (this.Turmas[t].periodo === 1) {
                  creditosTotais.periodo1 += parseFloat(
                    this.Disciplinas[d].cargaPratica
                  );
                  creditosTotais.periodo1 += parseFloat(
                    this.Disciplinas[d].cargaTeorica
                  );
                }
                //SEGUNDO PERIODO
                else {
                  creditosTotais.periodo2 += parseFloat(
                    this.Disciplinas[d].cargaPratica
                  );
                  creditosTotais.periodo2 += parseFloat(
                    this.Disciplinas[d].cargaTeorica
                  );
                }
              }
            }
          }
        }
      }
      for (let t = 0; t < this.CargasPos.length; t++) {
        if (this.CargasPos[t].Docente === docente.id) {
          if (this.CargasPos[t].trimestre == 3) {
            creditosTotais.periodo2 += parseFloat(this.CargasPos[t].creditos);
          } else {
            creditosTotais.periodo1 += parseFloat(this.CargasPos[t].creditos);
          }
        }
      }
      return creditosTotais;
    },
    CargasPosFiltred(docenteId) {
      return this.CargasPos.filter((carga) => {
        return carga.Docente === docenteId;
      });
    },
    cargasPos1(docenteId) {
      return _.filter(this.CargasPosFiltred(docenteId), function(c) {
        return c.trimestre == 1 || c.trimestre == 2;
      });
    },
    cargasPos2(docenteId) {
      return _.filter(this.CargasPosFiltred(docenteId), function(c) {
        return c.trimestre == 3 || c.trimestre == 4;
      });
    },
    clearSearchDocentes() {
      this.searchDocentes = null;
    },
    normalizeText(text) {
      return text
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    },
  },

  computed: {
    DocentesOrderedMain() {
      return _.orderBy(
        this.filtroDocentes.ativados,
        this.orednacaoDocentesMain.order,
        this.orednacaoDocentesMain.type
      );
    },
    DocentesOrderedModal() {
      return _.orderBy(
        this.DocentesFiltredModal,
        this.ordenacaoDocentesModal.order,
        this.ordenacaoDocentesModal.type
      );
    },
    DocentesFiltredModal() {
      if (this.searchDocentes != null && this.searchDocentes != "") {
        const searchNormalized = this.normalizeText(this.searchDocentes);

        return this.DocentesInCreditos.filter((docente) => {
          const docenteApelido = this.normalizeText(docente.apelido);

          return docenteApelido.match(searchNormalized) ? true : false;
        });
      }
      return this.DocentesInCreditos;
    },
    DocentesInCreditos() {
      return this.$store.state.docente.Docentes.map((docente) => {
        const creditos = this.calculaCreditos(docente);
        return {
          ...docente,
          cred1: creditos.periodo1,
          cred2: creditos.periodo2,
        };
      });
    },
    Docentes() {
      return _.filter(this.$store.state.docente.Docentes, ["ativo", true]);
    },
    Turmas() {
      return this.$store.state.turma.Turmas;
    },
    CargasPos() {
      return _.orderBy(this.$store.state.cargaPos.Cargas, "trimestre");
    },
    Disciplinas() {
      return _.orderBy(this.$store.state.disciplina.Disciplinas, "nome");
    },
    Horarios() {
      return this.$store.state.horario.Horarios;
    },
  },
};
</script>

<style scoped>
.main-table .p-header {
  padding: 0 5px 0 5px !important;
  margin: 0 !important;
  font-size: 11px !important;
  text-align: center;
  height: 18px;
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
.titulo {
  font-size: 25px;
  font-weight: normal;
  padding-left: 0;
  margin: 0 !important;
}

.toUpperCase {
  text-transform: uppercase;
}
.prof-td {
  background-color: rgba(0, 0, 0, 0.089);
  color: black;
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
.list-group-item:hover {
  text-decoration: underline;
  background-color: #ebebeb;
}
</style>
