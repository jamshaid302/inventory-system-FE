import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import BaseTable from "../../components/datatable";
import { BUYER_FIELDS, BUYER_TABLE_COLUMNS } from "../../utils/constants";
import Modal from "../../components/modal";
import * as Yup from "yup";
import Buyer from "../../services/buyers";
import Swal from "sweetalert2";
import moment from "moment";
import Toast from "../../components/toast";

const Buyers = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState({});
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [search, setSearch] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [isEditMode, setEditMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const schema = Yup.object().shape({
    fullName: Yup.string().required(),
    city: Yup.string(),
    // buyingDate: Yup.string().required(),
    // payment: Yup.number().required(),
  });

  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  }, [showToast]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await Buyer.get(first, rows, search);
      const data = res?.data?.buyers.map((item) => ({
        ...item,
        buyingDate: moment(item?.buyingDate).format("MMM-DD-YYYY"),
      }));
      setData({ data, totalRecords: res?.data?.count });
    };
    fetchData();
  }, [reloadPage, first, rows, search]);

  const openModal = () => {
    setEditMode(false);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const showMessageToast = () => {
    if (showToast) {
      return (
        <Toast
          message={message}
          showToast={showToast}
          errorMessage={errorMessage}
        />
      );
    }
  };

  const handleProductSubmit = async (formData) => {
    try {
      await schema.validate(formData, { abortEarly: false });
      let res;
      if (formData?.id) {
        res = await Buyer.update(formData);
      } else {
        res = await Buyer.add(formData);
      }
      if (res?.data?.buyer) {
        setReloadPage(!reloadPage);
        setMessage(res?.data?.message);
        setShowToast(true);
      }
    } catch (validationErrors) {
      const errorMessages = validationErrors.errors
        .map((error) => error)
        .join("\n");
      setMessage(errorMessages);
      setErrorMessage(true);
      setShowToast(true);
    }
  };

  const handleUpdate = async (formData) => {
    setModalVisible(true);
    setEditMode(true);
    setDataToUpdate(formData);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
      focusConfirm: false,
      focusCancel: true,
      dangerMode: true,
    }).then(async (result) => {
      if (result?.isConfirmed) {
        const res = await Buyer.delete(id);
        if (res) {
          setReloadPage(!reloadPage);
          setMessage(res?.data?.message);
          setShowToast(true);
        }
      }
    });
  };

  return (
    <Layout>
      <div>
        <BaseTable
          data={data}
          columns={BUYER_TABLE_COLUMNS}
          buttonTitle="Add Buyer"
          openModal={openModal}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          setFirst={setFirst}
          setRows={setRows}
          rows={rows}
          first={first}
          setSearch={setSearch}
          search={search}
        />
      </div>
      <div>
        <Modal
          visible={isModalVisible}
          onHide={closeModal}
          fields={BUYER_FIELDS}
          onSubmit={handleProductSubmit}
          title="Add Buyer"
          dataToUpdate={dataToUpdate}
          isEditMode={isEditMode}
        />
      </div>
      {showMessageToast()}
    </Layout>
  );
};

export default Buyers;
