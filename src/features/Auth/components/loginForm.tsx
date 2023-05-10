import { useDispatch } from "react-redux";
import _ from "lodash";
import GenericForm, {
  CanClearForm,
  IFormField,
  IGenericForm,
} from "../../../components/GenericForm";
import { login, setLoginModal, setRegisterOrLogin } from "../authReducer";
import { Button } from "antd";
import { useEffect, useRef } from "react";

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
      rules:[{ required: true, message: 'Please input your username!' }],
    },
    {
      fieldName: "password",
      label: "Password",
      isPassword: true,
      rules:[{ required: true, message: 'Please input your password!' }],
    },
  ];

  //TODO: dunno
  const dispatch = useDispatch();

  const switchToRegister = () => {
    dispatch(setRegisterOrLogin(true));
  }

  const loginCallback = async (fields: []) => {
    
    // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
    await dispatch(login(fields));
    dispatch(setLoginModal(false));
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
