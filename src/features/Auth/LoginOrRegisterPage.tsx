import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../infrastructure/store";
import { useState } from "react";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";

const LoginOrRegisterPage: React.FC = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.authService.token != null);
    const [hasAccount, setHasAccount] = useState(false);

    return (
        <>
            {isAuthenticated ? (
                <>
                <div>U are registered move one</div>
                </>
            ) : (
                <>
                    {hasAccount ? (
                        <>
                            <LoginForm />
                        </>
                    ) : (
                        <>
                            <RegisterForm />
                        </>
                    )}
                    <button onClick={() => setHasAccount(!hasAccount)}>{hasAccount ? "Register" : "Login"}</button>
                </>
            )}
        </>
    );
};

export default LoginOrRegisterPage; 
