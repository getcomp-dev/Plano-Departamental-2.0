<template>
  <div class="main-component row">
    <PageTitle :title="'Pós Graduação'">
      <template #aside>
        <button
          v-show="isAdding"
          title="Salvar"
          class="btn-custom btn-icon addbtn"
          @click.prevent="addNovaCarga()"
        >
          <i class="fas fa-check"></i>
        </button>
        <button
          v-show="!isAdding"
          title="Adicionar"
          class="btn-custom btn-icon addbtn"
          @click="toggleAdd"
        >
          <i class="fas fa-plus"></i>
        </button>
        <button
          v-show="isAdding"
          title="Cancelar"
          class="btn-custom btn-icon cancelbtn"
          @click="toggleAdd"
        >
          <i class="fas fa-times"></i>
        </button>
        <button
          v-show="!isAdding"
          title="Deletar selecionados"
          class="btn-custom btn-icon delbtn"
          @click="$refs.modalConfirma.toggle()"
        >
          <i class="far fa-trash-alt"></i>
        </button>
        <!--  -->
        <button
          @click="openHeaderModal('filtros')"
          title="Filtros"
          class="btn-custom btn-icon cancelbtn"
        >
          <i class="fas fa-list-ul"></i>
        </button>
        <button
          @click="openHeaderModal('ajuda')"
          title="Ajuda"
          class="btn-custom btn-icon relatbtn"
        >
          <i class="fas fa-question"></i>
        </button>
      </template>
    </PageTitle>

    <div class="div-table" v-if="!isLoading">
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
          <CargaPosNovaRow v-show="isAdding" />

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
          <tr v-if="ProgramasInCargaPosOrdered.length === 0">
            <td style="width:345px">
              <b>Nenhuma carga encontrada.</b> Clique no botão de filtros
              <i class="fas fa-list-ul mx-1"></i> para selecioná-las.
            </td>
          </tr>
        </template>
      </BaseTable>
    </div>

    <BaseModal
      ref="modalConfirma"
      :modalOptions="{
        title: 'Confirmar seleção',
        position: 'center',
        hasBackground: true,
        hasFooter: true,
      }"
      :customStyles="'width:400px'"
    >
      <template #modal-body>
        <p v-if="Deletar.length === 0" class="w-100 m-0">
          Nenhuma carga selecionada!
        </p>

        <template v-else>
          <p class="mb-2" style="font-size:14px">
            Tem certeza que deseja deletar as cargas selecionadas?
          </p>
          <ul class="list-group w-100">
            <template v-for="carga in Deletar">
              <template v-for="docente in Docentes">
                <template v-if="docente.id === carga.Docente">
                  <li
                    class="list-group-item px-3"
                    :key="'carga id' + carga.id + 'docente' + docente.id"
                  >
                    <span class="mr-1">
                      <b> Trimestre: </b>{{ carga.trimestre }}
                    </span>
                    <span class="mr-1"
                      ><b> Docente: </b>{{ docente.apelido }}
                    </span>
                    <span class="mr-1"
                      ><b> Programa: </b>{{ carga.programa }}
                    </span>
                  </li>
                </template>
              </template>
            </template>
          </ul>
        </template>
      </template>
      <template #modal-footer>
        <button
          class="btn-custom btn-modal btn-cinza"
          @click="$refs.modalConfirma.close()"
        >
          Cancelar
        </button>
        <button
          class="btn-custom btn-modal btn-vermelho btn-ok-modal"
          @click="deleteSelectedTurmas()"
        >
          Deletar
        </button>
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
          <BaseTable
            v-show="tabAtivaModal === 'Programas'"
            :tableType="'modal-table'"
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
            v-show="tabAtivaModal === 'Trimestres'"
            :tableType="'modal-table'"
          >
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
                  toggleItemInArray(trimestre, filtroTrimestres.selecionados)
                "
              >
                <td style="width: 25px">
                  <input
                    type="checkbox"
                    class="form-check-input position-static m-0"
                    :value="trimestre"
                    v-model="filtroTrimestres.selecionados"
                  />
                </td>
                <td style="width: 425px" class="t-start">
                  {{ trimestre.nome }}
                </td>
              </tr>
            </template>
          </BaseTable>

          <BaseTable
            v-show="tabAtivaModal === 'Semestres'"
            :tableType="'modal-table'"
          >
            <template #thead>
              <th style="width: 25px"></th>
              <th class="t-start" style="width: 425px">
                Semestre Letivo
              </th>
            </template>
            <template #tbody>
              <tr @click="filtroSemestres.primeiro = !filtroSemestres.primeiro">
                <td style="width: 25px">
                  <input
                    type="checkbox"
                    class="form-check-input position-static m-0"
                    v-model="filtroSemestres.primeiro"
                  />
                </td>
                <td style="width: 425px" class="t-start">PRIMEIRO</td>
              </tr>
              <tr @click="filtroSemestres.segundo = !filtroSemestres.segundo">
                <td style="width: 25px">
                  <input
                    type="checkbox"
                    class="form-check-input position-static m-0"
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
            <b>Para selecionar uma turma:</b> clique no ícone de filtros
            <i class="fas fa-list-ul"></i>
            , em seguida marque os programas que pretende visualizar, escolha o
            trimestres ou semestres mudando de aba e por fim clique Ok para
            ativa-los.
          </li>
          <li class="list-group-item">
            <b>Diferença entre filtro de semestre e trimestre:</b> esses dois
            filtros são interligados, onde ao marcar um semestre os trimestres
            correspondetes tambem serão marcados. O primeiro semestre
            corresponde ao primeir e segundo trimestre, e segundo semestre ao
            terceiro e quarto. Então só é necessário utlizar um ou o outro.
          </li>
          <li class="list-group-item">
            <b>Para adicionar uma nova turma:</b> clique no ícone de adicionar
            <i class="fas fa-plus addbtn"></i> presente no cabeçalho da pagina.
            Preencha a linha em branco que irá surgir na tabela, e por fim
            clique no icone de salvar <i class="fas fa-check addbtn"></i> ou
            cancelar
            <i class="fas fa-times cancelbtn"></i>
            .
          </li>
          <li class="list-group-item">
            <b>Para editar uma turma:</b> basta alterar algum dos valores
            presente nas linhas que automaticamente será salvo com o novo valor.
          </li>
          <li class="list-group-item">
            <b>Para deletar uma turma:</b> Marque as turmas que deseja deletar
            através da caixa de seleção presente na primeira coluna da tabela e
            em seguida clique no incone de deletar selecionados
            <i class="far fa-trash-alt delbtn"></i>
            e confirme no botão OK.
          </li>
        </ul>
      </template>
    </BaseModal>
  </div>
</template>

<script>
import _ from "lodash";
import { EventBus } from "@/event-bus.js";
import cargaPosService from "@/common/services/cargaPos";
import CargaPosNovaRow from "./CargaPosNovaRow.vue";
import CargaPosRow from "./CargaPosRow.vue";
import {
  toggleOrdination,
  toggleItemInArray,
  notification,
} from "@/mixins/index.js";
import {
  PageTitle,
  BaseTable,
  BaseModal,
  NavTab,
  Card,
} from "@/components/index.js";

const allProgramasPos = ["PGCC", "PGMC", "PGEM"];

export default {
  name: "DashboardCargaPos",
  mixins: [toggleOrdination, toggleItemInArray, notification],
  components: {
    CargaPosRow,
    CargaPosNovaRow,
    PageTitle,
    BaseTable,
    NavTab,
    Card,
    BaseModal,
  },
  data() {
    return {
      isAdding: false,
      error: undefined,
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
        },
        Semestres: () => {
          this.filtroSemestres.primeiro = true;
          this.filtroSemestres.segundo = true;
        },
      },
      modalSelectNone: {
        Programas: () => {
          this.filtroProgramas.selecionados = [];
        },
        Trimestres: () => {
          this.filtroTrimestres.selecionados = [];
        },
        Semestres: () => {
          this.filtroSemestres.primeiro = false;
          this.filtroSemestres.segundo = false;
        },
      },
    };
  },
  created() {
    if (!this.Admin) {
      this.$notify({
        group: "general",
        title: "Erro",
        text:
          "Acesso negado! Usuário não possui permissão para acessar esta página!",
        type: "error",
      });
      this.$router.push({ name: "dashboard" });
    }
  },

  methods: {
    addNovaCarga() {
      EventBus.$emit("add-carga-pos");
    },
    openHeaderModal(modalName) {
      if (modalName === "filtros") {
        this.$refs.modalFiltros.toggle();
        this.$refs.modalAjuda.close();
      } else if (modalName === "ajuda") {
        this.$refs.modalAjuda.toggle();
        this.$refs.modalFiltros.close();
      }
    },
    toggleAdd() {
      this.isAdding = !this.isAdding;
    },
    btnOkFiltros() {
      this.filtroProgramas.ativados = [...this.filtroProgramas.selecionados];
      this.filtroTrimestres.ativados = [...this.filtroTrimestres.selecionados];
      this.tabAtivaModal = "Programas";
    },

    deleteCarga(cargaId) {
      cargaPosService
        .delete(cargaId)
        .then((response) => {
          this.showNotication({
            type: "success",
            message: `A carga ${response.CargaPos.programa} foi excluída!`,
          });
        })
        .catch((error) => {
          this.showNotication({
            type: "error",
            title: "Error ao deletar carga!",
            message: error,
          });
        });
    },
    deleteSelectedTurmas() {
      let cargas = this.$store.state.cargaPos.Deletar;
      if (!cargas.length) {
        this.showNotication({
          type: "error",
          title: "Erro!",
          message: "Nenhuma turma selecionada.",
        });
        return;
      }

      for (let i = 0; i < cargas.length; i++) {
        this.deleteCarga(cargas[i].id);
      }
      this.$store.commit("emptyDeleteCarga");
    },
    addDocenteIncargaPos(programaNome) {
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
  },

  computed: {
    ProgramasInCargaPos() {
      const programasResutantes = [];

      _.forEach(this.AllProgramasPosOrdered, (programaNome) => {
        programasResutantes.push({
          nome: programaNome,
          carga: this.addDocenteIncargaPos(programaNome),
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
      return _.orderBy(allProgramasPos, String, "asc");
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
    isLoading() {
      return this.$store.state.isLoading;
    },
    Admin() {
      return this.$store.state.auth.Usuario.admin === 1;
    },
  },
  watch: {
    filtroSemestres: {
      handler(semestre) {
        let filtro = [];
        this.filtroTrimestres.selecionados = [...this.Trimestres];

        if (semestre.primeiro && !semestre.segundo) filtro = [1, 2];
        else if (!semestre.primeiro && semestre.segundo) filtro = [3, 4];
        else if (semestre.primeiro && semestre.primeiro) filtro = [1, 2, 3, 4];

        this.filtroTrimestres.selecionados = _.filter(
          this.filtroTrimestres.selecionados,
          (trimestre) => _.find(filtro, (valor) => valor === trimestre.valor)
        );
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style scoped></style>
