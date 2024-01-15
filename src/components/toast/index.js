import React, { useEffect } from "react";
import { Toast as BootstrapToast } from "bootstrap";

const Toast = ({ message = "", showToast, errorMessage = false }) => {
  useEffect(() => {
    const toastElement = document?.getElementById("myToast");
    if (toastElement && showToast) {
      const toast = new BootstrapToast(toastElement);
      toast.show();
    }
  }, [showToast]);

  return (
    <div
      className="toast-container position-fixed top-0 end-0 p-3"
      style={{ zIndex: 11 }}
    >
      <div
        id="myToast"
        className={`toast hide d-flex ${
          errorMessage ? "bg-danger" : "bg-success"
        }  text-white`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-body">{message}</div>
        <button
          type="button"
          className="btn-close me-2 m-auto btn-close-white"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
};

export default Toast;
