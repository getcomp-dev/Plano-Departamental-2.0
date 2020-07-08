<template>
  <div v-if="Admin" class="main-component row">
    <PageTitle :title="'Logs'">
      <template #aside>
        <div class="input-group d-flex align-items-center mx-2 p-0">
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

        <BaseButton
          title="Filtros"
          :type="'icon'"
          :color="'gray'"
          @click="$refs.modalFiltros.toggle()"
        >
          <i class="fas fa-list-ul"></i>
        </BaseButton>
      </template>
    </PageTitle>

    <div class="row w-100 m-0 p-0">
      <div class="div-table">
        <BaseTable>
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
            <template v-if="!$root.onLoad">
              <tr v-for="h in History" :key="`History${h.id}`">
                <td style="width: 110px">
                  {{ h.tabelaModificada }}
                </td>
                <td style="width: 120px" class="less-padding">
                  {{ h.campoModificado }}
                </td>
                <td style="width: 200px" class="less-padding">
                  {{ linhaModificada(h) }}
                </td>
                <td style="width: 120px" class="less-padding">
                  {{ valorAnterior(h) }}
                </td>
                <td style="width: 120px" class="less-padding">
                  {{ valorNovo(h) }}
                </td>
                <td style="width: 65px" class="less-padding">
                  {{ h.tipoOperacao }}
                </td>
                <td style="width: 80px" class="less-padding">
                  {{ h.usuario }}
                </td>
                <td style="width: 160px" class="less-padding">
                  {{ h.createdAt }}
                </td>
              </tr>
            </template>
          </template>
        </BaseTable>
      </div>
    </div>
    <!-- ModalFiltros -->
    <BaseModal
      ref="modalFiltros"
      :modalOptions="{
        type: 'filtros',
        title: 'Filtros',
        hasFooter: true,
      }"
      :hasFooter="true"
      @btn-ok="btnOkFiltros()"
      @select-all="modalSelectAll[tabAtivaModal]"
      @select-none="modalSelectNone[tabAtivaModal]"
    >
      <template #modal-body>
        <NavTab :currentTab="'Tabelas'" :allTabs="['Tabelas']" />

        <div class="div-table">
          <BaseTable v-show="tabAtivaModal === 'Tabelas'" :type="'modal'">
            <template #thead>
              <th style="width:25px"></th>
              <th style="width: 425px">
                Nome
              </th>
            </template>
            <template #tbody>
              <tr
                v-for="option in Options"
                :key="`MdTabelas${option.value}`"
                @click="toggleItemInArray(option.value, TabelasSelecionadas)"
              >
                <div class="max-content">
                  <td style="width:25px">
                    <input
                      type="checkbox"
                      v-model="TabelasSelecionadas"
                      :value="option.value"
                      class="form-check-input position-static m-0"
                    />
                  </td>
                  <td style="width:425px" class="t-start">
                    {{ option.text }}
                  </td>
                </div>
              </tr>
            </template>
          </BaseTable>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script>
import _ from "lodash";
import { redirectNotAdmin, toggleItemInArray } from "@/mixins/index.js";
import {
  PageTitle,
  NavTab,
  BaseTable,
  BaseButton,
  BaseModal,
} from "@/components/index.js";

export default {
  name: "DashboardHistory",
  mixins: [redirectNotAdmin, toggleItemInArray],
  components: {
    BaseModal,
    PageTitle,
    BaseTable,
    NavTab,
    BaseButton,
  },
  data() {
    return {
      tabAtivaModal: "Tabelas",
      TabelasSelecionadas: [],
      TabelasAtivadas: [],
      operacoes: "Todos",
      modalSelectAll: {
        Tabelas: () => {
          this.TabelasSelecionadas = [..._.map(this.Options, "value")];
        },
      },
      modalSelectNone: {
        Tabelas: () => {
          this.TabelasSelecionadas = [];
        },
      },
      Options: [
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
        { text: "PLANO", value: "Plano" },
        { text: "SALA", value: "Sala" },
        { text: "TURMA", value: "Turma" },
        { text: "TURMA EXTERNA", value: "TurmaExterna" },
      ],
    };
  },

  methods: {
    btnOkFiltros() {
      this.$root.onLoad = true;
      this.TabelasAtivadas = [...this.TabelasSelecionadas];

      this.$nextTick(() => {
        setTimeout(() => {
          this.$root.onLoad = false;
        }, 500);
      });
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
      return this.$store.state.auth.Usuario.admin === 1;
    },
  },
};
</script>

<style scoped>
.input-group-text {
  width: 70px !important;
}
.form-control-top {
  width: 70px !important;
  text-align: center;
}
</style>
