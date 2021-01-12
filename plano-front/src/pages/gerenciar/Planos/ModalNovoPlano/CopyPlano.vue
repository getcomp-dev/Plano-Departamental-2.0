<template>
  <div>
    <p class="alert alert-secondary">
      Selecione as disciplinas para quais as turmas do atual plano
      <b>{{ currentPlano.nome + " - " + currentPlano.ano }}</b>
      serão copiadas para o novo plano.
    </p>

    <div class="div-table">
      <BaseTable type="modal" :hasSearchBar="true" :styles="'max-height:500px; height:500px'">
        <template #thead-search>
          <InputSearch
            v-model="searchDisciplinasModal"
            placeholder="Pesquise nome ou codigo de uma disciplina..."
          />
        </template>
        <template #thead>
          <v-th width="25" />
          <v-th-ordination
            :currentOrder="ordenacaoModal.disciplinas"
            orderToCheck="codigo"
            width="80"
            align="start"
          >
            Código
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoModal.disciplinas"
            orderToCheck="nome"
            width="260"
            align="start"
          >
            Nome
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoModal.disciplinas"
            orderToCheck="perfil.abreviacao"
            width="85"
            align="start"
          >
            Perfil
          </v-th-ordination>
        </template>

        <template #tbody>
          <tr
            v-for="disciplina in DisciplinasOrderedModal"
            :key="disciplina.id"
            @click="toggleItemInArray(disciplina.id, filtrosDisciplinas)"
            v-prevent-click-selection
          >
            <v-td width="25" type="content">
              <input type="checkbox" v-model="filtrosDisciplinas" :value="disciplina.id" />
            </v-td>
            <v-td width="80" align="start">{{ disciplina.codigo }}</v-td>
            <v-td width="260" align="start" :title="disciplina.nome">
              {{ disciplina.nome }}
            </v-td>
            <v-td width="85" align="start">{{ disciplina.perfil.abreviacao }}</v-td>
          </tr>

          <tr v-if="!DisciplinasOrderedModal.length">
            <v-td colspan="3" width="450">NENHUMA DISCIPLINA ENCONTRADA.</v-td>
          </tr>
        </template>
      </BaseTable>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { union, difference, find, filter, orderBy, some } from "lodash-es";
import turmaService from "@/services/turma";
import pedidoService from "@/services/pedido";
import pedidoExternoService from "@/services/pedidoExterno";
import turmaExternaService from "@/services/turmaExterna";
import { normalizeText } from "@/common/utils";
import { toggleItemInArray, preventClickSelection } from "@/common/mixins";
import { InputSearch } from "@/components/ui";

export default {
  name: "ModalNovoPlano",
  mixins: [toggleItemInArray, preventClickSelection],
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
    };
  },

  methods: {
    ...mapActions(["createPlano"]),

    selectAllDisciplinas() {
      this.filtrosDisciplinas = union(
        this.filtrosDisciplinas,
        this.DisciplinasFiltredModal.map((disciplina) => disciplina.id)
      );
    },
    selectNoneDisciplinas() {
      this.filtrosDisciplinas = difference(
        this.filtrosDisciplinas,
        this.DisciplinasFiltredModal.map((disciplina) => disciplina.id)
      );
    },

    generateGradesAtivas(ano) {
      const gradesAtivas = {
        semestre1: { CCD: [], CCN: [], EC: [], SI: [] },
        semestre2: { CCD: [], CCN: [], EC: [], SI: [] },
      };
      //define grades ativas por periodo
      let grades;
      let periodoInicial, periodoFinal;

      //CCD
      grades = filter(this.AllGrades, ["Curso", 4]);
      periodoFinal = 0;
      for (let i = 0; i < grades.length; i++) {
        periodoInicial = periodoFinal + 1;
        periodoFinal =
          1 +
          2 * (parseInt(ano, 10) - parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
          (1 - parseInt(grades[i].periodoInicio.slice(5, 6), 10)) / 2;
        gradesAtivas.semestre1.CCD.push({
          id: grades[i].id,
          inicio: periodoInicial,
          fim: periodoFinal,
        });
        if (periodoFinal > 9) {
          break;
        }
      }
      periodoFinal = 0;
      for (let i = 0; i < grades.length; i++) {
        periodoInicial = periodoFinal + 1;
        periodoFinal =
          1 +
          2 * (parseInt(ano, 10) - parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
          (3 - parseInt(grades[i].periodoInicio.slice(5, 6), 10)) / 2;
        gradesAtivas.semestre2.CCD.push({
          id: grades[i].id,
          inicio: periodoInicial,
          fim: periodoFinal,
        });
        if (periodoFinal > 9) {
          break;
        }
      }

      //CCN
      grades = filter(this.AllGrades, ["Curso", 1]);
      periodoFinal = 0;
      for (let i = 0; i < grades.length; i++) {
        periodoInicial = periodoFinal + 1;
        periodoFinal =
          1 +
          2 * (parseInt(ano, 10) - parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
          (1 - parseInt(grades[i].periodoInicio.slice(5, 6), 10)) / 2;
        gradesAtivas.semestre1.CCN.push({
          id: grades[i].id,
          inicio: periodoInicial,
          fim: periodoFinal,
        });
        if (periodoFinal > 9) {
          break;
        }
      }
      periodoFinal = 0;
      for (let i = 0; i < grades.length; i++) {
        periodoInicial = periodoFinal + 1;
        periodoFinal =
          1 +
          2 * (parseInt(ano, 10) - parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
          (3 - parseInt(grades[i].periodoInicio.slice(5, 6), 10)) / 2;
        gradesAtivas.semestre2.CCN.push({
          id: grades[i].id,
          inicio: periodoInicial,
          fim: periodoFinal,
        });
        if (periodoFinal > 9) {
          break;
        }
      }

      //SI
      grades = filter(this.AllGrades, ["Curso", 3]);
      periodoFinal = 0;
      for (let i = 0; i < grades.length; i++) {
        periodoInicial = periodoFinal + 1;
        periodoFinal =
          1 +
          2 * (parseInt(ano, 10) - parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
          (1 - parseInt(grades[i].periodoInicio.slice(5, 6), 10)) / 2;
        gradesAtivas.semestre1.SI.push({
          id: grades[i].id,
          inicio: periodoInicial,
          fim: periodoFinal,
        });
        if (periodoFinal > 9) {
          break;
        }
      }
      periodoFinal = 0;
      for (let i = 0; i < grades.length; i++) {
        periodoInicial = periodoFinal + 1;
        periodoFinal =
          1 +
          2 * (parseInt(ano, 10) - parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
          (3 - parseInt(grades[i].periodoInicio.slice(5, 6), 10)) / 2;
        gradesAtivas.semestre2.SI.push({
          id: grades[i].id,
          inicio: periodoInicial,
          fim: periodoFinal,
        });
        if (periodoFinal > 9) {
          break;
        }
      }

      //EC
      grades = filter(this.AllGrades, ["Curso", 2]);
      periodoFinal = 0;
      for (let i = 0; i < grades.length; i++) {
        periodoInicial = periodoFinal + 1;
        periodoFinal =
          1 +
          2 * (parseInt(ano, 10) - parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
          (1 - parseInt(grades[i].periodoInicio.slice(5, 6), 10)) / 2;
        gradesAtivas.semestre1.EC.push({
          id: grades[i].id,
          inicio: periodoInicial,
          fim: periodoFinal,
        });
        if (periodoFinal > 9) {
          break;
        }
      }
      periodoFinal = 0;
      for (let i = 0; i < grades.length; i++) {
        periodoInicial = periodoFinal + 1;
        periodoFinal =
          1 +
          2 * (parseInt(ano, 10) - parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
          (3 - parseInt(grades[i].periodoInicio.slice(5, 6), 10)) / 2;
        gradesAtivas.semestre2.EC.push({
          id: grades[i].id,
          inicio: periodoInicial,
          fim: periodoFinal,
        });
        if (periodoFinal > 9) {
          break;
        }
      }

      return gradesAtivas;
    },
    generateTurmasNovoPlano() {
      const gradesAtivas = this.generateGradesAtivas(this.plano.ano);
      const turmasNovoPlano = [];

      //# 1 Semestre - Preenche as disciplina da grade
      let disciplinasGrade1Semestre = [];
      for (let i = 0; i < gradesAtivas.semestre1.CCD.length; i++) {
        let disciplinasGrade = filter(this.$store.state.disciplinaGrade.DisciplinaGrades, {
          Grade: gradesAtivas.semestre1.CCD[i].id,
        });
        disciplinasGrade.forEach((disciplina) => {
          if (disciplina.periodo % 2 === 1) {
            if (
              disciplina.periodo >= gradesAtivas.semestre1.CCD[i].inicio &&
              disciplina.periodo <= gradesAtivas.semestre1.CCD[i].fim
            ) {
              let t = find(disciplinasGrade1Semestre, {
                Disciplina: disciplina.Disciplina,
              });
              if (t === undefined) {
                disciplinasGrade1Semestre.push({
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
      for (let i = 0; i < gradesAtivas.semestre1.EC.length; i++) {
        let disciplinasGrade = filter(this.$store.state.disciplinaGrade.DisciplinaGrades, {
          Grade: gradesAtivas.semestre1.EC[i].id,
        });
        disciplinasGrade.forEach((disciplina) => {
          if (disciplina.periodo % 2 === 1) {
            if (
              disciplina.periodo >= gradesAtivas.semestre1.EC[i].inicio &&
              disciplina.periodo <= gradesAtivas.semestre1.EC[i].fim
            ) {
              let t = find(disciplinasGrade1Semestre, {
                Disciplina: disciplina.Disciplina,
              });
              if (t === undefined) {
                disciplinasGrade1Semestre.push({
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
      for (let i = 0; i < gradesAtivas.semestre1.CCN.length; i++) {
        let disciplinasGrade = filter(this.$store.state.disciplinaGrade.DisciplinaGrades, {
          Grade: gradesAtivas.semestre1.CCN[i].id,
        });
        disciplinasGrade.forEach((disciplina) => {
          if (disciplina.periodo % 2 === 0) {
            if (
              disciplina.periodo >= gradesAtivas.semestre1.CCN[i].inicio &&
              disciplina.periodo <= gradesAtivas.semestre1.CCN[i].fim
            ) {
              let t = find(disciplinasGrade1Semestre, {
                Disciplina: disciplina.Disciplina,
              });
              if (t === undefined) {
                disciplinasGrade1Semestre.push({
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
      for (let i = 0; i < gradesAtivas.semestre1.SI.length; i++) {
        let disciplinasGrade = filter(this.$store.state.disciplinaGrade.DisciplinaGrades, {
          Grade: gradesAtivas.semestre1.SI[i].id,
        });
        disciplinasGrade.forEach((disciplina) => {
          if (disciplina.periodo % 2 === 0) {
            if (
              disciplina.periodo >= gradesAtivas.semestre1.SI[i].inicio &&
              disciplina.periodo <= gradesAtivas.semestre1.SI[i].fim
            ) {
              let t = find(disciplinasGrade1Semestre, {
                Disciplina: disciplina.Disciplina,
              });
              if (t === undefined) {
                disciplinasGrade1Semestre.push({
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

      //# 2 Semestre - Preenche as disciplina da grade
      let disciplinasGrade2Semestre = [];
      for (let i = 0; i < gradesAtivas.semestre2.CCD.length; i++) {
        let disciplinasGrade = filter(this.$store.state.disciplinaGrade.DisciplinaGrades, {
          Grade: gradesAtivas.semestre2.CCD[i].id,
        });
        disciplinasGrade.forEach((disciplina) => {
          if (disciplina.periodo % 2 === 0) {
            if (
              disciplina.periodo >= gradesAtivas.semestre2.CCD[i].inicio &&
              disciplina.periodo <= gradesAtivas.semestre2.CCD[i].fim
            ) {
              let t = find(disciplinasGrade2Semestre, {
                Disciplina: disciplina.Disciplina,
              });
              if (t === undefined) {
                disciplinasGrade2Semestre.push({
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
      for (let i = 0; i < gradesAtivas.semestre2.EC.length; i++) {
        let disciplinasGrade = filter(this.$store.state.disciplinaGrade.DisciplinaGrades, {
          Grade: gradesAtivas.semestre2.EC[i].id,
        });
        disciplinasGrade.forEach((disciplina) => {
          if (disciplina.periodo % 2 === 0) {
            if (
              disciplina.periodo >= gradesAtivas.semestre2.EC[i].inicio &&
              disciplina.periodo <= gradesAtivas.semestre2.EC[i].fim
            ) {
              let t = find(disciplinasGrade2Semestre, {
                Disciplina: disciplina.Disciplina,
              });
              if (t === undefined) {
                disciplinasGrade2Semestre.push({
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
      for (let i = 0; i < gradesAtivas.semestre2.CCN.length; i++) {
        let disciplinasGrade = filter(this.$store.state.disciplinaGrade.DisciplinaGrades, {
          Grade: gradesAtivas.semestre2.CCN[i].id,
        });
        disciplinasGrade.forEach((disciplina) => {
          if (disciplina.periodo % 2 === 1) {
            if (
              disciplina.periodo >= gradesAtivas.semestre2.CCN[i].inicio &&
              disciplina.periodo <= gradesAtivas.semestre2.CCN[i].fim
            ) {
              let t = find(disciplinasGrade2Semestre, {
                Disciplina: disciplina.Disciplina,
              });
              if (t === undefined) {
                disciplinasGrade2Semestre.push({
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
      for (let i = 0; i < gradesAtivas.semestre2.SI.length; i++) {
        let disciplinasGrade = filter(this.$store.state.disciplinaGrade.DisciplinaGrades, {
          Grade: gradesAtivas.semestre2.SI[i].id,
        });
        disciplinasGrade.forEach((disciplina) => {
          if (disciplina.periodo % 2 === 1) {
            if (
              disciplina.periodo >= gradesAtivas.semestre2.SI[i].inicio &&
              disciplina.periodo <= gradesAtivas.semestre2.SI[i].fim
            ) {
              let t = find(disciplinasGrade2Semestre, {
                Disciplina: disciplina.Disciplina,
              });
              if (t === undefined) {
                disciplinasGrade2Semestre.push({
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

      //Filtra apenas disicplinas DCC
      disciplinasGrade1Semestre = filter(disciplinasGrade1Semestre, (disciplinaGrade) =>
        some(this.DisciplinasDCC, ["id", disciplinaGrade.Disciplina])
      );
      disciplinasGrade2Semestre = filter(disciplinasGrade1Semestre, (disciplinaGrade) =>
        some(this.DisciplinasDCC, ["id", disciplinaGrade.Disciplina])
      );

      // Prenche turmasNovoPlano
      disciplinasGrade1Semestre.forEach((disciplinaGrade) => {
        if (!this.filtrosDisciplinas.includes(disciplinaGrade.Disciplina)) {
          if (
            (disciplinaGrade.CCD || disciplinaGrade.EC) &&
            (disciplinaGrade.CCN || disciplinaGrade.SI)
          ) {
            turmasNovoPlano.push({
              semestre: 1,
              Disciplina: disciplinaGrade.Disciplina,
              turno: "Diurno",
              letra: "A",
              CCD: disciplinaGrade.CCD,
              EC: disciplinaGrade.EC,
            });
            turmasNovoPlano.push({
              semestre: 1,
              Disciplina: disciplinaGrade.Disciplina,
              turno: "Noturno",
              letra: "B",
              CCN: disciplinaGrade.CCN,
              SI: disciplinaGrade.SI,
            });
          } else if (disciplinaGrade.CCD || disciplinaGrade.EC) {
            turmasNovoPlano.push({
              semestre: 1,
              Disciplina: disciplinaGrade.Disciplina,
              turno: "Diurno",
              letra: "A",
              CCD: disciplinaGrade.CCD,
              EC: disciplinaGrade.EC,
            });
          } else if (disciplinaGrade.CCN || disciplinaGrade.SI) {
            turmasNovoPlano.push({
              semestre: 1,
              Disciplina: disciplinaGrade.Disciplina,
              turno: "Noturno",
              letra: "A",
              CCN: disciplinaGrade.CCN,
              SI: disciplinaGrade.SI,
            });
          }
        }
      });
      disciplinasGrade2Semestre.forEach((disciplinaGrade) => {
        if (!this.filtrosDisciplinas.includes(disciplinaGrade.Disciplina)) {
          if (
            (disciplinaGrade.CCD || disciplinaGrade.EC) &&
            (disciplinaGrade.CCN || disciplinaGrade.SI)
          ) {
            turmasNovoPlano.push({
              semestre: 3,
              Disciplina: disciplinaGrade.Disciplina,
              turno: "Diurno",
              letra: "A",
              CCD: disciplinaGrade.CCD,
              EC: disciplinaGrade.EC,
            });
            turmasNovoPlano.push({
              semestre: 3,
              Disciplina: disciplinaGrade.Disciplina,
              turno: "Noturno",
              letra: "B",
              CCN: disciplinaGrade.CCN,
              SI: disciplinaGrade.SI,
            });
          } else if (disciplinaGrade.CCD || disciplinaGrade.EC) {
            turmasNovoPlano.push({
              semestre: 3,
              Disciplina: disciplinaGrade.Disciplina,
              turno: "Diurno",
              letra: "A",
              CCD: disciplinaGrade.CCD,
              EC: disciplinaGrade.EC,
            });
          } else if (disciplinaGrade.CCN || disciplinaGrade.SI) {
            turmasNovoPlano.push({
              semestre: 3,
              Disciplina: disciplinaGrade.Disciplina,
              turno: "Noturno",
              letra: "A",
              CCN: disciplinaGrade.CCN,
              SI: disciplinaGrade.SI,
            });
          }
        }
      });

      return turmasNovoPlano;
    },
    handleCopyPlano() {
      this.setLoading({ type: "partial", value: true });
      const turmasNovoPlano = this.generateTurmasNovoPlano();

      this.createPlano({ data: this.plano })
        .then((plano) => {
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
                Plano: plano.id,
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
                    .then(() => {})
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
                    .then(() => {})
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
                    .then(() => {})
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
                    .then(() => {})
                    .catch((error) => {
                      console.log("erro ao atualizar pedido: " + error);
                    });
                }
              })
              .catch((error) => {
                console.log("erro ao criar turma: " + error);
              });
          });

          let turmasCopiar = filter(this.$store.state.turma.Turmas, (t) => {
            let disciplina = this.filtrosDisciplinas.includes(t.Disciplina);
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
                Plano: plano.id,
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
                    .then(() => {})
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
                Plano: plano.id,
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
                    .then(() => {})
                    .catch((error) => {
                      console.log("erro ao atualizar pedido externo: " + error);
                    });
                });
              })
              .catch((error) => {
                console.log("erro ao criar turma externa: " + error);
              });
          });
        })
        .then(() => {
          this.$store.dispatch("fetchAll").then(() => {
            this.setLoading({ type: "partial", value: false });
          });
        });
    },
  },

  computed: {
    ...mapGetters(["DisciplinasDCC", "AllGrades"]),

    DisciplinasOrderedModal() {
      return orderBy(
        this.DisciplinasFiltredModal,
        this.ordenacaoModal.disciplinas.order,
        this.ordenacaoModal.disciplinas.type
      );
    },
    DisciplinasFiltredModal() {
      if (this.searchDisciplinasModal === "") return this.DisciplinasDCC;

      const searchNormalized = normalizeText(this.searchDisciplinasModal);

      return filter(this.DisciplinasDCC, (disciplina) => {
        const disciplinaNome = normalizeText(disciplina.nome);
        const disciplinaCodigo = normalizeText(disciplina.codigo);

        return disciplinaNome.match(searchNormalized) || disciplinaCodigo.match(searchNormalized);
      });
    },
  },
};
</script>
