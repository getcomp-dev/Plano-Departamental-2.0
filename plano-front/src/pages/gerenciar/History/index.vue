<template>
  <div class="main-component row">
    <PageHeader :title="'Logs'">
      <BaseButton
        title="Filtros"
        :type="'icon'"
        :color="'gray'"
        @click="toggleAsideModal('filtros')"
      >
        <font-awesome-icon :icon="['fas', 'list-ul']" />
      </BaseButton>
      <BaseButton
        title="Filtros"
        :type="'icon'"
        :color="'lightblue'"
        @click="toggleAsideModal('ajuda')"
      >
        <font-awesome-icon :icon="['fas', 'question']" />
      </BaseButton>
    </PageHeader>

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
          <tr v-for="h in HistoryOrdered" :key="`History${h.id}`">
            <td style="width: 110px">{{ h.tabelaModificada }}</td>
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
            <td style="width: 80px" class="less-padding">{{ h.usuario }}</td>
            <td style="width: 160px" class="less-padding">
              {{ h.createdAt }}
            </td>
          </tr>
          <tr v-show="!HistoryOrdered.length">
            <td style="width:975px">
              <b>Nenhuma operação encontrada.</b> Clique no botão de filtros
              <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" />
              para selecioná-las.
            </td>
          </tr>
        </template>
      </BaseTable>
    </div>

    <ModalFiltros
      ref="modalFiltros"
      :callbacks="modalFiltrosCallbacks"
      :tabsOptions="modalFiltrosTabs"
    >
      <div class="div-table">
        <BaseTable
          v-show="modalFiltrosTabs.current === 'Tabelas'"
          :type="'modal'"
        >
          <template #thead>
            <th style="width:25px"></th>
            <th style="width: 425px" class="t-start">Nome</th>
          </template>
          <template #tbody>
            <tr
              v-for="tabela in TabelasOptions"
              :key="tabela.nome + tabela.id"
              @click="toggleItemInArray(tabela, filtroTabelas.selecionados)"
            >
              <td style="width:25px">
                <input
                  type="checkbox"
                  v-model="filtroTabelas.selecionados"
                  :value="tabela"
                  class="form-check-input position-static m-0"
                />
              </td>
              <td style="width:425px" class="t-start upper-case">
                {{ tabela.nome }}
              </td>
            </tr>
          </template>
        </BaseTable>
        <BaseTable
          v-show="modalFiltrosTabs.current === 'Operações'"
          :type="'modal'"
        >
          <template #thead>
            <th style="width:25px"></th>
            <th style="width: 425px" class="t-start">Nome</th>
          </template>
          <template #tbody>
            <tr
              v-for="operacao in OperacoesOptions"
              :key="operacao.id"
              @click="toggleItemInArray(operacao, filtroOperacoes.selecionados)"
            >
              <td style="width:25px">
                <input
                  type="checkbox"
                  v-model="filtroOperacoes.selecionados"
                  :value="operacao"
                  class="form-check-input position-static m-0"
                />
              </td>
              <td style="width:425px" class="t-start upper-case">
                {{ operacao.nome }}
              </td>
            </tr>
          </template>
        </BaseTable>
      </div>
    </ModalFiltros>

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Visualizar conteúdo:</b>
        Clique no ícone de filtros
        <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" /> no
        cabeçalho da página e, na janela que se abrirá, utilize as abas para
        navegar entre os tipos de filtro disponíveis. Marque quais informações
        deseja visualizar, e para finalizar clique no botão OK.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { toggleItemInArray, toggleAsideModal } from "@/common/mixins";
import { ModalFiltros, ModalAjuda } from "@/components/modals";
import { mapGetters } from "vuex";

export default {
  name: "DashboardHistory",
  mixins: [toggleItemInArray, toggleAsideModal],
  components: {
    ModalFiltros,
    ModalAjuda,
  },
  data() {
    return {
      asideModalsRefs: ["modalFiltros", "modalAjuda"],
      filtroOperacoes: {
        ativados: [],
        selecionados: [],
      },
      filtroTabelas: {
        ativados: [],
        selecionados: [],
      },
      modalFiltrosTabs: {
        current: "Tabelas",
        array: ["Tabelas", "Operações"],
      },
      modalFiltrosCallbacks: {
        selectNone: {
          Tabelas: () => {
            this.filtroTabelas.selecionados = [];
          },
          Operacoes: () => {
            this.filtroOperacoes.selecionados = [];
          },
        },
        selectAll: {
          Tabelas: () => {
            this.filtroTabelas.selecionados = [...this.TabelasOptions];
          },
          Operacoes: () => {
            this.filtroOperacoes.selecionados = [...this.OperacoesOptions];
          },
        },
        btnOk: () => {
          this.filtroTabelas.ativados = [...this.filtroTabelas.selecionados];
          this.filtroOperacoes.ativados = [
            ...this.filtroOperacoes.selecionados,
          ];
        },
      },
    };
  },

  beforeMount() {
    this.modalFiltrosCallbacks.selectAll.Operacoes();
  },

  methods: {
    linhaModificada(h) {
      let linha = h.linhaModificada;
      let aux = undefined;
      switch (h.tabelaModificada) {
        case "CargaPos": {
          if (h.tipoOperacao === "Delete") {
            aux = linha.split("/");
            let docente = this.$_.find(this.$store.state.docente.Docentes, {
              id: parseInt(aux[2]),
            });
            if (docente === undefined) {
              linha = `${aux[0]}/${aux[1]}/${aux[2]}`;
            } else {
              linha = `${aux[0]}/${aux[1]}/${docente.apelido}`;
            }
          }
          break;
        }
        case "DisciplinaGrade": {
          aux = linha.split("/");
          let disciplina = this.$_.find(
            this.$store.state.disciplina.Disciplinas,
            {
              id: parseInt(aux[1]),
            }
          );
          let grade = this.$_.find(this.$store.state.grade.Grades, {
            id: parseInt(aux[2]),
          });
          let curso =
            grade === undefined
              ? undefined
              : this.$_.find(this.$store.state.curso.Cursos, {
                  id: grade.Curso,
                });
          linha = `${
            grade === undefined
              ? aux[2]
              : (curso === undefined ? "Curso Excluído" : curso.codigo) +
                " - " +
                grade.nome
          }/${disciplina === undefined ? aux[1] : disciplina.codigo}/${aux[0]}`;
          break;
        }

        case "DocentePerfil": {
          aux = linha.split("/");
          let docente = this.$_.find(this.$store.state.docente.Docentes, {
            id: parseInt(aux[1]),
          });
          let perfil = this.$_.find(this.$store.state.perfil.Perfis, {
            id: parseInt(aux[0]),
          });
          linha = `${docente === undefined ? aux[1] : docente.nome}/${
            perfil === undefined ? aux[0] : perfil.nome
          }`;
          break;
        }

        case "Grade": {
          aux = linha.split("/");
          let cursoGrade = this.$_.find(this.$store.state.curso.Cursos, {
            id: parseInt(aux[0]),
          });
          linha = `${cursoGrade === undefined ? aux[0] : cursoGrade.codigo} - ${
            aux[1]
          }`;
          break;
        }

        case "Pedido": {
          aux = linha.split("/");
          let turma = this.$_.find(this.$store.state.turma.Turmas, {
            id: parseInt(aux[0]),
          });
          let disciplinaPedido =
            turma === undefined
              ? undefined
              : this.$_.find(this.$store.state.disciplina.Disciplinas, {
                  id: turma.Disciplina,
                });
          let cursoPedido = this.$_.find(this.$store.state.curso.Cursos, {
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
        }

        case "PedidoExterno": {
          aux = linha.split("/");
          let turmaExterna = this.$_.find(
            this.$store.state.turmaExterna.Turmas,
            {
              id: parseInt(aux[0]),
            }
          );
          let disciplinaPedidoExterno =
            turmaExterna === undefined
              ? undefined
              : this.$_.find(this.$store.state.disciplina.Disciplinas, {
                  id: turmaExterna.Disciplina,
                });
          let cursoPedidoExterno = this.$_.find(
            this.$store.state.curso.Cursos,
            {
              id: parseInt(aux[1]),
            }
          );
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
        }

        case "Turma": {
          aux = linha.split("/");
          let disciplinaTurma = this.$_.find(
            this.$store.state.disciplina.Disciplinas,
            { id: parseInt(aux[1]) }
          );
          linha = `${
            disciplinaTurma === undefined ? aux[1] : disciplinaTurma.codigo
          }/${aux[0]}`;
          break;
        }

        case "TurmaExterna": {
          aux = linha.split("/");
          let disciplinaTurmaExterna = this.$_.find(
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
      }
      return linha;
    },
    valorAnterior(h) {
      let v = h.valorAnterior;
      switch (h.campoModificado) {
        case "Curso":
          v = this.$_.find(this.$store.state.curso.Cursos, {
            id: parseInt(h.valorAnterior),
          });
          if (v === undefined) v = h.valorAnterior;
          else v = v.codigo;
          break;

        case "Disciplina":
          v = this.$_.find(this.$store.state.disciplina.Disciplinas, {
            id: parseInt(h.valorAnterior),
          });
          if (v === undefined) v = h.valorAnterior;
          else v = v.codigo;
          break;

        case "Docente":
        case "Docente1":
        case "Docente2":
          v = this.$_.find(this.$store.state.docente.Docentes, {
            id: parseInt(h.valorAnterior),
          });
          if (v === undefined) v = h.valorAnterior;
          else v = v.apelido;
          break;

        case "Grade":
          v = this.$_.find(this.$store.state.grade.Grades, {
            id: parseInt(h.valorAnterior),
          });
          if (v === undefined) v = h.valorAnterior;
          else {
            let c = this.$_.find(this.$store.state.curso.Cursos, {
              id: parseInt(v.Curso),
            });
            v = `${c === undefined ? v.Curso : c.codigo}/${v.nome}`;
          }
          break;

        case "Horario":
        case "Horario1":
        case "Horario2":
          v = this.$_.find(this.$store.state.horario.Horarios, {
            id: parseInt(h.valorAnterior),
          });
          if (v === undefined) v = h.valorAnterior;
          else v = v.horario;
          break;

        case "Perfil":
          v = this.$_.find(this.$store.state.perfil.Perfis, {
            id: parseInt(h.valorAnterior),
          });
          if (v === undefined) v = h.valorAnterior;
          else v = v.nome;
          break;

        case "Sala":
        case "Sala1":
        case "Sala2":
          v = this.$_.find(this.$store.state.sala.Salas, {
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
          v = this.$_.find(this.$store.state.curso.Cursos, {
            id: parseInt(h.valorNovo),
          });
          if (v === undefined) v = h.valorNovo;
          else v = v.codigo;
          break;

        case "Disciplina":
          v = this.$_.find(this.$store.state.disciplina.Disciplinas, {
            id: parseInt(h.valorNovo),
          });
          if (v === undefined) v = h.valorNovo;
          else v = v.codigo;
          break;

        case "Docente":
        case "Docente1":
        case "Docente2":
          v = this.$_.find(this.$store.state.docente.Docentes, {
            id: parseInt(h.valorNovo),
          });
          if (v === undefined) v = h.valorNovo;
          else v = v.apelido;
          break;

        case "Grade":
          v = this.$_.find(this.$store.state.grade.Grades, {
            id: parseInt(h.valorNovo),
          });
          if (v === undefined) v = h.valorNovo;
          else {
            let c = this.$_.find(this.$store.state.curso.Cursos, {
              id: parseInt(v.Curso),
            });
            v = `${c === undefined ? v.Curso : c.codigo}/${v.nome}`;
          }
          break;

        case "Horario":
        case "Horario1":
        case "Horario2":
          v = this.$_.find(this.$store.state.horario.Horarios, {
            id: parseInt(h.valorNovo),
          });
          if (v === undefined) v = h.valorNovo;
          else v = v.horario;
          break;

        case "Perfil":
          v = this.$_.find(this.$store.state.perfil.Perfis, {
            id: parseInt(h.valorNovo),
          });
          if (v === undefined) v = h.valorNovo;
          else v = v.nome;
          break;

        case "Sala":
        case "Sala1":
        case "Sala2":
          v = this.$_.find(this.$store.state.sala.Salas, {
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
    ...mapGetters(["onLoading", "History"]),

    HistoryOrdered() {
      return this.$_.orderBy(this.HistoryFilteredByOperacao, "id", "desc");
    },
    HistoryFilteredByOperacao() {
      return this.$_.filter(this.HistoryFilteredByTabelas, (history) =>
        this.$_.some(this.filtroOperacoes.ativados, [
          "id",
          history.tipoOperacao,
        ])
      );
    },
    HistoryFilteredByTabelas() {
      return this.$_.filter(this.History, (history) =>
        this.$_.some(this.filtroTabelas.ativados, [
          "id",
          history.tabelaModificada,
        ])
      );
    },
    OperacoesOptions() {
      return [
        { nome: "Criação", id: "Create" },
        { nome: "Exclusão", id: "Delete" },
        { nome: "Edição", id: "Edit" },
      ];
    },
    TabelasOptions() {
      return [
        { nome: "CARGA PÓS", id: "CargaPos" },
        { nome: "CURSO", id: "Curso" },
        { nome: "DISCIPLINA", id: "Disciplina" },
        { nome: "DISCIPLINA GRADE", id: "DisciplinaGrade" },
        { nome: "DOCENTE", id: "Docente" },
        { nome: "DOCENTE PERFIL", id: "DocentePerfil" },
        { nome: "GRADE", id: "Grade" },
        { nome: "PEDIDO", id: "Pedido" },
        { nome: "PEDIDO EXTERNO", id: "PedidoExterno" },
        { nome: "PERFIL", id: "Perfil" },
        { nome: "PLANO", id: "Plano" },
        { nome: "SALA", id: "Sala" },
        { nome: "TURMA", id: "Turma" },
        { nome: "TURMA EXTERNA", id: "TurmaExterna" },
      ];
    },
  },
};
</script>
