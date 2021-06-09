<template>
  <div class="main-component">
    <div class="mt-1 pr-2">
      <p class="mb-2">
        Olá
        <b>{{ currentUser.nome }}</b>
        este é o sistema de gerenciamento de Plano Departamental do DCC - Departamento de Ciência da
        Computação.
        <br />
        Abaixo segue um resumo das funcionalidades de cada página:
      </p>

      <div class="row mb-5">
        <PagesList
          v-if="currentUser.isAdmin && currentPlano.isEditable"
          title="Plano"
          :pages="PagesPlano"
        />
        <PagesList title="Relatórios" :pages="PagesRelatorios" />
        <PagesList v-if="currentUser.isSuperAdmin" title="Gerenciar" :pages="PagesGerenciar" />
        <PagesList v-if="currentUser.isSuperAdmin" title="Histórico" :pages="PagesHistorico" />
        <PagesList
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
import PagesList from "./PagesList";

export default {
  name: "DashboardHome",
  components: { PagesList },
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
.main-component {
  font-size: 12px;
}
</style>
