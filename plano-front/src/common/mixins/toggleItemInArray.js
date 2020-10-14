export default {
  methods: {
    toggleItemInArray(item, array, key = "") {
      let index;
      if (key === "") index = this.$_.indexOf(array, item);
      else index = this.$_.findIndex(array, [key, item[key]]);

      if (index === -1) array.push(item);
      else array.splice(index, 1);
    },
  },
};
