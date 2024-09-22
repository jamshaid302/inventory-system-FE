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

  update: (data, total) => {
    const metaData = {
      data,
      invoiceTotal: total,
    };
    return apiRequests(salesRoutes.update, "POST", metaData);
  },

  get: (pageIndex, rowsPerPage, search = "") => {
    return apiRequests(
      `${salesRoutes.get}?start=${pageIndex}&limit=${rowsPerPage}&search=${search}`,
      "GET"
    );
  },

  getSalesTotal: () => {
    return apiRequests(salesRoutes.getTotals, "GET");
  },
};

export default Sales;
