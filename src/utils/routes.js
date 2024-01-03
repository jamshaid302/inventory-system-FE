const API_URL = process.env.REACT_APP_API_URL;

export const userRoutes = {
  login: `${API_URL}/api/user/login`,
};

export const buyerRoutes = {
  add: `${API_URL}/api/buyer`,
  get: `${API_URL}/api/buyer`,
  delete: `${API_URL}/api/buyer`,
  patch: `${API_URL}/api/buyer`,
};

export const productsRoutes = {
  getBuyers: `${API_URL}/api/product/get-buyers`,
  patch: `${API_URL}/api/product`,
  add: `${API_URL}/api/product`,
  get: `${API_URL}/api/product`,
  getAll: `${API_URL}/api/product/get-all`,
  delete: `${API_URL}/api/product`,
};

export const purchasesRoutes = {
  get: `${API_URL}/api/purchases`,
  getTotalPurchase: `${API_URL}/api/purchases`,
};

export const salesRoutes = {
  get: `${API_URL}/api/sales`,
  add: `${API_URL}/api/sales`,
  getTotals: `${API_URL}/api/sales/sales-total`,
};
