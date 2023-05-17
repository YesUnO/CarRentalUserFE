import { useDispatch, useSelector } from "react-redux";
import GenericForm, {
  IFormField,
  IGenericForm,
} from "../../../components/GenericForm";
import {
  RegisterRequest,
  registerAndLogin,
  setLoginModal,
  setRegisterOrLogin,
} from "../authReducer";
import { Button, message } from "antd";
import { RootState } from "../../../infrastructure/store";
import { useEffect, useState } from "react";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

const RegisterForm: React.FC = () => {
  useEffect(() => {
    setFields(initialFields);
  }, []);
  const dispatch = useDispatch();

  const loginModalIsOpened = useSelector(
    (state: RootState) => state.authService.loginModalIsOpened
  );

  const initialFields: IFormField[] = [
    {
      fieldName: "username",
      label: "Username",
      isPassword: false,
      errors: [],
      rules: [{ required: true, message: "Please input your usernames!" }],
    },
    {
      fieldName: "password",
      label: "Password",
      isPassword: true,
      errors: [],
      rules: [{ required: true, message: "Please input your password!" }],
    },
    {
      fieldName: "confirmPassword",
      label: "Confirm password",
      isPassword: true,
      errors: [],
      dependencies: ["password"],
      rules: [
        { required: true, message: "Please confirm your password!" },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue("password") === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error("Confirm password doesnt match"));
          },
        }),
      ],
    },
    {
      fieldName: "email",
      label: "Email",
      isPassword: false,
      errors: [],
      rules: [
        {
          type: "email",
          message: "The input is not valid email!",
        },
        {
          required: true,
          message: "Please input your email!",
        },
      ],
    },
    {
      fieldName: "phoneNumber",
      label: "Phone number",
      isPassword: false,
      errors: [],
      rules: [],
    },
  ];

  const [fields, setFields] = useState<IFormField[]>(initialFields);
  const registerCallback = async (fields: {}) => {
    const res = await (
      dispatch as ThunkDispatch<RootState, unknown, AnyAction>
    )(registerAndLogin(fields as RegisterRequest));
    if (res.errors && res.errors.length > 0) {
      const updateFields: IFormField[] = registerForm.fields.map((val) => {
        return { ...val, errors: res.errors?.filter((error) => error.field === val.fieldName).map((error) => error.description) ?? [] };
      });
      setFields(updateFields);
    }
    else {
      dispatch(setLoginModal(false));
      message.success("Succesfully created an account.");
    }
  };

  const switchToLogin = () => {
    dispatch(setRegisterOrLogin(false));
    if (!loginModalIsOpened) {
      dispatch(setLoginModal(true));
    }
  };

  const registerForm: IGenericForm = {
    fields,
    submitBtnName: "Register",
    submittCallback: registerCallback,
  };

  return (
    <>
      <GenericForm props={registerForm} />
      <Button type="link" onClick={switchToLogin}>
        Login
      </Button>
    </>
  );
};

export default RegisterForm;
