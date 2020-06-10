<template>
  <div id="ModalEditTurma" class="modal-turma">
    <div class="form-container row m-0 p-0 w-100">
      <!-- Disciplina e Codigo -->
      <div class="form-row w-100">
        <div class="form-group col">
          <label for="SelectDisciplinaName">Disciplina:</label>
          <select
            type="text"
            style="width:260px"
            id="SelectDisciplinaName"
            class="form-control"
            v-model="turmaForm.Disciplina"
            @change="handleChangeDisciplina()"
          >
            <option v-if="Disciplinas.length === 0" type="text" value
              >Nenhuma Disciplina Encontrada</option
            >
            <option
              v-for="disciplina in Disciplinas"
              :key="'2-' + disciplina.id"
              :value="disciplina.id"
              >{{ disciplina.nome }}</option
            >
          </select>
        </div>
        <div class="form-group col-4">
          <label for="SelectDisciplinaCodigo">Código:</label>
          <select
            type="text"
            style="width: 120px;"
            id="SelectDisciplinaCodigo"
            class="form-control"
            v-model="turmaForm.Disciplina"
            @change="handleChangeDisciplina()"
          >
            <option v-if="DisciplinasOrederByCod.length === 0" type="text" value
              >Nenhuma Disciplina Encontrada</option
            >
            <option
              v-for="disciplina in DisciplinasOrederByCod"
              :key="'1-' + disciplina.id"
              :value="disciplina.id"
              >{{ disciplina.codigo }}</option
            >
          </select>
        </div>
        <!-- Creditos -->
        <!-- <div class="form-group col">
          <label for="SelectDisciplinaName"> Créditos:</label>
          <input
            type="text"
            class="form-control"
            disabled
            style="width:50px; text-align:center"
            :value="CreditosDaDisciplina"
          />
        </div> -->
      </div>
      <!-- Semestre, Turma e Creditos -->
      <div class="form-row w-100">
        <div class="form-group col">
          <label for="selectSemestre">Semestre:</label>
          <select
            type="email"
            class="form-control"
            id="selectSemestre"
            v-model="turmaForm.periodo"
            style="width:60px"
            v-on:change="checkHorariosPeriodo()"
          >
            <option value="1">1</option>
            <option value="3">3</option>
          </select>
        </div>
        <div class="form-group col">
          <label for="inputLetra">Turma:</label>
          <input
            type="text"
            class="form-control"
            id="inputLetra"
            style="text-transform: uppercase;width: 50px; text-align:center "
            v-model="turmaForm.letra"
            @keypress="onlyA_Z"
          />
        </div>
        <div class="form-group col">
          <label for="SelectTurno">Turno:</label>
          <select
            type="text"
            style="width: 90px"
            id="SelectTurno"
            class="form-control"
            v-model="turmaForm.turno1"
          >
            <template v-if="disciplinaIsIntegralEAD">
              <option value="EAD">EAD</option>
            </template>
            <template v-else>
              <option value="Diurno">Diurno</option>
              <option value="Noturno">Noturno</option>
            </template>
          </select>
        </div>
      </div>
      <!-- Docente, Horarios e Salas -->
      <div class="form-row w-100">
        <div class="form-group col">
          <label for="SelectDocente1">Docentes:</label>
          <select
            type="text"
            class="form-control"
            style="width:130px;"
            id="SelectDocente1"
            v-model="turmaForm.Docente1"
            v-on:change="checkDocente(1)"
          >
            <option v-if="Docentes.length === 0" type="text" value=""
              >Nenhum Docente Encontrado</option
            >
            <option v-else type="text" value=""></option>
            <option
              v-for="docente in Docentes"
              :key="'1-docente-id' + docente.id"
              :value="docente.id"
              >{{ docente.apelido }}</option
            >
          </select>
          <select
            type="text"
            class="form-control mt-1"
            style="width:130px;"
            id="docente2"
            v-model="turmaForm.Docente2"
            v-on:change="checkDocente(2)"
          >
            <option v-if="Docentes.length === 0" type="text" value=""
              >Nenhum Docente Encontrado</option
            >
            <option v-else type="text" value=""></option>
            <option
              v-for="docente in Docentes"
              :key="'2-docente-id' + docente.id"
              :value="docente.id"
              >{{ docente.apelido }}</option
            >
          </select>
        </div>

        <div class="form-group col">
          <label for="horario1">Horarios:</label>
          <select
            type="text"
            class="form-control"
            style="width: 100px"
            id="horario1"
            v-model="turmaForm.Horario1"
            @change="checkHorario(1), setTurnoByHorario(1)"
          >
            <option
              v-if="!disciplinaIsIntegralEAD"
              type="text"
              value=""
            ></option>
            <option
              v-for="horario in HorariosFiltredByTurno"
              :key="'1-horario-id' + horario.id"
              :value="horario.id"
              >{{ horario.horario }}</option
            >
          </select>

          <select
            v-if="hasMoreThan4Creditos"
            type="text"
            class="form-control
            mt-1"
            style="width: 100px"
            id="horario2"
            v-model="turmaForm.Horario2"
            @change="checkHorario(2), setTurnoByHorario(2)"
          >
            <template v-if="disciplinaIsParcialEAD">
              <option
                v-for="horario in HorariosEAD"
                :key="'2-horarioEAD-id' + horario.id"
                :value="horario.id"
                >{{ horario.horario }}</option
              >
            </template>
            <template v-else>
              <option
                v-if="!disciplinaIsIntegralEAD"
                type="text"
                value=""
              ></option>
              <option
                v-for="horario in HorariosFiltredByTurno"
                :key="'2-horario-id' + horario.id"
                :value="horario.id"
                >{{ horario.horario }}</option
              >
            </template>
          </select>
        </div>
        <div class="form-group col">
          <template v-if="currentDisciplina && !disciplinaIsIntegralEAD">
            <label for="sala1">Salas:</label>
            <select
              type="text"
              class="form-control mb-1"
              style="width:120px;"
              id="sala1"
              v-model="turmaForm.Sala1"
              v-on:change="checkSala()"
            >
              <option v-if="Salas.length === 0" type="text" value=""
                >Nenhuma Sala Encontrada</option
              >
              <option v-else value=""></option>
              <option
                v-for="sala in Salas"
                :key="'1-sala-id' + sala.id"
                :value="sala.id"
                >{{ sala.nome }}</option
              >
            </select>
            <select
              v-if="hasMoreThan4Creditos && currentDisciplina.ead != 2"
              type="text"
              class="form-control"
              style="width: 120px"
              id="sala2"
              v-model="turmaForm.Sala2"
              v-on:change="checkSala()"
            >
              <option v-if="Salas.length === 0" type="text" value=""
                >Nenhuma Sala Encontrada</option
              >
              <option v-else value=""></option>
              <option
                v-for="sala in Salas"
                :key="'2-sala-id' + sala.id"
                :value="sala.id"
                >{{ sala.nome }}</option
              >
            </select>
          </template>
        </div>
      </div>
      <!-- Botoes -->
      <div class="form-row w-100 m-0 mt-2">
        <b-button
          class="btn-custom btn-modal btn-verde btn-ok-modal"
          @click="editTurma()"
        >
          Salvar
        </b-button>
        <b-button
          class="btn-custom btn-modal btn-cinza btn-ok-modal"
          @click="resetInputsValues()"
        >
          Cancelar
        </b-button>
      </div>
    </div>
    <hr class="my-2 w-100" />
    <!-- TURMA VAGAS -->
    <div class="form-row w-100 my-2 mb-2 mx-0 pr-1">
      <h3 class="modal-title col p-0 m-0">VAGAS</h3>

      <p
        class="col-4 modal-title p-0 m-0 text-right"
        style="font-weight:normal"
      >
        Total: {{ totalPedidos() }}
      </p>
    </div>

    <TableModal :tableHeight="350" :hasSearchBar="true">
      <template #thead-search>
        <input
          type="text"
          class="form-control input-search"
          placeholder="Pesquise nome ou codigo de um curso..."
          v-model="searchCursos"
        />
        <button @click="searchCursos = null" class="btn btn-search">
          &times;
        </button>
      </template>
      <template#thead>
        <th
          @click="toggleOrder(ordemVagas, 'codigo')"
          class="clickable t-start"
          style="width: 50px"
          title="Clique para ordenar por código"
        >
          Cód.
          <i :class="setIconByOrder(ordemVagas, 'codigo')"></i>
        </th>
        <th
          @click="toggleOrder(ordemVagas, 'nome')"
          class="clickable t-start"
          style="width: 320px"
          title="Clique para ordenar por nome"
        >
          Nome
          <i :class="setIconByOrder(ordemVagas, 'nome')"></i>
        </th>

        <th
          @click="toggleOrder(ordemVagas, 'VagasTotais', 'desc')"
          class="clickable"
          style="width: 75px"
          title="Vagas periodizadas / Não periodizadas"
        >
          Vagas
          <i :class="setIconByOrder(ordemVagas, 'VagasTotais')"></i>
        </th>
      </template#thead>
      <template#tbody>
        <tr
          v-for="curso in CursosTableOrdered"
          :key="'vaga' + curso.id + '-CursosVagas'"
        >
          <td style="width: 50px" class="t-start">
            {{ curso.codigo }}
          </td>
          <td style="width: 320px" class="t-start">
            {{ curso.nome }}
          </td>
          <td style="width: 75px">
            <PedidosTableModal
              v-bind:index="curso.indiceVaga"
              v-bind:turma="turma"
            ></PedidosTableModal>
          </td>
        </tr>
      </template#tbody>
    </TableModal>
  </div>
</template>
<script>
import _ from "lodash";
import turmaService from "@/common/services/turma";
import TableModal from "@/components/TableModal.vue";
import PedidosTableModal from "@/components/PedidosTableModal.vue";
import { EventBus } from "@/event-bus.js";

const emptyTurma = {
  id: null,
  periodo: null,
  letra: null,
  turno1: null,
  turno2: null,
  Disciplina: null,
  Docente1: null,
  Docente2: null,
  Horario1: null,
  Horario2: null,
  Sala1: null,
  Sala2: null,
};

export default {
  name: "ModalEditTurma",
  components: { TableModal, PedidosTableModal },
  props: {
    turma: Object,
    editarTurma: Function,
  },
  data() {
    return {
      searchCursos: null,
      ativo: false,
      valorAtual: undefined,
      turmaForm: _.clone(emptyTurma),
      currentData: undefined,
      initialDisciplina: undefined,
      ordemVagas: { order: "VagasTotais", type: "desc" },
    };
  },
  mounted() {
    this.turmaForm = _.clone(this.turma);
    this.currentData = _.clone(this.turmaForm);
    this.initialDisciplina = this.findDisciplinaById(this.turma.Disciplina);
  },
  methods: {
    handleChangeDisciplina() {
      this.setInputValues();
    },
    setInputValues() {
      this.turmaForm.turno1 = null;
      //Se a nova disciplina possui um cadastro ead diferentes da anterior
      if (this.currentDisciplina.ead !== this.initialDisciplina.ead) {
        this.turmaForm.Horario1 = null;
        this.turmaForm.Horario2 = null;
      } else {
        this.turmaForm.turno1 = this.turma.turno1;
        this.turmaForm.Horario1 = this.turma.Horario1;
        this.turmaForm.Horario2 = this.turma.Horario2;
        this.turmaForm.Sala1 = this.turma.Sala1;
        this.turmaForm.Sala2 = this.turma.Sala2;
        this.turmaForm.Docente2 = this.turma.Docente2;
      }

      if (!this.hasMoreThan4Creditos) {
        this.turmaForm.Docente2 = null;
        this.turmaForm.Horario2 = null;
        this.turmaForm.Sala2 = null;
      }

      if (this.disciplinaIsIntegralEAD) {
        this.turmaForm.turno1 = "EAD";
        this.turmaForm.Horario1 = 31;
        this.turmaForm.Horario2 = 31;
        this.turmaForm.Sala1 = null;
        this.turmaForm.Sala2 = null;
      } else if (this.disciplinaIsParcialEAD) {
        this.turmaForm.Horario2 = 31;
        this.turmaForm.Docente2 = this.turma.Docente2;
        this.turmaForm.Sala1 = this.turma.Sala1;
        this.turmaForm.Sala2 = null;
      }
    },
    resetInputsValues() {
      this.turmaForm = _.clone(this.turma);
    },
    setTurnoByHorario(horarioAtual) {
      if (horarioAtual === 1) this.adjustTurno(this.turmaForm.Horario1);
      else if (!this.disciplinaIsParcialEAD)
        this.adjustTurno(this.turmaForm.Horario2);
    },
    adjustTurno(horario) {
      if (horario == 31 && this.disciplinaIsIntegralEAD) {
        this.turmaForm.turno1 = "EAD";
      } else if (
        horario == 1 ||
        horario == 2 ||
        horario == 7 ||
        horario == 8 ||
        horario == 13 ||
        horario == 14 ||
        horario == 19 ||
        horario == 20 ||
        horario == 25 ||
        horario == 26 ||
        horario == 3 ||
        horario == 4 ||
        horario == 9 ||
        horario == 10 ||
        horario == 15 ||
        horario == 16 ||
        horario == 21 ||
        horario == 22 ||
        horario == 27 ||
        horario == 28
      ) {
        this.turmaForm.turno1 = "Diurno";
      } else if (horario !== null && horario !== "" && horario !== undefined)
        this.turmaForm.turno1 = "Noturno";
    },
    closeModalTurma(eventName) {
      EventBus.$emit(eventName);
    },
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
    curso(pedido) {
      return _.find(this.$store.state.curso.Cursos, { id: pedido.Curso });
    },
    findDisciplinaById(id) {
      let disciplina = _.find(this.Disciplinas, (d) => d.id == id);
      return disciplina != undefined ? disciplina : null;
    },
    onlyA_Z($event) {
      let key = $event.key ? $event.key : $event.which;
      if (!key.match(/[A-Z]/i)) $event.preventDefault();
    },
    totalPedidos() {
      var t = 0;
      var pedidos = this.$store.state.pedido.Pedidos[this.turma.id];
      for (var p = 0; p < pedidos.length; p++) {
        t += parseInt(pedidos[p].vagasPeriodizadas, 10);
        t += parseInt(pedidos[p].vagasNaoPeriodizadas, 10);
      }
      return t;
    },
    totalPedidosPeriodizados() {
      var t = 0;
      var pedidos = this.$store.state.pedido.Pedidos[this.turma.id];
      for (var p = 0; p < pedidos.length; p++) {
        t += parseInt(pedidos[p].vagasPeriodizadas, 10);
      }
      return t;
    },
    totalPedidosNaoPeriodizados() {
      var t = 0;
      var pedidos = this.$store.state.pedido.Pedidos[this.turma.id];
      for (var p = 0; p < pedidos.length; p++) {
        t += parseInt(pedidos[p].vagasNaoPeriodizadas, 10);
      }
      return t;
    },

    checkHorariosPeriodo() {
      const hasConflictDocenteInHorario1 = this.checkHorarioDocente(1);
      const hasConflictDocenteInHorario2 = this.checkHorarioDocente(2);
      const hasConflictSalasInHorario1 = this.checkHorarioSala(1);
      const hasConflictSalasInHorario2 = this.checkHorarioSala(2);

      if (hasConflictDocenteInHorario1 && hasConflictSalasInHorario1) {
        this.turmaForm.Horario1 = null;
        this.turmaForm.periodo = this.currentData.periodo;
      } else if (hasConflictDocenteInHorario2 && hasConflictSalasInHorario2) {
        this.turmaForm.Horario2 = null;
        this.turmaForm.periodo = this.currentData.periodo;
      }
    },

    checkHorario(horario) {
      const hasConflictInDocentes = this.checkHorarioDocente(horario);
      const hasConflictInSalas = this.checkHorarioSala(horario);

      if (hasConflictInDocentes || hasConflictInSalas) {
        if (horario === 1) this.turmaForm.Horario1 = null;
        else this.turmaForm.Horario2 = null;
      }
    },

    checkDocente(docente) {
      const hasConflictHorario1 = this.checkHorarioDocente(1);
      const hasConflictHorario2 = this.checkHorarioDocente(2);

      if (docente === 1) {
        if (hasConflictHorario1 || hasConflictHorario2)
          this.turmaForm.Docente1 = null;
      } else {
        if (hasConflictHorario1 || hasConflictHorario2)
          this.turmaForm.Docente2 = null;
      }
    },

    checkSala() {
      const hasConflictSala1 = this.checkHorarioSala(1);
      const hasConflictSala2 = this.checkHorarioSala(2);

      if (hasConflictSala1) this.turmaForm.Sala1 = null;
      if (hasConflictSala2) this.turmaForm.Sala2 = null;
    },

    checkHorarioDocente(horario) {
      let horarios1618 = [4, 10, 16, 22, 28];
      let horarios1719 = [32, 34, 36, 38, 40];
      let horarios1820 = [33, 35, 37, 39, 41];
      let horarios1921 = [5, 11, 17, 23, 29];

      if (this.turmaForm.Horario1 === "") this.turmaForm.Horario1 = null;
      if (this.turmaForm.Horario2 === "") this.turmaForm.Horario2 = null;
      if (this.turmaForm.Docente1 === "") this.turmaForm.Docente1 = null;
      if (this.turmaForm.Docente2 === "") this.turmaForm.Docente2 = null;

      if (
        (!_.isNull(this.turmaForm.Horario1) ||
          !_.isNull(this.turmaForm.Horario2)) &&
        (!_.isNull(this.turmaForm.Docente1) ||
          !_.isNull(this.turmaForm.Docente2))
      ) {
        if (
          horario === 1
            ? this.turmaForm.Horario1 === 31
            : this.turmaForm.Horario2 === 31
        ) {
          return false;
        } else if (
          horario === 1 &&
          _.includes(horarios1618, this.turmaForm.Horario1)
        ) {
          if (this.checkHorarioDocente1618(1, 1)) return true;
          if (this.checkHorarioDocente1618(1, 2)) return true;
        } else if (
          horario === 2 &&
          _.includes(horarios1618, this.turmaForm.Horario2)
        ) {
          if (this.checkHorarioDocente1618(2, 1)) return true;
          if (this.checkHorarioDocente1618(2, 2)) return true;
        } else if (
          horario === 1 &&
          _.includes(horarios1719, this.turmaForm.Horario1)
        ) {
          if (this.checkHorarioDocente1719(1, 1)) return true;
          if (this.checkHorarioDocente1719(1, 2)) return true;
        } else if (
          horario === 2 &&
          _.includes(horarios1719, this.turmaForm.Horario2)
        ) {
          if (this.checkHorarioDocente1719(2, 1)) return true;
          if (this.checkHorarioDocente1719(2, 2)) return true;
        } else if (
          horario === 1 &&
          _.includes(horarios1820, this.turmaForm.Horario1)
        ) {
          if (this.checkHorarioDocente1820(1, 1)) return true;
          if (this.checkHorarioDocente1820(1, 2)) return true;
        } else if (
          horario === 2 &&
          _.includes(horarios1820, this.turmaForm.Horario2)
        ) {
          if (this.checkHorarioDocente1820(2, 1)) return true;
          if (this.checkHorarioDocente1820(2, 2)) return true;
        } else if (
          horario === 1 &&
          _.includes(horarios1921, this.turmaForm.Horario1)
        ) {
          if (this.checkHorarioDocente1921(1, 1)) return true;
          if (this.checkHorarioDocente1921(1, 2)) return true;
        } else if (
          horario === 2 &&
          _.includes(horarios1921, this.turmaForm.Horario2)
        ) {
          if (this.checkHorarioDocente1921(2, 1)) return true;
          if (this.checkHorarioDocente1921(2, 2)) return true;
        } else {
          if (horario === 1) {
            if (this.checkHorarioDocenteGeral(1, 1)) return true;
            if (this.checkHorarioDocenteGeral(1, 2)) return true;
          } else {
            if (this.checkHorarioDocenteGeral(2, 1)) return true;
            if (this.checkHorarioDocenteGeral(2, 2)) return true;
          }
        }
      }
      return false;
    },

    notifyHorarioDocente(horario, docente) {
      let h =
        horario === 1
          ? _.find(this.$store.state.horario.Horarios, [
              "id",
              this.turmaForm.Horario1,
            ])
          : _.find(this.$store.state.horario.Horarios, [
              "id",
              this.turmaForm.Horario2,
            ]);
      let d =
        docente === 1
          ? _.find(this.$store.state.docente.Docentes, [
              "id",
              this.turmaForm.Docente1,
            ])
          : _.find(this.$store.state.docente.Docentes, [
              "id",
              this.turmaForm.Docente2,
            ]);

      let text = `Conflito no horário ${h.horario} com o docente ${d.apelido}`;
      this.$notify({
        group: "general",
        title: "Erro",
        text: text,
        type: "error",
      });
    },

    checkHorarioDocente1618(horario, docente) {
      let conflitos = _.filter(this.$store.state.turma.Turmas, (t) => {
        if (this.turmaForm.periodo != t.periodo) {
          return false;
        }
        let h1, h2;
        if (horario === 1) {
          h1 =
            this.turmaForm.Horario1 === t.Horario1 ||
            32 + (this.turmaForm.Horario1 - 4) / 3 === t.Horario1;
          h2 =
            this.turmaForm.Horario1 === t.Horario2 ||
            32 + (this.turmaForm.Horario1 - 4) / 3 === t.Horario2;
        } else {
          h1 =
            this.turmaForm.Horario2 === t.Horario1 ||
            32 + (this.turmaForm.Horario2 - 4) / 3 === t.Horario1;
          h2 =
            this.turmaForm.Horario2 === t.Horario2 ||
            32 + (this.turmaForm.Horario2 - 4) / 3 === t.Horario2;
        }
        let d1, d2;
        if (docente === 1) {
          d1 =
            !_.isNull(this.turmaForm.Docente1) &&
            this.turmaForm.Docente1 === t.Docente1;
          d2 =
            !_.isNull(this.turmaForm.Docente1) &&
            this.turmaForm.Docente1 === t.Docente2;
        } else {
          d1 =
            !_.isNull(this.turmaForm.Docente2) &&
            this.turmaForm.Docente2 === t.Docente1;
          d2 =
            !_.isNull(this.turmaForm.Docente2) &&
            this.turmaForm.Docente2 === t.Docente2;
        }

        return ((h1 || h2) && d1) || ((h1 || h2) && d2);
      });
      if (conflitos.length > 0) {
        if (conflitos.length === 1) {
          if (conflitos[0].id === this.turmaForm.id) {
            return false;
          }
        }

        this.notifyHorarioDocente(horario, docente);

        return true;
      }
      return false;
    },

    checkHorarioDocente1719(horario, docente) {
      let conflitos = _.filter(this.$store.state.turma.Turmas, (t) => {
        if (this.turmaForm.periodo != t.periodo) {
          return false;
        }
        let h1, h2;
        if (horario === 1) {
          h1 =
            this.turmaForm.Horario1 === t.Horario1 ||
            4 + (this.turmaForm.Horario1 - 32) * 3 === t.Horario1 ||
            this.turmaForm.Horario1 + 1 === t.Horario1;
          h2 =
            this.turmaForm.Horario1 === t.Horario2 ||
            4 + (this.turmaForm.Horario1 - 32) * 3 === t.Horario2 ||
            this.turmaForm.Horario1 + 1 === t.Horario2;
        } else {
          h1 =
            this.turmaForm.Horario2 === t.Horario1 ||
            4 + (this.turmaForm.Horario2 - 32) * 3 === t.Horario1 ||
            this.turmaForm.Horario2 + 1 === t.Horario1;
          h2 =
            this.turmaForm.Horario2 === t.Horario2 ||
            4 + (this.turmaForm.Horario2 - 32) * 3 === t.Horario2 ||
            this.turmaForm.Horario2 + 1 === t.Horario2;
        }
        let d1, d2;
        if (docente === 1) {
          d1 =
            !_.isNull(this.turmaForm.Docente1) &&
            this.turmaForm.Docente1 === t.Docente1;
          d2 =
            !_.isNull(this.turmaForm.Docente1) &&
            this.turmaForm.Docente1 === t.Docente2;
        } else {
          d1 =
            !_.isNull(this.turmaForm.Docente2) &&
            this.turmaForm.Docente2 === t.Docente1;
          d2 =
            !_.isNull(this.turmaForm.Docente2) &&
            this.turmaForm.Docente2 === t.Docente2;
        }

        return ((h1 || h2) && d1) || ((h1 || h2) && d2);
      });
      if (conflitos.length > 0) {
        if (conflitos.length === 1) {
          if (conflitos[0].id === this.turmaForm.id) {
            return false;
          }
        }

        this.notifyHorarioDocente(horario, docente);

        return true;
      }
      return false;
    },

    checkHorarioDocente1820(horario, docente) {
      let conflitos = _.filter(this.$store.state.turma.Turmas, (t) => {
        if (this.turmaForm.periodo != t.periodo) {
          return false;
        }
        let h1, h2;
        if (horario === 1) {
          h1 =
            this.turmaForm.Horario1 === t.Horario1 ||
            5 + (this.turmaForm.Horario1 - 33) * 3 === t.Horario1 ||
            this.turmaForm.Horario1 - 1 === t.Horario1;
          h2 =
            this.turmaForm.Horario1 === t.Horario2 ||
            5 + (this.turmaForm.Horario1 - 33) * 3 === t.Horario2 ||
            this.turmaForm.Horario1 - 1 === t.Horario2;
        } else {
          h1 =
            this.turmaForm.Horario2 === t.Horario1 ||
            5 + (this.turmaForm.Horario2 - 33) * 3 === t.Horario1 ||
            this.turmaForm.Horario2 - 1 === t.Horario1;
          h2 =
            this.turmaForm.Horario2 === t.Horario2 ||
            5 + (this.turmaForm.Horario2 - 33) * 3 === t.Horario2 ||
            this.turmaForm.Horario2 - 1 === t.Horario2;
        }
        let d1, d2;
        if (docente === 1) {
          d1 =
            !_.isNull(this.turmaForm.Docente1) &&
            this.turmaForm.Docente1 === t.Docente1;
          d2 =
            !_.isNull(this.turmaForm.Docente1) &&
            this.turmaForm.Docente1 === t.Docente2;
        } else {
          d1 =
            !_.isNull(this.turmaForm.Docente2) &&
            this.turmaForm.Docente2 === t.Docente1;
          d2 =
            !_.isNull(this.turmaForm.Docente2) &&
            this.turmaForm.Docente2 === t.Docente2;
        }

        return ((h1 || h2) && d1) || ((h1 || h2) && d2);
      });
      if (conflitos.length > 0) {
        if (conflitos.length === 1) {
          if (conflitos[0].id === this.turmaForm.id) {
            return false;
          }
        }

        this.notifyHorarioDocente(horario, docente);

        return true;
      }
      return false;
    },

    checkHorarioDocente1921(horario, docente) {
      let conflitos = _.filter(this.$store.state.turma.Turmas, (t) => {
        if (this.turmaForm.periodo != t.periodo) {
          return false;
        }
        let h1, h2;
        if (horario === 1) {
          h1 =
            this.turmaForm.Horario1 === t.Horario1 ||
            33 + (this.turmaForm.Horario1 - 5) / 3 === t.Horario1;
          h2 =
            this.turmaForm.Horario1 === t.Horario2 ||
            33 + (this.turmaForm.Horario1 - 5) / 3 === t.Horario2;
        } else {
          h1 =
            this.turmaForm.Horario2 === t.Horario1 ||
            33 + (this.turmaForm.Horario2 - 5) / 3 === t.Horario1;
          h2 =
            this.turmaForm.Horario2 === t.Horario2 ||
            33 + (this.turmaForm.Horario2 - 5) / 3 === t.Horario2;
        }
        let d1, d2;
        if (docente === 1) {
          d1 =
            !_.isNull(this.turmaForm.Docente1) &&
            this.turmaForm.Docente1 === t.Docente1;
          d2 =
            !_.isNull(this.turmaForm.Docente1) &&
            this.turmaForm.Docente1 === t.Docente2;
        } else {
          d1 =
            !_.isNull(this.turmaForm.Docente2) &&
            this.turmaForm.Docente2 === t.Docente1;
          d2 =
            !_.isNull(this.turmaForm.Docente2) &&
            this.turmaForm.Docente2 === t.Docente2;
        }

        return ((h1 || h2) && d1) || ((h1 || h2) && d2);
      });
      if (conflitos.length > 0) {
        if (conflitos.length === 1) {
          if (conflitos[0].id === this.turmaForm.id) {
            return false;
          }
        }

        this.notifyHorarioDocente(horario, docente);

        return true;
      }
      return false;
    },

    checkHorarioDocenteGeral(horario, docente) {
      let conflitos = _.filter(this.$store.state.turma.Turmas, (t) => {
        if (this.turmaForm.periodo != t.periodo) {
          return false;
        }
        let h1, h2;
        if (horario === 1) {
          h1 =
            !_.isNull(this.turmaForm.Horario1) &&
            this.turmaForm.Horario1 === t.Horario1;
          h2 =
            !_.isNull(this.turmaForm.Horario1) &&
            this.turmaForm.Horario1 === t.Horario2;
        } else {
          h1 =
            !_.isNull(this.turmaForm.Horario2) &&
            this.turmaForm.Horario2 === t.Horario1;
          h2 =
            !_.isNull(this.turmaForm.Horario2) &&
            this.turmaForm.Horario2 === t.Horario2;
        }
        let d1, d2;
        if (docente === 1) {
          d1 =
            !_.isNull(this.turmaForm.Docente1) &&
            this.turmaForm.Docente1 === t.Docente1;
          d2 =
            !_.isNull(this.turmaForm.Docente1) &&
            this.turmaForm.Docente1 === t.Docente2;
        } else {
          d1 =
            !_.isNull(this.turmaForm.Docente2) &&
            this.turmaForm.Docente2 === t.Docente1;
          d2 =
            !_.isNull(this.turmaForm.Docente2) &&
            this.turmaForm.Docente2 === t.Docente2;
        }

        return ((h1 || h2) && d1) || ((h1 || h2) && d2);
      });
      if (conflitos.length > 0) {
        if (conflitos.length === 1) {
          if (conflitos[0].id === this.turmaForm.id) {
            return false;
          }
        }

        this.notifyHorarioDocente(horario, docente);

        return true;
      }
      return false;
    },

    checkHorarioSala(horario) {
      let horarios1618 = [4, 10, 16, 22, 28];
      let horarios1719 = [32, 34, 36, 38, 40];
      let horarios1820 = [33, 35, 37, 39, 41];
      let horarios1921 = [5, 11, 17, 23, 29];
      if (this.turmaForm.Horario1 === "") this.turmaForm.Horario1 = null;
      if (this.turmaForm.Horario2 === "") this.turmaForm.Horario2 = null;
      if (this.turmaForm.Sala1 === "") this.turmaForm.Sala1 = null;
      if (this.turmaForm.Sala2 === "") this.turmaForm.Sala2 = null;
      if (
        (!_.isNull(this.turmaForm.Horario1) ||
          !_.isNull(this.turmaForm.Horario2)) &&
        (!_.isNull(this.turmaForm.Sala1) || !_.isNull(this.turmaForm.Sala2))
      ) {
        if (
          horario === 1
            ? this.turmaForm.Horario1 === 31
            : this.turmaForm.Horario2 === 31
        ) {
          return false;
        } else if (
          horario === 1 &&
          _.includes(horarios1618, this.turmaForm.Horario1)
        ) {
          if (this.checkHorarioSala1618(1, 1)) return true;
        } else if (
          horario === 2 &&
          _.includes(horarios1618, this.turmaForm.Horario2)
        ) {
          if (this.checkHorarioSala1618(2, 2)) return true;
        } else if (
          horario === 1 &&
          _.includes(horarios1719, this.turmaForm.Horario1)
        ) {
          if (this.checkHorarioSala1719(1, 1)) return true;
        } else if (
          horario === 2 &&
          _.includes(horarios1719, this.turmaForm.Horario2)
        ) {
          if (this.checkHorarioSala1719(2, 2)) return true;
        } else if (
          horario === 1 &&
          _.includes(horarios1820, this.turmaForm.Horario1)
        ) {
          if (this.checkHorarioSala1820(1, 1)) return true;
        } else if (
          horario === 2 &&
          _.includes(horarios1820, this.turmaForm.Horario2)
        ) {
          if (this.checkHorarioSala1820(2, 2)) return true;
        } else if (
          horario === 1 &&
          _.includes(horarios1921, this.turmaForm.Horario1)
        ) {
          if (this.checkHorarioSala1921(1, 1)) return true;
        } else if (
          horario === 2 &&
          _.includes(horarios1921, this.turmaForm.Horario2)
        ) {
          if (this.checkHorarioSala1921(2, 2)) return true;
        } else {
          if (horario == 1) {
            if (this.checkHorarioSalaGeral(1, 1)) return true;
          } else {
            if (this.checkHorarioSalaGeral(2, 2)) return true;
          }
        }
      }
      return false;
    },

    notifyHorarioSala(horario, sala) {
      let h =
        horario === 1
          ? _.find(this.$store.state.horario.Horarios, [
              "id",
              this.turmaForm.Horario1,
            ])
          : _.find(this.$store.state.horario.Horarios, [
              "id",
              this.turmaForm.Horario2,
            ]);
      let s =
        sala === 1
          ? _.find(this.$store.state.sala.Salas, ["id", this.turmaForm.Sala1])
          : _.find(this.$store.state.sala.Salas, ["id", this.turmaForm.Sala2]);

      let text = `Conflito no horário ${h.horario} com a sala ${s.nome}`;
      this.$notify({
        group: "general",
        title: "Erro",
        text: text,
        type: "error",
      });
    },

    checkHorarioSala1618(horario, sala) {
      let conflitos = _.filter(
        _.concat(
          this.$store.state.turma.Turmas,
          this.$store.state.turmaExterna.Turmas
        ),
        (t) => {
          if (this.turmaForm.periodo != t.periodo) {
            return false;
          }
          let h1, h2;
          if (horario === 1) {
            h1 =
              this.turmaForm.Horario1 === t.Horario1 ||
              32 + (this.turmaForm.Horario1 - 4) / 3 === t.Horario1;
            h2 =
              this.turmaForm.Horario1 === t.Horario2 ||
              32 + (this.turmaForm.Horario1 - 4) / 3 === t.Horario2;
          } else {
            h1 =
              this.turmaForm.Horario2 === t.Horario1 ||
              32 + (this.turmaForm.Horario2 - 4) / 3 === t.Horario1;
            h2 =
              this.turmaForm.Horario2 === t.Horario2 ||
              32 + (this.turmaForm.Horario2 - 4) / 3 === t.Horario2;
          }
          let d1, d2;
          if (sala === 1) {
            d1 =
              !_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala1;
            d2 =
              !_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala2;
          } else {
            d1 =
              !_.isNull(this.turmaForm.Sala2) &&
              this.turmaForm.Sala2 === t.Sala1;
            d2 =
              !_.isNull(this.turmaForm.Sala2) &&
              this.turmaForm.Sala2 === t.Sala2;
          }

          return (h1 && d1) || (h2 && d2);
        }
      );
      if (conflitos.length > 0) {
        if (conflitos.length === 1) {
          if (conflitos[0].id === this.turmaForm.id) {
            return false;
          }
        }

        this.notifyHorarioSala(horario, sala);

        return true;
      }
      return false;
    },

    checkHorarioSala1719(horario, sala) {
      let conflitos = _.filter(
        _.concat(
          this.$store.state.turma.Turmas,
          this.$store.state.turmaExterna.Turmas
        ),
        (t) => {
          if (this.turmaForm.periodo != t.periodo) {
            return false;
          }
          let h1, h2;
          if (horario === 1) {
            h1 =
              this.turmaForm.Horario1 === t.Horario1 ||
              4 + (this.turmaForm.Horario1 - 32) * 3 === t.Horario1 ||
              this.turmaForm.Horario1 + 1 === t.Horario1;
            h2 =
              this.turmaForm.Horario1 === t.Horario2 ||
              4 + (this.turmaForm.Horario1 - 32) * 3 === t.Horario2 ||
              this.turmaForm.Horario1 + 1 === t.Horario2;
          } else {
            h1 =
              this.turmaForm.Horario2 === t.Horario1 ||
              4 + (this.turmaForm.Horario2 - 32) * 3 === t.Horario1 ||
              this.turmaForm.Horario2 + 1 === t.Horario1;
            h2 =
              this.turmaForm.Horario2 === t.Horario2 ||
              4 + (this.turmaForm.Horario2 - 32) * 3 === t.Horario2 ||
              this.turmaForm.Horario2 + 1 === t.Horario2;
          }
          let d1, d2;
          if (sala === 1) {
            d1 =
              !_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala1;
            d2 =
              !_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala2;
          } else {
            d1 =
              !_.isNull(this.turmaForm.Sala2) &&
              this.turmaForm.Sala2 === t.Sala1;
            d2 =
              !_.isNull(this.turmaForm.Sala2) &&
              this.turmaForm.Sala2 === t.Sala2;
          }

          return (h1 && d1) || (h2 && d2);
        }
      );
      if (conflitos.length > 0) {
        if (conflitos.length === 1) {
          if (conflitos[0].id === this.turmaForm.id) {
            return false;
          }
        }

        this.notifyHorarioSala(horario, sala);

        return true;
      }
      return false;
    },

    checkHorarioSala1820(horario, sala) {
      let conflitos = _.filter(
        _.concat(
          this.$store.state.turma.Turmas,
          this.$store.state.turmaExterna.Turmas
        ),
        (t) => {
          if (this.turmaForm.periodo != t.periodo) {
            return false;
          }
          let h1, h2;
          if (horario === 1) {
            h1 =
              this.turmaForm.Horario1 === t.Horario1 ||
              5 + (this.turmaForm.Horario1 - 33) * 3 === t.Horario1 ||
              this.turmaForm.Horario1 - 1 === t.Horario1;
            h2 =
              this.turmaForm.Horario1 === t.Horario2 ||
              5 + (this.turmaForm.Horario1 - 33) * 3 === t.Horario2 ||
              this.turmaForm.Horario1 - 1 === t.Horario2;
          } else {
            h1 =
              this.turmaForm.Horario2 === t.Horario1 ||
              5 + (this.turmaForm.Horario2 - 33) * 3 === t.Horario1 ||
              this.turmaForm.Horario2 - 1 === t.Horario1;
            h2 =
              this.turmaForm.Horario2 === t.Horario2 ||
              5 + (this.turmaForm.Horario2 - 33) * 3 === t.Horario2 ||
              this.turmaForm.Horario2 - 1 === t.Horario2;
          }
          let d1, d2;
          if (sala === 1) {
            d1 =
              !_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala1;
            d2 =
              !_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala2;
          } else {
            d1 =
              !_.isNull(this.turmaForm.Sala2) &&
              this.turmaForm.Sala2 === t.Sala1;
            d2 =
              !_.isNull(this.turmaForm.Sala2) &&
              this.turmaForm.Sala2 === t.Sala2;
          }

          return (h1 && d1) || (h2 && d2);
        }
      );
      if (conflitos.length > 0) {
        if (conflitos.length === 1) {
          if (conflitos[0].id === this.turmaForm.id) {
            return false;
          }
        }

        this.notifyHorarioSala(horario, sala);

        return true;
      }
      return false;
    },

    checkHorarioSala1921(horario, sala) {
      let conflitos = _.filter(
        _.concat(
          this.$store.state.turma.Turmas,
          this.$store.state.turmaExterna.Turmas
        ),
        (t) => {
          if (this.turmaForm.periodo != t.periodo) {
            return false;
          }
          let h1, h2;
          if (horario === 1) {
            h1 =
              this.turmaForm.Horario1 === t.Horario1 ||
              33 + (this.turmaForm.Horario1 - 5) / 3 === t.Horario1;
            h2 =
              this.turmaForm.Horario1 === t.Horario2 ||
              33 + (this.turmaForm.Horario1 - 5) / 3 === t.Horario2;
          } else {
            h1 =
              this.turmaForm.Horario2 === t.Horario1 ||
              33 + (this.turmaForm.Horario2 - 5) / 3 === t.Horario1;
            h2 =
              this.turmaForm.Horario2 === t.Horario2 ||
              33 + (this.turmaForm.Horario2 - 5) / 3 === t.Horario2;
          }
          let d1, d2;
          if (sala === 1) {
            d1 =
              !_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala1;
            d2 =
              !_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala2;
          } else {
            d1 =
              !_.isNull(this.turmaForm.Sala2) &&
              this.turmaForm.Sala2 === t.Sala1;
            d2 =
              !_.isNull(this.turmaForm.Sala2) &&
              this.turmaForm.Sala2 === t.Sala2;
          }

          return (h1 && d1) || (h2 && d2);
        }
      );
      if (conflitos.length > 0) {
        if (conflitos.length === 1) {
          if (conflitos[0].id === this.turmaForm.id) {
            return false;
          }
        }

        this.notifyHorarioSala(horario, sala);

        return true;
      }
      return false;
    },

    checkHorarioSalaGeral(horario, sala) {
      let conflitos = _.filter(
        _.concat(
          this.$store.state.turma.Turmas,
          this.$store.state.turmaExterna.Turmas
        ),
        (t) => {
          if (this.turmaForm.periodo != t.periodo) {
            return false;
          }
          let h1, h2;
          if (horario === 1) {
            h1 =
              !_.isNull(this.turmaForm.Horario1) &&
              this.turmaForm.Horario1 === t.Horario1;
            h2 =
              !_.isNull(this.turmaForm.Horario1) &&
              this.turmaForm.Horario1 === t.Horario2;
          } else {
            h1 =
              !_.isNull(this.turmaForm.Horario2) &&
              this.turmaForm.Horario2 === t.Horario1;
            h2 =
              !_.isNull(this.turmaForm.Horario2) &&
              this.turmaForm.Horario2 === t.Horario2;
          }
          let d1, d2;
          if (sala === 1) {
            d1 =
              !_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala1;
            d2 =
              !_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala2;
          } else {
            d1 =
              !_.isNull(this.turmaForm.Sala2) &&
              this.turmaForm.Sala2 === t.Sala1;
            d2 =
              !_.isNull(this.turmaForm.Sala2) &&
              this.turmaForm.Sala2 === t.Sala2;
          }

          return (h1 && d1) || (h2 && d2);
        }
      );
      if (conflitos.length > 0) {
        if (conflitos.length === 1) {
          if (conflitos[0].id === this.turmaForm.id) {
            return false;
          }
        }

        this.notifyHorarioSala(horario, sala);

        return true;
      }
      return false;
    },
    isEmpty(value) {
      return value === "" || value === undefined ? true : false;
    },
    convertEmptyToNull(turma) {
      if (this.isEmpty(turma.Docente1)) turma.Docente1 = null;
      if (this.isEmpty(turma.Docente2)) turma.Docente2 = null;
      if (this.isEmpty(turma.Horario1)) turma.Horario1 = null;
      if (this.isEmpty(turma.Horario2)) turma.Horario2 = null;
      if (this.isEmpty(turma.Sala1)) turma.Sala1 = null;
      if (this.isEmpty(turma.Sala2)) turma.Sala2 = null;
      if (this.isEmpty(turma.turno1)) turma.turno1 = null;
    },
    editTurma() {
      this.convertEmptyToNull(this.turmaForm);
      if (this.turmaForm.turno1 === null) {
        this.$notify({
          group: "general",
          title: "Erro",
          text: "Nenhum turno alocado!",
          type: "error",
        });
        return;
      }

      turmaService
        .update(this.turma.id, this.turmaForm)
        .then((response) => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Turma ${response.Turma.letra} foi atualizada!`,
            type: "success",
          });
          this.currentData = _.clone(this.turmaForm);
        })
        .catch((error) => {
          this.error = "<b>Erro ao atualizar Turma</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
        });
    },
  },
  computed: {
    disciplinaIsIntegralEAD() {
      return this.currentDisciplina ? this.currentDisciplina.ead === 1 : false;
    },
    disciplinaIsParcialEAD() {
      return this.currentDisciplina ? this.currentDisciplina.ead === 2 : false;
    },
    currentDisciplina() {
      return _.find(this.$store.state.disciplina.Disciplinas, {
        id: this.turmaForm.Disciplina,
      });
    },
    hasMoreThan4Creditos() {
      if (this.currentDisciplina == undefined) return false;
      else if (
        this.currentDisciplina.cargaTeorica +
          this.currentDisciplina.cargaPratica >=
        4
      )
        return true;
    },
    CursosTableOrdered() {
      let result = this.CursosFiltred;
      result.forEach((curso) => {
        for (let index = 0; index < this.Pedidos.length; index++) {
          if (this.Pedidos[index].Curso === curso.id) {
            curso.VagasTotais =
              parseInt(this.Pedidos[index].vagasPeriodizadas, 10) * 1000 + //peso para priorizar vagas periodizadas
              parseInt(this.Pedidos[index].vagasNaoPeriodizadas, 10);
            curso.indiceVaga = index;
            break;
          }
        }
      });
      return _.orderBy(result, this.ordemVagas.order, this.ordemVagas.type);
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
    CreditosDaDisciplina() {
      return this.currentDisciplina
        ? this.currentDisciplina.cargaPratica +
            this.currentDisciplina.cargaTeorica
        : "Crédito não encontrado";
    },
    Cursos() {
      return _.orderBy(this.$store.state.curso.Cursos, "posicao");
    },
    Disciplinas() {
      return _.orderBy(this.$store.state.disciplina.Disciplinas, "nome");
    },
    DisciplinasOrederByCod() {
      return _.orderBy(this.$store.state.disciplina.Disciplinas, "codigo");
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
    //filtro do cadastro EAD da disciplina
    HorariosFiltredByCadastroEAD() {
      let horariosResultante = this.Horarios;

      if (this.currentDisciplina != undefined) {
        const cadastroEAD = this.currentDisciplina.ead;
        if (cadastroEAD === 1) {
          horariosResultante = _.filter(horariosResultante, { id: 31 });
        } else {
          horariosResultante = _.filter(
            horariosResultante,
            (horario) => horario.id != 31
          );
        }
      }
      return horariosResultante;
    },
    HorariosFiltredByTurno() {
      const turnoSelected = this.turmaForm.turno1;
      let horarioResultante = this.HorariosFiltredByCadastroEAD;

      if (turnoSelected === "EAD") {
        horarioResultante = _.filter(horarioResultante, { id: 31 });
      } else if (turnoSelected === "Diurno") {
        horarioResultante = _.filter(horarioResultante, function(h) {
          if (parseInt(h.horario.slice(3, 5)) < 17) return true;
          if (h.id === 31) return true;
        });
      } else if (turnoSelected === "Noturno") {
        horarioResultante = _.filter(horarioResultante, function(h) {
          if (parseInt(h.horario.slice(3, 5)) >= 17) return true;
          if (h.id === 31) return true;
        });
      }
      return _.orderBy(horarioResultante, "horario");
    },
    HorariosEAD() {
      return _.filter(this.Horarios, { id: 31 });
    },
    Pedidos() {
      return this.$store.state.pedido.Pedidos[this.turma.id];
    },
    Disciplina() {
      return _.find(this.$store.state.disciplina.Disciplinas, {
        id: this.turma.Disciplina,
      });
    },
    Admin() {
      if (this.$store.state.auth.Usuario.admin === 1) {
        return true;
      } else {
        return false;
      }
    },
    Salas() {
      return _.orderBy(this.$store.state.sala.Salas, "nome");
    },
  },
};
</script>

<style scoped>
.modal-turma {
  width: 100%;
  height: 100%;
}
.form-container {
  font-size: 12px;
}
.form-group {
  margin: 5px auto;
}
.form-control {
  height: 25px !important;
  font-size: 12px !important;
  padding: 2px 5px !important;
  text-align: start;
}
.form-container label {
  font-weight: bold;
  margin-bottom: 5px;
}
.modal-title {
  font-size: 14px;
  text-align: start;
  font-weight: bold;
}
</style>
