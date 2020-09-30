<template>
  <div class="main-component row">
    <PageHeader :title="'Disciplinas'">
      <BaseButton template="ajuda" @click="$refs.modalAjuda.toggle()" />
    </PageHeader>

    <div class="page-content">
      <div class="div-table">
        <BaseTable>
          <template #thead>
            <v-th-ordination
              :currentOrder="ordenacaoMain.disciplina"
              orderToCheck="codigo"
              width="85"
              align="start"
            >
              Código
            </v-th-ordination>

            <v-th-ordination
              :currentOrder="ordenacaoMain.disciplina"
              orderToCheck="nome"
              width="300"
              align="start"
            >
              Nome
            </v-th-ordination>

            <v-th-ordination
              :orderFixed="true"
              :currentOrder="ordenacaoMain.perfil"
              orderToCheck="perfil.abreviacao"
              width="80"
              align="start"
            >
              Perfil
            </v-th-ordination>

            <v-th width="40" title="Carga Teórica">
              C.T.
            </v-th>
            <v-th width="40" title="Carga Prática">
              C.P.
            </v-th>

            <v-th-ordination
              :currentOrder="ordenacaoMain.disciplina"
              orderToCheck="ead"
              orderType="desc"
              width="70"
            >
              EAD
            </v-th-ordination>

            <v-th-ordination
              :currentOrder="ordenacaoMain.disciplina"
              orderToCheck="laboratorio"
              orderType="desc"
              width="70"
              title="Laborátorio"
            >
              Lab.
            </v-th-ordination>

            <v-th-ordination
              :currentOrder="ordenacaoMain.disciplina"
              orderToCheck="departamento"
              width="70"
              title="Departamento"
            >
              Depto.
            </v-th-ordination>
          </template>
          <template #tbody>
            <tr
              v-for="disciplina in DisciplinasInPerfisOrdered"
              :key="disciplina.id + disciplina.nome"
              @click="handleClickInDisciplina(disciplina)"
              :class="['clickable', disciplinaEstaSelecionada(disciplina.id)]"
            >
              <v-td width="85" align="start">
                {{ disciplina.codigo }}
              </v-td>
              <v-td width="300" align="start">
                {{ disciplina.nome }}
              </v-td>
              <v-td width="80" align="start">
                {{ disciplina.perfil.abreviacao }}
              </v-td>
              <v-td width="40">
                {{ disciplina.cargaTeorica }}
              </v-td>
              <v-td width="40">
                {{ disciplina.cargaPratica }}
              </v-td>
              <v-td width="70">
                {{ textoEad(disciplina.ead) }}
              </v-td>
              <v-td width="70">
                {{ textoLab(disciplina.laboratorio) }}
              </v-td>
              <v-td width="70">
                {{ textoDepto(disciplina.departamento) }}
              </v-td>
            </tr>
            <tr v-if="!DisciplinasInPerfisOrdered.length">
              <v-td width="755" colspan="8">
                <font-awesome-icon
                  :icon="['fas', 'exclamation-triangle']"
                  class="icon-red"
                />
                <b> Nenhuma disciplina encontrada!</b>
              </v-td>
            </tr>
          </template>
        </BaseTable>
      </div>

      <Card
        :title="'Disciplina'"
        :toggleFooter="isEditing"
        @btn-salvar="handleEditDisciplina"
        @btn-delete="openModalDelete"
        @btn-add="handleCreateDisciplina"
        @btn-clean="cleanForm"
      >
        <template #form-group>
          <div class="row mb-2 mx-0">
            <div class="form-group m-0 col px-0">
              <label required for="nome" class="col-form-label">Nome</label>
              <input
                type="text"
                id="nome"
                class="form-control form-control-sm input-maior upper-case"
                :value="disciplinaForm.nome"
                @input="disciplinaForm.nome = $event.target.value.toUpperCase()"
              />
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-group m-0 col px-0">
              <label required for="codigo" class="col-form-label">Código</label>
              <input
                type="text"
                id="codigo"
                class="form-control form-control-sm input-medio upper-case"
                :value="disciplinaForm.codigo"
                @input="disciplinaForm.codigo = $event.target.value.toUpperCase()"
              />
            </div>
            <div class="form-group m-0 col px-0">
              <label required for="perfil" class="col-form-label">Perfil</label>
              <select
                type="text"
                id="perfil"
                style="width:100%"
                class="form-control form-control-sm"
                v-model="disciplinaForm.Perfil"
              >
                <option v-if="AllPerfis.length === 0" type="text" value
                  >Nenhum Perfil Encontrado</option
                >
                <option value="" v-if="disciplinaForm.departamento === 2"></option>
                <option
                  v-for="perfil in AllPerfis"
                  :key="perfil.id + perfil.nome"
                  :value="perfil.id"
                  >{{ perfil.abreviacao }}</option
                >
              </select>
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-group m-0 col px-0">
              <label required for="cargaTeorica" class="col-form-label"
                >Carga Teórica</label
              >
              <input
                type="number"
                min="0"
                id="cargaTeorica"
                class="form-control form-control-sm input-medio t-center"
                v-model.number="disciplinaForm.cargaTeorica"
                @keypress="maskOnlyNumber"
                @blur="maskEmptyToZero($event, disciplinaForm, 'cargaTeorica')"
              />
            </div>

            <div class="form-group m-0 col px-0">
              <label required for="cargaPratica" class="col-form-label"
                >Carga Prática</label
              >
              <input
                type="number"
                min="0"
                id="cargaPratica"
                class="form-control form-control-sm input-medio t-center"
                v-model.number="disciplinaForm.cargaPratica"
                @keypress="maskOnlyNumber"
                @blur="maskEmptyToZero($event, disciplinaForm, 'cargaPratica')"
              />
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label required for="laboratorio" class="col-form-label"
                >Laboratório</label
              >
              <select
                type="text"
                class="form-control form-control-sm input-medio"
                id="laboratorio"
                v-model.number="disciplinaForm.laboratorio"
              >
                <option value="0">Não</option>
                <option value="1">Sim</option>
                <option value="2">Desejável</option>
              </select>
            </div>
            <div class="form-group col m-0 px-0">
              <label required for="ead" class="col-form-label">EAD</label>
              <select
                type="text"
                class="form-control form-control-sm input-medio"
                id="ead"
                v-model.number="disciplinaForm.ead"
              >
                <option value="0">Não</option>
                <option value="1">Integral</option>
                <option value="2">Parcial</option>
              </select>
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label required for="departamento" class="col-form-label">
                Departamento
              </label>
              <select
                type="text"
                class="form-control form-control-sm input-medio"
                id="departamento"
                v-model.number="disciplinaForm.departamento"
              >
                <option value="1">{{ textoDepto(1) }}</option>
                <option value="2">{{ textoDepto(2) }}</option>
              </select>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <ModalDelete
      ref="modalDelete"
      :isDeleting="isEditing"
      @btn-deletar="handleDeleteDisciplina"
    >
      <li v-if="isEditing" class="list-group-item">
        <span>
          Tem certeza que deseja excluír a disciplina
          <b>{{ disciplinaForm.codigo }} - {{ disciplinaForm.nome }}</b
          >?
        </span>
      </li>
      <li v-else class="list-group-item">Nenhuma disciplina selecionada.</li>
    </ModalDelete>

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Adicionar:</b>
        Preencha o cartão em branco à direita e em seguida, clique em Adicionar
        <font-awesome-icon :icon="['fas', 'plus']" class="icon-green" />.
      </li>
      <li class="list-group-item">
        <b>Editar:</b> Clique na linha da tabela da disciplina que deseja alterar. Em
        seguida, no cartão à direita, altere as informações que desejar e clique em
        Salvar <font-awesome-icon :icon="['fas', 'check']" class="icon-green" />.
      </li>
      <li class="list-group-item">
        <b>Deletar:</b> Clique na linha da tabela da disciplina que deseja remover.
        Em seguida, no cartão à direita, clique em Remover
        <font-awesome-icon :icon="['fas', 'trash-alt']" class="icon-red" /> e
        confirme a remoção na janela que será aberta.
      </li>
      <li class="list-group-item">
        <b>Limpar:</b> No cartão à direita, clique em Cancelar
        <font-awesome-icon :icon="['fas', 'times']" class="icon-gray" />, para limpar
        as informações.
      </li>
      <li class="list-group-item">
        <b>Ordenar:</b> Clique no cabeçalho da tabela, na coluna desejada, para
        alterar a ordenação das informações.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { maskOnlyNumber, maskEmptyToZero } from "@/common/mixins";
import { ModalDelete, ModalAjuda } from "@/components/modals";
import { Card } from "@/components/ui";

const emptyDisciplina = {
  id: null,
  nome: "",
  codigo: "",
  Perfil: "",
  cargaTeorica: 0,
  cargaPratica: 0,
  laboratorio: 0,
  ead: 0,
  departamento: 1,
};

export default {
  name: "DashboardDisciplina",
  mixins: [maskOnlyNumber, maskEmptyToZero],
  components: { Card, ModalDelete, ModalAjuda },
  data() {
    return {
      disciplinaSelecionada: "",
      disciplinaForm: this.$_.clone(emptyDisciplina),
      ordenacaoMain: {
        disciplina: { order: "codigo", type: "asc" },
        perfil: { order: null, type: "asc" },
      },
    };
  },

  methods: {
    ...mapActions(["createDisciplina", "editDisciplina", "deleteDisciplina"]),

    handleClickInDisciplina(disciplina) {
      this.cleanForm();
      this.disciplinaSelecionada = disciplina.id;
      this.disciplinaForm = this.$_.clone(disciplina);
    },
    cleanForm() {
      this.disciplinaSelecionada = "";
      this.disciplinaForm = this.$_.clone(emptyDisciplina);
    },
    disciplinaEstaSelecionada(disciplinaId) {
      return this.disciplinaSelecionada === disciplinaId ? "bg-selected" : "";
    },
    openModalDelete() {
      this.$refs.modalDelete.open();
    },
    textoLab(lab) {
      if (lab == 0) return "-";
      if (lab == 1) return "Sim";
      if (lab == 2) return "Desejável";
    },
    textoEad(ead) {
      if (ead == 0) return "-";
      if (ead == 1) return "Integral";
      if (ead == 2) return "Parcial";
    },
    textoDepto(dpto) {
      if (dpto === 1) return "DCC";
      if (dpto === 2) return "Outro";
    },

    async handleCreateDisciplina() {
      try {
        this.setPartialLoading(true);
        await this.createDisciplina(this.disciplinaForm);
        this.cleanForm();
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao criar nova disciplina!",
          text: error.message || "",
        });
      } finally {
        this.setPartialLoading(false);
      }
    },
    async handleEditDisciplina() {
      try {
        this.setPartialLoading(true);
        await this.editDisciplina(this.disciplinaForm);
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao atualiza disciplina!",
          text: error.message || "",
        });
      } finally {
        this.setPartialLoading(false);
      }
    },
    async handleDeleteDisciplina() {
      try {
        this.setPartialLoading(true);
        await this.deleteDisciplina(this.disciplinaForm);
        this.cleanForm();
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao deletar disciplina!",
          text: error.message || "",
        });
      } finally {
        this.setPartialLoading(false);
      }
    },
  },

  computed: {
    ...mapGetters(["DisciplinasInPerfis", "AllPerfis"]),

    DisciplinasInPerfisOrdered() {
      const disciplinasResultantes = this.$_.orderBy(
        this.DisciplinasInPerfis,
        this.ordenacaoMain.disciplina.order,
        this.ordenacaoMain.disciplina.type
      );

      if (this.ordenacaoMain.perfil.order !== null) {
        return this.$_.orderBy(
          disciplinasResultantes,
          this.ordenacaoMain.perfil.order,
          this.ordenacaoMain.perfil.type
        );
      }
      return disciplinasResultantes;
    },
    isEditing() {
      return this.disciplinaForm.id !== null;
    },
  },
};
</script>

<style scoped>
.card .input-maior {
  width: 280px;
}
.card .input-medio {
  width: 100px;
}
.card .input-menor {
  width: 80px;
  text-align: center !important;
}
</style>
