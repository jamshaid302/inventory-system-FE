import React, { useEffect, useState } from "react";
import "./style.css";
import Layout from "../../components/layout";
import BaseTable from "../../components/datatable";
import Modal from "../../components/modal";
import { PRODUCT_FIELDS, PRODUCT_TABLE_COLUMNS } from "../../utils/constants";
import * as Yup from "yup";
import Products from "../../services/products";
import moment from "moment";
import Toast from "../../components/toast";
import Swal from "sweetalert2";

const ProductPage = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState({});
  const [formFields, setFormFields] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [search, setSearch] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");

  const schema = Yup.object().shape({
    itemName: Yup.string().required(),
    buyingPrice: Yup.number().required(),
    sellingPrice: Yup.number().required(),
    unit: Yup.string().required(),
    quantity: Yup.number().required(),
    buyer: Yup.number().required(),
    buyingDate: Yup.string().required(),
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
      const res = await Products.get(first, rows, search);
      const data = res?.data?.products.map((item) => ({
        ...item,
        buyer: item?.buyer?.fullName,
        buyingDate: moment(item?.buyingDate).format("MM-DD-YYYY"),
      }));
      setData({ data, totalRecords: res?.data?.count });
    };
    fetchData();
  }, [reloadPage, first, rows, search]);

  useEffect(() => {
    const fetchBuyersForField = async (field) => {
      if (field?.name === "buyer") {
        const options = await fetchAllBuyers();
        field = { ...field, options };
      }
      return field;
    };

    const fetchDataAndUpdateState = async () => {
      const updatedFields = await Promise.all(
        PRODUCT_FIELDS.map(async (field) => fetchBuyersForField(field))
      );

      setFormFields(updatedFields);
    };

    fetchDataAndUpdateState();
  }, []);

  const fetchAllBuyers = async () => {
    const res = await Products.getBuyers();
    return res?.data?.buyers?.map(({ id, fullName }) => ({
      value: id,
      text: fullName,
    }));
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const showMessageToast = () => {
    if (showToast) {
      return <Toast message={message} showToast={showToast} />;
    }
  };

  const handleProductSubmit = async (formData) => {
    try {
      await schema.validate(formData, { abortEarly: false });
      let res;
      if (formData?.id) {
        debugger;
        res = await Products.update(formData);
      } else {
        res = await Products.add(formData);
      }
      if (res?.data?.product) {
        setReloadPage(!reloadPage);
        setMessage(res?.data?.message);
        setShowToast(true);
      }
    } catch (validationErrors) {
      console.log("erroe", validationErrors);
      const errorMessages = validationErrors.errors.join("\n");
      alert(errorMessages);
    }
  };

  const handleUpdate = async (formData) => {
    setModalVisible(true);
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
        const res = await Products.delete(id);
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
          columns={PRODUCT_TABLE_COLUMNS}
          buttonTitle="Add Product"
          openModal={openModal}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
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
          fields={formFields}
          onSubmit={handleProductSubmit}
          title="Add Product"
          dataToUpdate={dataToUpdate}
        />
      </div>
      {showMessageToast()}
    </Layout>
  );
};

export default ProductPage;
