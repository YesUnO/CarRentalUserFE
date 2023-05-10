import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash'
import GenericForm, { CanClearForm, IFormField, IGenericForm } from "../../../components/GenericForm";
import { registerAndLogin, setLoginModal, setRegisterOrLogin } from "../authReducer";
import { Button } from "antd";
import { RootState } from "../../../infrastructure/store";
import { useEffect, useRef } from "react";


const RegisterForm: React.FC = () => {
    const formRef = useRef<CanClearForm>(null);
    useEffect(()=>{
        formRef.current?.clearForm();
    },[]);
    const dispatch = useDispatch();

    const loginModalIsOpened = useSelector((state: RootState)=> state.authService.loginModalIsOpened);
    const fields: IFormField[] = [
        {
            fieldName: "username",
            label: "Username",
            isPassword: false,
        },
        {
            fieldName: "password",
            label: "Password",
            isPassword: true,
        },
        {
            fieldName: "confirmPassword",
            label: "Confirm password",
            isPassword: true,
        },
        {
            fieldName: "email",
            label: "Email",
            isPassword: false,
        },
        {
            fieldName: "phoneNumber",
            label: "Phone number",
            isPassword: false,
        },
    ]

    const registerCallback = async (fields: []) => {

        // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
        await dispatch(registerAndLogin(fields));
    };


    const switchToLogin = () => {
        dispatch(setRegisterOrLogin(false));
        if (!loginModalIsOpened) {
            dispatch(setLoginModal(true));
        }
      }

    const registerForm: IGenericForm = {
        fields,
        submitBtnName: "Register",
        callback: registerCallback
    };

    return (
        <>
            <GenericForm ref={formRef} props={registerForm} />
            <Button type="link" onClick={switchToLogin}>Login</Button>
        </>
    );
};

export default RegisterForm;