<template>
  <table
    class="table-custom table-sm table-bordered table-striped"
    :class="[typeClass, classes]"
    :style="styles"
  >
    <thead class="thead-color max-content sticky-row-top">
      <div class="div-search sticky-row-top" v-if="hasSearchBar">
        <slot name="thead-search"></slot>
      </div>

      <tr>
        <div :class="hasSearchBar ? 'sticky-row-bottom' : 'sticky-row-top'" class="max-content">
          <slot name="thead"></slot>
        </div>
      </tr>
    </thead>

    <tbody>
      <div v-if="hasAddRow" class="max-content sticky-row-add">
        <slot name="add-row"></slot>
      </div>

      <template v-if="hasLoading">
        <div class="max-content" v-show="!onLoading.table">
          <slot name="tbody"></slot>
        </div>
      </template>
      <slot v-else name="tbody"></slot>
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
    classes: { type: [String, Array], default: "" },
  },
  data() {
    return {
      hasLoading: false,
      hasAddRow: false,
    };
  },

  beforeMount() {
    if (this.type === "main") {
      this.hasLoading = true;
      this.hasAddRow = true;
    }
  },

  computed: {
    ...mapGetters(["onLoading"]),

    typeClass() {
      return `${this.type}-table`;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/theme.scss";

.table-custom {
  display: block;
  overflow-y: scroll;
  margin: 0 !important;
  font-weight: normal;
  background-color: #fff;

  thead {
    display: block !important;
    background-color: #e9ecef !important;
    color: white;

    tr th {
      word-wrap: break-word;
      height: 18px;
      user-select: none;
      background-color: $clr-lightred;
      border-color: $clr-mainred !important;
      border-left-color: $clr-mainred !important;
      border-right-color: $clr-mainred !important;

      // th aninhado com multiplas linhas
      > th {
        border-bottom: none !important;
        z-index: 10;
        &:first-of-type {
          border-left: none !important;
        }
        &:last-of-type {
          border-right: none !important;
        }
        & + th {
          border-left: none !important;
        }
      }
    }

    tr th svg {
      font-size: 9px;
    }

    .div-search {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 5px;
      background-color: #e9ecef;
      border: 1px solid #dee2e6;
      border-bottom: 0;
    }
  }

  tbody {
    display: block !important;
    width: max-content;
    background-color: #fff;

    tr:hover {
      background-color: #dbdbdb;
    }
    tr.bg-custom {
      background-color: #f1f1f1;
    }
    tr.bg-selected,
    tr.bg-selected:hover {
      background-color: $clr-lightred !important;
      color: #fff !important;
      cursor: default;
    }
  }

  thead th,
  tbody td {
    vertical-align: middle;
    text-align: center;
    margin: 0 !important;
    padding: 0 5px;
  }

  /* Inputs */
  tbody tr > td {
    input[type="text"],
    select {
      width: 100%;
      height: 18px;
      margin: 2px 0;
      font-size: 11px;
      color: #202020;
      border: 1px solid #414141;
      border-radius: 0px;
    }
    input {
      text-align: center;
    }
    select {
      text-align: start;
    }
    tbody tr > td select + select,
    input[type="text"] + input[type="text"] {
      margin-top: 0;
    }
  }
}

.main-table {
  overflow-x: auto !important;
  font-size: 11px !important;
  margin-bottom: 10px !important;
  height: calc(100vh - 100px);

  tbody tr input[type="checkbox"] {
    width: 14px;
    height: 14px;
    margin: 3px 0;
  }
}

.modal-table {
  max-height: 450px;
  overflow-x: hidden !important;
  font-size: 10px;
  background-color: #e9ecef !important;

  tbody {
    text-transform: uppercase;
    tr td {
      cursor: pointer;
    }
    tr input[type="checkbox"] {
      margin: 3px 0;
      height: 12px;
      width: 12px;
      border-width: 1px !important;
    }
  }

  thead tr th {
    font-size: 11px;
  }
}

.sticky-row-top {
  display: block !important;
  overflow: hidden !important;
  position: sticky !important;
  top: 0 !important;
  overflow: hidden !important;
  z-index: 5 !important;
}
.sticky-row-add {
  display: block;
  overflow: hidden !important;
  position: sticky !important;
  position: -webkit-sticky !important;
  top: 19px !important;
  overflow: hidden !important;
  z-index: 5 !important;
}
.sticky-row-bottom {
  display: block !important;
  overflow: hidden !important;
  position: sticky !important;
  top: 37px !important;
  overflow: hidden !important;
  z-index: 5;
}
</style>
