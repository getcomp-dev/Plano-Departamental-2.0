<template>
  <th @click="toggleOrder" class="clickable">
    <div v-if="type === 'fixed'" class="container-fixed-order">
      <font-awesome-icon
        :icon="['fas', 'thumbtack']"
        :class="currentOrder.order === null ? 'low-opacity' : ''"
      />
      <span>{{ text }}</span>

      <OrdinationArrow
        :currentOrder="currentOrder"
        :orderToCheck="orderToCheck"
      />
    </div>

    <template v-else>
      {{ text }}
      <OrdinationArrow
        :currentOrder="currentOrder"
        :orderToCheck="orderToCheck"
      />
    </template>
  </th>
</template>

<script>
import OrdinationArrow from "@/components/ui/OrdinationArrow";

export default {
  name: "ThOrdination",
  components: { OrdinationArrow },
  props: {
    currentOrder: { type: Object, required: true },
    orderToCheck: { type: String, required: true },
    orderType: { type: String, default: "asc" },
    text: { type: String, required: true },
    type: { type: String, default: "" },
  },

  methods: {
    toggleOrder() {
      const { currentOrder, orderType } = this;
      let newOrder = this.orderToCheck;

      if (this.type === "fixed" && currentOrder.type === "desc") {
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

<style scoped>
.container-fixed-order {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.container-fixed-order > span {
  /* margin: 0 2px; */
}
</style>
