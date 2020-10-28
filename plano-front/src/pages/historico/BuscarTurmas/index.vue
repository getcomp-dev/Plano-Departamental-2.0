<template>
  <div class="main-component row">
    <PageHeader :title="'Buscar Turmas DCC'">
      <BaseButton template="filtros" @click="toggleAsideModal('filtros')" />
      <BaseButton template="ajuda" @click="toggleAsideModal('ajuda')" />
    </PageHeader>

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
            <v-td width="25">
              <input
                type="checkbox"
                class="form-check-input position-static m-0"
                :value="perfil"
                v-model="filtroPerfis.selecionados"
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
            <v-td width="25">
              <input
                type="checkbox"
                class="form-check-input position-static m-0"
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
            @click="toggle('Docentes', docente.id)"
            v-prevent-click-selection
          >
            <v-td width="25">
              <input
                type="checkbox"
                class="form-check-input position-static m-0"
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
          <v-th width="425" align="start">Período</v-th>
        </template>

        <template #tbody>
          <tr
            v-for="periodo in PeriodosOptions"
            :key="periodo.id + periodo.nome"
            @click.stop="toggle('Periodos', periodo.id)"
          >
            <v-td width="25">
              <input
                type="checkbox"
                class="form-check-input position-static m-0"
                v-model="searchConditions.Periodos"
                :value="periodo.id"
              />
            </v-td>
            <v-td width="425" class="t-start">{{ periodo.nome }}</v-td>
          </tr>

          <tr v-if="!AllHorarios.length">
            <v-td colspan="2" width="450">NENHUM HORÁRIO ENCONTRADO.</v-td>
          </tr>
        </template>
      </BaseTable>

      <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Horários'">
        <template #thead>
          <v-th width="25" />
          <v-th width="425" align="start">Horário</v-th>
        </template>

        <template #tbody>
          <tr
            v-for="horario in AllHorarios"
            :key="horario.id + horario.horario"
            @click="toggle('Horarios', horario.id)"
            v-prevent-click-selection
          >
            <v-td width="25">
              <input
                type="checkbox"
                class="form-check-input position-static m-0"
                v-model="searchConditions.Horarios"
                :value="horario.id"
              />
            </v-td>
            <v-td width="425" class="t-start">{{ horario.horario }}</v-td>
          </tr>

          <tr v-if="!AllHorarios.length">
            <v-td colspan="2" width="450">NENHUM HORÁRIO ENCONTRADO.</v-td>
          </tr>
        </template>
      </BaseTable>

      <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Salas'">
        <template #thead>
          <v-th width="25" />
          <v-th width="425" align="start">Nome</v-th>
        </template>

        <template #tbody>
          <tr
            v-for="sala in AllSalas"
            :key="sala.id + sala.nome"
            @click="toggle('Salas', sala.id)"
            v-prevent-click-selection
          >
            <v-td width="25">
              <input
                type="checkbox"
                class="form-check-input position-static m-0"
                v-model="searchConditions.Salas"
                :value="sala.id"
              />
            </v-td>
            <v-td width="425" class="t-start">{{ sala.nome }}</v-td>
          </tr>

          <tr v-if="!AllSalas.length">
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
            @click="toggle('Planos', plano.id)"
            v-prevent-click-selection
          >
            <v-td width="25">
              <input
                type="checkbox"
                class="form-check-input position-static m-0"
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

    <ModalAjuda ref="modalAjuda"></ModalAjuda>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import turmaService from "@/common/services/turma";
import { normalizeText, generateEmptyTurma } from "@/common/utils";
import {
  toggleItemInArray,
  toggleAsideModal,
  preventClickSelection,
  generateDocentesText,
  generateHorariosText,
  generateSalasText,
  conectaFiltroPerfisEDisciplinas,
} from "@/common/mixins";
import { InputSearch } from "@/components/ui";
import { ModalFiltros, ModalAjuda } from "@/components/modals";

export default {
  name: "BuscarTurmas",
  mixins: [
    toggleItemInArray,
    toggleAsideModal,
    preventClickSelection,
    generateDocentesText,
    generateHorariosText,
    generateSalasText,
    conectaFiltroPerfisEDisciplinas,
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
      searchConditions: {
        Planos: [],
        Disciplinas: [],
        Docentes: [],
        Horarios: [],
        Salas: [],
        Periodos: [],
      },
      modalFiltrosTabs: {
        current: "Disciplinas",
        array: [ 
          "Disciplinas",
          "Docentes",
          "Períodos",
          "Horários",
          "Salas",
          "Planos",
        ],
        Periodos: [],
      },
      filtroPerfis: {
        selecionados: [],
      },
      filtroDisciplinas: {
        selecionados: [],
      },
      modalFiltrosCallbacks: {
        selectAll: {
          Perfis: () => {
            this.filtroDisciplinas.selecionados = [...this.DisciplinasOptions];
            this.filtroPerfis.selecionados = [...this.PerfisOptions];
          },
          Disciplinas: () => {
            this.filtroDisciplinas.selecionados = [...this.DisciplinasOptionsFiltered];
            this.conectaDisciplinasEmPerfis();
          },
          Docentes: () => {
            this.searchConditions.Docentes = [
              ...this.$_.map(this.AllDocentes, function(d) {
                return d.id;
              }),
            ];
          },
          Horarios: () => {
            this.searchConditions.Horarios = [
              ...this.$_.map(this.AllHorarios, function(d) {
                return d.id;
              }),
            ];
          },
          Salas: () => {
            this.searchConditions.Salas = [
              ...this.$_.map(this.AllSalas, function(d) {
                return d.id;
              }),
            ];
          },
          Planos: () => {
            this.searchConditions.Planos = [
              ...this.$_.map(this.AllPlanos, function(d) {
                return d.id;
              }),
            ];
          },
          Periodos: () => {
            this.searchConditions.Periodos = [
              ...this.$_.map(this.PeriodosOptions, function(d) {
                return d.id;
              }),
            ];
          },
        },
        selectNone: {
          Perfis: () => {
            this.filtroPerfis.selecionados = [];
            this.filtroDisciplinas.selecionados = [];
          },
          Disciplinas: () => {
            this.filtroDisciplinas.selecionados = [];
            this.filtroPerfis.selecionados = [];
          },
          Docentes: () => {
            this.searchConditions.Docentes = [];
          },
          Horarios: () => {
            this.searchConditions.Horarios = [];
          },
          Salas: () => {
            this.searchConditions.Salas = [];
          },
          Planos: () => {
            this.searchConditions.Planos = [];
          },
          Periodos: () => {
            this.searchConditions.Periodos = [];
          },
        },
        btnOk: async () => {
          this.searchConditions.Disciplinas = [
            ...this.$_.map(
              this.filtroDisciplinas.selecionados,
              (disciplina) => disciplina.id
            ),
          ];

          await this.search();
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
      PeriodosOptions: [
        { id: 1, nome: "Primeiro" },
        { id: 2, nome: "Segundo (Inverno)" },
        { id: 3, nome: "Terceiro" },
        { id: 4, nome: "Quarto (Verão)" },
      ],
      TurmasRetornadas: null,
    };
  },

  methods: {
    search() {
      turmaService
        .search(this.searchConditions)
        .then((turmas) => {
          this.TurmasRetornadas = turmas.Turmas;
        })
        .catch((error) => console.log(error));
    },

    toggle(fieldName, fieldValue) {
      let i = this.$_.findIndex(this.searchConditions[fieldName], (v) => v == fieldValue);
      if (i === -1) this.searchConditions[fieldName].push(fieldValue);
      else this.searchConditions[fieldName].splice(i, 1);
    },
  },

  computed: {
    ...mapGetters([
      "PerfisDCC",
      "AllDisciplinas",
      "AllPlanos",
      "AllDocentes",
      "AllHorarios",
      "AllSalas",
      "DisciplinasDCCInPerfis",
    ]),

    TurmasRetornadasOrdered() {
      const { turmas, perfis, planos } = this.ordenacaoMain;

      return this.$_.orderBy(
        this.TurmasRetornadasMapped,
        ["periodo", planos.order, perfis.order, turmas.order],
        ["asc", planos.type, perfis.type, turmas.type]
      );
    },
    TurmasRetornadasMapped() {
      return this.$_.map(this.TurmasRetornadas, (turma) => {
        return {
          ...turma,
          disciplina: this.$_.find(this.DisciplinasDCCInPerfis, ["id", turma.Disciplina]),
          plano: this.$_.find(this.AllPlanos, ["id", turma.Plano]) || {},
        };
      });
    },

    // Modals Options
    PerfisOptionsOrdered() {
      return this.$_.orderBy(
        this.PerfisOptions,
        this.ordenacaoModal.perfis.order,
        this.ordenacaoModal.perfis.type
      );
    },
    PerfisOptions() {
      return this.$_.map(this.PerfisDCC, (perfil) => {
        const todasDisciplinasDoPerfil = this.$_.filter(this.DisciplinasOptions, [
          "Perfil",
          perfil.id,
        ]);
        const disciplinasSelecionadas = this.$_.filter(
          this.filtroDisciplinas.selecionados,
          ["Perfil", perfil.id]
        );

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
      return this.$_.orderBy(
        this.DisciplinasOptionsFiltered,
        this.ordenacaoModal.disciplinas.order,
        this.ordenacaoModal.disciplinas.type
      );
    },
    DisciplinasOptionsFiltered() {
      if (this.searchDisciplinasModal === "") return this.DisciplinasOptions;

      const searchNormalized = normalizeText(this.searchDisciplinasModal);

      return this.$_.filter(this.DisciplinasOptions, (disciplina) => {
        const nome = normalizeText(disciplina.nome);
        const codigo = normalizeText(disciplina.codigo);

        return nome.match(searchNormalized) || codigo.match(searchNormalized);
      });
    },
    DisciplinasOptions() {
      return this.DisciplinasDCCInPerfis;
    },
    DocentesOptionsOrdered() {
      return this.$_.orderBy(
        this.DocentesFiltredModal,
        this.ordenacaoModal.docentes.order,
        this.ordenacaoModal.docentes.type
      );
    },
    DocentesFiltredModal() {
      if (this.searchDocentesModal === "") return this.AllDocentes;

      const searchNormalized = normalizeText(this.searchDocentesModal);

      return this.$_.filter(this.AllDocentes, (docente) => {
        const nome = normalizeText(docente.nome);
        const apelido = normalizeText(docente.apelido);

        return nome.match(searchNormalized) || apelido.match(searchNormalized);
      });
    },
  },
};
</script>
