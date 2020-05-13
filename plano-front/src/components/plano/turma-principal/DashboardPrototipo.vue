<template>
  <div class="DashboardPrototipo row pr-2">
    <PageTitle title="Tabela Interna">
      <template #aside>
        <b-button v-b-modal.modalFiltros title="Filtros" class="cancelbtn">
          <i class="fas fa-list-ul"></i>
        </b-button>

        <template v-if="isAdd">
          <b-button title="Salvar" class="addbtn" v-on:click.prevent="addTurma">
            <i class="fas fa-check"></i>
          </b-button>
          <b-button
            title="Cancelar"
            class="cancelbtn"
            v-on:click.prevent="toggleAdd"
          >
            <i class="fas fa-times"></i>
          </b-button>
        </template>

        <template v-else>
          <b-button
            title="Adicionar"
            class="addbtn"
            v-on:click.prevent="toggleAdd"
          >
            <i class="fas fa-plus"></i>
          </b-button>
          <b-button title="Deletar" class="delbtn" v-b-modal.modalConfirma>
            <i class="far fa-trash-alt"></i>
          </b-button>
        </template>
        <b-button
          title="XLSX"
          class="relatbtn"
          v-on:click.prevent="xlsx(Pedidos)"
        >
          <i class="far fa-file-alt"></i>
        </b-button>
        <b-button v-b-modal.modalAjuda title="Ajuda" class="relatbtn">
          <i class="fas fa-question"></i>
        </b-button>
      </template>
    </PageTitle>

    <div id="loading" v-if="isLoading">
      <div class="cube1"></div>
      <div class="cube2"></div>
    </div>

    <div class="pl-0 divTable" v-if="!isLoading" ref="mainTable">
      <table class="table main-table table-hover table-sm table-bordered">
        <thead class="thead-light">
          <tr class="sticky">
            <turmaheader :cursos="CursosAtivados"></turmaheader>
          </tr>
        </thead>
        <tbody>
          <template v-if="isAdd">
            <tr class="stickyAdd" style="background-color:#e9e9e9;">
              <novaturma :cursos_length="CursosAtivados.length"></novaturma>
            </tr>
          </template>

          <template v-if="Turmas.length > 0">
            <!-- PRIMEIRO SEMESTRE -->
            <template v-for="perfil in PerfisAtivados">
              <tr
                v-for="turma in inPerfil(perfil, Turmas, Disciplinas)"
                :key="'turma id' + turma.id"
                v-bind:style="{ backgroundColor: perfil.cor }"
              >
                <template
                  v-if="
                    turma.periodo == 1 &&
                      (semestreAtual == 1 || semestreAtual == 3)
                  "
                >
                  <turmadata
                    ref="turma"
                    v-bind:turma="turma"
                    v-bind:perfil="perfil"
                    v-bind:cursos="CursosAtivados"
                  ></turmadata>
                </template>

                <template
                  v-else-if="
                    turma.periodo == 3 &&
                      (semestreAtual == 2 || semestreAtual == 3)
                  "
                >
                  <template></template>
                </template>
              </tr>
            </template>
            <!-- SEGUNDO SEMESTRE -->
            <template v-for="perfil in PerfisAtivados">
              <tr
                v-for="turma in inPerfil(perfil, Turmas, Disciplinas)"
                :key="'2-turma id ' + turma.id"
                v-bind:style="{ backgroundColor: perfil.cor }"
              >
                <template
                  v-if="
                    turma.periodo == 3 &&
                      (semestreAtual == 2 || semestreAtual == 3)
                  "
                >
                  <turmadata
                    ref="turma"
                    v-bind:turma="turma"
                    v-bind:perfil="perfil"
                    v-bind:cursos="CursosAtivados"
                  ></turmadata>
                </template>
              </tr>
            </template>
          </template>
        </tbody>
      </table>
    </div>

    <!-- ============ Modals ============== -->
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
          v-if="nav_ativo == 'perfis'"
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
          v-else-if="nav_ativo == 'cursos'"
          class="table table-sm modal-table table-bordered"
          style="height: 450px !important;"
        >
          <thead class="thead-light sticky">
            <tr>
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
            </tr>
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
              class="btn-azul btn-df mr-2"
              variant="success"
              @click="selectAllSemestre()"
              >Selecionar Todos</b-button
            >
            <b-button
              class="btn-cinza btn-df mr-2"
              variant="secondary"
              @click="selectNoneSemestre()"
              >Desmarcar Todos</b-button
            >
          </template>

          <template v-else-if="nav_ativo == 'perfis'">
            <b-button
              class="btn-azul btn-df mr-2"
              variant="success"
              @click="selectAllPerfis()"
              >Selecionar Todos</b-button
            >
            <b-button
              class="btn-cinza btn-df mr-2"
              variant="secondary"
              @click="selectNonePerfis()"
              >Desmarcar Todos</b-button
            >
          </template>

          <template v-else>
            <b-button
              class="btn-azul btn-df mr-2"
              variant="success"
              @click="selectAllCursos()"
              >Selecionar Todos</b-button
            >
            <b-button
              class="btn-cinza btn-df mr-2"
              variant="secondary"
              @click="selectNoneCursos()"
              >Desmarcar Todos</b-button
            >
          </template>
        </div>
        <b-button
          variant="success"
          @click="btnOK()"
          class="btn-verde btn-df mr-2"
          style="padding-right: 15px !important; padding-left: 15px !important;"
          >OK</b-button
        >
      </div>
    </b-modal>

    <!-- MODAL FILTROS -->
    <b-modal
      id="modalValidacao"
      ref="modalValidacao"
      scrollable
      size="lg"
      title="Validações"
    >
      <!-- <div class="col m-0 p-0 max-content" style="height: 450px !important;">
        <table
          class="table table-sm modal-table table-bordered"
          style="height: 450px !important;"
        >
          <thead class="thead-light sticky">
            <tr>
              <div style="font-size: 11px !important;" class=" max-content">
                <th>
                  <p
                    style="width: 35px; text-align: center;"
                    class="p-header clickable"
                    @click="toggleOrdValidacoes('periodo')"
                  >
                    S.
                    <i
                      style="font-size: 0.6rem; text-align: right;"
                      :class="
                        ordemValidacao.order == 'periodo'
                          ? ordemValidacao.type == 'asc'
                            ? 'fas fa-arrow-down fa-sm'
                            : 'fas fa-arrow-up fa-sm'
                          : 'fas fa-arrow-down fa-sm low-opacity'
                      "
                    ></i>
                  </p>
                </th>
                <th>
                  <p
                    style="width: 70px; text-align: start;"
                    class="p-header clickable"
                    @click="toggleOrdValidacoes('perfil')"
                  >
                    Perfil
                    <i
                      style="font-size: 0.6rem; text-align: right;"
                      :class="
                        ordemValidacao.order == 'perfil'
                          ? ordemValidacao.type == 'asc'
                            ? 'fas fa-arrow-down fa-sm'
                            : 'fas fa-arrow-up fa-sm'
                          : 'fas fa-arrow-down fa-sm low-opacity'
                      "
                    ></i>
                  </p>
                </th>
                <th>
                  <p
                    style="width: 70px; text-align: start;"
                    class="p-header clickable"
                    @click="toggleOrdValidacoes('disciplina_codigo')"
                  >
                    Cód.
                    <i
                      style="font-size: 0.6rem; text-align: right;"
                      :class="
                        ordemValidacao.order == 'disciplina_codigo'
                          ? ordemValidacao.type == 'asc'
                            ? 'fas fa-arrow-down fa-sm'
                            : 'fas fa-arrow-up fa-sm'
                          : 'fas fa-arrow-down fa-sm low-opacity'
                      "
                    ></i>
                  </p>
                </th>
                <th>
                  <p
                    style="width: 240px; text-align: start;"
                    class="p-header clickable"
                    @click="toggleOrdValidacoes('disciplina_nome')"
                  >
                    Disciplina
                    <i
                      style="font-size: 0.6rem; text-align: right;"
                      :class="
                        ordemValidacao.order == 'disciplina_nome'
                          ? ordemValidacao.type == 'asc'
                            ? 'fas fa-arrow-down fa-sm'
                            : 'fas fa-arrow-up fa-sm'
                          : 'fas fa-arrow-down fa-sm low-opacity'
                      "
                    ></i>
                  </p>
                </th>
                <th>
                  <p style="width: 35px; text-align: start;" class="p-header">
                    Letra
                  </p>
                </th>

                <th>
                  <p style="width: 290px; text-align: start;" class="p-header">
                    Conflito
                  </p>
                </th>
              </div>
            </tr>
          </thead>
          <tbody style="text-transform: uppercase">
            <template v-for="(turma, index) in Turmas_validacoes_filtred">
              <tr
                :key="
                  index + '-' + turma.id + turma.Disciplina + 'modal-validacoes'
                "
                style="background-color:rgba(0, 0, 0, 0.089);"
              >
                <div class="max-content">
                  <td>
                    <p style="width: 35px; text-align: center;">
                      {{ turma.periodo }}
                    </p>
                  </td>
                  <td>
                    <p style="width: 70px; text-align: start;">
                      {{ turma.perfil }}
                    </p>
                  </td>
                  <td>
                    <p style="width: 70px; text-align: start;">
                      {{ turma.disciplina_codigo }}
                    </p>
                  </td>
                  <td>
                    <p style="width: 240px; text-align: start;">
                      {{ turma.disciplina_nome }}
                    </p>
                  </td>
                  <td>
                    <p style="width: 35px; text-align: center;">
                      {{ turma.letra }}
                    </p>
                  </td>

                  <td>
                    <p style="width: 290px; text-align: start;">
                      {{ turma.mensagem }}
                    </p>
                  </td>
                </div>
              </tr>
              <tr
                v-for="erro in turma.erros"
                :key="turma.id + turma.disciplina_codigo + erro.mensagem"
              >
                <div class="max-content">
                  <td>
                    <p style="width: 35px; text-align: center;"></p>
                  </td>
                  <td>
                    <p style="width: 70px; text-align: start;"></p>
                  </td>
                  <td>
                    <p style="width: 70px; text-align: center;"></p>
                  </td>
                  <td>
                    <p style="width: 240px; text-align: start;"></p>
                  </td>
                  <td>
                    <p style="width: 35px; text-align: center;"></p>
                  </td>

                  <td>
                    <p style="width: 290px; text-align: start;">
                      {{ erro.mensagem }}
                    </p>
                  </td>
                </div>
              </tr>
            </template>
          </tbody>
        </table>
      </div> -->

      <div slot="modal-footer" class="w-100 m-0" style="display: flex;"></div>
    </b-modal>

    <!-- Modal de Ajuda -->
    <b-modal id="modalAjuda" ref="ajudaModal" scrollable title="Ajuda">
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
              class="far fa-file-alt relatbtn px-1"
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

      <div
        slot="modal-footer"
        style="display: none; margin-right: 10px !important;"
      ></div>
    </b-modal>
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
import turmaheader from "./TurmaHeader.vue";
import turmadata from "./TurmaRow.vue";
import PageTitle from "@/components/PageTitle.vue";
import novaturma from "./NovaTurma.vue";

const emptyTurma = {
  id: undefined,
  periodo: undefined,
  letra: undefined,
  turno1: undefined,
  turno2: undefined,
  Disciplina: undefined,
  Docente1: undefined,
  Docente2: undefined,
  Horario1: undefined,
  Horario2: undefined,
  Sala1: undefined,
  Sala2: undefined,
};

export default {
  name: "DashboardPrototipo",
  components: {
    turmadata,
    turmaheader,
    novaturma,
    PageTitle,
  },
  data() {
    return {
      turmaForm: _.clone(emptyTurma),
      error: undefined,
      isAdd: false,
      atual: undefined,
      semestre: 1,
      PerfisSelecionados: [],
      CursosSelecionados: [],
      PerfisAtivados: [],
      CursosAtivados: [],
      semestre_1Ativo: true,
      semestre_2Ativo: true,
      semestreAtual: 3,
      nav_ativo: "perfis",
      searchCursos: null,
      ordenacaoCurso: { order: "codigo", type: "asc" },
      ordenacaoPerfis: { order: "nome", type: "asc" },
      ordemValidacao: { order: "periodo", type: "asc" },
    };
  },

  mounted: function() {
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

  beforeDestroy: function() {
    ls.off("toggle");
    for (var c = 0; c < this.$store.state.curso.Cursos.length; c++) {
      let id = this.$store.state.curso.Cursos[c].id;
      ls.off(`${id}`);
    }
  },

  methods: {
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
    // Ordem Validacoes
    toggleOrdValidacoes(ord) {
      if (this.ordemValidacao.order != ord) {
        this.ordemValidacao.order = ord;
        this.ordemValidacao.type = "asc";
      } else {
        this.ordemValidacao.type =
          this.ordemValidacao.type == "asc" ? "desc" : "asc";
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

    xlsx: function(pedidos) {
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

    adjustTurno1: function() {
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

    adjustTurno2: function() {
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

    deleteSelected: function() {
      var turmas = this.$store.state.turma.Deletar;
      for (var i = 0; i < turmas.length; i++) {
        this.deleteTurma(turmas[i]);
      }
      this.$store.commit("emptyDelete");
    },

    inPerfil: function(perfil, turmas, disciplinas) {
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
      console.log(turma);

      this.editTurma(turma);

      var pedidos = this.$store.state.pedido.Pedidos[turma.id];
      for (var i = 0; i < pedidos.length; i++) {
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
                type: "success",
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
    checkIsLab(turma_sala) {
      let cond = _.find(
        this.Salas,
        (sala) => turma_sala == sala.id && sala.laboratorio
      );
      if (cond != undefined) return true;
      else return false;
    },
    checkVagasSalas(turma_sala, pedidosTotais) {
      let sala_encontrada = _.find(this.Salas, (sala) => turma_sala == sala.id);

      if (
        sala_encontrada != undefined &&
        sala_encontrada.lotacao_maxima != 0 &&
        pedidosTotais != undefined
      ) {
        if (sala_encontrada.lotacao_maxima < pedidosTotais) {
          return {
            lotacao: sala_encontrada.lotacao_maxima,
            vagastotais: pedidosTotais,
          };
        }
      }
      return null;
    },
    totalPedidos(turma_id) {
      let result = 0;
      let pedidos = this.$store.state.pedido.Pedidos[turma_id];
      for (let p = 0; p < pedidos.length; p++) {
        result += parseInt(pedidos[p].vagasPeriodizadas, 10);
        result += parseInt(pedidos[p].vagasNaoPeriodizadas, 10);
      }
      return result;
    },
  },

  computed: {
    //Todos Cursos
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
    //Turmas validacoes ordenadas
    Turmas_validacoes_filtred() {
      return _.orderBy(
        this.Turmas_validacoes,
        this.ordemValidacao.order,
        this.ordemValidacao.type
      );
    },
    //Verifica validações das turmas
    Turmas_validacoes() {
      let result = [];
      this.Turmas.forEach((turma) => {
        //Encontra a disciplina da turma
        let disciplina_encontrada = _.find(
          this.Disciplinas,
          (disciplina) => disciplina.id == turma.Disciplina
        );

        if (disciplina_encontrada && turma.periodo == 1) {
          let obj = {
            id: turma.id,
            disciplina_nome: disciplina_encontrada.nome,
            disciplina_codigo: disciplina_encontrada.codigo,
            periodo: turma.periodo,
            letra: turma.letra,
            erros: [],
          };
          //Encontra o nome do perfil pelo ID
          _.find(this.Perfis, (perfil) => {
            if (perfil.id == disciplina_encontrada.Perfil) {
              obj.perfil = perfil.abreviacao;
              return true;
            }
          });
          let turmaPedidosTotais = this.totalPedidos(obj.id);

          //Verifica letra
          if (!turma.letra.match(/[A-Z]/i)) {
            obj.erros.push({ mensagem: "Letra da turma invalida" });
          }
          //Verifica turno
          if (turma.turno1 == null) {
            obj.erros.push({ mensagem: "Turno Invalido" });
          }
          //Compatibilidade do turno com disciplina
          if (!disciplina_encontrada.ead && turma.turno1 == "EAD") {
            obj.erros.push({
              mensagem:
                "Disciplina não cadastrada como EAD, porem o turno esta alocado como tal",
            });
          }
          //Verifica Horarios
          if (!disciplina_encontrada.ead || !turma.turno1 == "EAD") {
            if (turma.Horario1 == null) {
              obj.erros.push({ mensagem: "Primeiro Horario invalido" });
            }
            if (turma.cargaTeorica > 2 && turma.Horario2 == null) {
              obj.erros.push({ mensagem: "Segundo Horario invalido" });
            }
          }
          //Verifica Docente
          if (turma.Docente1 == null && turma.Docente2 == null) {
            obj.erros.push({ mensagem: "Docente invalido" });
          }
          //Verifica alocação de Lab e salas
          if (turma.Sala1 != null || turma.Sala2 != null) {
            //Verifica se possui lab alocado
            if (
              disciplina_encontrada.laboratorio > 0 &&
              !(this.checkIsLab(turma.Sala1) || this.checkIsLab(turma.Sala2))
            ) {
              obj.erros.push({
                mensagem:
                  "Disciplina marcada como laboratorio porem não possui laboratorio alocado",
              });
            }
            let vagasInSala1 =
              turma.Sala1 != null
                ? this.checkVagasSalas(turma.Sala1, turmaPedidosTotais)
                : null;
            let vagasInSala2 =
              turma.Sala2 != null
                ? this.checkVagasSalas(turma.Sala1, turmaPedidosTotais)
                : null;
            //Se excedeu o limite da sala 1
            if (vagasInSala1 != null) {
              obj.erros.push({
                mensagem:
                  "Limite de sala excedido: Sala 1 possui limite de " +
                  vagasInSala1.lotacao +
                  " e um total de " +
                  vagasInSala1.vagastotais +
                  " vagas alocadas!",
              });
            }
            //Se excedeu o limite da sala 2
            if (vagasInSala2 != null) {
              obj.erros.push({
                mensagem:
                  "Limite de sala excedido: Sala 2 possui limite de " +
                  vagasInSala1.lotacao +
                  " e um total de " +
                  vagasInSala1.vagastotais +
                  " vagas alocadas!",
              });
            }
          }

          if (turmaPedidosTotais == 0) {
            obj.erros.push({
              mensagem: "Turma não possui nenhuma vaga alocada",
            });
          } else if (turmaPedidosTotais <= 4) {
            obj.erros.push({
              mensagem: "Turma possui apenas 4 vagas alocadas",
            });
          }

          if (obj.erros.length) {
            result.push(obj);
          }
        }
      });

      return result;
    },
    Disciplinas() {
      return _.orderBy(this.$store.state.disciplina.Disciplinas, "nome");
    },

    Docentes() {
      return _.orderBy(
        _.filter(this.$store.state.docente.Docentes, ["ativo", true]),
        "apelido"
      );
    },

    Horarios() {
      return _.orderBy(this.$store.state.horario.Horarios, "horario");
    },

    Salas() {
      return _.orderBy(this.$store.state.sala.Salas, "nome");
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
    //Juntando o vetor com turmas num unico vetor
    //   turmasFiltradas() {
    //     let result_1 = [];
    //     this.PerfisAtivados.forEach(perfil => {
    //       this.inPerfil(perfil, this.Turmas, this.Disciplinas).forEach(turma => {
    //         let obj = {
    //           perfil: perfil,
    //           turma: turma,
    //           periodo_ord: parseInt(turma.periodo)
    //         };
    //         result_1.push(obj);
    //       });
    //     });
    //     return _.orderBy(result_1, "periodo_ord");
    //   }
  },
};
</script>

<style scoped>
/* prefixed by https://autoprefixer.github.io (PostCSS: v7.0.23, autoprefixer: v9.7.3) */

.DashboardPrototipo {
  max-width: 100%;
  overflow: hidden;
  margin: 0;
}
.titulo {
  font-size: 25px;
  font-weight: normal;
  padding-left: 0;
  margin: 0 !important;
}
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
}

.listas {
  line-height: 30px;
  font-size: 12px;
  text-align: justify;
  line-height: inherit;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.15);
}
strong {
  color: #007bff;
}

/* .modal-footer {
  display: flex !important;
  justify-content: start !important;
} */

/* Botoes */
button {
  padding: 0;
  border: none;
  background: none;
  height: -webkit-max-content;
  height: -moz-max-content;
  height: max-content;
  width: 32px !important;
  margin-left: 4px;
  margin-right: 4px;
  margin-top: 0px;
  line-height: 50%;
  margin-bottom: 0px;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  text-align: center !important;
}
i.fas,
i.far {
  font-size: 25px;
}
.addbtn {
  background-color: white !important;
  color: #a0e7a0;
}

.addbtn:hover {
  background-color: white;
  color: #77dd77;
}

.addbtn:focus {
  color: #77dd77;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #2fbf53;
}

.cancelbtn {
  background-color: white !important;
  color: #cfcfc4;
}

.cancelbtn:hover {
  background-color: white;
  color: #b8b4a8;
}

.cancelbtn:focus {
  background-color: white;
  color: #b8b8a8;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #ada89a;
}

.delbtn {
  background-color: white !important;
  color: #ff817b;
}

.delbtn:hover {
  color: #ff5f48;
}

.delbtn:focus {
  color: #ff5f48;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #ff4e34;
}

.relatbtn {
  background-color: white !important;
  color: #9ab3ff !important;
}

.relatbtn:hover {
  color: #82a0ff !important;
  background-color: white;
}

.relatbtn:focus {
  color: #82a0ff;
  background-color: white;
  -webkit-text-stroke-width: 0.5px;
  -webkit-text-stroke-color: #698dff;
}

.btn-df {
  font-size: 12px;
  height: 25px;
  min-width: -webkit-max-content;
  min-width: -moz-max-content;
  min-width: max-content;
  max-width: -webkit-max-content;
  max-width: -moz-max-content;
  max-width: max-content;
  padding: 0 5px 0 5px;
}

.btn-azul {
  background-color: #718de0 !important;
  border-color: #9ab3ff !important;
}

.btn-azul:hover {
  background-color: rgb(74, 101, 190) !important;
  border-color: #82a0ff !important;
}

.btn-azul:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(122, 128, 124, 0.5) !important;
  -moz-box-shadow: 0 0 0 0.2rem rgba(108, 166, 127, 0.5) !important;
  box-shadow: 0 0 0 0.2rem rgba(108, 166, 127, 0.5) !important;
}

.btn-cinza {
  background-color: #999999 !important;
  border-color: #c3c3c3 !important;
}

.btn-cinza:hover {
  background-color: #747474 !important;
  border-color: #aaaaaa !important;
}

.btn-cinza:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(116, 124, 119, 0.74) !important;
  -moz-box-shadow: 0 0 0 0.2rem rgba(116, 124, 119, 0.74) !important;
  box-shadow: 0 0 0 0.2rem rgba(116, 124, 119, 0.74) !important;
}

.btn-verde {
  background-color: #70b670 !important;
  border-color: #a0e7a0 !important;
}

.btn-verde:hover {
  background-color: #4c8a4c !important;
  border-color: #77dd77 !important;
}

.btn-verde:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(108, 166, 127, 0.5) !important;
  -moz-box-shadow: 0 0 0 0.2rem rgba(108, 166, 127, 0.5) !important;
  box-shadow: 0 0 0 0.2rem rgba(108, 166, 127, 0.5) !important;
}
.form-inline {
  width: auto;
}
.form-group {
  display: -ms-flexbox;
  display: flex;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 0;
}
.sticky {
  display: block !important;
  overflow: hidden !important;
  position: sticky !important;
  position: -webkit-sticky !important;
  top: 0 !important;
  display: block !important;
  overflow: hidden !important;
  z-index: 3;
}
.stickyAdd {
  display: block !important;
  overflow: hidden !important;
  position: sticky !important;
  position: -webkit-sticky !important;
  top: 21px !important;
  display: block !important;
  overflow: hidden !important;
  z-index: 3;
}
/* .sticky-bottom {
  display: block !important;
  overflow: hidden !important;
  position: sticky !important;
  position: -webkit-sticky !important;
  top: 38px !important;
  display: block !important;
  overflow: hidden !important;
  z-index: 3;
} */
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
  width: 100% !important;
}
/* FIM MODAL TABLE */
/* search */
.input-group-text:hover {
  color: rgb(102, 102, 102);
  background-color: #dddddd;
}
.input-group-text {
  background-color: #ffffff;
  border-left: none;
}

.nav-link {
  color: #007bff !important;
  cursor: pointer;
}
.nav-link:hover {
  text-decoration: underline;
}
.active {
  background-color: #e9ecef !important;
  color: #495057 !important;
  cursor: default;
  text-decoration: none !important;
}
.modal-title {
  text-align: center !important;
  width: 100%;
}
.max-content {
  width: -webkit-max-content !important;
  width: -moz-max-content !important;
  width: max-content !important;
}
.clickable {
  cursor: pointer;
}
@media screen and (max-width: 536px) {
  .div-titulo {
    height: 70px !important;
  }
}
</style>
