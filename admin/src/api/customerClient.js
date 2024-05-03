const URL = import.meta.env.VITE_SERVER_URL;
import axiosClient from "./axiosClient";

export const customerApi = {
  getAllCustomer: async (param) => {
    try {
      const { data } = await axiosClient.get("/admin/users", { params: param });
      return data;
    } catch (error) {
      if (error.response) throw new Error(error.response.data.message);
      else throw new Error(error.message);
    }
  },
  deleteCustomer: async (userId) => {
    try {
      const { data } = await axiosClient.delete(`/admin/users/${userId}`);
      return data;
    } catch (error) {
      if (error.response) throw new Error(error.response.data.message);
      else throw new Error(error.message);
    }
  },
};
