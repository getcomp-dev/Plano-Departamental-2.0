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
        <i class="fas fa-check"></i>
      </BaseButton>
      <BaseButton
        v-show="isAdding"
        title="Cancelar"
        :type="'icon'"
        :color="'gray'"
        @click="toggleAdd()"
      >
        <i class="fas fa-times"></i>
      </BaseButton>

      <BaseButton
        v-show="!isAdding"
        title="Adicionar"
        :type="'icon'"
        :color="'green'"
        @click="toggleAdd()"
      >
        <i class="fas fa-plus"></i>
      </BaseButton>
      <BaseButton
        v-show="!isAdding"
        title="Deletar selecionados"
        :type="'icon'"
        :color="'red'"
        @click="$refs.modalDelete.open()"
      >
        <i class="fas fa-trash"></i>
      </BaseButton>

      <BaseButton
        title="Filtros"
        :type="'icon'"
        :color="'gray'"
        @click="openAsideModal('filtros')"
      >
        <i class="fas fa-list-ul"></i>
      </BaseButton>

      <BaseButton
        title="Ajuda"
        :type="'icon'"
        :color="'lightblue'"
        @click="openAsideModal('ajuda')"
      >
        <i class="fas fa-question"></i>
      </BaseButton>
    </PageHeader>

    <div class="div-table">
      <BaseTable>
        <template #thead>
          <th style="width:70px" class="p-0">Programa</th>
          <th style="width:25px"></th>
          <th style="width:55px" title="Trimestre">
            T.
          </th>
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
            title="Carga"
          >
            C.
            <i :class="setIconByOrder(ordenacaoCargaPos, 'creditos')"></i>
          </th>
        </template>
        <template #tbody>
          <NovaCargaPosRow ref="novaCargaPosRow" v-show="isAdding" />

          <template v-for="programa in ProgramasInCargaPosOrdered">
            <tr class="bg-custom" :key="programa.nome">
              <div class="max-content">
                <td style="width:70px">{{ programa.nome }}</td>
                <td style="width:225px"></td>
                <td style="width:50px" title="Total de carga">
                  {{ allCreditosCarga(programa.carga) }}
                </td>
              </div>
            </tr>
            <tr
              v-for="carga in programa.carga"
              :key="carga.id + programa.nome + carga.trimestre"
            >
              <CargaPosRow
                :key="'cargaRow' + carga.id + carga.Docente + carga.trimestre"
                :carga="carga"
              />
            </tr>
          </template>
          <tr v-show="ProgramasInCargaPosOrdered.length === 0">
            <td style="width:345px">
              <b>Nenhuma carga encontrada.</b> Clique no botão de filtros
              <i class="fas fa-list-ul mx-1"></i> para selecioná-las.
            </td>
          </tr>
        </template>
      </BaseTable>
    </div>

    <BaseModal
      ref="modalDelete"
      :modalOptions="{
        title: 'Deletar carga',
        position: 'center',
        hasBackground: true,
        hasFooter: true,
      }"
      :customStyles="'width:450px; font-size:14px'"
    >
      <template #modal-body>
        <p class="w-100 m-0">
          {{
            Deletar.length
              ? "Tem certeza que deseja deletar a(s) carga(s) selecionadas?"
              : "Nenhuma turma selecionada!"
          }}
        </p>
        <ul v-if="Deletar.length" class="list-group list-deletar w-100 mt-2">
          <li
            v-for="carga in Deletar"
            :key="'carga id' + carga.id"
            class="list-group-item"
          >
            <span class="mr-1"> <b> Trimestre: </b>{{ carga.trimestre }} </span>
            <span class="mr-1"><b> Programa: </b>{{ carga.programa }} </span>
            <span class="mr-1"
              ><b> Docente: </b>{{ carga.docenteApelido }}
            </span>
          </li>
        </ul>
      </template>
      <template #modal-footer>
        <BaseButton
          class="paddingX-20"
          :type="'text'"
          :color="'gray'"
          @click="closeModalDelete()"
        >
          Cancelar
        </BaseButton>
        <BaseButton
          class="paddingX-20"
          :type="'text'"
          :color="'red'"
          @click="deleteSelectedCargas()"
        >
          Deletar
        </BaseButton>
      </template>
    </BaseModal>
    <!-- MODAL FILTROS -->
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
        <NavTab
          :currentTab="tabAtivaModal"
          :allTabs="['Programas', 'Trimestres', 'Semestres']"
          @change-tab="tabAtivaModal = $event"
        />

        <div class="div-table">
          <BaseTable v-show="tabAtivaModal === 'Programas'" :type="'modal'">
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

          <BaseTable v-show="tabAtivaModal === 'Trimestres'" :type="'modal'">
            <template #thead>
              <th style="width: 25px"></th>
              <th class="t-start" style="width: 425px">
                Trimestre letivo
              </th>
            </template>
            <template #tbody>
              <tr
                v-for="trimestre in Trimestres"
                :key="'MdTrimestre' + trimestre.valor"
                @click="
                  selectTrimestre(trimestre, filtroTrimestres.selecionados)
                "
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
                <td style="width: 425px" class="t-start">
                  {{ trimestre.nome }}
                </td>
              </tr>
            </template>
          </BaseTable>

          <BaseTable v-show="tabAtivaModal === 'Semestres'" :type="'modal'">
            <template #thead>
              <th style="width: 25px"></th>
              <th class="t-start" style="width: 425px">
                Semestre Letivo
              </th>
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
      </template>
    </BaseModal>
    <!-- MODAL AJUDA -->
    <BaseModal
      ref="modalAjuda"
      :modalOptions="{
        type: 'ajuda',
        title: 'Ajuda',
      }"
    >
      <template #modal-body>
        <ul class="list-ajuda list-group">
          <li class="list-group-item">
            <b>Para exibir conteúdo na tabela:</b> Clique no ícone filtros
            <i class="fas fa-list-ul cancelbtn"></i> no cabeçalho da página e na
            janela que será aberta utilize as abas para navegar entre os tipos
            de filtros. Marque em suas respectivas tabelas quais informações
            deseja visualizar, e para finalizar clique no botão OK.
          </li>
          <li class="list-group-item">
            <b>Para adicionar uma carga à tabela:</b> Clique no ícone adicionar
            <i class="fas fa-plus addbtn"></i> no cabeçalho da página em seguida
            preencha a nova linha que irá aparecer no início da tabela. E note
            que, todos os campos presentes são obrigatórios. Após preencher os
            campos clique no ícone salvar
            <i class="fas fa-check addbtn"></i>
            ou em cancelar
            <i class="fas fa-times cancelbtn"></i>
            .
          </li>
          <li class="list-group-item">
            <b>Para deletar carga da tabela:</b> Marque a(s) carga(s) que deseja
            deletar através da caixa de seleção presente na segunda coluna à
            esquerda na tabela, em seguida clique no ícone deletar
            <i class="fas fa-trash delbtn"></i> no cabeçalho da página e na
            janela que será aberta confirme clicando botão OK.
          </li>
          <li class="list-group-item">
            <b>Para editar carga da tabela:</b> Basta fazer as alterações
            necessárias diretamente nos campos da tabela e o sistema irá salvar
            automaticamente.
          </li>
          <li class="list-group-item">
            <b>Observações:</b> Note que os
            <b>filtros semestres e trimestres são interligados</b> onde, ao
            selecionar um semestre os trimestres correspondetes tambem serão
            selecionados e vice versa. O primeiro semestre corresponde ao
            primeiro e segundo trimestre, e segundo semestre ao terceiro e
            quarto. Então só é necessário utlizar um ou o outro.
          </li>
        </ul>
      </template>
    </BaseModal>
  </div>
</template>

<script>
import _ from "lodash";
import cargaPosService from "@/common/services/cargaPos";
import NovaCargaPosRow from "./NovaCargaPosRow.vue";
import CargaPosRow from "./CargaPosRow.vue";
import {
  toggleOrdination,
  toggleItemInArray,
  notification,
} from "@/common/mixins";
import {
  PageHeader,
  BaseTable,
  BaseModal,
  BaseButton,
  NavTab,
} from "@/components/ui";

export default {
  name: "DashboardCargaPos",
  mixins: [toggleOrdination, toggleItemInArray, notification],
  components: {
    CargaPosRow,
    NovaCargaPosRow,
    PageHeader,
    BaseTable,
    NavTab,
    BaseButton,
    BaseModal,
  },
  data() {
    return {
      isAdding: false,
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
      tabAtivaModal: "Programas",
      modalSelectAll: {
        Programas: () => {
          this.filtroProgramas.selecionados = [...this.AllProgramasPosOrdered];
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
      modalSelectNone: {
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
    };
  },
  mounted() {
    this.connectSemestreInTrimestre();
    this.$store.commit("emptyDelete");
  },
  methods: {
    openAsideModal(modalName) {
      if (modalName === "filtros") {
        this.$refs.modalFiltros.toggle();
        this.$refs.modalAjuda.close();
      } else if (modalName === "ajuda") {
        this.$refs.modalAjuda.toggle();
        this.$refs.modalFiltros.close();
      }
    },
    closeModalDelete() {
      this.$refs.modalDelete.close();
    },
    toggleAdd() {
      this.isAdding = !this.isAdding;
    },
    btnOkFiltros() {
      this.filtroProgramas.ativados = [...this.filtroProgramas.selecionados];
      this.filtroTrimestres.ativados = [...this.filtroTrimestres.selecionados];
    },
    deleteCarga(cargaId) {
      cargaPosService
        .delete(cargaId)
        .then((response) => {
          this.showNotification({
            type: "success",
            message: `A carga ${response.CargaPos.programa} foi excluída!`,
          });
        })
        .catch((error) => {
          this.showNotification({
            type: "error",
            title: "Error ao deletar carga!",
            message: error,
          });
        });
    },
    deleteSelectedCargas() {
      let cargas = this.$store.state.cargaPos.Deletar;

      for (let i = 0; i < cargas.length; i++) {
        this.deleteCarga(cargas[i].id);
      }
      this.closeModalDelete();
      this.$store.commit("emptyDeleteCarga");
    },
    cargaPosInDocente(programaNome) {
      const cargasResultantes = [];

      _.forEach(this.CargasPos, (carga) => {
        const docenteFounded = _.find(
          this.Docentes,
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
      return _.reduce(cargas, (acc, carga) => acc + carga.creditos, 0);
    },

    selectSemestre(semestre) {
      this.filtroSemestres[semestre] = !this.filtroSemestres[semestre];
      this.connectSemestreInTrimestre();
    },
    connectSemestreInTrimestre() {
      const findTrimestre = (array, trimestreValor) =>
        _.find(array, (item) => item.valor === trimestreValor);

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
        _.find(array, (item) => item.valor === trimestreValor);

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
    ProgramasInCargaPos() {
      const programasResutantes = [];

      _.forEach(this.AllProgramasPosOrdered, (programaNome) => {
        programasResutantes.push({
          nome: programaNome,
          carga: this.cargaPosInDocente(programaNome),
        });
      });

      return programasResutantes;
    },
    ProgramasInCargaPosFiltredByPrograma() {
      return _.filter(
        this.ProgramasInCargaPos,
        (programa) =>
          _.findIndex(
            this.filtroProgramas.ativados,
            (programaNome) => programaNome === programa.nome
          ) !== -1
      );
    },
    ProgramasInCargaPosFiltredByTrimestre() {
      const programasResutantes = [];

      _.forEach(this.ProgramasInCargaPosFiltredByPrograma, (programa) => {
        programasResutantes.push({
          nome: programa.nome,
          carga: _.filter(
            programa.carga,
            (carga) =>
              _.findIndex(
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

      _.forEach(this.ProgramasInCargaPosFiltredByTrimestre, (programa) => {
        programasResutantes.push({
          nome: programa.nome,
          carga: _.orderBy(
            programa.carga,
            ["trimestre", this.ordenacaoCargaPos.order],
            ["asc", this.ordenacaoCargaPos.type]
          ),
        });
      });
      return programasResutantes;
    },
    AllProgramasPosOrdered() {
      return _.orderBy(["PGCC", "PGMC", "PGEM"], String, "asc");
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
    Docentes() {
      return _.filter(this.$store.state.docente.Docentes, ["ativo", true]);
    },
    Deletar() {
      return this.$store.state.cargaPos.Deletar;
    },
  },
};
</script>

<style scoped></style>
