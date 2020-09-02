<template>
  <div class="main-component row">
    <PageHeader :title="'Pós Graduação'">
      <BaseButton
        v-show="isAdding"
        title="Salvar"
        :type="'icon'"
        :color="'green'"
        @click="$refs.novaCargaPosRow.handleAddNovaCargaPos()"
      >
        <font-awesome-icon :icon="['fas', 'check']" />
      </BaseButton>
      <BaseButton
        v-show="isAdding"
        title="Cancelar"
        :type="'icon'"
        :color="'gray'"
        @click="toggleAddRow"
      >
        <font-awesome-icon :icon="['fas', 'times']" />
      </BaseButton>

      <BaseButton
        v-show="!isAdding"
        title="Adicionar"
        :type="'icon'"
        :color="'green'"
        @click="toggleAddRow"
      >
        <font-awesome-icon :icon="['fas', 'plus']" />
      </BaseButton>

      <BaseButton
        v-show="!isAdding"
        title="Deletar selecionados"
        :type="'icon'"
        :color="'red'"
        @click="$refs.modalDelete.open()"
      >
        <font-awesome-icon :icon="['fas', 'trash']" />
      </BaseButton>

      <BaseButton
        title="Filtros"
        :type="'icon'"
        :color="'gray'"
        @click="toggleAsideModal('filtros')"
      >
        <font-awesome-icon :icon="['fas', 'list-ul']" />
      </BaseButton>

      <BaseButton
        title="Ajuda"
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
          <th style="width:70px" class="p-0">Programa</th>
          <th style="width:25px"></th>
          <th style="width:55px" title="Período letivo">P.</th>
          <th
            @click="toggleOrder(ordenacaoCargaPos, 'docenteApelido')"
            class="t-start clickable"
            style="width:145px"
          >
            Docente
            <i :class="setIconByOrder(ordenacaoCargaPos, 'docenteApelido')"></i>
          </th>
          <th
            @click="toggleOrder(ordenacaoCargaPos, 'creditos', 'desc')"
            class="clickable"
            style="width:50px"
            title="Créditos"
          >
            C.
            <i :class="setIconByOrder(ordenacaoCargaPos, 'creditos')"></i>
          </th>
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
                {{ allCreditosCarga(programa.carga) }}
              </td>
            </tr>

            <CargaPosRow
              v-for="carga in programa.carga"
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
      <div class="div-table">
        <BaseTable
          v-show="modalFiltrosTabs.current === 'Programas'"
          :type="'modal'"
        >
          <template #thead>
            <th style="width: 25px"></th>
            <th style="width: 425px" class="t-start">Programa</th>
          </template>
          <template #tbody>
            <tr
              v-for="programaPos in AllProgramasPosOrdered"
              :key="programaPos"
              @click="
                toggleItemInArray(programaPos, filtroProgramas.selecionados)
              "
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

        <BaseTable
          type="modal"
          v-show="modalFiltrosTabs.current === 'Períodos'"
        >
          <template #thead>
            <th style="width: 25px"></th>
            <th style="width: 425px" class="t-start">Periodos Letivo</th>
          </template>
          <template #tbody>
            <tr
              v-for="periodoLetivo in PeriodosLetivos"
              :key="periodoLetivo.id + periodoLetivo.nome"
              @click.stop="
                toggleItemInArray(periodoLetivo, filtroPeriodos.selecionados)
              "
            >
              <td style="width: 25px">
                <input
                  type="checkbox"
                  class="form-check-input position-static m-0"
                  :value="periodoLetivo"
                  v-model="filtroPeriodos.selecionados"
                />
              </td>
              <td style="width: 425px" class="t-start upper-case">
                {{ periodoLetivo.nome }}
              </td>
            </tr>
          </template>
        </BaseTable>
      </div>
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
        navegar entre os tipos de filtro disponíveis. Marque quais informações
        deseja visualizar, e para finalizar clique no botão OK.
      </li>
      <li class="list-group-item">
        <b>Adicionar carga:</b>
        Clique no ícone de adicionar
        <font-awesome-icon :icon="['fas', 'plus']" class="icon-green" />
        no cabeçalho da página. Em seguida, preencha a nova linha que irá
        aparecer no início da tabela. Note que todos os campos são obrigatórios.
        Após preenchê-los, clique no ícone de salvar
        <font-awesome-icon :icon="['fas', 'check']" class="icon-green" /> ou de
        cancelar
        <font-awesome-icon :icon="['fas', 'times']" class="icon-gray" /> .
      </li>
      <li class="list-group-item">
        <b>Deletar carga(s):</b>
        Marque a(s) carga(s) que deseja deletar através da caixa de seleção na
        coluna mais à esquerda da tabela. Em seguida, clique no ícone de deletar
        <font-awesome-icon :icon="['fas', 'trash']" class="icon-red" /> no
        cabeçalho da página. Confirme a exclusão clicando no botão OK na janela
        que se abrirá.
      </li>
      <li class="list-group-item">
        <b>Editar carga:</b> Basta fazer as alterações necessárias diretamente
        nos campos da tabela. O sistema salvará as modificações automaticamente.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  toggleOrdination,
  toggleItemInArray,
  toggleAsideModal,
} from "@/common/mixins";
import { ModalDelete, ModalFiltros, ModalAjuda } from "@/components/modals";

import NovaCargaPosRow from "./NovaCargaPosRow.vue";
import CargaPosRow from "./CargaPosRow.vue";

export default {
  name: "DashboardCargaPos",
  mixins: [toggleOrdination, toggleItemInArray, toggleAsideModal],
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
      filtroProgramas: {
        ativados: [],
        selecionados: [],
      },
      filtroPeriodos: {
        ativados: [],
        selecionados: [],
      },
      ordenacaoCargaPos: { order: "docenteApelido", type: "asc" },
      modalFiltrosTabs: {
        current: "Programas",
        array: ["Programas", "Períodos"],
      },
      modalFiltrosCallbacks: {
        selectAll: {
          Programas: () => {
            this.filtroProgramas.selecionados = [
              ...this.AllProgramasPosOrdered,
            ];
          },
          Periodos: () => {
            this.filtroPeriodos.selecionados = [...this.PeriodosLetivos];
          },
        },
        selectNone: {
          Programas: () => {
            this.filtroProgramas.selecionados = [];
          },
          Periodos: () => {
            this.filtroPeriodos.selecionados = [];
          },
        },
        btnOk: () => {
          this.filtroPeriodos.ativados = [...this.filtroPeriodos.selecionados];
          this.filtroProgramas.ativados = [
            ...this.filtroProgramas.selecionados,
          ];
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
    allCreditosCarga(cargas) {
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
      "PeriodosLetivos",
    ]),

    ProgramasInCargaPosOrdered() {
      return this.$_.map(
        this.ProgramasInCargaPosFiltredByPeriodo,
        (programa) => ({
          nome: programa.nome,
          carga: this.$_.orderBy(
            programa.carga,
            ["trimestre", this.ordenacaoCargaPos.order],
            ["asc", this.ordenacaoCargaPos.type]
          ),
        })
      );
    },
    ProgramasInCargaPosFiltredByPeriodo() {
      return this.$_.map(
        this.ProgramasInCargaPosFiltredByPrograma,
        (programa) => {
          const cargasFiltred = this.$_.filter(programa.carga, (carga) =>
            this.$_.some(this.filtroPeriodos.ativados, ["id", carga.trimestre])
          );

          return {
            nome: programa.nome,
            carga: cargasFiltred,
          };
        }
      );
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
        carga: this.cargaPosInDocente(programaNome),
      }));
    },

    AllProgramasPosOrdered() {
      return this.$_.orderBy(["PGCC", "PGMC", "PGEM"], String, "asc");
    },
  },
};
</script>
