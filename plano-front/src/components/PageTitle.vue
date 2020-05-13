<template>
  <div id="PageTitle" class="w-100 p-0 m-0 mb-2 border-bottom">
    <h1 class="titulo m-0 my-1">{{ title }}</h1>
    <div class="aside form-group m-0 p-0 my-1">
      <slot name="aside"></slot>
    </div>
  </div>
  <!-- exemplo de selected    
    <div class="input-group mx-2 p-0">
          <div class="input-group-prepend">
            <label class="input-group-text">Ano</label>
          </div>
          <select class="form-control form-control-top">
            <option value="1">teste</option>
            <option value="2">teste</option>
          </select>
        </div> -->
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
.titulo {
  font-size: 25px;
  font-weight: normal;
  padding: 0 !important;
}
.form-inline {
  width: auto;
}
#PageTitle {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
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
  margin-bottom: 0;
  /*===*/
  max-width: 50px;
  min-width: 50px;
  height: 25px !important;
  margin-left: -5px;
  padding-left: 15px;
  font-size: 12px !important;
}
.form-control-top {
  height: 25px !important;
  font-size: 12px !important;
  padding: 2px 5px !important;
  width: 60px !important;
  max-width: 60px !important;
  text-align: center;
}
</style>
