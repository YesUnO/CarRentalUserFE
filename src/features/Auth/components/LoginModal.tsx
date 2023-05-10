import { useDispatch } from "react-redux";
import { getToken } from "../authReducer";
import ModalWithBtn from "../../../components/ModalWithBtn";
import GenericForm, { IFormField, IGenericForm } from "../../../components/GenericForm";
import _ from "lodash";

const LoginModal: React.FC = () => {
    const fields: IFormField[] = [
        {
            fieldName: "username",
            label: "Username",
            isPassword: false,
            rules:[],
          },
          {
            fieldName: "password",
            label: "Password",
            isPassword: true,  
            rules:[],
          },
    ];

    //TODO: dunno
    const dispatch = useDispatch();

    const loginCallback = async (fields: IFormField[]) => {
        const loginRequest = _.chain(fields)
            .keyBy('fieldName')
            .mapValues('fieldValue')
            .value();

        // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
        await dispatch(getToken(loginRequest));
    };

    const loginForm: IGenericForm = {
        fields,
        submitBtnName: "Login",
        callback: loginCallback
    };

    return (
        <>
            <ModalWithBtn name={"Login"} content=
                {
                    <GenericForm props={loginForm} />
                }
            />
        </>
    );
};

export default LoginModal;