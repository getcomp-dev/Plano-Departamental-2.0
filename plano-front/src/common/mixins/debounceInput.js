import { debounce } from "@/common/utils";

export default {
  methods: {
    debounceInput(event, currentValue, wait = 500) {
      debounce(() => {
        this[currentValue] = event.target.value;
      }, wait);
    },
  },
};
