import React from "react";
import LoginModal from "../../features/Auth/LoginModal";
import RegisterModal from "../../features/Auth/RegisterModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../infrastructure/store";
import { logout } from "../../features/Auth/authReducer";


const Toolbar: React.FC = () => {

    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.token != null);

    const handleLogout =  () => {
        dispatch(logout());
    }

    return (
        <>
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
        </>
    );
};

export default Toolbar;