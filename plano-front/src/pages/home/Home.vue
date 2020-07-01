<template>
  <div v-if="!$root.onLoad" class="main-component row p-0">
    <PageTitle :title="'Dashboard'" />
    <div class="alert alert-light mt-1" role="alert">
      <p class="user-paragraph" style="">
        Olá {{ getUsuarioFirstName }}! Este é o sistema de gerenciamento de
        Plano Departamental do DCC - Departamento de Ciência da Computação.
        <br />Abaixo segue um resumo das funcionalidade de cada tela:
      </p>
      <div class="row">
        <LinksList v-if="Admin" :title="'PLANO'" :pages="linksPlanoOrdered" />
        <LinksList :title="'RELATÓRIOS'" :pages="linksRelatoriosOrdered" />
        <LinksList
          v-if="Admin"
          :title="'GERENCIAR'"
          :pages="linksGerenciarOrdered"
        />
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapGetters } from "vuex";
import { loadingHooks } from "@/mixins/index.js";
import { PageTitle } from "@/components/index.js";
import LinksList from "./LinksList";

export default {
  name: "DashboardHome",
  mixins: [loadingHooks],
  components: { PageTitle, LinksList },
  data() {
    return {
      linksPlano: [
        {
          title: "Graduação - DCC",
          routerName: "pedidos",
          description: `Página onde encontra-se o cadastro de todas as turmas
            de todas as disciplinas oferecidas pelo DCC. Permite a alteração
            de vagas, horários, sala e docentes de todas as disciplinas.`,
        },
        {
          title: "Graduação - Outros",
          routerName: "turmasExternas",
          description: `Similar a Tabela Interna, onde encontra-se o cadastro
            de todas as turmas de disciplinas oferecidas por outros departamentos
            (externos ao DCC), e que fazem parte da grade dos cursos cadastrados.`,
        },
        {
          title: "Pós Graduação",
          routerName: "cargaPos",
          description: `Tela onde localiza-se uma tabela com as cargas horárias
            de cada docente encarregado das bolsas de pós-graduação.`,
        },
        {
          title: "Validações",
          routerName: "validacoes",
          description: `Tela onde localiza-se as validações do Plano Departamental.`,
        },
      ],
      linksRelatorios: [
        {
          title: "Carga Professores",
          routerName: "cargaProfessores",
          description: `Listagem de todos professores e as disciplinas que estes
            ministram, além das bolsas de pós-gradução. Mostra o somatório
            parcial por semestre, e o total da carga horária de cada docente.`,
        },
        {
          title: "Grades Disciplinas",
          routerName: "gradeDisciplinas",
          description: `Listagem das disciplinas do DCC, divididas de acordo com seus
              perfis. Mostra, além disso, quais semestres e períodos cada uma é
              ofertada nas grades dos cursos.`,
        },
        {
          title: "Horários - Cursos",
          routerName: "horarios",
          description: `Página onde listam-se os horarios dos cursos do DCC, permitindo
            filtragem por semestres e cursos.`,
        },
        {
          title: "Horários - Laboratórios",
          routerName: "laboratoriosAlocacao",
          description: `Lista as alocações dos laboratórios em ambos os semestres.`,
        },
        {
          title: "Plano Departamental",
          routerName: "relatorioDisciplinas",
          description: `Lista as turmas, horários e professores alocados por disciplina.`,
        },
      ],
      linksGenrenciar: [
        {
          title: "Cursos",
          routerName: "cursos",
          description: `Lista todos os cursos presentes no sistemas (além dos externos ao
            DCC), e permite a adição e alteração das informações dos cursos.`,
        },
        {
          title: "Disciplinas",
          routerName: "disciplinas",
          description: `Listagem de disciplinas de todos os departamentos cadastrados no
            sistema. Permite a alteração de nome, código, carga teórica e
            pratica, perfis e também define se é EAD ou não.`,
        },
        {
          title: "Disciplinas na Grade",
          routerName: "gradeEdit",
          description: `Onde encontram-se as disciplinas de cada grade do DCC atuais e
            antigas que ainda estão em atividade, e permite a alteração ou
            adição de novas disciplinas.`,
        },
        {
          title: "Docentes",
          routerName: "docentes",
          description: `Listagem de todos os docentes ativo e inativos do DCC, além de
            permitir a alteração de seus perfis.`,
        },
        {
          title: "Grades",
          routerName: "grades",
          description: `Onde encontram-se as grades dos cursos do DCC atuais e antigas que
            ainda estão em atividade, e permite a adição de novas grades.`,
        },
        {
          title: "Log",
          routerName: "history",
          description: `Listagem de todas as modificações feitas pelos usuários no
            sistema.`,
        },
        {
          title: "Perfis",
          routerName: "perfis",
          description: `Onde encontram-se os perfis definidos para cada disciplina nas
            tabelas, permitindo também a adição e alteração de perfis, seus
            nomes e as cores destinadas a eles.`,
        },
        {
          title: "Salas",
          routerName: "salas",
          description: `Listagem de todas as salas registradas no sistema. Permite a
            adição de novas salas e laboratórios.`,
        },
      ],
    };
  },
  computed: {
    linksPlanoOrdered() {
      return this.linksPlano;
    },
    linksRelatoriosOrdered() {
      return _.orderBy(this.linksRelatorios, "title");
    },
    linksGerenciarOrdered() {
      return _.orderBy(this.linksGenrenciar, "title");
    },
    Admin() {
      if (this.$store.state.auth.Usuario.admin === 1) {
        return true;
      } else {
        return false;
      }
    },
    ...mapGetters(["getUsuarioFirstName"]),
  },
};
</script>

<style scoped>
.alert {
  word-break: normal;
  text-align: justify;
  margin-left: 0;
  padding: 0 !important;
  margin-right: 1%;
  font-weight: normal;
  color: black;
  padding-right: 30px;
}
.user-paragraph {
  font-size: 12px;
}
</style>
