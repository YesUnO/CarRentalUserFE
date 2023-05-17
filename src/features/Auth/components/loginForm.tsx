import { useDispatch, useSelector } from "react-redux";
import GenericForm, {
  IFormField,
  IGenericForm,
} from "../../../components/GenericForm";
import { PasswordCredentialsRequest, loginAndGetUser, setLoginModal, setRegisterOrLogin } from "../authReducer";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { RootState } from "../../../infrastructure/store";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

const LoginForm: React.FC = () => {
  useEffect(()=>{
      setFields(initialFields);
  },[]);


  const initialFields: IFormField[] = [
    {
      fieldName: "username",
      label: "Username",
      isPassword: false,
      errors: [],
      rules:[{ required: true, message: 'Please input your username!' },],
    },
    {
      fieldName: "password",
      label: "Password",
      isPassword: true,
      errors: [],
      rules:[{ required: true, message: 'Please input your password!' },],
    },
  ];


const [fields,setFields] = useState<IFormField[]>(initialFields);

  //TODO: dunno
  const dispatch = useDispatch();

  const loginBtnLoading = useSelector((state:RootState)=> state.authService.loading.getToken || state.authService.loading.getUser);

  const switchToRegister = () => {
    dispatch(setRegisterOrLogin(true));
  }

  const loginCallback = async (fields: {}) => {
    const res = await (dispatch as ThunkDispatch<RootState, unknown, AnyAction>)(loginAndGetUser(fields as PasswordCredentialsRequest));
    if (res.error) {
      const updateFields: IFormField[] = loginForm.fields.map((value)=>{
        return value.fieldName == "password"? {...value, errors: [res.error as string]} : value;
      })
      setFields(updateFields)
    }
    else {
      dispatch(setLoginModal(false));
    }
  };

  const loginForm: IGenericForm = {
    fields,
    submitBtnName: "Login",
    btnLoading: loginBtnLoading,
    submittCallback: loginCallback,
  };

  return (
    <>
      <GenericForm props={loginForm} />
      <Button type="link" onClick={switchToRegister}>Register</Button>
    </>
  );
};

export default LoginForm;
