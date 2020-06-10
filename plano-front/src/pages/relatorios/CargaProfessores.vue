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

    <div class="div-table" ref="carga">
      <BaseTable>
        <template #thead>
          <th
            @click="toggleOrder(orednacaoDocentesMain, 'apelido')"
            style="width: 130px"
            class="clickable t-start"
          >
            Nome
            <i :class="setIconByOrder(orednacaoDocentesMain, 'apelido')"></i>
          </th>
          <th style="width: 25px">
            S.
          </th>
          <th style="width: 80px">
            Cód.
          </th>
          <th style="width: 300px" class="t-start">
            Disciplina
          </th>
          <th style="width: 25px">
            T.
          </th>
          <th style="width: 180px">
            Horário
          </th>
          <th style="width: 35px" id="IDcreditos1">
            CS1
            <b-popover
              :target="'IDcreditos1'"
              placement="bottom"
              triggers="hover focus"
            >
              <p>Somatório dos créditos no 1º semestre</p>
            </b-popover>
          </th>
          <th style="width: 35px" id="IDcreditos2">
            CS2
            <b-popover
              :target="'IDcreditos2'"
              placement="bottom"
              triggers="hover focus"
            >
              <p>Somatório dos créditos no 2º semestre</p>
            </b-popover>
          </th>
          <th style="width: 45px" id="creditostotal">
            CTotal
            <b-popover
              :target="'creditostotal'"
              placement="bottom"
              triggers="hover focus"
            >
              <p>Somatório total dos créditos</p>
            </b-popover>
          </th>
        </template>
        <template #tbody>
          <template v-for="docente in DocentesOrderedMain">
            <tr class="docente-tr" :key="'docentes' + docente.apelido">
              <td style="width: 130px" class="t-start">
                {{ docente.apelido }}
              </td>
              <td style="width: 25px"></td>
              <td style="width: 80px"></td>
              <td style="width: 300px" class="t-start"></td>
              <td style="width: 25px"></td>
              <td style="width: 180px"></td>
              <td style="width: 35px">
                {{ docente.cred1 }}
              </td>
              <td style="width: 35px">
                {{ docente.cred2 }}
              </td>
              <td style="width: 45px">
                {{ docente.cred1 + docente.cred2 }}
              </td>
            </tr>

            <template v-for="turma in turmasInDocentes1Semestre(docente)">
              <tr :key="'1turmas' + turma.id + docente.apelido">
                <td style="width: 130px"></td>
                <td style="width: 25px">
                  {{ turma.periodo }}
                </td>
                <td style="width: 80px">
                  {{ turma.disciplina_codigo }}
                </td>
                <td style="width: 300px" class="t-start">
                  {{ turma.disciplina_nome }}
                </td>
                <td style="width: 25px">
                  {{ turma.letra }}
                </td>
                <td style="width: 180px">
                  <span v-for="horario in Horarios" :key="horario.id">
                    {{ horario.id === turma.Horario1 ? horario.horario : "" }}
                    {{
                      horario.id === turma.Horario2
                        ? " / " + horario.horario
                        : ""
                    }}
                  </span>
                </td>

                <td style="width: 35px">
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
                </td>

                <td style="width:35px">
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
                </td>

                <td style="width: 45px"></td>
              </tr>
            </template>

            <template v-for="carga in cargasPos1(docente.id)">
              <tr :key="'1cargaPos' + carga.id + docente.id">
                <td style="width: 130px"></td>
                <td style="width: 25px">
                  {{ carga.trimestre }}
                </td>
                <td style="width: 80px"></td>
                <td style="width: 300px" class="t-start toUpperCase">
                  Disciplina do {{ carga.programa }}
                </td>
                <td style="width: 25px"></td>
                <td style="width: 180px"></td>

                <td style="width: 35px">
                  {{
                    carga.trimestre == 1 || carga.trimestre == 2
                      ? carga.creditos
                      : ""
                  }}
                </td>

                <td style="width: 35px">
                  {{
                    carga.trimestre == 3 || carga.trimestre == 4
                      ? carga.creditos
                      : ""
                  }}
                </td>

                <td style="width: 45px"></td>
              </tr>
            </template>

            <template v-for="turma in turmasInDocentes2Semestre(docente)">
              <tr :key="'2turmas' + turma.id + docente.apelido">
                <td style="width: 130px"></td>
                <td style="width: 25px">
                  {{ turma.periodo }}
                </td>
                <td style="width: 80px">
                  {{ turma.disciplina_codigo }}
                </td>
                <td style="width: 300px" class="t-start">
                  {{ turma.disciplina_nome }}
                </td>
                <td style="width: 25px">
                  {{ turma.letra }}
                </td>
                <td style="width: 180px">
                  <span v-for="horario in Horarios" :key="horario.id">
                    {{ horario.id === turma.Horario1 ? horario.horario : "" }}
                    {{
                      horario.id === turma.Horario2
                        ? " / " + horario.horario
                        : ""
                    }}
                  </span>
                </td>

                <td style="width: 35px">
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
                </td>

                <td style="width:35px">
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
                </td>

                <td style="width: 45px"></td>
              </tr>
            </template>

            <template v-for="carga in cargasPos2(docente.id)">
              <tr :key="'2cargaPos' + carga.id + docente.id">
                <td style="width: 130px"></td>
                <td style="width: 25px">
                  {{ carga.trimestre }}
                </td>
                <td style="width: 80px"></td>
                <td style="width: 300px" class="t-start toUpperCase">
                  Disciplina do {{ carga.programa }}
                </td>
                <td style="width: 25px"></td>
                <td style="width: 180px"></td>

                <td style="width: 32px">
                  {{
                    carga.trimestre == 1 || carga.trimestre == 2
                      ? carga.creditos
                      : ""
                  }}
                </td>

                <td style="width: 35px">
                  {{
                    carga.trimestre == 3 || carga.trimestre == 4
                      ? carga.creditos
                      : ""
                  }}
                </td>

                <td style="width: 45px"></td>
              </tr>
            </template>
          </template>

          <template
            v-if="turmasSemAlocacao().length > 0 && docenteSemAlocacao.ativado"
          >
            <tr class="docente-tr">
              <td style="width: 130px" class="t-start">
                SEM ALOCAÇÃO
              </td>
              <td style="width: 25px"></td>
              <td style="width: 80px"></td>
              <td style="width: 300px"></td>
              <td style="width: 25px"></td>
              <td style="width: 180px"></td>
              <td style="width: 35px"></td>
              <td style="width: 35px"></td>
              <td style="width: 45px"></td>
            </tr>

            <template v-for="turma in turmasSemAlocacao()">
              <tr :key="'semAlocacao' + turma.id">
                <td style="width: 130px"></td>
                <td style="width: 25px">
                  {{ turma.periodo }}
                </td>
                <td style="width: 80px">
                  {{ turma.disciplina_codigo }}
                </td>
                <td style="width: 300px" class="t-start">
                  {{ turma.disciplina_nome }}
                </td>
                <td style="width: 25px">
                  {{ turma.letra }}
                </td>
                <td style="width:180px">
                  <span v-for="horario in Horarios" :key="horario.id">
                    {{ horario.id === turma.Horario1 ? horario.horario : "" }}
                    {{
                      horario.id === turma.Horario2
                        ? " / " + horario.horario
                        : ""
                    }}
                  </span>
                </td>

                <td style="width: 35px">
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
                </td>

                <td style="width: 35px">
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
                </td>

                <td style="width: 45px"></td>
              </tr>
            </template>
          </template>
        </template>
      </BaseTable>
    </div>

    <!-- MODAL FILTROS -->
    <b-modal
      id="modalFiltros"
      ref="modalFiltros"
      scrollable
      size="md"
      title="Filtros"
    >
      <NavTab
        :currentTab="tabAtiva"
        :allTabs="['Docentes', 'Semestre']"
        @change-tab="tabAtiva = $event"
      />
      <!-- BaseTable -->

      <div class="div-table">
        <BaseTable
          v-show="tabAtiva === 'Docentes'"
          :tableType="'modal-table'"
          :hasSearchBar="true"
        >
          <template #thead-search>
            <input
              type="text"
              class="form-control input-search"
              style=""
              placeholder="Pesquise o nome de um docente..."
              v-model="searchDocentes"
            />
            <button @click="clearSearchDocentes()" class="btn btn-search">
              &times;
            </button>
          </template>
          <template #thead>
            <th style="width: 25px"></th>
            <th
              class="clickable t-start"
              style="width: 425px"
              @click="toggleOrder(ordenacaoDocentesModal, 'apelido')"
            >
              Nome
              <i :class="setIconByOrder(ordenacaoDocentesModal, 'apelido')"></i>
            </th>
          </template>
          <template #tbody>
            <tr
              v-for="docente in DocentesOrderedModal"
              :key="`docente${docente.id}`"
            >
              <div class="max-content">
                <td style="width: 25px;">
                  <input
                    type="checkbox"
                    v-model="filtroDocentes.selecionados"
                    :value="docente"
                    class="form-check-input position-static m-0"
                  />
                </td>
                <td style="width: 425px;" class="t-start">
                  {{ docente.apelido }}
                </td>
              </div>
            </tr>

            <tr>
              <div class="max-content">
                <td style="width: 25px;">
                  <input
                    type="checkbox"
                    v-model="docenteSemAlocacao.selecionado"
                    class="form-check-input position-static m-0"
                  />
                </td>
                <td style="width: 425px;" class="t-start">
                  SEM ALOCAÇÃO
                </td>
              </div>
            </tr>
          </template>
        </BaseTable>
        <BaseTable v-show="tabAtiva === 'Semestre'" :tableType="'modal-table'">
          <template #thead>
            <th style="width: 25px"></th>
            <th
              class="clickable t-start"
              style="width: 425px"
              @click="toggleOrder(ordenacaoDocentesModal, 'apelido')"
            >
              Nome
              <i :class="setIconByOrder(ordenacaoDocentesModal, 'apelido')"></i>
            </th>
          </template>
          <template #tbody>
            <tr>
              <div class="max-content">
                <td style="width: 25px;">
                  <input
                    type="checkbox"
                    v-model="docenteSemAlocacao.selecionado"
                    class="form-check-input position-static m-0"
                  />
                </td>
                <td style="width: 425px;" class="t-start">
                  SEM ALOCAÇÃO
                </td>
              </div>
            </tr>
            <tr>
              <div class="max-content">
                <td style="width: 25px;">
                  <input
                    type="checkbox"
                    v-model="docenteSemAlocacao.selecionado"
                    class="form-check-input position-static m-0"
                  />
                </td>
                <td style="width: 425px;" class="t-start">
                  SEM ALOCAÇÃO
                </td>
              </div>
            </tr>
          </template>
        </BaseTable>
      </div>

      <div slot="modal-footer" class="w-100 m-0" style="display: flex;">
        <div class="w-100">
          <b-button
            class="btn-azul btn-custom btn-modal"
            variant="primary"
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
          class="btn-verde btn-custom btn-modal btn-ok-modal"
          >OK</b-button
        >
      </div>
    </b-modal>
    <!-- MODAL AJUDA -->
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
    <!-- Modal de relatório parcial ou completo-->
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
import NavTab from "@/components/NavTab";
import BaseTable from "@/components/BaseTable";
import ordenacaoMixin from "@/ordenacao-mixin";

export default {
  name: "DashboardCargaProfessores",
  components: { PageTitle, BaseTable, NavTab },
  mixins: [ordenacaoMixin],
  data() {
    return {
      tabAtiva: "Docentes",
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
.toUpperCase {
  text-transform: uppercase;
}
.docente-tr {
  background-color: rgba(0, 0, 0, 0.089);
  color: black;
}
.list-group-item:hover {
  text-decoration: underline;
  background-color: #ebebeb;
}
</style>
