import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import Purchases from "../../services/purchases";
import moment from "moment";
import BaseTable from "../../components/datatable";
import { PURCHASE_TABLE_COLUMNS } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const PurchasesPage = () => {
  const [data, setData] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await Purchases.get(first, rows, search);
      const data = res?.data?.purchases.map((item) => ({
        ...item,
        buyer: item?.buyer?.fullName,
        purchasingDate: moment(item?.purchasingDate).format("MM-DD-YYYY"),
      }));
      setData({ data, totalRecords: res?.data?.count });
    };

    const token = localStorage.getItem("token") || "";
    if (!token) return navigate("/");

    fetchData();
  }, [first, rows, search, navigate]);

  return (
    <Layout>
      <div>
        <BaseTable
          data={data}
          columns={PURCHASE_TABLE_COLUMNS}
          setFirst={setFirst}
          setRows={setRows}
          rows={rows}
          first={first}
          setSearch={setSearch}
          search={search}
        />
      </div>
    </Layout>
  );
};

export default PurchasesPage;
