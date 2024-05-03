import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

//Users

export const loginApi = async (payload) => {
  try {
    const response = await axiosInstance.post("login", payload);
    const data = response.data;
    if (!data?.success) {
      return false;
    }
    localStorage.setItem("token", data?.token);
    return data?.user;
  } catch (err) {
    console.log("err", err?.message);
    return false;
  }
};

export const registerApi = async (payload) => {
  try {
    const response = await axiosInstance.post("register", payload);
    const data = response.data;
    if (!data?.success) {
      console.log("err", data?.message);
      return false;
    }
    return data;
  } catch (err) {
    let message = err?.response?.data?.message
      ? err?.response?.data?.message
      : "Something Went Wrong!";

    return { success: false, message };
  }
};

export const getProfileApi = async (payload) => {
  try {
    const response = await axiosInstance.post("me", payload);
    const data = response.data;
    if (!data?.success) {
      return false;
    }
    return data?.user;
  } catch (err) {
    return false;
  }
};

export const getAllUserApi = async (payload) => {
  try {
    const response = await axiosInstance.get("users", payload);
    const data = response.data;
    if (!data?.success) {
      return false;
    }
    return data;
  } catch (err) {
    return false;
  }
};

export const addUserApi = async (payload) => {
  try {
    const response = await axiosInstance.post("users", payload);
    const data = response.data;
    if (!data?.success) {
      return data;
    }
    return data;
  } catch (err) {
    let message = err?.response?.data?.message
      ? err?.response?.data?.message
      : "Something Went Wrong!";

    return { success: false, message };
  }
};

export const addWarehouseApi = async (payload) => {
  try {
    const response = await axiosInstance.post("warehouses", payload);
    const data = response.data;
    if (!data?.success) {
      return data;
    }
    return data;
  } catch (err) {
    let message = err?.response?.data?.message
      ? err?.response?.data?.message
      : "Something Went Wrong!";

    return { success: false, message };
  }
};

export const getAllWarehouseApi = async () => {
  try {
    const response = await axiosInstance.get("warehouses");
    const data = response.data;
    if (!data?.success) {
      return data;
    }
    return data;
  } catch (err) {
    let message = err?.response?.data?.message
      ? err?.response?.data?.message
      : "Something Went Wrong!";

    return { success: false, message };
  }
};
