export default {
  methods: {
    toggleAsideModal(name) {
      const modalRef = "modal" + name.toLowerCase();

      this.asideModalsRefs.forEach((ref) => {
        if (modalRef === ref.toLowerCase()) this.$refs[ref].toggle();
        else this.$refs[ref].close();
      });
    },
  },
};
