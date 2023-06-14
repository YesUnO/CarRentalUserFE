import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../infrastructure/store";
import RegisterForm from "../components/registerForm";

const RegisterPage: React.FC = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.authService.isAuthenticated);

    return (
        <>
            {isAuthenticated ? (
                <>
                    <div>U are registered move one</div>
                </>
            ) : (
                <>
                    <>
                        <RegisterForm />
                    </>
                </>
            )}
        </>
    );
};

export default RegisterPage; 
