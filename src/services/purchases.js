import moment from "moment";
import { apiRequests } from "../utils/apiRequests";
import { purchasesRoutes } from "../utils/routes";

const Purchases = {
  get: (pageIndex, rowsPerPage, search = "") => {
    return apiRequests(
      `${purchasesRoutes.get}?start=${pageIndex}&limit=${rowsPerPage}&search=${search}`,
      "GET"
    );
  },

  getTotalPurchasesAmount: () => {
    return apiRequests(
      `${purchasesRoutes.getTotalPurchase}/get-total-purchases-amount`,
      "GET"
    );
  },
};

export default Purchases;
