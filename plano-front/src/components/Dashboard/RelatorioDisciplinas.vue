<template>
  <div class="DashboardRelatorioDisciplinas row pr-2">
    <!-- Titulo -->
    <div
      class="div-titulo col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0"
      style="height:38px;"
    >
      <div class="form-inline col-12 pl-0 mb-1 pr-1">
        <h1 class="titulo col-8 col-sm-6 col-md-4 col-lg-4 px-0 pr-1">Plano Departamental</h1>

        <div
          class="form-group col-4 col-sm-6 col-md-8 col-lg-8 mb-0 p-0"
          style="justify-content: flex-end!important;"
        >
          <b-button v-b-modal.modalSemestre title="Semestre" class="cancelbtn">
            <i class="fas fa-calendar-alt"></i>
          </b-button>
          <b-button v-b-modal.modalDisciplinas title="Disciplinas" class="cancelbtn">
            <i class="fas fa-list-ul"></i>
          </b-button>
          <div class="d-flex">
            <button type="button" class="relatbtn" title="Relatório" v-on:click.prevent="pdf">
              <i class="far fa-file-alt"></i>
            </button>

            <b-button v-b-modal.modalAjuda title="Ajuda" class="relatbtn">
              <i class="fas fa-question"></i>
            </b-button>
          </div>
        </div>
      </div>
    </div>

    <div class="w-100 mb-2 border-bottom"></div>

    <div class="divTable p-0" ref="carga">
      <table class="table main-table table-hover border table-sm">
        <thead class="thead-light">
          <tr>
            <div
              style="display: block; overflow: hidden; width: ‭max-contet; height:20px !important"
              class="sticky"
            >
              <th scope="col">
                <p
                  class="p-header clickable-header"
                  style="width: 80px;"
                  @click="toggleOrderCodigo()"
                  title="Clique para ordenar por código"
                >
                  Cód.
                  <i
                    v-if="ordenacao=='codigo'"
                    style="font-size:0.6rem; text-align:right"
                    class="fas fa-arrow-down fa-sm"
                  ></i>
                </p>
              </th>
              <th scope="col">
                <p
                  class="p-header clickable-header"
                  style="width: 350px"
                  @click="toggleOrderNome()"
                  title="Clique para ordenar por nome"
                >
                  Nome
                  <i
                    v-if="ordenacao=='nome'"
                    style="font-size:0.6rem; text-align:right"
                    class="fas fa-arrow-down fa-sm"
                  ></i>
                </p>
              </th>

              <th scope="col">
                <p
                  class="p-header clickable-header"
                  style="width: 65px"
                  @click="toggleOrderPerfil()"
                  title="Clique para ordenar por nome"
                >
                  Perfil
                  <i
                    v-if="Array.isArray(ordenacao)"
                    style="font-size:0.6rem; text-align:right"
                    class="fas fa-arrow-down fa-sm"
                  ></i>
                </p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 24px">S.</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 24px">T.</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 200px">Docentes</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 180px">Horário</p>
              </th>

              <th scope="col" v-if="semestreAtual===1" title="Vagas do 1º semestre">
                <p class="p-header" style="width: 70px">Vagas</p>
              </th>
              <th scope="col" v-if="semestreAtual===2" title="Vagas do 2º semestre">
                <p class="p-header" style="width: 70px">Vagas</p>
              </th>
              <th scope="col" v-if="semestreAtual===3" title="Vagas do 1º e 2º semestre">
                <p class="p-header" style="width: 70px">Vagas</p>
              </th>
            </div>
          </tr>
        </thead>
        <tbody>
          <template v-if="Disciplinas.length > 0">
            <template v-for="disciplina in DisciplinasAtivados">
              <template v-if="turmas(disciplina, semestreAtual).length > 0">
                <tr class="disc-tr" :key="disciplina.codigo">
                  <div style="width: ‭max-contet;">
                    <td>
                      <p style="width: 80px">{{disciplina.codigo}}</p>
                    </td>
                    <td>
                      <p style="width: 350px;">{{disciplina.nome}}</p>
                    </td>
                    <td>
                      <p style="width: 65px;">{{perfil(disciplina)}}</p>
                    </td>
                    <td>
                      <p style="width: 428px"></p>
                    </td>
                    <td v-if="semestreAtual==1">
                      <p style="width: 70px">{{vagasDisciplina(disciplina, 1)}}</p>
                    </td>
                    <td v-if="semestreAtual==2">
                      <p style="width: 70px">{{vagasDisciplina(disciplina, 2)}}</p>
                    </td>
                    <td v-if="semestreAtual==3">
                      <p
                        style="width: 70px"
                      >{{vagasDisciplina(disciplina, 2) + vagasDisciplina(disciplina, 1)}}</p>
                    </td>
                  </div>
                </tr>
              </template>

              <template v-for="turma in turmas(disciplina, semestreAtual)">
                <tr :key="'turma-id:'+turma.id">
                  <template>
                    <div class="linhas" style="width: ‭858px;">
                      <td>
                        <p style="width: 80px"></p>
                      </td>
                      <td>
                        <p style="width: 350px"></p>
                      </td>
                      <td>
                        <p style="width: 65px"></p>
                      </td>
                      <td>
                        <p style="width: 24px">{{turma.periodo}}</p>
                      </td>
                      <td>
                        <p style="width: 24px">{{turma.letra}}</p>
                      </td>
                      <td>
                        <p style="width: 200px;">{{docentes(turma)}}</p>
                      </td>

                      <td>
                        <div style="width: 180px">
                          <template v-for="horario in Horarios">
                            <p :key="horario.id" v-if="horario.id===turma.Horario1">
                              {{horario.horario}}
                              <template v-for="horario in Horarios">
                                <span
                                  :key="horario.id"
                                  v-if="horario.id===turma.Horario2"
                                >/ {{horario.horario}}</span>
                              </template>
                            </p>
                          </template>
                        </div>
                      </td>
                      <td v-if="semestreAtual==1" v-on:click="selecionaTurma(turma)">
                        <p
                          v-if="turma.periodo == 1 || turma.periodo == 2"
                          style="width: 70px;"
                        >{{vagasTurma(turma, 1)}}</p>
                      </td>
                      <td v-if="semestreAtual==2" v-on:click="selecionaTurma(turma)">
                        <p
                          v-if="turma.periodo == 3 || turma.periodo == 4"
                          style="width: 70px;"
                        >{{vagasTurma(turma, 2)}}</p>
                      </td>
                      <td v-if="semestreAtual==3" v-on:click="selecionaTurma(turma)">
                        <p
                          v-if="turma.periodo == 1 || turma.periodo == 2"
                          style="width: 70px;"
                        >{{vagasTurma(turma, 1)}}</p>
                        <p v-else style="width: 70px;">{{vagasTurma(turma, 2)}}</p>
                      </td>
                    </div>
                  </template>
                </tr>
              </template>
            </template>
          </template>
          <template v-else>
            <tr>
              <td colspan="2" class="text-center">
                <i class="fas fa-exclamation-triangle"></i> Nenhuma Disciplina encontrado!
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <b-modal
      id="modalSemestre"
      ref="modalSemestre"
      size="md"
      title="Selecione os semestres"
      scrollable
    >
      <div class="col m-0 p-0" style="width:max-content;heigth:max-content;">
        <table
          class="table table-bordered table-sm modal-table"
          style="max-height: 392px !important;"
        >
          <thead class="thead-light">
            <tr>
              <div
                style="width: max-content; height: 18px !important; font-size: 11px!important"
                class="sticky"
              >
                <th>
                  <p style="width:25px" class="p-header"></p>
                </th>
                <th>
                  <p
                    class="p-header clickable-header"
                    style="width: 435px; text-align: start;"
                  >Semestre Letivo</p>
                </th>
              </div>
            </tr>
          </thead>
          <tbody>
            <tr>
              <div style="width: max-content">
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
                  <p style="width:435px; text-align:start">Primeiro semestre</p>
                </td>
              </div>
            </tr>
            <tr>
              <div style="width: max-content">
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
                  <p style="width:435px; text-align:start">Segundo semestre</p>
                </td>
              </div>
            </tr>
          </tbody>
        </table>
      </div>

      <div slot="modal-footer" class="w-100 m-0" style="display: flex;">
        <div class="w-100 ml-2">
          <b-button
            class="btn-azul btn-df mr-2"
            variant="success"
            @click="selectAllSemestre()"
          >Selecionar Todos</b-button>
          <b-button
            class="btn-cinza btn-df mr-2"
            variant="secondary"
            @click="selectNoneSemestre()"
          >Desmarcar Todos</b-button>
        </div>
        <b-button
          variant="success"
          @click="btnOKSemestre()"
          class="btn-verde btn-df mr-2"
          style="padding-right:15px!important; padding-left:15px!important;"
        >OK</b-button>
      </div>
    </b-modal>

    <!-- MODAL DE AJUDA -->
    <b-modal id="modalAjuda" ref="ajudaModal" scrollable title="Ajuda">
      <div class="modal-body">
        <ul class="listas list-group">
          <li class="list-group-item">
            <strong>Para exibir conteúdo na Tabela:</strong> Clique em Disciplinas
            <i class="fas fa-list-ul cancelbtn px-1" style="font-size: 12px"></i>
            e selecione a(s) disciplina(s) que deseja
            ver, em seguida confirme em OK. Caso queira ver todas basta clicar em Selecionar Todos.
          </li>
          <li class="list-group-item">
            <strong>Para gerar relatório:</strong> Clique no botão Relatório
            <i
              class="far fa-file-alt relatbtn px-1"
              style="font-size: 12px"
            ></i>
            e aguarde para fazer
            <font style="font-style:italic;">download</font> do mesmo.
          </li>
          <li class="list-group-item">
            <strong>Para alterar ordenação:</strong> Clique em Cod. no cabeçalho da tabela para ordenar por código, ou em Nome para ordenar por ordem alfabética.
          </li>
        </ul>
      </div>

      <div slot="modal-footer" style="display: none"></div>
    </b-modal>
    <!-- Modals do botão para escolher disciplinas -->
    <b-modal
      id="modalDisciplinas"
      ref="DisciplinasModal"
      scrollable
      size="lg"
      title="Selecione as disciplinas"
    >
      <div class="col m-0 p-0" style="width:max-content;">
        <table
          class="table table-sm modal-table table-bordered"
          style="max-height: 450px !important;"
        >
          <thead class="thead-light">
            <tr>
              <div
                style="width: max-content; height: 18px !important; font-size: 11px!important"
                class="sticky"
              >
                <th>
                  <p style="width:25px" class="p-header"></p>
                </th>
                <th>
                  <p
                    class="p-header clickable-header"
                    style="width: 100px; text-align: start;"
                    @click="toggleOrderCodigo()"
                    title="Clique para ordenar por código"
                  >
                    Cód.
                    <i
                      v-if="ordenacao=='codigo'"
                      style="font-size:0.6rem; text-align:right"
                      class="fas fa-arrow-down fa-sm"
                    ></i>
                  </p>
                </th>
                <th>
                  <p
                    class="p-header clickable-header"
                    style="width: 428px; text-align: start;"
                    @click="toggleOrderNome()"
                    title="Clique para ordenar por nome"
                  >
                    Nome
                    <i
                      v-if="ordenacao=='nome'"
                      style="font-size:0.6rem; text-align:right"
                      class="fas fa-arrow-down fa-sm"
                    ></i>
                  </p>
                </th>

                <th>
                  <p
                    class="p-header clickable-header"
                    style="width: 190px; text-align: start;"
                    @click="toggleOrderPerfil()"
                    title="Clique para ordenar por nome"
                  >
                    Perfil
                    <i
                      v-if="Array.isArray(ordenacao)"
                      style="font-size:0.6rem; text-align:right"
                      class="fas fa-arrow-down fa-sm"
                    ></i>
                  </p>
                </th>
              </div>
            </tr>
          </thead>

          <tbody>
            <tr v-for="disciplina in Disciplinas" :key="`disciplina${disciplina.id}`">
              <div style="width: max-content">
                <td>
                  <div style="width: 25px; height: inherit;" class="px-1">
                    <input
                      type="checkbox"
                      class="form-check-input position-static m-0"
                      v-model="DisciplinasSelecionados"
                      :value="disciplina"
                    />
                  </div>
                </td>
                <td>
                  <p style="width:100px; text-align:start">{{disciplina.codigo}}</p>
                </td>
                <td>
                  <p style="width:428px; text-align:start">{{disciplina.nome}}</p>
                </td>
                <td>
                  <p style="width:190px; text-align:start">{{perfil(disciplina)}}</p>
                </td>
              </div>
            </tr>
          </tbody>
        </table>
      </div>

      <div slot="modal-footer" class="w-100 m-0" style="display: flex;">
        <div class="row ml-0 w-100">
          <b-button
            class="btn-azul btn-df mr-2"
            variant="success"
            @click="selectAll()"
          >Selecionar Todos</b-button>
          <b-button
            class="btn-cinza btn-df mr-2"
            variant="secondary"
            @click="selectNone()"
          >Desmarcar Todos</b-button>
        </div>
        <b-button
          variant="success"
          @click="btnOK()"
          class="btn-verde btn-df mr-2"
          style="padding-right:15px!important; padding-left:15px!important;"
        >OK</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import _ from "lodash";
import pdfs from "../../common/services/pdfs";
export default {
  name: "DashboardRelatorioDisciplinas",

  data() {
    return {
      ordenacao: "codigo",
      DisciplinasSelecionados: [],
      DisciplinasAtivados: [],
      semestre_1Ativo: true,
      semestre_2Ativo: true,
      semestreAtual: 3,
      turmaSelecionada: undefined
    };
  },

  methods: {
    pdf() {
      pdfs.pdfRelatorioDisciplinas();
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
      this.$refs.modalSemestre.hide();
    },
    selectAllSemestre() {
      this.semestre_1Ativo = true;
      this.semestre_2Ativo = true;
    },
    selectNoneSemestre() {
      this.semestre_1Ativo = false;
      this.semestre_2Ativo = false;
    },
    btnOK() {
      //Somente atualiza o vetor de perfis ativados quando o botão OK for clickado
      this.DisciplinasAtivados = [
        ..._.orderBy(this.DisciplinasSelecionados, this.ordenacao)
      ];
      this.$refs.DisciplinasModal.hide();
    },

    selectAll() {
      if (this.DisciplinasSelecionados != []) this.DisciplinasSelecionados = [];
      for (var i = 0; i < this.$store.state.disciplina.Disciplinas.length; i++)
        this.DisciplinasSelecionados.push(
          this.$store.state.disciplina.Disciplinas[i]
        );
    },

    selectNone() {
      this.DisciplinasSelecionados = [];
    },

    toggleOrderNome() {
      this.DisciplinasAtivados = _.orderBy(this.DisciplinasAtivados, "nome");
      this.ordenacao = "nome";
    },
    toggleOrderCodigo() {
      this.DisciplinasAtivados = _.orderBy(this.DisciplinasAtivados, "codigo");
      this.ordenacao = "codigo";
    },
    toggleOrderPerfil() {
      this.DisciplinasAtivados = _.orderBy(this.DisciplinasAtivados, [
        "Perfil",
        "codigo"
      ]);
      this.ordenacao = ["Perfil", "codigo"];
    },

    vagasTurma(turma, semestre) {
      if (
        (semestre === 1 && (turma.periodo == 3 || turma.periodo == 4)) ||
        (semestre === 2 && (turma.periodo == 1 || turma.periodo == 2))
      )
        return 0;
      let pedidos = this.$store.state.pedido.Pedidos[turma.id];
      let vagasP = 0;
      let vagasNP = 0;
      pedidos.forEach(p => {
        vagasP += p.vagasPeriodizadas;
        vagasNP += p.vagasNaoPeriodizadas;
      });
      return vagasP + vagasNP;
    },

    vagasDisciplina(disciplina, semestre) {
      let turmas = _.filter(this.$store.state.turma.Turmas, {
        Disciplina: disciplina.id
      });
      let vagas = 0;
      turmas.forEach(t => {
        vagas += this.vagasTurma(t, semestre);
      });
      return vagas;
    },

    perfil(disciplina) {
      let perfil = _.find(this.$store.state.perfil.Perfis, {
        id: disciplina.Perfil
      });
      return perfil.abreviacao;
    },

    turmas(disciplina, semestre) {
      return _.orderBy(
        _.filter(this.$store.state.turma.Turmas, turma => {
          return (
            turma.Disciplina === disciplina.id &&
            (semestre === 1
              ? turma.periodo === 1 || turma.periodo === 2
              : semestre === 2
              ? turma.periodo === 3 || turma.periodo === 4
              : true)
          );
        }),
        ["periodo", "letra"]
      );
    },

    docentes(turma) {
      let d1 = _.find(this.$store.state.docente.Docentes, {
        id: turma.Docente1
      });
      let d2 = _.find(this.$store.state.docente.Docentes, {
        id: turma.Docente2
      });
      if (d1 === undefined && d2 === undefined) {
        return "";
      } else if (d2 === undefined) {
        return `${d1.apelido}`;
      } else if (d1 === undefined) {
        return `${d2.apelido}`;
      } else {
        return `${d1.apelido} / ${d2.apelido}`;
      }
    },

    selecionaTurma(turma) {
      this.turmaSelecionada = turma;
      for (let i = 0; i < this.VagasTurmaSelecionada.length; i++) {
        console.log({
          nome: this.curso(this.VagasTurmaSelecionada[i]).nome,
          codigo: this.curso(this.VagasTurmaSelecionada[i]).codigo,
          vagasPeriodizadas: this.VagasTurmaSelecionada[i].vagasPeriodizadas,
          vagasNaoPeriodizadas: this.VagasTurmaSelecionada[i]
            .vagasNaoPeriodizadas
        });
      }
    },

    curso(pedido) {
      return _.find(this.$store.state.curso.Cursos, { id: pedido.Curso });
    }
  },

  computed: {
    Disciplinas() {
      return _.orderBy(
        _.filter(this.$store.state.disciplina.Disciplinas, function(d) {
          return d.Perfil !== 13 && d.Perfil !== 15;
        }),
        this.ordenacao
      );
    },

    VagasTurmaSelecionada() {
      return _.filter(
        this.$store.state.pedido.Pedidos[this.turmaSelecionada.id],
        function(p) {
          return p.vagasPeriodizadas > 0 || p.vagasNaoPeriodizadas > 0;
        }
      );
    },

    Horarios() {
      return this.$store.state.horario.Horarios;
    }
  }
};
</script>

<style scoped>
/* prefixed */

.DashboardRelatorioDisciplinas {
  max-width: 100%;
  overflow: hidden;
  margin: 0;
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
.main-table {
  display: block;
  overflow-y: auto;
  height: -webkit-calc(100vh - 100px);
  height: -moz-calc(100vh - 100px);
  height: calc(100vh - 100px);
  font-size: 11px;
  background-color: white;
  margin: 0;
}
.main-table .p-header {
  padding: 0px 5px 0px 5px !important;
  margin: 0 !important;
  text-align: center;
  height: 18px !important;
}
.main-table tbody {
  max-height: 100%;
  width: 100%;
}
.main-table td {
  text-align: center;
  vertical-align: middle !important;
  padding: 0 !important;
  margin: 0 !important;
  height: 18px !important;
}
.main-table p {
  margin: 0 !important;
  text-align: center;
  padding-right: 5px !important;
  padding-left: 5px !important;
}
.main-table tr thead {
  display: block;
}
.main-table thead th {
  padding: 0 !important;
  text-align: center;
  height: 18px !important;
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
.titulo {
  font-size: 25px;
  font-weight: normal;
  padding-left: 0;
  margin: 0 !important;
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
/* texto maiusculo */
.toUpperCase {
  text-transform: uppercase;
}
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
.relatbtn {
  background-color: white;
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

.disc-tr {
  background-color: rgba(0, 0, 0, 0.089);
  color: black;
}
.clickable-header:hover {
  cursor: pointer;
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

i.fas,
i.far {
  font-size: 25px;
}

.cancelbtn {
  background-color: white;
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
/* Formularios no topo da tela */
.form-inline .input-group,
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
@media screen and (max-width: 378px) {
  .div-titulo {
    height: 70px !important;
  }
}

/* ==== MODAL TABLE ==== */
.modal-table {
  display: block !important;
  overflow: auto !important;
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
  border-bottom: 0 !important;
  border-top: 0 !important;
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
  border-bottom: 0;
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
}
/* FIM MODAL TABLE */
</style>