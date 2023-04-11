import React from "react";
import LoginModal from "../../features/Auth/LoginModal";
import RegisterModal from "../../features/Auth/RegisterModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../infrastructure/store";
import { logout } from "../../features/Auth/authReducer";


const Toolbar: React.FC = () => {

    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.token != null);
    const token = useSelector((state: RootState) => state.auth.token);

    const handleLogout =  () => {
        console.log("yo");
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