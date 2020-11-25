<template>
  <div class="card">
    <div class="card-header">
      <h1 class="card-title">{{ title }}</h1>
    </div>
    <div class="card-body">
      <form autocomplete="off">
        <slot name="form-group"></slot>

        <div class="row m-0 mt-3 d-flex justify-content-end">
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
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    title: {
      type: String,
      required: true,
    },
    toggleFooter: { type: Boolean, default: false },
    isPlano: { type: Boolean, default: false },
  },
};
</script>

<style>
.card .btn-icon {
  margin-right: 0 !important;
  margin-left: 5px !important;
}
.card {
  width: max-content;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.15);
  margin-bottom: 10px;
  margin-left: 5px;
}
.card-title {
  font-size: 16px !important;
  font-weight: normal !important;
  padding: 0 !important;
  margin: 0 !important;
  text-align: center !important;
}
.card-body {
  font-size: 12px !important;
  padding-top: 15px !important;
}
.card > .card-body label {
  line-height: 1.2;
  font-size: 12px;
  text-align: start;
  padding: 0;
  margin-bottom: 3px;
}
.card > .card-body .form-check label {
  height: 25px;
  display: flex;
  align-items: center;
}

.card > .card-body select,
.card > .card-body input[type="text"],
.card > .card-body input[type="number"],
.card > .card-body input[type="password"] {
  width: 100%;
  height: 28px;
  padding: 0 5px !important;
  font-size: 12px !important;
  text-align: start;
}
.card > .card-body textarea {
  width: 100%;
  padding: 5px;
  font-size: 12px;
  text-align: start;
}
</style>
