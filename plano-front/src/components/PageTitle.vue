<template>
  <div
    id="PageTitle"
    class="div-titulo col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0"
    style="height: 38px;"
  >
    <div class="form-inline col-12 pl-0 mb-1 pr-1">
      <h1 class="titulo col px-0 pr-1">
        {{ title }}
      </h1>

      <div
        :class="asideClass"
        class="form-group mb-0 p-0"
        style="justify-content: flex-end !important;"
      >
        <slot name="aside"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageTitle",
  props: {
    title: {
      type: String,
      default: "Nenhum titulo passado para o componente!",
    },
    asideClass: {
      type: String,
      default: "col-xl-6 col-lg-6 col-md-5 col-sm-5 col-4",
    },
  },
};
</script>

<style scoped>
.form-inline {
  width: auto;
}
</style>
