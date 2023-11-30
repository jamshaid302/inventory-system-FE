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

function App() {
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
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
