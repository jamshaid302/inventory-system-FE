import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import Products from "../../services/products";

const SalesPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([
    { id: "", quantity: 1, totalItemPrice: 0 },
  ]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const products = async () => {
      const res = await Products.getAll();
      setProducts(res?.data?.products);
    };

    products();
  }, []);

  const handleChange = (e, index) => {
    const selectedItemId = parseInt(e.target.value);
    const selectedProduct = products.find(
      (product) => product.id === selectedItemId
    );

    const updatedItems = [...selectedItems];
    updatedItems[index] = {
      ...selectedProduct,
      quantity: 1,
      totalItemPrice: selectedProduct.price,
    };
    setSelectedItems(updatedItems);

    const newTotalPrice = updatedItems.reduce(
      (sum, item) => sum + item.totalItemPrice,
      0
    );
    setTotalPrice(newTotalPrice);
  };

  return (
    <Layout>
      <div className="container d-flex flex-column">
        <h2>Sale Form</h2>

        {selectedItems.map((item, index) => (
          <div
            key={index}
            className="row mt-4 d-flex flex-row align-items-center"
          >
            <div className="col-md-2 d-flex flex-column align-items-start">
              <label>Item</label>
              <select
                className="form-select"
                value={item.id}
                onChange={(e) => handleChange(e, index)}
              >
                <option value="">Select an item</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.itemName}
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
                value=""
                // onChange={(e) => handleQuantityChange(e, index)}
              />
            </div>
            <div className="col-md-2 d-flex flex-column align-items-start">
              <label>Discount</label>
              <input
                type="number"
                className="form-control"
                value=""
                // onChange={(e) => handleQuantityChange(e, index)}
              />
            </div>
            <div className="col-md-2 d-flex flex-column align-items-start">
              <label>Total</label>
              <input
                type="text"
                className="form-control"
                value={item.totalItemPrice}
                readOnly
              />
            </div>
            <div className="col-md-2 d-flex flex-column align-items-start">
              <label>Remove</label>
              <button
                type="button"
                className="btn btn-danger"
                // onClick={() => handleRemoveItem(index)}
              >
                Remove
              </button>
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
              className="btn btn-primary"
              // onClick={() => setSelectedItems([...selectedItems, {}])}
            >
              Add Item
            </button>
            <button type="button" className="btn btn-success ms-2">
              Print
            </button>
            <button type="button" className="btn btn-info ms-2">
              Save
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SalesPage;
