<template>
  <div class="main-component row" v-if="currentPlano.isEditable">
    <portal to="page-header">
      <BaseButton template="filtros" @click="toggleAsideModal('filtros')" />
      <BaseButton template="ajuda" @click="toggleAsideModal('ajuda')" />
    </portal>

    <NavTab
      :currentTab="tabAtivaMain"
      :allTabs="['Turmas', 'Docentes']"
      @change-tab="tabAtivaMain = $event"
    />

    <div class="div-table">
      <BaseTable v-show="tabAtivaMain === 'Turmas'" classes="custom-table-height">
        <template #thead>
          <v-th-ordination
            :currentOrder="ordenacaoTurmasMain"
            orderToCheck="periodo"
            width="35"
            title="Período letivo"
          >
            P.
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoTurmasMain"
            orderToCheck="disciplina.perfil.abreviacao"
            width="80"
            align="start"
            title="Período letivo"
          >
            Perfil
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoTurmasMain"
            orderToCheck="disciplina.codigo"
            width="80"
            align="start"
          >
            Código
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoTurmasMain"
            orderToCheck="disciplina.nome"
            width="300"
            align="start"
          >
            Disciplina
          </v-th-ordination>
          <v-th width="35" title="Turma">T.</v-th>
          <v-th width="130" align="start">Docentes</v-th>
          <v-th width="50">Editar</v-th>
        </template>

        <template #tbody>
          <template v-for="validacaoTurma in TurmasValidacoesOrdered">
            <tr :key="validacaoTurma.id + validacaoTurma.letra" class="bg-custom">
              <v-td width="35">
                {{ validacaoTurma.periodo }}
              </v-td>
              <v-td
                width="80"
                align="start"
                :title="validacaoTurma.disciplina.perfil.nome"
              >
                {{ validacaoTurma.disciplina.perfil.abreviacao }}
              </v-td>
              <v-td width="80" align="start">
                {{ validacaoTurma.disciplina.codigo }}
              </v-td>
              <v-td width="300" align="start">
                {{ validacaoTurma.disciplina.nome }}
              </v-td>
              <v-td width="35">
                {{ validacaoTurma.letra }}
              </v-td>
              <v-td width="130" align="start">
                {{ validacaoTurma.docente1Apelido }}
                <br />
                {{ validacaoTurma.docente2Apelido }}
              </v-td>
              <v-td width="50">
                <button
                  title="Editar turma"
                  class="btn-table"
                  @click.stop="openModalEditTurma(validacaoTurma)"
                >
                  <font-awesome-icon :icon="['fas', 'edit']" class="icon-darkgray" />
                </button>
              </v-td>
            </tr>

            <tr
              v-for="(conflito, i) in validacaoTurma.conflitos"
              :key="'conflito' + i + validacaoTurma.id + conflito.type"
            >
              <v-td width="35">
                <font-awesome-icon
                  v-if="isCritical(conflito.type)"
                  :icon="['fas', 'exclamation-circle']"
                  class="icon-red"
                  title="Conflito critico!"
                  style="font-size: 13px"
                />
              </v-td>
              <v-td width="670" align="start" colspan="6">{{ conflito.msg }}</v-td>
            </tr>
          </template>

          <tr v-if="!TurmasValidacoesOrdered.length">
            <v-td width="710">
              <b>Nenhum conflito encontrado em turmas.</b>
              Clique no botão de filtros
              <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" />
              para selecioná-los.
            </v-td>
          </tr>
        </template>
      </BaseTable>

      <BaseTable v-show="tabAtivaMain === 'Docentes'" classes="custom-table-height">
        <template #thead>
          <v-th-ordination
            :currentOrder="ordenacaoDocentesMain"
            orderToCheck="nome"
            width="710"
            align="start"
            colspan="2"
          >
            Nome
          </v-th-ordination>
        </template>

        <template #tbody>
          <template v-for="validacaoDocente in DocentesValidacoesOrdered">
            <tr :key="validacaoDocente.id + validacaoDocente.nome" class="bg-custom">
              <v-td colspan="2" width="710" align="start">
                {{ validacaoDocente.nome }}
              </v-td>
            </tr>

            <tr
              v-for="conflito in validacaoDocente.conflitos"
              :key="validacaoDocente.id + conflito"
            >
              <v-td width="35">
                <font-awesome-icon
                  :icon="['fas', 'exclamation-circle']"
                  class="icon-red"
                  title="Conflito critico!"
                  style="font-size: 13px"
                />
              </v-td>

              <v-td width="675" align="start">{{ conflito }}</v-td>
            </tr>
          </template>

          <tr v-if="!DocentesValidacoesOrdered.length">
            <v-td width="710">
              <b>Nenhum conflito encontrado em docentes.</b>
            </v-td>
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
        <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Conflitos'">
          <template #thead>
            <v-th width="25" />
            <v-th width="425" align="start">Conflito</v-th>
          </template>

          <template #tbody>
            <tr
              v-for="conflito in ConflitosOptionsOrdered"
              :key="conflito.type + conflito.msg"
              @click="toggleItemInArray(conflito.type, filtroConflitos.selecionados)"
              v-prevent-click-selection
            >
              <v-td width="25" type="content">
                <input
                  type="checkbox"
                  v-model="filtroConflitos.selecionados"
                  :value="conflito.type"
                />
              </v-td>
              <v-td width="425" align="start">{{ conflito.msg }}</v-td>
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
      </div>
    </ModalFiltros>

    <ModalEditTurma
      ref="modalEditTurma"
      :turma="turmaClicked"
      :hasEditDisciplina="false"
    />

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Visualizar conflitos:</b>
        Clique no ícone de filtros
        <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" />
        no cabeçalho da página e, na janela que se abrirá, utilize as abas para navegar
        entre os tipos de filtro disponíveis. Marque quais informações deseja visualizar,
        e para finalizar clique no botão OK.
      </li>
      <li class="list-group-item">
        <b>Editar turma:</b>
        Clique no ícone
        <font-awesome-icon :icon="['fas', 'edit']" class="icon-darkgray" />
        presente na couna "Editar". Uma janela de edição irá se abrir. As alterações
        realizadas nos campos da metade superior da janela somente serão enviadas ao
        clicar no botão "Salvar". Já para o quantitativo de vagas na parte inferior, as
        alterações serão salvas automaticamente.
      </li>
      <li class="list-group-item">
        <b>Conflitos críticos:</b>
        Note que alguns conflitos possuem o ícone
        <font-awesome-icon :icon="['fas', 'exclamation-circle']" class="icon-red" />
        . Isso significa que ele é crítico, devendo ser priorizado na correção.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { clone, cloneDeep, find, some, filter, orderBy } from "lodash-es";
import { generateEmptyTurma } from "@/common/utils";
import {
  toggleItemInArray,
  toggleAsideModal,
  conectaFiltrosSemestresEPeriodos,
  preventClickSelection,
} from "@/common/mixins";
import { ModalAjuda, ModalFiltros, ModalEditTurma } from "@/components/modals";
import { NavTab } from "@/components/ui";

const AllConflitosTurmas = [
  { type: 1, msg: "Nenhum turno alocado" },
  {
    type: 2,
    msg: "Disciplina da EAD deve ter turno EAD associado.",
  },
  {
    type: 3,
    msg: "Horários incompletos ou inválidos",
  },
  { type: 4, msg: "Nenhum docente alocado" },
  {
    type: 5,
    msg: "Disciplina prática deve ter laboratorio alocado",
  },
  {
    type: 6,
    msg: "Disciplina desejável laborátorio, porêm não possui laboratorio alocado",
  },
  {
    type: 7,
    msg: "Limite de lotação da sala ultrapassado",
  },
  {
    type: 8,
    msg: "Apenas 4 ou menos vagas foram alocadas",
  },
  { type: 9, msg: "Turma EAD não deve ter sala alocada" },
  { type: 10, msg: "Conflito de horarios na grade" },
  { type: 11, msg: "Disciplina de curso presencial não pode ter turno EAD" },
];

export default {
  name: "Validacoes",
  mixins: [
    toggleItemInArray,
    toggleAsideModal,
    conectaFiltrosSemestresEPeriodos,
    preventClickSelection,
  ],
  components: {
    ModalAjuda,
    ModalFiltros,
    ModalEditTurma,
    NavTab,
  },
  data() {
    return {
      tabAtivaMain: "Turmas",
      asideModalsRefs: ["modalFiltros", "modalAjuda"],
      turmaClicked: generateEmptyTurma(),
      allConflitos: clone(AllConflitosTurmas),
      grades1Semestre: { CCD: [], CCN: [], EC: [], SI: [] },
      grades2Semestre: { CCD: [], CCN: [], EC: [], SI: [] },
      ordenacaoTurmasMain: { order: "periodo", type: "asc" },
      ordenacaoDocentesMain: { order: "nome", type: "asc" },
      filtroConflitos: {
        ativados: [],
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
        current: "Conflitos",
        array: ["Conflitos", "Períodos", "Semestres"],
      },
      modalFiltrosCallbacks: {
        selectAll: {
          Conflitos: () => {
            this.filtroConflitos.selecionados = [
              ...this.allConflitos.map((conflito) => conflito.type),
            ];
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
          Conflitos: () => {
            this.filtroConflitos.selecionados = [];
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
          this.filtroConflitos.ativados = [...this.filtroConflitos.selecionados];
        },
      },
    };
  },

  beforeMount() {
    this.modalFiltrosCallbacks.selectAll.Periodos();

    //define grades ativas por periodo
    let g;
    let periodoInicial, periodoFinal;

    let ano = this.$store.state.plano.Plano[0].ano;
    //CCD
    g = filter(this.$store.state.grade.Grades, ["Curso", 4]);
    g = orderBy(g, "periodoInicio", "desc");
    periodoFinal = 0;
    for (let i = 0; i < g.length; i++) {
      periodoInicial = periodoFinal + 1;
      periodoFinal =
        1 +
        2 * (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
        (1 - parseInt(g[i].periodoInicio.slice(5, 6), 10)) / 2;
      this.grades1Semestre.CCD.push({
        id: g[i].id,
        inicio: periodoInicial,
        fim: periodoFinal,
      });
      if (periodoFinal > 9) {
        break;
      }
    }
    periodoFinal = 0;
    for (let i = 0; i < g.length; i++) {
      periodoInicial = periodoFinal + 1;
      periodoFinal =
        1 +
        2 * (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
        (3 - parseInt(g[i].periodoInicio.slice(5, 6), 10)) / 2;
      this.grades2Semestre.CCD.push({
        id: g[i].id,
        inicio: periodoInicial,
        fim: periodoFinal,
      });
      if (periodoFinal > 9) {
        break;
      }
    }
    //CCN
    g = filter(this.$store.state.grade.Grades, ["Curso", 1]);
    g = orderBy(g, "periodoInicio", "desc");
    periodoFinal = 0;
    for (let i = 0; i < g.length; i++) {
      periodoInicial = periodoFinal + 1;
      periodoFinal =
        1 +
        2 * (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
        (1 - parseInt(g[i].periodoInicio.slice(5, 6), 10)) / 2;
      this.grades1Semestre.CCN.push({
        id: g[i].id,
        inicio: periodoInicial,
        fim: periodoFinal,
      });
      if (periodoFinal > 9) {
        break;
      }
    }
    periodoFinal = 0;
    for (let i = 0; i < g.length; i++) {
      periodoInicial = periodoFinal + 1;
      periodoFinal =
        1 +
        2 * (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
        (3 - parseInt(g[i].periodoInicio.slice(5, 6), 10)) / 2;
      this.grades2Semestre.CCN.push({
        id: g[i].id,
        inicio: periodoInicial,
        fim: periodoFinal,
      });
      if (periodoFinal > 9) {
        break;
      }
    }
    //SI
    g = filter(this.$store.state.grade.Grades, ["Curso", 3]);
    g = orderBy(g, "periodoInicio", "desc");
    periodoFinal = 0;
    for (let i = 0; i < g.length; i++) {
      periodoInicial = periodoFinal + 1;
      periodoFinal =
        1 +
        2 * (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
        (1 - parseInt(g[i].periodoInicio.slice(5, 6), 10)) / 2;
      this.grades1Semestre.SI.push({
        id: g[i].id,
        inicio: periodoInicial,
        fim: periodoFinal,
      });
      if (periodoFinal > 9) {
        break;
      }
    }
    periodoFinal = 0;
    for (let i = 0; i < g.length; i++) {
      periodoInicial = periodoFinal + 1;
      periodoFinal =
        1 +
        2 * (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
        (3 - parseInt(g[i].periodoInicio.slice(5, 6), 10)) / 2;
      this.grades2Semestre.SI.push({
        id: g[i].id,
        inicio: periodoInicial,
        fim: periodoFinal,
      });
      if (periodoFinal > 9) {
        break;
      }
    }
    //EC
    g = filter(this.$store.state.grade.Grades, ["Curso", 2]);
    g = orderBy(g, "periodoInicio", "desc");
    periodoFinal = 0;
    for (let i = 0; i < g.length; i++) {
      periodoInicial = periodoFinal + 1;
      periodoFinal =
        1 +
        2 * (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
        (1 - parseInt(g[i].periodoInicio.slice(5, 6), 10)) / 2;
      this.grades1Semestre.EC.push({
        id: g[i].id,
        inicio: periodoInicial,
        fim: periodoFinal,
      });
      if (periodoFinal > 9) {
        break;
      }
    }
    periodoFinal = 0;
    for (let i = 0; i < g.length; i++) {
      periodoInicial = periodoFinal + 1;
      periodoFinal =
        1 +
        2 * (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
        (3 - parseInt(g[i].periodoInicio.slice(5, 6), 10)) / 2;
      this.grades2Semestre.EC.push({
        id: g[i].id,
        inicio: periodoInicial,
        fim: periodoFinal,
      });
      if (periodoFinal > 9) {
        break;
      }
    }
  },

  methods: {
    openModalEditTurma(turma) {
      this.turmaClicked = turma;
      this.$refs.modalEditTurma.open();
    },
    createValidacao(turma) {
      const validacaoResult = cloneDeep(turma);

      validacaoResult.docente1Apelido = this.findDocenteApelidoById(turma.Docente1);
      validacaoResult.docente2Apelido = this.findDocenteApelidoById(turma.Docente2);
      validacaoResult.pedidosTotais = this.totalPedidos(turma.id);
      validacaoResult.conflitos = [];
      return validacaoResult;
    },
    checkAllValidations(validacao) {
      let check;

      check = this.checkTurno(validacao.turno1);
      if (check) validacao.conflitos.push(check);
      //Compatibilidade do turno com disciplina
      check = this.checkTurnoEAD(validacao.disciplina.ead, validacao.turno1);
      if (check) validacao.conflitos.push(check);

      check = this.checkHorarios(
        validacao.disciplina.ead,
        validacao.disciplina.creditoTotal,
        validacao.Horario1,
        validacao.Horario2
      );
      if (check) validacao.conflitos.push(check);

      check = this.checkDocentes(validacao.docente1Apelido, validacao.docente2Apelido);
      if (check) validacao.conflitos.push(check);

      check = this.checkSalasLab(
        validacao.disciplina.laboratorio,
        validacao.Sala1,
        validacao.Sala2
      );
      if (check) validacao.conflitos.push(check);
      //Lotação das salas
      check = this.checkVagaSala(validacao.Sala1, validacao.pedidosTotais);
      if (check) validacao.conflitos.push(check);

      if (validacao.Sala1 != validacao.Sala2) {
        check = this.checkVagaSala(validacao.Sala2, validacao.pedidosTotais);
        if (check) validacao.conflitos.push(check);
      }

      check = this.checkPedidos(validacao.pedidosTotais);
      if (check) validacao.conflitos.push(check);

      check = this.checkSalasInEAD(
        validacao.disciplina.ead,
        validacao.Sala1,
        validacao.Sala2
      );
      if (check) validacao.conflitos.push(check);

      check = this.checkPeriodoCursos(validacao);
      if (check) validacao.conflitos.push(check);

      check = null;
    },
    checkTurno(turno) {
      return turno === null || turno === undefined || turno === ""
        ? this.allConflitos[0]
        : null;
    },
    checkTurnoEAD(isEAD, turno) {
      return (isEAD == 1 && turno !== "EAD") || (isEAD != 1 && turno == "EAD")
        ? this.allConflitos[1]
        : false;
    },
    checkHorarios(isEAD, creditoTotal, horario1, horario2) {
      if (isEAD != 1) {
        if (creditoTotal <= 2) {
          return horario1 == null && horario2 == null ? this.allConflitos[2] : false;
        } else {
          return horario1 == null || horario2 == null ? this.allConflitos[2] : false;
        }
      }
      return false;
    },
    checkDocentes(docente1, docente2) {
      return docente1 === null && docente2 == null ? this.allConflitos[3] : false;
    },
    checkSalasLab(isLab, sala1, sala2) {
      //Não lab
      if (isLab == 0) return false;
      //Obrigatorio
      else if (isLab == 1) {
        return !this.isLab(sala1) && !this.isLab(sala2) ? this.allConflitos[4] : false;
        //Desejavel
      } else if (isLab == 2) {
        return !this.isLab(sala1) && !this.isLab(sala2) ? this.allConflitos[5] : false;
      }
    },
    checkVagaSala(salaId, pedidosTotais) {
      let sala;
      if (salaId != null) sala = find(this.AllSalas, (s) => salaId == s.id);

      if (sala != undefined) {
        if (sala.lotacao_maxima < pedidosTotais) {
          return {
            type: 7,
            msg: `Limite da sala ${sala.nome} execedido. Vagas: ${pedidosTotais} - Lotação: ${sala.lotacao_maxima} `,
          };
        }
      }
    },
    checkPedidos(pedidosTotais) {
      return pedidosTotais <= 4 ? this.allConflitos[7] : false;
    },
    checkSalasInEAD(isEAD, sala1, sala2) {
      if (isEAD == 1) {
        return sala1 != null || sala2 != null ? this.allConflitos[8] : false;
      }
      return false;
    },
    checkPeriodoCursos(turma) {
      if (turma.Horario1 === null && turma.Horario2 === null) {
        return false;
      }
      let msg = "";
      let pedidos = this.$store.state.pedido.Pedidos[turma.id];
      let grades;
      if (turma.periodo === 1 || turma.periodo === 2) {
        grades = this.grades1Semestre;
      } else {
        grades = this.grades2Semestre;
      }
      let conflitos = false;
      if (find(pedidos, { Curso: 4 }).vagasPeriodizadas > 0) {
        for (let i = 0; i < grades.CCD.length; i++) {
          let disciplinaGrade = find(this.$store.state.disciplinaGrade.DisciplinaGrades, {
            Grade: grades.CCD[i].id,
            Disciplina: turma.Disciplina,
          });
          if (
            disciplinaGrade !== undefined &&
            disciplinaGrade.periodo >= grades.CCD[i].inicio &&
            disciplinaGrade.periodo <= grades.CCD[i].fim
          ) {
            let disciplinasPeriodo = filter(
              this.$store.state.disciplinaGrade.DisciplinaGrades,
              { Grade: grades.CCD[i].id, periodo: disciplinaGrade.periodo }
            );
            for (let d = 0; d < disciplinasPeriodo.length; d++) {
              if (disciplinasPeriodo[d].Disciplina === turma.Disciplina) {
                continue;
              }
              let disciplinaConflito = find(this.$store.state.disciplina.Disciplinas, {
                id: disciplinasPeriodo[d].Disciplina,
              });
              let externa =
                disciplinaConflito.Perfil == 13 || disciplinaConflito.Perfil == 15;
              let turmasDisciplina = filter(
                externa
                  ? this.$store.state.turmaExterna.Turmas
                  : this.$store.state.turma.Turmas,
                (t) => {
                  let pedido = find(
                    externa
                      ? this.$store.state.pedidoExterno.Pedidos[t.id]
                      : this.$store.state.pedido.Pedidos[t.id],
                    {
                      Curso: 4,
                    }
                  );
                  return (
                    t.periodo == turma.periodo &&
                    t.Disciplina === disciplinasPeriodo[d].Disciplina &&
                    pedido.vagasPeriodizadas > 0
                  );
                }
              );
              for (let t = 0; t < turmasDisciplina.length; t++) {
                if (
                  (turma.Horario1 !== null &&
                    (turma.Horario1 === turmasDisciplina[t].Horario1 ||
                      turma.Horario1 === turmasDisciplina[t].Horario2)) ||
                  (turma.Horario2 !== null &&
                    (turma.Horario2 === turmasDisciplina[t].Horario1 ||
                      turma.Horario2 === turmasDisciplina[t].Horario2))
                ) {
                  conflitos = true;
                  msg =
                    msg +
                    `\nConflito de Horário com a turma ${disciplinaConflito.codigo}${turmasDisciplina[t].letra} no ${disciplinaGrade.periodo}º período da grade de Ciência da Computação - Diurno`;
                }
              }
            }
          }
        }
      }
      if (find(pedidos, { Curso: 1 }).vagasPeriodizadas > 0) {
        for (let i = 0; i < grades.CCN.length; i++) {
          let disciplinaGrade = find(this.$store.state.disciplinaGrade.DisciplinaGrades, {
            Grade: grades.CCN[i].id,
            Disciplina: turma.Disciplina,
          });
          if (
            disciplinaGrade !== undefined &&
            disciplinaGrade.periodo >= grades.CCN[i].inicio &&
            disciplinaGrade.periodo <= grades.CCN[i].fim
          ) {
            let disciplinasPeriodo = filter(
              this.$store.state.disciplinaGrade.DisciplinaGrades,
              { Grade: grades.CCN[i].id, periodo: disciplinaGrade.periodo }
            );
            for (let d = 0; d < disciplinasPeriodo.length; d++) {
              if (disciplinasPeriodo[d].Disciplina === turma.Disciplina) {
                continue;
              }
              let disciplinaConflito = find(this.$store.state.disciplina.Disciplinas, {
                id: disciplinasPeriodo[d].Disciplina,
              });
              let externa =
                disciplinaConflito.Perfil == 13 || disciplinaConflito.Perfil == 15;
              let turmasDisciplina = filter(
                externa
                  ? this.$store.state.turmaExterna.Turmas
                  : this.$store.state.turma.Turmas,
                (t) => {
                  let pedido = find(
                    externa
                      ? this.$store.state.pedidoExterno.Pedidos[t.id]
                      : this.$store.state.pedido.Pedidos[t.id],
                    {
                      Curso: 1,
                    }
                  );
                  return (
                    t.periodo == turma.periodo &&
                    t.Disciplina === disciplinasPeriodo[d].Disciplina &&
                    pedido.vagasPeriodizadas > 0
                  );
                }
              );
              for (let t = 0; t < turmasDisciplina.length; t++) {
                if (
                  (turma.Horario1 !== null &&
                    (turma.Horario1 === turmasDisciplina[t].Horario1 ||
                      turma.Horario1 === turmasDisciplina[t].Horario2)) ||
                  (turma.Horario2 !== null &&
                    (turma.Horario2 === turmasDisciplina[t].Horario1 ||
                      turma.Horario2 === turmasDisciplina[t].Horario2))
                ) {
                  conflitos = true;
                  msg =
                    msg +
                    `\nConflito de Horário com a turma ${disciplinaConflito.codigo}${turmasDisciplina[t].letra} no ${disciplinaGrade.periodo}º período da grade de Ciência da Computação - Noturno`;
                }
              }
            }
          }
        }
      }
      if (find(pedidos, { Curso: 3 }).vagasPeriodizadas > 0) {
        for (let i = 0; i < grades.SI.length; i++) {
          let disciplinaGrade = find(this.$store.state.disciplinaGrade.DisciplinaGrades, {
            Grade: grades.SI[i].id,
            Disciplina: turma.Disciplina,
          });
          if (
            disciplinaGrade !== undefined &&
            disciplinaGrade.periodo >= grades.SI[i].inicio &&
            disciplinaGrade.periodo <= grades.SI[i].fim
          ) {
            let disciplinasPeriodo = filter(
              this.$store.state.disciplinaGrade.DisciplinaGrades,
              { Grade: grades.SI[i].id, periodo: disciplinaGrade.periodo }
            );
            for (let d = 0; d < disciplinasPeriodo.length; d++) {
              if (disciplinasPeriodo[d].Disciplina === turma.Disciplina) {
                continue;
              }
              let disciplinaConflito = find(this.$store.state.disciplina.Disciplinas, {
                id: disciplinasPeriodo[d].Disciplina,
              });
              let externa =
                disciplinaConflito.Perfil == 13 || disciplinaConflito.Perfil == 15;
              let turmasDisciplina = filter(
                externa
                  ? this.$store.state.turmaExterna.Turmas
                  : this.$store.state.turma.Turmas,
                (t) => {
                  let pedido = find(
                    externa
                      ? this.$store.state.pedidoExterno.Pedidos[t.id]
                      : this.$store.state.pedido.Pedidos[t.id],
                    {
                      Curso: 3,
                    }
                  );
                  return (
                    t.periodo == turma.periodo &&
                    t.Disciplina === disciplinasPeriodo[d].Disciplina &&
                    pedido.vagasPeriodizadas > 0
                  );
                }
              );
              for (let t = 0; t < turmasDisciplina.length; t++) {
                if (
                  (turma.Horario1 !== null &&
                    (turma.Horario1 === turmasDisciplina[t].Horario1 ||
                      turma.Horario1 === turmasDisciplina[t].Horario2)) ||
                  (turma.Horario2 !== null &&
                    (turma.Horario2 === turmasDisciplina[t].Horario1 ||
                      turma.Horario2 === turmasDisciplina[t].Horario2))
                ) {
                  conflitos = true;
                  msg =
                    msg +
                    `\nConflito de Horário com a turma ${disciplinaConflito.codigo}${turmasDisciplina[t].letra} no ${disciplinaGrade.periodo}º período da grade de Sistemas de Informação`;
                }
              }
            }
          }
        }
      }
      if (find(pedidos, { Curso: 2 }).vagasPeriodizadas > 0) {
        for (let i = 0; i < grades.EC.length; i++) {
          let disciplinaGrade = find(this.$store.state.disciplinaGrade.DisciplinaGrades, {
            Grade: grades.EC[i].id,
            Disciplina: turma.Disciplina,
          });
          if (
            disciplinaGrade !== undefined &&
            disciplinaGrade.periodo >= grades.EC[i].inicio &&
            disciplinaGrade.periodo <= grades.EC[i].fim
          ) {
            let disciplinasPeriodo = filter(
              this.$store.state.disciplinaGrade.DisciplinaGrades,
              { Grade: grades.EC[i].id, periodo: disciplinaGrade.periodo }
            );
            for (let d = 0; d < disciplinasPeriodo.length; d++) {
              if (disciplinasPeriodo[d].Disciplina === turma.Disciplina) {
                continue;
              }
              let disciplinaConflito = find(this.$store.state.disciplina.Disciplinas, {
                id: disciplinasPeriodo[d].Disciplina,
              });
              let externa =
                disciplinaConflito.Perfil == 13 || disciplinaConflito.Perfil == 15;
              let turmasDisciplina = filter(
                externa
                  ? this.$store.state.turmaExterna.Turmas
                  : this.$store.state.turma.Turmas,
                (t) => {
                  let pedido = find(
                    externa
                      ? this.$store.state.pedidoExterno.Pedidos[t.id]
                      : this.$store.state.pedido.Pedidos[t.id],
                    {
                      Curso: 2,
                    }
                  );
                  return (
                    t.periodo == turma.periodo &&
                    t.Disciplina === disciplinasPeriodo[d].Disciplina &&
                    pedido.vagasPeriodizadas > 0
                  );
                }
              );
              for (let t = 0; t < turmasDisciplina.length; t++) {
                if (
                  (turma.Horario1 !== null &&
                    (turma.Horario1 === turmasDisciplina[t].Horario1 ||
                      turma.Horario1 === turmasDisciplina[t].Horario2)) ||
                  (turma.Horario2 !== null &&
                    (turma.Horario2 === turmasDisciplina[t].Horario1 ||
                      turma.Horario2 === turmasDisciplina[t].Horario2))
                ) {
                  conflitos = true;
                  msg =
                    msg +
                    `\nConflito de Horário com a turma ${disciplinaConflito.codigo}${turmasDisciplina[t].letra} no ${disciplinaGrade.periodo}º período da grade de Engenharia Computacional`;
                }
              }
            }
          }
        }
      }
      if (conflitos) return { type: 10, msg: msg };
      else return false;
    },

    creditosGraduacao(docente) {
      let turmas = filter(this.$store.state.turma.Turmas, (t) => {
        return t.Docente1 === docente.id || t.Docente2 === docente.id;
      });

      let cargaTotalDocente = 0;

      for (let i = 0; i < turmas.length; i++) {
        let disciplina = find(this.$store.state.disciplina.Disciplinas, {
          id: turmas[i].Disciplina,
        });
        let cargaTotalDisciplina = disciplina.cargaTeorica + disciplina.cargaPratica;
        if (turmas[i].Docente1 != null && turmas[i].Docente2 != null) {
          if (turmas[i].Docente1 !== turmas[i].Docente2) {
            cargaTotalDisciplina = cargaTotalDisciplina / 2.0;
          }
        }
        cargaTotalDocente = cargaTotalDocente + cargaTotalDisciplina;
      }

      return cargaTotalDocente;
    },
    creditosPos(docente) {
      let turmas = filter(this.$store.state.cargaPos.Cargas, (t) => {
        return t.Docente === docente.id;
      });

      let cargaTotalDocente = 0;

      for (let i = 0; i < turmas.length; i++) {
        cargaTotalDocente = cargaTotalDocente + turmas[i].creditos;
      }

      return cargaTotalDocente;
    },
    filterByPeriodo(periodo) {
      return some(this.filtroPeriodos.ativados, ["id", periodo]);
    },
    filterByConflitos(arrayConflitos) {
      const conflitosResultantes = filter(arrayConflitos, (conflito) =>
        some(
          this.filtroConflitos.ativados,
          (conflitoType) => conflitoType === conflito.type
        )
      );
      return conflitosResultantes;
    },

    findDocenteApelidoById(id) {
      let docente = find(this.DocentesAtivos, (d) => d.id == id);
      return docente != undefined ? docente.apelido : null;
    },
    totalPedidos(turmaId) {
      const pedidos = this.$store.state.pedido.Pedidos[turmaId];
      if (!pedidos.length) return 0;

      let result = 0;
      for (let p = 0; p < pedidos.length; p++) {
        result += parseInt(pedidos[p].vagasPeriodizadas, 10);
        result += parseInt(pedidos[p].vagasNaoPeriodizadas, 10);
      }
      return result;
    },
    isCritical(tipo) {
      return tipo == 1 || tipo == 2 || tipo == 3 || tipo == 4 || tipo == 5.1
        ? true
        : false;
    },
    isLab(salaId) {
      let salaResultante = find(
        this.AllSalas,
        (sala) => salaId == sala.id && sala.laboratorio
      );
      if (salaResultante !== undefined) return true;
      else return false;
    },
    isEmpty(value) {
      return value === null || value === undefined || value === "";
    },
  },

  computed: {
    ...mapGetters(["AllSalas", "DocentesAtivos", "TurmasInDisciplinasPerfis"]),

    TurmasValidacoesOrdered() {
      return orderBy(
        this.TurmasValidacoesFiltred,
        this.ordenacaoTurmasMain.order,
        this.ordenacaoTurmasMain.type
      );
    },
    TurmasValidacoesFiltred() {
      const turmasResultantes = [];

      this.TurmasValidacoes.forEach((turma) => {
        const filtredConflitos = this.filterByConflitos(turma.conflitos);
        const filtredPeriodo = this.filterByPeriodo(turma.periodo);

        if (filtredConflitos.length && filtredPeriodo)
          turmasResultantes.push({ ...turma, conflitos: filtredConflitos });
      });

      return turmasResultantes;
    },
    TurmasValidacoes() {
      let turmasResultantes = [];

      this.TurmasInDisciplinasPerfis.forEach((turma) => {
        let validacao = this.createValidacao(turma);
        this.checkAllValidations(validacao);

        if (validacao.conflitos.length) turmasResultantes.push(validacao);
      });
      return turmasResultantes;
    },

    DocentesValidacoesOrdered() {
      return orderBy(
        this.DocentesValidacoes,
        this.ordenacaoDocentesMain.order,
        this.ordenacaoDocentesMain.type
      );
    },
    DocentesValidacoes() {
      let docentesResultantes = [];

      this.DocentesAtivos.forEach((docente) => {
        let validacao = { nome: docente.nome, id: docente.id, conflitos: [] };

        const cargaGraduacao = this.creditosGraduacao(docente);
        const cargaPos = this.creditosPos(docente);

        if (cargaGraduacao < 8.0) {
          validacao.conflitos.push(`Apenas ${cargaGraduacao} créditos na graduação`);
        }

        if (cargaGraduacao + cargaPos < 16.0) {
          validacao.conflitos.push(
            `Apenas ${cargaGraduacao +
              cargaPos} créditos, ${cargaGraduacao}  na graduação e ${cargaPos} na pós`
          );
        }

        if (validacao.conflitos.length) docentesResultantes.push(validacao);
      });

      return docentesResultantes;
    },

    ConflitosOptionsOrdered() {
      return orderBy(AllConflitosTurmas, "msg");
    },
  },
};
</script>

<style scoped>
.btn-table {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: none;
  background: none;
  font-size: 12px;
}
.custom-table-height {
  height: calc(100vh - 130px) !important;
}
</style>
