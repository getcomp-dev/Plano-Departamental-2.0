<template>
  <table
    class="table-custom table table-sm table-bordered"
    :class="[tableType, classes]"
    :style="styles"
  >
    <thead class="thead-light max-content sticky">
      <div class="div-search sticky" v-if="hasSearchBar">
        <slot name="thead-search"></slot>
      </div>
      <tr>
        <div :class="hasSearchBar ? 'sticky2' : 'sticky'" class="max-content">
          <slot name="thead"></slot>
        </div>
      </tr>
    </thead>
    <tbody>
      <template v-if="type === 'main'">
        <div class="max-content stickyAdd">
          <slot name="add-row"></slot>
        </div>
      </template>

      <slot v-if="type !== 'main' || !onLoading.table" name="tbody"></slot>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BaseTable",
  props: {
    type: { type: String, default: "main" },
    hasSearchBar: { type: Boolean, default: false },
    styles: { type: String, default: "" },
    classes: { type: String | Array, default: "" },
  },
  computed: {
    ...mapGetters(["onLoading"]),

    tableType() {
      return `${this.type}-table`;
    },
  },
};
</script>

<style>
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
.modal-table tbody {
  text-transform: uppercase;
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
  cursor: pointer;
  min-height: 21px !important;
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

.stickyAdd {
  display: block;
  overflow: hidden !important;
  position: sticky !important;
  position: -webkit-sticky !important;
  top: 19px !important;
  overflow: hidden !important;
  z-index: 5 !important;
}
/* Search Bar */
.sticky2 {
  display: block !important;
  overflow: hidden !important;
  position: sticky !important;
  top: 37px !important;
  overflow: hidden !important;
  z-index: 5;
}
.modal-table thead .div-search {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 5px;
  background-color: #e9ecef;
  border: 1px solid #dee2e6;
  border-bottom: 0;
}

/* Inputs */
.table-custom tbody tr > td input,
.table-custom tbody tr > td select {
  width: 100%;
  height: 18px;
  margin: 2px 0;
  font-size: 11px;
  color: #202020;
  border: 1px solid #414141;
  border-radius: 0px;
}
.table-custom tbody tr > td select {
  text-align: start;
}
.table-custom tbody tr > td select + select,
.table-custom tbody tr > td input + input {
  margin-top: 0;
}
.table-custom tbody tr > td input {
  text-align: center;
}

.main-table tbody tr input[type="checkbox"] {
  width: 14px;
  height: 14px;
  margin: 0;
}
.modal-table tbody tr input[type="checkbox"] {
  position: relative !important;
  border-width: 1px !important ;
  margin-left: 0 !important;
  margin-top: 4.2px !important;
  margin-bottom: auto !important;
  height: 12px;
  width: 12px;
  -webkit-box-shadow: 0px 0px 0px 0.005px #555;
  -moz-box-shadow: 0px 0px 0px 0.005px #555;
  box-shadow: 0px 0px 0px 0.005px #555;
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
