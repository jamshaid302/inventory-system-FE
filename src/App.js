import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Error404 from "./pages/404";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import DashboardPage from "./pages/dashboard";
import ProductPage from "./pages/products";
import Buyers from "./pages/buyers";
import PurchasesPage from "./pages/purchases";
import SalesPage from "./pages/sales";
import InvoicesPage from "./pages/invoices";
import io from "socket.io-client";
import { useEffect } from "react";
const socket = io(process.env.REACT_APP_API_URL);
// import loadMessaging from "./firebase";

function App() {
  //loadMessaging();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to server");
    });

    socket.on("message", (message) => {
      alert(message);
      // Handle the notification (e.g., show a popup)
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/home" element={<DashboardPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/buyers" element={<Buyers />} />
          <Route path="/purchases" element={<PurchasesPage />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
