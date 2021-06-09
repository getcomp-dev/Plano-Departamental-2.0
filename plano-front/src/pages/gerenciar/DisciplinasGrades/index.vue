<template>
  <div class="main-component row">
    <portal to="page-header">
      <BaseButton template="ajuda" @click="$refs.modalAjuda.toggle()" />
    </portal>

    <keep-alive>
      <DisciplinasGradesContent
        v-if="currentTab === 'DCC'"
        key="DCC"
        :arraysData="contentPropsDCC.arraysData"
        :disciplinaGradeServices="contentPropsDCC.services"
        :currentTab="currentTab"
        @change-tab="currentTab = $event"
      />
      <DisciplinasGradesContent
        v-else
        key="Outros"
        :arraysData="contentPropsOutros.arraysData"
        :disciplinaGradeServices="contentPropsOutros.services"
        :currentTab="currentTab"
        @change-tab="currentTab = $event"
      />
    </keep-alive>

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Visualizar conteúdo:</b>
        Na parte superior do cartão à direita, selecione o curso e a grade que deseja visualizar.
      </li>
      <li class="list-group-item">
        <b>Adicionar disciplina na grade:</b>
        Para adicionar uma disciplinas à grade selecionada, com a parte de baixo do cartão à direita
        em branco, preencha-a e em seguida clique em Adicionar
        <font-awesome-icon :icon="['fas', 'plus']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Editar disciplina da grade:</b>
        Para editar uma disciplinas da grade selecionada clique na linha da tabela da disciplina que
        deseja alterar. Em seguida, no cartão à direita, altere as informações que desejar e clique
        em Salvar
        <font-awesome-icon :icon="['fas', 'check']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Deletar disciplina da grade:</b>
        Clique na linha da tabela da disciplina que deseja remover. Em seguida, no cartão à direita,
        clique em Remover
        <font-awesome-icon :icon="['fas', 'trash-alt']" class="icon-red" />
        e confirme a remoção na janela que será aberta.
      </li>
      <li class="list-group-item">
        <b>Limpar formulário:</b>
        No cartão à direita, clique em Cancelar
        <font-awesome-icon :icon="['fas', 'times']" class="icon-gray" />
        , para limpar as informações da disciplina porém a grade continuará selecionada.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import disciplinaGradeExternoService from "@/services/disciplinaGradeCursoExterno";
import disciplinaGradeService from "@/services/disciplinaGrade";
import { ModalAjuda } from "@/components/modals";
import DisciplinasGradesContent from "./DisciplinasGradesContent";

export default {
  name: "GerenciarGrades",
  components: { DisciplinasGradesContent, ModalAjuda },
  data() {
    return {
      currentTab: "DCC",
    };
  },

  computed: {
    ...mapGetters([
      "DisciplinasGradesExternas",
      "AllGradesCursosExternos",
      "AllCursos",
      "AllGrades",
      "DisciplinasGrades",
      "PrincipaisCursosDCC",
    ]),

    CursosComGradesExternas() {
      return this.AllCursos.filter((curso) =>
        this.AllGradesCursosExternos.some((grade) => grade.Curso === curso.id)
      );
    },
    contentPropsDCC() {
      return {
        arraysData: {
          DisciplinasGrades: this.DisciplinasGrades,
          Grades: this.AllGrades,
          Cursos: this.PrincipaisCursosDCC,
        },
        services: disciplinaGradeService,
      };
    },
    contentPropsOutros() {
      return {
        arraysData: {
          DisciplinasGrades: this.DisciplinasGradesExternas,
          Grades: this.AllGradesCursosExternos,
          Cursos: this.CursosComGradesExternas,
        },
        services: disciplinaGradeExternoService,
      };
    },
  },
};
</script>
