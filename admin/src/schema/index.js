import * as Yup from "yup";

export const validationLogin = Yup.object().shape({
  password: Yup.string().required("Not be empty"),
  email: Yup.string().required("Not be empty").email("Invalid email"),
});

export const validationProduct = Yup.object().shape({
  name: Yup.string().required("Not be empty"),
  type: Yup.string().required("Not be empty"),
  price: Yup.string().required("Not be empty"),
  brands: Yup.string().required("Not be empty"),
  description: Yup.string().required("Not be empty"),
});
