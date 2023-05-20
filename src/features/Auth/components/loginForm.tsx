import { useDispatch, useSelector } from "react-redux";
import GenericForm, {
  IFormField,
  IGenericForm,
} from "../../../components/GenericForm";
import { PasswordCredentialsRequest, loginAndGetUser, setLoginModal, setRegisterOrLogin, signInGoogle } from "../authReducer";
import { Button, message } from "antd";
import { useEffect, useState } from "react";
import { RootState } from "../../../infrastructure/store";
import { AnyAction, AsyncThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { GoogleLogin } from "@react-oauth/google";

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

  const loginBtnLoading = useSelector((state: RootState) => state.authService.loading.getToken || state.authService.loading.getUser);

  const switchToRegister = () => {
    dispatch(setRegisterOrLogin(true));
  }

  const loginCallback = async (fields: {}) => {
    const res = await (dispatch as ThunkDispatch<RootState, unknown, AnyAction>)(loginAndGetUser(fields as PasswordCredentialsRequest));
    if (res.error) {
      const updateFields: IFormField[] = loginForm.fields.map((value) => {
        return value.fieldName == "password" ? { ...value, errors: [res.error as string] } : value;
      })
      setFields(updateFields);
      message.error("Couldnt log in.");
    }
    else {
      dispatch(setLoginModal(false));
      message.success("Succesfully logged in.");
    }
  };

  const googleLogin = async (credentials: string) => {
    //@ts-expect-error
    (dispatch)(signInGoogle(credentials));
  }

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
      {/* <GoogleLogin
        onSuccess={credentialResponse => {
          googleLoginCallback(credentialResponse.credential as string);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      /> */}
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
