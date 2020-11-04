<template>
  <div class="main-component row">
    <PageHeader :title="'Grades'">
      <BaseButton template="ajuda" @click="$refs.modalAjuda.toggle()" />
    </PageHeader>

    <div class="page-content">
      <div class="div-table">
        <BaseTable :styles="'height:max-content'">
          <template #thead>
            <v-th width="220">Cursos</v-th>
            <v-th width="100">Grades</v-th>
          </template>

          <template #tbody>
            <tr class="bg-custom">
              <v-td width="220">Ciência da Computação Diurno</v-td>
              <v-td width="100" />
            </tr>

            <tr
              v-for="grade in GradesCCD"
              :key="grade.id + grade.nome + grade.Curso"
              :class="['clickable', { 'bg-selected': gradeSelected === grade.id }]"
              @click="showGrade(grade)"
            >
              <v-td width="220" />
              <v-td width="100">{{ grade.nome }}</v-td>
            </tr>

            <tr class="bg-custom">
              <v-td width="220">Ciência da Computação Noturno</v-td>
              <v-td width="100" />
            </tr>
            <tr
              v-for="grade in GradesCCN"
              :key="grade.id + grade.nome + grade.Curso"
              :class="['clickable', { 'bg-selected': gradeSelected === grade.id }]"
              @click="showGrade(grade)"
            >
              <v-td width="220" />
              <v-td width="100">{{ grade.nome }}</v-td>
            </tr>

            <tr class="bg-custom">
              <v-td width="220">Sistemas de informação</v-td>
              <v-td width="100" />
            </tr>
            <tr
              v-for="grade in GradesSI"
              :key="grade.id + grade.nome + grade.Curso"
              :class="['clickable', { 'bg-selected': gradeSelected === grade.id }]"
              @click="showGrade(grade)"
            >
              <v-td width="220" />
              <v-td width="100">{{ grade.nome }}</v-td>
            </tr>

            <tr class="bg-custom">
              <v-td width="220">Engenharia da Computação</v-td>
              <v-td width="100" />
            </tr>
            <tr
              v-for="grade in GradesEC"
              :key="grade.id + grade.nome + grade.Curso"
              :class="['clickable', { 'bg-selected': gradeSelected === grade.id }]"
              @click="showGrade(grade)"
            >
              <v-td width="220" />
              <v-td width="100">{{ grade.nome }}</v-td>
            </tr>

            <tr v-if="!GradesOrdered.length">
              <v-td width="320" colspan="2">Nenhuma grade encontrada</v-td>
            </tr>
          </template>
        </BaseTable>
      </div>

      <Card
        :title="'Curso'"
        :toggleFooter="isEditing"
        @btn-salvar="handleEditGrade"
        @btn-delete="openModalDelete"
        @btn-add="handleCreateGrade"
        @btn-clean="cleanGrade"
      >
        <template #form-group>
          <div class="row mb-2 mx-0">
            <div class="form-group col-5 m-0 px-0">
              <label required for="gradeNome" class="col-form-label">Nome</label>
              <input
                type="text"
                class="card-input-menor form-control form-control-sm"
                id="gradeNome"
                v-model="gradeForm.nome"
              />
            </div>

            <div class="form-group col-7 m-0 px-0">
              <label required for="periodoInicio" class="col-form-label">
                Período de Início
              </label>
              <input
                type="text"
                id="periodoInicio"
                class="card-input-menor form-control form-control-sm col"
                v-model="gradeForm.periodoInicio"
              />
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label required for="gradeCurso" class="col-form-label">gradeCurso</label>
              <select
                id="gradeCurso"
                class="form-control form-control-sm card-input-maior"
                v-model.number="gradeForm.Curso"
              >
                <option :value="4">Ciência da Computação Diurno</option>
                <option :value="1">Ciência da Computação Noturno</option>
                <option :value="3">Sistemas de Informação</option>
                <option :value="2">Engenharia Computacional</option>
              </select>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <ModalDelete
      ref="modalDelete"
      :isDeleting="isEditing"
      @btn-deletar="handleDeleteGrade"
    >
      <li v-if="isEditing" class="list-group-item">
        <span>
          Tem certeza que deseja excluír a grade
          <b>{{ gradeForm.periodoInicio }} - {{ gradeForm.nome }}</b> ?
        </span>
      </li>
      <li v-else class="list-group-item">Nenhuma grade selecionada.</li>
    </ModalDelete>

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Adicionar:</b>
        Preencha o cartão em branco à direita e em seguida, clique em Adicionar
        <font-awesome-icon :icon="['fas', 'plus']" class="icon-green" />.
      </li>
      <li class="list-group-item">
        <b>Editar:</b> Clique na linha da tabela da grade que deseja alterar. Em seguida,
        no cartão à direita, altere as informações que desejar e clique em Salvar
        <font-awesome-icon :icon="['fas', 'check']" class="icon-green" />.
      </li>
      <li class="list-group-item">
        <b>Deletar:</b> Clique na linha da tabela da grade que deseja remover. Em seguida,
        no cartão à direita, clique em Remover
        <font-awesome-icon :icon="['fas', 'trash-alt']" class="icon-red" /> e confirme a
        remoção na janela que será aberta.
      </li>
      <li class="list-group-item">
        <b>Limpar:</b> No cartão à direita, clique em Cancelar
        <font-awesome-icon :icon="['fas', 'times']" class="icon-gray" />, para limpar as
        informações.
      </li>
      <li class="list-group-item">
        <b>Ordenar:</b> Clique no cabeçalho da tabela, na coluna desejada, para alterar a
        ordenação das informações.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { maskOnlyNumber } from "@/common/mixins";
import { ModalDelete, ModalAjuda } from "@/components/modals";
import { Card } from "@/components/ui";
const emptyGrade = {
  id: null,
  periodoInicio: null,
  Curso: null,
  nome: null,
};

export default {
  name: "DashboardGrade",
  mixins: [maskOnlyNumber],
  components: { Card, ModalAjuda, ModalDelete },
  data() {
    return {
      gradeForm: this.$_.clone(emptyGrade),
      gradeSelected: null,
    };
  },

  methods: {
    ...mapActions(["createGrade", "editGrade", "deleteGrade"]),

    openModalDelete() {
      this.$refs.modalDelete.open();
    },
    cleanGrade() {
      this.gradeForm = this.$_.clone(emptyGrade);
      this.gradeSelected = null;
    },
    showGrade(grade) {
      this.cleanGrade();
      this.gradeSelected = grade.id;
      this.gradeForm = this.$_.clone(grade);
    },

    async handleCreateGrade() {
      try {
        this.setPartialLoading(true);
        await this.createGrade(this.gradeForm);
        this.cleanGrade();
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao criar nova grade!",
          text: error.message,
        });
      } finally {
        this.setPartialLoading(false);
      }
    },
    async handleEditGrade() {
      try {
        this.setPartialLoading(true);
        await this.editGrade(this.gradeForm);
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao atualizar grade!",
          text: error.message,
        });
      } finally {
        this.setPartialLoading(false);
      }
    },
    async handleDeleteGrade() {
      try {
        this.setPartialLoading(true);
        await this.deleteGrade(this.gradeForm);
        this.cleanGrade();
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao excluir grade!",
          text: error.response
            ? "Grade não pode possuir disciplinas cadastradas para ser excluída"
            : "",
        });
      } finally {
        this.setPartialLoading(false);
      }
    },
  },

  computed: {
    ...mapGetters(["AllGrades"]),

    GradesOrdered() {
      return this.$_.orderBy(this.AllGrades, "nome");
    },
    GradesCCN() {
      return this.$_.filter(this.GradesOrdered, ["Curso", 1]);
    },
    GradesEC() {
      return this.$_.filter(this.GradesOrdered, ["Curso", 2]);
    },
    GradesSI() {
      return this.$_.filter(this.GradesOrdered, ["Curso", 3]);
    },
    GradesCCD() {
      return this.$_.filter(this.GradesOrdered, ["Curso", 4]);
    },
    isEditing() {
      return this.gradeSelected != null;
    },
  },
};
</script>

<style scoped>
.card-input-maior {
  width: 210px;
}
.card-input-menor {
  width: 70px;
}
</style>
