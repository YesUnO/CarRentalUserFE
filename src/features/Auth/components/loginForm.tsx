import { useDispatch } from "react-redux";
import GenericForm, {
  IFormField,
  IGenericForm,
} from "../../../components/GenericForm";
import { PasswordCredentialsRequest, loginAndGetUser, setLoginModal, setRegisterOrLogin } from "../authReducer";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { RootState } from "../../../infrastructure/store";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { Rule } from "antd/es/form";

const LoginForm: React.FC = () => {
  useEffect(()=>{
      setFields(initialFields);
  },[]);


  const initialFields: IFormField[] = [
    {
      fieldName: "username",
      label: "Username",
      isPassword: false,
      error:"",
      rules:[{ required: true, message: 'Please input your username!' },],
    },
    {
      fieldName: "password",
      label: "Password",
      isPassword: true,
      error:"",
      rules:[{ required: true, message: 'Please input your password!' }, ],
    },
  ];


  const extendedFields = initialFields.map((val) => {
    const validator: Rule = { validator: () => validationFnc(val.error) };
    val.rules.push(validator);
    return { ...val };
});

const [fields,setFields] = useState<IFormField[]>(extendedFields);


const validationFnc = (error: string) => {
  console.log(self);
    if (error != "") {
        return Promise.reject(error);
    }
    return Promise.resolve();
}


  //TODO: dunno
  const dispatch = useDispatch();

  const switchToRegister = () => {
    dispatch(setRegisterOrLogin(true));
  }

  const loginCallback = async (fields: {}) => {
    const res = await (dispatch as ThunkDispatch<RootState, unknown, AnyAction>)(loginAndGetUser(fields as PasswordCredentialsRequest));
    if (res.error) {
      const updateFields = loginForm.fields.map((value)=>{
        return value.fieldName == "password"? {...value, error: res.error as string} : value;
      })
      setFields(updateFields)
    }
    else {
      dispatch(setLoginModal(false));
    }
  };

  const clearErrorCallback = async (fieldName: string)=>{
    const updateFields = loginForm.fields.map((value)=>{
      return value.fieldName == fieldName ? {...value, error: ""} : value;
    })
    setFields(updateFields)
  }

  const loginForm: IGenericForm = {
    fields,
    submitBtnName: "Login",
    submittCallback: loginCallback,
    clearErrorCallback
  };

  return (
    <>
      <GenericForm props={loginForm} />
      <Button type="link" onClick={switchToRegister}>Register</Button>
    </>
  );
};

export default LoginForm;
