<template>
  <button
    type="button"
    :key="uniqueKey"
    :disabled="disabled"
    :class="['btn base-btn', options.class]"
    :title="title ? title : options.title"
    @click="$emit('click')"
  >
    <font-awesome-icon v-if="options.iconName" :icon="['fas', options.iconName]" />
    <slot v-else>{{ text }}</slot>
  </button>
</template>

<script>
import { uniqueId } from "lodash-es";

export default {
  name: "BaseButton",
  props: {
    template: { type: String, default: null },
    type: { type: String, default: "text" },
    color: { type: String, default: "gray" },
    disabled: { type: Boolean, default: false },
    text: { type: String, default: "" },
    title: { type: String, default: "" },
  },

  computed: {
    options() {
      if (!this.template)
        return {
          class: `btn-${this.type} ${this.type}-${this.color}`,
        };

      let options = {};
      switch (this.template.toLowerCase()) {
      case "ajuda":
        options.title = "Ajuda";
        options.class = "btn-icon icon-lightblue";
        options.iconName = "question";
        break;
      case "filtros":
        options.title = "Filtros";
        options.class = "btn-icon icon-gray";
        options.iconName = "list-ul";
        break;
      case "adicionar":
        options.title = "Adicionar";
        options.class = "btn-icon icon-green";
        options.iconName = "plus";
        break;
      case "cancelar":
        options.title = "Cancelar";
        options.class = "btn-icon icon-gray";
        options.iconName = "times";
        break;
      case "deletar":
        options.title = "Deletar";
        options.class = "btn-icon icon-red";
        options.iconName = "trash";
        break;
      case "salvar":
        options.title = "Salvar";
        options.class = "btn-icon icon-blue";
        options.iconName = "check";
        break;
      case "relatorio":
        options.title = "Relátorio";
        options.class = "btn-icon icon-gray";
        options.iconName = "file-alt";
        break;
      case "file-upload":
        options.title = "Upload de arquivo";
        options.class = "btn-icon icon-gray";
        options.iconName = "file-upload";
        break;
      case "download":
        options.title = "Baixar arquivos";
        options.class = "btn-icon icon-gray";
        options.iconName = "save";
        break;
      case "swap-modes":
        options.title = "Alterar visualização da tabela";
        options.class = "btn-icon icon-gray";
        options.iconName = "sync-alt";
        break;
      default:
        options.title = "Vazio";
        options.class = "btn-icon icon-gray";
        options.iconName = "exclamation-triangle";
        break;
      }
      return options;
    },

    uniqueKey() {
      if (this.template) return uniqueId(this.template);
      else return uniqueId(this.color);
    },
  },
};
</script>

<style lang="scss" scoped>
button.base-btn {
  height: max-content;
  margin: 0;
  padding: 0;
  border: none;
  line-height: 50%;
  cursor: pointer;
  text-align: center;
  transition: all 200ms ease;

  &:disabled {
    filter: brightness(75%);
    cursor: default;
    outline: none;
    pointer-events: none;
    &:focus {
      box-shadow: none;
    }
  }
}

button.btn-icon {
  width: 32px;
  height: 30px;
  margin: 0 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 1px solid #c7c7c7;
  &:hover {
    background-color: #e7e7e7;
  }
  &:focus {
    box-shadow: 0 0 0 0.1rem #007bff85 !important;
  }

  > svg {
    font-size: 16px;
  }
}

button.btn-text {
  height: 25px;
  width: max-content;
  padding: 0 10px;
  border-radius: 0.25rem;
  border: none;
  font-size: 12px;
  color: #fff;
  word-break: keep-all;
  &:hover {
    filter: brightness(85%);
  }

  & + button.btn-text {
    margin-left: 10px;
  }
}
</style>
