<template>
  <div class="card mr-3 ml-auto">
    <div class="card-header">
      <h1 class="card-title">{{ title }}</h1>
    </div>
    <div class="card-body">
      <form>
        <slot name="form-group"></slot>

        <div class="row m-0 mt-3 d-flex justify-content-end">
          <slot name="footer"></slot>
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
  },
};
</script>

<style scoped>
.card {
  width: max-content;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.15);
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
.card select {
  height: 25px !important;
  font-size: 11px !important;
  padding: 0px 5px !important;
  text-align: start;
}
.card input {
  height: 25px !important;
  padding: 0px 5px !important;
  font-size: 11px !important;
  text-align: start;
}
</style>
