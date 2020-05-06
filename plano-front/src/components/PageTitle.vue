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
        class="form-group mb-0 p-0 d-flex"
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
      default: "col-xl-8 col-lg-8 col-md-8 col-sm-4 col-2",
    },
  },
};
</script>

<style scoped>
.form-inline {
  width: auto;
}
/* .form-group-top {
  display: -ms-flexbox;
  display: flex;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 0;
} */
</style>
