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
            v-on:click.prevent="toggleAdd"
          >
            <i class="fas fa-times"></i>
          </b-button>
        </template>
        <template v-else>
          <b-button
            title="Adicionar"
            class="btn-custom btn-icon addbtn"
            v-on:click.prevent="toggleAdd"
          >
            <i class="fas fa-plus"></i>
          </b-button>
          <b-button
            title="Deletar"
            class="btn-custom btn-icon delbtn"
            v-b-modal.modalConfirma
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

    <div class="divTable" v-if="!isLoading">
      <table class="table main-table table-hover table-sm table-bordered">
        <thead class="thead-light max-content sticky">
          <tr>
            <TurmaHeader
              :cursosSelecteds="filtroCursos.ativados"
              :currentOrder="ordenacaoTurmasMain"
              :currentOrderPerfil="ordenacaoPerfisMain"
              v-on:toggle-order="toggleOrder(ordenacaoTurmasMain, $event)"
              v-on:toggle-order-perfil="
                toggleOrder(ordenacaoPerfisMain, $event)
              "
            />
          </tr>

          <tr v-show="turmaAddIsVisible">
            <NovaTurma :cursosLength="filtroCursos.ativados.length" />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="turma in TurmasInPerfilOrdered"
            :key="'turma id' + turma.id"
            v-bind:style="{ 'background-color': turma.perfilCor }"
          >
            <TurmaRow
              ref="turma"
              v-on:handle-click-in-edit="handleClickInEdit($event)"
              v-bind:turma="turma"
              v-bind:cursosSelecteds="filtroCursos.ativados"
            />
          </tr>
        </tbody>
      </table>
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
        :currentTab="modalTabAtiva"
        :allTabs="['Perfis', 'Cursos', 'Semestre']"
        @change-tab="modalTabAtiva = $event"
      />
      <div class="col m-0 p-0 max-content" style="height: 450px !important;">
        <table
          v-show="modalTabAtiva === 'Perfis'"
          class="table table-sm modal-table table-bordered"
          style="max-height: 450px !important;"
        >
          <thead class="thead-light sticky">
            <tr>
              <div class="max-content sticky">
                <th>
                  <p style="width: 25px;" class="p-header"></p>
                </th>
                <th>
                  <p
                    class="p-header clickable t-start"
                    @click="toggleOrder(ordenacaoPerfisModal, 'nome')"
                    style="width: 436px"
                  >
                    Nome
                    <i
                      :class="setIconByOrder(ordenacaoPerfisModal, 'nome')"
                    ></i>
                  </p>
                </th>
              </div>
            </tr>
          </thead>
          <tbody>
            <tr v-for="perfil in PerfisOrdered" :key="'perfilId' + perfil.id">
              <div class="max-content">
                <td>
                  <div style="width: 25px; height: inherit;" class="px-1">
                    <input
                      type="checkbox"
                      v-model="filtroPerfis.selecionados"
                      :value="perfil"
                      class="form-check-input position-static m-0"
                    />
                  </div>
                </td>
                <td>
                  <p style="width: 436px; text-align: start;">
                    {{ perfil.nome }}
                  </p>
                </td>
              </div>
            </tr>
          </tbody>
        </table>

        <table
          v-show="modalTabAtiva === 'Cursos'"
          class="table table-sm modal-table table-bordered"
          style="height: 450px !important;"
        >
          <thead class="thead-light sticky">
            <tr>
              <div class="max-content sticky">
                <th>
                  <div class="m-0 input-group input-group-search">
                    <input
                      type="text"
                      class="form-control"
                      style="border-right: none;"
                      placeholder="Pesquise nome ou codigo de uma disciplina..."
                      v-model="searchCursosModal"
                    />
                    <div
                      class="input-group-append"
                      @click="clearsearchCursosModal()"
                    >
                      <span
                        class="input-group-text search-text"
                        style="height: 25px; font-size: 18px; cursor: pointer;"
                        >&times;</span
                      >
                    </div>
                  </div>
                </th>
              </div>
            </tr>
            <tr>
              <div class="max-content sticky2">
                <th>
                  <p style="width: 25px;" class="p-header"></p>
                </th>
                <th
                  class="clickable t-center"
                  @click="toggleOrder(ordenacaoCursosModal, 'codigo')"
                >
                  <p style="width: 50px; text-align: start;" class="p-header">
                    Cód.
                    <i
                      :class="setIconByOrder(ordenacaoCursosModal, 'codigo')"
                    ></i>
                  </p>
                </th>
                <th
                  class="clickable"
                  @click="toggleOrder(ordenacaoCursosModal, 'nome')"
                >
                  <p style="width: 385px; text-align: start;" class="p-header">
                    Nome
                    <i
                      :class="setIconByOrder(ordenacaoCursosModal, 'nome')"
                    ></i>
                  </p>
                </th>
              </div>
            </tr>
          </thead>
          <tbody>
            <tr v-for="curso in ModalCursosOrdered" :key="'cursoMd' + curso.id">
              <div class="max-content">
                <td>
                  <div style="width: 25px; height: inherit;" class="px-1">
                    <input
                      type="checkbox"
                      v-model="filtroCursos.selecionados"
                      :value="curso"
                      class="form-check-input position-static m-0"
                    />
                  </div>
                </td>
                <td>
                  <p style="width: 50px; text-align: start;">
                    {{ curso.codigo }}
                  </p>
                </td>
                <td>
                  <p style="width: 385px; text-align: start;">
                    {{ curso.nome }}
                  </p>
                </td>
              </div>
            </tr>
          </tbody>
        </table>

        <table
          v-show="modalTabAtiva === 'Semestre'"
          class="table table-bordered table-sm modal-table"
          style="max-height: 392px !important;"
        >
          <thead class="thead-light sticky">
            <tr>
              <div class="max-content sticky">
                <th>
                  <p style="width: 25px;" class="p-header"></p>
                </th>
                <th>
                  <p class="p-header" style="width: 435px; text-align: start;">
                    Semestre Letivo
                  </p>
                </th>
              </div>
            </tr>
          </thead>
          <tbody>
            <tr>
              <div class="max-content">
                <td>
                  <div style="width: 25px; height: inherit;" class="px-1">
                    <input
                      type="checkbox"
                      class="form-check-input position-static m-0"
                      v-model="filtroSemestres.primeiro"
                    />
                  </div>
                </td>
                <td>
                  <p style="width: 435px; text-align: start;">PRIMEIRO</p>
                </td>
              </div>
            </tr>
            <tr>
              <div style="width: max-content;">
                <td>
                  <div style="width: 25px; height: inherit;" class="px-1">
                    <input
                      type="checkbox"
                      class="form-check-input position-static m-0"
                      v-model="filtroSemestres.segundo"
                    />
                  </div>
                </td>
                <td>
                  <p style="width: 435px; text-align: start;">SEGUNDO</p>
                </td>
              </div>
            </tr>
          </tbody>
        </table>
      </div>

      <div slot="modal-footer" class="w-100 m-0" style="display: flex;">
        <div class="w-100">
          <template v-if="modalTabAtiva === 'Semestre'">
            <b-button
              class="btn-azul btn-custom btn-modal"
              variant="success"
              @click="selectAllSemestre()"
              >Selecionar Todos</b-button
            >
            <b-button
              class="btn-cinza btn-custom btn-modal"
              variant="secondary"
              @click="selectNoneSemestre()"
              >Desmarcar Todos</b-button
            >
          </template>

          <template v-else-if="modalTabAtiva === 'Perfis'">
            <b-button
              class="btn-azul btn-custom btn-modal"
              variant="success"
              @click="selectAllPerfis()"
              >Selecionar Todos</b-button
            >
            <b-button
              class="btn-cinza btn-custom btn-modal"
              variant="secondary"
              @click="selectNonePerfis()"
              >Desmarcar Todos</b-button
            >
          </template>

          <template v-else>
            <b-button
              class="btn-azul btn-custom btn-modal"
              variant="success"
              @click="selectAllCursos()"
              >Selecionar Todos</b-button
            >
            <b-button
              class="btn-cinza btn-custom btn-modal"
              variant="secondary"
              @click="selectNoneCursos()"
              >Desmarcar Todos</b-button
            >
          </template>
        </div>
        <b-button
          variant="success"
          @click="btnOkFiltros()"
          class="btn-verde btn-custom btn-modal px-3"
          >OK</b-button
        >
      </div>
    </b-modal>

    <!-- MODAL TURMA -->
    <b-modal
      id="modalEditTurma"
      ref="modalEditTurma"
      scrollable
      title="Edição de Turma"
      hide-footer
    >
      <ModalEditTurma :turma="turmaSelected" />
    </b-modal>

    <!-- MODAL DELETAR -->
    <b-modal id="modalConfirma" title="Confirmar Seleção" @ok="deleteSelected">
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
import { saveAs } from "file-saver";
import turmaService from "@/common/services/turma";
import pedidoService from "@/common/services/pedido";
import TurmaHeader from "./TurmaHeader.vue";
import NovaTurma from "./NovaTurma.vue";
import TurmaRow from "./TurmaRow.vue";
import NavTab from "@/components/NavTab.vue";
import PageTitle from "@/components/PageTitle.vue";
import ModalEditTurma from "@/components/ModalEditTurma.vue";

export default {
  name: "DashboardPrototipo",
  components: {
    TurmaRow,
    TurmaHeader,
    NovaTurma,
    PageTitle,
    ModalEditTurma,
    NavTab,
  },
  data() {
    return {
      error: undefined,
      turmaSelected: null,
      turmaAddIsVisible: false,
      ordenacaoTurmasMain: { order: "periodo", type: "asc" },
      ordenacaoPerfisMain: { order: "perfilNome", type: "asc" },
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
      modalTabAtiva: "Perfis",
      searchCursosModal: null,
      ordenacaoCursosModal: { order: "codigo", type: "asc" },
      ordenacaoPerfisModal: { order: "nome", type: "asc" },
    };
  },
  created() {
    if (!this.Admin) {
      this.$notify({
        group: "second",
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
    toggleOrder(currentOrder, newOrder, type = "asc") {
      if (currentOrder.order != newOrder) {
        currentOrder.order = newOrder;
        currentOrder.type = type;
      } else {
        currentOrder.type = currentOrder.type == "asc" ? "desc" : "asc";
      }
    },
    setIconByOrder(currentOrder, orderToCheck) {
      if (currentOrder.order === orderToCheck) {
        return currentOrder.type === "asc"
          ? "fas fa-arrow-down fa-sm"
          : "fas fa-arrow-up fa-sm";
      } else {
        return "fas fa-arrow-down fa-sm low-opacity";
      }
    },
    handleClickInEdit(turmaClicked) {
      this.turmaSelected = turmaClicked;
      this.$refs.modalEditTurma.show();
    },
    btnOkFiltros() {
      this.setSemestreAtivo();
      this.filtroPerfis.ativados = [...this.filtroPerfis.selecionados];
      this.filtroCursos.ativados = [...this.filtroCursos.selecionados];
      this.clearsearchCursosModal();
      this.$refs.modalFiltros.hide();
    },
    selectAllPerfis() {
      this.filtroPerfis.selecionados = [...this.Perfis];
    },
    selectNonePerfis() {
      this.filtroPerfis.selecionados = [];
    },
    selectAllCursos() {
      this.filtroCursos.selecionados = [...this.Cursos];
    },
    selectNoneCursos() {
      this.filtroCursos.selecionados = [];
    },
    selectAllSemestre() {
      this.filtroSemestres.primeiro = true;
      this.filtroSemestres.segundo = true;
    },
    selectNoneSemestre() {
      this.filtroSemestres.primeiro = false;
      this.filtroSemestres.segundo = false;
    },
    clearsearchCursosModal() {
      this.searchCursosModal = null;
    },
    setSemestreAtivo() {
      if (this.filtroSemestres.primeiro && !this.filtroSemestres.segundo) {
        this.filtroSemestres.ativo = 1;
      } else if (
        this.filtroSemestres.segundo &&
        !this.filtroSemestres.primeiro
      ) {
        this.filtroSemestres.ativo = 2;
      } else if (
        this.filtroSemestres.primeiro &&
        this.filtroSemestres.primeiro
      ) {
        this.filtroSemestres.ativo = 3;
      } else {
        this.filtroSemestres.ativo = undefined;
      }
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
    toggleAdd() {
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
    TurmasInPerfilOrdered() {
      if (this.ordenacaoPerfisMain.order !== null) {
        return _.orderBy(
          this.TurmasInPerfilFiltred,
          [
            this.ordenacaoPerfisMain.order,
            this.ordenacaoTurmasMain.order,
            "letra",
          ],
          [this.ordenacaoPerfisMain.type, this.ordenacaoTurmasMain.type, "asc"]
        );
      }
      return _.orderBy(
        this.TurmasInPerfilFiltred,
        [this.ordenacaoTurmasMain.order, "periodo", "letra"],
        [this.ordenacaoTurmasMain.type, "asc", "asc"]
      );
    },
    TurmasInPerfilFiltred() {
      return _.filter(this.TurmasInPerfil, (turma) => {
        if (this.filtroSemestres.ativo === 1) return turma.periodo === 1;
        else if (this.filtroSemestres.ativo === 2) return turma.periodo === 3;
        else if (this.filtroSemestres.ativo === 3) return true;
        else return false;
      });
    },
    TurmasInPerfil() {
      let turmasResultantes = [];

      this.filtroPerfis.ativados.forEach((perfil) => {
        turmasResultantes = turmasResultantes.concat(
          this.Turmas.filter((turma) => {
            if (_.isNull(turma.Disciplina)) return false;

            let disciplinaFounded = _.find(
              this.Disciplinas,
              (disciplina) => disciplina.id === turma.Disciplina
            );

            if (disciplinaFounded.Perfil === perfil.id) {
              turma.perfilCor = perfil.cor;
              turma.perfilNome = perfil.nome;
              turma.perfilAbreviacao = perfil.abreviacao;
              turma.disciplinaCodigo = disciplinaFounded.codigo;
              turma.disciplinaNome = disciplinaFounded.nome;
              return true;
            }
            return false;
          })
        );
      });
      return turmasResultantes;
    },
    Cursos() {
      return this.$store.state.curso.Cursos;
    },
    ModalCursosFiltred() {
      if (this.searchCursosModal != null || this.searchCursosModal == "") {
        const searchNormalized = this.normalizeText(this.searchCursosModal);

        return _.filter(this.Cursos, (curso) => {
          const cursoNome = this.normalizeText(curso.nome);
          const cursoCodigo = this.normalizeText(curso.codigo);

          return (
            cursoNome.match(searchNormalized) ||
            cursoCodigo.match(searchNormalized)
          );
        });
      }
      return this.Cursos;
    },
    ModalCursosOrdered() {
      return _.orderBy(
        this.ModalCursosFiltred,
        this.ordenacaoCursosModal.order,
        this.ordenacaoCursosModal.type
      );
    },
    PerfisOrdered() {
      return _.orderBy(
        this.Perfis,
        this.ordenacaoPerfisModal.order,
        this.ordenacaoPerfisModal.type
      );
    },
    Perfis() {
      return this.$store.state.perfil.Perfis;
    },
    Disciplinas() {
      return _.orderBy(this.$store.state.disciplina.Disciplinas, "nome");
    },
    Turmas() {
      return _.orderBy(
        _.orderBy(this.$store.state.turma.Turmas, "letra"),
        "Disciplina"
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
      if (this.$store.state.auth.Usuario.admin === 1) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
.divTable {
  overflow-x: hidden;
  overflow-y: auto;
  height: -webkit-max-content;
  height: -moz-max-content;
  height: max-content;
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
}
.main-table {
  display: block !important;
  overflow-y: scroll !important;
  overflow-x: auto !important;
  font-size: 11px !important;
  font-weight: normal !important;
  background-color: white;
  margin: 0 !important;
  height: -webkit-calc(100vh - 95px);
  height: -moz-calc(100vh - 95px);
  height: calc(100vh - 95px);
}
.main-table tbody {
  max-height: 100%;
  width: 100%;
}
.main-table tr thead {
  display: block;
}
.main-table th {
  padding: 0 !important;
  font-size: 14px;
  text-align: center !important;
  height: 18px !important;
}
.main-table .p-header {
  padding: 0 5px 0 5px !important;
  margin: 0 !important;
  font-size: 11px !important;
  text-align: center;
  height: 18px;
  display: block !important;
  overflow: hidden !important;
  position: sticky !important;
  position: -webkit-sticky !important;

  display: block !important;
  overflow: hidden !important;
  z-index: 30;
}
.stickyAdd {
  overflow: hidden !important;
  position: sticky !important;
  position: -webkit-sticky !important;
  top: 21px !important;
  overflow: hidden !important;
  z-index: 4;
}
/* ==== MODAL TABLE ==== */
.modal-table {
  display: block;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  font-size: 10px !important;
  font-weight: normal !important;
  background-color: white;
  margin: 0 !important;
}
.modal-table tr thead {
  display: block;
}
.modal-table th {
  padding: 0 !important;
  text-align: center !important;
  height: 18px !important;
}

.modal-table .p-header {
  padding: 0px 5px 0px 5px !important;
  margin: 0 !important;
  text-align: start;
  height: 18px !important;
}
.modal-table tbody {
  max-height: 100%;
  width: 100%;
}
.modal-table td {
  border-top: 0;
  text-align: center;
  vertical-align: middle !important;
  padding: 0 !important;
  margin: 0 !important;
  /* height: 22px !important; */
}
.modal-table p {
  margin: 0 !important;
  text-align: center;
  padding: 0 !important;
  padding-right: 5px !important;
  padding-left: 5px !important;
}
.modal-table input[type="checkbox"] {
  margin-left: 0 !important;
  margin-top: 4px !important;
  margin-bottom: auto !important;
  height: 13px !important;
}
.form-control {
  height: 25px !important;
  font-size: 12px !important;
  padding: 2px 5px 2px 5px !important;
  text-align: start;
}
/* FIM MODAL TABLE */
/* search */
.form-inline .input-group {
  width: auto;
}
</style>
