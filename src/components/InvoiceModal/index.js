import React, { useRef, useState } from "react";
import "./style.css";
import { Dialog } from "primereact/dialog";
import moment from "moment";
import ReactToPrint from "react-to-print";

const InvoiceModal = ({ visible, onHide, invoice }) => {
  const receiptRef = useRef();
  const salesItem = invoice?.salesItem || [];

  return (
    <Dialog
      header="Invoice"
      visible={visible}
      style={{ width: "50vw", height: "100vh" }}
      onHide={onHide}
    >
      <div
        style={{ width: "58mm", fontSize: "12px", height: "100%" }}
        className="d-flex flex-column justify-content-between"
        ref={receiptRef}
      >
        <div>
          <header className="headerStyle">
            <div className="right-content">
              <p>Butt Sanitary Store</p>
              <p>By Pass Road, Rahim Yar Khan</p>
              <p>Phone: (555) 123-4567</p>
              <p>Email: info@buttsanitary.com</p>
            </div>
            <div className="left-content">
              <div className="invoice">
                <p style={{ fontWeight: "bold" }}>Invoice Number:</p>
                <p>{invoice?.invoiceNumber}</p>
              </div>
              <div className="invoice">
                <p style={{ fontWeight: "bold" }}>Invoice Date:</p>
                <p>{moment(invoice?.date).format("MMM-DD-YYYY")}</p>
              </div>
            </div>
          </header>
          <main className="receipt-table">
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                border: "1px solid #000",
              }}
            >
              <thead className="table-head">
                <tr
                  style={{ borderBottom: "1px solid #000" }}
                  className="table-heading"
                >
                  <th>Qty</th>
                  <th>Item</th>
                  <th>Company</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {salesItem.map((item) => (
                  <tr
                    key={item.id}
                    style={{ borderBottom: "1px solid #000" }}
                    className="table-heading"
                  >
                    <td>{`${
                      item.quantity
                    } (${item?.product?.unit[0].toUpperCase()})`}</td>
                    <td>{item?.product?.itemName}</td>
                    <td>{item?.product?.company}</td>
                    <td>{item?.product?.sellingPrice}</td>
                    <td>{item.discount}</td>
                    <td>{item?.itemTotal}</td>
                  </tr>
                ))}
                {/* Total Amount Row */}
                <tr className="table-heading">
                  <td colSpan="5" style={{ textAlign: "right" }}>
                    <strong>Total:</strong>
                  </td>
                  <td style={{ fontWeight: "bold" }}>
                    {invoice?.invoiceTotal.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </main>
        </div>
        <footer className="footerStyle">
          <p>Thank you for shopping with us!</p>
          <p>Developed by: M Jamshaid Khan</p>
        </footer>
      </div>
      <div>
        <ReactToPrint
          trigger={() => <button>Print Receipt</button>}
          content={() => receiptRef.current}
        />
      </div>
    </Dialog>
  );
};

export default InvoiceModal;
