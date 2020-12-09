<template>
  <div class="main-component row">
    <portal to="page-header">
      <BaseButton template="filtros" @click="toggleAsideModal('filtros')" />
      <BaseButton template="ajuda" @click="toggleAsideModal('ajuda')" />
    </portal>

    <div class="div-table">
      <BaseTable>
        <template #thead>
          <v-th-ordination
            :orderFixed="true"
            :currentOrder="ordenacaoMain.planos"
            orderToCheck="plano.ano"
            width="120"
            align="start"
            title="Ano/nome"
          >
            Plano
          </v-th-ordination>
          <v-th width="30" title="Período letivo">P.</v-th>
          <v-th-ordination
            :orderFixed="true"
            :currentOrder="ordenacaoMain.perfis"
            orderToCheck="disciplina.perfil.abreviacao"
            width="80"
          >
            Perfil
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoMain.turmas"
            orderToCheck="disciplina.codigo"
            width="80"
          >
            Código
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoMain.turmas"
            orderToCheck="disciplina.nome"
            width="330"
            align="start"
          >
            Disciplina
          </v-th-ordination>
          <v-th width="35" title="Turma">T.</v-th>
          <v-th width="200" align="start">Docente</v-th>
          <v-th width="80">Turno</v-th>
          <v-th width="120" align="start">Horário</v-th>
          <v-th width="100" align="start">Sala</v-th>
        </template>

        <template #tbody>
          <tr v-for="turma in TurmasRetornadasOrdered" :key="turma.id + turma.letra">
            <v-td
              width="120"
              align="start"
              :title="turma.plano.ano + '-' + turma.plano.nome"
            >
              <template v-if="turma.plano.ano">
                {{ turma.plano.ano }} {{ turma.plano.nome }}
              </template>
              <template v-else>
                -
              </template>
            </v-td>
            <v-td width="30">{{ turma.periodo }}</v-td>
            <v-td
              width="80"
              paddinX="0"
              :style="{ backgroundColor: turma.disciplina.perfil.cor }"
            >
              {{ turma.disciplina.perfil.abreviacao }}
            </v-td>
            <v-td width="80">{{ turma.disciplina.codigo }}</v-td>
            <v-td width="330" align="start">{{ turma.disciplina.nome }}</v-td>
            <v-td width="35" paddinX="0">{{ turma.letra }}</v-td>
            <v-td width="200" align="start">
              {{ generateDocentesText(turma.Docente1, turma.Docente2) }}
            </v-td>
            <v-td width="80">{{ turma.turno1 }}</v-td>
            <v-td width="120" align="start">
              {{ generateHorariosText(turma.Horario1, turma.Horario2) }}
            </v-td>
            <v-td
              width="100"
              align="start"
              :title="generateSalasText(turma.Sala1, turma.Sala2)"
            >
              {{ generateSalasText(turma.Sala1, turma.Sala2) }}
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
      <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Perfis'">
        <template #thead>
          <v-th width="25" />
          <v-th-ordination
            :currentOrder="ordenacaoModal.perfis"
            orderToCheck="nome"
            width="425"
            align="start"
            text="Nome"
          />
        </template>

        <template #tbody>
          <tr
            v-for="perfil in PerfisOptionsOrdered"
            :key="perfil.id + perfil.nome"
            @click="selectPerfis(perfil)"
            v-prevent-click-selection
          >
            <v-td width="25" type="content">
              <input
                type="checkbox"
                v-model="filtroPerfis.selecionados"
                :value="perfil"
                :indeterminate.prop="perfil.halfChecked"
                @click.stop="selectPerfis(perfil)"
              />
            </v-td>
            <v-td width="425" align="start">{{ perfil.nome }}</v-td>
          </tr>

          <tr v-if="!PerfisOptionsOrdered.length">
            <v-td colspan="3" width="450">
              Nenhum perfil encontrado
            </v-td>
          </tr>
        </template>
      </BaseTable>

      <BaseTable
        type="modal"
        v-show="modalFiltrosTabs.current === 'Disciplinas'"
        :hasSearchBar="true"
      >
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
            width="70"
            align="start"
            text="Código"
          />

          <v-th-ordination
            :currentOrder="ordenacaoModal.disciplinas"
            orderToCheck="nome"
            width="270"
            align="start"
            text="Nome"
          />

          <v-th-ordination
            :currentOrder="ordenacaoModal.disciplinas"
            orderToCheck="perfil.abreviacao"
            width="85"
            align="start"
            text="Perfil"
          />
        </template>

        <template #tbody>
          <tr
            v-for="disciplina in DisciplinasOptionsOrdered"
            :key="disciplina.id + disciplina.nome"
            @click="selectDisciplina(disciplina)"
            v-prevent-click-selection
          >
            <v-td width="25" type="content">
              <input
                type="checkbox"
                v-model="filtroDisciplinas.selecionados"
                :value="disciplina"
                @click.stop="selectDisciplina(disciplina)"
              />
            </v-td>
            <v-td width="70" align="start">{{ disciplina.codigo }}</v-td>
            <v-td align="start" width="270" :title="disciplina.nome">
              {{ disciplina.nome }}
            </v-td>
            <v-td width="85" align="start">{{ disciplina.perfil.abreviacao }}</v-td>
          </tr>
          <tr v-if="!DisciplinasOptionsOrdered.length">
            <v-td colspan="3" width="450">
              NENHUMA DISCIPLINA ENCONTRADA.
            </v-td>
          </tr>
        </template>
      </BaseTable>

      <BaseTable
        type="modal"
        v-show="modalFiltrosTabs.current === 'Docentes'"
        :hasSearchBar="true"
      >
        <template #thead-search>
          <InputSearch
            v-model="searchDocentesModal"
            placeholder="Pesquise nome ou apelido de um docente..."
          />
        </template>
        <template #thead>
          <v-th width="25" />
          <v-th-ordination
            :currentOrder="ordenacaoModal.docentes"
            orderToCheck="apelido"
            width="120"
            align="start"
          >
            Apelido
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoModal.docentes"
            orderToCheck="nome"
            width="305"
            align="start"
          >
            Nome
          </v-th-ordination>
        </template>

        <template #tbody>
          <tr
            v-for="docente in DocentesOptionsOrdered"
            :key="docente.id + docente.nome"
            @click="toggleSearchCodition('Docentes', docente.id)"
            v-prevent-click-selection
          >
            <v-td width="25" type="content">
              <input
                type="checkbox"
                v-model="searchConditions.Docentes"
                :value="docente.id"
              />
            </v-td>
            <v-td width="120" align="start">{{ docente.apelido }}</v-td>
            <v-td width="305" align="start">{{ docente.nome }}</v-td>
          </tr>

          <tr v-if="!DocentesOptionsOrdered.length">
            <v-td colspan="3" width="450">NENHUM DOCENTE ENCONTRADO.</v-td>
          </tr>
        </template>
      </BaseTable>

      <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Períodos'">
        <template #thead>
          <v-th width="25" />
          <v-th width="425" align="start">Periodos Letivo</v-th>
        </template>

        <template #tbody>
          <tr
            v-for="periodo in PeriodosOptions"
            :key="periodo.id + periodo.nome"
            @click="selecionaPeriodo(periodo, filtroPeriodos.selecionados)"
            v-prevent-click-selection
          >
            <v-td width="25" type="content">
              <input
                type="checkbox"
                v-model="filtroPeriodos.selecionados"
                :value="periodo"
                @click.stop="selecionaPeriodo(periodo)"
              />
            </v-td>
            <v-td width="425" align="start">{{ periodo.nome }}</v-td>
          </tr>
        </template>
      </BaseTable>

      <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Semestres'">
        <template #thead>
          <v-th width="25" />
          <v-th width="425" align="start">Semestre Letivo</v-th>
        </template>

        <template #tbody>
          <tr
            v-for="semestre in SemestresOptions"
            :key="semestre.id + semestre.nome"
            @click="selecionaSemestre(semestre)"
            v-prevent-click-selection
          >
            <v-td width="25" type="content">
              <input
                type="checkbox"
                v-model="filtroSemestres.selecionados"
                :value="semestre"
                :indeterminate.prop="semestre.halfChecked"
                @click.stop="selecionaSemestre(semestre)"
              />
            </v-td>
            <v-td width="425" align="start">{{ semestre.nome }}</v-td>
          </tr>
        </template>
      </BaseTable>

      <BaseTable
        type="modal"
        v-show="modalFiltrosTabs.current === 'Horários'"
        :hasSearchBar="true"
      >
        <template #thead-search>
          <InputSearch
            v-model="searchHorariosModal"
            placeholder="Pesquise um horário..."
          />
        </template>
        <template #thead>
          <v-th width="25" />
          <v-th width="425" align="start">Horário</v-th>
        </template>

        <template #tbody>
          <tr
            v-for="horario in HorariosOptionsFiltered"
            :key="horario.id + horario.horario"
            @click="toggleSearchCodition('Horarios', horario.id)"
            v-prevent-click-selection
          >
            <v-td width="25" type="content">
              <input
                type="checkbox"
                v-model="searchConditions.Horarios"
                :value="horario.id"
              />
            </v-td>
            <v-td width="425" align="start">{{ horario.horario }}</v-td>
          </tr>

          <tr v-if="!HorariosOptionsFiltered.length">
            <v-td colspan="2" width="450">NENHUM HORÁRIO ENCONTRADO.</v-td>
          </tr>
        </template>
      </BaseTable>

      <BaseTable
        type="modal"
        v-show="modalFiltrosTabs.current === 'Salas'"
        :hasSearchBar="true"
      >
        <template #thead-search>
          <InputSearch v-model="searchSalasModal" placeholder="Pesquise uma sala..." />
        </template>
        <template #thead>
          <v-th width="25" />
          <v-th width="425" align="start">Nome</v-th>
        </template>

        <template #tbody>
          <tr
            v-for="sala in SalasOptionsFiltered"
            :key="sala.id + sala.nome"
            @click="toggleSearchCodition('Salas', sala.id)"
            v-prevent-click-selection
          >
            <v-td width="25" type="content">
              <input type="checkbox" v-model="searchConditions.Salas" :value="sala.id" />
            </v-td>
            <v-td width="425" align="start">{{ sala.nome }}</v-td>
          </tr>

          <tr v-if="!SalasOptionsFiltered.length">
            <v-td colspan="2" width="450">NENHUMA SALA ENCONTRADA.</v-td>
          </tr>
        </template>
      </BaseTable>

      <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Planos'">
        <template #thead>
          <v-th width="25" />
          <v-th width="70" align="start">Ano</v-th>
          <v-th width="355" align="start">Nome</v-th>
        </template>

        <template #tbody>
          <tr
            v-for="plano in AllPlanos"
            :key="plano.id + plano.ano + plano.nome"
            @click="toggleSearchCodition('Planos', plano.id)"
            v-prevent-click-selection
          >
            <v-td width="25" type="content">
              <input
                type="checkbox"
                v-model="searchConditions.Planos"
                :value="plano.id"
              />
            </v-td>
            <v-td width="70" align="start">{{ plano.ano }}</v-td>
            <v-td width="355" align="start">{{ plano.nome }}</v-td>
          </tr>

          <tr v-if="!AllPlanos.length">
            <v-td colspan="3" width="450">NENHUM PLANO ENCONTRADO.</v-td>
          </tr>
        </template>
      </BaseTable>
    </ModalFiltros>

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Visualizar conteúdo:</b>
        Clique no ícone de filtros
        <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" />
        no cabeçalho da página e, na janela que se abrirá, utilize as abas para navegar
        entre os tipos de filtro disponíveis. Marque quais informações deseja visualizar,
        e para finalizar clique no botão OK.
      </li>
      <li class="list-group-item">
        <b>Ordenar:</b>
        Clique no cabeçalho da tabela, na coluna desejada, para alterar a ordenação das
        informações. Note que existem colunas com o icone
        <font-awesome-icon :icon="['fas', 'thumbtack']" class="icon-darkgray" />
        que significa que esta ordenação terá pripridade em relação as outras.
      </li>
      <li class="list-group-item">
        <b>Observações:</b>
        Note que caso um dos filtros não possua nenhum campo selecionado a busca
        acontecerá como se todas opções daquele filtro estivesse selecionadas. Ou seja
        marque apenas os filtros necessários, não é preciso marcar todos os restante.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { union, difference, find, filter, orderBy } from "lodash-es";
import turmaService from "@/common/services/turma";
import { normalizeText, generateEmptyTurma } from "@/common/utils";
import {
  toggleAsideModal,
  preventClickSelection,
  generateDocentesText,
  generateHorariosText,
  generateSalasText,
  conectaFiltroPerfisEDisciplinas,
  conectaFiltrosSemestresEPeriodos,
} from "@/common/mixins";
import { InputSearch } from "@/components/ui";
import { ModalFiltros, ModalAjuda } from "@/components/modals";

export default {
  name: "BuscarTurmas",
  mixins: [
    toggleAsideModal,
    preventClickSelection,
    generateDocentesText,
    generateHorariosText,
    generateSalasText,
    conectaFiltroPerfisEDisciplinas,
    conectaFiltrosSemestresEPeriodos,
  ],
  components: {
    ModalAjuda,
    ModalFiltros,
    InputSearch,
  },
  data() {
    return {
      asideModalsRefs: ["modalFiltros", "modalAjuda"],
      turmaClicked: generateEmptyTurma(),
      searchDocentesModal: "",
      searchDisciplinasModal: "",
      searchHorariosModal: "",
      searchSalasModal: "",
      searchConditions: {
        Planos: [],
        Disciplinas: [],
        Docentes: [],
        Horarios: [],
        Salas: [],
        Periodos: [],
      },
      filtroPerfis: {
        selecionados: [],
      },
      filtroDisciplinas: {
        selecionados: [],
      },
      filtroPeriodos: {
        selecionados: [],
      },
      filtroSemestres: {
        selecionados: [],
      },
      modalFiltrosTabs: {
        current: "Perfis",
        array: [
          "Perfis",
          "Disciplinas",
          "Docentes",
          "Períodos",
          "Semestres",
          "Horários",
          "Salas",
          "Planos",
        ],
        withScroll: true,
      },
      modalFiltrosCallbacks: {
        selectAll: {
          Perfis: () => {
            this.filtroDisciplinas.selecionados = [...this.DisciplinasOptions];
            this.filtroPerfis.selecionados = [...this.PerfisOptions];
          },
          Disciplinas: () => {
            this.filtroDisciplinas.selecionados = union(
              this.DisciplinasOptionsFiltered,
              this.filtroDisciplinas.selecionados
            );
            this.conectaDisciplinasEmPerfis();
          },
          Docentes: () => {
            this.searchConditions.Docentes = union(
              this.searchConditions.Docentes,
              this.DocentesFiltredModal.map((docente) => docente.id)
            );
          },
          Horarios: () => {
            this.searchConditions.Horarios = union(
              this.searchConditions.Horarios,
              this.HorariosOptionsFiltered.map((horario) => horario.id)
            );
          },
          Salas: () => {
            this.searchConditions.Salas = union(
              this.searchConditions.Salas,
              this.SalasOptionsFiltered.map((sala) => sala.id)
            );
          },
          Planos: () => {
            this.searchConditions.Planos = this.AllPlanos.map((plano) => plano.id);
          },
          Periodos: () => {
            this.filtroPeriodos.selecionados = [...this.PeriodosOptions];
            this.filtroSemestres.selecionados = [...this.SemestresOptions];
          },
          Semestres: () => {
            this.filtroSemestres.selecionados = [...this.SemestresOptions];
            this.filtroPeriodos.selecionados = [...this.PeriodosOptions];
          },
        },
        selectNone: {
          Perfis: () => {
            this.filtroPerfis.selecionados = [];
            this.filtroDisciplinas.selecionados = [];
          },
          Disciplinas: () => {
            this.filtroDisciplinas.selecionados = difference(
              this.filtroDisciplinas.selecionados,
              this.DisciplinasOptionsFiltered
            );
            this.conectaDisciplinasEmPerfis();
          },
          Docentes: () => {
            this.searchConditions.Docentes = difference(
              this.searchConditions.Docentes,
              this.DocentesFiltredModal.map((docente) => docente.id)
            );
          },
          Horarios: () => {
            this.searchConditions.Horarios = difference(
              this.searchConditions.Horarios,
              this.HorariosOptionsFiltered.map((horario) => horario.id)
            );
          },
          Salas: () => {
            this.searchConditions.Salas = difference(
              this.searchConditions.Salas,
              this.SalasOptionsFiltered.map((sala) => sala.id)
            );
          },
          Planos: () => {
            this.searchConditions.Planos = [];
          },
          Periodos: () => {
            this.filtroPeriodos.selecionados = [];
            this.filtroSemestres.selecionados = [];
          },
          Semestres: () => {
            this.filtroSemestres.selecionados = [];
            this.filtroPeriodos.selecionados = [];
          },
        },
        btnOk: async () => {
          this.searchConditions.Disciplinas = this.filtroDisciplinas.selecionados.map(
            (disciplina) => disciplina.id
          );
          this.searchConditions.Periodos = this.filtroPeriodos.selecionados.map(
            (perfil) => perfil.id
          );

          await this.searchTurmas();
        },
      },
      ordenacaoModal: {
        cursos: { order: "codigo", type: "asc" },
        disciplinas: { order: "codigo", type: "asc" },
        perfis: { order: "nome", type: "asc" },
        docentes: { order: "apelido", type: "asc" },
      },
      ordenacaoMain: {
        turmas: { order: "disciplina.codigo", type: "asc" },
        planos: { order: "plano.ano", type: "asc" },
        perfis: { order: "disciplina.perfil.abreviacao", type: "asc" },
      },
      TurmasRetornadas: [],
    };
  },

  methods: {
    async searchTurmas() {
      try {
        const response = await turmaService.search(this.searchConditions);
        this.TurmasRetornadas = response.Turmas;
      } catch (error) {
        this.pushNotification({
          type: "error",
          text: "Não foi possivel encontrar turmas.",
        });
      }
    },

    toggleSearchCodition(fieldName, fieldValue) {
      let i = this.searchConditions[fieldName].findIndex((v) => v == fieldValue);

      if (i === -1) this.searchConditions[fieldName].push(fieldValue);
      else this.searchConditions[fieldName].splice(i, 1);
    },
  },

  computed: {
    ...mapGetters([
      "PerfisDCC",
      "AllPlanos",
      "AllDocentes",
      "AllHorarios",
      "AllSalas",
      "DisciplinasDCCInPerfis",
    ]),

    TurmasRetornadasOrdered() {
      const { turmas, perfis, planos } = this.ordenacaoMain;

      return orderBy(
        this.TurmasRetornadasMapped,
        ["periodo", planos.order, perfis.order, turmas.order],
        ["asc", planos.type, perfis.type, turmas.type]
      );
    },
    TurmasRetornadasMapped() {
      return this.TurmasRetornadas.map((turma) => {
        return {
          ...turma,
          disciplina: find(this.DisciplinasDCCInPerfis, ["id", turma.Disciplina]),
          plano: find(this.AllPlanos, ["id", turma.Plano]) || {},
        };
      });
    },

    // Modals Options
    PerfisOptionsOrdered() {
      return orderBy(
        this.PerfisOptions,
        this.ordenacaoModal.perfis.order,
        this.ordenacaoModal.perfis.type
      );
    },
    PerfisOptions() {
      return this.PerfisDCC.map((perfil) => {
        const todasDisciplinasDoPerfil = filter(this.DisciplinasOptions, [
          "Perfil",
          perfil.id,
        ]);
        const disciplinasSelecionadas = filter(this.filtroDisciplinas.selecionados, [
          "Perfil",
          perfil.id,
        ]);

        let halfChecked = false;
        if (todasDisciplinasDoPerfil.length === disciplinasSelecionadas.length) {
          halfChecked = false;
        } else if (disciplinasSelecionadas.length > 0) {
          halfChecked = true;
        }

        return {
          ...perfil,
          halfChecked,
        };
      });
    },

    DisciplinasOptionsOrdered() {
      return orderBy(
        this.DisciplinasOptionsFiltered,
        this.ordenacaoModal.disciplinas.order,
        this.ordenacaoModal.disciplinas.type
      );
    },
    DisciplinasOptionsFiltered() {
      if (this.searchDisciplinasModal === "") return this.DisciplinasOptions;

      const searchNormalized = normalizeText(this.searchDisciplinasModal);

      return filter(this.DisciplinasOptions, (disciplina) => {
        const nome = normalizeText(disciplina.nome);
        const codigo = normalizeText(disciplina.codigo);

        return nome.match(searchNormalized) || codigo.match(searchNormalized);
      });
    },
    DisciplinasOptions() {
      return this.DisciplinasDCCInPerfis;
    },

    DocentesOptionsOrdered() {
      return orderBy(
        this.DocentesFiltredModal,
        this.ordenacaoModal.docentes.order,
        this.ordenacaoModal.docentes.type
      );
    },
    DocentesFiltredModal() {
      if (this.searchDocentesModal === "") return this.AllDocentes;

      const searchNormalized = normalizeText(this.searchDocentesModal);

      return filter(this.AllDocentes, (docente) => {
        const nome = normalizeText(docente.nome);
        const apelido = normalizeText(docente.apelido);

        return nome.match(searchNormalized) || apelido.match(searchNormalized);
      });
    },

    HorariosOptionsFiltered() {
      if (this.searchHorariosModal === "") return this.AllHorarios;

      const searchNormalized = normalizeText(this.searchHorariosModal);

      return filter(this.AllHorarios, (horario) => {
        const nome = normalizeText(horario.horario);

        return nome.match(searchNormalized);
      });
    },
    SalasOptionsFiltered() {
      if (this.searchSalasModal === "") return this.AllSalas;

      const searchNormalized = normalizeText(this.searchSalasModal);

      return filter(this.AllSalas, (sala) => {
        const nome = normalizeText(sala.nome);

        return nome.match(searchNormalized);
      });
    },
  },
};
</script>
