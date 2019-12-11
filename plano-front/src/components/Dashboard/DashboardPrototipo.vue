<template>
  <div class="DashboardPrototipo row pr-2">
    <!-- Titulo -->
    <div class="col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0">
      <div class="form-inline col-12 pl-0 mb-2 pr-1">
        <h1 class="titulo col-md-2 col-sm-2 col-xl-2 col-3">Tabela</h1>

        <div
          class="form-group col-9 col-sm-10 col-md-10 col-xl-10 mb-0 pr-0"
          style="justify-content: flex-end;"
        >
          <div class="input-group mr-0 ml-auto mb-0 mt-0">
            <select class="form-control form-control-sm mt-1" v-model="periodos">
              <option value="1">Primeiro</option>
              <option value="2">Segundo</option>
              <option value="3">Ambos</option>
            </select>
            <div class="input-group-append mt-1 mr-2">
              <div class="input-group-append">
                <label class="input-group-text">Semestre</label>
              </div>
            </div>

            <b-button v-b-modal.modalPerfis title="Perfis" class="cancelbtn"><i class="fas fa-list-ul"></i></b-button>
            <b-button v-b-modal.modalCursos title="Cursos" class="cancelbtn"><i class="fas fa-filter"></i></b-button>

            <template v-if="isAdd">
              <div style="display: flex">
                <button
                  type="button"
                  title="Salvar"
                  class="addbtn"
                  style="max-width:80px;"
                  v-on:click.prevent="addTurma"
                >
                  <i class="fas fa-check"></i>
                </button>
                <button
                  type="button"
                  title="Cancelar"
                  class="cancelbtn"
                  style="max-width:80px;"
                  v-on:click.prevent="toggleAdd"
                >
                  <i class="fas fa-times"></i>
                </button>
              
              </div>
            </template>

            <template v-else>
              <div style="display: flex">
                <button
                  type="button"
                  title="Adicionar"
                  class="addbtn"
                  style="max-width:80px;"
                  v-on:click.prevent="toggleAdd"
                >
                  <i class="fas fa-plus"></i>
                </button>
                <button
                  type="button"
                  title="Deletar"
                  class="delbtn"
                  style="max-width:80px;"
                  v-b-modal.modalConfirma
                >
                  <i class="far fa-trash-alt"></i>
                </button>
                <button
                  type="button"
                  title="XLSX"
                  class="relatbtn"
                  style="max-width: 65px;"
                  v-on:click.prevent="xlsx(Pedidos)"
                >
                  <i class="far fa-file-alt"></i>
                </button>
              </div>
              <!-- Modals do deletar-->
              <b-modal id="modalConfirma" title="Confirmar Seleção" @ok="deleteSelected">
                <p class="my-4">Tem certeza que deseja deletar as turmas selecionadas?</p>
                <template v-if="Deletar.length > 0">
                  <template v-for="turma in Deletar">
                    <template v-for="disciplina in Disciplinas">
                      <template v-if="disciplina.id===turma.Disciplina">
                        <p :key="'disciplina'+disciplina.id+'turma'+turma.id" style="width:80px">
                          Disciplina:{{disciplina.codigo}}
                          <br />
                          Turma:{{turma.letra}}
                        </p>
                      </template>
                    </template>
                  </template>
                </template>
              </b-modal>
            </template>

            <!-- Modals do botão perfis slot="modal-footer" -->
            <b-modal id="modalPerfis" ref="PerfisModal" scrollable title="Selecione os perfis">
              <b-form-group style="margin-top:-10px; font-size:14px;">
                <b-form-checkbox-group
                  id="checkboxGroupPerfis"
                  v-model="PerfisSelecionados"
                >
                  <b-form-checkbox
                    v-for="perfil in Perfis"
                    :key="'perfil'+perfil.id"
                    :value="perfil"
                  >{{perfil.nome}}</b-form-checkbox>
                </b-form-checkbox-group>
              </b-form-group>

              <div slot="modal-footer">
                <b-button
                  class="btn-azul mr-2"
                  variant="success"
                  @click="selectAll()"
                >Selecionar Todos</b-button>
                <b-button
                  class="btn-cinza mr-2"
                  variant="secondary"
                  @click="selectNone()"
                >Desmarcar Todos</b-button>

                <b-button
                  variant="success"
                  @click="btnOK()"
                  class="btn-verde mr-2"
                  style="padding-right:15px!important; padding-left:15px!important"
                >OK</b-button>
              </div>
            </b-modal>

            <!-- Modals do botão cursos slot="modal-footer" -->
            <b-modal id="modalCursos" style="max-height:80vh;" ref="CursosModal" scrollable title="Selecione os Cursos">
              <b-form-group class style="margin-top:-10px; font-size:14px;">
                  <table style="max-height:50%; overflow:auto">
                    <tr>
                      <th></th>
                      <th style="text-align:center" @click="ToggleCodigoOrdering()">Código<i v-if="ordenacaoCurso=='codigo'" style="font-size:0.6rem" class="fas fa-arrow-down fa-sm"></i></b-button></th>
                      <th style="text-align:center" @click="ToggleNomeOrdering()">Nome<i v-if="ordenacaoCurso=='nome'" style="font-size:0.6rem" class="fas fa-arrow-down fa-sm"></i></b-button></th>
                    </tr>
                    <tr v-for="curso in Cursos" :key="'cursoMd'+curso.id">
                      <td style="padding:0;broder:0;margin:0">
                        <input type="checkbox"
                               v-model="CursosSelecionados"
                               :value="curso"
                        >
                      </td>
                      <td>{{curso.codigo}}</td>
                      <td>{{curso.nome}}</td>
                    </tr>
                  </table>
              </b-form-group>

              <div slot="modal-footer">
                <b-button
                        class="btn-azul mr-2"
                        variant="success"
                        @click="selectAllCursos()"
                >Selecionar Todos</b-button>
                <b-button class="btn-cinza mr-2" variant="secondary" @click="selectNoneCursos()">Desmarcar Todos</b-button>

                <b-button
                        variant="success"
                        @click="btnOKCursos()"
                        class="btn-verde mr-2"
                        style="padding-right:15px!important; padding-left:15px!important"
                >OK</b-button>
              </div>
            </b-modal>

          </div>
        </div>
      </div>
    </div>

    <div class="w-100 mb-2 border-bottom" style="margin-top: -3px"></div>

    <div id="loading" v-if="isLoading">
      <div class="cube1"></div>
      <div class="cube2"></div>
    </div>

    <div class="pl-0 divTable" v-if="!isLoading" ref="mainTable">
      <table class="table table-bordered table-hover table-sm">
        <thead class="thead-light sticky">
          <tr>
            <turmaheader v-bind:cursos="CursosAtivados"></turmaheader>
          </tr>
        </thead>
        <tbody>
          <template v-if="isAdd">
            <tr style="background-color:#c8c8c8;;">
              <novaturma></novaturma>
            </tr>
          </template>

          <template v-if="Turmas.length>0">
            <template v-for="perfil in PerfisAtivados">
              <tr
                v-for="turma in inPerfil(perfil, Turmas, Disciplinas)"
                :key="turma.id"
                v-bind:style="{backgroundColor: perfil.cor}"
              >
                <template v-if="turma.periodo==1 && (periodos == 1 || periodos==3)">
                  <turmadata ref="turma" v-bind:turma="turma" v-bind:perfil="perfil" v-bind:cursos="CursosAtivados"></turmadata>
                </template>
              </tr>
            </template>
            <template v-for="perfil in PerfisAtivados">
              <tr
                v-for="turma in inPerfil(perfil, Turmas, Disciplinas)"
                :key="turma.id"
                v-bind:style="{backgroundColor: perfil.cor}"
              >
                <template v-if="turma.periodo==3 && (periodos==2 || periodos==3)">
                  <turmadata ref="turma" v-bind:turma="turma" v-bind:perfil="perfil" v-bind:cursos="CursosAtivados"></turmadata>
                </template>
              </tr>
            </template>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import turmaService from "../../common/services/turma";
import pedidoService from "../../common/services/pedido";
import turmadata from "./TurmaRow.vue";
import turmaheader from "./TurmaHeader.vue";
import novaturma from "./NovaTurma.vue";
import xlsx from "../../common/services/xlsx";
import ls from "local-storage";
import { EventBus } from "../../event-bus.js";
import { saveAs } from "file-saver";

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
  Sala2: undefined
};

export default {
  name: "DashboardPrototipo",

  data() {
    return {
      turmaForm: _.clone(emptyTurma),
      error: undefined,
      isAdd: false,
      atual: undefined,
      semestre: 1,
      periodos: 3,
      PerfisSelecionados: [],
      CursosSelecionados: [],
      PerfisAtivados: [],
      CursosAtivados: [],
      ordenacaoCurso: 'posicao',
    };
  },

  components: {
    turmadata,
    turmaheader,
    novaturma
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
    ToggleCodigoOrdering () {
      if(this.ordenacaoCurso === 'codigo')
        this.ordenacaoCurso = 'posicao'
      else
        this.ordenacaoCurso = 'codigo'
    },

    ToggleNomeOrdering () {
      if(this.ordenacaoCurso === 'nome')
        this.ordenacaoCurso = 'posicao'
      else
        this.ordenacaoCurso = 'nome'
    },

    btnOK() {
      //Somente atualiza o vetor de perfis ativados quando o botão OK for clickado
      this.PerfisAtivados = [...this.PerfisSelecionados];
      this.$refs.PerfisModal.hide();
    },
    selectAll() {
      if (this.PerfisSelecionados != []) this.PerfisSelecionados = [];
      for (var i = 0; i < this.$store.state.perfil.Perfis.length; i++)
        this.PerfisSelecionados.push(this.$store.state.perfil.Perfis[i]);
    },

    selectNone() {
      this.PerfisSelecionados = [];
    },

    btnOKCursos() {
      //Somente atualiza o vetor de perfis ativados quando o botão OK for clickado
      this.CursosAtivados = [...this.CursosSelecionados];
      this.CursosAtivados = _.orderBy(this.CursosAtivados, this.ordenacaoCurso)
      this.$refs.CursosModal.hide();
    },
    selectAllCursos() {
      if (this.CursosSelecionados != []) this.CursosSelecionados = [];
      for (var i = 0; i < this.$store.state.curso.Cursos.length; i++)
        this.CursosSelecionados.push(this.$store.state.curso.Cursos[i]);
    },

    selectNoneCursos() {
      this.CursosSelecionados = [];
    },

    xlsx: function(pedidos) {
      xlsx
        .downloadTable({ pedidos: pedidos })
        .then(() => {
          console.log("done");
          fetch("http://200.131.219.57:3000/api/xlsx/download", {
            method: "GET",
            headers: { Authorization: `Bearer ${this.$store.state.auth.token}` }
          })
            .then(r => r.blob())
            .then(blob => saveAs(blob, "tabela.xlsx"));
        })
        .catch(error => console.log(error));
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
      return turmas.filter(function(turma) {
        if (_.isNull(turma.Disciplina)) return false;
        var disciplina = _.find(disciplinas, function(disc) {
          return disc.id === turma.Disciplina;
        });
        return disciplina.Perfil === perfil.id;
      });
    },

    addTurma() {
      EventBus.$emit("addTurma");
    },

    editTurma(turma) {
      turmaService
        .update(turma.id, turma)
        .then(response => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Turma ${response.Turma.letra} foi atualizada!`,
            type: "success"
          });
        })
        .catch(error => {
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
                type: "success"
              });
            })
            .catch(error => {
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
    }
  },

  computed: {
    Cursos() {
      return _.orderBy(this.$store.state.curso.Cursos, this.ordenacaoCurso);
    },

    CursosAtivos() {
      return this.$store.state.curso.Ativos;
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
      return this.$store.state.perfil.Perfis;
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
    }
  }
};
</script>

<style scoped>
/* prefixed by https://autoprefixer.github.io (PostCSS: v7.0.23, autoprefixer: v9.7.3) */

.DashboardPrototipo {
  max-width: 100%;
  overflow: hidden;
  margin: 0;
}
.btn-df{
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
  background-color: #9ab3ff !important;
  border-color: #9ab3ff !important;
}
.btn-azul:hover {
  background-color: #82a0ff !important;
  border-color: #82a0ff !important;
}
.btn-azul:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(122, 128, 124, 0.5) !important;
  -moz-box-shadow: 0 0 0 0.2rem rgba(108, 166, 127, 0.5) !important;
  box-shadow: 0 0 0 0.2rem rgba(108, 166, 127, 0.5) !important;
}
.btn-cinza {
  background-color: #c3c3c3 !important;
  border-color: #c3c3c3 !important;
}
.btn-cinza:hover {
  background-color: #aaaaaa !important;
  border-color: #aaaaaa !important;
}
.btn-cinza:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(116, 124, 119, 0.74) !important;
  -moz-box-shadow: 0 0 0 0.2rem rgba(116, 124, 119, 0.74) !important;
  box-shadow: 0 0 0 0.2rem rgba(116, 124, 119, 0.74) !important;
}
.btn-verde {
  background-color: #a0e7a0 !important;
  border-color: #a0e7a0 !important;
}
.btn-verde:hover {
  background-color: #77dd77 !important;
  border-color: #77dd77 !important;
}
.btn-verde:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(108, 166, 127, 0.5) !important;
  -moz-box-shadow: 0 0 0 0.2rem rgba(108, 166, 127, 0.5) !important;
  box-shadow: 0 0 0 0.2rem rgba(108, 166, 127, 0.5) !important;
}
.titulo {
  font-size: 25px;
  font-weight: normal;
  padding-left: 0;
  margin: 0 !important;
}
.input-group-text {
  max-width: 70px;
  min-width: 70px;
  height: 25px !important;
  margin-left: -5px;
  padding-left: 15px;
  font-size: 12px !important;
}
.form-control {
  height: 25px !important;
  font-size: 12px !important;
  padding: 0px 0px 0px 5px !important;
  min-width: 80px;
  max-width: 80px;
  text-align: start;
}
.sticky {
  position: sticky;
  position: -webkit-sticky;
  top: 0;
}
.table-bordered thead th{
  border: none;
}
.divTable {
  overflow: hidden;
  height: -webkit-max-content;
  height: -moz-max-content;
  height: max-content;
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
}
table {
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
tbody {
  max-height: 100%;
  width: 100%;
}
table td {
  text-align: center;
  vertical-align: middle;
  padding: 0 !important;
}
tr thead {
  display: block;
}
thead th {
  padding: 0 !important;
  font-size: 14px;
  text-align: center;
  height: 18px !important;
}
/* Botoes */
button {
  padding: 0;
  border: none;
  background: none;
  height: -webkit-max-content;
  height: -moz-max-content;
  height: max-content;
  margin-right: 15px;
  margin-top: 5px;
  transition: all 0.3s ease 0s;
}
i.fas,
i.far {
  font-size: 25px;
}
.addbtn {
  background-color: white;
  color: #a0e7a0;
}
.addbtn:hover {
  cursor: pointer;
  background-color: white;
  color: #77dd77;
}
.addbtn:focus {
  color: #77dd77;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #2fbf53;
}
.cancelbtn {
  background-color: white;
  color: #cfcfc4;
}
.cancelbtn:hover {
  cursor: pointer;
  color: #b8b4a8;
}
.cancelbtn:focus {
  color: #b8b8a8;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #ada89a;
}

.delbtn {
  background-color: white;
  color: #ff817b;
}
.delbtn:hover {
  cursor: pointer;
  color: #ff5f48;
}
.delbtn:focus {
  color: #ff5f48;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #ff4e34;
}
.relatbtn {
  background-color: white;
  color: #9ab3ff !important;
}

.relatbtn:hover {
  cursor: pointer;
  color: #82a0ff !important;
}

.relatbtn:focus {
  color: #82a0ff;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #698dff;
}
.cube1,
.cube2 {
  background-color: #333;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: cubemove 1.8s infinite ease-in-out;
  -moz-animation: cubemove 1.8s infinite ease-in-out;
  -o-animation: cubemove 1.8s infinite ease-in-out;
  animation: cubemove 1.8s infinite ease-in-out;
}
.cube2 {
  -webkit-animation-delay: -0.9s;
  -moz-animation-delay: -0.9s;
  -o-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
@-webkit-keyframes cubemove {
  25% {
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg)
      scale(0.5);
  }
  100% {
    -webkit-transform: rotate(-360deg);
  }
}
@-moz-keyframes cubemove {
  25% {
    -moz-transform: translateX(42px) rotate(-90deg) scale(0.5);
    transform: translateX(42px) rotate(-90deg) scale(0.5);
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    -moz-transform: translateX(42px) translateY(42px) rotate(-179deg);
    transform: translateX(42px) translateY(42px) rotate(-179deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
  }
  50.1% {
    -moz-transform: translateX(42px) translateY(42px) rotate(-180deg);
    transform: translateX(42px) translateY(42px) rotate(-180deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    -moz-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg)
      scale(0.5);
  }
  100% {
    -moz-transform: rotate(-360deg);
    transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
}
@-o-keyframes cubemove {
  25% {
    -o-transform: translateX(42px) rotate(-90deg) scale(0.5);
    transform: translateX(42px) rotate(-90deg) scale(0.5);
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    -o-transform: translateX(42px) translateY(42px) rotate(-179deg);
    transform: translateX(42px) translateY(42px) rotate(-179deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
  }
  50.1% {
    -o-transform: translateX(42px) translateY(42px) rotate(-180deg);
    transform: translateX(42px) translateY(42px) rotate(-180deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    -o-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg)
      scale(0.5);
  }
  100% {
    -o-transform: rotate(-360deg);
    transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
}
@keyframes cubemove {
  25% {
    -moz-transform: translateX(42px) rotate(-90deg) scale(0.5);
    -o-transform: translateX(42px) rotate(-90deg) scale(0.5);
    transform: translateX(42px) rotate(-90deg) scale(0.5);
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    -moz-transform: translateX(42px) translateY(42px) rotate(-179deg);
    -o-transform: translateX(42px) translateY(42px) rotate(-179deg);
    transform: translateX(42px) translateY(42px) rotate(-179deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
  }
  50.1% {
    -moz-transform: translateX(42px) translateY(42px) rotate(-180deg);
    -o-transform: translateX(42px) translateY(42px) rotate(-180deg);
    transform: translateX(42px) translateY(42px) rotate(-180deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    -moz-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -o-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg)
      scale(0.5);
  }
  100% {
    -moz-transform: rotate(-360deg);
    -o-transform: rotate(-360deg);
    transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
}
#checkboxGroupPerfis {
  display: -webkit-box !important;
  display: -webkit-flex !important;
  display: -moz-box !important;
  display: -ms-flexbox !important;
  display: flex !important;
  -webkit-box-orient: vertical !important;
  -webkit-box-direction: normal !important;
  -webkit-flex-direction: column !important;
  -moz-box-orient: vertical !important;
  -moz-box-direction: normal !important;
  -ms-flex-direction: column !important;
  flex-direction: column !important;
  -webkit-box-align: start !important;
  -webkit-align-items: flex-start !important;
  -moz-box-align: start !important;
  -ms-flex-align: start !important;
  align-items: flex-start !important;
  -webkit-flex-wrap: wrap !important;
  -ms-flex-wrap: wrap !important;
  flex-wrap: wrap !important;
  -webkit-box-pack: justify !important;
  -webkit-justify-content: space-between !important;
  -moz-box-pack: justify !important;
  -ms-flex-pack: justify !important;
  justify-content: space-between !important;
}
</style>
