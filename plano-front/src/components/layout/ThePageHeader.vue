<template>
  <header class="page-header mb-2 border-bottom">
    <h1>{{ title }}</h1>
    <slot></slot>
  </header>
</template>

<script>
export default {
  name: "ThePageHeader",
  props: {
    title: { type: String, default: "Nenhum titulo!" },
  },
};
</script>

<style>
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
  padding: 0;
  margin: 0.25rem 0;
}
.page-header > .aside {
  display: flex;
  justify-content: flex-end;
  margin: 0.25rem 0;
}

/* Para quando tem um select no slot */
.page-header > .aside .input-group {
  width: max-content !important;
}
.page-header > .aside .input-group-text {
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
.page-header > .aside .form-control-top,
.page-header > .aside select {
  height: 25px !important;
  font-size: 12px !important;
  padding: 2px 5px !important;
  width: 60px;
  text-align: center;
}
</style>
