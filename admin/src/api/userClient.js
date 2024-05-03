const URL = import.meta.env.VITE_SERVER_URL;
import axios from "axios";

export const userApi = {
  loginUser: async (currentUser) => {
    try {
      const { data } = await axios.post(
        `${URL}/admin/auth/signin`,
        currentUser
      );
      return data;
    } catch (error) {
      if (error.response) throw new Error(error.response.data.message);
      else throw new Error(error.message);
    }
  },
};
