import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../infrastructure/store";
import { logout } from "../../features/Auth/authReducer";
import { Menu, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import { MdClose } from "react-icons/md";
import LoginForm from "../../features/Auth/components/loginForm";


const AppToolbar: React.FC = () => {
    Modal.setAppElement(document.getElementById("root")as HTMLElement);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.authService.token != null);
    const [current, setCurrent] = useState("");

    const items: MenuProps['items'] = [
        {
            label: 'Admin',
            key: 'admin',
            onClick:() =>navigate("/admin"),
        },
        {
            label: 'Price list',
            key: 'prices'
        },
        {
            label: 'Rent a car',
            key: 'rent',
            onClick:() =>navigate("/")
        },
        {
            label: 'User',
            key: 'user',
            children: isAuthenticated? [
                {
                    label: 'Orders',
                    key: 'orders',
                    onClick:() =>navigate("/orderDetail"),
                    
                },
                {
                    label: 'Profile',
                    key: 'profile',
                    onClick:() =>navigate("/user")
                },
                {
                    label: "Log out",
                    key: "logout",
                    onClick: ()=> handleLogout()
                }
            ] : [
                {
                    label: "Sign in",
                    key: "signin",
                    onClick: ()=> setModalIsOpen(true)
                }
            ]
        },
    ]

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };
    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    }

    return (
        <>
            <Menu mode="horizontal" items={items} selectedKeys={[current]} onClick={handleMenuClick} />
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <MdClose onClick={()=>setModalIsOpen(false)}/>
                <section><LoginForm/></section>
            </Modal>
        </>
    );
};

export default AppToolbar;