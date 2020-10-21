export default {
  methods: {
    toggleAsideModal(name) {
      const modalRef = "modal" + name.toLowerCase();

      this.$_.forEach(this.asideModalsRefs, (ref) => {
        if (modalRef === ref.toLowerCase()) this.$refs[ref].toggle();
        else this.$refs[ref].close();
      });
    },
  },
};
