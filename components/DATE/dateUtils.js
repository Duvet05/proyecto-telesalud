import { parse } from "date-fns";

export const toDate = (date) => {
  return parse(date, "yyyy-MM-dd HH:mm:ss xx", new Date());
};
