<template>
  <div class="main-component row">
    <PageTitle :title="'Pós Graduação'">
      <template #aside>
        <b-button
          v-show="isAdding"
          title="Salvar"
          class="btn-custom btn-icon addbtn"
          @click.prevent="addNovaCarga()"
        >
          <i class="fas fa-check"></i>
        </b-button>
        <button
          v-show="isAdding"
          type="button"
          title="Cancelar"
          class="btn-custom btn-icon cancelbtn"
          @click="toggleAdd"
        >
          <i class="fas fa-times"></i>
        </button>
        <!--  -->
        <button
          v-show="!isAdding"
          type="button"
          title="Adicionar"
          class="btn-custom btn-icon addbtn"
          @click="toggleAdd"
        >
          <i class="fas fa-plus"></i>
        </button>

        <button
          v-show="!isAdding"
          type="button"
          title="Deletar selecionados"
          class="btn-custom btn-icon delbtn"
          v-b-modal.modalConfirma
        >
          <i class="far fa-trash-alt"></i>
        </button>
        <b-button
          v-b-modal.modalFiltros
          title="Filtros"
          class="btn-custom btn-icon cancelbtn"
        >
          <i class="fas fa-list-ul"></i>
        </b-button>
        <b-button
          v-b-modal.modalAjuda
          title="Ajuda"
          class="btn-custom btn-icon relatbtn"
        >
          <i class="fas fa-question"></i>
        </b-button>
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

    <b-modal id="modalConfirma" title="Confirmar Seleção" @ok="deleteSelected">
      <template v-if="Deletar.length === 0">
        <p class="my-4">Nenhuma carga selecionada!</p>
      </template>
      <template v-else>
        <p class="my-4">
          Tem certeza que deseja deletar as cargas selecionadas?
        </p>
        <template v-for="carga in Deletar">
          <template v-for="docente in Docentes">
            <template v-if="docente.id === carga.Docente">
              <p :key="'carga id' + carga.id + 'docente' + docente.id">
                Docente:{{ docente.apelido }}
                <br />
                Programa:{{ carga.programa }}
                <br />
                Trimestre:{{ carga.trimestre }}
              </p>
            </template>
          </template>
        </template>
      </template>
    </b-modal>

    <!-- MODAL FILTROS -->
    <b-modal id="modalFiltros" ref="modalFiltros" scrollable title="Filtros">
      <NavTab
        :currentTab="modalTabAtiva"
        :allTabs="['Programas', 'Semestres']"
        @change-tab="modalTabAtiva = $event"
      />

      <div class="div-table">
        <BaseTable
          v-show="modalTabAtiva === 'Semestres'"
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

        <BaseTable
          v-show="modalTabAtiva === 'Programas'"
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
      </div>

      <div slot="modal-footer" class="w-100 m-0 d-flex">
        <div class="w-100">
          <b-button
            class="btn-azul btn-custom btn-modal"
            variant="success"
            @click="modalSelectAll[modalTabAtiva]"
            >Selecionar Todos</b-button
          >
          <b-button
            class="btn-cinza btn-custom btn-modal"
            variant="secondary"
            @click="modalSelectNone[modalTabAtiva]"
            >Desmarcar Todos</b-button
          >
        </div>
        <b-button
          variant="success"
          @click="btnOkFiltros()"
          class="btn-verde btn-custom btn-modal btn-ok-modal"
          >OK</b-button
        >
      </div>
    </b-modal>

    <!-- MODAL AJUDA -->
    <b-modal
      id="modalAjuda"
      ref="ajudaModal"
      scrollable
      title="Ajuda"
      hide-footer
    >
      <div class="modal-body">
        <ul class="listas list-group">
          <li class="list-group-item">
            <strong>Para adicionar docentes à Tabela:</strong> Preencha o cartão
            à direita. Após concluído, clique em Adicionar
            <i class="fas fa-plus addbtn px-1" style="font-size:12px"></i>
            ou em Cancelar
            <i class="fas fa-times cancelbtn px-1" style="font-size: 12px"></i>
            .
          </li>
          <li class="list-group-item">
            <strong>Para editar docentes da Tabela:</strong> Na tabela, clique
            no docente que deseja alterar. No cartão à direita faça as mudanças
            desejadas e, em seguida, clique em Salvar
            <i class="fas fa-check addbtn px-1" style="font-size:12px"></i>
            ou em Cancelar
            <i class="fas fa-times cancelbtn px-1" style="font-size: 12px"></i>
            .
          </li>
          <li class="list-group-item">
            <strong>Para deletar docentes da Tabela:</strong> Marque o(s)
            docente(s) que deseja deletar através da caixa de seleção à esquerda
            e em seguida clique em Deletar Selecionados
            <i class="far fa-trash-alt delbtn px-1" style="font-size: 12px"></i>
            e confirme no botão OK.
          </li>
          <li class="list-group-item">
            <strong>Para alterar ordenação:</strong> Clique em Docente ou em T.
            no cabeçalho de cada tabela para alternar a ordenação entre
            alfabética e por trimestre.
          </li>
        </ul>
      </div>
    </b-modal>
  </div>
</template>

<script>
import _ from "lodash";
import toggleOrdinationMixin from "@/mixins/toggleOrdination.js";
import toggleItemInArrayMixin from "@/mixins/toggleItemInArray.js";
import notificationMixin from "@/mixins/notification.js";
import { PageTitle, BaseTable, NavTab, Card } from "@/components/index.js";
import { EventBus } from "@/event-bus.js";
import cargaPosService from "@/common/services/cargaPos";
import CargaPosNovaRow from "./CargaPosNovaRow.vue";
import CargaPosRow from "./CargaPosRow.vue";

const allProgramasPos = ["PGCC", "PGMC", "PGEM"];

export default {
  name: "DashboardCargaPos",
  mixins: [toggleOrdinationMixin, notificationMixin, toggleItemInArrayMixin],
  components: {
    CargaPosRow,
    CargaPosNovaRow,
    PageTitle,
    BaseTable,
    NavTab,
    Card,
  },
  data() {
    return {
      isAdding: false,
      error: undefined,
      filtroProgramas: {
        ativados: [],
        selecionados: [],
      },
      filtroSemestres: {
        primeiro: true,
        segundo: true,
        ativo: 3,
      },
      ordenacaoCargaPos: { order: "docenteApelido", type: "asc" },
      modalTabAtiva: "Programas",
      modalSelectAll: {
        Programas: () => {
          this.filtroProgramas.selecionados = [...this.AllProgramasPosOrdered];
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
    toggleAdd() {
      this.isAdding = !this.isAdding;
    },
    btnOkFiltros() {
      this.setSemestreAtivo();
      this.filtroProgramas.ativados = [...this.filtroProgramas.selecionados];
      this.modalTabAtiva = "Programas";
      this.$refs.modalFiltros.hide();
    },
    setSemestreAtivo() {
      if (this.filtroSemestres.primeiro && !this.filtroSemestres.segundo)
        this.filtroSemestres.ativo = 1;
      else if (this.filtroSemestres.segundo && !this.filtroSemestres.primeiro)
        this.filtroSemestres.ativo = 2;
      else if (this.filtroSemestres.primeiro && this.filtroSemestres.primeiro)
        this.filtroSemestres.ativo = 3;
      else this.filtroSemestres.ativo = undefined;
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
    deleteSelected() {
      let cargas = this.$store.state.cargaPos.Deletar;
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
          carga: _.filter(programa.carga, (carga) => {
            switch (this.filtroSemestres.ativo) {
              case 1:
                return carga.trimestre === 1 || carga.trimestre === 2;
              case 2:
                return carga.trimestre === 3 || carga.trimestre === 4;
              case 3:
                return true;

              default:
                return false;
            }
          }),
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
};
</script>

<style scoped>
.div-card {
  margin-left: auto;
}
.card-title {
  font-size: 16px;
  font-weight: normal;
  padding-left: 0;
  margin: 0;
  text-align: center;
}
.card {
  width: 260px;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.15);
  margin-left: auto;
}
.card-body {
  font-size: 12px !important;
  padding-top: 15px;
}
.card label {
  line-height: 1.2;
  font-size: 12px;
  text-align: start;
  padding-top: 0 !important;
}
.card select {
  height: 25px !important;
  font-size: 11px !important;
  padding: 0px 5px 0px 5px !important;
  min-width: 100px;
  max-width: 100px;
  text-align: center;
}
.selectMenor {
  min-width: 140px;
  max-width: 140px;
  text-align: start !important;
}
.card input,
.main-table input {
  height: 25px !important;
  padding: 0px 5px 0px 5px !important;
  font-size: 11px !important;
  text-align: start;
}
.inputMenor {
  max-width: 50px;
  min-width: 50px;
  text-align: center;
}
.alert {
  background-color: #e9ecef !important;
  border: none;
}

@media screen and (max-width: 995px) {
  /* .div-card {
    margin-left: 0px !important;
    margin-right: 50px !important;
    top: 0 !important;
  }

  .card {
    margin-left: 0px !important;
  } */
}
</style>
