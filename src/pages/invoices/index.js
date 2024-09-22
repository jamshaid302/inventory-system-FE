import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import Sales from "../../services/sales";
import moment from "moment";
import BaseTable from "../../components/datatable";
import { INVOICES_TABLE_COLUMNS } from "../../utils/constants";
import InvoiceModal from "../../components/InvoiceModal";
import { useNavigate } from "react-router-dom";

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [search, setSearch] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await Sales.get(first, rows, search);
      const data = res?.data?.invoices.map((item) => ({
        ...item,
        date: moment(item?.date).format("MMM-DD-YYYY"),
        items: item?.salesItem?.length,
      }));
      setInvoices({ data, totalRecords: res?.data?.count });
    };

    const token = localStorage.getItem("token") || "";
    if (!token) return navigate("/");

    fetchData();
  }, [first, rows, search, navigate]);

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleView = (invoice) => {
    setSelectedInvoice(invoice);
    setModalVisible(true);
  };

  return (
    <Layout>
      <div>
        <BaseTable
          data={invoices}
          columns={INVOICES_TABLE_COLUMNS}
          setFirst={setFirst}
          setRows={setRows}
          onView={handleView}
          rows={rows}
          first={first}
          setSearch={setSearch}
          search={search}
        />
      </div>
      <div>
        <InvoiceModal
          visible={isModalVisible}
          onHide={closeModal}
          invoice={selectedInvoice}
        />
      </div>
    </Layout>
  );
};

export default InvoicesPage;
