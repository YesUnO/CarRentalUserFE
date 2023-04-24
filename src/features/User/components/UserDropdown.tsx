import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../infrastructure/store";
import LoginModal from "../../Auth/components/LoginModal";
import RegisterModal from "../../Auth/components/RegisterModal";
import { logout } from "../../Auth/authReducer";

const UserDropdown: React.FC = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.authService.token != null);

    const handleLogout = () => {
        dispatch(logout());
    }
    return (
        <>
            <select>
                {isAuthenticated ? (
                    <>
                        <button onClick={handleLogout}>Log out</button>
                    </>
                ) : (
                    <>
                        <LoginModal />
                        <RegisterModal />
                    </>

                )}
            </select>
        </>
    );
};

export default UserDropdown; 