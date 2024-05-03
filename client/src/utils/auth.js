export const Auth = {
  logout: () => {
    localStorage.removeItem("token");
  },
  isLogin: () => {
    const token = localStorage.getItem("token");
    return token ? true : false;
  },
};
