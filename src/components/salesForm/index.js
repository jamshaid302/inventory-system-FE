import React from "react";
import "./style.css";
import Select from "react-select";
import Button from "react-bootstrap/Button";

const SalesForm = ({
  selectedItems = [],
  products = [],
  handleChange,
  handleQuantityChange,
  handleDiscountChange,
  handleRemoveItem,
  lastRowRef,
  formTitle = "Sales Form",
}) => {
  return (
    <div className="scrollable-content">
      {selectedItems.map((item, index) => (
        <div
          key={index}
          ref={index === selectedItems.length - 1 ? lastRowRef : null}
          className="row mt-4 mb-4 d-flex flex-row align-items-center"
        >
          <div className="col-md-2 d-flex flex-column">
            <label className="d-flex">Item</label>
            <Select
              options={products.map((prod) => ({
                value: prod?.id,
                label: `${prod?.itemName} (${prod?.company})`,
              }))}
              placeholder="Select an Item"
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
              disabled={formTitle === "Returns" ? true : false}
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
              <Button
                variant="danger"
                onClick={() => handleRemoveItem(item?.uuid)}
              >
                Remove
              </Button>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SalesForm;
