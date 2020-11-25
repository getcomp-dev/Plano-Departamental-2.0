<template>
  <div class="main-component row p-0">
    <PageHeader :title="'Turmas - Cursos'">
      <!--<BaseButton template="filtros" @click="toggleAsideModal('filtros')" />-->
      <BaseButton template="relatorio" @click="toggleAsideModal('relatorio')" />
      <BaseButton template="download" @click="downloadTurmasCursos" />
      <!--<BaseButton template="ajuda" @click="toggleAsideModal('ajuda')" />-->
    </PageHeader>

    <div class="div-table">
      <BaseTable>
        <template #thead>
          <v-th width="80" title="Código do Curso">Cód. Curso</v-th>
          <v-th width="300" title="Nome do Curso">Nome do Curso</v-th>
          <v-th width="40" title="Período">P.</v-th>
          <v-th width="80" title="Código da Disciplina">Disciplina</v-th>
          <v-th width="40" title="Turma">T.</v-th>
          <v-th width="120" title="Horário">Horário</v-th>
          <v-th width="80" title="Vagas da Grade">Grade</v-th>
          <v-th width="80" title="Vagas Não Grade">Não Grade</v-th>
        </template>

        <template #tbody>
          <template v-for="curso in CursosOrdered">
            <tr :key="`Curso${curso.id}`" style="background-color: #f1f1f1">
              <v-td width="80">{{ curso.codigo }}</v-td>
              <v-td width="300">{{ curso.nome }}</v-td>
              <v-td width="40"></v-td>
              <v-td width="80"></v-td>
              <v-td width="40"></v-td>
              <v-td width="120"></v-td>
              <v-td width="80"></v-td>
              <v-td width="80"></v-td>
            </tr>

            <tr
              v-for="turma in turmas(curso.id)"
              :key="`Curso${curso.id}Turma${turma.turma.id}`"
            >
              <v-td width="80"></v-td>
              <v-td width="300"></v-td>
              <v-td width="40">{{ turma.turma.periodo }}</v-td>
              <v-td width="80">{{ turma.turma.disciplina.codigo }}</v-td>
              <v-td width="40">{{ turma.turma.letra }}</v-td>
              <v-td width="120">{{ horarioTotal(turma.turma) }}</v-td>
              <v-td width="80">{{ turma.pedido.vagasPeriodizadas }}</v-td>
              <v-td width="80">{{ turma.pedido.vagasNaoPeriodizadas }}</v-td>
            </tr>
          </template>
        </template>
      </BaseTable>
    </div>

    <ModalRelatorio ref="modalRelatorio" @selection-option="pdf($event)" />

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Visualizar plano:</b>
        Clique no ícone filtros
        <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" />
        . Em seguida, utilize as abas para navegar entre os filtros. Selecione as
        informações que deseja visualizar e clique em OK.
      </li>
      <li class="list-group-item">
        <b>Relatório :</b>
        Clique no ícone relatório
        <font-awesome-icon :icon="['fas', 'file-alt']" class="icon-gray" />
        . Em seguida, indique se deseja gerar o relatório completo com todas as
        disciplinas ou o relatório parcial com as disciplinas exibidas na tela.
      </li>
      <li class="list-group-item">
        <b>Visualizar vagas por turma:</b>
        Clique no número de vagas desta turma, na última coluna da tabela, na linha
        correspondente.
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
  generateHorariosText,
  generateDocentesText,
  toggleAsideModal,
  conectaFiltroPerfisEDisciplinas,
  conectaFiltrosSemestresEPeriodos,
  preventClickSelection,
} from "@/common/mixins";
import { InputSearch } from "@/components/ui";
import { ModalRelatorio, ModalAjuda, ModalFiltros } from "@/components/modals";
import ModalVagas from "../PlanoDepartamental/ModalVagas";
import _ from "lodash";
import downloadService from "@/common/services/download";
import { saveAs } from "file-saver";

export default {
  name: "TurmasCursos",
  mixins: [
    toggleItemInArray,
    generateHorariosText,
    generateDocentesText,
    toggleAsideModal,
    conectaFiltroPerfisEDisciplinas,
    conectaFiltrosSemestresEPeriodos,
    preventClickSelection,
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
      asideModalsRefs: ["modalAjuda", "modalRelatorio"],
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
      filtroPeriodos: {
        ativados: [],
        selecionados: [],
      },
      filtroSemestres: {
        selecionados: [],
      },
      modalFiltrosTabs: {
        current: "Perfis",
        array: ["Perfis", "Disciplinas", "Períodos", "Semestres"],
      },
      modalFiltrosCallbacks: {
        selectAll: {
          Perfis: () => {
            this.filtroDisciplinas.selecionados = [...this.DisciplinasOptions];
            this.filtroPerfis.selecionados = [...this.PerfisOptions];
          },
          Disciplinas: () => {
            this.filtroDisciplinas.selecionados = [...this.DisciplinasOptions];
            this.filtroPerfis.selecionados = [...this.PerfisOptions];
          },
          Periodos: () => {
            this.filtroPeriodos.selecionados = [...this.PeriodosOptions];
            this.filtroSemestres.selecionados = [...this.SemestresOptions];
          },
          Semestres: () => {
            this.filtroSemestres.selecionados = [...this.SemestresOptions];
            this.filtroPeriodos.selecionados = [...this.PeriodosOptions];
          },
        },
        selectNone: {
          Perfis: () => {
            this.filtroPerfis.selecionados = [];
            this.filtroDisciplinas.selecionados = [];
          },
          Disciplinas: () => {
            this.filtroDisciplinas.selecionados = [];
            this.filtroPerfis.selecionados = [];
          },
          Periodos: () => {
            this.filtroPeriodos.selecionados = [];
            this.filtroSemestres.selecionados = [];
          },
          Semestres: () => {
            this.filtroSemestres.selecionados = [];
            this.filtroPeriodos.selecionados = [];
          },
        },
        btnOk: () => {
          this.filtroPeriodos.ativados = [
            ...this.$_.orderBy(this.filtroPeriodos.selecionados, "id"),
          ];
          this.filtroDisciplinas.ativados = [...this.filtroDisciplinas.selecionados];
        },
      },
    };
  },

  mounted() {
    this.turmas(1);
  },

  methods: {
    turmas(curso) {
      let turmas = [];
      this.TurmasInDisciplinasPerfis.forEach((t) => {
        let pedidos = this.Pedidos[t.id];
        let pedido = _.find(pedidos, ["Curso", curso]);
        if (pedido.vagasPeriodizadas > 0 || pedido.vagasNaoPeriodizadas > 0) {
          turmas.push({ turma: t, pedido: pedido });
        }
      });
      return this.$_.orderBy(
        this.$_.orderBy(
          this.$_.orderBy(turmas, (t) => {
            return t.turma.letra;
          }),
          (t) => {
            return t.turma.disciplina.codigo;
          }
        ),
        (t) => {
          return t.turma.periodo;
        }
      );
    },

    horarioTotal(turma) {
      let horario1 = _.find(this.$store.state.horario.Horarios, {
        id: turma.Horario1,
      });
      let horario2 = _.find(this.$store.state.horario.Horarios, {
        id: turma.Horario2,
      });
      let horarioTotal = undefined;
      if (horario1 === undefined && horario2 === undefined) {
        horarioTotal = "";
      } else if (horario2 === undefined) {
        horarioTotal = horario1.horario;
      } else if (horario1 === undefined) {
        horarioTotal = horario2.horario;
      } else {
        horarioTotal = horario1.horario + "/" + horario2.horario;
      }
      return horarioTotal;
    },

    pdf(completo) {
      pdfs.pdfTurmasCursos(this.AllCursos);
    },

    async downloadTurmasCursos() {
      await downloadService
        .generatePdfTurmasCurso({
          Plano: localStorage.getItem("Plano"),
        })
        .then(() =>
          downloadService.createZipTurmasCursos().then(() =>
            fetch("http://200.131.219.57:3000/api/download/downloadTurmasCursosZip", {
              method: "GET",
              headers: {
                Authorization: `Bearer ${this.$store.state.auth.token}`,
              },
            })
              .then((r) => r.blob())
              .then((blob) => {
                saveAs(blob, "TurmasCursos.zip");
              })
          )
        );
    },
  },

  computed: {
    ...mapGetters([
      "TurmasInDisciplinasPerfis",
      "DisciplinasDCCInPerfis",
      "PerfisDCC",
      "AllPlanos",
      "Pedidos",
      "AllCursos",
    ]),

    CursosOrdered() {
      return this.$_.orderBy(this.AllCursos, "codigo");
    },
  },
};
</script>

<style scoped>
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
