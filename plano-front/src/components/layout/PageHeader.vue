<template>
  <header class="page-header mb-2 border-bottom">
    <h1>{{ title }}</h1>
    <slot></slot>
  </header>
</template>

<script>
export default {
  name: "PageHeader",
  props: {
    title: { type: String, default: "Nenhum titulo!" },
  },
};
</script>

<style lang="scss">
.page-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  > h1 {
    font-size: 25px;
    font-weight: normal;
    padding: 0;
    margin: 0.25rem 0;
  }
  > .aside {
    display: flex;
    justify-content: flex-end;
    margin: 0.25rem 0;
  }
}

/* Para quando tem um input-group no slot */
.page-header > .aside {
  .input-group {
    display: flex;
    align-items: center;
    justify-content: center;
    width: max-content;
    margin: 0 8px;
    padding: 0;
  }
  .input-group-text {
    display: flex;
    align-items: center;
    justify-content: center;
    width: max-content;
    height: 25px;
    padding: 0 12px;
    font-size: 12px;
  }
  select {
    height: 25px;
    font-size: 12px;
    padding: 0px 5px;
    width: max-content;
    text-align: center;
  }
}
</style>
