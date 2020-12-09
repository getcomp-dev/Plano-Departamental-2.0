export default {
  methods: {
    toggleItemInArray(item, array, key = "") {
      let index;
      if (key === "") {
        index = array.indexOf(item);
      } else {
        index = array.findIndex((arrItem) => arrItem[key] === item[key]);
      }

      if (index === -1) array.push(item);
      else array.splice(index, 1);
    },
  },
};
