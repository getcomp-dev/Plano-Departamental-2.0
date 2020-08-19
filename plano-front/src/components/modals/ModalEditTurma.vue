<template>
  <BaseModal2
    ref="baseModalEditTurma"
    type="editTurma"
    title="Edição de Turma"
    @on-close="resetTurmaForm"
  >
    <template #modal-body v-if="turma.disciplina !== null">
      <div class="form-container row m-0 p-0 w-100">
        <!-- Disciplina e Codigo -->
        <div v-if="hasEditDisciplina" class="form-row w-100">
          <div class="form-group col">
            <label for="disciplinaNome">Disciplina:</label>
            <select
              type="text"
              style="width:260px"
              id="disciplinaNome"
              class="form-control"
              v-model="turmaForm.disciplina"
              @change="setDefaultHorarios"
            >
              <option v-if="!DisciplinasOrderedByNome.length" type="text" value
                >Nenhuma Disciplina Encontrada</option
              >
              <option
                v-for="disciplina in DisciplinasOrderedByNome"
                :key="'2-' + disciplina.id"
                :value="disciplina"
                >{{ disciplina.nome }}</option
              >
            </select>
          </div>
          <div class="form-group col-4">
            <label for="disciplinaCodigo">Código:</label>
            <select
              type="text"
              style="width: 120px;"
              id="disciplinaCodigo"
              class="form-control"
              v-model="turmaForm.disciplina"
              @change="setDefaultHorarios"
            >
              <option
                v-if="!DisciplinasOrderedByCodigo.length"
                type="text"
                value
                >Nenhuma Disciplina Encontrada</option
              >
              <option
                v-for="disciplina in DisciplinasOrderedByCodigo"
                :key="'1-' + disciplina.id"
                :value="disciplina"
                >{{ disciplina.codigo }}</option
              >
            </select>
          </div>
        </div>
        <div v-else class="form-row w-100 m-0 mb-2 pr-1">
          <p class="modal-title col p-0 m-0 ">
            {{
              turmaForm.disciplina.codigo + " - " + turmaForm.disciplina.nome
            }}
          </p>
          <span
            class="modal-title p-0 m-0 text-right"
            style="font-weight:normal"
            >Créditos: {{ turmaForm.disciplina.creditoTotal }}</span
          >
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
              @keypress="maskTurmaLetra"
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
              @input="handleChangeTurno"
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
        <div class="form-row w-100 mb-2">
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
              <option v-if="!DocentesOrdered.length" type="text" value=""
                >Nenhum Docente Encontrado</option
              >
              <option v-else type="text" value=""></option>
              <option
                v-for="docente in DocentesOrdered"
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
              <option v-if="!DocentesOrdered.length" type="text" value=""
                >Nenhum Docente Encontrado</option
              >
              <option v-else type="text" value=""></option>
              <option
                v-for="docente in DocentesOrdered"
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
            <template v-if="turmaForm.disciplina && !disciplinaIsIntegralEAD">
              <label for="sala1">Salas:</label>
              <select
                type="text"
                class="form-control mb-1"
                style="width:120px;"
                id="sala1"
                v-model="turmaForm.Sala1"
                v-on:change="checkSala()"
              >
                <option v-if="AllSalas.length === 0" type="text" value=""
                  >Nenhuma Sala Encontrada</option
                >
                <option v-else value=""></option>
                <option
                  v-for="sala in AllSalas"
                  :key="'1-sala-id' + sala.id"
                  :value="sala.id"
                  >{{ sala.nome }}</option
                >
              </select>
              <select
                v-if="hasMoreThan4Creditos && turmaForm.disciplina.ead != 2"
                type="text"
                class="form-control"
                style="width: 120px"
                id="sala2"
                v-model="turmaForm.Sala2"
                v-on:change="checkSala()"
              >
                <option v-if="AllSalas.length === 0" type="text" value=""
                  >Nenhuma Sala Encontrada</option
                >
                <option v-else value=""></option>
                <option
                  v-for="sala in AllSalas"
                  :key="'2-sala-id' + sala.id"
                  :value="sala.id"
                  >{{ sala.nome }}</option
                >
              </select>
            </template>
          </div>
        </div>
        <!-- Botoes -->
        <div class="w-100 mb-2">
          <BaseButton
            class="paddingX-20"
            :type="'text'"
            :color="'green'"
            @click="handleEditTurma"
          >
            Salvar
          </BaseButton>
          <BaseButton
            class="paddingX-20"
            :type="'text'"
            :color="'gray'"
            @click="resetTurmaForm"
          >
            Cancelar
          </BaseButton>
        </div>
      </div>
      <hr class="mb-1 mt-0 w-100" />
      <!-- TURMA VAGAS -->
      <div class="w-100 d-flex justify-content-between mb-1">
        <h3 class="modal-title">VAGAS</h3>

        <p class="modal-title" style="font-weight:normal">
          Total: {{ totalPedidos }}
        </p>
      </div>

      <div class="div-table">
        <BaseTable
          :type="'modal'"
          :styles="'height:350px'"
          :hasSearchBar="true"
        >
          <template #thead-search>
            <InputSearch
              v-model="searchCursos"
              placeholder="Pesquise nome ou codigo de um curso..."
            />
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
              style="width: 80px"
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
              <td style="width: 80px">
                <InputsPedidosDCC
                  :index="curso.indiceVaga"
                  :turma="turma"
                  :type="'modal'"
                />
              </td>
            </tr>
            <tr v-if="!CursosTableOrdered.length">
              <td colspan="3" style="width:450px">
                NENHUM CURSO ENCONTRADO.
              </td>
            </tr>
          </template#tbody>
        </BaseTable>
      </div>
    </template>
  </BaseModal2>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { normalizeText } from "@/common/utils";
import { toggleOrdination, maskTurmaLetra } from "@/common/mixins";

import InputSearch from "../ui/InputSearch";
import InputsPedidosDCC from "../ui/InputsPedidosDCC.vue";

export default {
  name: "ModalEditTurmaBody",
  mixins: [toggleOrdination, maskTurmaLetra],
  components: { InputSearch, InputsPedidosDCC },
  props: {
    turma: { type: Object, required: true },
    hasEditDisciplina: { type: Boolean, default: false },
  },
  data() {
    return {
      turmaForm: null,
      initialData: null,
      initialDisciplina: null,
      searchCursos: "",
      ordemVagas: { order: "VagasTotais", type: "desc" },
    };
  },

  methods: {
    ...mapActions(["editTurma"]),

    open() {
      this.$refs.baseModalEditTurma.open();
    },
    close() {
      this.$refs.baseModalEditTurma.close();
    },

    handleChangeTurno() {
      this.turmaForm.Horario1 = null;
      if (!this.disciplinaIsParcialEAD) this.turmaForm.Horario2 = null;
    },
    resetTurmaForm() {
      this.turmaForm = this.$_.clone(this.turma);
      this.initialData = this.$_.clone(this.turma);
      this.setDefaultHorarios();
    },
    setDefaultHorarios() {
      if (this.turmaForm.disciplina === null) return;

      this.turmaForm.Disciplina = this.turmaForm.disciplina.id;
      this.turmaForm.turno1 = null;
      //Se a nova disciplina possui um cadastro ead diferentes da anterior
      if (this.turmaForm.disciplina.ead !== this.initialData.disciplina.ead) {
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
    async handleEditTurma() {
      try {
        this.setPartialLoading(true);

        await this.editTurma(this.turmaForm);
        this.initialData = this.$_.clone(this.turmaForm);
      } catch (error) {
        const erroMsg = error.response
          ? "A combinação de disciplina, semestre e turma deve ser única"
          : error.message;
        this.pushNotification({
          type: "error",
          title: "Erro ao atualizar turma!",
          text: erroMsg,
        });
      } finally {
        this.setPartialLoading(false);
      }
    },

    checkHorariosPeriodo() {
      const hasConflictDocenteInHorario1 = this.checkHorarioDocente(1);
      const hasConflictDocenteInHorario2 = this.checkHorarioDocente(2);
      const hasConflictSalasInHorario1 = this.checkHorarioSala(1);
      const hasConflictSalasInHorario2 = this.checkHorarioSala(2);

      if (hasConflictDocenteInHorario1 && hasConflictSalasInHorario1) {
        this.turmaForm.Horario1 = null;
        this.turmaForm.periodo = this.initialData.periodo;
      } else if (hasConflictDocenteInHorario2 && hasConflictSalasInHorario2) {
        this.turmaForm.Horario2 = null;
        this.turmaForm.periodo = this.initialData.periodo;
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
        (!this.$_.isNull(this.turmaForm.Horario1) ||
          !this.$_.isNull(this.turmaForm.Horario2)) &&
        (!this.$_.isNull(this.turmaForm.Docente1) ||
          !this.$_.isNull(this.turmaForm.Docente2))
      ) {
        if (
          horario === 1
            ? this.turmaForm.Horario1 === 31
            : this.turmaForm.Horario2 === 31
        ) {
          return false;
        } else if (
          horario === 1 &&
          this.$_.includes(horarios1618, this.turmaForm.Horario1)
        ) {
          if (this.checkHorarioDocente1618(1, 1)) return true;
          if (this.checkHorarioDocente1618(1, 2)) return true;
        } else if (
          horario === 2 &&
          this.$_.includes(horarios1618, this.turmaForm.Horario2)
        ) {
          if (this.checkHorarioDocente1618(2, 1)) return true;
          if (this.checkHorarioDocente1618(2, 2)) return true;
        } else if (
          horario === 1 &&
          this.$_.includes(horarios1719, this.turmaForm.Horario1)
        ) {
          if (this.checkHorarioDocente1719(1, 1)) return true;
          if (this.checkHorarioDocente1719(1, 2)) return true;
        } else if (
          horario === 2 &&
          this.$_.includes(horarios1719, this.turmaForm.Horario2)
        ) {
          if (this.checkHorarioDocente1719(2, 1)) return true;
          if (this.checkHorarioDocente1719(2, 2)) return true;
        } else if (
          horario === 1 &&
          this.$_.includes(horarios1820, this.turmaForm.Horario1)
        ) {
          if (this.checkHorarioDocente1820(1, 1)) return true;
          if (this.checkHorarioDocente1820(1, 2)) return true;
        } else if (
          horario === 2 &&
          this.$_.includes(horarios1820, this.turmaForm.Horario2)
        ) {
          if (this.checkHorarioDocente1820(2, 1)) return true;
          if (this.checkHorarioDocente1820(2, 2)) return true;
        } else if (
          horario === 1 &&
          this.$_.includes(horarios1921, this.turmaForm.Horario1)
        ) {
          if (this.checkHorarioDocente1921(1, 1)) return true;
          if (this.checkHorarioDocente1921(1, 2)) return true;
        } else if (
          horario === 2 &&
          this.$_.includes(horarios1921, this.turmaForm.Horario2)
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
          ? this.$_.find(this.AllHorarios, ["id", this.turmaForm.Horario1])
          : this.$_.find(this.AllHorarios, ["id", this.turmaForm.Horario2]);
      let d =
        docente === 1
          ? this.$_.find(this.DocentesAtivos, ["id", this.turmaForm.Docente1])
          : this.$_.find(this.DocentesAtivos, ["id", this.turmaForm.Docente2]);

      let text = `Conflito no horário ${h.horario} com o docente ${d.apelido}`;
      this.$notify({
        group: "general",
        title: "Erro",
        text: text,
        type: "error",
      });
    },
    checkHorarioDocente1618(horario, docente) {
      let conflitos = this.$_.filter(this.$store.state.turma.Turmas, (t) => {
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
            !this.$_.isNull(this.turmaForm.Docente1) &&
            this.turmaForm.Docente1 === t.Docente1;
          d2 =
            !this.$_.isNull(this.turmaForm.Docente1) &&
            this.turmaForm.Docente1 === t.Docente2;
        } else {
          d1 =
            !this.$_.isNull(this.turmaForm.Docente2) &&
            this.turmaForm.Docente2 === t.Docente1;
          d2 =
            !this.$_.isNull(this.turmaForm.Docente2) &&
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
      let conflitos = this.$_.filter(this.$store.state.turma.Turmas, (t) => {
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
            !this.$_.isNull(this.turmaForm.Docente1) &&
            this.turmaForm.Docente1 === t.Docente1;
          d2 =
            !this.$_.isNull(this.turmaForm.Docente1) &&
            this.turmaForm.Docente1 === t.Docente2;
        } else {
          d1 =
            !this.$_.isNull(this.turmaForm.Docente2) &&
            this.turmaForm.Docente2 === t.Docente1;
          d2 =
            !this.$_.isNull(this.turmaForm.Docente2) &&
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
      let conflitos = this.$_.filter(this.$store.state.turma.Turmas, (t) => {
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
            !this.$_.isNull(this.turmaForm.Docente1) &&
            this.turmaForm.Docente1 === t.Docente1;
          d2 =
            !this.$_.isNull(this.turmaForm.Docente1) &&
            this.turmaForm.Docente1 === t.Docente2;
        } else {
          d1 =
            !this.$_.isNull(this.turmaForm.Docente2) &&
            this.turmaForm.Docente2 === t.Docente1;
          d2 =
            !this.$_.isNull(this.turmaForm.Docente2) &&
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
      let conflitos = this.$_.filter(this.$store.state.turma.Turmas, (t) => {
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
            !this.$_.isNull(this.turmaForm.Docente1) &&
            this.turmaForm.Docente1 === t.Docente1;
          d2 =
            !this.$_.isNull(this.turmaForm.Docente1) &&
            this.turmaForm.Docente1 === t.Docente2;
        } else {
          d1 =
            !this.$_.isNull(this.turmaForm.Docente2) &&
            this.turmaForm.Docente2 === t.Docente1;
          d2 =
            !this.$_.isNull(this.turmaForm.Docente2) &&
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
      let conflitos = this.$_.filter(this.$store.state.turma.Turmas, (t) => {
        if (this.turmaForm.periodo != t.periodo) {
          return false;
        }
        let h1, h2;
        if (horario === 1) {
          h1 =
            !this.$_.isNull(this.turmaForm.Horario1) &&
            this.turmaForm.Horario1 === t.Horario1;
          h2 =
            !this.$_.isNull(this.turmaForm.Horario1) &&
            this.turmaForm.Horario1 === t.Horario2;
        } else {
          h1 =
            !this.$_.isNull(this.turmaForm.Horario2) &&
            this.turmaForm.Horario2 === t.Horario1;
          h2 =
            !this.$_.isNull(this.turmaForm.Horario2) &&
            this.turmaForm.Horario2 === t.Horario2;
        }
        let d1, d2;
        if (docente === 1) {
          d1 =
            !this.$_.isNull(this.turmaForm.Docente1) &&
            this.turmaForm.Docente1 === t.Docente1;
          d2 =
            !this.$_.isNull(this.turmaForm.Docente1) &&
            this.turmaForm.Docente1 === t.Docente2;
        } else {
          d1 =
            !this.$_.isNull(this.turmaForm.Docente2) &&
            this.turmaForm.Docente2 === t.Docente1;
          d2 =
            !this.$_.isNull(this.turmaForm.Docente2) &&
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
        (!this.$_.isNull(this.turmaForm.Horario1) ||
          !this.$_.isNull(this.turmaForm.Horario2)) &&
        (!this.$_.isNull(this.turmaForm.Sala1) ||
          !this.$_.isNull(this.turmaForm.Sala2))
      ) {
        if (
          horario === 1
            ? this.turmaForm.Horario1 === 31
            : this.turmaForm.Horario2 === 31
        ) {
          return false;
        } else if (
          horario === 1 &&
          this.$_.includes(horarios1618, this.turmaForm.Horario1)
        ) {
          if (this.checkHorarioSala1618(1, 1)) return true;
        } else if (
          horario === 2 &&
          this.$_.includes(horarios1618, this.turmaForm.Horario2)
        ) {
          if (this.checkHorarioSala1618(2, 2)) return true;
        } else if (
          horario === 1 &&
          this.$_.includes(horarios1719, this.turmaForm.Horario1)
        ) {
          if (this.checkHorarioSala1719(1, 1)) return true;
        } else if (
          horario === 2 &&
          this.$_.includes(horarios1719, this.turmaForm.Horario2)
        ) {
          if (this.checkHorarioSala1719(2, 2)) return true;
        } else if (
          horario === 1 &&
          this.$_.includes(horarios1820, this.turmaForm.Horario1)
        ) {
          if (this.checkHorarioSala1820(1, 1)) return true;
        } else if (
          horario === 2 &&
          this.$_.includes(horarios1820, this.turmaForm.Horario2)
        ) {
          if (this.checkHorarioSala1820(2, 2)) return true;
        } else if (
          horario === 1 &&
          this.$_.includes(horarios1921, this.turmaForm.Horario1)
        ) {
          if (this.checkHorarioSala1921(1, 1)) return true;
        } else if (
          horario === 2 &&
          this.$_.includes(horarios1921, this.turmaForm.Horario2)
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
          ? this.$_.find(this.AllHorarios, ["id", this.turmaForm.Horario1])
          : this.$_.find(this.AllHorarios, ["id", this.turmaForm.Horario2]);
      let s =
        sala === 1
          ? this.$_.find(this.AllSalas, ["id", this.turmaForm.Sala1])
          : this.$_.find(this.AllSalas, ["id", this.turmaForm.Sala2]);

      let text = `Conflito no horário ${h.horario} com a sala ${s.nome}`;
      this.$notify({
        group: "general",
        title: "Erro",
        text: text,
        type: "error",
      });
    },
    checkHorarioSala1618(horario, sala) {
      let conflitos = this.$_.filter(
        this.$_.concat(
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
              !this.$_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala1;
            d2 =
              !this.$_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala2;
          } else {
            d1 =
              !this.$_.isNull(this.turmaForm.Sala2) &&
              this.turmaForm.Sala2 === t.Sala1;
            d2 =
              !this.$_.isNull(this.turmaForm.Sala2) &&
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
      let conflitos = this.$_.filter(
        this.$_.concat(
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
              !this.$_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala1;
            d2 =
              !this.$_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala2;
          } else {
            d1 =
              !this.$_.isNull(this.turmaForm.Sala2) &&
              this.turmaForm.Sala2 === t.Sala1;
            d2 =
              !this.$_.isNull(this.turmaForm.Sala2) &&
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
      let conflitos = this.$_.filter(
        this.$_.concat(
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
              !this.$_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala1;
            d2 =
              !this.$_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala2;
          } else {
            d1 =
              !this.$_.isNull(this.turmaForm.Sala2) &&
              this.turmaForm.Sala2 === t.Sala1;
            d2 =
              !this.$_.isNull(this.turmaForm.Sala2) &&
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
      let conflitos = this.$_.filter(
        this.$_.concat(
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
              !this.$_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala1;
            d2 =
              !this.$_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala2;
          } else {
            d1 =
              !this.$_.isNull(this.turmaForm.Sala2) &&
              this.turmaForm.Sala2 === t.Sala1;
            d2 =
              !this.$_.isNull(this.turmaForm.Sala2) &&
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
      let conflitos = this.$_.filter(
        this.$_.concat(
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
              !this.$_.isNull(this.turmaForm.Horario1) &&
              this.turmaForm.Horario1 === t.Horario1;
            h2 =
              !this.$_.isNull(this.turmaForm.Horario1) &&
              this.turmaForm.Horario1 === t.Horario2;
          } else {
            h1 =
              !this.$_.isNull(this.turmaForm.Horario2) &&
              this.turmaForm.Horario2 === t.Horario1;
            h2 =
              !this.$_.isNull(this.turmaForm.Horario2) &&
              this.turmaForm.Horario2 === t.Horario2;
          }
          let d1, d2;
          if (sala === 1) {
            d1 =
              !this.$_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala1;
            d2 =
              !this.$_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala2;
          } else {
            d1 =
              !this.$_.isNull(this.turmaForm.Sala2) &&
              this.turmaForm.Sala2 === t.Sala1;
            d2 =
              !this.$_.isNull(this.turmaForm.Sala2) &&
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
  },

  computed: {
    ...mapGetters([
      "AllCursos",
      "DisciplinasDCCInPerfis",
      "AllSalas",
      "DocentesAtivos",
      "AllHorarios",
      "HorariosEAD",
      "HorariosNoturno",
      "HorariosDiurno",
    ]),

    disciplinaIsIntegralEAD() {
      return this.turmaForm.disciplina
        ? this.turmaForm.disciplina.ead === 1
        : false;
    },
    disciplinaIsParcialEAD() {
      return this.turmaForm.disciplina
        ? this.turmaForm.disciplina.ead === 2
        : false;
    },
    hasMoreThan4Creditos() {
      return this.turmaForm.disciplina
        ? this.turmaForm.disciplina.creditoTotal >= 4
        : false;
    },

    CursosTableOrdered() {
      let cursosResult = this.CursosFiltred;

      cursosResult.forEach((curso) => {
        for (let index = 0; index < this.currentTurmaPedidos.length; index++) {
          if (this.currentTurmaPedidos[index].Curso === curso.id) {
            curso.VagasTotais =
              parseInt(this.currentTurmaPedidos[index].vagasPeriodizadas, 10) *
                1000 + //peso para priorizar vagas periodizadas
              parseInt(
                this.currentTurmaPedidos[index].vagasNaoPeriodizadas,
                10
              );
            curso.indiceVaga = index;
            break;
          }
        }
      });

      return this.$_.orderBy(
        cursosResult,
        this.ordemVagas.order,
        this.ordemVagas.type
      );
    },
    CursosFiltred() {
      if (this.searchCursos === "") return this.AllCursos;

      const searchNormalized = normalizeText(this.searchCursos);

      return this.$_.filter(this.AllCursos, (curso) => {
        const cursoNome = normalizeText(curso.nome);
        const cursoCodigo = normalizeText(curso.codigo);

        return (
          cursoNome.match(searchNormalized) ||
          cursoCodigo.match(searchNormalized)
        );
      });
    },

    DisciplinasOrderedByNome() {
      return this.$_.orderBy(this.DisciplinasDCCInPerfis, "nome");
    },
    DisciplinasOrderedByCodigo() {
      return this.DisciplinasDCCInPerfis;
    },

    DocentesOrdered() {
      return this.$_.orderBy(this.DocentesAtivos, "apelido");
    },
    HorariosFiltredByTurno() {
      if (this.disciplinaIsIntegralEAD) return this.HorariosEAD;

      switch (this.turmaForm.turno1) {
        case "EAD":
          return this.HorariosEAD;
        case "Diurno":
          return this.HorariosDiurno;
        case "Noturno":
          return this.HorariosNoturno;
        default:
          return this.$_.filter(
            this.AllHorarios,
            (horario) => horario.id != 31
          ); //Todos sem EAD
      }
    },

    totalPedidos() {
      return this.$_.reduce(
        this.currentTurmaPedidos,
        (sum, pedido) =>
          sum +
          parseInt(pedido.vagasNaoPeriodizadas, 10) +
          parseInt(pedido.vagasPeriodizadas, 10),
        0
      );
    },
    currentTurmaPedidos() {
      return this.$store.state.pedido.Pedidos[this.turma.id];
    },
  },
  watch: {
    turma: {
      handler: "resetTurmaForm",
      immediate: true,
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
