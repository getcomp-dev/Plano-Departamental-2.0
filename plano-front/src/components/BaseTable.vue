<template>
  <table
    class="table-custom table table-sm table-bordered"
    :class="[tableType, customClass]"
    :style="tableType === 'main-table' ? tableHeight : ''"
  >
    <thead class="thead-light max-content sticky">
      <template v-if="hasSearchBar">
        <div class="div-search p-1 pb-2 sticky">
          <slot name="thead-search"></slot>
        </div>
      </template>
      <tr>
        <div :class="hasSearchBar ? 'sticky2' : 'sticky'" class="max-content">
          <slot name="thead"></slot>
        </div>
      </tr>
    </thead>
    <tbody>
      <div class="max-content">
        <slot name="tbody"></slot>
      </div>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "BaseTable",
  props: {
    tableType: { type: String, default: "main-table" },
    tableHeight: { type: String, default: "height: calc(100vh - 100px)" },
    hasSearchBar: { type: Boolean, default: false },
    customClass: { type: String, default: "" },
  },
};
</script>

<style scoped>
.table-custom {
  display: block;
  overflow-y: scroll;
  margin: 0 !important;
  font-weight: normal !important;
  background-color: #fff !important;
}
.main-table {
  overflow-x: auto !important;
  font-size: 11px !important;
  margin-bottom: 10px !important;
}
.modal-table {
  max-height: 450px !important;
  overflow-x: hidden !important;
  font-size: 10px !important;
  background-color: #e9ecef !important;
}
.table-custom thead {
  display: block !important;
  background-color: #e9ecef !important;
}
.table-custom tbody {
  display: block !important;
  width: max-content;
  background-color: #fff;
}
.table-custom thead th,
.table-custom tbody td {
  word-break: break-word;
  vertical-align: middle !important;
  text-align: center;
  margin: 0 !important;
  padding: 0 5px;
}
.table-custom thead tr th {
  word-wrap: none !important;
  height: 18px !important;
  user-select: none;
}
.modal-table thead tr th {
  /* background-color: #e9ecef !important; */
  font-size: 11px !important;
}
.main-table tbody tr td {
  height: 20px !important;
}
.modal-table tbody tr td {
  cursor: default;
  min-height: 21px !important;
}
.main-table tbody tr input[type="checkbox"] {
  width: 14px !important;
  height: 14px !important;
  text-align: center !important;
  margin: 0;
  margin-top: 5px !important;
  margin-bottom: auto !important;
}
.modal-table tbody tr input[type="checkbox"] {
  position: relative !important;
  border-width: 1px !important ;
  margin-left: 0 !important;
  margin-top: 4px !important;
  margin-bottom: auto !important;
  height: 13px !important;
  width: 13px !important;
  -webkit-box-shadow: 0px 0px 0px 0.005px #555;
  -moz-box-shadow: 0px 0px 0px 0.005px #555;
  box-shadow: 0px 0px 0px 0.005px #555;
}
.table-custom tbody tr:hover {
  background-color: #dbdbdb;
}
.table-custom thead tr th i {
  font-size: 9px;
}
.bg-custom {
  background-color: #f1f1f1;
}
.bg-selected,
.bg-selected:hover {
  background-color: #787878 !important;
  color: #fff !important;
  cursor: default;
}
/* searchBar */
.modal-table thead .div-search {
  display: flex !important;
  justify-content: flex-start !important;
  align-items: center !important;
  width: 100% !important;
  background-color: #e9ecef !important;
  border-right: 1px solid #dee2e6 !important;
  border-left: 1px solid #dee2e6 !important;
  border-top: 1px solid #dee2e6 !important;
}
.modal-table thead .input-search {
  height: 25px !important;
  width: 90% !important;
  margin: 0 !important;
  padding: 2px 5px !important;
  font-size: 12px !important;
  text-align: start;
  box-shadow: none !important;
  border-bottom-right-radius: 0 !important;
  border-top-right-radius: 0 !important;
}
.modal-table thead .btn-search {
  height: 25px !important;
  width: 10% !important;
  padding: 0 5px !important;
  color: rgb(75, 75, 75);
  background-color: #fff;
  border: 1px solid #ced4da;
  border-left: none;
  cursor: pointer;
  box-shadow: none !important;
  border-bottom-left-radius: 0 !important;
  border-top-left-radius: 0 !important;
}
.modal-table thead .btn-search:hover {
  background-color: #e9ecef;
}
.modal-table thead .btn-search i {
  font-size: 11px;
}

@-moz-document url-prefix() {
  .main-table tbody select {
    height: 20px !important;
  }
  .main-table tbody input[type="text"] {
    margin-top: 0px !important;
  }
}
</style>
