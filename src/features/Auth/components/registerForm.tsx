import { useDispatch, useSelector } from "react-redux";
import GenericForm, { IFormField, IGenericForm } from "../../../components/GenericForm";
import { registerAndLogin, setLoginModal, setRegisterOrLogin } from "../authReducer";
import { Button } from "antd";
import { RootState } from "../../../infrastructure/store";
import { useEffect, useState } from "react";


const RegisterForm: React.FC = () => {
    useEffect(() => {
        setFields(initialFields);
    }, []);
    const dispatch = useDispatch();

    const loginModalIsOpened = useSelector((state: RootState) => state.authService.loginModalIsOpened);

    const initialFields: IFormField[] = [
        {
            fieldName: "username",
            label: "Username",
            isPassword: false,
            error: "",
            rules: [{ required: true, message: 'Please input your usernames!' }],
        },
        {
            fieldName: "password",
            label: "Password",
            isPassword: true,
            error: "",
            rules: [{ required: true, message: 'Please input your password!' }],
        },
        {
            fieldName: "confirmPassword",
            label: "Confirm password",
            isPassword: true,
            error: "",
            dependencies:["password"],
            rules: [
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error("Confirm password doesnt match"));
                    },
                }),
            ],
        },
        {
            fieldName: "email",
            label: "Email",
            isPassword: false,
            error: "",
            rules: [{
                type: 'email',
                message: 'The input is not valid email!',
            },
            {
                required: true, message: 'Please input your email!'
            }],
        },
        {
            fieldName: "phoneNumber",
            label: "Phone number",
            isPassword: false,
            error: "",
            rules: [],
        },
    ]

    const [fields, setFields] = useState<IFormField[]>(initialFields);
    const registerCallback = async (fields: {}) => {

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
        submittCallback: registerCallback,
    };

    return (
        <>
            <GenericForm props={registerForm} />
            <Button type="link" onClick={switchToLogin}>Login</Button>
        </>
    );
};

export default RegisterForm;