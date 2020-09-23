export default {
  methods: {
    maskEmptyToZero(event, obj, key) {
      if (event.target.value == "") obj[key] = 0;
    },
  },
};
