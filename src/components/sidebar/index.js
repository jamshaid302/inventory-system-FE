import React, { useEffect, useState } from "react";
import "./style.css";
import {
  House,
  People,
  Box,
  Bag,
  Receipt,
  Cart,
  Houses,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Sidebar = ({ children, openModal }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    try {
      const token = localStorage.getItem("token") || "";
      if (!token) navigate("/");
      const decode = jwtDecode(token);
      setUser(decode);
    } catch (error) {
      console.log("Invlaid token", error?.message);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container-fluid position-fixed">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a
              className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none cursor"
              onClick={() => navigate("/")}
            >
              <span className="fs-5 d-none d-sm-inline">
                Butt Sanitary Store
              </span>
            </a>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start gap-2"
              id="menu"
            >
              {/* Dashboard */}
              <li className="nav-item">
                <a
                  className="nav-link align-middle px-0 cursor"
                  onClick={() => navigate("/")}
                >
                  <House size={24} />{" "}
                  <span className="ms-1 d-none d-sm-inline">Home</span>
                </a>
              </li>

              {/* Items */}
              <li className="nav-item">
                <a
                  className="nav-link align-middle px-0 cursor"
                  onClick={() => navigate("/products")}
                >
                  <Box size={24} />{" "}
                  <span className="ms-1 d-none d-sm-inline">Items</span>
                </a>
              </li>

              {/* Buyers */}
              <li className="nav-item">
                <a
                  className="nav-link align-middle px-0 cursor"
                  onClick={() => navigate("/buyers")}
                >
                  <People size={24} />{" "}
                  <span className="ms-1 d-none d-sm-inline">Buyers</span>
                </a>
              </li>

              {/* Purchases */}
              <li className="nav-item">
                <a
                  className="nav-link align-middle px-0 cursor"
                  onClick={() => navigate("/purchases")}
                >
                  <Bag size={24} />{" "}
                  <span className="ms-1 d-none d-sm-inline">Purchases</span>
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link align-middle px-0 cursor"
                  onClick={() => navigate("/sales")}
                >
                  <Cart size={24} />{" "}
                  <span className="ms-1 d-none d-sm-inline">Sales</span>
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link align-middle px-0 cursor"
                  onClick={() => navigate("/invoices")}
                >
                  <Receipt size={24} />{" "}
                  <span className="ms-1 d-none d-sm-inline">Invoices</span>
                </a>
              </li>

              {/* Settings */}
              {/* <li className="nav-item">
                <a href="#" className="nav-link align-middle px-0">
                  <Gear size={24} />{" "}
                  <span className="ms-1 d-none d-sm-inline">Settings</span>
                </a>
              </li> */}

              {/*
              <li>
                <a href="#" className="nav-link px-0 align-middle">
                  <Table size={24} />{" "}
                  <span className="ms-1 d-none d-sm-inline">Orders</span>
                </a>
              </li>
              <li>
                <a
                  href="#submenu2"
                  data-bs-toggle="collapse"
                  className="nav-link px-0 align-middle"
                >
                  <Bootstrap size={24} />{" "}
                  <span className="ms-1 d-none d-sm-inline">Bootstrap</span>
                </a>
                <ul
                  className="collapse nav flex-column ms-1"
                  id="submenu2"
                  data-bs-parent="#menu"
                >
                  <li className="w-100">
                    <a href="#" className="nav-link px-0">
                      {" "}
                      <span className="d-none d-sm-inline">Item</span> 1
                    </a>
                  </li>
                  <li>
                    <a href="#" className="nav-link px-0">
                      {" "}
                      <span className="d-none d-sm-inline">Item</span> 2
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a
                  href="#submenu3"
                  data-bs-toggle="collapse"
                  className="nav-link px-0 align-middle"
                >
                  <Grid size={24} />{" "}
                  <span className="ms-1 d-none d-sm-inline">Products</span>
                </a>
                <ul
                  className="collapse nav flex-column ms-1"
                  id="submenu3"
                  data-bs-parent="#menu"
                >
                  <li className="w-100">
                    <a href="#" className="nav-link px-0">
                      {" "}
                      <span className="d-none d-sm-inline">Product</span> 1
                    </a>
                  </li>
                  <li>
                    <a href="#" className="nav-link px-0">
                      {" "}
                      <span className="d-none d-sm-inline">Product</span> 2
                    </a>
                  </li>
                  <li>
                    <a href="#" className="nav-link px-0">
                      {" "}
                      <span className="d-none d-sm-inline">Product</span> 3
                    </a>
                  </li>
                  <li>
                    <a href="#" className="nav-link px-0">
                      {" "}
                      <span className="d-none d-sm-inline">Product</span> 4
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#" className="nav-link px-0 align-middle">
                  <People size={24} />{" "}
                  <span className="ms-1 d-none d-sm-inline">Customers</span>
                </a>
              </li> */}
            </ul>
            <hr />
            <div className="dropdown pb-4">
              <a
                href="#"
                className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="/images/user1.jpg"
                  alt="hugenerd"
                  width="30"
                  height="30"
                  className="rounded-circle"
                />
                <span className="d-none d-sm-inline mx-1">{user?.name}</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                {/* <li>
                  <a className="dropdown-item" href="#">
                    New project...
                  </a>
                </li> */}
                {/* <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li> */}
                {/* <li>
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                </li> */}
                {/* <li>
                  <hr className="dropdown-divider" />
                </li> */}
                <li>
                  <a className="dropdown-item cursor" onClick={handleLogout}>
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col py-3">{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
