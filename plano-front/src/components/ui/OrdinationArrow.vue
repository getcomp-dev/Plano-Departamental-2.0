<template>
  <font-awesome-icon
    :icon="['fas', options.currentIcon]"
    :class="options.classes"
  />
</template>

<script>
export default {
  name: "OrdinationArrow",
  props: {
    currentOrder: { type: Object, required: true },
    orderToCheck: { type: String, required: true },
  },
  computed: {
    options() {
      const { currentOrder, orderToCheck } = this;
      let classes = "low-opacity";
      let currentIcon = "arrow-down";

      if (currentOrder.order === orderToCheck) {
        currentIcon = currentOrder.type === "asc" ? "arrow-down" : "arrow-up";
        classes = "";
      }

      return {
        currentIcon,
        classes,
      };
    },
  },
};
</script>
