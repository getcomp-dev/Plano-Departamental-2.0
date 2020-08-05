<template>
  <table
    class="table-custom table table-sm table-bordered"
    :class="[tableType, classes]"
    :style="styles"
  >
    <thead class="thead-light max-content sticky">
      <template v-if="hasSearchBar">
        <div class="div-search sticky">
          <slot name="thead-search"></slot>
        </div>
      </template>
      <tr>
        <div :class="hasSearchBar ? 'sticky2' : 'sticky'" class="max-content">
          <slot name="thead"> </slot>
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
    type: { type: String, default: "main" },
    hasSearchBar: { type: Boolean, default: false },
    styles: { type: String, default: "" },
    classes: { type: String | Array, default: "" },
  },
  computed: {
    tableType() {
      return `${this.type}-table`;
    },
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
  height: calc(100vh - 100px);
}
.modal-table {
  max-height: 450px;
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
th:hover,
td:hover {
  cursor: default;
}
.modal-table thead tr th {
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
  margin-top: 4.2px !important;
  margin-bottom: auto !important;
  height: 12px !important;
  width: 12px !important;
  -webkit-box-shadow: 0px 0px 0px 0.005px #555;
  -moz-box-shadow: 0px 0px 0px 0.005px #555;
  box-shadow: 0px 0px 0px 0.005px #555;
}
.table-custom tbody tr:hover {
  background-color: #dbdbdb;
}
.table-custom thead tr th i,
.table-custom thead tr th svg {
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
  display: flex;
  align-items: center;
  width: 100%;
  padding: 5px;
  background-color: #e9ecef;
  border: 1px solid #dee2e6;
  border-bottom: 0;
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
