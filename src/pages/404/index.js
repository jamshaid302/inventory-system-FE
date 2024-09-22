import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div>
      <h3 className="errorCode">404</h3>
      <h4 data-text="Opps! Page not found">Opps! Page not found</h4>
      <Link to={"/"} className="ErrorButtonText">
        Return Home
      </Link>
    </div>
  );
};

export default Error404;
