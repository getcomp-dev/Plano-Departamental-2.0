<template>
  <!-- eslint-disable  -->
  <div class="main-component">
    <portal to="page-header">
      <BaseButton template="adicionar" @click="toggleAsideModal('newPref')" />
      <BaseButton template="filtros" @click="toggleAsideModal('filtros')" />
      <BaseButton template="file-upload" @click="toggleAsideModal('upload')" />
      <BaseButton template="swap-modes" @click="toggleTableMode" />
      <BaseButton template="ajuda" @click="toggleAsideModal('ajuda')" />
    </portal>

    <div class="div-table">
      <BaseTable v-if="tableMode === 'disciplina'">
        <template #thead>
          <v-th-ordination
            :currentOrder="ordenacaoDisciplina.disciplinas"
            orderToCheck="codigo"
            width="90"
            align="start"
            title="Código da Disciplina"
          >
            Código
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoDisciplina.disciplinas"
            orderToCheck="nome"
            width="420"
            align="start"
            title="Nome da Disciplina"
          >
            Nome
          </v-th-ordination>
          <v-th-ordination
            width="80"
            :currentOrder="ordenacaoDisciplina.disciplinas"
            orderToCheck="perfil.abreviacao"
            title="Perfil da Disciplina"
          >
            Perfil
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoDisciplina.docentes"
            orderToCheck="docente.nome"
            width="120"
            align="start"
            title="Nome do Docente"
          >
            Docente
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoDisciplina.pref"
            orderToCheck="preferencia"
            orderType="desc"
            :orderFixed="true"
            width="100"
            title="Preferência do Docente"
          >
            Preferência
          </v-th-ordination>
        </template>

        <template #tbody>
          <template v-if="DisciplinasFiltered.length && DocentesFiltered.length">
            <template v-for="disciplina in DisciplinasInPreferenciasOrdered">
              <tr :key="disciplina.id" class="bg-custom">
                <v-td width="90" align="start">{{ disciplina.codigo }}</v-td>
                <v-td width="420" align="start">{{ disciplina.nome }}</v-td>
                <v-td width="80" paddingX="2">{{ disciplina.perfil.abreviacao }}</v-td>
                <v-td width="120" />
                <v-td
                  width="100"
                  class="clickable"
                  type="content"
                  @click="openModalAddPreferencia(disciplina)"
                >
                  <font-awesome-icon :icon="['fas', 'plus']" class="icon-darkgray" />
                </v-td>
              </tr>

              <tr
                v-for="preferencia in disciplina.preferencias"
                :key="preferencia.Docente + '-' + preferencia.Disciplina"
              >
                <v-td width="90" />
                <v-td width="420" />
                <v-td width="80" />
                <v-td width="120" align="start" :title="preferencia.docente.nome">
                  {{ preferencia.docente.apelido }}
                </v-td>
                <v-td
                  width="100"
                  class="td-pref"
                  @click="openModalEditPreferencia(preferencia)"
                  :title="
                    'Preferência: ' +
                    preferenciaText(preferencia.preferencia) +
                    '\nClique para editar'
                  "
                >
                  {{ preferencia.preferencia }}
                </v-td>
              </tr>
            </template>
          </template>
          <tr v-else>
            <v-td width="810">
              <b>Nenhuma disciplina encontrada.</b>
              Clique no botão de filtros
              <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" />
              para selecioná-las.
            </v-td>
          </tr>
        </template>
      </BaseTable>

      <BaseTable v-else-if="tableMode === 'docente'">
        <template #thead>
          <v-th-ordination
            :currentOrder="ordenacaoDocentes.docentes"
            orderToCheck="nome"
            width="120"
            align="start"
            title="Nome do Docente"
          >
            Docente
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoDocentes.disciplinas"
            orderToCheck="disciplina.nome"
            width="90"
            title="Código da Disciplina"
          >
            Código
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoDocentes.disciplinas"
            orderToCheck="disciplina.nome"
            width="420"
            align="start"
            title="Nome da Disciplina"
          >
            Nome
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoDocentes.disciplinas"
            orderToCheck="disciplina.perfil.abreviacao"
            width="80"
            title="Perfil da Disciplina"
          >
            Perfil
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoDocentes.pref"
            orderToCheck="preferencia"
            orderType="desc"
            :orderFixed="true"
            width="100"
            title="Preferência do Docente"
          >
            Preferência
          </v-th-ordination>
        </template>

        <template #tbody>
          <template v-if="DisciplinasFiltered.length && DocentesFiltered.length">
            <template v-for="docente in DocentesInPreferenciasOrdered">
              <tr :key="docente.id" class="bg-custom">
                <v-td width="120" align="start">{{ docente.apelido }}</v-td>
                <v-td width="90" />
                <v-td width="420" />
                <v-td width="80" />
                <v-td
                  width="100"
                  type="content"
                  class="clickable"
                  @click="openModalAddPreferencia(docente)"
                >
                  <font-awesome-icon :icon="['fas', 'plus']" class="icon-darkgray" />
                </v-td>
              </tr>

              <tr
                v-for="preferencia in docente.preferencias"
                :key="preferencia.Docente + '-' + preferencia.Disciplina"
              >
                <v-td width="120" />
                <v-td width="90">{{ preferencia.disciplina.codigo }}</v-td>
                <v-td width="420" align="start">{{ preferencia.disciplina.nome }}</v-td>
                <v-td width="80">{{ preferencia.disciplina.perfil.abreviacao }}</v-td>
                <v-td
                  width="100"
                  class="td-pref"
                  type="content"
                  @click="openModalEditPreferencia(preferencia)"
                  :title="
                    'Preferência: ' +
                    preferenciaText(preferencia.preferencia) +
                    '\nClique para editar'
                  "
                >
                  {{ preferencia.preferencia }}
                </v-td>
              </tr>
            </template>
          </template>
          <tr v-else>
            <v-td width="810">
              <b>Nenhuma disciplina encontrada.</b>
              Clique no botão de filtros
              <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" />
              para selecioná-las.
            </v-td>
          </tr>
        </template>
      </BaseTable>
    </div>

    <BaseModal
      ref="modalEditPref"
      class="modal-pref"
      title="Editar Preferência"
      position="right"
      hasFooter
      :styles="{ width: '400px' }"
    >
      <template #modal-body>
        <div class="row">
          <span class="col-12 mb-2">
            <b>Docente:</b>
            {{ edit.docente ? edit.docente.nome : "" }}
          </span>
          <span class="col-12">
            <b>Disciplina:</b>
            {{ edit.disciplina ? edit.disciplina.nome : "" }}
          </span>
        </div>

        <VSelect
          label="Preferência"
          v-model.number="preferenciaForm.preferencia"
          :validation="$v.preferenciaForm.preferencia"
        >
          <VOption
            v-for="preferencia in [0, 1, 2, 3]"
            :key="preferencia"
            :value="preferencia"
            :text="`${preferencia} - ${preferenciaText(preferencia)}`"
          />
        </VSelect>
      </template>

      <template #modal-footer>
        <BaseButton color="lightblue" text="Salvar" class="ml-auto" @click="handleEditPrefs" />
      </template>
    </BaseModal>

    <BaseModal
      ref="modalAddPref"
      class="modal-pref"
      :title="
        tableMode === 'docente'
          ? 'Adicionar preferência ao docente'
          : 'Adicionar preferência à disciplina'
      "
      position="right"
      hasFooter
      :styles="{ width: '400px' }"
    >
      <template #modal-body>
        <template v-if="tableMode === 'disciplina'">
          <div class="form-row w-100">
            <span class="w-100">
              <b>Disciplina:</b>
              {{ add.Disciplina ? add.Disciplina.nome : "" }}
            </span>
          </div>

          <div class="row">
            <div class="col">
              <VSelect label="Docente" v-model.number="add.Docente" :validation="$v.add.Docente">
                <VOption
                  v-for="docente in DocentesAtivos"
                  :key="docente.id + docente.nome"
                  :value="docente.id"
                  :text="docente.apelido"
                />
              </VSelect>
            </div>
            <div class="col">
              <VSelect
                label="Preferência"
                v-model.number="add.preferencia"
                :validation="$v.add.preferencia"
              >
                <VOption
                  v-for="preferencia in [0, 1, 2, 3]"
                  :key="preferencia"
                  :value="preferencia"
                  :text="`${preferencia} - ${preferenciaText(preferencia)}`"
                />
              </VSelect>
            </div>
          </div>
        </template>

        <template v-else-if="tableMode === 'docente'">
          <div class="row">
            <span class="col">
              <b>Docente:</b>
              {{ add.Docente ? add.Docente.apelido : "" }}
            </span>
          </div>

          <VSelect
            label="Disciplina"
            v-model.number="add.Disciplina"
            :validation="$v.add.Disciplina"
          >
            <VOption
              v-for="disciplina in DisciplinasDCCOrderedByNome"
              :key="disciplina.id + disciplina.codigo"
              :value="disciplina.id"
              :text="disciplina.nome"
            />
          </VSelect>

          <div class="row">
            <div class="col">
              <VSelect
                label="Código"
                v-model.number="add.Disciplina"
                :validation="$v.add.Disciplina"
              >
                <VOption
                  v-for="disciplina in DisciplinasDCCOrderedByNome"
                  :key="disciplina.id + disciplina.codigo"
                  :value="disciplina.id"
                  :text="disciplina.codigo"
                />
              </VSelect>
            </div>
            <div class="col">
              <VSelect
                label="Preferência"
                v-model.number="add.preferencia"
                :validation="$v.add.preferencia"
              >
                <VOption
                  v-for="preferencia in [0, 1, 2, 3]"
                  :key="preferencia"
                  :value="preferencia"
                  :text="`${preferencia} - ${preferenciaText(preferencia)}`"
                />
              </VSelect>
            </div>
          </div>
        </template>
      </template>

      <template #modal-footer>
        <BaseButton color="lightblue" text="Confirmar" class="ml-auto" @click="addPreferencia" />
      </template>
    </BaseModal>

    <BaseModal
      ref="modalNewPref"
      class="modal-pref"
      title="Nova Preferência"
      position="right"
      hasFooter
      :styles="{ width: '400px' }"
    >
      <template #modal-body>
        <VSelect label="Disciplina" v-model.number="add.Disciplina" :validation="$v.add.Disciplina">
          <VOption
            v-for="disciplina in DisciplinasDCCOrderedByNome"
            :key="disciplina.id + disciplina.codigo"
            :value="disciplina.id"
            :text="disciplina.nome"
          />
        </VSelect>

        <div class="row">
          <div class="col">
            <VSelect label="Código" v-model.number="add.Disciplina" :validation="$v.add.Disciplina">
              <VOption
                v-for="disciplina in DisciplinasDCCOrderedByNome"
                :key="disciplina.id + disciplina.codigo"
                :value="disciplina.id"
                :text="disciplina.codigo"
              />
            </VSelect>
          </div>

          <div class="col">
            <VSelect label="Docente" v-model.number="add.Docente" :validation="$v.add.Docente">
              <VOption
                v-for="docente in DocentesAtivos"
                :key="docente.id + docente.nome"
                :value="docente.id"
                :text="docente.apelido"
              />
            </VSelect>
          </div>
        </div>

        <div class="row">
          <div class="col-6">
            <VSelect
              label="Preferência"
              v-model.number="add.preferencia"
              :validation="$v.add.preferencia"
            >
              <VOption
                v-for="preferencia in [0, 1, 2, 3]"
                :key="preferencia"
                :value="preferencia"
                :text="`${preferencia} - ${preferenciaText(preferencia)}`"
              />
            </VSelect>
          </div>
        </div>
      </template>

      <template #modal-footer>
        <BaseButton color="lightblue" class="ml-auto" text="Confirmar" @click="addPreferencia" />
      </template>
    </BaseModal>

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
          >
            Nome
          </v-th-ordination>
        </template>

        <template #tbody>
          <tr
            v-for="perfil in PerfisOptionsOrdered"
            :key="perfil.id + perfil.nome"
            @click.stop="selectPerfis(perfil)"
          >
            <v-td width="25" type="content">
              <input
                type="checkbox"
                v-model="filtroPerfis.selecionados"
                :value="perfil"
                :indeterminate.prop="perfil.halfChecked"
                @click.stop="selectPerfis(perfil)"
              />
            </v-td>
            <v-td width="425" align="start">{{ perfil.nome }}</v-td>
          </tr>
        </template>
      </BaseTable>

      <BaseTable
        type="modal"
        v-show="modalFiltrosTabs.current === 'Disciplinas'"
        :hasSearchBar="true"
      >
        <template #thead-search>
          <VInputSearch
            v-model="searchDisciplinas"
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
          >
            Código
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoModal.disciplinas"
            orderToCheck="nome"
            width="270"
            align="start"
          >
            Nome
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoModal.disciplinas"
            orderToCheck="perfil.abreviacao"
            width="85"
            align="start"
          >
            Perfil
          </v-th-ordination>
        </template>

        <template #tbody>
          <tr
            v-for="disciplina in DisciplinasOptionsOrdered"
            :key="disciplina.id + disciplina.nome"
            @click="selectDisciplina(disciplina)"
            v-prevent-click-selection
          >
            <v-td width="25" type="content">
              <input
                type="checkbox"
                v-model="filtroDisciplinas.selecionados"
                :value="disciplina"
                @click.stop="selectDisciplina(disciplina)"
              />
            </v-td>
            <v-td width="70" align="start">{{ disciplina.codigo }}</v-td>
            <v-td align="start" width="270">
              {{ disciplina.nome }}
            </v-td>
            <v-td width="85" align="start">{{ disciplina.perfil.abreviacao }}</v-td>
          </tr>

          <tr v-if="!DisciplinasOptionsOrdered.length">
            <v-td colspan="3" width="450">NENHUMA DISCIPLINA ENCONTRADA.</v-td>
          </tr>
        </template>
      </BaseTable>

      <BaseTable v-show="modalFiltrosTabs.current === 'Docentes'" type="modal" :hasSearchBar="true">
        <template #thead-search>
          <VInputSearch
            v-model="searchDocentes"
            placeholder="Pesquise pelo apelido de um docente..."
          />
        </template>
        <template #thead>
          <v-th width="25" />
          <v-th-ordination
            :currentOrder="ordenacaoModal.docentes"
            orderToCheck="apelido"
            width="425"
            align="start"
          >
            Nome
          </v-th-ordination>
        </template>

        <template #tbody>
          <tr
            v-for="docente in DocentesOptionsOrdered"
            :key="docente.id + docente.apelido"
            @click="toggleItemInArray(docente, filtroDocentes.selecionados)"
            v-prevent-click-selection
          >
            <v-td width="25" type="content">
              <input type="checkbox" v-model="filtroDocentes.selecionados" :value="docente" />
            </v-td>
            <v-td width="425" align="start">{{ docente.apelido }}</v-td>
          </tr>
        </template>
      </BaseTable>
    </ModalFiltros>

    <BaseModal
      ref="modalUpload"
      class="modal-pref"
      title="Importar preferências"
      position="right"
      hasFooter
      :styles="{ width: '400px' }"
    >
      <template #modal-body>
        <VInputFile v-model="fileXlsxPrefs" :validation="$v.fileXlsxPrefs" accept=".xlsx" />
      </template>

      <template #modal-footer>
        <BaseButton color="lightblue" class="ml-auto" text="Importar" @click="importPrefs" />
      </template>
    </BaseModal>

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Adicionar preferência do docente:</b>
        Clique no ícone de adicionar
        <font-awesome-icon :icon="['fas', 'plus']" class="icon-green" />
        no cabeçalho da página. Em seguida, preencha a janela que se abrirá à direita e para
        finalizar clique no botão Confirmar. Para adicionar uma preferência diretamente numa linha
        da tabela clique no icone de adicionar
        <font-awesome-icon :icon="['fas', 'plus']" class="icon-darkgray" />
        na coluna Pref. (Preferência) da linha que deseja, preencha a janela que se abrirá à direita
        e para finalizar clique no botão Confirmar.
      </li>
      <li class="list-group-item">
        <b>Editar preferência do docente:</b>
        Clique no número da coluna Pref. (Preferência) na linha que deseja alterar. Em seguida, na
        janela que se abrirá à direita, altere as informações que desejar e clique em Salvar.
      </li>
      <li class="list-group-item">
        <b>Deletar preferência do docente:</b>
        Clique no número da coluna Pref. (Preferência) na linha que deseja remover. Em seguida, na
        janela que se abrirá à direita, coloque o valor de preferência como zero (Inapto).
      </li>
      <li class="list-group-item">
        <b>Alterar visualização da tabela:</b>
        Clique no ícone de alterar visualização
        <font-awesome-icon :icon="['fas', 'sync-alt']" class="icon-gray" />
        no cabeçalho da página para alterar a visualização das preferências entre docentes por
        disciplinas, ou disciplinas por docentes.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import XLSX from "xlsx";
import { mapGetters } from "vuex";
import { union, difference, find, filter, orderBy, map } from "lodash-es";
import { required, integer } from "vuelidate/lib/validators";
import { normalizeText } from "@/common/utils";
import docenteDisciplinaService from "@/services/docenteDisciplina";
import { ModalAjuda, ModalFiltros } from "@/components/modals";
import {
  toggleAsideModal,
  conectaFiltroPerfisEDisciplinas,
  preventClickSelection,
} from "@/common/mixins";
import { VSelect, VOption, VInputFile, VInputSearch } from "@/components/ui";

export default {
  name: "PreferenciasDocentes",
  components: {
    ModalAjuda,
    VInputFile,
    VSelect,
    VOption,
    ModalFiltros,
    VInputSearch,
  },
  mixins: [toggleAsideModal, conectaFiltroPerfisEDisciplinas, preventClickSelection],
  data() {
    return {
      searchDisciplinas: "",
      searchDocentes: "",
      asideModalsRefs: [
        "modalAjuda",
        "modalAddPref",
        "modalEditPref",
        "modalNewPref",
        "modalUpload",
        "modalFiltros",
      ],
      ordenacaoModal: {
        perfis: { order: "nome", type: "asc" },
        disciplinas: { order: "codigo", type: "asc" },
        docentes: { order: "apelido", type: "asc" },
      },
      filtroDisciplinas: {
        ativados: [],
        selecionados: [],
      },
      filtroPerfis: {
        selecionados: [],
      },
      filtroDocentes: {
        ativados: [],
        selecionados: [],
      },
      modalFiltrosTabs: {
        current: "Perfis",
        array: ["Perfis", "Disciplinas", "Docentes"],
      },
      modalFiltrosCallbacks: {
        selectAll: {
          Perfis: () => {
            this.filtroDisciplinas.selecionados = [...this.DisciplinasOptions];
            this.filtroPerfis.selecionados = [...this.PerfisOptions];
          },
          Disciplinas: () => {
            this.filtroDisciplinas.selecionados = union(
              this.DisciplinasOptionsFiltered,
              this.filtroDisciplinas.selecionados
            );
            this.conectaDisciplinasEmPerfis();
          },
          Docentes: () => {
            this.filtroDocentes.selecionados = union(
              this.filtroDocentes.selecionados,
              this.DocentesOptionsFiltered
            );
          },
        },
        selectNone: {
          Docentes: () => {
            this.filtroDocentes.selecionados = difference(
              this.filtroDocentes.selecionados,
              this.DocentesOptionsFiltered
            );
          },
          Perfis: () => {
            this.filtroPerfis.selecionados = [];
            this.filtroDisciplinas.selecionados = [];
          },
          Disciplinas: () => {
            this.filtroDisciplinas.selecionados = difference(
              this.filtroDisciplinas.selecionados,
              this.DisciplinasOptionsFiltered
            );
            this.conectaDisciplinasEmPerfis();
          },
        },
        btnOk: () => {
          this.filtroDisciplinas.ativados = [...this.filtroDisciplinas.selecionados];
          this.filtroDocentes.ativados = [...this.filtroDocentes.selecionados];
        },
      },
      fileXlsxPrefs: null,
      preferenciaForm: {
        Docente: null,
        Disciplina: null,
        preferencia: null,
      },
      edit: {
        docente: null,
        disciplina: null,
        isZero: null,
      },
      add: {
        Docente: null,
        Disciplina: null,
        preferencia: 0,
      },
      error: null,
      tableMode: "docente",
      ordenacaoDocentes: {
        docentes: { order: "apelido", type: "asc" },
        disciplinas: { order: "disciplina.codigo", type: "asc" },
        pref: { order: "preferencia", type: "desc" },
      },
      ordenacaoDisciplina: {
        disciplinas: { order: "codigo", type: "asc" },
        docentes: { order: "docente.nome", type: "asc" },
        pref: { order: "preferencia", type: "desc" },
      },
    };
  },
  beforeMount() {
    this.modalFiltrosCallbacks.selectAll.Perfis();
    this.modalFiltrosCallbacks.selectAll.Disciplinas();
    this.modalFiltrosCallbacks.selectAll.Docentes();
    this.modalFiltrosCallbacks.btnOk();
  },

  validations: {
    fileXlsxPrefs: { required },
    preferenciaForm: {
      Docente: { required },
      Disciplina: { required },
      preferencia: { required, integer },
    },
    edit: {
      docente: { required },
      disciplina: { required, integer },
    },
    add: {
      Docente: { required },
      Disciplina: { required },
      preferencia: { required, integer },
    },
  },
  methods: {
    preferenciaText(preferencia) {
      switch (preferencia) {
      case 0:
        return "Inapto";
      case 1:
        return "Emergência";
      case 2:
        return "Confortável";
      case 3:
        return "Interesse";
      default:
        break;
      }
    },
    toggleTableMode() {
      if (this.tableMode === "docente") this.tableMode = "disciplina";
      else this.tableMode = "docente";
      this.$refs.modalNewPref.close();
      this.$refs.modalAddPref.close();
      this.$refs.modalEditPref.close();
    },
    closeAllModals() {
      this.asideModalsRefs.forEach((ref) => {
        this.$refs[ref].close();
      });
    },
    openModalEditPreferencia(preferencia) {
      this.edit.docente = { ...preferencia.docente };
      this.edit.disciplina = { ...preferencia.disciplina };
      let p = preferencia.preferencia;
      if (p === 0) {
        this.edit.isZero = true;
      } else {
        this.edit.isZero = false;
      }
      this.preferenciaForm = {
        Docente: preferencia.Docente,
        Disciplina: preferencia.Disciplina,
        preferencia: p,
      };
      this.closeAllModals();
      this.$nextTick(() => this.$v.$reset());
      this.$refs.modalEditPref.open();
    },
    openModalAddPreferencia(data) {
      if (this.tableMode === "disciplina") {
        this.add.Disciplina = data;
      } else {
        this.add.Docente = data;
      }
      this.closeAllModals();
      this.$nextTick(() => this.$v.$reset());
      this.$refs.modalAddPref.open();
    },
    findPreferencia(docente, disciplina) {
      let preferenciaFounded = find(this.PreferenciasDocentes, {
        Docente: docente.id,
        Disciplina: disciplina.id,
      });
      return preferenciaFounded ? preferenciaFounded.preferencia : 0;
    },
    addPreferencia() {
      this.$v.add.$touch();
      if (this.$v.add.$anyError) return;
      const preferenciaToAdd = { ...this.add };
      if (this.add.Docente.id) preferenciaToAdd.Docente = this.add.Docente.id;
      if (this.add.Disciplina.id) preferenciaToAdd.Disciplina = this.add.Disciplina.id;
      docenteDisciplinaService
        .create(preferenciaToAdd)
        .then(() => {
          this.pushNotification({
            type: "success",
            text: "Preferência adicionada com sucesso!",
          });
        })
        .catch(() => {
          this.pushNotification({
            type: "error",
            title: "Erro ao adicionar preferência!",
            text: "Verifique se a preferência já não existe",
          });
        });
    },
    handleEditPrefs() {
      this.$v.preferenciaForm.$touch();
      if (this.$v.preferenciaForm.$anyError) return;
      if (this.edit.isZero) {
        if (this.preferenciaForm.preferencia != 0) {
          docenteDisciplinaService
            .create(this.preferenciaForm)
            .then(() => {
              this.pushNotification({
                type: "success",
                text: "Preferência atualizada com sucesso!",
              });
            })
            .catch((error) => {
              this.error = "<b>Erro ao atualizar Preferência</b>";
              if (error.response.data.fullMessage) {
                this.error += "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
              }
              this.pushNotification({
                type: "error",
                text: this.error,
              });
            });
          this.edit.isZero = false;
        }
      } else {
        if (
          this.preferenciaForm.preferencia !=
          this.findPreferencia(this.edit.docente, this.edit.disciplina)
        ) {
          if (this.preferenciaForm.preferencia == 0) {
            docenteDisciplinaService
              .delete(this.preferenciaForm.Disciplina, this.preferenciaForm.Docente)
              .then(() => {
                this.pushNotification({
                  type: "success",
                  text: "Preferência atualizada com sucesso!",
                });
              })
              .catch((error) => {
                this.error = "<b>Erro ao atualizar Preferência</b>";
                if (error.response.data.fullMessage) {
                  this.error += "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
                }
                this.pushNotification({
                  type: "error",
                  text: this.error,
                });
              });
            this.edit.isZero = true;
          } else {
            docenteDisciplinaService
              .update(
                this.preferenciaForm.Disciplina,
                this.preferenciaForm.Docente,
                this.preferenciaForm
              )
              .then(() => {
                this.pushNotification({
                  type: "success",
                  text: "Preferência atualizada com sucesso!",
                });
              })
              .catch((error) => {
                this.error = "<b>Erro ao atualizar Preferência</b>";
                if (error.response.data.fullMessage) {
                  this.error += "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
                }
                this.pushNotification({
                  type: "error",
                  text: this.error,
                });
              });
          }
        }
      }
    },
    importPrefs() {
      this.$v.fileXlsxPrefs.$touch();
      if (this.$v.fileXlsxPrefs.$anyError) return;
      const reader = new FileReader();
      const docentes = this.DocentesAtivos;
      const disciplinas = this.DisciplinasDCC;
      const preferencias = this.PreferenciasDocentes;
      reader.onload = function(e) {
        const workbook = XLSX.read(e.target.result, { type: "binary" });
        let first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
        let prefs = XLSX.utils.sheet_to_json(first_worksheet);
        let disciplinasFields = filter(
          XLSX.utils.sheet_to_csv(first_worksheet).split(","),
          function(p) {
            return p.substring(0, 11) === "Disciplinas";
          }
        );
        let disciplinasCods = [];
        for (let i = 0; i < disciplinasFields.length; i++) {
          let start = disciplinasFields[i].indexOf("[");
          let end = disciplinasFields[i].indexOf("\t");
          let disc = find(disciplinas, {
            codigo: disciplinasFields[i].substring(start + 1, end),
          });
          disciplinasCods.push(disc);
          if (!disc) {
            console.log(disciplinasFields[i] + " não existe no sistema");
          }
        }
        for (let i = 0; i < prefs.length; i++) {
          let docente = find(docentes, {
            nome: prefs[i].Nome.toUpperCase(),
          });
          if (docente) {
            for (let j = 0; j < disciplinasFields.length; j++) {
              if (disciplinasCods[j]) {
                let prefdisc = find(preferencias, {
                  Docente: docente.id,
                  Disciplina: disciplinasCods[j].id,
                });
                if (prefs[i][disciplinasFields[j]] && prefs[i][disciplinasFields[j]] != 0) {
                  let prefDiscForm = {
                    Docente: docente.id,
                    Disciplina: disciplinasCods[j].id,
                    preferencia: prefs[i][disciplinasFields[j]],
                  };
                  if (prefdisc) {
                    if (prefdisc.preferencia != prefDiscForm.preferencia) {
                      docenteDisciplinaService.update(
                        prefdisc.Disciplina,
                        prefdisc.Docente,
                        prefDiscForm
                      );
                    }
                  } else {
                    docenteDisciplinaService.create(prefDiscForm);
                  }
                } else {
                  if (prefdisc) {
                    docenteDisciplinaService.delete(prefdisc.Disciplina, prefdisc.Docente);
                  }
                }
              }
            }
          }
        }
      };
      reader.readAsBinaryString(this.fileXlsxPrefs);
      this.$refs.modalUpload.close();
    },
  },
  computed: {
    ...mapGetters(["DocentesAtivos", "DisciplinasDCC", "PreferenciasDocentes", "PerfisDCC"]),

    DocentesInPreferenciasOrdered() {
      const disciplinasOrd = this.ordenacaoDocentes.disciplinas;
      const docentesOrd = this.ordenacaoDocentes.docentes;
      const preferenciaOrd = this.ordenacaoDocentes.pref;
      const docentesOrdered = map(this.DocentesInPreferencias, (docente) => {
        return {
          ...docente,
          preferencias: orderBy(
            docente.preferencias,
            [preferenciaOrd.order, disciplinasOrd.order],
            [preferenciaOrd.type, disciplinasOrd.type]
          ),
        };
      });
      return orderBy(docentesOrdered, docentesOrd.order, docentesOrd.type);
    },
    DocentesInPreferencias() {
      const docentesResult = [];
      this.DocentesFiltered.forEach((docente) => {
        const preferenciasDoDocente = filter(this.DisciplinasFiltered, ["Docente", docente.id]);
        if (preferenciasDoDocente.length)
          docentesResult.push({
            ...preferenciasDoDocente[0].docente,
            preferencias: preferenciasDoDocente,
          });
      });
      return docentesResult;
    },
    DisciplinasInPreferenciasOrdered() {
      const docentesOrd = this.ordenacaoDisciplina.docentes;
      const disciplinasOrd = this.ordenacaoDisciplina.disciplinas;
      const preferenciaOrd = this.ordenacaoDisciplina.pref;
      const disciplinasOrdered = map(this.DisciplinasInPreferencias, (disciplina) => {
        return {
          ...disciplina,
          preferencias: orderBy(
            disciplina.preferencias,
            [preferenciaOrd.order, docentesOrd.order],
            [preferenciaOrd.type, docentesOrd.type]
          ),
        };
      });
      return orderBy(disciplinasOrdered, disciplinasOrd.order, disciplinasOrd.type);
    },
    DisciplinasInPreferencias() {
      const disciplinasResult = [];
      this.DisciplinasDCC.forEach((disciplina) => {
        const preferenciasDaDisciplina = filter(this.DisciplinasFiltered, [
          "Disciplina",
          disciplina.id,
        ]);
        if (preferenciasDaDisciplina.length)
          disciplinasResult.push({
            ...preferenciasDaDisciplina[0].disciplina,
            preferencias: preferenciasDaDisciplina,
          });
      });
      return disciplinasResult;
    },
    DisciplinasFiltered() {
      if (!this.filtroDisciplinas.ativados.length) return [];

      const preferenciasDocente = []; //Disciplinas selecionadas no filtro

      this.PreferenciasDocentes.forEach((preferencia) => {
        if (
          this.filtroDisciplinas.ativados.includes(preferencia.disciplina) &&
          this.filtroDocentes.ativados.includes(preferencia.docente)
        ) {
          preferenciasDocente.push(preferencia);
        }
      });
      return preferenciasDocente;
    },
    DocentesFiltered() {
      if (!this.filtroDocentes.ativados.length) return [];

      const docentesFiltrados = []; //Docentes selecionados no filtro

      this.DocentesAtivos.forEach((docente) => {
        if (this.filtroDocentes.ativados.includes(docente)) {
          docentesFiltrados.push(docente);
        }
      });
      return docentesFiltrados;
    },
    DisciplinasDCCOrderedByNome() {
      return orderBy(this.DisciplinasDCC, ["nome"]);
    },
    DisciplinasDCCOrderedByCodigo() {
      return orderBy(this.DisciplinasDCC, ["codigo"]);
    },
    //Modal Options
    PerfisOptionsOrdered() {
      return orderBy(
        this.PerfisOptions,
        this.ordenacaoModal.perfis.order,
        this.ordenacaoModal.perfis.type
      );
    },
    PerfisOptions() {
      return this.PerfisDCC.map((perfil) => {
        const todasDisciplinasDoPerfil = filter(this.DisciplinasOptions, ["Perfil", perfil.id]);
        const disciplinasSelecionadas = filter(this.filtroDisciplinas.selecionados, [
          "Perfil",
          perfil.id,
        ]);

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
    DisciplinasOptionsFiltered() {
      if (this.searchDisciplinas === "") return this.DisciplinasOptions;

      const searchNormalized = normalizeText(this.searchDisciplinas);

      return filter(this.DisciplinasOptions, (disciplina) => {
        const nome = normalizeText(disciplina.nome);
        const codigo = normalizeText(disciplina.codigo);

        return nome.match(searchNormalized) || codigo.match(searchNormalized);
      });
    },
    DisciplinasOptionsOrdered() {
      return orderBy(
        this.DisciplinasOptionsFiltered,
        this.ordenacaoModal.disciplinas.order,
        this.ordenacaoModal.disciplinas.type
      );
    },
    DisciplinasOptions() {
      return this.DisciplinasDCC;
    },
    DocentesOptionsOrdered() {
      return orderBy(
        this.DocentesOptionsFiltered,
        this.ordenacaoModal.docentes.order,
        this.ordenacaoModal.docentes.type
      );
    },
    DocentesOptionsFiltered() {
      if (this.searchDocentes === "") return this.DocentesAtivos;

      const searchNormalized = normalizeText(this.searchDocentes);

      return this.DocentesAtivos.filter((docente) => {
        const docenteApelido = normalizeText(docente.apelido);

        return docenteApelido.match(searchNormalized);
      });
    },
  },
};
</script>

<style scoped>
.td-pref:hover {
  color: #1a79b2;
  text-decoration: underline;
  cursor: pointer;
}
.modal-pref {
  font-size: 14px;
}
.modal-pref span {
  text-align: start;
}
.modal-pref .form-control {
  width: 100%;
  height: 28px;
  font-size: 12px;
  padding: 0 5px;
  text-align: start;
}
.modal-pref .form-row {
  margin: 0;
  padding: 0;
  margin-bottom: 0.75rem;
}
.modal-pref .form-group {
  margin: 0;
  padding: 0;
}
.modal-pref label {
  font-weight: bold;
}
</style>
