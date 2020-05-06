<template>
  <div class="DashboardHome row pr-2">
    <PageTitle :title="'Dashboard'" :asideClass="'col-0'"> </PageTitle>

    <div class="w-100 mb-2 border-bottom"></div>
    <!-- alert -->
    <div class="alert alert-light alerta mt-1" role="alert">
      <p style="font-size:12px">
        Olá {{ getUsuarioFirstName }}! Este é o sistema de gerenciamento de
        Plano Departamental do DCC - Departamento de Ciência da Computação.
        <br />Abaixo segue um resumo das funcionalidade de cada tela:
      </p>
      <div class="row">
        <div
          class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-3"
          v-if="Admin"
        >
          <!-- lista-1 -->
          <h3 class="lista-titulo">PLANO</h3>
          <ul class="listas list-group">
            <li class="list-group-item">
              <strong>
                <router-link :to="{ name: 'pedidos' }"
                  >Tabela Interna:</router-link
                >
              </strong>
              Página onde encontra-se o cadastro de todas as turmas de todas as
              disciplinas oferecidas pelo DCC. Permite a alteração de vagas,
              horários, sala e docentes de todas as disciplinas.
            </li>
            <li class="list-group-item">
              <strong>
                <router-link :to="{ name: 'turmasExternas' }"
                  >Tabela Externa:</router-link
                >
              </strong>
              Similar a Tabela Interna, onde encontra-se o cadastro de todas as
              turmas de disciplinas oferecidas por outros departamentos
              (externos ao DCC), e que fazem parte da grade dos cursos
              cadastrados.
            </li>
            <li class="list-group-item">
              <strong>
                <router-link :to="{ name: 'cargaPos' }"
                  >Tabela Pós:</router-link
                >
              </strong>
              Tela onde localiza-se uma tabela com as cargas horárias de cada
              docente encarregado das bolsas de pós-graduação.
            </li>
            <li class="list-group-item">
              <strong>
                <router-link :to="{ name: 'validacoes' }"
                  >Validacões:</router-link
                >
              </strong>
              Tela onde localiza-se as validações do Plano Departamental.
            </li>
          </ul>
        </div>
        <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-3">
          <!-- lista-2 -->
          <h3 class="lista-titulo">RELATÓRIOS</h3>
          <ul class="listas list-group">
            <li class="list-group-item">
              <strong>
                <router-link :to="{ name: 'cargaProfessores' }"
                  >Carga Professores:</router-link
                >
              </strong>
              Listagem de todos professores e as disciplinas que estes
              ministram, além das bolsas de pós-gradução. Mostra o somatório
              parcial por semestre, e o total da carga horária de cada docente.
            </li>
            <li class="list-group-item">
              <strong>
                <router-link :to="{ name: 'relatorioDisciplinas' }"
                  >Plano Departamental:</router-link
                >
              </strong>
              Lista as turmas, horários e professores alocados por disciplina.
            </li>
            <li class="list-group-item">
              <strong>
                <router-link :to="{ name: 'gradeDisciplinas' }"
                  >Grades Disciplinas:</router-link
                >
              </strong>
              Listagem das disciplinas do DCC, divididas de acordo com seus
              perfis. Mostra, além disso, quais semestres e períodos cada uma é
              ofertada nas grades dos cursos.
            </li>
            <li class="list-group-item">
              <strong>
                <router-link :to="{ name: 'horarios' }"
                  >Horários - Cursos:</router-link
                >
              </strong>
              Página onde listam-se os horarios dos cursos do DCC, permitindo
              filtragem por semestres e cursos.
            </li>

            <li class="list-group-item">
              <strong>
                <router-link :to="{ name: 'laboratoriosAlocacao' }"
                  >Horários - Laboratórios:</router-link
                >
              </strong>
              Lista as alocações dos laboratórios em ambos os semestres.
            </li>
          </ul>
        </div>
        <div
          class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-3"
          v-if="Admin"
        >
          <!-- lista-3 -->
          <h3 class="lista-titulo">GERENCIAR</h3>
          <ul class="listas list-group">
            <li class="list-group-item">
              <strong>
                <router-link :to="{ name: 'cursos' }">Cursos:</router-link>
              </strong>
              Lista todos os cursos presentes no sistemas (além dos externos ao
              DCC), e permite a adição e alteração das informações dos cursos.
            </li>
            <li class="list-group-item">
              <strong>
                <router-link :to="{ name: 'docentes' }">Docentes:</router-link>
              </strong>
              Listagem de todos os docentes ativo e inativos do DCC, além de
              permitir a alteração de seus perfis.
            </li>
            <li class="list-group-item">
              <strong>
                <router-link :to="{ name: 'grades' }">Grades:</router-link>
              </strong>
              Onde encontram-se as grades dos cursos do DCC atuais e antigas que
              ainda estão em atividade, e permite a adição de novas grades.
            </li>
            <li class="list-group-item">
              <strong>
                <router-link :to="{ name: 'gradeEdit' }"
                  >Disciplinas na Grade:</router-link
                >
              </strong>
              Onde encontram-se as disciplinas de cada grade do DCC atuais e
              antigas que ainda estão em atividade, e permite a alteração ou
              adição de novas disciplinas.
            </li>
            <li class="list-group-item">
              <strong>
                <router-link :to="{ name: 'perfis' }">Perfis:</router-link>
              </strong>
              Onde encontram-se os perfis definidos para cada disciplina nas
              tabelas, permitindo também a adição e alteração de perfis, seus
              nomes e as cores destinadas a eles.
            </li>
            <li class="list-group-item">
              <strong>
                <router-link :to="{ name: 'disciplinas' }"
                  >Disciplinas:</router-link
                >
              </strong>
              Listagem de disciplinas de todos os departamentos cadastrados no
              sistema. Permite a alteração de nome, código, carga teórica e
              pratica, perfis e também define se é EAD ou não.
            </li>
            <li class="list-group-item">
              <strong>
                <router-link :to="{ name: 'salas' }">Salas:</router-link>
              </strong>
              Listagem de todas as salas registradas no sistema. Permite a
              adição de novas salas e laboratórios.
            </li>
            <li class="list-group-item">
              <strong>
                <router-link :to="{ name: 'history' }">Logs:</router-link>
              </strong>
              Listagem de todas as modificações feitas pelos usuários no
              sistema.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PageTitle from "@/components/PageTitle";

export default {
  name: "DashboardHome",
  components: { PageTitle },
  created() {
    console.log(this.$store);
  },

  computed: {
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
.DashboardHome {
  max-width: 100%;
  overflow: hidden;
  margin: 0;
}

.alerta {
  word-break: normal;
  text-align: justify;
  margin-left: 0;
  padding: 0 !important;
  margin-right: 1%;
  font-weight: normal;
  color: black;
  padding-right: 30px;
}

.listas {
  line-height: 30px;
  font-size: 12px;
  text-align: justify;
  line-height: inherit;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.15);
}
.list-group-item {
  padding: 9px 15px;
}

.lista-titulo {
  margin-top: 2%;
  font-size: 14px;
  font-weight: 600;
  color: #3f3f3f;
}
</style>
