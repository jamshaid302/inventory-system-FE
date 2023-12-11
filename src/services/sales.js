import moment from "moment";
import { apiRequests } from "../utils/apiRequests";
import { salesRoutes } from "../utils/routes";

const Sales = {
  add: (data, total) => {
    const metaData = {
      data,
      invoiceTotal: total,
    };
    return apiRequests(salesRoutes.add, "POST", metaData);
  },
};

export default Sales;
