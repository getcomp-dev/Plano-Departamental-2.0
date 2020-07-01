<template>
  <div class="main-component row p-0" v-if="!$root.onLoad">
    <PageTitle :title="'Carga Professores'">
      <template #aside>
        <BaseButton
          title="Filtros"
          :type="'icon'"
          :color="'gray'"
          @click="openAsideModal('filtros')"
        >
          <i class="fas fa-list-ul"></i>
        </BaseButton>

        <BaseButton
          title="Relatório"
          :type="'icon'"
          :color="'lightblue'"
          @click="$refs.modalRelatorio.toggle()"
        >
          <i class="fas fa-file-alt"></i>
        </BaseButton>

        <BaseButton
          :type="'icon'"
          :color="'lightblue'"
          @click="openAsideModal('ajuda')"
        >
          <i class="fas fa-question"></i>
        </BaseButton>
      </template>
    </PageTitle>

    <div class="div-table" v-if="!isLoading">
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
          <th style="width: 50px" id="creditostotal">
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
            <tr class="bg-custom" :key="'docentes' + docente.apelido">
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
              <td style="width: 50px">
                {{ docente.cred1 + docente.cred2 }}
              </td>
            </tr>

            <tr
              v-for="turma in docente.turmas1Semestre"
              :key="'1turmas' + turma.id + docente.apelido"
            >
              <td style="width: 130px"></td>
              <td style="width: 25px">
                {{ turma.periodo }}
              </td>
              <td style="width: 80px">
                {{ turma.disciplinaCodigo }}
              </td>
              <td style="width: 300px" class="t-start">
                {{ turma.disciplinaNome }}
              </td>
              <td style="width: 25px">
                {{ turma.letra }}
              </td>
              <td style="width: 180px">
                <span v-for="horario in Horarios" :key="horario.id">
                  {{ horario.id === turma.Horario1 ? horario.horario : "" }}
                  {{
                    horario.id === turma.Horario2 ? " / " + horario.horario : ""
                  }}
                </span>
              </td>

              <td style="width: 35px">
                <span v-if="turma.periodo === 1">
                  {{
                    turma.Docente1 > 0 && turma.Docente2 > 0
                      ? (turma.disciplinaCargaTeorica +
                          turma.disciplinaCargaPratica) /
                        2
                      : turma.disciplinaCargaTeorica +
                        turma.disciplinaCargaPratica
                  }}
                </span>
              </td>

              <td style="width:35px">
                <span v-if="turma.periodo === 3"
                  >{{
                    turma.Docente1 > 0 && turma.Docente2 > 0
                      ? (turma.disciplinaCargaTeorica +
                          turma.disciplinaCargaPratica) /
                        2
                      : turma.disciplinaCargaTeorica +
                        turma.disciplinaCargaPratica
                  }}
                </span>
              </td>

              <td style="width: 50px"></td>
            </tr>

            <tr
              v-for="carga in docente.cargasPos1Semestre"
              :key="'1cargaPos' + carga.id + docente.id"
            >
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

              <td style="width: 50px"></td>
            </tr>

            <tr
              v-for="turma in docente.turmas2Semestre"
              :key="'2turmas' + turma.id + docente.apelido"
            >
              <td style="width: 130px"></td>
              <td style="width: 25px">
                {{ turma.periodo }}
              </td>
              <td style="width: 80px">
                {{ turma.disciplinaCodigo }}
              </td>
              <td style="width: 300px" class="t-start">
                {{ turma.disciplinaNome }}
              </td>
              <td style="width: 25px">
                {{ turma.letra }}
              </td>
              <td style="width: 180px">
                <span v-for="horario in Horarios" :key="horario.id">
                  {{ horario.id === turma.Horario1 ? horario.horario : "" }}
                  {{
                    horario.id === turma.Horario2 ? " / " + horario.horario : ""
                  }}
                </span>
              </td>

              <td style="width: 35px">
                <span v-if="turma.periodo === 1">
                  {{
                    turma.Docente1 > 0 && turma.Docente2 > 0
                      ? (turma.disciplinaCargaTeorica +
                          turma.disciplinaCargaPratica) /
                        2
                      : turma.disciplinaCargaTeorica +
                        turma.disciplinaCargaPratica
                  }}
                </span>
              </td>

              <td style="width:35px">
                <span v-if="turma.periodo === 3"
                  >{{
                    turma.Docente1 > 0 && turma.Docente2 > 0
                      ? (turma.disciplinaCargaTeorica +
                          turma.disciplinaCargaPratica) /
                        2
                      : turma.disciplinaCargaTeorica +
                        turma.disciplinaCargaPratica
                  }}
                </span>
              </td>

              <td style="width: 50px"></td>
            </tr>

            <tr
              v-for="carga in docente.cargasPos2Semestre"
              :key="'2cargaPos' + carga.id + docente.id"
            >
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

              <td style="width: 50px"></td>
            </tr>
          </template>

          <template
            v-if="turmasSemAlocacao().length > 0 && docenteSemAlocacao.ativado"
          >
            <tr class="bg-custom">
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
              <td style="width: 50px"></td>
            </tr>
            <tr
              v-for="turma in turmasSemAlocacao()"
              :key="'semAlocacao' + turma.id"
            >
              <td style="width: 130px"></td>
              <td style="width: 25px">
                {{ turma.periodo }}
              </td>
              <td style="width: 80px">
                {{ turma.disciplinaCodigo }}
              </td>
              <td style="width: 300px" class="t-start">
                {{ turma.disciplinaNome }}
              </td>
              <td style="width: 25px">
                {{ turma.letra }}
              </td>
              <td style="width:180px">
                <span v-for="horario in Horarios" :key="horario.id">
                  {{ horario.id === turma.Horario1 ? horario.horario : "" }}
                  {{
                    horario.id === turma.Horario2 ? " / " + horario.horario : ""
                  }}
                </span>
              </td>

              <td style="width: 35px">
                <span v-if="turma.periodo === 1">
                  {{
                    turma.Docente1 > 0 && turma.Docente2 > 0
                      ? (turma.disciplinaCargaTeorica +
                          turma.disciplinaCargaPratica) /
                        2
                      : turma.disciplinaCargaTeorica +
                        turma.disciplinaCargaPratica
                  }}
                </span>
              </td>

              <td style="width: 35px">
                <span v-if="turma.periodo === 3">
                  {{
                    turma.Docente1 > 0 && turma.Docente2 > 0
                      ? (turma.disciplinaCargaTeorica +
                          turma.disciplinaCargaPratica) /
                        2
                      : turma.disciplinaCargaTeorica +
                        turma.disciplinaCargaPratica
                  }}
                </span>
              </td>

              <td style="width: 50px"></td>
            </tr>
          </template>
        </template>
      </BaseTable>
    </div>

    <!-- MODAL FILTROS -->
    <BaseModal
      ref="modalFiltros"
      :modalOptions="{
        type: 'filtros',
        title: 'Filtros',
        hasFooter: true,
      }"
      @btn-ok="btnOkFiltros()"
      @select-all="modalSelectAll[tabAtivaModal]"
      @select-none="modalSelectNone[tabAtivaModal]"
    >
      <template #modal-body>
        <NavTab
          :currentTab="tabAtivaModal"
          :allTabs="['Docentes']"
          @change-tab="tabAtivaModal = $event"
        />

        <div class="div-table">
          <BaseTable
            v-show="tabAtivaModal === 'Docentes'"
            :tableType="'modal-table'"
            :hasSearchBar="true"
          >
            <template #thead-search>
              <input
                type="text"
                class="form-control input-search"
                placeholder="Pesquise o nome de um docente..."
                v-model="searchDocentes"
              />
              <button @click="clearSearchDocentes()" class="btn btn-search">
                <i class="fas fa-times"></i>
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
                <i
                  :class="setIconByOrder(ordenacaoDocentesModal, 'apelido')"
                ></i>
              </th>
            </template>
            <template #tbody>
              <tr
                v-for="docente in DocentesOrderedModal"
                :key="'docenteModal' + docente.id"
                @click="toggleItemInArray(docente, filtroDocentes.selecionados)"
              >
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
              </tr>
              <tr
                @click="
                  docenteSemAlocacao.selecionado = !docenteSemAlocacao.selecionado
                "
              >
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
              </tr>
            </template>
          </BaseTable>
        </div>
      </template>
    </BaseModal>

    <BaseModal
      ref="modalRelatorio"
      :customStyles="'width:370px'"
      :modalOptions="{
        title: 'Relátorio',
        position: 'center',
        hasBackground: true,
      }"
    >
      <template #modal-body>
        <ul class="list-relatorio list-group flex-row w-100 border-0">
          <li
            class="list-group-item clickable text-center m-0 rounded-0 col py-2"
            v-on:click="pdf(1)"
          >
            <b>Parcial</b>
          </li>
          <li
            class="list-group-item clickable text-center m-0 rounded-0 col py-2"
            v-on:click="pdf(2)"
          >
            <b>Completo</b>
          </li>
        </ul>
      </template>
    </BaseModal>

    <!-- MODAL AJUDA -->
    <BaseModal
      ref="modalAjuda"
      :modalOptions="{
        type: 'ajuda',
        title: 'Ajuda',
      }"
    >
      <template #modal-body>
        <ul class="list-ajuda list-group">
          <li class="list-group-item">
            <b>Para exibir conteúdo na Tabela:</b> Clique em Docentes
            <i
              class="fas fa-list-ul cancelbtn px-1"
              style="font-size: 12px;"
            ></i>
            e selecione o(s) professor(es) que deseja ver, em seguida confirme
            em OK. Caso queira ver todos basta clicar em Selecionar Todos.
          </li>
          <li class="list-group-item">
            <b>Para gerar relatório:</b> Clique no botão Relatório
            <i
              class="far fa-file-pdf relatbtn px-1"
              style="font-size: 12px;"
            ></i>
            e selecione se deseja o relatório completo, com todos os docentess,
            ou apenas o relatório parcial, com os docentes selecionados.
          </li>
        </ul>
      </template>
    </BaseModal>
  </div>
</template>

<script>
import _ from "lodash";
import pdfs from "@/common/services/pdfs";
import {
  toggleOrdination,
  toggleItemInArray,
  loadingHooks,
} from "@/mixins/index.js";
import {
  PageTitle,
  BaseTable,
  NavTab,
  BaseModal,
  BaseButton,
} from "@/components/index.js";

export default {
  name: "DashboardCargaProfessores",
  mixins: [toggleOrdination, toggleItemInArray, loadingHooks],
  components: { PageTitle, BaseTable, NavTab, BaseModal, BaseButton },
  data() {
    return {
      tabAtivaModal: "Docentes",
      searchDocentes: "",
      ordenacaoDocentesModal: { order: "apelido", type: "asc" },
      orednacaoDocentesMain: { order: "apelido", type: "asc" },
      filtroDocentes: {
        ativados: [],
        selecionados: [],
      },
      docenteSemAlocacao: {
        ativado: true,
        selecionado: true,
      },
      modalSelectAll: {
        Docentes: () => {
          this.filtroDocentes.selecionados = [...this.Docentes];
          this.docenteSemAlocacao.selecionado = true;
        },
      },
      modalSelectNone: {
        Docentes: () => {
          this.filtroDocentes.selecionados.length = 0;
          this.docenteSemAlocacao.selecionado = false;
        },
      },
    };
  },
  mounted() {
    this.activeAllFiltros();
  },
  methods: {
    openAsideModal(modalName) {
      if (modalName === "filtros") {
        this.$refs.modalFiltros.toggle();
        this.$refs.modalAjuda.close();
      } else if (modalName === "ajuda") {
        this.$refs.modalAjuda.toggle();
        this.$refs.modalFiltros.close();
      }
    },
    activeAllFiltros() {
      this.modalSelectAll.Docentes();
      this.filtroDocentes.ativados = [...this.filtroDocentes.selecionados];
      this.docenteSemAlocacao.ativado = this.docenteSemAlocacao.selecionado;
    },
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
    btnOkFiltros() {
      this.filtroDocentes.ativados = [...this.filtroDocentes.selecionados];
      this.docenteSemAlocacao.ativado = this.docenteSemAlocacao.selecionado;
      this.clearSearchDocentes();
    },
    turmaInDocentes(docente) {
      const turmasResultantes = [];

      _.forEach(this.Turmas, (turma) => {
        if (turma.Docente1 === docente.id || turma.Docente2 === docente.id) {
          const DisciplinaFounded = _.find(
            this.Disciplinas,
            (disciplina) => disciplina.id === turma.Disciplina
          );

          if (DisciplinaFounded) {
            turmasResultantes.push({
              ...turma,
              disciplinaNome: DisciplinaFounded.nome,
              disciplinaCodigo: DisciplinaFounded.codigo,
              disciplinaCargaTeorica: DisciplinaFounded.cargaTeorica,
              disciplinaCargaPratica: DisciplinaFounded.cargaPratica,
            });
          }
        }
      });

      return _.orderBy(turmasResultantes, ["Disciplina", "letra"]);
    },
    turmasInDocentes1Semestre(docente) {
      return _.filter(
        this.turmaInDocentes(docente),
        (turma) => turma.periodo == 1 || turma.periodo == 2
      );
    },
    turmasInDocentes2Semestre(docente) {
      return _.filter(
        this.turmaInDocentes(docente),
        (turma) => turma.periodo == 3 || turma.periodo == 4
      );
    },
    turmasSemAlocacao() {
      const turmasResultantes = [];

      _.forEach(this.Turmas, (turma) => {
        if (
          turma.Docente1 == null &&
          turma.Docente2 == null &&
          turma.Disciplina != null
        ) {
          const disciplinaFounded = _.find(
            this.Disciplinas,
            (disciplina) => turma.Disciplina === disciplina.id
          );

          if (disciplinaFounded)
            turmasResultantes.push({
              ...turma,
              disciplinaNome: disciplinaFounded.nome,
              disciplinaCodigo: disciplinaFounded.codigo,
              disciplinaCargaTeorica: disciplinaFounded.cargaTeorica,
              disciplinaCargaPratica: disciplinaFounded.cargaPratica,
            });
        }
      });

      return _.orderBy(turmasResultantes, ["periodo", "Disciplina", "letra"]);
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
      return _.filter(this.CargasPos(docenteId), function(carga) {
        return carga.trimestre == 1 || carga.trimestre == 2;
      });
    },
    getCargasPosDocente(docenteId, trimestres) {
      return _.filter(
        this.CargasPos,
        (carga) =>
          trimestres.indexOf(carga.trimestre) != -1 &&
          carga.Docente === docenteId
      );
    },
    clearSearchDocentes() {
      this.searchDocentes = "";
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
        this.DocentesFiltredMain,
        this.orednacaoDocentesMain.order,
        this.orednacaoDocentesMain.type
      );
    },
    DocentesFiltredMain() {
      return _.filter(this.DocentesInCreditos, (docente) => {
        const docenteFoundedIndex = _.findIndex(
          this.filtroDocentes.ativados,
          (docenteAtivado) => docenteAtivado.id === docente.id
        );

        return docenteFoundedIndex !== -1;
      });
    },
    DocentesOrderedModal() {
      return _.orderBy(
        this.DocentesFiltredModal,
        this.ordenacaoDocentesModal.order,
        this.ordenacaoDocentesModal.type
      );
    },
    DocentesFiltredModal() {
      if (this.searchDocentes === "") return this.Docentes;

      const searchNormalized = this.normalizeText(this.searchDocentes);

      return this.Docentes.filter((docente) => {
        const docenteApelido = this.normalizeText(docente.apelido);

        return docenteApelido.match(searchNormalized);
      });
    },
    DocentesInCreditos() {
      return this.Docentes.map((docente) => {
        const creditos = this.calculaCreditos(docente);
        return {
          ...docente,
          cred1: creditos.periodo1,
          cred2: creditos.periodo2,
          turmas1Semestre: this.turmasInDocentes1Semestre(docente),
          turmas2Semestre: this.turmasInDocentes2Semestre(docente),
          cargasPos1Semestre: this.getCargasPosDocente(docente.id, [1, 2]),
          cargasPos2Semestre: this.getCargasPosDocente(docente.id, [3, 4]),
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
    isLoading() {
      return this.$store.state.isLoading;
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
.list-relatorio .list-group-item:hover {
  text-decoration: underline;
  background-color: #ebebeb;
}
</style>
