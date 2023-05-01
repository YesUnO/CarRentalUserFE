import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import GenericForm, {
  IFormField,
  IGenericForm,
} from "../../../components/GenericForm";
import { login } from "../authReducer";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../infrastructure/store";
import { useEffect } from "react";

const LoginModal: React.FC = () => {
  const role = useSelector((state: RootState) => state.authService.role);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(role);
    if (role == "Admin") {
      navigate("/admin/user");
    }
  }, [role]);

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

  const loginCallback = async (fields: IFormField[]) => {
    const loginRequest = _.chain(fields)
      .keyBy("fieldName")
      .mapValues("fieldValue")
      .value();

    // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
    await dispatch(login(loginRequest));
  };

  const loginForm: IGenericForm = {
    fields,
    submitBtnName: "Login",
    callback: loginCallback,
  };

  return (
    <>
      <GenericForm props={loginForm} />
    </>
  );
};

export default LoginModal;
