const URL = import.meta.env.VITE_SERVER_URL;
import axios from "axios";
import axiosClient from "./axiosClient";

export const productApi = {
  createProduct: async (currentProduct) => {
    try {
      const data = await axiosClient.post(`/admin/products`, currentProduct);
      return data;
    } catch (error) {
      if (error.response) throw new Error(error.response.data.message);
      else throw new Error("Đã có lỗi xảy ra, vui lòng thử lại");
    }
  },
  getAllProduct: async (param) => {
    try {
      const { data } = await axiosClient.get("/admin/products", {
        params: param,
      });
      return data;
    } catch (error) {
      if (error.response) throw new Error(error.response.data.message);
      else throw new Error("Đã có lỗi xảy ra, vui lòng thử lại");
    }
  },

  deleteProduct: async (id) => {
    try {
      const { data } = await axiosClient.delete(`/admin/products/${id}`);
      return data;
    } catch (error) {
      if (error.response) throw new Error(error.response.data.message);
      else throw new Error("Đã có lỗi xảy ra, vui lòng thử lại");
    }
  },

  uploadFile: async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await axios.post(`${URL}/file/1`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error) {
      if (error.response) throw new Error(error.response.data.message);
      else throw new Error("Đã có lỗi xảy ra, vui lòng thử lại");
    }
  },
};
