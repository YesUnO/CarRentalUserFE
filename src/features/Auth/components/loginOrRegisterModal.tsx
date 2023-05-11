import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../infrastructure/store";
import { Modal } from "antd";
import { setLoginModal } from "../authReducer";
import RegisterForm from "./registerForm";
import LoginForm from "./loginForm";
import LoginMessage from "./loginMsg";

const LoginOrRegisterModal: React.FC = () => {
    const dispatch = useDispatch();
    const registerOrLogin = useSelector((state: RootState) => state.authService.registerOrLogin);
    const modalIsOpen = useSelector((state: RootState) => state.authService.loginModalIsOpened);

    return (
        <>
            <Modal
                destroyOnClose={true}
                title={registerOrLogin ? "Register" : "Login"}
                open={modalIsOpen}
                footer={null}
                onCancel={() => dispatch(setLoginModal(false))}
            >
                <br />
                <LoginMessage/>
                {registerOrLogin ? (
                    <>
                        <RegisterForm />
                    </>
                ) : (
                    <>
                        <LoginForm />
                    </>
                )}
            </Modal>
        </>
    );
};

export default LoginOrRegisterModal; 