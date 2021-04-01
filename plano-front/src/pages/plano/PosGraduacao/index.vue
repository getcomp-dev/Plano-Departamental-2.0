<template>
  <div class="main-component row">
    <portal to="page-header">
      <template v-if="isAdding">
        <BaseButton template="salvar" @click="$refs.novaCargaPosRow.handleCreateCargaPos()" />
        <BaseButton template="cancelar" @click="toggleAddRow" />
      </template>
      <template v-else>
        <BaseButton template="adicionar" @click="toggleAddRow" />
        <BaseButton
          template="deletar"
          title="Deletar selecionados"
          @click="$refs.modalDelete.open()"
        />
      </template>
      <BaseButton template="filtros" @click="toggleAsideModal('filtros')" />
      <BaseButton template="ajuda" @click="toggleAsideModal('ajuda')" />
    </portal>

    <div class="div-table">
      <BaseTable>
        <template #thead>
          <v-th width="75">Programa</v-th>
          <v-th width="25" />
          <v-th width="65" title="Período letivo, ordenação fixa">Período</v-th>
          <v-th-ordination
            :currentOrder="ordenacaoCargaPos"
            orderToCheck="docenteApelido"
            width="145"
            align="start"
          >
            Docente
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoCargaPos"
            orderToCheck="creditos"
            orderType="desc"
            width="80"
          >
            Créditos
          </v-th-ordination>
        </template>
        <template #add-row>
          <NovaCargaPosRow ref="novaCargaPosRow" v-if="isAdding" />
        </template>

        <template #tbody>
          <template v-for="programa in ProgramasInCargaPosOrdered">
            <tr class="bg-custom" :key="programa.nome">
              <v-td width="75">{{ programa.nome }}</v-td>
              <v-td width="25" />
              <v-td width="55" />
              <v-td width="145" />
              <v-td width="60" title="Total de carga">
                {{ calculaTotalDeCreditosDaCarga(programa.cargas) }}
              </v-td>
            </tr>

            <CargaPosRow
              v-for="carga in programa.cargas"
              :key="carga.id + programa.nome"
              :carga="carga"
            />
          </template>

          <tr v-if="!ProgramasInCargaPosOrdered.length">
            <v-td width="390" whiteSpace="normal">
              <b>Nenhuma carga encontrada.</b>
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
      <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Programas'">
        <template #thead>
          <v-th width="25" />
          <v-th width="425" align="start">Programa</v-th>
        </template>

        <template #tbody>
          <tr
            v-for="programaPos in AllProgramasPosOrdered"
            :key="programaPos"
            @click="toggleItemInArray(programaPos, filtroProgramas.selecionados)"
            v-prevent-click-selection
          >
            <v-td width="25" type="content">
              <input type="checkbox" v-model="filtroProgramas.selecionados" :value="programaPos" />
            </v-td>
            <v-td width="425" align="start">{{ programaPos }}</v-td>
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
            <v-td width="425" align="start">
              {{ periodo.nome.split("(")[0] }}
            </v-td>
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
            <v-td width="425" align="start">
              {{ semestre.nome }}
            </v-td>
          </tr>
        </template>
      </BaseTable>
    </ModalFiltros>

    <ModalDelete
      ref="modalDelete"
      :isDeleting="!!CargasPosToDelete.length"
      :hasClearDelete="true"
      @btn-deletar="handleDeleteCargasPos"
      @btn-clear="clearCargasPosToDelete"
    >
      <li v-if="!CargasPosToDelete.length" class="list-group-item">Nenhuma carga selecionada.</li>
      <li
        v-for="carga in CargasPosToDelete"
        :key="'deletarTurma' + carga.id"
        class="list-group-item"
      >
        <span>
          <b>Período:</b>
          {{ carga.trimestre }} -
          <b>Programa:</b>
          {{ carga.programa }}
        </span>
        <span>
          <b>Docente:</b>
          {{ carga.docenteApelido }}
        </span>
      </li>
    </ModalDelete>

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Visualizar conteúdo:</b>
        Clique no ícone de filtros
        <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" />
        no cabeçalho da página e, na janela que se abrirá, utilize as abas para navegar entre os
        tipos de filtro disponíveis. Marque quais informações deseja visualizar, e para finalizar
        clique no botão OK.
      </li>
      <li class="list-group-item">
        <b>Adicionar carga:</b>
        Clique no ícone de adicionar
        <font-awesome-icon :icon="['fas', 'plus']" class="icon-green" />
        no cabeçalho da página. Em seguida, preencha a nova linha que irá aparecer no início da
        tabela. Note que todos os campos são obrigatórios. Após preenchê-los, clique no ícone de
        salvar
        <font-awesome-icon :icon="['fas', 'check']" class="icon-green" />
        ou de cancelar
        <font-awesome-icon :icon="['fas', 'times']" class="icon-gray" />
        .
      </li>
      <li class="list-group-item">
        <b>Deletar carga(s):</b>
        Marque a(s) carga(s) que deseja deletar através da caixa de seleção na coluna mais à
        esquerda da tabela. Em seguida, clique no ícone de deletar
        <font-awesome-icon :icon="['fas', 'trash']" class="icon-red" />
        no cabeçalho da página. Confirme a exclusão clicando no botão OK na janela que se abrirá.
      </li>
      <li class="list-group-item">
        <b>Editar carga:</b>
        Basta fazer as alterações necessárias diretamente nos campos da tabela. O sistema salvará as
        modificações automaticamente.
      </li>
      <li class="list-group-item">
        <b>Observações:</b>
        Note que os filtros por semestre e períodos são interligados. Ao selecionar um semestre, os
        períodos correspondentes também serão selecionados, e vice versa. O primeiro semestre
        corresponde ao primeiro e segundo períodos, e o segundo semestre corresponde ao terceiro e
        quarto períodos.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { filter, find, orderBy, some } from "lodash-es";
import {
  toggleItemInArray,
  toggleAsideModal,
  conectaFiltrosSemestresEPeriodos,
  preventClickSelection,
  redirectIfPlanoNotEditable,
} from "@/common/mixins";
import { ModalDelete, ModalFiltros, ModalAjuda } from "@/components/modals";
import NovaCargaPosRow from "./NovaCargaPosRow.vue";
import CargaPosRow from "./CargaPosRow.vue";

export default {
  name: "DashboardCargaPos",
  components: {
    ModalDelete,
    ModalFiltros,
    ModalAjuda,
    CargaPosRow,
    NovaCargaPosRow,
  },
  mixins: [
    toggleItemInArray,
    toggleAsideModal,
    conectaFiltrosSemestresEPeriodos,
    preventClickSelection,
    redirectIfPlanoNotEditable,
  ],
  data() {
    return {
      isAdding: false,
      asideModalsRefs: ["modalFiltros", "modalAjuda"],
      ordenacaoCargaPos: { order: "docenteApelido", type: "asc" },
      filtroProgramas: {
        ativados: [],
        selecionados: [],
      },
      filtroPeriodos: {
        ativados: [],
        selecionados: [],
      },
      filtroSemestres: {
        selecionados: [],
      },
      modalFiltrosTabs: {
        current: "Programas",
        array: ["Programas", "Períodos", "Semestres"],
      },
      modalFiltrosCallbacks: {
        selectAll: {
          Programas: () => {
            this.filtroProgramas.selecionados = [...this.AllProgramasPosOrdered];
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
          Programas: () => {
            this.filtroProgramas.selecionados = [];
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
        btnOk: () => {
          this.filtroPeriodos.ativados = [...this.filtroPeriodos.selecionados];
          this.filtroProgramas.ativados = [...this.filtroProgramas.selecionados];
        },
      },
    };
  },

  beforeMount() {
    this.modalFiltrosCallbacks.selectAll.Periodos();
  },
  beforeDestroy() {
    this.clearCargasPosToDelete();
  },

  methods: {
    ...mapActions(["deleteCargasPos", "clearCargasPosToDelete"]),

    toggleAddRow() {
      this.isAdding = !this.isAdding;
    },
    cargaPosInDocente(programaNome) {
      const cargasPosFiltered = filter(this.AllCargasPos, ["programa", programaNome]);

      return cargasPosFiltered.map((carga) => {
        const docenteFounded = find(this.DocentesAtivos, ["id", carga.Docente]);

        return {
          ...carga,
          docenteApelido: docenteFounded ? docenteFounded.apelido : "",
        };
      });
    },
    calculaTotalDeCreditosDaCarga(cargas) {
      return cargas.reduce((acc, carga) => acc + carga.creditos, 0);
    },
    async handleDeleteCargasPos() {
      try {
        this.setLoading({ type: "partial", value: true });
        await this.deleteCargasPos();
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao excluir carga(s)!",
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
  },

  computed: {
    ...mapGetters(["DocentesAtivos", "CargasPosToDelete", "AllCargasPos"]),

    ProgramasInCargaPosOrdered() {
      return this.ProgramasInCargaPosFiltredByPeriodo.map((programa) => {
        const cargasOrdered = orderBy(
          programa.cargas,
          ["trimestre", this.ordenacaoCargaPos.order],
          ["asc", this.ordenacaoCargaPos.type]
        );

        return {
          nome: programa.nome,
          cargas: cargasOrdered,
        };
      });
    },
    ProgramasInCargaPosFiltredByPeriodo() {
      return this.ProgramasInCargaPosFiltredByPrograma.map((programa) => {
        const cargasFiltered = filter(programa.cargas, (carga) =>
          some(this.filtroPeriodos.ativados, ["id", carga.trimestre])
        );

        return {
          ...programa,
          cargas: cargasFiltered,
        };
      });
    },
    ProgramasInCargaPosFiltredByPrograma() {
      return filter(this.ProgramasInCargaPos, (programa) =>
        some(this.filtroProgramas.ativados, (programaNome) => programaNome === programa.nome)
      );
    },
    ProgramasInCargaPos() {
      return this.AllProgramasPosOrdered.map((programaNome) => ({
        nome: programaNome,
        cargas: this.cargaPosInDocente(programaNome),
      }));
    },
    AllProgramasPosOrdered() {
      return orderBy(["PGCC", "PGMC", "PGEM"], String, "asc");
    },
  },
};
</script>
