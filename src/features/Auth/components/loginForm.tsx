import { useDispatch, useSelector } from "react-redux";
import GenericForm, {
  IFormField,
  IGenericForm,
} from "../../../components/GenericForm";
import { setLoginModal, setRegisterOrLogin } from "../authReducer";
import { Button, message } from "antd";
import { useEffect, useState } from "react";
import { RootState } from "../../../infrastructure/store";
import { AnyAction, AsyncThunkAction, ThunkDispatch } from "@reduxjs/toolkit";

const LoginForm: React.FC = () => {
  useEffect(() => {
    setFields(initialFields);
  }, []);


  const initialFields: IFormField[] = [
    {
      fieldName: "username",
      label: "Username",
      isPassword: false,
      errors: [],
      rules: [{ required: true, message: 'Please input your username!' },],
    },
    {
      fieldName: "password",
      label: "Password",
      isPassword: true,
      errors: [],
      rules: [{ required: true, message: 'Please input your password!' },],
    },
  ];


  const [fields, setFields] = useState<IFormField[]>(initialFields);

  //TODO: dunno
  const dispatch = useDispatch();

  const loginBtnLoading = useSelector((state: RootState) => state.authService.loading.getUser);

  const switchToRegister = () => {
    dispatch(setRegisterOrLogin(true));
  }

  const loginCallback = async (fields: {}) => {
    if (true) {
      const updateFields: IFormField[] = loginForm.fields.map((value) => {
        return value.fieldName == "password" ? { ...value, errors: [""] } : value;
      })
      setFields(updateFields);
      message.error("Couldnt log in.");
    }
    else {
      dispatch(setLoginModal(false));
      message.success("Succesfully logged in.");
    }
  };

  const loginForm: IGenericForm = {
    fields,
    submitBtnName: "Login",
    btnLoading: loginBtnLoading,
    submittCallback: loginCallback,
  };


const apiUrl = process.env.API_URL;

  return (
    <>
      <GenericForm props={loginForm} />
      <form method='GET' action={`${apiUrl}/api/auth/externalLogin`} >
        <button
          type="submit"
          name='provider'
          value='Google'
          title={`Login using Google`}>
          Gooogle
        </button>
      </form>
      {/* <Button onClick={() => googleLogin("")}>Google</Button> */}
      <Button type="link" onClick={switchToRegister}>Register</Button>
    </>
  );
};

export default LoginForm;
