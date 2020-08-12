<template>
  <div class="main-component row p-0">
    <PageHeader :title="'Dashboard'" />

    <div class="alert alert-light mt-1" role="alert">
      <p class="user-paragraph">
        Olá {{ usuarioNome }}! Este é o sistema de gerenciamento de Plano Departamental do DCC - Departamento de Ciência da Computação.
        <br />Abaixo segue um resumo das funcionalidades de cada página:
      </p>
      <div class="row">
        <LinkList v-if="Admin" :title="'PLANO'" :pages="routesPlano" />
        <LinkList :title="'RELATÓRIOS'" :pages="routesRelatorios" />
        <LinkList v-if="SuperAdmin" :title="'GERENCIAR'" :pages="routesGerenciar" />
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
      "Admin",
      "SuperAdmin",
      "usuarioNome",
      "routesPlano",
      "routesRelatorios",
      "routesGerenciar",
    ]),
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
