<template>
  <!-- Titulo -->
  <div class="DashboardValidacoes row pr-2">
    <div
      class="div-titulo col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0"
      style="height: 38px;"
    >
      <div class="form-inline col-12 pl-0 mb-1 pr-1">
        <h1 class="titulo col-xl-6 col-lg-6 col-md-7 col-sm-7 col-8 px-0 pr-1">
          Validações do Plano
        </h1>

        <div
          class="form-group col-xl-6 col-lg-6 col-md-5 col-sm-5 col-4 mb-0 p-0"
          style="justify-content: flex-end !important;"
        >
          <!-- <b-button v-b-modal.modalFiltros title="Filtros" class="cancelbtn">
            <i class="fas fa-list-ul"></i>
          </b-button> -->
        </div>
      </div>
    </div>

    <div class="w-100 mb-2 border-bottom"></div>

    <div class="p-0 m-0" style="height: 30px;">
      <ul
        class="nav nav-tabs card-header-tabs m-0"
        style="font-size: 11px !important; height: 30px;"
      >
        <li class="nav-item" @click="nav_table = 'docentes'">
          <a
            class="nav-link border border-right-0"
            :class="{
              active: nav_table === 'docentes',
            }"
            >Docentes</a
          >
        </li>
        <li class="nav-item" @click="nav_table = 'turmas'">
          <a
            class="nav-link border"
            :class="{
              active: nav_table === 'turmas',
            }"
            >Disciplinas</a
          >
        </li>
      </ul>
    </div>
    <div class="w-100 p-0">
      <div class="pl-0 divTable" ref="mainTable">
        <!-- TABLE DOCENTES -->
        <table
          v-if="nav_table === 'docentes'"
          class="table main-table table-hover table-sm table-bordered"
        >
          <thead class="thead-light sticky">
            <tr>
              <div style="font-size: 11px !important;" class=" max-content">
                <th>
                  <p
                    style="width: 615px; text-align: start;"
                    class="p-header clickable"
                    @click="toggleOrdDocentes"
                  >
                    Nome
                    <i
                      style="font-size: 0.6rem; text-align: right;"
                      :class="
                        ordemDocentes == 'asc'
                          ? 'fas fa-arrow-down fa-sm'
                          : 'fas fa-arrow-up fa-sm'
                      "
                    ></i>
                  </p>
                </th>
                <th>
                  <p style="width: 350px; text-align: start;" class="p-header">
                    Conflito
                  </p>
                </th>
              </div>
            </tr>
          </thead>
          <tbody style="text-transform: uppercase">
            <template v-for="validacao in Docentes_validacoes">
              <tr
                :key="'validacoes-' + validacao.nome"
                style="background-color:rgba(0, 0, 0, 0.089);"
              >
                <div class="max-content">
                  <td>
                    <p style="width: 615px;  text-align: start;">
                      {{ validacao.nome }}
                    </p>
                  </td>

                  <td>
                    <p style="width: 350px; text-align: start;"></p>
                  </td>
                </div>
              </tr>
              <tr
                v-for="(erro, index) in validacao.erros"
                :key="'validacao-conflitos-' + validacao.nome + '-' + index"
              >
                <div class="max-content">
                  <td>
                    <p style="width: 615px; text-align: center;"></p>
                  </td>

                  <td>
                    <p v-html="erro" style="width: 350px; text-align: start;">
                      <!-- {{ erro.msg }} -->
                    </p>
                  </td>
                </div>
              </tr>
            </template>
          </tbody>
        </table>
        <!-- TABLE TURMAS -->
        <table
          v-else-if="nav_table === 'turmas'"
          class="table main-table table-hover table-sm table-bordered"
        >
          <thead class="thead-light sticky">
            <tr>
              <div style="font-size: 11px !important;" class=" max-content">
                <th>
                  <p
                    style="width: 35px; text-align: center;"
                    class="p-header clickable"
                    @click="toggleOrdTurmas('turma_periodo')"
                  >
                    S.
                    <i
                      style="font-size: 0.6rem; text-align: right;"
                      :class="
                        ordemTurmas.order == 'turma_periodo'
                          ? ordemTurmas.type == 'asc'
                            ? 'fas fa-arrow-down fa-sm'
                            : 'fas fa-arrow-up fa-sm'
                          : 'fas fa-arrow-down fa-sm low-opacity'
                      "
                    ></i>
                  </p>
                </th>
                <th>
                  <p
                    style="width: 70px; text-align: start;"
                    class="p-header clickable"
                    @click="toggleOrdTurmas('disciplina_perfil')"
                  >
                    Perfil
                    <i
                      style="font-size: 0.6rem; text-align: right;"
                      :class="
                        ordemTurmas.order == 'disciplina_perfil'
                          ? ordemTurmas.type == 'asc'
                            ? 'fas fa-arrow-down fa-sm'
                            : 'fas fa-arrow-up fa-sm'
                          : 'fas fa-arrow-down fa-sm low-opacity'
                      "
                    ></i>
                  </p>
                </th>
                <th>
                  <p
                    style="width: 70px; text-align: start;"
                    class="p-header clickable"
                    @click="toggleOrdTurmas('disciplina_codigo')"
                  >
                    Cód.
                    <i
                      style="font-size: 0.6rem; text-align: right;"
                      :class="
                        ordemTurmas.order == 'disciplina_codigo'
                          ? ordemTurmas.type == 'asc'
                            ? 'fas fa-arrow-down fa-sm'
                            : 'fas fa-arrow-up fa-sm'
                          : 'fas fa-arrow-down fa-sm low-opacity'
                      "
                    ></i>
                  </p>
                </th>
                <th>
                  <p
                    style="width: 300px; text-align: start;"
                    class="p-header clickable"
                    @click="toggleOrdTurmas('disciplina_nome')"
                  >
                    Disciplina
                    <i
                      style="font-size: 0.6rem; text-align: right;"
                      :class="
                        ordemTurmas.order == 'disciplina_nome'
                          ? ordemTurmas.type == 'asc'
                            ? 'fas fa-arrow-down fa-sm'
                            : 'fas fa-arrow-up fa-sm'
                          : 'fas fa-arrow-down fa-sm low-opacity'
                      "
                    ></i>
                  </p>
                </th>
                <th>
                  <p style="width: 35px; text-align: start;" class="p-header">
                    Letra
                  </p>
                </th>
                <th>
                  <p style="width: 100px; text-align: center;" class="p-header">
                    Docentes
                  </p>
                </th>

                <th>
                  <p style="width: 350px; text-align: start;" class="p-header">
                    Conflito
                  </p>
                </th>
              </div>
            </tr>
          </thead>
          <tbody style="text-transform: uppercase">
            <template v-for="validacao in Turmas_Validacoes_Ordered">
              <tr
                :key="
                  'validacoes-' +
                    validacao.turma_id +
                    validacao.disciplina_codigo
                "
                style="background-color:rgba(0, 0, 0, 0.089);"
              >
                <div class="max-content">
                  <td>
                    <p style="width: 35px; text-align: center;">
                      {{ validacao.turma_periodo }}
                    </p>
                  </td>
                  <td>
                    <p style="width: 70px; text-align: start;">
                      {{ validacao.disciplina_perfil }}
                    </p>
                  </td>
                  <td>
                    <p style="width: 70px; text-align: start;">
                      {{ validacao.disciplina_codigo }}
                    </p>
                  </td>
                  <td>
                    <p style="width: 300px; text-align: start;">
                      {{ validacao.disciplina_nome }}
                    </p>
                  </td>
                  <td>
                    <p style="width: 35px; text-align: center;">
                      {{ validacao.turma_letra }}
                    </p>
                  </td>
                  <td>
                    <p style="width: 100px; text-align: center;">
                      {{ validacao.turma_docente1 }}
                      <br />
                      {{ validacao.turma_docente2 }}
                    </p>
                  </td>

                  <td>
                    <p style="width: 350px; text-align: start;"></p>
                  </td>
                </div>
              </tr>
              <tr
                v-for="erro in validacao.conflitos"
                :key="'validacao-conflitos-' + validacao.turma_id + erro.type"
              >
                <div class="max-content">
                  <td>
                    <p style="width: 35px; text-align: center;"></p>
                  </td>
                  <td>
                    <p style="width: 70px; text-align: start;"></p>
                  </td>
                  <td>
                    <p style="width: 70px; text-align: center;"></p>
                  </td>
                  <td>
                    <p style="width: 300px; text-align: start;"></p>
                  </td>
                  <td>
                    <p style="width: 35px; text-align: center;"></p>
                  </td>
                  <td>
                    <p style="width: 100px; text-align: center;"></p>
                  </td>

                  <td>
                    <p
                      v-html="erro.msg"
                      style="width: 350px; text-align: start;"
                    >
                      <!-- {{ erro.msg }} -->
                    </p>
                  </td>
                </div>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  data() {
    return {
      nav_table: "docentes",
      ordemTurmas: { order: "turma_periodo", type: "asc" },
      ordemDocentes: "asc",
      semestreAtual: 1,
      ordemDocentes: 'asc',
      evenCCN: "false",
      evenCCD: "false",
      evenEC: "false",
      evenSI: "false",

      ativos1: {
        CCD: [[], [], [], [], [], [], [], [], [], []],
        CCN: [[], [], [], [], [], [], [], [], [], []],
        EC: [[], [], [], [], [], [], [], [], [], []],
        SI: [[], [], [], [], [], [], [], [], [], []],
        Eletivas: [],
      },

      ativos2: {
        CCD: [[], [], [], [], [], [], [], [], [], []],
        CCN: [[], [], [], [], [], [], [], [], [], []],
        EC: [[], [], [], [], [], [], [], [], [], []],
        SI: [[], [], [], [], [], [], [], [], [], []],
        Eletivas: [],
      },
    };
  },

  mounted() {
    this.createHorarios1();
    this.createHorarios2();
    console.log(this.ativos1)
  },

  methods: {
    toggleOrdTurmas(ord) {
      if (this.ordemTurmas.order != ord) {
        this.ordemTurmas.order = ord;
        this.ordemTurmas.type = "asc";
      } else {
        this.ordemTurmas.type =
          this.ordemTurmas.type === "asc" ? "desc" : "asc";
      }
    },
    toggleOrdDocentes() {
      if (this.ordemDocentes === "asc") {
        this.ordemDocentes = "desc";
      } else {
        this.ordemDocentes = "asc";
      }
    },
    findPerfilById(id) {
      let perfil = _.find(this.Perfis, (p) => p.id == id);
      return perfil != undefined ? perfil : null;
    },
    //return apelido
    findDocenteById(id) {
      let docente = _.find(this.Docentes, (d) => d.id == id);
      return docente != undefined ? docente.apelido : null;
    },
    findDisciplinaById(id) {
      let disciplina = _.find(this.Disciplinas, (d) => d.id == id);
      return disciplina != undefined ? disciplina : null;
    },
    totalPedidos(turma_id) {
      let result = 0;
      let pedidos = this.$store.state.pedido.Pedidos[turma_id];
      for (let p = 0; p < pedidos.length; p++) {
        result += parseInt(pedidos[p].vagasPeriodizadas, 10);
        result += parseInt(pedidos[p].vagasNaoPeriodizadas, 10);
      }
      return result;
    },
    createValidacao(turma, disciplina) {
      return {
        //Turmas
        turma_id: turma.id,
        turma_periodo: turma.periodo,
        turma_letra: turma.letra,
        turma_turno1: turma.turno1,
        turma_Horario1: turma.Horario1,
        turma_Horario2: turma.Horario2,
        turma_sala1: turma.Sala1,
        turma_sala2: turma.Sala2,
        turma_docente1: this.findDocenteById(turma.Docente1),
        turma_docente2: this.findDocenteById(turma.Docente2),
        pedidos_totais: this.totalPedidos(turma.id),
        //Disciplinas
        disciplina_nome: disciplina.nome,
        disciplina_codigo: disciplina.codigo,
        disciplina_ead: disciplina.ead,
        disciplina_laboratorio: disciplina.laboratorio == 1,
        disciplina_perfil: this.findPerfilById(disciplina.Perfil).abreviacao,
        conflitos: [],
        // disciplina: {
        //   nome: disciplina.nome,
        //   codigo: disciplina.codigo,
        //   ead: disciplina.ead,
        //   perfil: this.findPerfilById(disciplina.Perfil).abreviacao,
        // },
      };
    },
    checkAllValidations(validacao) {
      let check;
      //Turno
      check = this.checkTurno(validacao.turma_turno1);
      if (check) validacao.conflitos.push(check);
      //Compatibilidade do turno com disciplina
      check = this.checkTurnoEAD(
        validacao.disciplina_ead,
        validacao.turma_turno1
      );
      if (check) validacao.conflitos.push(check);
      //Horarios
      check = this.checkHorarios(
        validacao.disciplina_ead,
        validacao.turma_Horario1,
        validacao.turma_Horario2
      );
      if (check) validacao.conflitos.push(check);
      //Docente
      check = this.checkDocentes(
        validacao.turma_docente1,
        validacao.turma_docente2
      );
      if (check) validacao.conflitos.push(check);
      //Salas
      check = this.checkSalas(
        validacao.disciplina_laboratorio,
        validacao.turma_sala1,
        validacao.turma_sala2
      );
      if (check) validacao.conflitos.push(check);
      //Lotação das salas
      check = this.checkVagasSalas(
        validacao.turma_sala1,
        validacao.turma_sala2,
        validacao.pedidos_totais
      );
      if (check) validacao.conflitos.push(check);
      //Pedidos
      check = this.checkPedidos(validacao.pedidos_totais);
      if (check) validacao.conflitos.push(check);
    },
    checkTurno(turno) {
      return turno === null || turno === undefined
        ? { type: 1, msg: "Nenhum Turno alocado" }
        : null;
    },
    checkTurnoEAD(isEAD, turno) {
      return (isEAD && turno !== "EAD") || (!isEAD && turno == "EAD")
        ? {
            type: 2,
            msg: "Incompatbilidade entre turno e cadastro EAD da disciplina",
          }
        : false;
    },
    checkHorarios(isEAD, horario1, horario2) {
      if (!isEAD) {
        return (horario1 === null || horario1 === undefined) &&
          (horario2 === null || horario2 === undefined)
          ? {
              type: 3,
              msg: "Horarios incompletos ou invalidos",
            }
          : false;
      }
      return false;
    },
    checkDocentes(docente1, docente2) {
      return docente1 === null && docente2 == null
        ? { type: 4, msg: "Nenhum Docente alocado" }
        : false;
    },
    checkSalas(isLab, sala1, sala2) {
      return isLab && !this.isLab(sala1) && !this.isLab(sala2)
        ? {
            type: 5,
            msg:
              "Disciplina de laborátorio, porêm não possui laboratorio alocado",
          }
        : false;
    },
    checkVagasSalas(sala1_id, sala2_id, pedidos_totais) {
      let sala1, sala2;
      if (sala1_id != null) sala1 = _.find(this.Salas, (s) => sala1_id == s.id);
      if (sala2_id != null && sala2_id != sala1_id)
        sala2 = _.find(this.Salas, (s) => sala2_id == s.id);
      let result = { type: 6, msg: "" };

      if (sala1 != undefined && sala1.lotacao_maxima != 0) {
        if (sala1.lotacao_maxima < pedidos_totais) {
          result.msg +=
            "Limite da sala " +
            sala1.nome +
            " excedido: " +
            pedidos_totais +
            "/" +
            sala1.lotacao_maxima;
        }
      }
      if (sala2 != undefined && sala2.lotacao_maxima != 0) {
        if (sala2.lotacao_maxima < pedidos_totais) {
          result.msg +=
            "<br/>Limite da sala " +
            sala2.nome +
            " excedido: " +
            pedidos_totais +
            "/" +
            sala2.lotacao_maxima;
        }
      }
      return result.msg != "" ? result : false;
    },
    checkPedidos(pedidos_totais) {
      return pedidos_totais <= 4
        ? {
            type: 7,
            msg: "Apenas 4 ou menos vagas foram alocadas!",
          }
        : false;
    },
    isLab(id) {
      let cond = _.find(
        this.Salas,
        (sala) => id == sala.id && sala.laboratorio
      );
      if (cond !== undefined) return true;
      else return false;
    },

    checkConflitosGrade(turmaId){
      let conflitos = [];
      this.ativos1.forEach((curso) => {
        curso.forEach((periodo, index) => {
          let inPeriodo = _.find(periodo, {id: turmaId})
          if(inPeriodo !== undefined){
            conflitos.push(`Turma no periodo ${index + 1}`)
          }
        })
      })
      return (conflitos.length > 0 ? {
        type: 8,
        msg: conflitos,
      } : false)
    },

    creditosGraduacao(docente) {
      let turmas = _.filter(this.$store.state.turma.Turmas, (t) => {
        return t.Docente1 === docente.id || t.Docente2 === docente.id;
      });

      let cargaTotalDocente = 0;

      for (let i = 0; i < turmas.length; i++) {
        let disciplina = _.find(this.$store.state.disciplina.Disciplinas, {
          id: turmas[i].Disciplina,
        });
        let cargaTotalDisciplina =
          disciplina.cargaTeorica + disciplina.cargaPratica;
        if (turmas[i].Docente1 != null && turmas[i].Docente2 != null) {
          if (turmas[i].Docente1 !== turmas[i].Docente2) {
            cargaTotalDisciplina = cargaTotalDisciplina / 2.0;
          }
        }
        cargaTotalDocente = cargaTotalDocente + cargaTotalDisciplina;
      }

      return cargaTotalDocente;
    },

    creditosPos(docente) {
      let turmas = _.filter(this.$store.state.cargaPos.Cargas, (t) => {
        return t.Docente === docente.id;
      });

      let cargaTotalDocente = 0;

      for (let i = 0; i < turmas.length; i++) {
        cargaTotalDocente = cargaTotalDocente + turmas[i].creditos;
      }

      return cargaTotalDocente;
    },

    isEven(number) {
      if (number % 2 === 0) return "true";
      else return "false";
    },

    createHorarios1: function() {
      var grade;
      var grades;
      var inicio = 1;
      var fim;
      var pedidos;
      var pedidosExternos;
      var disciplinaGrades = this.$store.state.disciplinaGrade.DisciplinaGrades;
      var turmas = _.filter(this.$store.state.turma.Turmas, ["periodo", 1]);
      var turmasExternas = this.$store.state.turmaExterna.Turmas;
      var anoAtual = this.$store.state.plano.Plano[0].ano;
      var semestreAtual = 1;

      if (this.$store.state.curso.Cursos[0].semestreInicial == 1) {
        this.evenCCN = "false";
      } else if (this.$store.state.curso.Cursos[0].semestreInicial == 2) {
        this.evenCCN = "true";
      }

      if (this.$store.state.curso.Cursos[1].semestreInicial == 1) {
        this.evenEC = "false";
      } else if (this.$store.state.curso.Cursos[1].semestreInicial == 2) {
        this.evenEC = "true";
      }

      if (this.$store.state.curso.Cursos[2].semestreInicial == 1) {
        this.evenSI = "false";
      } else if (this.$store.state.curso.Cursos[2].semestreInicial == 2) {
        this.evenSI = "true";
      }

      if (this.$store.state.curso.Cursos[3].semestreInicial == 1) {
        this.evenCCD = "false";
      } else if (this.$store.state.curso.Cursos[3].semestreInicial == 2) {
        this.evenCCD = "true";
      }

      //CCD
      grades = _.filter(this.$store.state.grade.Grades, ["Curso", 4]);
      grades = _.orderBy(grades, "periodoInicio", "desc");
      pedidos = [];
      for (let t in this.$store.state.pedido.Pedidos) {
        for (let pedido in this.$store.state.pedido.Pedidos[t]) {
          if (this.$store.state.pedido.Pedidos[t][pedido].Curso === 4) {
            pedidos.push(this.$store.state.pedido.Pedidos[t][pedido]);
          }
        }
      }
      pedidosExternos = [];
      for (let t in this.$store.state.pedidoExterno.Pedidos) {
        for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]) {
          if (this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso === 4) {
            pedidosExternos.push(
                    this.$store.state.pedidoExterno.Pedidos[t][pedido]
            );
          }
        }
      }

      for (let i = 0; i < grades.length && inicio <= 10; i++) {
        //grade
        grade = grades[i].id;
        //inicio
        if (i === 0) inicio = 1;
        else inicio = fim + 1;
        //fim
        if (i + 1 === grades.length) fim = 10;
        else if (i == 0)
          fim =
                  1 +
                  2 *
                  (parseInt(anoAtual, 10) -
                          parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
                  (parseInt(semestreAtual, 10) -
                          parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
                  2;
        else
          fim =
                  inicio -
                  1 +
                  2 *
                  (parseInt(grades[i - 1].periodoInicio.slice(0, 4), 10) -
                          parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
                  (parseInt(grades[i - 1].periodoInicio.slice(5, 6), 10) -
                          parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
                  2;
        for (let k = 0; k < disciplinaGrades.length; k++) {
          if (
                  disciplinaGrades[k].Grade == grade &&
                  this.isEven(disciplinaGrades[k].periodo) == this.evenCCD &&
                  disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
                  disciplinaGrades[k].periodo <= parseInt(fim, 10)
          ) {
            for (let j = 0; j < turmas.length; j++) {
              if (turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                for (let p = 0; p < pedidos.length; p++) {
                  if (
                          pedidos[p].vagasPeriodizadas > 0 &&
                          pedidos[p].Turma == turmas[j].id
                  ) {
                    this.ativos1.CCD[disciplinaGrades[k].periodo - 1].push(
                            turmas[j]
                    );
                  }
                }
              }
            }
            for (let j = 0; j < turmasExternas.length; j++) {
              if (
                      turmasExternas[j].periodo == 1 &&
                      turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (let p = 0; p < pedidosExternos.length; p++) {
                  if (
                          pedidosExternos[p].vagasPeriodizadas > 0 &&
                          pedidosExternos[p].Turma == turmasExternas[j].id
                  ) {
                    this.ativos1.CCD[disciplinaGrades[k].periodo - 1].push(
                            turmasExternas[j]
                    );
                  }
                }
              }
            }
          }
        }
      }

      //CCN
      grades = _.filter(this.$store.state.grade.Grades, ["Curso", 1]);
      grades = _.orderBy(grades, "periodoInicio", "desc");
      pedidos = [];
      for (let t in this.$store.state.pedido.Pedidos) {
        for (let pedido in this.$store.state.pedido.Pedidos[t]) {
          if (this.$store.state.pedido.Pedidos[t][pedido].Curso === 1) {
            pedidos.push(this.$store.state.pedido.Pedidos[t][pedido]);
          }
        }
      }
      pedidosExternos = [];
      for (let t in this.$store.state.pedidoExterno.Pedidos) {
        for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]) {
          if (this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso === 1) {
            pedidosExternos.push(
                    this.$store.state.pedidoExterno.Pedidos[t][pedido]
            );
          }
        }
      }
      for (let i = 0; i < grades.length && inicio <= 10; i++) {
        //grade
        grade = grades[i].id;
        //inicio
        if (i === 0) inicio = 1;
        else inicio = fim + 1;
        //fim
        if (i + 1 === grades.length) fim = 10;
        else if (i == 0)
          fim =
                  1 +
                  2 *
                  (parseInt(anoAtual, 10) -
                          parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
                  (parseInt(semestreAtual, 10) -
                          parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
                  2;
        else
          fim =
                  inicio -
                  1 +
                  2 *
                  (parseInt(grades[i - 1].periodoInicio.slice(0, 4), 10) -
                          parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
                  (parseInt(grades[i - 1].periodoInicio.slice(5, 6), 10) -
                          parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
                  2;
        for (let k = 0; k < disciplinaGrades.length; k++) {
          if (
                  disciplinaGrades[k].Grade == grade &&
                  this.isEven(disciplinaGrades[k].periodo) == this.evenCCN &&
                  disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
                  disciplinaGrades[k].periodo <= parseInt(fim, 10)
          ) {
            for (let j = 0; j < turmas.length; j++) {
              if (turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                for (let p = 0; p < pedidos.length; p++) {
                  if (
                          pedidos[p].vagasPeriodizadas > 0 &&
                          pedidos[p].Turma == turmas[j].id
                  ) {
                    this.ativos1.CCN[disciplinaGrades[k].periodo - 1].push(
                            turmas[j]
                    );
                  }
                }
              }
            }
            for (let j = 0; j < turmasExternas.length; j++) {
              if (
                      turmasExternas[j].periodo == 1 &&
                      turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (let p = 0; p < pedidosExternos.length; p++) {
                  if (
                          pedidosExternos[p].vagasPeriodizadas > 0 &&
                          pedidosExternos[p].Turma == turmasExternas[j].id
                  ) {
                    this.ativos1.CCN[disciplinaGrades[k].periodo - 1].push(
                            turmasExternas[j]
                    );
                  }
                }
              }
            }
          }
        }
      }

      //SI
      grades = _.filter(this.$store.state.grade.Grades, ["Curso", 3]);
      grades = _.orderBy(grades, "periodoInicio", "desc");
      pedidos = [];
      for (let t in this.$store.state.pedido.Pedidos) {
        for (let pedido in this.$store.state.pedido.Pedidos[t]) {
          if (this.$store.state.pedido.Pedidos[t][pedido].Curso === 3) {
            pedidos.push(this.$store.state.pedido.Pedidos[t][pedido]);
          }
        }
      }
      pedidosExternos = [];
      for (let t in this.$store.state.pedidoExterno.Pedidos) {
        for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]) {
          if (this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso === 3) {
            pedidosExternos.push(
                    this.$store.state.pedidoExterno.Pedidos[t][pedido]
            );
          }
        }
      }
      for (let i = 0; i < grades.length && inicio <= 10; i++) {
        //grade
        grade = grades[i].id;
        //inicio
        if (i === 0) inicio = 1;
        else inicio = fim + 1;
        //fim
        if (i + 1 === grades.length) fim = 10;
        else if (i == 0)
          fim =
                  1 +
                  2 *
                  (parseInt(anoAtual, 10) -
                          parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
                  (parseInt(semestreAtual, 10) -
                          parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
                  2;
        else
          fim =
                  inicio -
                  1 +
                  2 *
                  (parseInt(grades[i - 1].periodoInicio.slice(0, 4), 10) -
                          parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
                  (parseInt(grades[i - 1].periodoInicio.slice(5, 6), 10) -
                          parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
                  2;
        for (let k = 0; k < disciplinaGrades.length; k++) {
          if (
                  disciplinaGrades[k].Grade == grade &&
                  this.isEven(disciplinaGrades[k].periodo) == this.evenSI &&
                  disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
                  disciplinaGrades[k].periodo <= parseInt(fim, 10)
          ) {
            for (let j = 0; j < turmas.length; j++) {
              if (turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                for (let p = 0; p < pedidos.length; p++) {
                  if (
                          pedidos[p].vagasPeriodizadas > 0 &&
                          pedidos[p].Turma == turmas[j].id
                  ) {
                    this.ativos1.SI[disciplinaGrades[k].periodo - 1].push(
                            turmas[j]
                    );
                  }
                }
              }
            }
            for (let j = 0; j < turmasExternas.length; j++) {
              if (
                      turmasExternas[j].periodo == 1 &&
                      turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (let p = 0; p < pedidosExternos.length; p++) {
                  if (
                          pedidosExternos[p].vagasPeriodizadas > 0 &&
                          pedidosExternos[p].Turma == turmasExternas[j].id
                  ) {
                    this.ativos1.SI[disciplinaGrades[k].periodo - 1].push(
                            turmasExternas[j]
                    );
                  }
                }
              }
            }
          }
        }
      }

      //Engenharia Computacional
      grades = _.filter(this.$store.state.grade.Grades, ["Curso", 2]);
      grades = _.orderBy(grades, "periodoInicio", "desc");
      pedidos = [];
      for (let t in this.$store.state.pedido.Pedidos) {
        for (let pedido in this.$store.state.pedido.Pedidos[t]) {
          if (this.$store.state.pedido.Pedidos[t][pedido].Curso === 2) {
            pedidos.push(this.$store.state.pedido.Pedidos[t][pedido]);
          }
        }
      }
      pedidosExternos = [];
      for (let t in this.$store.state.pedidoExterno.Pedidos) {
        for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]) {
          if (this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso === 2) {
            pedidosExternos.push(
                    this.$store.state.pedidoExterno.Pedidos[t][pedido]
            );
          }
        }
      }
      for (let i = 0; i < grades.length && inicio <= 10; i++) {
        //grade
        grade = grades[i].id;
        //inicio
        if (i === 0) inicio = 1;
        else inicio = fim + 1;
        //fim
        if (i + 1 === grades.length) fim = 10;
        else if (i == 0)
          fim =
                  1 +
                  2 *
                  (parseInt(anoAtual, 10) -
                          parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
                  (parseInt(semestreAtual, 10) -
                          parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
                  2;
        else
          fim =
                  inicio -
                  1 +
                  2 *
                  (parseInt(grades[i - 1].periodoInicio.slice(0, 4), 10) -
                          parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
                  (parseInt(grades[i - 1].periodoInicio.slice(5, 6), 10) -
                          parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
                  2;
        for (let k = 0; k < disciplinaGrades.length; k++) {
          if (
                  disciplinaGrades[k].Grade == grade &&
                  this.isEven(disciplinaGrades[k].periodo) == this.evenEC &&
                  disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
                  disciplinaGrades[k].periodo <= parseInt(fim, 10)
          ) {
            for (let j = 0; j < turmas.length; j++) {
              if (turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                for (let p = 0; p < pedidos.length; p++) {
                  if (
                          pedidos[p].vagasPeriodizadas > 0 &&
                          pedidos[p].Turma == turmas[j].id
                  ) {
                    this.ativos1.EC[disciplinaGrades[k].periodo - 1].push(
                            turmas[j]
                    );
                  }
                }
              }
            }
            for (let j = 0; j < turmasExternas.length; j++) {
              if (
                      turmasExternas[j].periodo == 1 &&
                      turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (let p = 0; p < pedidosExternos.length; p++) {
                  if (
                          pedidosExternos[p].vagasPeriodizadas > 0 &&
                          pedidosExternos[p].Turma == turmasExternas[j].id
                  ) {
                    this.ativos1.EC[disciplinaGrades[k].periodo - 1].push(
                            turmasExternas[j]
                    );
                  }
                }
              }
            }
          }
        }
      }

      //Eletivas
      var eletiva = true;
      for (var t = 0; t < turmas.length; t++) {
        for (let d = 0; d < disciplinaGrades.length; d++) {
          if (turmas[t].Disciplina === disciplinaGrades[d].Disciplina) {
            eletiva = false;
          }
        }
        if (eletiva) {
          this.ativos1.Eletivas.push(turmas[t]);
        } else {
          eletiva = true;
        }
      }

      this.$store.commit("redefinirAtivas1", {
        Ativas: this.ativos1,
      });
    },

    createHorarios2: function() {
      var grade;
      var grades;
      var inicio = 1;
      var fim;
      var pedidos;
      var pedidosExternos;
      var disciplinaGrades = this.$store.state.disciplinaGrade.DisciplinaGrades;
      var turmas = _.filter(this.$store.state.turma.Turmas, ["periodo", 3]);
      var turmasExternas = this.$store.state.turmaExterna.Turmas;
      var anoAtual = this.$store.state.plano.Plano[0].ano;
      var semestreAtual = 1;

      if (this.$store.state.curso.Cursos[0].semestreInicial == 1) {
        this.evenCCN = "true";
      } else if (this.$store.state.curso.Cursos[0].semestreInicial == 2) {
        this.evenCCN = "false";
      }

      if (this.$store.state.curso.Cursos[1].semestreInicial == 1) {
        this.evenEC = "true";
      } else if (this.$store.state.curso.Cursos[1].semestreInicial == 2) {
        this.evenEC = "false";
      }

      if (this.$store.state.curso.Cursos[2].semestreInicial == 1) {
        this.evenSI = "true";
      } else if (this.$store.state.curso.Cursos[2].semestreInicial == 2) {
        this.evenSI = "false";
      }

      if (this.$store.state.curso.Cursos[3].semestreInicial == 1) {
        this.evenCCD = "true";
      } else if (this.$store.state.curso.Cursos[3].semestreInicial == 2) {
        this.evenCCD = "false";
      }

      //CC Diurno
      grades = _.filter(this.$store.state.grade.Grades, ["Curso", 4]);
      grades = _.orderBy(grades, "periodoInicio", "desc");
      pedidos = [];
      for (let t in this.$store.state.pedido.Pedidos) {
        for (let pedido in this.$store.state.pedido.Pedidos[t]) {
          if (this.$store.state.pedido.Pedidos[t][pedido].Curso === 4) {
            pedidos.push(this.$store.state.pedido.Pedidos[t][pedido]);
          }
        }
      }
      pedidosExternos = [];
      for (let t in this.$store.state.pedidoExterno.Pedidos) {
        for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]) {
          if (this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso === 4) {
            pedidosExternos.push(
                    this.$store.state.pedidoExterno.Pedidos[t][pedido]
            );
          }
        }
      }
      for (let i = 0; i < grades.length && inicio <= 10; i++) {
        //grade
        grade = grades[i].id;
        //inicio
        if (i === 0) inicio = 1;
        else inicio = fim + 1;
        //fim
        if (i + 1 === grades.length) fim = 10;
        else if (i == 0)
          fim =
                  1 +
                  2 *
                  (parseInt(anoAtual, 10) -
                          parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
                  (parseInt(semestreAtual, 10) -
                          parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
                  2;
        else
          fim =
                  inicio -
                  1 +
                  2 *
                  (parseInt(grades[i - 1].periodoInicio.slice(0, 4), 10) -
                          parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
                  (parseInt(grades[i - 1].periodoInicio.slice(5, 6), 10) -
                          parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
                  2;
        for (let k = 0; k < disciplinaGrades.length; k++) {
          if (
                  disciplinaGrades[k].Grade == grade &&
                  this.isEven(disciplinaGrades[k].periodo) == this.evenCCD &&
                  disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
                  disciplinaGrades[k].periodo <= parseInt(fim, 10)
          ) {
            for (let j = 0; j < turmas.length; j++) {
              if (turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                for (let p = 0; p < pedidos.length; p++) {
                  if (
                          pedidos[p].vagasPeriodizadas > 0 &&
                          pedidos[p].Turma == turmas[j].id
                  ) {
                    this.ativos2.CCD[disciplinaGrades[k].periodo - 1].push(
                            turmas[j]
                    );
                  }
                }
              }
            }
            for (let j = 0; j < turmasExternas.length; j++) {
              if (
                      turmasExternas[j].periodo == 3 &&
                      turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (let p = 0; p < pedidosExternos.length; p++) {
                  if (
                          pedidosExternos[p].vagasPeriodizadas > 0 &&
                          pedidosExternos[p].Turma == turmasExternas[j].id
                  ) {
                    this.ativos2.CCD[disciplinaGrades[k].periodo - 1].push(
                            turmasExternas[j]
                    );
                  }
                }
              }
            }
          }
        }
      }

      //CC Noturno
      grades = _.filter(this.$store.state.grade.Grades, ["Curso", 1]);
      grades = _.orderBy(grades, "periodoInicio", "desc");
      pedidos = [];
      for (let t in this.$store.state.pedido.Pedidos) {
        for (let pedido in this.$store.state.pedido.Pedidos[t]) {
          if (this.$store.state.pedido.Pedidos[t][pedido].Curso === 1) {
            pedidos.push(this.$store.state.pedido.Pedidos[t][pedido]);
          }
        }
      }
      pedidosExternos = [];
      for (let t in this.$store.state.pedidoExterno.Pedidos) {
        for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]) {
          if (this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso === 1) {
            pedidosExternos.push(
                    this.$store.state.pedidoExterno.Pedidos[t][pedido]
            );
          }
        }
      }
      for (let i = 0; i < grades.length && inicio <= 10; i++) {
        //grade
        grade = grades[i].id;
        //inicio
        if (i === 0) inicio = 1;
        else inicio = fim + 1;
        //fim
        if (i + 1 === grades.length) fim = 10;
        else if (i == 0)
          fim =
                  1 +
                  2 *
                  (parseInt(anoAtual, 10) -
                          parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
                  (parseInt(semestreAtual, 10) -
                          parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
                  2;
        else
          fim =
                  inicio -
                  1 +
                  2 *
                  (parseInt(grades[i - 1].periodoInicio.slice(0, 4), 10) -
                          parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
                  (parseInt(grades[i - 1].periodoInicio.slice(5, 6), 10) -
                          parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
                  2;
        for (let k = 0; k < disciplinaGrades.length; k++) {
          if (
                  disciplinaGrades[k].Grade == grade &&
                  this.isEven(disciplinaGrades[k].periodo) == this.evenCCN &&
                  disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
                  disciplinaGrades[k].periodo <= parseInt(fim, 10)
          ) {
            for (let j = 0; j < turmas.length; j++) {
              if (turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                for (let p = 0; p < pedidos.length; p++) {
                  if (
                          pedidos[p].vagasPeriodizadas > 0 &&
                          pedidos[p].Turma == turmas[j].id
                  ) {
                    this.ativos2.CCN[disciplinaGrades[k].periodo - 1].push(
                            turmas[j]
                    );
                  }
                }
              }
            }
            for (let j = 0; j < turmasExternas.length; j++) {
              if (
                      turmasExternas[j].periodo == 3 &&
                      turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (let p = 0; p < pedidosExternos.length; p++) {
                  if (
                          pedidosExternos[p].vagasPeriodizadas > 0 &&
                          pedidosExternos[p].Turma == turmasExternas[j].id
                  ) {
                    this.ativos2.CCN[disciplinaGrades[k].periodo - 1].push(
                            turmasExternas[j]
                    );
                  }
                }
              }
            }
          }
        }
      }

      //SI
      grades = _.filter(this.$store.state.grade.Grades, ["Curso", 3]);
      grades = _.orderBy(grades, "periodoInicio", "desc");
      pedidos = [];
      for (let t in this.$store.state.pedido.Pedidos) {
        for (let pedido in this.$store.state.pedido.Pedidos[t]) {
          if (this.$store.state.pedido.Pedidos[t][pedido].Curso === 3) {
            pedidos.push(this.$store.state.pedido.Pedidos[t][pedido]);
          }
        }
      }
      pedidosExternos = [];
      for (let t in this.$store.state.pedidoExterno.Pedidos) {
        for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]) {
          if (this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso === 3) {
            pedidosExternos.push(
                    this.$store.state.pedidoExterno.Pedidos[t][pedido]
            );
          }
        }
      }
      for (let i = 0; i < grades.length && inicio <= 10; i++) {
        //grade
        grade = grades[i].id;
        //inicio
        if (i === 0) inicio = 1;
        else inicio = fim + 1;
        //fim
        if (i + 1 === grades.length) fim = 10;
        else if (i == 0)
          fim =
                  1 +
                  2 *
                  (parseInt(anoAtual, 10) -
                          parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
                  (parseInt(semestreAtual, 10) -
                          parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
                  2;
        else
          fim =
                  inicio -
                  1 +
                  2 *
                  (parseInt(grades[i - 1].periodoInicio.slice(0, 4), 10) -
                          parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
                  (parseInt(grades[i - 1].periodoInicio.slice(5, 6), 10) -
                          parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
                  2;
        for (let k = 0; k < disciplinaGrades.length; k++) {
          if (
                  disciplinaGrades[k].Grade == grade &&
                  this.isEven(disciplinaGrades[k].periodo) == this.evenSI &&
                  disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
                  disciplinaGrades[k].periodo <= parseInt(fim, 10)
          ) {
            for (let j = 0; j < turmas.length; j++) {
              if (turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                for (let p = 0; p < pedidos.length; p++) {
                  if (
                          pedidos[p].vagasPeriodizadas > 0 &&
                          pedidos[p].Turma == turmas[j].id
                  ) {
                    this.ativos2.SI[disciplinaGrades[k].periodo - 1].push(
                            turmas[j]
                    );
                  }
                }
              }
            }
            for (let j = 0; j < turmasExternas.length; j++) {
              if (
                      turmasExternas[j].periodo == 3 &&
                      turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (let p = 0; p < pedidosExternos.length; p++) {
                  if (
                          pedidosExternos[p].vagasPeriodizadas > 0 &&
                          pedidosExternos[p].Turma == turmasExternas[j].id
                  ) {
                    this.ativos2.SI[disciplinaGrades[k].periodo - 1].push(
                            turmasExternas[j]
                    );
                  }
                }
              }
            }
          }
        }
      }

      //Engenharia Computacional
      grades = _.filter(this.$store.state.grade.Grades, ["Curso", 2]);
      grades = _.orderBy(grades, "periodoInicio", "desc");
      pedidos = [];
      for (let t in this.$store.state.pedido.Pedidos) {
        for (let pedido in this.$store.state.pedido.Pedidos[t]) {
          if (this.$store.state.pedido.Pedidos[t][pedido].Curso === 2) {
            pedidos.push(this.$store.state.pedido.Pedidos[t][pedido]);
          }
        }
      }
      pedidosExternos = [];
      for (let t in this.$store.state.pedidoExterno.Pedidos) {
        for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]) {
          if (this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso === 2) {
            pedidosExternos.push(
                    this.$store.state.pedidoExterno.Pedidos[t][pedido]
            );
          }
        }
      }
      for (let i = 0; i < grades.length && inicio <= 10; i++) {
        //grade
        grade = grades[i].id;
        //inicio
        if (i === 0) inicio = 1;
        else inicio = fim + 1;
        //fim
        if (i + 1 === grades.length) fim = 10;
        else if (i == 0)
          fim =
                  1 +
                  2 *
                  (parseInt(anoAtual, 10) -
                          parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
                  (parseInt(semestreAtual, 10) -
                          parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
                  2;
        else
          fim =
                  inicio -
                  1 +
                  2 *
                  (parseInt(grades[i - 1].periodoInicio.slice(0, 4), 10) -
                          parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
                  (parseInt(grades[i - 1].periodoInicio.slice(5, 6), 10) -
                          parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
                  2;
        for (let k = 0; k < disciplinaGrades.length; k++) {
          if (
                  disciplinaGrades[k].Grade == grade &&
                  this.isEven(disciplinaGrades[k].periodo) == this.evenEC &&
                  disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
                  disciplinaGrades[k].periodo <= parseInt(fim, 10)
          ) {
            for (let j = 0; j < turmas.length; j++) {
              if (turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                for (let p = 0; p < pedidos.length; p++) {
                  if (
                          pedidos[p].vagasPeriodizadas > 0 &&
                          pedidos[p].Turma == turmas[j].id
                  ) {
                    this.ativos2.EC[disciplinaGrades[k].periodo - 1].push(
                            turmas[j]
                    );
                  }
                }
              }
            }
            for (let j = 0; j < turmasExternas.length; j++) {
              if (
                      turmasExternas[j].periodo == 3 &&
                      turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (let p = 0; p < pedidosExternos.length; p++) {
                  if (
                          pedidosExternos[p].vagasPeriodizadas > 0 &&
                          pedidosExternos[p].Turma == turmasExternas[j].id
                  ) {
                    this.ativos2.EC[disciplinaGrades[k].periodo - 1].push(
                            turmasExternas[j]
                    );
                  }
                }
              }
            }
          }
        }
      }

      //Eletivas
      var eletiva = true;
      for (var t = 0; t < turmas.length; t++) {
        for (let d = 0; d < disciplinaGrades.length; d++) {
          if (turmas[t].Disciplina === disciplinaGrades[d].Disciplina) {
            eletiva = false;
          }
        }
        if (eletiva) {
          this.ativos2.Eletivas.push(turmas[t]);
        } else {
          eletiva = true;
        }
      }

      this.$store.commit("redefinirAtivas2", {
        Ativas: this.ativos2,
      });
    },

  },
  computed: {
    //Turmas validacoes ordenadas
    Turmas_Validacoes_Ordered() {
      return _.orderBy(
        this.Turmas_Validacoes,
        this.ordemTurmas.order,
        this.ordemTurmas.type
      );
    },
    //Verifica validações das turmas
    Turmas_Validacoes() {
      console.log(this.Turmas[0]);
      let turmas_resultante = [];

      this.Turmas.forEach((turma) => {
        let disciplina = this.findDisciplinaById(turma.Disciplina);

        if (disciplina) {
          let validacao = this.createValidacao(turma, disciplina);
          this.checkAllValidations(validacao);

          if (validacao.conflitos.length) turmas_resultante.push(validacao);
        }
      });
      return turmas_resultante;
    },

    Docentes_validacoes() {
      let docentes_resultantes = [];

      this.Docentes.forEach((docente) => {
        let validacao = { nome: docente.nome, erros: [] };
        let cargaGraduacao = this.creditosGraduacao(docente);
        let cargaPos = this.creditosPos(docente);
        if (cargaGraduacao < 8.0) {
          validacao.erros.push(
            `Apenas ${cargaGraduacao} créditos na graduação`
          );
        }
        if (cargaGraduacao + cargaPos < 16.0) {
          validacao.erros.push(
            `Apenas ${cargaGraduacao +
              cargaPos} créditos, ${cargaGraduacao}  na graduação e ${cargaPos} na pós`
          );
        }

        if (validacao.erros.length > 0) {
          docentes_resultantes.push(validacao);
        }
      });

      return docentes_resultantes;
    },

    Turmas() {
      return _.orderBy(this.$store.state.turma.Turmas, ["letra", "Disciplina"]);
    },
    Disciplinas() {
      return _.orderBy(this.$store.state.disciplina.Disciplinas, "nome");
    },
    Perfis() {
      return _.orderBy(this.$store.state.perfil.Perfis, "nome");
    },
    Salas() {
      return _.orderBy(this.$store.state.sala.Salas, "nome");
    },
    Docentes() {
      return _.orderBy(
        _.filter(this.$store.state.docente.Docentes, ["ativo", true]),
        "nome",
        this.ordemDocentes
      );
    },
  },
};
</script>

<style scoped>
.DashboardValidacoes {
  max-width: 100%;
  overflow: hidden;
  margin: 0;
}
.titulo {
  font-size: 25px;
  font-weight: normal;
  padding-left: 0;
  margin: 0 !important;
}

/* main-table */
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
  height: -webkit-calc(100vh - 125px);
  height: -moz-calc(100vh - 125px);
  height: calc(100vh - 125px);
}
.main-table .p-header {
  height: 18px;
}
.main-table p {
  padding: 0 5px 0 5px !important;
  margin: 0 !important;
  font-size: 11px !important;
  text-align: center;
}
tbody {
  max-height: 100% !important;
  width: 100% !important;
}
.main-table td {
  text-align: center;
  vertical-align: middle !important;
  padding: 0 !important;
  height: 22px !important;
}
.main-table tr thead {
  display: block !important;
}
.main-table thead th {
  padding: 0 !important;
  font-size: 14px;
  text-align: center;
  height: 18px !important;
}
.main-table input[type="checkbox"] {
  width: 13px !important;
  height: 13px !important;
  text-align: center !important;
  margin: 0 !important;
  margin-top: 4px !important;
}
/* fim table */

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

.cancelbtn {
  background-color: white !important;
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
.nav-link {
  color: #007bff !important;
  cursor: pointer;
}
.nav-link:hover {
  text-decoration: underline;
}
.active {
  background-color: #e9ecef !important;
  color: #495057 !important;
  cursor: default;
  text-decoration: none !important;
}
</style>
