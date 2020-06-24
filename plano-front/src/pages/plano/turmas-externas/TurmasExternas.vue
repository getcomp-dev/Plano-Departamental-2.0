<template>
  <div v-if="Admin" class="main-component row">
    <PageTitle :title="'Graduação - Outros'">
      <template #aside>
        <button
          v-show="turmaAddIsVisible"
          type="button"
          title="Salvar"
          class="btn-custom btn-icon addbtn"
          v-on:click.prevent="addTurma"
        >
          <i class="fas fa-check"></i>
        </button>
        <button
          v-show="turmaAddIsVisible"
          type="button"
          title="Cancelar"
          class="btn-custom btn-icon cancelbtn"
          v-on:click.prevent="toggleAdd"
        >
          <i class="fas fa-times"></i>
        </button>

        <button
          v-show="!turmaAddIsVisible"
          type="button"
          title="Adicionar"
          class="btn-custom btn-icon addbtn"
          v-on:click.prevent="toggleAdd"
        >
          <i class="fas fa-plus"></i>
        </button>
        <button
          v-show="!turmaAddIsVisible"
          type="button"
          title="Deletar"
          class="btn-custom btn-icon delbtn"
          @click="openModalConfirma()"
        >
          <i class="far fa-trash-alt"></i>
        </button>
        <b-button
          v-b-modal.modalFiltros
          title="Filtros"
          class="btn-custom btn-icon cancelbtn"
        >
          <i class="fas fa-list-ul"></i>
        </b-button>

        <b-button
          v-b-modal.modalAjuda
          title="Ajuda"
          class="btn-custom btn-icon relatbtn"
        >
          <i class="fas fa-question"></i>
        </b-button>
      </template>
    </PageTitle>

    <div class="div-table" v-if="!isLoading">
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
          <th style="width: 35px" title="Turma">
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
          <tr v-show="turmaAddIsVisible" class="novaturma stickyAdd">
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
            <td style="width: 35px;">
              <input
                type="text"
                class="input-letra"
                id="turma"
                v-model="turmaForm.letra"
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
                style="margin-bottom: 1px;"
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
              <select
                type="text"
                style="margin-bottom: 1px"
                id="sala1"
                v-model="turmaForm.Sala1"
              >
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

          <TurmaExternaRow
            v-for="turma in TurmasExternasOrdered"
            :key="'turma' + turma.id"
            :turma="turma"
            :options="{
              CursosDCC: CursosDCC,
              DisciplinasExternas: DisciplinasExternas,
            }"
          />
          <tr v-if="TurmasExternasOrdered.length === 0">
            <td style="width:980px">
              <b>Nenhuma turma encontrada.</b> Clique no botão de filtros
              <i class="fas fa-list-ul mx-1"></i> para selecioná-las.
            </td>
          </tr>
        </template>
      </BaseTable>
    </div>

    <!-- MODAL CONFIRMA -->
    <b-modal ref="modalConfirma" title="Confirmar Seleção" @ok="deleteSelected">
      <p class="my-4">Tem certeza que deseja deletar as turmas selecionadas?</p>
      <template v-for="turma in Deletar">
        <template v-for="disciplina in DisciplinasExternas">
          <template v-if="disciplina.id === turma.Disciplina">
            <p
              :key="'disciplina' + disciplina.id + 'turma' + turma.id"
              style="width: 80px;"
            >
              Disciplina:{{ disciplina.codigo }}
              <br />
              Turma:{{ turma.letra }}
            </p>
          </template>
        </template>
      </template>
    </b-modal>

    <!-- MODAL FILTROS -->
    <b-modal id="modalFiltros" ref="modalFiltros" scrollable title="Filtros">
      <NavTab
        :currentTab="modalTabAtiva"
        :allTabs="['Disciplinas', 'Semestres']"
        @change-tab="modalTabAtiva = $event"
      />

      <div class="div-table">
        <BaseTable
          v-show="modalTabAtiva === 'Semestres'"
          :tableType="'modal-table'"
        >
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
        <BaseTable
          v-show="modalTabAtiva === 'Disciplinas'"
          :tableType="'modal-table'"
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
              <i :class="setIconByOrder(ordenacaoDisciplinasModal, 'nome')"></i>
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
      </div>

      <div slot="modal-footer" class="w-100 m-0 d-flex">
        <div class="w-100">
          <b-button
            class="btn-azul btn-custom btn-modal"
            variant="success"
            @click="modalSelectAll[modalTabAtiva]"
            >Selecionar Todos</b-button
          >
          <b-button
            class="btn-cinza btn-custom btn-modal"
            variant="secondary"
            @click="modalSelectNone[modalTabAtiva]"
            >Desmarcar Todos</b-button
          >
        </div>
        <b-button
          variant="success"
          @click="btnOkFiltros()"
          class="btn-verde btn-custom btn-modal btn-ok-modal"
          >OK</b-button
        >
      </div>
    </b-modal>
    <!-- MODAL AJUDA -->
    <b-modal id="modalAjuda" scrollable title="Ajuda">
      <div class="modal-body">
        <ul class="listas list-group">
          <li class="list-group-item">
            <strong>Para adicionar disciplinas à Tabela:</strong> Clique em
            Adicionar
            <i class="fas fa-plus addbtn px-1" style="font-size: 12px;"></i>
            , em seguida, preencha a nova linha que surgirá na tabela. Após
            concluído, clique em Salvar
            <i class="fas fa-check addbtn px-1" style="font-size: 12px;"></i>
            ou em Cancelar
            <i class="fas fa-times cancelbtn px-1" style="font-size: 12px;"></i>
            .
          </li>
          <li class="list-group-item">
            <strong>Para deletar disciplinas da Tabela:</strong> Marque a(s)
            disciplina(s) que deseja deletar através da caixa de seleção à
            esquerda e em seguida clique em Deletar
            <i
              class="far fa-trash-alt delbtn px-1"
              style="font-size: 12px;"
            ></i>
            e confirme no botão OK.
          </li>
          <li class="list-group-item">
            <strong>Para editar disciplinas da Tabela:</strong> Faça as
            alterações necessárias diretamente na tabela e o sistema irá salvar
            automaticamente.
          </li>
          <li class="list-group-item">
            <strong>Observações:</strong> Em cada coluna de cursos a disciplina
            adicionada permite a inclusão em dois espaços, sendo acima destinado
            para alunos na grade, e abaixo para alunos repetentes. Para que uma
            disciplina externa apareça em Horários de um determinado curso é
            preciso que pelo menos uma vaga para alunos na grade seja destinada
            ao mesmo.
          </li>
        </ul>
      </div>

      <div slot="modal-footer" style="display: none;"></div>
    </b-modal>
  </div>
</template>

<script>
import _ from "lodash";
import toggleOrdinationMixin from "@/mixins/toggleOrdination.js";
import toggleItemInArrayMixin from "@/mixins/toggleItemInArray.js";
import turmaExternaService from "@/common/services/turmaExterna";
import pedidoExternoService from "@/common/services/pedidoExterno";
import PageTitle from "@/components/PageTitle.vue";
import BaseTable from "@/components/BaseTable.vue";
import NavTab from "@/components/NavTab.vue";
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
const emptyPedido = {
  vagasPeriodizadas: 0,
  vagasNaoPeriodizadas: 0,
  Curso: undefined,
  Turma: undefined,
};
export default {
  name: "DashboardTurmasExternas",
  mixins: [toggleOrdinationMixin, toggleItemInArrayMixin],
  components: {
    TurmaExternaRow,
    PageTitle,
    BaseTable,
    NavTab,
  },
  data() {
    return {
      error: undefined,
      ordenacaoTurmasMain: { order: "disciplinaCodigo", type: "asc" },
      turmaForm: _.clone(emptyTurma),
      turmaAddIsVisible: false,
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
      modalTabAtiva: "Disciplinas",
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
  created() {
    if (!this.Admin) {
      this.$notify({
        group: "general",
        title: "Erro",
        text:
          "Acesso negado! Usuário não possui permissão para acessar esta página!",
        type: "error",
      });
      this.$router.push({ name: "dashboard" });
    }
  },
  mounted() {
    // this.$store.commit('emptyDelete')
    // console.log(this.$store.state.turma.Deletar)
    // this.$store.commit(COMPONENT_LOADED)
  },

  methods: {
    btnOkFiltros() {
      this.filtroDisciplinas.ativadas = [
        ...this.filtroDisciplinas.selecionadas,
      ];
      this.setSemestreAtivo();
      this.$refs.modalFiltros.hide();
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
    openModalConfirma() {
      if (this.Deletar.length) this.$refs.modalConfirma.show();
      else
        this.$notify({
          group: "general",
          type: "error",
          title: "Erro!",
          text: "Nenhuma turma selecionada para exclusão",
        });
    },
    deleteSelected() {
      var turmas = this.$store.state.turmaExterna.Deletar;
      for (var i = 0; i < turmas.length; i++) {
        this.deleteTurma(turmas[i]);
      }
      this.$store.commit("emptyDeleteExterno");
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
      const newTurma = _.clone(this.turmaForm);

      this.setEmptyKeysToNull(newTurma);
      if (!this.validateTurma(newTurma)) return;

      turmaExternaService
        .create(newTurma)
        .then((response) => {
          this.semestre = response.Turma.periodo;
          for (let i = 0; i < 4; i++) {
            let pedido = _.clone(emptyPedido);
            pedido.Curso = this.$store.state.curso.CursosDCC[i].id;
            pedido.Turma = response.Turma.id;
            pedidoExternoService
              .create(pedido)
              .then()
              .catch((error) => {
                this.$notify({
                  group: "general",
                  type: "error",
                  title: "Erro!",
                  text: `Erro ao criar pedido:<br>${error}`,
                });
              });
          }
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

          this.error = "<b>Erro ao criar Turma</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
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
      turmaExternaService
        .delete(turma.id, turma)
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
      this.turmaAddIsVisible = !this.turmaAddIsVisible;
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
    isLoading() {
      return this.$store.state.isLoading;
    },
    Admin() {
      return this.$store.state.auth.Usuario.admin === 1;
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
.novaturma .input-letra {
  margin-left: 0 !important;
  margin-top: 4px !important;
  margin-bottom: auto !important;
  height: 25px !important;
  width: 20px;
  text-align: center !important;
}
.novaturma select {
  height: 18px;
  width: 100%;
}
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
