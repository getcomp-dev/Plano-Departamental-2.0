<template>
  <div class="main-component row p-0">
    <portal to="page-header">
      <BaseButton template="filtros" @click="toggleAsideModal('filtros')" />
      <BaseButton template="relatorio" @click="toggleAsideModal('relatorio')" />
      <BaseButton template="download" @click="toggleAsideModal('DownloadTurmasCursos')" />
      <!--<BaseButton template="ajuda" @click="toggleAsideModal('ajuda')" />-->
    </portal>

    <div class="div-table">
      <BaseTable>
        <template #thead>
          <v-th width="80" title="Código do Curso">Cód. Curso</v-th>
          <v-th width="300" title="Nome do Curso">Nome do Curso</v-th>
          <v-th width="40" title="Período">P.</v-th>
          <v-th width="80" title="Código da Disciplina">Disciplina</v-th>
          <v-th width="40" title="Turma">T.</v-th>
          <v-th width="120" title="Horário">Horário</v-th>
          <v-th width="80" title="Vagas">Vagas</v-th>
        </template>

        <template #tbody>
          <template v-for="curso in filtroCursos.ativados">
            <tr :key="`Curso${curso.id}`" style="background-color: #f1f1f1">
              <v-td width="80">{{ curso.codigo }}</v-td>
              <v-td width="300">{{ curso.nome }}</v-td>
              <v-td width="40"></v-td>
              <v-td width="80"></v-td>
              <v-td width="40"></v-td>
              <v-td width="120"></v-td>
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
              <v-td width="80">
                {{ turma.pedido.vagasPeriodizadas + turma.pedido.vagasNaoPeriodizadas }}
              </v-td>
            </tr>
          </template>
        </template>
      </BaseTable>
    </div>

    <ModalRelatorio ref="modalRelatorio" @selection-option="generatePdf($event)" />

    <ModalDownloadTurmasCursos
      ref="modalDownloadTurmasCursos"
      @selection-option="downloadTurmasCursos($event)"
    />

    <ModalFiltros
      ref="modalFiltros"
      :callbacks="modalFiltrosCallbacks"
      :tabsOptions="modalFiltrosTabs"
    >
      <BaseTable
        type="modal"
        v-show="modalFiltrosTabs.current === 'Cursos'"
        :hasSearchBar="true"
      >
        <template #thead-search>
          <InputSearch
            v-model="searchCursos"
            placeholder="Pesquise nome ou codigo de um curso..."
          />
        </template>
        <template #thead>
          <v-th width="25" />
          <v-th-ordination
            :currentOrder="ordenacaoModal.cursos"
            orderToCheck="codigo"
            width="70"
            align="start"
          >
            Código
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoModal.cursos"
            orderToCheck="nome"
            width="270"
            align="start"
          >
            Nome
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoModal.cursos"
            orderToCheck="turno"
            width="85"
            align="start"
          >
            Turno
          </v-th-ordination>
        </template>

        <template #tbody>
          <tr
            v-for="curso in CursosFiltrados"
            :key="curso.id + curso.nome"
            @click="toggleItemInArray(curso, filtroCursos.selecionados)"
          >
            <v-td width="25" type="content">
              <input type="checkbox" v-model="filtroCursos.selecionados" :value="curso" />
            </v-td>
            <v-td width="70" align="start">{{ curso.codigo }}</v-td>
            <v-td align="start" width="270" :title="curso.nome">
              {{ curso.nome }}
            </v-td>
            <v-td width="85" align="start">{{ curso.turno }}</v-td>
          </tr>

          <tr v-if="!AllCursos.length">
            <v-td colspan="3" width="450">
              NENHUM CURSO ENCONTRADO
            </v-td>
          </tr>
        </template>
      </BaseTable>

      <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Períodos'">
        <template #thead>
          <v-th width="25" />
          <v-th width="425" align="start">Período Letivo</v-th>
        </template>

        <template #tbody>
          <tr @click="toggleItemInArray(1, filtroPeriodos.selecionados)">
            <v-td width="25" type="content">
              <input type="checkbox" v-model="filtroPeriodos.selecionados" :value="1" />
            </v-td>
            <v-td width="425" align="start">PRIMEIRO</v-td>
          </tr>
          <tr @click="toggleItemInArray(3, filtroPeriodos.selecionados)">
            <v-td width="25" type="content">
              <input type="checkbox" v-model="filtroPeriodos.selecionados" :value="3" />
            </v-td>
            <v-td width="425" align="start">TERCEIRO</v-td>
          </tr>
        </template>
      </BaseTable>
    </ModalFiltros>

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
import { find, orderBy, filter } from "lodash-es";
import { pdfTurmasCursos } from "@/common/services/pdfs";
import { normalizeText } from "@/common/utils";
import {
  toggleItemInArray,
  toggleAsideModal,
  conectaFiltroPerfisEDisciplinas,
  conectaFiltrosSemestresEPeriodos,
  preventClickSelection,
} from "@/common/mixins";
import {
  ModalRelatorio,
  ModalAjuda,
  ModalFiltros,
  ModalDownloadTurmasCursos,
} from "@/components/modals";
import { InputSearch } from "@/components/ui";
import ModalVagas from "../PlanoDepartamental/ModalVagas";
import downloadService from "@/common/services/download";
import { saveAs } from "file-saver";

export default {
  name: "TurmasCursos",
  mixins: [
    toggleItemInArray,
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
    ModalDownloadTurmasCursos,
  },
  data() {
    return {
      turmaClicked: null,
      searchCursos: "",
      asideModalsRefs: [
        "modalAjuda",
        "modalRelatorio",
        "modalFiltros",
        "modalDownloadTurmasCursos",
      ],
      ordenacaoMain: {
        disciplinas: { order: "codigo", type: "asc" },
      },
      ordenacaoModal: {
        cursos: { order: "codigo", type: "asc" },
      },
      filtroCursos: {
        selecionados: [],
        ativados: [],
      },
      filtroPeriodos: {
        selecionados: [1, 3],
        ativados: [],
      },
      modalFiltrosTabs: {
        current: "Cursos",
        array: ["Cursos", "Períodos"],
      },
      modalFiltrosCallbacks: {
        selectAll: {
          Cursos: () => {
            this.filtroCursos.selecionados = [...this.CursosFiltrados];
          },
          Periodos: () => {
            this.filtroPeriodos.selecionados = [1, 3];
          },
        },
        selectNone: {
          Cursos: () => {
            this.filtroCursos.selecionados = [];
          },
          Periodos: () => {
            this.filtroPeriodos.selecionados = [];
          },
        },
        btnOk: () => {
          this.filtroCursos.ativados = [...this.filtroCursos.selecionados];
          this.filtroPeriodos.ativados = [...this.filtroPeriodos.selecionados];
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
        let pedido = find(pedidos, ["Curso", curso]);
        if (pedido.vagasPeriodizadas > 0 || pedido.vagasNaoPeriodizadas > 0) {
          turmas.push({ turma: t, pedido: pedido });
        }
      });
      return orderBy(
        orderBy(
          orderBy(
            filter(turmas, (t) => {
              let periodo = false;
              this.filtroPeriodos.ativados.forEach((p) => {
                if (p == t.turma.periodo) periodo = true;
              });
              return periodo;
            }),
            (t) => {
              return t.turma.letra;
            }
          ),
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
      let horario1 = find(this.$store.state.horario.Horarios, {
        id: turma.Horario1,
      });
      let horario2 = find(this.$store.state.horario.Horarios, {
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

    generatePdf(completo) {
      let cursos;
      if (completo) cursos = this.AllCursos;
      else cursos = this.filtroCursos.ativados;

      pdfTurmasCursos({
        cursos,
        periodos: this.filtroPeriodos.ativados,
      });
    },

    async downloadTurmasCursos(periodo) {
      this.setPartialLoading(true);
      await downloadService
        .generatePdfTurmasCurso({
          Plano: localStorage.getItem("Plano"),
          periodo: periodo,
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
                this.setPartialLoading(false);
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
      return orderBy(this.AllCursos, "codigo");
    },

    CursosFiltrados() {
      if (this.searchCursos === "") return this.AllCursos;
      else {
        const searchNormalized = normalizeText(this.searchCursos);

        return filter(this.AllCursos, (curso) => {
          const nome = normalizeText(curso.nome);
          const codigo = normalizeText(curso.codigo);

          return nome.match(searchNormalized) || codigo.match(searchNormalized);
        });
      }
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
