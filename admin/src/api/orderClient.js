const URL = import.meta.env.VITE_SERVER_URL;
import axiosClient from "./axiosClient";

export const orderApi = {
  getAllOrder: async (param) => {
    try {
      const { data } = await axiosClient.get("/admin/orders", {
        params: param,
      });
      return data;
    } catch (error) {
      if (error.response) throw new Error(error.response.data.message);
      else throw new Error("Đã có lỗi xảy ra, vui lòng thử lại");
    }
  },

  deleteOrder: async (orderId) => {
    try {
      const { data } = await axiosClient.delete(`/admin/orders/${orderId}`);
      return data;
    } catch (error) {
      if (error.response) throw new Error(error.response.data.message);
      else throw new Error("Đã có lỗi xảy ra, vui lòng thử lại");
    }
  },
};
