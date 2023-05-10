import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import GenericForm, {
  IFormField,
  IGenericForm,
} from "../../../components/GenericForm";
import { login, setLoginModal } from "../authReducer";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../infrastructure/store";
import { Button } from "antd";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const fields: IFormField[] = [
    {
      fieldName: "username",
      fieldValue: "",
      fieldPlaceholder: "Username",
      key: "username",
    },
    {
      fieldName: "password",
      fieldValue: "",
      fieldPlaceholder: "Password",
      key: "password",
    },
  ];

  //TODO: dunno
  const dispatch = useDispatch();

  const handleRedirectToRegister = () => {
    dispatch(setLoginModal(false));
    navigate("/user");
  }

  const loginCallback = async (fields: IFormField[]) => {
    const loginRequest = _.chain(fields)
      .keyBy("fieldName")
      .mapValues("fieldValue")
      .value();

    // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
    await dispatch(login(loginRequest));
    dispatch(setLoginModal(false));
  };

  const loginForm: IGenericForm = {
    fields,
    submitBtnName: "Login",
    callback: loginCallback,
  };

  return (
    <>
      <GenericForm props={loginForm} />
      <Button type="link" onClick={handleRedirectToRegister}>Register</Button>
    </>
  );
};

export default LoginForm;
