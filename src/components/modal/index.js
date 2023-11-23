import React, { useEffect, useState } from "react";
import "./style.css";
import { Dialog } from "primereact/dialog";
import moment from "moment";

const Modal = ({
  visible,
  onHide,
  title,
  fields,
  onSubmit,
  dataToUpdate = {},
}) => {
  const [data, formData] = useState({});

  useEffect(() => {
    const initializeFormData = () => {
      const initialValues = {};
      fields.forEach((field) => {
        if (field.type === "date") {
          initialValues[field.name] = dataToUpdate[field.name]
            ? moment(dataToUpdate[field.name])
            : moment();
        } else if (field?.type === "select") {
          if (field?.name === "buyer") {
            initialValues[field.name] = dataToUpdate[field.name]
              ? dataToUpdate.buyerId
              : "";
          } else if (field?.name === "unit") {
            initialValues[field.name] = dataToUpdate[field.name]
              ? dataToUpdate.unit
              : "";
          }
        } else {
          initialValues[field.name] = dataToUpdate
            ? dataToUpdate[field.name]
            : "";
        }
      });
      return initialValues;
    };

    formData(initializeFormData());
  }, [fields, dataToUpdate]);

  const handleChange = (name) => (e) => {
    formData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    if (dataToUpdate) data["id"] = dataToUpdate?.id;
    e.preventDefault();
    onSubmit(data);
    resetForm();
    onHide();
  };

  const resetForm = () => {
    const initialFormData = {};
    fields?.forEach((field) => {
      initialFormData[field.name] = field.type === "date" ? moment() : "";
    });
    formData(initialFormData);
  };

  return (
    <Dialog
      header={title}
      visible={visible}
      style={{ width: "50vw" }}
      onHide={onHide}
      className="dialog"
    >
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {fields?.map((field, index) => (
              <div className="col-md-6 ps-0" key={index}>
                <div className="mb-3">
                  <label htmlFor={field?.name} className="form-label">
                    {field?.label}
                  </label>
                  {field?.type === "select" ? (
                    <select
                      className="form-select"
                      id={field?.name}
                      name={field?.name}
                      required={field?.required}
                      value={data[field?.name] || ""}
                      onChange={handleChange(field?.name)}
                    >
                      {field?.options.map((option, optionIndex) => (
                        <option key={optionIndex} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field?.type}
                      className="form-control"
                      id={field?.name}
                      name={field?.name}
                      required={field?.required}
                      value={
                        field?.type !== "date"
                          ? data[field?.name] || ""
                          : moment(data[field?.name]).format("YYYY-MM-DD")
                      }
                      onChange={handleChange(field?.name)}
                      placeholder={`Enter ${field?.label}`}
                    />
                  )}
                </div>
              </div>
            ))}
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
