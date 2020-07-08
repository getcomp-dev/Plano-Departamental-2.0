<template>
  <BaseModal
    ref="baseModalNovoPlano"
    :modalOptions="{
      position: 'centerNavbar',
      hasBackground: 'true',
      title: 'Criar novo plano',
      hasFooter: true,
    }"
  >
    <template #modal-body>
      <div class="form-container">
        <div class="form-row">
          <label for="planoAno">Ano: </label>

          <select
            id="planoAno"
            v-model.number="planoForm.ano"
            class="form-control input-ano"
          >
            <option v-for="year in Years" :key="'anos' + year" :value="year">
              {{ year }}</option
            >
          </select>
        </div>
        <div class="form-row">
          <label for="planoObs">Observações: </label>
          <textarea
            id="planoObs"
            cols="30"
            rows="2"
            v-model="planoForm.obs"
            class="form-control"
          ></textarea>
        </div>
      </div>
      <!-- TABLE DISCIPLINAS -->
      <div class="div-table">
        <BaseTable
          :type="'modal'"
          :styles="'height: 400px;'"
          :hasSearchBar="true"
        >
          <template #thead-search>
            <input
              type="text"
              class="form-control input-search"
              placeholder="Pesquise nome ou codigo de uma disciplina..."
              v-model="searchDisciplinasModal"
            />
            <button
              @click="searchDisciplinasModal = ''"
              class="btn btn-search"
              style="font-weight: bold "
            >
              <i class="fas fa-times"></i>
            </button>
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
                {{ disciplina.perfilAbreviacao }}
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
          @click="selectAllDisciplinas()"
          :type="'text'"
          :color="'lightblue'"
        >
          Selecionar todos
        </BaseButton>
        <BaseButton
          @click="selectNoneDisciplinas()"
          :type="'text'"
          :color="'gray'"
        >
          Desmarcar todos
        </BaseButton>
      </div>
      <BaseButton
        @click="novoPlano()"
        class="ml-auto"
        :type="'text'"
        :color="'green'"
      >
        Criar Plano
      </BaseButton>
      <!-- <button class="btn btn-success ml-auto" ></button> -->
    </template>
  </BaseModal>
</template>

<script>
import _ from "lodash";
import pedidoExternoService from "@/common/services/pedidoExterno";
import planoService from "@/common/services/plano";
import turmaService from "@/common/services/turma";
import pedidoService from "@/common/services/pedido";
import turmaExternaService from "@/common/services/turmaExterna";
import { COMPONENT_LOADING, COMPONENT_LOADED } from "@/vuex/mutation-types";
import {
  toggleOrdination,
  toggleItemInArray,
  notification,
} from "@/mixins/index.js";
import { BaseModal, BaseTable, BaseButton } from "@/components/index.js";

const emptyPlano = {
  ano: new Date().getFullYear(),
  obs: "",
};
export default {
  name: "ModalUser",
  mixins: [notification, toggleItemInArray, toggleOrdination],
  components: { BaseModal, BaseTable, BaseButton },
  data() {
    return {
      planoForm: _.clone(emptyPlano),
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
    open() {
      this.$refs.baseModalNovoPlano.open();
    },
    clearPlanoForm() {
      this.planoForm = _.clone(emptyPlano);
    },
    selectAllDisciplinas() {
      this.filtrosDisciplinas = [
        ..._.map(this.DisciplinasInPerfis, (disciplina) => disciplina.id),
      ];
    },
    selectNoneDisciplinas() {
      this.filtrosDisciplinas = [];
    },
    normalizeText(text) {
      return text
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s/g, "");
    },

    gradesAtivas(ano) {
      //define grades ativas por periodo
      let g;
      let periodoInicial, periodoFinal;
      //CCD
      g = _.filter(this.$store.state.grade.Grades, ["Curso", 4]);
      g = _.orderBy(g, "periodoInicio", "desc");
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
      g = _.filter(this.$store.state.grade.Grades, ["Curso", 1]);
      g = _.orderBy(g, "periodoInicio", "desc");
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
      g = _.filter(this.$store.state.grade.Grades, ["Curso", 3]);
      g = _.orderBy(g, "periodoInicio", "desc");
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
      g = _.filter(this.$store.state.grade.Grades, ["Curso", 2]);
      g = _.orderBy(g, "periodoInicio", "desc");
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
      this.gradesAtivas(this.planoForm.ano);
      let disciplinasNovoPlano1Semestre = [];
      let disciplinasNovoPlano2Semestre = [];
      for (let i = 0; i < this.grades1semestre.CCD.length; i++) {
        let disciplinasGrade = _.filter(
          this.$store.state.disciplinaGrade.DisciplinaGrades,
          { Grade: this.grades1semestre.CCD[i].id }
        );
        disciplinasGrade.forEach((disciplina) => {
          if (disciplina.periodo % 2 === 1) {
            if (
              disciplina.periodo >= this.grades1semestre.CCD[i].inicio &&
              disciplina.periodo <= this.grades1semestre.CCD[i].fim
            ) {
              let t = _.find(disciplinasNovoPlano1Semestre, {
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
        let disciplinasGrade = _.filter(
          this.$store.state.disciplinaGrade.DisciplinaGrades,
          { Grade: this.grades1semestre.EC[i].id }
        );
        disciplinasGrade.forEach((disciplina) => {
          if (disciplina.periodo % 2 === 1) {
            if (
              disciplina.periodo >= this.grades1semestre.EC[i].inicio &&
              disciplina.periodo <= this.grades1semestre.EC[i].fim
            ) {
              let t = _.find(disciplinasNovoPlano1Semestre, {
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
        let disciplinasGrade = _.filter(
          this.$store.state.disciplinaGrade.DisciplinaGrades,
          { Grade: this.grades1semestre.CCN[i].id }
        );
        disciplinasGrade.forEach((disciplina) => {
          if (disciplina.periodo % 2 === 0) {
            if (
              disciplina.periodo >= this.grades1semestre.CCN[i].inicio &&
              disciplina.periodo <= this.grades1semestre.CCN[i].fim
            ) {
              let t = _.find(disciplinasNovoPlano1Semestre, {
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
        let disciplinasGrade = _.filter(
          this.$store.state.disciplinaGrade.DisciplinaGrades,
          { Grade: this.grades1semestre.SI[i].id }
        );
        disciplinasGrade.forEach((disciplina) => {
          if (disciplina.periodo % 2 === 0) {
            if (
              disciplina.periodo >= this.grades1semestre.SI[i].inicio &&
              disciplina.periodo <= this.grades1semestre.SI[i].fim
            ) {
              let t = _.find(disciplinasNovoPlano1Semestre, {
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
        let disciplinasGrade = _.filter(
          this.$store.state.disciplinaGrade.DisciplinaGrades,
          { Grade: this.grades2semestre.CCD[i].id }
        );
        disciplinasGrade.forEach((disciplina) => {
          if (disciplina.periodo % 2 === 0) {
            if (
              disciplina.periodo >= this.grades2semestre.CCD[i].inicio &&
              disciplina.periodo <= this.grades2semestre.CCD[i].fim
            ) {
              let t = _.find(disciplinasNovoPlano2Semestre, {
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
        let disciplinasGrade = _.filter(
          this.$store.state.disciplinaGrade.DisciplinaGrades,
          { Grade: this.grades2semestre.EC[i].id }
        );
        disciplinasGrade.forEach((disciplina) => {
          if (disciplina.periodo % 2 === 0) {
            if (
              disciplina.periodo >= this.grades2semestre.EC[i].inicio &&
              disciplina.periodo <= this.grades2semestre.EC[i].fim
            ) {
              let t = _.find(disciplinasNovoPlano2Semestre, {
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
        let disciplinasGrade = _.filter(
          this.$store.state.disciplinaGrade.DisciplinaGrades,
          { Grade: this.grades2semestre.CCN[i].id }
        );
        disciplinasGrade.forEach((disciplina) => {
          if (disciplina.periodo % 2 === 1) {
            if (
              disciplina.periodo >= this.grades2semestre.CCN[i].inicio &&
              disciplina.periodo <= this.grades2semestre.CCN[i].fim
            ) {
              let t = _.find(disciplinasNovoPlano2Semestre, {
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
        let disciplinasGrade = _.filter(
          this.$store.state.disciplinaGrade.DisciplinaGrades,
          { Grade: this.grades2semestre.SI[i].id }
        );
        disciplinasGrade.forEach((disciplina) => {
          if (disciplina.periodo % 2 === 1) {
            if (
              disciplina.periodo >= this.grades2semestre.SI[i].inicio &&
              disciplina.periodo <= this.grades2semestre.SI[i].fim
            ) {
              let t = _.find(disciplinasNovoPlano2Semestre, {
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
      disciplinasNovoPlano1Semestre = _.filter(
        disciplinasNovoPlano1Semestre,
        (d) => {
          let perfil = _.find(this.Disciplinas, {
            id: d.Disciplina,
          }).Perfil;
          return perfil !== 13 && perfil !== 15;
        }
      );
      disciplinasNovoPlano2Semestre = _.filter(
        disciplinasNovoPlano2Semestre,
        (d) => {
          let perfil = _.find(this.Disciplinas, {
            id: d.Disciplina,
          }).Perfil;
          return perfil !== 13 && perfil !== 15;
        }
      );
      let turmasNovoPlano = [];
      disciplinasNovoPlano1Semestre.forEach((d) => {
        if (!_.find(this.filtrosDisciplinas, { id: d.Disciplina })) {
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
        if (!_.find(this.filtrosDisciplinas, { id: d.Disciplina })) {
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
      console.log(turmasNovoPlano[0]);
      return turmasNovoPlano;
    },
    novoPlano() {
      this.$store.commit(COMPONENT_LOADING);

      let turmasNovoPlano = this.generateTurmasNovoPlano();
      console.log("TURMAS GENERATED");

      planoService.create(this.planoForm).then((plano) => {
        localStorage.setItem("Plano", plano.Plano.id);
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
        let turmasCopiar = _.filter(this.$store.state.turma.Turmas, (t) => {
          let disciplina = _.includes(this.filtrosDisciplinas, t.Disciplina);
          if (disciplina) return true;
          else return false;
        });
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
        console.log("PLANO GENERATED");
        this.$store.dispatch("fetchAll");

        setTimeout(() => {
          console.log("END LOADING");
          this.$store.commit(COMPONENT_LOADED);
        }, 300);
      });
    },
  },
  computed: {
    DisciplinasOrderedModal() {
      return _.orderBy(
        this.DisciplinasFiltredModal,
        this.ordenacaoModal.disciplinas.order,
        this.ordenacaoModal.disciplinas.type
      );
    },
    DisciplinasFiltredModal() {
      if (this.searchDisciplinasModal === "") return this.DisciplinasInPerfis;

      const searchNormalized = this.normalizeText(this.searchDisciplinasModal);

      return _.filter(this.DisciplinasInPerfis, (disciplina) => {
        const disciplinaNome = this.normalizeText(disciplina.nome);
        const disciplinaCodigo = this.normalizeText(disciplina.codigo);

        return (
          disciplinaNome.match(searchNormalized) ||
          disciplinaCodigo.match(searchNormalized)
        );
      });
    },
    DisciplinasInPerfis() {
      const disciplinasResultantes = [];

      this.Disciplinas.forEach((disciplina) => {
        const perfilFounded = _.find(
          this.Perfis,
          (perfil) => perfil.id === disciplina.Perfil
        );

        if (perfilFounded) {
          disciplinasResultantes.push({
            ...disciplina,
            perfilNome: perfilFounded.nome,
            perfilAbreviacao: perfilFounded.abreviacao,
          });
        }
      });
      return disciplinasResultantes;
    },
    Perfis() {
      return this.$store.state.perfil.Perfis;
    },
    Disciplinas() {
      return this.$store.state.disciplina.Disciplinas;
    },
    Years() {
      let yearsArry = [];
      let firstYear = 2019;
      let currentYear = new Date().getFullYear();
      let lastYear = currentYear + 5;

      while (firstYear <= lastYear) {
        yearsArry.push(parseInt(firstYear, 10));
        firstYear++;
      }
      return yearsArry;
    },
  },
};
</script>

<style scoped>
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
