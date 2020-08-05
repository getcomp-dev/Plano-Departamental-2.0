<template>
  <div class="card">
    <div class="card-header">
      <h1 class="card-title">{{ title }}</h1>
    </div>
    <div class="card-body">
      <form>
        <slot name="form-group"></slot>

        <div class="row m-0 mt-3 d-flex justify-content-end">
          <slot name="footer">
            <template v-if="toggleFooter">
              <BaseButton
                title="Salvar"
                :type="'icon'"
                :color="'green'"
                @click="$emit('btn-salvar')"
                :key="1"
              >
                <i class="fas fa-check"></i>
              </BaseButton>
              <BaseButton
                title="Deletar"
                :type="'icon'"
                :color="'red'"
                @click="$emit('btn-delete')"
                :key="2"
              >
                <i class="fas fa-trash"></i>
              </BaseButton>
            </template>

            <template v-else>
              <BaseButton
                title="Adicionar"
                :type="'icon'"
                :color="'green'"
                @click="$emit('btn-add')"
                :key="4"
              >
                <i class="fas fa-plus"></i>
              </BaseButton>
            </template>

            <BaseButton
              title="Cancelar"
              :type="'icon'"
              :color="'gray'"
              @click="$emit('btn-clean')"
              :key="3"
            >
              <i class="fas fa-times"></i>
            </BaseButton>
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
      default: "Nenhum titulo recebido!",
    },
    toggleFooter: { type: Boolean, default: false },
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
.card label {
  line-height: 1.2 !important;
  font-size: 12px !important;
  text-align: start !important;
  padding-top: 0 !important;
}
.card .form-check label {
  height: 25px !important;
  display: flex;
  align-items: center;
}

.card input,
.card select {
  height: 28px !important;
  padding: 5px !important;
  font-size: 12px !important;
  text-align: start;
}
</style>
