<template>
  <BaseModal
    ref="baseModalEditTurma"
    type="editTurma"
    title="Edição de Turma"
    @on-close="resetTurmaForm"
  >
    <template #modal-body v-if="turma.disciplina !== null">
      <div class="form-container">
        <!-- Disciplina, Codigo e Creditos -->
        <div v-if="hasEditDisciplina" class="row">
          <div class="col-8">
            <VSelect
              label="Disciplina"
              v-model="turmaForm.disciplina"
              @change="setDefaultHorarios"
              :validation="$v.turmaForm.disciplina"
            >
              <VOption
                v-for="disciplina in DisciplinasOrderedByNome"
                :key="disciplina.id + disciplina.codigo"
                :value="disciplina"
                :text="disciplina.nome"
              />
            </VSelect>
          </div>
          <div class="col">
            <VSelect
              label="Código"
              v-model="turmaForm.disciplina"
              @change="setDefaultHorarios"
              :validation="$v.turmaForm.disciplina"
            >
              <VOption
                v-for="disciplina in DisciplinasOrderedByNome"
                :key="disciplina.codigo + disciplina.id"
                :value="disciplina"
                :text="disciplina.codigo"
              />
            </VSelect>
          </div>
        </div>
        <div v-else class="row">
          <p class="col modal-title">
            {{ turmaForm.disciplina.codigo + " - " + turmaForm.disciplina.nome }}
          </p>
          <span class="col-auto modal-title text-right" style="font-weight: normal">
            Créditos: {{ turmaForm.disciplina.creditoTotal }}
          </span>
        </div>
        <!-- Período, Turma e turno -->
        <div class="row">
          <div class="col">
            <VSelect
              label="Período"
              v-model.number="turmaForm.periodo"
              :validation="$v.turmaForm.periodo"
              @change="checkHorariosPeriodo"
            >
              <VOption
                v-for="periodoId in [1, 2, 3, 4]"
                :key="'periodoId' + periodoId"
                :value="periodoId"
                :text="periodoId"
              />
            </VSelect>
          </div>
          <div class="col">
            <VInput label="Turma" v-model="turmaForm.letra" :validation="$v.turmaForm.letra" />
          </div>
          <div class="col">
            <VSelect
              label="Turno"
              v-model.number="turmaForm.turno1"
              :validation="$v.turmaForm.turno1"
              @change="handleChangeTurno"
            >
              <template v-if="disciplinaIsIntegralEAD">
                <VOption value="EAD" text="EAD" />
              </template>
              <template v-else>
                <VOption value="Diurno" text="Diurno" />
                <VOption value="Noturno" text="Noturno" />
              </template>
            </VSelect>
          </div>
        </div>
        <!-- Docente, Horarios e Salas -->
        <div class="row">
          <div class="col">
            <VSelect
              label="Docentes"
              v-model.number="turmaForm.Docente1"
              :validation="$v.turmaForm.Docente1"
              @change="checkDocente(1)"
              :emptyPlaceholder="false"
            >
              <VOption />
              <VOption
                v-for="docente in DocentesOrdered"
                :key="docente.id + docente.apelido"
                :value="docente.id"
                :text="docente.apelido"
              />
            </VSelect>
            <VSelect
              v-model.number="turmaForm.Docente2"
              :validation="$v.turmaForm.Docente2"
              @change="checkDocente(2)"
              :emptyPlaceholder="false"
            >
              <VOption />
              <VOption
                v-for="docente in DocentesOrdered"
                :key="docente.apelido + docente.id"
                :value="docente.id"
                :text="docente.apelido"
              />
            </VSelect>
          </div>

          <div class="col">
            <VSelect
              label="Horários"
              v-model="turmaForm.Horario1"
              :validation="$v.turmaForm.Horario1"
              @change="checkHorario(1), setTurnoByHorario(1)"
              :emptyPlaceholder="false"
            >
              <VOption v-if="!disciplinaIsIntegralEAD" />
              <VOption
                v-for="horario in HorariosFiltredByTurno"
                :key="horario.id + horario.horario"
                :value="horario.id"
                :text="horario.horario"
              />
            </VSelect>

            <VSelect
              v-model="turmaForm.Horario2"
              :validation="$v.turmaForm.Horario2"
              @change="checkHorario(2), setTurnoByHorario(2)"
              :emptyPlaceholder="false"
            >
              <template v-if="disciplinaIsParcialEAD">
                <VOption
                  v-for="horario in HorariosEAD"
                  :key="horario.horario + horario.id"
                  :value="horario.id"
                  :text="horario.horario"
                />
              </template>
              <template v-else>
                <VOption v-if="!disciplinaIsIntegralEAD" />
                <VOption
                  v-for="horario in HorariosFiltredByTurno"
                  :key="horario.horario + horario.id"
                  :value="horario.id"
                  :text="horario.horario"
                />
              </template>
            </VSelect>
          </div>

          <div class="col">
            <VSelect
              label="Salas"
              v-model="turmaForm.Sala1"
              :validation="$v.turmaForm.Sala1"
              @change="checkSala"
              :emptyPlaceholder="false"
            >
              <VOption />
              <VOption
                v-for="sala in AllSalas"
                :key="sala.nome + sala.id"
                :value="sala.id"
                :text="sala.nome"
              />
            </VSelect>
            <VSelect
              v-model="turmaForm.Sala2"
              :validation="$v.turmaForm.Sala2"
              @change="checkSala"
              :emptyPlaceholder="false"
            >
              <VOption />
              <VOption
                v-for="sala in AllSalas"
                :key="sala.nome + sala.id"
                :value="sala.id"
                :text="sala.nome"
              />
            </VSelect>
          </div>
        </div>
        <!-- Botoes -->
        <div class="d-flex justify-content-end mt-3 mb-2">
          <BaseButton class="paddingX-20" color="gray" text="Cancelar" @click="resetTurmaForm" />
          <BaseButton class="paddingX-20" color="green" text="Salvar" @click="handleEditTurma" />
        </div>
      </div>

      <hr class="mb-1 mt-0 w-100" />

      <div class="row mb-1">
        <h3 class="col modal-title">VAGAS</h3>
        <p class="col-auto modal-title" style="font-weight: normal">Total: {{ totalPedidos }}</p>
      </div>
      <div class="div-table">
        <BaseTable styles="height:350px;font-size:10px!important" :hasSearchBar="true">
          <template #thead-search>
            <VInputSearch
              v-model="searchCursos"
              placeholder="Pesquise nome ou codigo de um curso..."
            />
          </template>
          <template#thead>
            <v-th-ordination
              :currentOrder="ordemVagas"
              orderToCheck="codigo"
              width="65"
              align="start"
            >
              Código
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordemVagas"
              orderToCheck="nome"
              width="305"
              align="start"
            >
              Nome
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordemVagas"
              orderToCheck="VagasTotais"
              width="80"
              orderType="desc"
              title="Vagas periodizadas / Não periodizadas"
            >
              Vagas
            </v-th-ordination>
          </template#thead>

          <template#tbody>
            <tr v-for="curso in CursosTableOrdered" :key="curso.id + curso.codigo">
              <v-td width="65" align="start">
                {{ curso.codigo }}
              </v-td>
              <v-td width="305" align="start" :title="curso.nome">
                {{ curso.nome }}
              </v-td>
              <v-td width="80" type="content">
                <InputsPedidosDCC type="modal" :index="curso.indiceVaga" :turma="turma" />
              </v-td>
            </tr>

            <tr v-if="!CursosTableOrdered.length">
              <v-td colspan="3" width="450">NENHUM CURSO ENCONTRADO</v-td>
            </tr>
          </template#tbody>
        </BaseTable>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { isNull, clone, find, filter, orderBy } from "lodash-es";
import { requiredIf, required, maxLength, integer, alpha } from "vuelidate/lib/validators";
import { normalizeText } from "@/common/utils";
import { VInput, VSelect, VOption } from "@/components/ui";
import VInputSearch from "../ui/VInputSearch";
import InputsPedidosDCC from "../ui/InputsPedidosDCC.vue";

export default {
  name: "ModalEditTurma",
  components: { VInputSearch, VInput, InputsPedidosDCC, VSelect, VOption },
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
  validations: {
    turmaForm: {
      disciplina: {
        requiredIf: requiredIf(function() {
          return this.hasEditDisciplina;
        }),
      },
      periodo: { required, integer },
      turno1: { required },
      letra: { required, alpha, maxLength: maxLength(3) },
      Docente1: { integer },
      Docente2: { integer },
      Sala1: { integer },
      Sala2: { integer },
    },
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
      this.turmaForm = clone(this.turma);
      this.initialData = clone(this.turma);
      this.setDefaultHorarios();
      this.$nextTick(() => this.$v.$reset());
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
      else if (!this.disciplinaIsParcialEAD) this.adjustTurno(this.turmaForm.Horario2);
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
      this.$v.turmaForm.$touch();
      if (this.$v.turmaForm.$anyError) return;

      try {
        this.setLoading({ type: "partial", value: true });
        await this.editTurma({ data: this.turmaForm, notify: true });
        this.initialData = clone(this.turmaForm);
      } catch (error) {
        const erroMsg = error.response
          ? "A combinação de disciplina, período e turma deve ser única"
          : error.message;
        this.pushNotification({
          type: "error",
          title: "Erro ao atualizar turma!",
          text: erroMsg,
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
    checkHorariosPeriodo() {
      const hasConflictDocenteInHorario1 = this.checkHorarioDocente(1);
      const hasConflictDocenteInHorario2 = this.checkHorarioDocente(2);
      const hasConflictSalasInHorario1 = this.checkHorarioSala(1);
      const hasConflictSalasInHorario2 = this.checkHorarioSala(2);

      if (hasConflictDocenteInHorario1 || hasConflictSalasInHorario1) {
        this.turmaForm.periodo = this.initialData.periodo;
      }
      if (hasConflictDocenteInHorario2 || hasConflictSalasInHorario2) {
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
        if (hasConflictHorario1 || hasConflictHorario2) this.turmaForm.Docente1 = null;
      } else {
        if (hasConflictHorario1 || hasConflictHorario2) this.turmaForm.Docente2 = null;
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
        (!isNull(this.turmaForm.Horario1) || !isNull(this.turmaForm.Horario2)) &&
        (!isNull(this.turmaForm.Docente1) || !isNull(this.turmaForm.Docente2))
      ) {
        if (horario === 1 ? this.turmaForm.Horario1 === 31 : this.turmaForm.Horario2 === 31) {
          return false;
        } else if (horario === 1 && horarios1618.includes(this.turmaForm.Horario1)) {
          if (this.checkHorarioDocente1618(1, 1)) return true;
          if (this.checkHorarioDocente1618(1, 2)) return true;
        } else if (horario === 2 && horarios1618.includes(this.turmaForm.Horario2)) {
          if (this.checkHorarioDocente1618(2, 1)) return true;
          if (this.checkHorarioDocente1618(2, 2)) return true;
        } else if (horario === 1 && horarios1719.includes(this.turmaForm.Horario1)) {
          if (this.checkHorarioDocente1719(1, 1)) return true;
          if (this.checkHorarioDocente1719(1, 2)) return true;
        } else if (horario === 2 && horarios1719.includes(this.turmaForm.Horario2)) {
          if (this.checkHorarioDocente1719(2, 1)) return true;
          if (this.checkHorarioDocente1719(2, 2)) return true;
        } else if (horario === 1 && horarios1820.includes(this.turmaForm.Horario1)) {
          if (this.checkHorarioDocente1820(1, 1)) return true;
          if (this.checkHorarioDocente1820(1, 2)) return true;
        } else if (horario === 2 && horarios1820.includes(this.turmaForm.Horario2)) {
          if (this.checkHorarioDocente1820(2, 1)) return true;
          if (this.checkHorarioDocente1820(2, 2)) return true;
        } else if (horario === 1 && horarios1921.includes(this.turmaForm.Horario1)) {
          if (this.checkHorarioDocente1921(1, 1)) return true;
          if (this.checkHorarioDocente1921(1, 2)) return true;
        } else if (horario === 2 && horarios1921.includes(this.turmaForm.Horario2)) {
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
          ? find(this.AllHorarios, ["id", this.turmaForm.Horario1])
          : find(this.AllHorarios, ["id", this.turmaForm.Horario2]);
      let d =
        docente === 1
          ? find(this.DocentesAtivos, ["id", this.turmaForm.Docente1])
          : find(this.DocentesAtivos, ["id", this.turmaForm.Docente2]);

      let text = `Conflito no horário ${h.horario} com o docente ${d.apelido}`;
      this.$notify({
        group: "general",
        title: "Erro",
        text: text,
        type: "error",
      });
    },
    checkHorarioDocente1618(horario, docente) {
      let conflitos = filter(this.$store.state.turma.Turmas, (t) => {
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
          d1 = !isNull(this.turmaForm.Docente1) && this.turmaForm.Docente1 === t.Docente1;
          d2 = !isNull(this.turmaForm.Docente1) && this.turmaForm.Docente1 === t.Docente2;
        } else {
          d1 = !isNull(this.turmaForm.Docente2) && this.turmaForm.Docente2 === t.Docente1;
          d2 = !isNull(this.turmaForm.Docente2) && this.turmaForm.Docente2 === t.Docente2;
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
      let conflitos = filter(this.$store.state.turma.Turmas, (t) => {
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
          d1 = !isNull(this.turmaForm.Docente1) && this.turmaForm.Docente1 === t.Docente1;
          d2 = !isNull(this.turmaForm.Docente1) && this.turmaForm.Docente1 === t.Docente2;
        } else {
          d1 = !isNull(this.turmaForm.Docente2) && this.turmaForm.Docente2 === t.Docente1;
          d2 = !isNull(this.turmaForm.Docente2) && this.turmaForm.Docente2 === t.Docente2;
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
      let conflitos = filter(this.$store.state.turma.Turmas, (t) => {
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
          d1 = !isNull(this.turmaForm.Docente1) && this.turmaForm.Docente1 === t.Docente1;
          d2 = !isNull(this.turmaForm.Docente1) && this.turmaForm.Docente1 === t.Docente2;
        } else {
          d1 = !isNull(this.turmaForm.Docente2) && this.turmaForm.Docente2 === t.Docente1;
          d2 = !isNull(this.turmaForm.Docente2) && this.turmaForm.Docente2 === t.Docente2;
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
      let conflitos = filter(this.$store.state.turma.Turmas, (t) => {
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
          d1 = !isNull(this.turmaForm.Docente1) && this.turmaForm.Docente1 === t.Docente1;
          d2 = !isNull(this.turmaForm.Docente1) && this.turmaForm.Docente1 === t.Docente2;
        } else {
          d1 = !isNull(this.turmaForm.Docente2) && this.turmaForm.Docente2 === t.Docente1;
          d2 = !isNull(this.turmaForm.Docente2) && this.turmaForm.Docente2 === t.Docente2;
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
      let conflitos = filter(this.$store.state.turma.Turmas, (t) => {
        if (this.turmaForm.periodo != t.periodo) {
          return false;
        }
        let h1, h2;
        if (horario === 1) {
          h1 = !isNull(this.turmaForm.Horario1) && this.turmaForm.Horario1 === t.Horario1;
          h2 = !isNull(this.turmaForm.Horario1) && this.turmaForm.Horario1 === t.Horario2;
        } else {
          h1 = !isNull(this.turmaForm.Horario2) && this.turmaForm.Horario2 === t.Horario1;
          h2 = !isNull(this.turmaForm.Horario2) && this.turmaForm.Horario2 === t.Horario2;
        }
        let d1, d2;
        if (docente === 1) {
          d1 = !isNull(this.turmaForm.Docente1) && this.turmaForm.Docente1 === t.Docente1;
          d2 = !isNull(this.turmaForm.Docente1) && this.turmaForm.Docente1 === t.Docente2;
        } else {
          d1 = !isNull(this.turmaForm.Docente2) && this.turmaForm.Docente2 === t.Docente1;
          d2 = !isNull(this.turmaForm.Docente2) && this.turmaForm.Docente2 === t.Docente2;
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
        (!isNull(this.turmaForm.Horario1) || !isNull(this.turmaForm.Horario2)) &&
        (!isNull(this.turmaForm.Sala1) || !isNull(this.turmaForm.Sala2))
      ) {
        if (horario === 1 ? this.turmaForm.Horario1 === 31 : this.turmaForm.Horario2 === 31) {
          return false;
        } else if (horario === 1 && horarios1618.includes(this.turmaForm.Horario1)) {
          if (this.checkHorarioSala1618(1, 1)) return true;
        } else if (horario === 2 && horarios1618.includes(this.turmaForm.Horario2)) {
          if (this.checkHorarioSala1618(2, 2)) return true;
        } else if (horario === 1 && horarios1719.includes(this.turmaForm.Horario1)) {
          if (this.checkHorarioSala1719(1, 1)) return true;
        } else if (horario === 2 && horarios1719.includes(this.turmaForm.Horario2)) {
          if (this.checkHorarioSala1719(2, 2)) return true;
        } else if (horario === 1 && horarios1820.includes(this.turmaForm.Horario1)) {
          if (this.checkHorarioSala1820(1, 1)) return true;
        } else if (horario === 2 && horarios1820.includes(this.turmaForm.Horario2)) {
          if (this.checkHorarioSala1820(2, 2)) return true;
        } else if (horario === 1 && horarios1921.includes(this.turmaForm.Horario1)) {
          if (this.checkHorarioSala1921(1, 1)) return true;
        } else if (horario === 2 && horarios1921.includes(this.turmaForm.Horario2)) {
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
          ? find(this.AllHorarios, ["id", this.turmaForm.Horario1])
          : find(this.AllHorarios, ["id", this.turmaForm.Horario2]);
      let s =
        sala === 1
          ? find(this.AllSalas, ["id", this.turmaForm.Sala1])
          : find(this.AllSalas, ["id", this.turmaForm.Sala2]);

      let text = `Conflito no horário ${h.horario} com a sala ${s.nome}`;
      this.$notify({
        group: "general",
        title: "Erro",
        text: text,
        type: "error",
      });
    },
    checkHorarioSala1618(horario, sala) {
      let conflitos = filter(
        this.$store.state.turma.Turmas.concat(this.$store.state.turmaExterna.Turmas),
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
            d1 = !isNull(this.turmaForm.Sala1) && this.turmaForm.Sala1 === t.Sala1;
            d2 = !isNull(this.turmaForm.Sala1) && this.turmaForm.Sala1 === t.Sala2;
          } else {
            d1 = !isNull(this.turmaForm.Sala2) && this.turmaForm.Sala2 === t.Sala1;
            d2 = !isNull(this.turmaForm.Sala2) && this.turmaForm.Sala2 === t.Sala2;
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
      let conflitos = filter(
        this.$store.state.turma.Turmas.concat(this.$store.state.turmaExterna.Turmas),
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
            d1 = !isNull(this.turmaForm.Sala1) && this.turmaForm.Sala1 === t.Sala1;
            d2 = !isNull(this.turmaForm.Sala1) && this.turmaForm.Sala1 === t.Sala2;
          } else {
            d1 = !isNull(this.turmaForm.Sala2) && this.turmaForm.Sala2 === t.Sala1;
            d2 = !isNull(this.turmaForm.Sala2) && this.turmaForm.Sala2 === t.Sala2;
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
      let conflitos = filter(
        this.$store.state.turma.Turmas.concat(this.$store.state.turmaExterna.Turmas),
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
            d1 = !isNull(this.turmaForm.Sala1) && this.turmaForm.Sala1 === t.Sala1;
            d2 = !isNull(this.turmaForm.Sala1) && this.turmaForm.Sala1 === t.Sala2;
          } else {
            d1 = !isNull(this.turmaForm.Sala2) && this.turmaForm.Sala2 === t.Sala1;
            d2 = !isNull(this.turmaForm.Sala2) && this.turmaForm.Sala2 === t.Sala2;
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
      let conflitos = filter(
        this.$store.state.turma.Turmas.concat(this.$store.state.turmaExterna.Turmas),
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
            d1 = !isNull(this.turmaForm.Sala1) && this.turmaForm.Sala1 === t.Sala1;
            d2 = !isNull(this.turmaForm.Sala1) && this.turmaForm.Sala1 === t.Sala2;
          } else {
            d1 = !isNull(this.turmaForm.Sala2) && this.turmaForm.Sala2 === t.Sala1;
            d2 = !isNull(this.turmaForm.Sala2) && this.turmaForm.Sala2 === t.Sala2;
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
      let conflitos = filter(
        this.$store.state.turma.Turmas.concat(this.$store.state.turmaExterna.Turmas),
        (t) => {
          if (this.turmaForm.periodo != t.periodo) {
            return false;
          }
          let h1, h2;
          if (horario === 1) {
            h1 = !isNull(this.turmaForm.Horario1) && this.turmaForm.Horario1 === t.Horario1;
            h2 = !isNull(this.turmaForm.Horario1) && this.turmaForm.Horario1 === t.Horario2;
          } else {
            h1 = !isNull(this.turmaForm.Horario2) && this.turmaForm.Horario2 === t.Horario1;
            h2 = !isNull(this.turmaForm.Horario2) && this.turmaForm.Horario2 === t.Horario2;
          }
          let d1, d2;
          if (sala === 1) {
            d1 = !isNull(this.turmaForm.Sala1) && this.turmaForm.Sala1 === t.Sala1;
            d2 = !isNull(this.turmaForm.Sala1) && this.turmaForm.Sala1 === t.Sala2;
          } else {
            d1 = !isNull(this.turmaForm.Sala2) && this.turmaForm.Sala2 === t.Sala1;
            d2 = !isNull(this.turmaForm.Sala2) && this.turmaForm.Sala2 === t.Sala2;
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
      "DisciplinasDCC",
      "AllSalas",
      "DocentesAtivos",
      "AllHorarios",
      "HorariosEAD",
      "HorariosNoturno",
      "HorariosDiurno",
    ]),

    disciplinaIsIntegralEAD() {
      return this.turmaForm.disciplina ? this.turmaForm.disciplina.ead === 1 : false;
    },
    disciplinaIsParcialEAD() {
      return this.turmaForm.disciplina ? this.turmaForm.disciplina.ead === 2 : false;
    },
    hasMoreThan4Creditos() {
      return this.turmaForm.disciplina ? this.turmaForm.disciplina.creditoTotal >= 4 : false;
    },

    CursosTableOrdered() {
      let cursosResult = this.CursosFiltred;

      cursosResult.forEach((curso) => {
        for (let index = 0; index < this.currentTurmaPedidos.length; index++) {
          if (this.currentTurmaPedidos[index].Curso === curso.id) {
            curso.VagasTotais =
              parseInt(this.currentTurmaPedidos[index].vagasPeriodizadas, 10) * 1000 + //peso para priorizar vagas periodizadas
              parseInt(this.currentTurmaPedidos[index].vagasNaoPeriodizadas, 10);
            curso.indiceVaga = index;
            break;
          }
        }
      });

      return orderBy(cursosResult, this.ordemVagas.order, this.ordemVagas.type);
    },
    CursosFiltred() {
      if (this.searchCursos === "") return this.AllCursos;

      const searchNormalized = normalizeText(this.searchCursos);

      return filter(this.AllCursos, (curso) => {
        const cursoNome = normalizeText(curso.nome);
        const cursoCodigo = normalizeText(curso.codigo);

        return cursoNome.match(searchNormalized) || cursoCodigo.match(searchNormalized);
      });
    },

    DisciplinasOrderedByNome() {
      return orderBy(this.DisciplinasDCC, "nome");
    },
    DisciplinasOrderedByCodigo() {
      return this.DisciplinasDCC;
    },

    DocentesOrdered() {
      return orderBy(this.DocentesAtivos, "apelido");
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
        return filter(this.AllHorarios, (horario) => horario.id != 31); //Todos sem EAD
      }
    },

    totalPedidos() {
      return this.currentTurmaPedidos.reduce(
        (sum, pedido) =>
          sum + parseInt(pedido.vagasNaoPeriodizadas, 10) + parseInt(pedido.vagasPeriodizadas, 10),
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
.form-container {
  font-size: 12px;
}
.modal-title {
  font-size: 14px;
  text-align: start;
  font-weight: bold;
}
</style>
