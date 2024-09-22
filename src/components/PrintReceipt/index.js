import React from "react";
import "./style.css";

const Receipt = ({ data, total }) => {
  return (
    <div
      style={{ width: "50%", fontSize: "12px", height: "100%" }}
      className="d-flex flex-column justify-content-between"
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
              <p>{`INV${Math.floor(Math.random() * 100000)}`}</p>
            </div>
            <div className="invoice">
              <p style={{ fontWeight: "bold" }}>Invoice Date:</p>
              <p>{new Date().toLocaleDateString()}</p>
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
              {data.map((item) => (
                <tr
                  key={item.id}
                  style={{ borderBottom: "1px solid #000" }}
                  className="table-heading"
                >
                  <td>{item.quantity}</td>
                  <td>{item.name}</td>
                  <td>{item.company}</td>
                  <td>{item.sellingPrice}</td>
                  <td>{item.discount}</td>
                  <td>{item.totalItemPrice}</td>
                </tr>
              ))}
              {/* Total Amount Row */}
              <tr className="table-heading">
                <td colSpan="5" style={{ textAlign: "right" }}>
                  <strong>Total:</strong>
                </td>
                <td style={{ fontWeight: "bold" }}>{total.toFixed(2)}</td>
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
  );
};

export default Receipt;
