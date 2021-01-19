<template>
  <div class="main-component row">
    <portal to="page-header">
      <BaseButton template="ajuda" @click="$refs.modalAjuda.toggle()" />
    </portal>

    <div class="page-content">
      <div class="div-table">
        <BaseTable>
          <template #thead>
            <v-th-ordination
              :currentOrder="ordenacaoDisciplinasMain"
              orderToCheck="periodo"
              width="35"
              title="Período"
            >
              P.
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordenacaoDisciplinasMain"
              orderToCheck="disciplina.codigo"
              width="80"
              align="start"
            >
              Código
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordenacaoDisciplinasMain"
              orderToCheck="disciplina.nome"
              width="400"
              align="start"
            >
              Disciplina
            </v-th-ordination>
          </template>

          <template #tbody>
            <template v-for="disciplinaGrade in DisciplinaGradesOrdered">
              <tr
                @click.prevent="handleClickInDisciplina(disciplinaGrade)"
                :key="disciplinaGrade.Disciplina"
                :class="[
                  'clickable',
                  { 'bg-custom': isEven(disciplinaGrade.periodo) },
                  { 'bg-selected': disciplinaSelectedId === disciplinaGrade.Disciplina },
                ]"
              >
                <v-td width="35">{{ disciplinaGrade.periodo }}</v-td>
                <v-td width="80" align="start">
                  {{ disciplinaGrade.disciplina.codigo }}
                </v-td>
                <v-td width="400" align="start">
                  {{ disciplinaGrade.disciplina.nome }}
                </v-td>
              </tr>
            </template>

            <tr v-if="!hasGradeSelected">
              <v-td width="515" colspan="3">
                <b>Nenhuma disciplina encontrada</b>
                , selecione uma grade.
              </v-td>
            </tr>
          </template>
        </BaseTable>
      </div>

      <Card :title="'Disciplinas'">
        <template #form-group>
          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0 mr-3">
              <label for="cursoAtual" class="col-form-label">Curso</label>
              <select
                id="cursoAtual"
                v-model="currentCursoId"
                v-on:change="changeCurso"
                class="form-control form-control-sm input-xl"
              >
                <option value="4">Ciência da Computação Diurno</option>
                <option value="1">Ciência da Computação Noturno</option>
                <option value="3">Sistemas de Informação</option>
                <option value="2">Engenharia Computacional</option>
              </select>
            </div>

            <div class="form-group m-0 px-0">
              <label for="gradeSelect" class="col-form-label">Grade</label>
              <select
                :disabled="!hasCursoSelected"
                id="gradeSelect"
                v-model="currentGradeId"
                @change="changeGrade"
                class="form-control form-control-sm input-sm"
              >
                <option
                  v-for="grade in GradesFiltredByCurrentCurso"
                  :key="grade.id + grade.nome"
                  :value="grade.id"
                >
                  {{ grade.nome }}
                </option>
              </select>
            </div>
          </div>

          <div class="w-100 border mt-3 mb-2"></div>

          <div class="row mb-2 mx-0">
            <div class="form-group m-0 col px-0">
              <label required for="disciplina" class="col-form-label">Disciplina</label>
              <select
                :disabled="!hasGradeSelected"
                type="text"
                id="disciplina"
                style="width: 376px"
                class="form-control form-control-sm"
                v-model="disciplinaGradeForm.Disciplina"
                @change="clearClick(), updateDisciplinaForm()"
              >
                <option v-if="!DisciplinasOptions.length">Nenhuma Disciplina Encontrada</option>
                <option
                  v-for="disciplina in DisciplinasOptions"
                  :key="disciplina.id + disciplina.nome"
                  :value="disciplina.id"
                >
                  {{ disciplina.nome }}
                </option>
              </select>
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-group m-0 col px-0">
              <label required for="periodoDisciplina" class="col-form-label pb-1">Período</label>
              <div class="d-flex align-items-center">
                <input
                  :disabled="!hasGradeSelected"
                  type="text"
                  id="periodoDisciplina"
                  class="form-control form-control-sm input-sm mr-2"
                  v-model="disciplinaGradeForm.periodo"
                  @keypress="maskOnlyNumber"
                />

                <BaseButton
                  :disabled="!hasGradeSelected"
                  template="salvar"
                  title="Salvar período"
                  @click="updateDisciplinaGrade"
                />
              </div>
            </div>
          </div>
        </template>

        <template #footer>
          <BaseButton
            v-show="!isEditDisciplina"
            template="adicionar"
            title="Adicionar à Grade"
            :disabled="!hasGradeSelected"
            @click="addDisciplinaGrade"
          />

          <BaseButton
            template="deletar"
            title="Deletar Disciplina"
            :disabled="!hasGradeSelected"
            @click="openModalDelete"
          />

          <BaseButton template="cancelar" :disabled="!hasGradeSelected" @click="cleanDisciplina" />
        </template>
      </Card>
    </div>

    <ModalDelete
      ref="modalDelete"
      :isDeleting="isEditDisciplina"
      @btn-deletar="deleteDisciplinaGrade"
    >
      <li v-if="isEditDisciplina" class="list-group-item">
        <span>
          Tem certeza que deseja excluír a disciplina
          <b>{{ disciplinaGradeForm.disciplina.nome }}</b>
          ?
        </span>
      </li>
      <li v-else class="list-group-item">Nenhuma disciplina selecionada.</li>
    </ModalDelete>

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Visualizar conteúdo:</b>
        Na parte superior do cartão à direita, selecione o curso e a grade que deseja visualizar.
      </li>
      <li class="list-group-item">
        <b>Adicionar:</b>
        Para adicionar uma disciplinas à grade selecionada, com a parte de baixo do cartão à direita
        em branco, preencha-a e em seguida clique em Adicionar
        <font-awesome-icon :icon="['fas', 'plus']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Editar:</b>
        Para editar uma disciplinas da grade selecionada clique na linha da tabela da disciplina que
        deseja alterar. Em seguida, no cartão à direita, altere as informações que desejar e clique
        em Salvar
        <font-awesome-icon :icon="['fas', 'check']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Deletar:</b>
        Clique na linha da tabela da disciplina que deseja remover. Em seguida, no cartão à direita,
        clique em Remover
        <font-awesome-icon :icon="['fas', 'trash-alt']" class="icon-red" />
        e confirme a remoção na janela que será aberta.
      </li>
      <li class="list-group-item">
        <b>Limpar:</b>
        No cartão à direita, clique em Cancelar
        <font-awesome-icon :icon="['fas', 'times']" class="icon-gray" />
        , para limpar as informações da disciplina porém a grade continuará selecionada.
      </li>
      <li class="list-group-item">
        <b>Ordenar:</b>
        Clique no cabeçalho da tabela, na coluna desejada, para alterar a ordenação das informações.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { cloneDeep, find, filter, orderBy } from "lodash-es";
import disciplinaGradeService from "@/services/disciplinaGrade";
import { maskOnlyNumber } from "@/common/mixins";
import { Card } from "@/components/ui";
import { ModalAjuda, ModalDelete } from "@/components/modals";
import { mapGetters } from "vuex";

const emptyGrade = {
  id: undefined,
  periodoInicio: undefined,
  Curso: undefined,
  nome: undefined,
};
const emptyDisciplinaGrade = {
  periodo: 1,
  Disciplina: undefined,
  Grade: undefined,
};
export default {
  name: "DashboardGradeEdit",
  mixins: [maskOnlyNumber],
  components: { Card, ModalAjuda, ModalDelete },
  data() {
    return {
      gradeForm: cloneDeep(emptyGrade),
      disciplinaGradeForm: cloneDeep(emptyDisciplinaGrade),
      currentGradeId: null,
      currentCursoId: null,
      disciplinaSelectedId: null,
      ordenacaoDisciplinasMain: { order: "periodo", type: "asc" },
    };
  },

  methods: {
    openModalDelete() {
      this.$refs.modalDelete.open();
    },
    updateDisciplinaForm() {
      const disciplinaFound = this.AllDisciplinas.find(
        (disciplina) => disciplina.id === this.disciplinaGradeForm.Disciplina
      );
      this.disciplinaGradeForm.disciplina = disciplinaFound;
    },
    handleClickInDisciplina(disciplinaGrade) {
      this.disciplinaSelectedId = disciplinaGrade.Disciplina;

      this.showDisciplina(disciplinaGrade);
      this.showGrade(this.currentGradeId);
    },
    clearClick() {
      this.disciplinaSelectedId = null;
    },
    cleanGradeForm() {
      this.gradeForm = cloneDeep(emptyGrade);
    },
    cleanDisciplina() {
      this.clearClick();
      this.disciplinaGradeForm = cloneDeep(emptyDisciplinaGrade);
    },
    showGrade(gradeId) {
      this.cleanGradeForm();
      const grade = find(this.AllGrades, ["id", gradeId]);
      this.gradeForm = cloneDeep(grade);
      this.disciplinaGradeForm.Grade = this.gradeForm.id;
    },
    changeCurso() {
      ///Curso foi selecionado mas grade ainda não foi selecionada
      this.cleanDisciplina();
      this.cleanGradeForm();
      this.currentGradeId = null;
    },
    changeGrade() {
      this.cleanDisciplina();
      if (this.currentGradeId != null) this.showGrade(this.currentGradeId);
    },
    showDisciplina(disciplinaGrade) {
      this.cleanDisciplina;
      this.disciplinaGradeForm = cloneDeep(disciplinaGrade);
    },
    isEven(number) {
      return number % 2 === 0;
    },

    addDisciplinaGrade() {
      disciplinaGradeService
        .create(this.disciplinaGradeForm)
        .then(() => {
          this.$notify({
            group: "general",
            title: "Sucesso!",
            text: `A Disciplina <b>${this.disciplinaGradeForm.disciplina.nome}</b> foi adicionada à Grade <b>${this.gradeForm.nome}</b>!`,
            type: "success",
          });
        })
        .catch(() => {
          this.$notify({
            group: "general",
            title: "Erro!",
            text: "Erro ao incluir disciplina, verifique se a disciplina já não existe na grade",
            type: "error",
          });
        });
    },
    updateDisciplinaGrade() {
      disciplinaGradeService
        .update(
          this.disciplinaGradeForm.Disciplina,
          this.disciplinaGradeForm.Grade,
          this.disciplinaGradeForm
        )
        .then(() => {
          this.$notify({
            group: "general",
            title: "Sucesso!",
            text: `A Disciplina <b>${this.disciplinaGradeForm.disciplina.nome}</b> foi atualizada!`,
            type: "success",
          });
        })
        .catch(() => {
          this.$notify({
            group: "general",
            title: "Erro!",
            text: "Erro ao atualizar Disciplina",
            type: "error",
          });
        });
    },
    deleteDisciplinaGrade() {
      disciplinaGradeService
        .delete(
          this.disciplinaGradeForm.Disciplina,
          this.disciplinaGradeForm.Grade,
          this.disciplinaGradeForm
        )
        .then(() => {
          this.$notify({
            group: "general",
            title: "Sucesso!",
            text: `A Disciplina <b>${this.disciplinaGradeForm.disciplina.nome}</b> foi excluída!`,
            type: "success",
          });
          this.clearClick();
        })
        .catch(() => {
          this.$notify({
            group: "general",
            title: "Erro!",
            text: "Erro ao excluir Disciplina",
            type: "error",
          });
        });
    },
  },

  computed: {
    ...mapGetters(["AllGrades", "AllDisciplinas", "DisciplinasGrades"]),

    hasCursoSelected() {
      return this.currentCursoId != null;
    },
    hasGradeSelected() {
      return this.currentGradeId != null;
    },
    isEditDisciplina() {
      return this.disciplinaSelectedId !== null;
    },
    DisciplinaGradesOrdered() {
      return orderBy(
        this.DisciplinaGradesFiltred,
        this.ordenacaoDisciplinasMain.order,
        this.ordenacaoDisciplinasMain.type
      );
    },
    DisciplinaGradesFiltred() {
      return this.DisciplinasGrades.filter(
        (disciplinaGrade) => this.currentGradeId === disciplinaGrade.Grade
      );
    },
    GradesFiltredByCurrentCurso() {
      return filter(this.AllGrades, (grade) => grade.Curso == this.currentCursoId);
    },
    DisciplinasOptions() {
      return orderBy(this.AllDisciplinas, "nome");
    },
  },
};
</script>
