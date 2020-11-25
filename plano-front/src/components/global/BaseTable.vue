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
  font-weight: normal;
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
  font-size: 10px;
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
  vertical-align: middle;
  text-align: center;
  margin: 0 !important;
  padding: 0 5px;
}
.table-custom thead tr th {
  word-wrap: none;
  height: 18px;
  user-select: none;
}
.modal-table thead tr th {
  font-size: 11px;
}
.modal-table tbody tr td {
  cursor: pointer;
}
th:hover,
td:hover {
  cursor: default;
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
.table-custom thead .div-search {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 5px;
  background-color: #e9ecef;
  border: 1px solid #dee2e6;
  border-bottom: 0;
}

/* Inputs */
.table-custom tbody tr > td input[type="text"],
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
.table-custom tbody tr > td input[type="text"] + input[type="text"] {
  margin-top: 0;
}
.table-custom tbody tr > td input {
  text-align: center;
}

.main-table tbody tr input[type="checkbox"] {
  width: 14px;
  height: 14px;
  margin: 3px 0;
}
.modal-table tbody tr input[type="checkbox"] {
  margin: 3px 0;
  height: 12px;
  width: 12px;
  border-width: 1px !important;
  box-shadow: 0px 0px 0px 0.005px #555;
}
</style>
