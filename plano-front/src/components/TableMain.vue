<template>
  <table
    id="TableMain"
    ref="refMainTable"
    class="main-table table table-sm table-bordered"
  >
    <thead class="thead-light">
      <tr>
        <div class="max-content sticky">
          <slot name="thead"></slot>
        </div>
      </tr>
    </thead>
    <tbody>
      <div class="max-content">
        <slot name="tbody"> </slot>
      </div>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "TableMain",
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
  height: -webkit-calc(100vh - 100px); /* ou - 100px */
  height: -moz-calc(100vh - 100px);
  height: calc(100vh - 100px);
}
.main-table tr thead {
  display: block !important;
}

.main-table tbody {
  max-height: 100% !important;
  width: 100% !important;
}

.main-table thead th,
.main-table tbody td {
  word-break: break-word;
  vertical-align: middle !important;
  text-align: center;
  margin: 0 !important;
  padding: 0 5px !important;
}

.main-table thead tr th {
  word-wrap: none !important;
  height: 18px !important;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.main-table tbody td {
  height: 20px !important;
}
.main-table thead tr th i {
  font-size: 0.575rem;
}
.main-table input[type="checkbox"] {
  width: 13px !important;
  height: 13px !important;
  text-align: center !important;
  margin: 0 !important;
  margin-top: 4px !important;
}

.sticky {
  display: block !important;
  overflow: hidden !important;
  position: sticky !important;
  position: -webkit-sticky !important;
  top: 0px !important;
  overflow: hidden !important;
  z-index: 3;
}
.sticky2 {
  display: block !important;
  overflow: hidden !important;
  position: sticky !important;
  position: -webkit-sticky !important;
  top: 38px !important;
  overflow: hidden !important;
  z-index: 3;
}
table tbody tr:hover {
  background-color: #dbdbdb;
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
@-moz-document url-prefix() {
  .main-table tbody select {
    height: 20px !important;
  }
  .main-table tbody input[type="text"] {
    margin-top: 0px !important;
  }
}
</style>
