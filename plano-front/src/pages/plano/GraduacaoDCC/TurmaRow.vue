<template>
  <tr class="turmarow max-content" :class="{ highlighted: turmaForm.highlighted }">
    <v-td
      class="table-data"
      width="25"
      type="content"
      :style="{ backgroundColor: turmaForm.disciplina.perfil.cor }"
    >
      <input type="checkbox" v-model="toggleToDelete" :value="turma" />
    </v-td>
    <v-td class="table-data" width="40" type="content">
      <button class="btn-table" @click.stop="$emit('click-edit', turma)">
        <font-awesome-icon :icon="['fas', 'edit']" class="btn-table-icon icon-darkgray" />
      </button>
    </v-td>
    <v-td class="table-data" width="65" type="content">
      <select v-model.number="turmaForm.periodo" @change="checkHorariosPeriodo()">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </v-td>
    <v-td class="table-data" width="80" paddingX="2">
      {{ turmaForm.disciplina.perfil.abreviacao.toLowerCase() }}
    </v-td>
    <v-td class="table-data" width="80" paddingX="2">{{ turmaForm.disciplina.codigo }}</v-td>
    <v-td class="table-data" width="330" align="start">
      {{ turmaForm.disciplina.nome.toLowerCase() }}
    </v-td>
    <v-td class="table-data" width="60">{{ turmaForm.disciplina.creditoTotal }}</v-td>
    <v-td class="table-data" width="45" type="content">
      <input
        type="text"
        style="width: 30px"
        :value="turmaForm.letra"
        @input="turmaForm.letra = $event.target.value.toUpperCase()"
        @change="handleEditTurma"
        @keypress="maskTurmaLetra"
      />
    </v-td>
    <v-td class="table-data" width="160" type="none" paddingX="3">
      <div class="d-flex align-items-center w-100">
        <div class="d-flex flex-column" style="width: 130px; text-transform: capitalize">
          <select
            v-model.number="turmaForm.Docente1"
            @change="checkDocente"
            style="text-transform: capitalize"
          >
            <option />
            <option
              v-for="docente in DocentesByPreferencia"
              :key="docente.id + docente.apelido"
              :value="docente.id"
            >
              {{ docente.apelido.toLowerCase() }}
              {{
                orderByPreferencia && getPreferenciaDocente(docente)
                  ? "- " + getPreferenciaDocente(docente)
                  : ""
              }}
            </option>
          </select>

          <select
            v-model.number="turmaForm.Docente2"
            @change="checkDocente"
            style="text-transform: capitalize"
          >
            <option />
            <option
              v-for="docente in DocentesByPreferencia"
              :key="docente.apelido + docente.id"
              :value="docente.id"
            >
              {{ docente.apelido.toLowerCase() }}
              {{
                orderByPreferencia && getPreferenciaDocente(docente)
                  ? "- " + getPreferenciaDocente(docente)
                  : ""
              }}
            </option>
          </select>
        </div>
        <font-awesome-icon
          :icon="['fas', 'graduation-cap']"
          :class="['clickable mx-auto', { 'low-opacity': !orderByPreferencia }]"
          style="font-size: 12px"
          title="Alternar ordenação de docentes por preferência"
          @click="orderByPreferencia = !orderByPreferencia"
        />
      </div>
    </v-td>
    <v-td class="table-data" width="80" type="content">
      <select type="text" v-model="turmaForm.turno1" @change="handleEditTurma">
        <option v-if="isIntegralEAD" value="EAD">EAD</option>
        <template v-else>
          <option value="Diurno">Diurno</option>
          <option value="Noturno">Noturno</option>
        </template>
      </select>
    </v-td>
    <v-td class="table-data" width="85" type="content">
      <select @change="checkHorario(1)" v-model.number="turmaForm.Horario1">
        <option v-if="!isIntegralEAD" />
        <option
          v-for="horario in HorariosFiltredByTurno"
          :key="horario.id + horario.horario"
          :value="horario.id"
        >
          {{ horario.horario }}
        </option>
      </select>

      <select
        v-if="hasMoreThan4Creditos"
        @change="checkHorario(2)"
        v-model.number="turmaForm.Horario2"
      >
        <template v-if="isParcialEAD">
          <option
            v-for="horario in HorariosEAD"
            :key="horario.horario + horario.id"
            :value="horario.id"
          >
            {{ horario.horario }}
          </option>
        </template>

        <template v-else>
          <option v-if="!isIntegralEAD" />
          <option
            v-for="horario in HorariosFiltredByTurno"
            :key="horario.horario + horario.id"
            :value="horario.id"
          >
            {{ horario.horario }}
          </option>
        </template>
      </select>
    </v-td>
    <v-td class="table-data" width="95" type="content">
      <template v-if="!isIntegralEAD">
        <select v-model.number="turmaForm.Sala1" @change="checkSala">
          <option v-if="!AllSalas.length" type="text">Nenhuma Sala Encontrada</option>
          <option v-else />

          <option v-for="sala in AllSalas" :key="sala.id + sala.nome" :value="sala.id">
            {{ sala.nome }}
          </option>
        </select>

        <select
          v-if="hasMoreThan4Creditos && turmaForm.disciplina.ead === 0"
          v-model.number="turmaForm.Sala2"
          @change="checkSala"
        >
          <option v-if="!AllSalas.length" type="text">Nenhuma Sala Encontrada</option>
          <option v-else />

          <option v-for="sala in AllSalas" :key="sala.nome + sala.id" :value="sala.id">
            {{ sala.nome }}
          </option>
        </select>
      </template>
    </v-td>
    <v-td class="table-data" width="45" type="content">
      <div class="d-flex flex-column justify-content-between py-1">
        <b class="mb-1">
          {{ totalPedidosNaoPeriodizados + totalPedidosPeriodizados }}
        </b>
        <span>{{ totalPedidosPeriodizados }}+{{ totalPedidosNaoPeriodizados }}</span>
      </div>
    </v-td>
    <v-td
      class="table-data"
      v-for="curso in cursosAtivados"
      :key="curso.id + curso.codigo"
      width="35"
      paddingX="0"
      type="none"
    >
        <template v-for="(pedido, index) in PedidosDaTurma">
          <template>
            <InputsPedidosDCC
              v-if="pedido.Curso === curso.id"
              :key="pedido.Turma + curso.Curso"
              :index="index"
              :turma="turma"
              :curso="curso"
              type="main"
            />
        </template>
      </template>
    </v-td>
  </tr>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { clone, cloneDeep, orderBy, isNull, find, filter } from "lodash-es";
import { maskTurmaLetra } from "@/common/mixins";
import { InputsPedidosDCC } from "@/components/ui";

export default {
  name: "TurmaRow",
  mixins: [maskTurmaLetra],
  components: {
    InputsPedidosDCC,
  },
  props: {
    turma: Object,
    curso: Object,
    cursosAtivados: Array,
    classes: Object,
  },
  data() {
    return {
      somasPorCurso: [],
      todasAsSomas: [],
      resultado: [],
      classes: {
        highlighted: -1,
        edited: -1,
      },
      periodoAtual: 1,
      dataAtual: new Date("August 20, 69 00:20:18"),
      currentData: null,
      turmaForm: null,
      orderByPreferencia: false,
    };
  },

  methods: {
    ...mapActions(["toggleTurmaToDelete", "editTurma"]),

    // retorna a letra da turma que há o conflito

    resetTurmaForm() {
      this.turmaForm = clone(this.turma);
      this.currentData = clone(this.turma);
      this.setDefaultHorarios();
    },
    clearHorarios() {
      this.turmaForm.Horario1 = null;
      this.turmaForm.Horario2 = null;
    },
    calcularSomaPorCurso(pedido, curso) {
    // Verifica se o curso do pedido corresponde ao curso atual
    if (pedido.Curso === curso.id) {
      // Verifica se a posição do curso já existe no vetor
      if (!this.somasPorCurso[curso.id]) {
        // Se não existir, crie-a e inicialize com 0
        this.somasPorCurso[curso.id] = 0;
      }
      // Some as vagasPeriodizadas e vagasNaoPeriodizadas ao valor atual
      this.somasPorCurso[curso.id] += pedido.vagasPeriodizadas + pedido.vagasNaoPeriodizadas;
    }
    
    /*const comprimento = this.somasPorCurso.length;
    for (let i = 0; i < comprimento; i++) {
        if(this.somasPorCurso[curso.id]){
          this.resultado[curso.id] += this.somasPorCurso[curso.id]; 
        }
    }*/
    
  },
    setDefaultHorarios() {
      if (this.turma.disciplina.ead === 1) {
        this.turmaForm.turno1 = "EAD";
        this.turmaForm.Horario1 = 31;
        this.turmaForm.Horario2 = 31;
      } else if (this.turma.disciplina.ead === 2) {
        this.turmaForm.Horario2 = 31;
      }
    },
    verificaElementoComId(array, idDesejado) {
      for (let i = 0; i < array.length; i++) {
        if ("id" in array[i] && array[i].id === idDesejado) {
          return true;
        }
      }
      return false;
    },
    checkHorariosPeriodo() {
      if (!this.checkHorarioDocente(1) && !this.checkHorarioSala(1)) {
        if (!this.checkHorarioDocente(2) && !this.checkHorarioSala(2)) {
          this.handleEditTurma();
        } else {
          this.turmaForm.Horario2 = this.currentData.Horario2;
          this.turmaForm.periodo = this.currentData.periodo;
        }
      } else {
        this.turmaForm.Horario1 = this.currentData.Horario1;
        this.turmaForm.periodo = this.currentData.periodo;
      }
    },
    checkHorario(horario) {
      if (!this.checkHorarioDocente(horario) && !this.checkHorarioSala(horario)) {
        this.handleEditTurma();
      } else {
        if (horario === 1) this.turmaForm.Horario1 = this.currentData.Horario1;
        else this.turmaForm.Horario2 = this.currentData.Horario2;
      }
    },
    checkDocente() {
      let d1 = !this.checkHorarioDocente(1),
        d2 = !this.checkHorarioDocente(2);
      if (d1 && d2) {
        this.handleEditTurma();
      } else {
        if (!d1) this.turmaForm.Docente1 = this.currentData.Docente1;
        if (!d2) this.turmaForm.Docente2 = this.currentData.Docente2;
      }
    },
    checkSala() {
      let s1 = !this.checkHorarioSala(1),
        s2 = !this.checkHorarioSala(2);
      if (s1 && s2) {
        this.handleEditTurma();
      } else {
        if (!s1) this.turmaForm.Sala1 = this.currentData.Sala1;
        if (!s2) this.turmaForm.Sala2 = this.currentData.Sala2;
      }
    },
    checkHorario_Conflitos(TF, t) {
      if (TF >= 4 && TF <= 29) {
        // OU É 16-18 OU 19-21
        if (TF % 2 === 0) {
          // É 16-18
          if (t % 2 !== 0 && t >= 32 && t <= 40) {
            // verifica se tur.Horario é 17-19
            if (
              t / TF === 32 / 4 ||
              t / TF === 34 / 10 ||
              t / TF === 36 / 16 ||
              t / TF === 38 / 22 ||
              t / TF === 40 / 28
            ) {
              // compara 16-18 com 17-19
              return true; // retorna verdadeiro para o conflito
            }
          }
        } else if (TF % 2 !== 0) {
          // É 19-21
          if (t % 2 !== 0 && t >= 33 && t <= 41) {
            // verifica se tur.Horario é 18-20
            if (
              t / TF === 33 / 5 ||
              t / TF === 35 / 11 ||
              t / TF === 37 / 17 ||
              t / TF === 39 / 23 ||
              t / TF === 41 / 29
            ) {
              // compara 19-21 com 18-20
              return true; // retorna verdadeiro para o conflito
            }
          }
        }
      } else if (TF >= 32 && TF <= 41) {
        // OU É 17-19 OU É 18-20
        if (TF % 2 === 0) {
          // É 17 - 19
          if (t % 2 === 0 && t >= 4 && t <= 28) {
            // verifica se tur.Horario é 16-18
            if (
              t / TF === 4 / 32 ||
              t / TF === 10 / 34 ||
              t / TF === 16 / 36 ||
              t / TF === 22 / 38 ||
              t / TF === 28 / 40
            ) {
              // compara 17-19 com 16-18
              return true; // retorna verdadeiro para o conflito
            }
          } else if (t % 2 !== 0 && t >= 33 && t <= 41) {
            // verifica se tur.Horario é 18-20
            if (
              t / TF === 33 / 32 ||
              t / TF === 35 / 34 ||
              t / TF === 37 / 36 ||
              t / TF === 39 / 38 ||
              t / TF === 41 / 40
            ) {
              // compara 17-19 com 18-20
              return true; // retorna verdadeiro para o conflito
            }
          }
        } else if (TF % 2 !== 0) {
          // É 18-20
          if (t % 2 === 0 && t >= 32 && t <= 40) {
            // verifica se tur.Horario é 17-19
            if (
              t / TF === 32 / 33 ||
              t / TF === 34 / 35 ||
              t / TF === 36 / 37 ||
              t / TF === 38 / 39 ||
              t / TF === 40 / 41
            ) {
              // compara 18-20 com 17-19
              return true; // retorna verdadeiro para o conflito
            }
          } else if (t % 2 !== 0 && t >= 5 && t <= 29) {
            // verifica se tur.HOrario é 19-21
            if (
              t / TF === 5 / 33 ||
              t / TF === 11 / 35 ||
              t / TF === 17 / 37 ||
              t / TF === 23 / 39 ||
              t / TF === 29 / 41
            ) {
              // compara 18-20 com 19-21
              return true; // retorna verdadeiro para o conflito
            }
          }
        }
      }
      return false; // não há conflito de interseção
    },
    retorna_HorarioString(horario) {
      var horarios = new Map();
      horarios.set(1, "2a 08-10");
      horarios.set(2, "2a 10-12");
      horarios.set(3, "2a 14-16");
      horarios.set(4, "2a 16-18");
      horarios.set(32, "2a 17-19");
      horarios.set(33, "2a 18-20");
      horarios.set(5, "2a 19-21");
      horarios.set(6, "2a 21-23");

      horarios.set(7, "3a 08-10");
      horarios.set(8, "3a 10-12");
      horarios.set(9, "3a 14-16");
      horarios.set(10, "3a 16-18");
      horarios.set(34, "3a 17-19");
      horarios.set(35, "3a 18-20");
      horarios.set(11, "3a 19-21");
      horarios.set(12, "3a 21-23");

      horarios.set(13, "4a 08-10");
      horarios.set(14, "4a 10-12");
      horarios.set(15, "4a 14-16");
      horarios.set(16, "4a 16-18");
      horarios.set(36, "4a 17-19");
      horarios.set(37, "4a 18-20");
      horarios.set(17, "4a 19-21");
      horarios.set(18, "4a 21-23");

      horarios.set(19, "5a 08-10");
      horarios.set(20, "5a 10-12");
      horarios.set(21, "5a 14-16");
      horarios.set(22, "5a 16-18");
      horarios.set(38, "5a 17-19");
      horarios.set(39, "5a 18-20");
      horarios.set(23, "5a 19-21");
      horarios.set(24, "5a 21-23");

      horarios.set(25, "6a 08-10");
      horarios.set(26, "6a 10-12");
      horarios.set(27, "6a 14-16");
      horarios.set(28, "6a 16-18");
      horarios.set(40, "6a 17-19");
      horarios.set(41, "6a 18-20");
      horarios.set(29, "6a 19-21");
      horarios.set(30, "6a 21-23");
      let retorno = "";

      for (var [key, value] of horarios) {
        if (horario === key) {
          retorno = value;
        }
      }
      horarios.clear();
      return retorno;
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
    notifyHorarioDocente(docente) {
      let extraInfo = this.encontrarTurmaDuplicada_HorarioDocente();
      let d =
        docente === 1
          ? find(this.DocentesAtivos, ["id", this.turmaForm.Docente1])
          : find(this.DocentesAtivos, ["id", this.turmaForm.Docente2]);
      let text = `Conflito com o docente ${d.apelido} no horário ${extraInfo}`;

      this.pushNotification({
        text: text,
        type: "error",
      });
    },
    encontrarTurmaDuplicada_HorarioDocente() {
      const found = this.AllTurmas.find((tur) => tur.id === this.turmaForm.id);
      let index = this.AllTurmas.indexOf(found);
      let lista = [...this.AllTurmas];

      lista.splice(index, 1);

      for (const tur of lista) {
        // Comparação de uma turma com um Professor (turmaForm) e um horario com uma turma de um professor e dois horários ok ok ok OK
        if (
          this.turmaForm.Horario2 === null &&
          this.turmaForm.Docente2 === null &&
          tur.Horario2 !== null &&
          tur.Docente2 === null
        ) {
          if (
            this.turmaForm.Docente1 === tur.Docente1 &&
            this.turmaForm.Horario1 === tur.Horario1 &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            this.turmaForm.Docente1 === tur.Docente1 &&
            this.turmaForm.Horario1 === tur.Horario2 &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario2)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            this.turmaForm.Docente1 === tur.Docente1 &&
            this.checkHorario_Conflitos(this.turmaForm.Horario1, tur.Horario1) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            this.turmaForm.Docente1 === tur.Docente1 &&
            this.checkHorario_Conflitos(this.turmaForm.Horario1, tur.Horario2) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario2)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
        }

        // Comparação turma com um professor e um horário com uma turma dois professores e dois horários  ok ok ok ok
        if (
          this.turmaForm.Horario2 === null &&
          this.turmaForm.Docente2 === null &&
          tur.Docente2 !== null &&
          tur.Horario2 !== null
        ) {
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente1 === tur.Docente2) &&
            this.turmaForm.Horario1 === tur.Horario1 &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente1 === tur.Docente2) &&
            this.turmaForm.Horario1 === tur.Horario2 &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario2)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente1 === tur.Docente2) &&
            this.checkHorario_Conflitos(this.turmaForm.Horario1, tur.Horario1) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente1 === tur.Docente2) &&
            this.checkHorario_Conflitos(this.turmaForm.Horario1, tur.Horario2) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario2)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
        }
        // Comparação turma com um professor e dois horarios com uma turma com dois professores e dois horários ok ok ok ok
        if (
          this.turmaForm.Horario2 !== null &&
          this.turmaForm.Docente2 === null &&
          tur.Horario2 !== null &&
          tur.Docente2 !== null
        ) {
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente1 === tur.Docente2) &&
            (this.turmaForm.Horario1 === tur.Horario1 ||
              this.turmaForm.Horario2 === tur.Horario1) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente1 === tur.Docente2) &&
            (this.turmaForm.Horario1 === tur.Horario2 ||
              this.turmaForm.Horario2 === tur.Horario2) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario2)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente1 === tur.Docente2) &&
            (this.checkHorario_Conflitos(this.turmaForm.Horario1, tur.Horario1) ||
              this.checkHorario_Conflitos(this.turmaForm.Horario2, tur.Horario1)) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente1 === tur.Docente2) &&
            (this.checkHorario_Conflitos(this.turmaForm.Horario1, tur.Horario2) ||
              this.checkHorario_Conflitos(this.turmaForm.Horario2, tur.Horario2)) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario2)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
        }
        // Comparação de uma turma de um professor e dois horários com uma turma com um Professor e um horario  ok ok ok OK
        if (
          this.turmaForm.Docente2 === null &&
          this.turmaForm.Horario2 !== null &&
          tur.Docente2 === null &&
          tur.Horario2 === null
        ) {
          if (
            this.turmaForm.Docente1 === tur.Docente1 &&
            (this.checkHorario_Conflitos(this.turmaForm.Horario1, tur.Horario1) ||
              this.checkHorario_Conflitos(this.turmaForm.Horario2, tur.Horario1) ||
              this.turmaForm.Horario1 === tur.Horario1 ||
              this.turmaForm.Horario2 === tur.Horario1) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
        }
        // Comparação de uma turma dois professores e dois horários com uma turma com um professor e um horário  ok ok ok ok
        if (
          this.turmaForm.Horario2 !== null &&
          this.turmaForm.Docente2 !== null &&
          tur.Horario2 === null &&
          tur.Docente2 === null
        ) {
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente2 === tur.Docente1) &&
            (this.turmaForm.Horario1 === tur.Horario1 ||
              this.turmaForm.Horario2 === tur.Horario1 ||
              this.checkHorario_Conflitos(this.turmaForm.Horario1, tur.Horario1) ||
              this.checkHorario_Conflitos(this.turmaForm.Horario2, tur.Horario1)) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
        }
        // Comparação turma com dois professores e dois horários com uma turma com um professor e dois horarios ok ok ok ok
        if (
          this.turmaForm.Horario2 !== null &&
          this.turmaForm.Docente2 !== null &&
          tur.Docente2 === null &&
          tur.Horario2 !== null
        ) {
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente2 === tur.Docente1) &&
            this.turmaForm.Horario1 === tur.Horario1 &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente2 === tur.Docente1) &&
            this.turmaForm.Horario2 === tur.Horario1 &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente2 === tur.Docente1) &&
            this.turmaForm.Horario1 === tur.Horario2 &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario2)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente2 === tur.Docente1) &&
            this.turmaForm.Horario2 === tur.Horario2 &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario2)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente2 === tur.Docente1) &&
            this.checkHorario_Conflitos(this.turmaForm.Horario1, tur.Horario1) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente2 === tur.Docente1) &&
            this.checkHorario_Conflitos(this.turmaForm.Horario1, tur.Horario2) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario2)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente2 === tur.Docente1) &&
            this.checkHorario_Conflitos(this.turmaForm.Horario2, tur.Horario1) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente2 === tur.Docente1) &&
            this.checkHorario_Conflitos(this.turmaForm.Horario2, tur.Horario2) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario2)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
        }
        // Comparação de uma turma com um horário com outra turma com um professor e um horário  OK OK OK OK
        if (
          this.turmaForm.Horario2 === null &&
          this.turmaForm.Docente2 === null &&
          tur.Horario2 === null &&
          tur.Docente2 === null
        ) {
          if (
            this.turmaForm.Horario1 === tur.Horario1 &&
            this.turmaForm.Docente1 === tur.Docente1 &&
            this.turmaForm.periodo === tur.periodo
          ) {            
            this.$emit("conflict", {highlighted: tur.id, edited: this.turmaForm.id} );
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            this.checkHorario_Conflitos(this.turmaForm.Horario1, tur.Horario1) &&
            this.turmaForm.Docente1 === tur.Docente1 &&
            this.turmaForm.periodo === tur.periodo
          ) {
            this.$emit("conflict", {highlighted: tur.id, edited: this.turmaForm.id});
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
        }
        // Comparação de uma turma com dois horários e um professor com uma turma com um professor e dois horários ok OK OK OK
        if (
          this.turmaForm.Horario2 !== null &&
          this.turmaForm.Docente2 === null &&
          tur.Horario2 !== null &&
          tur.Docente2 === null
        ) {
          if (
            this.turmaForm.Docente1 === tur.Docente1 &&
            (this.turmaForm.Horario1 === tur.Horario1 ||
              this.turmaForm.Horario2 === tur.Horario1) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            this.turmaForm.Docente1 === tur.Docente1 &&
            (this.turmaForm.Horario1 === tur.Horario2 ||
              this.turmaForm.Horario2 === tur.Horario2) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario2)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            this.turmaForm.Docente1 === tur.Docente1 &&
            (this.checkHorario_Conflitos(this.turmaForm.Horario1, tur.Horario1) ||
              this.checkHorario_Conflitos(this.turmaForm.Horario2, tur.Horario1)) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            this.turmaForm.Docente1 === tur.Docente1 &&
            (this.checkHorario_Conflitos(this.turmaForm.Horario1, tur.Horario2) ||
              this.checkHorario_Conflitos(this.turmaForm.Horario2, tur.Horario2)) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario2)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
        }
        // Comparação de uma turma com dois professores e dois horários com uma turmas com dois professores e dois horários OK OK OK ok
        if (
          this.turmaForm.Docente2 !== null &&
          this.turmaForm.Horario2 !== null &&
          tur.Docente2 !== null &&
          tur.Horario2 !== null
        ) {
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente1 === tur.Docente2 ||
              this.turmaForm.Docente2 === tur.Docente1 ||
              this.turmaForm.Docente2 === tur.Docente2) &&
            (this.turmaForm.Horario1 === tur.Horario1 ||
              this.turmaForm.Horario2 === tur.Horario1) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente1 === tur.Docente2 ||
              this.turmaForm.Docente2 === tur.Docente1 ||
              this.turmaForm.Docente2 === tur.Docente2) &&
            (this.turmaForm.Horario1 === tur.Horario2 ||
              this.turmaForm.Horario2 === tur.Horario2) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario2)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente1 === tur.Docente2 ||
              this.turmaForm.Docente2 === tur.Docente1 ||
              this.turmaForm.Docente2 === tur.Docente2) &&
            (this.checkHorario_Conflitos(this.turmaForm.Horario1, tur.Horario1) ||
              this.checkHorario_Conflitos(this.turmaForm.Horario2, tur.Horario1)) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente1 === tur.Docente2 ||
              this.turmaForm.Docente2 === tur.Docente1 ||
              this.turmaForm.Docente2 === tur.Docente2) &&
            (this.checkHorario_Conflitos(this.turmaForm.Horario1, tur.Horario2) ||
              this.checkHorario_Conflitos(this.turmaForm.Horario2, tur.Horario2)) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario2)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
        }
        // Comparação de uma turma com dois professores e um horário com uma turma com um professor e um horário
        if (
          this.turmaForm.Docente2 !== null &&
          this.turmaForm.Horario2 === null &&
          tur.Docente2 === null &&
          tur.Horario2 === null
        ) {
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente2 === tur.Docente1) &&
            this.turmaForm.Horario1 === tur.Horario1 &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente2 === tur.Docente1) &&
            this.checkHorario_Conflitos(this.turmaForm.Horario1, tur.Horario1) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
        }
        // Comparação de uma turma com um professor e um horário com uma turma com dois professores e um horário
        if (
          this.turmaForm.Docente2 === null &&
          this.turmaForm.Horario2 === null &&
          tur.Docente2 !== null &&
          tur.Horario2 === null
        ) {
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente1 === tur.Docente2) &&
            this.turmaForm.Horario1 === tur.Horario1 &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente1 === tur.Docente2) &&
            this.checkHorario_Conflitos(this.turmaForm.Horario1, tur.Horario1) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
        }

        // Comparação de uma turma com dois professores e um horário com uma turma com um professor e dois horários
        if (
          this.turmaForm.Docente2 !== null &&
          this.turmaForm.Horario2 === null &&
          tur.Docente2 === null &&
          tur.Horario2 !== null
        ) {
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente2 === tur.Docente1) &&
            this.turmaForm.Horario1 === tur.Horario1 &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente2 === tur.Docente1) &&
            this.turmaForm.Horario1 === tur.Horario2 &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario2)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente2 === tur.Docente1) &&
            this.checkHorario_Conflitos(this.turmaForm.Horario1, tur.Horario1) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente2 === tur.Docente1) &&
            this.checkHorario_Conflitos(this.turmaForm.Horario1, tur.Horario2) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario2)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
        }
        // Comparação de uma turma com um professor e dois horários com uma turma com dois professores e um horário
        if (
          this.turmaForm.Docente2 === null &&
          this.turmaForm.Horario2 !== null &&
          tur.Docente2 !== null &&
          tur.Horario2 === null
        ) {
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente1 === tur.Docente2) &&
            (this.turmaForm.Horario1 === tur.Horario1 ||
              this.turmaForm.Horario2 === tur.Horario1) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              (this.turmaForm.Docente1 === tur.Docente2 &&
                (this.checkHorario_Conflitos(this.turmaForm.Horario1, tur.Horario1) ||
                  this.checkHorario_Conflitos(this.turmaForm.Horario2, tur.Horario1)))) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
        }
        // Comparação de uma turma com dois professores e um horário com uma turma com dois professores e dois horários
        if (
          this.turmaForm.Docente2 !== null &&
          this.turmaForm.Horario2 === null &&
          tur.Docente2 !== null &&
          tur.Horario2 !== null
        ) {
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente2 === tur.Docente1 ||
              this.turmaForm.Docente1 === tur.Docente2 ||
              this.turmaForm.Docente2 === tur.Docente2) &&
            this.turmaForm.Horario1 === tur.Horario1 &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente2 === tur.Docente1 ||
              this.turmaForm.Docente1 === tur.Docente2 ||
              this.turmaForm.Docente2 === tur.Docente2) &&
            this.turmaForm.Horario1 === tur.Horario2 &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario2)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente2 === tur.Docente1 ||
              this.turmaForm.Docente1 === tur.Docente2 ||
              this.turmaForm.Docente2 === tur.Docente2) &&
            this.checkHorario_Conflitos(this.turmaForm.Horario1, tur.Horario1) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente2 === tur.Docente1 ||
              this.turmaForm.Docente1 === tur.Docente2 ||
              this.turmaForm.Docente2 === tur.Docente2) &&
            this.checkHorario_Conflitos(this.turmaForm.Horario1, tur.Horario2) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario2)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
        }
        // Comparação de uma turma com dois professores e dois horários com uma turma com dois professores e um horário
        if (
          this.turmaForm.Docente2 !== null &&
          this.turmaForm.Horario2 !== null &&
          tur.Docente2 !== null &&
          tur.Horario2 === null
        ) {
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente2 === tur.Docente1 ||
              this.turmaForm.Docente1 === tur.Docente2 ||
              this.turmaForm.Docente2 === tur.Docente2) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            (this.turmaForm.Docente1 === tur.Docente1 ||
              this.turmaForm.Docente2 === tur.Docente1 ||
              this.turmaForm.Docente1 === tur.Docente2 ||
              this.turmaForm.Docente2 === tur.Docente2) &&
            (this.checkHorario_Conflitos(this.turmaForm.Horario1, tur.Horario1) ||
              this.checkHorario_Conflitos(this.turmaForm.Horario2, tur.Horario1)) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
        }
      }
      return false;
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
    notifyHorarioSala(sala) {
      let extraInfo = this.encontrarTurmaDuplicada_HorarioSala();

      let s =
        sala === 1
          ? find(this.AllSalas, ["id", this.turmaForm.Sala1])
          : find(this.AllSalas, ["id", this.turmaForm.Sala2]);

      let text = `Conflito com a sala ${s.nome} no horário ${extraInfo}`;
      this.pushNotification({
        text: text,
        type: "error",
      });
    },
    encontrarTurmaDuplicada_HorarioSala() {
      const found = this.AllTurmas.find((tur) => tur.id === this.turmaForm.id);
      let index = this.AllTurmas.indexOf(found);
      let lista = [...this.AllTurmas];

      lista.splice(index, 1);

      for (const tur of lista) {
        // Comparação de uma turma com uma sala (turmaForm) e um horario com uma turma duas salas e dois horários ok ok
        if (
          this.turmaForm.Horario2 === null &&
          this.turmaForm.Sala2 === null &&
          tur.Horario2 !== null &&
          tur.Sala2 !== null
        ) {
          if (
            (this.turmaForm.Sala1 === tur.Sala1 || this.turmaForm.Sala1 === tur.Sala2) &&
            this.turmaForm.Horario1 === tur.Horario1 &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            (this.turmaForm.Sala1 === tur.Sala1 || this.turmaForm.Sala1 === tur.Sala2) &&
            this.turmaForm.Horario1 === tur.Horario2 &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario2)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            (this.turmaForm.Sala1 === tur.Sala1 || this.turmaForm.Sala1 === tur.Sala2) &&
            this.checkHorario_Conflitos(this.turmaForm.Horario1, tur.Horario1) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            (this.turmaForm.Sala1 === tur.Sala1 || this.turmaForm.Sala1 === tur.Sala2) &&
            this.checkHorario_Conflitos(this.turmaForm.Horario1, tur.Horario2) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario2)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
        }
        // Comparação turma com uma sala e um horário com uma turma sala e um horário ok ok

        if (
          this.turmaForm.Horario2 === null &&
          this.turmaForm.Sala2 === null &&
          tur.Horario2 === null &&
          tur.Sala2 === null
        ) {
          if (
            this.turmaForm.Sala1 === tur.Sala1 &&
            this.turmaForm.Horario1 === tur.Horario1 &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            this.turmaForm.Sala1 === tur.Sala1 &&
            this.checkHorario_Conflitos(this.turmaForm.Horario1, tur.Horario1) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
        }
        // Comparação turma com duas salas e dois horarios     ok ok
        if (
          this.turmaForm.Horario2 !== null &&
          this.turmaForm.Sala2 !== null &&
          tur.Horario2 !== null &&
          tur.Sala2 !== null
        ) {
          if (
            (this.turmaForm.Sala1 === tur.Sala1 ||
              this.turmaForm.Sala1 === tur.Sala2 ||
              this.turmaForm.Sala2 === tur.Sala1 ||
              this.turmaForm.Sala2 === tur.Sala2) &&
            (this.turmaForm.Horario1 === tur.Horario1 ||
              this.turmaForm.Horario2 === tur.Horario1) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            (this.turmaForm.Sala1 === tur.Sala1 ||
              this.turmaForm.Sala1 === tur.Sala2 ||
              this.turmaForm.Sala2 === tur.Sala1 ||
              this.turmaForm.Sala2 === tur.Sala2) &&
            (this.turmaForm.Horario1 === tur.Horario2 ||
              this.turmaForm.Horario2 === tur.Horario2) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario2)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            (this.turmaForm.Sala1 === tur.Sala1 ||
              this.turmaForm.Sala1 === tur.Sala2 ||
              this.turmaForm.Sala2 === tur.Sala1 ||
              this.turmaForm.Sala2 === tur.Sala2) &&
            (this.checkHorario_Conflitos(this.turmaForm.Horario1, tur.Horario1) ||
              this.checkHorario_Conflitos(this.turmaForm.Horario2, tur.Horario1)) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            (this.turmaForm.Sala1 === tur.Sala1 ||
              this.turmaForm.Sala1 === tur.Sala2 ||
              this.turmaForm.Sala2 === tur.Sala1 ||
              this.turmaForm.Sala2 === tur.Sala2) &&
            (this.checkHorario_Conflitos(this.turmaForm.Horario1, tur.Horario2) ||
              this.checkHorario_Conflitos(this.turmaForm.Horario2, tur.Horario2)) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario2)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
        }

        // Comparação de uma turma com duas salas e dois horarios com uma turma com um horário e uma sala ok ok
        if (
          this.turmaForm.Horario2 !== null &&
          this.turmaForm.Sala2 !== null &&
          tur.Horario2 === null &&
          tur.Sala2 === null
        ) {
          if (
            (this.turmaForm.Sala1 === tur.Sala1 || this.turmaForm.Sala2 === tur.Sala1) &&
            (this.turmaForm.Horario1 === tur.Horario1 ||
              this.turmaForm.Horario2 === tur.Horario1) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
          if (
            (this.turmaForm.Sala1 === tur.Sala1 || this.turmaForm.Sala2 === tur.Sala1) &&
            (this.checkHorario_Conflitos(this.turmaForm.Horario1, tur.Horario1) ||
              this.checkHorario_Conflitos(this.turmaForm.Horario2, tur.Horario1)) &&
            this.turmaForm.periodo === tur.periodo
          ) {
            return `${this.retorna_HorarioString(tur.Horario1)}. ${tur.disciplina.codigo} - ${
              tur.letra
            }`;
          }
        }
      }
      return "";
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
    async handleEditTurma() {
      try {
        this.setLoading({ type: "partial", value: true });

        await this.editTurma({ data: this.turmaForm, notify: true });
        this.currentData = cloneDeep(this.turmaForm);
      } catch (error) {
        this.turmaForm = cloneDeep(this.turma);
        this.pushNotification({
          type: "error",
          title: "Erro ao atualizar turma!",
          text: error.response
            ? "A combinação de disciplina, período e turma deve ser única."
            : error.message,
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },

    getPreferenciaDocente(docente) {
      let p = find(this.PreferenciasDisciplina, ["Docente", docente.id]);
      return p ? p.preferencia : false;
    },
  },
  

  computed: {
    ...mapGetters([
      "DocentesAtivos",
      "AllSalas",
      "AllHorarios",
      "AllCursos",
      "AllDisciplinas",
      "AllTurmas",
      "HorariosEAD",
      "HorariosNoturno",
      "HorariosDiurno",
      "TurmasToDelete",
      "Pedidos",
      "PreferenciasDocentes",
    ]),

    toggleToDelete: {
      set() {
        this.toggleTurmaToDelete(this.turma);
      },
      get() {
        return this.TurmasToDelete;
      },
    },

    HorariosFiltredByTurno() {
      const cadastroEAD = this.turmaForm.disciplina.ead;
      if (cadastroEAD === 1) return this.HorariosEAD;

      switch (this.turmaForm.turno1) {
      case "EAD":
        return this.HorariosEAD;
      case "Diurno":
        return this.HorariosDiurno;
      case "Noturno":
        return this.HorariosNoturno;
      default:
        return this.AllHorarios;
      }
    },
    isIntegralEAD() {
      return this.turmaForm.disciplina.ead === 1;
    },
    isParcialEAD() {
      return this.turma.disciplina.ead === 2;
    },
    hasMoreThan4Creditos() {
      return this.turmaForm.disciplina.creditoTotal >= 4;
    },
    totalPedidosPeriodizados() {
      return this.PedidosDaTurma.reduce((sum, pedido) => {
        return sum + parseInt(pedido.vagasPeriodizadas, 10);
      }, 0);
    },
    totalPedidosNaoPeriodizados() {
      return this.PedidosDaTurma.reduce((sum, pedido) => {
        return sum + parseInt(pedido.vagasNaoPeriodizadas, 10);
      }, 0);
    },
    PedidosDaTurma() {
      const pedidosDaTurma = this.Pedidos[this.turma.id];
      return pedidosDaTurma ? pedidosDaTurma : [];
    },
    PreferenciasDisciplina() {
      return filter(this.PreferenciasDocentes, {
        Disciplina: this.turmaForm.Disciplina,
      });
    },
    DocentesByPreferencia() {
      if (this.orderByPreferencia) {
        return orderBy(
          this.DocentesAtivos,
          (docente) => {
            let pref = find(this.PreferenciasDisciplina, ["Docente", docente.id]);
            return pref ? pref.preferencia : 0;
          },
          "desc"
        );
      } else {
        return this.DocentesAtivos;
      }
    },
  },

  watch: {
    turma: {
      handler: "resetTurmaForm",
      immediate: true,
    },
  },
};

function Notification(options) {
  this.message = options.message;
  this.onClick = options.onClick;
}

Notification.prototype.show = function() {
  const notificationDiv = document.createElement("div");
  notificationDiv.textContent = this.message;
  notificationDiv.style.backgroundColor = "blue";
  notificationDiv.style.color = "white";
  notificationDiv.style.cursor = "pointer";
  notificationDiv.addEventListener("click", this.onClick);

  document.body.appendChild(notificationDiv);
};
</script>

<style scoped>
.highlighted {
  background-color: #fbfb97 !important;
}
.turmarow {
  font-size: 11px;
}
.btn-table {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: none;
  background: none;
  font-size: 12px;
  padding: 0;
}
</style>
