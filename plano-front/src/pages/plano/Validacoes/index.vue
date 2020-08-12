<template>
  <div class="main-component row">
    <PageHeader :title="'Validações do Plano'">
      <BaseButton title="Filtros" :type="'icon'" :color="'gray'" @click="openAsideModal('filtros')">
        <font-awesome-icon :icon="['fas','list-ul']" />
      </BaseButton>
      <BaseButton :type="'icon'" :color="'lightblue'" @click="openAsideModal('ajuda')">
        <font-awesome-icon :icon="['fas','question']" />
      </BaseButton>
    </PageHeader>

    <NavTab
      :currentTab="tabAtivaMain"
      :allTabs="['Turmas', 'Docentes']"
      @change-tab="tabAtivaMain = $event"
    />

    <div class="div-table">
      <BaseTable v-show="tabAtivaMain === 'Turmas'" :styles="'height: calc(100vh - 130px)'">
        <template #thead>
          <th
            @click="toggleOrder(ordenacaoTurmasMain, 'periodo')"
            class="clickable"
            style="width: 35px"
            title="Semestre"
          >
            S.
            <i :class="setIconByOrder(ordenacaoTurmasMain, 'periodo')"></i>
          </th>
          <th
            @click="
              toggleOrder(ordenacaoTurmasMain, 'disciplina.perfil.abreviacao')
            "
            class="t-start clickable"
            style="width: 75px"
          >
            Perfil
            <i
              :class="
                setIconByOrder(
                  ordenacaoTurmasMain,
                  'disciplina.perfil.abreviacao'
                )
              "
            ></i>
          </th>
          <th
            @click="toggleOrder(ordenacaoTurmasMain, 'disciplina.codigo')"
            class="t-start clickable"
            style="width: 70px"
            title="Código"
          >
            Cód.
            <i :class="setIconByOrder(ordenacaoTurmasMain, 'disciplina.codigo')"></i>
          </th>
          <th
            @click="toggleOrder(ordenacaoTurmasMain, 'disciplina.nome')"
            class="t-start clickable"
            style="width: 300px"
          >
            Disciplina
            <i :class="setIconByOrder(ordenacaoTurmasMain, 'disciplina.nome')"></i>
          </th>
          <th style="width: 35px" class="t-staty" title="Turma">T.</th>
          <th style="width: 130px" class="s-start">Docentes</th>
          <th style="width:50px">Editar</th>
        </template>

        <template #tbody>
          <template v-for="validacaoTurma in TurmasValidacoesOrdered">
            <tr :key="'turmaId' + validacaoTurma.id" class="bg-custom">
              <td style="width: 35px;">{{ validacaoTurma.periodo }}</td>
              <td
                style="width: 75px;"
                class="t-start"
              >{{ validacaoTurma.disciplina.perfil.abreviacao }}</td>
              <td style="width: 70px;" class="t-start">{{ validacaoTurma.disciplina.codigo }}</td>
              <td style="width: 300px;" class="t-start">{{ validacaoTurma.disciplina.nome }}</td>
              <td style="width: 35px">{{ validacaoTurma.letra }}</td>
              <td style="width: 130px">
                {{ validacaoTurma.docente1Apelido }}
                <br />
                {{ validacaoTurma.docente2Apelido }}
              </td>
              <td style="width: 50px" class="clickable" title="Editar turma">
                <button class="btn-table" @click.stop="openModalEditTurma(validacaoTurma)">
                  <font-awesome-icon :icon="['fas','edit']" class="btn-table-icon icon-darkgray" />
                </button>
              </td>
            </tr>

            <tr
              v-for="(conflito, i) in validacaoTurma.conflitos"
              :key="'conflito' + i + validacaoTurma.id + conflito.type"
            >
              <td style="width: 35px;">
                <i
                  v-if="isCritical(conflito.type)"
                  style="background-color: inherit; font-size: 13px; margin:3px!important;"
                  class="fas fa-exclamation-circle icon-red"
                  title="Conflito critico!"
                ></i>
              </td>
              <td colspan="6" style="width:655px" class="t-start">{{ conflito.msg }}</td>
            </tr>
          </template>

          <tr v-show="!TurmasValidacoesOrdered.length">
            <td style="width:695px">
              <b>Nenhum conflito encontrado.</b> Clique no botão de filtros
              <i class="fas fa-list-ul mx-1"></i> para selecioná-los.
            </td>
          </tr>
        </template>
      </BaseTable>

      <BaseTable v-show="tabAtivaMain === 'Docentes'" :styles="'height: calc(100vh - 130px)'">
        <template #thead>
          <th
            colspan="2"
            @click="toggleOrder(ordenacaoDocentesMain, 'nome')"
            style="width: 695px"
            class="t-start clickable"
          >
            Nome
            <i :class="setIconByOrder(ordenacaoDocentesMain, 'nome')"></i>
          </th>
        </template>
        <template #tbody>
          <template v-for="validacaoDocente in DocentesValidacoesOrdered">
            <tr :key="'docenteId' + validacaoDocente.id" class="bg-custom">
              <td colspan="2" style="width: 695px;" class="t-start">{{ validacaoDocente.nome }}</td>
            </tr>
            <tr
              v-for="conflito in validacaoDocente.conflitos"
              :key="'conflitos' + validacaoDocente.id + conflito"
            >
              <td style="width: 35px">
                <i
                  style="background-color: inherit; font-size: 13px; margin:3px!important;"
                  class="fas fa-exclamation-circle icon-red"
                  title="Conflito critico!"
                ></i>
              </td>

              <td style="width: 655px;" class="t-start">{{ conflito }}</td>
            </tr>
          </template>
        </template>
      </BaseTable>
    </div>

    <ModalFiltros
      ref="modalFiltros"
      :callbacks="modalFiltrosCallbacks"
      :tabsOptions="modalFiltrosTabs"
    >
      <div class="div-table">
        <BaseTable v-show="modalFiltrosTabs.current === 'Conflitos'" :type="'modal'">
          <template #thead>
            <th style="width: 25px"></th>
            <th style="width: 425px" class="t-start">Conflito</th>
          </template>
          <template #tbody>
            <tr
              v-for="conflito in ConflitosOrdered"
              :key="'conflitosModal' + conflito.type"
              @click="
                toggleItemInArray(conflito.type, filtroConflitos.selecionados)
              "
              style="text-transform: uppercase"
            >
              <td style="width: 25px;">
                <input
                  type="checkbox"
                  class="form-check-input position-static m-0"
                  v-model="filtroConflitos.selecionados"
                  :value="conflito.type"
                />
              </td>
              <td style="width: 425px" class="t-start">{{ conflito.msg }}</td>
            </tr>
          </template>
        </BaseTable>

        <BaseTable v-show="modalFiltrosTabs.current === 'Semestres'" :type="'modal'">
          <template #thead>
            <th style="width: 25px;"></th>
            <th style="width: 425px;" class="t-start">Semestre Letivo</th>
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

    <ModalEditTurma ref="modalEditTurma" :turmaSelected="turmaClickada" :hasEditDisciplina="false" />

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Para exibir conteúdo na tabela:</b> Clique no ícone filtros
        <i class="fas fa-list-ul icon-gray"></i> no cabeçalho da página e na
        janela que será aberta utilize as abas para navegar entre os tipos de
        filtros. Marque em suas respectivas tabelas quais informações deseja
        visualizar, e para finalizar clique no botão OK.
      </li>
      <li class="list-group-item">
        <b>Para editar turma da tabela:</b> Clique no ícone
        <i class="fas fa-edit"></i> presente na coluna editar da tabela, e na
        janela que será aberta no formulário presente na parte superior poderá
        ser feito alterações que somente serão enviadas ao clicar no botão
        salvar. E na tabela de vagas na parte inferior da janela as alterações
        serão salvas automaticamente.
      </li>
      <li class="list-group-item">
        <b>Conflitos críticos:</b> Note que em alguns conflitos possuem o ícone
        <i class="fas fa-exclamation-circle icon-red"></i>, isso significa que
        ele é crítico e deve ter prioridade para ser corrigido
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { toggleOrdination, toggleItemInArray } from "@/common/mixins";
import { NavTab } from "@/components/ui";
import { ModalAjuda, ModalFiltros, ModalEditTurma } from "@/components/modals";

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
    msg:
      "Disciplina desejável laborátorio, porêm não possui laboratorio alocado",
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
  mixins: [toggleOrdination, toggleItemInArray],
  components: {
    ModalAjuda,
    ModalFiltros,
    ModalEditTurma,
    NavTab,
  },
  data() {
    return {
      tabAtivaMain: "Turmas",
      turmaClickada: null,
      allConflitos: this.$_.clone(AllConflitosTurmas),
      grades1Semestre: { CCD: [], CCN: [], EC: [], SI: [] },
      grades2Semestre: { CCD: [], CCN: [], EC: [], SI: [] },
      ordenacaoTurmasMain: { order: "periodo", type: "asc" },
      ordenacaoDocentesMain: { order: "nome", type: "asc" },
      filtroConflitos: {
        ativados: [],
        selecionados: [],
      },
      filtroSemestres: {
        primeiro: true,
        segundo: true,
        ativo: 3,
      },
      modalFiltrosTabs: {
        current: "Conflitos",
        array: ["Conflitos", "Semestres"],
      },
      modalFiltrosCallbacks: {
        selectAll: {
          Conflitos: () => {
            this.filtroConflitos.selecionados = [
              ...this.allConflitos.map((conflito) => conflito.type),
            ];
          },
          Semestres: () => {
            this.filtroSemestres.primeiro = true;
            this.filtroSemestres.segundo = true;
          },
        },
        selectNone: {
          Conflitos: () => {
            this.filtroConflitos.selecionados = [];
          },
          Semestres: () => {
            this.filtroSemestres.primeiro = false;
            this.filtroSemestres.segundo = false;
          },
        },
        btnOk: () => {
          this.btnOkSemestre();
          this.filtroConflitos.ativados = [
            ...this.filtroConflitos.selecionados,
          ];
        },
      },
    };
  },
  mounted() {
    //define grades ativas por periodo
    let g;
    let periodoInicial, periodoFinal;

    let ano = this.$store.state.plano.Plano[0].ano;
    //CCD
    g = this.$_.filter(this.$store.state.grade.Grades, ["Curso", 4]);
    g = this.$_.orderBy(g, "periodoInicio", "desc");
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
    g = this.$_.filter(this.$store.state.grade.Grades, ["Curso", 1]);
    g = this.$_.orderBy(g, "periodoInicio", "desc");
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
    g = this.$_.filter(this.$store.state.grade.Grades, ["Curso", 3]);
    g = this.$_.orderBy(g, "periodoInicio", "desc");
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
    g = this.$_.filter(this.$store.state.grade.Grades, ["Curso", 2]);
    g = this.$_.orderBy(g, "periodoInicio", "desc");
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
    openAsideModal(modalName) {
      if (modalName === "filtros") {
        this.$refs.modalFiltros.toggle();
        this.$refs.modalAjuda.close();
      } else if (modalName === "ajuda") {
        this.$refs.modalAjuda.toggle();
        this.$refs.modalFiltros.close();
      }
    },
    btnOkSemestre() {
      if (this.filtroSemestres.primeiro && !this.filtroSemestres.segundo)
        this.filtroSemestres.ativo = 1;
      else if (!this.filtroSemestres.primeiro && this.filtroSemestres.segundo)
        this.filtroSemestres.ativo = 2;
      else if (this.filtroSemestres.primeiro && this.filtroSemestres.primeiro)
        this.filtroSemestres.ativo = 3;
      else this.filtroSemestres.ativo = undefined;
    },
    openModalEditTurma(turma) {
      this.turmaClickada = { ...turma };
      this.$refs.modalEditTurma.open();
    },

    createValidacao(turma) {
      const validacaoResult = this.$_.cloneDeep(turma);

      validacaoResult.docente1Apelido = this.findDocenteApelidoById(
        turma.Docente1
      );
      validacaoResult.docente2Apelido = this.findDocenteApelidoById(
        turma.Docente2
      );
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

      check = this.checkDocentes(
        validacao.docente1Apelido,
        validacao.docente2Apelido
      );
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
          return horario1 == null && horario2 == null
            ? this.allConflitos[2]
            : false;
        } else {
          return horario1 == null || horario2 == null
            ? this.allConflitos[2]
            : false;
        }
      }
      return false;
    },
    checkDocentes(docente1, docente2) {
      return docente1 === null && docente2 == null
        ? this.allConflitos[3]
        : false;
    },
    checkSalasLab(isLab, sala1, sala2) {
      //Não lab
      if (isLab == 0) return false;
      //Obrigatorio
      else if (isLab == 1) {
        return !this.isLab(sala1) && !this.isLab(sala2)
          ? this.allConflitos[4]
          : false;
        //Desejavel
      } else if (isLab == 2) {
        return !this.isLab(sala1) && !this.isLab(sala2)
          ? this.allConflitos[5]
          : false;
      }
    },
    checkVagaSala(sala_id, pedidosTotais) {
      let sala;
      if (sala_id != null)
        sala = this.$_.find(this.AllSalas, (s) => sala_id == s.id);

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
      if (this.$_.find(pedidos, { Curso: 4 }).vagasPeriodizadas > 0) {
        for (let i = 0; i < grades.CCD.length; i++) {
          let disciplinaGrade = this.$_.find(
            this.$store.state.disciplinaGrade.DisciplinaGrades,
            { Grade: grades.CCD[i].id, Disciplina: turma.Disciplina }
          );
          if (
            disciplinaGrade !== undefined &&
            disciplinaGrade.periodo >= grades.CCD[i].inicio &&
            disciplinaGrade.periodo <= grades.CCD[i].fim
          ) {
            let disciplinasPeriodo = this.$_.filter(
              this.$store.state.disciplinaGrade.DisciplinaGrades,
              { Grade: grades.CCD[i].id, periodo: disciplinaGrade.periodo }
            );
            for (let d = 0; d < disciplinasPeriodo.length; d++) {
              if (disciplinasPeriodo[d].Disciplina === turma.Disciplina) {
                continue;
              }
              let disciplinaConflito = this.$_.find(
                this.$store.state.disciplina.Disciplinas,
                { id: disciplinasPeriodo[d].Disciplina }
              );
              let externa =
                disciplinaConflito.Perfil == 13 ||
                disciplinaConflito.Perfil == 15;
              let turmasDisciplina = this.$_.filter(
                externa
                  ? this.$store.state.turmaExterna.Turmas
                  : this.$store.state.turma.Turmas,
                (t) => {
                  let pedido = this.$_.find(
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
      if (this.$_.find(pedidos, { Curso: 1 }).vagasPeriodizadas > 0) {
        for (let i = 0; i < grades.CCN.length; i++) {
          let disciplinaGrade = this.$_.find(
            this.$store.state.disciplinaGrade.DisciplinaGrades,
            { Grade: grades.CCN[i].id, Disciplina: turma.Disciplina }
          );
          if (
            disciplinaGrade !== undefined &&
            disciplinaGrade.periodo >= grades.CCN[i].inicio &&
            disciplinaGrade.periodo <= grades.CCN[i].fim
          ) {
            let disciplinasPeriodo = this.$_.filter(
              this.$store.state.disciplinaGrade.DisciplinaGrades,
              { Grade: grades.CCN[i].id, periodo: disciplinaGrade.periodo }
            );
            for (let d = 0; d < disciplinasPeriodo.length; d++) {
              if (disciplinasPeriodo[d].Disciplina === turma.Disciplina) {
                continue;
              }
              let disciplinaConflito = this.$_.find(
                this.$store.state.disciplina.Disciplinas,
                { id: disciplinasPeriodo[d].Disciplina }
              );
              let externa =
                disciplinaConflito.Perfil == 13 ||
                disciplinaConflito.Perfil == 15;
              let turmasDisciplina = this.$_.filter(
                externa
                  ? this.$store.state.turmaExterna.Turmas
                  : this.$store.state.turma.Turmas,
                (t) => {
                  let pedido = this.$_.find(
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
      if (this.$_.find(pedidos, { Curso: 3 }).vagasPeriodizadas > 0) {
        for (let i = 0; i < grades.SI.length; i++) {
          let disciplinaGrade = this.$_.find(
            this.$store.state.disciplinaGrade.DisciplinaGrades,
            { Grade: grades.SI[i].id, Disciplina: turma.Disciplina }
          );
          if (
            disciplinaGrade !== undefined &&
            disciplinaGrade.periodo >= grades.SI[i].inicio &&
            disciplinaGrade.periodo <= grades.SI[i].fim
          ) {
            let disciplinasPeriodo = this.$_.filter(
              this.$store.state.disciplinaGrade.DisciplinaGrades,
              { Grade: grades.SI[i].id, periodo: disciplinaGrade.periodo }
            );
            for (let d = 0; d < disciplinasPeriodo.length; d++) {
              if (disciplinasPeriodo[d].Disciplina === turma.Disciplina) {
                continue;
              }
              let disciplinaConflito = this.$_.find(
                this.$store.state.disciplina.Disciplinas,
                { id: disciplinasPeriodo[d].Disciplina }
              );
              let externa =
                disciplinaConflito.Perfil == 13 ||
                disciplinaConflito.Perfil == 15;
              let turmasDisciplina = this.$_.filter(
                externa
                  ? this.$store.state.turmaExterna.Turmas
                  : this.$store.state.turma.Turmas,
                (t) => {
                  let pedido = this.$_.find(
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
      if (this.$_.find(pedidos, { Curso: 2 }).vagasPeriodizadas > 0) {
        for (let i = 0; i < grades.EC.length; i++) {
          let disciplinaGrade = this.$_.find(
            this.$store.state.disciplinaGrade.DisciplinaGrades,
            { Grade: grades.EC[i].id, Disciplina: turma.Disciplina }
          );
          if (
            disciplinaGrade !== undefined &&
            disciplinaGrade.periodo >= grades.EC[i].inicio &&
            disciplinaGrade.periodo <= grades.EC[i].fim
          ) {
            let disciplinasPeriodo = this.$_.filter(
              this.$store.state.disciplinaGrade.DisciplinaGrades,
              { Grade: grades.EC[i].id, periodo: disciplinaGrade.periodo }
            );
            for (let d = 0; d < disciplinasPeriodo.length; d++) {
              if (disciplinasPeriodo[d].Disciplina === turma.Disciplina) {
                continue;
              }
              let disciplinaConflito = this.$_.find(
                this.$store.state.disciplina.Disciplinas,
                { id: disciplinasPeriodo[d].Disciplina }
              );
              let externa =
                disciplinaConflito.Perfil == 13 ||
                disciplinaConflito.Perfil == 15;
              let turmasDisciplina = this.$_.filter(
                externa
                  ? this.$store.state.turmaExterna.Turmas
                  : this.$store.state.turma.Turmas,
                (t) => {
                  let pedido = this.$_.find(
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
      let turmas = this.$_.filter(this.$store.state.turma.Turmas, (t) => {
        return t.Docente1 === docente.id || t.Docente2 === docente.id;
      });

      let cargaTotalDocente = 0;

      for (let i = 0; i < turmas.length; i++) {
        let disciplina = this.$_.find(
          this.$store.state.disciplina.Disciplinas,
          {
            id: turmas[i].Disciplina,
          }
        );
        let cargaTotalDisciplina =
          disciplina.cargaTeorica + disciplina.cargaPratica;
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
      let turmas = this.$_.filter(this.$store.state.cargaPos.Cargas, (t) => {
        return t.Docente === docente.id;
      });

      let cargaTotalDocente = 0;

      for (let i = 0; i < turmas.length; i++) {
        cargaTotalDocente = cargaTotalDocente + turmas[i].creditos;
      }

      return cargaTotalDocente;
    },
    filterBySemestre(semestre) {
      if (this.filtroSemestres.ativo === 1) return semestre === 1;
      else if (this.filtroSemestres.ativo === 2) return semestre === 3;
      else if (this.filtroSemestres.ativo === 3) return true;
      else return false;
    },
    filterByConflitos(arrayConflitos) {
      const conflitosResultantes = this.$_.filter(
        arrayConflitos,
        (conflito) =>
          this.filtroConflitos.ativados.indexOf(conflito.type) !== -1
      );
      return conflitosResultantes;
    },

    findDocenteApelidoById(id) {
      let docente = this.$_.find(this.DocentesAtivos, (d) => d.id == id);
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
      let salaResultante = this.$_.find(
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
    //table main
    TurmasValidacoesOrdered() {
      return this.$_.orderBy(
        this.TurmasValidacoesFiltred,
        this.ordenacaoTurmasMain.order,
        this.ordenacaoTurmasMain.type
      );
    },
    TurmasValidacoesFiltred() {
      const turmasResultantes = [];

      this.$_.forEach(this.TurmasValidacoes, (turma) => {
        const filtredConflitos = this.filterByConflitos(turma.conflitos);
        const filtredSemestre = this.filterBySemestre(turma.periodo);

        if (filtredConflitos.length && filtredSemestre)
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
      return this.$_.orderBy(
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
          validacao.conflitos.push(
            `Apenas ${cargaGraduacao} créditos na graduação`
          );
        }

        if (cargaGraduacao + cargaPos < 16.0) {
          validacao.conflitos.push(
            `Apenas ${
              cargaGraduacao + cargaPos
            } créditos, ${cargaGraduacao}  na graduação e ${cargaPos} na pós`
          );
        }

        if (validacao.conflitos.length) docentesResultantes.push(validacao);
      });

      return docentesResultantes;
    },
    //table modal
    ConflitosOrdered() {
      return this.$_.orderBy(AllConflitosTurmas, "msg");
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
}
.btn-table-icon {
  font-size: 12px;
}
</style>
