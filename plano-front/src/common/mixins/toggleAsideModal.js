export default {
  methods: {
    toggleAsideModal(name) {
      const modalRef = "modal" + this.$_.capitalize(name);

      this.$_.forEach(this.asideModalsRefs, (ref) => {
        if (modalRef === ref) this.$refs[ref].toggle();
        else this.$refs[ref].close();
      });
    },
  },
};
