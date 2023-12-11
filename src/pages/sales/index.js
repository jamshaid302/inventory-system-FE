import React, { useEffect, useRef, useState } from "react";
import Layout from "../../components/layout";
import Products from "../../services/products";
import Sales from "../../services/sales";
import { DashCircle, PlusCircle } from "react-bootstrap-icons";
import "./style.css";
import { v4 as uuidv4 } from "uuid";
import Receipt from "../../components/PrintReceipt";
import Toast from "../../components/toast";

const initialItem = {
  id: "",
  uuid: uuidv4().slice(0, 8),
  sellingPrice: 0,
  quantity: 1,
  discount: 0,
  totalItemPrice: 0,
};

const SalesPage = () => {
  const lastRowRef = useRef(null);
  const [selectedItems, setSelectedItems] = useState([initialItem]);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [isReceiptVisible, setIsReceiptVisible] = useState(false);

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

  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  }, [showToast]);

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
      name: selectedProduct?.itemName,
      company: selectedProduct?.company,
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

  const handleAddItem = () => {
    if (selectedItems[selectedItems?.length - 1]?.id) {
      setSelectedItems([
        ...selectedItems,
        { ...initialItem, uuid: uuidv4().slice(0, 8) },
      ]);

      setTimeout(() => {
        lastRowRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      });
    }
  };

  const handleRemoveItem = (id) => {
    if (id && selectedItems?.length > 1) {
      setSelectedItems(selectedItems.filter((item) => item.uuid !== id));
    } else {
      setSelectedItems([initialItem]);
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleSave = async () => {
    try {
      if (selectedItems[selectedItems?.length - 1]?.id) {
        const res = await Sales.add(selectedItems, totalPrice);
        if (res?.data?.invoice) {
          setMessage(res?.data?.message);
          setShowToast(true);
          setSelectedItems([initialItem]);
        }
      }
    } catch (error) {
      console.error("error", error?.message);
      setMessage(error?.message);
    }
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
        <div className="scrollable-content">
          {selectedItems.map((item, index) => (
            <div
              key={index}
              ref={index === selectedItems.length - 1 ? lastRowRef : null} // Set ref for the last row
              className="row mt-4 mb-4 d-flex flex-row align-items-center"
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
                      {product?.itemName} ({product?.company})
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
                  <span
                    className="d-inline-block"
                    tabIndex="0"
                    data-toggle="tooltip"
                    title="Add Item"
                  >
                    <PlusCircle
                      className="circles"
                      size={30}
                      color="green"
                      onClick={handleAddItem}
                    />
                  </span>
                  <span
                    className="d-inline-block"
                    tabIndex="0"
                    data-toggle="tooltip"
                    title="Remove"
                  >
                    <DashCircle
                      className="circles"
                      size={30}
                      color="red"
                      onClick={() => handleRemoveItem(item?.uuid)}
                    />
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="total-price sticky">
          <div className="row">
            <div className="col-md-12">
              <strong>Total Price: ${totalPrice}</strong>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-12">
              {/* <button
              type="button"
              className="btn btn-success ms-2"
              onClick={() => setIsReceiptVisible(true)}
            >
              Print
            </button> */}
              <button
                type="button"
                className="btn btn-primary w-25"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {isReceiptVisible && (
        <Receipt
          data={selectedItems}
          total={totalPrice}
          onPrint={handlePrintReceipt}
        />
      )}

      {showToast && <Toast message={message} showToast={showToast} />}
    </Layout>
  );
};

export default SalesPage;
