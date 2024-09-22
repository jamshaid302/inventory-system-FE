import axios from "axios";

const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const apiRequests = (url, method = "GET", data = {}, formData) => {
  const token = getToken();
  const config = {
    url: `${url}`,
    method,
    ...(method !== "GET" && {
      data,
      headers: formData
        ? {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          }
        : {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
    }),
    ...(method === "GET" && {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    ...(method === "DELETE" && {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    ...(method === "PATCH" && {
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  };

  return axios(config);
};
