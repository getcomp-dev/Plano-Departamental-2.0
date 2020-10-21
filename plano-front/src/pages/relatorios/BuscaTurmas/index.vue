<template>
  <div class="main-component row">
    <PageHeader :title="'Buscar Turmas DCC'">
      <BaseButton template="filtros" @click="toggleAsideModal('filtros')" />
      <BaseButton template="ajuda" />
    </PageHeader>

    <div class="div-table">
      <BaseTable>
        <template #thead>
          <v-th width="100">Plano</v-th>
          <v-th width="55" title="Período letivo">P.</v-th>
          <v-th width="80">Perfil</v-th>
          <v-th width="80">Código</v-th>
          <v-th width="330">Disciplina</v-th>
          <v-th width="45" title="Turma">T.</v-th>
          <v-th width="200">Docente</v-th>
          <v-th width="80">Turno</v-th>
          <v-th width="120">Horário</v-th>
          <v-th width="95">Sala</v-th>
        </template>

        <template #tbody>
          <tr v-for="turma in TurmasRetornadasOrdered" :key="'turma' + turma.id">
            <v-td width="100">
              {{ plano(turma.Plano) }}
            </v-td>
            <v-td width="55">
              {{ turma.periodo }}
            </v-td>
            <v-td
              width="80"
              :style="{ backgroundColor: perfil(turma.Disciplina).cor }"
            >
              {{ perfil(turma.Disciplina).abreviacao }}
            </v-td>
            <v-td width="80">
              {{ disciplina(turma.Disciplina).codigo }}
            </v-td>
            <v-td width="330">
              {{ disciplina(turma.Disciplina).nome }}
            </v-td>
            <v-td width="45">
              {{ turma.letra }}
            </v-td>
            <v-td width="200">
              {{ docentes(turma) }}
            </v-td>
            <v-td width="80">
              {{ turma.turno1 }}
            </v-td>
            <v-td width="120">
              {{ horarios(turma) }}
            </v-td>
            <v-td width="95">
              {{ salas(turma) }}
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
          <v-th width="70" align="start">Código</v-th>
          <v-th width="355" align="start">Nome</v-th>
        </template>
        <template #tbody>
          <tr
            v-for="disciplina in DisciplinasDCCFiltredModal"
            :key="disciplina.id + disciplina.nome"
            @click.stop="toggle('Disciplinas', disciplina.id)"
          >
            <v-td width="25">
              <input
                type="checkbox"
                class="form-check-input position-static m-0"
                v-model="searchConditions.Disciplinas"
                :value="disciplina.id"
              />
            </v-td>
            <v-td width="70" align="start"> {{ disciplina.codigo }} </v-td>
            <v-td width="355" align="start" :title="disciplina.nome">
              {{ disciplina.nome }}
            </v-td>
          </tr>

          <tr v-if="!AllDisciplinas.length">
            <v-td colspan="3" width="450">NENHUMA DISCIPLINA ENCONTRADA.</v-td>
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
          <v-th width="120" align="start">Apelido</v-th>
          <v-th width="305" align="start">Nome</v-th>
        </template>

        <template #tbody>
          <tr
            v-for="docente in DocentesFiltredModal"
            :key="docente.id + docente.nome"
            @click.stop="toggle('Docentes', docente.id)"
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
            <v-td width="305" align="start">
              {{ docente.nome }}
            </v-td>
          </tr>

          <tr v-if="!AllDocentes.length">
            <v-td colspan="3" width="450">NENHUM DOCENTE ENCONTRADO.</v-td>
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
            @click.stop="toggle('Horarios', horario.id)"
          >
            <v-td width="25">
              <input
                type="checkbox"
                class="form-check-input position-static m-0"
                v-model="searchConditions.Horarios"
                :value="horario.id"
              />
            </v-td>
            <v-td width="425" class="t-start">{{ horario.horario }} </v-td>
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
            @click.stop="toggle('Salas', sala.id)"
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

          <tr v-if="AllSalas.length === 0">
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
            @click.stop="toggle('Planos', plano.id)"
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { normalizeText, generateEmptyTurma } from "@/common/utils";
import { toggleItemInArray, toggleAsideModal } from "@/common/mixins";
import { InputSearch } from "@/components/ui";
import { ModalFiltros, ModalAjuda } from "@/components/modals";

import turmaService from "@/common/services/turma";

export default {
  name: "RelatoriosBuscaTurmas",
  mixins: [toggleItemInArray, toggleAsideModal],
  components: {
    ModalAjuda,
    ModalFiltros,
    InputSearch,
  },
  data() {
    return {
      asideModalsRefs: ["modalFiltros"],
      turmaClicked: generateEmptyTurma(),
      searchDocentesModal: "",
      searchDisciplinasModal: "",
      searchConditions: {
        Planos: [],
        Disciplinas: [],
        Docentes: [],
        Horarios: [],
        Salas: [],
      },
      modalFiltrosTabs: {
        current: "Disciplinas",
        array: ["Disciplinas", "Docentes", "Horários", "Salas", "Planos"],
      },
      modalFiltrosCallbacks: {
        selectAll: {
          Disciplinas: () => {
            this.searchConditions.Disciplinas = [
              ...this.$_.map(this.DisciplinasDCC, function(d) {
                return d.id;
              }),
            ];
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
        },
        selectNone: {
          Disciplinas: () => {
            this.searchConditions.Disciplinas = [];
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
        },
        btnOk: async () => {
          await this.search();
        },
      },
      ordenacaoModal: {
        cursos: { order: "codigo", type: "asc" },
        disciplinas: { order: "codigo", type: "asc" },
        perfis: { order: "nome", type: "asc" },
      },
      ordenacaoMain: {
        turmas: { order: "disciplina.codigo", type: "asc" },
        perfis: { order: "disciplina.perfil.abreviacao", type: "asc" },
      },
      orderByPreferencia: true,
      TurmasRetornadas: undefined,
    };
  },

  methods: {
    selectCursosDCC() {
      this.filtroCursos.selecionados = [...this.CursosDCC];
    },

    search() {
      turmaService
        .search(this.searchConditions)
        .then((turmas) => {
          this.TurmasRetornadas = turmas.Turmas;
        })
        .catch((error) => console.log(error));
    },

    perfil(disciplina) {
      let d = this.$_.find(this.AllDisciplinas, { id: disciplina });
      let p = this.$_.find(this.PerfisDCC, { id: d.Perfil });
      return p;
    },

    plano(p) {
      let plano = this.$_.find(this.$store.state.plano.Plano, { id: p });
      if (plano) return `${plano.ano} - ${plano.nome}`;
      else return "????";
    },

    disciplina(d) {
      let disciplina = this.$_.find(this.AllDisciplinas, { id: d });
      return disciplina;
    },

    docentes(turma) {
      let doce1 = this.$_.find(this.AllDocentes, { id: turma.Docente1 });
      let doce2 = this.$_.find(this.AllDocentes, { id: turma.Docente2 });
      if (doce1) {
        if (doce2) {
          return `${doce1.apelido} - ${doce2.apelido}`;
        } else {
          return `${doce1.apelido}`;
        }
      } else {
        if (doce2) {
          return `${doce2.apelido}`;
        } else {
          return ``;
        }
      }
    },

    horarios(turma) {
      let horario1 = this.$_.find(this.AllHorarios, { id: turma.Horario1 });
      let horario2 = this.$_.find(this.AllHorarios, { id: turma.Horario2 });
      if (horario1) {
        if (horario2) {
          return `${horario1.horario} - ${horario2.horario}`;
        } else {
          return `${horario1.horario}`;
        }
      } else {
        if (horario2) {
          return `${horario2.horario}`;
        } else {
          return ``;
        }
      }
    },

    salas(turma) {
      let sala1 = this.$_.find(this.AllSalas, { id: turma.Sala1 });
      let sala2 = this.$_.find(this.AllSalas, { id: turma.Sala2 });
      if (sala1) {
        if (sala2) {
          return `${sala1.nome} - ${sala2.nome}`;
        } else {
          return `${sala1.nome}`;
        }
      } else {
        if (sala2) {
          return `${sala2.nome}`;
        } else {
          return ``;
        }
      }
    },

    toggle(fieldName, fieldValue) {
      let i = this.$_.findIndex(
        this.searchConditions[fieldName],
        (v) => v == fieldValue
      );
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
    ]),

    AllPlanos() {
      return this.$store.state.plano.Plano;
    },

    DisciplinasDCC() {
      return this.$_.filter(this.AllDisciplinas, (d) => d.departamento === 1);
    },

    TurmasRetornadasOrdered() {
      return this.$_.sortBy(this.TurmasRetornadas, (t) => {
        if (this.plano(t.Plano).ano) return this.plano(t.Plano).ano;
        else return "????";
      });
    },

    TurmasOrdered() {
      const { turmas, perfis } = this.ordenacaoMain;

      //Se não possui ordenação de perfil fixada
      if (this.ordenacaoMain.perfis.order === null) {
        return this.$_.orderBy(
          this.TurmasFiltredByDisciplinas,
          ["periodo", turmas.order],
          ["asc", turmas.type]
        );
      } else
        return this.$_.orderBy(
          this.TurmasFiltredByDisciplinas,
          ["periodo", perfis.order, turmas.order],
          ["asc", perfis.type, turmas.type]
        );
    },
    TurmasFiltredByDisciplinas() {
      return this.$_.filter(this.TurmasFiltredByPeriodos, (turma) =>
        this.$_.some(
          this.filtroDisciplinas.ativadas,
          (disciplinaId) => disciplinaId === turma.Disciplina
        )
      );
    },
    TurmasFiltredByPeriodos() {
      return this.$_.filter(this.TurmasRetornadas, (turma) =>
        this.$_.some(this.filtroPeriodos.ativados, ["id", turma.periodo])
      );
    },

    PerfisOrderedModal() {
      return this.$_.orderBy(
        this.PerfisDCC,
        this.ordenacaoModal.perfis.order,
        this.ordenacaoModal.perfis.type
      );
    },
    DisciplinasDCCOrderedModal() {
      return this.$_.orderBy(
        this.DisciplinasDCCFiltredModal,
        this.ordenacaoModal.disciplinas.order,
        this.ordenacaoModal.disciplinas.type
      );
    },
    DisciplinasDCCFiltredModal() {
      if (this.searchDisciplinasModal === "") return this.DisciplinasDCC;

      const searchNormalized = normalizeText(this.searchDisciplinasModal);

      return this.$_.filter(this.DisciplinasDCC, (disciplina) => {
        const nome = normalizeText(disciplina.nome);
        const codigo = normalizeText(disciplina.codigo);

        return nome.match(searchNormalized) || codigo.match(searchNormalized);
      });
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
