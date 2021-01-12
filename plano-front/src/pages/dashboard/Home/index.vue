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
          :pages="RoutesPlano"
        />
        <LinkList title="Relatórios" :pages="RoutesRelatorios" />
        <LinkList v-if="currentUser.isSuperAdmin" title="Gerenciar" :pages="RoutesGerenciar" />
        <LinkList v-if="currentUser.isSuperAdmin" title="Histórico" :pages="RoutesHistorico" />
        <LinkList v-if="currentUser.isAdmin" title="Validações" :pages="RoutesValidacoes" />
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
      "RoutesPlano",
      "RoutesRelatorios",
      "RoutesGerenciar",
      "RoutesHistorico",
      "RoutesValidacoes",
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
