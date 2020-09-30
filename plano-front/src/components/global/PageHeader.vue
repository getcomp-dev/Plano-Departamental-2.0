<template>
  <div class="page-header mb-2 border-bottom">
    <h1 class="m-0 my-1">{{ title }}</h1>
    <aside class="aside my-1">
      <slot></slot>
    </aside>
  </div>
</template>

<script>
export default {
  name: "PageHeader",
  props: {
    title: {
      type: String,
      default: "Nenhum titulo!",
    },
  },
};
</script>

<style scoped>
.page-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
}
.page-header > h1 {
  font-size: 25px;
  font-weight: normal;
  padding: 0 !important;
}
.aside {
  display: flex;
  justify-content: flex-end;
}
/* Para quando tem um select no slot */
.input-group {
  width: max-content !important;
}
.input-group-text {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 25px !important;
  margin-bottom: 0;
  margin-left: -5px;
  padding-left: 15px;
  font-size: 12px !important;
}
.form-control-top {
  height: 25px !important;
  font-size: 12px !important;
  padding: 2px 5px !important;
  width: 60px;
  text-align: center;
}
</style>
