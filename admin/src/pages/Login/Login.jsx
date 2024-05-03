import { FastField, Form, Formik } from "formik";
import FormRow from "../../components/FormRow/FormRow.jsx";
import Logo from "../../components/Logo/Logo.jsx";
import Wrapper from "./style.js";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { ROUTE } from "../../constants/route.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { validationLogin } from "../../schema/index.js";
import { loginUser } from "../../app/user/userSlice.js";
import Swal from "sweetalert2";
import { unwrapResult } from "@reduxjs/toolkit";

function Login() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      navigate(ROUTE.INDEX);
    }
  }, [currentUser, navigate]);

  const onSubmit = async (currentUser) => {
    try {
      const actionResult = await dispatch(loginUser(currentUser));
      unwrapResult(actionResult);
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: error.message,
        showConfirmButton: true,
      });
    }
  };

  const initialValues = {
    email: "",
    password: "",
  };
  return (
    <Wrapper className="full-page">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationLogin}
      >
        {(formikProps) => {
          return (
            <Form className="form">
              <Logo />
              <h3>Login</h3>
              <p>Welcome to Shine-Aura</p>
              <FastField
                name="email"
                component={FormRow}
                type="text"
                labelText="email"
                placeholder="Nhập email"
                icon={<AiOutlineMail className="icon" size={20} />}
              />
              <FastField
                name="password"
                component={FormRow}
                type="password"
                labelText="mật khẩu"
                placeholder="Nhập mật khẩu"
                icon={<RiLockPasswordLine className="icon" size={20} />}
              />
              <button type="submit" className="btn-custom">
                Login
              </button>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
}
export default Login;
