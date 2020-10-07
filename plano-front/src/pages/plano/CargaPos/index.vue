<template>
  <div class="main-component row">
    <PageHeader :title="'Pós Graduação'">
      <BaseButton
        v-show="isAdding"
        template="salvar"
        @click="$refs.novaCargaPosRow.handleCreateCargaPos()"
      />
      <BaseButton v-show="isAdding" template="cancelar" @click="toggleAddRow" />
      <BaseButton v-show="!isAdding" template="adicionar" @click="toggleAddRow" />
      <BaseButton
        v-show="!isAdding"
        template="deletar"
        title="Deletar selecionados"
        @click="$refs.modalDelete.open()"
      />
      <BaseButton template="filtros" @click="toggleAsideModal('filtros')" />
      <BaseButton template="ajuda" @click="toggleAsideModal('ajuda')" />
    </PageHeader>

    <div class="div-table">
      <BaseTable>
        <template #thead>
          <th style="width:70px" class="p-0">Programa</th>
          <th style="width:25px"></th>
          <th style="width:55px" title="Período, ordenação fixa">
            <font-awesome-icon :icon="['fas', 'thumbtack']" />
            P.
          </th>
          <v-th-ordination
            :currentOrder="ordenacaoCargaPos"
            orderToCheck="docenteApelido"
            width="145"
            align="start"
            text="Docente"
          />
          <v-th-ordination
            :currentOrder="ordenacaoCargaPos"
            orderToCheck="creditos"
            orderType="desc"
            width="50"
            title="Créditos"
            text="C."
          />
        </template>

        <template #add-row>
          <NovaCargaPosRow ref="novaCargaPosRow" v-show="isAdding" />
        </template>

        <template #tbody>
          <template v-for="programa in ProgramasInCargaPosOrdered">
            <tr class="bg-custom" :key="programa.nome">
              <td style="width:70px">{{ programa.nome }}</td>
              <td colspan="3" style="width: 225px"></td>
              <td style="width:50px" title="Total de carga">
                {{ calculaTotalDeCreditosDaCarga(programa.cargas) }}
              </td>
            </tr>

            <CargaPosRow
              v-for="carga in programa.cargas"
              :key="carga.id + programa.nome"
              :carga="carga"
            />
          </template>

          <tr v-show="!ProgramasInCargaPosOrdered.length">
            <td style="width:345px">
              <b>Nenhuma carga encontrada.</b> Clique no botão de filtros
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
      <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Programas'">
        <template #thead>
          <th style="width: 25px"></th>
          <th style="width: 425px" class="t-start">Programa</th>
        </template>
        <template #tbody>
          <tr
            v-for="programaPos in AllProgramasPosOrdered"
            :key="programaPos"
            @click="toggleItemInArray(programaPos, filtroProgramas.selecionados)"
          >
            <td style="width:25px">
              <input
                type="checkbox"
                class="form-check-input position-static m-0"
                :value="programaPos"
                v-model="filtroProgramas.selecionados"
              />
            </td>
            <td style="width:425px" class="t-start">{{ programaPos }}</td>
          </tr>
        </template>
      </BaseTable>

      <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Períodos'">
        <template #thead>
          <th style="width: 25px"></th>
          <th style="width: 425px" class="t-start">Periodos Letivo</th>
        </template>
        <template #tbody>
          <tr
            v-for="periodo in PeriodosLetivos"
            :key="periodo.id + periodo.nome"
            @click.stop="selecionaPeriodo(periodo, filtroPeriodos.selecionados)"
          >
            <td style="width: 25px">
              <input
                type="checkbox"
                class="form-check-input position-static m-0"
                :value="periodo"
                v-model="filtroPeriodos.selecionados"
                @click.stop="selecionaPeriodo(periodo)"
              />
            </td>
            <td style="width: 425px" class="t-start upper-case">
              {{ periodo.nome.split("(")[0] }}
            </td>
          </tr>
        </template>
      </BaseTable>

      <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Semestres'">
        <template #thead>
          <th style="width: 25px"></th>
          <th class="t-start" style="width: 425px">
            Semestre Letivo
          </th>
        </template>

        <template #tbody>
          <tr
            v-for="semestre in SemestresLetivos"
            :key="semestre.id + semestre.nome"
            @click.stop="selecionaSemestre(semestre)"
          >
            <td style="width: 25px">
              <input
                type="checkbox"
                class="form-check-input position-static m-0"
                :value="semestre"
                v-model="filtroSemestres.selecionados"
                @click.stop="selecionaSemestre(semestre)"
              />
            </td>
            <td style="width: 425px" class="t-start upper-case">
              {{ semestre.nome }}
            </td>
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
      <li v-if="!CargasPosToDelete.length" class="list-group-item">
        Nenhuma carga selecionada.
      </li>
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
        <b>Visualizar cargas:</b> Clique no ícone de filtros
        <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" />
        no cabeçalho da página e, na janela que se abrirá, utilize as abas para
        navegar entre os tipos de filtro disponíveis. Marque quais informações deseja
        visualizar, e para finalizar clique no botão OK.
      </li>
      <li class="list-group-item">
        <b>Adicionar carga:</b>
        Clique no ícone de adicionar
        <font-awesome-icon :icon="['fas', 'plus']" class="icon-green" />
        no cabeçalho da página. Em seguida, preencha a nova linha que irá aparecer no
        início da tabela. Note que todos os campos são obrigatórios. Após
        preenchê-los, clique no ícone de salvar
        <font-awesome-icon :icon="['fas', 'check']" class="icon-green" /> ou de
        cancelar <font-awesome-icon :icon="['fas', 'times']" class="icon-gray" /> .
      </li>
      <li class="list-group-item">
        <b>Deletar carga(s):</b>
        Marque a(s) carga(s) que deseja deletar através da caixa de seleção na coluna
        mais à esquerda da tabela. Em seguida, clique no ícone de deletar
        <font-awesome-icon :icon="['fas', 'trash']" class="icon-red" /> no cabeçalho
        da página. Confirme a exclusão clicando no botão OK na janela que se abrirá.
      </li>
      <li class="list-group-item">
        <b>Editar carga:</b> Basta fazer as alterações necessárias diretamente nos
        campos da tabela. O sistema salvará as modificações automaticamente.
      </li>
      <li class="list-group-item">
        <b>Observações:</b> Note que os filtros por semestre e períodos são
        interligados. Ao selecionar um semestre, os períodos correspondentes também
        serão selecionados, e vice versa. O primeiro semestre corresponde ao primeiro
        e segundo períodos, e o segundo semestre corresponde ao terceiro e quarto
        períodos.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  toggleItemInArray,
  toggleAsideModal,
  conectaFiltrosSemestresEPeriodos,
} from "@/common/mixins";
import { ModalDelete, ModalFiltros, ModalAjuda } from "@/components/modals";
import NovaCargaPosRow from "./NovaCargaPosRow.vue";
import CargaPosRow from "./CargaPosRow.vue";

export default {
  name: "DashboardCargaPos",
  mixins: [toggleItemInArray, toggleAsideModal, conectaFiltrosSemestresEPeriodos],
  components: {
    ModalDelete,
    ModalFiltros,
    ModalAjuda,
    CargaPosRow,
    NovaCargaPosRow,
  },
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
            this.filtroPeriodos.selecionados = [...this.PeriodosLetivos];
            this.conectaPeriodoEmSemestre();
          },
          Semestres: () => {
            this.filtroSemestres.selecionados = [...this.SemestresLetivos];
            this.conectaSemestreEmPeriodo();
          },
        },
        selectNone: {
          Programas: () => {
            this.filtroProgramas.selecionados = [];
          },
          Periodos: () => {
            this.filtroPeriodos.selecionados = [];
            this.conectaPeriodoEmSemestre();
          },
          Semestres: () => {
            this.filtroSemestres.selecionados = [];
            this.conectaSemestreEmPeriodo();
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
      const cargasPosFiltered = this.$_.filter(this.AllCargasPos, [
        "programa",
        programaNome,
      ]);

      return this.$_.map(cargasPosFiltered, (carga) => {
        const docenteFounded = this.$_.find(this.DocentesAtivos, [
          "id",
          carga.Docente,
        ]);

        return {
          ...carga,
          docenteApelido: docenteFounded ? docenteFounded.apelido : "",
        };
      });
    },
    calculaTotalDeCreditosDaCarga(cargas) {
      return this.$_.reduce(cargas, (acc, carga) => acc + carga.creditos, 0);
    },
    async handleDeleteCargasPos() {
      try {
        this.setPartialLoading(true);
        await this.deleteCargasPos();
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao excluir carga(s)!",
        });
      } finally {
        this.setPartialLoading(false);
      }
    },
  },

  computed: {
    ...mapGetters([
      "DocentesAtivos",
      "CargasPosToDelete",
      "AllCargasPos",
      "SemestresLetivos",
      "PeriodosLetivos",
    ]),

    ProgramasInCargaPosOrdered() {
      return this.$_.map(this.ProgramasInCargaPosFiltredByPeriodo, (programa) => {
        const cargasOrdered = this.$_.orderBy(
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
      return this.$_.map(this.ProgramasInCargaPosFiltredByPrograma, (programa) => {
        const cargasFiltered = this.$_.filter(programa.cargas, (carga) =>
          this.$_.some(this.filtroPeriodos.ativados, ["id", carga.trimestre])
        );

        return {
          ...programa,
          cargas: cargasFiltered,
        };
      });
    },
    ProgramasInCargaPosFiltredByPrograma() {
      return this.$_.filter(this.ProgramasInCargaPos, (programa) =>
        this.$_.some(
          this.filtroProgramas.ativados,
          (programaNome) => programaNome === programa.nome
        )
      );
    },
    ProgramasInCargaPos() {
      return this.$_.map(this.AllProgramasPosOrdered, (programaNome) => ({
        nome: programaNome,
        cargas: this.cargaPosInDocente(programaNome),
      }));
    },

    AllProgramasPosOrdered() {
      return this.$_.orderBy(["PGCC", "PGMC", "PGEM"], String, "asc");
    },
  },
};
</script>
