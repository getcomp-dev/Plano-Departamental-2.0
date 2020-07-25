export default {
  methods: {
    toggleOrder(currentOrder, newOrder, type = "asc") {
      if (currentOrder.order != newOrder) {
        currentOrder.order = newOrder;
        currentOrder.type = type;
      } else {
        currentOrder.type = currentOrder.type == "asc" ? "desc" : "asc";
      }
    },
    setIconByOrder(currentOrder, orderToCheck) {
      if (currentOrder.order === orderToCheck) {
        return currentOrder.type === "asc"
          ? "fas fa-arrow-down fa-sm"
          : "fas fa-arrow-up fa-sm";
      } else {
        return "fas fa-arrow-down fa-sm low-opacity";
      }
    },
  },
};
