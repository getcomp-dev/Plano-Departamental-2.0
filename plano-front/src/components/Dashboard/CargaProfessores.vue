<template>
  <div class="DashboardCargaProfessores row pr-2">
    <!-- Titulo -->
    <div
      class="col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0"
      style="height:38px;"
    >
      <div class="form-inline col-12 pl-0 mb-1 pr-1">
        <h1 class="titulo col-7 col-sm-5 col-md-4 col-xl-2">Carga Professores</h1>

        <div
          class="form-group col-5 col-sm-7 col-md-8 col-xl-10 mb-0 pr-0"
          style="justify-content: flex-end;"
        >
          <button type="button" class="relatbtn" title="Relatório" v-on:click.prevent="pdf">
            <i class="far fa-file-alt"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="w-100 mb-2 border-bottom"></div>

    <div class="divTable p-0" ref="carga">
      <table class="table table-hover border table-sm">
        <thead class="thead-light sticky">
          <tr>
            <div
              style="display: block; overflow: hidden; width: ‭845‬px; height:20px !important"
              class="sticky"
            >
              <th scope="col">
                <p
                  class="p-header"
                  style="width: 130px; text-align: start !important; padding-left: 5px;"
                >Nome</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 24px">S.</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 80px">Cod</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 300px">Disciplina</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 24px">T.</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 180px">Horário</p>
              </th>
              <th scope="col" id="creditos1">
                <p class="p-header" style="width: 32px">CS1</p>
                <b-popover :target="'creditos1'" placement="bottom" triggers="hover focus">
                  <p>Somatório dos créditos no 1º semestre</p>
                </b-popover>
              </th>
              <th scope="col" id="creditos2">
                <p class="p-header" style="width: 32px">CS2</p>
                <b-popover :target="'creditos2'" placement="bottom" triggers="hover focus">
                  <p>Somatório dos créditos no 2º semestre</p>
                </b-popover>
              </th>
              <th scope="col" id="creditostotal">
                <p class="p-header" style="width: 42px">CTotal</p>
                <b-popover :target="'creditostotal'" placement="bottom" triggers="hover focus">
                  <p>Somatório total dos créditos</p>
                </b-popover>
              </th>
            </div>
          </tr>
        </thead>
        <tbody>
          <template v-if="Professores.length > 0">
            <template v-for="professor in Professores">
              <template v-if="turmas(professor).length > 0">
                <div class="linhas" style="width: ‭845‬px;" :key="professor.apelido">
                  <td class="prof-td">
                    <div style="width: 130px">{{professor.apelido}}</div>
                  </td>
                  <td class="prof-td">
                    <div style="width: 24px"></div>
                  </td>
                  <td class="prof-td">
                    <div style="width: 80px"></div>
                  </td>
                  <td class="prof-td">
                    <div style="width: 300px; height: 20px;"></div>
                  </td>
                  <td class="prof-td">
                    <div style="width: 24px"></div>
                  </td>
                  <td class="prof-td">
                    <div style="width: 180px"></div>
                  </td>
                  <td class="prof-td">
                    <div style="width: 32px">{{creditos1(professor)}}</div>
                  </td>
                  <td class="prof-td">
                    <div style="width: 32px">{{creditos2(professor)}}</div>
                  </td>
                  <td class="prof-td">
                    <div style="width: 42px; ">{{creditos(professor)}}</div>
                  </td>
                </div>
              </template>

              <template v-for="turma in turmas(professor)">
                <tr
                  v-for="disciplina in Disciplinas"
                  :key="'turma'+turma.id+'disciplina'+disciplina.id+'professor'+professor.id"
                >
                  <template
                    v-if="turma.Disciplina===disciplina.id && (turma.Docente1===professor.id || turma.Docente2===professor.id)"
                  >
                    <div class="linhas" style="width: ‭845‬px;">
                      <td>
                        <p style="width: 130px"></p>
                      </td>
                      <td>
                        <p style="width: 24px">{{turma.periodo}}</p>
                      </td>
                      <td>
                        <p style="width: 80px">{{disciplina.codigo}}</p>
                      </td>
                      <td>
                        <p style="width: 300px;">{{disciplina.nome}}</p>
                      </td>
                      <td>
                        <p style="width: 24px">{{turma.letra}}</p>
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

                      <td v-if="turma.periodo===1">
                        <div style="width: 32px">
                          <p
                            v-if="(turma.Docente1 > 0) && (turma.Docente2 > 0)"
                          >{{(disciplina.cargaTeorica + disciplina.cargaPratica)/2}}</p>

                          <p v-else>{{disciplina.cargaTeorica + disciplina.cargaPratica}}</p>
                        </div>
                      </td>

                      <td v-else>
                        <div style="width: 32px"></div>
                      </td>

                      <td v-if="turma.periodo===3">
                        <div style="width: 32px">
                          <p
                            v-if="(turma.Docente1 > 0) && (turma.Docente2 > 0)"
                          >{{(disciplina.cargaTeorica + disciplina.cargaPratica)/2}}</p>
                          <p v-else>{{disciplina.cargaTeorica + disciplina.cargaPratica}}</p>
                        </div>
                      </td>
                      <td v-else>
                        <div style="width: 32px"></div>
                      </td>

                      <td>
                        <div style="width: 42px"></div>
                      </td>
                    </div>
                  </template>
                </tr>
              </template>

              <template v-for="carga in CargasPos">
                <template v-if="carga.Docente===professor.id">
                  <tr :key="'cargaPos'+carga.id+'professor'+professor.id">
                    <div class="linhas" style="width: ‭845‬px;">
                      <td>
                        <p style="width: 130px"></p>
                      </td>
                      <td>
                        <p style="width: 24px">{{carga.trimestre}}</p>
                      </td>
                      <td>
                        <p style="width: 80px"></p>
                      </td>
                      <td>
                        <p style="width: 300px" class="toUpperCase">Disciplina do {{carga.programa}}</p>
                      </td>
                      <td>
                        <p style="width: 24px"></p>
                      </td>
                      <td>
                        <p style="width: 180px"></p>
                      </td>

                      <td v-if="carga.trimestre==1 || carga.trimestre==2">
                        <p style="width: 32px">{{carga.creditos}}</p>
                      </td>
                      <td v-else>
                        <p style="width: 32px"></p>
                      </td>

                      <td v-if="carga.trimestre==3 || carga.trimestre==4">
                        <p style="width: 32px">{{carga.creditos}}</p>
                      </td>
                      <td v-else>
                        <p style="width: 32px"></p>
                      </td>

                      <td></td>
                    </div>
                  </tr>
                </template>
              </template>
            </template>
          </template>
          <template v-else>
            <tr>
              <td colspan="2" class="text-center">
                <i class="fas fa-exclamation-triangle"></i> Nenhum curso encontrado!
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import jsPDF from "jspdf";
import pdfs from "../../common/services/pdfs";
import html2canvas from "html2canvas";
export default {
  name: "DashboardCargaProfessores",

  methods: {
    pdf() {
      pdfs.pdfCargaProfessores();
    },

    turmas(professor) {
      return _.orderBy(
        _.filter(this.$store.state.turma.Turmas, turma => {
          return (
            turma.Docente1 === professor.id || turma.Docente2 === professor.id
          );
        }),
        "periodo"
      );
    },

    pos(professor) {
      return _.filter(this.$store.state.cargaPos.Cargas, turma => {
        return turma.Docente === professor.id;
      });
    },

    creditos1(professor) {
      var c = 0;
      for (var t = 0; t < this.$store.state.turma.Turmas.length; t++) {
        if (
          this.$store.state.turma.Turmas[t].periodo === 1 &&
          (this.$store.state.turma.Turmas[t].Docente1 === professor.id ||
            this.$store.state.turma.Turmas[t].Docente2 === professor.id)
        ) {
          for (
            var d = 0;
            d < this.$store.state.disciplina.Disciplinas.length;
            d++
          ) {
            if (
              this.$store.state.disciplina.Disciplinas[d].id ===
              this.$store.state.turma.Turmas[t].Disciplina
            ) {
              if (
                this.$store.state.turma.Turmas[t].Docente1 > 0 &&
                this.$store.state.turma.Turmas[t].Docente2 > 0
              ) {
                c +=
                  parseFloat(
                    this.$store.state.disciplina.Disciplinas[d].cargaPratica
                  ) / 2;
                c +=
                  parseFloat(
                    this.$store.state.disciplina.Disciplinas[d].cargaTeorica
                  ) / 2;
              } else {
                c += parseFloat(
                  this.$store.state.disciplina.Disciplinas[d].cargaPratica
                );
                c += parseFloat(
                  this.$store.state.disciplina.Disciplinas[d].cargaTeorica
                );
              }
            }
          }
        }
      }
      for (var t = 0; t < this.$store.state.cargaPos.Cargas.length; t++) {
        if (this.$store.state.cargaPos.Cargas[t].Docente === professor.id) {
          if (
            this.$store.state.cargaPos.Cargas[t].trimestre == 1 ||
            this.$store.state.cargaPos.Cargas[t].trimestre == 2
          ) {
            c += parseFloat(this.$store.state.cargaPos.Cargas[t].creditos);
          }
        }
      }
      return c;
    },

    creditos2(professor) {
      var c = 0;
      for (var t = 0; t < this.$store.state.turma.Turmas.length; t++) {
        if (
          this.$store.state.turma.Turmas[t].periodo === 3 &&
          (this.$store.state.turma.Turmas[t].Docente1 === professor.id ||
            this.$store.state.turma.Turmas[t].Docente2 === professor.id)
        ) {
          for (
            var d = 0;
            d < this.$store.state.disciplina.Disciplinas.length;
            d++
          ) {
            if (
              this.$store.state.disciplina.Disciplinas[d].id ===
              this.$store.state.turma.Turmas[t].Disciplina
            ) {
              if (
                this.$store.state.turma.Turmas[t].Docente1 > 0 &&
                this.$store.state.turma.Turmas[t].Docente2 > 0
              ) {
                c +=
                  parseFloat(
                    this.$store.state.disciplina.Disciplinas[d].cargaPratica
                  ) / 2;
                c +=
                  parseFloat(
                    this.$store.state.disciplina.Disciplinas[d].cargaTeorica
                  ) / 2;
              } else {
                c += parseFloat(
                  this.$store.state.disciplina.Disciplinas[d].cargaPratica
                );
                c += parseFloat(
                  this.$store.state.disciplina.Disciplinas[d].cargaTeorica
                );
              }
            }
          }
        }
      }
      for (var t = 0; t < this.$store.state.cargaPos.Cargas.length; t++) {
        if (this.$store.state.cargaPos.Cargas[t].Docente === professor.id) {
          if (this.$store.state.cargaPos.Cargas[t].trimestre == 3) {
            c += parseFloat(this.$store.state.cargaPos.Cargas[t].creditos);
          }
        }
      }
      return c;
    },

    creditos(professor) {
      var c = 0;
      for (var t = 0; t < this.$store.state.turma.Turmas.length; t++) {
        if (
          this.$store.state.turma.Turmas[t].Docente1 === professor.id ||
          this.$store.state.turma.Turmas[t].Docente2 === professor.id
        ) {
          for (
            var d = 0;
            d < this.$store.state.disciplina.Disciplinas.length;
            d++
          ) {
            if (
              this.$store.state.disciplina.Disciplinas[d].id ===
              this.$store.state.turma.Turmas[t].Disciplina
            ) {
              if (
                this.$store.state.turma.Turmas[t].Docente1 > 0 &&
                this.$store.state.turma.Turmas[t].Docente2 > 0
              ) {
                c +=
                  parseFloat(
                    this.$store.state.disciplina.Disciplinas[d].cargaPratica
                  ) / 2;
                c +=
                  parseFloat(
                    this.$store.state.disciplina.Disciplinas[d].cargaTeorica
                  ) / 2;
              } else {
                c += parseFloat(
                  this.$store.state.disciplina.Disciplinas[d].cargaPratica
                );
                c += parseFloat(
                  this.$store.state.disciplina.Disciplinas[d].cargaTeorica
                );
              }
            }
          }
        }
      }
      for (var t = 0; t < this.$store.state.cargaPos.Cargas.length; t++) {
        if (this.$store.state.cargaPos.Cargas[t].Docente === professor.id) {
          c += parseFloat(this.$store.state.cargaPos.Cargas[t].creditos);
        }
      }
      return c;
    }
  },

  computed: {
    CargasPos() {
      return _.orderBy(this.$store.state.cargaPos.Cargas, "trimestre");
    },

    Disciplinas() {
      return _.orderBy(this.$store.state.disciplina.Disciplinas, "nome");
    },
    Horarios() {
      return this.$store.state.horario.Horarios;
    },
    Professores() {
      return _.orderBy(
        _.filter(this.$store.state.docente.Docentes, ["ativo", true]),
        "apelido"
      );
    }
  }
};
</script>

<style scoped>
/* prefixed */

.DashboardCargaProfessores {
  max-width: 100%;
  overflow: hidden;
  margin: 0;
}
.p-header {
  padding: 0px 0 0px 0;
  margin: 0;
  font-size: 11px;
  text-align: center;
  height: 18px;
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
table {
  display: block;
  overflow-y: scroll;
  height: -webkit-calc(100vh - 100px);
  height: -moz-calc(100vh - 100px);
  height: calc(100vh - 100px);
  font-size: 11px;
  background-color: white;
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
  border: none;
}
.linhas {
  border-top: 1px solid #dee2e6;
}
table p {
  margin-bottom: 0;
  text-align: center;
  padding-left: 2px;
  padding-right: 2px;
}
/* texto maiusculo */
.toUpperCase {
  text-transform: uppercase;
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
.titulo {
  font-size: 25px;
  font-weight: normal;
  padding-left: 0;
  margin: 0 !important;
}
/* Botoes */
button {
  padding: 0;
  border: none;
  background: none;
  height: -webkit-max-content;
  height: -moz-max-content;
  height: max-content;
  margin-right: 15px;
  margin-top: 5px;
  margin-bottom: 0px;
  transition: all 0.3s ease 0s;
}
i.fas,
i.far {
  font-size: 25px;
  cursor: pointer;
}
.relatbtn {
  background-color: white;
  color: #9ab3ff !important;
}

.relatbtn:hover {
  cursor: pointer;
  color: #82a0ff !important;
}

.relatbtn:focus {
  color: #82a0ff;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #698dff;
}

/* APENAS NO FIREFOX */
@-moz-document url-prefix() {
  select {
    height: 15px !important;
    text-align: left;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    line-height: 8px;
    border: 0.5px solid rgb(133, 133, 133);
    -moz-border-radius: 2px;
    border-radius: 2px;
    background-color: rgb(245, 245, 245);
  }
  input {
    height: 18px !important;
    text-align: center;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    line-height: 8px;
    border: 0.5px solid rgb(92, 92, 92);
    -moz-border-radius: 2px;
    border-radius: 2px;
    background-color: rgb(245, 245, 245);
  }
}
.prof-td {
  background-color: rgba(0, 0, 0, 0.089);
  color: black;
}
</style>