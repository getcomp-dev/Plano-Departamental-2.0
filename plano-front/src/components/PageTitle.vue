<template>
  <div id="PageTitle" class="w-100 p-0 m-0 mb-2 border-bottom">
    <h1 class="titulo m-0 my-1">{{ title }}</h1>
    <div class="aside form-group m-0 p-0 my-1">
      <slot name="aside"></slot>
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
  },
};
</script>

<style scoped>
#PageTitle {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.titulo {
  font-size: 25px;
  font-weight: normal;
  padding: 0 !important;
}
.aside {
  display: flex !important;
  justify-content: flex-end !important;
}
.input-group {
  width: max-content !important;
}
.input-group-text {
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: flex;
  -ms-flex-align: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  align-items: center;
  -ms-flex-pack: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -moz-box-pack: center;
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
