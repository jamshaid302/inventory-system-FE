import moment from "moment";
import { apiRequests } from "../utils/apiRequests";
import { buyerRoutes } from "../utils/routes";

const Buyer = {
  add: (data) => {
    return apiRequests(buyerRoutes.add, "POST", {
      fullName: data?.fullName,
      city: data?.city,
      buyingDate: moment(data?.buyingDate),
      payment: Number(data?.payment),
    });
  },

  update: (data) => {
    const id = data?.id;
    return apiRequests(`${buyerRoutes.patch}/${id}`, "PATCH", {
      fullName: data?.fullName,
      city: data?.city,
      buyingDate: moment(data?.buyingDate),
      payment: Number(data?.payment),
    });
  },

  get: (pageIndex, rowsPerPage, search = "") => {
    return apiRequests(
      `${buyerRoutes.get}?start=${pageIndex}&limit=${rowsPerPage}&search=${search}`,
      "GET"
    );
  },

  delete: (id) => {
    return apiRequests(`${buyerRoutes.delete}/${id}`, "DELETE");
  },
};

export default Buyer;
