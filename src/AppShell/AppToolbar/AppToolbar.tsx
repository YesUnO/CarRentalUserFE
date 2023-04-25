import React from "react";
import LoginModal from "../../features/Auth/components/LoginModal";
import RegisterModal from "../../features/Auth/components/RegisterModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../infrastructure/store";
import { logout } from "../../features/Auth/authReducer";
import { Menu, MenuProps } from "antd";


const AppToolbar: React.FC = () => {

    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.authService.token != null);

    const items: MenuProps[] = [

    ]

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <>
            <Menu />
        </>
    );
};

export default AppToolbar;