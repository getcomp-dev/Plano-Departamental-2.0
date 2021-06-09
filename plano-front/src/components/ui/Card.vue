<template>
  <div class="card" :style="style">
    <div class="card-header">
      <h1 class="card-title">{{ title }}</h1>
    </div>
    <div class="card-body">
      <slot name="body"></slot>
    </div>

    <div class="card-footer">
      <div class="row m-0 d-flex justify-content-end">
        <slot name="footer">
          <template v-if="toggleFooter">
            <BaseButton
              v-if="isPlano"
              title="Copiar Plano"
              type="icon"
              color="lightblue"
              @click="$emit('btn-copy')"
            >
              <font-awesome-icon :icon="['fas', 'copy']" />
            </BaseButton>

            <BaseButton template="Salvar" @click="$emit('btn-salvar')" />
            <BaseButton template="deletar" @click="$emit('btn-delete')" />
          </template>

          <template v-else>
            <BaseButton template="adicionar" @click="$emit('btn-add')" />
          </template>

          <BaseButton template="cancelar" @click="$emit('btn-clean')" />
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    width: { type: [String, Number], default: null },
    title: { type: String, required: true },
    toggleFooter: { type: Boolean, default: false },
    isPlano: { type: Boolean, default: false },
  },

  computed: {
    style() {
      return {
        width: this.width + "px",
      };
    },
  },
};
</script>

<style lang="scss">
.card {
  width: max-content;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.15);
  margin-bottom: 10px;
  margin-left: 5px;
}

.card > .card-header > .card-title {
  font-size: 16px;
  padding: 0;
  margin: 0;
  text-align: center;
}

.card > .card-body {
  font-size: 12px;
  padding-top: 15px;
  padding-bottom: 15px;

  label {
    line-height: 1.2;
    font-size: 12px;
  }

  select,
  input:not([type="checkbox"]) {
    font-size: 12px;
    width: 100%;
    height: 28px;
    padding-left: 5px;
  }

  .input-xl {
    width: 270px !important;
  }
  .input-lg {
    width: 200px !important;
  }
  .input-md {
    width: 130px !important;
  }
  .input-sm {
    width: 80px !important;
  }

  div.form-group + div.form-group:not([role="group"]) {
    padding-left: 10px !important;
  }

  textarea {
    width: 100%;
    padding: 5px;
    font-size: 12px;
    text-align: start;
  }
}

.card > .card-footer {
  padding-top: 10px;
  padding-bottom: 10px;

  .btn-icon:last-of-type {
    margin-right: 0;
  }
}
</style>
