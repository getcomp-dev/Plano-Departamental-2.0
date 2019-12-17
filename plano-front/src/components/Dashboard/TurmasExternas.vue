<template>
  <div class="TurmasExternas row pr-2" v-if="Admin">
    <!-- Titulo -->
    <div
      class="col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0"
      style="height:38px;"
    >
      <div class="form-inline col-12 pl-0 mb-1 pr-1">
        <h1 class="titulo col-xl-2 col-md-3 col-sm-4 col-4">Tabela Externa</h1>

        <div
          class="form-group col-xl-10 col-md-9 col-sm-8 col-8 mb-0 pr-0"
          style="justify-content: flex-end;"
        >
          <div class="input-group mr-0 ml-auto mb-0 mt-0">
            <div class="input-group-append mt-1 ">
              <div class="input-group-append">
                <label class="input-group-text">Semestre:</label>
              </div>
            </div>
            <select class="form-control form-control-sm mt-1 mr-5" v-model="periodos">
              <option value="1">Primeiro</option>
              <option value="2">Segundo</option>
              <option value="3">Ambos</option>
            </select>
            

            <template v-if="isAdd">
              <div style="display: flex">
                <button
                  type="button"
                  title="Salvar"
                  class="addbtn"
                  v-on:click.prevent="addTurma"
                ><i class="fas fa-check"></i></button>
                <button
                  type="button"
                  title="Cancelar"
                  class="cancelbtn"
                  v-on:click.prevent="toggleAdd"
                ><i class="fas fa-times"></i>
                </button>
              </div>
            </template>
            <template v-else>
              <div style="display: flex">
                <button
                  type="button"
                  title="Adicionar"
                  class="addbtn"
                  v-on:click.prevent="toggleAdd"
                ><i class="fas fa-plus"></i></button>
                <button
                  type="button"
                  title="Deletar"
                  class="delbtn"
                  style
                  v-b-modal.modalConfirma
                ><i class="far fa-trash-alt"></i></button>
              </div>

              <b-modal id="modalConfirma" title="Confirmar Seleção" @ok="deleteSelected">
                <p class="my-4">Tem certeza que deseja deletar as turmas selecionadas?</p>
                <template v-for="turma in Deletar">
                  <template v-for="disciplina in Disciplinas">
                    <template v-if="disciplina.id===turma.Disciplina">
                      <p :key="'disciplina'+disciplina.id+'tirma'+turma.id" style="width:80px">
                        Disciplina:{{disciplina.codigo}}
                        <br />
                        Turma:{{turma.letra}}
                      </p>
                    </template>
                  </template>
                </template>
              </b-modal>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="w-100 mb-2 border-bottom"></div>

    <div id="loading" v-if="isLoading">
      <div class="cube1"></div>
      <div class="cube2"></div>
    </div>

    <!-- Inicio Tabela -->
    <div class="p-0 divTable mb-2" v-if="!isLoading">
      <table class="table table-hover table-bordered table-sm">
        <thead class="thead-light sticky">
          <tr>
            <div
              style="display: block; overflow: hidden; width: ‭884‬px; height:20px !important"
              class="sticky"
            >
              <th scope="col">
                <p class="p-header" style="width:24px !important;" title="Semestre">S.</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width:70px !important;" title="Código">Cod</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width:330px !important">Disciplina</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width:18px !important;" title="Créditos">C.</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width:40px !important;">Turma</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width:68px !important;" title="Total de vagas">Turno</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width:72px !important;">Horário</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width:98px !important;">Sala</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width:32px !important;">Total</p>
              </th>
              <template v-for="curso in Cursos">
                <th scope="col" :key="'curso'+curso.id" :id="'curso'+curso.id">
                  <p class="p-header" style="width:32px !important;">{{curso.codigo}}</p>

                  <b-popover
                    :key="curso.id"
                    :target="'curso'+curso.id"
                    placement="bottom"
                    triggers="hover focus"
                  >
                    <p
                      style="font-size: 11px"
                      class="p-0 m-0"
                      v-if="curso.semestreInicial==1 || curso.semestreInicial==3"
                    >1º - {{curso.alunosEntrada}}</p>
                    <p
                      style="font-size: 11px"
                      class="p-0 m-0"
                      v-if="curso.semestreInicial==2 || curso.semestreInicial==3"
                    >2º - {{curso.alunosEntrada2}}</p>
                    <p style="font-size: 11px" class="p-0 m-0">{{curso.nome}}</p>
                  </b-popover>
                </th>
              </template>
            </div>
          </tr>
        </thead>

        <tbody>
          <!-- Adição de turma-->
          <template v-if="isAdd">
            <tr style="background-color: #c8c8c8;;" class="stickyAdd">
              <div style="width: ‭884‬px; height:41px; font-size:11px">
                <td>
                  <div style="width:24px !important;">
                    <input
                      type="text"
                      style="width: 20px; height:20px; text-align: center; "
                      id="periodo"
                      v-model="turmaForm.periodo"
                    />
                  </div>
                </td>
                <td>
                  <div style="width:70px;">
                    <select
                      type="text"
                      style="width:65px;"
                      id="disciplina"
                      v-model="turmaForm.Disciplina"
                    >
                      <option
                        v-if="DisciplinasCod.length===0"
                        type="text"
                        value
                      >Nenhuma Disciplina Encontrada</option>
                      <option
                        v-for="disciplina in DisciplinasCod"
                        :key="disciplina.id"
                        :value="disciplina.id"
                      >{{disciplina.codigo}}</option>
                    </select>
                  </div>
                </td>
                <td>
                  <div style="width: 330px;">
                    <select
                      type="text"
                      style="width:325px;"
                      id="disciplina"
                      v-model="turmaForm.Disciplina"
                    >
                      <option
                        v-if="Disciplinas.length===0"
                        type="text"
                        value
                      >Nenhuma Disciplina Encontrada</option>
                      <option
                        v-for="disciplina in Disciplinas"
                        :key="disciplina.id"
                        :value="disciplina.id"
                      >{{disciplina.nome}}</option>
                    </select>
                  </div>
                </td>
                <td>
                  <div style="width: 18px;">
                    <p style="width:18px;">
                      <template v-for="disciplina in Disciplinas">
                        <template
                          v-if="disciplina.id===turmaForm.Disciplina"
                        >{{disciplina.cargaPratica + disciplina.cargaTeorica}}</template>
                      </template>
                    </p>
                  </div>
                </td>
                <td>
                  <div style="width: 40px">
                    <input type="text" style="width:20px;" id="turma" v-model="turmaForm.letra" />
                  </div>
                </td>
                <td>
                  <div style="width: 68px;">
                    <select
                      type="text"
                      style="width:63px; text-align:center;"
                      id="turno1"
                      v-model="turmaForm.turno1"
                      v-on:change="setEad"
                    >
                      <option value="Diurno">Diurno</option>
                      <option value="Noturno">Noturno</option>
                      <option value="EAD">EAD</option>
                    </select>
                  </div>
                </td>
                <td>
                  <div style="width: 72px;">
                    <select
                      type="text"
                      style="width: 67px; margin-bottom: 1px;"
                      id="horario1"
                      v-model="turmaForm.Horario1"
                      v-on:change="adjustTurno1"
                    >
                      <option v-if="Horarios.length===0" type="text" value>Nenhum Horário Encontrado</option>
                      <option
                        v-for="horario in Horarios"
                        :key="horario.id"
                        :value="horario.id"
                      >{{horario.horario}}</option>
                    </select>
                    <select
                      type="text"
                      style="width: 67px;"
                      id="horario2"
                      v-model="turmaForm.Horario2"
                      v-on:change="adjustTurno2"
                    >
                      <option v-if="Horarios.length===0" type="text" value>Nenhum Horário Encontrado</option>
                      <option
                        v-for="horario in Horarios"
                        :key="horario.id"
                        :value="horario.id"
                      >{{horario.horario}}</option>
                    </select>
                  </div>
                </td>
                <td>
                  <div style="width: 98px">
                    <select
                      type="text"
                      style="width:93px; text-align:center; margin-bottom:1px;"
                      id="sala1"
                      v-model="turmaForm.Sala1"
                    >
                      <option v-if="Salas.length===0" type="text" value>Nenhuma Sala Encontrada</option>
                      <option v-for="sala in Salas" :key="sala.id" :value="sala.id">{{sala.nome}}</option>
                    </select>
                    <select type="text" style="width:93px;" id="sala2" v-model="turmaForm.Sala2">
                      <option v-if="Salas.length===0" type="text" value>Nenhuma Sala Encontrada</option>
                      <option v-for="sala in Salas" :key="sala.id" :value="sala.id">{{sala.nome}}</option>
                    </select>
                  </div>
                </td>
                <td>
                  <!-- Ocupa espaço vazio das vagas na parte de edição -->
                  <div style="width: 165px; height:37px"></div>
                </td>
              </div>
            </tr>
          </template>
          <!--FINAL ADIÇÃO DE TURMA-->

          <!-- LINHAS DA TABELA -->
          <template v-if="Turmas.length>0">
            <template v-for="perfil in Perfis">
              <template v-for="disciplina in DisciplinasCod">
              <tr
                v-for="turma in inPerfil(perfil, Turmas, Disciplinas)"
                v-if="turma.Disciplina === disciplina.id"
                :key="turma.id"
                v-bind:class="{'basico':perfil.id==1,'avancado':perfil.id==2, 'arqso':perfil.id==3,
                    'bancosdedados':perfil.id==4, 'computacaografica':perfil.id==5, 'engenhariasoftware':perfil.id==6, 'iaic':perfil.id==7, 'numoc':perfil.id==8, 'redes':perfil.id==9, 'teoria':perfil.id==10,
                    'humempre':perfil.id==11, 'multi': perfil.id==12, 'ice':perfil.id==13}"
              >
                <template v-if="turma.periodo==1 && (periodos == 1 || periodos==3)">
                  <turmadata v-bind:turma="turma" v-bind:perfil="perfil"></turmadata>
                </template>
              </tr>
              </template>
            </template>
            <template v-for="perfil in Perfis">
              <template v-for="disciplina in DisciplinasCod">
              <tr
                v-for="turma in inPerfil(perfil, Turmas, Disciplinas)"
                v-if="turma.Disciplina === disciplina.id"
                :key="turma.id"
                v-bind:class="{'basico':perfil.id==1,'avancado':perfil.id==2, 'arqso':perfil.id==3,
                    'bancosdedados':perfil.id==4, 'computacaografica':perfil.id==5, 'engenhariasoftware':perfil.id==6, 'iaic':perfil.id==7, 'numoc':perfil.id==8, 'redes':perfil.id==9, 'teoria':perfil.id==10,
                    'humempre':perfil.id==11, 'multi': perfil.id==12, 'ice':perfil.id==13}"
              >
                <template v-if="turma.periodo==3 && (periodos==2 || periodos==3)">
                  <turmadata v-bind:turma="turma" v-bind:perfil="perfil"></turmadata>
                </template>
              </tr>
              </template>
            </template>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import turmaExternaService from "../../common/services/turmaExterna";
import pedidoExternoService from "../../common/services/pedidoExterno";
import turmadata from "./TurmaExternaRow.vue";
const emptyTurma = {
  id: undefined,
  periodo: undefined,
  letra: undefined,
  turno1: undefined,
  turno2: undefined,
  Disciplina: undefined,
  Horario1: undefined,
  Horario2: undefined,
  Sala1: undefined,
  Sala2: undefined
};
const emptyPedido = {
  vagasPeriodizadas: 0,
  vagasNaoPeriodizadas: 0,
  Curso: undefined,
  Turma: undefined
};
export default {
  name: "DashboardTurmasExternas",
  data() {
    return {
      turmaForm: _.clone(emptyTurma),
      error: undefined,
      isAdd: false,
      atual: undefined,
      semestre: 1,
      periodos: 3
    };
  },
  components: {
    turmadata
  },
  /*
        mounted () {
            this.$store.commit('emptyDelete')
            console.log(this.$store.state.turma.Deletar)
            this.$store.commit(COMPONENT_LOADED)
        },
        */
  methods: {
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
    setEad: function() {
      if (this.turmaForm.turno1 === "EAD") {
        this.turmaForm.Horario1 = 31;
        if (this.turmaForm.Horario2 > 0) this.turmaForm.Horario2 = null;
      }
    },
    deleteSelected: function() {
      var turmas = this.$store.state.turmaExterna.Deletar;
      for (var i = 0; i < turmas.length; i++) {
        this.deleteTurma(turmas[i]);
      }
      this.$store.commit("emptyDeleteExterno");
    },
    inPerfil: function(perfil, turmas, disciplinas) {
      return turmas.filter(function(turma) {
        var disciplina = _.find(disciplinas, function(disc) {
          return disc.id === turma.Disciplina;
        });
        return disciplina.Perfil === perfil.id;
      });
    },
    addTurma() {
      turmaExternaService
        .create(this.turmaForm)
        .then(response => {
          this.semestre = response.Turma.periodo;
          for (var i = 0; i < 4; i++) {
            var pedido = _.clone(emptyPedido);
            pedido.Curso = this.$store.state.curso.Cursos[i].id;
            pedido.Turma = response.Turma.id;
            pedidoExternoService
              .create(pedido)
              .then(response => {
                console.log(response.Pedido);
              })
              .catch(error => {
                console.log("erro ao criar pedido: " + error);
              });
          }
          this.cleanTurma();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Turma ${response.Turma.letra} foi criada!`,
            type: "success"
          });
        })
        .catch(error => {
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
      turmaExternaService
        .delete(turma.id, turma)
        .then(response => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Turma ${response.Turma.letra} foi excluída!`,
            type: "success"
          });
        })
        .catch(() => {
          this.error = "<b>Erro ao excluir Turma</b>";
        });
    },
    cleanTurma() {
      this.turmaForm = _.clone(emptyTurma);
      this.turmaForm.periodo = this.semestre;
      this.turmaForm.letra = "A";
      this.error = undefined;
    },
    toggleAdd() {
      this.cleanTurma();
      this.isAdd = !this.isAdd;
    }
  },
  computed: {
    Cursos() {
      return _.slice(this.$store.state.curso.Cursos, 0, 4);
    },
    Disciplinas() {
      return _.orderBy(
        _.filter(this.$store.state.disciplina.Disciplinas, function(d) {
          return (d.Perfil == 13 || d.Perfil == 15);
        }),
        "nome"
      );
    },
    DisciplinasCod() {
      return _.orderBy(
        _.filter(this.$store.state.disciplina.Disciplinas, function(d) {
          return (d.Perfil == 13 || d.Perfil == 15);
        }),
        "codigo"
      );
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
        _.orderBy(this.$store.state.turmaExterna.Turmas, "letra"),
        "Disciplina"
      );
    },
    Deletar() {
      return this.$store.state.turmaExterna.Deletar;
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
<style>
.avancado {
  background-color: #7c997f !important;
}
.basico {
  background-color: #a76663 !important;
}
.arqso {
  background-color: #a4a75a !important;
}
.bancosdedados {
  background-color: #60a75a !important;
}
.computacaografica {
  background-color: #a75877 !important;
}
.engenhariasoftware {
  background-color: #34a9f6 !important;
}
.iaic {
  background-color: #a449f6 !important;
}
.numoc {
  background-color: #a7000c !important;
}
.redes {
  background-color: #0f0da7 !important;
}
.teoria {
  background-color: #0aa702 !important;
}
.humempre {
  background-color: #0e6ba7 !important;
}
.multi {
  background-color: #9100a7 !important;
}
.ice {
}
</style>

<style scoped>
/* prefixed */

.TurmasExternas {
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
.form-control {
  height: 25px !important;
  font-size: 12px !important;
  padding: 0px 0px 0px 5px !important;
  min-width: 80px;
  max-width: 80px;
  text-align: start;
  border-radius: 3px !important;
}
.input-group-text {
  max-width: 70px;
  min-width: 70px;
  height: 25px !important;
  margin-left: -5px;
  padding-left: 15px;
  font-size: 12px !important;
  background-color: white;
  border: none;
}

.p-header {
  padding: 0px 0 0px 0;
  margin: 0;
  font-size: 11px;
  text-align: center;
  height: 18px;
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
tr thead {
  display: block;
}
thead th {
  padding: 0 !important;
  font-size: 14px;
  text-align: center;
  height: 18px !important;
}
table td {
  text-align: center;
  vertical-align: middle;
  padding: 0;
  height: 40px;
}
table p {
  margin-bottom: 0;
  text-align: center;
}
table input {
  height: 18px !important;
  text-align: center !important;
}
table select {
  height: 18px;
}
.sticky {
  position: sticky;
  position: -webkit-sticky;
  top: 0;
}
.stickyAdd {
  position: sticky;
  position: -webkit-sticky;
  top: 21px;
  display: fixed;
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
  cursor: pointer;
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
  background-color: white;
  color: #77dd77;
}
.addbtn:focus {
  color: #77dd77;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #2fbf53;
}
.cancelbtn {
  color: #cfcfc4;
}
.cancelbtn:hover {
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
  color: #ff5f48;
}
.delbtn:focus {
  color: #ff5f48;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #ff4e34;
}


/* .example {
  display: -ms-grid;
  display: grid;
  -webkit-transition: all 0.5s;
  -o-transition: all 0.5s;
  -moz-transition: all 0.5s;
  transition: all 0.5s;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(white),
    to(black)
  );
  background: -webkit-linear-gradient(top, white, black);
  background: -moz-linear-gradient(top, white, black);
  background: -o-linear-gradient(top, white, black);
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(white),
    to(black)
  );
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(white),
    to(black)
  );
  background: linear-gradient(to bottom, white, black);
} */
/* APENAS NO FIREFOX */
@-moz-document url-prefix() {
  table select {
    height: 18px !important;
    text-align: left;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 8px;
    border: 0.5px solid rgb(160, 160, 160);
    -moz-border-radius: 2px;
    border-radius: 2px;
    background-color: rgb(245, 245, 245);
  }
  table input {
    height: 18px !important;
    text-align: center;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 8px;
    border: 0.5px solid rgb(160, 160, 160);
    -moz-border-radius: 2px;
    border-radius: 2px;
    background-color: rgb(245, 245, 245);
  }
}
</style>