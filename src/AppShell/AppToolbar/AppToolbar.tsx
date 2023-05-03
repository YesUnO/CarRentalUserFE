import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../infrastructure/store";
import { logout, setLoginModal } from "../../features/Auth/authReducer";
import { Menu, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { MdClose } from "react-icons/md";
import LoginForm from "../../features/Auth/components/loginForm";

const AppToolbar: React.FC = () => {
  Modal.setAppElement(document.getElementById("root") as HTMLElement);

const modalIsOpen = useSelector((state: RootState) => state.authService.loginModalIsOpened);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.authService.token != null
  );


  const role = useSelector((state: RootState) => state.authService.role);
  const [current, setCurrent] = useState("");

  const customerItems: MenuProps["items"] =
    role != null && role == "Admin"
      ? [
          {
            label: "Customers",
            key: "customer",
            onClick: () => navigate("/admin/user"),
          },
          {
            label: "Log out",
            key: "logout",
            onClick: () => handleLogout(),
          },
        ]
      : [
          {
            label: "Price list",
            key: "prices",
          },
          {
            label: "Rent a car",
            key: "rent",
            onClick: () => navigate("/"),
          },
          {
            label: "User",
            key: "user",
            children: isAuthenticated
              ? [
                  {
                    label: "Orders",
                    key: "orders",
                    onClick: () => navigate("/orderDetail"),
                  },
                  {
                    label: "Profile",
                    key: "profile",
                    onClick: () => navigate("/user"),
                  },
                  {
                    label: "Log out",
                    key: "logout",
                    onClick: () => handleLogout(),
                  },
                ]
              : [
                  {
                    label: "Sign in",
                    key: "signin",
                    onClick: () => dispatch(setLoginModal(true)),
                  },
                ],
          },
        ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <Menu
        mode="horizontal"
        items={customerItems}
        selectedKeys={[current]}
        onClick={handleMenuClick}
      />
      <Modal isOpen={modalIsOpen} onRequestClose={() => dispatch(setLoginModal(false))}>
        <MdClose onClick={() => dispatch(setLoginModal(false))} />
        <section>
          <LoginForm />
        </section>
      </Modal>
    </>
  );
};

export default AppToolbar;
