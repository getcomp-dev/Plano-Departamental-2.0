import dayjs from "dayjs";
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);

export default function parseDateUTC(dateUTC) {
  return dayjs.utc(dateUTC).tz("America/Sao_Paulo").format("DD/MM/YY - HH:mm");
}
