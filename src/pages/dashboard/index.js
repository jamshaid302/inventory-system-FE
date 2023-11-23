import React, { useEffect, useState } from "react";
import "./style.css";
import Layout from "../../components/layout";
import BarChart from "../../components/barChart";
import Purchases from "../../services/purchases";

const DashboardPage = () => {
  const [totalPurchaseAmount, setTotalPurchaseAmount] = useState(0);

  useEffect(() => {
    const totalPurchasesSum = async () => {
      const res = await Purchases.getTotalPurchasesAmount();
      if (res) {
        setTotalPurchaseAmount(res?.data?.totalPurchases);
      }
    };
    totalPurchasesSum();
  }, []);

  return (
    <Layout>
      <div className="dashboard">
        <div className="cards row row-cols-1 row-cols-md-3 g-4">
          <div className="custom-card-style">
            <div className="card rounded-3">
              <div className="card-body d-flex flex-column justify-content-center">
                <h5 className="card-title">Total Purchase</h5>
                <p className="card-text">{totalPurchaseAmount}</p>
              </div>
            </div>
          </div>
          <div className="custom-card-style">
            <div className="card rounded-3">
              <div className="card-body d-flex flex-column justify-content-center">
                <h5 className="card-title">Total Sale</h5>
                <p className="card-text">150,000</p>
              </div>
            </div>
          </div>
          <div className="custom-card-style">
            <div className="card rounded-3">
              <div className="card-body d-flex flex-column justify-content-center">
                <h5 className="card-title">Current Day Sale</h5>
                <p className="card-text">150,000</p>
              </div>
            </div>
          </div>
          <div className="custom-card-style">
            <div className="card rounded-3">
              <div className="card-body d-flex flex-column justify-content-center">
                <h5 className="card-title">Stock Items</h5>
                <p className="card-text">150,000</p>
              </div>
            </div>
          </div>
        </div>
        <div className="barChart">
          <BarChart />
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
