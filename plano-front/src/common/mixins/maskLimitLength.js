export default {
  methods: {
    maskLimitLength($event, maxLength) {
      if ($event.target.value.length >= maxLength) $event.preventDefault();
    },
  },
};
