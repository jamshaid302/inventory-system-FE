import React, { useEffect, useState } from "react";
import Buyer from "../services/buyers";
import Products from "../services/products";

const SERVICES = {
  Buyer: Buyer,
  Product: Products,
};

const useFetch = ({ service, first, rows, search }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await SERVICES[service].get(first, rows, search);
        const { buyers, count } = res?.data?.data;
        const data = buyers?.map((item) => ({
          ...item,
          buyingDate: moment(item?.buyingDate).format("MMM-DD-YYYY"),
        }));
        setData({ data, totalRecords: count });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [service]);

  return { data, loading, error };
};

export default useFetch;
