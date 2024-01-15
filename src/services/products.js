import { apiRequests } from "../utils/apiRequests";
import { productsRoutes } from "../utils/routes";

const Products = {
  add: (data) => {
    const company =
      data?.company.charAt(0).toUpperCase() + data?.company.slice(1);
    return apiRequests(productsRoutes.add, "POST", {
      itemName: data?.itemName,
      buyingPrice: Number(data?.buyingPrice),
      company,
      sellingPrice: Number(data?.sellingPrice),
      unit: data?.unit,
      quantity: Number(data?.quantity),
      buyerId: Number(data?.buyer),
      buyingDate: data?.buyingDate,
    });
  },

  update: (data) => {
    const id = data?.id;
    const company =
      data?.company.charAt(0).toUpperCase() + data?.company.slice(1);
    return apiRequests(`${productsRoutes.patch}/${id}`, "PATCH", {
      itemName: data?.itemName,
      buyingPrice: Number(data?.buyingPrice),
      company,
      sellingPrice: Number(data?.sellingPrice),
      unit: data?.unit,
      quantity: Number(data?.quantity),
      buyerId: Number(data?.buyer),
      buyingDate: data?.buyingDate,
    });
  },

  get: (pageIndex, rowsPerPage, search = "") => {
    return apiRequests(
      `${productsRoutes.get}?start=${pageIndex}&limit=${rowsPerPage}&search=${search}`,
      "GET"
    );
  },

  getAll: () => {
    return apiRequests(productsRoutes.getAll, "GET");
  },

  delete: (id) => {
    return apiRequests(`${productsRoutes.delete}/${id}`, "DELETE");
  },

  getBuyers: () => {
    return apiRequests(productsRoutes.getBuyers, "GET");
  },
};

export default Products;
