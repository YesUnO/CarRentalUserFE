import { useDispatch } from "react-redux";
import _, { values } from "lodash";
import GenericForm, {
  CanClearForm,
  IFormField,
  IGenericForm,
} from "../../../components/GenericForm";
import { PasswordCredentialsRequest, loginAndGetUser, setLoginModal, setRegisterOrLogin } from "../authReducer";
import { Button } from "antd";
import { useEffect, useRef } from "react";
import { RootState } from "../../../infrastructure/store";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

const LoginForm: React.FC = () => {
  const formRef = useRef<CanClearForm>(null);
  useEffect(()=>{
      formRef.current?.clearForm();
  },[]);



  const fields: IFormField[] = [
    {
      fieldName: "username",
      label: "Username",
      isPassword: false,
      error:"",
      rules:[{ required: true, message: 'Please input your username!' }],
    },
    {
      fieldName: "password",
      label: "Password",
      isPassword: true,
      error:"",
      rules:[{ required: true, message: 'Please input your password!' }],
    },
  ];

  //TODO: dunno
  const dispatch = useDispatch();

  const switchToRegister = () => {
    dispatch(setRegisterOrLogin(true));
  }

  const loginCallback = async (fields: {}) => {
    const res = await (dispatch as ThunkDispatch<RootState, unknown, AnyAction>)(loginAndGetUser(fields as PasswordCredentialsRequest));
    if (res.error) {
      loginForm.fields = loginForm.fields.map((value)=>{
        return value.fieldName == "password"? {...value, error: res.error as string} : value;
      })

      console.log(loginForm);
    }
    else {
      dispatch(setLoginModal(false));
    }
  };

  const loginForm: IGenericForm = {
    fields,
    submitBtnName: "Login",
    callback: loginCallback,
  };

  return (
    <>
      <GenericForm ref={formRef} props={loginForm} />
      <Button type="link" onClick={switchToRegister}>Register</Button>
    </>
  );
};

export default LoginForm;
