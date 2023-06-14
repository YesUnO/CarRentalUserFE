import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../infrastructure/store";
import { logout, setLoginModal } from "../../features/Auth/authReducer";
import { Menu, MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { setActiveTab } from "../../infrastructure/navigation/navigationReducer";
import LoginOrRegisterModal from "../../features/Auth/components/loginOrRegisterModal";

const AppToolbar: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.authService.isAuthenticated);
  const activeTab = useSelector((state: RootState) => state.navigationService.activeTab);
  const role = useSelector((state: RootState) => state.authService.claims.role);
  const logoutUrl = useSelector((state:RootState) => state.authService.logoutUrl);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const currentRoute = location.pathname;

  // useEffect(() => {
  //   if (role == "Admin") {
  //     navigate("/admin/user");
  //   }
  //   else if (role == "Customer") {
  //     navigate("/");
  //   }
  // }, [role]);

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
        currentTab = "cars"
        break;
      case "/admin/user":
        currentTab = "customer"
        break;
      case "/prices":
        currentTab = "prices"
        break;
      case "/admin/car":
        currentTab = "cars"
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
          label: "Cars",
          key: "cars",
          onClick: () => navigate("/admin/car"),
        },
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
                onClick: () => {window.location.href = "/bff/login?returnUrl=/postLogin"},
              },
            ],
        },
      ];

  const handleLogout = () => {
    dispatch(logout());
    //TODO: logouturl
    window.location.href = logoutUrl;
  };

  return (
    <>
      <Menu
        mode="horizontal"
        items={customerItems}
        selectedKeys={[activeTab]}
      />
      <LoginOrRegisterModal/>
    </>
  );
};

export default AppToolbar;
