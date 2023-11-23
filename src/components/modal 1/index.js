import React, { useState } from "react";
import "./style.css";
import { Dialog } from "primereact/dialog";
import moment from "moment";

const Modal = ({ visible, onHide }) => {
  const [data, formDate] = useState({
    itemName: "",
    buyingPrice: 0,
    sellingPrice: 0,
    itemUnit: "",
    purchaseFrom: "",
    date: new Date(),
  });

  const itemUnits = [
    { value: "mm", text: "mm" },
    { value: "feet", text: "feet" },
    { value: "cm", text: "cm" },
  ];

  const handleChange = (name) => (e) => {
    formDate((prev) => ({ ...prev, [name]: e.target.value }));
  };

  return (
    <Dialog
      header="Add Item"
      visible={visible}
      style={{ width: "50vw" }}
      onHide={onHide}
    >
      <div className="container">
        <form>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="itemName" className="form-label">
                  Item Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="itemName"
                  name="itemName"
                  value={data?.itemName}
                  placeholder="Enter Item Name"
                  onChange={handleChange("name")}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="buyingPrice" className="form-label">
                  Buying Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="buyingPrice"
                  name="buyingPrice"
                  value={data?.buyingPrice}
                  onChange={handleChange("buyingPrice")}
                  placeholder="Enter Buying Price"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="sellingPrice" className="form-label">
                  Selling Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="sellingPrice"
                  name="sellingPrice"
                  value={data?.sellingPrice}
                  onChange={handleChange("sellingPrice")}
                  placeholder="Enter Selling Price"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="itemUnit" className="form-label">
                  Item Unit
                </label>
                <select
                  className="form-select"
                  id="itemUnit"
                  name="itemUnit"
                  value={data?.itemUnit}
                  onChange={handleChange("itemUnit")}
                >
                  {itemUnits.map((item, index) => (
                    <option key={index} value={item?.value}>
                      {item?.text}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="purchaseFrom" className="form-label">
                  Purchase From
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="purchaseFrom"
                  name="purchaseFrom"
                  value={data?.purchaseFrom}
                  onChange={handleChange("purchaseFrom")}
                  placeholder="Enter Purchase From"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  value={moment(data?.date).format("YYYY-MM-DD")}
                  onChange={handleChange("date")}
                  placeholder="Select a Date"
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 d-flex buttons">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button type="button" className="btn btn-danger" onClick={onHide}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default Modal;
