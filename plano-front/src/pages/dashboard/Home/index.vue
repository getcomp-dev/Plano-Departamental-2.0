<template>
  <div class="main-component row p-0">
    <div class="alert alert-light mt-1" role="alert">
      <p class="user-paragraph">
        Olá
        <b>{{ currentUser.nome }}</b>
        este é o sistema de gerenciamento de Plano Departamental do DCC - Departamento de Ciência da
        Computação.
        <br />
        Abaixo segue um resumo das funcionalidades de cada página:
      </p>

      <div class="row">
        <LinkList
          v-if="currentUser.isAdmin && currentPlano.isEditable"
          title="Plano"
          :pages="PagesPlano"
        />
        <LinkList title="Relatórios" :pages="PagesRelatorios" />
        <LinkList v-if="currentUser.isSuperAdmin" title="Gerenciar" :pages="PagesGerenciar" />
        <LinkList v-if="currentUser.isSuperAdmin" title="Histórico" :pages="PagesHistorico" />
        <LinkList
          v-if="currentUser.isAdmin && currentPlano.isEditable"
          title="Validações"
          :pages="PagesValidacoes"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LinkList from "./LinkList";

export default {
  name: "DashboardHome",
  components: { LinkList },
  computed: {
    ...mapGetters([
      "currentUser",
      "PagesPlano",
      "PagesRelatorios",
      "PagesGerenciar",
      "PagesHistorico",
      "PagesValidacoes",
    ]),
  },
};
</script>

<style scoped>
.alert {
  word-break: normal;
  margin-left: 0;
  padding: 0 !important;
  margin-right: 1%;
  font-weight: normal;
  color: black;
  padding-right: 30px;
}
.user-paragraph {
  font-size: 12px;
  margin-bottom: 5px;
}
</style>
