export default {
  beforeCreate() {
    this.$root.onLoad = true;
  },
  mounted() {
    setTimeout(() => {
      this.$root.onLoad = false;
    }, 100);
  },
};
