export const YEARS_LIST = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "Octobar",
  "November",
  "December",
];

const itemUnits = [
  { value: "mm", text: "mm" },
  { value: "feet", text: "feet" },
  { value: "cm", text: "cm" },
  { value: "piece", text: "piece" },
];

export const PRODUCT_FIELDS = [
  { name: "itemName", label: "Item Name", type: "text", required: true },
  {
    name: "buyingPrice",
    label: "Buying Price",
    type: "number",
    required: true,
  },
  {
    name: "sellingPrice",
    label: "Selling Price",
    type: "number",
    required: true,
  },
  {
    name: "unit",
    label: "Item Unit",
    type: "select",
    options: itemUnits,
    required: true,
  },
  {
    name: "quantity",
    label: "Quantity",
    type: "number",
    required: true,
  },
  {
    name: "buyer",
    label: "Purchase From",
    type: "select",
    required: true,
  },
  { name: "buyingDate", label: "Buying Date", type: "date", required: true },
];

export const PRODUCT_TABLE_COLUMNS = [
  { header: "ID", field: "id", sortable: true },
  { header: "Name", field: "itemName", sortable: true },
  { header: "Buying Price", field: "buyingPrice" },
  { header: "Selling Price", field: "sellingPrice" },
  { header: "Unit", field: "unit" },
  { header: "Quantity", field: "quantity" },
  { header: "Dealer", field: "buyer" },
  { header: "BuyingDate", field: "buyingDate", sortable: true },
];

export const BUYER_FIELDS = [
  { name: "fullName", label: "Full Name", type: "text", required: true },
  { name: "city", label: "City", type: "text" },
  // { name: "payment", label: "Payment", type: "number", required: true },
  // { name: "buyingDate", label: "Buying Date", type: "date", required: true },
];

export const BUYER_TABLE_COLUMNS = [
  { header: "ID", field: "id", sortable: true },
  { header: "Full Name", field: "fullName", sortable: true },
  { header: "City", field: "city", sortable: false },
  { header: "BuyingDate", field: "buyingDate", sortable: false },
  { header: "Payment", field: "payment", sortable: true },
];

export const PURCHASE_TABLE_COLUMNS = [
  { header: "ID", field: "id", sortable: true },
  { header: "Item Name", field: "item", sortable: true },
  { header: "Per-unit Price", field: "perUnitPrice" },
  { header: "Quantity", field: "quantity" },
  { header: "Dealer", field: "buyer" },
  { header: "Purchasing Date", field: "purchasingDate", sortable: true },
  { header: "Total Amount", field: "totalAmount" },
];
