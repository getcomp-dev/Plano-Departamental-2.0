import dayjs from "dayjs";
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);

export default {
  filters: {
    convertDateUTC(dateUTC) {
      return dayjs.utc(dateUTC).tz("America/Sao_Paulo").format("HH:mm - DD/MM/YY");
    },
  },
};
