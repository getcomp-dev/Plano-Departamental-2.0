<template>
  <div class="TurmasExternas row pr-2" v-if="Admin">
    <!-- Titulo -->
    <div
      class="div-titulo col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0"
      style="height: 38px;"
    >
      <div class="form-inline col-12 pl-0 mb-1 pr-1">
        <h1 class="titulo col-xl-2 col-md-3 col-sm-4 col-5 px-0 pr-1">
          Tabela Externa
        </h1>

        <div
          class="form-group col-xl-10 col-md-9 col-sm-8 col-7 mb-0 p-0"
          style="justify-content: flex-end !important;"
        >
          <b-button v-b-modal.modalFiltros title="Filtros" class="cancelbtn">
            <i class="fas fa-list-ul"></i>
          </b-button>

          <div class="d-flex p-0 m-0">
            <template v-if="isAdd">
              <button
                type="button"
                title="Salvar"
                class="addbtn"
                v-on:click.prevent="addTurma"
              >
                <i class="fas fa-check"></i>
              </button>
              <button
                type="button"
                title="Cancelar"
                class="cancelbtn"
                v-on:click.prevent="toggleAdd"
              >
                <i class="fas fa-times"></i>
              </button>
            </template>

            <template v-else>
              <button
                type="button"
                title="Adicionar"
                class="addbtn"
                v-on:click.prevent="toggleAdd"
              >
                <i class="fas fa-plus"></i>
              </button>
              <button
                type="button"
                title="Deletar"
                class="delbtn"
                style
                v-b-modal.modalConfirma
              >
                <i class="far fa-trash-alt"></i>
              </button>
            </template>
            <b-button v-b-modal.modalAjuda title="Ajuda" class="relatbtn">
              <i class="fas fa-question"></i>
            </b-button>
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
      <table class="main-table table table-sm table-hover table-bordered">
        <thead class="thead-light sticky">
          <tr>
            <div class="max-content">
              <th scope="col">
                <p style="width: 25px;"></p>
              </th>
              <th scope="col">
                <p
                  class="p-header"
                  style="width: 40px !important;"
                  title="Semestre"
                >
                  S.
                </p>
              </th>
              <th scope="col">
                <p
                  class="p-header"
                  style="width: 70px !important;"
                  title="Código"
                >
                  Cód.
                </p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 330px !important;">
                  Disciplina
                </p>
              </th>
              <th scope="col">
                <p
                  class="p-header"
                  style="width: 18px !important;"
                  title="Créditos"
                >
                  C.
                </p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 40px !important;">Turma</p>
              </th>
              <th scope="col">
                <p
                  class="p-header"
                  style="width: 68px !important;"
                  title="Total de vagas"
                >
                  Turno
                </p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 72px !important;">Horário</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 98px !important;">Sala</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 40px !important;">Total</p>
              </th>
              <template v-for="curso in Cursos">
                <th
                  scope="col"
                  :key="'1-curso-id' + curso.id"
                  :id="'curso' + curso.id"
                >
                  <p class="p-header" style="width: 32px !important;">
                    {{ curso.codigo }}
                  </p>

                  <b-popover
                    :key="'2-curso-id' + curso.id"
                    :target="'curso' + curso.id"
                    placement="bottom"
                    triggers="hover focus"
                  >
                    <p
                      style="text-align: center; font-size: 11px !important;"
                      class="p-0 m-0"
                      v-if="
                        curso.semestreInicial == 1 || curso.semestreInicial == 3
                      "
                    >
                      1º - {{ curso.alunosEntrada }}
                    </p>
                    <p
                      style="text-align: center; font-size: 11px !important;"
                      class="p-0 m-0"
                      v-if="
                        curso.semestreInicial == 2 || curso.semestreInicial == 3
                      "
                    >
                      2º - {{ curso.alunosEntrada2 }}
                    </p>

                    <p
                      style="text-align: center; font-size: 11px !important;"
                      class="p-0 m-0"
                    >
                      <b>{{ curso.nome }}</b>
                    </p>
                  </b-popover>
                </th>
              </template>
            </div>
          </tr>
        </thead>

        <tbody>
          <!-- Adição de turma-->
          <template v-if="isAdd">
            <tr class="stickyAdd">
              <div
                class="max-content"
                style="font-size: 11px; background-color: #e9e9e9;"
              >
                <td>
                  <div style="width: 25px !important;"></div>
                </td>
                <td>
                  <div style="width: 40px !important;">
                    <select
                      id="2periodo"
                      style="width: 35px;"
                      v-model="turmaForm.periodo"
                    >
                      <option value="1">1</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                </td>
                <td>
                  <div style="width: 70px;">
                    <select
                      type="text"
                      style="width: 65px;"
                      id="disciplina"
                      v-model="turmaForm.Disciplina"
                    >
                      <option
                        v-if="DisciplinasCod.length === 0"
                        type="text"
                        value
                        >Nenhuma Disciplina Encontrada</option
                      >
                      <option
                        v-for="disciplina in DisciplinasCod"
                        :key="'1-disciplina-id' + disciplina.id"
                        :value="disciplina.id"
                        >{{ disciplina.codigo }}</option
                      >
                    </select>
                  </div>
                </td>
                <td>
                  <div style="width: 330px;">
                    <select
                      type="text"
                      style="width: 325px;"
                      id="disciplina"
                      v-model="turmaForm.Disciplina"
                    >
                      <option v-if="Disciplinas.length === 0" type="text" value
                        >Nenhuma Disciplina Encontrada</option
                      >
                      <option
                        v-for="disciplina in Disciplinas"
                        :key="'2-disciplina-id' + disciplina.id"
                        :value="disciplina.id"
                        >{{ disciplina.nome }}</option
                      >
                    </select>
                  </div>
                </td>
                <td>
                  <div style="width: 18px;">
                    <p style="width: 18px;">
                      <template v-for="disciplina in Disciplinas">
                        <template
                          v-if="disciplina.id === turmaForm.Disciplina"
                          >{{
                            disciplina.cargaPratica + disciplina.cargaTeorica
                          }}</template
                        >
                      </template>
                    </p>
                  </div>
                </td>
                <td>
                  <div style="width: 40px;">
                    <input
                      type="text"
                      style="width: 20px;"
                      id="turma"
                      v-model="turmaForm.letra"
                    />
                  </div>
                </td>
                <td>
                  <div style="width: 68px;">
                    <select
                      type="text"
                      style="width: 63px; text-align: center;"
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
                      <option v-if="Horarios.length === 0" type="text" value
                        >Nenhum Horário Encontrado</option
                      >
                      <option
                        v-for="horario in Horarios"
                        :key="'1-horario-id' + horario.id"
                        :value="horario.id"
                        >{{ horario.horario }}</option
                      >
                    </select>
                    <select
                      type="text"
                      style="width: 67px;"
                      id="horario2"
                      v-model="turmaForm.Horario2"
                      v-on:change="adjustTurno2"
                    >
                      <option v-if="Horarios.length === 0" type="text" value
                        >Nenhum Horário Encontrado</option
                      >
                      <option
                        v-for="horario in Horarios"
                        :key="'2-horario-id' + horario.id"
                        :value="horario.id"
                        >{{ horario.horario }}</option
                      >
                    </select>
                  </div>
                </td>
                <td>
                  <div style="width: 98px;">
                    <select
                      type="text"
                      style="
                        width: 93px;
                        text-align: center;
                        margin-bottom: 1px;
                      "
                      id="sala1"
                      v-model="turmaForm.Sala1"
                    >
                      <option v-if="Salas.length === 0" type="text" value
                        >Nenhuma Sala Encontrada</option
                      >
                      <option
                        v-for="sala in Salas"
                        :key="'1-sala-id' + sala.id"
                        :value="sala.id"
                        >{{ sala.nome }}</option
                      >
                    </select>
                    <select
                      type="text"
                      style="width: 93px;"
                      id="sala2"
                      v-model="turmaForm.Sala2"
                    >
                      <option v-if="Salas.length === 0" type="text" value
                        >Nenhuma Sala Encontrada</option
                      >
                      <option
                        v-for="sala in Salas"
                        :key="'2-sala-id' + sala.id"
                        :value="sala.id"
                        >{{ sala.nome }}</option
                      >
                    </select>
                  </div>
                </td>
                <td><div style="width: 40px;"></div></td>
                <td v-for="n in 4" :key="n">
                  <div style="width: 32px;"></div>
                </td>
              </div>
            </tr>
          </template>
          <!--FINAL ADIÇÃO DE TURMA-->

          <!-- LINHAS DA TABELA -->
          <template v-if="Turmas.length > 0">
            <template v-for="perfil in Perfis">
              <template v-for="disciplina in DisciplinasCod">
                <tr
                  v-for="turma in inPerfil(perfil, Turmas, Disciplinas)"
                  v-if="turma.Disciplina === disciplina.id"
                  :key="'1-tr-' + perfil + turma.id + disciplina"
                  :class="cor_perfil(perfil.id)"
                >
                  <template
                    v-if="
                      turma.periodo == 1 &&
                        (semestreAtual == 1 || semestreAtual == 3)
                    "
                  >
                    <turmadata
                      v-bind:turma="turma"
                      v-bind:perfil="perfil"
                    ></turmadata>
                  </template>
                </tr>
              </template>
            </template>

            <template v-for="perfil in Perfis">
              <template v-for="disciplina in DisciplinasCod">
                <tr
                  v-for="turma in inPerfil(perfil, Turmas, Disciplinas)"
                  v-if="turma.Disciplina === disciplina.id"
                  :key="'2-tr-' + perfil + turma.id + disciplina"
                  v-bind:class="{
                    basico: perfil.id == 1,
                    avancado: perfil.id == 2,
                    arqso: perfil.id == 3,
                    bancosdedados: perfil.id == 4,
                    computacaografica: perfil.id == 5,
                    engenhariasoftware: perfil.id == 6,
                    iaic: perfil.id == 7,
                    numoc: perfil.id == 8,
                    redes: perfil.id == 9,
                    teoria: perfil.id == 10,
                    humempre: perfil.id == 11,
                    multi: perfil.id == 12,
                    ice: perfil.id == 13,
                  }"
                >
                  <template
                    v-if="
                      turma.periodo == 3 &&
                        (semestreAtual == 2 || semestreAtual == 3)
                    "
                  >
                    <turmadata
                      v-bind:turma="turma"
                      v-bind:perfil="perfil"
                    ></turmadata>
                  </template>
                </tr>
              </template>
            </template>
          </template>
        </tbody>
      </table>
    </div>

    <!-- MODAL CONFIRMA -->
    <b-modal id="modalConfirma" title="Confirmar Seleção" @ok="deleteSelected">
      <p class="my-4">Tem certeza que deseja deletar as turmas selecionadas?</p>
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
    </b-modal>
    <!-- MODAL AJUDA -->
    <b-modal id="modalAjuda" ref="ajudaModal" scrollable title="Ajuda">
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
    <!-- MODAL SEMESTRE -->
    <b-modal id="modalFiltros" ref="modalFiltros" scrollable title="Filtros">
      <div class="p-0 m-0" style="height: 30px; width: 465px;">
        <ul
          class="nav nav-tabs card-header-tabs m-0"
          style="font-size: 11px !important; height: 30px;"
        >
          <li class="nav-item">
            <a class="nav-link border clickable active">Semestre</a>
          </li>
        </ul>
      </div>
      <div
        class="col m-0 p-0"
        style="width: max-content; height: 450px !important;"
      >
        <!-- TABLE SEMESTRE -->
        <table
          class="table table-bordered table-sm modal-table"
          style="max-height: 392px !important;"
        >
          <thead class="thead-light">
            <tr>
              <div
                style="
                  width: max-content;
                  height: 18px !important;
                  font-size: 11px !important;
                "
                class="sticky"
              >
                <th>
                  <p style="width: 25px;" class="p-header"></p>
                </th>
                <th>
                  <p
                    class="p-header clickable-header"
                    style="width: 435px; text-align: start;"
                  >
                    Semestre Letivo
                  </p>
                </th>
              </div>
            </tr>
          </thead>

          <tbody>
            <tr>
              <div style="width: max-content;">
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
        <div class="w-100 ml-2">
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
        </div>
        <b-button
          variant="success"
          @click="btnOKSemestre()"
          class="btn-verde btn-df mr-2"
          style="padding-right: 15px !important; padding-left: 15px !important;"
          >OK</b-button
        >
      </div>
    </b-modal>
  </div>
</template>

<script>
import _ from "lodash";
import turmaExternaService from "@/common/services/turmaExterna";
import pedidoExternoService from "@/common/services/pedidoExterno";
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
  Sala2: undefined,
};
const emptyPedido = {
  vagasPeriodizadas: 0,
  vagasNaoPeriodizadas: 0,
  Curso: undefined,
  Turma: undefined,
};
export default {
  name: "DashboardTurmasExternas",
  data() {
    return {
      turmaForm: _.clone(emptyTurma),
      error: undefined,
      isAdd: false,
      semestre: 1,
      semestre_1Ativo: true,
      semestre_2Ativo: true,
      semestreAtual: 3,
    };
  },
  components: {
    turmadata,
  },
  /*
    mounted () {
      this.$store.commit('emptyDelete')
      console.log(this.$store.state.turma.Deletar)
      this.$store.commit(COMPONENT_LOADED)
        },
        */
  methods: {
    cor_perfil(id) {
      let perfil;
      switch (id) {
        case 1:
          perfil = "basico";
          break;
        case 2:
          perfil = "avancado";
          break;
        case 3:
          perfil = "arqso";
          break;
        case 4:
          perfil = "bancosdedados";
          break;
        case 5:
          perfil = "computacaografica";
          break;
        case 6:
          perfil = "engenhariasoftware";
          break;
        case 7:
          perfil = "iaic";
        case 8:
          perfil = "numoc";
        case 9:
          perfil = "redes";
        case 10:
          perfil = "teoria";
        case 11:
          perfil = "humempre";
        case 12:
          perfil = "multi";
          break;
        case 13:
          perfil = "ice";
          break;
      }
      return perfil;
    },
    btnOKSemestre() {
      if (this.semestre_1Ativo && !this.semestre_2Ativo) {
        this.semestreAtual = 1;
      } else if (this.semestre_2Ativo && !this.semestre_1Ativo) {
        this.semestreAtual = 2;
      } else if (this.semestre_1Ativo && this.semestre_1Ativo) {
        this.semestreAtual = 3;
      } else {
        this.semestreAtual = 3;
      }
      this.$refs.modalFiltros.hide();
    },
    selectAllSemestre() {
      this.semestre_1Ativo = true;
      this.semestre_2Ativo = true;
    },
    selectNoneSemestre() {
      this.semestre_1Ativo = false;
      this.semestre_2Ativo = false;
    },
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
      }
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
    inPerfil: function(perfil, turmas, disciplinas, discip) {
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
        .then((response) => {
          this.semestre = response.Turma.periodo;
          for (var i = 0; i < 4; i++) {
            var pedido = _.clone(emptyPedido);
            pedido.Curso = this.$store.state.curso.Cursos[i].id;
            pedido.Turma = response.Turma.id;
            pedidoExternoService
              .create(pedido)
              .then((response) => {
                // console.log(response.Pedido);
              })
              .catch((error) => {
                // console.log("erro ao criar pedido: " + error);
              });
          }
          this.cleanTurma();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Turma ${response.Turma.letra} foi criada!`,
            type: "success",
          });
        })
        .catch((error) => {
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
    cleanTurma() {
      this.turmaForm = _.clone(emptyTurma);
      this.turmaForm.periodo = this.semestre;
      this.turmaForm.letra = "A";
      this.error = undefined;
    },
    toggleAdd() {
      this.cleanTurma();
      this.isAdd = !this.isAdd;
    },
  },
  computed: {
    Cursos() {
      return _.slice(this.$store.state.curso.Cursos, 0, 4);
    },
    Disciplinas() {
      return _.orderBy(
        _.filter(this.$store.state.disciplina.Disciplinas, function(d) {
          return d.Perfil == 13 || d.Perfil == 15;
        }),
        "nome"
      );
    },
    DisciplinasCod() {
      return _.orderBy(
        _.filter(this.$store.state.disciplina.Disciplinas, function(d) {
          return d.Perfil == 13 || d.Perfil == 15;
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
    },
  },
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
  font-size: 25px !important;
  font-weight: normal !important;
  padding-left: 0 !important;
  margin: 0 !important;
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
.p-header {
  text-align: center;
  height: 18px;
}
.main-table p {
  margin: 0 !important;
  padding: 0 5px 0 5px !important;
  font-size: 11px !important;
  text-align: center;
}
.main-table tbody {
  max-height: 100%;
  width: 100%;
}
.main-table tr thead {
  display: block;
}
.main-table thead th {
  padding: 0 !important;
  font-size: 14px;
  text-align: center;
  height: 18px !important;
}
.main-table td {
  text-align: center;
  vertical-align: middle;
  padding: 0;
  height: 40px;
}

.main-table select {
  height: 18px;
}
.main-table input[type="text"] {
  margin-left: 0 !important;
  margin-top: 4px !important;
  margin-bottom: auto !important;
  height: 18px;
  width: 18px;
  text-align: center !important;
}
.main-table input[type="checkbox"] {
  margin-left: 0 !important;
  margin-top: 4px !important;
  margin-bottom: auto !important;
  height: 15px;
  width: 15px;
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

/* APENAS NO FIREFOX */
@-moz-document url-prefix() {
  .main-table select {
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
  .main-table input {
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
.form-inline {
  width: auto;
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
  margin: 0 !important;
  margin-top: 4px !important;
}
.active {
  background-color: #e9ecef !important;
  color: #495057 !important;
  cursor: default;
}
.max-content {
  width: -webkit-max-content !important;
  width: -moz-max-content !important;
  width: max-content !important;
}

/* FIM MODAL TABLE */
@media screen and (max-width: 429px) {
  .div-titulo {
    height: 70px !important;
  }
}
</style>
