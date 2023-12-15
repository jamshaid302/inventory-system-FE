import React, { useEffect, useRef, useState } from "react";
import Layout from "../../components/layout";
import Products from "../../services/products";
import Sales from "../../services/sales";
import { PlusCircle, XCircle } from "react-bootstrap-icons";
import "./style.css";
import { v4 as uuidv4 } from "uuid";
import Receipt from "../../components/PrintReceipt";
import Toast from "../../components/toast";
import Select from "react-select";

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
    const selectedProduct = products.find((pro) => pro?.id == Number(e?.value));

    selectedItems[index] = {
      ...selectedItems[index],
      id: selectedProduct?.id,
      sellingPrice: selectedProduct?.sellingPrice,
      name: selectedProduct?.itemName,
      company: selectedProduct?.company,
      uuid: uuidv4().slice(0, 8),
      quantity: 1,
      discount: 0,
      totalItemPrice: calculateTotalItemPrice({
        sellingPrice: selectedProduct?.sellingPrice,
        quantity: 1,
        discount: 0,
      }),
    };
    setSelectedItems([...selectedItems]);
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

  return (
    <Layout>
      <div className="d-flex flex-column h-100">
        <div className="heading">
          <h2>Sale Form</h2>
        </div>
        <div className="scrollable-content">
          {selectedItems.map((item, index) => (
            <div
              key={index}
              ref={index === selectedItems.length - 1 ? lastRowRef : null}
              className="row mt-4 mb-4 d-flex flex-row align-items-center"
            >
              <div className="col-md-2 d-flex flex-column">
                <label className="d-flex">Item</label>
                {/* <select
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
                </select> */}
                <Select
                  options={products.map((prod) => ({
                    value: prod?.id,
                    label: `${prod?.itemName} (${prod?.company})`,
                  }))}
                  placeholder="Select Item"
                  value={
                    selectedItems[index]?.id
                      ? {
                          value: selectedItems[index]?.id,
                          label: `${selectedItems[index]?.name} (${selectedItems[index]?.company})`,
                        }
                      : null
                  }
                  onChange={(e) => handleChange(e, index)}
                  isSearchable={true}
                />
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
                    <XCircle
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
