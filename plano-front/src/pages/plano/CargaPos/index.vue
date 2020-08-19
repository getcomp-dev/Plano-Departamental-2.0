<template>
  <div class="main-component row">
    <PageHeader :title="'Pós Graduação'">
      <BaseButton
        v-show="isAdding"
        title="Salvar"
        :type="'icon'"
        :color="'green'"
        @click="$refs.novaCargaPosRow.addCarga()"
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
          <th style="width:55px" title="Trimestre">T.</th>
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
          v-show="modalFiltrosTabs.current === 'Trimestres'"
          :type="'modal'"
        >
          <template #thead>
            <th style="width: 25px"></th>
            <th class="t-start" style="width: 425px">Trimestre letivo</th>
          </template>
          <template #tbody>
            <tr
              v-for="trimestre in Trimestres"
              :key="'MdTrimestre' + trimestre.valor"
              @click="selectTrimestre(trimestre, filtroTrimestres.selecionados)"
            >
              <td style="width: 25px">
                <input
                  type="checkbox"
                  class="form-check-input position-static m-0"
                  :value="trimestre"
                  @click.stop="
                    selectTrimestre(trimestre, filtroTrimestres.selecionados)
                  "
                  v-model="filtroTrimestres.selecionados"
                />
              </td>
              <td style="width: 425px" class="t-start">{{ trimestre.nome }}</td>
            </tr>
          </template>
        </BaseTable>

        <BaseTable
          v-show="modalFiltrosTabs.current === 'Semestres'"
          :type="'modal'"
        >
          <template #thead>
            <th style="width: 25px"></th>
            <th class="t-start" style="width: 425px">Semestre Letivo</th>
          </template>
          <template #tbody>
            <tr @click="selectSemestre('primeiro')">
              <td style="width: 25px">
                <input
                  type="checkbox"
                  class="form-check-input position-static m-0"
                  @click.stop="selectSemestre('primeiro')"
                  v-model="filtroSemestres.primeiro"
                />
              </td>
              <td style="width: 425px" class="t-start">PRIMEIRO</td>
            </tr>
            <tr @click="selectSemestre('segundo')">
              <td style="width: 25px">
                <input
                  type="checkbox"
                  class="form-check-input position-static m-0"
                  @click.stop="selectSemestre('segundo')"
                  v-model="filtroSemestres.segundo"
                />
              </td>
              <td style="width: 425px" class="t-start">SEGUNDO</td>
            </tr>
          </template>
        </BaseTable>
      </div>
    </ModalFiltros>

    <ModalDelete
      ref="modalDelete"
      :isDeleting="!!Deletar.length"
      @btn-deletar="deleteSelectedCargas"
    >
      <li v-if="!Deletar.length" class="list-group-item">
        Nenhuma carga selecionada.
      </li>
      <li
        v-for="carga in Deletar"
        :key="'deletarTurma' + carga.id"
        class="list-group-item"
      >
        <span>
          <b>Trimestre:</b>
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
      <li class="list-group-item">
        <b>Observações:</b> Note que os filtros por semestre e trimestre são
        interligados. Ao selecionar um semestre, os trimestres correspondentes
        também serão selecionados, e vice versa. O primeiro semestre corresponde
        ao primeiro e segundo trimestres, e o segundo semestre corresponde ao
        terceiro e quarto trimestres.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import cargaPosService from "@/common/services/cargaPos";
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
      filtroTrimestres: {
        ativados: [],
        selecionados: [],
      },
      filtroSemestres: {
        primeiro: true,
        segundo: true,
      },
      ordenacaoCargaPos: { order: "docenteApelido", type: "asc" },
      modalFiltrosTabs: {
        current: "Programas",
        array: ["Programas", "Trimestres", "Semestres"],
      },
      modalFiltrosCallbacks: {
        selectAll: {
          Programas: () => {
            this.filtroProgramas.selecionados = [
              ...this.AllProgramasPosOrdered,
            ];
          },
          Trimestres: () => {
            this.filtroTrimestres.selecionados = [...this.Trimestres];
            this.connectTrimestreInSemestre();
          },
          Semestres: () => {
            this.filtroSemestres.primeiro = true;
            this.filtroSemestres.segundo = true;
            this.connectSemestreInTrimestre();
          },
        },
        selectNone: {
          Programas: () => {
            this.filtroProgramas.selecionados = [];
          },
          Trimestres: () => {
            this.filtroTrimestres.selecionados = [];
            this.connectTrimestreInSemestre();
          },
          Semestres: () => {
            this.filtroSemestres.primeiro = false;
            this.filtroSemestres.segundo = false;
            this.connectSemestreInTrimestre();
          },
        },
        btnOk: () => {
          this.filtroProgramas.ativados = [
            ...this.filtroProgramas.selecionados,
          ];
          this.filtroTrimestres.ativados = [
            ...this.filtroTrimestres.selecionados,
          ];
        },
      },
    };
  },

  beforeMount() {
    this.connectSemestreInTrimestre();
  },

  methods: {
    toggleAddRow() {
      this.isAdding = !this.isAdding;
    },
    deleteCarga(cargaId) {
      cargaPosService
        .delete(cargaId)
        .then((response) => {
          this.pushNotification({
            type: "success",
            text: `A carga ${response.CargaPos.programa} foi excluída!`,
          });
        })
        .catch((error) => {
          this.pushNotification({
            type: "error",
            title: "Error ao deletar carga!",
            text: error.message || "",
          });
        });
    },
    deleteSelectedCargas() {
      let cargas = this.$store.state.cargaPos.Deletar;

      for (let i = 0; i < cargas.length; i++) {
        this.deleteCarga(cargas[i].id);
      }
      this.$store.commit("emptyDeleteCarga");
    },
    cargaPosInDocente(programaNome) {
      const cargasResultantes = [];

      this.$_.forEach(this.CargasPos, (carga) => {
        const docenteFounded = this.$_.find(
          this.DocentesAtivos,
          (docente) => docente.id === carga.Docente
        );

        if (docenteFounded && programaNome === carga.programa) {
          cargasResultantes.push({
            ...carga,
            docenteApelido: docenteFounded.apelido,
          });
        }
      });

      return cargasResultantes;
    },
    allCreditosCarga(cargas) {
      return this.$_.reduce(cargas, (acc, carga) => acc + carga.creditos, 0);
    },

    selectSemestre(semestre) {
      this.filtroSemestres[semestre] = !this.filtroSemestres[semestre];
      this.connectSemestreInTrimestre();
    },
    connectSemestreInTrimestre() {
      const findTrimestre = (array, trimestreValor) =>
        this.$_.find(array, (item) => item.valor === trimestreValor);

      const allTrimestres = this.Trimestres;
      this.filtroTrimestres.selecionados = [];

      if (this.filtroSemestres.primeiro) {
        this.filtroTrimestres.selecionados.push(
          findTrimestre(allTrimestres, 1),
          findTrimestre(allTrimestres, 2)
        );
      }

      if (this.filtroSemestres.segundo) {
        this.filtroTrimestres.selecionados.push(
          findTrimestre(allTrimestres, 3),
          findTrimestre(allTrimestres, 4)
        );
      }
    },
    selectTrimestre(newItem, array) {
      this.toggleItemInArray(newItem, array);
      this.connectTrimestreInSemestre();
    },
    connectTrimestreInSemestre() {
      const findTrimestre = (array, trimestreValor) =>
        this.$_.find(array, (item) => item.valor === trimestreValor);

      const { selecionados } = this.filtroTrimestres;

      if (findTrimestre(selecionados, 1) && findTrimestre(selecionados, 2))
        this.filtroSemestres.primeiro = true;
      else this.filtroSemestres.primeiro = false;

      if (findTrimestre(selecionados, 3) && findTrimestre(selecionados, 4))
        this.filtroSemestres.segundo = true;
      else this.filtroSemestres.segundo = false;
    },
  },

  computed: {
    ...mapGetters(["DocentesAtivos"]),

    ProgramasInCargaPos() {
      const programasResutantes = [];

      this.$_.forEach(this.AllProgramasPosOrdered, (programaNome) => {
        programasResutantes.push({
          nome: programaNome,
          carga: this.cargaPosInDocente(programaNome),
        });
      });

      return programasResutantes;
    },
    ProgramasInCargaPosFiltredByPrograma() {
      return this.$_.filter(
        this.ProgramasInCargaPos,
        (programa) =>
          this.$_.findIndex(
            this.filtroProgramas.ativados,
            (programaNome) => programaNome === programa.nome
          ) !== -1
      );
    },
    ProgramasInCargaPosFiltredByTrimestre() {
      const programasResutantes = [];

      this.$_.forEach(this.ProgramasInCargaPosFiltredByPrograma, (programa) => {
        programasResutantes.push({
          nome: programa.nome,

          carga: this.$_.filter(
            programa.carga,
            (carga) =>
              this.$_.findIndex(
                this.filtroTrimestres.ativados,
                (trimestre) => trimestre.valor === carga.trimestre
              ) !== -1
          ),
        });
      });

      return programasResutantes;
    },
    ProgramasInCargaPosOrdered() {
      const programasResutantes = [];

      this.$_.forEach(
        this.ProgramasInCargaPosFiltredByTrimestre,
        (programa) => {
          programasResutantes.push({
            nome: programa.nome,
            carga: this.$_.orderBy(
              programa.carga,
              ["trimestre", this.ordenacaoCargaPos.order],
              ["asc", this.ordenacaoCargaPos.type]
            ),
          });
        }
      );
      return programasResutantes;
    },
    AllProgramasPosOrdered() {
      return this.$_.orderBy(["PGCC", "PGMC", "PGEM"], String, "asc");
    },
    Trimestres() {
      return [
        { nome: "PRIMEIRO", valor: 1 },
        { nome: "SEGUNDO", valor: 2 },
        { nome: "TERCEIRO", valor: 3 },
        { nome: "QUARTO", valor: 4 },
      ];
    },
    CargasPos() {
      return this.$store.state.cargaPos.Cargas;
    },
    Deletar() {
      return this.$store.state.cargaPos.Deletar;
    },
  },
};
</script>
