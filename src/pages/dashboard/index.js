import React, { useEffect, useState } from "react";
import "./style.css";
import Layout from "../../components/layout";
import BarChart from "../../components/barChart";
import Purchases from "../../services/purchases";
import Sales from "../../services/sales";

const DashboardPage = () => {
  const [dashboardData, setDashbaordData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const purchasesRes = await Purchases.getTotalPurchasesAmount();
        if (purchasesRes) {
          setDashbaordData(purchasesRes?.data);
        }

        const salesRes = await Sales.getSalesTotal();
        if (salesRes) {
          setDashbaordData((prev) => ({
            ...prev,
            salesTotal: salesRes?.data?.salesTotal,
            currentDaySalesTotal: salesRes?.data?.currentDaySalesTotal,
            monthlySalesTotal: salesRes?.data?.eachMonthSalesTotal,
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <div className="dashboard">
        <div className="cards row row-cols-1 row-cols-md-3 g-4">
          <div className="custom-card-style">
            <div className="card rounded-3">
              <div className="card-body d-flex flex-column justify-content-center">
                <h5 className="card-title">Total Purchase</h5>
                <p className="card-text">{dashboardData?.totalPurchases}</p>
              </div>
            </div>
          </div>
          <div className="custom-card-style">
            <div className="card rounded-3">
              <div className="card-body d-flex flex-column justify-content-center">
                <h5 className="card-title">Total Sale</h5>
                <p className="card-text">{dashboardData?.salesTotal}</p>
              </div>
            </div>
          </div>
          <div className="custom-card-style">
            <div className="card rounded-3">
              <div className="card-body d-flex flex-column justify-content-center">
                <h5 className="card-title">Current Day Sale</h5>
                <p className="card-text">
                  {dashboardData?.currentDaySalesTotal}
                </p>
              </div>
            </div>
          </div>
          <div className="custom-card-style">
            <div className="card rounded-3">
              <div className="card-body d-flex flex-column justify-content-center">
                <h5 className="card-title">Stock Items</h5>
                <p className="card-text">{dashboardData?.itmeInStock}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="barChart">
          <BarChart monthlySalesTotal={dashboardData?.monthlySalesTotal} />
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
