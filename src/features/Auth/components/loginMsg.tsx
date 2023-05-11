import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../infrastructure/store";

const LoginMessage: React.FC = () => {
    const dispatch = useDispatch();
    const loginMsg = useSelector((state: RootState) => state.authService.loginModalMessage);

    const showMsg = loginMsg != "" || loginMsg != null;

    return (
        <>
            {showMsg ? (
                <>
                <div>{loginMsg}</div>
                </>
            ) : (
                <>
                </>
            )}
        </>
    );
};

export default LoginMessage; 