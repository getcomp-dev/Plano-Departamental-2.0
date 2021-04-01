<template>
  <BaseModal ref="baseModalAjuda" title="Ajuda" type="ajuda">
    <template #modal-body>
      <ul class="list-ajuda list-group">
        <li v-if="pageShortDescription" class="list-group-item">
          <h2>{{ pageShortDescription }}</h2>
        </li>
        <li class="list-group-item">
          <b>Ordenar tabela:</b>
          Clique no cabeçalho da coluna desejada na tabela, caso haja um ícone de seta
          <font-awesome-icon :icon="['fas', 'arrow-down']" class="icon-darkgray" />
          , para alterar a ordenação do conteúdo. Note que podem existir colunas com o icone
          <font-awesome-icon :icon="['fas', 'thumbtack']" class="icon-darkgray" />
          que significa que esta ordenação terá pripridade em relação as outras.
        </li>

        <slot></slot>
      </ul>
    </template>
  </BaseModal>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ModalAjuda",

  methods: {
    toggle() {
      this.$refs.baseModalAjuda.toggle();
    },
    close() {
      this.$refs.baseModalAjuda.close();
    },
  },

  computed: {
    ...mapGetters(["AllPages"]),

    pageShortDescription() {
      const page = this.AllPages.find((page) => page.path === this.$route.path);
      if (!page) return "";

      const [shortDescription] = page.description.split(".");
      return shortDescription + ".";
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/theme.scss";

.modal-custom .list-ajuda {
  font-size: 12px;

  .list-group-item {
    > b {
      color: $clr-lightblue;
    }

    svg {
      font-size: 12px !important;
      margin: 0 1px !important;
      color: #585858;
    }
  }

  .list-group-item:first-of-type {
    background-color: #eaeaea;

    h2 {
      font-size: 12px;
      font-weight: bold;
      margin: 0;
      line-height: 1.5;
    }
  }
}
</style>
