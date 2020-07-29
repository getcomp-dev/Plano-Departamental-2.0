<template>
  <div class="main-component row">
    <PageHeader :title="'Validações do Plano'">
      <BaseButton
        title="Filtros"
        :type="'icon'"
        :color="'gray'"
        @click="openAsideModal('filtros')"
      >
        <i class="fas fa-list-ul"></i>
      </BaseButton>
      <BaseButton
        :type="'icon'"
        :color="'lightblue'"
        @click="openAsideModal('ajuda')"
      >
        <i class="fas fa-question"></i>
      </BaseButton>
    </PageHeader>

    <NavTab
      :currentTab="tabAtivaMain"
      :allTabs="['Turmas', 'Docentes']"
      @change-tab="tabAtivaMain = $event"
    />

    <div class="div-table">
      <BaseTable
        v-show="tabAtivaMain === 'Turmas'"
        :styles="'height: calc(100vh - 130px)'"
      >
        <template #thead>
          <th
            @click="toggleOrder(ordemTurmas, 'periodo')"
            class="clickable"
            style="width: 35px"
            title="Semestre"
          >
            S.
            <i :class="setIconByOrder(ordemTurmas, 'periodo')"></i>
          </th>
          <th
            @click="toggleOrder(ordemTurmas, 'disciplinaPerfil')"
            class="t-start clickable"
            style="width: 75px"
          >
            Perfil
            <i :class="setIconByOrder(ordemTurmas, 'disciplinaPerfil')"></i>
          </th>
          <th
            @click="toggleOrder(ordemTurmas, 'disciplinaCodigo')"
            class="t-start clickable"
            style="width: 70px"
            title="Código"
          >
            Cód.
            <i :class="setIconByOrder(ordemTurmas, 'disciplinaCodigo')"></i>
          </th>
          <th
            @click="toggleOrder(ordemTurmas, 'disciplinaNome')"
            class="t-start clickable"
            style="width: 300px"
          >
            Disciplina
            <i :class="setIconByOrder(ordemTurmas, 'disciplinaNome')"></i>
          </th>
          <th style="width: 35px" class="t-staty" title="Turma">
            T.
          </th>
          <th style="width: 130px" class="s-start">
            Docentes
          </th>
          <th style="width:50px">Editar</th>
        </template>
        <template #tbody>
          <template v-for="validacaoTurma in TurmasValidacoesOrdered">
            <tr :key="'turmaId' + validacaoTurma.id" class="bg-custom">
              <td style="width: 35px;">
                {{ validacaoTurma.periodo }}
              </td>
              <td style="width: 75px;" class="t-start">
                {{ validacaoTurma.disciplinaPerfil }}
              </td>
              <td style="width: 70px;" class="t-start">
                {{ validacaoTurma.disciplinaCodigo }}
              </td>
              <td style="width: 300px;" class="t-start">
                {{ validacaoTurma.disciplinaNome }}
              </td>
              <td style="width: 35px">
                {{ validacaoTurma.letra }}
              </td>
              <td style="width: 130px">
                {{ validacaoTurma.docente1Apelido }}
                <br />
                {{ validacaoTurma.docente2Apelido }}
              </td>
              <td style="width: 50px" class="clickable" title="Editar turma">
                <button
                  class="btn-table"
                  @click.stop="openModalEditTurma(validacaoTurma)"
                >
                  <i class="fas fa-edit btn-table-icon"></i>
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
                  class="fas fa-exclamation-circle delbtn"
                  title="Conflito critico!"
                ></i>
              </td>
              <td colspan="6" style="width:655px" class="t-start">
                {{ conflito.msg }}
              </td>
            </tr>
          </template>
          <tr v-show="TurmasValidacoesOrdered.length === 0">
            <td style="width:695px">
              <b>Nenhum conflito encontrado.</b> Clique no botão de filtros
              <i class="fas fa-list-ul mx-1"></i> para selecioná-los.
            </td>
          </tr>
        </template>
      </BaseTable>

      <BaseTable
        v-show="tabAtivaMain === 'Docentes'"
        :styles="'height: calc(100vh - 130px)'"
      >
        <template #thead>
          <th
            colspan="2"
            @click="toggleOrder(ordemDocentes, 'nome')"
            style="width: 695px"
            class="t-start clickable"
          >
            Nome
            <i :class="setIconByOrder(ordemDocentes, 'nome')"></i>
          </th>
        </template>
        <template #tbody>
          <template v-for="validacaoDocente in DocentesValidacoesOrdered">
            <tr :key="'docenteId' + validacaoDocente.id" class="bg-custom">
              <td colspan="2" style="width: 695px;" class="t-start">
                {{ validacaoDocente.nome }}
              </td>
            </tr>
            <tr
              v-for="conflito in validacaoDocente.conflitos"
              :key="'conflitos' + validacaoDocente.id + conflito"
            >
              <td style="width: 35px">
                <i
                  style="background-color: inherit; font-size: 13px; margin:3px!important;"
                  class="fas fa-exclamation-circle delbtn"
                  title="Conflito critico!"
                ></i>
              </td>

              <td style="width: 655px;" class="t-start">
                {{ conflito }}
              </td>
            </tr>
          </template>
        </template>
      </BaseTable>
    </div>

    <!-- Modal Filtros -->
    <BaseModal
      ref="modalFiltros"
      :modalOptions="{
        type: 'filtros',
        title: 'Filtros',
        hasFooter: true,
      }"
      :hasFooter="true"
      @btn-ok="btnOkFiltros()"
      @select-all="modalSelectAll[tabAtivaModal]"
      @select-none="modalSelectNone[tabAtivaModal]"
    >
      <template #modal-body>
        <NavTab
          :currentTab="tabAtivaModal"
          :allTabs="['Conflitos', 'Semestres']"
          @change-tab="tabAtivaModal = $event"
        />
        <div class="div-table">
          <BaseTable v-show="tabAtivaModal === 'Conflitos'" :type="'modal'">
            <template #thead>
              <th style="width: 25px"></th>
              <th style="width: 425px" class="t-start">
                Conflito
              </th>
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
                <td style="width: 425px" class="t-start">
                  {{ conflito.msg }}
                </td>
              </tr>
            </template>
          </BaseTable>

          <BaseTable v-show="tabAtivaModal === 'Semestres'" :type="'modal'">
            <template #thead>
              <th style="width: 25px;"></th>
              <th style="width: 425px;" class="t-start">
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
                <td style="width: 425px" class="t-start">
                  PRIMEIRO
                </td>
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
      </template>
    </BaseModal>

    <!-- modal turma edit -->
    <BaseModal
      ref="modalEditTurma"
      :modalOptions="{
        type: 'editTurma',
        title: 'Edição de Turma',
      }"
    >
      <template #modal-body>
        <BodyModalEditTurma
          v-if="turmaClickada != null"
          :hasEditDisciplina="false"
          :key="turmaClickada.id + 'modalTurma'"
          :turma="turmaClickada"
        />
      </template>
    </BaseModal>

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
            <b>Para exibir conteúdo na tabela:</b> Clique no ícone filtros
            <i class="fas fa-list-ul cancelbtn"></i> no cabeçalho da página e na
            janela que será aberta utilize as abas para navegar entre os tipos
            de filtros. Marque em suas respectivas tabelas quais informações
            deseja visualizar, e para finalizar clique no botão OK.
          </li>
          <li class="list-group-item">
            <b>Para editar turma da tabela:</b> Clique no ícone
            <i class="fas fa-edit"></i> presente na coluna editar da tabela, e
            na janela que será aberta no formulário presente na parte superior
            poderá ser feito alterações que somente serão enviadas ao clicar no
            botão salvar. E na tabela de vagas na parte inferior da janela as
            alterações serão salvas automaticamente.
          </li>
          <li class="list-group-item">
            <b>Conflitos críticos:</b> Note que em alguns conflitos possuem o
            ícone <i class="fas fa-exclamation-circle delbtn"></i>, isso
            significa que ele é crítico e deve ter prioridade para ser corrigido
          </li>
        </ul>
      </template>
    </BaseModal>
  </div>
</template>

<script>
import _ from "lodash";
import { toggleOrdination, toggleItemInArray } from "@/common/mixins";
import {
  PageHeader,
  BaseTable,
  BaseButton,
  NavTab,
  BodyModalEditTurma,
  BaseModal,
} from "@/components/ui";
import { mapActions } from "vuex";

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
    BaseButton,
    BodyModalEditTurma,
    PageHeader,
    NavTab,
    BaseTable,
    BaseModal,
  },
  data() {
    return {
      allConflitos: _.clone(AllConflitosTurmas),
      grades1Semestre: { CCD: [], CCN: [], EC: [], SI: [] },
      grades2Semestre: { CCD: [], CCN: [], EC: [], SI: [] },
      ordemTurmas: { order: "periodo", type: "asc" },
      ordemDocentes: { order: "nome", type: "asc" },
      turmaClickada: null,
      tabAtivaMain: "Turmas",
      tabAtivaModal: "Conflitos",
      filtroConflitos: {
        ativados: [],
        selecionados: [],
      },
      filtroSemestres: {
        primeiro: true,
        segundo: true,
        ativo: 3,
      },
      modalSelectAll: {
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
      modalSelectNone: {
        Conflitos: () => {
          this.filtroConflitos.selecionados = [];
        },
        Semestres: () => {
          this.filtroSemestres.primeiro = false;
          this.filtroSemestres.segundo = false;
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
    g = _.filter(this.$store.state.grade.Grades, ["Curso", 4]);
    g = _.orderBy(g, "periodoInicio", "desc");
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
    g = _.filter(this.$store.state.grade.Grades, ["Curso", 1]);
    g = _.orderBy(g, "periodoInicio", "desc");
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
    g = _.filter(this.$store.state.grade.Grades, ["Curso", 3]);
    g = _.orderBy(g, "periodoInicio", "desc");
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
    g = _.filter(this.$store.state.grade.Grades, ["Curso", 2]);
    g = _.orderBy(g, "periodoInicio", "desc");
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
    ...mapActions(["setLoadingState"]),

    openAsideModal(modalName) {
      if (modalName === "filtros") {
        this.$refs.modalFiltros.toggle();
        this.$refs.modalAjuda.close();
      } else if (modalName === "ajuda") {
        this.$refs.modalAjuda.toggle();
        this.$refs.modalFiltros.close();
      }
    },
    btnOkFiltros() {
      this.setLoadingState("partial");
      this.btnOkSemestre();
      this.filtroConflitos.ativados = [...this.filtroConflitos.selecionados];
      this.setLoadingState("completed");
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
    findPerfilById(id) {
      let perfil = _.find(this.Perfis, (p) => p.id == id);
      return perfil != undefined ? perfil : null;
    },
    findDocenteApelidoById(id) {
      let docente = _.find(this.Docentes, (d) => d.id == id);
      return docente != undefined ? docente.apelido : null;
    },
    findDisciplinaById(id) {
      let disciplina = _.find(this.Disciplinas, (d) => d.id == id);
      return disciplina != undefined ? disciplina : null;
    },
    findTurmaById(turmaId) {
      let turmaFounded = _.find(this.Turmas, (turma) => turma.id == turmaId);
      return turmaFounded != undefined ? turmaFounded : null;
    },
    totalPedidos(turma_id) {
      const pedidos = this.$store.state.pedido.Pedidos[turma_id];
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
    createValidacao(turma, disciplina) {
      return {
        //Turmas
        ...turma,
        docente1Apelido: this.findDocenteApelidoById(turma.Docente1),
        docente2Apelido: this.findDocenteApelidoById(turma.Docente2),
        pedidosTotais: this.totalPedidos(turma.id),
        //Disciplinas
        disciplinaNome: disciplina.nome,
        disciplinaCodigo: disciplina.codigo,
        disciplinaEad: disciplina.ead,
        disciplinaLaboratorio: disciplina.laboratorio,
        disciplinaCreditoTotal:
          parseInt(disciplina.cargaTeorica, 10) +
          parseInt(disciplina.cargaPratica, 10),
        disciplinaPerfil: this.findPerfilById(disciplina.Perfil).abreviacao,
        conflitos: [],
      };
    },
    checkAllValidations(validacao) {
      let check;
      //Turno
      check = this.checkTurno(validacao.turno1);
      if (check) validacao.conflitos.push(check);
      //Compatibilidade do turno com disciplina
      check = this.checkTurnoEAD(validacao.disciplinaEad, validacao.turno1);
      if (check) validacao.conflitos.push(check);
      //Horarios
      check = this.checkHorarios(
        validacao.disciplinaEad,
        validacao.disciplinaCreditoTotal,
        validacao.Horario1,
        validacao.Horario2
      );
      if (check) validacao.conflitos.push(check);
      //Docente
      check = this.checkDocentes(
        validacao.docente1Apelido,
        validacao.docente2Apelido
      );
      if (check) validacao.conflitos.push(check);
      //Salas
      check = this.checkSalasLab(
        validacao.disciplinaLaboratorio,
        validacao.Sala1,
        validacao.Sala2
      );
      if (check) validacao.conflitos.push(check);

      //Lotação das salas
      // sala 1
      check = this.checkVagaSala(validacao.Sala1, validacao.pedidosTotais);
      if (check) validacao.conflitos.push(check);
      // sala 2
      if (validacao.Sala1 != validacao.Sala2) {
        check = this.checkVagaSala(validacao.Sala2, validacao.pedidosTotais);
        if (check) validacao.conflitos.push(check);
      }

      // Pedidos - 7
      check = this.checkPedidos(validacao.pedidosTotais);
      if (check) validacao.conflitos.push(check);
      // EAD com salas - 8
      check = this.checkSalasInEAD(
        validacao.disciplinaEad,
        validacao.Sala1,
        validacao.Sala2
      );
      if (check) validacao.conflitos.push(check);
      //Periodo curso
      check = this.checkPeriodoCursos(validacao);
      if (check) validacao.conflitos.push(check);

      check = null;
    },
    checkTurno(turno) {
      return turno === null || turno === undefined || turno === ""
        ? this.allConflitos[0]
        : null;
    },
    isEmpty(value) {
      return value === null || value === undefined || value === "";
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
      if (sala_id != null) sala = _.find(this.Salas, (s) => sala_id == s.id);

      if (sala != undefined) {
        if (sala.lotacao_maxima < pedidosTotais) {
          return {
            type: 7,
            msg: `Limite da sala ${
              sala.nome
            } execedido. Vagas: ${pedidosTotais} - Lotação: ${
              sala.lotacao_maxima
            } `,
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
      if (_.find(pedidos, { Curso: 4 }).vagasPeriodizadas > 0) {
        for (let i = 0; i < grades.CCD.length; i++) {
          let disciplinaGrade = _.find(
            this.$store.state.disciplinaGrade.DisciplinaGrades,
            { Grade: grades.CCD[i].id, Disciplina: turma.Disciplina }
          );
          if (
            disciplinaGrade !== undefined &&
            disciplinaGrade.periodo >= grades.CCD[i].inicio &&
            disciplinaGrade.periodo <= grades.CCD[i].fim
          ) {
            let disciplinasPeriodo = _.filter(
              this.$store.state.disciplinaGrade.DisciplinaGrades,
              { Grade: grades.CCD[i].id, periodo: disciplinaGrade.periodo }
            );
            for (let d = 0; d < disciplinasPeriodo.length; d++) {
              if (disciplinasPeriodo[d].Disciplina === turma.Disciplina) {
                continue;
              }
              let disciplinaConflito = _.find(
                this.$store.state.disciplina.Disciplinas,
                { id: disciplinasPeriodo[d].Disciplina }
              );
              let externa =
                disciplinaConflito.Perfil == 13 ||
                disciplinaConflito.Perfil == 15;
              let turmasDisciplina = _.filter(
                externa
                  ? this.$store.state.turmaExterna.Turmas
                  : this.$store.state.turma.Turmas,
                (t) => {
                  let pedido = _.find(
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
                    `\nConflito de Horário com a turma ${
                      disciplinaConflito.codigo
                    }${turmasDisciplina[t].letra} no ${
                      disciplinaGrade.periodo
                    }º período da grade de Ciência da Computação - Diurno`;
                }
              }
            }
          }
        }
      }
      if (_.find(pedidos, { Curso: 1 }).vagasPeriodizadas > 0) {
        for (let i = 0; i < grades.CCN.length; i++) {
          let disciplinaGrade = _.find(
            this.$store.state.disciplinaGrade.DisciplinaGrades,
            { Grade: grades.CCN[i].id, Disciplina: turma.Disciplina }
          );
          if (
            disciplinaGrade !== undefined &&
            disciplinaGrade.periodo >= grades.CCN[i].inicio &&
            disciplinaGrade.periodo <= grades.CCN[i].fim
          ) {
            let disciplinasPeriodo = _.filter(
              this.$store.state.disciplinaGrade.DisciplinaGrades,
              { Grade: grades.CCN[i].id, periodo: disciplinaGrade.periodo }
            );
            for (let d = 0; d < disciplinasPeriodo.length; d++) {
              if (disciplinasPeriodo[d].Disciplina === turma.Disciplina) {
                continue;
              }
              let disciplinaConflito = _.find(
                this.$store.state.disciplina.Disciplinas,
                { id: disciplinasPeriodo[d].Disciplina }
              );
              let externa =
                disciplinaConflito.Perfil == 13 ||
                disciplinaConflito.Perfil == 15;
              let turmasDisciplina = _.filter(
                externa
                  ? this.$store.state.turmaExterna.Turmas
                  : this.$store.state.turma.Turmas,
                (t) => {
                  let pedido = _.find(
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
                    `\nConflito de Horário com a turma ${
                      disciplinaConflito.codigo
                    }${turmasDisciplina[t].letra} no ${
                      disciplinaGrade.periodo
                    }º período da grade de Ciência da Computação - Noturno`;
                }
              }
            }
          }
        }
      }
      if (_.find(pedidos, { Curso: 3 }).vagasPeriodizadas > 0) {
        for (let i = 0; i < grades.SI.length; i++) {
          let disciplinaGrade = _.find(
            this.$store.state.disciplinaGrade.DisciplinaGrades,
            { Grade: grades.SI[i].id, Disciplina: turma.Disciplina }
          );
          if (
            disciplinaGrade !== undefined &&
            disciplinaGrade.periodo >= grades.SI[i].inicio &&
            disciplinaGrade.periodo <= grades.SI[i].fim
          ) {
            let disciplinasPeriodo = _.filter(
              this.$store.state.disciplinaGrade.DisciplinaGrades,
              { Grade: grades.SI[i].id, periodo: disciplinaGrade.periodo }
            );
            for (let d = 0; d < disciplinasPeriodo.length; d++) {
              if (disciplinasPeriodo[d].Disciplina === turma.Disciplina) {
                continue;
              }
              let disciplinaConflito = _.find(
                this.$store.state.disciplina.Disciplinas,
                { id: disciplinasPeriodo[d].Disciplina }
              );
              let externa =
                disciplinaConflito.Perfil == 13 ||
                disciplinaConflito.Perfil == 15;
              let turmasDisciplina = _.filter(
                externa
                  ? this.$store.state.turmaExterna.Turmas
                  : this.$store.state.turma.Turmas,
                (t) => {
                  let pedido = _.find(
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
                    `\nConflito de Horário com a turma ${
                      disciplinaConflito.codigo
                    }${turmasDisciplina[t].letra} no ${
                      disciplinaGrade.periodo
                    }º período da grade de Sistemas de Informação`;
                }
              }
            }
          }
        }
      }
      if (_.find(pedidos, { Curso: 2 }).vagasPeriodizadas > 0) {
        for (let i = 0; i < grades.EC.length; i++) {
          let disciplinaGrade = _.find(
            this.$store.state.disciplinaGrade.DisciplinaGrades,
            { Grade: grades.EC[i].id, Disciplina: turma.Disciplina }
          );
          if (
            disciplinaGrade !== undefined &&
            disciplinaGrade.periodo >= grades.EC[i].inicio &&
            disciplinaGrade.periodo <= grades.EC[i].fim
          ) {
            let disciplinasPeriodo = _.filter(
              this.$store.state.disciplinaGrade.DisciplinaGrades,
              { Grade: grades.EC[i].id, periodo: disciplinaGrade.periodo }
            );
            for (let d = 0; d < disciplinasPeriodo.length; d++) {
              if (disciplinasPeriodo[d].Disciplina === turma.Disciplina) {
                continue;
              }
              let disciplinaConflito = _.find(
                this.$store.state.disciplina.Disciplinas,
                { id: disciplinasPeriodo[d].Disciplina }
              );
              let externa =
                disciplinaConflito.Perfil == 13 ||
                disciplinaConflito.Perfil == 15;
              let turmasDisciplina = _.filter(
                externa
                  ? this.$store.state.turmaExterna.Turmas
                  : this.$store.state.turma.Turmas,
                (t) => {
                  let pedido = _.find(
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
                    `\nConflito de Horário com a turma ${
                      disciplinaConflito.codigo
                    }${turmasDisciplina[t].letra} no ${
                      disciplinaGrade.periodo
                    }º período da grade de Engenharia Computacional`;
                }
              }
            }
          }
        }
      }
      if (conflitos) return { type: 10, msg: msg };
      else return false;
    },
    isLab(salaId) {
      let salaResultante = _.find(
        this.Salas,
        (sala) => salaId == sala.id && sala.laboratorio
      );
      if (salaResultante !== undefined) return true;
      else return false;
    },
    creditosGraduacao(docente) {
      let turmas = _.filter(this.$store.state.turma.Turmas, (t) => {
        return t.Docente1 === docente.id || t.Docente2 === docente.id;
      });

      let cargaTotalDocente = 0;

      for (let i = 0; i < turmas.length; i++) {
        let disciplina = _.find(this.$store.state.disciplina.Disciplinas, {
          id: turmas[i].Disciplina,
        });
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
      let turmas = _.filter(this.$store.state.cargaPos.Cargas, (t) => {
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
      const conflitosResultantes = _.filter(
        arrayConflitos,
        (conflito) =>
          this.filtroConflitos.ativados.indexOf(conflito.type) !== -1
      );
      return conflitosResultantes;
    },
  },
  computed: {
    ConflitosOrdered() {
      return _.orderBy(AllConflitosTurmas, "msg");
    },
    TurmasValidacoesOrdered() {
      return _.orderBy(
        this.TurmasValidacoesFiltred,
        this.ordemTurmas.order,
        this.ordemTurmas.type
      );
    },
    TurmasValidacoesFiltred() {
      const turmasResultantes = [];

      _.forEach(this.TurmasValidacoes, (turma) => {
        const filtredConflitos = this.filterByConflitos(turma.conflitos);
        const filtredSemestre = this.filterBySemestre(turma.periodo);

        if (filtredConflitos.length && filtredSemestre)
          turmasResultantes.push({ ...turma, conflitos: filtredConflitos });
      });

      return turmasResultantes;
    },
    TurmasValidacoes() {
      let turmasResultantes = [];

      this.Turmas.forEach((turma) => {
        let disciplinaFounded = this.findDisciplinaById(turma.Disciplina);

        if (disciplinaFounded) {
          let validacao = this.createValidacao(turma, disciplinaFounded);
          this.checkAllValidations(validacao);

          if (validacao.conflitos.length) turmasResultantes.push(validacao);
        }
      });
      return turmasResultantes;
    },
    DocentesValidacoesOrdered() {
      return _.orderBy(
        this.DocentesValidacoes,
        this.ordemDocentes.order,
        this.ordemDocentes.type
      );
    },
    DocentesValidacoes() {
      let docentesResultantes = [];

      this.Docentes.forEach((docente) => {
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
            `Apenas ${cargaGraduacao +
              cargaPos} créditos, ${cargaGraduacao}  na graduação e ${cargaPos} na pós`
          );
        }

        if (validacao.conflitos.length) docentesResultantes.push(validacao);
      });

      return docentesResultantes;
    },
    Turmas() {
      return _.orderBy(this.$store.state.turma.Turmas, ["letra", "Disciplina"]);
    },
    Disciplinas() {
      return _.orderBy(this.$store.state.disciplina.Disciplinas, "nome");
    },
    Perfis() {
      return _.orderBy(this.$store.state.perfil.Perfis, "nome");
    },
    Salas() {
      return _.orderBy(this.$store.state.sala.Salas, "nome");
    },
    Docentes() {
      return _.filter(this.$store.state.docente.Docentes, ["ativo", true]);
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
.btn-table-icon:focus {
  outline-offset: -1px !important;
  outline: 1px solid #9ec0f7 !important;
}
</style>
