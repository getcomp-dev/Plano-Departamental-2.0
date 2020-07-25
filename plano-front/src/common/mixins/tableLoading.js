export default {
  data() {
    return {
      tableIsLoading: false,
    };
  },
  methods: {
    setTableLoadingState(newValue) {
      if (newValue) this.tableIsLoading = newValue;
      else
        this.$nextTick(() => {
          setTimeout(() => {
            this.tableIsLoading = false;
          }, 500);
        });
    },
  },
  watch: {
    tableIsLoading(newValue) {
      if (newValue) this.$store.commit("SET_LOADING_STATE", "partial");
      else this.$store.commit("SET_LOADING_STATE", "completed");
    },
  },
};
