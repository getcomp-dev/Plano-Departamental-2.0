<template>
  <BaseModal2
    ref="baseModalNovoPlano"
    title="Turmas do novo plano"
    type="editTurma"
    :hasBackground="true"
    :hasFooter="true"
    :btnOkText="'Criar plano'"
    @on-close="searchDisciplinasModal = ''"
  >
    <template #modal-body>
      <p class="alert alert-secondary" v-if="currentPlano">
        Selecione as disciplinas para quais as turmas do plano atual
        <b>{{ currentPlano.nome + " - " + currentPlano.ano }}</b>
        serão copiadas para o novo plano
      </p>

      <div class="div-table">
        <BaseTable
          :type="'modal'"
          :styles="'max-height: 500px;height:500px'"
          :hasSearchBar="true"
        >
          <template #thead-search>
            <InputSearch
              v-model="searchDisciplinasModal"
              placeholder="Pesquise nome ou codigo de uma disciplina..."
            />
          </template>
          <template #thead>
            <th style="width: 25px"></th>
            <th
              title="Código"
              class="t-start clickable"
              style="width: 70px"
              @click="toggleOrder(ordenacaoModal.disciplinas, 'codigo')"
            >
              Cód.
              <i
                :class="setIconByOrder(ordenacaoModal.disciplinas, 'codigo')"
              ></i>
            </th>
            <th
              class="t-start clickable"
              style="width: 270px"
              @click="toggleOrder(ordenacaoModal.disciplinas, 'nome')"
            >
              Nome
              <i
                :class="setIconByOrder(ordenacaoModal.disciplinas, 'nome')"
              ></i>
            </th>
            <th
              class="t-start clickable"
              style="width: 85px"
              @click="
                toggleOrder(ordenacaoModal.disciplinas, 'perfilAbreviacao')
              "
            >
              Perfil
              <i
                :class="
                  setIconByOrder(ordenacaoModal.disciplinas, 'perfilAbreviacao')
                "
              ></i>
            </th>
          </template>
          <template #tbody>
            <tr
              v-for="disciplina in DisciplinasOrderedModal"
              :key="'MdDisciplina' + disciplina.id"
              @click="toggleItemInArray(disciplina.id, filtrosDisciplinas)"
            >
              <td style="width: 25px">
                <input
                  type="checkbox"
                  class="form-check-input position-static m-0"
                  v-model="filtrosDisciplinas"
                  :value="disciplina.id"
                />
              </td>
              <td style="width: 70px" class="t-start">
                {{ disciplina.codigo }}
              </td>
              <td style="width: 270px" class="t-start">
                {{ disciplina.nome }}
              </td>
              <td style="width: 85px" class="t-start">
                {{ disciplina.perfil.abreviacao }}
              </td>
            </tr>
            <tr v-if="DisciplinasOrderedModal.length === 0">
              <td colspan="3" style="width:450px">
                NENHUMA DISCIPLINA ENCONTRADA.
              </td>
            </tr>
          </template>
        </BaseTable>
      </div>
    </template>
    <template #modal-footer>
      <div>
        <BaseButton
          :type="'text'"
          :color="'lightblue'"
          @click="selectAllDisciplinas"
        >
          Selecionar Todos
        </BaseButton>
        <BaseButton
          :type="'text'"
          :color="'gray'"
          @click="selectNoneDisciplinas"
        >
          Desmarcar Todos
        </BaseButton>

        <slot name="modal-footer-btn"></slot>
      </div>
      <BaseButton
        class="paddingX-20"
        :type="'text'"
        :color="'green'"
        @click="createNovoPlano"
      >
        OK
      </BaseButton>
    </template>
  </BaseModal2>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import pedidoExternoService from "@/common/services/pedidoExterno";
import turmaExternaService from "@/common/services/turmaExterna";
import planoService from "@/common/services/plano";
import turmaService from "@/common/services/turma";
import pedidoService from "@/common/services/pedido";
import { normalizeText } from "@/common/utils";
import { toggleOrdination, toggleItemInArray } from "@/common/mixins";
import { InputSearch } from "@/components/ui";

export default {
  name: "ModalNovoPlano",
  mixins: [toggleItemInArray, toggleOrdination],
  components: { InputSearch },
  props: {
    plano: { type: Object, required: true },
  },
  data() {
    return {
      searchDisciplinasModal: "",
      filtrosDisciplinas: [],
      ordenacaoModal: {
        disciplinas: { order: "codigo", type: "asc" },
      },
      grades1semestre: { CCD: [], CCN: [], EC: [], SI: [] },
      grades2semestre: { CCD: [], CCN: [], EC: [], SI: [] },
    };
  },

  methods: {
    ...mapActions(["setPartialLoading"]),

    open() {
      this.$refs.baseModalNovoPlano.open();
    },
    close() {
      this.$refs.baseModalNovoPlano.close();
    },
    selectAllDisciplinas() {
      this.filtrosDisciplinas = [
        ...this.$_.map(this.DisciplinasInPerfis, (disciplina) => disciplina.id),
      ];
    },
    selectNoneDisciplinas() {
      this.filtrosDisciplinas = [];
    },
    gradesAtivas(ano) {
      //define grades ativas por periodo
      let g;
      let periodoInicial, periodoFinal;
      //CCD
      g = this.$_.filter(this.$store.state.grade.Grades, ["Curso", 4]);
      g = this.$_.orderBy(g, "periodoInicio", "desc");
      periodoFinal = 0;
      for (let i = 0; i < g.length; i++) {
        periodoInicial = periodoFinal + 1;
        periodoFinal =
          1 +
          2 *
            (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
          (1 - parseInt(g[i].periodoInicio.slice(5, 6), 10)) / 2;
        this.grades1semestre.CCD.push({
          id: g[i].id,
          inicio: periodoInicial,
          fim: periodoFinal,
        });
        if (periodoFinal > 9) {
          break;
        }
      }
      periodoFinal = 0;
      for (let i = 0; i < g.length; i++) {
        periodoInicial = periodoFinal + 1;
        periodoFinal =
          1 +
          2 *
            (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
          (3 - parseInt(g[i].periodoInicio.slice(5, 6), 10)) / 2;
        this.grades2semestre.CCD.push({
          id: g[i].id,
          inicio: periodoInicial,
          fim: periodoFinal,
        });
        if (periodoFinal > 9) {
          break;
        }
      }
      //CCN
      g = this.$_.filter(this.$store.state.grade.Grades, ["Curso", 1]);
      g = this.$_.orderBy(g, "periodoInicio", "desc");
      periodoFinal = 0;
      for (let i = 0; i < g.length; i++) {
        periodoInicial = periodoFinal + 1;
        periodoFinal =
          1 +
          2 *
            (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
          (1 - parseInt(g[i].periodoInicio.slice(5, 6), 10)) / 2;
        this.grades1semestre.CCN.push({
          id: g[i].id,
          inicio: periodoInicial,
          fim: periodoFinal,
        });
        if (periodoFinal > 9) {
          break;
        }
      }
      periodoFinal = 0;
      for (let i = 0; i < g.length; i++) {
        periodoInicial = periodoFinal + 1;
        periodoFinal =
          1 +
          2 *
            (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
          (3 - parseInt(g[i].periodoInicio.slice(5, 6), 10)) / 2;
        this.grades2semestre.CCN.push({
          id: g[i].id,
          inicio: periodoInicial,
          fim: periodoFinal,
        });
        if (periodoFinal > 9) {
          break;
        }
      }
      //SI
      g = this.$_.filter(this.$store.state.grade.Grades, ["Curso", 3]);
      g = this.$_.orderBy(g, "periodoInicio", "desc");
      periodoFinal = 0;
      for (let i = 0; i < g.length; i++) {
        periodoInicial = periodoFinal + 1;
        periodoFinal =
          1 +
          2 *
            (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
          (1 - parseInt(g[i].periodoInicio.slice(5, 6), 10)) / 2;
        this.grades1semestre.SI.push({
          id: g[i].id,
          inicio: periodoInicial,
          fim: periodoFinal,
        });
        if (periodoFinal > 9) {
          break;
        }
      }
      periodoFinal = 0;
      for (let i = 0; i < g.length; i++) {
        periodoInicial = periodoFinal + 1;
        periodoFinal =
          1 +
          2 *
            (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
          (3 - parseInt(g[i].periodoInicio.slice(5, 6), 10)) / 2;
        this.grades2semestre.SI.push({
          id: g[i].id,
          inicio: periodoInicial,
          fim: periodoFinal,
        });
        if (periodoFinal > 9) {
          break;
        }
      }
      //EC
      g = this.$_.filter(this.$store.state.grade.Grades, ["Curso", 2]);
      g = this.$_.orderBy(g, "periodoInicio", "desc");
      periodoFinal = 0;
      for (let i = 0; i < g.length; i++) {
        periodoInicial = periodoFinal + 1;
        periodoFinal =
          1 +
          2 *
            (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
          (1 - parseInt(g[i].periodoInicio.slice(5, 6), 10)) / 2;
        this.grades1semestre.EC.push({
          id: g[i].id,
          inicio: periodoInicial,
          fim: periodoFinal,
        });
        if (periodoFinal > 9) {
          break;
        }
      }
      periodoFinal = 0;
      for (let i = 0; i < g.length; i++) {
        periodoInicial = periodoFinal + 1;
        periodoFinal =
          1 +
          2 *
            (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
          (3 - parseInt(g[i].periodoInicio.slice(5, 6), 10)) / 2;
        this.grades2semestre.EC.push({
          id: g[i].id,
          inicio: periodoInicial,
          fim: periodoFinal,
        });
        if (periodoFinal > 9) {
          break;
        }
      }
    },

    generateTurmasNovoPlano() {
      this.gradesAtivas(this.plano.ano);
      let disciplinasNovoPlano1Semestre = [];
      let disciplinasNovoPlano2Semestre = [];
      for (let i = 0; i < this.grades1semestre.CCD.length; i++) {
        let disciplinasGrade = this.$_.filter(
          this.$store.state.disciplinaGrade.DisciplinaGrades,
          { Grade: this.grades1semestre.CCD[i].id }
        );
        disciplinasGrade.forEach((disciplina) => {
          if (disciplina.periodo % 2 === 1) {
            if (
              disciplina.periodo >= this.grades1semestre.CCD[i].inicio &&
              disciplina.periodo <= this.grades1semestre.CCD[i].fim
            ) {
              let t = this.$_.find(disciplinasNovoPlano1Semestre, {
                Disciplina: disciplina.Disciplina,
              });
              if (t === undefined) {
                disciplinasNovoPlano1Semestre.push({
                  Disciplina: disciplina.Disciplina,
                  CCD: true,
                  EC: false,
                  CCN: false,
                  SI: false,
                  periodo: 1,
                });
              } else {
                t.CCD = true;
              }
            }
          }
        });
      }
      for (let i = 0; i < this.grades1semestre.EC.length; i++) {
        let disciplinasGrade = this.$_.filter(
          this.$store.state.disciplinaGrade.DisciplinaGrades,
          { Grade: this.grades1semestre.EC[i].id }
        );
        disciplinasGrade.forEach((disciplina) => {
          if (disciplina.periodo % 2 === 1) {
            if (
              disciplina.periodo >= this.grades1semestre.EC[i].inicio &&
              disciplina.periodo <= this.grades1semestre.EC[i].fim
            ) {
              let t = this.$_.find(disciplinasNovoPlano1Semestre, {
                Disciplina: disciplina.Disciplina,
              });
              if (t === undefined) {
                disciplinasNovoPlano1Semestre.push({
                  Disciplina: disciplina.Disciplina,
                  CCD: false,
                  EC: true,
                  CCN: false,
                  SI: false,
                  periodo: 1,
                });
              } else {
                t.EC = true;
              }
            }
          }
        });
      }
      for (let i = 0; i < this.grades1semestre.CCN.length; i++) {
        let disciplinasGrade = this.$_.filter(
          this.$store.state.disciplinaGrade.DisciplinaGrades,
          { Grade: this.grades1semestre.CCN[i].id }
        );
        disciplinasGrade.forEach((disciplina) => {
          if (disciplina.periodo % 2 === 0) {
            if (
              disciplina.periodo >= this.grades1semestre.CCN[i].inicio &&
              disciplina.periodo <= this.grades1semestre.CCN[i].fim
            ) {
              let t = this.$_.find(disciplinasNovoPlano1Semestre, {
                Disciplina: disciplina.Disciplina,
              });
              if (t === undefined) {
                disciplinasNovoPlano1Semestre.push({
                  Disciplina: disciplina.Disciplina,
                  CCD: false,
                  EC: false,
                  CCN: true,
                  SI: false,
                  periodo: 1,
                });
              } else {
                t.CCN = true;
              }
            }
          }
        });
      }
      for (let i = 0; i < this.grades1semestre.SI.length; i++) {
        let disciplinasGrade = this.$_.filter(
          this.$store.state.disciplinaGrade.DisciplinaGrades,
          { Grade: this.grades1semestre.SI[i].id }
        );
        disciplinasGrade.forEach((disciplina) => {
          if (disciplina.periodo % 2 === 0) {
            if (
              disciplina.periodo >= this.grades1semestre.SI[i].inicio &&
              disciplina.periodo <= this.grades1semestre.SI[i].fim
            ) {
              let t = this.$_.find(disciplinasNovoPlano1Semestre, {
                Disciplina: disciplina.Disciplina,
              });
              if (t === undefined) {
                disciplinasNovoPlano1Semestre.push({
                  Disciplina: disciplina.Disciplina,
                  CCD: false,
                  EC: false,
                  CCN: false,
                  SI: true,
                  periodo: 1,
                });
              } else {
                t.SI = true;
              }
            }
          }
        });
      }
      for (let i = 0; i < this.grades2semestre.CCD.length; i++) {
        let disciplinasGrade = this.$_.filter(
          this.$store.state.disciplinaGrade.DisciplinaGrades,
          { Grade: this.grades2semestre.CCD[i].id }
        );
        disciplinasGrade.forEach((disciplina) => {
          if (disciplina.periodo % 2 === 0) {
            if (
              disciplina.periodo >= this.grades2semestre.CCD[i].inicio &&
              disciplina.periodo <= this.grades2semestre.CCD[i].fim
            ) {
              let t = this.$_.find(disciplinasNovoPlano2Semestre, {
                Disciplina: disciplina.Disciplina,
              });
              if (t === undefined) {
                disciplinasNovoPlano2Semestre.push({
                  Disciplina: disciplina.Disciplina,
                  CCD: true,
                  EC: false,
                  CCN: false,
                  SI: false,
                  periodo: 3,
                });
              } else {
                t.CCD = true;
              }
            }
          }
        });
      }
      for (let i = 0; i < this.grades2semestre.EC.length; i++) {
        let disciplinasGrade = this.$_.filter(
          this.$store.state.disciplinaGrade.DisciplinaGrades,
          { Grade: this.grades2semestre.EC[i].id }
        );
        disciplinasGrade.forEach((disciplina) => {
          if (disciplina.periodo % 2 === 0) {
            if (
              disciplina.periodo >= this.grades2semestre.EC[i].inicio &&
              disciplina.periodo <= this.grades2semestre.EC[i].fim
            ) {
              let t = this.$_.find(disciplinasNovoPlano2Semestre, {
                Disciplina: disciplina.Disciplina,
              });
              if (t === undefined) {
                disciplinasNovoPlano2Semestre.push({
                  Disciplina: disciplina.Disciplina,
                  CCD: false,
                  EC: true,
                  CCN: false,
                  SI: false,
                  periodo: 3,
                });
              } else {
                t.EC = true;
              }
            }
          }
        });
      }
      for (let i = 0; i < this.grades2semestre.CCN.length; i++) {
        let disciplinasGrade = this.$_.filter(
          this.$store.state.disciplinaGrade.DisciplinaGrades,
          { Grade: this.grades2semestre.CCN[i].id }
        );
        disciplinasGrade.forEach((disciplina) => {
          if (disciplina.periodo % 2 === 1) {
            if (
              disciplina.periodo >= this.grades2semestre.CCN[i].inicio &&
              disciplina.periodo <= this.grades2semestre.CCN[i].fim
            ) {
              let t = this.$_.find(disciplinasNovoPlano2Semestre, {
                Disciplina: disciplina.Disciplina,
              });
              if (t === undefined) {
                disciplinasNovoPlano2Semestre.push({
                  Disciplina: disciplina.Disciplina,
                  CCD: false,
                  EC: false,
                  CCN: true,
                  SI: false,
                  periodo: 3,
                });
              } else {
                t.CCN = true;
              }
            }
          }
        });
      }
      for (let i = 0; i < this.grades2semestre.SI.length; i++) {
        let disciplinasGrade = this.$_.filter(
          this.$store.state.disciplinaGrade.DisciplinaGrades,
          { Grade: this.grades2semestre.SI[i].id }
        );
        disciplinasGrade.forEach((disciplina) => {
          if (disciplina.periodo % 2 === 1) {
            if (
              disciplina.periodo >= this.grades2semestre.SI[i].inicio &&
              disciplina.periodo <= this.grades2semestre.SI[i].fim
            ) {
              let t = this.$_.find(disciplinasNovoPlano2Semestre, {
                Disciplina: disciplina.Disciplina,
              });
              if (t === undefined) {
                disciplinasNovoPlano2Semestre.push({
                  Disciplina: disciplina.Disciplina,
                  CCD: false,
                  EC: false,
                  CCN: false,
                  SI: true,
                  periodo: 3,
                });
              } else {
                t.SI = true;
              }
            }
          }
        });
      }
      disciplinasNovoPlano1Semestre = this.$_.filter(
        disciplinasNovoPlano1Semestre,
        (d) => {
          let perfil = this.$_.find(this.AllDisciplinas, {
            id: d.Disciplina,
          }).Perfil;
          return perfil !== 13 && perfil !== 15;
        }
      );
      disciplinasNovoPlano2Semestre = this.$_.filter(
        disciplinasNovoPlano2Semestre,
        (d) => {
          let perfil = this.$_.find(this.AllDisciplinas, {
            id: d.Disciplina,
          }).Perfil;
          return perfil !== 13 && perfil !== 15;
        }
      );
      let turmasNovoPlano = [];
      disciplinasNovoPlano1Semestre.forEach((d) => {
        if (!this.$_.includes(this.filtrosDisciplinas, d.Disciplina)) {
          if ((d.CCD || d.EC) && (d.CCN || d.SI)) {
            turmasNovoPlano.push({
              semestre: 1,
              Disciplina: d.Disciplina,
              turno: "Diurno",
              letra: "A",
              CCD: d.CCD,
              EC: d.EC,
            });
            turmasNovoPlano.push({
              semestre: 1,
              Disciplina: d.Disciplina,
              turno: "Noturno",
              letra: "B",
              CCN: d.CCN,
              SI: d.SI,
            });
          } else if (d.CCD || d.EC) {
            turmasNovoPlano.push({
              semestre: 1,
              Disciplina: d.Disciplina,
              turno: "Diurno",
              letra: "A",
              CCD: d.CCD,
              EC: d.EC,
            });
          } else if (d.CCN || d.SI) {
            turmasNovoPlano.push({
              semestre: 1,
              Disciplina: d.Disciplina,
              turno: "Noturno",
              letra: "A",
              CCN: d.CCN,
              SI: d.SI,
            });
          }
        }
      });
      disciplinasNovoPlano2Semestre.forEach((d) => {
        if (!this.$_.includes(this.filtrosDisciplinas, d.Disciplina)) {
          if ((d.CCD || d.EC) && (d.CCN || d.SI)) {
            turmasNovoPlano.push({
              semestre: 3,
              Disciplina: d.Disciplina,
              turno: "Diurno",
              letra: "A",
              CCD: d.CCD,
              EC: d.EC,
            });
            turmasNovoPlano.push({
              semestre: 3,
              Disciplina: d.Disciplina,
              turno: "Noturno",
              letra: "B",
              CCN: d.CCN,
              SI: d.SI,
            });
          } else if (d.CCD || d.EC) {
            turmasNovoPlano.push({
              semestre: 3,
              Disciplina: d.Disciplina,
              turno: "Diurno",
              letra: "A",
              CCD: d.CCD,
              EC: d.EC,
            });
          } else if (d.CCN || d.SI) {
            turmasNovoPlano.push({
              semestre: 3,
              Disciplina: d.Disciplina,
              turno: "Noturno",
              letra: "A",
              CCN: d.CCN,
              SI: d.SI,
            });
          }
        }
      });
      //{Disciplina:id, CCD:true/false, EC:true/false, CCN:true/false, SI:true/false, periodo:1/3}

      return turmasNovoPlano;
    },

    createNovoPlano() {
      this.setPartialLoading(true);
      let turmasNovoPlano = this.generateTurmasNovoPlano();

      planoService.create(this.plano).then((plano) => {
        turmasNovoPlano.forEach((t) => {
          turmaService
            .create({
              id: undefined,
              periodo: t.semestre,
              letra: t.letra,
              turno1: t.turno,
              turno2: undefined,
              Disciplina: t.Disciplina,
              Docente1: undefined,
              Docente2: undefined,
              Horario1: undefined,
              Horario2: undefined,
              Sala1: undefined,
              Sala2: undefined,
              Plano: plano.Plano.id,
            })
            .then((turma) => {
              if (t.CCN) {
                pedidoService
                  .update(1, turma.Turma.id, {
                    Turma: turma.Turma.id,
                    Curso: 1,
                    vagasPeriodizadas: 1,
                    vagasNaoPeriodizadas: 0,
                  })
                  .then((response) => {})
                  .catch((error) => {
                    console.log("erro ao atualizar pedido: " + error);
                  });
              }
              if (t.EC) {
                pedidoService
                  .update(2, turma.Turma.id, {
                    Turma: turma.Turma.id,
                    Curso: 2,
                    vagasPeriodizadas: 1,
                    vagasNaoPeriodizadas: 0,
                  })
                  .then((response) => {})
                  .catch((error) => {
                    console.log("erro ao atualizar pedido: " + error);
                  });
              }
              if (t.SI) {
                pedidoService
                  .update(3, turma.Turma.id, {
                    Turma: turma.Turma.id,
                    Curso: 3,
                    vagasPeriodizadas: 1,
                    vagasNaoPeriodizadas: 0,
                  })
                  .then((response) => {})
                  .catch((error) => {
                    console.log("erro ao atualizar pedido: " + error);
                  });
              }
              if (t.CCD) {
                pedidoService
                  .update(4, turma.Turma.id, {
                    Turma: turma.Turma.id,
                    Curso: 4,
                    vagasPeriodizadas: 1,
                    vagasNaoPeriodizadas: 0,
                  })
                  .then((response) => {})
                  .catch((error) => {
                    console.log("erro ao atualizar pedido: " + error);
                  });
              }
            })
            .catch((error) => {
              console.log("erro ao criar turma: " + error);
            });
        });
        let turmasCopiar = this.$_.filter(
          this.$store.state.turma.Turmas,
          (t) => {
            let disciplina = this.$_.includes(
              this.filtrosDisciplinas,
              t.Disciplina
            );
            if (disciplina) return true;
            else return false;
          }
        );

        turmasCopiar.forEach((t) => {
          turmaService
            .create({
              id: undefined,
              periodo: t.periodo,
              letra: t.letra,
              turno1: t.turno1,
              turno2: undefined,
              Disciplina: t.Disciplina,
              Horario1: t.Horario1,
              Horario2: t.Horario2,
              Sala1: undefined,
              Sala2: undefined,
              Plano: plano.Plano.id,
            })
            .then((turma) => {
              let pedidos = this.$store.state.pedido.Pedidos[t.id];
              pedidos.forEach((p) => {
                pedidoService
                  .update(p.Curso, turma.Turma.id, {
                    Turma: turma.Turma.id,
                    Curso: p.Curso,
                    vagasPeriodizadas: p.vagasPeriodizadas,
                    vagasNaoPeriodizadas: 0,
                  })
                  .then((response) => {})
                  .catch((error) => {
                    console.log("erro ao atualizar pedido: " + error);
                  });
              });
            })
            .catch((error) => {
              console.log("erro ao criar turma externa: " + error);
            });
        });
        this.$store.state.turmaExterna.Turmas.forEach((t) => {
          turmaExternaService
            .create({
              id: undefined,
              periodo: t.periodo,
              letra: t.letra,
              turno1: t.turno1,
              turno2: undefined,
              Disciplina: t.Disciplina,
              Horario1: t.Horario1,
              Horario2: t.Horario2,
              Sala1: undefined,
              Sala2: undefined,
              Plano: plano.Plano.id,
            })
            .then((turma) => {
              let pedidos = this.$store.state.pedidoExterno.Pedidos[t.id];
              pedidos.forEach((p) => {
                pedidoExternoService
                  .update(p.Curso, turma.Turma.id, {
                    Turma: turma.Turma.id,
                    Curso: p.Curso,
                    vagasPeriodizadas: p.vagasPeriodizadas,
                    vagasNaoPeriodizadas: p.vagasNaoPeriodizadas,
                  })
                  .then((response) => {})
                  .catch((error) => {
                    console.log("erro ao atualizar pedido externo: " + error);
                  });
              });
            })
            .catch((error) => {
              console.log("erro ao criar turma externa: " + error);
            });
        });

        this.$store.dispatch("fetchAll").then(() => {
          setTimeout(() => {
            this.setPartialLoading(false);
            this.close();
          }, 300);
        });
      });
    },
  },

  computed: {
    ...mapGetters([
      "allPlanos",
      "DisciplinasInPerfis",
      "AllDisciplinas",
      "currentPlanoId",
    ]),

    DisciplinasOrderedModal() {
      return this.$_.orderBy(
        this.DisciplinasFiltredModal,
        this.ordenacaoModal.disciplinas.order,
        this.ordenacaoModal.disciplinas.type
      );
    },

    DisciplinasFiltredModal() {
      if (this.searchDisciplinasModal === "") return this.DisciplinasInPerfis;

      const searchNormalized = normalizeText(this.searchDisciplinasModal);

      return this.$_.filter(this.DisciplinasInPerfis, (disciplina) => {
        const disciplinaNome = normalizeText(disciplina.nome);
        const disciplinaCodigo = normalizeText(disciplina.codigo);

        return (
          disciplinaNome.match(searchNormalized) ||
          disciplinaCodigo.match(searchNormalized)
        );
      });
    },

    currentPlano() {
      return this.$_.find(
        this.allPlanos,
        (plano) => plano.id === this.currentPlanoId
      );
    },
  },
};
</script>

<style scoped>
.alert {
  word-break: break-word;
  font-size: 12px;
  padding: 8px 10px;
  padding-right: 20px;
  margin-bottom: 0.5rem;
  background-color: #e9ecef !important;
}
.form-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 14px;
}
select,
textarea {
  font-size: 14px;
  padding: 5px;
}
.form-container .form-row {
  position: relative;
  margin: 0 !important;
  margin-bottom: 10px !important;
  width: 100%;
}
.form-row label {
  width: 100%;
  font-weight: bold;
}
.form-row .input-ano {
  width: 100px;
  height: 30px;
}
</style>
