import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import Products from "../../services/products";
import { DashCircle, PlusCircle } from "react-bootstrap-icons";
import "./style.css";
import { v4 as uuidv4 } from "uuid";

const initialItem = {
  id: "",
  uuid: uuidv4().slice(0, 8),
  sellingPrice: 0,
  quantity: 1,
  discount: 0,
  totalItemPrice: 0,
};

const SalesPage = () => {
  const [selectedItems, setSelectedItems] = useState([initialItem]);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const products = async () => {
      const res = await Products.getAll();
      setProducts(res?.data?.products);
    };

    products();
  }, []);

  useEffect(() => {
    calculateInvoicePrice(selectedItems);
  }, [selectedItems]);

  const handleChange = (e, index) => {
    const selectedProductId = e?.target?.value;
    const selectedProduct = products.find(
      (pro) => pro?.id == Number(selectedProductId)
    );

    // const updatedItem = {
    //   ...initialItem,
    //   id: selectedProduct?.id,
    //   sellingPrice: selectedProduct?.sellingPrice,
    //   totalItemPrice: calculateTotalItemPrice(initialItem),
    // };

    // updateItems(index, updatedItem);

    const updatedItems = [...selectedItems];
    const newUUID = uuidv4().slice(0, 8);

    updatedItems[index] = {
      id: selectedProduct?.id,
      sellingPrice: selectedProduct?.sellingPrice,
      uuid: newUUID,
      quantity: 1,
      discount: 0,
      totalItemPrice:
        selectedProduct?.sellingPrice * Number(updatedItems[index].quantity) -
        Number(updatedItems[index].discount),
    };
    setSelectedItems(updatedItems);
  };

  const handleQuantityChange = (e, index) => {
    const quantity = Number(e?.target?.value) || 0;
    const updatedItem = {
      ...selectedItems[index],
      quantity,
      totalItemPrice: calculateTotalItemPrice({
        ...selectedItems[index],
        quantity,
      }),
    };

    updateItems(index, updatedItem);

    // const updatedItems = [...selectedItems];
    // updatedItems[index].quantity = Number(e.target?.value);
    // updatedItems[index].totalItemPrice =
    //   Number(updatedItems[index].sellingPrice) *
    //     Number(updatedItems[index].quantity) -
    //   Number(updatedItems[index].discount);
    // setSelectedItems(updatedItems);
  };

  const handleDiscountChange = (e, index) => {
    const discount = Number(e?.target?.value) || 0;
    const updatedItem = {
      ...selectedItems[index],
      discount,
      totalItemPrice: calculateTotalItemPrice({
        ...selectedItems[index],
        discount,
      }),
    };
    updateItems(index, updatedItem);

    // const updatedItems = [...selectedItems];
    // updatedItems[index].discount = Number(e.target?.value);
    // updatedItems[index].totalItemPrice =
    //   Number(updatedItems[index].sellingPrice) *
    //     Number(updatedItems[index].quantity) -
    //   Number(e.target?.value);
    // setSelectedItems(updatedItems);
  };

  const calculateTotalItemPrice = (item) => {
    const { sellingPrice, quantity, discount } = item;
    return sellingPrice * quantity - discount;
  };

  const updateItems = (index, updatedItem) => {
    const updatedItems = [...selectedItems];
    updatedItems[index] = updatedItem;
    calculateInvoicePrice(updatedItems);
    setSelectedItems(updatedItems);
  };

  const calculateInvoicePrice = (items) => {
    const totalAmount = items.reduce(
      (sum, item) => sum + item?.totalItemPrice,
      0
    );
    setTotalPrice(totalAmount);
  };

  const handleRemoveItem = (id) => {
    if (id && selectedItems?.length > 1) {
      setSelectedItems(selectedItems.filter((item) => item.uuid !== id));
    } else {
      setSelectedItems([initialItem]);
    }
  };

  const handleSave = () => {
    console.log("fsdfjshd", { ...selectedItems, invoiceTotal: totalPrice });
  };

  // const handleChange = (e, index) => {
  //   const selectedItemId = parseInt(e.target.value);
  //   const selectedProduct = products.find(
  //     (product) => product.id === selectedItemId
  //   );

  //   const updatedItems = [...selectedItems];
  //   updatedItems[index] = {
  //     ...selectedProduct,
  //     quantity: 1,
  //     totalItemPrice: selectedProduct.price,
  //   };
  //   setSelectedItems(updatedItems);

  //   const newTotalPrice = updatedItems.reduce(
  //     (sum, item) => sum + item.totalItemPrice,
  //     0
  //   );
  //   setTotalPrice(newTotalPrice);
  // };

  return (
    <Layout>
      <div className="container d-flex flex-column">
        <div className="heading">
          <h2>Sale Form</h2>
        </div>
        {selectedItems.map((item, index) => (
          <div
            key={index}
            className="row mt-4 d-flex flex-row align-items-center"
          >
            <div className="col-md-2 d-flex flex-column align-items-start">
              <label>Item</label>
              <select
                className="form-select"
                value={item?.id}
                onChange={(e) => handleChange(e, index)}
              >
                <option value="">Select an item</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product?.itemName}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-2 d-flex flex-column align-items-start">
              <label>Price</label>
              <input
                type="text"
                className="form-control"
                value={item?.sellingPrice}
                readOnly
              />
            </div>

            <div className="col-md-2 d-flex flex-column align-items-start">
              <label>Quantity</label>
              <input
                type="number"
                className="form-control"
                value={item?.quantity}
                onChange={(e) => handleQuantityChange(e, index)}
              />
            </div>

            <div className="col-md-2 d-flex flex-column align-items-start">
              <label>Discount</label>
              <input
                type="number"
                className="form-control"
                value={item?.discount}
                onChange={(e) => handleDiscountChange(e, index)}
              />
            </div>

            <div className="col-md-2 d-flex flex-column align-items-start ">
              <label>Total</label>
              <input
                type="text"
                className="form-control"
                value={item?.totalItemPrice}
                readOnly
              />
            </div>

            <div className="col-md-2 d-flex flex-column">
              <span className="actions">
                <PlusCircle
                  className="circles"
                  size={30}
                  color="green"
                  onClick={() => {
                    if (selectedItems[selectedItems?.length - 1]?.id) {
                      setSelectedItems([
                        ...selectedItems,
                        { ...initialItem, uuid: uuidv4().slice(0, 8) },
                      ]);
                    }
                  }}
                />
                <DashCircle
                  className="circles"
                  size={30}
                  color="red"
                  onClick={() => handleRemoveItem(item?.uuid)}
                />
              </span>
            </div>
          </div>
        ))}

        <div className="row mt-4">
          <div className="col-md-12">
            <strong>Total Price: ${totalPrice}</strong>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-12">
            <button
              type="button"
              className="btn btn-success ms-2"
              onClick={() => window.print()}
            >
              Print
            </button>
            <button
              type="button"
              className="btn btn-info ms-2"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SalesPage;
