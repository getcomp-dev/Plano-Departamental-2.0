<template>
  <div class="main-component row">
    <portal to="page-header">
      <BaseButton template="filtros" @click="toggleAsideModal('filtros')" />
      <BaseButton template="relatorio" @click="toggleAsideModal('relatorio')" />
      <BaseButton template="ajuda" @click="toggleAsideModal('ajuda')" />
    </portal>

    <div v-show="!onLoading.table && algumHorariosEstaAtivo" class="w-100 m-0">
      <div v-show="filtroPeriodosEstaAtivo.periodo1 && filtroCursos.ativados.length" class="w-100">
        <h2 class="periodo-title">1º Período letivo</h2>
        <ListHorarios
          v-for="curso in CursosComHorariosFiltred"
          :key="curso.codigo + curso.periodoInicial1Semestre"
          :title="curso.nome"
          :curso="{
            id: curso.id,
            turno: curso.turno,
            periodoInicial: curso.periodoInicial1Semestre,
          }"
          :horariosTurmas="curso.horarios1Periodo"
        />
        <ListHorarios
          v-if="filtroEletivasEstaAtivo"
          :template="'extra'"
          :title="'Eletivas'"
          :horariosTurmas="horariosAtivos1Periodo.Eletivas"
        />
      </div>

      <template v-if="filtroPeriodosEstaAtivo.periodo2">
        <h2 class="periodo-title">2º Período letivo</h2>
        <ListHorarios
          :template="'extra'"
          :title="'Cursos de inverno'"
          :horariosTurmas="TurmasAtivas2Periodo"
        />
      </template>

      <div v-show="filtroPeriodosEstaAtivo.periodo3 && filtroCursos.ativados.length" class="w-100">
        <h2 class="periodo-title">3º Período letivo</h2>

        <ListHorarios
          v-for="curso in CursosComHorariosFiltred"
          :key="curso.codigo + curso.periodoInicial2Semestre"
          :title="curso.nome"
          :curso="{
            id: curso.id,
            turno: curso.turno,
            periodoInicial: curso.periodoInicial2Semestre,
          }"
          :horariosTurmas="curso.horarios3Periodo"
        />
        <ListHorarios
          v-if="filtroEletivasEstaAtivo"
          :template="'extra'"
          :title="'Eletivas'"
          :horariosTurmas="horariosAtivos3Periodo.Eletivas"
        />
      </div>

      <template v-if="filtroPeriodosEstaAtivo.periodo4">
        <h2 class="periodo-title">4º Período letivo</h2>
        <ListHorarios
          v-show="filtroPeriodosEstaAtivo.periodo4"
          :template="'extra'"
          :title="'Cursos de verão'"
          :horariosTurmas="TurmasAtivas4Periodo"
        />
      </template>
    </div>

    <p v-show="!algumHorariosEstaAtivo" class="text-empty">
      <b>Nenhum horário encontrado.</b>
      Clique no botão de filtros
      <font-awesome-icon :icon="['fas', 'list-ul']" class="mx-1" />
      para selecioná-los.
    </p>

    <ModalFiltros
      ref="modalFiltros"
      :callbacks="modalFiltrosCallbacks"
      :tabsOptions="modalFiltrosTabs"
    >
      <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Cursos'">
        <template #thead>
          <v-th width="25" />
          <v-th-ordination :currentOrder="ordemCursos" orderToCheck="codigo" width="70">
            Código
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordemCursos"
            orderToCheck="nome"
            width="355"
            align="start"
          >
            Nome
          </v-th-ordination>
        </template>

        <template #tbody>
          <tr
            v-for="curso in CursosOrderedModal"
            :key="curso.nome + curso.id"
            @click="toggleItemInArray(curso, filtroCursos.selecionados)"
            v-prevent-click-selection
          >
            <v-td width="25" type="content">
              <input type="checkbox" v-model="filtroCursos.selecionados" :value="curso" />
            </v-td>
            <v-td width="70">{{ curso.codigo }}</v-td>
            <v-td width="355" aling="start">{{ curso.nome }}</v-td>
          </tr>
        </template>
      </BaseTable>

      <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Períodos'">
        <template #thead>
          <v-th width="25" />
          <v-th width="425" align="start">Periodos Letivo</v-th>
        </template>

        <template #tbody>
          <tr
            v-for="periodo in PeriodosOptions"
            :key="periodo.id + periodo.nome"
            @click="selecionaPeriodo(periodo, filtroPeriodos.selecionados)"
            v-prevent-click-selection
          >
            <v-td width="25" type="content">
              <input
                type="checkbox"
                v-model="filtroPeriodos.selecionados"
                :value="periodo"
                @click.stop="selecionaPeriodo(periodo)"
              />
            </v-td>
            <v-td width="425" align="start">{{ periodo.nome }}</v-td>
          </tr>
        </template>
      </BaseTable>

      <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Semestres'">
        <template #thead>
          <v-th width="25" />
          <v-th width="425" align="start">Semestre Letivo</v-th>
        </template>

        <template #tbody>
          <tr
            v-for="semestre in SemestresOptions"
            :key="semestre.id + semestre.nome"
            @click="selecionaSemestre(semestre)"
            v-prevent-click-selection
          >
            <v-td width="25" type="content">
              <input
                type="checkbox"
                v-model="filtroSemestres.selecionados"
                :value="semestre"
                :indeterminate.prop="semestre.halfChecked"
                @click.stop="selecionaSemestre(semestre)"
              />
            </v-td>
            <v-td width="425" align="start">{{ semestre.nome }}</v-td>
          </tr>
        </template>
      </BaseTable>
    </ModalFiltros>

    <ModalRelatorio ref="modalRelatorio" @selection-option="generatePdf($event)" />

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Visualizar grade:</b>
        Clique no ícone filtros
        <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" />
        . Em seguida, utilize as abas para navegar entre os filtros. Selecione as informações que
        deseja visualizar e clique no botão OK
      </li>
      <li class="list-group-item">
        <b>Relatório:</b>
        Clique no ícone relatório
        <font-awesome-icon :icon="['fas', 'file-alt']" class="icon-gray" />
        . Em seguida, indique se deseja gerar o relatório completo com a grade completa de todos os
        cursos ou o relatório parcial com as informações exibidas na tela.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { pdfHorariosCursos } from "@/services/pdfs";
import { find, some, filter, orderBy } from "lodash-es";
import {
  toggleItemInArray,
  toggleAsideModal,
  conectaFiltrosSemestresEPeriodos,
  preventClickSelection,
} from "@/common/mixins";
import { ModalRelatorio, ModalAjuda, ModalFiltros } from "@/components/modals";
import ListHorarios from "./ListTableHorarios.vue";

export default {
  name: "DashboardHorarios",
  mixins: [
    toggleItemInArray,
    toggleAsideModal,
    conectaFiltrosSemestresEPeriodos,
    preventClickSelection,
  ],
  components: {
    ModalFiltros,
    ModalAjuda,
    ModalRelatorio,
    ListHorarios,
  },
  data() {
    return {
      asideModalsRefs: ["modalFiltros", "modalAjuda", "modalRelatorio"],
      ordemCursos: { order: "codigo", type: "asc" },
      horariosAtivos1Periodo: {
        CCD: [[], [], [], [], [], [], [], [], [], []],
        CCN: [[], [], [], [], [], [], [], [], [], []],
        EC: [[], [], [], [], [], [], [], [], [], []],
        SI: [[], [], [], [], [], [], [], [], [], []],
        Eletivas: [],
      },
      horariosAtivos3Periodo: {
        CCD: [[], [], [], [], [], [], [], [], [], []],
        CCN: [[], [], [], [], [], [], [], [], [], []],
        EC: [[], [], [], [], [], [], [], [], [], []],
        SI: [[], [], [], [], [], [], [], [], [], []],
        Eletivas: [],
      },
      filtroCursos: {
        selecionados: [],
        ativados: [],
      },
      filtroPeriodos: {
        ativados: [],
        selecionados: [],
      },
      filtroSemestres: {
        selecionados: [],
      },
      modalFiltrosTabs: {
        current: "Cursos",
        array: ["Cursos", "Períodos", "Semestres"],
      },
      modalFiltrosCallbacks: {
        selectAll: {
          Cursos: () => {
            this.filtroCursos.selecionados = [...this.CursosModal];
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
          Cursos: () => {
            this.filtroCursos.selecionados = [];
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
          this.filtroPeriodos.ativados = [...this.filtroPeriodos.selecionados];
          this.filtroCursos.ativados = [...this.filtroCursos.selecionados];
        },
      },
    };
  },

  beforeMount() {
    for (let i = 1; i < 5; i++) {
      this.createHorarios(i, 1);
      this.createHorarios(i, 3);
    }
    this.createHorarioEletivas(1);
    this.createHorarioEletivas(3);

    this.filtroPeriodos.selecionados = filter(
      this.PeriodosOptions,
      (periodo) => periodo.id === 1 || periodo.id === 3
    );
    this.modalFiltrosCallbacks.selectAll.Cursos();
    this.modalFiltrosCallbacks.btnOk();
  },

  methods: {
    isEven(number) {
      if (number % 2 === 0) return true;
      else return false;
    },
    createHorarios(curso, periodo) {
      let horariosAtivos;
      let semestre = periodo === 1 || periodo === 2 ? 1 : 2;

      if (periodo === 1) horariosAtivos = this.horariosAtivos1Periodo;
      else horariosAtivos = this.horariosAtivos3Periodo;

      switch (curso) {
      case 1:
        horariosAtivos = horariosAtivos.CCN;
        break;
      case 2:
        horariosAtivos = horariosAtivos.EC;
        break;
      case 3:
        horariosAtivos = horariosAtivos.SI;
        break;
      case 4:
        horariosAtivos = horariosAtivos.CCD;
        break;
      default:
        return;
      }

      let periodoGrade;
      if (semestre === 1) periodoGrade = 1;
      else periodoGrade = 3;

      let plano = find(this.$store.state.plano.Plano, {
        id: parseInt(localStorage.getItem("Plano")),
      });

      let gradesCurso = filter(this.AllGrades, { Curso: curso });
      let gradesAtivas = [];

      gradesCurso.forEach((g) => {
        let fim =
          1 +
          2 * (plano.ano - parseInt(g.periodoInicio.slice(0, 4), 10)) +
          (periodoGrade - parseInt(g.periodoInicio.slice(5, 6), 10)) / 2;
        if (fim > 10) {
          fim = 10;
        }
        gradesAtivas.push({ grade: g, fim: fim });
      });
      if (gradesAtivas[gradesAtivas.length - 1].fim !== 10) {
        gradesAtivas[gradesAtivas.length - 1].fim = 10;
      }

      let pedidos = [];
      for (let t in this.$store.state.pedido.Pedidos) {
        for (let pedido in this.$store.state.pedido.Pedidos[t]) {
          if (this.$store.state.pedido.Pedidos[t][pedido].Curso === curso) {
            pedidos.push(this.$store.state.pedido.Pedidos[t][pedido]);
          }
        }
      }

      let pedidosExternos = [];
      for (let t in this.$store.state.pedidoExterno.Pedidos) {
        for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]) {
          if (this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso === curso) {
            pedidosExternos.push(this.$store.state.pedidoExterno.Pedidos[t][pedido]);
          }
        }
      }
      let even = this.$store.state.curso.Cursos[curso - 1].semestreInicial % 2 === semestre - 1;
      let turmas = filter(this.AllTurmas, ["periodo", periodo]);
      let turmasExternas = filter(this.AllTurmasExternas, ["periodo", periodo]);
      let disciplinasGrades = this.DisciplinasGrades;
      let inicio = 0;

      for (let i = 0; inicio < 10 && i < gradesAtivas.length; i++) {
        let disciplinasGradeAtual = filter(disciplinasGrades, {
          Grade: gradesAtivas[i].grade.id,
        });
        for (let j = 0; j < disciplinasGradeAtual.length; j++) {
          if (
            disciplinasGradeAtual[j].periodo <= gradesAtivas[i].fim &&
            disciplinasGradeAtual[j].periodo > inicio &&
            this.isEven(disciplinasGradeAtual[j].periodo) === even
          ) {
            for (let k = 0; k < turmas.length; k++) {
              if (disciplinasGradeAtual[j].Disciplina == turmas[k].Disciplina) {
                let p = find(pedidos, { Turma: turmas[k].id });
                if (p.vagasPeriodizadas > 0) {
                  horariosAtivos[disciplinasGradeAtual[j].periodo - 1].push(turmas[k]);
                }
              }
            }
            for (let k = 0; k < turmasExternas.length; k++) {
              if (disciplinasGradeAtual[j].Disciplina == turmasExternas[k].Disciplina) {
                let p = find(pedidosExternos, {
                  Turma: turmasExternas[k].id,
                });
                if (p.vagasPeriodizadas > 0) {
                  horariosAtivos[disciplinasGradeAtual[j].periodo - 1].push(turmasExternas[k]);
                }
              }
            }
          }
        }
        inicio = gradesAtivas[i].fim;
      }
    },
    updateHorarios() {
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < this.horariosAtivos1Periodo.CCD[i].length; j++)
          for (let k = 0; k < this.AllTurmas.length; k++) {
            if (this.horariosAtivos1Periodo.CCD[i][j].id == this.AllTurmas[k].id) {
              this.horariosAtivos1Periodo.CCD[i].splice(j, 1, this.AllTurmas[k]);
            }
          }
        for (let j = 0; j < this.horariosAtivos1Periodo.CCN[i].length; j++)
          for (let k = 0; k < this.AllTurmas.length; k++) {
            if (this.horariosAtivos1Periodo.CCN[i][j].id == this.AllTurmas[k].id) {
              this.horariosAtivos1Periodo.CCN[i].splice(j, 1, this.AllTurmas[k]);
            }
          }
        for (let j = 0; j < this.horariosAtivos1Periodo.EC[i].length; j++)
          for (let k = 0; k < this.AllTurmas.length; k++) {
            if (this.horariosAtivos1Periodo.EC[i][j].id == this.AllTurmas[k].id) {
              this.horariosAtivos1Periodo.EC[i].splice(j, 1, this.AllTurmas[k]);
            }
          }
        for (let j = 0; j < this.horariosAtivos1Periodo.SI[i].length; j++)
          for (let k = 0; k < this.AllTurmas.length; k++) {
            if (this.horariosAtivos1Periodo.SI[i][j].id == this.AllTurmas[k].id) {
              this.horariosAtivos1Periodo.SI[i].splice(j, 1, this.AllTurmas[k]);
            }
          }
      }

      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < this.horariosAtivos3Periodo.CCD[i].length; j++)
          for (let k = 0; k < this.AllTurmas.length; k++) {
            if (this.horariosAtivos3Periodo.CCD[i][j].id == this.AllTurmas[k].id) {
              this.horariosAtivos3Periodo.CCD[i].splice(j, 1, this.AllTurmas[k]);
            }
          }
        for (let j = 0; j < this.horariosAtivos3Periodo.CCN[i].length; j++)
          for (let k = 0; k < this.AllTurmas.length; k++) {
            if (this.horariosAtivos3Periodo.CCN[i][j].id == this.AllTurmas[k].id) {
              this.horariosAtivos3Periodo.CCN[i].splice(j, 1, this.AllTurmas[k]);
            }
          }
        for (let j = 0; j < this.horariosAtivos3Periodo.EC[i].length; j++)
          for (let k = 0; k < this.AllTurmas.length; k++) {
            if (this.horariosAtivos3Periodo.EC[i][j].id == this.AllTurmas[k].id) {
              this.horariosAtivos3Periodo.EC[i].splice(j, 1, this.AllTurmas[k]);
            }
          }
        for (let j = 0; j < this.horariosAtivos3Periodo.SI[i].length; j++)
          for (let k = 0; k < this.AllTurmas.length; k++) {
            if (this.horariosAtivos3Periodo.SI[i][j].id == this.AllTurmas[k].id) {
              this.horariosAtivos3Periodo.SI[i].splice(j, 1, this.AllTurmas[k]);
            }
          }
      }

      this.$store.commit("redefinirAtivas1", {
        Ativas1: this.horariosAtivos1Periodo,
      });

      this.$store.commit("redefinirAtivas2", {
        Ativas2: this.horariosAtivos3Periodo,
      });
    },
    createHorarioEletivas(periodo) {
      let horariosAtivos;

      if (periodo === 1) horariosAtivos = this.horariosAtivos1Periodo.Eletivas;
      else horariosAtivos = this.horariosAtivos3Periodo.Eletivas;

      let turmas = filter(this.AllTurmas, {
        periodo: periodo,
      });

      let plano = find(this.$store.state.plano.Plano, {
        id: parseInt(localStorage.getItem("Plano")),
      });

      let gradesAtivas = [[], [], [], []];

      for (let i = 1; i < 5; i++) {
        let gradesCurso = filter(this.AllGrades, { Curso: i });
        let inicio = 0;
        gradesCurso.forEach((g) => {
          let fim =
            1 +
            2 * (plano.ano - parseInt(g.periodoInicio.slice(0, 4), 10)) +
            (periodo - parseInt(g.periodoInicio.slice(5, 6), 10)) / 2;
          if (fim > 10) {
            fim = 10;
          }
          gradesAtivas[i - 1].push({ grade: g, fim: fim, inicio: inicio });
          inicio = fim;
        });
        if (gradesAtivas[i - 1][gradesAtivas[i - 1].length - 1].fim !== 10) {
          gradesAtivas[i - 1][gradesAtivas[i - 1].length - 1].fim = 10;
        }
      }
      let eletiva = true;
      for (let i = 0; i < turmas.length; i++) {
        for (let j = 0; j < 4; j++) {
          for (let k = 0; k < gradesAtivas[j].length; k++) {
            let disciplinasGradeAtual = filter(this.DisciplinasGrades, {
              Grade: gradesAtivas[j][k].grade.id,
            });
            let disciplinaGrade = find(disciplinasGradeAtual, {
              Disciplina: turmas[i].Disciplina,
            });
            if (
              disciplinaGrade &&
              disciplinaGrade.periodo < gradesAtivas[j][k].fim &&
              disciplinaGrade.periodo >= gradesAtivas[j][k].inicio
            )
              for (let l = 0; l < disciplinasGradeAtual.length; l++) {
                if (turmas[i].Disciplina == disciplinasGradeAtual[l].Disciplina) eletiva = false;
              }
          }
        }
        if (eletiva) {
          horariosAtivos.push(turmas[i]);
        }
        eletiva = true;
      }
    },
    getTurmasComPedidoPeriodizado(turma, Pedidos) {
      return some(Pedidos, (pedido) => pedido.Turma === turma.id && pedido.vagasPeriodizadas > 0);
    },
    generatePdf(completo) {
      let cursosAtivos, periodosAtivos;
      if (completo) {
        cursosAtivos = this.CursosModal;
        periodosAtivos = this.PeriodosOptions;
      } else {
        cursosAtivos = this.filtroCursos.ativados;
        periodosAtivos = this.filtroPeriodos.ativados;
      }

      pdfHorariosCursos({
        horariosAtivos: {
          periodo1: this.horariosAtivos1Periodo,
          periodo2: this.TurmasAtivas2Periodo,
          periodo3: this.horariosAtivos3Periodo,
          periodo4: this.TurmasAtivas4Periodo,
        },
        cursosAtivos,
        periodosAtivos,
        plano: this.currentPlano,
      });
    },
  },

  computed: {
    ...mapGetters([
      "onLoading",
      "DisciplinasGrades",
      "PrincipaisCursosDCC",
      "AllGrades",
      "AllTurmas",
      "AllTurmasExternas",
      "Pedidos",
      "PedidosExternos",
    ]),

    CursosComHorariosFiltred() {
      return filter(this.CursosComHorarios, (curso) =>
        some(this.filtroCursos.ativados, ["codigo", curso.codigo])
      );
    },
    CursosComHorarios() {
      return [
        {
          ...find(this.PrincipaisCursosDCC, (curso) => curso.codigo === "65C"),
          nome: "Ciência da Computação - integral",
          turno: "Diurno",
          periodoInicial1Semestre: 1,
          periodoInicial2Semestre: 2,
          horarios1Periodo: this.horariosAtivos1Periodo.CCD,
          horarios3Periodo: this.horariosAtivos3Periodo.CCD,
        },
        {
          ...find(this.PrincipaisCursosDCC, (curso) => curso.codigo === "35A"),
          nome: "Ciência da Computação - noturno",
          turno: "Noturno",
          periodoInicial1Semestre: 2,
          periodoInicial2Semestre: 1,
          horarios1Periodo: this.horariosAtivos1Periodo.CCN,
          horarios3Periodo: this.horariosAtivos3Periodo.CCN,
        },
        {
          ...find(this.PrincipaisCursosDCC, (curso) => curso.codigo === "76A"),
          nome: "Sistemas de Informação",
          turno: "Noturno",
          periodoInicial1Semestre: 2,
          periodoInicial2Semestre: 1,
          horarios1Periodo: this.horariosAtivos1Periodo.SI,
          horarios3Periodo: this.horariosAtivos3Periodo.SI,
        },
        {
          ...find(this.PrincipaisCursosDCC, (curso) => curso.codigo === "65B"),
          nome: "Engenharia Computacional",
          turno: "Diurno",
          periodoInicial1Semestre: 1,
          periodoInicial2Semestre: 2,
          horarios1Periodo: this.horariosAtivos1Periodo.EC,
          horarios3Periodo: this.horariosAtivos3Periodo.EC,
        },
      ];
    },

    TurmasAtivas2Periodo() {
      const turmasFiltredbyPeriodo = filter(this.AllTurmas, ["periodo", 2]);
      const turmasFiltredByPedidos = filter(turmasFiltredbyPeriodo, (turma) =>
        this.getTurmasComPedidoPeriodizado(turma, this.PedidosDeCursosDCC)
      );

      const turmasExternasFiltredbyPeriodo = filter(this.AllTurmasExternas, ["periodo", 2]);
      const turmasExternasFiltredbyPeidos = filter(turmasExternasFiltredbyPeriodo, (turma) =>
        this.getTurmasComPedidoPeriodizado(turma, this.PedidosExternosDeCursosDCC)
      );

      return turmasExternasFiltredbyPeidos.concat(turmasFiltredByPedidos);
    },
    TurmasAtivas4Periodo() {
      const turmasFiltredbyPeriodo = filter(this.AllTurmas, ["periodo", 4]);
      const turmasFiltredByPedidos = filter(turmasFiltredbyPeriodo, (turma) =>
        this.getTurmasComPedidoPeriodizado(turma, this.PedidosDeCursosDCC)
      );

      const turmasExternasFiltredbyPeriodo = filter(this.AllTurmasExternas, ["periodo", 4]);
      const turmasExternasFiltredbyPeidos = filter(turmasExternasFiltredbyPeriodo, (turma) =>
        this.getTurmasComPedidoPeriodizado(turma, this.PedidosExternosDeCursosDCC)
      );

      return turmasExternasFiltredbyPeidos.concat(turmasFiltredByPedidos);
    },

    PedidosDeCursosDCC() {
      const pedidosResultantes = [];
      for (const key in this.Pedidos) {
        this.Pedidos[key].forEach((pedido) => {
          if (some(this.PrincipaisCursosDCC, ["id", pedido.Curso]))
            pedidosResultantes.push({ ...pedido });
        });
      }

      return pedidosResultantes;
    },
    PedidosExternosDeCursosDCC() {
      const pedidosResultantes = [];
      for (const key in this.PedidosExternos) {
        this.PedidosExternos[key].forEach((pedido) => {
          if (some(this.PrincipaisCursosDCC, ["id", pedido.Curso]))
            pedidosResultantes.push({ ...pedido });
        });
      }
      return pedidosResultantes;
    },

    CursosOrderedModal() {
      return orderBy(this.CursosModal, this.ordemCursos.order, this.ordemCursos.type);
    },
    CursosModal() {
      const cursosResultantes = [...this.PrincipaisCursosDCC];
      cursosResultantes.push({
        nome: "ELETIVAS",
        codigo: "-",
      });

      return cursosResultantes;
    },

    filtroEletivasEstaAtivo() {
      return some(this.filtroCursos.ativados, (curso) => curso.codigo === "-");
    },
    filtroPeriodosEstaAtivo() {
      const periodosResult = {
        periodo1: false,
        periodo2: false,
        periodo3: false,
        periodo4: false,
      };

      this.PeriodosOptions.forEach((periodo) => {
        periodosResult[`periodo${periodo.id}`] = some(this.filtroPeriodos.ativados, [
          "id",
          periodo.id,
        ]);
      });

      return periodosResult;
    },
    algumHorariosEstaAtivo() {
      return (
        (this.filtroCursos.ativados.length &&
          (this.filtroPeriodosEstaAtivo.periodo1 || this.filtroPeriodosEstaAtivo.periodo3)) ||
        this.filtroPeriodosEstaAtivo.periodo2 ||
        this.filtroPeriodosEstaAtivo.periodo4
      );
    },
  },

  watch: {
    AllTurmas() {
      this.updateHorarios();
    },
  },
};
</script>

<style scoped>
.periodo-title {
  width: 100%;
  font-size: 16px;
  padding: 5px;
  background-color: var(--light-gray);
  text-align: start;
  font-weight: bold;
}

.text-empty {
  width: 100%;
  font-size: 12px;
  padding: 5px;
  background-color: var(--light-gray);
}
</style>
