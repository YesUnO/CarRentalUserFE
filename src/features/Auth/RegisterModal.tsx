import { useDispatch } from "react-redux";
import GenericForm, { IFormField, IGenericForm } from "../../components/GenericForm";
import ModalWithBtn from "../../components/ModalWithBtn";
import { register } from "./authReducer";


const RegisterModal: React.FC = () => {
    const dispatch = useDispatch();

    const fields: IFormField[] = [
        {
            fieldName:"username",
            fieldValue:"",
            fieldPlaceholder:"Username"
        },
        {
            fieldName:"password",
            fieldValue:"",
            fieldPlaceholder:"Password"
        },
        {
            fieldName:"confirmPassword",
            fieldValue:"",
            fieldPlaceholder:"Confirm password"
        },
        {
            fieldName:"email",
            fieldValue:"",
            fieldPlaceholder:"Email"
        },
        {
            fieldName:"phoneNumber",
            fieldValue:"",
            fieldPlaceholder:"Phone number"
        },
    ]

    const registerCallback = async (fields: IFormField[]) => {
        console.log("?")
        // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
        await dispatch(register())
    };

    const registerForm: IGenericForm = {
        fields,
        submitBtnName: "Register",
        callback: registerCallback
    };
    return (
        <>
            <ModalWithBtn name="Register" content=
                {
                    <GenericForm props={registerForm} />
                }

            />
        </>
    );
};

export default RegisterModal;