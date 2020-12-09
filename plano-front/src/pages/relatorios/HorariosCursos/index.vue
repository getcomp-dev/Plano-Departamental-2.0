<template>
  <div class="main-component row">
    <portal to="page-header">
      <BaseButton template="filtros" @click="toggleAsideModal('filtros')" />
      <BaseButton template="relatorio" @click="toggleAsideModal('relatorio')" />
      <BaseButton template="ajuda" @click="toggleAsideModal('ajuda')" />
    </portal>

    <div v-show="!onLoading.table && algumHorariosEstaAtivo" class="w-100 m-0">
      <div
        v-show="filtroPeriodosEstaAtivo.periodo1 && filtroCursos.ativados.length"
        class="w-100"
      >
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

      <div
        v-show="filtroPeriodosEstaAtivo.periodo3 && filtroCursos.ativados.length"
        class="w-100"
      >
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
            <v-td width="355" class="t-start">{{ curso.nome }}</v-td>
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
        . Em seguida, utilize as abas para navegar entre os filtros. Selecione as
        informações que deseja visualizar e clique no botão OK
      </li>
      <li class="list-group-item">
        <b>Relatório:</b>
        Clique no ícone relatório
        <font-awesome-icon :icon="['fas', 'file-alt']" class="icon-gray" />
        . Em seguida, indique se deseja gerar o relatório completo com a grade completa de
        todos os cursos ou o relatório parcial com as informações exibidas na tela.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { find, some, filter, orderBy } from "lodash-es";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { imageToDataUrl } from "@/common/utils";
import urlLogoUfjf from "@/assets/logo-ufjf.png";
import urlLogoDcc from "@/assets/logo-dcc.png";
import {
  toggleItemInArray,
  toggleAsideModal,
  conectaFiltrosSemestresEPeriodos,
  preventClickSelection,
} from "@/common/mixins";
import { ModalRelatorio, ModalAjuda, ModalFiltros } from "@/components/modals";
import ListHorarios from "./ListTableHorarios.vue";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
    checkTurmaHorario(turma, horario) {
      if (turma.Horario1 == horario || turma.Horario2 == horario) {
        return true;
      } else return false;
    },

    checkPeriodo(turma, periodo) {
      for (var g = 0; g < this.DisciplinasDasGrades.length; g++) {
        if (
          this.DisciplinasDasGrades[g].Disciplina == turma &&
          this.DisciplinasDasGrades[g].periodo == periodo
        ) {
          return true;
        }
      }
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
      let even =
        this.$store.state.curso.Cursos[curso - 1].semestreInicial % 2 === semestre - 1;
      let turmas = filter(this.TurmasInDisciplinasPerfis, {
        periodo: periodo,
      });
      let turmasExternas = filter(this.TurmasExternasInDisciplinas, {
        periodo: periodo,
      });
      let disciplinasGrades = this.DisciplinasDasGrades;
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
                  horariosAtivos[disciplinasGradeAtual[j].periodo - 1].push(
                    turmasExternas[k]
                  );
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
          for (let k = 0; k < this.TurmasInDisciplinasPerfis.length; k++) {
            if (
              this.horariosAtivos1Periodo.CCD[i][j].id ==
              this.TurmasInDisciplinasPerfis[k].id
            ) {
              this.horariosAtivos1Periodo.CCD[i].splice(
                j,
                1,
                this.TurmasInDisciplinasPerfis[k]
              );
            }
          }
        for (let j = 0; j < this.horariosAtivos1Periodo.CCN[i].length; j++)
          for (let k = 0; k < this.TurmasInDisciplinasPerfis.length; k++) {
            if (
              this.horariosAtivos1Periodo.CCN[i][j].id ==
              this.TurmasInDisciplinasPerfis[k].id
            ) {
              this.horariosAtivos1Periodo.CCN[i].splice(
                j,
                1,
                this.TurmasInDisciplinasPerfis[k]
              );
            }
          }
        for (let j = 0; j < this.horariosAtivos1Periodo.EC[i].length; j++)
          for (let k = 0; k < this.TurmasInDisciplinasPerfis.length; k++) {
            if (
              this.horariosAtivos1Periodo.EC[i][j].id ==
              this.TurmasInDisciplinasPerfis[k].id
            ) {
              this.horariosAtivos1Periodo.EC[i].splice(
                j,
                1,
                this.TurmasInDisciplinasPerfis[k]
              );
            }
          }
        for (let j = 0; j < this.horariosAtivos1Periodo.SI[i].length; j++)
          for (let k = 0; k < this.TurmasInDisciplinasPerfis.length; k++) {
            if (
              this.horariosAtivos1Periodo.SI[i][j].id ==
              this.TurmasInDisciplinasPerfis[k].id
            ) {
              this.horariosAtivos1Periodo.SI[i].splice(
                j,
                1,
                this.TurmasInDisciplinasPerfis[k]
              );
            }
          }
      }

      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < this.horariosAtivos3Periodo.CCD[i].length; j++)
          for (let k = 0; k < this.TurmasInDisciplinasPerfis.length; k++) {
            if (
              this.horariosAtivos3Periodo.CCD[i][j].id ==
              this.TurmasInDisciplinasPerfis[k].id
            ) {
              this.horariosAtivos3Periodo.CCD[i].splice(
                j,
                1,
                this.TurmasInDisciplinasPerfis[k]
              );
            }
          }
        for (let j = 0; j < this.horariosAtivos3Periodo.CCN[i].length; j++)
          for (let k = 0; k < this.TurmasInDisciplinasPerfis.length; k++) {
            if (
              this.horariosAtivos3Periodo.CCN[i][j].id ==
              this.TurmasInDisciplinasPerfis[k].id
            ) {
              this.horariosAtivos3Periodo.CCN[i].splice(
                j,
                1,
                this.TurmasInDisciplinasPerfis[k]
              );
            }
          }
        for (let j = 0; j < this.horariosAtivos3Periodo.EC[i].length; j++)
          for (let k = 0; k < this.TurmasInDisciplinasPerfis.length; k++) {
            if (
              this.horariosAtivos3Periodo.EC[i][j].id ==
              this.TurmasInDisciplinasPerfis[k].id
            ) {
              this.horariosAtivos3Periodo.EC[i].splice(
                j,
                1,
                this.TurmasInDisciplinasPerfis[k]
              );
            }
          }
        for (let j = 0; j < this.horariosAtivos3Periodo.SI[i].length; j++)
          for (let k = 0; k < this.TurmasInDisciplinasPerfis.length; k++) {
            if (
              this.horariosAtivos3Periodo.SI[i][j].id ==
              this.TurmasInDisciplinasPerfis[k].id
            ) {
              this.horariosAtivos3Periodo.SI[i].splice(
                j,
                1,
                this.TurmasInDisciplinasPerfis[k]
              );
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

      let turmas = filter(this.TurmasInDisciplinasPerfis, {
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
            let disciplinasGradeAtual = filter(this.DisciplinasDasGrades, {
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
                if (turmas[i].Disciplina == disciplinasGradeAtual[l].Disciplina)
                  eletiva = false;
              }
          }
        }
        if (eletiva) {
          horariosAtivos.push(turmas[i]);
        }
        eletiva = true;
      }
    },
    filterPedidoPeriodizado(turma, Pedidos) {
      return some(
        Pedidos,
        (pedido) => pedido.Turma === turma.id && pedido.vagasPeriodizadas > 0
      );
    },
    async generatePdf(completo) {
      const logoDcc = await imageToDataUrl(urlLogoDcc);
      const logoUfjf = await imageToDataUrl(urlLogoUfjf);
      const tables = [];
      const disciplinas = this.AllDisciplinas;

      const periodosCCD1 = this.horariosAtivos1Periodo.CCD;
      const periodosCCN1 = this.horariosAtivos1Periodo.CCN;
      const periodosEC1 = this.horariosAtivos1Periodo.EC;
      const periodosSI1 = this.horariosAtivos1Periodo.SI;
      const eletivas1 = this.horariosAtivos1Periodo.Eletivas;
      let seg = "",
        ter = "",
        qua = "",
        qui = "",
        sex = "";
      let vazio = 0;

      tables.push({
        columns: [
          {
            image: logoDcc,
            fit: [60, 60],
            alignment: "left",
            width: "16%",
            margin: [0, 0, 0, 10],
          },
          [
            {
              text: "Horários dos cursos do Departamento de Ciência da Computação",
              alignment: "center",
              bold: true,
              fontSize: 10,
            },
            {
              text:
                "1º Semestre " + this.currentPlano.ano + " - " + this.currentPlano.nome,
              alignment: "center",
              bold: true,
              fontSize: 10,
              margin: [0, 0, 0, 5],
            },
          ],
          {
            image: logoUfjf,
            fit: [60, 60],
            alignment: "right",
            width: "16%",
            margin: [0, 0, 0, 10],
          },
        ],
      });
      if (find(this.filtroCursos.ativados, { codigo: "65C" }) || completo) {
        tables.push({
          text: "Ciência da Computação - integral",
          bold: true,
          margin: [0, 10, 0, 5],
          fontSize: 10,
        });

        for (let i = 0; i < 10; i++) {
          if (periodosCCD1[i].length === 0) {
            vazio = vazio + 1;
          } else {
            tables.push({
              text: i + 1 + "º Período",
              fontSize: 8,
              bold: true,
              margin: [0, 5, 0, 5],
            });
            let tableHorariosBody = [
              [
                {
                  text: "Horário",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Segunda",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Terça",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Quarta",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Quinta",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Sexta",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
              ],
            ];
            for (let d = 0; d < 4; d++) {
              for (let j = 0; j < periodosCCD1[i].length; j++) {
                if (this.checkTurmaHorario(periodosCCD1[i][j], 1 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosCCD1[i][j].Disciplina === disciplinas[k].id) {
                      if (seg !== "") seg = seg + "\n";
                      seg = seg + disciplinas[k].codigo + " " + periodosCCD1[i][j].letra;
                    }
                  }
                }
                if (this.checkTurmaHorario(periodosCCD1[i][j], 7 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosCCD1[i][j].Disciplina === disciplinas[k].id) {
                      if (ter != "") ter = ter + "\n";
                      ter = ter + disciplinas[k].codigo + " " + periodosCCD1[i][j].letra;
                    }
                  }
                }
                if (this.checkTurmaHorario(periodosCCD1[i][j], 13 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosCCD1[i][j].Disciplina === disciplinas[k].id) {
                      if (qua != "") qua = qua + "\n";
                      qua = qua + disciplinas[k].codigo + " " + periodosCCD1[i][j].letra;
                    }
                  }
                }
                if (this.checkTurmaHorario(periodosCCD1[i][j], 19 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosCCD1[i][j].Disciplina === disciplinas[k].id) {
                      if (qui != "") qui = qui + "\n";
                      qui = qui + disciplinas[k].codigo + " " + periodosCCD1[i][j].letra;
                    }
                  }
                }
                if (this.checkTurmaHorario(periodosCCD1[i][j], 25 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosCCD1[i][j].Disciplina === disciplinas[k].id) {
                      if (sex != "") sex = sex + "\n";
                      sex = sex + disciplinas[k].codigo + " " + periodosCCD1[i][j].letra;
                    }
                  }
                }
              }

              switch (d) {
                case 0:
                  tableHorariosBody.push([
                    {
                      text: "08 - 10",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 1:
                  tableHorariosBody.push([
                    {
                      text: "10 - 12",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 2:
                  tableHorariosBody.push([
                    {
                      text: "14 - 16",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 3:
                  tableHorariosBody.push([
                    {
                      text: "16 - 18",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 4:
                  tableHorariosBody.push([
                    {
                      text: "19 - 21",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 5:
                  tableHorariosBody.push([
                    {
                      text: "21 - 23",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
              }
              seg = ter = qua = qui = sex = "";
            }

            tables.push({
              table: {
                widths: ["*", "*", "*", "*", "*", "*"],
                headerRows: 1,
                color: "#426",
                body: tableHorariosBody,
              },
            });
          }
        }
      }

      tables.push({
        columns: [
          {
            image: logoDcc,
            fit: [60, 60],
            alignment: "left",
            width: "16%",
            margin: [0, 0, 0, 10],
            pageBreak: "before",
          },
          [
            {
              text: "Horários dos cursos do Departamento de Ciência da Computação",
              alignment: "center",
              bold: true,
              fontSize: 10,
              pageBreak: "before",
            },
            {
              text:
                "1º Semestre " + this.currentPlano.ano + " - " + this.currentPlano.nome,
              alignment: "center",
              bold: true,
              fontSize: 10,
              margin: [0, 0, 0, 5],
            },
          ],
          {
            image: logoUfjf,
            fit: [60, 60],
            alignment: "right",
            width: "16%",
            margin: [0, 0, 0, 10],
            pageBreak: "before",
          },
        ],
      });

      if (find(this.filtroCursos.ativados, { codigo: "35A" }) || completo) {
        tables.push({
          text: "Ciência da Computação - noturno",
          bold: true,
          margin: [0, 10, 0, 5],
          fontSize: 10,
        });

        for (let i = 0; i < 10; i++) {
          if (periodosCCN1[i].length === 0) {
            vazio = vazio + 1;
          } else {
            tables.push({
              text: i + 1 + "º Período",
              fontSize: 8,
              bold: true,
              margin: [0, 5, 0, 5],
            });
            let tableHorariosBody = [
              [
                {
                  text: "Horário",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Segunda",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Terça",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Quarta",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Quinta",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Sexta",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
              ],
            ];
            for (let d = 4; d < 6; d++) {
              for (let j = 0; j < periodosCCN1[i].length; j++) {
                if (this.checkTurmaHorario(periodosCCN1[i][j], 1 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosCCN1[i][j].Disciplina === disciplinas[k].id) {
                      if (seg !== "") seg = seg + "\n";
                      seg = seg + disciplinas[k].codigo + " " + periodosCCN1[i][j].letra;
                    }
                  }
                }
                if (this.checkTurmaHorario(periodosCCN1[i][j], 7 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosCCN1[i][j].Disciplina === disciplinas[k].id) {
                      if (ter != "") ter = ter + "\n";
                      ter = ter + disciplinas[k].codigo + " " + periodosCCN1[i][j].letra;
                    }
                  }
                }
                if (this.checkTurmaHorario(periodosCCN1[i][j], 13 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosCCN1[i][j].Disciplina === disciplinas[k].id) {
                      if (qua != "") qua = qua + "\n";
                      qua = qua + disciplinas[k].codigo + " " + periodosCCN1[i][j].letra;
                    }
                  }
                }
                if (this.checkTurmaHorario(periodosCCN1[i][j], 19 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosCCN1[i][j].Disciplina === disciplinas[k].id) {
                      if (qui != "") qui = qui + "\n";
                      qui = qui + disciplinas[k].codigo + " " + periodosCCN1[i][j].letra;
                    }
                  }
                }
                if (this.checkTurmaHorario(periodosCCN1[i][j], 25 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosCCN1[i][j].Disciplina === disciplinas[k].id) {
                      if (sex != "") sex = sex + "\n";
                      sex = sex + disciplinas[k].codigo + " " + periodosCCN1[i][j].letra;
                    }
                  }
                }
              }

              switch (d) {
                case 0:
                  tableHorariosBody.push([
                    {
                      text: "08 - 10",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 1:
                  tableHorariosBody.push([
                    {
                      text: "10 - 12",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 2:
                  tableHorariosBody.push([
                    {
                      text: "14 - 16",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 3:
                  tableHorariosBody.push([
                    {
                      text: "16 - 18",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 4:
                  tableHorariosBody.push([
                    {
                      text: "19 - 21",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 5:
                  tableHorariosBody.push([
                    {
                      text: "21 - 23",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
              }
              seg = ter = qua = qui = sex = "";
            }

            tables.push({
              table: {
                widths: ["*", "*", "*", "*", "*", "*"],
                headerRows: 1,
                color: "#426",
                body: tableHorariosBody,
              },
            });
          }
        }
      }

      tables.push({
        columns: [
          {
            image: logoDcc,
            fit: [60, 60],
            alignment: "left",
            width: "16%",
            margin: [0, 0, 0, 10],
            pageBreak: "before",
          },
          [
            {
              text: "Horários dos cursos do Departamento de Ciência da Computação",
              alignment: "center",
              bold: true,
              fontSize: 10,
              pageBreak: "before",
            },
            {
              text:
                "1º Semestre " + this.currentPlano.ano + " - " + this.currentPlano.nome,
              alignment: "center",
              bold: true,
              fontSize: 10,
              margin: [0, 0, 0, 5],
            },
          ],
          {
            image: logoUfjf,
            fit: [60, 60],
            alignment: "right",
            width: "16%",
            margin: [0, 0, 0, 10],
            pageBreak: "before",
          },
        ],
      });

      if (find(this.filtroCursos.ativados, { codigo: "65B" }) || completo) {
        tables.push({
          text: "Engenharia Computacional",
          bold: true,
          margin: [0, 10, 0, 5],
          fontSize: 10,
        });

        for (let i = 0; i < 10; i++) {
          if (periodosEC1[i].length === 0) {
            vazio = vazio + 1;
          } else {
            tables.push({
              text: i + 1 + "º Período",
              fontSize: 8,
              bold: true,
              margin: [0, 5, 0, 5],
            });
            let tableHorariosBody = [
              [
                {
                  text: "Horário",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Segunda",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Terça",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Quarta",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Quinta",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Sexta",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
              ],
            ];
            for (let d = 0; d < 4; d++) {
              for (let j = 0; j < periodosEC1[i].length; j++) {
                if (this.checkTurmaHorario(periodosEC1[i][j], 1 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosEC1[i][j].Disciplina === disciplinas[k].id) {
                      if (seg !== "") seg = seg + "\n";
                      seg = seg + disciplinas[k].codigo + " " + periodosEC1[i][j].letra;
                    }
                  }
                }
                if (this.checkTurmaHorario(periodosEC1[i][j], 7 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosEC1[i][j].Disciplina === disciplinas[k].id) {
                      if (ter != "") ter = ter + "\n";
                      ter = ter + disciplinas[k].codigo + " " + periodosEC1[i][j].letra;
                    }
                  }
                }
                if (this.checkTurmaHorario(periodosEC1[i][j], 13 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosEC1[i][j].Disciplina === disciplinas[k].id) {
                      if (qua != "") qua = qua + "\n";
                      qua = qua + disciplinas[k].codigo + " " + periodosEC1[i][j].letra;
                    }
                  }
                }
                if (this.checkTurmaHorario(periodosEC1[i][j], 19 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosEC1[i][j].Disciplina === disciplinas[k].id) {
                      if (qui != "") qui = qui + "\n";
                      qui = qui + disciplinas[k].codigo + " " + periodosEC1[i][j].letra;
                    }
                  }
                }
                if (this.checkTurmaHorario(periodosEC1[i][j], 25 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosEC1[i][j].Disciplina === disciplinas[k].id) {
                      if (sex != "") sex = sex + "\n";
                      sex = sex + disciplinas[k].codigo + " " + periodosEC1[i][j].letra;
                    }
                  }
                }
              }

              switch (d) {
                case 0:
                  tableHorariosBody.push([
                    {
                      text: "08 - 10",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 1:
                  tableHorariosBody.push([
                    {
                      text: "10 - 12",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 2:
                  tableHorariosBody.push([
                    {
                      text: "14 - 16",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 3:
                  tableHorariosBody.push([
                    {
                      text: "16 - 18",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 4:
                  tableHorariosBody.push([
                    {
                      text: "19 - 21",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 5:
                  tableHorariosBody.push([
                    {
                      text: "21 - 23",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
              }
              seg = ter = qua = qui = sex = "";
            }

            tables.push({
              table: {
                widths: ["*", "*", "*", "*", "*", "*"],
                headerRows: 1,
                color: "#426",
                body: tableHorariosBody,
              },
            });
          }
        }
      }

      tables.push({
        columns: [
          {
            image: logoDcc,
            fit: [60, 60],
            alignment: "left",
            width: "16%",
            margin: [0, 0, 0, 10],
            pageBreak: "before",
          },
          [
            {
              text: "Horários dos cursos do Departamento de Ciência da Computação",
              alignment: "center",
              bold: true,
              fontSize: 10,
              pageBreak: "before",
            },
            {
              text:
                "1º Semestre " + this.currentPlano.ano + " - " + this.currentPlano.nome,
              alignment: "center",
              bold: true,
              fontSize: 10,
              margin: [0, 0, 0, 5],
            },
          ],
          {
            image: logoUfjf,
            fit: [60, 60],
            alignment: "right",
            width: "16%",
            margin: [0, 0, 0, 10],
            pageBreak: "before",
          },
        ],
      });

      if (find(this.filtroCursos.ativados, { codigo: "76A" }) || completo) {
        tables.push({
          text: "Sistemas de Informação",
          bold: true,
          margin: [0, 10, 0, 5],
          fontSize: 10,
        });

        for (let i = 0; i < 10; i++) {
          if (periodosSI1[i].length === 0) {
            vazio = vazio + 1;
          } else {
            tables.push({
              text: i + 1 + "º Período",
              fontSize: 8,
              bold: true,
              margin: [0, 5, 0, 5],
            });
            let tableHorariosBody = [
              [
                {
                  text: "Horário",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Segunda",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Terça",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Quarta",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Quinta",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Sexta",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
              ],
            ];
            for (let d = 4; d < 6; d++) {
              for (let j = 0; j < periodosSI1[i].length; j++) {
                if (this.checkTurmaHorario(periodosSI1[i][j], 1 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosSI1[i][j].Disciplina === disciplinas[k].id) {
                      if (seg !== "") seg = seg + "\n";
                      seg = seg + disciplinas[k].codigo + " " + periodosSI1[i][j].letra;
                    }
                  }
                }
                if (this.checkTurmaHorario(periodosSI1[i][j], 7 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosSI1[i][j].Disciplina === disciplinas[k].id) {
                      if (ter != "") ter = ter + "\n";
                      ter = ter + disciplinas[k].codigo + " " + periodosSI1[i][j].letra;
                    }
                  }
                }
                if (this.checkTurmaHorario(periodosSI1[i][j], 13 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosSI1[i][j].Disciplina === disciplinas[k].id) {
                      if (qua != "") qua = qua + "\n";
                      qua = qua + disciplinas[k].codigo + " " + periodosSI1[i][j].letra;
                    }
                  }
                }
                if (this.checkTurmaHorario(periodosSI1[i][j], 19 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosSI1[i][j].Disciplina === disciplinas[k].id) {
                      if (qui != "") qui = qui + "\n";
                      qui = qui + disciplinas[k].codigo + " " + periodosSI1[i][j].letra;
                    }
                  }
                }
                if (this.checkTurmaHorario(periodosSI1[i][j], 25 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosSI1[i][j].Disciplina === disciplinas[k].id) {
                      if (sex != "") sex = sex + "\n";
                      sex = sex + disciplinas[k].codigo + " " + periodosSI1[i][j].letra;
                    }
                  }
                }
              }

              switch (d) {
                case 0:
                  tableHorariosBody.push([
                    {
                      text: "08 - 10",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 1:
                  tableHorariosBody.push([
                    {
                      text: "10 - 12",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 2:
                  tableHorariosBody.push([
                    {
                      text: "14 - 16",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 3:
                  tableHorariosBody.push([
                    {
                      text: "16 - 18",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 4:
                  tableHorariosBody.push([
                    {
                      text: "19 - 21",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 5:
                  tableHorariosBody.push([
                    {
                      text: "21 - 23",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
              }
              seg = ter = qua = qui = sex = "";
            }

            tables.push({
              table: {
                widths: ["*", "*", "*", "*", "*", "*"],
                headerRows: 1,
                color: "#426",
                body: tableHorariosBody,
              },
            });
          }
        }
      }

      tables.push({
        columns: [
          {
            image: logoDcc,
            fit: [60, 60],
            alignment: "left",
            width: "16%",
            margin: [0, 0, 0, 10],
            pageBreak: "before",
          },
          [
            {
              text: "Horários dos cursos do Departamento de Ciência da Computação",
              alignment: "center",
              bold: true,
              fontSize: 10,
              pageBreak: "before",
            },
            {
              text:
                "1º Semestre " + this.currentPlano.ano + " - " + this.currentPlano.nome,
              alignment: "center",
              bold: true,
              fontSize: 10,
              margin: [0, 0, 0, 5],
            },
          ],
          {
            image: logoUfjf,
            fit: [60, 60],
            alignment: "right",
            width: "16%",
            margin: [0, 0, 0, 10],
            pageBreak: "before",
          },
        ],
      });

      if (find(this.filtroCursos.ativados, { codigo: "-" }) || completo) {
        tables.push({
          text: "Eletivas",
          bold: true,
          margin: [0, 10, 0, 5],
          fontSize: 10,
        });

        if (eletivas1.length === 0) {
          vazio = vazio + 1;
        } else {
          let tableHorariosBody = [
            [
              {
                text: "Horário",
                alignment: "center",
                fontSize: 8,
                bold: true,
              },
              {
                text: "Segunda",
                alignment: "center",
                fontSize: 8,
                bold: true,
              },
              {
                text: "Terça",
                alignment: "center",
                fontSize: 8,
                bold: true,
              },
              {
                text: "Quarta",
                alignment: "center",
                fontSize: 8,
                bold: true,
              },
              {
                text: "Quinta",
                alignment: "center",
                fontSize: 8,
                bold: true,
              },
              {
                text: "Sexta",
                alignment: "center",
                fontSize: 8,
                bold: true,
              },
            ],
          ];
          for (let d = 0; d < 8; d++) {
            for (let j = 0; j < eletivas1.length; j++) {
              if (
                this.checkTurmaHorario(
                  eletivas1[j],
                  (d === 4 || d === 5 ? 28 : 1) + (d > 5 ? d - 2 : d)
                )
              ) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (eletivas1[j].Disciplina === disciplinas[k].id) {
                    if (seg !== "") seg = seg + "\n";
                    seg = seg + disciplinas[k].codigo + " " + eletivas1[j].letra;
                  }
                }
              }
              if (
                this.checkTurmaHorario(
                  eletivas1[j],
                  (d === 4 || d === 5 ? 30 : 7) + (d > 5 ? d - 2 : d)
                )
              ) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (eletivas1[j].Disciplina === disciplinas[k].id) {
                    if (ter != "") ter = ter + "\n";
                    ter = ter + disciplinas[k].codigo + " " + eletivas1[j].letra;
                  }
                }
              }
              if (
                this.checkTurmaHorario(
                  eletivas1[j],
                  (d === 4 || d === 5 ? 32 : 13) + (d > 5 ? d - 2 : d)
                )
              ) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (eletivas1[j].Disciplina === disciplinas[k].id) {
                    if (qua != "") qua = qua + "\n";
                    qua = qua + disciplinas[k].codigo + " " + eletivas1[j].letra;
                  }
                }
              }
              if (
                this.checkTurmaHorario(
                  eletivas1[j],
                  (d === 4 || d === 5 ? 34 : 19) + (d > 5 ? d - 2 : d)
                )
              ) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (eletivas1[j].Disciplina === disciplinas[k].id) {
                    if (qui != "") qui = qui + "\n";
                    qui = qui + disciplinas[k].codigo + " " + eletivas1[j].letra;
                  }
                }
              }
              if (
                this.checkTurmaHorario(
                  eletivas1[j],
                  (d === 4 || d === 5 ? 36 : 25) + (d > 5 ? d - 2 : d)
                )
              ) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (eletivas1[j].Disciplina === disciplinas[k].id) {
                    if (sex != "") sex = sex + "\n";
                    sex = sex + disciplinas[k].codigo + " " + eletivas1[j].letra;
                  }
                }
              }
            }
            switch (d) {
              case 0:
                tableHorariosBody.push([
                  {
                    text: "08 - 10",
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: seg,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: ter,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: qua,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: qui,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: sex,
                    alignment: "center",
                    fontSize: 8,
                  },
                ]);
                break;
              case 1:
                tableHorariosBody.push([
                  {
                    text: "10 - 12",
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: seg,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: ter,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: qua,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: qui,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: sex,
                    alignment: "center",
                    fontSize: 8,
                  },
                ]);
                break;
              case 2:
                tableHorariosBody.push([
                  {
                    text: "14 - 16",
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: seg,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: ter,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: qua,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: qui,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: sex,
                    alignment: "center",
                    fontSize: 8,
                  },
                ]);
                break;
              case 3:
                tableHorariosBody.push([
                  {
                    text: "16 - 18",
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: seg,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: ter,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: qua,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: qui,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: sex,
                    alignment: "center",
                    fontSize: 8,
                  },
                ]);
                break;
              case 4:
                tableHorariosBody.push([
                  {
                    text: "17 - 19",
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: seg,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: ter,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: qua,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: qui,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: sex,
                    alignment: "center",
                    fontSize: 8,
                  },
                ]);
                break;
              case 5:
                tableHorariosBody.push([
                  {
                    text: "18 - 20",
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: seg,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: ter,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: qua,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: qui,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: sex,
                    alignment: "center",
                    fontSize: 8,
                  },
                ]);
                break;
              case 6:
                tableHorariosBody.push([
                  {
                    text: "19 - 21",
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: seg,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: ter,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: qua,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: qui,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: sex,
                    alignment: "center",
                    fontSize: 8,
                  },
                ]);
                break;
              case 7:
                tableHorariosBody.push([
                  {
                    text: "21 - 23",
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: seg,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: ter,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: qua,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: qui,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: sex,
                    alignment: "center",
                    fontSize: 8,
                  },
                ]);
                break;
            }
            seg = ter = qua = qui = sex = "";
          }

          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: tableHorariosBody,
            },
          });
        }
      }

      const periodosCCD2 = this.horariosAtivos3Periodo.CCD;
      const periodosCCN2 = this.horariosAtivos3Periodo.CCN;
      const periodosEC2 = this.horariosAtivos3Periodo.EC;
      const periodosSI2 = this.horariosAtivos3Periodo.SI;
      const eletivas2 = this.horariosAtivos3Periodo.Eletivas;

      tables.push({
        columns: [
          {
            image: logoDcc,
            fit: [60, 60],
            alignment: "left",
            width: "16%",
            margin: [0, 0, 0, 10],
            pageBreak: "before",
          },
          [
            {
              text: "Horários dos cursos do Departamento de Ciência da Computação",
              alignment: "center",
              bold: true,
              fontSize: 10,
              pageBreak: "before",
            },
            {
              text:
                "2º Semestre " + this.currentPlano.ano + " - " + this.currentPlano.nome,
              alignment: "center",
              bold: true,
              fontSize: 10,
              margin: [0, 0, 0, 5],
            },
          ],
          {
            image: logoUfjf,
            fit: [60, 60],
            alignment: "right",
            width: "16%",
            margin: [0, 0, 0, 10],
            pageBreak: "before",
          },
        ],
      });

      if (find(this.filtroCursos.ativados, { codigo: "65C" }) || completo) {
        tables.push({
          text: "Ciência da Computação - integral",
          bold: true,
          margin: [0, 10, 0, 5],
          fontSize: 10,
        });

        for (let i = 0; i < 10; i++) {
          if (periodosCCD2[i].length === 0) {
            vazio = vazio + 1;
          } else {
            tables.push({
              text: i + 1 + "º Período",
              fontSize: 8,
              bold: true,
              margin: [0, 5, 0, 5],
            });
            let tableHorariosBody = [
              [
                {
                  text: "Horário",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Segunda",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Terça",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Quarta",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Quinta",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Sexta",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
              ],
            ];
            for (let d = 0; d < 4; d++) {
              for (let j = 0; j < periodosCCD2[i].length; j++) {
                if (this.checkTurmaHorario(periodosCCD2[i][j], 1 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosCCD2[i][j].Disciplina === disciplinas[k].id) {
                      if (seg !== "") seg = seg + "\n";
                      seg = seg + disciplinas[k].codigo + " " + periodosCCD2[i][j].letra;
                    }
                  }
                }
                if (this.checkTurmaHorario(periodosCCD2[i][j], 7 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosCCD2[i][j].Disciplina === disciplinas[k].id) {
                      if (ter != "") ter = ter + "\n";
                      ter = ter + disciplinas[k].codigo + " " + periodosCCD2[i][j].letra;
                    }
                  }
                }
                if (this.checkTurmaHorario(periodosCCD2[i][j], 13 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosCCD2[i][j].Disciplina === disciplinas[k].id) {
                      if (qua != "") qua = qua + "\n";
                      qua = qua + disciplinas[k].codigo + " " + periodosCCD2[i][j].letra;
                    }
                  }
                }
                if (this.checkTurmaHorario(periodosCCD2[i][j], 19 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosCCD2[i][j].Disciplina === disciplinas[k].id) {
                      if (qui != "") qui = qui + "\n";
                      qui = qui + disciplinas[k].codigo + " " + periodosCCD2[i][j].letra;
                    }
                  }
                }
                if (this.checkTurmaHorario(periodosCCD2[i][j], 25 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosCCD2[i][j].Disciplina === disciplinas[k].id) {
                      if (sex != "") sex = sex + "\n";
                      sex = sex + disciplinas[k].codigo + " " + periodosCCD2[i][j].letra;
                    }
                  }
                }
              }

              switch (d) {
                case 0:
                  tableHorariosBody.push([
                    {
                      text: "08 - 10",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 1:
                  tableHorariosBody.push([
                    {
                      text: "10 - 12",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 2:
                  tableHorariosBody.push([
                    {
                      text: "14 - 16",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 3:
                  tableHorariosBody.push([
                    {
                      text: "16 - 18",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 4:
                  tableHorariosBody.push([
                    {
                      text: "19 - 21",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 5:
                  tableHorariosBody.push([
                    {
                      text: "21 - 23",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
              }
              seg = ter = qua = qui = sex = "";
            }

            tables.push({
              table: {
                widths: ["*", "*", "*", "*", "*", "*"],
                headerRows: 1,
                color: "#426",
                body: tableHorariosBody,
              },
            });
          }
        }
      }

      tables.push({
        columns: [
          {
            image: logoDcc,
            fit: [60, 60],
            alignment: "left",
            width: "16%",
            margin: [0, 0, 0, 10],
            pageBreak: "before",
          },
          [
            {
              text: "Horários dos cursos do Departamento de Ciência da Computação",
              alignment: "center",
              bold: true,
              fontSize: 10,
              pageBreak: "before",
            },
            {
              text:
                "2º Semestre " + this.currentPlano.ano + " - " + this.currentPlano.nome,
              alignment: "center",
              bold: true,
              fontSize: 10,
              margin: [0, 0, 0, 5],
            },
          ],
          {
            image: logoUfjf,
            fit: [60, 60],
            alignment: "right",
            width: "16%",
            margin: [0, 0, 0, 10],
            pageBreak: "before",
          },
        ],
      });

      if (find(this.filtroCursos.ativados, { codigo: "35A" }) || completo) {
        tables.push({
          text: "Ciência da Computação - noturno",
          bold: true,
          margin: [0, 10, 0, 5],
          fontSize: 10,
        });

        for (let i = 0; i < 10; i++) {
          if (periodosCCN2[i].length === 0) {
            vazio = vazio + 1;
          } else {
            tables.push({
              text: i + 1 + "º Período",
              fontSize: 8,
              bold: true,
              margin: [0, 5, 0, 5],
            });
            let tableHorariosBody = [
              [
                {
                  text: "Horário",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Segunda",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Terça",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Quarta",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Quinta",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Sexta",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
              ],
            ];
            for (let d = 4; d < 6; d++) {
              for (let j = 0; j < periodosCCN2[i].length; j++) {
                if (this.checkTurmaHorario(periodosCCN2[i][j], 1 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosCCN2[i][j].Disciplina === disciplinas[k].id) {
                      if (seg !== "") seg = seg + "\n";
                      seg = seg + disciplinas[k].codigo + " " + periodosCCN2[i][j].letra;
                    }
                  }
                }
                if (this.checkTurmaHorario(periodosCCN2[i][j], 7 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosCCN2[i][j].Disciplina === disciplinas[k].id) {
                      if (ter != "") ter = ter + "\n";
                      ter = ter + disciplinas[k].codigo + " " + periodosCCN2[i][j].letra;
                    }
                  }
                }
                if (this.checkTurmaHorario(periodosCCN2[i][j], 13 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosCCN2[i][j].Disciplina === disciplinas[k].id) {
                      if (qua != "") qua = qua + "\n";
                      qua = qua + disciplinas[k].codigo + " " + periodosCCN2[i][j].letra;
                    }
                  }
                }
                if (this.checkTurmaHorario(periodosCCN2[i][j], 19 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosCCN2[i][j].Disciplina === disciplinas[k].id) {
                      if (qui != "") qui = qui + "\n";
                      qui = qui + disciplinas[k].codigo + " " + periodosCCN2[i][j].letra;
                    }
                  }
                }
                if (this.checkTurmaHorario(periodosCCN2[i][j], 25 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosCCN2[i][j].Disciplina === disciplinas[k].id) {
                      if (sex != "") sex = sex + "\n";
                      sex = sex + disciplinas[k].codigo + " " + periodosCCN2[i][j].letra;
                    }
                  }
                }
              }

              switch (d) {
                case 0:
                  tableHorariosBody.push([
                    {
                      text: "08 - 10",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 1:
                  tableHorariosBody.push([
                    {
                      text: "10 - 12",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 2:
                  tableHorariosBody.push([
                    {
                      text: "14 - 16",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 3:
                  tableHorariosBody.push([
                    {
                      text: "16 - 18",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 4:
                  tableHorariosBody.push([
                    {
                      text: "19 - 21",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 5:
                  tableHorariosBody.push([
                    {
                      text: "21 - 23",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
              }
              seg = ter = qua = qui = sex = "";
            }

            tables.push({
              table: {
                widths: ["*", "*", "*", "*", "*", "*"],
                headerRows: 1,
                color: "#426",
                body: tableHorariosBody,
              },
            });
          }
        }
      }

      tables.push({
        columns: [
          {
            image: logoDcc,
            fit: [60, 60],
            alignment: "left",
            width: "16%",
            margin: [0, 0, 0, 10],
            pageBreak: "before",
          },
          [
            {
              text: "Horários dos cursos do Departamento de Ciência da Computação",
              alignment: "center",
              bold: true,
              fontSize: 10,
              pageBreak: "before",
            },
            {
              text:
                "2º Semestre " + this.currentPlano.ano + " - " + this.currentPlano.nome,
              alignment: "center",
              bold: true,
              fontSize: 10,
              margin: [0, 0, 0, 5],
            },
          ],
          {
            image: logoUfjf,
            fit: [60, 60],
            alignment: "right",
            width: "16%",
            margin: [0, 0, 0, 10],
            pageBreak: "before",
          },
        ],
      });

      if (find(this.filtroCursos.ativados, { codigo: "65B" }) || completo) {
        tables.push({
          text: "Engenharia Computacional",
          bold: true,
          margin: [0, 10, 0, 5],
          fontSize: 10,
        });

        for (let i = 0; i < 10; i++) {
          if (periodosEC2[i].length === 0) {
            vazio = vazio + 1;
          } else {
            tables.push({
              text: i + 1 + "º Período",
              fontSize: 8,
              bold: true,
              margin: [0, 5, 0, 5],
            });
            let tableHorariosBody = [
              [
                {
                  text: "Horário",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Segunda",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Terça",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Quarta",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Quinta",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Sexta",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
              ],
            ];
            for (let d = 0; d < 4; d++) {
              for (let j = 0; j < periodosEC2[i].length; j++) {
                if (this.checkTurmaHorario(periodosEC2[i][j], 1 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosEC2[i][j].Disciplina === disciplinas[k].id) {
                      if (seg !== "") seg = seg + "\n";
                      seg = seg + disciplinas[k].codigo + " " + periodosEC2[i][j].letra;
                    }
                  }
                }
                if (this.checkTurmaHorario(periodosEC2[i][j], 7 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosEC2[i][j].Disciplina === disciplinas[k].id) {
                      if (ter != "") ter = ter + "\n";
                      ter = ter + disciplinas[k].codigo + " " + periodosEC2[i][j].letra;
                    }
                  }
                }
                if (this.checkTurmaHorario(periodosEC2[i][j], 13 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosEC2[i][j].Disciplina === disciplinas[k].id) {
                      if (qua != "") qua = qua + "\n";
                      qua = qua + disciplinas[k].codigo + " " + periodosEC2[i][j].letra;
                    }
                  }
                }
                if (this.checkTurmaHorario(periodosEC2[i][j], 19 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosEC2[i][j].Disciplina === disciplinas[k].id) {
                      if (qui != "") qui = qui + "\n";
                      qui = qui + disciplinas[k].codigo + " " + periodosEC2[i][j].letra;
                    }
                  }
                }
                if (this.checkTurmaHorario(periodosEC2[i][j], 25 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosEC2[i][j].Disciplina === disciplinas[k].id) {
                      if (sex != "") sex = sex + "\n";
                      sex = sex + disciplinas[k].codigo + " " + periodosEC2[i][j].letra;
                    }
                  }
                }
              }

              switch (d) {
                case 0:
                  tableHorariosBody.push([
                    {
                      text: "08 - 10",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 1:
                  tableHorariosBody.push([
                    {
                      text: "10 - 12",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 2:
                  tableHorariosBody.push([
                    {
                      text: "14 - 16",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 3:
                  tableHorariosBody.push([
                    {
                      text: "16 - 18",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 4:
                  tableHorariosBody.push([
                    {
                      text: "19 - 21",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 5:
                  tableHorariosBody.push([
                    {
                      text: "21 - 23",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
              }
              seg = ter = qua = qui = sex = "";
            }

            tables.push({
              table: {
                widths: ["*", "*", "*", "*", "*", "*"],
                headerRows: 1,
                color: "#426",
                body: tableHorariosBody,
              },
            });
          }
        }
      }

      tables.push({
        columns: [
          {
            image: logoDcc,
            fit: [60, 60],
            alignment: "left",
            width: "16%",
            margin: [0, 0, 0, 10],
            pageBreak: "before",
          },
          [
            {
              text: "Horários dos cursos do Departamento de Ciência da Computação",
              alignment: "center",
              bold: true,
              fontSize: 10,
              pageBreak: "before",
            },
            {
              text:
                "2º Semestre " + this.currentPlano.ano + " - " + this.currentPlano.nome,
              alignment: "center",
              bold: true,
              fontSize: 10,
              margin: [0, 0, 0, 5],
            },
          ],
          {
            image: logoUfjf,
            fit: [60, 60],
            alignment: "right",
            width: "16%",
            margin: [0, 0, 0, 10],
            pageBreak: "before",
          },
        ],
      });

      if (find(this.filtroCursos.ativados, { codigo: "76A" }) || completo) {
        tables.push({
          text: "Sistemas de Informação",
          bold: true,
          margin: [0, 10, 0, 5],
          fontSize: 10,
        });

        for (let i = 0; i < 10; i++) {
          if (periodosSI2[i].length === 0) {
            vazio = vazio + 1;
          } else {
            tables.push({
              text: i + 1 + "º Período",
              fontSize: 8,
              bold: true,
              margin: [0, 5, 0, 5],
            });
            let tableHorariosBody = [
              [
                {
                  text: "Horário",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Segunda",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Terça",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Quarta",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Quinta",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
                {
                  text: "Sexta",
                  alignment: "center",
                  fontSize: 8,
                  bold: true,
                },
              ],
            ];
            for (let d = 4; d < 6; d++) {
              for (let j = 0; j < periodosSI2[i].length; j++) {
                if (this.checkTurmaHorario(periodosSI2[i][j], 1 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosSI2[i][j].Disciplina === disciplinas[k].id) {
                      if (seg !== "") seg = seg + "\n";
                      seg = seg + disciplinas[k].codigo + " " + periodosSI2[i][j].letra;
                    }
                  }
                }
                if (this.checkTurmaHorario(periodosSI2[i][j], 7 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosSI2[i][j].Disciplina === disciplinas[k].id) {
                      if (ter != "") ter = ter + "\n";
                      ter = ter + disciplinas[k].codigo + " " + periodosSI2[i][j].letra;
                    }
                  }
                }
                if (this.checkTurmaHorario(periodosSI2[i][j], 13 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosSI2[i][j].Disciplina === disciplinas[k].id) {
                      if (qua != "") qua = qua + "\n";
                      qua = qua + disciplinas[k].codigo + " " + periodosSI2[i][j].letra;
                    }
                  }
                }
                if (this.checkTurmaHorario(periodosSI2[i][j], 19 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosSI2[i][j].Disciplina === disciplinas[k].id) {
                      if (qui != "") qui = qui + "\n";
                      qui = qui + disciplinas[k].codigo + " " + periodosSI2[i][j].letra;
                    }
                  }
                }
                if (this.checkTurmaHorario(periodosSI2[i][j], 25 + d)) {
                  for (let k = 0; k < disciplinas.length; k++) {
                    if (periodosSI2[i][j].Disciplina === disciplinas[k].id) {
                      if (sex != "") sex = sex + "\n";
                      sex = sex + disciplinas[k].codigo + " " + periodosSI2[i][j].letra;
                    }
                  }
                }
              }

              switch (d) {
                case 0:
                  tableHorariosBody.push([
                    {
                      text: "08 - 10",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 1:
                  tableHorariosBody.push([
                    {
                      text: "10 - 12",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 2:
                  tableHorariosBody.push([
                    {
                      text: "14 - 16",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 3:
                  tableHorariosBody.push([
                    {
                      text: "16 - 18",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 4:
                  tableHorariosBody.push([
                    {
                      text: "19 - 21",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
                case 5:
                  tableHorariosBody.push([
                    {
                      text: "21 - 23",
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: seg,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: ter,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qua,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: qui,
                      alignment: "center",
                      fontSize: 8,
                    },
                    {
                      text: sex,
                      alignment: "center",
                      fontSize: 8,
                    },
                  ]);
                  break;
              }
              seg = ter = qua = qui = sex = "";
            }

            tables.push({
              table: {
                widths: ["*", "*", "*", "*", "*", "*"],
                headerRows: 1,
                color: "#426",
                body: tableHorariosBody,
              },
            });
          }
        }
      }

      tables.push({
        columns: [
          {
            image: logoDcc,
            fit: [60, 60],
            alignment: "left",
            width: "16%",
            margin: [0, 0, 0, 10],
            pageBreak: "before",
          },
          [
            {
              text: "Horários dos cursos do Departamento de Ciência da Computação",
              alignment: "center",
              bold: true,
              fontSize: 10,
              pageBreak: "before",
            },
            {
              text:
                "2º Semestre " + this.currentPlano.ano + " - " + this.currentPlano.nome,
              alignment: "center",
              bold: true,
              fontSize: 10,
              margin: [0, 0, 0, 5],
            },
          ],
          {
            image: logoUfjf,
            fit: [60, 60],
            alignment: "right",
            width: "16%",
            margin: [0, 0, 0, 10],
            pageBreak: "before",
          },
        ],
      });

      if (find(this.filtroCursos.ativados, { codigo: "-" }) || completo) {
        tables.push({
          text: "Eletivas",
          bold: true,
          margin: [0, 10, 0, 5],
          fontSize: 10,
        });

        if (eletivas2.length === 0) {
          vazio = vazio + 1;
        } else {
          let tableHorariosBody = [
            [
              {
                text: "Horário",
                alignment: "center",
                fontSize: 8,
                bold: true,
              },
              {
                text: "Segunda",
                alignment: "center",
                fontSize: 8,
                bold: true,
              },
              {
                text: "Terça",
                alignment: "center",
                fontSize: 8,
                bold: true,
              },
              {
                text: "Quarta",
                alignment: "center",
                fontSize: 8,
                bold: true,
              },
              {
                text: "Quinta",
                alignment: "center",
                fontSize: 8,
                bold: true,
              },
              {
                text: "Sexta",
                alignment: "center",
                fontSize: 8,
                bold: true,
              },
            ],
          ];
          for (let d = 0; d < 8; d++) {
            for (let j = 0; j < eletivas2.length; j++) {
              if (
                this.checkTurmaHorario(
                  eletivas2[j],
                  (d === 4 || d === 5 ? 28 : 1) + (d > 5 ? d - 2 : d)
                )
              ) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (eletivas2[j].Disciplina === disciplinas[k].id) {
                    if (seg !== "") seg = seg + "\n";
                    seg = seg + disciplinas[k].codigo + " " + eletivas2[j].letra;
                  }
                }
              }
              if (
                this.checkTurmaHorario(
                  eletivas2[j],
                  (d === 4 || d === 5 ? 30 : 7) + (d > 5 ? d - 2 : d)
                )
              ) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (eletivas2[j].Disciplina === disciplinas[k].id) {
                    if (ter != "") ter = ter + "\n";
                    ter = ter + disciplinas[k].codigo + " " + eletivas2[j].letra;
                  }
                }
              }
              if (
                this.checkTurmaHorario(
                  eletivas2[j],
                  (d === 4 || d === 5 ? 32 : 13) + (d > 5 ? d - 2 : d)
                )
              ) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (eletivas2[j].Disciplina === disciplinas[k].id) {
                    if (qua != "") qua = qua + "\n";
                    qua = qua + disciplinas[k].codigo + " " + eletivas2[j].letra;
                  }
                }
              }
              if (
                this.checkTurmaHorario(
                  eletivas2[j],
                  (d === 4 || d === 5 ? 34 : 19) + (d > 5 ? d - 2 : d)
                )
              ) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (eletivas2[j].Disciplina === disciplinas[k].id) {
                    if (qui != "") qui = qui + "\n";
                    qui = qui + disciplinas[k].codigo + " " + eletivas2[j].letra;
                  }
                }
              }
              if (
                this.checkTurmaHorario(
                  eletivas2[j],
                  (d === 4 || d === 5 ? 36 : 25) + (d > 5 ? d - 2 : d)
                )
              ) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (eletivas2[j].Disciplina === disciplinas[k].id) {
                    if (sex != "") sex = sex + "\n";
                    sex = sex + disciplinas[k].codigo + " " + eletivas2[j].letra;
                  }
                }
              }
            }
            switch (d) {
              case 0:
                tableHorariosBody.push([
                  {
                    text: "08 - 10",
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: seg,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: ter,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: qua,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: qui,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: sex,
                    alignment: "center",
                    fontSize: 8,
                  },
                ]);
                break;
              case 1:
                tableHorariosBody.push([
                  {
                    text: "10 - 12",
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: seg,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: ter,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: qua,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: qui,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: sex,
                    alignment: "center",
                    fontSize: 8,
                  },
                ]);
                break;
              case 2:
                tableHorariosBody.push([
                  {
                    text: "14 - 16",
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: seg,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: ter,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: qua,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: qui,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: sex,
                    alignment: "center",
                    fontSize: 8,
                  },
                ]);
                break;
              case 3:
                tableHorariosBody.push([
                  {
                    text: "16 - 18",
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: seg,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: ter,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: qua,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: qui,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: sex,
                    alignment: "center",
                    fontSize: 8,
                  },
                ]);
                break;
              case 4:
                tableHorariosBody.push([
                  {
                    text: "17 - 19",
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: seg,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: ter,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: qua,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: qui,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: sex,
                    alignment: "center",
                    fontSize: 8,
                  },
                ]);
                break;
              case 5:
                tableHorariosBody.push([
                  {
                    text: "18 - 20",
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: seg,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: ter,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: qua,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: qui,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: sex,
                    alignment: "center",
                    fontSize: 8,
                  },
                ]);
                break;
              case 6:
                tableHorariosBody.push([
                  {
                    text: "19 - 21",
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: seg,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: ter,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: qua,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: qui,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: sex,
                    alignment: "center",
                    fontSize: 8,
                  },
                ]);
                break;
              case 7:
                tableHorariosBody.push([
                  {
                    text: "21 - 23",
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: seg,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: ter,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: qua,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: qui,
                    alignment: "center",
                    fontSize: 8,
                  },
                  {
                    text: sex,
                    alignment: "center",
                    fontSize: 8,
                  },
                ]);
                break;
            }
            seg = ter = qua = qui = sex = "";
          }

          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: tableHorariosBody,
            },
          });
        }
      }

      const docDefinition = {
        content: tables,
        info: {
          title: "Horários - Cursos",
        },
        footer: function(currentPage, pageCount) {
          return {
            columns: [
              {
                text: new Date(Date.now()).toLocaleString(),
                margin: [30, 10, 0, 0],
                fontSize: 8,
                alignment: `left`,
              },
              {
                text: currentPage.toString() + " de " + pageCount,
                alignment: "right",
                margin: [0, 10, 30, 0],
                fontSize: 8,
              },
            ],
          };
        },
      };

      pdfMake.createPdf(docDefinition).open();
    },
  },

  computed: {
    ...mapGetters([
      "onLoading",
      "AllDisciplinas",
      "DisciplinasDasGrades",
      "AllGrades",
      "PrincipaisCursosDCC",
      "TurmasInDisciplinasPerfis",
      "TurmasExternasInDisciplinas",
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
      const turmasFiltredbyPeriodo = filter(this.TurmasInDisciplinasPerfis, [
        "periodo",
        2,
      ]);
      const turmasFiltredByPedidos = filter(turmasFiltredbyPeriodo, (turma) =>
        this.filterPedidoPeriodizado(turma, this.PedidosDeCursosDCC)
      );

      const turmasExternasFiltredbyPeriodo = filter(this.TurmasExternasInDisciplinas, [
        "periodo",
        2,
      ]);
      const turmasExternasFiltredbyPeidos = filter(
        turmasExternasFiltredbyPeriodo,
        (turma) => this.filterPedidoPeriodizado(turma, this.PedidosExternosDeCursosDCC)
      );

      return turmasExternasFiltredbyPeidos.concat(turmasFiltredByPedidos);
    },
    TurmasAtivas4Periodo() {
      const turmasFiltredbyPeriodo = filter(this.TurmasInDisciplinasPerfis, [
        "periodo",
        4,
      ]);
      const turmasFiltredByPedidos = filter(turmasFiltredbyPeriodo, (turma) =>
        this.filterPedidoPeriodizado(turma, this.PedidosDeCursosDCC)
      );

      const turmasExternasFiltredbyPeriodo = filter(this.TurmasExternasInDisciplinas, [
        "periodo",
        4,
      ]);
      const turmasExternasFiltredbyPeidos = filter(
        turmasExternasFiltredbyPeriodo,
        (turma) => this.filterPedidoPeriodizado(turma, this.PedidosExternosDeCursosDCC)
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
          (this.filtroPeriodosEstaAtivo.periodo1 ||
            this.filtroPeriodosEstaAtivo.periodo3)) ||
        this.filtroPeriodosEstaAtivo.periodo2 ||
        this.filtroPeriodosEstaAtivo.periodo4
      );
    },
  },

  watch: {
    TurmasInDisciplinasPerfis() {
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
