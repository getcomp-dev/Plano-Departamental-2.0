<template>
  <div class="main-component row">
    <portal to="page-header">
      <BaseButton template="filtros" @click="toggleAsideModal('filtros')" />
      <BaseButton template="ajuda" @click="toggleAsideModal('ajuda')" />
    </portal>

    <div class="div-table">
      <BaseTable>
        <template #thead>
          <v-th width="110">Tabela Modificada</v-th>
          <v-th width="120">Campo Modificado</v-th>
          <v-th width="200">Linha Modificada</v-th>
          <v-th width="120">Valor Anterior</v-th>
          <v-th width="120">Novo Valor</v-th>
          <v-th width="65">Operação</v-th>
          <v-th width="80" title="Usuário que realizou a operação">Usuário</v-th>
          <v-th width="160">Data</v-th>
        </template>
        <template #tbody>
          <tr v-for="history in dadosPaginados" :key="history.id">
            <v-td width="110" class="table-data">{{ history.tabelaModificada }}</v-td>
            <v-td width="120" paddingX="0" class="table-data">
              {{ history.campoModificado }}
            </v-td>
            <v-td width="200" paddingX="0" class="table-data">
              {{ getLinhaModificada(history) }}
            </v-td>
            <v-td width="120" paddingX="0" class="table-data">
              {{ getValorAnterior(history) }}
            </v-td>
            <v-td width="120" paddingX="0" class="table-data">
              {{ getValorNovo(history) }}
            </v-td>
            <v-td width="65" paddingX="0" class="table-data">
              {{ history.tipoOperacao }}
            </v-td>
            <v-td width="80" paddingX="0" class="table-data">
              {{ history.usuario }}
            </v-td>
            <v-td width="160" paddingX="0">
              {{ parseDateUTC(history.createdAt) }}
            </v-td>
          </tr>

          <tr v-if="!HistoryOrdered.length">
            <v-td width="975" colspan="8">
              <b>Nenhuma operação encontrada.</b>
              Clique no botão de filtros
              <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" />
              para selecioná-las.
            </v-td>
          </tr>
        </template>
      </BaseTable>
    </div>

    <ModalFiltros
      ref="modalFiltros"
      :callbacks="modalFiltrosCallbacks"
      :tabsOptions="modalFiltrosTabs"
    >
      <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Tabelas'">
        <template #thead>
          <v-th width="25" />
          <v-th width="425" align="start">Nome</v-th>
        </template>

        <template #tbody>
          <tr
            v-for="tabela in TabelasOptions"
            :key="tabela.id + tabela.nome"
            @click="toggleItemInArray(tabela, filtroTabelas.selecionados)"
            v-prevent-click-selection
          >
            <v-td width="25" type="content">
              <input type="checkbox" v-model="filtroTabelas.selecionados" :value="tabela" />
            </v-td>
            <v-td
              width="425"
              align="start"
              style="font-weight: normal; font-size: 11px; text-transform: capitalize"
            >
              {{ tabela.nome }}
            </v-td>
          </tr>
        </template>
      </BaseTable>
      <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Operações'">
        <template #thead>
          <v-th width="25" />
          <v-th width="425" align="start">Tipo</v-th>
        </template>

        <template #tbody>
          <tr
            v-for="operacao in OperacoesOptions"
            :key="operacao.id + operacao.nome"
            @click="toggleItemInArray(operacao, filtroOperacoes.selecionados)"
            v-prevent-click-selection
          >
            <v-td width="25" type="content">
              <input type="checkbox" v-model="filtroOperacoes.selecionados" :value="operacao" />
            </v-td>
            <v-td
              width="425"
              align="start"
              style="font-weight: normal; font-size: 11px; text-transform: capitalize"
            >
              {{ operacao.nome }}
            </v-td>
          </tr>
        </template>
      </BaseTable>

      <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Data'">
        <template #thead>
          <v-th width="475" align="start">Dias</v-th>
        </template>

        <template #tbody>
          <input
            type="date"
            style="font-family: Arial, Helvetica, sans-serif; font-size: 11px"
            v-model="filtroData.selecionados.begin"
            max="3000-01-01"
            class="Date1"
            onfocus="this.max=new Date().toISOString().split('T')[0]"
          />
          <input
            type="date"
            style="font-family: Arial, Helvetica, sans-serif; font-size: 11px"
            v-model="filtroData.selecionados.end"
            max="3000-01-01"
            class="Date2"
            onfocus="this.max=new Date().toISOString().split('T')[0]"
          />

          <div class="inputs">
            <label
              class="especific_date"
              style="font-size: 11px; text-transform: none; font-weight: lighter; line-height: 17px"
            >
              Datas Específicas
            </label>
            <input
              type="radio"
              style="
                margin-left: 5px;
                margin-top: 5px;
                font-size: 11px;
                font-family: Arial, Helvetica, sans-serif;
              "
              v-model="filtroData.selecionados.begin"
              :value="
                formata_Date(new Date(new Date().setDate(new Date().getDate() - 1)), new Date())
              "
            />
            <span class="checkmark"></span>
            <label
              style="
                padding: 0px 5px;
                font-size: 11px;
                font-family: Arial, Helvetica, sans-serif;
                line-height: 17px;
                font-family: Arial, Helvetica, sans-serif;
                font-weight: normal;
                font-size: 11px;
                text-transform: none;
              "
            >
              Último Dia
            </label>
            <br />

            <input
              type="radio"
              style="margin-left: 5px; margin-top: 5px; font-family: Arial, Helvetica, sans-serif"
              v-model="filtroData.selecionados.begin"
              :value="
                formata_Date(new Date(new Date().setDate(new Date().getDate() - 7)), new Date())
              "
            />
            <span class="checkmark"></span>
            <label
              style="
                padding: 0px 5px;
                font-size: 11px;
                font-family: Arial, Helvetica, sans-serif;
                line-height: 17px;
                font-family: Arial, Helvetica, sans-serif;
                font-weight: normal;
                font-size: 11px;
                text-transform: none;
              "
            >
              Última Semana
            </label>
            <br />

            <input
              type="radio"
              style="margin-left: 5px; margin-top: 5px; font-family: Arial, Helvetica, sans-serif"
              v-model="filtroData.selecionados.begin"
              :value="
                formata_Date(new Date(new Date().setDate(new Date().getDate() - 15)), new Date())
              "
            />
            <span class="checkmark"></span>
            <label
              style="
                padding: 0px 5px;
                font-size: 11px;
                font-family: Arial, Helvetica, sans-serif;
                line-height: 17px;
                font-family: Arial, Helvetica, sans-serif;
                font-weight: normal;
                font-size: 11px;
                text-transform: none;
              "
            >
              Últimos 15 dias
            </label>
          </div>
        </template>
      </BaseTable>
    </ModalFiltros>

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Visualizar conteúdo:</b>
        Clique no ícone de filtros
        <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" />
        no cabeçalho da página e, na janela que se abrirá, utilize as abas para navegar entre os
        tipos de filtro disponíveis. Marque quais informações deseja visualizar, e para finalizar
        clique no botão OK.
      </li>
    </ModalAjuda>

    <nav aria-label="Page navigation example">
      <ul class="pagination" style="margin-right: 800px; font-size: 12px; line-height: 6px">
        <li
          class="page-item"
          v-on:click="getDataPagina(1)"
          style="font-family: Arial, Helvetica, sans-serif"
        >
          <a style="color: #212529" class="page-link" href="#">&lt;&lt;&lt;</a>
        </li>
        <li
          class="page-item"
          v-on:click="getPreviousPage()"
          style="font-family: Arial, Helvetica, sans-serif"
        >
          <a style="color: #212529" class="page-link" href="#">&lt;</a>
        </li>
        <li
          v-if="paginaAtual > 1 && paginaAtual != totalPaginas()"
          v-on:click="getDataPagina(paginaAtual - 1)"
          style="font-family: Arial, Helvetica, sans-serif"
          class="page-item"
        >
          <a class="page-link" href="#" style="color: #212529">{{ paginaAtual - 1 }}</a>
        </li>

        <li
          v-if="paginaAtual == totalPaginas() && paginaAtual != 1"
          v-on:click="getDataPagina(paginaAtual + 1)"
          style="font-family: Arial, Helvetica, sans-serif"
          class="page-item"
        >
          <a class="page-link" href="#" style="color: #212529">{{ paginaAtual - 2 }}</a>
        </li>
        <li
          v-if="paginaAtual == totalPaginas() && paginaAtual != 1"
          v-on:click="getDataPagina(paginaAtual + 2)"
          style="font-family: Arial, Helvetica, sans-serif"
          class="page-item"
        >
          <a class="page-link" href="#" style="color: #212529">{{ paginaAtual - 1 }}</a>
        </li>

        <li
          v-bind:class="isActive(paginaAtual)"
          v-on:click="getDataPagina(paginaAtual)"
          style="font-family: Arial, Helvetica, sans-serif"
          class="page-item"
        >
          <a class="page-link" href="#">{{ paginaAtual }}</a>
        </li>
        <li
          v-if="paginaAtual == 1 && paginaAtual != totalPaginas()"
          v-on:click="getDataPagina(paginaAtual + 1)"
          style="font-family: Arial, Helvetica, sans-serif"
          class="page-item"
        >
          <a class="page-link" href="#" style="color: #212529">{{ paginaAtual + 1 }}</a>
        </li>
        <li
          v-if="paginaAtual == 1 && paginaAtual != totalPaginas()"
          v-on:click="getDataPagina(paginaAtual + 2)"
          style="font-family: Arial, Helvetica, sans-serif"
          class="page-item"
        >
          <a class="page-link" href="#" style="color: #212529">{{ paginaAtual + 2 }}</a>
        </li>

        <li
          v-if="paginaAtual < totalPaginas() && paginaAtual != 1"
          v-on:click="getDataPagina(paginaAtual + 1)"
          style="font-family: Arial, Helvetica, sans-serif"
          class="page-item"
        >
          <a style="color: #212529" class="page-link" href="#">{{ paginaAtual + 1 }}</a>
        </li>

        <li
          class="page-item"
          v-on:click="getNextPage()"
          style="font-family: Arial, Helvetica, sans-serif"
        >
          <a style="color: #212529" class="page-link" href="#">></a>
        </li>
        <li
          class="page-item"
          v-on:click="getDataPagina(totalPaginas())"
          style="font-family: Arial, Helvetica, sans-serif"
        >
          <a style="color: #212529" class="page-link" href="#">>>></a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { some, find, orderBy } from "lodash-es";
import { toggleItemInArray, toggleAsideModal, preventClickSelection } from "@mixins";
import { parseDateUTC } from "@/common/utils";
import { ModalFiltros, ModalAjuda } from "@/components/modals";

export default {
  name: "DashboardHistory",
  components: { ModalFiltros, ModalAjuda },
  mixins: [toggleItemInArray, toggleAsideModal, preventClickSelection],
  data() {
    return {
      dadosPaginados: [],
      elementosPorPagina: 40,
      paginaAtual: 1,
      numero_Pagina: 1,

      asideModalsRefs: ["modalFiltros", "modalAjuda"],
      filtroOperacoes: {
        ativados: [],
        selecionados: [],
      },
      filtroTabelas: {
        ativados: [],
        selecionados: [],
      },
      filtroData: {
        ativados: {
          begin: new Date(),
          end: new Date(),
        },
        selecionados: {
          begin: new Date(),
          end: new Date(),
        },
      },
      modalFiltrosTabs: {
        current: "Tabelas",
        array: ["Tabelas", "Operações", "Data"],
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
          this.filtroOperacoes.ativados = [...this.filtroOperacoes.selecionados];
          this.filtroData.ativados = { ...this.filtroData.selecionados };
          this.getDataPagina(1);
        },
      },
    };
  },

  beforeMount() {
    this.fetchAllHistory();
    this.modalFiltrosCallbacks.selectAll.Operacoes();
  },

  beforeDestroy() {
    this.clearHistoryState();
  },

  methods: {
    ...mapActions(["fetchAllHistory", "clearHistoryState"]),
    parseDateUTC,

    totalPaginas() {
      return Math.ceil(this.HistoryOrdered.length / this.elementosPorPagina);
    },
    getDataPagina(numero_Pagina) {
      this.paginaAtual = numero_Pagina;
      this.dadosPaginados = [];
      let inicio = numero_Pagina * this.elementosPorPagina - this.elementosPorPagina;
      let fim = numero_Pagina * this.elementosPorPagina;
      this.dadosPaginados = this.HistoryOrdered.slice(inicio, fim);
    },
    getPreviousPage() {
      if (this.paginaAtual > 1) {
        this.paginaAtual--;
      }
      this.getDataPagina(this.paginaAtual);
    },
    getNextPage() {
      if (this.paginaAtual < this.totalPaginas()) {
        this.paginaAtual++;
      }
      this.getDataPagina(this.paginaAtual);
    },

    getLastPage() {
      if (this.paginaAtual == this.totalPaginas()) {
        return this.totalPaginas();
      }
    },
    getFirstPage() {
      if (this.paginaAtual == 1) {
        return 1;
      }
    },
    isActive(numero_Pagina) {
      if (numero_Pagina == this.paginaAtual) {
        return "active";
      } else {
        return "";
      }
    },

    formata_Date(begin, end) {
      if (end.getDate() < 10 && end.getMonth() < 10) {
        this.filtroData.selecionados.end = `${end.getFullYear()}-0${new Date(
          end.setMonth(end.getMonth() + 1)
        ).getMonth()}-0${end.getDate()}`;
      } else if (end.getDate() < 10) {
        this.filtroData.selecionados.end = `${end.getFullYear()}-${new Date(
          end.setMonth(end.getMonth() + 1)
        ).getMonth()}-0${end.getDate()}`;
      } else if (end.getMonth() < 10) {
        this.filtroData.selecionados.end = `${end.getFullYear()}-0${new Date(
          end.setMonth(end.getMonth() + 1)
        ).getMonth()}-${end.getDate()}`;
      }
      if (begin.getDate() < 10 && begin.getMonth() < 10) {
        return `${begin.getFullYear()}-0${new Date(
          begin.setMonth(begin.getMonth() + 1)
        ).getMonth()}-0${begin.getDate()}`;
      } else if (begin.getDate() < 10) {
        return `${begin.getFullYear()}-${Date(
          begin.setMonth(begin.getMonth() + 1)
        ).getMonth()}-0${begin.getDate()}`;
      } else if (begin.getMonth() < 10) {
        return `${begin.getFullYear()}-0${new Date(
          begin.setMonth(begin.getMonth() + 1)
        ).getMonth()}-${begin.getDate()}`;
      }
    },

    getLinhaModificada(h) {
      let linha = h.linhaModificada;
      let aux = undefined;
      switch (h.tabelaModificada) {
      case "CargaPos": {
        if (h.tipoOperacao === "Delete") {
          aux = linha.split("/");
          let docente = find(this.$store.state.docente.Docentes, {
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
        let disciplina = find(this.$store.state.disciplina.Disciplinas, {
          id: parseInt(aux[1]),
        });
        let grade = find(this.$store.state.grade.Grades, {
          id: parseInt(aux[2]),
        });
        let curso =
            grade === undefined
              ? undefined
              : find(this.$store.state.curso.Cursos, {
                id: grade.Curso,
              });
        linha = `${
          grade === undefined
            ? aux[2]
            : (curso === undefined ? "Curso Excluído" : curso.codigo) + " - " + grade.nome
        }/${disciplina === undefined ? aux[1] : disciplina.codigo}/${aux[0]}`;
        break;
      }

      case "DocentePerfil": {
        aux = linha.split("/");
        let docente = find(this.$store.state.docente.Docentes, {
          id: parseInt(aux[1]),
        });
        let perfil = find(this.$store.state.perfil.Perfis, {
          id: parseInt(aux[0]),
        });
        linha = `${docente === undefined ? aux[1] : docente.nome}/${
          perfil === undefined ? aux[0] : perfil.nome
        }`;
        break;
      }

      case "Grade": {
        aux = linha.split("/");
        let cursoGrade = find(this.$store.state.curso.Cursos, {
          id: parseInt(aux[0]),
        });
        linha = `${cursoGrade === undefined ? aux[0] : cursoGrade.codigo} - ${aux[1]}`;
        break;
      }

      case "Pedido": {
        aux = linha.split("/");
        let turma = find(this.$store.state.turma.Turmas, {
          id: parseInt(aux[0]),
        });
        let disciplinaPedido =
            turma === undefined
              ? undefined
              : find(this.$store.state.disciplina.Disciplinas, {
                id: turma.Disciplina,
              });
        let cursoPedido = find(this.$store.state.curso.Cursos, {
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
        let turmaExterna = find(this.$store.state.turmaExterna.Turmas, {
          id: parseInt(aux[0]),
        });
        let disciplinaPedidoExterno =
            turmaExterna === undefined
              ? undefined
              : find(this.$store.state.disciplina.Disciplinas, {
                id: turmaExterna.Disciplina,
              });
        let cursoPedidoExterno = find(this.$store.state.curso.Cursos, {
          id: parseInt(aux[1]),
        });
        linha = `${
          turmaExterna === undefined
            ? aux[0]
            : disciplinaPedidoExterno.codigo + " " + turmaExterna.letra
        }/${cursoPedidoExterno === undefined ? aux[1] : cursoPedidoExterno.codigo}`;
        break;
      }

      case "Turma": {
        aux = linha.split("/");
        let disciplinaTurma = find(this.$store.state.disciplina.Disciplinas, {
          id: parseInt(aux[1]),
        });
        linha = `${disciplinaTurma === undefined ? aux[1] : disciplinaTurma.codigo}/${aux[0]}`;
        break;
      }

      case "TurmaExterna": {
        aux = linha.split("/");
        let disciplinaTurmaExterna = find(this.$store.state.disciplina.Disciplinas, {
          id: parseInt(aux[1]),
        });
        linha = `${
          disciplinaTurmaExterna === undefined ? aux[1] : disciplinaTurmaExterna.codigo
        }/${aux[0]}`;
        break;
      }
      }
      return linha;
    },
    getValorAnterior(h) {
      let v = h.valorAnterior;
      switch (h.campoModificado) {
      case "Curso":
        v = find(this.$store.state.curso.Cursos, {
          id: parseInt(h.valorAnterior),
        });
        if (v === undefined) v = h.valorAnterior;
        else v = v.codigo;
        break;

      case "Disciplina":
        v = find(this.$store.state.disciplina.Disciplinas, {
          id: parseInt(h.valorAnterior),
        });
        if (v === undefined) v = h.valorAnterior;
        else v = v.codigo;
        break;

      case "Docente":
      case "Docente1":
      case "Docente2":
        v = find(this.$store.state.docente.Docentes, {
          id: parseInt(h.valorAnterior),
        });
        if (v === undefined) v = h.valorAnterior;
        else v = v.apelido;
        break;

      case "Grade":
        v = find(this.$store.state.grade.Grades, {
          id: parseInt(h.valorAnterior),
        });
        if (v === undefined) v = h.valorAnterior;
        else {
          let c = find(this.$store.state.curso.Cursos, {
            id: parseInt(v.Curso),
          });
          v = `${c === undefined ? v.Curso : c.codigo}/${v.nome}`;
        }
        break;

      case "Horario":
      case "Horario1":
      case "Horario2":
        v = find(this.$store.state.horario.Horarios, {
          id: parseInt(h.valorAnterior),
        });
        if (v === undefined) v = h.valorAnterior;
        else v = v.horario;
        break;

      case "Perfil":
        v = find(this.$store.state.perfil.Perfis, {
          id: parseInt(h.valorAnterior),
        });
        if (v === undefined) v = h.valorAnterior;
        else v = v.nome;
        break;

      case "Sala":
      case "Sala1":
      case "Sala2":
        v = find(this.$store.state.sala.Salas, {
          id: parseInt(h.valorAnterior),
        });
        if (v === undefined) v = h.valorAnterior;
        else v = v.nome;
        break;
      }

      return v;
    },
    getValorNovo(h) {
      let v = h.valorNovo;
      switch (h.campoModificado) {
      case "Curso":
        v = find(this.$store.state.curso.Cursos, {
          id: parseInt(h.valorNovo),
        });
        if (v === undefined) v = h.valorNovo;
        else v = v.codigo;
        break;

      case "Disciplina":
        v = find(this.$store.state.disciplina.Disciplinas, {
          id: parseInt(h.valorNovo),
        });
        if (v === undefined) v = h.valorNovo;
        else v = v.codigo;
        break;

      case "Docente":
      case "Docente1":
      case "Docente2":
        v = find(this.$store.state.docente.Docentes, {
          id: parseInt(h.valorNovo),
        });
        if (v === undefined) v = h.valorNovo;
        else v = v.apelido;
        break;

      case "Grade":
        v = find(this.$store.state.grade.Grades, {
          id: parseInt(h.valorNovo),
        });
        if (v === undefined) v = h.valorNovo;
        else {
          let c = find(this.$store.state.curso.Cursos, {
            id: parseInt(v.Curso),
          });
          v = `${c === undefined ? v.Curso : c.codigo}/${v.nome}`;
        }
        break;

      case "Horario":
      case "Horario1":
      case "Horario2":
        v = find(this.$store.state.horario.Horarios, {
          id: parseInt(h.valorNovo),
        });
        if (v === undefined) v = h.valorNovo;
        else v = v.horario;
        break;

      case "Perfil":
        v = find(this.$store.state.perfil.Perfis, {
          id: parseInt(h.valorNovo),
        });
        if (v === undefined) v = h.valorNovo;
        else v = v.nome;
        break;

      case "Sala":
      case "Sala1":
      case "Sala2":
        v = find(this.$store.state.sala.Salas, {
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
      return orderBy(this.FiltraData, "id", "desc");
    },
    HistoryFiltered() {
      const filterByOperacao = (history) => {
        return some(this.filtroOperacoes.ativados, ["id", history.tipoOperacao]);
      };
      const filterByOTabela = (history) => {
        return some(this.filtroTabelas.ativados, ["id", history.tabelaModificada]);
      };

      return this.History.filter(filterByOTabela).filter(filterByOperacao);
    },
    FiltraData() {
      return this.HistoryFiltered.filter(
        (log) =>
          log.createdAt <= this.filtroData.ativados.end &&
          log.createdAt >= this.filtroData.ativados.begin
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
        { nome: "Carga Pós", id: "CargaPos" },
        { nome: "Curso", id: "Curso" },
        { nome: "Disciplina", id: "Disciplina" },
        { nome: "Disciplina Grade", id: "DisciplinaGrade" },
        { nome: "Docente", id: "Docente" },
        { nome: "Docente Perfil", id: "DocentePerfil" },
        { nome: "Grade", id: "Grade" },
        { nome: "Pedido", id: "Pedido" },
        { nome: "Pedido Externo", id: "PedidoExterno" },
        { nome: "Perfil", id: "Perfil" },
        { nome: "Plano", id: "Plano" },
        { nome: "Sala", id: "Sala" },
        { nome: "Turma", id: "Turma" },
        { nome: "Turma Externa", id: "TurmaExterna" },
      ];
    },
  },
};
</script>

<style scoped lang="scss">
.especific_date {
  text-align: center;
  padding: 0px;
  width: 475px;
  height: 18px;

  max-width: 475px;
  vertical-align: middle;
  font-weight: lighter;

  font-size: 11px;

  word-wrap: break-word;
  height: 18px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: #ec6b6f;
  border-color: #af1e23 !important;

  border-bottom-width: 2px;

  color: white;

  margin: 0 !important;
  border: 1px solid #dee2e6;

  box-sizing: border-box;

  border-collapse: collapse;

  font-family: Arial, Helvetica, sans-serif;
}

.Date1 {
  background-color: white;
  padding: 10px;
  width: 237px;
  font-family: "Roboto Mono", monospace;
  color: black;
  font-size: 18px;
  border: none;
  outline: none;
  border-right: 1px solid black;
}

.Date2 {
  background-color: white;
  padding: 10px;
  width: 200px;
  font-family: "Roboto Mono", monospace;
  color: black;
  font-size: 18px;
  border: none;
  outline: none;
}

::-webkit-calendar-picker-indicator {
  background-color: #ffffff;
  padding: 5px;
  cursor: pointer;
  border-radius: 3px;
}

.highlighted {
  background-color: yellow;
}
.inputs {
  margin-top: -5px;
}
</style>
