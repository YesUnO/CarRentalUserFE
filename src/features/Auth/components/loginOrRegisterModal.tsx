import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../infrastructure/store";
import { Modal } from "antd";
import RegisterForm from "./registerForm";
import LoginForm from "./loginForm";
import LoginMessage from "./loginMsg";

const LoginOrRegisterModal: React.FC = () => {
    const dispatch = useDispatch();
    // const registerOrLogin = useSelector((state: RootState) => state.authService.registerOrLogin);
    // const modalIsOpen = useSelector((state: RootState) => state.authService.loginModalIsOpened);

    return (
        <>
            <Modal
                destroyOnClose={true}
                title={"Register"}
                open={false}
                footer={null}
            >
                <br />
                <LoginMessage/>
                {true ? (
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