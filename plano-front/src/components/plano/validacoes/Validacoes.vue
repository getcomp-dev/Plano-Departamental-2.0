<template>
  <div id="Validacoes" class="DashboardValidacoes row pr-2">
    <!-- Titulo -->
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
          <!-- <b-button title="Filtros" class="btn-icon cancelbtn">
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
    <div class="w-100"></div>
    <!-- TABLE DOCENTES -->
    <div class="pl-0 divTable">
      <table
        v-if="nav_table === 'docentes'"
        class="table main-table table-hover table-sm table-bordered"
      >
        <thead class="thead-light ">
          <tr class="sticky">
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
        <thead class="thead-light ">
          <tr class="sticky">
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
                  Turma
                </p>
              </th>
              <th>
                <p style="width: 130px; text-align: center;" class="p-header">
                  Docentes
                </p>
              </th>

              <th>
                <p style="width: 350px; text-align: start;" class="p-header">
                  Conflito
                </p>
              </th>
              <th><p class="p-header" style="width:50px">Tipo</p></th>
            </div>
          </tr>
        </thead>
        <tbody style="text-transform: uppercase">
          <template v-for="validacao in Turmas_Validacoes_Ordered">
            <tr
              :key="
                'validacoes-' + validacao.turma_id + validacao.disciplina_codigo
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
                  <p style="width: 130px; text-align: center;">
                    {{ validacao.turma_docente1 }}
                    <br />
                    {{ validacao.turma_docente2 }}
                  </p>
                </td>

                <td>
                  <p style="width: 350px; text-align: start;"></p>
                </td>
                <td>
                  <p
                    style="width: 50px; text-align: center;"
                    @click="openModalEditTurma(validacao.turma)"
                    class="clickable"
                  >
                    <button
                      class="btn btn-info btn-small btn-table"
                      style="font-size:11px"
                    >
                      EDIT
                    </button>
                    <!-- <i class="fas fa-edit addbtn" style="font-size:1rem"></i> -->
                  </p>
                </td>
              </div>
            </tr>
            <tr
              v-for="(erro, index) in validacao.conflitos"
              :key="
                index + 'validacao-conflitos-' + validacao.turma_id + erro.type
              "
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
                  <p style="width: 130px; text-align: center;"></p>
                </td>

                <td>
                  <p v-html="erro.msg" style="width: 350px; text-align: start;">
                    <!-- {{ erro.msg }}  -->
                  </p>
                </td>
                <td>
                  <p style="width:50px; " class="py-auto">
                    <i
                      v-if="isCritical(erro.type)"
                      style=" background-color: inherit; font-size: 14px;"
                      class="fas fa-exclamation-circle delbtn my-auto"
                    ></i>
                  </p>
                </td>
              </div>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <b-modal
      id="modalTurma"
      ref="modalTurma"
      scrollable
      title="Edição de Turma"
      size="md"
    >
      <ModalTurma :turma="turma_clickada"></ModalTurma>
      <div slot="modal-footer" class="d-none"></div>
    </b-modal>
  </div>
</template>

<script>
import _ from "lodash";
import ModalTurma from "./ModalTurma.vue";

export default {
  name: "Validacoes",
  data() {
    return {
      turma_clickada: null,
      nav_table: "turmas",
      ordemTurmas: { order: "turma_periodo", type: "asc" },
      ordemDocentes: "asc",
      semestreAtual: 1,
      ordemDocentes: "asc",
      grades1semestre: {CCD: [], CCN: [], EC:[], SI:[]},
      grades2semestre: {CCD: [], CCN: [], EC:[], SI:[]}

    };
  },
  components: {
    ModalTurma,
  },
  mounted() {
    //define grades ativas por periodo
    let g
    let periodoInicial, periodoFinal
    let ano = this.$store.state.plano.Plano[0].ano
    //CCD
    g = _.filter(this.$store.state.grade.Grades, ["Curso", 4]);
    g = _.orderBy(g, "periodoInicio", "desc");
    periodoFinal = 0
    for(let i = 0; i < g.length; i++){
      periodoInicial = periodoFinal + 1
      periodoFinal = 1 + 2 * (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
              (1 - parseInt(g[i].periodoInicio.slice(5, 6), 10)) / 2;
      this.grades1semestre.CCD.push({id:g[i].id, inicio: periodoInicial, fim:periodoFinal})
      if(periodoFinal > 9) {
        break;
      }
    }
    periodoFinal = 0
    for(let i = 0; i < g.length; i++){
      periodoInicial = periodoFinal + 1
      periodoFinal = 1 + 2 * (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
              (3 - parseInt(g[i].periodoInicio.slice(5, 6), 10)) / 2;
      this.grades2semestre.CCD.push({id:g[i].id, inicio: periodoInicial, fim:periodoFinal})
      if(periodoFinal > 9) {
        break;
      }
    }
    //CCN
    g = _.filter(this.$store.state.grade.Grades, ["Curso", 1]);
    g = _.orderBy(g, "periodoInicio", "desc");
    periodoFinal = 0
    for(let i = 0; i < g.length; i++){
      periodoInicial = periodoFinal + 1
      periodoFinal = 1 + 2 * (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
              (1 - parseInt(g[i].periodoInicio.slice(5, 6), 10)) / 2;
      this.grades1semestre.CCN.push({id:g[i].id, inicio: periodoInicial, fim:periodoFinal})
      if(periodoFinal > 9) {
        break;
      }
    }
    periodoFinal = 0
    for(let i = 0; i < g.length; i++){
      periodoInicial = periodoFinal + 1
      periodoFinal = 1 + 2 * (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
              (3 - parseInt(g[i].periodoInicio.slice(5, 6), 10)) / 2;
      this.grades2semestre.CCN.push({id:g[i].id, inicio: periodoInicial, fim:periodoFinal})
      if(periodoFinal > 9) {
        break;
      }
    }
    //SI
    g = _.filter(this.$store.state.grade.Grades, ["Curso", 3]);
    g = _.orderBy(g, "periodoInicio", "desc");
    periodoFinal = 0
    for(let i = 0; i < g.length; i++){
      periodoInicial = periodoFinal + 1
      periodoFinal = 1 + 2 * (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
              (1 - parseInt(g[i].periodoInicio.slice(5, 6), 10)) / 2;
      this.grades1semestre.SI.push({id:g[i].id, inicio: periodoInicial, fim:periodoFinal})
      if(periodoFinal > 9) {
        break;
      }
    }
    periodoFinal = 0
    for(let i = 0; i < g.length; i++){
      periodoInicial = periodoFinal + 1
      periodoFinal = 1 + 2 * (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
              (3 - parseInt(g[i].periodoInicio.slice(5, 6), 10)) / 2;
      this.grades2semestre.SI.push({id:g[i].id, inicio: periodoInicial, fim:periodoFinal})
      if(periodoFinal > 9) {
        break;
      }
    }
    //EC
    g = _.filter(this.$store.state.grade.Grades, ["Curso", 2]);
    g = _.orderBy(g, "periodoInicio", "desc");
    periodoFinal = 0
    for(let i = 0; i < g.length; i++){
      periodoInicial = periodoFinal + 1
      periodoFinal = 1 + 2 * (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
              (1 - parseInt(g[i].periodoInicio.slice(5, 6), 10)) / 2;
      this.grades1semestre.EC.push({id:g[i].id, inicio: periodoInicial, fim:periodoFinal})
      if(periodoFinal > 9) {
        break;
      }
    }
    periodoFinal = 0
    for(let i = 0; i < g.length; i++){
      periodoInicial = periodoFinal + 1
      periodoFinal = 1 + 2 * (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
              (3 - parseInt(g[i].periodoInicio.slice(5, 6), 10)) / 2;
      this.grades2semestre.EC.push({id:g[i].id, inicio: periodoInicial, fim:periodoFinal})
      if(periodoFinal > 9) {
        break;
      }
    }
    console.log(this.grades1semestre)
    console.log(this.grades2semestre)
  },

  methods: {
    openModalEditTurma(turma) {
      this.turma_clickada = turma;
      this.$bvModal.show("modalTurma");
    },
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
    isCritical(tipo) {
      return tipo == 1 || tipo == 2 || tipo == 3 || tipo == 4 || tipo == 5
        ? true
        : false;
    },
    createValidacao(turma, disciplina) {
      return {
        //Turmas
        turma: { ...turma },
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
      // sala 1
      check = this.checkVagaSala(
        validacao.turma_sala1,
        validacao.pedidos_totais
      );
      if (check) validacao.conflitos.push(check);
      // sala 2
      if (validacao.turma_sala1 != validacao.turma_sala2) {
        check = this.checkVagaSala(
          validacao.turma_sala2,
          validacao.pedidos_totais
        );
        if (check) validacao.conflitos.push(check);
      }
      // check = this.checkVagasSalas(
      //   validacao.turma_sala1,
      //   validacao.turma_sala2,
      //   validacao.pedidos_totais
      // );

      //Pedidos
      check = this.checkPedidos(validacao.pedidos_totais);
      if (check) validacao.conflitos.push(check);

      check = this.checkPeriodoCursos(validacao.turma);
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
    checkVagaSala(sala_id, pedidos_totais) {
      let sala;
      if (sala_id != null) sala = _.find(this.Salas, (s) => sala_id == s.id);

      if (sala != undefined) {
        if (sala.lotacao_maxima < pedidos_totais) {
          return {
            type: 6,
            msg: `Limite da sala ${sala.nome} execedido!<br>Vagas: ${pedidos_totais} - Lotação: ${sala.lotacao_maxima} `,
          };
        }
      }
    },
    checkVagasSalas(sala1_id, sala2_id, pedidos_totais) {
      let sala1, sala2;
      if (sala1_id != null) sala1 = _.find(this.Salas, (s) => sala1_id == s.id);
      if (sala2_id != null && sala2_id != sala1_id)
        sala2 = _.find(this.Salas, (s) => sala2_id == s.id);
      let result = { type: 6, msg: "" };

      if (sala1 != undefined) {
        if (sala1.lotacao_maxima < pedidos_totais) {
          result.msg +=
            "Limite da sala " +
            sala1.nome +
            " excedido!" +
            "<br>Vagas: " +
            pedidos_totais +
            " - Lotaçao: " +
            sala1.lotacao_maxima +
            "<br/>";
        }
      }
      if (sala2 != undefined) {
        if (sala2.lotacao_maxima < pedidos_totais) {
          result.msg +=
            "Limite da sala " +
            sala2.nome +
            " excedido!" +
            "<br>Vagas: " +
            pedidos_totais +
            " - Lotaçao: " +
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

    checkPeriodoCursos(turma){
      if(turma.Horario1 === null && turma.Horario2 === null){
        return false
      }
      let msg = ''
      let pedidos = this.$store.state.pedido.Pedidos[turma.id]
      let grades
      if(turma.periodo === 1 || turma.periodo === 2){
        grades = this.grades1semestre
      }else{
        grades = this.grades2semestre
      }
      let conflitos = false
      if(_.find(pedidos, {Curso: 4}).vagasPeriodizadas > 0){
        for(let i = 0; i < grades.CCD.length; i++){
          let disciplinaGrade = _.find(this.$store.state.disciplinaGrade.DisciplinaGrades, {Grade:grades.CCD[i].id, Disciplina: turma.Disciplina})
          if((disciplinaGrade !== undefined) && (disciplinaGrade.periodo >= grades.CCD[i].inicio) && (disciplinaGrade.periodo <= grades.CCD[i].fim)){
            let disciplinasPeriodo = _.filter(this.$store.state.disciplinaGrade.DisciplinaGrades, {Grade:grades.CCD[i].id, periodo:disciplinaGrade.periodo})
            for(let d = 0; d < disciplinasPeriodo.length; d++){
              if(disciplinasPeriodo[d].Disciplina === turma.Disciplina){
                continue
              }
              let turmasDisciplina = _.filter(this.$store.state.turma.Turmas, (t) => {
                let pedido = _.find(this.$store.state.pedido.Pedidos[t.id], {Curso:4})
                return ((t.periodo == turma.periodo) && (t.Disciplina === disciplinasPeriodo[d].Disciplina) && (pedido.vagasPeriodizadas > 0))
              })
              for(let t = 0; t < turmasDisciplina.length; t++){
                if((turma.Horario1!==null && ((turma.Horario1 === turmasDisciplina[t].Horario1) || (turma.Horario1 === turmasDisciplina[t].Horario2)))
                  || (turma.Horario2!==null && ((turma.Horario2 === turmasDisciplina[t].Horario1) || (turma.Horario2 === turmasDisciplina[t].Horario2)))){
                  let disciplinaConflito = _.find(this.$store.state.disciplina.Disciplinas, {id:disciplinasPeriodo[d].Disciplina})
                  conflitos = true
                  msg = msg + `\nConflito de Horário com a turma ${disciplinaConflito.codigo}${turmasDisciplina[t].letra} no ${disciplinaGrade.periodo}º período da grade de Ciência da Computação - Diurno`
                }
              }
            }
          }
        }
      }
      if(_.find(pedidos, {Curso: 1}).vagasPeriodizadas > 0){
        for(let i = 0; i < grades.CCN.length; i++){
          let disciplinaGrade = _.find(this.$store.state.disciplinaGrade.DisciplinaGrades, {Grade:grades.CCN[i].id, Disciplina: turma.Disciplina})
          if((disciplinaGrade !== undefined) && (disciplinaGrade.periodo >= grades.CCN[i].inicio) && (disciplinaGrade.periodo <= grades.CCN[i].fim)){
            let disciplinasPeriodo = _.filter(this.$store.state.disciplinaGrade.DisciplinaGrades, {Grade:grades.CCN[i].id, periodo:disciplinaGrade.periodo})
            for(let d = 0; d < disciplinasPeriodo.length; d++){
              if(disciplinasPeriodo[d].Disciplina === turma.Disciplina){
                continue
              }
              let turmasDisciplina = _.filter(this.$store.state.turma.Turmas, (t) => {
                let pedido = _.find(this.$store.state.pedido.Pedidos[t.id], {Curso:1})
                return ((t.periodo == turma.periodo) && (t.Disciplina === disciplinasPeriodo[d].Disciplina) && (pedido.vagasPeriodizadas > 0))
              })
              for(let t = 0; t < turmasDisciplina.length; t++){
                if((turma.Horario1!==null && ((turma.Horario1 === turmasDisciplina[t].Horario1) || (turma.Horario1 === turmasDisciplina[t].Horario2)))
                        || (turma.Horario2!==null && ((turma.Horario2 === turmasDisciplina[t].Horario1) || (turma.Horario2 === turmasDisciplina[t].Horario2)))){
                  let disciplinaConflito = _.find(this.$store.state.disciplina.Disciplinas, {id:disciplinasPeriodo[d].Disciplina})
                  conflitos = true
                  msg = msg + `\nConflito de Horário com a turma ${disciplinaConflito.codigo}${turmasDisciplina[t].letra} no ${disciplinaGrade.periodo}º período da grade de Ciência da Computação - Noturno`
                }
              }
            }
          }
        }
      }
      if(_.find(pedidos, {Curso: 3}).vagasPeriodizadas > 0){
        for(let i = 0; i < grades.SI.length; i++){
          let disciplinaGrade = _.find(this.$store.state.disciplinaGrade.DisciplinaGrades, {Grade:grades.SI[i].id, Disciplina: turma.Disciplina})
          if((disciplinaGrade !== undefined) && (disciplinaGrade.periodo >= grades.SI[i].inicio) && (disciplinaGrade.periodo <= grades.SI[i].fim)){
            let disciplinasPeriodo = _.filter(this.$store.state.disciplinaGrade.DisciplinaGrades, {Grade:grades.SI[i].id, periodo:disciplinaGrade.periodo})
            for(let d = 0; d < disciplinasPeriodo.length; d++){
              if(disciplinasPeriodo[d].Disciplina === turma.Disciplina){
                continue
              }
              let turmasDisciplina = _.filter(this.$store.state.turma.Turmas, (t) => {
                let pedido = _.find(this.$store.state.pedido.Pedidos[t.id], {Curso:3})
                return ((t.periodo == turma.periodo) && (t.Disciplina === disciplinasPeriodo[d].Disciplina) && (pedido.vagasPeriodizadas > 0))
              })
              for(let t = 0; t < turmasDisciplina.length; t++){
                if((turma.Horario1!==null && ((turma.Horario1 === turmasDisciplina[t].Horario1) || (turma.Horario1 === turmasDisciplina[t].Horario2)))
                        || (turma.Horario2!==null && ((turma.Horario2 === turmasDisciplina[t].Horario1) || (turma.Horario2 === turmasDisciplina[t].Horario2)))){
                  let disciplinaConflito = _.find(this.$store.state.disciplina.Disciplinas, {id:disciplinasPeriodo[d].Disciplina})
                  conflitos = true
                  msg = msg + `\nConflito de Horário com a turma ${disciplinaConflito.codigo}${turmasDisciplina[t].letra} no ${disciplinaGrade.periodo}º período da grade de Sistemas de Informação`
                }
              }
            }
          }
        }
      }
      if(_.find(pedidos, {Curso: 2}).vagasPeriodizadas > 0){
        for(let i = 0; i < grades.EC.length; i++){
          let disciplinaGrade = _.find(this.$store.state.disciplinaGrade.DisciplinaGrades, {Grade:grades.EC[i].id, Disciplina: turma.Disciplina})
          if((disciplinaGrade !== undefined) && (disciplinaGrade.periodo >= grades.EC[i].inicio) && (disciplinaGrade.periodo <= grades.EC[i].fim)){
            let disciplinasPeriodo = _.filter(this.$store.state.disciplinaGrade.DisciplinaGrades, {Grade:grades.EC[i].id, periodo:disciplinaGrade.periodo})
            for(let d = 0; d < disciplinasPeriodo.length; d++){
              if(disciplinasPeriodo[d].Disciplina === turma.Disciplina){
                continue
              }
              let turmasDisciplina = _.filter(this.$store.state.turma.Turmas, (t) => {
                let pedido = _.find(this.$store.state.pedido.Pedidos[t.id], {Curso:2})
                return ((t.periodo == turma.periodo) && (t.Disciplina === disciplinasPeriodo[d].Disciplina) && (pedido.vagasPeriodizadas > 0))
              })
              for(let t = 0; t < turmasDisciplina.length; t++){
                if((turma.Horario1!==null && ((turma.Horario1 === turmasDisciplina[t].Horario1) || (turma.Horario1 === turmasDisciplina[t].Horario2)))
                        || (turma.Horario2!==null && ((turma.Horario2 === turmasDisciplina[t].Horario1) || (turma.Horario2 === turmasDisciplina[t].Horario2)))){
                  let disciplinaConflito = _.find(this.$store.state.disciplina.Disciplinas, {id:disciplinasPeriodo[d].Disciplina})
                  conflitos = true
                  msg = msg + `\nConflito de Horário com a turma ${disciplinaConflito.codigo}${turmasDisciplina[t].letra} no ${disciplinaGrade.periodo}º período da grade de Engenharia Computacional`
                }
              }
            }
          }
        }
      }
      if(conflitos) return {type: 8, msg: msg}
      else return false

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
  font-size: 11px !important;
  font-weight: normal !important;
  background-color: white;
  margin: 0 !important;
  height: -webkit-calc(100vh - 125px);
  height: -moz-calc(100vh - 125px);
  height: calc(100vh - 125px);
}

.main-table .p-header {
  padding: 0px 5px 0px 5px !important;
  margin: 0 !important;
  text-align: center;
  height: 18px !important;
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
.btn-table {
  padding: 0 0.25rem !important;
}
/* Botoes */
.btn-icon {
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
  color: #b8b8a8;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #ada89a;
}
.addbtn {
  color: #7cd17c;
}

.addbtn:hover {
  color: #77dd77;
}

.addbtn:focus {
  color: #77dd77;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #2fbf53;
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
</style>
