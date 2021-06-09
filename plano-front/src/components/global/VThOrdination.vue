<template>
  <v-th @click.native="toggleOrder" :width="width" class="v-th">
    <div class="position-relative max-content mx-auto">
      <slot></slot>

      <font-awesome-icon
        v-if="orderFixed"
        :icon="['fas', 'thumbtack']"
        :class="['icon-fixed', { 'low-opacity': currentOrder.order === null }]"
        title="Ordenação fixa"
      />

      <OrdinationArrow
        :class="['icon-arrow', { 'is-fixed': orderFixed }]"
        :currentOrder="currentOrder"
        :orderToCheck="orderToCheck"
        :orderType="orderType"
      />
    </div>
  </v-th>
</template>

<script>
import OrdinationArrow from "@/components/ui/OrdinationArrow";

export default {
  name: "v-th-ordination",
  components: { OrdinationArrow },
  props: {
    currentOrder: { type: Object, required: true },
    orderToCheck: { type: String, required: true },
    orderType: { type: String, default: "asc" },
    orderFixed: { type: Boolean, default: false },
    width: { type: [String, Number], required: true },
  },

  methods: {
    toggleOrder() {
      const { currentOrder, orderType } = this;
      let newOrder = this.orderToCheck;

      if (this.orderFixed && currentOrder.type !== this.orderType) {
        newOrder = null;
      }

      if (currentOrder.order !== newOrder) {
        currentOrder.order = newOrder;
        currentOrder.type = orderType;
      } else {
        currentOrder.type = currentOrder.type == "asc" ? "desc" : "asc";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.v-th {
  &:hover {
    transition: all ease 0.3s;
    filter: brightness(95%);
    cursor: pointer;
  }

  svg {
    width: 7.5px !important;

    &.icon-arrow {
      position: absolute;
      top: 50%;
      right: -14px;
      transform: translate(-50%, -50%);
    }

    &.icon-fixed {
      position: absolute;
      top: 50%;
      left: -14px;
      transform: translate(50%, -50%);
    }
  }
}
</style>
