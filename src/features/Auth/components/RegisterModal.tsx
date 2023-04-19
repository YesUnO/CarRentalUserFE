import { useDispatch } from "react-redux";
import GenericForm, { IFormField, IGenericForm } from "../../../components/GenericForm";
import ModalWithBtn from "../../../components/ModalWithBtn";
import { RegisterRequest, register } from "../authReducer";
import _ from 'lodash'


const RegisterModal: React.FC = () => {
    const dispatch = useDispatch();

    const fields: IFormField[] = [
        {
            fieldName:"username",
            fieldValue:"",
            fieldPlaceholder:"Username",
            key:"username"
        },
        {
            fieldName:"password",
            fieldValue:"",
            fieldPlaceholder:"Password",
            key:"password"
        },
        {
            fieldName:"confirmPassword",
            fieldValue:"",
            fieldPlaceholder:"Confirm password",
            key:"confirmPassword"
        },
        {
            fieldName:"email",
            fieldValue:"",
            fieldPlaceholder:"Email",
            key:"email"
        },
        {
            fieldName:"phoneNumber",
            fieldValue:"",
            fieldPlaceholder:"Phone number",
            key:"phoneNumber"
        },
    ]

    const registerCallback = async (fields: IFormField[]) => {
        const registerRequest = _.chain(fields)
            .keyBy('fieldName')
            .mapValues('fieldValue')
            .value();

        // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
        await dispatch(register(registerRequest));
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