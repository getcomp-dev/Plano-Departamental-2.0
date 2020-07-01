<template>
  <div class="main-component row">
    <PageTitle :title="'Pós Graduação'">
      <template #aside>
        <BaseButton
          v-show="isAdding"
          title="Salvar"
          :type="'icon'"
          :color="'green'"
          @click="addNovaCarga()"
        >
          <i class="fas fa-check"></i>
        </BaseButton>
        <BaseButton
          v-show="isAdding"
          title="Cancelar"
          :type="'icon'"
          :color="'red'"
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
      </template>
    </PageTitle>

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
      ref="modalDelete"
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
          class="btn-custom btn-modal btn-cinza btn-ok-modal"
          @click="$refs.modalDelete.close()"
        >
          Cancelar
        </button>
        <button
          v-if="Deletar.length"
          class="btn-custom btn-modal btn-vermelho btn-ok-modal"
          @click="deleteSelectedCargas()"
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
                @click.stop="
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
              <tr @click.stop="selectSemestre('primeiro')">
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
              <tr @click.stop="selectSemestre('segundo')">
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
            <i class="fas fa-trash delbtn"></i>
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
  redirectNotAdmin,
} from "@/mixins/index.js";
import {
  PageTitle,
  BaseTable,
  BaseModal,
  BaseButton,
  NavTab,
} from "@/components/index.js";

export default {
  name: "DashboardCargaPos",
  mixins: [toggleOrdination, toggleItemInArray, notification, redirectNotAdmin],
  components: {
    CargaPosRow,
    CargaPosNovaRow,
    PageTitle,
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
      this.$store.commit("emptyDeleteCarga");
    },
    addNovaCarga() {
      EventBus.$emit("add-carga-pos");
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
    Admin() {
      return this.$store.state.auth.Usuario.admin === 1;
    },
  },
};
</script>

<style scoped></style>
