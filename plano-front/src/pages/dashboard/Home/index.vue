<template>
  <div class="main-component">
    <div class="mt-1 pr-2">
      <!-- <div class="row mb-5">
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
      </div> -->

      <div class="pages-block-container">
        <PagesBlock v-if="currentUser.isSuperAdmin" title="Gerenciar" :pages="PagesGerenciar" />
        <PagesBlock title="Relatórios" :pages="PagesRelatorios" />
        <PagesBlock
          v-if="currentUser.isAdmin && currentPlano.isEditable"
          title="Plano"
          :pages="PagesPlano"
        />
        <PagesBlock
          v-if="currentUser.isAdmin && currentPlano.isEditable"
          title="Validações"
          :pages="PagesValidacoes"
        />
        <PagesBlock v-if="currentUser.isSuperAdmin" title="Histórico" :pages="PagesHistorico" />
      </div>
      <div class="welcome-container">
        <p class="mb-3 pl-3">
          <span class="hello-text">
            Olá
            <b>{{ currentUser.nome }}</b>
          </span>
          este é o sistema de gerenciamento de Plano Departamental do DCC - Departamento de Ciência
          da Computação.
          <br />
          Passe o mouse no bloco desejado para exibir a sua funcionalidade.
        </p>
        <div class="img-block">
          <img src="../../../assets/images/dcc.png" alt="Logo DCC" id="logoDCC" />
          <img src="../../../assets/images/logo-ufuf-2.png" alt="Logo UFJF" id="logoUFJF" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PagesBlock from "./PagesBlock";

export default {
  name: "DashboardHome",
  components: { PagesBlock },
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
@media only screen and (max-width: 1350px) {
  .welcome-container {
    display: none !important;
  }

  .main-component {
    display: flex;
    justify-content: center;
    width: 300px;
  }
  .pages-block-container {
    display: flex;
    flex-direction: column;
  }
}

.welcome-container {
  position: absolute;
  right: 50px;
  bottom: 50px;
  font-size: 14px;
  width: 500px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 8px;
  box-shadow: 1px 1px 5px #5f5f5f;
}

.hello-text {
  display: block;
  font-size: 16px;
}

.main-component {
  font-size: 12px;
}

.pages-block-container {
  display: flex;
}

.img-block {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

#logoUFJF {
  width: 150px;
}

#logoDCC {
  width: 150px;
}
</style>
