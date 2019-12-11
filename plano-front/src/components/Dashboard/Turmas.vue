<template>
  <div class="DashboardTurmas row pr-2" v-if="Admin">
    <div class="col-7">
      <!-- Titulo -->
      <div class="col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0">
        <div class="form-inline col-12 pl-0 mb-2 pr-1">
          <h1 class="col-12 titulo">Lista Turmas</h1>
        </div>
      </div>

      <table class="table table-hover table-bordered table-sm">
        <thead class="thead-light">
          <tr>
            <div
              style="display: block; overflow: hidden; width:790px; height:20px !important"
              class="sticky"
            >
              <th scope="col">
                <p class="p-header" style="width: 24px">S.</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 24px">T.</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 50px">Turno</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 300px">Disciplina</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 130px">Docente 1</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 130px">Docente 2</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 55px">Horário 1</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 55px">Horário 2</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 40px">Sala 1</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 40px">Sala 2</p>
              </th>
            </div>
          </tr>
        </thead>

        <tbody>
          <template v-if="Turmas.length > 0">
            <template v-for="perfil in Perfis">
              <tr
                v-for="turma in inPerfil(perfil, Turmas, Disciplinas)"
                :key="'turma'+turma.id"
                v-on:click.prevent="showTurma(turma)"
              >
                <div style="width: 790px; font-size:11px">
                  <td>
                    <div style="width:24px">{{turma.periodo}}</div>
                  </td>
                  <td>
                    <div style="width:24px">{{turma.letra}}</div>
                  </td>
                  <td>
                    <div style="width:50px">{{turma.turno1}}</div>
                  </td>

                  <template v-for="disciplina in Disciplinas">
                    <td v-if="disciplina.id===turma.Disciplina" :key="'disciplina'+disciplina.id">
                      <div style="width:300px">{{disciplina.nome}}</div>
                    </td>
                  </template>

                  <template v-for="docente in Docentes">
                    <td v-if="docente.id===turma.Docente1" :key="'1docente'+docente.id">
                      <div style="width:130px">{{docente.apelido}}</div>
                    </td>
                  </template>

                  <template v-if="turma.Docente2 !== null">
                    <td v-for="docente in Docentes" :key="'2docente'+docente.id">
                      <template v-if="docente.id===turma.Docente2">
                        <div style="width: 130px">{{docente.apelido}}</div>
                      </template>
                    </td>
                  </template>

                  <template v-else>
                    <td>
                      <div style="width: 130px">-</div>
                    </td>
                  </template>

                  <template v-for="horario in Horarios">
                    <td v-if="horario.id===turma.Horario1" :key="'1horario'+horario.id">
                      <div style="width: 55px">
                        <span>{{horario.horario}}</span>

                        <template v-if="turma.Horario2 !== null">
                          <span v-if="horario.id===turma.Horario2">{{horario.horario}}</span>
                        </template>
                      </div>
                    </td>
                  </template>
                  <!--
                  <template v-if="turma.Horario2 !== null">
                    <td v-for="horario in Horarios" :key="'2horario'+horario.id">
                      <template v-if="horario.id===turma.Horario2">{{horario.horario}}</template>
                    </td>
                  </template>
                  
                  <td v-else></td>
                  -->

                  <template v-for="sala in Salas">
                    <td v-if="sala.id===turma.Sala1" :key="'1sala'+sala.id">{{sala.nome}}</td>
                  </template>

                  <template v-if="turma.Sala2 !== null">
                    <td v-for="sala in Salas" :key="'2sala'+sala.id">
                      <template v-if="sala.id===turma.Sala2">{{sala.nome}}</template>
                    </td>
                  </template>

                  <td v-else></td>
                </div>
              </tr>
            </template>
          </template>
          <template v-else>
            <tr>
              <td colspan="2" class="text-center">
                <i class="fas fa-exclamation-triangle"></i> Nenhuma turma encontrada!
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div class="col">
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
      >
        <template v-if="isEdit">
          <h1 class="h2">Editar Turma</h1>
        </template>
        <template v-else>
          <h1 class="h2">Adicionar Turma</h1>
        </template>
      </div>
      <b-alert :show="Boolean(error)" variant="danger" dismissible v-html="error"></b-alert>
      <form>
        <div class="form-group row">
          <label for="periodo" class="col-sm-4 col-form-label">Período</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="periodo" v-model="turmaForm.periodo" />
          </div>
        </div>
        <div class="form-group row">
          <label for="letra" class="col-sm-4 col-form-label">Turma</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="letra" v-model="turmaForm.letra" />
          </div>
        </div>
        <div class="form-group row">
          <label for="disciplina" class="col-sm-4 col-form-label">Disciplina</label>
          <div class="col-sm-8">
            <select type="text" class="form-control" id="disciplina" v-model="turmaForm.Disciplina">
              <option v-if="Disciplinas.length===0" type="text" value>Nenhuma Disciplina Encontrada</option>
              <option
                v-for="disciplina in Disciplinas"
                :key="'disciplinaOption'+disciplina.id"
                :value="disciplina.id"
              >{{disciplina.nome}}</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label for="docente1" class="col-sm-4 col-form-label">Docente 1</label>
          <div class="col-sm-8">
            <select type="text" class="form-control" id="docente1" v-model="turmaForm.Docente1">
              <option v-if="Docentes.length===0" type="text" value>Nenhum Docente Encontrado</option>
              <option
                v-for="docente in Docentes"
                :key="'1docenteOption'+docente.id"
                :value="docente.id"
              >{{docente.apelido}}</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label for="docente2" class="col-sm-4 col-form-label">Docente 2</label>
          <div class="col-sm-8">
            <select type="text" class="form-control" id="docente2" v-model="turmaForm.Docente2">
              <option v-if="Docentes.length===0" type="text" value>Nenhum Docente Encontrado</option>
              <option
                v-for="docente in Docentes"
                :key="'2docenteOption'+docente.id"
                :value="docente.id"
              >{{docente.apelido}}</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label for="turno1" class="col-sm-4 col-form-label">Turno</label>
          <div class="col-sm-8">
            <div id="turno1">
              <input type="radio" name="turno1" value="Diurno" v-model="turmaForm.turno1" /> Diurno
              <br />
              <input type="radio" name="turno1" value="Integral" v-model="turmaForm.turno1" /> Integral
              <br />
              <input type="radio" name="turno1" value="Noturno" v-model="turmaForm.turno1" /> Noturno
              <br />
            </div>
          </div>
        </div>
        <div class="form-group row">
          <label for="horario1" class="col-sm-4 col-form-label">Horário 1</label>
          <div class="col-sm-8">
            <select type="text" class="form-control" id="horario1" v-model="turmaForm.Horario1">
              <option v-if="Horarios.length===0" type="text" value>Nenhum Horário Encontrado</option>
              <option
                v-for="horario in Horarios"
                :key="'1horarioOption'+horario.id"
                :value="horario.id"
              >{{horario.horario}}</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label for="horario2" class="col-sm-4 col-form-label">Horário 2</label>
          <div class="col-sm-8">
            <select type="text" class="form-control" id="horario2" v-model="turmaForm.Horario2">
              <option v-if="Horarios.length===0" type="text" value>Nenhum Horário Encontrado</option>
              <option
                v-for="horario in Horarios"
                :key="'2horarioOption'+horario.id"
                :value="horario.id"
              >{{horario.horario}}</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label for="sala1" class="col-sm-4 col-form-label">Sala 1</label>
          <div class="col-sm-8">
            <select type="text" class="form-control" id="sala1" v-model="turmaForm.Sala1">
              <option v-if="Salas.length===0" type="text" value>Nenhuma Sala Encontrada</option>
              <option
                v-for="sala in Salas"
                :key="'1salaOption'+sala.id"
                :value="sala.id"
              >{{sala.nome}}</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label for="sala2" class="col-sm-4 col-form-label">Sala 2</label>
          <div class="col-sm-8">
            <select type="text" class="form-control" id="sala2" v-model="turmaForm.Sala2">
              <option v-if="Salas.length===0" type="text" value>Nenhuma Sala Encontrada</option>
              <option
                v-for="sala in Salas"
                :key="'2salaOption'+sala.id"
                :value="sala.id"
              >{{sala.nome}}</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-10">
            <template v-if="isEdit">
              <button
                type="button"
                class="btn btn-success m-2"
                v-on:click.prevent="editTurma"
                :key="'1edit'"
              >Editar</button>
              <button
                type="button"
                class="btn btn-danger m-2"
                v-on:click.prevent="deleteTurma"
                :key="'3edit'"
              >Excluir</button>
              <button
                type="button"
                class="btn btn-secondary m-2"
                v-on:click.prevent="cleanTurma"
                :key="'2edit'"
              >Cancelar</button>
            </template>
            <template v-else>
              <button
                type="button"
                class="btn btn-success m-2"
                v-on:click.prevent="addTurma"
                :key="'1add'"
              >Adicionar</button>
              <button
                type="button"
                class="btn btn-danger m-2"
                v-on:click.prevent="cleanTurma"
                :key="'2add'"
              >Resetar</button>
            </template>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import turmaService from "../../common/services/turma";
import pedidoService from "../../common/services/pedido";

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

const emptyPedido = {
  vagasPeriodizadas: 0,
  vagasNaoPeriodizadas: 0,
  Curso: undefined,
  Turma: undefined
};

export default {
  name: "DashboardTurmas",

  data() {
    return {
      turmaForm: _.clone(emptyTurma),
      error: undefined
    };
  },

  methods: {
    addTurma() {
      var turmasLivres = _.orderBy(
        _.orderBy(
          _.filter(this.$store.state.turma.Turmas, function(t) {
            return t.Disciplina === null;
          }),
          "letra"
        ),
        "Disciplina"
      );
      console.log(turmasLivres);
      this.turmaForm.id = turmasLivres[0].id;
      console.log(this.turmaForm);
      this.editTurma(this.turmaForm);
      this.cleanTurma();
      /*
                turmaService.create(this.turmaForm).then((response) => {
                    for (var i = 0; i< this.$store.state.curso.Cursos.length; i++){
                        var pedido = _.clone(emptyPedido)
                        pedido.Curso = this.$store.state.curso.Cursos[i].id
                        pedido.Turma = response.Turma.id
                        pedidoService.create(pedido).then((response) => {
                            console.log(response.Pedido)
                        }).catch(error => {console.log("erro ao criar pedido: "+error)})
                    }
                    this.cleanTurma()
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Turma ${response.Turma.letra} foi criada!`,
                        type: 'success'
                    })
                }).
                catch(error => {
                    this.error = '<b>Erro ao criar Turma</b>'
                    if (error.response.data.fullMessage) {
                        this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
                    }
                })*/
    },

    inPerfil: function(perfil, turmas, disciplinas) {
      return turmas.filter(function(turma) {
        var disciplina = _.find(disciplinas, function(disc) {
          return disc.id === turma.Disciplina;
        });
        return disciplina.Perfil === perfil.id;
      });
    },

    editTurma() {
      turmaService
        .update(this.turmaForm.id, this.turmaForm)
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

    deleteTurma() {
      this.turmaForm.periodo = null;
      this.turmaForm.letra = null;
      this.turmaForm.turno1 = null;
      this.turmaForm.turno2 = null;
      this.turmaForm.Disciplina = null;
      this.turmaForm.Docente1 = null;
      this.turmaForm.Docente2 = null;
      this.turmaForm.Horario1 = null;
      this.turmaForm.Horario2 = null;
      this.turmaForm.Sala1 = null;
      this.turmaForm.Sala2 = null;
      console.log(this.turmaForm);

      editTurma();

      var t = turma.id;
      var pedidos = _.filter(this.$store.state.pedido.Pedidos, function(p) {
        return p.Turma == t;
      });
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
            .then(response => {
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
      /*
                turmaService.delete(this.turmaForm.id, this.turmaForm).then((response) => {
                    this.cleanTurma()
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Turma ${response.Turma.letra} foi excluída!`,
                        type: 'success'
                    })
                }).
                catch(() => {
                    this.error = '<b>Erro ao excluir Turma</b>'
                })*/
    },

    cleanTurma() {
      this.turmaForm = _.clone(emptyTurma);
      this.error = undefined;
    },

    showTurma(turma) {
      this.cleanTurma();
      this.turmaForm = _.clone(turma);
      (function smoothscroll() {
        var currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - currentScroll / 5);
        }
      })();
    }
  },

  computed: {
    Turmas() {
      return _.orderBy(
        _.orderBy(
          _.filter(this.$store.state.turma.Turmas, function(t) {
            return t.Disciplina !== null;
          }),
          "letra"
        ),
        "Disciplina"
      );
    },

    Disciplinas() {
      return this.$store.state.disciplina.Disciplinas;
    },

    Docentes() {
      return _.orderBy(
        _.filter(this.$store.state.docente.Docentes, ["ativo", true]),
        "apelido"
      );
    },

    Horarios() {
      return this.$store.state.horario.Horarios;
    },

    Perfis() {
      return this.$store.state.perfil.Perfis;
    },

    Salas() {
      return this.$store.state.sala.Salas;
    },

    isEdit() {
      return this.turmaForm.id !== undefined;
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
.titulo {
  font-size: 25px;
  font-weight: normal;
  padding-left: 0;
  margin: 0 !important;
}
.p-header {
  padding: 0px 0 0px 0;
  margin: 0;
  font-size: 11px;
  text-align: center;
  height: 18px;
}
table {
  display: block;
  overflow-y: scroll;
  height: -webkit-calc(100vh - 100px);
  height: -moz-calc(100vh - 100px);
  height: calc(100vh - 100px);
  font-size: 11px;
  background-color: #f5f5f5;
  margin: 0;
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
table p {
  margin-bottom: 0;
  text-align: center;
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
table select {
  height: 15px !important;
  text-align: left;
}
table input {
  height: 18px !important;
  text-align: center !important;
}
.sticky {
  position: sticky;
  position: -webkit-sticky;
  top: 0;
}
</style>