<template>
  <div class="main-component row">
    <portal to="page-header">
      <BaseButton template="ajuda" @click="$refs.modalAjuda.toggle()" />
    </portal>

    <keep-alive>
      <GradesCursosContent
        v-if="currentTab === 'DCC'"
        key="DCC"
        :arraysData="contentPropsDCC.arraysData"
        :gradeService="contentPropsDCC.services"
        :currentTab="currentTab"
        @change-tab="currentTab = $event"
      />
      <GradesCursosContent
        v-else
        key="Outros"
        :arraysData="contentPropsOutros.arraysData"
        :gradeService="contentPropsOutros.services"
        :currentTab="currentTab"
        @change-tab="currentTab = $event"
      />
    </keep-alive>

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Adicionar grade:</b>
        Preencha o cartão em branco à direita e em seguida, clique em Adicionar
        <font-awesome-icon :icon="['fas', 'plus']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Editar grade:</b>
        Clique na linha da tabela da grade que deseja alterar. Em seguida, no cartão à direita,
        altere as informações que desejar e clique em Salvar
        <font-awesome-icon :icon="['fas', 'check']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Deletar grade:</b>
        Clique na linha da tabela da grade que deseja remover. Em seguida, no cartão à direita,
        clique em Remover
        <font-awesome-icon :icon="['fas', 'trash-alt']" class="icon-red" />
        e confirme a remoção na janela que será aberta.
      </li>
      <li class="list-group-item">
        <b>Limpar formulário:</b>
        No cartão à direita, clique em Cancelar
        <font-awesome-icon :icon="['fas', 'times']" class="icon-gray" />
        , para limpar as informações.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { ModalAjuda } from "@/components/modals";
import GradesCursosContent from "./GradesCursosContent";

export default {
  name: "GerenciarGrades",
  components: { GradesCursosContent, ModalAjuda },
  data() {
    return {
      currentTab: "DCC",
    };
  },

  methods: {
    ...mapActions([
      "createGrade",
      "updateGrade",
      "deleteGrade",
      "createGradeCursoExterno",
      "updateGradeCursoExterno",
      "deleteGradeCursoExterno",
    ]),
  },

  computed: {
    ...mapGetters(["AllGrades", "AllGradesCursosExternos", "PrincipaisCursosDCC", "AllCursos"]),

    CursosExternos() {
      return this.AllCursos.filter((curso) => curso.id > 4 && curso.id != 18 && curso.id != 19);
    },
    contentPropsDCC() {
      return {
        arraysData: {
          Grades: this.AllGrades,
          Cursos: this.PrincipaisCursosDCC,
        },
        services: {
          create: this.createGrade,
          update: this.updateGrade,
          delete: this.deleteGrade,
        },
      };
    },
    contentPropsOutros() {
      return {
        arraysData: {
          Grades: this.AllGradesCursosExternos,
          Cursos: this.CursosExternos,
        },
        services: {
          create: this.createGradeCursoExterno,
          update: this.updateGradeCursoExterno,
          delete: this.deleteGradeCursoExterno,
        },
      };
    },
  },
};
</script>
