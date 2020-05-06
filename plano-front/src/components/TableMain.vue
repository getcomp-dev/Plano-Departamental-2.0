<template>
  <table
    id="MainTable"
    ref="refMainTable"
    class="main-table table table-hover table-sm table-bordered"
  >
    <thead class="thead-light">
      <tr class="sticky">
        <div class="max-content">
          <slot name="thead"></slot>
        </div>
      </tr>
    </thead>
    <tbody>
      <slot name="tbody"> </slot>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "MainTable",
};
</script>

<style scoped>
.main-table {
  display: block !important;
  overflow-y: scroll !important;
  overflow-x: auto !important;
  font-size: 11px !important;
  font-weight: normal !important;
  background-color: white;
  margin: 0 !important;
  margin-bottom: 20px !important;
  /* ou - 100px */
  height: -webkit-calc(100vh - 110px);
  height: -moz-calc(100vh - 110px);
  height: calc(100vh - 110px);
}
.tab-table {
  height: -webkit-calc(100vh - 125px);
  height: -moz-calc(100vh - 125px);
  height: calc(100vh - 125px);
}
.main-table tr thead {
  display: block !important;
}
.main-table thead tr th {
  height: 18px;
  padding: 0 5px !important;
  margin: 0 !important;
  font-size: 11px !important;
  text-align: center;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}
.main-table thead tr th i {
  font-size: 0.575rem;
}
.main-table td {
  text-align: center;
  vertical-align: middle !important;
  padding: 0 5px !important;
  margin: 0 !important;
  height: 20px !important;
}
tbody {
  max-height: 100% !important;
  width: 100% !important;
}

.main-table thead th {
  padding: 0 !important;
  font-size: 14px;
  text-align: center;
  height: 18px !important;
}
.main-table input[type="checkbox"] {
  width: 13px !important;
  height: 13px !important;
  text-align: center !important;
  margin: 0 !important;
  margin-top: 4px !important;
}
.bg-custom {
  /* ou 17 no final */
  background-color: #00000015;
}
.tr-bg-gray {
  background-color: #00000015;
}
</style>
