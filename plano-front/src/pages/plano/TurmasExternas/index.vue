<template>
  <div class="main-component row">
    <PageHeader :title="'Graduação - Outros'">
      <BaseButton
        v-show="isAdding"
        title="Salvar"
        :type="'icon'"
        :color="'green'"
        @click="addTurma()"
      >
        <i class="fas fa-check"></i>
      </BaseButton>
      <BaseButton
        v-show="!isAdding"
        title="Adicionar"
        :type="'icon'"
        :color="'green'"
        @click="toggleAdd()"
      >
        <i class="fas fa-plus"></i>
      </BaseButton>

      <BaseButton
        v-show="isAdding"
        title="Cancelar"
        :type="'icon'"
        :color="'gray'"
        @click="toggleAdd()"
      >
        <i class="fas fa-times"></i>
      </BaseButton>

      <BaseButton
        v-show="!isAdding"
        title="Deletar selecionados"
        :type="'icon'"
        :color="'red'"
        @click="$refs.modalDelete.open()"
      >
        <i class="fas fa-trash"></i>
      </BaseButton>

      <BaseButton
        title="Filtros"
        :type="'icon'"
        :color="'gray'"
        @click="openAsideModal('filtros')"
      >
        <i class="fas fa-list-ul"></i>
      </BaseButton>

      <BaseButton
        title="Ajuda"
        :type="'icon'"
        :color="'lightblue'"
        @click="openAsideModal('ajuda')"
      >
        <i class="fas fa-question"></i>
      </BaseButton>
    </PageHeader>

    <div class="div-table">
      <BaseTable>
        <template #thead>
          <th style="width: 25px"></th>
          <th style="width: 55px" title="Semestre">
            S.
          </th>
          <th
            style="width: 70px"
            class="clickable"
            @click="toggleOrder(ordenacaoTurmasMain, 'disciplinaCodigo')"
            title="Código"
          >
            Cód.
            <i
              :class="setIconByOrder(ordenacaoTurmasMain, 'disciplinaCodigo')"
            ></i>
          </th>
          <th
            style="width: 330px"
            class="clickable"
            @click="toggleOrder(ordenacaoTurmasMain, 'disciplinaNome')"
          >
            Disciplina
            <i
              :class="setIconByOrder(ordenacaoTurmasMain, 'disciplinaNome')"
            ></i>
          </th>
          <th style="width: 25px;" title="Créditos">
            C.
          </th>
          <th style="width: 45px" title="Turma">
            T.
          </th>
          <th style="width: 80px" title="Total de vagas">
            Turno
          </th>
          <th style="width: 85px">
            Horário
          </th>
          <th style="width: 95px">Sala</th>
          <th style="width: 40px">
            Total
          </th>
          <template v-for="curso in CursosDCC">
            <th
              style="width: 35px"
              :id="'curso' + curso.id"
              :key="'1-curso' + curso.id"
            >
              {{ curso.codigo }}

              <b-popover
                :key="'popover' + curso.id"
                :target="'curso' + curso.id"
                placement="bottom"
                triggers="hover focus"
              >
                <span
                  class="w-100 text-center"
                  style="font-size: 11px!important;"
                >
                  <b>{{ curso.nome }}</b>
                </span>
                <p
                  class="p-0 m-0 text-center"
                  style="font-size: 11px!important;"
                >
                  {{
                    curso.semestreInicial == 1 || curso.semestreInicial == 3
                      ? "1º - " + curso.alunosEntrada
                      : ""
                  }}
                  <br />
                  {{
                    curso.semestreInicial == 2 || curso.semestreInicial == 3
                      ? "2º - " + curso.alunosEntrada2
                      : ""
                  }}
                </p>
              </b-popover>
            </th>
          </template>
        </template>
        <template #tbody>
          <tr v-show="isAdding" class="novaturma stickyAdd">
            <td style="width: 25px"></td>
            <td style="width: 55px" class="less-padding">
              <select id="2periodo" v-model="turmaForm.periodo">
                <option value="1">1</option>
                <option value="3">3</option>
              </select>
            </td>
            <td style="width: 70px" class="less-padding">
              <select
                type="text"
                id="disciplina"
                v-model="turmaForm.Disciplina"
              >
                <option
                  v-for="disciplina in DisciplinasExternasOrderByCodigo"
                  :key="'1-disciplina-id' + disciplina.id"
                  :value="disciplina.id"
                  >{{ disciplina.codigo }}</option
                >
              </select>
            </td>
            <td style="width: 330px" class="less-padding">
              <select
                type="text"
                id="disciplina"
                v-model="turmaForm.Disciplina"
              >
                <option
                  v-for="disciplina in DisciplinasExternas"
                  :key="'2-disciplina-id' + disciplina.id"
                  :value="disciplina.id"
                  >{{ disciplina.nome }}</option
                >
              </select>
            </td>
            <td style="width: 25px">
              <template v-for="disciplina in DisciplinasExternas">
                <template v-if="disciplina.id === turmaForm.Disciplina">{{
                  disciplina.cargaPratica + disciplina.cargaTeorica
                }}</template>
              </template>
            </td>
            <td style="width: 45px;">
              <input
                type="text"
                class="input-letra"
                id="turma"
                v-model="turmaForm.letra"
                @keypress="onlyA_Z($event), limitLenght($event)"
              />
            </td>
            <td style="width: 80px;">
              <select
                type="text"
                id="turno1"
                v-model="turmaForm.turno1"
                v-on:change="setEad"
              >
                <option value="Diurno">Diurno</option>
                <option value="Noturno">Noturno</option>
                <option value="EAD">EAD</option>
              </select>
            </td>
            <td style="width: 85px;" class="less-padding">
              <select
                type="text"
                id="horario1"
                v-model="turmaForm.Horario1"
                v-on:change="adjustTurno1"
              >
                <option
                  v-for="horario in HorariosOrdered"
                  :key="'1-horario-id' + horario.id"
                  :value="horario.id"
                  >{{ horario.horario }}</option
                >
              </select>
              <select
                type="text"
                id="horario2"
                v-model="turmaForm.Horario2"
                v-on:change="adjustTurno2"
              >
                <option
                  v-for="horario in HorariosOrdered"
                  :key="'2-horario-id' + horario.id"
                  :value="horario.id"
                  >{{ horario.horario }}</option
                >
              </select>
            </td>
            <td style="width: 95px;" class="less-padding">
              <select type="text" id="sala1" v-model="turmaForm.Sala1">
                <option
                  v-for="sala in SalasOrdered"
                  :key="'1-sala-id' + sala.id"
                  :value="sala.id"
                  >{{ sala.nome }}</option
                >
              </select>
              <select type="text" id="sala2" v-model="turmaForm.Sala2">
                <option
                  v-for="sala in SalasOrdered"
                  :key="'2-sala-id' + sala.id"
                  :value="sala.id"
                  >{{ sala.nome }}</option
                >
              </select>
            </td>
            <td style="width: 40px">
              <div style="height: 43px;" class="py-1"></div>
            </td>
            <td
              style="width: 35px;"
              v-for="cursoSpace in 4"
              :key="cursoSpace"
            ></td>
          </tr>

          <template v-if="!tableIsLoading">
            <TurmaExternaRow
              v-for="turma in TurmasExternasOrdered"
              :key="'turma' + turma.id"
              :turma="turma"
              :options="{
                CursosDCC: CursosDCC,
                DisciplinasExternas: DisciplinasExternas,
              }"
            />
          </template>
          <tr v-if="TurmasExternasOrdered.length === 0">
            <td style="width:990px">
              <b>Nenhuma turma encontrada.</b> Clique no botão de filtros
              <i class="fas fa-list-ul mx-1"></i> para selecioná-las.
            </td>
          </tr>
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
          :allTabs="['Disciplinas', 'Semestres']"
          @change-tab="tabAtivaModal = $event"
        />

        <div class="div-table">
          <BaseTable
            v-show="tabAtivaModal === 'Disciplinas'"
            :type="'modal'"
            :hasSearchBar="true"
          >
            <template #thead-search>
              <input
                type="text"
                class="form-control input-search"
                placeholder="Pesquise nome ou codigo de uma disciplina..."
                v-model="searchDisciplinasModal"
              />
              <button
                @click="clearsearchDisciplinasModal()"
                class="btn btn-search"
              >
                &times;
              </button>
            </template>
            <template #thead>
              <th style="width: 25px;"></th>
              <th
                @click="toggleOrder(ordenacaoDisciplinasModal, 'codigo')"
                class="clickable"
                style="width: 70px;"
              >
                Cód.
                <i
                  :class="setIconByOrder(ordenacaoDisciplinasModal, 'codigo')"
                ></i>
              </th>
              <th
                @click="toggleOrder(ordenacaoDisciplinasModal, 'nome')"
                class="clickable t-start"
                style="width: 355px"
              >
                Nome
                <i
                  :class="setIconByOrder(ordenacaoDisciplinasModal, 'nome')"
                ></i>
              </th>
            </template>
            <template #tbody>
              <tr
                v-for="disciplina in DisciplinasExternasOrderedModal"
                :key="'disciplina' + disciplina.id"
                @click="
                  toggleItemInArray(disciplina, filtroDisciplinas.selecionadas)
                "
              >
                <td style="width: 25px;">
                  <input
                    type="checkbox"
                    class="form-check-input position-static m-0"
                    v-model="filtroDisciplinas.selecionadas"
                    :value="disciplina"
                  />
                </td>
                <td style="width: 70px;">
                  {{ disciplina.codigo }}
                </td>
                <td style="width: 355px" class="t-start">
                  {{ disciplina.nome }}
                </td>
              </tr>
              <tr v-show="DisciplinasExternasOrderedModal.length === 0">
                <td colspan="3" style="width:450px">
                  NENHUMA DISCIPLINA ENCONTRADA.
                </td>
              </tr>
            </template>
          </BaseTable>
          <BaseTable v-show="tabAtivaModal === 'Semestres'" :type="'modal'">
            <template #thead>
              <th style="width: 25px"></th>
              <th class="t-start" style="width: 425px">
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
      </template>
    </BaseModal>

    <!-- MODAL DELETAR -->
    <BaseModal
      ref="modalDelete"
      :modalOptions="{
        title: 'Deletar turma',
        position: 'center',
        hasBackground: true,
        hasFooter: true,
      }"
      :customStyles="'width:450px; font-size:14px'"
    >
      <template #modal-body>
        <p class="w-100 m-0">
          {{
            Deletar.length
              ? "Tem certeza que deseja deletar a(s) turma(s) selecionadas?"
              : "Nenhuma turma selecionada!"
          }}
        </p>
        <ul v-if="Deletar.length" class="list-group list-deletar w-100 mt-2">
          <li
            v-for="turma in Deletar"
            class="list-group-item"
            :key="'deletarTurma' + turma.id"
          >
            <span class="mr-1"> <b> Semestre: </b>{{ turma.periodo }} </span>
            <span class="mr-1"
              ><b> Disciplina: </b>{{ turma.disciplinaNome }}
            </span>
            <span class="mr-1"><b> Turma: </b> {{ turma.letra }} </span>
          </li>
        </ul>
      </template>
      <template #modal-footer> 
         <BaseButton
          class="paddingX-20"
          :type="'text'"
          :color="'gray'"
          @click="closeModalDelete()"
        >
          Cancelar
        </BaseButton>
        <BaseButton
          class="paddingX-20"
          :type="'text'"
          :color="'red'"
          @click="deleteSelectedTurma()"
        >
          Deletar
        </BaseButton>

     
        </button>
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
            <b>Para exibir conteúdo na tabela:</b> Clique no ícone filtros
            <i class="fas fa-list-ul cancelbtn"></i> no cabeçalho da página e na
            janela que será aberta utilize as abas para navegar entre os tipos
            de filtros. Marque em suas respectivas tabelas quais informações
            deseja visualizar, e para finalizar clique no botão OK.
          </li>
          <li class="list-group-item">
            <b>Para adicionar uma turma à tabela:</b> Clique no ícone adicionar
            <i class="fas fa-plus addbtn"></i> no cabeçalho da página em seguida
            preencha a nova linha que irá aparecer no início da tabela. E note
            que, os campos disciplina e letra da turma são obrigatórios. Após
            preencher os campos clique no ícone salvar
            <i class="fas fa-check addbtn"></i>
            ou em cancelar
            <i class="fas fa-times cancelbtn"></i>
            .
          </li>
          <li class="list-group-item">
            <b>Para deletar turmas da tabela:</b> Marque a(s) turma(s) que
            deseja deletar através da caixa de seleção presente na primeira
            coluna à esquerda na tabela, em seguida clique no ícone deletar
            <i class="fas fa-trash delbtn"></i> no cabeçalho da página e na
            janela que será aberta confirme clicando botão OK.
          </li>
          <li class="list-group-item">
            <b>Para editar turma da tabela:</b> Basta fazer as alterações
            necessárias diretamente nos campos da tabela e o sistema irá salvar
            automaticamente.
          </li>
          <li class="list-group-item">
            <b>Observações:</b> Em cada coluna de cursos possui dois campos de
            vagas, sendo acima destinado para alunos na grade, e abaixo para
            alunos repetentes. Para que uma turma externa apareça em na tela
            <b>Horários</b> de um determinado curso é preciso que pelo menos uma
            vaga para alunos na grade seja destinada ao mesmo.
          </li>
        </ul>
      </template>
    </BaseModal>
  </div>
</template>

<script>
import _ from "lodash";
import turmaExternaService from "@/common/services/turmaExterna";
import {
  toggleOrdination,
  toggleItemInArray,
  tableLoading,
} from "@/common/mixins";
import {
  PageHeader,
  BaseTable,
  BaseModal,
  NavTab,
  BaseButton,
} from "@/components/ui";
import TurmaExternaRow from "./TurmaExternaRow.vue";

const emptyTurma = {
  id: null,
  periodo: 1,
  letra: "A",
  turno1: null,
  turno2: null,
  Disciplina: null,
  Horario1: null,
  Horario2: null,
  Sala1: null,
  Sala2: null,
};
export default {
  name: "DashboardTurmasExternas",
  mixins: [toggleOrdination, toggleItemInArray, tableLoading],
  components: {
    TurmaExternaRow,
    PageHeader,
    BaseTable,
    BaseModal,
    NavTab,
    BaseButton,
  },
  data() {
    return {
      error: undefined,
      ordenacaoTurmasMain: { order: "disciplinaCodigo", type: "asc" },
      turmaForm: _.clone(emptyTurma),
      isAdding: false,
      semestre: 1,
      searchDisciplinasModal: "",
      filtroSemestres: {
        primeiro: true,
        segundo: true,
        ativo: 3,
      },
      filtroDisciplinas: {
        ativadas: [],
        selecionadas: [],
      },
      tabAtivaModal: "Disciplinas",
      ordenacaoDisciplinasModal: { order: "codigo", type: "asc" },
      modalSelectAll: {
        Disciplinas: () => {
          this.filtroDisciplinas.selecionadas = [...this.DisciplinasExternas];
        },
        Semestres: () => {
          this.filtroSemestres.primeiro = true;
          this.filtroSemestres.segundo = true;
        },
      },
      modalSelectNone: {
        Disciplinas: () => {
          this.filtroDisciplinas.selecionadas = [];
        },
        Semestres: () => {
          this.filtroSemestres.primeiro = false;
          this.filtroSemestres.segundo = false;
        },
      },
    };
  },
  mounted() {
    this.$store.commit("emptyDeleteExterno");
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
    closeModalDelete(){
      this.$refs.modalDelete.close()
    },
    btnOkFiltros() {
      this.setTableLoadingState(true);
      this.filtroDisciplinas.ativadas = [
        ...this.filtroDisciplinas.selecionadas,
      ];
      this.setSemestreAtivo();
      this.setTableLoadingState(false);
    },
    setSemestreAtivo() {
      if (this.filtroSemestres.primeiro && !this.filtroSemestres.segundo)
        this.filtroSemestres.ativo = 1;
      else if (this.filtroSemestres.segundo && !this.filtroSemestres.primeiro)
        this.filtroSemestres.ativo = 2;
      else if (this.filtroSemestres.primeiro && this.filtroSemestres.primeiro)
        this.filtroSemestres.ativo = 3;
      else this.filtroSemestres.ativo = undefined;
    },
    adjustTurno1() {
      if (
        this.turmaForm.Horario1 == 1 ||
        this.turmaForm.Horario1 == 2 ||
        this.turmaForm.Horario1 == 7 ||
        this.turmaForm.Horario1 == 8 ||
        this.turmaForm.Horario1 == 13 ||
        this.turmaForm.Horario1 == 14 ||
        this.turmaForm.Horario1 == 19 ||
        this.turmaForm.Horario1 == 20 ||
        this.turmaForm.Horario1 == 25 ||
        this.turmaForm.Horario1 == 26 ||
        this.turmaForm.Horario1 == 3 ||
        this.turmaForm.Horario1 == 4 ||
        this.turmaForm.Horario1 == 9 ||
        this.turmaForm.Horario1 == 10 ||
        this.turmaForm.Horario1 == 15 ||
        this.turmaForm.Horario1 == 16 ||
        this.turmaForm.Horario1 == 21 ||
        this.turmaForm.Horario1 == 22 ||
        this.turmaForm.Horario1 == 27 ||
        this.turmaForm.Horario1 == 28
      ) {
        this.turmaForm.turno1 = "Diurno";
      } else if (this.turmaForm.Horario1 == 31) {
        this.turmaForm.turno1 = "EAD";
      } else {
        this.turmaForm.turno1 = "Noturno";
      }
    },
    adjustTurno2() {
      if (
        this.turmaForm.Horario2 == 1 ||
        this.turmaForm.Horario2 == 2 ||
        this.turmaForm.Horario2 == 7 ||
        this.turmaForm.Horario2 == 8 ||
        this.turmaForm.Horario2 == 13 ||
        this.turmaForm.Horario2 == 14 ||
        this.turmaForm.Horario2 == 19 ||
        this.turmaForm.Horario2 == 20 ||
        this.turmaForm.Horario2 == 25 ||
        this.turmaForm.Horario2 == 26 ||
        this.turmaForm.Horario2 == 3 ||
        this.turmaForm.Horario2 == 4 ||
        this.turmaForm.Horario2 == 9 ||
        this.turmaForm.Horario2 == 10 ||
        this.turmaForm.Horario2 == 15 ||
        this.turmaForm.Horario2 == 16 ||
        this.turmaForm.Horario2 == 21 ||
        this.turmaForm.Horario2 == 22 ||
        this.turmaForm.Horario2 == 27 ||
        this.turmaForm.Horario2 == 28
      ) {
        this.turmaForm.turno1 = "Diurno";
      } else if (this.turmaForm.Horario2 == 31) {
        this.turmaForm.turno1 = "EAD";
      } else {
        this.turmaForm.turno1 = "Noturno";
      }
    },
    setEad() {
      if (this.turmaForm.turno1 === "EAD") {
        this.turmaForm.Horario1 = 31;
        if (this.turmaForm.Horario2 > 0) this.turmaForm.Horario2 = null;
      }
    },
    deleteSelectedTurma() {
      for (var i = 0; i < this.Deletar.length; i++) {
        this.deleteTurma(this.Deletar[i]);
      }
      this.closeModalDelete()
      this.$store.commit("emptyDeleteExterno");
    },
    limitLenght($event) {
      if ($event.target.value.length >= 3) $event.preventDefault();
    },
    onlyA_Z($event) {
      let key = $event.key ? $event.key : $event.which;
      if (!key.match(/[A-Z]/i)) $event.preventDefault();
    },
    isEmpty(value) {
      return value === "" || value === undefined ? true : false;
    },
    setEmptyKeysToNull(turma) {
      Object.keys(turma).forEach((key) => {
        if (this.isEmpty(turma[key])) turma[key] = null;
      });
    },
    validateTurma(turma) {
      if (turma.Disciplina === null || turma.letra === null) {
        this.$notify({
          group: "general",
          type: "error",
          title: "Erro!",
          text: "Cadastro da turma inválido ou incompleto.",
        });
        return false;
      }
      return true;
    },
    addTurma() {
      this.setEmptyKeysToNull(this.turmaForm);
      if (!this.validateTurma(this.turmaForm)) return;
      this.turmaForm.Plano = localStorage.getItem("Plano");

      turmaExternaService
        .create(this.turmaForm)
        .then((response) => {
          this.semestre = response.Turma.periodo;
          this.$store.dispatch("fetchAllPedidosExternos");
          this.cleanTurmaForm();

          this.$notify({
            group: "general",
            type: "success",
            title: "Sucesso!",
            text: `A Turma: ${response.Turma.letra} foi criada!`,
          });
        })
        .catch((error) => {
          this.$notify({
            group: "general",
            type: "error",
            title: "Erro!",
            text: `${error}`,
          });
        });
    },
    editTurma(turma) {
      turmaExternaService
        .update(turma.id, turma)
        .then((response) => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Turma ${response.Turma.letra} foi atualizada!`,
            type: "success",
          });
        })
        .catch((error) => {
          this.error = "<b>Erro ao atualizar Turma</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
        });
    },
    deleteTurma(turma) {
      const turmaToDelete = _.clone(turma);

      turmaExternaService
        .delete(turmaToDelete.id, turmaToDelete)
        .then((response) => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Turma ${response.Turma.letra} foi excluída!`,
            type: "success",
          });
        })
        .catch(() => {
          this.error = "<b>Erro ao excluir Turma</b>";
        });
    },
    cleanTurmaForm() {
      this.turmaForm = _.clone(emptyTurma);
      this.error = undefined;
    },
    toggleAdd() {
      this.isAdding = !this.isAdding;
    },
    normalizeText(text) {
      return text
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    },
    clearsearchDisciplinasModal() {
      this.searchDisciplinasModal = "";
    },
  },
  computed: {
    TurmasExternasOrdered() {
      return _.orderBy(
        this.TurmasExternarFiltredByDisciplinas,
        ["periodo", this.ordenacaoTurmasMain.order],
        ["asc", this.ordenacaoTurmasMain.type]
      );
    },
    TurmasExternarFiltredByDisciplinas() {
      return _.filter(
        this.TurmasExternarFiltredBySemestres,
        (turma) =>
          _.findIndex(
            this.filtroDisciplinas.ativadas,
            (disciplina) => disciplina.id === turma.Disciplina
          ) !== -1
      );
    },
    TurmasExternarFiltredBySemestres() {
      return _.filter(this.TurmasExternasInDisciplinas, (turma) => {
        switch (this.filtroSemestres.ativo) {
          case 1:
            return turma.periodo === 1;
          case 2:
            return turma.periodo === 3;
          case 3:
            return true;
          default:
            return false;
        }
      });
    },
    TurmasExternasInDisciplinas() {
      const turmasResultantes = [];

      _.forEach(this.$store.state.turmaExterna.Turmas, (turma) => {
        const disciplinaFounded = _.find(
          this.DisciplinasExternas,
          (disciplina) => disciplina.id === turma.Disciplina
        );

        if (disciplinaFounded) {
          turmasResultantes.push({
            ...turma,
            disciplinaNome: disciplinaFounded.nome,
            disciplinaCodigo: disciplinaFounded.codigo,
          });
        }
      });

      return turmasResultantes;
    },
    CursosDCC() {
      return _.slice(this.$store.state.curso.Cursos, 0, 4);
    },
    DisciplinasExternasOrderByCodigo() {
      return _.orderBy(this.DisciplinasExternas, "codigo");
    },
    DisciplinasExternasFiltredModal() {
      if (this.searchCursosModal === "") return this.DisciplinasExternas;

      const searchNormalized = this.normalizeText(this.searchDisciplinasModal);

      return _.filter(this.DisciplinasExternas, (disciplina) => {
        const disciplinaNome = this.normalizeText(disciplina.nome);
        const disciplinaCodigo = this.normalizeText(disciplina.codigo);

        return (
          disciplinaNome.match(searchNormalized) ||
          disciplinaCodigo.match(searchNormalized)
        );
      });
    },
    DisciplinasExternasOrderedModal() {
      return _.orderBy(
        this.DisciplinasExternasFiltredModal,
        this.ordenacaoDisciplinasModal.order,
        this.ordenacaoDisciplinasModal.type
      );
    },
    DisciplinasExternas() {
      return _.filter(this.$store.state.disciplina.Disciplinas, function(
        disciplina
      ) {
        return disciplina.Perfil == 13 || disciplina.Perfil == 15;
      });
    },
    HorariosOrdered() {
      return _.orderBy(this.$store.state.horario.Horarios, "horario");
    },
    SalasOrdered() {
      return _.orderBy(this.$store.state.sala.Salas, "nome");
    },
    Deletar() {
      return this.$store.state.turmaExterna.Deletar;
    },
  },
};
</script>

<style scoped>
.novaturma {
  font-size: 11px !important;
  background-color: #e9e9e9;
}
.novaturma .less-padding {
  padding: 0 2px;
}
/*  */
/*  */
.novaturma td {
  margin: 0 !important;
  padding: 0 5px;
  vertical-align: middle !important;
  text-align: center;
  word-break: break-word;
}

.novaturma select,
.novaturma input {
  font-size: 11px !important;
  border: 1px solid #414141 !important;
  color: #414141 !important;
  border-radius: 0px !important;
}
.novaturma select {
  height: 18px !important;
  width: 100% !important;
}
.novaturma select + select {
  margin-top: 2px !important;
}
.novaturma input[type="checkbox"] {
  width: 14px !important;
  height: 14px !important;
  margin: 0;
  margin-top: 5px !important;
}
.novaturma .input-letra {
  margin: 0;
  margin-top: 4px !important;
  height: 18px;
  width: 30px;
  text-align: center;
}
.novaturma .less-padding {
  padding: 0 2px;
}
/*  */
/*  */

.stickyAdd {
  display: block;
  overflow: hidden !important;
  position: sticky !important;
  position: -webkit-sticky !important;
  top: 19px !important;
  overflow: hidden !important;
  z-index: 5 !important;
}
</style>
