import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import Products from "../../services/products";
import Sales from "../../services/sales";
import "./style.css";
import { v4 as uuidv4 } from "uuid";
import Toast from "../../components/toast";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import SalesForm from "../../components/salesForm";

const initialItem = {
  id: "",
  uuid: uuidv4().slice(0, 8),
  sellingPrice: 0,
  quantity: 1,
  discount: 0,
  totalItemPrice: 0,
};

const SalesPage = () => {
  let [selectedItems, setSelectedItems] = useState([initialItem]);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("sales");

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
    const selectedProduct = products.find(
      (pro) => pro?.id === Number(e?.value)
    );

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

    if (selectedProduct?.id && index === selectedItems.length - 1) {
      handleAddItem();
    }
  };

  const handleQuantityChange = (e, index) => {
    if (Number(e?.target?.value) < 1) return;
    if (index === selectedItems.length - 1) return;

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
    if (Number(e?.target?.value) < 0) return;
    if (index === selectedItems.length - 1) return;

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
    }
  };

  const handleRemoveItem = (id) => {
    if (id && selectedItems?.length > 1) {
      setSelectedItems(selectedItems.filter((item) => item.uuid !== id));
    } else {
      setSelectedItems([initialItem]);
    }
  };

  const handleSave = async () => {
    try {
      selectedItems = selectedItems.filter((item) => item?.id !== "");

      if (activeTab === "sales") {
        const res = await Sales.add(selectedItems, totalPrice);
        if (res?.data?.invoice) {
          setMessage(res?.data?.message);
          setShowToast(true);
          setSelectedItems([initialItem]);
        }
      } else {
        const res = await Sales.update(selectedItems, totalPrice);
        if (res?.data?.message) {
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

  const handleTabSelect = (selectedTab) => {
    setActiveTab(selectedTab);
    setSelectedItems([initialItem]);
  };

  return (
    <Layout>
      <div className="d-flex flex-column h-100">
        <div className="tabs">
          <Tabs
            defaultActiveKey="sales"
            id="fill-tab-example"
            className=""
            fill
            onSelect={handleTabSelect}
          >
            <Tab eventKey="sales" title="Sales Form">
              <SalesForm
                selectedItems={selectedItems}
                products={products}
                handleChange={handleChange}
                handleQuantityChange={handleQuantityChange}
                handleDiscountChange={handleDiscountChange}
                handleRemoveItem={handleRemoveItem}
              />
            </Tab>
            <Tab eventKey="returns" title="Returns">
              <SalesForm
                selectedItems={selectedItems}
                products={products}
                handleChange={handleChange}
                handleQuantityChange={handleQuantityChange}
                handleDiscountChange={handleDiscountChange}
                handleRemoveItem={handleRemoveItem}
                formTitle="Returns"
              />
            </Tab>
          </Tabs>
        </div>

        <div className="total-price sticky">
          <div className="row">
            <div className="col-md-12">
              <strong>Total Price: {totalPrice}.Rs</strong>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-12">
              <button
                type="button"
                className="btn btn-primary w-25"
                onClick={handleSave}
              >
                {activeTab === "returns" ? "Return" : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showToast && <Toast message={message} showToast={showToast} />}
    </Layout>
  );
};

export default SalesPage;
