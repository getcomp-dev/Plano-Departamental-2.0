<template>
  <div class="main-component row p-0">
    <PageHeader :title="'Carga Professores'">
      <BaseButton
        title="Filtros"
        :type="'icon'"
        :color="'gray'"
        @click="toggleAsideModal('filtros')"
      >
        <font-awesome-icon :icon="['fas', 'list-ul']" />
      </BaseButton>

      <BaseButton
        title="Relatório"
        :type="'icon'"
        :color="'gray'"
        @click="toggleAsideModal('relatorio')"
      >
        <font-awesome-icon :icon="['fas', 'file-alt']" />
      </BaseButton>

      <BaseButton
        title="Ajuda"
        :type="'icon'"
        :color="'lightblue'"
        @click="toggleAsideModal('ajuda')"
      >
        <font-awesome-icon :icon="['fas', 'question']" />
      </BaseButton>
    </PageHeader>

    <div class="div-table">
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
          <th style="width: 25px" title="Semestre">S.</th>
          <th style="width: 80px">Código</th>
          <th style="width: 300px" class="t-start">Disciplina</th>
          <th style="width: 35px" class="less-padding" title="Turma">T.</th>
          <th style="width: 130px">Horário</th>
          <th
            style="width: 35px"
            class="less-padding"
            title="Somatório dos créditos no 1º semestre"
            v-if="semestre1IsActived"
          >
            CS1
          </th>
          <th
            style="width: 35px"
            class="less-padding"
            title="Somatório dos créditos no 2º semestre"
            v-if="semestre2IsActived"
          >
            CS2
          </th>
          <th
            style="width: 50px"
            title="Somatório total dos créditos"
            v-if="semestre1IsActived && semestre2IsActived"
          >
            CTotal
          </th>
        </template>
        <template #tbody>
          <template v-for="docente in DocentesOrderedMain">
            <tr class="bg-custom" :key="'docente' + docente.id">
              <td style="width: 130px" class="t-start">
                {{ docente.apelido }}
              </td>
              <td style="width: 25px"></td>
              <td style="width: 80px" class="less-padding"></td>
              <td style="width: 300px" class="t-start"></td>
              <td style="width: 35px" class="less-padding"></td>
              <td style="width: 130px"></td>
              <td
                style="width: 35px"
                class="less-padding"
                v-if="semestre1IsActived"
              >
                {{ docente.cred1 }}
              </td>
              <td
                style="width: 35px"
                class="less-padding"
                v-if="semestre2IsActived"
              >
                {{ docente.cred2 }}
              </td>
              <td
                style="width: 50px"
                class="less-padding"
                v-if="semestre1IsActived && semestre2IsActived"
              >
                {{ docente.cred1 + docente.cred2 }}
              </td>
            </tr>

            <tr
              v-for="turma in docente.Turmas1Semestre"
              :key="'turmas' + turma.id + turma.periodo + docente.apelido"
            >
              <td style="width: 130px"></td>
              <td style="width: 25px">{{ turma.periodo }}</td>
              <td style="width: 80px" class="less-padding">
                {{ turma.disciplina.codigo }}
              </td>
              <td style="width: 300px" class="t-start">
                {{ turma.disciplina.nome }}
              </td>
              <td style="width: 35px" class="less-padding">
                {{ turma.letra }}
              </td>
              <td style="width: 130px">
                {{ generateHorariosText(turma.Horario1, turma.Horario2) }}
              </td>
              <td
                style="width: 35px"
                class="less-padding"
                v-if="semestre1IsActived"
              >
                {{
                  turma.periodo === 1 || turma.periodo === 2
                    ? turma.creditosDaTurma
                    : ""
                }}
              </td>
              <td
                style="width:35px"
                class="less-padding"
                v-if="semestre2IsActived"
              >
                {{
                  turma.periodo === 3 || turma.periodo === 4
                    ? turma.creditosDaTurma
                    : ""
                }}
              </td>

              <td
                style="width: 50px"
                v-if="semestre1IsActived && semestre2IsActived"
              ></td>
            </tr>

            <tr
              v-for="carga in docente.CargasPos1Semestre"
              :key="'cp' + carga.id + carga.trimestre + docente.id"
            >
              <td style="width: 130px"></td>
              <td style="width: 25px">{{ carga.trimestre }}</td>
              <td style="width: 80px" class="less-padding"></td>
              <td style="width: 300px" class="t-start upper-case">
                Disciplina do {{ carga.programa }}
              </td>
              <td style="width: 35px" class="less-padding"></td>
              <td style="width: 130px"></td>
              <td
                style="width: 35px"
                class="less-padding"
                v-if="semestre1IsActived"
              >
                {{
                  carga.trimestre == 1 || carga.trimestre == 2
                    ? carga.creditos
                    : ""
                }}
              </td>
              <td
                style="width: 35px"
                class="less-padding"
                v-if="semestre2IsActived"
              >
                {{
                  carga.trimestre == 3 || carga.trimestre == 4
                    ? carga.creditos
                    : ""
                }}
              </td>
              <td
                style="width: 50px"
                v-if="semestre1IsActived && semestre2IsActived"
              ></td>
            </tr>

            <tr
              v-for="turma in docente.Turmas2Semestre"
              :key="'turmas' + turma.id + turma.periodo + docente.apelido"
            >
              <td style="width: 130px"></td>
              <td style="width: 25px">{{ turma.periodo }}</td>
              <td style="width: 80px" class="less-padding">
                {{ turma.disciplina.codigo }}
              </td>
              <td style="width: 300px" class="t-start">
                {{ turma.disciplina.nome }}
              </td>
              <td style="width: 35px" class="less-padding">
                {{ turma.letra }}
              </td>
              <td style="width: 130px">
                {{ generateHorariosText(turma.Horario1, turma.Horario2) }}
              </td>
              <td
                style="width: 35px"
                class="less-padding"
                v-if="semestre1IsActived"
              >
                {{
                  turma.periodo === 1 || turma.periodo === 2
                    ? turma.creditosDaTurma
                    : ""
                }}
              </td>
              <td
                style="width:35px"
                class="less-padding"
                v-if="semestre2IsActived"
              >
                {{
                  turma.periodo === 3 || turma.periodo === 4
                    ? turma.creditosDaTurma
                    : ""
                }}
              </td>
              <td
                style="width: 50px"
                v-if="semestre1IsActived && semestre2IsActived"
              ></td>
            </tr>

            <tr
              v-for="carga in docente.CargasPos2Semestre"
              :key="'2cargaPos' + carga.id + docente.id"
            >
              <td style="width: 130px"></td>
              <td style="width: 25px">{{ carga.trimestre }}</td>
              <td style="width: 80px" class="less-padding"></td>
              <td style="width: 300px" class="t-start upper-case">
                Disciplina do {{ carga.programa }}
              </td>
              <td style="width: 35px" class="less-padding"></td>
              <td style="width: 130px"></td>
              <td
                style="width: 35px"
                class="less-padding"
                v-if="semestre1IsActived"
              >
                {{
                  carga.trimestre == 1 || carga.trimestre == 2
                    ? carga.creditos
                    : ""
                }}
              </td>
              <td
                style="width: 35px"
                class="less-padding"
                v-if="semestre2IsActived"
              >
                {{
                  carga.trimestre == 3 || carga.trimestre == 4
                    ? carga.creditos
                    : ""
                }}
              </td>
              <td
                style="width: 50px"
                v-if="semestre1IsActived && semestre2IsActived"
              ></td>
            </tr>
          </template>

          <template
            v-if="
              turmasSemAlocacaoFiltred.length &&
                filtroDocenteSemAlocacao.ativado
            "
          >
            <tr class="bg-custom">
              <td style="width: 130px" class="t-start">SEM ALOCAÇÃO</td>
              <td style="width: 25px"></td>
              <td style="width: 80px" class="less-padding"></td>
              <td style="width: 300px"></td>
              <td style="width: 35px" class="less-padding"></td>
              <td style="width: 130px"></td>
              <td style="width: 35px" v-if="semestre1IsActived"></td>
              <td style="width: 35px" v-if="semestre2IsActived"></td>
              <td
                style="width: 50px"
                v-if="semestre1IsActived && semestre2IsActived"
              ></td>
            </tr>
            <tr
              v-for="turma in turmasSemAlocacaoFiltred"
              :key="'semAlocacao' + turma.id"
            >
              <td style="width: 130px"></td>
              <td style="width: 25px">{{ turma.periodo }}</td>
              <td style="width: 80px" class="less-padding">
                {{ turma.disciplina.codigo }}
              </td>
              <td style="width: 300px" class="t-start">
                {{ turma.disciplina.nome }}
              </td>
              <td style="width: 35px" class="less-padding">
                {{ turma.letra }}
              </td>
              <td style="width:130px">
                {{ generateHorariosText(turma.Horario1, turma.Horario2) }}
              </td>
              <td
                style="width: 35px"
                class="less-padding"
                v-if="semestre1IsActived"
              >
                <span v-if="turma.periodo === 1">
                  {{
                    turma.Docente1 > 0 && turma.Docente2 > 0
                      ? turma.disciplina.creditoTotal / 2
                      : turma.disciplina.creditoTotal
                  }}
                </span>
              </td>
              <td
                style="width: 35px"
                class="less-padding"
                v-if="semestre2IsActived"
              >
                <span v-if="turma.periodo === 3">
                  {{
                    turma.Docente1 > 0 && turma.Docente2 > 0
                      ? turma.disciplina.creditoTotal / 2
                      : turma.disciplina.creditoTotal
                  }}
                </span>
              </td>
              <td
                style="width: 50px"
                v-if="semestre1IsActived && semestre2IsActived"
              ></td>
            </tr>
          </template>

          <tr
            v-show="
              !filtroDocenteSemAlocacao.ativado && !DocentesOrderedMain.length
            "
          >
            <td colspan="6" style="width:750px">
              <b>Nenhum docente encontrado.</b> Clique no botão de filtros
              <i class="fas fa-list-ul mx-1"></i> para selecioná-los.
            </td>
            <td
              style="width: 35px"
              v-if="semestre1IsActived"
              class="borderX-0"
            ></td>
            <td
              style="width: 35px"
              v-if="semestre2IsActived"
              class="borderX-0"
            ></td>
            <td
              style="width: 50px"
              v-if="semestre1IsActived && semestre2IsActived"
              class="borderX-0"
            ></td>
          </tr>
        </template>
      </BaseTable>
    </div>

    <ModalFiltros
      ref="modalFiltros"
      :callbacks="modalFiltrosCallbacks"
      :tabsOptions="modalFiltrosTabs"
    >
      <div class="div-table">
        <BaseTable
          v-show="modalFiltrosTabs.current === 'Docentes'"
          :type="'modal'"
          :hasSearchBar="true"
        >
          <template #thead-search>
            <InputSearch
              v-model="searchDocentes"
              placeholder="Pesquise o nome de um docente..."
            />
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
                filtroDocenteSemAlocacao.selecionado = !filtroDocenteSemAlocacao.selecionado
              "
            >
              <td style="width: 25px;">
                <input
                  type="checkbox"
                  v-model="filtroDocenteSemAlocacao.selecionado"
                  class="form-check-input position-static m-0"
                />
              </td>
              <td style="width: 425px;" class="t-start">SEM ALOCAÇÃO</td>
            </tr>
          </template>
        </BaseTable>
        <BaseTable
          v-show="modalFiltrosTabs.current === 'Semestres'"
          :type="'modal'"
        >
          <template #thead>
            <th style="width: 25px"></th>
            <th class="t-start clickable" style="width: 425px">
              Semestre Letivo
            </th>
          </template>
          <template #tbody>
            <tr @click="filtroSemestres.primeiro = !filtroSemestres.primeiro">
              <td style="width: 25px">
                <input
                  type="checkbox"
                  class="form-check-input position-static m-0"
                  v-model="filtroSemestres.primeiro"
                />
              </td>
              <td style="width: 425px" class="t-start">PRIMEIRO</td>
            </tr>
            <tr @click="filtroSemestres.segundo = !filtroSemestres.segundo">
              <td style="width: 25px">
                <input
                  type="checkbox"
                  class="form-check-input position-static m-0"
                  v-model="filtroSemestres.segundo"
                />
              </td>
              <td style="width: 425px" class="t-start">SEGUNDO</td>
            </tr>
          </template>
        </BaseTable>
      </div>
    </ModalFiltros>

    <ModalRelatorio ref="modalRelatorio" @selection-option="pdf($event)" />

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Visualizar carga por professor:</b>
        Clique no ícone filtros
        <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" />. Em
        seguida, utilize as abas para navegar entre os filtros. Selecione as
        informações que deseja visualizar e clique em OK.
      </li>
      <li class="list-group-item">
        <b>Relatório:</b>
        Clique no ícone relatório
        <font-awesome-icon :icon="['fas', 'file-alt']" class="icon-gray" />. Em
        seguida, indique se deseja gerar o relatório completo com a distribuição
        das disciplinas para todos os professores ou o relatório parcial com as
        informações exibidas na tela.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import pdfs from "@/common/services/pdfs";
import { normalizeText } from "@/common/utils";
import {
  toggleOrdination,
  toggleItemInArray,
  generateHorariosText,
  toggleAsideModal,
} from "@/common/mixins";
import { InputSearch } from "@/components/ui";
import { ModalAjuda, ModalRelatorio, ModalFiltros } from "@/components/modals";

export default {
  name: "DashboardCargaProfessores",
  mixins: [
    toggleOrdination,
    toggleItemInArray,
    generateHorariosText,
    toggleAsideModal,
  ],
  components: {
    ModalRelatorio,
    ModalAjuda,
    ModalFiltros,
    InputSearch,
  },
  data() {
    return {
      searchDocentes: "",
      asideModalsRefs: ["modalFiltros", "modalAjuda", "modalRelatorio"],
      orednacaoDocentesMain: { order: "apelido", type: "asc" },
      ordenacaoDocentesModal: { order: "apelido", type: "asc" },
      filtroDocentes: {
        ativados: [],
        selecionados: [],
      },
      filtroDocenteSemAlocacao: {
        ativado: true,
        selecionado: true,
      },
      filtroSemestres: {
        primeiro: true,
        segundo: true,
        ativo: 3,
      },
      modalFiltrosTabs: {
        current: "Docentes",
        array: ["Docentes", "Semestres"],
      },
      modalFiltrosCallbacks: {
        selectAll: {
          Docentes: () => {
            this.filtroDocentes.selecionados = [...this.DocentesAtivos];
            this.filtroDocenteSemAlocacao.selecionado = true;
          },
          Semestres: () => {
            this.filtroSemestres.primeiro = true;
            this.filtroSemestres.segundo = true;
          },
        },
        selectNone: {
          Docentes: () => {
            this.filtroDocentes.selecionados.length = 0;
            this.filtroDocenteSemAlocacao.selecionado = false;
          },
          Semestres: () => {
            this.filtroSemestres.primeiro = false;
            this.filtroSemestres.segundo = false;
          },
        },
        btnOk: () => {
          this.setSemestreAtivo();
          this.filtroDocentes.ativados = [...this.filtroDocentes.selecionados];
          this.filtroDocenteSemAlocacao.ativado = this.filtroDocenteSemAlocacao.selecionado;
        },
      },
    };
  },

  beforeMount() {
    this.modalFiltrosCallbacks.selectAll.Docentes();
    this.filtroDocentes.ativados = [...this.filtroDocentes.selecionados];
    this.filtroDocenteSemAlocacao.ativado = this.filtroDocenteSemAlocacao.selecionado;
  },

  methods: {
    setSemestreAtivo() {
      const { primeiro, segundo } = this.filtroSemestres;

      if (primeiro && !segundo) this.filtroSemestres.ativo = 1;
      else if (!primeiro && segundo) this.filtroSemestres.ativo = 2;
      else if (primeiro && segundo) this.filtroSemestres.ativo = 3;
      else this.filtroSemestres.ativo = undefined;
    },
    pdf(completo) {
      if (completo)
        pdfs.pdfCargaProfessores({
          Docentes: this.DocentesAtivos,
          SemAlocacao: true,
        });
      else
        pdfs.pdfCargaProfessores({
          Docentes: this.filtroDocentes.ativados,
          SemAlocacao: this.filtroDocenteSemAlocacao.ativado,
        });
    },

    turmaInDocentes(docenteId) {
      let Turmas1Semestre = [];
      let Turmas2Semestre = [];
      let totalCreditos1Semestre = 0;
      let totalCreditos2Semestre = 0;

      this.$_.forEach(this.TurmasInDisciplinasPerfis, (turma) => {
        if (turma.Docente1 === docenteId || turma.Docente2 === docenteId) {
          let creditosDaTurma = 0;

          if (
            turma.Docente1 > 0 &&
            turma.Docente2 > 0 &&
            turma.Docente1 != turma.Docente2
          )
            creditosDaTurma += turma.disciplina.creditoTotal / 2;
          else creditosDaTurma += turma.disciplina.creditoTotal;

          if (turma.periodo === 1 || turma.periodo === 2) {
            Turmas1Semestre.push({ ...turma, creditosDaTurma });
            totalCreditos1Semestre += creditosDaTurma;
          } else {
            Turmas2Semestre.push({ ...turma, creditosDaTurma });
            totalCreditos2Semestre += creditosDaTurma;
          }
        }
      });

      Turmas1Semestre = this.$_.orderBy(Turmas1Semestre, [
        "Disciplina",
        "letra",
      ]);
      Turmas2Semestre = this.$_.orderBy(Turmas2Semestre, [
        "Disciplina",
        "letra",
      ]);

      return {
        totalCreditos1Semestre,
        totalCreditos2Semestre,
        Turmas1Semestre,
        Turmas2Semestre,
      };
    },
    cargaPosInDocentes(docenteId) {
      let totalCreditos1Semestre = 0;
      let totalCreditos2Semestre = 0;
      const CargasPos1Semestre = [];
      const CargasPos2Semestre = [];

      this.$_.forEach(this.CargasPos, (carga) => {
        if (carga.Docente === docenteId) {
          const creditosDaCarga = parseFloat(carga.creditos) || 0;

          if (carga.trimestre == 1 || carga.trimestre == 2) {
            totalCreditos1Semestre += creditosDaCarga;
            CargasPos1Semestre.push({ ...carga });
          } else {
            totalCreditos2Semestre += creditosDaCarga;
            CargasPos2Semestre.push({ ...carga });
          }
        }
      });

      return {
        totalCreditos1Semestre,
        totalCreditos2Semestre,
        CargasPos1Semestre,
        CargasPos2Semestre,
      };
    },
  },

  computed: {
    ...mapGetters([
      "DocentesAtivos",
      "AllHorarios",
      "TurmasInDisciplinasPerfis",
    ]),
    // table main
    DocentesOrderedMain() {
      return this.$_.orderBy(
        this.DocentesFiltredByDocenteMain,
        this.orednacaoDocentesMain.order,
        this.orednacaoDocentesMain.type
      );
    },
    DocentesFiltredByDocenteMain() {
      return this.$_.filter(this.DocentesFiltredBySemestreMain, (docente) => {
        const docenteFoundedIndex = this.$_.findIndex(
          this.filtroDocentes.ativados,
          (docenteAtivado) => docenteAtivado.id === docente.id
        );

        return docenteFoundedIndex !== -1;
      });
    },
    DocentesFiltredBySemestreMain() {
      return this.$_.map(this.DocentesInTurmas, (docente) => {
        const docenteFiltred = { ...docente };

        if (!this.semestre1IsActived) {
          docenteFiltred.Turmas1Semestre = [];
          docenteFiltred.CargasPos1Semestre = [];
        }
        if (!this.semestre2IsActived) {
          docenteFiltred.Turmas2Semestre = [];
          docenteFiltred.CargasPos2Semestre = [];
        }
        return docenteFiltred;
      });
    },
    DocentesInTurmas() {
      return this.DocentesAtivos.map((docente) => {
        const turmaInDocentesResult = this.turmaInDocentes(docente.id);
        const cargaPosInDocentesResult = this.cargaPosInDocentes(docente.id);

        const cred1 =
          cargaPosInDocentesResult.totalCreditos1Semestre +
          turmaInDocentesResult.totalCreditos1Semestre;
        const cred2 =
          cargaPosInDocentesResult.totalCreditos2Semestre +
          turmaInDocentesResult.totalCreditos2Semestre;

        const { Turmas1Semestre, Turmas2Semestre } = turmaInDocentesResult;
        const {
          CargasPos1Semestre,
          CargasPos2Semestre,
        } = cargaPosInDocentesResult;

        return {
          ...docente,
          cred1,
          cred2,
          Turmas1Semestre,
          Turmas2Semestre,
          CargasPos1Semestre,
          CargasPos2Semestre,
        };
      });
    },

    turmasSemAlocacao() {
      let turmasResultantes = [];

      turmasResultantes = this.$_.filter(
        this.TurmasInDisciplinasPerfis,
        (turma) =>
          turma.Docente1 == null &&
          turma.Docente2 == null &&
          turma.Disciplina != null
      );

      return this.$_.orderBy(turmasResultantes, [
        "periodo",
        "Disciplina",
        "letra",
      ]);
    },
    turmasSemAlocacaoFiltred() {
      return this.$_.filter(this.turmasSemAlocacao, (turma) => {
        switch (this.filtroSemestres.ativo) {
          case 1:
            return turma.periodo === 1;
          case 2:
            return turma.periodo === 2;
          case 3:
            return true;
          default:
            return false;
        }
      });
    },
    // tables modal
    DocentesOrderedModal() {
      return this.$_.orderBy(
        this.DocentesFiltredModal,
        this.ordenacaoDocentesModal.order,
        this.ordenacaoDocentesModal.type
      );
    },
    DocentesFiltredModal() {
      if (this.searchDocentes === "") return this.DocentesAtivos;

      const searchNormalized = normalizeText(this.searchDocentes);

      return this.DocentesAtivos.filter((docente) => {
        const docenteApelido = normalizeText(docente.apelido);

        return docenteApelido.match(searchNormalized);
      });
    },
    CargasPos() {
      return this.$store.state.cargaPos.Cargas;
    },
    // outros
    semestre1IsActived() {
      const { ativo } = this.filtroSemestres;
      return ativo === 1 || ativo === 3;
    },
    semestre2IsActived() {
      const { ativo } = this.filtroSemestres;
      return ativo === 2 || ativo === 3;
    },
  },
};
</script>
