<template>
  <div v-if="Admin" class="main-component row">
    <PageTitle :title="'Logs'">
      <template #aside>
        <div class="input-group mx-2 p-0">
          <div class="input-group-prepend">
            <label class="input-group-text">Operação</label>
          </div>
          <select class="form-control form-control-top" v-model="operacoes">
            <option value="Todos">Todas</option>
            <option value="Create">Create</option>
            <option value="Delete">Delete</option>
            <option value="Edit">Edit</option>
          </select>
        </div>

        <b-button
          v-b-modal.modalFiltros
          title="Tabelas"
          class="btn-custom btn-icon cancelbtn ml-2"
        >
          <i class="fas fa-list-ul"></i>
        </b-button>
      </template>
    </PageTitle>

    <div class="row w-100 m-0 p-0">
      <div class="divTable p-0">
        <TableMain>
          <template #thead>
            <th style="width: 110px;">Tabela Modificada</th>
            <th style="width: 120px">Campo Modificado</th>
            <th style="width: 200px">Linha Modificada</th>
            <th style="width: 120px">Valor Anterior</th>
            <th style="width: 120px">Novo Valor</th>
            <th style="width: 65px">Operação</th>
            <th style="width: 80px">Usuário</th>
            <th style="width: 160px">Hora</th>
          </template>
          <template #tbody>
            <template v-for="h in History">
              <tr :key="`History${h.id}`">
                <td style="width: 110px">
                  {{ h.tabelaModificada }}
                </td>
                <td style="width: 120px">
                  {{ h.campoModificado }}
                </td>
                <td style="width: 200px">
                  {{ linhaModificada(h) }}
                </td>
                <td style="width: 120px">
                  {{ valorAnterior(h) }}
                </td>
                <td style="width: 120px">
                  {{ valorNovo(h) }}
                </td>
                <td style="width: 65px">
                  {{ h.tipoOperacao }}
                </td>
                <td style="width: 80px">
                  {{ h.usuario }}
                </td>
                <td style="width: 160px">
                  {{ h.createdAt }}
                </td>
              </tr>
            </template>
          </template>
        </TableMain>
      </div>
    </div>

    <b-modal
      id="modalFiltros"
      ref="modalFiltros"
      title="Filtros"
      size="md"
      scrollable
    >
      <div class="p-0 m-0" style="height: 30px; width: 465px;">
        <ul
          class="nav nav-tabs card-header-tabs m-0"
          style="font-size: 11px !important; height: 30px;"
        >
          <li class="nav-item">
            <a class="nav-link border active">Perfis</a>
          </li>
        </ul>
      </div>
      <div class="col m-0 p-0 max-content" style="height: 450px !important;">
        <table
          class="table table-sm modal-table table-bordered"
          style="max-height: 450px !important;"
        >
          <thead class="thead-light sticky">
            <tr>
              <div style="font-size: 11px;" class=" max-content">
                <th>
                  <p style="width:25px" class="p-header"></p>
                </th>
                <th>
                  <p class="p-header" style="width: 436px; text-align:start">
                    Tabelas
                  </p>
                </th>
              </div>
            </tr>
          </thead>
          <tbody>
            <tr v-for="o in options" :key="`tabeka${o.value}`">
              <div class="max-content">
                <td>
                  <div style="width:25px;">
                    <input
                      type="checkbox"
                      v-model="TabelasSelecionadas"
                      :value="o.value"
                      class="form-check-input position-static m-0"
                    />
                  </div>
                </td>
                <td>
                  <p style="width:436px; text-align:start;">
                    {{ o.text }}
                  </p>
                </td>
              </div>
            </tr>
          </tbody>
        </table>
      </div>

      <div slot="modal-footer" class="w-100 m-0" style="display: flex;">
        <div class="w-100 d-flex">
          <b-button
            class="btn-azul btn-custom btn-modal"
            variant="success"
            @click="selectAll()"
            >Selecionar Todos</b-button
          >
          <b-button
            class="btn-cinza btn-custom btn-modal"
            variant="secondary"
            @click="selectNone()"
            >Desmarcar Todos</b-button
          >
        </div>
        <b-button
          variant="success"
          @click="btnOK()"
          class="btn-verde btn-custom btn-modal"
          style="padding-right:15px!important; padding-left:15px!important;"
          >OK</b-button
        >
      </div>
    </b-modal>
  </div>
</template>

<script>
import _ from "lodash";
import PageTitle from "@/components/PageTitle";
import TableMain from "@/components/TableMain";

export default {
  name: "DashboardHistory",
  components: {
    PageTitle,
    TableMain,
  },

  data() {
    return {
      options: [
        { text: "CARGA PÓS", value: "CargaPos" },
        { text: "CURSO", value: "Curso" },
        { text: "DISCIPLINA", value: "Disciplina" },
        { text: "DISCIPLINA GRADE", value: "DisciplinaGrade" },
        { text: "DOCENTE", value: "Docente" },
        { text: "DOCENTE PERFIL", value: "DocentePerfil" },
        { text: "GRADE", value: "Grade" },
        { text: "PEDIDO", value: "Pedido" },
        { text: "PEDIDO EXTERNO", value: "PedidoExterno" },
        { text: "PERFIL", value: "Perfil" },
        { text: "SALA", value: "Sala" },
        { text: "TURMA", value: "Turma" },
        { text: "TURMA EXTERNA", value: "TurmaExterna" },
      ],
      TabelasSelecionadas: [],
      TabelasAtivadas: [],
      operacoes: "Todos",
    };
  },
  created() {
    if (!this.Admin) {
      this.$notify({
        group: "second",
        title: "Erro",
        text:
          "Acesso negado! Usuário não possui permissão para acessar esta página!",
        type: "error",
      });
      this.$router.push({ name: "dashboard" });
    }
  },
  methods: {
    btnOK() {
      //Somente atualiza o vetor de perfis ativados quando o botão OK for clickado
      this.TabelasAtivadas = [...this.TabelasSelecionadas];
      this.$refs.modalFiltros.hide();
    },

    selectAll() {
      if (this.TabelasSelecionadas != []) this.TabelasSelecionadas = [];
      for (var i = 0; i < this.options.length; i++)
        this.TabelasSelecionadas.push(this.options[i].value);
    },

    selectNone() {
      this.TabelasSelecionadas = [];
    },

    linhaModificada(h) {
      let linha = h.linhaModificada;
      let aux = undefined;
      switch (h.tabelaModificada) {
        case "CargaPos":
          if (h.tipoOperacao === "Delete") {
            aux = linha.split("/");
            let docente = _.find(this.$store.state.docente.Docentes, {
              id: parseInt(aux[2]),
            });
            if (docente === undefined) {
              linha = `${aux[0]}/${aux[1]}/${aux[2]}`;
            } else {
              linha = `${aux[0]}/${aux[1]}/${docente.apelido}`;
            }
          }
          break;

        case "DisciplinaGrade":
          aux = linha.split("/");
          let disciplina = _.find(this.$store.state.disciplina.Disciplinas, {
            id: parseInt(aux[1]),
          });
          let grade = _.find(this.$store.state.grade.Grades, {
            id: parseInt(aux[2]),
          });
          let curso =
            grade === undefined
              ? undefined
              : _.find(this.$store.state.curso.Cursos, { id: grade.Curso });
          linha = `${
            grade === undefined
              ? aux[2]
              : (curso === undefined ? "Curso Excluído" : curso.codigo) +
                " - " +
                grade.nome
          }/${disciplina === undefined ? aux[1] : disciplina.codigo}/${aux[0]}`;
          break;

        case "DocentePerfil":
          aux = linha.split("/");
          let docente = _.find(this.$store.state.docente.Docentes, {
            id: parseInt(aux[1]),
          });
          let perfil = _.find(this.$store.state.perfil.Perfis, {
            id: parseInt(aux[0]),
          });
          linha = `${docente === undefined ? aux[1] : docente.nome}/${
            perfil === undefined ? aux[0] : perfil.nome
          }`;
          break;

        case "Grade":
          aux = linha.split("/");
          let cursoGrade = _.find(this.$store.state.curso.Cursos, {
            id: parseInt(aux[0]),
          });
          linha = `${cursoGrade === undefined ? aux[0] : cursoGrade.codigo} - ${
            aux[1]
          }`;
          break;

        case "Pedido":
          aux = linha.split("/");
          let turma = _.find(this.$store.state.turma.Turmas, {
            id: parseInt(aux[0]),
          });
          let disciplinaPedido =
            turma === undefined
              ? undefined
              : _.find(this.$store.state.disciplina.Disciplinas, {
                  id: turma.Disciplina,
                });
          let cursoPedido = _.find(this.$store.state.curso.Cursos, {
            id: parseInt(aux[1]),
          });
          linha = `${
            turma === undefined
              ? aux[0]
              : turma.Disciplina === null
              ? "Turma Excluída"
              : disciplinaPedido.codigo + " " + turma.letra
          }/${cursoPedido === undefined ? aux[1] : cursoPedido.codigo}`;
          break;

        case "PedidoExterno":
          aux = linha.split("/");
          let turmaExterna = _.find(this.$store.state.turmaExterna.Turmas, {
            id: parseInt(aux[0]),
          });
          let disciplinaPedidoExterno =
            turmaExterna === undefined
              ? undefined
              : _.find(this.$store.state.disciplina.Disciplinas, {
                  id: turmaExterna.Disciplina,
                });
          let cursoPedidoExterno = _.find(this.$store.state.curso.Cursos, {
            id: parseInt(aux[1]),
          });
          linha = `${
            turmaExterna === undefined
              ? aux[0]
              : disciplinaPedidoExterno.codigo + " " + turmaExterna.letra
          }/${
            cursoPedidoExterno === undefined
              ? aux[1]
              : cursoPedidoExterno.codigo
          }`;
          break;

        case "Turma":
          aux = linha.split("/");
          let disciplinaTurma = _.find(
            this.$store.state.disciplina.Disciplinas,
            { id: parseInt(aux[1]) }
          );
          linha = `${
            disciplinaTurma === undefined ? aux[1] : disciplinaTurma.codigo
          }/${aux[0]}`;
          break;

        case "TurmaExterna":
          aux = linha.split("/");
          let disciplinaTurmaExterna = _.find(
            this.$store.state.disciplina.Disciplinas,
            { id: parseInt(aux[1]) }
          );
          linha = `${
            disciplinaTurmaExterna === undefined
              ? aux[1]
              : disciplinaTurmaExterna.codigo
          }/${aux[0]}`;
          break;
      }
      return linha;
    },

    valorAnterior(h) {
      let v = h.valorAnterior;
      switch (h.campoModificado) {
        case "Curso":
          v = _.find(this.$store.state.curso.Cursos, {
            id: parseInt(h.valorAnterior),
          });
          if (v === undefined) v = h.valorAnterior;
          else v = v.codigo;
          break;

        case "Disciplina":
          v = _.find(this.$store.state.disciplina.Disciplinas, {
            id: parseInt(h.valorAnterior),
          });
          if (v === undefined) v = h.valorAnterior;
          else v = v.codigo;
          break;

        case "Docente":
        case "Docente1":
        case "Docente2":
          v = _.find(this.$store.state.docente.Docentes, {
            id: parseInt(h.valorAnterior),
          });
          if (v === undefined) v = h.valorAnterior;
          else v = v.apelido;
          break;

        case "Grade":
          v = _.find(this.$store.state.grade.Grades, {
            id: parseInt(h.valorAnterior),
          });
          if (v === undefined) v = h.valorAnterior;
          else {
            let c = _.find(this.$store.state.curso.Cursos, {
              id: parseInt(v.Curso),
            });
            v = `${c === undefined ? v.Curso : c.codigo}/${v.nome}`;
          }
          break;

        case "Horario":
        case "Horario1":
        case "Horario2":
          v = _.find(this.$store.state.horario.Horarios, {
            id: parseInt(h.valorAnterior),
          });
          if (v === undefined) v = h.valorAnterior;
          else v = v.horario;
          break;

        case "Perfil":
          v = _.find(this.$store.state.perfil.Perfis, {
            id: parseInt(h.valorAnterior),
          });
          if (v === undefined) v = h.valorAnterior;
          else v = v.nome;
          break;

        case "Sala":
        case "Sala1":
        case "Sala2":
          v = _.find(this.$store.state.sala.Salas, {
            id: parseInt(h.valorAnterior),
          });
          if (v === undefined) v = h.valorAnterior;
          else v = v.nome;
          break;
      }

      return v;
    },

    valorNovo(h) {
      let v = h.valorNovo;
      switch (h.campoModificado) {
        case "Curso":
          v = _.find(this.$store.state.curso.Cursos, {
            id: parseInt(h.valorNovo),
          });
          if (v === undefined) v = h.valorNovo;
          else v = v.codigo;
          break;

        case "Disciplina":
          v = _.find(this.$store.state.disciplina.Disciplinas, {
            id: parseInt(h.valorNovo),
          });
          if (v === undefined) v = h.valorNovo;
          else v = v.codigo;
          break;

        case "Docente":
        case "Docente1":
        case "Docente2":
          v = _.find(this.$store.state.docente.Docentes, {
            id: parseInt(h.valorNovo),
          });
          if (v === undefined) v = h.valorNovo;
          else v = v.apelido;
          break;

        case "Grade":
          v = _.find(this.$store.state.grade.Grades, {
            id: parseInt(h.valorNovo),
          });
          if (v === undefined) v = h.valorNovo;
          else {
            let c = _.find(this.$store.state.curso.Cursos, {
              id: parseInt(v.Curso),
            });
            v = `${c === undefined ? v.Curso : c.codigo}/${v.nome}`;
          }
          break;

        case "Horario":
        case "Horario1":
        case "Horario2":
          v = _.find(this.$store.state.horario.Horarios, {
            id: parseInt(h.valorNovo),
          });
          if (v === undefined) v = h.valorNovo;
          else v = v.horario;
          break;

        case "Perfil":
          v = _.find(this.$store.state.perfil.Perfis, {
            id: parseInt(h.valorNovo),
          });
          if (v === undefined) v = h.valorNovo;
          else v = v.nome;
          break;

        case "Sala":
        case "Sala1":
        case "Sala2":
          v = _.find(this.$store.state.sala.Salas, {
            id: parseInt(h.valorNovo),
          });
          if (v === undefined) v = h.valorNovo;
          else v = v.nome;
          break;
      }

      return v;
    },
  },
  computed: {
    History() {
      let TabelasAtivadas = this.TabelasAtivadas;
      return _.orderBy(
        _.filter(
          _.filter(this.$store.state.history.History, function(
            h,
            i,
            a,
            t = TabelasAtivadas
          ) {
            let v = false;
            t.forEach((o) => {
              if (h.tabelaModificada === o) {
                v = true;
              }
            });
            if (v) {
              return true;
            }
          }),
          this.operacoes === "Todos" ? {} : { tipoOperacao: this.operacoes }
        ),
        ["id"],
        ["desc"]
      );
    },

    Admin() {
      if (this.$store.state.auth.Usuario.admin === 1) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
.modal-table {
  display: block !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  font-size: 10px !important;
  font-weight: normal !important;
  background-color: white;
  margin: 0 !important;
}
.modal-table tr thead {
  display: block;
}
.modal-table th {
  padding: 0 !important;
  text-align: center !important;
  height: 18px !important;
}
.modal-table .p-header {
  padding: 0px 5px 0px 5px !important;
  margin: 0 !important;
  text-align: start;
  height: 18px !important;
}
.modal-table tbody {
  max-height: 100%;
  width: 100%;
}
.modal-table td {
  border-top: 0;
  text-align: center;
  vertical-align: middle !important;
  padding: 0 !important;
  margin: 0 !important;
  /* height: 22px !important; */
}
.modal-table p {
  margin: 0 !important;
  text-align: center;
  padding: 0 !important;
  padding-right: 5px !important;
  padding-left: 5px !important;
}
.modal-table input[type="checkbox"] {
  margin-left: 0 !important;
  margin-top: 4px !important;
  margin-bottom: auto !important;
  height: 13px !important;
}
.input-group-text {
  width: 70px !important;
}
.form-control-top {
  width: 70px !important;
  text-align: center;
}
</style>
