<template>
  <div v-if="Admin" class="main-component row">
    <PageTitle :title="'Graduação - DCC'">
      <template #aside>
        <template v-if="turmaAddIsVisible">
          <b-button
            title="Salvar"
            class="btn-custom btn-icon addbtn"
            v-on:click.prevent="addTurma"
          >
            <i class="fas fa-check"></i>
          </b-button>
          <b-button
            title="Cancelar"
            class="btn-custom btn-icon cancelbtn"
            v-on:click.prevent="toggleAddTurma"
          >
            <i class="fas fa-times"></i>
          </b-button>
        </template>
        <template v-else>
          <b-button
            title="Adicionar"
            class="btn-custom btn-icon addbtn"
            v-on:click.prevent="toggleAddTurma"
          >
            <i class="fas fa-plus"></i>
          </b-button>
          <b-button
            title="Deletar"
            class="btn-custom btn-icon delbtn"
            @click="openModalConfirma()"
          >
            <i class="far fa-trash-alt"></i>
          </b-button>
        </template>

        <b-button
          v-b-modal.modalFiltros
          title="Filtros"
          class="btn-custom btn-icon cancelbtn"
        >
          <i class="fas fa-list-ul"></i>
        </b-button>

        <b-button
          title="XLSX"
          class="btn-custom btn-icon relatbtn"
          v-on:click.prevent="xlsx(Pedidos)"
        >
          <i class="far fa-file-pdf"></i>
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
          <TurmaHeader
            :cursosAtivados="filtroCursos.ativados"
            :currentOrder="ordenacaoTurmasMain"
            :currentOrderPerfil="ordenacaoPerfisMain"
            @toggle-order="toggleOrder(ordenacaoTurmasMain, $event)"
            @toggle-order-perfil="toggleOrder(ordenacaoPerfisMain, $event)"
          />
        </template>
        <template #tbody>
          <tr v-show="turmaAddIsVisible" class="stickyAdd">
            <NovaTurma :cursosLength="filtroCursos.ativados.length" />
          </tr>

          <tr
            v-for="turma in TurmasOrdered"
            :key="'turma id' + turma.id"
            :style="{ 'background-color': turma.perfilCor }"
          >
            <TurmaRow
              :key="turma.id + 'turmarow'"
              :turma="turma"
              :cursosSelecteds="filtroCursos.ativados"
              @handle-click-in-edit="handleClickInEdit($event)"
            />
          </tr>
          <tr v-if="TurmasOrdered.length === 0">
            <td style="width:1090px">
              <b>Nenhuma turma encontrada</b>, clique no botão de filtros para
              seleciona-las.
            </td>
          </tr>
        </template>
      </BaseTable>
    </div>

    <!-- MODAL FILTROS -->
    <b-modal
      id="modalFiltros"
      ref="modalFiltros"
      scrollable
      size="md"
      title="Filtros"
    >
      <NavTab
        :currentTab="tabAtivaModal"
        :allTabs="['Perfis', 'Cursos', 'Semestres']"
        @change-tab="tabAtivaModal = $event"
      />

      <div class="div-table">
        <BaseTable
          :tableType="'modal-table'"
          v-show="tabAtivaModal === 'Perfis'"
        >
          <template #thead>
            <th style="width: 25px;"></th>
            <th
              @click="toggleOrder(ordenacaoPerfisModal, 'nome')"
              class="clickable t-start"
              style="width: 425px"
            >
              Nome
              <i :class="setIconByOrder(ordenacaoPerfisModal, 'nome')"></i>
            </th>
          </template>
          <template #tbody>
            <tr
              v-for="perfil in PerfisOrdered"
              :key="'perfilId' + perfil.id"
              @click="addOrRemoveItem(perfil, filtroPerfis.selecionados)"
            >
              <td style="width: 25px">
                <input
                  type="checkbox"
                  v-model="filtroPerfis.selecionados"
                  :value="perfil"
                  class="form-check-input position-static m-0"
                />
              </td>
              <td style="width: 425px" class="t-start">
                {{ perfil.nome }}
              </td>
            </tr>
          </template>
        </BaseTable>

        <BaseTable
          v-show="tabAtivaModal === 'Cursos'"
          :tableType="'modal-table'"
          :hasSearchBar="true"
        >
          <template #thead-search>
            <input
              type="text"
              class="form-control input-search"
              placeholder="Pesquise nome ou codigo de uma disciplina..."
              v-model="searchCursosModal"
            />
            <button @click="clearsearchCursosModal()" class="btn btn-search">
              &times;
            </button>
          </template>
          <template #thead>
            <th style="width: 25px;"></th>
            <th
              @click="toggleOrder(ordenacaoCursosModal, 'codigo')"
              class="clickable"
              style="width: 50px;"
            >
              Cód.
              <i :class="setIconByOrder(ordenacaoCursosModal, 'codigo')"></i>
            </th>
            <th
              @click="toggleOrder(ordenacaoCursosModal, 'nome')"
              class="clickable t-start"
              style="width: 375px"
            >
              Nome
              <i :class="setIconByOrder(ordenacaoCursosModal, 'nome')"></i>
            </th>
          </template>
          <template #tbody>
            <tr
              v-for="curso in ModalCursosOrdered"
              :key="'cursoMd' + curso.id"
              @click="addOrRemoveItem(curso, filtroCursos.selecionados)"
            >
              <td style="width: 25px">
                <input
                  type="checkbox"
                  v-model="filtroCursos.selecionados"
                  :value="curso"
                  class="form-check-input position-static m-0"
                />
              </td>
              <td style="width: 50px;">
                {{ curso.codigo }}
              </td>
              <td style="width: 375px" class="t-start">
                {{ curso.nome }}
              </td>
            </tr>
            <tr v-show="ModalCursosOrdered.length === 0">
              <td colspan="3" style="width:450px">
                NENHUM CURSO ENCONTRADO.
              </td>
            </tr>
          </template>
        </BaseTable>

        <BaseTable
          v-show="tabAtivaModal === 'Semestres'"
          :tableType="'modal-table'"
        >
          <template #thead>
            <th style="width: 25px"></th>
            <th style="width: 425px" class="t-start">
              Semestre Letivo
            </th>
          </template>
          <template #tbody>
            <tr>
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
            <tr>
              <td style="width: 25px">
                <input
                  type="checkbox"
                  class="form-check-input position-static m-0"
                  v-model="filtroSemestres.segundo"
                />
              </td>
              <td style="width: 425px" class="t-start">
                SEGUNDO
              </td>
            </tr>
          </template>
        </BaseTable>
      </div>

      <div slot="modal-footer" class="w-100 m-0" style="display: flex;">
        <div class="w-100">
          <b-button
            class="btn-azul btn-custom btn-modal"
            variant="success"
            @click="modalSelectAll[tabAtivaModal]"
            >Selecionar Todos</b-button
          >
          <b-button
            class="btn-cinza btn-custom btn-modal"
            variant="secondary"
            @click="modalSelectNone[tabAtivaModal]"
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

    <!-- MODAL TURMA -->
    <b-modal
      id="modalTurma"
      ref="modalTurma"
      scrollable
      title="Edição de Turma"
      hide-footer
    >
      <template v-if="turmaClickada !== null">
        <ModalEditTurma
          :key="turmaClickada.id + 'modalTurma'"
          :turma="turmaClickada"
        />
      </template>
    </b-modal>

    <!-- MODAL DELETAR -->
    <b-modal
      id="modalConfirma"
      ref="modalConfirma"
      title="Confirmar Seleção"
      @ok="deleteSelected"
    >
      <p class="my-4">Tem certeza que deseja deletar as turmas selecionadas?</p>
      <template v-if="Deletar.length > 0">
        <template v-for="turma in Deletar">
          <template v-for="disciplina in Disciplinas">
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
      </template>
    </b-modal>
    <!-- MODAL AJUDA -->
    <b-modal
      id="modalAjuda"
      ref="ajudaModal"
      scrollable
      title="Ajuda"
      hide-footer
    >
      <div class="modal-body">
        <ul class="listas list-group">
          <li class="list-group-item">
            <strong>Para exibir conteúdo na Tabela:</strong> Comece selecionando
            o(s) semestre(s) desejado(s). Em seguida, clique em Perfil
            <i
              class="fas fa-list-ul cancelbtn px-1"
              style="font-size: 12px;"
            ></i>
            e marque quais deseja mostrar, depois clique em OK. Logo após,
            escolha os Cursos
            <i
              class="fas fa-graduation-cap cancelbtn px-1"
              style="font-size: 12px;"
            ></i>
            que quer ver, confirmando a seleção em OK.
          </li>
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
            <strong>Para editar disciplinas da Tabela:</strong> Faça as
            alterações necessárias diretamente na tabela e o sistema irá salvar
            automaticamente.
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
            <strong>Para gerar relatório:</strong> Clique no botão XLSX
            <i
              class="far fa-file-pdf relatbtn px-1"
              style="font-size: 12px;"
            ></i>
            e aguarde para fazer
            <font style="font-style: italic;">download</font> do relatório.
          </li>
          <li class="list-group-item">
            <strong>Observações:</strong> Em cada coluna de cursos a disciplina
            adicionada permite a inclusão em dois espaços, sendo acima destinado
            para alunos na grade, e abaixo para alunos repetentes.
          </li>
        </ul>
      </div>
    </b-modal>

    <div id="loading" v-if="isLoading">
      <div class="cube1"></div>
      <div class="cube2"></div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import xlsx from "@/common/services/xlsx";
import ls from "local-storage";
import { EventBus } from "@/event-bus.js";
import ordenacaoMixin from "@/ordenacao-mixin";
import { saveAs } from "file-saver";
import turmaService from "@/common/services/turma";
import pedidoService from "@/common/services/pedido";
import TurmaHeader from "./TurmaHeader.vue";
import NovaTurma from "./NovaTurma.vue";
import TurmaRow from "./TurmaRow.vue";
import NavTab from "@/components/NavTab.vue";
import PageTitle from "@/components/PageTitle.vue";
import BaseTable from "@/components/BaseTable.vue";
import ModalEditTurma from "@/components/ModalEditTurma.vue";

export default {
  name: "DashboardPrototipo",
  mixins: [ordenacaoMixin],
  components: {
    TurmaRow,
    TurmaHeader,
    NovaTurma,
    PageTitle,
    ModalEditTurma,
    NavTab,
    BaseTable,
  },
  data() {
    return {
      error: undefined,
      turmaClickada: null,
      turmaAddIsVisible: false,
      ordenacaoTurmasMain: { order: "disciplinaCodigo", type: "asc" },
      ordenacaoPerfisMain: { order: "perfilNome", type: "asc" },
      tabAtivaModal: "Perfis",
      searchCursosModal: "",
      ordenacaoCursosModal: { order: "codigo", type: "asc" },
      ordenacaoPerfisModal: { order: "nome", type: "asc" },
      filtroPerfis: {
        ativados: [],
        selecionados: [],
      },
      filtroCursos: {
        ativados: [],
        selecionados: [],
      },
      filtroSemestres: {
        primeiro: true,
        segundo: true,
        ativo: 3,
      },
      modalSelectAll: {
        Perfis: () => {
          this.filtroPerfis.selecionados = [...this.Perfis];
        },
        Cursos: () => {
          this.filtroCursos.selecionados = [...this.Cursos];
        },
        Semestres: () => {
          this.filtroSemestres.primeiro = true;
          this.filtroSemestres.segundo = true;
        },
      },
      modalSelectNone: {
        Perfis: () => {
          this.filtroPerfis.selecionados = [];
        },
        Cursos: () => {
          this.filtroCursos.selecionados = [];
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
    ls.set("toggle", -1);
    ls.on("toggle", () => {
      var val = ls.get("toggle");
      if (val === true) {
        this.$store.dispatch("toggleAllCursosTrue");
      } else {
        this.$store.dispatch("toggleAllCursosFalse");
      }
      ls.set("toggle", -1);
    });
    for (var c = 0; c < this.Cursos.length; c++) {
      let id = this.Cursos[c].id;
      ls.on(`${id}`, () => {
        this.$store.dispatch("toggleCurso", id);
      });
    }
  },
  beforeDestroy() {
    ls.off("toggle");
    for (var c = 0; c < this.Cursos.length; c++) {
      let id = this.Cursos[c].id;
      ls.off(`${id}`);
    }
  },

  methods: {
    addOrRemoveItem(item, array) {
      const index = array.indexOf(item);
      if (index === -1) array.push(item);
      else array.splice(index, 1);
    },
    handleClickInEdit(turmaClicked) {
      this.turmaClickada = turmaClicked;
      this.$refs.modalTurma.show();
    },
    btnOkFiltros() {
      this.setSemestreAtivo();
      this.filtroPerfis.ativados = [...this.filtroPerfis.selecionados];
      this.filtroCursos.ativados = [...this.filtroCursos.selecionados];
      this.clearsearchCursosModal();
      this.tabAtivaModal = "Perfis";
      this.$refs.modalFiltros.hide();
    },
    clearsearchCursosModal() {
      this.searchCursosModal = "";
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
    openModalConfirma() {
      if (this.Deletar.length) this.$refs.modalConfirma.show();
      else
        this.$notify({
          group: "general",
          title: `Erro!`,
          text: `Nenhuma turma selecionada para exclusão`,
          type: "error",
        });
    },
    xlsx(pedidos) {
      xlsx
        .downloadTable({
          pedidos: pedidos,
        })
        .then(() => {
          fetch("http://200.131.219.57:3000/api/xlsx/download", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.$store.state.auth.token}`,
            },
          })
            .then((r) => r.blob())
            .then((blob) => saveAs(blob, "tabela.xlsx"));
        })
        .catch((error) => {
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: `Erro ao gerar a tabela!\n ${error}`,
            type: "error",
          });
        });
    },
    deleteSelected() {
      let turmas = this.$store.state.turma.Deletar;
      for (let i = 0; i < turmas.length; i++) {
        this.deleteTurma(_.clone(turmas[i]));
        //Necessario _.clone para não passar um objeto reativo como parametro onde será editado
      }
      this.$store.commit("emptyDelete");
    },
    addTurma() {
      EventBus.$emit("addTurma");
    },
    editTurma(turma) {
      turmaService
        .update(turma.id, turma)
        .then((response) => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Turma ${response.Turma.letra} foi atualizada!`,
            type: "warn",
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
      turma.periodo = null;
      turma.letra = null;
      turma.turno1 = null;
      turma.turno2 = null;
      turma.Disciplina = null;
      turma.Docente1 = null;
      turma.Docente2 = null;
      turma.Horario1 = null;
      turma.Horario2 = null;
      turma.Sala1 = null;
      turma.Sala2 = null;

      this.editTurma(turma);

      let pedidos = this.$store.state.pedido.Pedidos[turma.id];
      for (let i = 0; i < pedidos.length; i++) {
        if (
          !(
            pedidos[i].vagasPeriodizadas === 0 &&
            pedidos[i].vagasNaoPeriodizadas === 0
          )
        ) {
          pedidos[i].vagasPeriodizadas = 0;
          pedidos[i].vagasNaoPeriodizadas = 0;
          pedidoService
            .update(pedidos[i].Curso, pedidos[i].Turma, pedidos[i])
            .then(() => {
              this.$notify({
                group: "general",
                title: `Sucesso!`,
                text: `O pedido foi atualizado!`,
                type: "warn",
                position: "bottom right",
              });
            })
            .catch((error) => {
              this.error = "<b>Erro ao atualizar Pedido</b>";
              if (error.response.data.fullMessage) {
                this.error +=
                  "<br/>" +
                  error.response.data.fullMessage.replace("\n", "<br/>");
              }
            });
        }
      }
    },
    toggleAddTurma() {
      this.turmaAddIsVisible = !this.turmaAddIsVisible;
    },
    normalizeText(text) {
      return text
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    },
  },
  computed: {
    TurmasOrdered() {
      let turmasResult = _.orderBy(
        this.TurmasFiltredByPerfis,
        [this.ordenacaoTurmasMain.order, "letra"],
        [this.ordenacaoTurmasMain.type, "asc"]
      );

      if (this.ordenacaoPerfisMain.order !== null) {
        turmasResult = _.orderBy(
          turmasResult,
          this.ordenacaoPerfisMain.order,
          this.ordenacaoPerfisMain.type
        );
      }

      return _.orderBy(turmasResult, "periodo");
    },
    TurmasFiltredByPerfis() {
      return _.filter(this.TurmasFiltredBySemestres, (turma) =>
        _.find(
          this.filtroPerfis.ativados,
          (perfil) => perfil.id === turma.disciplinaPerfil
        )
      );
    },
    TurmasFiltredBySemestres() {
      return _.filter(this.TurmasInDisciplinas, (turma) => {
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
    TurmasInDisciplinas() {
      let turmasResultantes = [];

      _.forEach(this.Turmas, (turma) => {
        const disciplinaEcontrada = _.find(
          this.Disciplinas,
          (disciplina) => disciplina.id === turma.Disciplina
        );

        const perfilEncontrado = _.find(
          this.Perfis,
          (perfil) => perfil.id === disciplinaEcontrada.Perfil
        );

        if (disciplinaEcontrada && perfilEncontrado) {
          turmasResultantes.push({
            ...turma,
            disciplinaNome: disciplinaEcontrada.nome,
            disciplinaCodigo: disciplinaEcontrada.codigo,
            disciplinaPerfil: disciplinaEcontrada.Perfil,
            perfilCor: perfilEncontrado.cor,
            perfilNome: perfilEncontrado.nome,
            perfilAbreviacao: perfilEncontrado.abreviacao,
          });
        }
      });
      return turmasResultantes;
    },

    ModalCursosOrdered() {
      return _.orderBy(
        this.ModalCursosFiltred,
        this.ordenacaoCursosModal.order,
        this.ordenacaoCursosModal.type
      );
    },
    ModalCursosFiltred() {
      let cursosResultantes = this.Cursos;

      if (this.searchCursosModal !== "") {
        const searchNormalized = this.normalizeText(this.searchCursosModal);

        cursosResultantes = _.filter(cursosResultantes, (curso) => {
          const cursoNome = this.normalizeText(curso.nome);
          const cursoCodigo = this.normalizeText(curso.codigo);

          return (
            cursoNome.match(searchNormalized) ||
            cursoCodigo.match(searchNormalized)
          );
        });
      }
      return cursosResultantes;
    },
    PerfisOrdered() {
      return _.orderBy(
        this.Perfis,
        this.ordenacaoPerfisModal.order,
        this.ordenacaoPerfisModal.type
      );
    },

    Cursos() {
      return this.$store.state.curso.Cursos;
    },
    Perfis() {
      return this.$store.state.perfil.Perfis;
    },
    Disciplinas() {
      return this.$store.state.disciplina.Disciplinas;
    },
    Turmas() {
      return _.filter(
        this.$store.state.turma.Turmas,
        (turma) => !_.isNull(turma.Disciplina)
      );
    },
    Deletar() {
      return this.$store.state.turma.Deletar;
    },
    Pedidos() {
      return this.$store.state.pedido.Pedidos;
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
.stickyAdd {
  background-color: #e9e9e9;
  display: block;
  overflow: hidden !important;
  position: sticky !important;
  position: -webkit-sticky !important;
  top: 19px !important;
  overflow: hidden !important;
  z-index: 5 !important;
}
</style>
