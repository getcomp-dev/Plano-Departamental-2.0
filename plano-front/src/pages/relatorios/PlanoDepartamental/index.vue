<template>
  <div class="main-component row p-0">
    <PageHeader :title="'Plano Departamental'">
      <BaseButton
        title="Filtros"
        :type="'icon'"
        :color="'gray'"
        @click="toggleAsideModal('filtros')"
      >
        <font-awesome-icon :icon="['fas', 'list-ul']" />
      </BaseButton>

      <BaseButton
        title="Relátorio"
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
            class="clickable"
            style="width: 80px"
            @click="toggleOrder(ordenacaoMain.disciplinas, 'codigo')"
          >
            Código
            <i :class="setIconByOrder(ordenacaoMain.disciplinas, 'codigo')"></i>
          </th>
          <th
            class="t-start clickable"
            style="width: 350px;"
            @click="toggleOrder(ordenacaoMain.disciplinas, 'nome')"
          >
            Nome
            <i :class="setIconByOrder(ordenacaoMain.disciplinas, 'nome')"></i>
          </th>
          <th
            class="clickable"
            style="width: 80px"
            @click="toggleOrder(ordenacaoMain.disciplinas, 'perfil.abreviacao')"
          >
            Perfil
            <i
              :class="
                setIconByOrder(ordenacaoMain.disciplinas, 'perfil.abreviacao')
              "
            ></i>
          </th>
          <th style="width: 25px" title="Semestre">S.</th>
          <th style="width: 35px" title="Turma">T.</th>
          <th style="width: 150px">Docentes</th>
          <th style="width: 130px" class="less-padding">Horário</th>

          <th
            v-if="semestre1IsActived"
            title="Somatório das vagas no 1º semestre"
            style="width: 40px"
            class="less-padding"
          >
            VS1
          </th>
          <th
            v-if="semestre2IsActived"
            title="Somatório das vagas no 2º semestre"
            style="width: 40px"
            class="less-padding"
          >
            VS2
          </th>
          <th
            v-if="semestre1IsActived && semestre2IsActived"
            title="Somatório total das vagas"
            style="width: 45px"
            class="less-padding"
          >
            VTotal
          </th>
        </template>

        <template #tbody>
          <tr v-show="DisciplinasInTurmasOrdered.length" class="bg-total-vg">
            <td style="width: 80px"></td>
            <td style="width: 350px" class="upper-case">Total de vagas</td>
            <td style="width: 80px"></td>
            <td style="width: 25px"></td>
            <td style="width: 35px"></td>
            <td style="width: 150px"></td>
            <td style="width: 130px" class="less-padding"></td>
            <td style="width: 40px" v-if="semestre1IsActived">
              {{ totalVagas1Semestre }}
            </td>
            <td style="width: 40px" v-if="semestre2IsActived">
              {{ totalVagas2Semestre }}
            </td>
            <td
              style="width: 45px"
              v-if="semestre1IsActived && semestre2IsActived"
            >
              {{ totalVagas1Semestre + totalVagas2Semestre }}
            </td>
          </tr>

          <template v-for="disciplina in DisciplinasInTurmasOrdered">
            <tr class="bg-custom" :key="'trDisc' + disciplina.id">
              <td style="width: 80px">{{ disciplina.codigo }}</td>
              <td style="width: 350px">{{ disciplina.nome }}</td>
              <td style="width: 80px" class="less-padding">
                {{ disciplina.perfil.abreviacao }}
              </td>
              <td style="width: 25px"></td>
              <td style="width: 35px"></td>
              <td style="width: 150px"></td>
              <td style="width: 130px" class="less-padding"></td>
              <td style="width: 40px" v-if="semestre1IsActived">
                {{
                  disciplina.vagas1Semestre === 0
                    ? ""
                    : disciplina.vagas1Semestre
                }}
              </td>
              <td style="width: 40px" v-if="semestre2IsActived">
                {{
                  disciplina.vagas2Semestre === 0
                    ? ""
                    : disciplina.vagas2Semestre
                }}
              </td>
              <td
                style="width: 45px"
                v-if="semestre1IsActived && semestre2IsActived"
              >
                {{ disciplina.vagas1Semestre + disciplina.vagas2Semestre }}
              </td>
            </tr>

            <tr
              v-for="turma in disciplina.Turmas"
              :key="'trTurma' + turma.id + disciplina.id"
            >
              <td style="width: 80px"></td>
              <td style="width: 350px"></td>
              <td style="width: 80px"></td>
              <td style="width: 25px">{{ turma.periodo }}</td>
              <td style="width: 35px" class="less-padding">
                {{ turma.letra }}
              </td>
              <td style="width: 150px">
                {{ generateDocentesText(turma.Docente1, turma.Docente2) }}
              </td>
              <td style="width: 130px" class="less-padding">
                {{ generateHorariosText(turma.Horario1, turma.Horario2) }}
              </td>
              <template v-if="semestre1IsActived">
                <td
                  v-if="turma.periodo === 1 || turma.periodo === 2"
                  @click="handleClickInTurmaVaga(turma)"
                  class="td-vagas clickable"
                  style="width: 40px"
                >
                  {{ turma.vagas }}
                </td>
                <td v-else style="width: 40px"></td>
              </template>
              <template v-if="semestre2IsActived">
                <td
                  v-if="turma.periodo === 3 || turma.periodo === 4"
                  @click="handleClickInTurmaVaga(turma)"
                  class="td-vagas clickable"
                  style="width: 40px"
                >
                  {{ turma.vagas }}
                </td>
                <td v-else style="width: 40px"></td>
              </template>
              <td
                v-if="semestre1IsActived && semestre2IsActived"
                style="width: 45px"
              ></td>
            </tr>
          </template>

          <tr v-show="!DisciplinasInTurmasOrdered.length">
            <td colspan="7" style="width: 850px">
              <b>Nenhuma disciplina encontrada.</b> Clique no botão de filtros
              <i class="fas fa-list-ul mx-1"></i> para selecioná-las.
            </td>
            <td
              style="width: 40px"
              v-if="semestre1IsActived"
              class="borderX-0"
            ></td>
            <td
              style="width: 40px"
              v-if="semestre2IsActived"
              class="borderX-0"
            ></td>
            <td
              style="width: 45px"
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
          v-show="modalFiltrosTabs.current === 'Disciplinas'"
          :type="'modal'"
          :hasSearchBar="true"
        >
          <template #thead-search>
            <InputSearch
              v-model="searchDisciplinas"
              placeholder="Pesquise o nome ou código de uma disciplina..."
            />
          </template>
          <template #thead>
            <th style="width: 25px"></th>
            <th
              title="Código"
              class="clickable"
              style="width: 70px"
              @click="toggleOrder(ordenacaoModal.disciplinas, 'codigo')"
            >
              Cód.
              <i
                :class="setIconByOrder(ordenacaoModal.disciplinas, 'codigo')"
              ></i>
            </th>
            <th
              class="t-start clickable"
              style="width: 270px"
              @click="toggleOrder(ordenacaoModal.disciplinas, 'nome')"
            >
              Nome
              <i
                :class="setIconByOrder(ordenacaoModal.disciplinas, 'nome')"
              ></i>
            </th>
            <th
              class="t-start clickable"
              style="width: 85px"
              @click="
                toggleOrder(ordenacaoModal.disciplinas, 'perfil.abreviacao')
              "
            >
              Perfil
              <i
                :class="
                  setIconByOrder(
                    ordenacaoModal.disciplinas,
                    'perfil.abreviacao'
                  )
                "
              ></i>
            </th>
          </template>
          <template #tbody>
            <tr
              v-for="disciplina in DisciplinasOrderedModal"
              :key="'MdDisciplinas' + disciplina.id"
              @click="
                toggleItemInArray(disciplina.id, filtroDisciplinas.selecionados)
              "
            >
              <td style="width: 25px">
                <input
                  type="checkbox"
                  class="form-check-input position-static m-0"
                  v-model="filtroDisciplinas.selecionados"
                  :value="disciplina.id"
                />
              </td>
              <td style="width: 70px">{{ disciplina.codigo }}</td>
              <td style="width: 270px" class="t-start">
                {{ disciplina.nome }}
              </td>
              <td style="width: 85px" class="t-start">
                {{ disciplina.perfil.abreviacao }}
              </td>
            </tr>
            <tr v-show="!DisciplinasOrderedModal.length">
              <td style="width:450px">NENHUMA DISCIPLINA ENCONTRADA.</td>
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

        <BaseTable
          :type="'modal'"
          v-show="modalFiltrosTabs.current === 'Perfis'"
        >
          <template #thead>
            <th style="width: 25px;"></th>
            <th
              @click="toggleOrder(ordenacaoModal.perfis, 'nome')"
              class="clickable t-start"
              style="width: 425px"
            >
              Nome
              <i :class="setIconByOrder(ordenacaoModal.perfis, 'nome')"></i>
            </th>
          </template>
          <template #tbody>
            <tr
              v-for="perfil in PerfisOrderedModal"
              :key="'perfilId' + perfil.id"
              @click="toggleItemInArray(perfil, filtroPerfis.selecionados)"
            >
              <td style="width: 25px">
                <input
                  type="checkbox"
                  v-model="filtroPerfis.selecionados"
                  :value="perfil"
                  class="form-check-input position-static m-0"
                />
              </td>
              <td style="width: 425px" class="t-start">{{ perfil.nome }}</td>
            </tr>
          </template>
        </BaseTable>
      </div>
    </ModalFiltros>

    <ModalVagas ref="modalVagas" :turma="turmaClicked" />

    <ModalRelatorio ref="modalRelatorio" @selection-option="pdf($event)" />

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Para exibir conteúdo na tabela:</b> Clique no ícone filtros
        <i class="fas fa-list-ul icon-gray"></i> no cabeçalho da página e na
        janela que será aberta utilize as abas para navegar entre os tipos de
        filtros. Marque em suas respectivas tabelas quais informações deseja
        visualizar, e para finalizar clique no botão OK.
      </li>
      <li class="list-group-item">
        <b>Para gerar relatório de turmas das disciplinas:</b> Clique no ícone
        relatório <i class="fas fa-file-alt icon-gray"></i> selecione se deseja
        gerar o relatório completo com todos as disciplinas, ou apenas o
        relatório parcial com as disciplinas que estão selecionados no momento.
      </li>
      <li class="list-group-item">
        <b>Para visualizar vagas das turma:</b>
        Clique no número de vagas da turma, presente na ultima coluna da tabela,
        para visualizar a alocação das vagas por cursos.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import pdfs from "@/common/services/pdfs";
import { normalizeText } from "@/common/utils";
import {
  toggleItemInArray,
  toggleOrdination,
  generateHorariosText,
  generateDocentesText,
  toggleAsideModal,
} from "@/common/mixins";
import { InputSearch } from "@/components/ui";
import { ModalRelatorio, ModalAjuda, ModalFiltros } from "@/components/modals";

import ModalVagas from "./ModalVagas";

export default {
  name: "PlanoDepartamental",
  mixins: [
    toggleItemInArray,
    toggleOrdination,
    generateHorariosText,
    generateDocentesText,
    toggleAsideModal,
  ],
  components: {
    ModalRelatorio,
    ModalFiltros,
    ModalAjuda,
    InputSearch,
    ModalVagas,
  },
  data() {
    return {
      turmaClicked: null,
      searchDisciplinas: "",
      asideModalsRefs: ["modalFiltros", "modalAjuda", "modalRelatorio"],
      ordenacaoMain: {
        disciplinas: { order: "codigo", type: "asc" },
      },
      ordenacaoModal: {
        perfis: { order: "nome", type: "asc" },
        disciplinas: { order: "codigo", type: "asc" },
      },
      filtroDisciplinas: {
        ativados: [],
        selecionados: [],
      },
      filtroPerfis: {
        selecionados: [],
      },
      filtroSemestres: {
        primeiro: true,
        segundo: true,
        ativo: 3,
      },
      modalFiltrosTabs: {
        current: "Perfis",
        array: ["Perfis", "Disciplinas", "Semestres"],
      },
      modalFiltrosCallbacks: {
        selectAll: {
          Perfis: () => {
            this.filtroPerfis.selecionados = [...this.PerfisDCC];
          },
          Disciplinas: () => {
            this.filtroDisciplinas.selecionados = [
              ...this.$_.map(
                this.DisciplinasDCCInPerfis,
                (disciplina) => disciplina.id
              ),
            ];
          },
          Semestres: () => {
            this.filtroSemestres.primeiro = true;
            this.filtroSemestres.segundo = true;
          },
        },
        selectNone: {
          Perfis: () => {
            this.filtroPerfis.selecionados = [];
          },
          Disciplinas: () => {
            this.filtroDisciplinas.selecionados = [];
          },
          Semestres: () => {
            this.filtroSemestres.primeiro = false;
            this.filtroSemestres.segundo = false;
          },
        },
        btnOk: () => {
          this.setSemestreAtivo();
          this.filtroDisciplinas.ativados = [
            ...this.filtroDisciplinas.selecionados,
          ];
        },
      },
    };
  },

  beforeMount() {
    this.modalFiltrosCallbacks.selectAll.Disciplinas();
    this.modalFiltrosCallbacks.selectAll.Perfis();
    this.filtroDisciplinas.ativados = [...this.filtroDisciplinas.selecionados];
  },

  methods: {
    setSemestreAtivo() {
      const { primeiro, segundo } = this.filtroSemestres;

      if (primeiro && !segundo) this.filtroSemestres.ativo = 1;
      else if (!primeiro && segundo) this.filtroSemestres.ativo = 2;
      else if (primeiro && segundo) this.filtroSemestres.ativo = 3;
      else this.filtroSemestres.ativo = undefined;
    },
    toggleModalRelatorio() {
      this.$refs.modalRelatorio.toggle();
    },
    handleClickInTurmaVaga(turma) {
      this.turmaClicked = turma;
      this.$refs.modalVagas.open();
    },
    pdf(completo) {
      let disciplinasSelecionadas;
      if (completo) disciplinasSelecionadas = this.DisciplinasDCCInPerfis;
      else
        disciplinasSelecionadas = this.DisciplinasInTurmasFiltredByDisciplina;

      pdfs.pdfRelatorioDisciplinas({
        disciplinasSelecionadas,
      });
    },
    getVagasByTurmaId(turmaId) {
      const pedidosInCurrentTurma = this.Pedidos[turmaId];

      return this.$_.reduce(
        pedidosInCurrentTurma,
        (sum, pedido) =>
          sum + pedido.vagasPeriodizadas + pedido.vagasNaoPeriodizadas,
        0
      );
    },
  },

  computed: {
    ...mapGetters([
      "TurmasInDisciplinasPerfis",
      "DisciplinasDCCInPerfis",
      "PerfisDCC",
    ]),

    DisciplinasInTurmasOrdered() {
      return this.$_.orderBy(
        this.DisciplinasInTurmasFiltredByDisciplina,
        this.ordenacaoMain.disciplinas.order,
        this.ordenacaoMain.disciplinas.type
      );
    },
    DisciplinasInTurmasFiltredByDisciplina() {
      return this.$_.filter(
        this.DisciplinasInTurmasFiltredBySemestre,
        (disciplina) =>
          this.$_.some(
            this.filtroDisciplinas.ativados,
            (disciplinaId) => disciplinaId === disciplina.id
          )
      );
    },
    DisciplinasInTurmasFiltredBySemestre() {
      const disciplinasResult = [];

      this.$_.forEach(this.DisciplinasInTurmas, (disciplina) => {
        const TurmasFiltred = this.$_.filter(disciplina.Turmas, (turma) => {
          switch (this.filtroSemestres.ativo) {
            case 1:
              return turma.periodo === 1 || turma.periodo === 2;
            case 2:
              return turma.periodo === 3 || turma.periodo === 4;
            case 3:
              return true;
            default:
              return false;
          }
        });

        if (TurmasFiltred.length)
          disciplinasResult.push({
            ...disciplina,
            Turmas: TurmasFiltred,
          });
      });

      return disciplinasResult;
    },
    DisciplinasInTurmas() {
      const AllTurmasOrdered = this.$_.orderBy(this.TurmasInDisciplinasPerfis, [
        "periodo",
      ]);

      return this.$_.map(this.DisciplinasDCCInPerfis, (disciplina) => {
        const Turmas = [];
        let vagas1Semestre = 0;
        let vagas2Semestre = 0;

        this.$_.forEach(AllTurmasOrdered, (turma) => {
          if (turma.Disciplina === disciplina.id) {
            const turmaVagas = this.getVagasByTurmaId(turma.id);

            if (turma.periodo === 1 || turma.periodo === 2)
              vagas1Semestre += turmaVagas;
            else vagas2Semestre += turmaVagas;

            Turmas.push({
              ...turma,
              vagas: turmaVagas,
            });
          }
        });

        return {
          ...disciplina,
          vagas1Semestre,
          vagas2Semestre,
          Turmas,
        };
      });
    },

    totalVagas1Semestre() {
      return this.$_.reduce(
        this.DisciplinasInTurmasFiltredByDisciplina,
        (sum, disciplina) => sum + disciplina.vagas1Semestre,
        0
      );
    },
    totalVagas2Semestre() {
      return this.$_.reduce(
        this.DisciplinasInTurmasFiltredByDisciplina,
        (sum, disciplina) => sum + disciplina.vagas2Semestre,
        0
      );
    },
    // table modal

    DisciplinasOrderedModal() {
      return this.$_.orderBy(
        this.DisciplinasFiltredModal,
        this.ordenacaoModal.disciplinas.order,
        this.ordenacaoModal.disciplinas.type
      );
    },
    DisciplinasFiltredModal() {
      if (this.searchDisciplinas === "") return this.DisciplinasDCCInPerfis;

      const searchNormalized = normalizeText(this.searchDisciplinas);

      return this.$_.filter(this.DisciplinasDCCInPerfis, (disciplina) => {
        const disciplinaNome = normalizeText(disciplina.nome);
        const disciplinaCodigo = normalizeText(disciplina.codigo);

        return (
          disciplinaNome.match(searchNormalized) ||
          disciplinaCodigo.match(searchNormalized)
        );
      });
    },
    PerfisOrderedModal() {
      return this.$_.orderBy(
        this.PerfisDCC,
        this.ordenacaoModal.perfis.order,
        this.ordenacaoModal.perfis.type
      );
    },

    Pedidos() {
      return this.$store.state.pedido.Pedidos;
    },
    semestre1IsActived() {
      const { ativo } = this.filtroSemestres;
      return ativo === 1 || ativo === 3;
    },
    semestre2IsActived() {
      const { ativo } = this.filtroSemestres;
      return ativo === 2 || ativo === 3;
    },
  },

  watch: {
    filtroPerfis: {
      handler(filtroPerfis) {
        this.modalFiltrosCallbacks.selectNone.Disciplinas();
        const disciplinasResultantes = [];

        this.$_.forEach(this.DisciplinasDCCInPerfis, (disciplina) => {
          const perfilFounded = this.$_.find(
            filtroPerfis.selecionados,
            (perfil) => perfil.id === disciplina.Perfil
          );

          if (perfilFounded) disciplinasResultantes.push(disciplina.id);
        });

        //Quando selecionar todos add disciplinas MAC exeções
        if (filtroPerfis.selecionados.length === this.PerfisDCC.length)
          disciplinasResultantes.push(77, 88);

        this.filtroDisciplinas.selecionados = [...disciplinasResultantes];
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.main-table td {
  padding: 0 !important;
}
td.td-vagas:hover {
  padding: 0 !important;
  color: var(--light-blue);
  text-decoration: underline;
}
.bg-total-vg {
  background-color: #cecece;
}
.bg-total-vg:hover {
  background-color: #cecece !important;
}
</style>
