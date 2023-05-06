import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../infrastructure/store";
import { logout, setLoginModal } from "../../features/Auth/authReducer";
import { Menu, MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { MdClose } from "react-icons/md";
import LoginForm from "../../features/Auth/components/loginForm";
import { setActiveTab } from "../../infrastructure/navigation/navigationReducer";

const AppToolbar: React.FC = () => {
  Modal.setAppElement(document.getElementById("root") as HTMLElement);

  const isAuthenticated = useSelector((state: RootState) => state.authService.token != null);
  const activeTab = useSelector((state: RootState) => state.navigationService.activeTab);
  const modalIsOpen = useSelector((state: RootState) => state.authService.loginModalIsOpened);
  const role = useSelector((state: RootState) => state.authService.role);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const currentRoute = location.pathname;


  useEffect(() => {
    if (role == "Admin") {
      navigate("/admin/user");
    }
    else if (role == "Customer") {
      navigate("/");
    }
  }, [role]);

  useEffect(() => {
    let currentTab = "";
    switch (currentRoute) {
      case "/":
        currentTab = "rent"
        break;
      case "/orderDetail":
        currentTab = "orders"
        break;
      case "/user":
        currentTab = "profile"
        break;
      case "/confirmEmail":
        currentTab = "user"
        break;
      case "/admin":
        currentTab = ""
        break;
      case "/admin/user":
        currentTab = "customer"
        break;
      case "/prices":
        currentTab = "prices"
        break;

      default:
        currentTab = ""
        break;
    }
    if (currentTab != activeTab) {
      dispatch(setActiveTab(currentTab));
    }
  }, [currentRoute]);

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

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <Menu
        mode="horizontal"
        items={customerItems}
        selectedKeys={[activeTab]}
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
