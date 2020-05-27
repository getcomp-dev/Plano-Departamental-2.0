<template>
  <div class="main-component row">
    <PageTitle :title="'Graduação - DCC'">
      <template #aside>
        <b-button
          v-b-modal.modalFiltros
          title="Filtros"
          class="btn-custom btn-icon cancelbtn"
        >
          <i class="fas fa-list-ul"></i>
        </b-button>

        <template v-if="isAdd && Admin">
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

        <template v-else-if="Admin">
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

    <div class="pl-0 divTable" v-if="!isLoading">
      <table class="table main-table table-hover table-sm table-bordered">
        <thead class="thead-light sticky">
          <tr>
            <TurmaHeader
              v-on:toggle-order="toggleOrder(ordenacaoTurmas, $event)"
              :cursosSelecteds="CursosAtivados"
              :currentOrder="ordenacaoTurmas"
            />
          </tr>
          <template v-if="isAdd">
            <tr>
              <NovaTurma :cursosLength="CursosAtivados.length" />
            </tr>
          </template>
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
              v-bind:cursosSelecteds="CursosAtivados"
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
      <div class="p-0 m-0" style="height: 30px; width: 465px;">
        <ul
          class="nav nav-tabs card-header-tabs m-0"
          style="font-size: 11px !important; height: 30px;"
        >
          <li class="nav-item" @click="changeTab('perfis')">
            <a
              class="nav-link border border-right-0"
              :class="[
                {
                  active: nav_ativo == 'perfis',
                },
                'clickable',
              ]"
              >Perfis</a
            >
          </li>
          <li class="nav-item" @click="changeTab('cursos')">
            <a
              class="nav-link clickable border border-right-0"
              :class="{
                active: nav_ativo == 'cursos',
              }"
              >Cursos</a
            >
          </li>
          <li class="nav-item" @click="changeTab('semestre')">
            <a
              class="nav-link clickable border"
              :class="{
                active: nav_ativo == 'semestre',
              }"
              >Semestre</a
            >
          </li>
        </ul>
      </div>
      <div class="col m-0 p-0 max-content" style="height: 450px !important;">
        <!-- TABLE PERFIS -->
        <table
          v-if="nav_ativo === 'perfis'"
          class="table table-sm modal-table table-bordered"
          style="max-height: 450px !important;"
        >
          <thead class="thead-light sticky">
            <tr>
              <div style="font-size: 11px !important;" class="max-content">
                <th>
                  <p style="width: 25px;" class="p-header"></p>
                </th>
                <th>
                  <p
                    class="p-header clickable"
                    @click="toggleOrdPerfis()"
                    style="width: 436px; text-align: start;"
                  >
                    Nome
                    <i
                      style="font-size: 0.6rem; text-align: right;"
                      :class="
                        ordenacaoPerfis.type == 'asc'
                          ? 'fas fa-arrow-down fa-sm'
                          : 'fas fa-arrow-up fa-sm'
                      "
                    ></i>
                  </p>
                </th>
              </div>
            </tr>
          </thead>
          <tbody>
            <tr v-for="perfil in Perfis" :key="'perfil-id' + perfil.id">
              <div class="max-content">
                <td>
                  <div style="width: 25px; height: inherit;" class="px-1">
                    <input
                      type="checkbox"
                      v-model="PerfisSelecionados"
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
        <!-- TABLE CURSOS -->
        <table
          v-else-if="nav_ativo === 'cursos'"
          class="table table-sm modal-table table-bordered"
          style="height: 450px !important;"
        >
          <thead class="thead-light sticky">
            <tr>
              <div
                style="font-size: 11px !important;"
                class="max-content sticky"
              >
                <th>
                  <div class="m-0 input-group input-group-search">
                    <input
                      type="text"
                      class="form-control"
                      style="border-right: none;"
                      placeholder="Pesquise nome ou codigo de uma disciplina..."
                      v-model="searchCursos"
                    />
                    <div
                      class="input-group-append"
                      @click="searchCursos = null"
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

            <!-- <tr>
              <div style="font-size: 11px !important;" class="max-content">
                <th>
                  <div
                    class="m-0 input-group"
                    style="
                      width: 462px;
                      height: 35px;
                      padding-left: 4px;
                      padding-right: 20px;
                      padding-top: 4px;
                    "
                  >
                    <input
                      type="text"
                      class="form-control"
                      style="border-right: none;"
                      placeholder="Pesquise nome ou codigo de um curso..."
                      v-model="searchCursos"
                    />
                    <div
                      class="input-group-append"
                      @click="searchCursos = null"
                    >
                      <span
                        class="input-group-text"
                        style="height: 25px; font-size: 18px; cursor: pointer;"
                        >&times;</span
                      >
                    </div>
                  </div>
                </th>
              </div>
            </tr> -->
            <tr>
              <div style="font-size: 11px !important;" class=" max-content">
                <th>
                  <p style="width: 25px;" class="p-header"></p>
                </th>
                <th
                  class="clickable"
                  style="text-align: center;"
                  @click="toggleOrdCursos('codigo')"
                >
                  <p style="width: 50px; text-align: start;" class="p-header">
                    Cód.
                    <i
                      style="font-size: 0.6rem;"
                      :class="
                        ordenacaoCurso.order == 'codigo'
                          ? ordenacaoCurso.type == 'asc'
                            ? 'fas fa-arrow-down fa-sm'
                            : 'fas fa-arrow-up fa-sm'
                          : 'fas fa-arrow-down fa-sm low-opacity'
                      "
                    ></i>
                  </p>
                </th>
                <th class="clickable" @click="toggleOrdCursos('nome')">
                  <p style="width: 385px; text-align: start;" class="p-header">
                    Nome
                    <i
                      style="font-size: 0.6rem;"
                      :class="
                        ordenacaoCurso.order == 'nome'
                          ? ordenacaoCurso.type == 'asc'
                            ? 'fas fa-arrow-down fa-sm'
                            : 'fas fa-arrow-up fa-sm'
                          : 'fas fa-arrow-down fa-sm low-opacity'
                      "
                    ></i>
                  </p>
                </th>
              </div>
            </tr>
          </thead>
          <tbody>
            <tr v-for="curso in CursosOrdered" :key="'cursoMd' + curso.id">
              <div class="max-content">
                <td>
                  <div style="width: 25px; height: inherit;" class="px-1">
                    <input
                      type="checkbox"
                      v-model="CursosSelecionados"
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

        <!-- TABLE SEMESTRE -->
        <table
          v-else
          class="table table-bordered table-sm modal-table"
          style="max-height: 392px !important;"
        >
          <thead class="thead-light sticky">
            <tr>
              <div style="font-size: 11px !important;" class="max-content">
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
                      v-model="semestre_1Ativo"
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
                      v-model="semestre_2Ativo"
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
          <template v-if="nav_ativo == 'semestre'">
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

          <template v-else-if="nav_ativo == 'perfis'">
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
          @click="btnOK()"
          class="btn-verde btn-custom btn-modal"
          style="padding-right: 15px !important; padding-left: 15px !important;"
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
    <!-- Modals do deletar-->
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
  },
  data() {
    return {
      error: undefined,
      isAdd: false,
      semestre: 1,
      PerfisSelecionados: [],
      CursosSelecionados: [],
      PerfisAtivados: [],
      CursosAtivados: [],
      semestre_1Ativo: true,
      semestre_2Ativo: true,
      semestreAtual: undefined,
      nav_ativo: "perfis",
      searchCursos: null,
      ordenacaoCurso: { order: "codigo", type: "asc" },
      ordenacaoPerfis: { order: "nome", type: "asc" },
      ordenacaoTurmas: { order: "periodo", type: "asc" },
      turmaSelected: undefined,
    };
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
    for (var c = 0; c < this.$store.state.curso.Cursos.length; c++) {
      let id = this.$store.state.curso.Cursos[c].id;
      ls.on(`${id}`, () => {
        this.$store.dispatch("toggleCurso", id);
      });
    }
  },

  beforeDestroy() {
    ls.off("toggle");
    for (var c = 0; c < this.$store.state.curso.Cursos.length; c++) {
      let id = this.$store.state.curso.Cursos[c].id;
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
    handleClickInEdit(turmaClicked) {
      this.turmaSelected = turmaClicked;
      this.$refs.modalEditTurma.show();
    },
    changeTab(tab) {
      this.nav_ativo = tab;
    },
    btnOK() {
      this.btnOKPerfis();
      this.btnOKSemestre();
      this.btnOKCursos();
      this.$refs.modalFiltros.hide();
      this.searchCursos = null;
    },
    btnOKSemestre() {
      if (this.semestre_1Ativo && !this.semestre_2Ativo) {
        this.semestreAtual = 1;
      } else if (this.semestre_2Ativo && !this.semestre_1Ativo) {
        this.semestreAtual = 2;
      } else if (this.semestre_1Ativo && this.semestre_1Ativo) {
        this.semestreAtual = 3;
      } else {
        this.semestreAtual = undefined;
      }
    },
    btnOKPerfis() {
      //Somente atualiza o vetor de perfis ativados quando o botão OK for clickado
      this.PerfisAtivados = [...this.PerfisSelecionados];
    },
    btnOKCursos() {
      this.CursosAtivados = [...this.CursosSelecionados];
    },
    // Ordem Perfis
    toggleOrdPerfis() {
      if (this.ordenacaoPerfis.type == "asc") {
        this.ordenacaoPerfis.type = "desc";
      } else {
        this.ordenacaoPerfis.type = "asc";
      }
    },
    // Ordem Cursos
    toggleOrdCursos(ord) {
      if (this.ordenacaoCurso.order != ord) {
        this.ordenacaoCurso.order = ord;
        this.ordenacaoCurso.type = "asc";
      } else {
        this.ordenacaoCurso.type =
          this.ordenacaoCurso.type == "asc" ? "desc" : "asc";
      }
    },
    //Select Perfis
    selectAllPerfis() {
      if (this.PerfisSelecionados != []) this.PerfisSelecionados = [];
      for (var i = 0; i < this.$store.state.perfil.Perfis.length; i++)
        this.PerfisSelecionados.push(this.$store.state.perfil.Perfis[i]);
    },
    selectNonePerfis() {
      this.PerfisSelecionados = [];
    },

    //Select Cursos
    selectAllCursos() {
      if (this.CursosSelecionados != []) this.CursosSelecionados = [];
      for (var i = 0; i < this.$store.state.curso.Cursos.length; i++)
        this.CursosSelecionados.push(this.$store.state.curso.Cursos[i]);
    },
    selectNoneCursos() {
      this.CursosSelecionados = [];
    },

    //Select Semestre
    selectAllSemestre() {
      this.semestre_1Ativo = true;
      this.semestre_2Ativo = true;
    },
    selectNoneSemestre() {
      this.semestre_1Ativo = false;
      this.semestre_2Ativo = false;
    },

    xlsx(pedidos) {
      xlsx
        .downloadTable({
          pedidos: pedidos,
        })
        .then(() => {
          console.log("done");
          fetch("http://200.131.219.57:3000/api/xlsx/download", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.$store.state.auth.token}`,
            },
          })
            .then((r) => r.blob())
            .then((blob) => saveAs(blob, "tabela.xlsx"));
        })
        .catch((error) => console.log(error));
    },

    deleteSelected() {
      let turmas = this.$store.state.turma.Deletar;
      for (let i = 0; i < turmas.length; i++) {
        this.deleteTurma(_.clone(turmas[i]));
        //Necessario _.clone para não passar um objeto reativo como parametro onde será editado
      }
      this.$store.commit("emptyDelete");
    },

    inPerfil(perfil, turmas, disciplinas) {
      return turmas.filter((turma) => {
        if (_.isNull(turma.Disciplina)) return false;

        var disciplina = _.find(
          disciplinas,
          (disc) => disc.id === turma.Disciplina
        );

        return disciplina.Perfil === perfil.id;
      });
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
      this.isAdd = !this.isAdd;
    },
  },

  computed: {
    TurmasInPerfilOrdered() {
      return _.orderBy(
        this.TurmasInPerfilFiltred,
        [this.ordenacaoTurmas.order, "letra"],
        [this.ordenacaoTurmas.type, "asc"]
      );
    },
    TurmasInPerfilFiltred() {
      return _.filter(this.TurmasInPerfil, (turma) => {
        if (this.semestreAtual === 1) return turma.periodo === 1;
        else if (this.semestreAtual === 2) return turma.periodo === 3;
        else if (this.semestreAtual === 3) return true;
        else return false;
      });
    },
    TurmasInPerfil() {
      let turmasResult = [];

      this.PerfisAtivados.forEach((perfil) => {
        turmasResult = turmasResult.concat(
          this.Turmas.filter((turma) => {
            if (_.isNull(turma.Disciplina)) return false;

            let disciplinaFounded = _.find(
              this.Disciplinas,
              (disciplina) => disciplina.id === turma.Disciplina
            );
            if (disciplinaFounded.Perfil === perfil.id) {
              turma.perfilCor = perfil.cor;
              turma.disciplinaCodigo = disciplinaFounded.codigo;
              turma.disciplinaNome = disciplinaFounded.nome;
              return true;
            }
            return false;
          })
        );
      });
      return turmasResult;
    },
    CursosFiltred() {
      if (this.searchCursos != null) {
        let searchUpperCase = this.searchCursos
          .toUpperCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        return _.filter(this.$store.state.curso.Cursos, (curso) => {
          return (
            curso.nome
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .match(searchUpperCase) || curso.codigo.match(searchUpperCase)
          );
        });
      }
      return this.$store.state.curso.Cursos;
    },
    //Cursos Ordenados
    CursosOrdered() {
      return _.orderBy(
        this.CursosFiltred,
        this.ordenacaoCurso.order,
        this.ordenacaoCurso.type
      );
    },
    Disciplinas() {
      return _.orderBy(this.$store.state.disciplina.Disciplinas, "nome");
    },

    Perfis() {
      return _.orderBy(
        this.$store.state.perfil.Perfis,
        this.ordenacaoPerfis.order,
        this.ordenacaoPerfis.type
      );
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
  display: block !important;
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
