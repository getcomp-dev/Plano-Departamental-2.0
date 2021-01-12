<template>
  <div class="main-component row">
    <portal to="page-header">
      <BaseButton template="ajuda" @click="$refs.modalAjuda.toggle()" />
    </portal>

    <div class="page-content">
      <div class="div-table">
        <BaseTable :styles="'height:max-content'">
          <template #thead>
            <v-th width="220">Cursos</v-th>
            <v-th width="100">Grades</v-th>
          </template>

          <template #tbody>
            <template v-for="curso in CursosComGrades">
              <tr class="bg-custom" :key="curso.id + curso.nome">
                <v-td width="220">{{ curso.nome }}</v-td>
                <v-td width="100" />
              </tr>
              <tr
                v-for="grade in gradesCurso(curso.id)"
                :key="grade.id + grade.nome + grade.Curso"
                :class="['clickable', { 'bg-selected': gradeSelected === grade.id }]"
                @click="showGrade(grade)"
              >
                <v-td width="220" />
                <v-td width="100">{{ grade.nome }}</v-td>
              </tr>
            </template>

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
            <div class="form-group col m-0 px-0">
              <label required for="gradeNome" class="col-form-label">Nome</label>
              <input
                type="text"
                class="form-control form-control-sm input-md"
                id="gradeNome"
                @change="gradeForm.nome = normalizeInputText($event)"
                :value="gradeForm.nome"
              />
            </div>

            <div class="form-group col m-0 px-0">
              <label required for="periodoInicio" class="col-form-label">Período de Início</label>
              <input
                type="text"
                id="periodoInicio"
                class="form-control form-control-sm input-md"
                v-model="gradeForm.periodoInicio"
              />
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label required for="gradeCurso" class="col-form-label">Curso externo</label>
              <select
                id="gradeCurso"
                class="form-control form-control-sm input-xl"
                v-model.number="gradeForm.Curso"
              >
                <option v-for="curso in CursosExternos" :key="curso.id" :value="curso.id">
                  {{ curso.nome }}
                </option>
              </select>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <ModalDelete ref="modalDelete" :isDeleting="isEditing" @btn-deletar="handleDeleteGrade">
      <li v-if="isEditing" class="list-group-item">
        <span>
          Tem certeza que deseja excluír a grade
          <b>{{ gradeForm.periodoInicio }} - {{ gradeForm.nome }}</b>
          ?
        </span>
      </li>
      <li v-else class="list-group-item">Nenhuma grade selecionada.</li>
    </ModalDelete>

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Adicionar:</b>
        Preencha o cartão em branco à direita e em seguida, clique em Adicionar
        <font-awesome-icon :icon="['fas', 'plus']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Editar:</b>
        Clique na linha da tabela da grade que deseja alterar. Em seguida, no cartão à direita,
        altere as informações que desejar e clique em Salvar
        <font-awesome-icon :icon="['fas', 'check']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Deletar:</b>
        Clique na linha da tabela da grade que deseja remover. Em seguida, no cartão à direita,
        clique em Remover
        <font-awesome-icon :icon="['fas', 'trash-alt']" class="icon-red" />
        e confirme a remoção na janela que será aberta.
      </li>
      <li class="list-group-item">
        <b>Limpar:</b>
        No cartão à direita, clique em Cancelar
        <font-awesome-icon :icon="['fas', 'times']" class="icon-gray" />
        , para limpar as informações.
      </li>
      <li class="list-group-item">
        <b>Ordenar:</b>
        Clique no cabeçalho da tabela, na coluna desejada, para alterar a ordenação das informações.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { clone, orderBy, filter } from "lodash-es";
import { normalizeInputText } from "@/common/mixins";
import { ModalDelete, ModalAjuda } from "@/components/modals";
import { Card } from "@/components/ui";
const emptyGrade = {
  id: null,
  periodoInicio: null,
  Curso: null,
  nome: null,
};

export default {
  name: "DashboardGradeCursosExternos",
  mixins: [normalizeInputText],
  components: { Card, ModalAjuda, ModalDelete },
  data() {
    return {
      gradeForm: clone(emptyGrade),
      gradeSelected: null,
    };
  },

  methods: {
    ...mapActions(["createGradeCursoExterno", "editGradeCursoExterno", "deleteGradeCursoExterno"]),

    openModalDelete() {
      this.$refs.modalDelete.open();
    },
    cleanGrade() {
      this.gradeForm = clone(emptyGrade);
      this.gradeSelected = null;
    },
    showGrade(grade) {
      this.cleanGrade();
      this.gradeSelected = grade.id;
      this.gradeForm = clone(grade);
    },

    gradesCurso(curso) {
      return filter(this.GradesOrdered, (g) => {
        return g.Curso === curso;
      });
    },

    cursoComGrade(c) {
      let check = false;
      this.AllGradesCursosExternos.forEach((g) => {
        if (g.Curso === c.id) {
          check = true;
          return;
        }
      });
      return check;
    },

    async handleCreateGrade() {
      try {
        this.setLoading({ type: "partial", value: true });
        await this.createGradeCursoExterno(this.gradeForm);
        this.cleanGrade();
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao criar nova grade!",
          text: error.message,
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
    async handleEditGrade() {
      try {
        this.setLoading({ type: "partial", value: true });
        await this.editGradeCursoExterno(this.gradeForm);
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao atualizar grade!",
          text: error.message,
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
    async handleDeleteGrade() {
      try {
        this.setLoading({ type: "partial", value: true });
        await this.deleteGradeCursoExterno(this.gradeForm);
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
        this.setLoading({ type: "partial", value: false });
      }
    },
  },

  computed: {
    ...mapGetters(["AllGradesCursosExternos", "AllCursos"]),

    GradesOrdered() {
      return orderBy(this.AllGradesCursosExternos, "nome");
    },

    CursosExternos() {
      return filter(this.AllCursos, (c) => {
        return c.id > 4 && c.id != 18 && c.id != 19;
      });
    },

    CursosComGrades() {
      return filter(this.AllCursos, this.cursoComGrade);
    },

    isEditing() {
      return this.gradeSelected != null;
    },
  },
};
</script>
